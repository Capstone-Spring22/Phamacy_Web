import React from "react";
import { useEffect, useState } from "react";

import { BsPlus } from "react-icons/bs";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import { getDataByPath, deleteDataByPath } from "../../services/data.service";
import { async } from "q";
import axios, { AxiosHeaders } from "axios";

const AddToCart = () => {
  const cartId = localStorage.getItem("cartId");

  let history = useHistory();
  const [drug, setDrug] = useState(null);
  const [total, setTotal] = useState([]);
  const [orderID, setOrderId] = useState([]);

  async function loadDataMedicine() {
    console.log("display cartID", cartId);
    const path = `Cart/${cartId}`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDrug(res.data.items);
      setTotal(res.data);
      console.log("res.data", res.data);
    }
  }
  const CheckoutSiteObjectProduct =
    drug &&
    drug.length &&
    drug.map(({ productId }) => ({
      productId,
    }));
  const CheckoutSiteObjectQuantity =
    drug &&
    drug.length &&
    drug.map(({ quantity }) => ({
      quantity,
    }));
  async function loadOrderId() {
    const path = `Order/GenerateOrderId`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setOrderId(res.data);
    }
  }
  const newArrayOfObjects =
    drug &&
    drug.length &&
    drug.map(({ productId, quantity, price, priceAfterDiscount }) => ({
      productId,
      quantity,
      originalPrice: price,
      discountPrice: priceAfterDiscount,
    }));
  console.log("đ", newArrayOfObjects);
  function viewDetail(cartData) {
    history.push({
      pathname: "/Checkout",
      state: { cartData },
    });
  }
  async function handleRemoveCart(productId){
    const data = {
      productId: productId,
      cartId: cartId,
    };
    console.log("display data", data);
    const config = {
      headers: {
        'Content-Type': 'application/json-patch+json',
      }
    };
    const res = await axios.delete(`https://betterhealthapi.azurewebsites.net/api/v1/Cart`,{data: data, ...config});
    if (res !== null && res !== undefined && res.status === 200) {
      loadDataMedicine();
    }
  };
  useEffect(() => {
    loadOrderId();
  }, []);
  useEffect(() => {
    loadDataMedicine();
  }, []);
  return (
    <div>
      <Header />
      <>
        <div className="catagories-side-menu">{/*  Side Nav  */}</div>
        <div id="wrapper">
          <div class="bg-light py-3">
            <div class="container">
              <div class="row">
                <div class="col-md-12 mb-0">
                  <a
                    href="Home"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Home
                  </a>{" "}
                  <span class="mx-2 mb-0">/</span>{" "}
                  <strong class="text-black">Cart</strong>
                </div>
              </div>
            </div>
          </div>
          {/* ****** Top Discount Area End ****** */}
          {/* ****** Cart Area Start ****** */}
          <div className="cart_area section_padding_100 clearfix">
            <div className="container">
              <div className="row">
                <div style={{ display: "flex" }}>
                  <div
                    className="cart-table clearfix"
                    style={{ marginTop: -22 }}
                  >
                    <table
                      className="table table-responsive"
                      style={{
                        backgroundColor: "white",
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        borderRadius: 10,
                        paddingBottom: 50,
                      }}
                    >
                      <h5
                        className="card-header"
                        style={{
                          padding: "20px 24px",
                          backgroundColor: "#ffffff",
                          borderColor: "white",
                        }}
                      >
                        <h3 className="fontagon">Giỏ Hàng</h3>
                      </h5>
                      <thead style={{ border: "none" }}>
                        <tr
                          style={{ backgroundColor: "#f6f9fc", border: "none" }}
                        >
                          <th>Hình Ảnh</th>
                          <th>Tên</th>
                          <th>Giá</th>
                          <th>Số Lượng</th>
                          <th>Tổng Giá</th>
                          <th>Xóa Cart</th>
                        </tr>
                      </thead>

                      <tbody style={{ border: "none" }}>
                        {" "}
                        {drug &&
                          drug.length &&
                          drug.map((item, index) => {
                            return (
                              <tr>
                                <td>
                                  <img
                                    className="cart-img"
                                    alt="Product"
                                    src={item.productImageUrl}
                                  />
                                </td>
                                <td>{item.productName}</td>
                                <td className="price">
                                  <span>
                                    ${item.price.toLocaleString("en-US")}
                                  </span>
                                </td>
                                <td className="qty">
                                  <div className="quantity">
                                    <span className="qty-minus">
                                      <i
                                        className="fa fa-minus"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    <input
                                      type="number"
                                      className="qty-text"
                                      id="qty"
                                      step={1}
                                      min={1}
                                      max={99}
                                      name="quantity"
                                      defaultValue={item.quantity}
                                    />
                                    <span
                                      className="qty-plus"
                                      onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"
                                    >
                                      <i
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </div>
                                </td>
                                <td className="total_price">
                                  <span>
                                    {(
                                      item.quantity * item.price
                                    ).toLocaleString("en-US")}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    onClick={() =>{
                                       console.log('display',item.productId)
                                      handleRemoveCart(item.productId)
                                    }}
                                  >
                                    Xoá
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="col-12 col-md-6 col-lg-5 ml-lg-auto"
                    style={{ marginTop: -22 }}
                  >
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
                        {total && total.subTotalPrice && (
                          <li style={{ fontSize: 15 }}>
                            <span>Subtotal</span>{" "}
                            <span>
                              {total.subTotalPrice.toLocaleString("en-US")} VND
                            </span>
                          </li>
                        )}
                        <li style={{ fontSize: 15 }}>
                          <span>Shipping</span> <span>Free</span>
                        </li>
                        {total && total.totalCartPrice && (
                          <li style={{ fontSize: 15 }}>
                            <span>Tạm Tính</span>{" "}
                            <span>
                              {total.totalCartPrice.toLocaleString("en-US")} Vnd
                            </span>
                          </li>
                        )}
                      </ul>

                      <a
                        onClick={() =>
                          viewDetail({
                            drug,
                            total,
                            newArrayOfObjects,
                            CheckoutSiteObjectProduct,
                            CheckoutSiteObjectQuantity,
                            orderID,
                          })
                        }
                        style={{
                          height: 50,
                          backgroundColor: "#82AAE3",
                          color: "white",
                          paddingTop: 13,
                          fontSize: 17,
                        }}
                        className="button-28"
                      >
                        Đặt Hàng
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    </div>
  );
};
export default AddToCart;
