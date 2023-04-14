import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarAdmin";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { getDataByPath, createDataByPath } from "../../services/data.service";
import { useHistory } from "react-router-dom";

const NewEmployees = () => {
  const [site, setSite] = useState(null);
  const [siteID, setSiteID] = useState("");
  const [employees, setEmployees] = useState([]);
  const [city, setCity] = useState([]);
  const [cityID, setCityID] = useState("");
  const [districs, setDistrics] = useState([]);
  const [districtID, setDistrictID] = useState([]);
  const [ward, setWard] = useState([]);
  const [wardID, setWardID] = useState([]);

  const [id, setID] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [totalEmployees, setTotalEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [role, setRole] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [roleID, setRoleID] = useState("");
  async function loadDataEmployee() {
    const path = `User?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    console.log("check1", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setEmployees(res.data.items);
      setTotalEmployees(res.data.totalRecord);
    }
  }
  let history = useHistory();
  const genders = [
    { name: "Male", value: 0 },
    { name: "FeMale", value: 1 },
  ];
  const [fullnameErrorMessage, setFullnameErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const checkValidation = () => {
    let isValid = true;

    if (!fullname.trim()) {
      setFullnameErrorMessage("Vui lòng điền tên đầy đủ");
      isValid = false;
    } else {
      setFullnameErrorMessage("");
    }

    if (!username.trim()) {
      setUsernameErrorMessage("Vui long đặt UserName");
      isValid = false;
    } else {
      setUsernameErrorMessage("");
    }

    if (!phone.trim()) {
      setPhoneErrorMessage("Phone number is required");
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

  const dataForCreate = () => {
    return {
      username: username,
      fullname: fullname,
      phoneNo: phone,
      email: email,
      cityID: cityID,
      districtID: districtID,
      wardID: wardID,
      homeNumber: "Chưa có",
      imageUrl: imageUrl,
      dob: "",
      roleId: roleID,
      siteId: siteID,
      gender: gender,
    };
  };

  async function createNewProducts() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (checkValidation()) {
        const data = dataForCreate();
        const path = "User/Register";
        const res = await createDataByPath(path, accessToken, data);
        console.log("Check res", res);
        console.log("display", data);
        if (res && res.status === 201) {
          Swal.fire("Create Success", "", "success");
          history.push("/Employees");
        }
      }
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
     console.log('res.data',res.data)
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
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("display", accessToken);
    if (site === null) {
      loadDataEmployee(accessToken);
    }
  }, [currentPage, perPage]);

  return (
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

          {/* / Navbar */}
          {/* Content wrapper */}
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
                  <h5 className="mb-0">Thêm Mới Nhân Viên</h5>
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
                          placeholder="Name"
                          aria-label="John Doe"
                          aria-describedby="basic-icon-default-fullname2"
                          onChange={(e) => setFullname(e.target.value)}
                        />
                      </div>
                      <div className="form-text" style={{ color: "red" }}>
                        {fullnameErrorMessage}
                      </div>
                    </div>
                    <div className="mb-3" style={{ width: "100%" }}>
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
                          placeholder="User Name"
                          aria-label="ACME Inc."
                          aria-describedby="basic-icon-default-company2"
                          onChange={(e) => setUsername(e.target.value)}
                        />
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
                          placeholder="Phone Number"
                          aria-label="Phone Number"
                          aria-describedby="basic-icon-default-email2"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="form-text" style={{ color: "red" }}>
                        {phoneErrorMessage}
                      </div>
                    </div>
                    <div className="mb-3" style={{ width: "100%" }}>
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
                          aria-describedby="basic-icon-default-email2"
                          onChange={(e) => setEmail(e.target.value)}
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
                        Hình Ảnh
                      </label>
                      <div className="input-group input-group-merge">
                        <input
                          type="text"
                          id="basic-icon-default-phone"
                          className="form-control phone-mask"
                          placeholder="Image"
                          aria-label="658 799 8941"
                          aria-describedby="basic-icon-default-phone2"
                          onChange={(e) => setImageUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3" style={{ width: "100%" }}>
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
                    <div className="mb-3" style={{ width: "100%" }}>
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
                    <div className="mb-3" style={{ width: "95%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-phone"
                      >
                        Chức Vụ
                      </label>
                      <div className="input-group input-group-merge">
                        <select
                          name="city"
                          id="basic-icon-default-email"
                          className="form-control"
                          onChange={(e) => handleRole(e)}
                        >
                          {role &&
                            role.length &&
                            role.map((e, index) => {
                              return (
                                <>
                                  <option
                                    key={e.roleID}
                                    value={e.roleID}
                                    onClick={() => {
                                      setRole(e.roleID);
                                    }}
                                  >
                                    {e.roleName}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="mb-3" style={{ width: "100%" }}>
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
                          onChange={(e) => handleGender(e)}
                        >
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
                    </div>
                    {roleID === "3"|| roleID === "4"? null : (
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Chi Nhánh
                        </label>
                        <div className="input-group input-group-merge">
                          <select
                            name="Site"
                            id="basic-icon-default-email"
                            className="form-control"
                            onChange={(e) => handleSite(e)}
                          >
                            {site &&
                              site.length &&
                              site.map((e, index) => {
                                return (
                                  <>
                                    <option
                                      key={e.id}
                                      value={e.id}
                                      onClick={() => {
                                        setSite(e.id);
                                      }}
                                    >
                                      {e.siteName}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    )}
                    
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
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </div>
  );
};
export default NewEmployees;
