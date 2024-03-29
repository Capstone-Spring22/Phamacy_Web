import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarPharmacist";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { getDataByPath, updateDataByPath } from "../../services/data.service";

import axios from "axios";
const OrderDetail = () => {
  const myId = localStorage.getItem("orderIdPharmacist");
  const [OrderDetail, setOrderDetail] = useState([]);
  const [ProductDetail, setProductDetail] = useState([]);
  const [orderContactInfo, setOrderContactInfo] = useState([]);
  const [orderDelivery, setOrderDelivery] = useState([]);
  const [actionStatus, setActionStatus] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [orderStatus, setOrderStatus] = useState([]);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState([]);
  const [moneyReceived, setMoneyReceived] = useState(0);
  const [error, setError] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [noteId, setNoteId] = useState("");
  const [description, setDescription] = useState("");
  const [site, setSite] = useState(null);
  const [noteUpdate, setNodeUpdate] = useState([
    { orderDetailId: "", note: "" },
  ]);
  const [descriptionStatus, setDescriptionStatus] = useState("");
  async function loadDataOrderById() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Order/${myId}`;
      const res = await getDataByPath(path, accessToken, "");
      if (res !== null && res !== undefined && res.status === 200) {
        console.log("cc", res.data);
        setOrderDetail(res.data);
        setProductDetail(res.data.orderProducts);
        setOrderContactInfo(res.data.orderContactInfo);
        setOrderDelivery(res.data.orderDelivery);
        setActionStatus(res.data.actionStatus);
      }
    }
  }
  const checkValidation = () => {
    if (reason.trim().length < 10) {
      Swal.fire("Lý do huỷ phải có ít nhất 10 kí tự", "", "question");
      return false;
    }
    return true;
  };
  async function loadDataSite() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
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
  const sites = site?.find((sc) => sc.id === OrderDetail.siteId);
  const fullyAddressSite = sites ? sites.fullyAddress : "";
  const siteName = sites ? sites.siteName : "";
  async function updateNote() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const data = noteUpdate;
      const path = `Order/UpdateOrderProductNote`;
      const res = await updateDataByPath(path, accessToken, data);
      console.log("data", data);
      if (res !== null && res !== undefined && res.status === 200) {
        setIsOpen(false);
        loadDataOrderById();
        setNodeUpdate([
          {
            orderDetailId: "",
            note: "",
          },
        ]);
        Swal.fire("Thêm Ghi Chú Thành Công", "", "success");
      }
    }
  }
  const handleNoteID = (id) => {
    console.log("display", id);
    const productInorder = ProductDetail?.find((product) => product.id === id);
    console.log("display", productInorder);
    setNodeUpdate((prevNote) => [
      {
        orderDetailId: productInorder.id,
        note: productInorder.productNoteFromPharmacist,
      },
    ]);

    setIsOpen(true);
  };
  const [activeItem, setActiveItem] = useState("Order");

  async function loadOrderStatusId() {
    console.log("OrderDetail", OrderDetail.orderTypeId);
    const path = `OrderStatus?OrderTypeId=${OrderDetail.orderTypeId}`;

    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setOrderStatus(res.data);
    }
  }
  useEffect(() => {
    loadOrderStatusId();
  }, [OrderDetail]);
  useEffect(() => {
    loadDataOrderById();
  }, []);
  async function confirmOrder() {
    const confirmed = await Swal.fire({
      title: "Bạn có chắc chắn muốn tiếp nhận đơn hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
      footer:
        "Lưu ý: Tiếp nhận đơn hàng đồng nghĩa với việc bạn chịu trách nhiệm cho việc thi triển đơn hàng này!",
    });

    if (!confirmed.isConfirmed) {
      return;
    }

    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const deviceId = await axios
        .get("https://api.ipify.org/?format=json")
        .then((res) => res.data.ip);
      const data = {
        orderId: OrderDetail.id,
        isAccept: true,
        description: description,
        ipAddress: deviceId,
      };
      const path = `Order/ValidateOrder`;

      const res = await updateDataByPath(path, accessToken, data);
      console.log("res", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setIsOpen(false);
        Swal.fire("Xác Nhận Thành Công", "", "success");
        loadDataOrderById();
      }
    }
  }

  async function updateStatusOrder() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");

      const data = {
        orderId: OrderDetail.id,
        orderStatusId: OrderDetail.orderStatus,
        description: descriptionStatus,
      };
      const path = `Order/ExecuteOrder`;
      console.log("res", data);
      const res = await updateDataByPath(path, accessToken, data);
      console.log("res", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setIsOpen2(false);
        Swal.fire("Cập Nhật Trạng Thái Thành Công", "", "success");
        loadDataOrderById();
      }
    }
  }
  async function updateStatusOrderDeli() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");

      const data = {
        orderId: OrderDetail.id,
        orderStatusId: 7,
        description: descriptionStatus,
      };
      const path = `Order/ExecuteOrder`;
      console.log("res", data);
      const res = await updateDataByPath(path, accessToken, data);
      console.log("res", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setIsOpen2(false);
        Swal.fire("Cập Nhật Trạng Thái Thành Công", "", "success");
        loadDataOrderById();
      }
    }
  }
  async function updateStatusOrderComplete() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");

      const data = {
        orderId: OrderDetail.id,
        orderStatusId: 4,
        description: "Đơn Hàng Đã Hoàn Thành",
      };
      const path = `Order/ExecuteOrder`;
      console.log("res", data);
      const res = await updateDataByPath(path, accessToken, data);
      console.log("res", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setIsOpen5(false);
        Swal.fire("Cập Nhật Trạng Thái Thành Công", "", "success");
        loadDataOrderById();
      }
    }
  }
  async function updateStatusOrderGo() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");

      const data = {
        orderId: OrderDetail.id,
        orderStatusId: 9,
        description: descriptionStatus,
      };
      const path = `Order/ExecuteOrder`;
      console.log("res", data);
      const res = await updateDataByPath(path, accessToken, data);
      console.log("res", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setIsOpen2(false);
        Swal.fire("Cập Nhật Trạng Thái Thành Công", "", "success");
        loadDataOrderById();
      }
    }
  }
  const handleMoneyReceivedChange = (event) => {
    const value = event.target.value;
    const money = parseFloat(value);
    setMoneyReceived(isNaN(money) ? 0 : money);
    setErrorMessage("");
  };

  const handleMoneyReceivedBlur = () => {
    if (moneyReceived < OrderDetail?.totalPrice) {
      setErrorMessage("Số tiền nhận phải lớn hơn hoặc bằng số tiền đơn hàng");
    }
  };
  async function rejectOrder() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const deviceId = await axios
        .get("https://api.ipify.org/?format=json")
        .then((res) => res.data.ip);
      const data = {
        orderId: OrderDetail.id,
        isAccept: false,
        description: description,
        ipAddress: deviceId,
      };
      console.log("data", data);
      const path = `Order/ValidateOrder`;
      const res = await updateDataByPath(path, accessToken, data);
      console.log("res", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setIsOpen(false);
        Swal.fire("Đã Từ Chối Đơn Hàng", "", "success");
        loadDataOrderById();
      } else if (res.status === 400) {
        Swal.fire(res.data)
      }
    }
  }
  async function cancelOrder() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (checkValidation()) {
        const deviceId = await axios
          .get("https://api.ipify.org/?format=json")
          .then((res) => res.data.ip);
        const data = {
          orderId: OrderDetail.id,
          reason: reason,
          ipAddress: deviceId,
        };
        console.log("data", data);
        const path = `Order/CancelOrder`;
        const res = await updateDataByPath(path, accessToken, data);
        console.log("res1212", res);
        if (res !== null && res !== undefined && res.status === 200) {
          setIsOpen4(false);
          Swal.fire("Huỷ Thành Công", "", "success");
          loadDataOrderById();
        } else {
          Swal.fire(`${res?.errors?.Reason[0]}`, "", "error");
        }
      }
    }
  }
  async function handleCancelOrder() {
    const confirmed = await Swal.fire({
      title: "Bạn có chắc chắn muốn hủy đơn hàng?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
      footer:
        "Lưu ý: Việc hủy đơn chỉ nên thực hiện khi bạn gặp trở ngại giao hàng cho khách hàng!",
    });

    if (confirmed.isConfirmed) {
      cancelOrder();
    }
  }
  const date = new Date(OrderDetail.createdDate);

  const createDateVN = date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let OrderStatus;
  if (OrderDetail.pharmacistId === null) {
    OrderStatus = (
      <>
        <div className="mb-3" style={{ width: "95%" }}>
          <div className="input-group input-group-merge">
            <div
              type="text"
              id="basic-icon-default-fullname"
              placeholder="Tên Sản Phẩm"
              aria-label="Tên Sản Phẩm"
              aria-describedby="basic-icon-default-fullname2"
            >
              Vui lòng kiểm tra thông tin và xác nhận đơn hàng cho khách hàng
            </div>
          </div>

          <a
            href="#my-dialog"
            onClick={() => {
              setIsOpen(true);
            }}
            className="button-28"
            style={{
              height: 40,
              width: 250,
              fontSize: 13,
              paddingTop: 10,

              marginTop: "20px",
              marginBottom: -20,
              backgroundColor: "#82AAE3",
              color: "white",
            }}
          >
            Xác Nhận Đơn Hàng
          </a>
        </div>
      </>
    );
  } else if (
    OrderDetail.pharmacistId === localStorage.getItem("userID") &&
    OrderDetail.orderStatusName !== "Đơn hàng đã hủy" &&
    OrderDetail.orderStatusName !== "Bán hàng thành công" &&
    OrderDetail.orderStatusName !== "Đã chuẩn bị hàng xong" &&
    OrderDetail.orderStatusName !== "Khách hàng nhận hàng thành công"
  ) {
    OrderStatus = (
      <>
        <div className="mb-3" style={{ width: "95%" }}>
          <div className="input-group input-group-merge">
            <div
              type="text"
              id="basic-icon-default-fullname"
              placeholder="Tên Sản Phẩm"
              aria-label="Tên Sản Phẩm"
              aria-describedby="basic-icon-default-fullname2"
            >
              Cập nhật trạng thái đơn hàng
            </div>
          </div>

          <a
            href="#my-dialog2"
            onClick={() => {
              setIsOpen2(true);
            }}
            className="button-28"
            style={{
              height: 40,
              width: 250,
              fontSize: 13,
              paddingTop: 10,

              marginTop: "20px",
              marginBottom: -20,
              backgroundColor: "#82AAE3",
              color: "white",
            }}
          >
            Cập nhật trạng thái
          </a>
          <a
            href="#my-dialog4"
            onClick={() => {
              setIsOpen4(true);
            }}
            className="button-28"
            style={{
              height: 40,
              width: 250,
              fontSize: 13,
              paddingTop: 10,

              marginTop: "20px",
              marginBottom: -20,
              backgroundColor: "#E74646",
              color: "white",
            }}
          >
            Huỷ đơn hàng
          </a>
        </div>
      </>
    );
  } else if (
    OrderDetail.pharmacistId === localStorage.getItem("userID") &&
    OrderDetail.orderStatusName === "Đơn hàng đã hủy"
  ) {
    OrderStatus = (
      <>
        <div className="mb-3" style={{ width: "95%" }}>
          <div className="input-group input-group-merge">
            <div
              type="text"
              id="basic-icon-default-fullname"
              placeholder="Tên Sản Phẩm"
              aria-label="Tên Sản Phẩm"
              aria-describedby="basic-icon-default-fullname2"
            >
              Tình trạng đơn hàng
            </div>
          </div>

          <div
            style={{
              height: 40,
              width: 250,
              fontSize: 13,
              paddingTop: 10,
              border: "none",
              marginTop: "20px",
              marginBottom: -20,
              color: "red",
            }}
          >
            Đơn hàng đã bị huỷ
          </div>
        </div>
      </>
    );
  } else if (
    OrderDetail.pharmacistId === localStorage.getItem("userID") &&
    (OrderDetail.orderStatusName === "Bán hàng thành công" ||
      OrderDetail.orderStatusName === "Khách hàng nhận hàng thành công")
  ) {
    OrderStatus = (
      <>
        <div className="mb-3" style={{ width: "95%" }}>
          <div className="input-group input-group-merge">
            <div
              type="text"
              id="basic-icon-default-fullname"
              placeholder="Tên Sản Phẩm"
              aria-label="Tên Sản Phẩm"
              aria-describedby="basic-icon-default-fullname2"
            >
              Đơn hàng đã hoàn thành
            </div>
          </div>

          <div
            style={{
              height: 40,
              width: 250,
              fontSize: 13,
              paddingTop: 10,
              border: "none",
              marginTop: "20px",
              marginBottom: -20,
              color: "red",
            }}
          >
            Đơn Hàng Đã Giao Cho Khách Và Thanh Toán Thành Công
          </div>
        </div>
      </>
    );
  } else if (
    OrderDetail.pharmacistId === localStorage.getItem("userID") &&
    OrderDetail.orderStatusName === "Đã chuẩn bị hàng xong" &&
    OrderDetail.orderTypeId === 2
  ) {
    OrderStatus = (
      <>
        <div className="mb-3" style={{ width: "95%" }}>
          <div className="input-group input-group-merge">
            <div
              type="text"
              id="basic-icon-default-fullname"
              placeholder="Tên Sản Phẩm"
              aria-label="Tên Sản Phẩm"
              aria-describedby="basic-icon-default-fullname2"
            >
              Hoàn thành đơn cho khách hàng
            </div>
          </div>

          <a
            href="#my-dialog5"
            onClick={() => {
              setIsOpen5(true);
            }}
            className="button-28"
            style={{
              height: 40,
              width: 250,
              fontSize: 13,
              paddingTop: 10,

              marginTop: "20px",
              marginBottom: -20,
              backgroundColor: "#82AAE3",
              color: "white",
            }}
          >
            Hoàn Thành Đơn Hàng
          </a>
          <a
            href="#my-dialog4"
            onClick={() => {
              setIsOpen4(true);
            }}
            className="button-28"
            style={{
              height: 40,
              width: 250,
              fontSize: 13,
              paddingTop: 10,

              marginTop: "20px",
              marginBottom: -20,
              backgroundColor: "#E74646",
              color: "white",
            }}
          >
            Huỷ đơn hàng
          </a>
        </div>
      </>
    );
  } else if (OrderDetail.pharmacistId !== localStorage.getItem("userID")) {
    OrderStatus = (
      <>
        <div className="mb-3" style={{ width: "95%" }}>
          <div className="input-group input-group-merge">
            <div
              type="text"
              id="basic-icon-default-fullname"
              placeholder="Tên Sản Phẩm"
              aria-label="Tên Sản Phẩm"
              aria-describedby="basic-icon-default-fullname2"
            >
              Tình trạng
            </div>
          </div>

          <a
            href="#my-dialog3"
            className="button-28"
            style={{
              height: 40,
              width: 250,
              fontSize: 13,
              paddingTop: 10,

              marginTop: "20px",
              marginBottom: -20,
              backgroundColor: "#82AAE3",
              color: "white",
            }}
          >
            Đơn hàng đang được nhân viên khác thi triển
          </a>
        </div>
      </>
    );
  }
  const [checkedIds, setCheckedIds] = useState([]);

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setCheckedIds([...checkedIds, id]);
    } else {
      setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
    }
  };

  const allChecked = ProductDetail.every((e) => checkedIds.includes(e.id));
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar activeItem={activeItem} />

        <div className="layout-page" style={{ backgroundColor: "#f4f6fb" }}>
          {/* Navbar */}
          <div
            className={`dialog overlay ${isOpen5 ? "" : "hidden"}`}
            id="my-dialog5"
          >
            <a href="#" className="overlay-close" />

            <div className="row " style={{ width: 700 }}>
              <div className="col-xl">
                <div className="card mb-4">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{
                      height: 70,
                      backgroundColor: "white",

                      marginLeft: 230,
                      borderColor: "#f4f4f4",
                    }}
                  >
                    <h5 className="mb-0">Hoàn Thành Đơn Hàng</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div
                        style={{
                          display: "grid",

                          padding: 30,
                        }}
                      >
                        <div
                          className="mb-3"
                          style={{ width: "95%", display: "flex" }}
                        >
                          <label
                            style={{
                              paddingTop: 2,
                              width: 400,
                              fontSize: 15,
                            }}
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Tên Khách Hàng :
                          </label>
                          <div className="input-group input-group-merge">
                            <div>{OrderDetail?.orderContactInfo?.fullname}</div>
                          </div>
                        </div>
                        <div
                          className="mb-3"
                          style={{ width: "95%", display: "flex" }}
                        >
                          <label
                            style={{
                              paddingTop: 2,
                              width: 400,
                              fontSize: 15,
                            }}
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Số Điện Thoại Khách Hàng :
                          </label>
                          <div className="input-group input-group-merge">
                            <div>
                              {OrderDetail?.orderContactInfo?.phoneNumber}
                            </div>
                          </div>
                        </div>
                        <div
                          className="mb-3"
                          style={{ width: "95%", display: "flex" }}
                        >
                          <label
                            style={{
                              paddingTop: 2,
                              width: 400,
                              fontSize: 15,
                            }}
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Email Khách Hàng :
                          </label>
                          <div className="input-group input-group-merge">
                            <div>{OrderDetail?.orderContactInfo?.email}</div>
                          </div>
                        </div>
                        <div
                          className="mb-3"
                          style={{ width: "95%", display: "flex" }}
                        >
                          <label
                            style={{
                              paddingTop: 2,
                              width: 400,
                              fontSize: 15,
                            }}
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Phương thức thanh toán :
                          </label>
                          <div className="input-group input-group-merge">
                            <div>{OrderDetail?.paymentMethod}</div>
                          </div>
                        </div>
                        <div
                          className="mb-3"
                          style={{ width: "95%", display: "flex" }}
                        >
                          <label
                            style={{
                              paddingTop: 2,
                              width: 400,
                              fontSize: 15,
                            }}
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Số tiền cần thanh toán :
                          </label>
                          <div className="input-group input-group-merge">
                            <div>
                              {OrderDetail?.paymentMethodId === 1 ? (
                                <>
                                  {OrderDetail?.totalPrice.toLocaleString(
                                    "en-US"
                                  )}{" "}
                                  đ
                                </>
                              ) : (
                                "0 đ (Khách hàng đã thanh toán trước)"
                              )}
                            </div>
                          </div>
                        </div>
                        {OrderDetail?.paymentMethodId === 1 ?
                          (
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: 500,
                                padding: 1,
                                height: 100,
                                marginTop: 70,
                              }}
                            >
                              <div
                                className="mb-3"
                                style={{
                                  width: "45%",
                                  height: 10,
                                  marginRight: 30,
                                }}
                              >
                                <label
                                  className="form-label"
                                  htmlFor="basic-icon-default-fullname"
                                >
                                  Số Tiền Nhận
                            </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="basic-icon-default-fullname"
                                    placeholder="Số Tiền Nhận"
                                    aria-label="Tên Sản Phẩm"
                                    aria-describedby="basic-icon-default-fullname2"
                                    value={moneyReceived}
                                    onChange={handleMoneyReceivedChange}
                                    onBlur={handleMoneyReceivedBlur}
                                  />
                                </div>
                              </div>
                              <div
                                className="mb-3"
                                style={{ width: "45%", height: 10 }}
                              >
                                <label
                                  className="form-label"
                                  htmlFor="basic-icon-default-fullname"
                                >
                                  Tiền Thối Cho Khách Hàng
                            </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    type="text"
                                    disabled
                                    className="form-control"
                                    id="basic-icon-default-fullname"
                                    placeholder="Tiền Thối "
                                    aria-label="Tên Sản Phẩm"
                                    aria-describedby="basic-icon-default-fullname2"
                                    value={Math.max(
                                      moneyReceived - OrderDetail.totalPrice,
                                      0
                                    ).toLocaleString("en-US")}
                                  />
                                </div>
                                {/* {errorMessage && (
                              <div style={{ color: "red" }}>{errorMessage}</div>
                            )} */}
                              </div>
                            </div>
                          ) : (<div></div>)
                        }
                        <div
                          className="mb-3"
                          style={{ width: "95%", display: "flex" }}
                        >
                          <span style={{ fontSize: 17 }}>Hãy nhắc nhở khách hàng đã nhận đủ hàng trước khi ra về nhé! Vui lòng xác nhận hoàn thành đơn hàng cho khách khi đã nhận đủ hàng.</span>
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        {(OrderDetail.paymentMethod !== "Thanh toán VN Pay" && moneyReceived < OrderDetail.totalPrice) ? (
                          <>
                            {" "}
                            <button
                              type="submit"
                              className="button-28"

                              style={{
                                height: 50,
                                width: 700,
                                fontSize: 13,

                                backgroundColor: "grey",
                                color: "white",
                              }}
                            >
                              Xác Nhận Hoàn Thành Đơn Hàng
                            </button>
                          </>
                        ) : (
                          <>
                            {" "}
                            <button
                              type="submit"
                              className="button-28"
                              onClick={(e) => {
                                e.preventDefault();
                                updateStatusOrderComplete();
                              }}
                              style={{
                                height: 50,
                                width: 700,
                                fontSize: 13,

                                backgroundColor: "#82AAE3",
                                color: "white",
                              }}
                            >
                              Xác Nhận Hoàn Thành Đơn Hàng
                            </button>
                          </>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`dialog overlay ${isOpen2 ? "" : "hidden"}`}
            id="my-dialog2"
          >
            <a href="#" className="overlay-close" />
            {OrderDetail.orderStatusName === "Đang chuẩn bị hàng" &&
              OrderDetail.orderTypeId === 3 ? (
              <div className="row " style={{ width: 900 }}>
                <div className="col-xl">
                  <div style={{overflow: "scroll"}} className="card mb-4">
                    <div
                      className="card-header d-flex justify-content-between align-items-center"
                      style={{
                        height: 70,
                        backgroundColor: "white",
                        margin: "0 auto",
                        borderColor: "#f4f4f4",
                      }}
                    >
                      <h5 className="mb-0">Chuẩn Bị Đơn Hàng</h5>
                    </div>
                    <div className="card-body">
                      <form>
                        <div
                          style={{
                            display: "grid",

                            padding: 30,
                          }}
                        >
                          <div
                            className="input-group input-group-merge"
                            style={{ width: "95%" }}
                          >
                          </div>
                          <div style={{height: 300, overflow: "scroll"}}>
                            {
                              <div>
                                <span style={{ color: "red", fontSize: 16 }}>Đây là danh sách các sản phẩm bạn cần chuẩn bị cho đơn hàng này. Đánh dấu vào bên cạnh sản phẩm cho mỗi sản phẩm bạn đã chuẩn bị xong.</span>
                              </div>
                            }
                            {ProductDetail &&
                              ProductDetail.length &&
                              ProductDetail.map((e) => {
                                return (
                                  <div
                                    key={e.id}
                                    className="product-cart-p"
                                    style={{ width: 700 }}
                                  >
                                    <img
                                      src={e.imageUrl}
                                      style={{
                                        height: 70,
                                        width: 60,
                                        borderRadius: 7,
                                        objectFit: "cover",
                                      }}
                                    />
                                    <div className="name-product-pharmacist">
                                      <div>Tên Sản Phẩm</div>
                                      <div> {e.productName}</div>
                                    </div>

                                    <div style={{ width: 380 }}>
                                      <div>Số Lượng</div>
                                      <div>
                                        {e.quantity} {e.unitName}
                                      </div>
                                    </div>
                                    <div style={{ width: 380, display: "flex" }}>
                                      <div>Đã chuẩn bị xong</div>
                                      <input
                                        style={{ margin: "0 0 43px 15px" }}
                                        type="checkbox"
                                        onChange={(event) =>
                                          handleCheckboxChange(event, e.id)
                                        }
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                          <div className="mb-3" style={{ width: "95%" }}>
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-phone"
                            >
                              Ghi chú
                            </label>
                            <div className="input-group input-group-merge">
                              <textarea
                                style={{ height: 100 }}
                                type="text"
                                className="form-control"
                                id="basic-icon-default-fullname"
                                placeholder="Ghi chú thêm của nhân viên "
                                aria-label="John Doe"
                                aria-describedby="basic-icon-default-fullname2"
                                onChange={(e) =>
                                  setDescriptionStatus(e.target.value)
                                }
                              />
                              <span style={{ color: "red", fontSize: 15, marginTop: 10 }}>Khi đã chuẩn bị hàng xong, vui lòng bấm nút xác nhận và gọi điện đến khách hàng thông báo cho việc triển khai giao hàng nhé!</span>
                              <span style={{ color: "red", fontSize: 15, marginTop: 10 }}>Lưu ý: Sau khi đã chuẩn bị hàng xong, vui lòng chuyển sang điện thoại để thực hiện việc giao hàng cho khách hàng</span>
                            </div>
                          </div>
                        </div>
                        {allChecked && (
                          <div style={{ display: "flex" }}>
                            <button
                              type="submit"
                              className="button-28"
                              onClick={(e) => {
                                e.preventDefault();
                                updateStatusOrderDeli();
                              }}
                              style={{
                                margin: "0 auto",
                                width: "auto",
                                padding: "10px",
                                fontSize: 13,
                                backgroundColor: "#82AAE3",
                                color: "white",
                              }}
                            >
                              Hoàn Tất Chuẩn Bị Hàng
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : OrderDetail.orderStatusName === "Đang giao hàng" ? (
              <div className="row " style={{ width: 900 }}>
                <div className="col-xl">
                  <div className="card mb-4">
                    <div
                      className="card-header d-flex justify-content-between align-items-center"
                      style={{
                        height: 70,
                        backgroundColor: "white",
                        margin: "0 auto",
                        borderColor: "#f4f4f4",
                      }}
                    >
                      <h5 className="mb-0">Cập Nhật Trạng Thái</h5>
                    </div>
                    <div className="card-body">
                      <form>
                        <div
                          style={{
                            display: "grid",

                            padding: 30,
                          }}
                        >
                          <div
                            className="input-group input-group-merge"
                            style={{ width: "95%" }}
                          >
                            <div style={{margin: "0 auto", fontWeight: "bold"}}>Vui Lòng Chuyển Qua Điện Thoại Để Tiếp Tục Giao Hàng</div>
                            <img src="https://jobsgo.vn/blog/wp-content/uploads/2019/09/nhan-vien-giao-hang.png" />
                          </div>
                          <button
                              type="submit"
                              className="button-28"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsOpen2(false)
                              }}
                              style={{
                                margin: "0 auto",
                                width: "auto",
                                padding: "10px",
                                fontSize: 13,
                                backgroundColor: "#82AAE3",
                                color: "white",
                              }}
                            >
                              Quay Trở Về
                            </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : OrderDetail.orderStatusName === "Đang chuẩn bị hàng" &&
              OrderDetail.orderTypeId === 2 ? (
              <div className="row " style={{ width: 900 }}>
                <div className="col-xl">
                  <div className="card mb-4">
                    <div
                      className="card-header d-flex justify-content-between align-items-center"
                      style={{
                        height: 70,
                        backgroundColor: "white",
                        borderColor: "#f4f4f4",
                        margin: "0 auto"
                      }}
                    >
                      <h5 style={{ textAlign: "center" }} className="mb-0">Chuẩn Bị Đơn Hàng</h5>
                    </div>
                    <div className="card-body">
                      <form>
                        <div
                          style={{
                            display: "grid",

                            padding: 30,
                          }}
                        >
                          <div
                            className="input-group input-group-merge"
                            style={{ width: "95%" }}
                          >

                          </div>
                          <div style={{height: 300, overflow: "scroll"}}>
                            {
                              <span style={{ color: "red", fontSize: 16 }}>Đây là danh sách các sản phẩm bạn cần chuẩn bị cho đơn hàng này. Đánh dấu vào bên cạnh sản phẩm cho mỗi sản phẩm bạn đã chuẩn bị xong.</span>
                            }
                            {ProductDetail &&
                              ProductDetail.length &&
                              ProductDetail.map((e) => {
                                return (
                                  <div
                                    key={e.id}
                                    className="product-cart-p"
                                    style={{ width: 700 }}
                                  >
                                    <img
                                      src={e.imageUrl}
                                      style={{
                                        height: 70,
                                        width: 60,
                                        borderRadius: 7,
                                        objectFit: "cover",
                                      }}
                                    />
                                    <div className="name-product-pharmacist">
                                      <div>Tên Sản Phẩm</div>
                                      <div> {e.productName}</div>
                                    </div>

                                    <div style={{ width: 380 }}>
                                      <div>Số Lượng</div>
                                      <div>
                                        {e.quantity} {e.unitName}
                                      </div>
                                    </div>
                                    <div style={{ width: 380, display: "flex" }}>
                                      <div>Đã chuẩn bị xong</div>
                                      <input
                                        style={{ margin: "0 0 43px 15px" }}
                                        type="checkbox"
                                        onChange={(event) =>
                                          handleCheckboxChange(event, e.id)
                                        }
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                          <div className="mb-3" style={{ width: "95%" }}>
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-phone"
                            >
                              Ghi chú
                            </label>
                            <div className="input-group input-group-merge">
                              <textarea
                                style={{ height: 100, resize: "none", overflow: "hidden" }}
                                type="text"
                                className="form-control"
                                id="basic-icon-default-fullname"
                                placeholder="Ghi chú thêm của nhân viên "
                                aria-label="John Doe"
                                aria-describedby="basic-icon-default-fullname2"
                                onChange={(e) =>
                                  setDescriptionStatus(e.target.value)
                                }
                              />
                              <span style={{ color: "red", fontSize: 15, marginTop: 10 }}>Khi đã chuẩn bị hàng xong, vui lòng bấm nút xác nhận và thông báo đến khách hàng đến nhận tại cửa hàng nhé!</span>
                            </div>
                          </div>
                        </div>
                        {allChecked && (
                          <div style={{ display: "flex" }}>
                            <button
                              type="submit"
                              className="btn btn-default"
                              onClick={(e) => {
                                e.preventDefault();
                                updateStatusOrderGo();
                              }}
                              style={{
                                fontSize: 15,
                                margin: "0 auto",
                                backgroundColor: "#82AAE3",
                                color: "white",
                                padding: "10px 20px"
                              }}
                            >
                              Hoàn Tất Chuẩn Bị Hàng
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : OrderDetail.orderStatusName === "Đã chuẩn bị hàng xong" &&
              OrderDetail.orderTypeId === 2 ? (
              <div></div>
            ) : (
              <div></div>
            )}
          </div>
          <div
            className={`dialog overlay ${isOpen ? "" : "hidden"}`}
            id="my-dialog"
          >
            <a href="#" className="overlay-close" />

            <div className="row " style={{ width: 700 }}>
              <div className="col-xl">
                <div style={{ overflow: "scroll" }} className="card mb-4">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{
                      height: 70,
                      backgroundColor: "white",

                      marginLeft: 230,
                      borderColor: "#f4f4f4",
                    }}
                  >
                    <h5 className="mb-0">Xác Thực Đơn Hàng</h5>
                  </div>
                  <div className="card-body">
                    <div style={{ margin: "10px 10px 0 40px" }}>
                      <div style={{ margin: "0 0 10px 0" }}>
                        <span style={{ color: "red" }}>Nhân viên lưu ý vui lòng kiểm tra kĩ thông tin khách hàng trước khi thực hiện việc xác thực đơn hàng nhé!</span>
                      </div>
                      <div
                        className="mb-3"
                        style={{ width: "95%", display: "flex" }}
                      >
                        <label
                          style={{
                            paddingTop: 2,
                            width: 400,
                            fontSize: 15,
                          }}
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Tên Khách Hàng :
                          </label>
                        <div className="input-group input-group-merge">
                          <div>{OrderDetail?.orderContactInfo?.fullname}</div>
                        </div>
                      </div>
                      <div
                        className="mb-3"
                        style={{ width: "95%", display: "flex", marginBottom: "-10px!important" }}
                      >
                        <label
                          style={{
                            paddingTop: 2,
                            width: 400,
                            fontSize: 15,
                          }}
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Số Điện Thoại Khách Hàng :
                          </label>
                        <div className="input-group input-group-merge">
                          <div>
                            {OrderDetail?.orderContactInfo?.phoneNumber} <br />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3"
                        style={{ width: "95%", display: "flex" }}
                      >
                        <span style={{ color: "red" }}>Gọi điện khách hàng để xác nhận thông tin đơn hàng khách đã đặt.</span>
                      </div>
                      <div
                        className="mb-3"
                        style={{ width: "95%", display: "flex" }}
                      >
                        <label
                          style={{
                            paddingTop: 2,
                            width: 400,
                            fontSize: 15,
                          }}
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Email Khách Hàng :
                          </label>
                        <div className="input-group input-group-merge">
                          <div>{OrderDetail?.orderContactInfo?.email}</div>
                        </div>
                      </div>
                      <div
                        className="mb-3"
                        style={{ width: "95%", display: "flex" }}
                      >
                        <label
                          style={{
                            paddingTop: 2,
                            width: 400,
                            fontSize: 15,
                          }}
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Phương thức thanh toán :
                          </label>
                        <div className="input-group input-group-merge">
                          <div>{OrderDetail?.paymentMethod}</div>
                        </div>
                      </div>
                      <div
                        className="mb-3"
                        style={{ width: "95%", display: "flex" }}
                      >
                        <label
                          style={{
                            paddingTop: 2,
                            width: 400,
                            fontSize: 15,
                          }}
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Số tiền cần thanh toán :
                          </label>
                        <div className="input-group input-group-merge">
                          <div>
                            {OrderDetail?.paymentMethodId === 1 ? (
                              <>
                                {OrderDetail?.totalPrice.toLocaleString(
                                  "en-US"
                                )}{" "}
                                  đ
                                </>
                            ) : (
                              "0 đ (Khách hàng đã thanh toán trước)"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <form style={{ marginTop: -40 }}>
                      <div
                        style={{
                          display: "grid",

                          padding: 30,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Ghi chú / Lý do của nhân viên
                          </label>
                          <div className="input-group input-group-merge">
                            <textarea
                              style={{ height: 120, resize: "none" }}
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Ghi chú hoặc lý do nếu nhân viên thực hiện từ chối đơn hàng "
                              aria-label="John Doe"
                              aria-describedby="basic-icon-default-fullname2"
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      {OrderDetail?.actionStatus?.canAccept ? (
                        <div style={{ display: "flex" }}>
                          <button
                            type="submit"
                            className="button-28"
                            onClick={(e) => {
                              e.preventDefault();
                              rejectOrder();
                            }}
                            style={{
                              padding: "10px",
                              width: "auto",
                              fontSize: 13,
                              paddingTop: 1,
                              marginLeft: "29%",
                              backgroundColor: "#DF2E38",
                              color: "white",
                            }}
                          >
                            Từ Chối Đơn Hàng
                          </button>
                          <button
                            type="submit"
                            className="button-28"
                            onClick={(e) => {
                              e.preventDefault();
                              confirmOrder();
                            }}
                            style={{
                              fontSize: 13,
                              marginLeft: 23,
                              padding: "10px",
                              width: "auto",
                              backgroundColor: "#82AAE3",
                              color: "white",
                            }}
                          >
                            Xác Nhận Đơn
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div style={{ margin: "-20px 0 20px 0" }}>
                            <span style={{ color: "red" }}>Chi nhánh của bạn do không đủ điều kiện để tiếp nhận đơn hàng này nên đơn hàng của bạn không thể được xác nhận. Tham khảo lý do ở mục trạng thái hành động.</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <button
                              type="submit"
                              className="button-28"
                              onClick={(e) => {
                                e.preventDefault();
                                rejectOrder();
                              }}
                              style={{
                                padding: "11px 10px 10px 10px",
                                width: "auto",
                                fontSize: 13,
                                paddingTop: 1,
                                marginLeft: "38%",
                                backgroundColor: "#DF2E38",
                                color: "white",
                              }}
                            >
                              Từ Chối Đơn Hàng
                          </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`dialog overlay ${isOpen4 ? "" : "hidden"}`}
            id="my-dialog4"
          >
            <a href="#" className="overlay-close" />

            <div className="row" style={{ width: 700 }}>
              <div className="col-xl">
                <div style={{ overflow: "scroll" }} className="card mb-4">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{
                      height: 70,
                      backgroundColor: "white",

                      marginLeft: 230,
                      borderColor: "#f4f4f4",
                    }}
                  >
                    <h5 className="mb-0">Huỷ Đơn Hàng</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div
                        style={{
                          display: "grid",

                          padding: 30,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Lý do huỷ
                          </label>
                          <div className="input-group input-group-merge">
                            <textarea
                              style={{ height: 100 }}
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Viết lý do hủy ( trên 10 kí tự )"
                              aria-label="John Doe"
                              aria-describedby="basic-icon-default-fullname2"
                              onChange={(e) => setReason(e.target.value)}
                            />
                          </div>
                          <div className="form-text">
                            {" "}
                            Lưu ý việc hủy đơn chỉ nên thực hiện khi bạn gặp trở
                            ngại giao hàng cho khách hàng
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <button
                          type="submit"
                          className="button-28"
                          onClick={(e) => {
                            e.preventDefault();
                            handleCancelOrder();
                          }}
                          style={{
                            height: 30,
                            width: 80,
                            fontSize: 13,
                            paddingTop: 1,
                            marginLeft: "40%",

                            backgroundColor: "#DF2E38",
                            color: "white",
                          }}
                        >
                          Huỷ
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`dialog overlay ${isOpen ? "" : "hidden"}`}
            id="my-dialog3"
          >
            <a href="#" className="overlay-close" />

            <div className="row " style={{ width: 700 }}>
              <div className="col-xl">
                <div className="card mb-4">
                  <div
                    className="card-header d-flex justify-content-between align-items-center"
                    style={{
                      height: 70,
                      backgroundColor: "white",

                      marginLeft: 230,
                      borderColor: "#f4f4f4",
                    }}
                  >
                    <h5 className="mb-0">Thêm Hướng Dẫn Sử Dụng</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div
                        style={{
                          display: "grid",

                          padding: 30,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Mô Tả
                          </label>
                          <div className="input-group input-group-merge">
                            { }
                            <textarea
                              style={{ height: 200 }}
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Viết Mô Tả "
                              aria-label="John Doe"
                              aria-describedby="basic-icon-default-fullname2"
                              value={noteUpdate[0].note}
                              onChange={(e) =>
                                setNodeUpdate((prevNote) => [
                                  {
                                    orderDetailId: prevNote[0].orderDetailId,
                                    note: e.target.value,
                                  },
                                ])
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <button
                          type="submit"
                          className="button-28"
                          onClick={(e) => {
                            e.preventDefault();
                            updateNote();
                          }}
                          style={{
                            height: 30,
                            width: 80,
                            fontSize: 13,
                            paddingTop: 1,
                            marginLeft: "40%",

                            backgroundColor: "#82AAE3",
                            color: "white",
                          }}
                        >
                          Lưu
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* / Navbar */}
          {/* Content wrapper */}
          <div style={{ display: "flex", marginLeft: 100 }}>
            <div>
              <div className="content-wrapper">
                {/* Content */}
                <div className="container-xxl flex-grow-1 container-p-y">
                  {/* Basic Bootstrap Table */}
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      width: 950,
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

                    <table className="table table-view-order">
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
                              width: 130,
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            &nbsp; &nbsp;Hình ảnh
                          </th>

                          <th
                            style={{
                              width: 400,
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
                            Đơn vị
                          </th>
                          <th
                            style={{
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            Giá
                          </th>
                          <th
                            style={{
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            Thêm Ghi Chú
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table-border-bottom-0">
                        {ProductDetail &&
                          ProductDetail.length &&
                          ProductDetail.map((e) => {
                            return (
                              <tr key={e.id}>
                                <td>
                                  &nbsp; &nbsp;
                                  <img
                                    src={e.imageUrl}
                                    style={{
                                      height: 90,
                                      width: 70,
                                      borderRadius: 7,
                                      objectFit: "cover",
                                    }}
                                  />
                                </td>
                                <td>{e.productName}</td>
                                <td>{e.quantity}</td>
                                <td>{e.unitName}</td>
                                <td>
                                  {e.priceTotal.toLocaleString("en-US")} đ
                                </td>
                                <td>
                                  {" "}
                                  <a
                                    class="button-81"
                                    role="button"
                                    href="#my-dialog3"
                                    onClick={() => {
                                      setIsOpen(true);
                                      handleNoteID(e.id);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      class="bi bi-pencil-square"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path
                                        fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                      />
                                    </svg>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                      <tbody>
                        <tr style={{ border: "1px solid white" }}>
                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            &nbsp; &nbsp;Tổng Giá
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>

                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            {OrderDetail.subTotalPrice?.toLocaleString("en-US")}{" "}
                            đ
                          </td>
                        </tr>
                        <tr style={{ border: "1px solid white" }}>
                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            &nbsp; &nbsp;Giá Giảm
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>

                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            {OrderDetail.discountPrice?.toLocaleString("en-US")}{" "}
                            đ
                          </td>
                        </tr>
                        {OrderDetail.orderTypeId === 3 ? (
                          <tr style={{ border: "1px solid white" }}>
                            <td style={{ fontSize: 15, fontWeight: 500 }}>
                              &nbsp; &nbsp;Phí Giao Hàng
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>

                            <td style={{ fontSize: 15, fontWeight: 500 }}>
                              {OrderDetail?.orderDelivery?.shippingFee?.toLocaleString(
                                "en-US"
                              )}{" "}
                              đ
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        <tr style={{ border: "1px solid white", width: 100 }}>
                          <td
                            style={{
                              fontSize: 15,
                              fontWeight: 500,
                              width: 100,
                            }}
                          >
                            &nbsp; &nbsp;Thành Tiền
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>

                          <td style={{ fontSize: 15, fontWeight: 500 }}>
                            {OrderDetail.totalPrice?.toLocaleString("en-US")} đ
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="content-backdrop fade" />
              </div>
              <div
                className="row "
                style={{ width: 980, marginTop: -30, marginLeft: 25 }}
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
                    <div className="card-body">
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
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-fullname"
                          >
                            Mã Đơn hàng
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.id}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "100%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-company"
                          >
                            Loại Đơn Hàng
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.orderTypeName}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Trạng thái Đơn Hàng
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.orderStatusName}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Trạng Thái Thanh Toán
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.isPaid === true ? (
                                <div>Đã Thanh Toán</div>
                              ) : (
                                <div>Chưa Thanh toán</div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Ngày Tạo Đơn Hàng
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {createDateVN}
                            </div>
                          </div>
                        </div>

                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Xác Nhận
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.needAcceptance === true ? (
                                <div>Cần Được Xác Nhận</div>
                              ) : (
                                <div>Đã Xác Nhận</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Ghi chú của khách hàng
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {(OrderDetail.note) ? (OrderDetail.note.length > 0 ? OrderDetail.note : "Trống") : "Trống" }
                            </div>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Trạng Thái Hành Động
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              style={{ width: 300 }}
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {actionStatus.statusMessage}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="row " style={{ width: 350, marginTop: 55 }}>
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
                        {OrderStatus}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row " style={{ width: 350 }}>
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
                      <h5 className="mb-0">Thông Tin Người Dùng</h5>
                    </div>
                    <div className="card-body">
                      <div
                        style={{
                          display: "grid",

                          padding: 20,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Tên Người mua
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {orderContactInfo.fullname}
                            </div>
                          </div>
                        </div>
                        {orderContactInfo.phoneNumber === "" ? (
                          <div></div>
                        ) : (
                          <div className="mb-3" style={{ width: "95%" }}>
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-phone"
                            >
                              Số điện Thoại Khách
                            </label>
                            <div className="input-group input-group-merge">
                              <div
                                type="text"
                                id="basic-icon-default-fullname"
                                placeholder="Tên Sản Phẩm"
                                aria-label="Tên Sản Phẩm"
                                aria-describedby="basic-icon-default-fullname2"
                              >
                                <tel>{orderContactInfo.phoneNumber}</tel>
                              </div>
                              {OrderDetail.orderTypeName === "Bán tại chỗ" || OrderDetail.pharmacistId !== null ? (
                                <div
                                  className="form-text"
                                  style={{ color: "red" }}
                                ></div>
                              ) : (
                                <div
                                  className="form-text"
                                  style={{ color: "red" }}
                                >
                                  Gọi khách hàng trước khi xác nhận đơn hàng
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        <div>
                          {OrderDetail.orderTypeName === "Bán tại chỗ" ? (
                            <div></div>
                          ) : (
                            <div>
                              <div className="mb-3" style={{ width: "95%" }}>
                                <label
                                  className="form-label"
                                  htmlFor="basic-icon-default-phone"
                                >
                                  Email Khách Hàng
                                </label>
                                <div className="input-group input-group-merge">
                                  <div
                                    type="text"
                                    style={{ flexWrap: "wrap", width: 220 }}
                                    id="basic-icon-default-fullname"
                                    placeholder="Tên Sản Phẩm"
                                    aria-label="Tên Sản Phẩm"
                                    aria-describedby="basic-icon-default-fullname2"
                                  >
                                    {orderContactInfo.email}
                                  </div>
                                </div>
                              </div>
                              <div className="mb-3" style={{ width: "95%" }}>
                                {OrderDetail.orderTypeName ===
                                  "Đến lấy tại cửa hàng" ? (
                                  <div>
                                    <div>
                                      {" "}
                                      <label
                                        className="form-label"
                                        htmlFor="basic-icon-default-phone"
                                      >
                                        Tên Cửa Hàng
                                      </label>
                                      <div className="input-group input-group-merge">
                                        <div
                                          type="text"
                                          id="basic-icon-default-fullname"
                                          placeholder="Tên Sản Phẩm"
                                          aria-label="Tên Sản Phẩm"
                                          aria-describedby="basic-icon-default-fullname2"
                                        >
                                          {siteName}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      {" "}
                                      <label
                                        className="form-label"
                                        htmlFor="basic-icon-default-phone"
                                      >
                                        Địa Chỉ Của Cửa Hàng
                                      </label>
                                      <div className="input-group input-group-merge">
                                        <div
                                          type="text"
                                          id="basic-icon-default-fullname"
                                          placeholder="Tên Sản Phẩm"
                                          aria-label="Tên Sản Phẩm"
                                          aria-describedby="basic-icon-default-fullname2"
                                        >
                                          {fullyAddressSite}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    {" "}
                                    <label
                                      className="form-label"
                                      htmlFor="basic-icon-default-phone"
                                    >
                                      Địa Chỉ Của Người Mua
                                    </label>
                                    <div className="input-group input-group-merge">
                                      <div
                                        type="text"
                                        id="basic-icon-default-fullname"
                                        placeholder="Tên Sản Phẩm"
                                        aria-label="Tên Sản Phẩm"
                                        aria-describedby="basic-icon-default-fullname2"
                                      >
                                        {orderDelivery?.fullyAddress}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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
export default OrderDetail;
