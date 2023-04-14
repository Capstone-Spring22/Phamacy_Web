import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarOwner";

import ReactPaginate from "react-paginate";
import axios from "axios";
import {
  getDataByPath,
  createDataByPath,
  updateDataByPath,
} from "../../services/data.service";
import laptop from "../../assets/laptop.png";

const DashBoardAdmin = () => {
  const [activeItem, setActiveItem] = useState("DashBoardAdmin");

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
                          src="../assets/img/avatars/1.png"
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
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-lg-8 mb-4 order-0">
                    <div className="card">
                      <div className="d-flex align-items-end row">
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary">
                              Congratulations John! 🎉
                            </h5>
                            <p className="mb-4">
                              You have done <span className="fw-bold">72%</span>{" "}
                              more sales today. Check your new badge in your
                              profile.
                            </p>
                            <a
                              href="javascript:;"
                              className="btn btn-sm btn-outline-primary"
                            >
                              View Badges
                            </a>
                          </div>
                        </div>
                        <div className="col-sm-5 text-center text-sm-left">
                          <div className="card-body pb-0 px-0 px-md-4">
                            <img
                              src={laptop}
                              style={{ height: 140 }}
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
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
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
                              <div className="dropdown">
                                <button
                                  className="btn p-0"
                                  type="button"
                                  id="cardOpt3"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="bx bx-dots-vertical-rounded" />
                                </button>
                                <div
                                  className="dropdown-menu dropdown-menu-end"
                                  aria-labelledby="cardOpt3"
                                >
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    View More
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">
                              Profit
                            </span>
                            <h3 className="card-title mb-2">$12,628</h3>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-up-arrow-alt" /> +72.80%
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-building"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z" />
                                </svg>
                              </div>
                              <div className="dropdown">
                                <button
                                  className="btn p-0"
                                  type="button"
                                  id="cardOpt6"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="bx bx-dots-vertical-rounded" />
                                </button>
                                <div
                                  className="dropdown-menu dropdown-menu-end"
                                  aria-labelledby="cardOpt6"
                                >
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    View More
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                            <span>Sales</span>
                            <h3 className="card-title text-nowrap mb-1">
                              $4,679
                            </h3>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-up-arrow-alt" /> +28.42%
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Total Revenue */}
                  <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                    <div className="card">
                      <div className="row row-bordered g-0">
                        <div className="col-md-8">
                          <h5 className="card-header m-0 me-2 pb-3">
                            Total Revenue
                          </h5>
                          <div id="totalRevenueChart" className="px-2" />
                        </div>
                        <div className="col-md-4">
                          <div className="card-body">
                            <div className="text-center">
                              <div className="dropdown">
                                <button
                                  className="btn btn-sm btn-outline-primary dropdown-toggle"
                                  type="button"
                                  id="growthReportId"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  2022
                                </button>
                                <div
                                  className="dropdown-menu dropdown-menu-end"
                                  aria-labelledby="growthReportId"
                                >
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    2021
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    2020
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    2019
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="growthChart" />
                          <div className="text-center fw-semibold pt-3 mb-2">
                            62% Company Growth
                          </div>
                          <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
                            <div className="d-flex">
                              <div className="me-2">
                                <span className="badge bg-label-primary p-2">
                                  <i className="bx bx-dollar text-primary" />
                                </span>
                              </div>
                              <div className="d-flex flex-column">
                                <small>2022</small>
                                <h6 className="mb-0">$32.5k</h6>
                              </div>
                            </div>
                            <div className="d-flex">
                              <div className="me-2">
                                <span className="badge bg-label-info p-2">
                                  <i className="bx bx-wallet text-info" />
                                </span>
                              </div>
                              <div className="d-flex flex-column">
                                <small>2021</small>
                                <h6 className="mb-0">$41.2k</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*/ Total Revenue */}
                  <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                    <div className="row">
                      <div className="col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/paypal.png"
                                  alt="Credit Card"
                                  className="rounded"
                                />
                              </div>
                              <div className="dropdown">
                                <button
                                  className="btn p-0"
                                  type="button"
                                  id="cardOpt4"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="bx bx-dots-vertical-rounded" />
                                </button>
                                <div
                                  className="dropdown-menu dropdown-menu-end"
                                  aria-labelledby="cardOpt4"
                                >
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    View More
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                            <span className="d-block mb-1">Payments</span>
                            <h3 className="card-title text-nowrap mb-2">
                              $2,456
                            </h3>
                            <small className="text-danger fw-semibold">
                              <i className="bx bx-down-arrow-alt" /> -14.82%
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/cc-primary.png"
                                  alt="Credit Card"
                                  className="rounded"
                                />
                              </div>
                              <div className="dropdown">
                                <button
                                  className="btn p-0"
                                  type="button"
                                  id="cardOpt1"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="bx bx-dots-vertical-rounded" />
                                </button>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="cardOpt1"
                                >
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    View More
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">
                              Transactions
                            </span>
                            <h3 className="card-title mb-2">$14,857</h3>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-up-arrow-alt" /> +28.14%
                            </small>
                          </div>
                        </div>
                      </div>
                      {/* </div>
    <div class="row"> */}
                      <div className="col-12 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                              <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                <div className="card-title">
                                  <h5 className="text-nowrap mb-2">
                                    Profile Report
                                  </h5>
                                  <span className="badge bg-label-warning rounded-pill">
                                    Year 2021
                                  </span>
                                </div>
                                <div className="mt-sm-auto">
                                  <small className="text-success text-nowrap fw-semibold">
                                    <i className="bx bx-chevron-up" /> 68.2%
                                  </small>
                                  <h3 className="mb-0">$84,686k</h3>
                                </div>
                              </div>
                              <div id="profileReportChart" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* Order Statistics */}
                  <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
                    <div className="card h-100">
                      <div className="card-header d-flex align-items-center justify-content-between pb-0">
                        <div className="card-title mb-0">
                          <h5 className="m-0 me-2">Order Statistics</h5>
                          <small className="text-muted">
                            42.82k Total Sales
                          </small>
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="orederStatistics"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="orederStatistics"
                          >
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Select All
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Refresh
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Share
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex flex-column align-items-center gap-1">
                            <h2 className="mb-2">8,258</h2>
                            <span>Total Orders</span>
                          </div>
                          <div id="orderStatisticsChart" />
                        </div>
                        <ul className="p-0 m-0">
                          <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3">
                              <span className="avatar-initial rounded bg-label-primary">
                                <i className="bx bx-mobile-alt" />
                              </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="mb-0">Electronic</h6>
                                <small className="text-muted">
                                  Mobile, Earbuds, TV
                                </small>
                              </div>
                              <div className="user-progress">
                                <small className="fw-semibold">82.5k</small>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3">
                              <span className="avatar-initial rounded bg-label-success">
                                <i className="bx bx-closet" />
                              </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="mb-0">Fashion</h6>
                                <small className="text-muted">
                                  T-shirt, Jeans, Shoes
                                </small>
                              </div>
                              <div className="user-progress">
                                <small className="fw-semibold">23.8k</small>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3">
                              <span className="avatar-initial rounded bg-label-info">
                                <i className="bx bx-home-alt" />
                              </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="mb-0">Decor</h6>
                                <small className="text-muted">
                                  Fine Art, Dining
                                </small>
                              </div>
                              <div className="user-progress">
                                <small className="fw-semibold">849k</small>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="avatar flex-shrink-0 me-3">
                              <span className="avatar-initial rounded bg-label-secondary">
                                <i className="bx bx-football" />
                              </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="mb-0">Sports</h6>
                                <small className="text-muted">
                                  Football, Cricket Kit
                                </small>
                              </div>
                              <div className="user-progress">
                                <small className="fw-semibold">99</small>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/*/ Order Statistics */}
                  {/* Expense Overview */}
                  <div className="col-md-6 col-lg-4 order-1 mb-4">
                    <div className="card h-100">
                      <div className="card-header">
                        <ul className="nav nav-pills" role="tablist">
                          <li className="nav-item">
                            <button
                              type="button"
                              className="nav-link active"
                              role="tab"
                              data-bs-toggle="tab"
                              data-bs-target="#navs-tabs-line-card-income"
                              aria-controls="navs-tabs-line-card-income"
                              aria-selected="true"
                            >
                              Income
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              type="button"
                              className="nav-link"
                              role="tab"
                            >
                              Expenses
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              type="button"
                              className="nav-link"
                              role="tab"
                            >
                              Profit
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body px-0">
                        <div className="tab-content p-0">
                          <div
                            className="tab-pane fade show active"
                            id="navs-tabs-line-card-income"
                            role="tabpanel"
                          >
                            <div className="d-flex p-4 pt-3">
                              <div className="avatar flex-shrink-0 me-3">
                                <img
                                  src="../assets/img/icons/unicons/wallet.png"
                                  alt="User"
                                />
                              </div>
                              <div>
                                <small className="text-muted d-block">
                                  Total Balance
                                </small>
                                <div className="d-flex align-items-center">
                                  <h6 className="mb-0 me-1">$459.10</h6>
                                  <small className="text-success fw-semibold">
                                    <i className="bx bx-chevron-up" />
                                    42.9%
                                  </small>
                                </div>
                              </div>
                            </div>
                            <div id="incomeChart" />
                            <div className="d-flex justify-content-center pt-4 gap-2">
                              <div className="flex-shrink-0">
                                <div id="expensesOfWeek" />
                              </div>
                              <div>
                                <p className="mb-n1 mt-1">Expenses This Week</p>
                                <small className="text-muted">
                                  $39 less than last week
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*/ Expense Overview */}
                  {/* Transactions */}
                  <div className="col-md-6 col-lg-4 order-2 mb-4">
                    <div className="card h-100">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <h5 className="card-title m-0 me-2">Transactions</h5>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="transactionID"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="transactionID"
                          >
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Last 28 Days
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Last Month
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Last Year
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <ul className="p-0 m-0">
                          <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/paypal.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="text-muted d-block mb-1">
                                  Paypal
                                </small>
                                <h6 className="mb-0">Send money</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-1">
                                <h6 className="mb-0">+82.6</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/wallet.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="text-muted d-block mb-1">
                                  Wallet
                                </small>
                                <h6 className="mb-0">Mac'D</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-1">
                                <h6 className="mb-0">+270.69</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/chart.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="text-muted d-block mb-1">
                                  Transfer
                                </small>
                                <h6 className="mb-0">Refund</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-1">
                                <h6 className="mb-0">+637.91</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/cc-success.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="text-muted d-block mb-1">
                                  Credit Card
                                </small>
                                <h6 className="mb-0">Ordered Food</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-1">
                                <h6 className="mb-0">-838.71</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/wallet.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="text-muted d-block mb-1">
                                  Wallet
                                </small>
                                <h6 className="mb-0">Starbucks</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-1">
                                <h6 className="mb-0">+203.33</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/cc-warning.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="text-muted d-block mb-1">
                                  Mastercard
                                </small>
                                <h6 className="mb-0">Ordered Food</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-1">
                                <h6 className="mb-0">-92.45</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/*/ Transactions */}
                </div>
              </div>
              {/* / Content */}
              {/* Footer */}
              <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                  <div className="mb-2 mb-md-0">
                    © , made with ❤️ by
                    <a
                      href="https://themeselection.com"
                      target="_blank"
                      className="footer-link fw-bolder"
                    >
                      ThemeSelection
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://themeselection.com/license/"
                      className="footer-link me-4"
                      target="_blank"
                    >
                      License
                    </a>
                    <a
                      href="https://themeselection.com/"
                      target="_blank"
                      className="footer-link me-4"
                    >
                      More Themes
                    </a>
                    <a
                      href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                      target="_blank"
                      className="footer-link me-4"
                    >
                      Documentation
                    </a>
                    <a
                      href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                      target="_blank"
                      className="footer-link me-4"
                    >
                      Support
                    </a>
                  </div>
                </div>
              </footer>
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
export default DashBoardAdmin;
