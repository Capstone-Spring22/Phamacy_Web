import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarOwner";

import ReactPaginate from "react-paginate";
import axios from "axios";
import {
  getDataByPath,
  createDataByPath,
  updateDataByPath,
} from "../../services/data.service";
import laptop from "../../assets/laptop.png";
import { useHistory } from "react-router-dom";

const DashBoardOwner = () => {
  const [activeItem, setActiveItem] = useState("DashBoardOwner");
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [totalRecord, setTotalRecord] = useState([]);
  const [totalSub, setTotalSub] = useState([]);
  const [totalCategory, setTotalCategory] = useState([]);
  const [totalDrug, setTotalDrug] = useState([]);
  const [totalSite, setTotalSite] = useState([]);
  let history = useHistory();

  const update = (myId) => {
    localStorage.setItem("id", myId);

    history.push("/UpdateDiscount");
  };
  const create = () => {
    history.push("/NewDiscount");
  };
  async function loadDataCategory() {
    const path = `MainCategory?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setTotalCategory(res.data.totalRecord);
    }
  }
  async function loadDataSite() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Site?pageIndex=${currentPage}&pageItems=${perPage}`;

      const res = await getDataByPath(path, accessToken, "");

      if (res !== null && res !== undefined && res.status === 200) {
        setTotalSite(res.data.totalRecord);
      
      }
    }
  }
  async function loadDataMedicine() {
    const path = `Product?isSellFirstLevel=true&pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setTotalDrug(res.data.totalRecord);
    }
  }
  async function loadDataSubCategory() {
    const path = `SubCategory?pageIndex=1&pageItems=20`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setTotalSub(res.data.totalRecord);
    }
  }
  async function loadDataDiscount() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `ProductDiscount?pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("display", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
        setTotalRecord(res.data.totalRecord);
        console.log("display", currentPage);
      }
    }
  }
  useEffect(() => {
    loadDataCategory();
  }, []);
  useEffect(() => {
    loadDataSubCategory();
  }, []);
  useEffect(() => {
    loadDataSite();
  }, []);
  useEffect(() => {
    loadDataMedicine();
  }, []);
  useEffect(() => {
    loadDataDiscount();
  }, [currentPage, perPage]);
  return (
    <>
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
                    
                  </div>
                </div>
                {/* /Search */}
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  {/* Place this tag where you want the button to render. */}
              
                  {/* User */}
                  <li className="nav-item navbar-dropdown dropdown-user dropdown">
                    <a
                      className="nav-link dropdown-toggle hide-arrow"
                      href="javascript:void(0);"
                      data-bs-toggle="dropdown"
                    >
                      <div className="avatar avatar-online">
                        <img
                          src="../assets/img/avatars/1.png"
                          alt=""
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </a>
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
                        <a
                          className="dropdown-item"
                          href="auth-login-basic.html"
                        >
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
            {/* / Navbar */}
            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-lg-8 mb-4 order-0">
                    <div
                      className="card"
                      style={{ width: 770, marginLeft: 29 }}
                    >
                      <div className="d-flex align-items-end row">
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary">Chào Mừng</h5>
                            <p className="mb-4">
                              Chúc bạn một ngày làm việc vui vẻ và thuận lợi.
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-5 text-center text-sm-left">
                          <div className="card-body pb-0 px-0 px-md-4">
                            <img
                              src={laptop}
                              style={{ height: 150 }}
                              alt="View Badge User"
                              data-app-dark-img="illustrations/man-with-laptop-dark.png"
                              data-app-light-img="illustrations/man-with-laptop-light.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 order-1">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <div className="rounded">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-capsule"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429l4.243 4.242Z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">
                              Tổng Sản Phẩm
                            </span>
                            <h3 className="card-title mb-2">{totalDrug}</h3>
                            <small
                              className=" fw-semibold"
                              style={{ color: "#abc8f0" }}
                            >
                              Xem Thêm
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-building"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z" />
                                </svg>
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">Tổng Chi Nhánh</span>
                            <h3 className="card-title text-nowrap mb-1">{totalSite}</h3>
                            <small
                              className=" fw-semibold"
                              style={{ color: "#abc8f0" }}
                            >
                              Xem Thêm
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Total Revenue */}
                  <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                    {/* Basic Bootstrap Table */}
                    <div
                      className="card"
                      style={{
                        backgroundColor: "#ffffff",
                        width: 770,
                        marginLeft: 29,
                        borderRadius: 5,
                        border: "none",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <h5
                          className="card-header"
                          style={{
                            padding: "20px 21px",
                            backgroundColor: "#ffffff",
                            borderColor: "white",
                          }}
                        >
                          <h3 className="fontagon">Quản Lý Giảm Giá</h3>
                        </h5>

                        <>
                          <a
                            className=" button-28"
                            href="#my-dialog"
                            onClick={create}
                            style={{
                              height: 30,
                              width: 80,
                              fontSize: 13,
                              paddingTop: 5,
                              marginLeft: "54%",
                              marginTop: "20px",
                              backgroundColor: "#82AAE3",
                              color: "white",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="13"
                              fill="currentColor"
                              class="bi bi-plus-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            &nbsp; Thêm
                          </a>
                        </>
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
                                &nbsp; &nbsp;Tên
                              </th>
                              <th
                                style={{
                                  backgroundColor: "#f6f9fc",
                                  borderColor: "white",
                                  color: "#bfc8d3",
                                }}
                              >
                                Giảm Giá
                              </th>

                              <th
                                style={{
                                  backgroundColor: "#f6f9fc",
                                  borderColor: "white",
                                  color: "#bfc8d3",
                                }}
                              >
                                Trạng thái
                              </th>

                              <th
                                style={{
                                  backgroundColor: "#f6f9fc",
                                  borderColor: "white",
                                  color: "#bfc8d3",
                                }}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="table-border-bottom-0">
                            {drug &&
                              drug.length > 0 &&
                              drug.map((e) => {
                                return (
                                  <tr key={e.id}>
                                    <td
                                      style={{
                                        width: 10,
                                        whiteSpace: "nowrap",
                                        overFlow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      &nbsp; &nbsp;{e.title}
                                    </td>
                                    <td>
                                      {e.discountPercent === null
                                        ? `Giảm thẳng ${e.discountMoney.toLocaleString(
                                            "en-US"
                                          )} đ`
                                        : e.discountMoney === null
                                        ? `Giảm ${e.discountPercent}%`
                                        : `${
                                            e.discountPercent
                                          }% ${e.discountMoney.toLocaleString(
                                            "en-US"
                                          )} đ`}
                                    </td>

                                    <td>{e.status}</td>
                                    <td>
                                      {e.status === "Đã kết thúc" ? (
                                        <a
                                          class="button-81"
                                          role="button"
                                          href="#my-dialog2"
                                          onClick={() => {
                                            update(e.id);
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-eye"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                          </svg>
                                        </a>
                                      ) : (
                                        <a
                                          class="button-81"
                                          role="button"
                                          href="#my-dialog2"
                                          onClick={() => {
                                            update(e.id);
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-pencil-square"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                              fill-rule="evenodd"
                                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                            />
                                          </svg>
                                        </a>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>

                        <ReactPaginate
                          className="pagination "
                          breakLabel="..."
                          nextLabel=">"
                          previousLabel="< "
                          nextClassName="next-button"
                          pageClassName="page-item"
                          activeClassName="ac"
                          previousClassName="previous-button"
                          pageCount={totalRecord / perPage}
                          onPageChange={(e) => setCurrentPage(e.selected + 1)}
                          currentPage={currentPage}
                        />
                      </div>
                    </div>
                  </div>
                  {/*/ Total Revenue */}
                  <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                    <div className="row">
                      <div className="col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                              <svg
                                  style={{ margin: "5" }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-bookmark-check"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                  />
                                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                </svg>
                              </div>
                            </div>
                            <span className="d-block mb-1">
                              Tổng Danh Mục Phụ
                            </span>
                            <h3 className="card-title text-nowrap mb-2">
                              {totalSub}
                            </h3>
                            <small
                              className=" fw-semibold"
                              style={{ color: "#abc8f0" }}
                            >
                              Xem Thêm
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <svg
                                  style={{ margin: "5" }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-bookmark-check"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                  />
                                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                </svg>
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">
                              Tổng Danh Mục
                            </span>
                            <h3 className="card-title mb-2">{totalCategory}</h3>
                            <small
                              className=" fw-semibold"
                              style={{ color: "#abc8f0" }}
                            >
                              Xem Thêm
                            </small>
                          </div>
                        </div>
                      </div>
                      {/* </div>
    <div class="row"> */}
                      <div className="col-12 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                              <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                <div className="card-title">
                                  <h5 className="text-nowrap mb-2">
                                    Tổng Chương Trình Giảm Giá
                                  </h5>
                                  <span className="badge bg-label-warning rounded-pill">
                                    Year 2023
                                  </span>
                                </div>
                                <div className="mt-sm-auto">
                                  <h3 className="mb-0">20</h3>
                                  <small
                                    className=" fw-semibold"
                                    style={{ color: "#abc8f0" }}
                                  >
                                    Xem Thêm
                                  </small>
                                </div>
                              </div>
                              <div id="profileReportChart" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* / Content */}
              {/* Footer */}
              
              {/* / Footer */}
              <div className="content-backdrop fade" />
            </div>
            {/* Content wrapper */}
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </>
  );
};
export default DashBoardOwner;
