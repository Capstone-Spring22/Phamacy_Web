import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarOwner";
import ReactPaginate from "react-paginate";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import "../../assets/css2/dropDownAvartar.css";
import { getDataByPath, deleteDataByPath } from "../../services/data.service";
import { Link } from "react-router-dom";

const Drug = () => {
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subCategory, setSubCategory] = useState([]);
  const [totalSite, setTotalSite] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const [isOpen, setIsOpen] = useState(true);
  let history = useHistory();

  async function loadDataCategory() {
    const path = `SubCategory?pageIndex=1&pageItems=20`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setSubCategory(res.data.items);
  
    }
  }
  useEffect(() => {
    loadDataCategory();
  }, []);
  const update = (myId) => {
    localStorage.setItem("id", myId);
    history.push("/UpdateDrug");
  };
  const create = (myId) => {
    localStorage.setItem("id", myId);
    history.push("/NewDrug");
  };
  async function Authen() {
    if (localStorage && localStorage.getItem("roleID")) {
      const roleID = localStorage.getItem("roleID");
      if (roleID !== "Owner") {
        history.push("/LoginAdmin");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("roleID");
        return null;
      }
    }
  }
  useEffect(() => {
    Authen();
  }, []);
  async function loadDataMedicine() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Product?isSellFirstLevel=true&pageIndex=${currentPage}&pageItems=${perPage}`;
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
  const [activeItem, setActiveItem] = useState("Drug");
  useEffect(() => {
    loadDataMedicine();
  }, [currentPage, perPage]);

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

                        {/*/ User */}
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
                              <h3 className="fontagon">Quản lý sản phẩm</h3>
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
                                    Hình Ảnh
                                  </th>
                                  <th
                                    style={{
                                      backgroundColor: "#f6f9fc",
                                      borderColor: "white",
                                      color: "#bfc8d3",
                                    }}
                                  >
                                    &nbsp; &nbsp;Tên Sản Phẩm
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
                                    Danh Mục
                                  </th>
                                  <th
                                    style={{
                                      backgroundColor: "#f6f9fc",
                                      borderColor: "white",
                                      color: "#bfc8d3",
                                    }}
                                  >
                                    Đối Tượng
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
                                </tr>
                              </thead>
                              <tbody className="table-border-bottom-0">
                                {drug &&
                                  drug.length &&
                                  drug.map((e) => {
                                    const subCategorys = subCategory.find((sc) => sc.id === e.subCategoryId);
                                    const subCategoryName = subCategorys ? subCategorys.subCategoryName : "";
                                    return (
                                      <tr key={e.id}>
                                        <td>
                                          <img
                                            src={e.imageModel.imageURL}
                                            style={{
                                              height: 90,
                                              width: 70,
                                              borderRadius: 7,
                                              objectFit: "cover",
                                            }}
                                          />
                                        </td>
                                        <td
                                          style={{
                                            width: 400,
                                            textAlign: "left",
                                          }}
                                        >
                                          &nbsp; &nbsp;{e.name}
                                        </td>
                                        <td>{e.price.toLocaleString("en-US")} đ</td>
                                        <td>{subCategoryName}</td>
                                        <td>
                                         
                                          {e.userTargetString}
                                        </td>

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
