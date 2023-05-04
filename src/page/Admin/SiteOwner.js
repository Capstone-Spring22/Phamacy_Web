import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarOwner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import "../../assets/css2/dropDownAvartar.css";
import ReactPaginate from "react-paginate";
import { Switch } from "antd";
import {
  getDataByPath,
  createDataByPath,
  updateDataByPath,
} from "../../services/data.service";
import axios from "axios";

const SiteOwner = () => {
  const [site, setSite] = useState(null);
  const [city, setCity] = useState([]);
  const [cityID, setCityID] = useState("");
  const [districs, setDistrics] = useState([]);
  const [districtID, setDistrictID] = useState("");
  const [ward, setWard] = useState([]);
  const [wardID, setWardID] = useState("");
  const [wardID2, setWardID2] = useState("");
  const [districtID2, setDistrictID2] = useState("");
  const [siteName, setSiteName] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [totalSite, setTotalSite] = useState([]);
  const [homeAddress, setHomeAddress] = useState("");
  const [siteID, setSiteID] = useState("");
  const [districtSelected, setDistrictSelected] = useState(false);
  const [wardSelected, setWardSelected] = useState(false);
  const [citySelected, setCitySelected] = useState(false);
  const [siteNameErrorMessage, setSiteNameErrorMessage] = useState("");
  const [cityErrorMessage, setCityErrorMessage] = useState("");
  const [districtsErrorMessage, setDistrictsErrorMessage] = useState("");

  const [countUs, setCountUs] = useState("2");

  let history = useHistory();

  const viewDetail = () => {
    history.push("/ViewDetail");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const checkValidation = () => {
    let isValid = true;

    return true;
  };
  async function createNewURLAdd(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    const res = await axios.post(
      "https://betterhealthapi.azurewebsites.net/api/v1/Utility/UploadFile",
      data
    );
    console.log("imageUrl", imageUrl);
    console.log("hinh anh", res.data);
    if (res && res.status === 200) {
      setImageUrl(res.data);
    }
  }
  async function createNewURL(e) {
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
      console.log("data", data);
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
          history.push("/SiteOwner");
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
  const [activeItem, setActiveItem] = useState("SiteOwner");
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
                        <h3 className="fontagon">Danh Sách Chi Nhánh</h3>
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
                          onClick={(e) => {
                            setCityID("");
                            setDistrictID("");
                            setWardID("");
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
                                  <h5 className="mb-0">Thêm Chi Nhánh Mới</h5>
                                </div>
                                <div className="card-body">
                                  <form>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        padding: 30,
                                      }}
                                    >
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%", marginLeft: 10 }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-fullname"
                                        >
                                          Tên Chi Nhánh
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="basic-icon-default-fullname"
                                            placeholder="Tên Chi Nhánh"
                                            onChange={(e) => {
                                              setSiteName(e.target.value);
                                            }}
                                            aria-describedby="basic-icon-default-fullname2"
                                          />
                                        </div>
                                        <div
                                          className="form-text"
                                          style={{ color: "red" }}
                                        >
                                          {siteNameErrorMessage}
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%", marginLeft: 10 }}
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
                                            placeholder="Hình Ảnh"
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
                                        style={{
                                          width: "91%",
                                          border:
                                            "0.1px solid rgb(201, 201, 201)",
                                          borderRadius: "10px",
                                          marginLeft: 10,
                                        }}
                                      >
                                        <div
                                          className="card-header d-flex justify-content-between align-items-center"
                                          style={{
                                            marginTop: 10,

                                            height: 40,
                                            backgroundColor: "white",
                                            padding: "20px 24px",
                                            borderColor: "white",
                                          }}
                                        >
                                          <div
                                            className="mb-0"
                                            style={{ fontWeight: "500" }}
                                          >
                                            Thông Tin Địa Chỉ
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                          }}
                                        >
                                          <div
                                            className="mb-3"
                                            style={{
                                              width: "45%",
                                              marginLeft: 50,
                                            }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-phone"
                                            >
                                              Thành Phố/ Tỉnh
                                            </label>
                                            <div className="input-group input-group-merge">
                                              <select
                                                name="city"
                                                id="basic-icon-default-email"
                                                className="form-control"
                                                onChange={(e) => {
                                                  setCitySelected(true);
                                                  handlecity(e);
                                                }}
                                                value={cityID}
                                              >
                                                {" "}
                                                {!citySelected && (
                                                  <option value="">
                                                    --- Chọn Thành Phố/ Tỉnh{" "}
                                                  </option>
                                                )}
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
                                            style={{
                                              width: "45%",
                                              marginLeft: 10,
                                            }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-phone"
                                            >
                                              Quận/ Huyện
                                            </label>
                                            <div className="input-group input-group-merge">
                                              <select
                                                id="basic-icon-default-email"
                                                className="form-control"
                                                onChange={(e) => {
                                                  handleDistrict(e);
                                                  setDistrictSelected(true);
                                                }}
                                                value={districtID}
                                              >
                                                {!districtSelected && (
                                                  <option value="">
                                                    ---Chọn Quận/ Huyện
                                                  </option>
                                                )}
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
                                            style={{
                                              width: "45%",
                                              marginLeft: 50,
                                            }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-phone"
                                            >
                                              Phường/ Xã
                                            </label>
                                            <div className="input-group input-group-merge">
                                              <select
                                                id="basic-icon-default-email"
                                                className="form-control"
                                                value={wardID}
                                                onChange={(e) => {
                                                  handleWards(e);
                                                  setWardSelected(true);
                                                }}
                                              >
                                                {!wardSelected && (
                                                  <option value="">
                                                    --- Chọn Phường/ Xã
                                                  </option>
                                                )}
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
                                            style={{
                                              width: "45%",
                                              marginLeft: 10,
                                            }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-message"
                                            >
                                              Địa Chỉ
                                            </label>
                                            <div className="input-group input-group-merge">
                                              <input
                                                id="basic-icon-default-message"
                                                className="form-control"
                                                placeholder="Địa Chỉ"
                                                aria-label=" Home Address"
                                                aria-describedby="basic-icon-default-message2"
                                                defaultValue={""}
                                                onChange={(e) => {
                                                  setHomeAddress(
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%", marginLeft: 10 }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-email"
                                        >
                                          Thông Tin Liên Lạc
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <textarea
                                            type="text"
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            placeholder="Thông Tin Liên Lạc"
                                            aria-label="Contact Info"
                                            aria-describedby="basic-icon-default-email2"
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
                                        <div className="form-text"></div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%", marginLeft: 10 }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-message"
                                        >
                                          Mô Tả Cụ Thể
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <textarea
                                            id="basic-icon-default-message"
                                            className="form-control"
                                            placeholder="Viết Mô Tả"
                                            aria-label="Description"
                                            aria-describedby="basic-icon-default-message2"
                                            defaultValue={""}
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
                                        height: 35,
                                        width: 100,
                                        fontSize: 13,
                                        paddingTop: 1,
                                        marginLeft: "82%",
                                        marginTop: "-40px",
                                        backgroundColor: "#82AAE3",
                                        color: "white",
                                        marginBottom: 30,
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
                                  <h5 className="mb-0">Cập Nhật Chi Nhánh</h5>
                                </div>
                                <div className="card-body">
                                  <form>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        padding: 30,
                                      }}
                                    >
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%", marginLeft: 10 }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-fullname"
                                        >
                                          Tên Chi Nhánh
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="basic-icon-default-fullname"
                                            placeholder="Tên Chi Nhánh"
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
                                        style={{ width: "45%", marginLeft: 10 }}
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
                                            placeholder="Image"
                                            aria-label="ACME Inc."
                                            aria-describedby="basic-icon-default-company2"
                                            // value={imageUrl}
                                            onChange={(e) => {
                                              createNewURL(e);
                                            }}
                                          />
                                          <img
                                            src={imageUrl}
                                            style={{ height: 30, width: 30 }}
                                          ></img>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{
                                          width: "91%",
                                          border:
                                            "0.1px solid rgb(201, 201, 201)",
                                          borderRadius: "10px",
                                          marginLeft: 10,
                                        }}
                                      >
                                        <div
                                          className="card-header d-flex justify-content-between align-items-center"
                                          style={{
                                            marginTop: 10,

                                            height: 40,
                                            backgroundColor: "white",
                                            padding: "20px 24px",
                                            borderColor: "white",
                                          }}
                                        >
                                          <div
                                            className="mb-0"
                                            style={{ fontWeight: "500" }}
                                          >
                                            Thông Tin Địa Chỉ
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                          }}
                                        >
                                          <div
                                            className="mb-3"
                                            style={{
                                              width: "45%",
                                              marginLeft: 50,
                                            }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-phone"
                                            >
                                              Thành Phố / Tỉnh
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
                                            <div
                                              className="form-text"
                                              style={{ color: "red" }}
                                            >
                                              {cityErrorMessage}
                                            </div>
                                          </div>
                                          <div
                                            className="mb-3"
                                            style={{
                                              width: "45%",
                                              marginLeft: 10,
                                            }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-phone"
                                            >
                                              Quận/ Huyện
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
                                            <div
                                              className="form-text"
                                              style={{ color: "red" }}
                                            >
                                              {districtsErrorMessage}
                                            </div>
                                          </div>
                                          <div
                                            className="mb-3"
                                            style={{
                                              width: "45%",
                                              marginLeft: 50,
                                            }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-phone"
                                            >
                                              Phường/ Xã
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
                                            style={{
                                              width: "45%",
                                              marginLeft: 10,
                                            }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-message"
                                            >
                                              Địa Chỉ Cụ Thể
                                            </label>
                                            <div className="input-group input-group-merge">
                                              <input
                                                id="basic-icon-default-message"
                                                className="form-control"
                                                placeholder=" Home Address"
                                                aria-label=" Home Address"
                                                aria-describedby="basic-icon-default-message2"
                                                defaultValue={""}
                                                value={homeAddress}
                                                onChange={(e) => {
                                                  setHomeAddress(
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%", marginLeft: 10 }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-email"
                                        >
                                          Thông Tin Liên Lạc
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <textarea
                                            type="text"
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            placeholder="Thông Tin Liên Lạc"
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
                                        <div className="form-text"></div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%", marginLeft: 10 }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-message"
                                        >
                                          Mô Tả
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
                                        height: 35,
                                        width: 100,
                                        fontSize: 13,
                                        paddingTop: 1,
                                        marginLeft: "84%",
                                        marginTop: "-40px",
                                        backgroundColor: "#82AAE3",
                                        color: "white",
                                        marginBottom: 30,
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
                        <div className="dialog overlay" id="my-dialog3">
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
                                    Xem Thông Tin Chi Nhánh
                                  </h5>
                                </div>
                                <div className="card-body">
                                  <form>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        padding: 30,
                                      }}
                                    >
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-fullname"
                                        >
                                          Tên Chi Nhánh
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <div
                                            type="text"
                                            id="basic-icon-default-fullname"
                                            placeholder="Tên Chi Nhánh"
                                            aria-describedby="basic-icon-default-fullname2"
                                          >
                                            {siteName}
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-company"
                                        >
                                          Hình Ảnh
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
                                            // onChange={(e) => {
                                            //   setImageUrl(e.target.value);
                                            // }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{
                                          width: "90%",
                                          border:
                                            "1px solid rgb(201, 201, 201)",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <div
                                          className="card-header d-flex justify-content-between align-items-center"
                                          style={{
                                            marginTop: 10,
                                            height: 40,
                                            backgroundColor: "white",
                                            padding: "20px 24px",
                                            borderColor: "white",
                                          }}
                                        >
                                          <div
                                            className="mb-0"
                                            style={{ fontWeight: "500" }}
                                          >
                                            Thông Tin Địa Chỉ
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                          }}
                                        >
                                          <div
                                            className="mb-3"
                                            style={{
                                              width: "45%",
                                              marginLeft: "50px",
                                            }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-phone"
                                            >
                                              Thành Phố / Tỉnh
                                            </label>
                                            <div className="input-group input-group-merge">
                                              <select
                                                name="city"
                                                id="basic-icon-default-email"
                                                disabled
                                                style={{
                                                  border: "none",
                                                  backgroundColor: "white",
                                                }}
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
                                            <div
                                              className="form-text"
                                              style={{ color: "red" }}
                                            >
                                              {cityErrorMessage}
                                            </div>
                                          </div>
                                          <div
                                            className="mb-3"
                                            style={{ width: "45%" }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-phone"
                                            >
                                              Quận/ Huyện
                                            </label>
                                            <div className="input-group input-group-merge">
                                              <select
                                                id="basic-icon-default-email"
                                                className="form-control"
                                                disabled
                                                style={{
                                                  border: "none",
                                                  backgroundColor: "white",
                                                }}
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
                                            <div
                                              className="form-text"
                                              style={{ color: "red" }}
                                            >
                                              {districtsErrorMessage}
                                            </div>
                                          </div>
                                          <div
                                            className="mb-3"
                                            style={{
                                              width: "45%",
                                              marginLeft: "50px",
                                            }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-phone"
                                            >
                                              Phường/ Xã
                                            </label>
                                            <div className="input-group input-group-merge">
                                              <select
                                                id="basic-icon-default-email"
                                                className="form-control"
                                                disabled
                                                style={{
                                                  border: "none",
                                                  backgroundColor: "white",
                                                }}
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
                                            style={{ width: "45%" }}
                                          >
                                            <label
                                              className="form-label"
                                              htmlFor="basic-icon-default-message"
                                            >
                                              Địa Chỉ Cụ Thể
                                            </label>
                                            <div className="input-group input-group-merge">
                                              <input
                                                id="basic-icon-default-message"
                                                disabled
                                                style={{
                                                  border: "none",
                                                  backgroundColor: "white",
                                                }}
                                                className="form-control"
                                                placeholder=" Home Address"
                                                aria-label=" Home Address"
                                                aria-describedby="basic-icon-default-message2"
                                                defaultValue={""}
                                                value={homeAddress}
                                                onChange={(e) => {
                                                  setHomeAddress(
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <div
                                        className="mb-3"
                                        style={{ width: "95%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Thành Phố / Tỉnh
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            name="city"
                                            id="basic-icon-default-email"
                                            disabled
                                            style={{
                                              border: "none",
                                              backgroundColor: "white",
                                            }}
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
                                        <div
                                          className="form-text"
                                          style={{ color: "red" }}
                                        >
                                          {cityErrorMessage}
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
                                          Quận/ Huyện
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            disabled
                                            style={{
                                              border: "none",
                                              backgroundColor: "white",
                                            }}
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
                                        <div
                                          className="form-text"
                                          style={{ color: "red" }}
                                        >
                                          {districtsErrorMessage}
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
                                          Phường/ Xã
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            id="basic-icon-default-email"
                                            className="form-control"
                                            disabled
                                            style={{
                                              border: "none",
                                              backgroundColor: "white",
                                            }}
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
                                          Địa Chỉ Cụ Thể
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <input
                                            id="basic-icon-default-message"
                                            disabled
                                            style={{
                                              border: "none",
                                              backgroundColor: "white",
                                            }}
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
                                      </div> */}
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-email"
                                        >
                                          Thông Tin Liên Lạc
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <div
                                            type="text"
                                            id="basic-icon-default-fullname"
                                            placeholder="Tên Chi Nhánh"
                                            aria-describedby="basic-icon-default-fullname2"
                                          >
                                            {contactInfo}
                                          </div>

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
                                        <div className="form-text"></div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{ width: "45%" }}
                                      >
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-message"
                                        >
                                          Mô Tả
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <textarea
                                            id="basic-icon-default-message"
                                            disabled
                                            style={{
                                              border: "none",
                                              backgroundColor: "white",
                                            }}
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
export default SiteOwner;
