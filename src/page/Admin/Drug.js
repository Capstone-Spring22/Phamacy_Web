import { useEffect, useState } from "react";
import SideBar from "../sidebar/SideBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";

const Drug = () => {
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar />

          <div className="layout-page" style={{ backgroundColor: "#f5f5f9" }}>
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
                    <a
                      className="nav-link dropdown-toggle hide-arrow"
                      href="javascript:void(0);"
                      data-bs-toggle="dropdown"
                    >
                      <div className="avatar avatar-online">
                        <img
                          src="https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg"
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
            <div
              style={{
                backgroundColor: "white",
                width: 1200,
                margin: 30,
                borderRadius: 5,
              }}
            >
              <div className="content-wrapper">
                {/* Content */}
                <div className="container-xxl flex-grow-1 container-p-y">
                  <h4 className="fw-bold py-3 mb-4">
                    <span className="text-muted fw-light">
                      Medicine Management
                    </span>
                  </h4>
                  {/* Basic Bootstrap Table */}
                  <div className="card" style={{ width: "100%" }}>
                    <h5 className="card-header">Medicine</h5>
                    <div className="table-responsive text-nowrap">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>&nbsp; &nbsp;ID</th>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Actions</th>
                            
                          </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                          <tr>
                            <td>&nbsp; &nbsp;001</td>
                            <td>Panadol</td>
                            <td>50</td>
                            <td>
                              <span className="badge bg-label-primary me-1">
                                Blister Packs
                              </span>
                            </td>
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
                            <td>Panadol</td>
                            <td>50</td>
                            <td>
                              <span className="badge bg-label-primary me-1">
                                Blister Packs
                              </span>
                            </td>
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
                            <td>Panadol</td>
                            <td>50</td>
                            <td>
                              <span className="badge bg-label-info me-1">
                                Scheduled
                              </span>
                            </td>
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
                            <td>&nbsp; &nbsp;004</td>
                            <td>Panadol</td>
                            <td>50</td>
                            <td>
                              <span className="badge bg-label-success me-1">
                                Pill
                              </span>
                            </td>
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
                            <td>Panadol</td>
                            <td>50</td>
                            <td>
                              <span className="badge bg-label-warning me-1">
                                Box
                              </span>
                            </td>
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
                            <td>Panadol</td>
                            <td>50</td>
                            <td>
                              <span className="badge bg-label-success me-1">
                                Pill
                              </span>
                            </td>
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
export default Drug;
