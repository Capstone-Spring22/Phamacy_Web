import { useEffect, useState } from "react";
import SideBar from "../sidebar/SideBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { Link } from "react-router-dom";

const Employees = () => {
 
  return (
    <>
     <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar />

          <div className="layout-page" style={{ backgroundColor: "#f4f6fb" }}>
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
                        <h3 className="fontagon"> Employees</h3>
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
                                  <h5 className="mb-0">Update new Employees</h5>
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
                                          User Name
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            id="basic-icon-default-company"
                                            className="form-control"
                                            placeholder="User Name"
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
                                          Address
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            placeholder="Address"
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
                                          Image 
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            id="basic-icon-default-phone"
                                            className="form-control phone-mask"
                                            placeholder="Image"
                                            aria-label="658 799 8941"
                                            aria-describedby="basic-icon-default-phone2"
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
                                  <h5 className="mb-0">Update Employees</h5>
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
                              &nbsp; &nbsp;ID
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              Name
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              Address
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
                          <tr>
                            <td>&nbsp; &nbsp;001</td>
                            <td>Phu</td>
                            <td>221 vuon lai</td>
                          
                            <td>
                              <button class="button-80" role="button">
                                Delete
                              </button>
                              <button class="button-81" role="button">
                                Update
                              </button>
                            </td>
                           
                          </tr>
                          <tr>
                            <td>&nbsp; &nbsp;002</td>
                            <td>Long</td>
                            <td>Tan Binh</td>
                           
                            <td>
                              <button class="button-80" role="button">
                                Delete
                              </button>
                              <button class="button-81" role="button">
                                Update
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>&nbsp; &nbsp;003</td>
                            <td>Quang</td>
                            <td>Thu Duc</td>
                          
                            <td>
                              <button class="button-80" role="button" >
                                Delete
                              </button>
                              <button class="button-81" role="button">
                                Update
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>&nbsp; &nbsp;004</td>
                            <td>Đức</td>
                            <td>Quan 9</td>
                           
                            <td>
                              <button class="button-80" role="button">
                                Delete
                              </button>
                              <button class="button-81" role="button">
                                Update
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>&nbsp; &nbsp;005</td>
                            <td>Nguyen</td>
                            <td>Quan 10</td>
                           
                            <td>
                              <button class="button-80" role="button">
                                Delete
                              </button>
                              <button class="button-81" role="button">
                                Update
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>&nbsp; &nbsp;006</td>
                            <td>Lam</td>
                            <td>Quan 9</td>
                          
                            <td>
                              <button class="button-80" role="button">
                                Delete
                              </button>
                              <button class="button-81" role="button">
                                Update
                              </button>
                            </td>
                          </tr>
                         
                        </tbody>
                       
                      </table>
                      <div className="pagination p12">
                        <ul>
                          <a href="#">
                            <li>Previous</li>
                          </a>
                          <a href="#">
                            <li>1</li>
                          </a>
                          <a href="#">
                            <li>2</li>
                          </a>
                          <a href="#">
                            <li>3</li>
                          </a>
                          <a href="#">
                            <li>4</li>
                          </a>
                          <a href="#">
                            <li>5</li>
                          </a>
                          <a className="is-active" href="#">
                            <li>6</li>
                          </a>
                          <a href="#">
                            <li>Next</li>
                          </a>
                        </ul>
                      </div>
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
export default Employees;
