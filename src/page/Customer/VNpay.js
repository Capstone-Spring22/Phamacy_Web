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
  let history = useHistory();
  const update = (myId) => {
    localStorage.setItem("Oderid", myId);
    history.push("/ViewOrderDetail");
  };
  const update1 = (myId) => {
    localStorage.setItem("Oderid", myId)
    history.push("/ViewOrderDetail");
  };
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
    shippingPrice: productCheckOut.shippingPrice,
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

  async function handleRemoveCart() {
    const res = await axios.delete(
      `https://betterhealthapi.azurewebsites.net/api/v1/Cart/${cartID1}`
    );
    if (res !== null && res !== undefined && res.status === 200) {
    }
  }

  async function Checkout() {
    if (localStorage && localStorage.getItem("accessTokenUser")) {
      const accessToken = localStorage.getItem("accessTokenUser");
      const data = product;
      console.log("data", data);
      const path = "Order/Checkout";
      const res = await createDataByPath(path, accessToken, data);
      console.log("Check res", res);
      console.log("display du lieu", data);
      if (res && res.status === 200) {
        Swal.fire("Đặt Hàng Thành Công", "", "success");
        handleRemoveCart();
        update(productCheckOut.orderId);
      }
    } else {
      const data = product;
      console.log("data", data);
      const path = "Order/Checkout";
      const res = await createDataByPath(path, "", data);
      console.log("Check res", res);
      console.log("display du lieu", data);
      if (res && res.status === 200) {
        Swal.fire("Đặt Hàng Thành Công", "", "success");
        handleRemoveCart();
        update1(product.orderId);
      }
    }
  }
  const [city, setCity] = useState([]);
  const [ward, setWard] = useState([]);
  const [districs, setDistrics] = useState([]);
  async function loadDataCity() {
    const path = `Address/City/${product.reveicerInformation.cityId}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setCity(res.data);
    }
  }
  async function loadDataDistrics() {
    const path = `Address/District/${product.reveicerInformation.districtId}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setDistrics(res.data);
    }
  }
  async function loadDataWard() {
    const path = `Address/ward/${product.reveicerInformation.wardId}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setWard(res.data);
    }
  }
  useEffect(() => {
    loadDataCity();
    loadDataDistrics()
    loadDataWard()
  }, []);

  useEffect(() => {
    if (vnp_PayDate != null && vnp_TransactionNo !== null) {
      console.log("Chạy")
      Checkout();
    }
  })
  const [site, setSite] = useState(null);
  async function loadDataSite() {
    if (localStorage && localStorage.getItem("accessTokenUser")) {
      const accessToken = localStorage.getItem("accessTokenUser");
      const path = `Site?pageIndex=1&pageItems=10`;
      console.log("display2", getDataByPath);
      const res = await getDataByPath(path, accessToken, "");
      console.log("display31321", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setSite(res.data.items);
      }
    }
  }
  useEffect(() => {
    loadDataSite();
  }, []);
  const sites = site?.find((sc) => sc.id === product.siteId);
  const fullyAddressSite = sites ? sites.fullyAddress : "";
  const siteName = sites ? sites.siteName : "";
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
      <div>
        <div className="loading">
          <div className="pill"></div>
          <div className="loading-text">Hệ thống đang xử lý thanh toán, vui lòng chờ trong giây lát...</div>
        </div>
      </div>
    </>
  );
};
export default VNPay;
