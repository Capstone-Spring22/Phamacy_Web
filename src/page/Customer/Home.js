import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import Header from "../Header/Header";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
} from "../../services/data.service";
import logo from "../../assets/BH3.png";
import { CATEGORIES, ListNewProduct } from "../Data";
import { toast, Toaster } from "react-hot-toast";
const Home = () => {
  const [apartment, setApartment] = useState([]);
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [drug, setDrug] = useState(null);
  const [drugUserTarget, setDrugUserTarget] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomsMsg, setRoomsMsg] = useState([]);
  const [userRoom, setUserRoom] = useState([]);
  const [patientId, setPatientId] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newMessageType, setNewMessageType] = useState("text");
  const roomId = "";
  const [countUs, setCountUs] = useState("2");
  const id = localStorage.getItem("id");
  const update = (deviceId) => {
    localStorage.setItem("deviceId", deviceId);

    // history.push("/ViewCart");
  };

  const userName = localStorage.getItem("userName");
  const roleName = localStorage.getItem("roleName");

  async function loadDataMedicine() {
    const path = `Product?isSellFirstLevel=true&pageIndex=1&pageItems=12`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDrug(res.data.items);
      setTotalRecord(res.data.totalRecord);
      console.log("display", currentPage);
    }
  }
  const userUsages = [
    { name: "Mọi lứa tuổi", value: "" },
    { name: "Trẻ em", value: 1 },
    { name: "Người lớn", value: 2 },
    { name: "Người cao tuổi", value: 3 },
    { name: "Phụ nữ cho con bú", value: 4 },
    { name: "Phụ nữ", value: 5 },
  ];

  async function loadDataMedicineUse(userUsagesActive) {
    const path = `Product?isSellFirstLevel=true&userTarget=${userUsagesActive}&pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDrugUserTarget(res.data.items);
      setTotalRecord(res.data.totalRecord);
      console.log("display", currentPage);
    }
  }

  async function loadDataCategory2() {
    const path = `MainCategory?pageIndex=${1}&pageItems=${12}`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setCategory(res.data.items);
    }
  }
  const navigate = useHistory();
  const handleLogout = async () => {
    try {
      navigate.push("/Login");
      localStorage.removeItem("accessTokenUser");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      localStorage.removeItem("phoneNo");
      localStorage.removeItem("roleName");
      localStorage.removeItem("id");
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkValidation = () => {
    // if (id.trim() === "") {
    //   Swal.fire("ID Can't Empty", "", "question");
    //   return false;
    // }
    return true;
  };
  const [product, setProduct] = useState({
    cartId: "",
    item: {
      productId: "",
      quantity: 0,
    },
  });
  let buttonLogout;
  if (roleName === "Customer") {
    buttonLogout = (
      <div className="button-login">
        <Link activeClassName="active" onClick={handleLogout}>
          <span style={{ color: "white" }}>Đăng Xuất</span>
        </Link>
      </div>
    );
  } else {
    buttonLogout = (
      <div className="button-login">
        <Link activeClassName="active" to="/Login">
          <span style={{ color: "white" }}>Đăng Nhập</span>
        </Link>
      </div>
    );
  }
  let buttonHistory;
  if (roleName === "Customer") {
    buttonHistory = (
      <div className="button-login" style={{ marginRight: 10 }}>
        <Link activeClassName="active" to="/HistoryOrder">
          <span style={{ color: "white" }}>Lịch Sử Đơn</span>
        </Link>
      </div>
    );
  }
  async function fetchChatById() {
    setLoading(true);
    const q = query(collection(db, "chats"), where("patientId", "==", id));
    onSnapshot(q, (querySnapshot) => {
      const rooms = [];
      querySnapshot.forEach((r) => {
        const messagesRef = collection(r.ref, "messages");
        onSnapshot(messagesRef, (mess) => {
          const messages = mess.docs
            .filter((doc) => doc.data().senderId === id)
            .map((doc) => {
              return {
                id: doc.id,
                message: doc.data().message,
                type: doc.data().type,
                senderId: doc.data().senderId,
                timestamp: doc.data().timestamp,
              };
            });
          messages.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
          const newRooms = [
            ...rooms.filter((room) => room.id !== r.id), // loại bỏ phòng cũ (nếu có) khỏi mảng mới
            {
              id: r.id,
              messages: messages,
              data: r.data(),
            },
          ];

          setRooms(newRooms);
        });
      });
    });

    setLoading(false);
  }

  const handleClickCount = () => {
    setCountUs(parseInt(countUs) + 1);
  };
  useEffect(() => {
    console.log("room", rooms);
    fetchChatByPharmacist();
  }, [countUs]);
  async function handleAddMessage(roomId) {
    // Get the chats collection
    const chatsRef = collection(db, "chats");

    // Check if a chat already exists for the given patient and pharmacist
    const querySnapshot = await getDocs(
      query(
        chatsRef,
        where("patientId", "==", id),
        where("pharmacistId", "==", "")
      )
    );

    if (querySnapshot.docs.length > 0) {
      // A chat already exists, use its ID to add the new message
      const chatId = querySnapshot.docs[0].id;
      const messagesRef = collection(db, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        message: newMessage,
        type: newMessageType,
        senderId: id,
        timestamp: new Date(),
      });
    } else {
      // Create a new chat document and add the new message
      const newChatRef = await addDoc(chatsRef, {
        fontSize: 14,
        lastMessage: "cc",
        patientId: id,
        pharmacistId: "",
        request: "cc",
        status: "cc",
        timestamp: new Date(),
      });
      const messagesRef = collection(db, "chats", newChatRef.id, "messages");
      await addDoc(messagesRef, {
        message: newMessage,
        type: newMessageType,
        senderId: id,
        timestamp: new Date(),
      });
    }

    setNewMessage("");
  }
  useEffect(() => {
    fetchChatById();
  }, []);
  useEffect(() => {
    loadDataMedicineUse("");
  }, []);
  useEffect(() => {
    loadDataCategory2();
  }, []);

  async function fetchChatByPharmacist() {
    setLoading(true);
    const q = query(collection(db, "chats"));
    onSnapshot(q, (querySnapshot) => {
      const roomsMsg = [];
      querySnapshot.forEach((r) => {
        const messagesRef = collection(r.ref, "messages");
        onSnapshot(messagesRef, (mess) => {
          const messages = mess.docs.map((doc) => {
            return {
              id: doc.id,
              message: doc.data().message,
              type: doc.data().type,
              senderId: doc.data().senderId,
              timestamp: doc.data().timestamp,
            };
          });
          messages.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
          // Tạo một mảng mới từ roomsMsg và thêm phần tử mới vào mảng
          const newRoomsMsg = [
            ...roomsMsg.filter((room) => room.id !== r.id), // loại bỏ phòng cũ (nếu có) khỏi mảng mới
            {
              id: r.id,
              messages: messages,
              data: r.data(),
            },
          ];

          setRoomsMsg(newRoomsMsg);
        });
      });

      setLoading(false);
    });
  }

  const [showChat, setShowChat] = useState(false);
  const handleChatToggle = () => {
    setShowChat(!showChat);
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    loadDataMedicine();
  }, [currentPage, perPage]);
  const handleDragStart = (e) => e.preventDefault();
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="site-navbar py-2" style={{ backgroundColor: "#e6eeff" }}>
        <div className="search-wrap">
          <div className="container">
            <div className="search-box">
              <button className="btn-search">
                <i className="icon-close2" />
              </button>
              <form action="#" method="post">
                <input
                  type="text"
                  className="input-search"
                  placeholder="Type to Search..."
                />
              </form>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: 15, marginBottom: 15 }}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
              <div
                className="app-brand demo"
                style={{ marginLeft: -10, marginBottom: -80, marginTop: -90 }}
              >
                <Link to="/Home" className="app-brand-link">
                  <img src={logo} style={{ height: 80 }} />
                </Link>
              </div>
            </div>
            <div className="main-nav d-none d-lg-block">
              <nav
                className="site-navigation text-right text-md-center"
                role="navigation"
              >
                <div style={{ position: "relative", width: "700px" }}>
                  <input className="search-home" placeholder="Tìm Kiếm Thuốc" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "120px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M21.707 20.293l-4.95-4.95C17.396 14.208 18 12.708 18 11c0-4.411-3.589-8-8-8S2 6.589 2 11s3.589 8 8 8c1.708 0 3.208-.604 4.343-1.643l4.95 4.95a1 1 0 001.414-1.414zM4 11c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6z"
                    />
                  </svg>
                </div>
              </nav>
            </div>
            <div className="icons" style={{ display: "flex" }}>
              {buttonHistory}

              {buttonLogout}

              {/* <button onClick={laydata}>Lây data</button> */}
              <div className="button-cart">
                <Link
                  to="/ViewCart"
                  className="icons-btn  "
                  style={{ display: "flex" }}
                >
                  <div>
                    <span
                      className="icon-shopping-bag"
                      style={{ color: "white" }}
                    />
                  </div>
                  <div style={{ marginTop: "10px", color: "white" }}>
                    Giỏ Hàng
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {roleName === "Customer" ? (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <div
              style={{
                borderBottom: "1px solid black",
                flexGrow: 1,

                marginLeft: 400,
                marginRight: 50,
                width: "30%",
              }}
            />

            <div style={{ whiteSpace: "nowrap", fontSize: "20px" }}>
              Chào Mừng <strong>{userName}</strong> Đã Đến Cửa Hàng
            </div>

            <div
              style={{
                borderBottom: "1px solid black",
                flexGrow: 1,
                marginLeft: 50,
                marginRight: 400,
                width: "30%",
              }}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="site-wrap">
        <div className="carousel-header">
          <Carousel fade>
            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1678849856-VRaS-hang-nhat-t3.png"
                style={{ height: 260, borderRadius: 10 }}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <img
                className="d-block w-100 "
                style={{ height: 260, borderRadius: 10 }}
                src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1677150972-hsMN-cam-cum.png"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={8000}>
              <img
                className="d-block w-100"
                src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1679725085-Ha7S-phong-benh-sot-xuat-huyet.png"
                style={{ height: 260, borderRadius: 10 }}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          <div>
            <div className="carousel-left">
              <img
                className="d-block w-100"
                src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/392x134-1681377061965.png"
                style={{ height: 125, borderRadius: 10 }}
                alt="Third slide"
              />
            </div>
            <div className="carousel-left-2">
              <img
                className="d-block w-100"
                src="https://cdn.tgdd.vn/2023/03/banner/Banner-slide---CS-Ca-Nhan---Selsun---592x182-592x182.png"
                style={{ height: 125, borderRadius: 10 }}
                alt="Third slide"
              />
            </div>
          </div>
        </div>

        <button onClick={handleChatToggle} className="button-open-chat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-wechat"
            viewBox="0 0 16 16"
          >
            <path d="M11.176 14.429c-2.665 0-4.826-1.8-4.826-4.018 0-2.22 2.159-4.02 4.824-4.02S16 8.191 16 10.411c0 1.21-.65 2.301-1.666 3.036a.324.324 0 0 0-.12.366l.218.81a.616.616 0 0 1 .029.117.166.166 0 0 1-.162.162.177.177 0 0 1-.092-.03l-1.057-.61a.519.519 0 0 0-.256-.074.509.509 0 0 0-.142.021 5.668 5.668 0 0 1-1.576.22ZM9.064 9.542a.647.647 0 1 0 .557-1 .645.645 0 0 0-.646.647.615.615 0 0 0 .09.353Zm3.232.001a.646.646 0 1 0 .546-1 .645.645 0 0 0-.644.644.627.627 0 0 0 .098.356Z" />
            <path d="M0 6.826c0 1.455.781 2.765 2.001 3.656a.385.385 0 0 1 .143.439l-.161.6-.1.373a.499.499 0 0 0-.032.14.192.192 0 0 0 .193.193c.039 0 .077-.01.111-.029l1.268-.733a.622.622 0 0 1 .308-.088c.058 0 .116.009.171.025a6.83 6.83 0 0 0 1.625.26 4.45 4.45 0 0 1-.177-1.251c0-2.936 2.785-5.02 5.824-5.02.05 0 .1 0 .15.002C10.587 3.429 8.392 2 5.796 2 2.596 2 0 4.16 0 6.826Zm4.632-1.555a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0Zm3.875 0a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0Z" />
          </svg>
        </button>
        {showChat && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddMessage(roomId); // replace with  room ID
            }}
          >
            <div className="wrapper-chat">
              <div className="chat-box">
                <div className="chat-head">
                  <h2>Chat Box</h2>
                </div>
                <div className="chat-body">
                  <div
                    className="msg-insert"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {roomsMsg.map((room2) => (
                      <div>
                        {room2.messages &&
                          room2.messages.length &&
                          room2.messages
                            .sort((a, b) => a.timestamp - b.timestamp)
                            .map((item2) => {
                              return (
                                <div
                                  className={
                                    item2.senderId === id
                                      ? "msg-send"
                                      : "msg-receive"
                                  }
                                  key={item2.timestamp}
                                >
                                  {item2.message}
                                </div>
                              );
                            })}{" "}
                      </div>
                    ))}
                  </div>

                  <div className="chat-text">
                    <input
                      placeholder="Send"
                      defaultValue={""}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    {newMessage && (
                      <button
                        type="submit"
                        className="button-send-chat"
                        onClick={handleClickCount}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-send-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </form>
        )}
        <div className="site-section">
          <div className="container">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">Danh Mục</h2>
            </div>
            <div
              className="row align-items-stretch section-overlap"
              style={{ marginLeft: 10 }}
            >
              {category.map((item, index) => {
                return (
                  <Link
                    to={`/Medicine/${item.id}`}
                    // onClick={() => {
                    //   viewProduct(item.id);
                    // }}
                    className="col-md-2 col-lg-1 mb-1 mb-lg-2 hv"
                    style={{ width: 160, height: 220 }}
                  >
                    <div
                      className="banner-wrap  h-100"
                      style={{ backgroundColor: "#e8f5fd" }}
                    >
                      <a
                        href="#"
                        className="h-100"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <img
                          className="hv"
                          src={item.imageUrl}
                          style={{ height: 100, width: 100 }}
                        />

                        <br />
                        <br />
                        <h6
                          key={index}
                          style={{ color: "black", fontSize: 13, height: 30 }}
                        >
                          {item.categoryName}
                        </h6>
                        <h6
                          key={index}
                          style={{ color: "black", fontSize: 13 }}
                        >
                          {item.noOfProducts} sản phẩm
                        </h6>
                      </a>
                    </div>
                  </Link>
                );
              })}

              {/* </div>
  </div>
</div>
<div className="site-section">
  <div className="container">
    <div className="row align-items-stretch section-overlap"> */}
            </div>
          </div>
        </div>

        <div className="form-product-new">
          {" "}
          <section class="new_arrivals_area section_padding_10_0 clearfix">
            <div className="container">
              <div className="row">
                <div className=" col-12">
                  <h3 className="" style={{ marginLeft: 20, marginTop: 20 }}>
                    Sản Phẩm Mới
                  </h3>
                </div>
              </div>
              <br />

              <div className="container " style={{ display: "flex",flexWrap: "wrap" }}>
                {drug &&
                  drug.length > 0 &&
                  drug.map((item, index) => {
                    return (
                      <Link
                        className="product-card"
                        style={{width: "190px"}}
                        key={item.id}
                        to={`/ViewDetail/${item.id}`}
                      >
                        <img
                          src={item.imageModel.imageURL}
                          className="product-img-new"
                          alt="Product Image"
                        />
                        <div className="product-info">
                          {" "}
                          <h2 className="product-name">{item.name}</h2>
                          <div style={{ display: "flex" }}>
                            <p className="product-price">
                              {" "}
                              {item.priceAfterDiscount.toLocaleString(
                                "en-US"
                              )}{" "}
                              đ /{item.productUnitReferences[0].unitName}
                            </p>
                          </div>
                          <p>
                            {" "}
                            {item.price === item.priceAfterDiscount ? (
                              ""
                            ) : (
                              <del>{item.price} đ</del>
                            )}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
              <button to="/medicine" className="button-redirect"> Xem Thêm</button>
            </div>
          </section>
        </div>
        <div className="form-product-new-blue">
          {" "}
          <section class="new_arrivals_area section_padding_10_0 clearfix">
            <div className="container">
              <div className="row">
                <div className=" col-12">
                  <h3 className="" style={{ marginLeft: 20, marginTop: 20 }}>
                    Theo Đối Tượng
                  </h3>
                </div>
              </div>
              <br />
              <div style={{ display: "flex" }}>
                {userUsages &&
                  userUsages.length > 0 &&
                  userUsages.map((e, index) => {
                    return (
                      <div
                        onClick={() => {
                          {
                            loadDataMedicineUse(e.value);
                          }
                          setActiveIndex(index);
                        }}
                        className={` ${
                          activeIndex === index
                            ? "button-user-target-active"
                            : "button-user-target"
                        }`}
                        style={{ display: "flex" }}
                      >
                        {" "}
                        {e.name}
                      </div>
                    );
                  })}
              </div>
              <div className="container " style={{ display: "flex" }}>
                {drugUserTarget &&
                  drugUserTarget.length > 0 &&
                  drugUserTarget.map((item, index) => {
                    return (
                      <Link
                        className="product-card"
                        key={item.id}
                        to={`/ViewDetail/${item.id}`}
                      >
                        <img
                          src={item.imageModel.imageURL}
                          className="product-img-new"
                          alt="Product Image"
                        />
                        <div className="product-info">
                          {" "}
                          <h2 className="product-name">{item.name}</h2>
                          <div style={{ display: "flex" }}>
                            <p className="product-price">
                              {" "}
                              {item.priceAfterDiscount.toLocaleString(
                                "en-US"
                              )}{" "}
                              đ /{item.productUnitReferences[0].unitName}
                            </p>
                          </div>
                          <p>
                            {" "}
                            {item.price === item.priceAfterDiscount ? (
                              ""
                            ) : (
                              <del>{item.price} đ</del>
                            )}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
        <section class="new_arrivals_area section_padding_100_0 clearfix">
          <div className="container">
            <div className="row">
              <div className="title-section text-center col-12">
                <h2 className="text-uppercase">Popular Medicine</h2>
              </div>
            </div>
            <br />
            <br />
            <br />

            <div className="container ">
              <div className="row karl-new-arrivals ">
                {drug &&
                  drug.length > 0 &&
                  drug.map((item, index) => {
                    return (
                      <div
                        className=" col-md-2 single_gallery_item women wow fadeInUpBig "
                        data-wow-delay="0.2s"
                      >
                        {/* Product Image */}
                        <Link
                          to={`/ViewDetail/${item.id}`}
                          className="product-img"
                          style={{ borderRadius: 5 }}
                          // onClick={() => {
                          //   viewDetail(item.id);
                          // }}
                        >
                          <img
                            src={item.imageModel.imageURL}
                            alt=""
                            style={{ objectFit: "cover", height: 250 }}
                          />
                          <div className="product-quicview">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#quickview"
                            >
                              <BsPlus style={{ marginBottom: 10 }} />
                            </a>
                          </div>
                        </Link>

                        {/* Product Description */}
                        <div className="product-description">
                          <p style={{ height: 90, color: "#334155" }}>
                            {item.name}
                          </p>
                          <h4
                            className="product-price"
                            style={{ color: "#82aae3" }}
                          >
                            {" "}
                            {item.priceAfterDiscount.toLocaleString("en-US")} đ
                            /{item.productUnitReferences[0].unitName}
                            <td>
                              {item.price === item.priceAfterDiscount ? (
                                ""
                              ) : (
                                <del>{item.price} đ</del>
                              )}
                            </td>
                          </h4>
                          {/* Add to Cart */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default Home;
