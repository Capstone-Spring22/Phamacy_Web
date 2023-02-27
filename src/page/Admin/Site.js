import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarAdmin";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import "../../assets/css2/dropDownAvartar.css";
import ReactPaginate from "react-paginate";
import { Switch } from "antd";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
  updateDataByPath,
} from "../../services/data.service";

const Site = () => {
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
  const [siteUpdate, setSiteUpdate] = useState({
    siteName: "",
    description: "",
    contactInfo: "",
    imageUrl: "",
    cityId: "",
    districtId: "",
    wardID: "",
    homeAddress: "",
  });

  let history = useHistory();

  const viewDetail = () => {
    history.push("/ViewDetail");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(1);
  const checkValidation = () => {
    // if (id.trim() === "") {
    //   Swal.fire("ID Can't Empty", "", "question");
    //   return false;
    // }
    return true;
  };

  const handleClick = (id) => {
    console.log("display", id);
  };
  
  async function loadDataSite() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
    const path = `Site?pageIndex=${currentPage}&pageItems=${perPage}`;
    console.log("display2", getDataByPath);
    const res = await getDataByPath(path, accessToken, "");
     console.log('display31321',res)
    if (res !== null && res !== undefined && res.status === 200) {
      setSite(res.data.items);
      
      setTotalSite(res.data.totalRecord);
       console.log('display',currentPage)
    }}
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
  }}
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
  }}
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
        Swal.fire("Update successfully!", "", "success");
        history.push("/Site");
      } else if (res1 && res1.status === 400) {
        Swal.fire(
          "Cái này éo có nhân viên nên éo cho mở cửa! OK?",
          "You failed!",
          "error"
        );
        }
    }
  }}

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
    
  }, [currentPage, perPage]);

  useEffect(() => {
    loadDataCity();
  }, []);
  useEffect(() => {
    loadDataDistrics();
  }, [cityID]);
  useEffect(() => {
    loadDataWard();
  }, [districtID]);
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar />

          <div className="layout-page" style={{ backgroundColor: "#f4f6fb", marginLeft:260 }}>
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
                        <h3 className="fontagon">Site</h3>
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
                                  <h5 className="mb-0">Add new Site</h5>
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
                                          Name Site
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="basic-icon-default-fullname"
                                            placeholder="Name Site"
                                            value={siteName}
                                            onChange={(e) => {
                                              setSiteName(e.target.value);
                                            }}
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
                                            value={imageUrl}
                                            onChange={(e) => {
                                              setImageUrl(e.target.value);
                                            }}
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
                                          Contact Info
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            placeholder="Contact Info"
                                            aria-label="Contact Info"
                                            aria-describedby="basic-icon-default-email2"
                                            value={contactInfo}
                                            onChange={(e) => {
                                              setContactInfo(e.target.value);
                                            }}
                                          />
                                          {/* <span
                                            id="basic-icon-default-email2"
                                            className="input-group-text"
                                            style={{
                                              backgroundColor: "#f6f9fc",
                                            }}
                                          >
                                            @gmail.com
                                          </span> */}
                                        </div>
                                        <div className="form-text">
                                          You can use letters, numbers &amp;
                                          periods
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
                                          City
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            name="city"
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            onChange={(e) => handlecity(e)}
                                            value={cityID}
                                          >
                                            {city &&
                                              city.length &&
                                              city.map((e, index) => {
                                                return (
                                                  <>
                                                    <option
                                                      key={e.id}
                                                      value={e.id}
                                                      onClick={() => {
                                                        setCity(e.id);
                                                      }}
                                                    >
                                                      {e.cityName}
                                                    </option>
                                                  </>
                                                );
                                              })}
                                          </select>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "95%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          District
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            onChange={(e) => handleDistrict(e)}
                                            value={districtID}
                                          >
                                            {districs &&
                                              districs.length &&
                                              districs.map((e, index) => {
                                                return (
                                                  <>
                                                    <option
                                                      key={e.id}
                                                      value={e.id}
                                                      //onChange={ loadDataDistrics()}
                                                    >
                                                      {e.districtName}
                                                    </option>
                                                  </>
                                                );
                                              })}
                                          </select>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "95%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Ward
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            value={wardID}
                                            onChange={(e) => handleWards(e)}
                                          >
                                            {ward &&
                                              ward.length &&
                                              ward.map((e, index) => {
                                                return (
                                                  <>
                                                    <option
                                                      key={e.id}
                                                      value={e.id}
                                                      //onChange={ loadDataDistrics()}
                                                    >
                                                      {e.wardName}
                                                    </option>
                                                  </>
                                                );
                                              })}
                                          </select>
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
                                          Home Address
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <textarea
                                            id="basic-icon-default-message"
                                            className="form-control"
                                            placeholder=" Home Address"
                                            aria-label=" Home Address"
                                            aria-describedby="basic-icon-default-message2"
                                            defaultValue={""}
                                            value={homeAddress}
                                            onChange={(e) => {
                                              setHomeAddress(e.target.value);
                                            }}
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
                                          Description
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <textarea
                                            id="basic-icon-default-message"
                                            className="form-control"
                                            placeholder="Description"
                                            aria-label="Description"
                                            aria-describedby="basic-icon-default-message2"
                                            defaultValue={""}
                                            value={description}
                                            onChange={(e) => {
                                              setDescription(e.target.value);
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <button
                                      type="submit"
                                      className="button-28"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        createNewProducts();
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
                                  <h5 className="mb-0">Update Site</h5>
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
                                          Name Site
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="basic-icon-default-fullname"
                                            placeholder="Name Site"
                                            value={siteName}
                                            onChange={(e) => {
                                              setSiteName(e.target.value);
                                            }}
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
                                            value={imageUrl}
                                            onChange={(e) => {
                                              setImageUrl(e.target.value);
                                            }}
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
                                          Contact Info
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            placeholder="Contact Info"
                                            aria-label="Contact Info"
                                            aria-describedby="basic-icon-default-email2"
                                            value={contactInfo}
                                            onChange={(e) => {
                                              setContactInfo(e.target.value);
                                            }}
                                          />
                                          {/* <span
                                            id="basic-icon-default-email2"
                                            className="input-group-text"
                                            style={{
                                              backgroundColor: "#f6f9fc",
                                            }}
                                          >
                                            @gmail.com
                                          </span> */}
                                        </div>
                                        <div className="form-text">
                                          You can use letters, numbers &amp;
                                          periods
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
                                          City
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            name="city"
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            onChange={(e) => {
                                              handlecity(e);
                                            }}
                                            value={cityID}
                                          >
                                            {city &&
                                              city.length &&
                                              city.map((e, index) => {
                                                return (
                                                  <>
                                                    <option
                                                      key={e.id}
                                                      value={e.id}
                                                      onClick={() => {
                                                        setCity(e.id);
                                                      }}
                                                    >
                                                      {e.cityName}
                                                    </option>
                                                  </>
                                                );
                                              })}
                                          </select>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "95%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          District
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            onChange={(e) => {
                                              handleDistrict(e);
                                            }}
                                            value={districtID}
                                          >
                                            {districs &&
                                              districs.length &&
                                              districs.map((e, index) => {
                                                return (
                                                  <>
                                                    <option
                                                      key={e.id}
                                                      value={e.id}
                                                      // onClick={() => {
                                                      //   setDistrictID(e.id);
                                                      // }}
                                                    >
                                                      {e.districtName}
                                                    </option>
                                                  </>
                                                );
                                              })}
                                          </select>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "95%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Ward
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            value={wardID}
                                            onChange={(e) => {
                                              handleWards(e);
                                            }}
                                          >
                                            {ward &&
                                              ward.length &&
                                              ward.map((e, index) => {
                                                return (
                                                  <>
                                                    <option
                                                      key={e.id}
                                                      value={e.id}
                                                      // onClick={() => {
                                                      //   setWardID(e.id);
                                                      // }}
                                                    >
                                                      {e.wardName}
                                                    </option>
                                                  </>
                                                );
                                              })}
                                          </select>
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
                                          Home Address
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <textarea
                                            id="basic-icon-default-message"
                                            className="form-control"
                                            placeholder=" Home Address"
                                            aria-label=" Home Address"
                                            aria-describedby="basic-icon-default-message2"
                                            defaultValue={""}
                                            value={homeAddress}
                                            onChange={(e) => {
                                              setHomeAddress(e.target.value);
                                            }}
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
                                          Description
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <textarea
                                            id="basic-icon-default-message"
                                            className="form-control"
                                            placeholder="Description"
                                            aria-label="Description"
                                            aria-describedby="basic-icon-default-message2"
                                            value={description}
                                            onChange={(e) => {
                                              setDescription(e.target.value);
                                            }}
                                          />
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
                              &nbsp; &nbsp;Name
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              Contract Info
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
                          {site &&
                            site.length &&
                            site.map((e) => {
                              return (
                                <tr key={e.id}>
                                  <td>&nbsp; &nbsp;{e.siteName}</td>
                                  <td>{e.contactInfo}</td>
                                  <td>50</td>
                                  <td>
                                    <span className="badge bg-label-primary me-1">
                                      Blister Packs
                                    </span>
                                  </td>
                                  <td>
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
                                    <buton></buton>
                                    <Switch
                                      checked={e.isActivate}
                                      onChange={async () => {
                                        loadDataSiteID(e.id);
                                      }}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      <ReactPaginate
                        className="pagination p12"
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
export default Site;
