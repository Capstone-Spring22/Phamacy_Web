import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarPharmacist";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { getDataByPath, createDataByPath } from "../../services/data.service";

const CheckOutPharmacist = () => {
  const [activeItem, setActiveItem] = useState("CheckOutPharmacist");
  const [drug, setDrug] = useState(null);
  const [listCart, setListCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [point, setPoint] = useState(0);
  const [count, setCount] = useState(2);
  const [valueSearch, setvalueSearch] = useState("");

  async function loadDataMedicineDefault() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Product?isSellFirstLevel=true&pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
       console.log('display',res)
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
      }
    }
  }
  async function loadDataMedicine(search) {
    if (search === "") {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const path = `Product?isSellFirstLevel=true&pageIndex=${currentPage}&pageItems=${perPage}`;
        const res = await getDataByPath(path, accessToken, "");
        if (res !== null && res !== undefined && res.status === 200) {
          setDrug(res.data.items);
        }
      }
    } else {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const path = `Product?isSellFirstLevel=true&productName=${search}&pageIndex=${currentPage}&pageItems=${perPage}`;
        const res = await getDataByPath(path, accessToken, "");
        if (res !== null && res !== undefined && res.status === 200) {
          setDrug(res.data.items);
        }
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
        if (res && res.status === 200) {
          Swal.fire("Create Success", "", "success");
          // window.location.reload();
        }
      }
    }
  }

  const loadDataUserByPhone = async () => {
    if (checkValidation()) {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const path = `Customer?NameOrPhone=${product.reveicerInformation.phoneNumber}&pageIndex=1&pageItems=12`;
        const res = await getDataByPath(path, accessToken, "");
        console.log("Check res", res);
        if (res && res.status === 200 && res.data.totalRecord > 0) {
          // window.location.reload();
          setProduct({
            ...product,
            reveicerInformation: {
              ...product.reveicerInformation,
              fullname: res.data.items[0].fullname,
            },
          });
        } else if (res && res.status === 200 && res.data.totalRecord === 0) {
          setProduct({
            ...product,
            reveicerInformation: {
              ...product.reveicerInformation,
              fullname: "Khách vãng lai",
            },
          });
        }
      }
    }
  };
  const loadPointUserByPhone = async () => {
    if (checkValidation()) {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const path = `CustomerPoint/${product.reveicerInformation.phoneNumber}/CustomerAvailablePoint`;
        const res = await getDataByPath(path, accessToken, "");
        console.log("Check res", res);
        if (res && res.status === 200) {
          // window.location.reload();
          setPoint(res.data);
        } else if (res && res.status === 404) {
          setPoint(0);
        }
      }
    }
  };
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
    loadDataMedicineDefault();
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

  function updateProductID(productId, newQuantity, newPrice) {
    setListCart((prevState) =>
      prevState.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            productId: newQuantity,
            discountPrice: newPrice,
          };
        }
        return item;
      })
    );
  }

  useEffect(() => {
    if (product?.usedPoint > point) {
      console.log("display", "lỗi quá điểm");
    }
    if (
      parseInt(product?.usedPoint) * 1000 >
      listCart?.reduce(
        (total, curent) => total + curent.quantity * curent.discountPrice,
        0
      )
    ) {
      console.log("display", "lỗi quá giảm giá");
    } else {
      setProduct({
        ...product,
        subTotalPrice: listCart?.reduce(
          (total, curent) => total + curent.quantity * curent.discountPrice,
          0
        ),
        discountPrice: parseInt(product?.usedPoint) * 1000,
        totalPrice:
          listCart?.reduce(
            (total, curent) => total + curent.quantity * curent.discountPrice,
            0
          ) -
          parseInt(product?.usedPoint) * 1000,
      });
    }
  }, [count]);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar activeItem={activeItem} />

        <div className="layout-page" style={{ backgroundColor: "#f4f6fb" }}>
          {/* Navbar */}
          <nav
            style={{ marginLeft: 150, width: 850 }}
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
                    onChange={(e) => {
                      loadDataMedicine(e.target.value);
                      setvalueSearch(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* /Search */}
            </div>
          </nav>

          {/* / Navbar */}
          {/* Content wrapper */}
          <div style={{ display: "flex", flexWrap: "wrap", marginLeft: 180 }}>
            {/* <div className="search-result">
              {drug.map((e) => {
                return (
                  <div
                    key={e.id}
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
                    <div
                      style={{ width: 380, marginRight: 30, marginLeft: 30 }}
                    >
                      <div>Tên sản phẩm:</div>
                      <div> {e.name}</div>
                    </div>

                    <div style={{ width: 380 }}>
                      <div>Số Lượng Tồn Kho:</div>
                      <div>{e.productInventoryModel.quantity}</div>
                    </div>
                  </div>
                );
              })}
            </div> */}

            <div
              className="row cart-pharmacist "
              style={{ marginTop: 10, marginLeft: -50 }}
            >
              <div className="col-xl">
                <div className="" style={{ backgroundColor: "transparent" }}>
                  {valueSearch === "" ? (
                    <h5>Sản Phẩm Đề Xuất:</h5>
                  ) : (
                    <h5>Kết Quả Tra Cứu:</h5>
                  )}
                  <div className="card-body scroll-p">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        padding: 30,
                        marginLeft: 100,
                        height: 670,
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
                            style={{ marginLeft: -110 }}
                          >
                            {drug &&
                              drug.map((e) => {
                                return (
                                  <div
                                    key={e.id}
                                    className="product-cart-p"
                                    onClick={() => {
                                      addToCart(e.id);
                                      setCount(parseInt(count) + 1);
                                    }}
                                  >
                                    <img
                                      src={e.imageModel.imageURL}
                                      style={{
                                        height: 70,
                                        width: 60,
                                        borderRadius: 7,
                                        objectFit: "cover",
                                      }}
                                    />
                                    <div className="name-product-pharmacist">
                                      <div>Tên Sản Phẩm</div>
                                      <div> {e.name}</div>
                                    </div>

                                    <div style={{ width: 380 }}>
                                      <div>Số Lượng Tồn Kho:</div>
                                      <div>
                                        {e.productInventoryModel?.quantity}{" "}
                                        {e.productInventoryModel?.unitName}
                                      </div>
                                    </div>
                                    <div style={{ width: 380 }}>
                                      <div>Giá</div>
                                      <div>
                                        {e.priceAfterDiscount.toLocaleString(
                                          "en-US"
                                        )}{" "}
                                        đ / {e.productInventoryModel.unitName}
                                      </div>
                                    </div>
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
            {/* <div
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
                            {listCart.length === 0 ? (
                              <img
                                style={{ height: 400 }}
                                src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
                              />
                            ) : (
                              <>
                                {listCart &&
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
                                          style={{ width: 400 }}
                                        >
                                          <div>Tên sản phẩm:</div>
                                          <div> {product.name}</div>
                                        </div>
                                        <div
                                          style={{ width: 100, marginLeft:10 }}
                                        >
                                           <div>Giá </div>
                                          <div> {product.originalPrice}</div>
                                          
                                        </div>
                                        <div style={{ width: 100 }}>
                                        <div>SL mua:</div>
                                        <input
                                          style={{ height: 30, width: 70 }}
                                          value={product.quantity}
                                          onChange={(e) => {
                                            setCount(parseInt(count) +1)
                                            updateQuantity(
                                              product.productId,
                                              e.target.value
                                            );
                                          }}
                                        ></input>
                                        </div>
                                        <div style={{ width: 100 }}>
                                        <div>Đơn vị:</div>
                                        <select
                                          style={{ height: 30, marginLeft: 10 }}
                                          onChange={(e) =>{
                                            setCount(parseInt(count) +1)
                                            updateProductID(
                                              product.productId,
                                              e.target.value
                                            )}
                                          }
                                        >
                                          {product.productPrefer.map((unit) => {
                                            return (
                                              <option
                                                key={unit.id}
                                                value={unit.id}
                                              >
                                                {unit.unitName}
                                              </option>
                                            );
                                          })}
                                        </select>
                                        </div>
                                       
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
                                                item.productId !==
                                                product.productId
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
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div
              className="row "
              style={{ width: 440, marginTop: -70, marginLeft: -80 }}
            >
              <div className="col-xl">
                <div className="card mb-4" style={{ height: 740 }}>
                  <div className="card-body">
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        padding: 1,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          padding: 1,
                          height: 200,
                        }}
                      >
                        <div
                          className="mb-3"
                          style={{ width: "45%", marginRight: 20 }}
                        >
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-fullname"
                          >
                            Số Điện Thoại Người Mua
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Số điện thoại "
                              aria-label="Tên Người Mua"
                              aria-describedby="basic-icon-default-fullname2"
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  reveicerInformation: {
                                    ...product.reveicerInformation,
                                    phoneNumber: e.target.value,
                                  },
                                });
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  loadDataUserByPhone();
                                  loadPointUserByPhone();
                                }
                              }}
                            />
                          </div>

                          {point !== 0 ? (
                            <div>
                              <div>Điểm : {point}</div>
                              <label
                                className="form-label"
                                htmlFor="basic-icon-default-fullname"
                              >
                                Điểm Tich Luỹ
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="basic-icon-default-fullname"
                                  placeholder="Nhập Điểm "
                                  aria-label="Tên Sản Phẩm"
                                  aria-describedby="basic-icon-default-fullname2"
                                  value={
                                    product.usedPoint === 0
                                      ? ""
                                      : product.usedPoint
                                  }
                                  onChange={(e) => {
                                    if (e.target.value === "") {
                                      setProduct({
                                        ...product,
                                        usedPoint: 0,
                                      });
                                    } else {
                                      setProduct({
                                        ...product,
                                        usedPoint: e.target.value,
                                      });
                                    }

                                    setCount(parseInt(count) + 1);
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="mb-3" style={{ width: "45%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-fullname"
                          >
                            Tên Người Mua
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Tên người nhận"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                              value={product.reveicerInformation.fullname}
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
                      </div>

                      <div className="cart-pharmacist-checkout">
                        {listCart.length === 0 ? (
                          <img
                            style={{ height: 300 }}
                            src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
                          />
                        ) : (
                          <>
                            {listCart &&
                              listCart.map((product) => {
                                return (
                                  <div className="product-cart-p2">
                                    <img
                                      src={product.imageURL}
                                      style={{
                                        height: 30,
                                        width: 30,
                                        borderRadius: 7,
                                        objectFit: "cover",
                                        marginTop: 10,
                                      }}
                                    />
                                    <div
                                      key={product.id}
                                      style={{ width: 400 }}
                                    >
                                      <div className="name-product-pharmacist2">
                                        {" "}
                                        {product.name}
                                        <div style={{ display: "flex" }}>
                                          <button
                                            className="button-minus"
                                            onClick={() => {
                                              setCount(parseInt(count) + 1);
                                              updateQuantity(
                                                product.productId,
                                                product.quantity - 1
                                              );
                                            }}
                                          >
                                            -
                                          </button>
                                          <input
                                            style={{
                                              height: 30,
                                              width: 30,
                                              marginLeft: 15,
                                              marginTop: 5,
                                            }}
                                            className="input-quantity-pharma"
                                            value={product.quantity}
                                            onChange={(e) => {
                                              setCount(parseInt(count) + 1);
                                              updateQuantity(
                                                product.productId,
                                                e.target.value
                                              );
                                            }}
                                          ></input>{" "}
                                          <button
                                            className="button-plus"
                                            onClick={() => {
                                              setCount(parseInt(count) + 1);
                                              updateQuantity(
                                                product.productId,
                                                product.quantity + 1
                                              );
                                            }}
                                          >
                                            +
                                          </button>
                                          <select
                                            style={{
                                              height: 30,
                                              marginLeft: 10,
                                              border: "none",
                                            }}
                                            onChange={(e) => {
                                              setCount(parseInt(count) + 1);
                                              updateProductID(
                                                product.productId,
                                                e.target.value,
                                                e.target.options[
                                                  e.target.selectedIndex
                                                ].getAttribute("quantity")
                                              );
                                            }}
                                          >
                                            {product.productPrefer.map(
                                              (unit) => {
                                                return (
                                                  <option
                                                    key={unit.id}
                                                    value={unit.id}
                                                    quantity={
                                                      unit.priceAfterDiscount
                                                    }
                                                  >
                                                    {unit.unitName}
                                                  </option>
                                                );
                                              }
                                            )}
                                          </select>
                                          <div
                                            style={{
                                              height: 30,
                                              marginLeft: 10,
                                              border: "none",
                                              marginTop: 5,
                                            }}
                                          >
                                            {product?.discountPrice?.toLocaleString(
                                              "en-US"
                                            )}{" "}
                                            đ
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <button
                                      style={{
                                        height: 30,

                                        backgroundColor: "white",
                                        border: "1px solid white",
                                        color: "red",
                                      }}
                                      onClick={() => {
                                        setCount(parseInt(count) + 1);
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
                          </>
                        )}
                      </div>

                      <div className="mb-3" style={{ width: "45%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-fullname"
                          style={{ fontSize: 15 }}
                        >
                          Tạm Tính
                        </label>
                      </div>
                      <div className="mb-3" style={{ width: "45%" }}>
                        <div className="input-group input-group-merge">
                          <div
                            style={{ marginLeft: "auto" }}
                            id="basic-icon-default-fullname"
                            placeholder="Tên người nhận"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
                          >
                            {product.subTotalPrice}
                          </div>
                        </div>
                      </div>
                      <div className="mb-3" style={{ width: "45%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-fullname"
                          style={{ fontSize: 15 }}
                        >
                          Số Tiền Giảm
                        </label>
                      </div>
                      <div className="mb-3" style={{ width: "45%" }}>
                        <div className="input-group input-group-merge">
                          <div
                            type="text"
                            style={{ marginLeft: "auto", fontSize: 15 }}
                            id="basic-icon-default-fullname"
                            placeholder="Tên người nhận"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
                          >
                            {product?.usedPoint * 1000}
                          </div>
                        </div>
                      </div>
                      <div className="mb-3" style={{ width: "45%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-fullname"
                          style={{ fontSize: 15 }}
                        >
                          Tổng Giá
                        </label>
                      </div>
                      <div className="mb-3" style={{ width: "45%" }}>
                        <div className="input-group input-group-merge">
                          <div
                            type="text"
                            style={{ marginLeft: "auto", fontSize: 15 }}
                            id="basic-icon-default-fullname"
                            placeholder="Tên người nhận"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
                          >
                            {product.totalPrice}
                          </div>
                        </div>
                      </div>
                      <a
                        className="button-28"
                        onClick={Checkout}
                        style={{
                          height: 40,
                          width: 900,
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
