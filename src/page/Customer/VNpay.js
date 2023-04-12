import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
} from "../../services/data.service";
import { useEffect, useState } from "react";
import React, { Fragment } from "react";
import Swal from "sweetalert2";
import { BsPlus } from "react-icons/bs";
import Footer from "./Footer";
import { useHistory, useLocation, Link } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
const VNPay = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const vnp_PayDate = urlParams.get("vnp_PayDate");
  const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
  const storedCartData = localStorage.getItem("cartData");
  const cartID1 = localStorage.getItem("cartID1");
  const productCheckOut = JSON.parse(localStorage.getItem("product"));
  const [product, setProduct] = useState({
    orderId: productCheckOut.orderId,
    orderTypeId: productCheckOut.orderTypeId,
    siteId: productCheckOut.siteId,
    pharmacistId: null,
    subTotalPrice: productCheckOut.subTotalPrice,
    discountPrice: productCheckOut.discountPrice,
    shippingPrice: 0,
    totalPrice: productCheckOut.totalPrice,
    usedPoint: productCheckOut.usedPoint,
    payType: productCheckOut.payType,
    isPaid: 1,
    note: productCheckOut.note,

    products: productCheckOut.products,
    reveicerInformation: productCheckOut.reveicerInformation,
    vnpayInformation: {
      vnp_TransactionNo: vnp_TransactionNo,
      vnp_PayDate: vnp_PayDate,
    },
    orderPickUp: productCheckOut.orderPickUp,
  });
  async function Checkout() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const data = product;
      console.log("data", data);
      const path = "Order/Checkout";
      const res = await createDataByPath(path, accessToken, data);
      console.log("Check res", res);
      console.log("display du lieu", data);
      if (res && res.status === 200) {
        Swal.fire("Create Success", "", "success");
        handleRemoveCart();
      }
    } else {
      const data = product;
      console.log("data", data);
      const path = "Order/Checkout";
      const res = await createDataByPath(path, "", data);
      console.log("Check res", res);
      console.log("display du lieu", data);
      if (res && res.status === 200) {
        Swal.fire("Create Success", "", "success");
        handleRemoveCart();
      }
    }
  }
  async function handleRemoveCart() {
    const res = await axios.delete(
      `https://betterhealthapi.azurewebsites.net/api/v1/Cart/${cartID1}`
    );
    if (res !== null && res !== undefined && res.status === 200) {
    }
  }
  useEffect(() => {
    if (productCheckOut) {
      console.log(productCheckOut.orderId);
    } else {
      console.log("Product is null or undefined.");
    }
    console.log("vnp_Amount", product);
  }, []);
  return (
    <>
      <Header />
      <div class="bg-light py-3">
        <div class="container">
          <div class="row">
            <div class="col-md-12 mb-0">
              <a
                href="/Home"
                style={{ textDecoration: "none", color: "black" }}
              >
                Home
              </a>{" "}
              <span class="mx-2 mb-0">/</span>{" "}
              <a href="/ViewCart" class="text-black">
                Cart
              </a>
              <span class="mx-2 mb-0">/</span>{" "}
              <strong class="text-black">Check Out</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="site-wrap">
        <div className="checkout_area section_padding_100">
          <div className="container">
            <div className="row">
              <div
                className="col-12 col-md-6"
                style={{
                  backgroundColor: "white",
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                  borderRadius: 10,
                  paddingBottom: 50,
                  width: 750,
                  padding: 50,
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",

                    borderRadius: 10,
                    paddingBottom: 50,
                    width: 650,
                    padding: 50,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="180"
                    height="180"
                    fill="currentColor"
                    class="bi bi-check-circle"
                    viewBox="0 0 16 16"
                    style={{
                      color: "#9dca5c",
                      borderColor: "#9dca5c",
                      marginLeft: 150,
                    }}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                  </svg>
                </div>
                <div className="vn-pay-success">
                  Thanh Toán VNPay Thành Công
                </div>
                <br />
                <hr></hr>
                <div className="checkout_details_area mt-50 clearfix">
                  <div className="cart-page-heading">
                    <h5>Xem Lại Thông Tin</h5>
                  </div>

                  <form action="#" method="post">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="first_name">
                          Tên Đầy Đủ <span>*</span>
                        </label>
                        <div id="full_name" defaultValue="" required="">
                          {product.reveicerInformation.fullname}
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="last_name">
                          Số điện thoại <span>*</span>
                        </label>
                        <div type="text" id="sdt" defaultValue="" required="">
                          {product.reveicerInformation.phoneNumber}
                        </div>
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="company">Email</label>
                        <div type="text" id="company" defaultValue="">
                          {product.reveicerInformation.email}
                        </div>
                      </div>

                      <div className="col-12 mb-3">
                        <label htmlFor="street_address">
                          Thành phố <span>*</span>
                        </label>
                        <div name="city" id="basic-icon-default-email">
                          {product.reveicerInformation.cityId}
                        </div>
                      </div>

                      <div className="col-12 mb-3">
                        <label htmlFor="postcode">
                          Quận/Huyện <span>*</span>
                        </label>

                        <div id="basic-icon-default-email">
                          {product.reveicerInformation.districtId}
                        </div>
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="city">
                          Phường <span>*</span>
                        </label>

                        <div id="basic-icon-default-email">
                          {product.reveicerInformation.wardId}
                        </div>
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="state">
                          Địa chỉ cụ thể <span>*</span>
                        </label>
                        <div type="text" id="state" defaultValue="">
                          {product.reveicerInformation.homeAddress}
                        </div>
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="street_address">
                          Ghi Chú <span>*</span>
                        </label>
                        <div type="text" id="street_address">
                          {product.note}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
                <div
                  className="order-details-confirmation"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                    border: "none",
                    borderRadius: 10,
                  }}
                >
                  <div className="cart-page-heading">
                    <h5>Thanh Toán</h5>
                    <p>Thông tin</p>
                  </div>

                  <ul
                    className="order-details-form "
                    style={{ padding: 0, fontSize: 20 }}
                  >
                    <li style={{ fontSize: 15 }}>
                      <span>Subtotal</span> <span>{product.subTotalPrice}</span>
                    </li>

                    <li style={{ fontSize: 15 }}>
                      <span>Phí Giao Hàng</span> <span>Free</span>
                    </li>

                    <li style={{ fontSize: 15 }}>
                      <span>Tạm Tính</span> <span>{product.totalPrice}</span>
                    </li>
                  </ul>

                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      Checkout();
                    }}
                    style={{
                      height: 50,
                      backgroundColor: "#82AAE3",
                      color: "white",
                      paddingTop: 13,
                      fontSize: 17,
                    }}
                    className="button-28"
                  >
                    Xác Nhận
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default VNPay;
