import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import "../../assets/css2/dropDownAvartar.css";
import { getDataByPath, deleteDataByPath } from "../../services/data.service";

const Drug = () => {
  const [drug, setDrug] = useState([]);
  let history = useHistory();

  const viewDetail = () => {
    history.push("/ViewDetail");
  };

  async function loadDataMedicine() {
    const path = `users?page=2`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDrug(res.data.data);
    }
  }

  async function deleteDataMedicine(id) {
    const path = `users`;
    const res = await deleteDataByPath(path, "", id);
    console.log("Check path", res);
    if (res !== null && res !== undefined && res.status === 204) {
      console.log("Check", res);
      loadDataMedicine();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } else {
      Swal.fire(
        "Remove fail!",
        "Company still working in this semester.",
        "error"
      );
    }
  }

  useEffect(() => {
    loadDataMedicine();
  }, []);
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

                  <nav className="nav1">
                    <input id="toggle" type="checkbox" defaultChecked />

                    <button
                      className="avatar avatar-online"
                      style={{ border: "none", backgroundColor: "white" }}
                    >
                      <img
                        src="https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg"
                        alt=""
                        className="w-px-40 h-auto rounded-circle"
                      />
                    </button>
                    <div
                      style={{
                        width: 100,
                        height: 200,
                        backgroundColor: "white",
                      }}
                    ></div>
                  </nav>
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
                 <div style={{display: 'flex'}}>   <h4 className="fw-bold py-3 mb-4">
                    <span className="text-muted fw-light">
                      Medicine Management
                    </span>
                  </h4>
                  <>
                <a className="dialog-btn btn btn-primary" href="#my-dialog" style={{marginLeft:800,height:40}} >
                  add
                </a>
                <div className="dialog overlay" id="my-dialog">
                  <a href="#" className="overlay-close" />

                  <div className="row " style={{ width: 1000 }}>
                    <div className="col-xl">
                      <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Basic with Icons</h5>
                          <small className="text-muted float-end">
                            Merged input group
                          </small>
                        </div>
                        <div className="card-body">
                          <form>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-icon-default-fullname"
                              >
                                Name
                              </label>
                              <div className="input-group input-group-merge">
                                <span
                                  id="basic-icon-default-fullname2"
                                  className="input-group-text"
                                >
                                  <i className="bx bx-user" />
                                </span>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basic-icon-default-fullname"
                                  placeholder="John Doe"
                                  aria-label="John Doe"
                                  aria-describedby="basic-icon-default-fullname2"
                                />
                              </div>
                            </div>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-icon-default-company"
                              >
                                Company
                              </label>
                              <div className="input-group input-group-merge">
                                <span
                                  id="basic-icon-default-company2"
                                  className="input-group-text"
                                >
                                  <i className="bx bx-buildings" />
                                </span>
                                <input
                                  type="text"
                                  id="basic-icon-default-company"
                                  className="form-control"
                                  placeholder="ACME Inc."
                                  aria-label="ACME Inc."
                                  aria-describedby="basic-icon-default-company2"
                                />
                              </div>
                            </div>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-icon-default-email"
                              >
                                Email
                              </label>
                              <div className="input-group input-group-merge">
                                <span className="input-group-text">
                                  <i className="bx bx-envelope" />
                                </span>
                                <input
                                  type="text"
                                  id="basic-icon-default-email"
                                  className="form-control"
                                  placeholder="john.doe"
                                  aria-label="john.doe"
                                  aria-describedby="basic-icon-default-email2"
                                />
                                <span
                                  id="basic-icon-default-email2"
                                  className="input-group-text"
                                >
                                  @gmail.com
                                </span>
                              </div>
                              <div className="form-text">
                                You can use letters, numbers &amp; periods
                              </div>
                            </div>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-icon-default-phone"
                              >
                                Phone No
                              </label>
                              <div className="input-group input-group-merge">
                                <span
                                  id="basic-icon-default-phone2"
                                  className="input-group-text"
                                >
                                  <i className="bx bx-phone" />
                                </span>
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
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="basic-icon-default-message"
                              >
                                Message
                              </label>
                              <div className="input-group input-group-merge">
                                <span
                                  id="basic-icon-default-message2"
                                  className="input-group-text"
                                >
                                  <i className="bx bx-comment" />
                                </span>
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
                            <button type="submit" className="btn btn-primary">
                              Send
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </></div>
               
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
                          {drug &&
                            drug.length &&
                            drug.map((e) => {
                              return (
                                <tr key={e.id}>
                                  <td>&nbsp; &nbsp;{e.id}</td>
                                  <td>{e.email}</td>
                                  <td>50</td>
                                  <td>
                                    <span className="badge bg-label-primary me-1">
                                      Blister Packs
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                      class="button-80"
                                      role="button"
                                      onClick={() => {
                                        deleteDataMedicine(e.id);
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-trash3-fill"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                      </svg>
                                    </button>
                                    <button class="button-81" role="button">
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
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
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
