import { useEffect, useState } from "react";
import React, { Fragment } from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarPharmacist";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { Link } from "react-router-dom";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
  updateDataByPath,
} from "../../services/data.service";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import axios from "axios";
const OrderDetail = () => {
  const myId = localStorage.getItem("id");
  const [OrderDetail, setOrderDetail] = useState([]);
  const [ProductDetail, setProductDetail] = useState([]);
  const [orderContactInfo, setOrderContactInfo] = useState([]);
  const [orderDelivery, setOrderDelivery] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderStatusId, setOrderStatusId] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionStatus, setDescriptionStatus] = useState("");
  async function loadDataOrderById() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Order/${myId}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("res", res.data.orderTypeId);
      if (res !== null && res !== undefined && res.status === 200) {
        console.log("cc", OrderDetail);
        setOrderDetail(res.data);
        setProductDetail(res.data.orderProducts);
        setOrderContactInfo(res.data.orderContactInfo);
        setOrderDelivery(res.data.orderDelivery);
      }
    }
  }
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
  async function confirmOrder() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const deviceId = await axios
        .get("https://api.ipify.org/?format=json")
        .then((res) => res.data.ip);
      const data = {
        orderId: OrderDetail.id,
        isAccept: true,
        description: description,
        ipAddress: deviceId,
      };
      const path = `Order/ValidateOrder`;

      const res = await updateDataByPath(path, accessToken, data);
      console.log("res", res);
      if (res !== null && res !== undefined && res.status === 200) {
        Swal.fire("Xác Nhận Thành Công", "", "success");
        loadDataOrderById();
      }
    }
  }
  async function updateStatusOrder() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");

      const data = {
        orderId: OrderDetail.id,
        orderStatusId: OrderDetail.orderStatus,
        description: descriptionStatus,
      };
      const path = `Order/ExecuteOrder`;
      console.log("res", data);
      const res = await updateDataByPath(path, accessToken, data);
      console.log("res", res);
      if (res !== null && res !== undefined && res.status === 200) {
        Swal.fire("Cập Nhật Trạng Thái Thành Công", "", "success");
        loadDataOrderById();
      }
    }
  }
  const handleStatus = (event) => {
    event.preventDefault();
    const orderStatusId = event.target.value;
    setOrderStatusId(orderStatusId);
  };
  async function rejectOrder() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const deviceId = await axios
        .get("https://api.ipify.org/?format=json")
        .then((res) => res.data.ip);
      const data = {
        orderId: OrderDetail.id,
        isAccept: false,
        description: description,
        ipAddress: deviceId,
      };
      console.log("data", data);
      const path = `Order/ValidateOrder`;
      const res = await updateDataByPath(path, accessToken, data);
      console.log("res", res);
      if (res !== null && res !== undefined && res.status === 200) {
        Swal.fire("Từ Chối Thành Công", "", "success");
        loadDataOrderById();
      }
    }
  }
  const date = new Date(OrderDetail.createdDate);

  const createDateVN =
    date.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
  let OrderStatus;
  if (OrderDetail.pharmacistId === null) {
    OrderStatus = (
      <>
        <div className="mb-3" style={{ width: "95%" }}>
          <div className="input-group input-group-merge">
            <div
              type="text"
              id="basic-icon-default-fullname"
              placeholder="Tên Sản Phẩm"
              aria-label="Tên Sản Phẩm"
              aria-describedby="basic-icon-default-fullname2"
            >
              Vui Lòng Xác Nhận Đơn Hàng
            </div>
          </div>

          <a
            href="#my-dialog"
            onClick={() => {
              setIsOpen(true);
            }}
            className="button-28"
            style={{
              height: 40,
              width: 200,
              fontSize: 13,
              paddingTop: 10,

              marginTop: "20px",
              marginBottom: -20,
              backgroundColor: "#82AAE3",
              color: "white",
            }}
          >
            Xác Nhận Đơn Hàng
          </a>
        </div>
      </>
    );
  } else if (OrderDetail.pharmacistId === localStorage.getItem("userID")) {
    OrderStatus = (
      <>
        <div className="mb-3" style={{ width: "95%" }}>
          <div className="input-group input-group-merge">
            <div
              type="text"
              id="basic-icon-default-fullname"
              placeholder="Tên Sản Phẩm"
              aria-label="Tên Sản Phẩm"
              aria-describedby="basic-icon-default-fullname2"
            >
              Cập nhật
            </div>
          </div>

          <a
            href="#my-dialog2"
            onClick={() => {
              setIsOpen2(true);
            }}
            className="button-28"
            style={{
              height: 40,
              width: 200,
              fontSize: 13,
              paddingTop: 10,

              marginTop: "20px",
              marginBottom: -20,
              backgroundColor: "#82AAE3",
              color: "white",
            }}
          >
            Cập nhật trạng thái
          </a>
        </div>
      </>
    );
  } else if (OrderDetail.pharmacistId !== localStorage.getItem("userID")) {
    OrderStatus = (
      <>
        <div className="mb-3" style={{ width: "95%" }}>
          <div className="input-group input-group-merge">
            <div
              type="text"
              id="basic-icon-default-fullname"
              placeholder="Tên Sản Phẩm"
              aria-label="Tên Sản Phẩm"
              aria-describedby="basic-icon-default-fullname2"
            >
              Tình trạng
            </div>
          </div>

          <a
            href="#my-dialog3"
            className="button-28"
            style={{
              height: 40,
              width: 200,
              fontSize: 13,
              paddingTop: 10,

              marginTop: "20px",
              marginBottom: -20,
              backgroundColor: "#82AAE3",
              color: "white",
            }}
          >
            Đơn hàng đã được xác nhận bởi thằng khác
          </a>
        </div>
      </>
    );
  }

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar activeItem={activeItem} />

        <div
          className="layout-page"
          style={{ backgroundColor: "#f4f6fb", marginLeft: 260 }}
        >
          {/* Navbar */}
          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a
                className="nav-item nav-link px-0 me-xl-4"
                href="javascript:void(0)"
              >
                <i className="bx bx-menu bx-sm" />
              </a>
            </div>
            <div
              className="navbar-nav-right d-flex align-items-center"
              id="navbar-collapse"
            >
              {/* Search */}
              <div className="navbar-nav align-items-center">
                <div className="nav-item d-flex align-items-center">
                  <i className="bx bx-search fs-4 lh-0" />
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                  />
                </div>
              </div>
              {/* /Search */}
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* Place this tag where you want the button to render. */}
                <li className="nav-item lh-1 me-3">
                  <a
                    className="github-button"
                    href="https://github.com/themeselection/sneat-html-admin-template-free"
                    data-icon="octicon-star"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                  >
                    Star
                  </a>
                </li>
                {/* User */}

                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <Link
                    className="nav-link dropdown-toggle hide-arrow"
                    to="/Profile"
                    data-bs-toggle="dropdown"
                  >
                    <div className="avatar avatar-online">
                      <img
                        src="https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg"
                        alt=""
                        className="w-px-40 h-auto rounded-circle"
                      />
                    </div>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <img
                                src="../assets/img/avatars/1.png"
                                alt=""
                                className="w-px-40 h-auto rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">
                              John Doe
                            </span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-user me-2" />
                        <span className="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-cog me-2" />
                        <span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="d-flex align-items-center align-middle">
                          <i className="flex-shrink-0 bx bx-credit-card me-2" />
                          <span className="flex-grow-1 align-middle">
                            Billing
                          </span>
                          <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                            4
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="auth-login-basic.html">
                        <i className="bx bx-power-off me-2" />
                        <span className="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>

                {/*/ User */}
              </ul>
            </div>
          </nav>
          <div
            className={`dialog overlay ${isOpen2 ? "" : "hidden"}`}
            id="my-dialog2"
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
                    <h5 className="mb-0">Xác Nhận Đơn Hàng</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div
                        style={{
                          display: "grid",

                          padding: 30,
                        }}
                      >
                        <div
                          className="input-group input-group-merge"
                          style={{ width: "95%" }}
                        >
                          <select
                            name="city"
                            id="basic-icon-default-email"
                            className="form-control"
                            onChange={(e) => {
                              setOrderDetail({
                                ...OrderDetail,
                                orderStatus: e.target.value,
                              });
                            }}
                            value={OrderDetail.orderStatus}
                          >
                            {orderStatus &&
                              orderStatus.length &&
                              orderStatus.map((e, index) => {
                                return (
                                  <>
                                    <option
                                      key={e.orderStatusId}
                                      value={e.orderStatusId}
                                    >
                                      {e.orderStatusName}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Mô Tả
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
                              onChange={(e) =>
                                setDescriptionStatus(e.target.value)
                              }
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
                            updateStatusOrder();
                          }}
                          style={{
                            height: 30,
                            width: 80,
                            fontSize: 13,
                            marginLeft: 23,

                            backgroundColor: "#82AAE3",
                            color: "white",
                          }}
                        >
                          Xác Nhận
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`dialog overlay ${isOpen ? "" : "hidden"}`}
            id="my-dialog"
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
                    <h5 className="mb-0">Xác Nhận Đơn Hàng</h5>
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
                            Mô Tả
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
                              onChange={(e) => setDescription(e.target.value)}
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
                            rejectOrder();
                          }}
                          style={{
                            height: 30,
                            width: 80,
                            fontSize: 13,
                            paddingTop: 1,
                            marginLeft: "35%",

                            backgroundColor: "#DF2E38",
                            color: "white",
                          }}
                        >
                          Từ Chối
                        </button>
                        <button
                          type="submit"
                          className="button-28"
                          onClick={(e) => {
                            e.preventDefault();
                            confirmOrder();
                          }}
                          style={{
                            height: 30,
                            width: 80,
                            fontSize: 13,
                            marginLeft: 23,

                            backgroundColor: "#82AAE3",
                            color: "white",
                          }}
                        >
                          Xác Nhận
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* / Navbar */}
          {/* Content wrapper */}
          <div style={{ display: "flex" }}>
            <div>
              <div className="content-wrapper">
                {/* Content */}
                <div className="container-xxl flex-grow-1 container-p-y">
                  {/* Basic Bootstrap Table */}
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      width: 870,
                      margin: 30,
                      borderRadius: 5,
                      border: "none",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <h5
                        className="card-header"
                        style={{
                          padding: "20px 24px",
                          backgroundColor: "#ffffff",
                          borderColor: "white",
                        }}
                      >
                        <h3 className="fontagon">Sản Phẩm Của Đơn Hàng</h3>
                      </h5>

                      <></>
                    </div>

                    <div className="table-responsive ">
                      <table className="table">
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
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              &nbsp; &nbsp;Hình ảnh
                            </th>

                            <th
                              style={{
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
                          </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
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
                                  <td>{e.priceTotal.toLocaleString("en-US")}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="content-backdrop fade" />
              </div>
              <div
                className="row "
                style={{ width: 900, marginTop: -30, marginLeft: 25 }}
              >
                <div className="col-xl">
                  <div className="card mb-4">
                    <div
                      className="card-header d-flex justify-content-between align-items-center"
                      style={{
                        height: 70,
                        backgroundColor: "white",
                        padding: "20px 24px",

                        borderColor: "#f4f4f4",
                      }}
                    >
                      <h5 className="mb-0">Thông Tin Đơn Hàng</h5>
                    </div>
                    <div className="card-body">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto",
                          padding: 30,
                          marginLeft: 100,
                          height: 420,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-fullname"
                          >
                            Mã Đơn hàng
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.id}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "100%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-company"
                          >
                            Loại Đơn Hàng
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.orderTypeName}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Trạng thái Đơn Hàng
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.orderStatusName}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Trạng Thái Thanh Toán
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.isPaid === true ? (
                                <div>Đã Thanh Toán</div>
                              ) : (
                                <div>Chưa Thanh toán</div>
                              )}
                            </div>
                          </div>
                        </div>
                     
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Ngày Tạo Đơn Hàng
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {createDateVN}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Xác Nhận
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.needAcceptance === true ? (
                                <div>Cần Được Xác Nhận</div>
                              ) : (
                                <div>Đã Xác Nhận</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Mô Tả
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.note}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="row " style={{ width: 300, marginTop: 55 }}>
                <div className="col-xl">
                  <div className="card mb-4">
                    <div
                      className="card-header d-flex justify-content-between align-items-center"
                      style={{
                        height: 70,
                        backgroundColor: "white",
                        padding: "20px 24px",

                        borderColor: "#f4f4f4",
                      }}
                    >
                      <h5 className="mb-0">Xác Nhận Đơn Hàng</h5>
                    </div>
                    <div className="card-body">
                      <div
                        style={{
                          display: "grid",

                          padding: 15,
                        }}
                      >
                        {OrderStatus}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row " style={{ width: 300 }}>
                <div className="col-xl">
                  <div className="card mb-4">
                    <div
                      className="card-header d-flex justify-content-between align-items-center"
                      style={{
                        height: 70,
                        backgroundColor: "white",
                        padding: "20px 24px",

                        borderColor: "#f4f4f4",
                      }}
                    >
                      <h5 className="mb-0">Thông Tin Người Dùng</h5>
                    </div>
                    <div className="card-body">
                      <div
                        style={{
                          display: "grid",

                          padding: 20,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Tên Người mua
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {orderContactInfo.fullname}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Số điện Thoại Người mua
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {orderContactInfo.phoneNumber}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Email Người mua
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              style={{ flexWrap: "wrap", width: 220 }}
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {orderContactInfo.email}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Địa Chỉ Của Người Mua
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {orderDelivery?.fullyAddress}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </div>
  );
};
export default OrderDetail;
