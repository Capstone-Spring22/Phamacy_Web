import React from "react";
import { useEffect, useState } from "react";

import { BsPlus } from "react-icons/bs";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
} from "../../services/data.service";
import { async } from "q";
import axios, { AxiosHeaders } from "axios";
import { toast } from "react-hot-toast";

const AddToCart = () => {
  const deviceId = localStorage.getItem("deviceId");

  let history = useHistory();
  const [drug, setDrug] = useState(null);
  const [total, setTotal] = useState([]);
  const [orderID, setOrderId] = useState([]);
  const [cartID, setCartID] = useState("");

  async function loadDataMedicine() {
    if (localStorage && localStorage.getItem("accessTokenUser")) {
      const accessToken = localStorage.getItem("accessTokenUser");
      console.log("display cartID", deviceId);
      const path = `Cart/${deviceId}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("display", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
        setTotal(res.data);
        setCartID(res.data.cartId);

        console.log("res.data", res.data);
      }
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
  async function handleUpdateCart(productId, quantity) {
    if (localStorage && localStorage.getItem("accessTokenUser")) {
      const accessToken = localStorage.getItem("accessTokenUser");
      const data = {
        deviceId: deviceId,
        item: {
          productId: productId,
          quantity: quantity,
        },
      };
      console.log("display data", data);
      const config = {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      };
      const path = "Cart";
      const res = await createDataByPath(path, accessToken, data);
      console.log("API response:", res);

      if (res && res.status === 200) {
        toast.success("đã cập nhật");
        loadDataMedicine();
        // window.location.reload();
      }
    }
  }
  async function handleRemoveCart(productId) {
    const data = {
      productId: productId,
      cartId: cartID,
    };
    console.log("display data", data);
    const config = {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    };
    const res = await axios.delete(
      `https://betterhealthapi.azurewebsites.net/api/v1/Cart`,
      { data: data, ...config }
    );
    if (res !== null && res !== undefined && res.status === 200) {
      loadDataMedicine();
    }
  }
  function updateQuantity(productId, newQuantity) {
    setDrug((prevState) =>
      prevState.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: parseInt(newQuantity),
          };
        }
        return item;
      })
    );
  }
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
          <div className=" section_padding_100 clearfix">
            <div className="container">
              <div className="row">
                <div style={{ display: "flex" }}>
                  <div
                    className="cart-table clearfix"
                    style={{ marginTop: -22 }}
                  >
                    <div
                      className="card"
                      style={{
                        backgroundColor: "#ffffff",

                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                        borderRadius: 5,
                        border: "none",
                      }}
                    >
                      <div style={{ display: "flex" }}>
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

                        <></>
                      </div>
                      {drug && drug.length > 0 ? (
                      <table className="table">
                        <thead
                          style={{
                            backgroundColor: "#f6f9fc",
                            borderColor: "white",
                            color: "",
                          }}
                        >
                          <tr>
                            <th
                              style={{
                                width: 150,
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              &nbsp; &nbsp;Hình ảnh
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                                width: 180,
                              }}
                            >
                              &nbsp; &nbsp;tên
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                                width: 110,
                              }}
                            >
                              &nbsp; &nbsp;Giá
                            </th>
                            <th
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              &nbsp; &nbsp;Số lượng
                            </th>
                            <th
                              style={{
                                width: 100,
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              &nbsp; &nbsp;Đơn vị
                            </th>
                            <th
                              style={{
                                width: 110,
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              &nbsp; &nbsp;Tổng giá
                            </th>
                            <th
                              style={{
                                width: 80,
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "#bfc8d3",
                              }}
                            >
                              Xoá SP
                            </th>
                          </tr>
                        </thead>
                      
                          <tbody
                            className="table-border-bottom-0"
                            style={{ borderColor: "white" }}
                          >
                            {drug &&
                              drug.length > 0 &&
                              drug.map((item, index) => {
                                return (
                                  <tr key={item.id}>
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
                                        {item.priceAfterDiscount.toLocaleString(
                                          "en-US"
                                        )}{" "}
                                        đ
                                      </span>
                                      <div>
                                        {" "}
                                        {item.price ===
                                        item.priceAfterDiscount ? (
                                          ""
                                        ) : (
                                          <del>
                                            {item.price?.toLocaleString(
                                              "en-US"
                                            )}{" "}
                                            đ
                                          </del>
                                        )}
                                      </div>
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
                                          value={item.quantity}
                                          onChange={(e) => {
                                            e.preventDefault();
                                            handleUpdateCart(
                                              item.productId,
                                              e.target.value
                                            );
                                            updateQuantity(
                                              item.productId,
                                              e.target.value
                                            );
                                          }}
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
                                    <td>
                                      <span style={{ marginLeft: 20 }}>
                                        {item.unitName}
                                      </span>
                                    </td>
                                    <td className="total_price">
                                      <span style={{ marginLeft: 20 }}>
                                        {(
                                          item.quantity *
                                          item.priceAfterDiscount
                                        ).toLocaleString("en-US")}
                                      </span>
                                    </td>
                                    <td>
                                      <button
                                        class="button-81"
                                        style={{ color: "red" }}
                                        onClick={() => {
                                          console.log(
                                            "display",
                                            item.productId
                                          );
                                          handleRemoveCart(item.productId);
                                        }}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-trash3"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                      
                      </table>
                      ) : (
                        <div>
                          <img
                          style={{height:470,width:800}}
                            src="https://www.adasglobal.com/img/empty-cart.png"
                            alt="Empty cart"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="col-12 col-md-6 col-lg-4 ml-lg-auto"
                    style={{ marginTop: -22 }}
                  >
                    <div
                      className="order-details-confirmation"
                      style={{
                        width: 500,
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
                          <span>Tạm Tính</span>{" "}
                          <span>
                            {total.subTotalPrice?.toLocaleString("en-US")} VND
                          </span>
                        </li>

                        <li style={{ fontSize: 15 }}>
                          <span>Giá Giảm</span>{" "}
                          <span>
                            {total.discountPrice?.toLocaleString("en-US")} Vnd
                          </span>
                        </li>

                        <li style={{ fontSize: 15 }}>
                          <span>Thành Tiền</span>{" "}
                          <span>
                            {total.totalCartPrice?.toLocaleString("en-US")} Vnd
                          </span>
                        </li>
                      </ul>
                      {drug && drug.length > 0 ? (
                      <a
                        onClick={() =>
                          viewDetail({
                            drug,
                            total,
                            newArrayOfObjects,
                            CheckoutSiteObjectProduct,
                            CheckoutSiteObjectQuantity,
                            orderID,
                            cartID,
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
                           ) : (
                            <a
                     
                        style={{
                          height: 50,
                          backgroundColor: "grey",
                          color: "white",
                          paddingTop: 13,
                          fontSize: 17,
                        }}
                        className="button-28"
                      >
                        Đặt Hàng
                      </a>   )}
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
