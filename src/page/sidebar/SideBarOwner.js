import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { getDataByPath, deleteDataByPath } from "../../services/data.service";
import "../../assets/css/core.css";
import { Link } from "react-router-dom";
import logo from "../../assets/BH.png";
import jwtDecode from "jwt-decode";
const Sidebar = ({ activeItem }) => {
  const navigate = useHistory();

  const [user, setUser] = useState([]);

  async function loadDataUserByID() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");

      console.log("localStorage", localStorage);
      const path = `User/${localStorage.userID}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("res", res.data);
      console.log("user", user);
      if (res !== null && res !== undefined && res.status === 200) {
        setUser(res.data);
      }
    }
  }
  const myId = localStorage.getItem("userID");
  const view = (myId) => {
    localStorage.setItem("userID", myId);
    navigate.push("/ProfileOwner");
  };
  useEffect(() => {
    loadDataUserByID();
  }, []);

  const handleLogout = async () => {
    try {
      navigate.push("/LoginAdmin");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("roleID");
      localStorage.removeItem("userID");
      localStorage.removeItem("id");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
        style={{
          backgroundImage: "#ffffff",
          position: "fixed",
          height: 1000,
          border: "1px solid #ecf0f2",
        }}
      >
        <div className="app-brand demo" style={{ marginLeft: -30 }}>
          <Link to="/DashBoardOwner" className="app-brand-link" style={{ marginTop: 40 }}>
            <img src={logo} style={{ marginRight: 60 }} />
          </Link>
        </div>
        <br />

        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Welcome</span>
        </li>

        <div
          className="header-sidebar"
          onClick={(a) => {
            a.preventDefault();
            view(myId);
          }}
          style={{cursor:"pointer"}}
        >
          {user.imageUrl ? (
            <img className="header-img" src={user.imageUrl} />
          ) : (
            <img
              className="header-img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAEUTUFvPsiiOjdB2ocRUt0wh10kho3Mt9dA&usqp=CAU"
            />
          )}
          {user && user.fullname && (
            <div className="header-sidebar-name">{user.fullname}</div>
          )}
        </div>

        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1">
          {/* Dashboard */}

          {/* Layouts */}

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Quản Lý</span>
          </li>
          <li
            className={`menu-item ${
              activeItem == "DashBoardOwner" ? "active" : ""
            }`}
          >
            <Link to="/DashBoardOwner" className="menu-link">
              <svg
                style={{ margin: "5" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-house"
                viewBox="0 0 16 16"
              >
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
              </svg>
              <div data-i18n="Analytics">Dashboard</div>
            </Link>
          </li>
          <li className={`menu-item ${activeItem == "Drug" ? "active" : ""}`}>
            <Link className="menu-link" to="/Drug">
              <svg
                style={{ margin: "5" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-capsule"
                viewBox="0 0 16 16"
              >
                <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429l4.243 4.242Z" />
              </svg>
              <div data-i18n="Support">Sản Phẩm</div>
            </Link>
          </li>
          <li
            className={`menu-item ${
              activeItem === "Manufacturer" ? "active" : ""
            }`}
          >
            <Link to="Manufacturer" className="menu-link">
              <svg
                style={{ margin: "5" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bookmark-check"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
              </svg>

              <div data-i18n="Support">Nhà Sản Xuất</div>
            </Link>
          </li>
          <li
            className={`menu-item ${
              activeItem === "MainCategory" ? "active" : ""
            }`}
          >
            <Link to="MainCategory" className="menu-link">
              <svg
                style={{ margin: "5" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bookmark-check"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
              </svg>

              <div data-i18n="Support">Danh Mục Chính</div>
            </Link>
          </li>
          <li
            className={`menu-item ${activeItem == "SiteOwner" ? "active" : ""}`}
          >
            <Link to="/SiteOwner" className="menu-link">
              <svg
                style={{ margin: "5" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-hospital"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1h1ZM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5Zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9h-.5Zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Z" />
                <path d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1V1Zm2 14h2v-3H7v3Zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3Zm0-14H6v1h4V1Zm2 7v7h3V8h-3Zm-8 7V8H1v7h3Z" />
              </svg>
              <div data-i18n="Support">Danh Sách Chi Nhánh</div>
            </Link>
          </li>
          <li
            className={`menu-item ${
              activeItem == "ProductDiscount" ? "active" : ""
            }`}
          >
            <Link to="ProductDiscount" className="menu-link">
              <svg
                style={{ margin: "5" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-percent"
                viewBox="0 0 16 16"
              >
                <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              </svg>

              <div data-i18n="Support">Giảm Giá</div>
            </Link>
          </li>

          <li
            className={`menu-item ${
              activeItem === "SubCategory" ? "active" : ""
            }`}
          >
            <Link to="SubCategory" className="menu-link">
              <svg
                style={{ margin: "5" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
              <div data-i18n="Support">Danh Mục Phụ</div>
            </Link>
          </li>
          <li className="menu-item" onClick={() => handleLogout()}>
            <Link className="menu-link" style={{}}>
              <svg
                style={{ margin: "5" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>

              <div data-i18n="Support">Đăng Xuất</div>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};
export default Sidebar;
