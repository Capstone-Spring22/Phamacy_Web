import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarManager";
import ReactPaginate from "react-paginate";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import "../../assets/css2/dropDownAvartar.css";
import {
  getDataByPath,
  updateDataByPath,
} from "../../services/data.service";
import { Switch } from "antd";

const Drug = () => {
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let history = useHistory();

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
        Swal.fire("Duyệt Thành Công!", "", "success");
      } else if (res && res.status === 400) {
        Swal.fire("Đã Xác Nhận Không Thể Sửa", "Không Thể Sửa", "error");
      }
    }
  }
  const [activeItem, setActiveItem] = useState("ImportProduct");
  useEffect(() => {
    loadDataMedicine();
  }, [currentPage, perPage, countUs]);

  return (
    <>
      <div>
        {isLoading ? (
          <div>
            <div className="loading">
              <div className="pill"></div>
              <div className="loading-text">Loading...</div>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <div className="layout-wrapper layout-content-navbar">
              <div className="layout-container">
                <SideBar activeItem={activeItem} />

                <div
                  className="layout-page"
                  style={{ backgroundColor: "#f4f6fb", marginLeft: 260 }}
                >
                  {/* Navbar */}
                  <nav class="navbar">
                    <div class="navbar-container">
                      <a href="#" class="navbar-logo"></a>
                      <ul class="navbar-menu">
                        <li class="navbar-item">
                        
                        </li>
                      </ul>
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
                            width: 1200,
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
                              <h3 className="fontagon">Quản Lý Nhập Hàng</h3>
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
                                  marginLeft: "70%",
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
                              onPageChange={(e) =>
                                setCurrentPage(e.selected + 1)
                              }
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
          </div>
        )}
      </div>
    </>
  );
};
export default Drug;
