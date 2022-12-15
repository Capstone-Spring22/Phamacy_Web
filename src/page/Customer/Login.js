import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


import {
  getDataByPath,
  deleteDataByPath,
} from "../../services/data.service";

const Login = () => {
  const [apartment, setApartment] = useState([]);
  let history = useHistory();

  const viewDetail = () => {
    history.push("/ViewDetail");
  };

  async function loadDataMedicine() {
    const path = `posts`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setApartment(res.data);
    }
  }
  
  useEffect(() => {
    loadDataMedicine();
  }, []);

  return (
    <div className="d-lg-flex half">
    <div
      className="bg order-1 order-md-2"
      style={{ backgroundImage: 'url("https://wallpaper.dog/large/20378253.jpg")' }}
    />
    <div className="contents order-2 order-md-1">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-7">
            <h3>
              Login to <strong>Phama</strong>
            </h3>
            <p className="mb-4">
              
            </p>
            <form action="#" method="post">
              <div className="form-group first">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="your-email@gmail.com"
                  id="username"
                />
              </div>
              <div className="form-group last mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your Password"
                  id="password"
                />
              </div>
              <div className="d-flex mb-5 align-items-center" >
                <label className="control control--checkbox mb-0" >
                  <span className="caption">Remember me</span>
                  <input type="checkbox" defaultChecked="checked" />
                  <div style={{backgroundColor:"rgb(81, 234, 234)"}} className="control__indicator" />
                </label>
                <span className="ml-auto">
                  <a href="#" className="forgot-pass">
                    Forgot Password
                  </a>
                </span>
              </div>
              <button
                type="submit"
                defaultValue="Log In"
                className="btn btn-block "
                style={{backgroundColor:"rgb(81, 234, 234)"}}
              >Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  );
};
export default Login;
