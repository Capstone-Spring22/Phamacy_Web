import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarOwner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import "../../assets/css2/dropDownAvartar.css";
import {
  getDataByPath,
  deleteDataByPath,
  updateDataByPath,
  createDataByPath,
} from "../../services/data.service";
import axios from "axios";

const ProfileOwner = () => {
  const [site, setSite] = useState(null);
  const [siteID, setSiteID] = useState("");
  const [city, setCity] = useState([]);
  const [cityID, setCityID] = useState("");
  const [districs, setDistrics] = useState([]);
  const [districtID, setDistrictID] = useState("");
  const [ward, setWard] = useState([]);
  const [wardID, setWardID] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [role, setRole] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState([]);
  const [roleID, setRoleID] = useState("");
  const [districtSelected, setDistrictSelected] = useState(false);
  const [wardSelected, setWardSelected] = useState(false);
  const [citySelected, setCitySelected] = useState(false);
  const [roleSelected, setRoleSelected] = useState(false);
  const [siteSelected, setSiteSelected] = useState(false);
  const [genderSelected, setGenderSelected] = useState(false);

  let history = useHistory();
  const genders = [
    { name: "Nam", value: 1 },
    { name: "Nữ", value: 0 },
  ];
  const [fullnameErrorMessage, setFullnameErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [cityErrorMessage, setCityErrorMessage] = useState("");
  const [districtErrorMessage, setDistrictErrorMessage] = useState("");
  const [wardErrorMessage, setWardErrorMessage] = useState("");
  const [roleErrorMessage, setRoleErrorMessage] = useState("");
  const [genderErrorMessage, setGenderErrorMessage] = useState("");
  const [drug, setDrug] = useState([]);
  const [employees, setEmployees] = useState([]);
  const myId = localStorage.getItem("userID");
  const [address, setAddress] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  async function loadDataEmployeeById() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `User/${myId}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("res", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setEmployees(res.data);
        loadAddressByID(res.data.addressID);
        setFullname(res.data.fullname);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPhoneNo(res.data.phoneNo);
        setGender(res.data.gender);
        setHomeAddress(res.data.homeNumber);
        setCityID(res.data.cityID);
        setDistrictID(res.data.districtID);
        setWardID(res.data.wardID);
        setImageUrl(res.data.imageUrl);
      }
    }
  }
  async function loadAddressByID(id) {
    const path = `Address/${id}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      // setSiteUpdate(res.data);
      setAddress(res.data);
    }
  }
  const dataForUpdate = () => {
    return {
      fullname: fullname,
      username: username,
      phoneNo: phoneNo,
      email: email,

      cityID: cityID,
      districtID: districtID,
      wardID: wardID,
      homeNumber: homeAddress,
      imageUrl: imageUrl,
      gender: gender,
    };
  };
  const dataForUpdateImg = () => {
    return {
      fullname: fullname,
      username: username,
      phoneNo: phoneNo,
      email: email,
      imageUrl: imageUrl,
      cityID: cityID,
      districtID: districtID,
      wardID: wardID,
      homeNumber: homeAddress,
      imageUrl: imageUrl,
      gender: gender,
    };
  };
  const dataForUpdatePassword = () => {
    return {
      fullname: fullname,
      username: username,
      phoneNo: phoneNo,
      email: email,
      cityID: cityID,
      districtID: districtID,
      wardID: wardID,
      homeNumber: homeAddress,
      imageUrl: imageUrl,
      gender: gender,
      isChangePassword: true,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
  };
  async function updateProfile() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const data = dataForUpdate();
      const path = `User/Update`;
      const res = await updateDataByPath(path, accessToken, data);
      console.log("checkRes", res);
      console.log("data", data);
      if (res && res.status === 200) {
        Swal.fire("Cập Nhật Thông Tin Thành Công", "", "success");
        setIsOpen(false);
        loadDataEmployeeById();
      }
    }
  }
  async function UpdateImg(imageUrl) {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const data = dataForUpdate();
      data.imageUrl = imageUrl;
      const path = `User/Update`;
      const res = await updateDataByPath(path, accessToken, data);
      console.log("checkRes", res);
      console.log("data", data);
      if (res && res.status === 200) {
        Swal.fire("Cập Nhật Ảnh Thành Công", "", "success");
        loadDataEmployeeById();
      }
    }
  }
  async function UpdatePassword() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const data = dataForUpdatePassword();
      const path = `User/Update`;
      const res = await updateDataByPath(path, accessToken, data);
      console.log("checkRes", res);
      console.log("data", data);
      if (res && res.status === 200) {
        Swal.fire("Cập Nhật Password Thành công", "", "success");
        setIsOpen2(false);
        loadDataEmployeeById();
      }
    }
  }
  useEffect(() => {
    loadDataEmployeeById();
  }, []);
  const [categoryUpdate, setCategoryUpdate] = useState({
    fullname: fullname,
    username: "",
    phoneNo: "",
    email: "",
    cityID: cityID,
    districtID: districtID,
    wardID: wardID,
    homeNumber: "",
    imageUrl: "",
    dob: "",
    roleId: "",
    siteId: "",
    gender: "",
  });
  const checkValidation = () => {
    let isValid = true;

    if (!fullname.trim()) {
      setFullnameErrorMessage("Vui lòng điền tên đầy đủ");
      isValid = false;
    } else {
      setFullnameErrorMessage("");
    }

    if (!username.trim()) {
      setUsernameErrorMessage("Vui lòng đặt UserName");
      isValid = false;
    } else {
      setUsernameErrorMessage("");
    }
    if (!cityID.trim()) {
      setCityErrorMessage("Vui chọn thành phố");
      isValid = false;
    } else {
      setCityErrorMessage("");
    }
    if (!districtID.trim()) {
      setDistrictErrorMessage("Vui chọn quận");
      isValid = false;
    } else {
      setDistrictErrorMessage("");
    }
    if (!wardID.trim()) {
      setWardErrorMessage("Vui chọn đường");
      isValid = false;
    } else {
      setWardErrorMessage("");
    }
    if (!roleID.trim()) {
      setRoleErrorMessage("Vui chọn chức vụ");
      isValid = false;
    } else {
      setRoleErrorMessage("");
    }
    if (!gender.trim()) {
      setGenderErrorMessage("Vui chọn giới tính");
      isValid = false;
    } else {
      setGenderErrorMessage("");
    }

    if (!phoneNo.trim()) {
      setPhoneErrorMessage("Vui lòng nhập số điện thoại");
      isValid = false;
    } else {
      setPhoneErrorMessage("");
    }

    if (!email.trim()) {
      setEmailErrorMessage("Vui lòng điền email");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErrorMessage("Vui lòng điền đúng (abc@gmail.com)");
      isValid = false;
    } else {
      setEmailErrorMessage("");
    }

    return isValid;
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
      UpdateImg(res.data);
    }
  }

  async function loadDataSite() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Site?pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("check", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setSite(res.data.items);
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
  async function loadDataRole() {
    const path = `Role`;
    const res = await getDataByPath(path, "", "");
    console.log("res.data", res.data);
    if (res !== null && res !== undefined && res.status === 200) {
      setRole(res.data);
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
  const handleGender = (event) => {
    event.preventDefault();
    const genderID = event.target.value;
    setGender(genderID);
  };
  const handleSite = (event) => {
    event.preventDefault();
    const siteID = event.target.value;
    setSiteID(siteID);
  };
  const handleRole = (event) => {
    event.preventDefault();
    const roleID = event.target.value;
    setRoleID(roleID);
  };

  useEffect(() => {
    loadDataCity();
  }, []);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("display", accessToken);
    if (site === null) {
      loadDataSite(accessToken);
    }
  }, []);
  useEffect(() => {
    loadDataRole();
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
            <div
              className={`dialog overlay ${isOpen ? "" : "hidden"}`}
              id="my-dialog"
            >
              <a href="#" className="overlay-close" />

              <div
                className="row "
                style={{ width: 1200, marginTop: 60, marginLeft: 25 }}
              >
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
                      <h5 className="mb-0">Thông Tin Cá Nhân</h5>
                    </div>
                    <div className="card-body">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto",
                          padding: 30,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-fullname"
                          >
                            Tên Đầy Đủ
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Đầy Đủ"
                              value={fullname}
                              aria-label="John Doe"
                              aria-describedby="basic-icon-default-fullname2"
                              onChange={(e) => {
                                setFullname(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-text" style={{ color: "red" }}>
                            {fullnameErrorMessage}
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-company"
                          >
                            Tên Tài Khoản
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-company"
                              className="form-control"
                              placeholder="Tên Tài Khoản"
                              aria-label="ACME Inc."
                              value={username}
                              aria-describedby="basic-icon-default-company2"
                              onChange={(e) => {
                                setUsername(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-text" style={{ color: "red" }}>
                            {usernameErrorMessage}
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-email"
                          >
                            Số điện thoại
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-email"
                              className="form-control"
                              placeholder="Số điện thoại"
                              aria-label="Phone Number"
                              value={phoneNo}
                              aria-describedby="basic-icon-default-email2"
                              onChange={(e) => {
                                setPhoneNo(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-text" style={{ color: "red" }}>
                            {phoneErrorMessage}
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-email"
                          >
                            Email
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-email"
                              className="form-control"
                              placeholder="Email"
                              aria-label="Email"
                              value={email}
                              aria-describedby="basic-icon-default-email2"
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-text" style={{ color: "red" }}>
                            {emailErrorMessage}
                          </div>
                        </div>

                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Thành Phố
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
                          <div className="form-text" style={{ color: "red" }}>
                            {cityErrorMessage}
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
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
                                <option value="">---Chọn Quận/ Huyện</option>
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
                          <div className="form-text" style={{ color: "red" }}>
                            {districtErrorMessage}
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Phường/Xã
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
                                <option value="">--- Chọn Phường/ Xã</option>
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
                          <div className="form-text" style={{ color: "red" }}>
                            {wardErrorMessage}
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-fullname"
                          >
                            Địa Chỉ
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Đầy Đủ"
                              value={homeAddress}
                              aria-label="John Doe"
                              aria-describedby="basic-icon-default-fullname2"
                              onChange={(e) => {
                                setHomeAddress(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-text" style={{ color: "red" }}>
                            {fullnameErrorMessage}
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Giới Tính
                          </label>
                          <div className="input-group input-group-merge">
                            <select
                              name="Site"
                              id="basic-icon-default-email"
                              className="form-control"
                              onChange={(e) => {
                                setGenderSelected(false);
                                handleGender(e);
                              }}
                              value={gender}
                            >
                              {!genderSelected && (
                                <option value="">--- Chọn Giới tính </option>
                              )}
                              {genders &&
                                genders.length &&
                                genders.map((e, index) => {
                                  return (
                                    <>
                                      <option
                                        key={e.name}
                                        value={e.value}
                                        onClick={() => {
                                          setGender(e.value);
                                        }}
                                      >
                                        {e.name}
                                      </option>
                                    </>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="form-text" style={{ color: "red" }}>
                            {genderErrorMessage}
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="button-28"
                        onClick={(e) => {
                          e.preventDefault();
                          updateProfile();
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
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`dialog overlay `}
              id="my-dialog2"
            >
              <a href="#" className="overlay-close" />

              <div
                className="row "
                style={{ width: 1200, marginTop: 60, marginLeft: 25 }}
              >
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
                      <h5 className="mb-0">Thông Tin Cá Nhân</h5>
                    </div>
                    <div className="card-body">
                      <div
                        style={{
                          display: "grid",

                          padding: 30,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-fullname"
                          >
                            Mật Khẩu cũ
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Mật Khẩu cũ"
                              aria-label="John Doe"
                              aria-describedby="basic-icon-default-fullname2"
                              onChange={(e) => {
                                setOldPassword(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-text" style={{ color: "red" }}>
                            {fullnameErrorMessage}
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-company"
                          >
                            Mật Khẩu Mới
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              id="basic-icon-default-company"
                              className="form-control"
                              placeholder="Mật Khẩu Mới"
                              aria-label="ACME Inc."
                              aria-describedby="basic-icon-default-company2"
                              onChange={(e) => {
                                setNewPassword(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-text" style={{ color: "red" }}>
                            {usernameErrorMessage}
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-email"
                          >
                            Xác Nhận Mật Khẩu
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              id="basic-icon-default-email"
                              className="form-control"
                              placeholder="Xác Nhận Mật Khẩu"
                              aria-label="Phone Number"
                              aria-describedby="basic-icon-default-email2"
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-text" style={{ color: "red" }}>
                            {phoneErrorMessage}
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="button-28"
                        onClick={(e) => {
                          e.preventDefault();
                          UpdatePassword();
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
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* / Navbar */}
            {/* Content wrapper */}
            <div>
              <div className="container" style={{ marginTop: 50, width: 1200 }}>
                <div className="main-body">
                  {/* Breadcrumb */}

                  {/* /Breadcrumb */}
                  <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                      <div className="card" style={{ border: "none" }}>
                        <div className="card-body" style={{ border: "none" }}>
                          <div
                            className="d-flex flex-column align-items-center text-center"
                            style={{ border: "none" }}
                          >
                            <img
                              src={
                                imageUrl
                                  ? imageUrl
                                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/2048px-Faenza-avatar-default-symbolic.svg.png"
                              }
                              alt="Admin"
                              className="rounded-circle"
                              style={{width:150,height:150,objectFit:"cover"}}
                            />
                            <div className="mt-3" style={{ border: "none" }}>
                              <h4>{employees.username}</h4>
                              <p className="text-secondary mb-1">
                                {employees.roleName}
                              </p>
                              <p className="text-muted font-size-sm">
                                {employees.fullyAddress}
                              </p>

                              <label
                                htmlFor="file-input"
                                className="btn btn-primary"
                              >
                                Đổi Ảnh
                              </label>
                              <input
                                id="file-input"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                  createNewURLAdd(e);
                                }}
                              />

                              <a
                               onClick={()=>{setIsOpen2(true)}}
                              style={{marginTop:5}}
                                className="btn btn-outline-primary"
                                href="#my-dialog2"
                              >
                                Đổi Mật Khẩu
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div
                        className="card mb-3"
                        style={{ height: 555, border: "none" }}
                      >
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Tên Đầy Đủ</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {employees.fullname}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Tên Tài Khoản</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {employees.username}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {employees.email}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Số Điện Thoại</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {employees.phoneNo}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Giới tính</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {employees.gender === 1 ? "Nam" : "Nữ"}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Ngày Sinh</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {employees.dob === null
                                ? "Chưa có"
                                : employees.dob}
                            </div>
                          </div>

                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Mã Nhân Viên</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {employees.code}
                            </div>
                          </div>
                          <hr />

                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Địa Chỉ</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {employees.fullyAddress}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <a
                                className=" button-28"
                                href="#my-dialog"
                                onClick={()=>{setIsOpen(true)}}
                                style={{
                                  backgroundColor: "#11cdef",
                                  color: "#FFFFFF",
                                  width: 80,
                                  height: 40,
                                  paddingTop: 11,
                                }}
                              >
                                Sửa
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </>
  );
};
export default ProfileOwner;
