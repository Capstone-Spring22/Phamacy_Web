import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarPharmacist";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { getDataByPath, updateDataByPath } from "../../services/data.service";

import axios from "axios";
import Footer from "./Footer";
import Header from "../Header/Header";
const ViewOrderDetail = () => {
  const myId = localStorage.getItem("Oderid");
  const [OrderDetail, setOrderDetail] = useState([]);
  const [ProductDetail, setProductDetail] = useState([]);
  const [orderContactInfo, setOrderContactInfo] = useState([]);
  const [isOpen4, setIsOpen4] = useState(false);
  const [reason, setReason] = useState("");
  const [orderDelivery, setOrderDelivery] = useState([]);
  const [actionStatus, setActionStatus] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [orderStatus, setOrderStatus] = useState([]);
  const [note, setNote] = useState([]);
  const [noteId, setNoteId] = useState("");
  const [description, setDescription] = useState("");

  const [noteUpdate, setNodeUpdate] = useState([
    { orderDetailId: "", note: "" },
  ]);
  const [descriptionStatus, setDescriptionStatus] = useState("");
  async function loadDataOrderById() {
    if (localStorage) {
      const accessToken = localStorage.getItem("accessTokenUser");
      const path = `Order/${myId}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("res", res.data);
      if (res !== null && res !== undefined && res.status === 200) {
        console.log("cc", OrderDetail);
        setOrderDetail(res.data);
        setProductDetail(res.data.orderProducts);
        setOrderContactInfo(res.data.orderContactInfo);
        setOrderDelivery(res.data.orderDelivery);
        setActionStatus(res.data.actionStatus);
      }
    }
  }
  async function handleCancelOrder() {
    const confirmed = await Swal.fire({
      title: "Bạn có chắc chắn muốn hủy đơn hàng?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
      footer:
      "Lưu ý: Hành động này sẽ không thể hoàn tác. Bạn chắc chắn muốn tiếp tục?",

    });
  
    if (confirmed.isConfirmed) {
      cancelOrder();
    }
  }
  async function updateNote() {
    if (localStorage && localStorage.getItem("accessTokenUser")) {
      const accessToken = localStorage.getItem("accessTokenUser");
      const data = noteUpdate;
      const path = `Order/UpdateOrderProductNote`;
      const res = await updateDataByPath(path, accessToken, data);
      console.log("data", data);
      if (res !== null && res !== undefined && res.status === 200) {
        setIsOpen2(false);

        Swal.fire("Thêm Ghi Chú Thành Công", "", "success");
      }
    }
  }
  const checkValidation = () => {
    if (reason.trim().length < 10) {
      Swal.fire("Lý do huỷ phải có ít nhất 10 kí tự", "", "question");
      return false;
    }
    return true;
  };
  async function cancelOrder() {
    if (localStorage) {
      const accessToken = localStorage.getItem("accessTokenUser");
      if (checkValidation()) {
      const deviceId = await axios
        .get("https://api.ipify.org/?format=json")
        .then((res) => res.data.ip);
      const data = {
        orderId: OrderDetail.id,
        reason: reason,
        ipAddress: deviceId,
      };
      console.log("data", data);
      const path = `Order/CancelOrder`;
      const res = await updateDataByPath(path, accessToken, data);
      console.log("res1212", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setIsOpen4(false);
        Swal.fire("Huỷ Thành Công", "", "success");
        loadDataOrderById();
      } else {
        Swal.fire(`${res?.errors?.Reason[0]}`, "", "error");
      }
    }}
  }
  const handleNoteID = (id) => {
    setNodeUpdate([{ ...noteUpdate, orderDetailId: id }]);
    setIsOpen(true);
  };
  const [activeItem, setActiveItem] = useState("Order");

  async function loadOrderStatusId() {
    console.log("OrderDetail", OrderDetail.orderTypeId);
    const path = `OrderStatus?OrderTypeId=${OrderDetail.orderTypeId}`;

    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setOrderStatus(res.data);
    }
  }
  useEffect(() => {
    loadOrderStatusId();
  }, [OrderDetail]);
  useEffect(() => {
    loadDataOrderById();
  }, []);

  return (
    <div>
      <Header />
      <>
        <div className="catagories-side-menu">{/*  Side Nav  */}</div>
        <div id="wrapper">
          <div class="bg-light py-3">
            <div class="container">
              <div class="row">
                <div class="col-md-12 mb-0">
                  <a
                    href="Home"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Trang chủ
                  </a>{" "}
                  <span class="mx-2 mb-0">/</span>{" "}
                  <strong class="text-black">Chi tiết đơn hàng</strong>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`dialog overlay ${isOpen4 ? "" : "hidden"}`}
            id="my-dialog4"
          >
            <a href="#" className="overlay-close" />

            <div className="row " style={{ width: 700 }}>
              <div className="col-xl">
                <div className="card mb-4">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{
                      height: 70,
                      backgroundColor: "white",

                      marginLeft: 230,
                      borderColor: "#f4f4f4",
                    }}
                  >
                    <h5 className="mb-0">Huỷ Đơn Hàng</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div
                        style={{
                          display: "grid",

                          padding: 30,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Lý do huỷ
                          </label>
                          <div className="input-group input-group-merge">
                            <textarea
                              style={{ height: 200 }}
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Viết Mô Tả "
                              aria-label="John Doe"
                              aria-describedby="basic-icon-default-fullname2"
                              onChange={(e) => setReason(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <button
                          type="submit"
                          className="button-28"
                          onClick={(e) => {
                            e.preventDefault();
                            handleCancelOrder();
                          }}
                          style={{
                            height: 30,
                            width: 80,
                            fontSize: 13,
                            paddingTop: 1,
                            marginLeft: "40%",

                            backgroundColor: "#DF2E38",
                            color: "white",
                          }}
                        >
                          Huỷ
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" section_padding_100 ">
            <div className="container">
              <div className="row">
                <div style={{ display: "flex" }}>
                  <div className="cart-table " style={{ marginTop: -22 }}>
                    <div style={{ display: "flex" }}>
                      <h5
                        className="card-header"
                        style={{
                          padding: "20px 3px",
                          backgroundColor: "#ffffff",
                          borderColor: "white",
                        }}
                      >
                        <h3 className="fontagon2">Order #{OrderDetail.id}</h3>
                        <h5 className="fontagon3">
                          Ngày Tạo: &nbsp;&nbsp;&nbsp;
                          {new Date(OrderDetail.createdDate).toLocaleString(
                            "vi-VN",
                            {
                              timeZone: "Asia/Ho_Chi_Minh",
                            }
                          )}{" "}
                        </h5>
                      </h5>

                      <></>
                    </div>
                    <table className="table table-view-order">
                      <thead
                        style={{
                          backgroundColor: "#f6f9fc",
                          borderColor: "white",
                          color: "",
                        }}
                      >
                        <tr>
                          <th
                            style={{
                              width: 160,
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            &nbsp; &nbsp;Hình ảnh
                          </th>

                          <th
                            style={{
                              width: 330,
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            Tên Sản Phẩm
                          </th>
                          <th
                            style={{
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            Số Lượng
                          </th>
                          <th
                            style={{
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            Đơn vị
                          </th>
                          <th
                            style={{
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            Giá
                          </th>
                          <th
                            style={{
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            Tổng Giá
                          </th>
                        </tr>
                      </thead>
                      <tbody className="" style={{ borderColor: "white" }}>
                        {ProductDetail &&
                          ProductDetail.length &&
                          ProductDetail.map((e) => {
                            return (
                              <tr key={e.id}>
                                <td>
                                  &nbsp; &nbsp;
                                  <img
                                    src={e.imageUrl}
                                    style={{
                                      height: 90,
                                      width: 70,
                                      borderRadius: 7,
                                      objectFit: "cover",
                                    }}
                                  />
                                </td>
                                <td>{e.productName}</td>
                                <td>{e.quantity}</td>
                                <td>{e.unitName}</td>
                                <td>
                                  {e.discountPrice.toLocaleString("en-US")} đ
                                </td>
                                <td>
                                  {" "}
                                  {e.priceTotal.toLocaleString("en-US")}đ
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>

                      <tbody>
                        <tr>
                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            &nbsp; &nbsp;Tổng Giá
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>

                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            {OrderDetail.subTotalPrice?.toLocaleString("en-US")}{" "}
                            đ
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            &nbsp; &nbsp;Giá Giảm
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>

                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            {OrderDetail.discountPrice?.toLocaleString("en-US")}{" "}
                            đ
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            &nbsp; &nbsp;Chi phí khác
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>

                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            {(
                              OrderDetail.totalPrice -
                              OrderDetail.subTotalPrice +
                              OrderDetail.discountPrice
                            ).toLocaleString("en-US")}{" "}
                            đ
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            &nbsp; &nbsp;Thành Tiền
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>

                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            {OrderDetail.totalPrice?.toLocaleString("en-US")} đ
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="col-12 col-md-6 col-lg-4 ml-lg-auto"
                    style={{ marginTop: -22 }}
                  >
                    <div
                      className="order-details-confirmation"
                      style={{
                        width: 500,
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        border: "none",
                        borderRadius: 10,
                      }}
                    >
                      <div className="cart-page-heading">
                        <h5>Thông Tin Thanh Toán</h5>
                        <p>Thông tin</p>
                      </div>

                      <ul
                        className="order-details-form "
                        style={{ padding: 0, fontSize: 20 }}
                      >
                        <li style={{ fontSize: 15 }}>
                          <span>Têm Người Mua</span>{" "}
                          <span>{orderContactInfo.fullname}</span>
                        </li>
                        <li style={{ fontSize: 15 }}>
                          <span>Số Điện Thoại</span>{" "}
                          <span>{orderContactInfo.phoneNumber}</span>
                        </li>

                        <li style={{ fontSize: 15 }}>
                          <span>Trạng Thái Đơn Hàng</span>{" "}
                          <span style={{ color: "red" }}>
                            {OrderDetail.orderStatusName}
                          </span>
                        </li>
                        <li style={{ fontSize: 15 }}>
                          <span>Loại Đơn Hàng</span>{" "}
                          <span>{OrderDetail.orderTypeName}</span>
                        </li>
                        {OrderDetail.orderStatusName === "Chờ xác nhận" ? <a
                          href="#my-dialog4"
                          onClick={() => {
                            setIsOpen4(true);
                          }}
                          style={{
                            height: 50,
                            backgroundColor: "red",
                            color: "white",
                            paddingTop: 13,
                            fontSize: 17,
                          }}
                          className="button-28"
                        >
                          Huỷ đơn hàng
                        </a>:<div></div>}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </>
    </div>
  );
};
export default ViewOrderDetail;
