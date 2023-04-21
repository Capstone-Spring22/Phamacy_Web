import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarPharmacist";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { getDataByPath, updateDataByPath } from "../../services/data.service";

import axios from "axios";
const OrderDetail = () => {
  const myId = localStorage.getItem("id");
  const [OrderDetail, setOrderDetail] = useState([]);
  const [ProductDetail, setProductDetail] = useState([]);
  const [orderContactInfo, setOrderContactInfo] = useState([]);
  const [orderDelivery, setOrderDelivery] = useState([]);
  const [actionStatus, setActionStatus] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [orderStatus, setOrderStatus] = useState([]);
  const [note, setNote] = useState([]);
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
        console.log("cc", OrderDetail);
        setOrderDetail(res.data);
        setProductDetail(res.data.orderProducts);
        setOrderContactInfo(res.data.orderContactInfo);
        setOrderDelivery(res.data.orderDelivery);
        setActionStatus(res.data.actionStatus);
      }
    }
  }
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
        setIsOpen2(false);

        Swal.fire("Thêm Ghi Chú Thành Công", "", "success");
      }
    }
  }
  const handleNoteID = (id) => {
    setNodeUpdate([{ ...noteUpdate, orderDetailId: id }]);
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
        Swal.fire("Từ Chối Thành Công", "", "success");
        loadDataOrderById();
      }
    }
  }
  const productNoteFromPharmacist = ProductDetail.find(
    (product) => product.id === noteUpdate[0].orderDetailId
  )?.productNoteFromPharmacist;

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
              Vui Lòng Xác Nhận Đơn Hàng
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
  } else if (OrderDetail.pharmacistId === localStorage.getItem("userID")) {
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
              Cập nhật
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
            Đơn hàng đã được xác nhận bởi thằng khác
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
            className={`dialog overlay ${isOpen2 ? "" : "hidden"}`}
            id="my-dialog2"
          >
            <a href="#" className="overlay-close" />
            {OrderDetail.orderStatusName === "Đang chuẩn bị hàng" &&
            OrderDetail.orderTypeId === 3 ? (
              <div className="row " style={{ width: 900 }}>
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
                      <h5 className="mb-0">Xác Nhận Đơn Hàng</h5>
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
                            <select
                              name="city"
                              disabled
                              id="basic-icon-default-email"
                              className="form-control"
                              onChange={(e) => {
                                setOrderDetail({
                                  ...OrderDetail,
                                  orderStatus: e.target.value,
                                });
                              }}
                              value={7}
                            >
                              {orderStatus &&
                                orderStatus.length &&
                                orderStatus.map((e, index) => {
                                  return (
                                    <>
                                      <option
                                        key={e.orderStatusId}
                                        value={e.orderStatusId}
                                      >
                                        {e.orderStatusName}
                                      </option>
                                    </>
                                  );
                                })}
                            </select>
                          </div>
                          <div>
                            {" "}
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
                                    <div style={{ width: 380 }}>
                                      <div>Xác Nhận</div>
                                      <input
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
                              Mô Tả
                            </label>
                            <div className="input-group input-group-merge">
                              <textarea
                                style={{ height: 100 }}
                                type="text"
                                className="form-control"
                                id="basic-icon-default-fullname"
                                placeholder="Viết Mô Tả "
                                aria-label="John Doe"
                                aria-describedby="basic-icon-default-fullname2"
                                onChange={(e) =>
                                  setDescriptionStatus(e.target.value)
                                }
                              />
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
                                height: 30,
                                width: 80,
                                fontSize: 13,
                                marginLeft: 23,

                                backgroundColor: "#82AAE3",
                                color: "white",
                              }}
                            >
                              Xác Nhận
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

                        marginLeft: 230,
                        borderColor: "#f4f4f4",
                      }}
                    >
                      <h5 className="mb-0">Xác Nhận Đơn Hàng</h5>
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
                            Vui Lòng Chuyển Qua Điện Thoại Để Giao Hàng
                            <img src="https://jobsgo.vn/blog/wp-content/uploads/2019/09/nhan-vien-giao-hang.png" />
                          </div>
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

                        marginLeft: 230,
                        borderColor: "#f4f4f4",
                      }}
                    >
                      <h5 className="mb-0">Xác Nhận Đơn Hàng</h5>
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
                            <select
                              name="city"
                              disabled
                              id="basic-icon-default-email"
                              className="form-control"
                              onChange={(e) => {
                                setOrderDetail({
                                  ...OrderDetail,
                                  orderStatus: e.target.value,
                                });
                              }}
                              value={9}
                            >
                              {orderStatus &&
                                orderStatus.length &&
                                orderStatus.map((e, index) => {
                                  return (
                                    <>
                                      <option
                                        key={e.orderStatusId}
                                        value={e.orderStatusId}
                                      >
                                        {e.orderStatusName}
                                      </option>
                                    </>
                                  );
                                })}
                            </select>
                          </div>
                          <div>
                            {" "}
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
                                    <div style={{ width: 380 }}>
                                      <div>Xác Nhận</div>
                                      <input
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
                              Mô Tả
                            </label>
                            <div className="input-group input-group-merge">
                              <textarea
                                style={{ height: 100 }}
                                type="text"
                                className="form-control"
                                id="basic-icon-default-fullname"
                                placeholder="Viết Mô Tả "
                                aria-label="John Doe"
                                aria-describedby="basic-icon-default-fullname2"
                                onChange={(e) =>
                                  setDescriptionStatus(e.target.value)
                                }
                              />
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
                                updateStatusOrderGo();
                              }}
                              style={{
                                height: 30,
                                width: 80,
                                fontSize: 13,
                                marginLeft: 23,

                                backgroundColor: "#82AAE3",
                                color: "white",
                              }}
                            >
                              Xác Nhận
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
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
                    <h5 className="mb-0">Xác Nhận Đơn Hàng</h5>
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
                            <textarea
                              style={{ height: 200 }}
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Viết Mô Tả "
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
                              height: 30,
                              width: 80,
                              fontSize: 13,
                              paddingTop: 1,
                              marginLeft: "35%",

                              backgroundColor: "#DF2E38",
                              color: "white",
                            }}
                          >
                            Từ Chối
                          </button>
                          <button
                            type="submit"
                            className="button-28"
                            onClick={(e) => {
                              e.preventDefault();
                              confirmOrder();
                            }}
                            style={{
                              height: 30,
                              width: 80,
                              fontSize: 13,
                              marginLeft: 23,

                              backgroundColor: "#82AAE3",
                              color: "white",
                            }}
                          >
                            Xác Nhận
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: "flex" }}>
                          <button
                            type="submit"
                            className="button-28"
                            onClick={(e) => {
                              e.preventDefault();
                              rejectOrder();
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
                            Từ Chối
                          </button>
                        </div>
                      )}
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
                            {}
                            <textarea
                              style={{ height: 200 }}
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Viết Mô Tả "
                              aria-label="John Doe"
                              aria-describedby="basic-icon-default-fullname2"
                              value={
                                productNoteFromPharmacist === ""
                                  ? ""
                                  : productNoteFromPharmacist
                              }
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
                            Mô Tả
                          </label>
                          <div className="input-group input-group-merge">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                            >
                              {OrderDetail.note}
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
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-phone"
                          >
                            Số điện Thoại Người mua
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
                            {OrderDetail.orderTypeName === "Bán tại chỗ" ? (
                              <div
                                className="form-text"
                                style={{ color: "red" }}
                              ></div>
                            ) : (
                              <div
                                className="form-text"
                                style={{ color: "red" }}
                              >
                                Gọi Khách Hàng Xác Nhận Lại
                              </div>
                            )}
                          </div>
                        </div>
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
                                  Email Người mua
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
