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
import { useHistory, useLocation } from "react-router-dom";
import Header from "../Header/Header";
const Home = (props) => {
  let history = useHistory();
  const location = useLocation();
  const { cartData } = location.state;
  const [city, setCity] = useState([]);

  const [date, setDate] = useState([]);
  const [dateTime, setDateTime] = useState("");
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
  const [gender, setGender] = useState(null);
  const { drug, total, newArrayOfObjects, orderID } = cartData;
  const [product, setProduct] = useState({
    orderId: orderID,
    orderTypeId: 2,
    siteId: "44701a50-c426-4235-9baa-3da837eb6e69",
    pharmacistId: null,
    subTotalPrice: cartData.total.subTotalPrice,
    discountPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    usedPoint: 0,
    payType: 1,
    isPaid: 0,
    note: "",
   
    products: newArrayOfObjects,
    reveicerInformation: {
      fullname: "",
      phoneNumber: "",
      email: "",
      gender: true,
      cityId: null,
      districtId: null,
      wardId: null,
      homeAddress: null,
    },
    orderPickUp: {
      datePickUp: "",
      timePickUp: "",
    },
  });
  const genders = [
    { name: "Male", value: 0 },
    { name: "FeMale", value: 1 },
  ];
  const checkValidation = () => {
    // if (id.trim() === "") {
    //   Swal.fire("ID Can't Empty", "", "question");
    //   return false;
    // }
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
  
  async function loadDataTime() {
    const path = `Order/PickUp/${dateTime}/TimeAvailable`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setTime(res.data);
       console.log('time',time)
    }
  }
  async function loadDataWard() {
    const path = `Address/${districtID}/Ward`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setWard(res.data);
    }
  }
  const handleDate = (event) => {
    event.preventDefault();
    const dateTime = event.target.value;
    setDateTime(dateTime);
  };

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
      const data = product;
      const path = "Order/Checkout";
      const res = await createDataByPath(path, "", data);
      console.log("Check res", res);
      console.log("display du lieu", data);
      if (res && res.status === 201) {
        Swal.fire("Create Success", "", "success");
        // window.location.reload();
      }
    }
  }

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <div className="site-wrap">
        <div className="checkout_area section_padding_100">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="checkout_details_area mt-50 clearfix">
                  <div className="cart-page-heading">
                    <h5>Billing Address</h5>
                    <p>Enter your cupone code</p>
                  </div>
                  <form action="#" method="post">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="first_name">
                          Full name <span>*</span>
                        </label>
                        <input
                          type="text"
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
                            setProduct({
                              ...product,
                              reveicerInformation: {
                                ...product.reveicerInformation,
                                cityId: e.target.value,
                              },
                            });
                          }}
                          value={cityID}
                        >
                           {!citySelected && (
                              <option value="" style={{color: "#8899b8"}}>Chọn Tỉnh/ Thành Phô</option>
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
                            setProduct({
                              ...product,
                              reveicerInformation: {
                                ...product.reveicerInformation,
                                districtId: e.target.value,
                              },
                            });
                          }}
                          value={districtID}
                        >
                             {!districsSelected && (
                              <option value="" style={{color: "#8899b8"}}>Chọn Quận / Huyện</option>
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
                              <option value="" style={{color: "#8899b8"}}>Chọn Phường</option>
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
                            setProduct({
                              ...product,
                              reveicerInformation: {
                                ...product.reveicerInformation,
                                homeAddress: e.target.value,
                              },
                            })
                          }
                        />
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
                            })
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
                            })
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
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
                <div className="order-details-confirmation">
                  <div className="cart-page-heading">
                    <h5>Your Order</h5>
                    <p>The Details</p>
                  </div>

                  <ul className="order-details-form mb-4">
                    <li>
                      <span>Product</span> <span>Total</span>
                    </li>

                    {total && total.subTotalPrice && (
                      <li>
                        <span>Subtotal</span>{" "}
                        <span>
                          {total.subTotalPrice.toLocaleString("en-US")} VND
                        </span>
                      </li>
                    )}
                    <li>
                      <span>Shipping</span> <span>Free</span>
                    </li>
                    {total && total.totalCartPrice && (
                      <li>
                        <span>Total</span>{" "}
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
                    className="btn karl-checkout-btn"
                  >
                    Place Order
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
export default Home;
