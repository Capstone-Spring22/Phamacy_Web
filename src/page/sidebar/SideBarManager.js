import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { getDataByPath, deleteDataByPath } from "../../services/data.service";
import "../../assets/css/core.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navigate = useHistory();
  const handleLogout = async () => {
    try {
      navigate.push("/");
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
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="app-brand demo">
          <Link to="/Home" className="app-brand-link">
            <span
              className="app-brand-text demo menu-text fw-bolder ms-2"
              style={{ color: "#0077c9", fontSize: "20", lineHeight: "30" }}
            >
              BetterHealth
            </span>
            <button onClick={() => handleLogout()}>out here bro</button>
          </Link>

          <a
            href="javascript:void(0);"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle" />
          </a>
        </div>
        <br />

        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1">
          {/* Dashboard */}
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
          {/* Layouts */}

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Management</span>
          </li>
          Manager
        </ul>
      </aside>
    </>
  );
};
export default Sidebar;
