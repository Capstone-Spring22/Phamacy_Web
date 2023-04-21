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
  const myId = localStorage.getItem("id");
  const [OrderDetail, setOrderDetail] = useState([]);
  const [ProductDetail, setProductDetail] = useState([]);
  const [orderContactInfo, setOrderContactInfo] = useState([]);
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
    if (localStorage && localStorage.getItem("accessTokenUser")) {
      const accessToken = localStorage.getItem("accessTokenUser");
      const path = `Order/${myId}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("res", res.data.orderTypeId);
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
                    Home
                  </a>{" "}
                  <span class="mx-2 mb-0">/</span>{" "}
                  <strong class="text-black">Cart</strong>
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
                      <h5 className="fontagon3">Ngày Tạo: {OrderDetail.createdDate}</h5>
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
                                  {e.originalPrice.toLocaleString("en-US")} đ
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
                            {OrderDetail.subTotalPrice?.toLocaleString("en-US")} đ
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
                            {OrderDetail.discountPrice?.toLocaleString("en-US")} đ
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
                          <span style={{color:"red"}}>{OrderDetail.orderStatusName}</span>
                        </li>
                        <li style={{ fontSize: 15 }}>
                          <span>Loại Đơn Hàng</span>{" "}
                          <span>{OrderDetail.orderTypeName}</span>
                        </li>
                      </ul>

                
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    </div>
  );
};
export default ViewOrderDetail;
