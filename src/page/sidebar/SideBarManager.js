import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { getDataByPath, deleteDataByPath } from "../../services/data.service";
import "../../assets/css/core.css";
import { Link } from "react-router-dom";

const Sidebar = ({activeItem}) => {
  const navigate = useHistory();
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
        style={{ backgroundColor: "#ffffff",position: "fixed",height:1000 }}
      >
        <div className="app-brand demo">
          <Link to="/Home" className="app-brand-link">
            <span
              className="app-brand-text demo menu-text fw-bolder ms-2"
              style={{ color: "#0077c9", fontSize: "20", lineHeight: "30" }}
            >
              BetterHealth
            </span>
           
          </Link>

          <a
            href="javascript:void(0);"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle" />
          </a>
        </div>
        <br />
        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Welcome</span>
        </li>
        <div className="header-sidebar">
          <img
            className="header-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKzFBa7k745EPUvthXNsgIMvUDAILqSAMT4IbTrhOIIA&s"
          />
          <div className="header-sidebar-name">Phu159123</div>
        </div>
        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1">
          {/* Dashboard */}
       
          {/* Layouts */}

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Management</span>
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
        <li  className={`menu-item ${activeItem == "ImportProduct" ? "active" : ""}`} >
            <Link to="/ImportProduct" className="menu-link">
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
             
              <div data-i18n="Support">Import product</div>
            </Link>
          </li>
        <li className="menu-item" onClick={() => handleLogout()}>
            <Link className="menu-link">
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
             
              <div data-i18n="Support">Logout</div>
            </Link>
          </li>
      
        </ul>
       
      </aside>
    </>
  );
};
export default Sidebar;
