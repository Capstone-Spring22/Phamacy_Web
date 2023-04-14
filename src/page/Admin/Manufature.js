import { useEffect, useState  } from "react";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarOwner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import {
  getDataByPath,
createDataByPath,
  updateDataByPath,
} from "../../services/data.service";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Manufacturer = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [countryID, setCountryID] = useState("");
  const [totalSite, setTotalSite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [isOpen, setIsOpen] = useState(true);
  const [categoryUpdate, setCategoryUpdate] = useState({
    name: "",
    countryID: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const checkValidation = () => {
    if (name.trim().length === 0) {
      setErrorMessage("Tên danh mục không được để trống");
    } else {
      setErrorMessage("");
    }
    return true;
  };
  const [searchTerm, setSearchTerm] = useState("");

  async function loadDataCategory(search) {
    const path = `Manufacturer?pageIndex=${currentPage}&pageItems=${perPage}&manufacturerName=${search}`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setCategory(res.data.items);
      setTotalSite(res.data.totalRecord);
      console.log("display", currentPage);
    }
  }
  async function loadDataCategory2() {
    const path = `Manufacturer?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setCategory(res.data.items);
      setTotalSite(res.data.totalRecord);
      console.log("display", currentPage);
    }
  }
  async function loadDataMainCategoryID(id) {
    const path = `MainCategory/${id}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setCategoryUpdate(res.data);
      console.log("display 2", id);
    }
  }
  const [user, setUser] = useState([]);

  async function loadDataUserByID() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");

      const path = `User/24b2951b-fb99-411d-a15a-40d54d9130c5`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("res", res.data.username);
      console.log("user", user);
      if (res !== null && res !== undefined && res.status === 200) {
        setUser(res.data);
      }
    }
  }
  useEffect(() => {
    loadDataUserByID();
  }, []);
 

  const dataForCreate = () => {
     
    return {
        name: name,
        countryID: countryID,
    };
  };
  async function updateProducts() {
    const data = categoryUpdate;
    const path = `MainCategory`;
    const res = await updateDataByPath(path, "", data);
    console.log("checkRes", res);
    if (res && res.status === 200) {
      Swal.fire("Update successfully!", "", "success");
      setIsOpen(false);
    }
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const deleteForCreate = () => {
    setName("");
    setCountryID("");
  };
  const [activeItem, setActiveItem] = useState("Manufacturer");
  async function createNewCategory() {
    if (checkValidation()) {
      const data = dataForCreate();
      console.log("data", data);
      const path = "MainCategory";
      const res = await createDataByPath(path, "", data);
      console.log("Check res", res);
      if (res && res.status === 201) {
        Swal.fire("Update successfully!", "", "success");
        deleteForCreate();
        setIsOpen(false);
      }
    }
  }
  useEffect(() => {
    loadDataCategory2();
  }, [currentPage, perPage, searchTerm]);
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
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      placeholder="Search..."
                      aria-label="Search..."
                    />
                  </div>
                </div>
                {/* /Search */}
                
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
                          marginBottom: -100,
                          marginTop: 5,
                        }}
                      >
                        <h3 className="fontagon">Quản Lý Danh Mục</h3>
                      </h5>

                      <>
                        <a
                          className=" button-28"
                          href="#my-dialog"
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
                          onClick={() => {
                            setIsOpen(true);
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

                        <div
                          className={`dialog overlay ${isOpen ? "" : "hidden"}`}
                          id="my-dialog"
                        >
                          <a href="#" className="overlay-close" />

                          <div className="row " style={{ width: 1000 }}>
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
                                  <h5 className="mb-0">Thêm Danh Mục Mới</h5>
                                </div>
                                <div className="card-body">
                                  <form>
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "auto auto",
                                        padding: 30,
                                      }}
                                    >
                                      <div
                                        className="mb-3"
                                        style={{ width: "95%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-fullname"
                                        >
                                          Tên
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="basic-icon-default-fullname"
                                            placeholder="Tên Của Danh Mục"
                                            aria-label="John Doe"
                                         
                                            onChange={(e) => {
                                              console.log(
                                               
                                                name
                                              );
                                              setName(e.target.value);
                                            }}
                                            aria-describedby="basic-icon-default-fullname2"
                                          />
                                        </div>
                                        <div
                                          className="form-text"
                                          style={{ color: "red" }}
                                        >
                                          {errorMessage}
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "100%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-company"
                                        >
                                          Image
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="file"
                                            
                                            id="basic-icon-default-company"
                                            className="form-control"
                                            placeholder="Image"
                                            aria-label="ACME Inc."
                                            aria-describedby="basic-icon-default-company2"
                                          />
                                        </div>
                                        
                                      </div>
                                    </div>

                                    <button
                                      type="submit"
                                      className="button-28"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        createNewCategory();
                                      }}
                                      style={{
                                        height: 30,
                                        width: 80,
                                        fontSize: 13,
                                        paddingTop: 1,
                                        marginLeft: "90%",
                                        marginTop: "20px",
                                        backgroundColor: "#82AAE3",
                                        color: "white",
                                      }}
                                    >
                                      Lưu
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`dialog overlay ${isOpen ? "" : "hidden"}`}
                          id="my-dialog2"
                        >
                          <a href="#" className="overlay-close" />

                          <div className="row " style={{ width: 1000 }}>
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
                                  <h5 className="mb-0">Cập Nhật Danh Mục </h5>
                                </div>
                                <div className="card-body">
                                  <form>
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "auto auto",
                                        padding: 30,
                                      }}
                                    >
                                      <div
                                        className="mb-3"
                                        style={{ width: "95%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-fullname"
                                        >
                                          Tên
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="basic-icon-default-fullname"
                                            placeholder="Tên Danh Mục"
                                            aria-label="John Doe"
                                            aria-describedby="basic-icon-default-fullname2"
                                            value={categoryUpdate.name}
                                            onChange={(e) => {
                                              setCategoryUpdate({
                                                ...categoryUpdate,
                                                name: e.target.value,
                                              });
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "100%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-company"
                                        >
                                          Hình Ảnh
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            
                                            type="file"
                                            id="basic-icon-default-company"
                                            className="form-control"
                                            placeholder="Hình ảnh của danh mục"
                                            aria-label="ACME Inc."
                                            aria-describedby="basic-icon-default-company2"
                                          />
                                        </div>
                                      
                                      </div>
                                    </div>

                                    <button
                                      type="submit"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        updateProducts();
                                      }}
                                      className="button-28"
                                      style={{
                                        height: 30,
                                        width: 80,
                                        fontSize: 13,
                                        paddingTop: 1,
                                        marginLeft: "90%",
                                        marginTop: "20px",
                                        backgroundColor: "#82AAE3",
                                        color: "white",
                                      }}
                                    >
                                      Save
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    </div>
                    <hr />
                    <div style={{ marginLeft: 20 }}>
                      <div>
                        Search:
                        <input
                          className="input-search-table"
                          placeholder="Search Name ..."
                          onChange={(e) => {
                            loadDataCategory(e.target.value);
                          }}
                        />
                      </div>
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
                              &nbsp; &nbsp;Name
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              Xuất Xứ 
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
                          {category &&
                            category.length > 0 &&
                            category.map((e) => {
                              return (
                                <tr key={e.id}>
                                  <td>&nbsp; &nbsp;{e.manufacturerName}</td>
                                  <td>&nbsp; &nbsp;{e.countryName}</td>
                                  <td>
                                    <a
                                      class="button-81"
                                      role="button"
                                      href="#my-dialog2"
                                      onClick={() => {
                                        loadDataMainCategoryID(e.id);
                                        setIsOpen(true);
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
                        pageCount={totalSite / perPage}
                        onPageChange={(e) => handlePageChange(e.selected + 1)}
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
export default Manufacturer;
