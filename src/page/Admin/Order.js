import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SideBar from "../sidebar/SideBarPharmacist";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { getDataByPath } from "../../services/data.service";
import ReactPaginate from "react-paginate";
import { Header } from "antd/es/layout/layout";
const Order = () => {
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [totalRecord, setTotalRecord] = useState([]);
  const [acceptable, setAcceptable] = useState("");

  let history = useHistory();
  const update = (myId) => {
    localStorage.setItem("orderIdPharmacist", myId);
    history.push("/OrderDetail");
  };
  const NotAcceptable = [
    { name: "Tất Cả Đơn", value: "" },
    { name: "Đơn Chờ Xử Lý", value: true },
    { name: "Đơn Đang Thực Hiện", value: false },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  async function loadDataOrder2(acceptable) {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (acceptable === true || acceptable === "") {
        const path = `Order?NotAcceptable=${acceptable}&&pageIndex=${currentPage}&pageItems=${perPage}`;
        const res = await getDataByPath(path, accessToken, "");
        console.log("check", res);
        if (res !== null && res !== undefined && res.status === 200) {
          setDrug(res.data.items);
          setTotalRecord(res.data.totalRecord);
        }
      } else if (acceptable === false) {
        const path = `Order?NotAcceptable=${acceptable}&ShowOnlyPharmacist=true&isCompleted=false&pageIndex=${currentPage}&pageItems=${perPage}`;
        const res = await getDataByPath(path, accessToken, "");
        console.log("check", res);
        if (res !== null && res !== undefined && res.status === 200) {
          setDrug(res.data.items);
          setTotalRecord(res.data.totalRecord);
        }
      }
    }
  }
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
  const [activeItem, setActiveItem] = useState("Order");
  useEffect(() => {
    loadDataOrder2(acceptable);
  }, [acceptable, currentPage, perPage]);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar activeItem={activeItem} />
          <div className="layout-page" style={{ backgroundColor: "#f4f6fb" }}>
            {/* Navbar */}
            <nav
              className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
              id="layout-navbar"
              style={{ marginLeft: 100 }}
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
                <div style={{marginLeft:470}}>   <div >Xin Chào, <strong>{user.fullname}</strong>.</div>
                <div >Hiện bạn đang làm việc tại chi nhánh: <strong>{user.siteName}</strong> </div></div>
             
              </div>
             
            </nav>

            {/* / Navbar */}
            {/* Content wrapper */}
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
                      width: 1300,
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
                        <h3 className="fontagon">Quản Lý Đơn Hàng</h3>
                      </h5>
                    </div>
                    <div style={{ display: "flex" }}>
                      {NotAcceptable &&
                        NotAcceptable.length > 0 &&
                        NotAcceptable.map((e, index) => {
                          return (
                            <div
                              onClick={() => {
                                {
                                  setAcceptable(e.value);
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
                              &nbsp; &nbsp;Mã Đơn Hàng
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              Loại Đơn Hàng
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
                              Trạng Thái Đơn Hàng
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              Trạng Thái
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              Ngày Tạo Đơn Hàng
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
                            drug.length &&
                            drug.map((e) => {
                              const date = new Date(e.createdDate);
                              const createDateVN = date.toLocaleString(
                                "vi-VN",
                                {
                                  timeZone: "Asia/Ho_Chi_Minh",
                                }
                              );
                              return (
                                <tr key={e.id}>
                                  <td>&nbsp; &nbsp;{e.id}</td>
                                  <td>{e.orderTypeName}</td>
                                  <td>
                                    {e.totalPrice.toLocaleString("en-US")} đ
                                  </td>
                                  <td>{e.orderStatusName}</td>
                                  {e.needAcceptance === true ? (
                                    <td>Chưa Xác Nhận</td>
                                  ) : (
                                    <td>Đã Xác Nhận</td>
                                  )}
                                  <td>{createDateVN}</td>
                                  <td>
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

                <div className="content-backdrop fade" />
              </div>
            </div>
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </>
  );
};
export default Order;
