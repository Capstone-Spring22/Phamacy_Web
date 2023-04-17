import { useEffect, useState } from "react";
import SideBar from "../sidebar/SideBarOwner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import ReactPaginate from "react-paginate";
import {
  getDataByPath,
  createDataByPath,
  updateDataByPath,
} from "../../services/data.service";
import axios from "axios";
import Swal from "sweetalert2";
const SubCategory = () => {
  const [subCategory, setSubCategory] = useState([]);
  const [totalSite, setTotalSite] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [isOpen, setIsOpen] = useState(true);
  const [categorySelect, setCategorySelect] = useState(false);
  const [categoryUpdate, setCategoryUpdate] = useState({
    subCategoryName: "",
    mainCategoryId: "",
    imageUrl: "",
  });

  async function loadDataCategory() {
    const path = `SubCategory?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setSubCategory(res.data.items);
      setTotalSite(res.data.totalRecord);
    }
  }
  const checkValidation = () => {
    // if (id.trim() === "") {
    //   Swal.fire("ID Can't Empty", "", "question");
    //   return false;
    // }
    return true;
  };
  async function createNewCategory() {
    if (checkValidation()) {
      const data = dataForCreate();
      const path = "SubCategory";
      const res = await createDataByPath(path, "", data);
      console.log("Check res", res);
      if (res && res.status === 201) {
        Swal.fire("Create Success", "", "success");
        deleteForCreate();

        setIsOpen(false);
      }
    }
  }
  async function loadDataSubCategoryID(id) {
    const path = `SubCategory/${id}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setCategoryUpdate(res.data);
      console.log("display 2", id);
    }
  }

  const dataForCreate = () => {
    console.log("display", mainCategoryId);
    return {
      subCategoryName: subCategoryName,
      mainCategoryId: mainCategoryId,
      imageUrl: imageUrl,
    };
  };
  const deleteForCreate = () => {
    setSubCategoryName("");
    setMainCategoryId("");
    setImageUrl("");
  };
  const handleMainCategory = (event) => {
    event.preventDefault();
    const mainCategoryId = event.target.value;
    setMainCategoryId(mainCategoryId);
  };

  async function loadDataMainCategory() {
    const path = `MainCategory?pageIndex=${currentPage}&pageItems=100`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setMainCategory(res.data.items);
    }
  }

  async function updateProducts() {
    const data = categoryUpdate;
    const path = `SubCategory  `;
    const res = await updateDataByPath(path, "", data);
    console.log("checkRes", res);
    if (res && res.status === 200) {
      Swal.fire("Update successfully!", "", "success");
      setIsOpen(false);
    }
  }
  async function createNewURL(e) {
    if (checkValidation()) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);

      const res = await axios.post(
        "https://betterhealthapi.azurewebsites.net/api/v1/Utility/UploadFile",
        data
      );
      console.log("display", res.data);
      if (res && res.status === 200) {
        setCategoryUpdate({
          ...categoryUpdate,
          imageUrl: res.data,
        });
      }
    }
  }
  async function createNewURLAdd(e) {
    if (checkValidation()) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);

      const res = await axios.post(
        "https://betterhealthapi.azurewebsites.net/api/v1/Utility/UploadFile",
        data
      );
      console.log("display", res.data);
      if (res && res.status === 200) {
        setImageUrl(res.data);
      }
    }
  }
  const [activeItem, setActiveItem] = useState("SubCategory");
  useEffect(() => {
    loadDataCategory();
  }, [currentPage, perPage]);
  useEffect(() => {
    loadDataMainCategory();
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
                        }}
                      >
                        <h3 className="fontagon">Quản Lý Danh Mục Phụ</h3>
                      </h5>

                      <>
                        <a
                          className=" button-28"
                          href="#my-dialog"
                          onClick={() => {
                            setIsOpen(true);
                          }}
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
                                  <h5 className="mb-0">
                                    Thêm Danh Mục Phụ Mới
                                  </h5>
                                </div>
                                <div className="card-body">
                                  <form>
                                  {imageUrl && (
                                          <img
                                            style={{
                                              height: 200,
                                              width: 200,
                                              objectFit: "cover",
                                              marginLeft:300,
                                              marginTop:10
                                            }}
                                            src={imageUrl}
                                          />
                                        )}
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
                                          Tên Danh Mục Phụ
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            value={subCategoryName}
                                            onChange={(e) => {
                                              setSubCategoryName(
                                                e.target.value
                                              );
                                            }}
                                            className="form-control"
                                            id="basic-icon-default-fullname"
                                            placeholder="Tên"
                                            aria-label="John Doe"
                                            aria-describedby="basic-icon-default-fullname2"
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
                                            placeholder="Hình Ảnh Của Danh Mục"
                                            aria-label="ACME Inc."
                                            aria-describedby="basic-icon-default-company2"
                                            onChange={(e) => {
                                              createNewURLAdd(e);
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
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Danh Mục
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            name="city"
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            onChange={(e) => {
                                              setCategorySelect(true);
                                              handleMainCategory(e);
                                            }}
                                            value={mainCategoryId}
                                          >
                                            {!categorySelect && (
                                              <option value="">
                                                --- Chọn Danh Mục
                                              </option>
                                            )}

                                            {mainCategory &&
                                              mainCategory.length &&
                                              mainCategory.map((e, index) => {
                                                return (
                                                  <>
                                                    <option
                                                      key={e.id}
                                                      value={e.id}
                                                      onClick={() => {
                                                        setSubCategory(e.id);
                                                      }}
                                                    >
                                                      {e.categoryName}
                                                    </option>
                                                  </>
                                                );
                                              })}
                                          </select>
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
                                        backgroundColor: "#11cdef",
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
                                  <h5 className="mb-0">
                                    Cập Nhật Danh Mục Phụ
                                  </h5>
                                </div>
                                <div className="card-body">
                                  <form>
                                  {categoryUpdate.imageUrl && (
                                          <img
                                            style={{
                                              height: 200,
                                              width: 200,
                                              objectFit: "cover",
                                              marginLeft:300,
                                              marginTop:10
                                            }}
                                            src={categoryUpdate.imageUrl}
                                          />
                                        )}
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
                                          Tên Danh Mục Phụ
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="basic-icon-default-fullname"
                                            placeholder="Tên"
                                            aria-label="John Doe"
                                            aria-describedby="basic-icon-default-fullname2"
                                            onChange={(e) => {
                                              setCategoryUpdate({
                                                ...categoryUpdate,
                                                subCategoryName: e.target.value,
                                              });
                                            }}
                                            value={
                                              categoryUpdate.subCategoryName
                                            }
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
                                            placeholder="Hình Ảnh Của Danh Mục Phụ"
                                            aria-label="ACME Inc."
                                            onChange={(e) => {
                                              createNewURL(e);
                                            }}
                                            aria-describedby="basic-icon-default-company2"
                                          />
                                        </div>

                                       
                                      </div>
                                      <div
                                        className="mb-3"
                                       
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Danh Mục
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            name="city"
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            onChange={(e) => {
                                              handleMainCategory(e);
                                              setCategoryUpdate({
                                                ...categoryUpdate,
                                                mainCategoryId: e.target.value,
                                              });
                                            }}
                                            value={
                                              categoryUpdate.mainCategoryId
                                            }
                                          >
                                            {mainCategory &&
                                              mainCategory.length &&
                                              mainCategory.map((e, index) => {
                                                return (
                                                  <>
                                                    <option
                                                      key={e.id}
                                                      value={e.id}
                                                      onClick={() => {
                                                        setSubCategory(e.id);
                                                      }}
                                                    >
                                                      {e.categoryName}
                                                    </option>
                                                  </>
                                                );
                                              })}
                                          </select>
                                        </div>
                                      </div>
                                    </div>

                                    <button
                                      type="submit"
                                      className="button-28"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        updateProducts();
                                      }}
                                      style={{
                                        height: 30,
                                        width: 80,
                                        fontSize: 13,
                                        paddingTop: 1,
                                        marginLeft: "90%",
                                        marginTop: "20px",
                                        backgroundColor: "#11cdef",
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
                              &nbsp; &nbsp;Tên Danh Mục Phụ
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              &nbsp; &nbsp;Tên Danh Mục
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              Cập nhật
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                          {subCategory &&
                            subCategory.length > 0 &&
                            subCategory.map((e) => {
                              return (
                                <tr key={e.id}>
                                  <td>&nbsp; &nbsp;{e.subCategoryName}</td>
                                  <td>&nbsp; &nbsp;{e.mainCategoryName}</td>

                                  <td>
                                    <a
                                      class="button-81"
                                      role="button"
                                      href="#my-dialog2"
                                      onClick={() => {
                                        loadDataSubCategoryID(e.id);
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
export default SubCategory;
