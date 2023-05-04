import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarOwner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { createDataByPath, deleteDataByPath, getDataByPath, updateDataByPath } from "../../services/data.service";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import Select from "react-select";

const UpdateDiscount = () => {
  const myId = localStorage.getItem("id");
  const [drug, setDrug] = useState([]);
  const [unitCount, setUnitCount] = useState(1);
  let history = useHistory();
  const [productIngredient, setProductIngredient] = useState([]);
  const [discountError, setDiscountError] = useState("");
  const [discountMoneyError, setDiscountMoneyError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({
    id: "",
    title: "",
    reason: "",
    discountPercent: 0,
    discountMoney: 0,
    startDate: "",
    endDate: "",
  });

  async function loadDataImportProductByID() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `ProductDiscount/${myId}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("discountPercent :", res.data);
      if (res !== null && res !== undefined && res.status === 200) {
        setDiscountPercent(res.data.discountPercent);
        setProduct(res.data);
        setDiscountType(res.data.discountPercent === null ? "money" : "percent");
        setUnitCount(res.data.eventProductDiscounts.length)
        setIsLoading(false)
      }
    }
  }

  async function handleDeleteProduct(index) {
    console.log(product.eventProductDiscounts[index].productId)
    var productId = product.eventProductDiscounts[index].productId
    var checkNull = await callProductDiscountApi(productId, 0, "")
    if (checkNull !== null) {
      const newProducts = [...product.eventProductDiscounts];
      newProducts.splice(index, 1);

      setProduct({
        ...product,
        eventProductDiscounts: newProducts,
      });

      setUnitCount(unitCount - 1);
    } else {
      return;
    }
  };

  const [discountType, setDiscountType] = useState("");

  const discountOptions = [
    { value: "percent", label: "Giảm giá theo %" },
    { value: "money", label: "Giảm giá theo tiền" },
  ];
  async function loadDataProductIngredient() {
    const path = `ProductIngredient?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setProductIngredient(res.data.items);
    }
  }
  const handleDiscountTypeChange = (selectedOption) => {
    setDiscountType(selectedOption.value);
    if (selectedOption.value === "percent") {
      setProduct((prevState) => ({
        ...prevState,
        discountMoney: null,
      }));
    } else if (selectedOption.value === "money") {
      setProduct((prevState) => ({
        ...prevState,
        discountPercent: null,
      }));
    }
  };

  async function loadDataDrug() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Product?pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("display", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
      }
    }
  }
  useEffect(() => {
    loadDataDrug();
  }, []);
  async function createNewProducts() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (checkValidation()) {
        const data = product;
        const path = "ProductDiscount";
        const res = await updateDataByPath(path, accessToken, data);
        console.log("Check res", res);
        console.log("display du lieu", data);
        if (res && res.status === 200) {
          Swal.fire("Cập Nhật Thành Công", "", "success");
          history.push("/ProductDiscount");
        } else {
          Swal.fire(res.data.variablesError, "", "error");
          return;
        }
      }
    }
  }
  const options = drug.map((e) => ({
    label: e.name,
    value: e.id,
  }));
  const [price, setPrice] = useState(null);
  const getPriceById = (id) => {
    const selectedDrug = drug.find((e) => e.id === id);
    return selectedDrug ? selectedDrug.price : null;
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const checkValidation = () => {
    const discountPercent = parseInt(product.discountPercent);
    const productId = product.eventProductDiscounts[0].productId;
    const productPrice = getPriceById(productId);

    if (discountPercent > 99) {
      Swal.fire("Không Được Giảm Quá 99%", "", "question");
      return false;
    }
    if (!product.discountMoney && !product.discountPercent) {
      Swal.fire("Vui lòng nhập thông tin giảm giá", "", "question");
      return false;
    }
    if (product.discountMoney > productPrice * 0.5) {
      Swal.fire("Giá trừ tiền thẳng không được cao hơn 50% giá sản phẩm", "", "question");
      return false;
    }

    const startDate = new Date(product.startDate);
    const endDate = new Date(product.endDate);

    if (startDate > endDate) {
      Swal.fire(
        "Ngày kết thúc phải sau ngày bắt đầu",
        "",
        "question"
      );
      return false;
    }

    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    if (endDate - today < oneDay) {
      Swal.fire(
        "Ngày kết thúc phải cách ngày hiện tại trên 1 ngày",
        "",
        "question"
      );
      return false;
    }

    return true;
  };

  async function callProductDiscountApi(productId, type, eventProductDiscountsId = "") {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (type === 1) {
        const data = {
          discountId: "",
          productId: productId
        };
        const path = "ProductDiscount/CheckExistDiscountProduct";
        const res = await createDataByPath(path, accessToken, data);
        //notExist
        if (res && res.status === 200) {
          const addProductToDiscountModel = {
            productId: productId
          }
          const res1 = await createDataByPath(`ProductDiscount/${product.id}/Product`, accessToken, addProductToDiscountModel);
          if (res1 && res1.status === 200) {
            Swal.fire("Thêm Thành Công", "Sản phẩm đã được thêm vào chương trình giảm giá thành công", "success")
            return res1.data
          }
        } else if (res.status === 400) {
          Swal.fire(res.data)
          return null;
        }
      }
      if (type === 2) {
        const data = {
          discountId: product.id,
          productId: productId
        };
        const path = "ProductDiscount/CheckExistDiscountProduct";
        const res = await createDataByPath(path, accessToken, data);
        //notExist
        if (res && res.status === 200) {
          const updateProductToDiscountModel = {
            productId: productId
          }
          const res1 = await updateDataByPath(`ProductDiscount/${product.id}/${eventProductDiscountsId}/Product`, accessToken, updateProductToDiscountModel);
          if (res1 && res1.status === 200) {
            Swal.fire("Cập nhật Thành Công", "Sản phẩm thay đổi thành sản phẩm khác trong chương trình giảm giá thành công", "success")
            return "123"
          } else if (res1.status === 400) {
            Swal.fire(res.data)
            return null;
          }
        } else if (res.status === 400) {
          Swal.fire(res.data)
          return null;
        }
      }
      if (type === 0) {
        const res2 = await deleteDataByPath(`ProductDiscount/${productId}`, accessToken, "");
        if (res2 && res2.status === 200) {
          Swal.fire("Xóa thành công", "Sản phẩm đã được xóa khỏi chương trình khuyến mãi", "success");
          return "123";
        } else {
          Swal.fire(res2.data);
          return null;
        }
      }
      return null;
    }
  }

  const handleAddUnit = () => {
    setProduct({
      ...product,
      eventProductDiscounts: [
        ...product.eventProductDiscounts,
        {
          id: "",
          productId: "",
          price: 0
        },
      ],
    });
    setUnitCount(unitCount + 1);
  };

  useEffect(() => {
    console.log(product)
  }, [product]);

  useEffect(() => {
    loadDataProductIngredient();
  }, []);
  useEffect(() => {
    loadDataImportProductByID();
  }, [discountPercent]);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />

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

                </div>
              </div>
              {/* /Search */}
            </div>
          </nav>

          {/* / Navbar */}
          {/* Content wrapper */}
          <div>
            <div
              className="row "
              style={{ width: 1200, marginTop: 60, marginLeft: 25 }}
            >
              <div className="col-xl">
                {isLoading ? ("") : (
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
                      <h5 className="mb-0">Thay Đổi Chương Trình Giảm Giá</h5>
                    </div>
                    <div className="card-body">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto",
                          padding: 30,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-fullname"
                          >
                            Tên Chương Trình
                        </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              className="form-control"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Chương Trình"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                              value={product.title}
                              onChange={(e) =>
                                setProduct((prevState) => ({
                                  ...prevState,
                                  title: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "100%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-company"
                          >
                            lí do
                        </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-company"
                              className="form-control"
                              placeholder="Tên Loại Con Sản Phẩm"
                              aria-label="Tên Loại Con Sản Phẩm"
                              aria-describedby="basic-icon-default-company2"
                              value={product.reason}
                              onChange={(e) =>
                                setProduct((prevState) => ({
                                  ...prevState,
                                  reason: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label className="form-label" htmlFor="discount-type">
                            Chọn Loại Giảm Giá
                        </label>
                          <Select
                            id="discount-type"
                            options={discountOptions}
                            defaultValue={
                              discountPercent === null
                                ? discountOptions[1]
                                : discountOptions[0]
                            }
                            onChange={handleDiscountTypeChange}
                          />
                        </div>
                        {discountType === "percent" && (
                          <div className="mb-3" style={{ width: "95%" }}>
                            <label
                              className="form-label"
                              htmlFor="discount-percent"
                            >
                              Giảm giá (%)
                          </label>
                            <div className="input-group input-group-merge">
                              <input
                                type="number"
                                value={product.discountPercent}
                                name="discount-percent"
                                placeholder="Giảm giá (%)"
                                id="discount-percent"
                                className="form-control"
                                onChange={(e) => {
                                  setProduct((prevState) => ({
                                    ...prevState,
                                    discountPercent: e.target.value,
                                  }))
                                }}
                              />
                            </div>
                            {discountError && (
                              <div className="form-text" style={{ color: "red" }}>
                                {discountError}
                              </div>
                            )}
                          </div>
                        )}

                        {discountType === "money" && (
                          <div className="mb-3" style={{ width: "95%" }}>
                            <label
                              className="form-label"
                              htmlFor="discount-money"
                            >
                              Số tiền giảm
                          </label>
                            <div className="input-group input-group-merge">
                              <input
                                type="text"
                                value={product.discountMoney}
                                name="discount-money"
                                placeholder="Số tiền giảm"
                                id="discount-money"
                                className="form-control"
                                onChange={(e) => {
                                  const productId = product.eventProductDiscounts[0].productId;
                                  const productPrice = getPriceById(productId);

                                  const value = e.target.value;
                                  setProduct((prevState) => ({
                                    ...prevState,
                                    discountMoney: value,
                                  }));

                                  const parsedValue = parseInt(value);
                                  if (isNaN(parsedValue) || parsedValue < 0) {
                                    setDiscountMoneyError("Số tiền phải là số lượng lớn hơn 0");
                                    return;
                                  } else if (
                                    parsedValue >= 0 &&
                                    parsedValue > productPrice * 0.5
                                  ) {
                                    setDiscountMoneyError(
                                      "Số tiền trừ thẳng tiền không được cao hơn 50% giá sản phẩm."
                                    );
                                    return;
                                  } else {
                                    setDiscountMoneyError("");
                                  }
                                  setProduct((prevState) => ({
                                    ...prevState,
                                    discountMoney: e.target.value,
                                  }))
                                }}
                              />
                            </div>
                            {discountMoneyError && (
                              <div className="form-text" style={{ color: "red" }}>
                                {discountMoneyError}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-company"
                          >
                            Ngày Bắt Đầu
                        </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="date"
                              id="basic-icon-default-company"
                              className="form-control"
                              placeholder="Công dung"
                              aria-label="Công dung"
                              value={
                                product.startDate
                                  ? new Date(product.startDate)
                                    .toISOString()
                                    .substr(0, 10)
                                  : ""
                              }
                              aria-describedby="basic-icon-default-company2"
                              onChange={(e) =>
                                setProduct((prevState) => ({
                                  ...prevState,
                                  startDate: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-company"
                          >
                            Ngày Kết Thúc
                        </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="date"
                              id="basic-icon-default-company"
                              className="form-control"
                              placeholder="Công dung"
                              aria-label="Công dung"
                              value={
                                product.endDate
                                  ? new Date(product.endDate)
                                    .toISOString()
                                    .substr(0, 10)
                                  : ""
                              }
                              aria-describedby="basic-icon-default-company2"
                              onChange={(e) =>
                                setProduct((prevState) => ({
                                  ...prevState,
                                  endDate: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="button-28"
                        onClick={(e) => {
                          e.preventDefault();
                          createNewProducts();
                        }}
                        style={{
                          height: 30,
                          width: 80,
                          fontSize: 13,
                          paddingTop: 1,
                          marginLeft: "90%",
                          marginTop: "20px",
                          backgroundColor: "#11cdef",
                          color: "white",
                        }}
                      >
                        Lưu
                    </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className="row "
              style={{ width: 1200, marginTop: 60, marginLeft: 25 }}
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
                    <h5 className="mb-0"> Sản phẩm giảm giá</h5>
                  </div>{" "}
                  {
                    isLoading ? ("") : (
                      <div>
                        {Array.from({ length: unitCount }, (_, i) => i + 1).map(
                          (index) => {
                            return (
                              <div className="card-body" style={{ marginLeft: -30 }}>
                                <div key={index}>
                                  <div
                                    style={{
                                      display: "flex",
                                      marginLeft: 100,
                                      padding: 30,
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <div
                                      className="mb-3"
                                      style={{ width: "30%", marginRight: 20 }}
                                    >
                                      <label
                                        className="form-label"
                                        htmlFor="basic-icon-default-phone"
                                      >
                                        Sản phẩm
                                          </label>
                                      <Select
                                        value={options.find(
                                          (option) =>
                                            option.value === product.eventProductDiscounts[index - 1].productId ? (options.find(
                                              (option) =>
                                                option.value === product.eventProductDiscounts[index - 1].productId)) : ("")
                                        )}
                                        onChange={async (selectedOption) => {
                                          var newDiscountId = null;
                                          var callType = 0;
                                          if (product.eventProductDiscounts[index - 1].id.length === 0) {
                                            newDiscountId = await callProductDiscountApi(selectedOption.value, 1)
                                            callType = 1;
                                          } else {
                                            if (product.eventProductDiscounts.find((x) => x.productId === selectedOption.value)) {
                                              Swal.fire("Chương trình này đã có sản phẩm giảm giá này rồi")
                                              return;
                                            }
                                            newDiscountId = await callProductDiscountApi(selectedOption.value, 2, product.eventProductDiscounts[index - 1].id)
                                            callType = 2;
                                          }

                                          if (newDiscountId === null) {
                                            return;
                                          }

                                          setSelectedOption(selectedOption);
                                          if (callType === 1) {
                                            setProduct({
                                              ...product,
                                              eventProductDiscounts: [
                                                ...product.eventProductDiscounts.slice(0, index - 1),
                                                {
                                                  ...product.eventProductDiscounts[index - 1],
                                                  productId: selectedOption.value,
                                                  price: (drug.find((x) => x.id === selectedOption.value).price),
                                                  id: newDiscountId
                                                },
                                                ...product.eventProductDiscounts.slice(index),
                                              ],
                                            });
                                          } else {
                                            setProduct({
                                              ...product,
                                              eventProductDiscounts: [
                                                ...product.eventProductDiscounts.slice(0, index - 1),
                                                {
                                                  ...product.eventProductDiscounts[index - 1],
                                                  productId: selectedOption.value,
                                                  price: (drug.find((x) => x.id === selectedOption.value).price),
                                                },
                                                ...product.eventProductDiscounts.slice(index),
                                              ],
                                            });
                                          }
                                        }}
                                        options={options}
                                      />
                                    </div>
                                    <div>
                                      {product.eventProductDiscounts[index - 1].productId && (
                                        <div
                                          style={{
                                            display: "flex",
                                            margin: "35px 0 0 0px",
                                          }}
                                        >
                                          {
                                            <p
                                              style={{
                                                color: "black",
                                                fontWeight: "bold",
                                                marginRight: "30px",
                                                fontSize: "20px",
                                              }}
                                            >
                                              Giá gốc:{" "}
                                              {(product?.eventProductDiscounts[index - 1]?.price).toLocaleString("en-US")}
                                                  đ
                                                </p>
                                          }
                                          {product.discountMoney !==
                                            null ? (
                                            <p
                                              style={{
                                                color: "black",
                                                fontWeight: "bold",
                                                fontSize: "20px",
                                              }}
                                            >
                                              Giá sau khi giảm: {(product?.eventProductDiscounts[index - 1]?.price - product.discountMoney).toLocaleString("en-US")} đ
                                            </p>
                                          ) : (
                                            <p
                                              style={{
                                                color: "black",
                                                fontWeight: "bold",
                                                fontSize: "20px",
                                              }}
                                            >
                                              Giá sau khi giảm 1:{" "}
                                              {(product?.eventProductDiscounts[index - 1]?.price - (product.discountPercent / 100 * (product?.eventProductDiscounts[index - 1]?.price))).toLocaleString(
                                                "en-US"
                                              )}
                                                  đ
                                            </p>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <button
                                        style={{ margin: "30px 0 0 30px" }}
                                        className="btn btn-danger"
                                        onClick={() => {
                                          handleDeleteProduct(index - 1)
                                        }
                                        }
                                      >
                                        Xóa Sản Phẩm
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            );
                          }
                        )}
                        <button
                          className="button-28"
                          style={{
                            height: 50,
                            width: 200,
                            fontSize: 13,
                            paddingTop: 1,
                            marginLeft: "44%",
                            marginBottom: "20px",
                            backgroundColor: "#fff",
                          }}
                          onClick={handleAddUnit}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-plus-lg"
                            viewBox="0 0 16 16"
                            style={{ marginRight: 10 }}
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                            />
                          </svg>{" "}
                    Thêm Sản phẩm
                  </button>
                      </div>
                    )
                  }

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
export default UpdateDiscount;
