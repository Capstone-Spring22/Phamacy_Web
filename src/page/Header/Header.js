import React from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import "../../assets/css/style.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/magnific-popup.css";
import "../../assets/css/owl.theme.default.min.css";
import "../../assets/fonts/icomoon/style.css";
import "../../assets/css/themify-icons.css";
import "../../assets/css/jquery-ui.css";
import "../../assets/css/jquery-ui.min.css";
import "../../assets/css2/styles.css";
import "../../assets/css2/styleComment.css";
import "../../assets/css2/styleCategory.css";
import "../../assets/css/aos.css";
import { Link } from "react-router-dom";
import logo from "../../assets/BH3.png";

import { Toaster } from "react-hot-toast";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
} from "../../services/data.service";
import { useEffect, useState } from "react";

const Header = () => {
  let history = useHistory();
  const navigate = useHistory();
  const [valueSearch, setvalueSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [productSearch, setProductSearch] = useState([]);

  const handleLogout = async () => {
    try {
      
      localStorage.removeItem("accessTokenUser");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      localStorage.removeItem("phoneNo");
      localStorage.removeItem("roleName");
      localStorage.removeItem("id");
      navigate.push("/Home");
    } catch (error) {
      console.log(error.message);
    }
  };
  async function loadDataMedicineSearch(Search) {
    const path = `Product?productName=${Search}&isSellFirstLevel=true&pageIndex=1&pageItems=12`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setProductSearch(res.data.items);
    
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      loadDataMedicineSearch(searchValue);
      setvalueSearch(searchValue);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchValue]);
  const roleName = localStorage.getItem("roleName");
  const userName = localStorage.getItem("userName");
  const phoneNo = localStorage.getItem("phoneNo");
  let buttonLogout;
  if (roleName === "Customer") {
    buttonLogout = (
      <div className="button-login">
        <Link activeClassName="active" onClick={handleLogout}>
          <span style={{ color: "white" }}>Đăng Xuất</span>
        </Link>
      </div>
    );
  } else {
    buttonLogout = (
      <div className="button-login">
        <Link activeClassName="active" to="/Login">
          <span style={{ color: "white" }}>Đăng Nhập</span>
        </Link>
      </div>
    );
  }
  let buttonHistory;
  if (roleName === "Customer") {
    buttonHistory = (
      <div className="button-login" style={{ marginRight: 10 }}>
        <Link activeClassName="active" to="/HistoryOrder">
          <span style={{ color: "white" }}>Lịch Sử Đơn</span>
        </Link>
      </div>
    );
  }
  const viewDetail = () => {
    history.push("/ViewCart");
  };
  return (
    <div className="site-navbar py-2" style={{ backgroundColor: "#e6eeff" }}>
    <div className="search-wrap">
      <div className="container">
        <div className="search-box">
          <button className="btn-search">
            <i className="icon-close2" />
          </button>
          <form action="#" method="post">
            <input
              type="text"
              className="input-search"
              placeholder="Type to Search..."
            />
          </form>
        </div>
      </div>
    </div>

    <div className="container" style={{ marginTop: 15, marginBottom: 15 }}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="logo">
          <div
            className="app-brand demo"
            style={{ marginLeft: -10, marginBottom: -80, marginTop: -90 }}
          >
            <Link to="/Home" className="app-brand-link">
              <img src={logo} style={{ height: 80 }} />
            </Link>
          </div>
        </div>
        <div className="main-nav d-none d-lg-block">
              <nav
                className="site-navigation text-right text-md-center"
                role="navigation"
              >
                <div style={{ position: "relative", width: "700px" }}>
                  <input
                    className="search-home"
                    placeholder="Tìm Kiếm Thuốc"
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "120px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M21.707 20.293l-4.95-4.95C17.396 14.208 18 12.708 18 11c0-4.411-3.589-8-8-8S2 6.589 2 11s3.589 8 8 8c1.708 0 3.208-.604 4.343-1.643l4.95 4.95a1 1 0 001.414-1.414zM4 11c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6z"
                    />
                  </svg>
                </div>
              </nav>
              {productSearch && productSearch.length > 0&& searchValue !=="" ? (
                <div className="search-home-user">
                  {productSearch.map((product) => (
                    <Link   to={`/ViewDetail/${product.id}`} key={product.id} className="product-cart-p3">
                      <img
                        src={product.imageModel.imageURL}
                        style={{
                          height: 70,
                          width: 60,
                          borderRadius: 7,
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div className="name-product-pharmacist">
                          <div>Tên Sản Phẩm</div>
                          <div> {product.name}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
        <div className="icons" style={{ display: "flex" }}>
          {buttonHistory}

          {buttonLogout}

          {/* <button onClick={laydata}>Lây data</button> */}
          <div className="button-cart">
            <Link
              to="/ViewCart"
              className="icons-btn  "
              style={{ display: "flex" }}
            >
              <div>
                <span
                  className="icon-shopping-bag"
                  style={{ color: "white" }}
                />
              </div>
              <div style={{ marginTop: "10px", color: "white" }}>
                Giỏ Hàng
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
export default Header;
