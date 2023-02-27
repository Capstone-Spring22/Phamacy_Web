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

const LoginAdmin = () => {
  const navigate = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
  };
  async function loginWithUsernamePassword(username, password) {
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
          localStorage.setItem("roleID", jwtDecode(res.data.token)[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ]);
          const roleID = jwtDecode(res.data.token)[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
          const decoded = jwtDecode(res.data.token);

          console.log("ss", roleID);

          if (roleID === "Manager") {
            navigate.push("/ImportProduct");
          } else if (roleID === "Pharmacist") {
            navigate.push("/Order");
          } else if (roleID === "Admin") {
            navigate.push("/Employees");
          } else if (roleID === "Owner") {
            navigate.push("/Drug");
          }
        }
      }
    }
  }

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
                  <div className="app-brand justify-content-center">
                    <a href="index.html" className="app-brand-link gap-2">
                      <span className="app-brand-text demo text-body fw-bolder">
                        BetterHealth
                      </span>
                    </a>
                  </div>
                  {/* /Logo */}
                  <h4 className="mb-2">Welcome to Sneat! 👋</h4>
                  <p className="mb-4">
                    Please sign-in to your account and start the adventure
                  </p>
                  <form
                    id="formAuthentication"
                    className="mb-3"
                    action="index.html"
                    method="POST"
                    onSubmit={handleLogin}
                  >
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email or Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email-username"
                        placeholder="Enter your email or username"
                        autofocus=""
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <div className="d-flex justify-content-between">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <a href="auth-forgot-password-basic.html">
                          <small>Forgot Password?</small>
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
                        className="btn btn-primary d-grid w-100"
                        type="submit"
                        onClick={() =>
                          loginWithUsernamePassword(username, password)
                        }
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                  <p className="text-center">
                    <span>New on our platform?</span>
                    <a href="auth-register-basic.html">
                      <span>Create an account</span>
                    </a>
                  </p>
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
