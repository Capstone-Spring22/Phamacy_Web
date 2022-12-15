import React from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/owl.theme.default.min.css";
import "../assets/fonts/icomoon/style.css";
import "../assets/css/themify-icons.css";
import "../assets/css/jquery-ui.css";
import "../assets/css/jquery-ui.min.css";
import "../assets/css2/styles.css";
import "../assets/css2/styleComment.css";
import "../assets/css/aos.css";
const Header = () => {
  let history = useHistory();

  const viewDetail = () => {
    history.push("/ViewCart");
  };
  return (
    <div className="site-navbar py-2">
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

      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <div className="site-logo">
              <a href="index.html" className="js-logo-clone">
                Pharma
              </a>
            </div>
          </div>
          <div className="main-nav d-none d-lg-block">
            <nav
              className="site-navigation text-right text-md-center"
              role="navigation"
            >
              <ul className="site-menu js-clone-nav d-none d-lg-block">
                <li className="active">
                  <a activeClassName="active" href="/Home" exact>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a activeClassName="active" href="/Medicine">
                    <span>Store</span>
                  </a>
                </li>

                <li>
                  <a activeClassName="active" href="/Drug">
                    <span>Admin</span>
                  </a>
                </li>
                <li className="has-children">
                  <a href="#">Category</a>
                  <ul className="dropdown">
                    <li>
                      <a href="#">Supplements</a>
                    </li>
                    <li className="has-children">
                      <a href="#">Vitamins</a>
                      <ul className="dropdown">
                        <li>
                          <a href="#">Supplements</a>
                        </li>
                        <li>
                          <a href="#">Vitamins</a>
                        </li>
                        <li>
                          <a href="#">Diet &amp; Nutrition</a>
                        </li>
                        <li>
                          <a href="#">Tea &amp; Coffee</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Diet &amp; Nutrition</a>
                    </li>
                    <li>
                      <a href="#">Tea &amp; Coffee</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="about.html">News</a>
                </li>
                <li>
                  <a activeClassName="active" href="/Login">
                    <span>Login</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="icons">
            <a href="#" className="icons-btn d-inline-block js-search-open"></a>
            <div className="search-box icons-btn d-inline-block js-search-open">
              <button className="btn-search">
                <span className="icon-search" />
              </button>
              <input
                type="text"
                className="input-search"
                placeholder="Type to Search..."
                style={{ color: "black" }}
              />
            </div>

            <a href="/ViewCart" className="icons-btn d-inline-block bag">
              <span className="icon-shopping-bag" />
              <span className="number">2</span>
            </a>
            <a
              href="#"
              className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"
            >
              <span className="icon-menu" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
