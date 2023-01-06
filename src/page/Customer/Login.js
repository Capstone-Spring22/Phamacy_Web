import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../services/firebase";
const Login = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const navigate = useHistory();
  function setUpRecapcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecapcha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate.push("/Home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-lg-flex half">
      <div
        className="bg order-1 order-md-2"
        style={{
          backgroundImage: 'url("https://wallpaper.dog/large/20378253.jpg")',
        }}
      />
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3>
                Login to <strong>Pharma</strong>
              </h3>
              <p className="mb-4"></p>

              <form
                onSubmit={getOtp}
                style={{ display: !flag ? "block" : "none" }}
              >
                <div className="form-group first" controlId="formBasicEmail">
                  <div id="sign-in-button"></div>
                  <label htmlFor="username">Phone Number</label>
                  {/* <input
              type="text"
              className="form-control"
              placeholder="Your Phone"
              name="mobile"
              required
              onChange={this.handleChange}
            /> */}
                  <PhoneInput
                    country={"vn"}
                    className="form-control"
                    style={{ height: 60 }}
                    value={number}
                    onChange={setNumber}
                    placeholder="Enter Phone Number"
                  />
                  <div id="recaptcha-container"></div>
                </div>

                <button
                  type="submit"
                  defaultValue="Log In"
                  className="btn btn-block "
                  style={{ backgroundColor: "rgb(81, 234, 234)" }}
                >
                  submit
                </button>
              </form>
              <form
                onSubmit={verifyOtp}
                style={{ display: flag ? "block" : "none" }}
              >
                <div className="form-group last mb-3">
                  <label htmlFor="password">Otp</label>
                  <input
                    // type="text"
                    // className="form-control"
                    // placeholder="Your Password"
                    // name="otp"
                    // required
                    // onChange={this.handleChange}
                    type="otp"
                    className="form-control"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  defaultValue="Log In"
                  className="btn btn-block "
                  style={{ backgroundColor: "rgb(81, 234, 234)" }}
                >
                  submit
                </button>
              </form>
              <div className="d-flex mb-5 align-items-center">
                <label className="control control--checkbox mb-0">
                  <span className="caption">Remember me</span>
                  <input type="checkbox" defaultChecked="checked" />
                  <div
                    style={{ backgroundColor: "rgb(81, 234, 234)" }}
                    className="control__indicator"
                  />
                </label>
                <span className="ml-auto">
                  <a href="#" className="forgot-pass">
                    Forgot Password
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
