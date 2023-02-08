import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { Link } from "react-router-dom";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
} from "../../services/data.service";
import ReactPaginate from "react-paginate";

const NewEmployees = () => {
  const [site, setSite] = useState([]);
  const [siteID, setSiteID] = useState("");
  const [employees, setEmployees] = useState([]);
  const [city, setCity] = useState([]);
  const [cityID, setCityID] = useState("");
  const [districs, setDistrics] = useState([]);
  const [districtID, setDistrictID] = useState([]);
  const [ward, setWard] = useState([]);
  const [wardID, setWardID] = useState([]);
  const [siteName, setSiteName] = useState("");
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
  const genders = [
    { name: "Male", value: 0 },
    { name: "FeMale", value: 1 },
  ];
  const checkValidation = () => {
    // if (id.trim() === "") {
    //   Swal.fire("ID Can't Empty", "", "question");
    //   return false;
    // }
    return true;
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
      homeNumber: "",
      imageUrl: imageUrl,
      dob: "",
      roleId: roleID,
      siteId: siteID,
      gender: gender,
    };
  };

  async function createNewProducts() {
    if (checkValidation()) {
      const data = dataForCreate();
      const path = "User/Register";
      const res = await createDataByPath(path, "", data);
      console.log("Check res", res);
      console.log("display", data);
      if (res && res.status === 201) {
        Swal.fire("Create Success", "", "success");
        // deleteForCreate();
        window.location.reload();
      }
    }
  }
  async function loadDataSite() {
    const path = `Site?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setSite(res.data.items);
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
    loadDataSite();
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
    loadDataEmployee();
  }, [currentPage, perPage]);
  return (
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
                      <a className="dropdown-item" href="auth-login-basic.html">
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
                  <h5 className="mb-0">Add new Employees</h5>
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
                        Full Name
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
                    </div>
                    <div className="mb-3" style={{ width: "100%" }}>
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
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3" style={{ width: "95%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-email"
                      >
                        Phone Number
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
                      <div className="form-text"></div>
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
                      <div className="form-text"></div>
                    </div>
                    <div className="mb-3" style={{ width: "95%" }}>
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
                          onChange={(e) => setImageUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3" style={{ width: "100%" }}>
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
                    <div className="mb-3" style={{ width: "95%" }}>
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
                    <div className="mb-3" style={{ width: "100%" }}>
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
                    <div className="mb-3" style={{ width: "95%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-phone"
                      >
                        Role
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
                        Site
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
                    <div className="mb-3" style={{ width: "95%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-phone"
                      >
                        Gender
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
