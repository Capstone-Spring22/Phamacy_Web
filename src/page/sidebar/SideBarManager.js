import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { getDataByPath, deleteDataByPath } from "../../services/data.service";
import "../../assets/css/core.css";
import { Link } from "react-router-dom";
import logo from "../../assets/BH.png";
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
  const myId = localStorage.getItem("userID");
  useEffect(() => {
    loadDataUserByID();
  }, []);
  const view = (myId) => {
    localStorage.setItem("userID", myId);
    navigate.push("/ProfileManager");
  };
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
        style={{ backgroundColor: "#ffffff", position: "fixed", height: 1000 }}
      >
        <div className="app-brand demo" style={{ marginLeft: -30 }}>
          <Link to="/DashBoardManager" className="app-brand-link" style={{ marginTop: 40 }}>
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
          style={{ cursor: "pointer" }}
        >
          {user.imageUrl ? (
            <img className="header-img" src={user.imageUrl} />
          ) : (
            <img
              className="header-img"
              src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
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
            <span className="menu-header-text">Tab Quản Lý</span>
          </li>
          <li className={`menu-item ${activeItem == "DashBoardManager" ? "active" : ""
            }`}>
            <Link to="/DashBoardManager" className="menu-link">
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
          <li
            className={`menu-item ${activeItem == "ImportProduct" ? "active" : ""
              }`}
          >
            <Link to="/ImportProduct" className="menu-link">
              <svg style={{ margin: "5" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
              </svg>
              <div data-i18n="Support">Nhập Hàng</div>
            </Link>
          </li>
          <li
            className={`menu-item ${activeItem == "ProductExport" ? "active" : ""
              }`}
          >
            <Link to="/ProductExport" className="menu-link">
              <svg style={{ margin: "5" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
              </svg>

              <div data-i18n="Support">Xuất Hỏng</div>
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
