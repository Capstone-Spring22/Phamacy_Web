import { useEffect, useState } from "react";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { useHistory } from "react-router-dom";
import firebase from "./../../services/firebase";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { getDataByPath, deleteDataByPath } from "../../services/data.service";

class Login extends Component {
  handleChange = (e) =>{
    const {name, value } = e.target
    this.setState({
        [name]: value
      })
  }
  configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "VN"
    });
  }
  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+84" + this.state.mobile
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
        });
  }
  onSubmitOTP = (e) =>{
    e.preventDefault();
    let otpInput = this.state.otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        let user = result.user;

        alert("Incorrect OTP vip");
        return Redirect("/Home");
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
        return Redirect("/Home");
      });
  }

  render() {
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

                <form onSubmit={this.onSignInSubmit}>
                  <div className="form-group first">
                  <div id="sign-in-button"></div>
                    <label htmlFor="username">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Phone"
                      name="mobile"
                      required
                      onChange={this.handleChange}
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
                <form onSubmit={this.onSubmitOTP}>
                  <div className="form-group last mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Password"
                      name="otp"
                      required
                      onChange={this.handleChange}
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
  }
}
export default Login;
