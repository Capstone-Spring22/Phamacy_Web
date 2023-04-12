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
const Home = (props) => {
  let history = useHistory();
  const location = useLocation();
  const { cartData } = location.state;
  const [city, setCity] = useState([]);
  localStorage.setItem("cartData", JSON.stringify(cartData));
  const roleName = localStorage.getItem("roleName");
  const userName = localStorage.getItem("userName");
  const phoneNo = localStorage.getItem("phoneNo");
  const Email = localStorage.getItem("email");
  // Retrieve the cart data from local storage
  const [countAddress, setcCountAddress] = useState(0);

  const [date, setDate] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [inputAddress, setInputAddress] = useState(false);
  const [time, setTime] = useState([]);
  const [citySelected, setCitySelected] = useState(false);
  const [districsSelected, setDistricsSelected] = useState(false);
  const [wardSelected, setWardSelected] = useState(false);
  const [genderSelected, setGenderSelected] = useState(false);
  const [cityID, setCityID] = useState("");
  const [districs, setDistrics] = useState([]);
  const [districtID, setDistrictID] = useState("");
  const [ward, setWard] = useState([]);
  const [wardID, setWardID] = useState("");
  const [siteName, setSiteName] = useState("");
  const { checkoutSite, setCheckoutSite } = useState([]);
  const [checkSite, setCheckSite] = useState([]);
  const [gender, setGender] = useState(null);
  const {
    drug,
    total,
    newArrayOfObjects,
    CheckoutSiteObjectProduct,
    CheckoutSiteObjectQuantity,
    orderID,
  } = cartData;
  const [orderTypeId, setOrderTypeId] = useState(2);
  const [selectedButton, setSelectedButton] = useState("button1");
  const [point, setPoint] = useState([]);
  const [product, setProduct] = useState({
    orderId: orderID,
    orderTypeId: 2,
    siteId: null,
    pharmacistId: null,
    subTotalPrice: cartData.total.subTotalPrice,
    discountPrice: cartData.total.discountPrice,
    shippingPrice: 0,
    totalPrice: cartData.total.totalCartPrice,
    usedPoint: 0,
    payType: 1,
    isPaid: 0,
    note: "",

    products: newArrayOfObjects,
    reveicerInformation: {
      fullname: userName,
      phoneNumber: phoneNo,
      email: Email,
      gender: true,
      cityId: null,
      districtId: null,
      wardId: null,
      homeAddress: null,
    },
    vnpayInformation: null,
    orderPickUp: null,
  });

  const [addressUser, setAddressUser] = useState({
    customerId: localStorage.getItem("id"),
    cityId: "",
    districtId: "",
    wardId: "",
    homeAddress: "",
    isMainAddress: false,
  });
  localStorage.setItem("product", JSON.stringify(product));
  const genders = [
    { name: "Male", value: 0 },
    { name: "FeMale", value: 1 },
  ];
  const checkValidation = () => {
    if (product.usedPoint > point) {
      alert("Số lượng Điểm Thưởng đã nhập vượt quá số Điểm Thưởng hiện có");
      return false;
    }
    return true;
  };

  const handleGender = (event) => {
    event.preventDefault();
    const genderID = event.target.value;
    setGender(genderID);
  };
  async function loadDataCity() {
    const path = `Address/City`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setCity(res.data);
    }
  }
  async function loadDataDate() {
    const path = `Order/PickUp/DateAvailable`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setDate(res.data);
    }
  }

  async function loadDataDistrics() {
    const path = `Address/${cityID}/District`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setDistrics(res.data);
    }
  }
  async function loadPoint() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `CustomerPoint/${phoneNo}/CustomerAvailablePoint`;
      console.log("point", point);
      const res = await getDataByPath(path, accessToken, "");
      if (res !== null && res !== undefined && res.status === 200) {
        setPoint(res.data);
      }
    }
  }
  const [listAddress, setListAddress] = useState([]);
  async function loadUserByID() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Customer/${localStorage.getItem("id")}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("res.data.customerAddressList", res.data.customerAddressList);
      if (res !== null && res !== undefined && res.status === 200) {
        setListAddress(res.data.customerAddressList);
      }
    }
  }
  useEffect(() => {
    loadUserByID();
  }, [countAddress]);
  useEffect(() => {
    loadPoint();
  }, [point]);
  async function loadDataTime() {
    const path = `Order/PickUp/${dateTime}/TimeAvailable`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setTime(res.data);
      console.log("time", time);
    }
  }
  const [showForm1, setShowForm1] = useState(true);
  const [showForm2, setShowForm2] = useState(false);

  const handleShowForm1 = () => {
    setShowForm1(true);
    setShowForm2(false);
    setOrderTypeId(2);
    setSelectedButton("button1");
    setProduct((prevState) => ({
      ...prevState,
      orderTypeId: 2,
    }));
  };

  const handleShowForm2 = () => {
    setShowForm1(false);
    setShowForm2(true);
    setOrderTypeId(3);
    setSelectedButton("button2");
    setProduct((prevState) => ({
      ...prevState,
      orderTypeId: 3,
    }));
  };
  async function loadDataWard() {
    const path = `Address/${districtID}/Ward`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setWard(res.data);
    }
  }
  const productIds =
    CheckoutSiteObjectProduct &&
    CheckoutSiteObjectProduct.length &&
    CheckoutSiteObjectProduct.map((product) => product.productId).join(";");
  const quantitys =
    CheckoutSiteObjectQuantity &&
    CheckoutSiteObjectQuantity.length &&
    CheckoutSiteObjectQuantity.map((product) => product.quantity).join(";");

  async function loadDataCitybyID() {
    const path = `Address/${districtID}/Ward`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setWard(res.data);
    }
  }
  async function loadDataDistrictbyID() {
    const path = `Address/${districtID}/Ward`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setWard(res.data);
    }
  }
  async function loadDataWardbyID() {
    const path = `Address/${districtID}/Ward`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setWard(res.data);
    }
  }
  async function CheckoutSiteget() {
    const path = `Order/PickUp/Site?ProductId=${productIds}&Quantity=${quantitys}&CityId=${cityID}`;
    const res = await getDataByPath(path, "", "");
    console.log("res", res.data.totalSite);
    console.log("productId", CheckoutSiteObjectProduct);
    console.log("quantity", CheckoutSiteObjectQuantity);
    console.log("ListProduct", productIds);
    console.log("ListQuantity", quantitys);
    if (res !== null && res !== undefined && res.status === 200) {
      setCheckSite(res.data.siteListToPickUps);
      console.log("siteId", checkSite);
    }
  }
  useEffect(() => {
    CheckoutSiteget();
  }, [cityID]);
  const handleDate = (event) => {
    event.preventDefault();
    const dateTime = event.target.value;
    setDateTime(dateTime);
  };
  const id = localStorage.getItem("id");
  const handlecity = (event) => {
    event.preventDefault();
    const cityID = event.target.value;
    setCityID(cityID);
  };
  const handleDistrict = (event) => {
    event.preventDefault();
    const districtID = event.target.value;
    setDistrictID(districtID);
  };
  const handleWards = (event) => {
    event.preventDefault();
    const wardID = event.target.value;
    setWardID(wardID);
  };
  useEffect(() => {
    loadDataDate();
  }, []);
  useEffect(() => {
    loadDataTime();
  }, [dateTime]);
  useEffect(() => {
    loadDataCity();
  }, []);
  useEffect(() => {
    loadDataDistrics();
  }, [cityID]);
  useEffect(() => {
    loadDataWard();
  }, [districtID]);
  async function Checkout() {
    if (checkValidation()) {
      if (product.payType === 1) {
        const data = product;
        const path = "Order/Checkout";
        const res = await createDataByPath(path, "", data);
        console.log("Check res", res);
        console.log("display du lieu", data);
        if (res && res.status === 200) {
          Swal.fire("Create Success", "", "success");
          // window.location.reload();
        }
      } else if (product.payType === 2) {
        const currentUrl = `${window.location.origin}/VNpay`;
        const url =
          await axios.get(`https://betterhealthapi.azurewebsites.net/api/v1/VNPay?Amount=${
            cartData.total.totalCartPrice
          }&OrderId=${orderID}&IpAddress=${localStorage.getItem(
            "deviceId"
          )}&UrlCallBack=${encodeURIComponent(currentUrl)}
        `);
        if (url && url.status === 200) {
          window.location.href = `${url.data}`;
          localStorage.getItem("cartData");
        }
      }
    }
  }
  const Addaddressuser = async () => {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const data = addressUser;
      const path = "CustomerAddress";
      const res = await createDataByPath(path, accessToken, data);
      console.log("Check res", res);
      console.log("display du lieu", data);
      if (res && res.status === 200) {
        setcCountAddress(parseInt(countAddress) + 1);
        setAddressUser({
          customerId: localStorage.getItem("id"),
          cityId: "",
          districtId: "",
          wardId: "",
          homeAddress: "",
          isMainAddress: false,
        });
        setInputAddress(false);

        // Swal.fire("Create Success", "", "success");
        // window.location.reload();
      }
    }
  };
  const deleteaddressuser = async (id) => {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `CustomerAddress/${id}`;
      const res = await deleteDataByPath(path, accessToken, "");
      console.log("Check res", res);
      if (res && res.status === 200) {
        setcCountAddress(parseInt(countAddress) + 1);
        // Swal.fire("Create Success", "", "success");
        // window.location.reload();
      }
    }
  };
  // Function to retrieve the stored data from localStorage

  useEffect(() => {}, []);
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
                <div className="method-order">
                  {" "}
                  <button
                    className={
                      selectedButton === "button1" ? "button-order" : "action"
                    }
                    onClick={handleShowForm1}
                  >
                    Nhận Tại Nhà Thuốc
                  </button>
                  <button
                    className={
                      selectedButton === "button2" ? "button-order" : "action"
                    }
                    onClick={handleShowForm2}
                  >
                    Giao Tận Nơi
                  </button>
                </div>

                <div className="checkout_details_area mt-50 clearfix">
                  <div className="cart-page-heading">
                    <h5>Thông Tin</h5>
                    <p>Viết Thông Tin</p>
                  </div>
                  {showForm1 && (
                    <form action="#" method="post">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="first_name">
                            Tên Đầy Đủ <span>*</span>
                          </label>
                          <input
                            type="text"
                            value={userName}
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            className="form-control"
                            id="full_name"
                            required=""
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
                        <div className="col-md-6 mb-3">
                          <label htmlFor="last_name">
                            Số điện thoại <span>*</span>
                          </label>
                          <input
                            type="text"
                            value={phoneNo}
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            className="form-control"
                            id="sdt"
                            defaultValue=""
                            required=""
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
                        <div className="col-12 mb-3">
                          <label htmlFor="company">Email</label>
                          <input
                            type="text"
                            value={Email}
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            className="form-control"
                            id="company"
                            defaultValue=""
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                reveicerInformation: {
                                  ...product.reveicerInformation,
                                  email: e.target.value,
                                },
                              })
                            }
                          />
                        </div>

                        <div className="col-12 mb-3">
                          <label htmlFor="street_address">
                            Thành phố <span>*</span>
                          </label>
                          <select
                            name="city"
                            id="basic-icon-default-email"
                            className="form-control"
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            onChange={(e) => {
                              handlecity(e);
                              // setProduct({
                              //   ...product,
                              //   reveicerInformation: {
                              //     ...product.reveicerInformation,
                              //     cityId: e.target.value,
                              //   },
                              // });
                            }}
                            value={cityID}
                          >
                            {!citySelected && (
                              <option value="" style={{ color: "#8899b8" }}>
                                Chọn Tỉnh/ Thành Phô
                              </option>
                            )}
                            {city &&
                              city.length &&
                              city.map((e, index) => {
                                return (
                                  <>
                                    <option key={e.id} value={e.id}>
                                      {e.cityName}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>

                        <div className="col-12 mb-3">
                          <label htmlFor="postcode">
                            Quận/Huyện <span>*</span>
                          </label>

                          <select
                            id="basic-icon-default-email"
                            className="form-control"
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            onChange={(e) => {
                              handleDistrict(e);
                              // setProduct({
                              //   ...product,
                              //   reveicerInformation: {
                              //     ...product.reveicerInformation,
                              //     districtId: e.target.value,
                              //   },
                              // });
                            }}
                            value={districtID}
                          >
                            {!districsSelected && (
                              <option value="" style={{ color: "#8899b8" }}>
                                Chọn Quận / Huyện
                              </option>
                            )}
                            {districs &&
                              districs.length &&
                              districs.map((e, index) => {
                                return (
                                  <>
                                    <option key={e.id} value={e.id}>
                                      {e.districtName}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                        {/* <div className="col-12 mb-3">
                          <label htmlFor="city">
                            Phường <span>*</span>
                          </label>

                          <select
                            id="basic-icon-default-email"
                            className="form-control"
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            value={wardID}
                            onChange={(e) => {
                              handleWards(e);
                              setProduct({
                                ...product,
                                reveicerInformation: {
                                  ...product.reveicerInformation,
                                  wardId: e.target.value,
                                },
                              });
                            }}
                          >
                            {!wardSelected && (
                              <option value="" style={{ color: "#8899b8" }}>
                                Chọn Phường
                              </option>
                            )}
                            {ward &&
                              ward.length &&
                              ward.map((e, index) => {
                                return (
                                  <>
                                    <option key={e.id} value={e.id}>
                                      {e.wardName}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div> */}
                        {/* <div className="col-12 mb-3">
                          <label htmlFor="state">
                            Địa chỉ cụ thể <span>*</span>
                          </label>
                          <input
                            type="text"
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            className="form-control"
                            id="state"
                            defaultValue=""
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                reveicerInformation: {
                                  ...product.reveicerInformation,
                                  homeAddress: e.target.value,
                                },
                              })
                            }
                          />
                        </div> */}
                        <div className="col-12 mb-3">
                          <div className="checkout-payment">
                            {checkSite.length > 0 ? (
                              checkSite &&
                              checkSite.map((siteInfo, index) => {
                                const id = `credit-card-${index}`;
                                return (
                                  <div
                                    key={siteInfo.siteId}
                                    onClick={() =>
                                      setProduct((prevState) => ({
                                        ...prevState,
                                        siteId: siteInfo.siteId,
                                      }))
                                    }
                                  >
                                    <div
                                      className="payment-cart"
                                      onClick={() =>
                                        document.getElementById(id).click()
                                      }
                                    >
                                      <label htmlFor={id}>
                                        <input
                                          type="radio"
                                          id={id}
                                          name="payment"
                                          value="credit-card"
                                          style={{ marginRight: 10 }}
                                        />
                                        {siteInfo.siteName}
                                        <div>
                                          Địa chỉ: {siteInfo.fullyAddress}
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <p>No site info found.</p>
                            )}
                          </div>{" "}
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="street_address">
                            Ghi Chú <span>*</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control mb-3"
                            id="street_address"
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            defaultValue=""
                            onChange={(e) =>
                              setProduct((prevState) => ({
                                ...prevState,
                                note: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="last_name">
                            Ngày nhận <span>*</span>
                          </label>

                          <select
                            name="city"
                            id="basic-icon-default-email"
                            className="form-control"
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            onChange={(e) => {
                              handleDate(e);
                              setProduct({
                                ...product,
                                orderPickUp: {
                                  ...product.orderPickUp,
                                  datePickUp: e.target.value,
                                },
                              });
                            }}
                            value={dateTime}
                          >
                            {date &&
                              date.length &&
                              date.map((e, index) => {
                                return (
                                  <>
                                    <option key={e.dateTime} value={e.dateTime}>
                                      {e.dayofWeekAndDate}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="last_name">
                            Thời gian nhận <span>*</span>
                          </label>

                          <select
                            id="basic-icon-default-email"
                            className="form-control"
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            onChange={(e) => {
                              handleDistrict(e);
                              setProduct({
                                ...product,
                                orderPickUp: {
                                  ...product.orderPickUp,
                                  timePickUp: e.target.value,
                                },
                              });
                            }}
                          >
                            {time &&
                              time.length &&
                              time.map((e, index) => {
                                return (
                                  <>
                                    <option key={e.id} value={e.id}>
                                      {e}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </form>
                  )}
                  {showForm2 && (
                    <form action="#" method="post">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="first_name">
                            Tên Đầy Đủ <span>*</span>
                          </label>
                          <input
                            type="text"
                            value={userName}
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            className="form-control"
                            id="full_name"
                            defaultValue=""
                            required=""
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
                        <div className="col-md-6 mb-3">
                          <label htmlFor="last_name">
                            Số điện thoại <span>*</span>
                          </label>
                          <input
                            type="text"
                            value={phoneNo}
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            className="form-control"
                            id="sdt"
                            defaultValue=""
                            required=""
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
                        <div className="col-12 mb-3">
                          <label htmlFor="company">Email</label>
                          <input
                            type="text"
                            value={Email}
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            className="form-control"
                            id="company"
                            defaultValue=""
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                reveicerInformation: {
                                  ...product.reveicerInformation,
                                  email: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <div onClick={(e) => setInputAddress(!inputAddress)}>
                            Add
                          </div>
                          {inputAddress && (
                            <div>
                              <div className="col-12 mb-3">
                                <label htmlFor="street_address">
                                  Thành phố <span>*</span>
                                </label>
                                <select
                                  name="city"
                                  id="basic-icon-default-email"
                                  className="form-control"
                                  style={{
                                    border: "1px solid #e4e7eb",
                                    backgroundColor: "white",
                                    borderRadius: 5,
                                  }}
                                  onChange={(e) => {
                                    handlecity(e);
                                    setAddressUser({
                                      ...addressUser,
                                      cityId: e.target.value,
                                    });
                                  }}
                                  value={addressUser.cityID}
                                >
                                  {!citySelected && (
                                    <option
                                      value=""
                                      style={{ color: "#8899b8" }}
                                    >
                                      Chọn Tỉnh/ Thành Phô
                                    </option>
                                  )}
                                  {city &&
                                    city.length &&
                                    city.map((e, index) => {
                                      return (
                                        <>
                                          <option key={e.id} value={e.id}>
                                            {e.cityName}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                              <div className="col-12 mb-3">
                                <label htmlFor="postcode">
                                  Quận/Huyện <span>*</span>
                                </label>

                                <select
                                  id="basic-icon-default-email"
                                  className="form-control"
                                  style={{
                                    border: "1px solid #e4e7eb",
                                    backgroundColor: "white",
                                    borderRadius: 5,
                                  }}
                                  onChange={(e) => {
                                    handleDistrict(e);
                                    setAddressUser({
                                      ...addressUser,
                                      districtId: e.target.value,
                                    });
                                  }}
                                  value={addressUser.districtId}
                                >
                                  {!districsSelected && (
                                    <option
                                      value=""
                                      style={{ color: "#8899b8" }}
                                    >
                                      Chọn Quận / Huyện
                                    </option>
                                  )}
                                  {districs &&
                                    districs.length &&
                                    districs.map((e, index) => {
                                      return (
                                        <>
                                          <option key={e.id} value={e.id}>
                                            {e.districtName}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                              <div className="col-12 mb-3">
                                <label htmlFor="city">
                                  Phường <span>*</span>
                                </label>

                                <select
                                  id="basic-icon-default-email"
                                  className="form-control"
                                  style={{
                                    border: "1px solid #e4e7eb",
                                    backgroundColor: "white",
                                    borderRadius: 5,
                                  }}
                                  value={addressUser.wardId}
                                  onChange={(e) => {
                                    handleWards(e);
                                    setAddressUser({
                                      ...addressUser,
                                      wardId: e.target.value,
                                    });
                                  }}
                                >
                                  {!wardSelected && (
                                    <option
                                      value=""
                                      style={{ color: "#8899b8" }}
                                    >
                                      Chọn Phường
                                    </option>
                                  )}
                                  {ward &&
                                    ward.length &&
                                    ward.map((e, index) => {
                                      return (
                                        <>
                                          <option key={e.id} value={e.id}>
                                            {e.wardName}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                              <div className="col-12 mb-3">
                                <label htmlFor="state">
                                  Địa chỉ cụ thể <span>*</span>
                                </label>
                                <input
                                  type="text"
                                  style={{
                                    border: "1px solid #e4e7eb",
                                    backgroundColor: "white",
                                    borderRadius: 5,
                                  }}
                                  className="form-control"
                                  id="state"
                                  defaultValue=""
                                  onChange={(e) =>
                                    setAddressUser({
                                      ...addressUser,
                                      homeAddress: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div onClick={Addaddressuser}>lưu</div>
                            </div>
                          )}
                          {listAddress.length > 0 ? (
                            <div className="checkout-payment">
                              {listAddress.length > 0 ? (
                                listAddress &&
                                listAddress.map((address, index) => {
                                  const id = `credit-card-${index}`;
                                  return (
                                    <div
                                      key={address.id}
                                      onClick={() =>
                                        setProduct({
                                          ...product,
                                          reveicerInformation: {
                                            ...product.reveicerInformation,
                                            cityId: address.cityId,
                                            districtId: address.districtId,
                                            wardId: address.wardId,
                                            homeAddress: address.homeAddress,
                                          },
                                        })
                                      }
                                    >
                                      <div
                                        className="payment-cart"
                                        onClick={() =>
                                          document.getElementById(id).click()
                                        }
                                      >
                                        <label htmlFor={id}>
                                          <input
                                            type="radio"
                                            id={id}
                                            name="payment"
                                            value="credit-card"
                                            style={{ marginRight: 10 }}
                                          />
                                          <div>
                                            Địa chỉ: {address.fullyAddress}
                                          </div>
                                        </label>
                                      </div>
                                      <div
                                        onClick={() =>
                                          deleteaddressuser(address.id)
                                        }
                                      >
                                        Xoá
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <p>No site info found.</p>
                              )}
                            </div>
                          ) : (
                           <></>
                          )}
                        </div>

                        <div className="col-12 mb-3">
                          <label htmlFor="street_address">
                            Ghi Chú <span>*</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control mb-3"
                            id="street_address"
                            style={{
                              border: "1px solid #e4e7eb",
                              backgroundColor: "white",
                              borderRadius: 5,
                            }}
                            defaultValue=""
                            onChange={(e) =>
                              setProduct((prevState) => ({
                                ...prevState,
                                note: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </form>
                  )}
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
                    {total && total.subTotalPrice && (
                      <li style={{ fontSize: 15 }}>
                        <span>Subtotal</span>{" "}
                        <span>
                          {total.subTotalPrice.toLocaleString("en-US")} VND
                        </span>
                      </li>
                    )}
                    <li style={{ fontSize: 15 }}>
                      <span>Phí Giao Hàng</span> <span>Free</span>
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
                    Thanh Toán
                  </a>
                </div>
                <div className="checkout-payment">
                  <div
                    className="payment-cart"
                    onClick={() =>
                      document.getElementById("credit-card").click()
                    }
                  >
                    <label for="credit-card">
                      <input
                        type="radio"
                        id="credit-card"
                        name="payment"
                        value="credit-card"
                        style={{ marginRight: 10 }}
                        onClick={() => {
                          setProduct((prevState) => ({
                            ...prevState,
                            payType: 1,
                          }));
                        }}
                      />
                      Thanh Toán Tiền Mặt Khi Nhận Hàng
                    </label>
                  </div>
                  <div
                    className="payment-cart"
                    onClick={() =>
                      document.getElementById("credit-card1").click()
                    }
                  >
                    <label for="credit-card1">
                      <input
                        type="radio"
                        id="credit-card1"
                        name="payment"
                        value="credit-card"
                        style={{ marginRight: 10 }}
                        onClick={() => {
                          setProduct((prevState) => ({
                            ...prevState,
                            payType: 2,
                          }));
                        }}
                      />
                      Thanh Toán Bằng VNPay
                    </label>
                  </div>
                </div>
                {id ? (
                  <div className="checkout-payment">
                    <div className="payment-cart">
                      <label for="credit-card">
                        <label htmlFor="state">
                          Điểm Thưởng
                          <span> Số điểm Còn Lại Của Bạn Là {point}</span>
                        </label>
                        <input
                          type="number"
                          style={{
                            border: "1px solid #e4e7eb",
                            backgroundColor: "white",
                            borderRadius: 5,
                          }}
                          placeholder="Nhập Điểm Thưởng"
                          className="form-control"
                          id="state"
                          max={3}
                          onChange={(e) =>
                            setProduct((prevState) => ({
                              ...prevState,
                              usedPoint: 0,
                            }))
                          }
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default Home;
