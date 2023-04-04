import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import Header from "../Header/Header";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
} from "../../services/data.service";
import logo from "../../assets/BH2.png";
import { CATEGORIES, ListNewProduct } from "../Data";
import { toast, Toaster } from "react-hot-toast";
const Home = () => {
  const [apartment, setApartment] = useState([]);
  let history = useHistory();
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const update = (deviceId) => {
    localStorage.setItem("deviceId", deviceId);

    // history.push("/ViewCart");
  };

  
  const viewDetail = (detailId) => {
    localStorage.setItem("detailId", detailId);
    history.push("/ViewDetail");
  };
  const userName = localStorage.getItem("userName");
  const roleName = localStorage.getItem("roleName");
  
  async function loadDataMedicine() {
    const path = `Product?isSellFirstLevel=true&pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDrug(res.data.items);
      setTotalRecord(res.data.totalRecord);
      console.log("display", currentPage);
    }
  }
  const navigate = useHistory();
  const handleLogout = async () => {
    try {
      navigate.push("/Login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("roleName");
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
      <li>
        <Link activeClassName="active" onClick={handleLogout}>
          <span>Logout</span>
        </Link>
      </li>
    );
  } else {
    buttonLogout = (
      <li>
        <Link activeClassName="active" to="/Login">
          <span>login</span>
        </Link>
      </li>
    );
  }

  async function addToCart(productId) {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (checkValidation()) {
        const deviceId = await axios
          .get("https://api.ipify.org/?format=json")
          .then((res) => res.data.ip);
        update(deviceId);
        setProduct({
          deviceId,
          item: {
            productId,
            quantity:
              product.item.productId === productId
                ? product.item.quantity + 1
                : 1,
          },
        });
        const path = "Cart";
        const res = await createDataByPath(path, accessToken, product);
        console.log("Check res", res);
        console.log("display du lieu", product);
        if (res && res.status === 200) {
          toast.success("OTP sended successfully!");
          // window.location.reload();
        }
      }
    }
  }
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    loadDataMedicine();
  }, [currentPage, perPage]);
  const handleDragStart = (e) => e.preventDefault();
  return (
    <>
      <div className="site-navbar py-2">
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
        <Toaster toastOptions={{ duration: 4000 }} />
        <div className="container">
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
                <ul className="site-menu js-clone-nav d-none d-lg-block">
                  <li className="active">
                    <Link activeClassName="active" to="/Home" exact>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link activeClassName="active" to="/Medicine">
                      <span>Store</span>
                    </Link>
                  </li>

                 
                  <li>
                    <Link activeClassName="active" to="/LoginAdmin">
                      <span>LoginAdmin</span>
                    </Link>
                  </li>
                  {buttonLogout}
                </ul>
              </nav>
            </div>
            <div className="icons">
              <div>{userName}</div>
              <Link
                to="#"
                className="icons-btn d-inline-block js-search-open"
              ></Link>
              <div className="search-box icons-btn d-inline-block js-search-open">
                <button className="btn-search">
                  <span className="icon-search" />
                </button>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Type to Search..."
                  style={{ color: "black" }}
                />
              </div>

              {/* <button onClick={laydata}>Lây data</button> */}

              <Link to="/ViewCart" className="icons-btn d-inline-block bag">
                <span className="icon-shopping-bag" />
                <span className="number">2</span>
              </Link>
              <Link
                href="#"
                className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"
              >
                <span className="icon-menu" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="site-wrap">
        <Carousel fade>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1678849856-VRaS-hang-nhat-t3.png"
              style={{ height: 400 }}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100 "
              style={{ height: 400 }}
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1677150972-hsMN-cam-cum.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={8000}>
            <img
              className="d-block w-100"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1679725085-Ha7S-phong-benh-sot-xuat-huyet.png"
              style={{ height: 400 }}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>

        <div className="site-section" style={{ marginBottom: -111 }}>
          <div className="container">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase" style={{}}>
                Mua Thuốc Dễ Dàng{" "}
              </h2>
            </div>
            <section class="ftco-section ftco-no-pt ftco-no-pb">
              <div class="container">
                <div class="row no-gutters ftco-services">
                  <div class="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                    <div class="media block-6 services p-4 py-md-5">
                      <div class="media-body">
                        <div class="icon d-flex justify-content-center align-items-center mb-4">
                          <img
                            src="https://nhathuoclongchau.com/frontend_v3/images/banner-html/home/chuptoathuoc.png"
                            style={{ height: 100, width: 100 }}
                          />
                        </div>
                        <h3 class="heading">
                          {" "}
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp;PHOTOGRAPHY OF MEDICINE
                        </h3>
                        <p>simple & fast</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                    <div class="media block-6 services p-4 py-md-5">
                      <div class="media-body">
                        <div class="icon d-flex justify-content-center align-items-center mb-4">
                          <img
                            src="https://nhathuoclongchau.com/frontend_v3/images/banner-html/home/info-ct.png"
                            style={{ height: 100, width: 100 }}
                          />
                        </div>
                        <h3 class="heading">
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ENTER CONTACT
                          INFORMATION &nbsp; &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        </h3>
                        <p>for ordering advice</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                    <div class="media block-6 services p-4 py-md-5">
                      <div class="media-body">
                        <div class="icon d-flex justify-content-center align-items-center mb-4">
                          <img
                            src="https://nhathuoclongchau.com/frontend_v3/images/banner-html/home/duoc-sy.png"
                            style={{ height: 100, width: 100 }}
                          />
                        </div>
                        <h3 class="heading">
                          GET A PRICE FROM THE PHARMACEUTICAL
                        </h3>
                        <p>Free consultation included</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="site-section">
          <div className="container">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">Category</h2>
            </div>
            <div className="row align-items-stretch section-overlap">
              {CATEGORIES.map((item, index) => {
                return (
                  <div className="col-md-2 col-lg-2 mb-2 mb-lg-2 hv">
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
                          src={item.src}
                          style={{ height: 100, width: 100 }}
                        />

                        <br />
                        <br />
                        <h6
                          key={index}
                          style={{ color: "black", fontSize: 17 }}
                        >
                          {item.name}
                        </h6>
                      </a>
                    </div>
                  </div>
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

        <section class="new_arrivals_area section_padding_10_0 clearfix">
          <div className="container">
            <div className="row">
              <div className=" col-12">
                <h3 className="" style={{ marginLeft: 20 }}>
                  Sản Phẩm Mới
                </h3>
              </div>
            </div>
            <br />

            <div className="container " style={{ display: "flex" }}>
            {drug &&
                  drug.length &&
                  drug.map((item, index) => {
                    return (
                      <div
                        className=" col-md-2 single_gallery_item women wow fadeInUpBig "
                        data-wow-delay="0.2s"
                      >
                        {/* Product Image */}
                        <div
                          className="product-img"
                          style={{ borderRadius: 5}}
                          onClick={() => {
                            viewDetail(item.id);
                          }}
                        >
                          <img src={item.imageModel.imageURL} alt="" style={{ objectFit:"cover",height:250}}/>
                          <div className="product-quicview">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#quickview"
                            >
                              <BsPlus style={{ marginBottom: 10 }} />
                            </a>
                          </div>
                        </div>

                        {/* Product Description */}
                        <div className="product-description">
                         
                          <p>{item.name}</p>
                          <h4 className="product-price"> {item.price}</h4>
                          {/* Add to Cart */}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </section>
        <Carousel fade>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1676971969-r79p-co-qua-anh-duoc-ve-nha-8-3.png"
              style={{ height: 400 }}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100 "
              style={{ height: 400 }}
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1677728079-Ssmc-brauer-tang-de-khang.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1678076840-UxPd-sua-abbott.png"
              style={{ height: 400 }}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
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
                  drug.length &&
                  drug.map((item, index) => {
                    return (
                      <div
                        className=" col-md-2 single_gallery_item women wow fadeInUpBig "
                        data-wow-delay="0.2s"
                      >
                        {/* Product Image */}
                        <div
                          className="product-img"
                          style={{ borderRadius: 5}}
                          onClick={() => {
                            viewDetail(item.id);
                          }}
                        >
                          <img src={item.imageModel.imageURL} alt="" style={{ objectFit:"cover",height:250}}/>
                          <div className="product-quicview">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#quickview"
                            >
                              <BsPlus style={{ marginBottom: 10 }} />
                            </a>
                          </div>
                        </div>

                        {/* Product Description */}
                        <div className="product-description">
                         
                          <p>{item.name}</p>
                          <h4 className="product-price"> {item.price}</h4>
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
