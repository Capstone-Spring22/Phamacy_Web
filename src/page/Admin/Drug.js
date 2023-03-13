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
  const [perPage, setPerPage] = useState(7);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  const update = (myId) => {
    localStorage.setItem("id", myId);
    history.push("/UpdateDrug");
  };
  const create = (myId) => {
    localStorage.setItem("id", myId);

    history.push("/NewDrug");
  };

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
                <SideBar />

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
                          <a href="#" class="navbar-link">Name</a>
                        </li>

                        <li class="navbar-item">
                          <div className="avatar-dropdown">
                            <img
                              className="avatar"
                              src="https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1.jpg"
                              alt="Avatar"
                            />
                            <ul className="dropdown">
                              <li>
                                <a href="#">Name</a>
                              </li>
                              <li>
                                <a href="#">Profile</a>
                              </li>
                              <li>
                                <a href="#">Log Out</a>
                              </li>
                             
                            </ul>
                          </div>
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
                              <h3 className="fontagon">Product</h3>
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
                                  marginLeft: "80%",
                                  marginTop: "20px",
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
                                &nbsp; Add
                              </a>
                              <div className="dialog overlay" id="my-dialog">
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
                                          Update new product
                                        </h5>
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
                                                Name
                                              </label>
                                              <div className="input-group input-group-merge">
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  id="basic-icon-default-fullname"
                                                  placeholder="Name"
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
                                                Image
                                              </label>
                                              <div className="input-group input-group-merge">
                                                <input
                                                  type="text"
                                                  id="basic-icon-default-company"
                                                  className="form-control"
                                                  placeholder="Image"
                                                  aria-label="ACME Inc."
                                                  aria-describedby="basic-icon-default-company2"
                                                />
                                              </div>
                                            </div>
                                            <div
                                              className="mb-3"
                                              style={{ width: "95%" }}
                                            >
                                              <label
                                                className="form-label"
                                                htmlFor="basic-icon-default-email"
                                              >
                                                Quantity
                                              </label>
                                              <div className="input-group input-group-merge">
                                                <input
                                                  type="text"
                                                  id="basic-icon-default-email"
                                                  className="form-control"
                                                  placeholder="Quantity"
                                                  aria-label="john.doe"
                                                  aria-describedby="basic-icon-default-email2"
                                                />
                                              </div>
                                              <div className="form-text"></div>
                                            </div>
                                            <div
                                              className="mb-3"
                                              style={{ width: "100%" }}
                                            >
                                              <label
                                                className="form-label"
                                                htmlFor="basic-icon-default-phone"
                                              >
                                                Price
                                              </label>
                                              <div className="input-group input-group-merge">
                                                <input
                                                  type="text"
                                                  id="basic-icon-default-phone"
                                                  className="form-control phone-mask"
                                                  placeholder="Pirce"
                                                  aria-label="658 799 8941"
                                                  aria-describedby="basic-icon-default-phone2"
                                                />
                                              </div>
                                            </div>
                                            <div
                                              className="mb-3"
                                              style={{ width: "95%" }}
                                            >
                                              <label
                                                className="form-label"
                                                htmlFor="basic-icon-default-message"
                                              >
                                                Unit
                                              </label>
                                              <div className="input-group input-group-merge">
                                                <input
                                                  id="basic-icon-default-message"
                                                  className="form-control"
                                                  placeholder="Unit"
                                                  aria-label="Hi, Do you have a moment to talk Joe?"
                                                  aria-describedby="basic-icon-default-message2"
                                                  defaultValue={""}
                                                />
                                              </div>
                                            </div>
                                          </div>

                                          <button
                                            type="submit"
                                            className="button-28"
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
                              <div className="dialog overlay" id="my-dialog2">
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
                                          Update Medicine
                                        </h5>
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
                                                Name
                                              </label>
                                              <div className="input-group input-group-merge">
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  id="basic-icon-default-fullname"
                                                  placeholder="Name"
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
                                                Image
                                              </label>
                                              <div className="input-group input-group-merge">
                                                <input
                                                  type="text"
                                                  id="basic-icon-default-company"
                                                  className="form-control"
                                                  placeholder="Image"
                                                  aria-label="ACME Inc."
                                                  aria-describedby="basic-icon-default-company2"
                                                />
                                              </div>
                                            </div>
                                            <div
                                              className="mb-3"
                                              style={{ width: "95%" }}
                                            >
                                              <label
                                                className="form-label"
                                                htmlFor="basic-icon-default-email"
                                              >
                                                Quantity
                                              </label>
                                              <div className="input-group input-group-merge">
                                                <input
                                                  type="text"
                                                  id="basic-icon-default-email"
                                                  className="form-control"
                                                  placeholder="Quantity"
                                                  aria-label="john.doe"
                                                  aria-describedby="basic-icon-default-email2"
                                                />
                                              </div>
                                              <div className="form-text"></div>
                                            </div>
                                            <div
                                              className="mb-3"
                                              style={{ width: "100%" }}
                                            >
                                              <label
                                                className="form-label"
                                                htmlFor="basic-icon-default-phone"
                                              >
                                                Price
                                              </label>
                                              <div className="input-group input-group-merge">
                                                <input
                                                  type="text"
                                                  id="basic-icon-default-phone"
                                                  className="form-control phone-mask"
                                                  placeholder="658 799 8941"
                                                  aria-label="658 799 8941"
                                                  aria-describedby="basic-icon-default-phone2"
                                                />
                                              </div>
                                            </div>
                                            <div
                                              className="mb-3"
                                              style={{ width: "95%" }}
                                            >
                                              <label
                                                className="form-label"
                                                htmlFor="basic-icon-default-message"
                                              >
                                                Unit
                                              </label>
                                              <div className="input-group input-group-merge">
                                                <textarea
                                                  id="basic-icon-default-message"
                                                  className="form-control"
                                                  placeholder="Hi, Do you have a moment to talk Joe?"
                                                  aria-label="Hi, Do you have a moment to talk Joe?"
                                                  aria-describedby="basic-icon-default-message2"
                                                  defaultValue={""}
                                                />
                                              </div>
                                            </div>
                                          </div>

                                          <button
                                            type="submit"
                                            className="button-28"
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
                                    &nbsp; &nbsp;Name
                                  </th>
                                  <th
                                    style={{
                                      backgroundColor: "#f6f9fc",
                                      borderColor: "white",
                                      color: "#bfc8d3",
                                    }}
                                  >
                                    Price
                                  </th>
                                  <th
                                    style={{
                                      backgroundColor: "#f6f9fc",
                                      borderColor: "white",
                                      color: "#bfc8d3",
                                    }}
                                  >
                                    Quantity
                                  </th>
                                  <th
                                    style={{
                                      backgroundColor: "#f6f9fc",
                                      borderColor: "white",
                                      color: "#bfc8d3",
                                    }}
                                  >
                                    Unit
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
                                          &nbsp; &nbsp;{e.name}
                                        </td>
                                        <td>{e.price}</td>
                                        <td>{e.sellQuantity}</td>
                                        <td>{e.unitId}</td>
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
                              className="pagination p12"
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
