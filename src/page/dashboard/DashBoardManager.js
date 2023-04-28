import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarManager";

import ReactPaginate from "react-paginate";
import axios from "axios";
import {
  getDataByPath,
  createDataByPath,
  updateDataByPath,
} from "../../services/data.service";
import laptop from "../../assets/laptop.png";
import { useHistory } from "react-router-dom";
import { Switch } from "antd";
import { Link } from "react-router-dom";

const DashBoardManager = () => {
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();
  const [user, setUser] = useState([]);
  async function loadDataUserByID() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");

      console.log("localStorage", localStorage);
      const path = `User/${localStorage.userID}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("res", res.data.username);
      console.log("user", user);
      if (res !== null && res !== undefined && res.status === 200) {
        setUser(res.data);
      }
    }
  }
  const myId = localStorage.getItem("userID");
  useEffect(() => {
    loadDataUserByID();
  }, []);
  const update = (myId) => {
    localStorage.setItem("id", myId);
    history.push("/UpdateImportProduct");
  };
  const view = (myId) => {
    localStorage.setItem("id", myId);
    history.push("/ViewImportProduct");
  };
  const create = () => {
    history.push("/AddImportProduct");
  };
  const [countUs, setCountUs] = useState("2");
  async function loadDataMedicine() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `ProductImport?pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("display", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
        setTotalRecord(res.data.totalRecord);
        console.log("display", currentPage);
      }
    }
    setIsLoading(false);
  }
  async function ReleaseImport(id) {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const data = { id: id };
      const path = `ProductImport/Release`;
      const res = await updateDataByPath(path, accessToken, data);
      if (res !== null && res !== undefined && res.status === 200) {
        setCountUs(parseInt(countUs) + 1);
        Swal.fire("Update successfully!", "", "success");
      } else if (res && res.status === 400) {
        Swal.fire("Đã Xác Nhận Không Thể Sửa", "Không Thể Sửa", "error");
      }
    }
  }
  const [activeItem, setActiveItem] = useState("DashBoardManager");
  useEffect(() => {
    loadDataMedicine();
  }, [currentPage, perPage, countUs]);
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
                  <div style={{marginLeft:450}}>   <div >Xin Chào, <strong>{user.fullname}</strong>.</div>
                <div >Hiện bạn đang làm việc tại chi nhánh: <strong>{user.siteName}</strong> </div></div>
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
                      style={{ width: 770, marginLeft: 29,height:175 }}
                    >
                      <div className="d-flex align-items-end row">
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary">Xin Chào, <strong>{user.fullname}</strong></h5>
                            <div >Hiện bạn đang làm việc tại chi nhánh: <strong>{user.siteName}</strong> </div>
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
                      <div className="col-lg-11 col-md-12 col-6 mb-4">
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
                            <h3 className="card-title mb-2">{totalRecord}</h3>
                            <Link
                            to="/ImportProduct"
                              className=" fw-semibold"
                              style={{ color: "#abc8f0" }}
                            >
                              Xem Thêm
                            </Link>
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
                        width: 1160,
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
                          <h3 className="fontagon">Nhập Sản Phẩm</h3>
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
                              marginLeft: "74%",
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
                                    &nbsp; &nbsp;Tên Quản Lý
                                  </th>
                                  <th
                                    style={{
                                      backgroundColor: "#f6f9fc",
                                      borderColor: "white",
                                      color: "#bfc8d3",
                                    }}
                                  >
                                    Ngày Nhập
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

                                  <th
                                    style={{
                                      backgroundColor: "#f6f9fc",
                                      borderColor: "white",
                                      color: "#bfc8d3",
                                    }}
                                  >
                                    Cập Nhật
                                  </th>
                                  <th
                                    style={{
                                      backgroundColor: "#f6f9fc",
                                      borderColor: "white",
                                      color: "#bfc8d3",
                                    }}
                                  >
                                    Xác Nhận
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="table-border-bottom-0">
                                {drug &&
                                  drug.length &&
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
                                          &nbsp; &nbsp;{e.managerName}
                                        </td>
                                        <td>
                                          {new Date(
                                            e.importDate
                                          ).toLocaleString("vi-VN", {
                                            timeZone: "Asia/Ho_Chi_Minh",
                                          })}
                                        </td>
                                        <td>
                                          {e.totalPrice.toLocaleString("en-US")}{" "}
                                          đ
                                        </td>
                                        <td>
                                          {e.isReleased === true ? (
                                            <a
                                              class="button-81"
                                              role="button"
                                              href="#my-dialog2"
                                              onClick={() => {
                                                view(e.id);
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
                                        <td>
                                          <Switch
                                            checked={e.isReleased}
                                            onChange={async () => {
                                              ReleaseImport(e.id);
                                            }}
                                          />
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
export default DashBoardManager;
