import { useEffect, useState } from "react";
import React, { Fragment } from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarPharmacist";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { Link } from "react-router-dom";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
  updateDataByPath,
} from "../../services/data.service";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { List } from "antd";
const CheckOutPharmacist = () => {
  const myId = localStorage.getItem("id");
  const [OrderDetail, setOrderDetail] = useState([]);
  const [ProductDetail, setProductDetail] = useState([]);
  const [orderContactInfo, setOrderContactInfo] = useState([]);
  const [orderDelivery, setOrderDelivery] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [description, setDescription] = useState("");
  const [orderID, setOrderId] = useState("");

  const [activeItem, setActiveItem] = useState("CheckOutPharmacist");
  const [drug, setDrug] = useState(null);
  const [drugInCart, setDrugInCart] = useState([]);
  const [listCart, setListCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(100);

  async function loadDataMedicine(search) {
    console.log("display", search);
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Product?isSellFirstLevel=true&productName=${search}&pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("display", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
        console.log("display", currentPage);
      }
    }
  }
  async function Checkout() {
    if (checkValidation()) {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const data = product;
        const path = "Order/Checkout";
        const res = await createDataByPath(path, accessToken, data);
        console.log("Check res", res);
        console.log("display du lieu", data);
        if (res && res.status === 201) {
          Swal.fire("Create Success", "", "success");
          // window.location.reload();
        }
      }
    }
  }
  const checkValidation = () => {
    // if (id.trim() === "") {
    //   Swal.fire("ID Can't Empty", "", "question");
    //   return false;
    // }
    return true;
  };

  async function addToCart(productId) {
    if (checkValidation()) {
      const drug1 = drug.find((item) => item.id === productId);
      console.log("display drug1", drug1);
      // console.log(
      //   "drug1.id === listCart.find((product)=> product.id )",
      //   drug1.id ===
      //     listCart.find((product) => product.productId === productId).productId
      // );
      if (
        listCart &&
        listCart.find((product) => product.productId === productId)?.productId
      ) {
        // setListCart((prevState) => {
        //   prevState.map((item) => {
        //     if (item.productId === productId) {
        //       return {
        //         ...item,
        //         quantity: 14,
        //       };
        //     }
        //     return item;
        //   });
        // });
      } else {
        listCart.push({
          productId: drug1.id,
          imageURL: drug1.imageModel.imageURL,
          productInventoryModel: drug1.productInventoryModel.quantity,
          quantity: 1,
          originalPrice: drug1.price,
          discountPrice: drug1.priceAfterDiscount,
          productPrefer: drug1.productUnitReferences,
          name: drug1.name,
        });
        setListCart([...listCart]);
      }

      console.log("display", listCart);
    }
  }
  const removeInCart = (id) => {
    console.log("display", id);
    const newList = listCart.filter((item) => item.productId !== id);

    setListCart(newList);
  };
  const [newArrayOfObjects, setNewArrayOfObjects] = useState([]);

  const [product, setProduct] = useState({
    orderId: null,
    orderTypeId: 1,
    siteId: null,
    pharmacistId: null,
    subTotalPrice: 0,
    discountPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    usedPoint: 0,
    payType: 1,
    isPaid: 1,
    note: "",

    products: null,
    reveicerInformation: {
      fullname: "",
      phoneNumber: "",
    },
  });
  async function loadOrderId() {
    const path = `Order/GenerateOrderId`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setProduct({
        ...product,
        orderId: res.data,
        pharmacistId: localStorage.getItem("userID"),
        siteId: localStorage.getItem("SiteID"),
      });
    }
  }
  useEffect(() => {
    loadOrderId();
  }, []);
  useEffect(() => {
    setProduct({
      ...product,
      products: newArrayOfObjects,
    });
  }, [newArrayOfObjects]);
  useEffect(() => {
    setNewArrayOfObjects(
      listCart &&
        listCart.length &&
        listCart.map(
          ({ productId, quantity, originalPrice, discountPrice }) => ({
            productId: productId,
            quantity: quantity,
            originalPrice: originalPrice,
            discountPrice: discountPrice,
          })
        )
    );
  }, [listCart]);
  function updateQuantity(productId, newQuantity) {
    setListCart((prevState) =>
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
  function updateProductID(productId, newQuantity) {
    setListCart((prevState) =>
      prevState.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            productId: newQuantity,
          };
        }
        return item;
      })
    );
  }

  const hiennew = () => {
    console.log("display", newArrayOfObjects);
    console.log("display", product);
  };

  async function loadDataCart() {
    const deviceId = await axios
      .get("https://api.ipify.org/?format=json")
      .then((res) => res.data.ip);
    const path = `Cart/${deviceId}`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDrugInCart(res.data.items);
      console.log("res.data", res.data);
    }
  }
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar activeItem={activeItem} />

        <div
          className="layout-page"
          style={{ backgroundColor: "#f4f6fb", marginLeft: 260 }}
        >
          {/* Navbar */}
          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a
                className="nav-item nav-link px-0 me-xl-4"
                href="javascript:void(0)"
              >
                <i className="bx bx-menu bx-sm" />
              </a>
            </div>
            <div
              className="navbar-nav-right d-flex align-items-center"
              id="navbar-collapse"
            >
              {/* Search */}
              <div className="navbar-nav align-items-center">
                <div className="nav-item d-flex align-items-center">
                  <i className="bx bx-search fs-4 lh-0" />
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                    onChange={(e) => loadDataMedicine(e.target.value)}
                  />
                </div>
              </div>

              {/* /Search */}
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* Place this tag where you want the button to render. */}
                <li className="nav-item lh-1 me-3">
                  <a
                    className="github-button"
                    href="https://github.com/themeselection/sneat-html-admin-template-free"
                    data-icon="octicon-star"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                  >
                    Star
                  </a>
                </li>
                {/* User */}

                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <Link
                    className="nav-link dropdown-toggle hide-arrow"
                    to="/Profile"
                    data-bs-toggle="dropdown"
                  >
                    <div className="avatar avatar-online">
                      <img
                        src="https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg"
                        alt=""
                        className="w-px-40 h-auto rounded-circle"
                      />
                    </div>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <img
                                src="../assets/img/avatars/1.png"
                                alt=""
                                className="w-px-40 h-auto rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">
                              John Doe
                            </span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-user me-2" />
                        <span className="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-cog me-2" />
                        <span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="d-flex align-items-center align-middle">
                          <i className="flex-shrink-0 bx bx-credit-card me-2" />
                          <span className="flex-grow-1 align-middle">
                            Billing
                          </span>
                          <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                            4
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="auth-login-basic.html">
                        <i className="bx bx-power-off me-2" />
                        <span className="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>

                {/*/ User */}
              </ul>
            </div>
          </nav>

          {/* / Navbar */}
          {/* Content wrapper */}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {drug && drug.length ? (
              <div className="search-result">
                {drug.map((e) => {
                  return (
                    <div
                      className="product-cart-p2"
                      onClick={() => addToCart(e.id)}
                    >
                      <img
                        src={e.imageModel.imageURL}
                        style={{
                          height: 90,
                          width: 70,
                          borderRadius: 7,
                          objectFit: "cover",
                        }}
                      />
                      <div key={e.id} style={{ width: 380 }}>
                        {e.name}
                      </div>
                      <div key={e.id} style={{ width: 380 }}>
                        {e.productInventoryModel.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (<div className="search-result2"></div>)}

            <div
              className="row "
              style={{ width: 900, marginTop: -30, marginLeft: 25 }}
            >
              <div className="col-xl">
                <div className="card mb-4">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{
                      height: 70,
                      backgroundColor: "white",
                      padding: "20px 24px",

                      borderColor: "#f4f4f4",
                    }}
                  >
                    <h5 className="mb-0">Thông Tin Đơn Hàng</h5>
                  </div>
                  <div className="card-body scroll-p">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        padding: 30,
                        marginLeft: 100,
                        height: 420,
                      }}
                    >
                      <div className="mb-3" style={{ width: "95%" }}>
                        <div className="input-group input-group-merge ">
                          <div
                            type="text"
                            id="basic-icon-default-fullname"
                            placeholder="Tên Sản Phẩm"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
                          >
                            {listCart.length &&
                              listCart &&
                              listCart.map((product) => {
                                return (
                                  <div className="product-cart-p">
                                    <img
                                      src={product.imageURL}
                                      style={{
                                        height: 90,
                                        width: 70,
                                        borderRadius: 7,
                                        objectFit: "cover",
                                      }}
                                    />
                                    <div
                                      key={product.id}
                                      style={{ width: 380 }}
                                    >
                                      {product.name}
                                    </div>
                                    <div
                                      key={product.id}
                                      style={{ width: 70 }}
                                    >
                                 {product.productInventoryModel}
                                    </div>
                                    <input
                                      style={{ height: 30, width: 70 }}
                                      value={product.quantity}
                                      onChange={(e) => {
                                        updateQuantity(
                                          product.productId,
                                          e.target.value
                                        );
                                      }}
                                    ></input>
                                    <select
                                      style={{ height: 30, marginLeft: 10 }}
                                      onChange={(e) =>
                                        updateProductID(
                                          product.productId,
                                          e.target.value
                                        )
                                      }
                                    >
                                      {product.productPrefer.map((unit) => {
                                        return (
                                          <option key={unit.id} value={unit.id}>
                                            {unit.unitName}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <button
                                      style={{
                                        height: 30,
                                        marginLeft: 10,
                                        backgroundColor: "white",
                                        border: "1px solid white",
                                        color: "red",
                                      }}
                                      onClick={() => {
                                        const newList = listCart.filter(
                                          (item) =>
                                            item.productId !== product.productId
                                        );

                                        setListCart(newList);
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
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row "
              style={{ width: 300, marginTop: -30, marginLeft: 20 }}
            >
              <div className="col-xl">
                <div className="card mb-4">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{
                      height: 70,
                      backgroundColor: "white",
                      padding: "20px 24px",

                      borderColor: "#f4f4f4",
                    }}
                  >
                    <h5 className="mb-0">Xác Nhận Đơn Hàng</h5>
                  </div>
                  <div className="card-body">
                    <div
                      style={{
                        display: "grid",

                        padding: 15,
                      }}
                    >
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-fullname"
                        >
                          Số Điện Thoại
                         
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            className="form-control"
                            id="basic-icon-default-fullname"
                            placeholder="Tên Người Mua"
                            aria-label="Tên Người Mua"
                            aria-describedby="basic-icon-default-fullname2"
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                reveicerInformation: {
                                  ...product.reveicerInformation,
                                  phoneNumber: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-fullname"
                        >
                          Tên
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            className="form-control"
                            id="basic-icon-default-fullname"
                            placeholder="Tên Sản Phẩm"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                reveicerInformation: {
                                  ...product.reveicerInformation,
                                  fullname: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <a
                        className="button-28"
                        onClick={Checkout}
                        style={{
                          height: 40,
                          width: 200,
                          fontSize: 13,
                          paddingTop: 10,

                          marginTop: "10px",
                          marginBottom: -20,
                          backgroundColor: "#82AAE3",
                          color: "white",
                        }}
                      >
                        Thanh Toán
                      </a>
                    </div>
                    {/* <button onClick={hiennew}>Hiện</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </div>
  );
};
export default CheckOutPharmacist;
