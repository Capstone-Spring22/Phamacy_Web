import React from "react";
import { useEffect, useState } from "react";

import { BsPlus } from "react-icons/bs";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import { getDataByPath, deleteDataByPath } from "../../services/data.service";

const AddToCart = () => {
  let history = useHistory();
  const [drug, setDrug] = useState(null);
  const [total, setTotal] = useState([]);

  async function loadDataMedicine() {
    const path = `Cart/27.3.10.57`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDrug(res.data.items);
      setTotal(res.data);
      console.log("res.data", res.data);
    }
  }
  function viewDetail(cartData) {
    history.push({
      pathname: "/Checkout",
      state: { cartData },
    });
  }
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
                    href="index.html"
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
                <div className="col-12">
                  <div className="cart-table clearfix">
                    <table className="table table-responsive">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {" "}
                        {drug &&
                          drug.length &&
                          drug.map((item, index) => {
                            return (
                              <tr>
                                <td className="cart_product_img d-flex align-items-center">
                                  <a href="#">
                                    <img
                                      alt="Product"
                                      src={item.productImageUrl}
                                    />
                                  </a>
                                  <h6>{item.name}</h6>
                                </td>
                                <td className="price">
                                  <span>${item.price}</span>
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
                                  <span>{item.quantity * item.price}</span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart-footer d-flex mt-30">
                    <div className="back-to-shop w-50">
                      <a
                        href="shop-grid-left-sidebar.html"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Continue shooping
                      </a>
                    </div>
                    <div className="update-checkout w-50 text-right">
                      <a href="#" style={{ textDecoration: "none" }}>
                        clear cart
                      </a>
                      <a href="#" style={{ textDecoration: "none" }}>
                        Update cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="coupon-code-area mt-70">
                    <div className="cart-page-heading">
                      <h5>Cupon code</h5>
                      <p>Enter your cupone code</p>
                    </div>
                    <form action="#">
                      <input
                        type="search"
                        name="search"
                        placeholder="#569ab15"
                      />
                      <button
                        type="submit"
                        style={{ backgroundColor: "#51eaea" }}
                      >
                        Apply
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="shipping-method-area mt-70">
                    <div className="cart-page-heading">
                      <h5>Shipping method</h5>
                      <p>Select the one you want</p>
                    </div>
                    <div className="custom-control custom-radio mb-30">
                      <input
                        type="radio"
                        id="customRadio1"
                        name="customRadio"
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label d-flex align-items-center justify-content-between"
                        htmlFor="customRadio1"
                      >
                        <span>Next day delivery</span>
                        <span>$4.99</span>
                      </label>
                    </div>
                    <div className="custom-control custom-radio mb-30">
                      <input
                        type="radio"
                        id="customRadio2"
                        name="customRadio"
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label d-flex align-items-center justify-content-between"
                        htmlFor="customRadio2"
                      >
                        <span>Standard delivery</span>
                        <span>$1.99</span>
                      </label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id="customRadio3"
                        name="customRadio"
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label d-flex align-items-center justify-content-between"
                        htmlFor="customRadio3"
                      >
                        <span>Personal Pickup</span>
                        <span>Free</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="cart-total-area mt-70">
                    <div className="cart-page-heading">
                      <h5>Cart total</h5>
                      <p>Final info</p>
                    </div>

                    <ul className="cart-total-chart">
                      {total && total.subTotalPrice && (
                        <li>
                          <span>Subtotal</span>{" "}
                          <span>{total.subTotalPrice}vnd</span>
                        </li>
                      )}
                      <li>
                        <span>Shipping</span> <span>Free</span>
                      </li>
                      <li>
                        <span>
                          <strong>Total</strong>
                        </span>{" "}
                        <span>
                          <strong>$119.90</strong>
                        </span>
                      </li>
                    </ul>

                      <a
                        onClick={() => viewDetail({ drug, total })}
                        className="btn karl-checkout-btn"
                      >
                      Proceed to checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
export default AddToCart;
