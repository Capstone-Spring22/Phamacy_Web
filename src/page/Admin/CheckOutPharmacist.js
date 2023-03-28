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
  const [perPage, setPerPage] = useState(5);

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
      listCart.push(drug1);
      setListCart([...listCart]);
      console.log("display", listCart);
    }
  }
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
    setNewArrayOfObjects(listCart &&
      listCart.length &&
      listCart.map(({ id, quantity, price, priceAfterDiscount }) => ({
        productId: id,
        quantity: 1,
        originalPrice: price,
        discountPrice: priceAfterDiscount,
      })))
  }, [listCart]);
  function updateQuantity(productId, newQuantity) {
    setNewArrayOfObjects((prevState) =>
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

          <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
              {/* Basic Bootstrap Table */}
              <div
                className="card"
                style={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  width: 870,
                  margin: 30,
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
                    <h3 className="fontagon">Sản Phẩm Của Đơn Hàng</h3>
                  </h5>

                  <></>
                </div>

                <div className="table-responsive ">
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
                            backgroundColor: "#f6f9fc",
                            borderColor: "white",
                            color: "#bfc8d3",
                          }}
                        >
                          Tên Sản Phẩm
                        </th>
                        <th
                          style={{
                            backgroundColor: "#f6f9fc",
                            borderColor: "white",
                            color: "#bfc8d3",
                          }}
                        >
                          Số Lượng
                        </th>
                        <th
                          style={{
                            backgroundColor: "#f6f9fc",
                            borderColor: "white",
                            color: "#bfc8d3",
                          }}
                        >
                          Add
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {drug &&
                        drug.length &&
                        drug.map((e) => {
                          return (
                            <tr key={e.id}>
                              <td>{e.name}</td>
                              <td>{e.price}</td>

                              <td onClick={() => addToCart(e.id)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-cart-check"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="content-backdrop fade" />
          </div>

          <div style={{ display: "flex" }}>
            <div
              style={{
                height: 1000,
                width: 1000,
                backgroundColor: "white",
                border: "1px solid black",
              }}
            >
              {listCart &&
                listCart.map((product) => {
                  return (
                    <div>
                      <div key={product.id}>{product.name}</div>
                      quantity{" "}
                      <input
                        onChange={(e) => {
                          updateQuantity(product.id, e.target.value);
                        }}
                      ></input>
                    </div>
                  );
                })}
            </div>
            <button onClick={hiennew}>121212</button>
            <div
              style={{
                height: 1000,
                width: 400,
                backgroundColor: "white",
                border: "1px solid black",
              }}
            >
              sdt
              <input
                onChange={(e) =>
                  setProduct({
                    ...product,
                    reveicerInformation: {
                      ...product.reveicerInformation,
                      phoneNumber: e.target.value,
                    },
                  })
                }
              ></input>
              <input
                onChange={(e) =>
                  setProduct({
                    ...product,
                    reveicerInformation: {
                      ...product.reveicerInformation,
                      fullname: e.target.value,
                    },
                  })
                }
              ></input>
              ten
              <button onClick={Checkout}>Checkout</button>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </div>
  );
};
export default CheckOutPharmacist;
