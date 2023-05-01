import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import "../../assets/css/theme-default.css";
import "../../assets/css2/dropDownAvartar.css";
import {
  getDataByPath,
  deleteDataByPath,
  loginDataByPath,
} from "../../services/data.service";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import logo from "../../assets/BH.png";
import Swal from "sweetalert2";
const LoginAdmin = () => {
  const navigate = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
  };

  const [error, setError] = useState("");
  async function loginWithUsernamePassword(username, password) {
    if (!username || !password) {
      setError("Vui lòng nhập tên đăng nhập và mật khẩu");
      return;
    }
    if (username.trim() !== "" && password.trim() !== "") {
      const path = "Member/InternalUser/Login";
      const data = {
        username: username,
        password: password,
      };
      const res = await loginDataByPath(path, data);
      console.log(res);
      console.log("display", localStorage);

      if (res && res.status === 200) {
        if (localStorage) {
          localStorage.setItem("accessToken", res.data.token);
          localStorage.setItem(
            "roleID",
            jwtDecode(res.data.token)[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ]
          );
          localStorage.setItem(
            "userID",
            jwtDecode(res.data.token)[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ]
          );
          const roleID =
            ("roleID",
            jwtDecode(res.data.token)[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ]);

          localStorage.setItem("SiteID", jwtDecode(res.data.token).SiteID);
          const decoded = jwtDecode(res.data.token);

          console.log("ss", jwtDecode(res.data.token));

          if (roleID === "Manager") {
            navigate.push("/DashBoardManager");
          } else if (roleID === "Pharmacist") {
            navigate.push("/Order");
          } else if (roleID === "Admin") {
            navigate.push("/DashBoardAdmin");
          } else if (roleID === "Owner") {
            navigate.push("/DashBoardOwner");
          }
        }
      } else {
        setError("Sai tên hoặc mật khẩu vui lòng thử lại");
      }
    }
  }
  async function Authen() {
    if (localStorage && localStorage.getItem("roleID")) {
      const roleID = localStorage.getItem("roleID");
      console.log("display", roleID);
      if (roleID === "Manager") {
        navigate.push("/DashBoardManager");
      } else if (roleID === "Pharmacist") {
        navigate.push("/Order");
      } else if (roleID === "Admin") {
        navigate.push("/DashBoardAdmin");
      } else if (roleID === "Owner") {
        navigate.push("/DashBoardOwner");
      }
    }
  }
  useEffect(() => {
    Authen();
  }, []);
  return (
    <>
      <>
        <div className="container-xxl">
          <div className="authentication-wrapper authentication-basic container-p-y">
            <div className="authentication-inner">
              {/* Register */}
              <div
                className="card"
                style={{ border: "none", height: 550, width: 400 }}
              >
                <div className="card-body">
                  {/* Logo */}
                  <div
                    className="app-brand demo"
                    style={{
                      marginLeft: 20,
                      marginBottom: -80,
                      marginTop: -60,
                    }}
                  >
                    <Link to="/Home" className="app-brand-link">
                      <img src={logo} style={{ height: 250 }} />
                    </Link>
                  </div>
                  {/* /Logo */}
                  <h4 className="mb-2">Chào Mừng Đến BetterHealth! 👋</h4>
                  <p className="mb-4">
                  xin hãy đăng nhập
                  </p>
                  {error && (
                    <div className="error" style={{ color: "red" }}>
                      {error}
                    </div>
                  )}
                  <form
                    id="formAuthentication"
                    className="mb-3"
                    action="index.html"
                    method="POST"
                    onSubmit={handleLogin}
                  >
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Tên tài khoản
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email-username"
                        placeholder="Nhập Tên Tài Khoản"
                        autofocus=""
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <div className="d-flex justify-content-between">
                        <label className="form-label" htmlFor="password">
                          Mật Khẩu
                        </label>
                        <a href="auth-forgot-password-basic.html">
                          <small></small>
                        </a>
                      </div>
                      <div className="input-group input-group-merge">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          name="password"
                          placeholder="············"
                          aria-describedby="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="input-group-text cursor-pointer">
                          <i className="bx bx-hide" />
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember-me"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="remember-me"
                        >
                          {" "}
                          Remember Me{" "}
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn button-28 d-grid w-100"
                        style={{ backgroundColor: "#82AAE3", color: "white" }}
                        type="submit"
                        onClick={() =>
                          loginWithUsernamePassword(username, password)
                        }
                      >
                        Đăng Nhập
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* /Register */}
            </div>
          </div>
        </div>
        {/* / Content */}
      </>
    </>
  );
};
export default LoginAdmin;
