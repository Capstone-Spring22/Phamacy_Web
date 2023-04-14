import React from "react";
import { Link, NavLink } from "react-router-dom";



const Footer = () => {
  
  return (
    
    <footer className="site-footer">
      
        <div className="container" style={{marginLeft:-100}}>
          
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="block-7">
              
                <h3 className="footer-heading mb-4">Về Chúng tôi</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
                  quae reiciendis distinctio voluptates sed dolorum excepturi
                  iure eaque, aut unde.
                </p>
              </div>
            </div>
            <div className="col-lg-3 mx-auto mb-5 mb-lg-0">
              <h3 className="footer-heading mb-4">Danh Mục</h3>
              <ul className="list-unstyled">
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
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="block-5 mb-5">
                <h3 className="footer-heading mb-4">Thông Tin Liên Lạc</h3>
                <ul className="list-unstyled">
                  <li className="address">
                    123, Vườn Lài, Quận Tân Phú
                  </li>
                  <li className="phone">
                    <a href="tel://23923929210">+2 392 3929 210</a>
                  </li>
                  <li className="email">phu159123@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
       
        </div>
      </footer>
    
  );
};
export default Footer;
