import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarAdmin";

import ReactPaginate from "react-paginate";
import axios from "axios";
import {
  getDataByPath,
  createDataByPath,
  updateDataByPath,
} from "../../services/data.service";
import laptop from "../../assets/laptop.png";
import { useHistory } from "react-router-dom";
import { Switch } from "antd";

const DashBoardAdmin = () => {
  const [activeItem, setActiveItem] = useState("DashBoardAdmin");
  const [site, setSite] = useState(null);
  const [city, setCity] = useState([]);
  const [cityID, setCityID] = useState("");
  const [districs, setDistrics] = useState([]);
  const [districtID, setDistrictID] = useState("");
  const [ward, setWard] = useState([]);
  const [wardID, setWardID] = useState("");
  const [siteName, setSiteName] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [totalSite, setTotalSite] = useState([]);
  const [homeAddress, setHomeAddress] = useState("");
  const [siteID, setSiteID] = useState("");
  const [totalEmployees, setTotalEmployees] = useState([]);

  const [countUs, setCountUs] = useState("2");

  let history = useHistory();

  const viewDetail = () => {
    history.push("/ViewDetail");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const checkValidation = () => {
    let isValid = true;

    return true;
  };

  async function loadDataSite() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Site?pageIndex=${currentPage}&pageItems=${perPage}`;
      console.log("display2", getDataByPath);
      const res = await getDataByPath(path, accessToken, "");
      console.log("display31321", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setSite(res.data.items);

        setTotalSite(res.data.totalRecord);
        console.log("display", currentPage);
      }
    }
  }
  async function loadDataSubCategoryID(id) {
    const path = `Site/${id}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setSiteID(res.data.id);
      setSiteName(res.data.siteName);
      setImageUrl(res.data.imageUrl);
      setDescription(res.data.description);
      setContactInfo(res.data.contactInfo);
      console.log("display 2", id);
    }
  }
  async function loadAddressByID(id) {
    const path = `Address/${id}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      // setSiteUpdate(res.data);
      setCityID(res.data.cityId);
      setDistrictID(res.data.districtId);
      setWardID(res.data.wardId);
      setHomeAddress(res.data.homeAddress);
      console.log("display 2", id);
    }
  }
  async function updateProducts() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const data = dataForUpdate();
      const path = `Site`;
      const res = await updateDataByPath(path, accessToken, data);
      // console.log("display", data.homeAddress);
      if (res && res.status === 200) {
        Swal.fire("Update successfully!", "", "success");
        window.location.reload();
      }
    }
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const dataForUpdate = () => {
    return {
      siteID: siteID,
      siteName: siteName,
      description: description,
      contactInfo: contactInfo,
      imageUrl: imageUrl,
      cityID: cityID,
      districtID: districtID,
      wardID: wardID,
      homeAddress: homeAddress,
    };
  };
  const dataForCreate = () => {
    return {
      siteName: siteName,
      description: description,
      contactInfo: contactInfo,
      imageUrl: imageUrl,
      cityID: cityID,
      districtID: districtID,
      wardID: wardID,
      homeAddress: homeAddress,
    };
  };

  const deleteForCreate = () => {
    setSiteName("");
    setDescription("");
    setContactInfo("");
    setImageUrl("");
    setCityID("");
    setDistrictID("");
    setWardID("");
    setHomeAddress("");
  };

  async function createNewProducts() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (checkValidation()) {
        const data = dataForCreate();
        const path = "Site";
        const res = await createDataByPath(path, accessToken, data);
        console.log("Check res", res);
        if (res && res.status === 201) {
          Swal.fire("Create Success", "", "success");
          deleteForCreate();
          window.location.reload();
        }
      }
    }
  }
  async function loadDataSiteID(id) {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Site/${id}`;
      const res = await getDataByPath(path, accessToken, "");
      if (res !== null && res !== undefined && res.status === 200) {
        console.log(id, res.data.isActivate);
        const data = { siteID: id, status: !res.data.isActivate };
        const path1 = "Site/Active";
        const res1 = await updateDataByPath(path1, accessToken, data);
        if (res1 && res1.status === 200) {
          setCountUs(parseInt(countUs) + 1);
          Swal.fire("Update successfully!", "", "success");
        } else if (res1 && res1.status === 400) {
          Swal.fire(
            "Cửa hàng này chưa đủ nhân viên nên chưa mở cửa!",
            "Không thể mở cửa",
            "error"
          );
        }
      }
    }
  }
  async function loadDataSiteIDtoDelivery(id) {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Site/${id}`;
      const res = await getDataByPath(path, accessToken, "");
      if (res !== null && res !== undefined && res.status === 200) {
        console.log(id, res.data.isDelivery);
        const data = { siteID: id, status: !res.data.isDelivery };
        const path1 = "Site/Delivery";
        const res1 = await updateDataByPath(path1, accessToken, data);
        if (res1 && res1.status === 200) {
          setCountUs(parseInt(countUs) + 1);
          Swal.fire("Update successfully!", "", "success");
          history.push("/Site");
        } else if (res1 && res1.status === 400) {
          Swal.fire(
            "Cửa hàng này chưa đủ nhân viên nên chưa mở cửa!",
            "Không thể mở cửa",
            "error"
          );
        }
      }
    }
  }

  async function loadDataCity() {
    const path = `Address/City`;
    const res = await getDataByPath(path, "", "");

    if (res !== null && res !== undefined && res.status === 200) {
      setCity(res.data);
    }
  }

  async function loadDataDistrics() {
    const path = `Address/${cityID}/District`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setDistrics(res.data);
    }
  }
  async function loadDataWard() {
    const path = `Address/${districtID}/Ward`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setWard(res.data);
    }
  }
  async function loadDataEmployee() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");

      const path = `User?pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("check1", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setTotalEmployees(res.data.totalRecord);
      }
    }
  }
  const handlecity = (event) => {
    event.preventDefault();
    const cityID = event.target.value;
    setCityID(cityID);
  };
  const handleDistrict = (event) => {
    event.preventDefault();
    const districtID = event.target.value;
    setDistrictID(districtID);
  };
  const handleWards = (event) => {
    event.preventDefault();
    const wardID = event.target.value;
    setWardID(wardID);
  };

  useEffect(() => {
    loadDataSite();
  }, [currentPage, perPage, countUs]);

  useEffect(() => {
    loadDataCity();
  }, []);
  useEffect(() => {
    loadDataDistrics();
  }, [cityID]);
  useEffect(() => {
    loadDataWard();
  }, [districtID]);
  useEffect(() => {
    loadDataEmployee();
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
                    <div
                      className="card"
                      style={{ width: 770, marginLeft: 29, height: 175 }}
                    >
                      <div className="d-flex align-items-end row">
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary">Welcome</h5>
                            <p className="mb-4">
                              You have done <span className="fw-bold">72%</span>{" "}
                              more sales today. Check your new badge in your
                              profile.
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-5 text-center text-sm-left">
                          <div className="card-body pb-0 px-0 px-md-4">
                            <img
                              src={laptop}
                              style={{ height: 150 }}
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
                            </div>
                            <span className="fw-semibold d-block mb-1">
                              Tổng Nhân Viên
                            </span>
                            <h3 className="card-title mb-2">
                              {totalEmployees}
                            </h3>
                            <small
                              className=" fw-semibold"
                              style={{ color: "#abc8f0" }}
                            >
                              Xem Thêm
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
                            </div>
                            <span className="fw-semibold d-block mb-1">
                              Tổng Chi Nhánh
                            </span>
                            <h3 className="card-title text-nowrap mb-1">
                              {totalSite}
                            </h3>
                            <small
                              className=" fw-semibold"
                              style={{ color: "#abc8f0" }}
                            >
                              Xem Thêm
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Total Revenue */}
                  <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                    {/* Basic Bootstrap Table */}
                    <div
                      className="card"
                      style={{
                        backgroundColor: "#ffffff",
                        width: 1190,
                        marginLeft: 29,
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
                          <h3 className="fontagon"> Quản Lý Nhân Viên</h3>
                        </h5>

                        <></>
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
                                &nbsp; &nbsp;Tên Chi Nhánh
                              </th>
                              <th
                                style={{
                                  backgroundColor: "#f6f9fc",
                                  borderColor: "white",
                                  color: "#bfc8d3",
                                }}
                              >
                                Vị trí
                              </th>

                              <th
                                style={{
                                  backgroundColor: "#f6f9fc",
                                  borderColor: "white",
                                  color: "#bfc8d3",
                                }}
                              >
                                Thao Tác
                              </th>
                              {/* <th
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
                            </th> */}
                              <th
                                style={{
                                  backgroundColor: "#f6f9fc",
                                  borderColor: "white",
                                  color: "#bfc8d3",
                                }}
                              >
                                Mở Cửa
                              </th>
                              <th
                                style={{
                                  backgroundColor: "#f6f9fc",
                                  borderColor: "white",
                                  color: "#bfc8d3",
                                }}
                              >
                                Giao Hàng
                              </th>
                            </tr>
                          </thead>
                          <tbody className="table-border-bottom-0">
                            {site &&
                              site.length &&
                              site.map((e) => {
                                return (
                                  <tr key={e.id}>
                                    <td>&nbsp; &nbsp;{e.siteName}</td>
                                    <td>
                                      <a
                                        target="_blank"
                                        href={`https://www.google.com/maps/search/?api=1&query=${e.fullyAddress}`}
                                      >
                                        {e.fullyAddress}
                                      </a>
                                    </td>

                                    {/* <td>50</td>
                                  <td>
                                    <span className="badge bg-label-primary me-1">
                                      Blister Packs
                                    </span>
                                  </td> */}

                                    <td>
                                      <a
                                        class="button-81"
                                        role="button"
                                        href="#my-dialog3"
                                        onClick={() => {
                                          loadDataSubCategoryID(e.id);
                                          loadAddressByID(e.addressId);
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
                                      <a
                                        class="button-81"
                                        role="button"
                                        href="#my-dialog2"
                                        onClick={() => {
                                          loadDataSubCategoryID(e.id);
                                          loadAddressByID(e.addressId);
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

                                    <td>
                                      <Switch
                                        checked={e.isActivate}
                                        onChange={async () => {
                                          loadDataSiteID(e.id);
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <Switch
                                        checked={e.isDelivery}
                                        onChange={async () => {
                                          loadDataSiteIDtoDelivery(e.id);
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
                          pageCount={totalSite / perPage}
                          onPageChange={(e) => setCurrentPage(e.selected + 1)}
                          currentPage={currentPage}
                        />
                      </div>
                    </div>
                  </div>
                  {/*/ Total Revenue */}
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
