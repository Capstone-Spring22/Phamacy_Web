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
              <a href="/Home" className="js-logo-clone" >
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
                  <Link activeClassName="active" to="/Home" exact>
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" to="/Medicine">
                    <span>Store</span>
                  </Link>
                </li>

              
                <li className="has-children">
                  <Link to="#">Category</Link>
                  <ul className="dropdown">
                    <li>
                      <Link to="#">Supplements</Link>
                    </li>
                    <li className="has-children">
                      <Link to="#">Vitamins</Link>
                      <ul className="dropdown">
                        <li>
                          <Link to="#">Supplements</Link>
                        </li>
                        <li>
                          <Link to="#">Vitamins</Link>
                        </li>
                        <li>
                          <Link to="#">Diet &amp; Nutrition</Link>
                        </li>
                        <li>
                          <Link to="#">Tea &amp; Coffee</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="#">Diet &amp; Nutrition</Link>
                    </li>
                    <li>
                      <Link to="#">Tea &amp; Coffee</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link activeClassName="active" to="/LoginAdmin">
                    <span>LoginAdmin</span>
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" to="/Login">
                    <span>Login</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="icons">
            <Link to="#" className="icons-btn d-inline-block js-search-open"></Link>
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

            <Link to="/ViewCart" className="icons-btn d-inline-block bag">
              <span className="icon-shopping-bag" />
              <span className="number">2</span>
            </Link>
            <Link
              href="#"
              className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"
            >
              <span className="icon-menu" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
