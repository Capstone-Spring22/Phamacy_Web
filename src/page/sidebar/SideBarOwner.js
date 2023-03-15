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
      console.log("res", res.data.username);
      console.log("user", user);
      if (res !== null && res !== undefined && res.status === 200) {
        setUser(res.data);
      }
    }
  }
  useEffect(() => {
    loadDataUserByID();
  }, []);

  const handleLogout = async () => {
    try {
      navigate.push("/LoginAdmin");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("roleID");
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
          <Link to="/Home" className="app-brand-link" style={{ marginTop: 40 }}>
            <img src={logo} style={{ marginRight: 60 }} />
          </Link>
        </div>
        <br />

        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Welcome</span>
        </li>

        <div className="header-sidebar">
          <img
            className="header-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKzFBa7k745EPUvthXNsgIMvUDAILqSAMT4IbTrhOIIA&s"
          />{" "}
          {user && user.username && (
            <div className="header-sidebar-name">{user.username}</div>
          )}
        </div>

        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1">
          {/* Dashboard */}

          {/* Layouts */}

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Quản Lý</span>
          </li>
          <li className="menu-item ">
            <a href="#" className="menu-link">
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
            </a>
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
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
              <div data-i18n="Support">Danh Mục Chính</div>
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
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
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
