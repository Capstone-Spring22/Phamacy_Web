import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { auth } from "../../services/firebase";
const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res.user.accessToken);
        setUser(res.user);
        if (user) {
          const idToken = await user.getIdToken();
          console.log("cc", idToken);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

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
            <div>
              <Toaster toastOptions={{ duration: 4000 }} />
              <div id="recaptcha-container"></div>
              {user ? (
                <h2 className="text-center text-white font-medium text-2xl">
                  👍Login Success
                </h2>
              ) : (
                <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                  <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                    Welcome to <br /> CODE A PROGRAM
                  </h1>
                  {showOTP ? (
                    <>
                      <div style={{ width: 320 }}>
                        <div
                          className="form-group first"
                          controlId="formBasicEmail"
                        >
                          <div id="sign-in-button"></div>
                          <label htmlFor="username">Enter your OTP</label>

                          <OtpInput
                            value={otp}
                            onChange={setOtp}
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            autoFocus
                            className="form-control"
                          ></OtpInput>
                          <div id="recaptcha-container"></div>
                        </div>

                        <button
                          onClick={onOTPVerify}
                          type="submit"
                          defaultValue="Log In"
                          className="btn btn-block "
                          style={{ backgroundColor: "#82aae3", color: "#fff" }}
                        >
                          {loading && (
                            <CgSpinner
                              size={20}
                              className="mt-1 animate-spin"
                            />
                          )}
                          <span>Verify OTP</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ width: 320 }}>
                        <div
                          className="form-group first"
                          controlId="formBasicEmail"
                        >
                          <div id="sign-in-button"></div>
                          <label htmlFor="username">Phone Number</label>

                          <PhoneInput
                            className="form-control"
                            style={{ height: 60 }}
                            country={"vn"}
                            value={ph}
                            onChange={setPh}
                            placeholder="Enter Phone Number"
                          />
                          <div id="recaptcha-container"></div>
                        </div>

                        <button
                          type="submit"
                          defaultValue="Log In"
                          className="btn btn-block "
                          onClick={onSignup}
                          style={{ backgroundColor: "#82aae3", color: "#fff" }}
                        >
                          {loading && (
                            <CgSpinner
                              size={20}
                              className="mt-1 animate-spin"
                            />
                          )}
                          submit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
