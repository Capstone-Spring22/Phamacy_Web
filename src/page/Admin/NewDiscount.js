import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarOwner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { getDataByPath, createDataByPath } from "../../services/data.service";

import Select from "react-select";
const NewDiscount = () => {
  const [unitCount, setUnitCount] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [totalRecord, setTotalRecord] = useState([]);
  const [drug, setDrug] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    reason: "",
    discountPercent: "",
    discountMoney: "",
    startDate: "",
    endDate: "",
    products: [
      {
        productId: "",
      },
    ],
  });
  const [discountType, setDiscountType] = useState("percent");
  const discountOptions = [
    { value: "percent", label: "Giảm giá theo %" },
    { value: "money", label: "Giảm giá theo tiền" },
  ];
  async function createNewProducts() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (checkValidation()) {
        const data = product;
        const path = "ProductDiscount";
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

  const [price, setPrice] = useState(null);
  const getPriceById = (id) => {
    const selectedDrug = drug.find((e) => e.id === id);
    return selectedDrug ? selectedDrug.price : null;
  };

  async function loadDataDrug() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Product?pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("display", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
        setTotalRecord(res.data.totalRecord);
        console.log("display", res.data.items);
      }
    }
  }
  const checkValidation = () => {
    const discountPercent = parseInt(product.discountPercent);
    const productId = product.products[0].productId;
    const productPrice = getPriceById(productId);

    if (discountPercent > 50) {
      Swal.fire("Không Được Giảm Quá 50%", "", "question");
      return false;
    }

    if (product.discountMoney > productPrice * 0.5) {
      Swal.fire("Giá giảm không được cao hơn 50% giá sản phẩm", "", "question");
      return false;
    }

    const startDate = new Date(product.startDate);
    const endDate = new Date(product.endDate);

    if (startDate < new Date().setHours(0, 0, 0, 0)) {
      Swal.fire("Ngày bắt đầu không thể là ngày trong quá khứ", "", "question");
      return false;
    }

    if (startDate > endDate) {
      Swal.fire(
        "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu",
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
  useEffect(() => {
    loadDataDrug();
  }, []);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = drug.map((e) => ({
    label: e.name,
    value: e.id,
  }));
  const handleAddUnit = () => {
    setProduct({
      ...product,
      products: [
        ...product.products,
        {
          productId: "",
        },
      ],
    });
    setUnitCount(unitCount + 1);
  };
  const handleDiscountTypeChange = (selectedOption) => {
    setDiscountType(selectedOption.value);
    if (selectedOption.value === "percent") {
      setProduct((prevState) => ({
        ...prevState,
        discountMoney: "",
      }));
    } else if (selectedOption.value === "money") {
      setProduct((prevState) => ({
        ...prevState,
        discountPercent: "",
      }));
    }
  };
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
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                  />
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
                    <h5 className="mb-0">Thêm Chương Trình Giảm Giá</h5>
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
                            placeholder=" Tên Chương Trình"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
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
                          Lí Do
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder=" Lí Do"
                            aria-label="Tên Loại Con Sản Phẩm"
                            aria-describedby="basic-icon-default-company2"
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
                          defaultValue={discountOptions[0]}
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
                              type="text"
                              name="discount-percent"
                              placeholder="Giảm giá (%)"
                              id="discount-percent"
                              className="form-control"
                              onChange={(e) =>
                                setProduct((prevState) => ({
                                  ...prevState,
                                  discountPercent: e.target.value,
                                }))
                              }
                            />
                          </div>
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
                              name="discount-money"
                              placeholder="Số tiền giảm"
                              id="discount-money"
                              className="form-control"
                              onChange={(e) =>
                                setProduct((prevState) => ({
                                  ...prevState,
                                  discountMoney: e.target.value,
                                }))
                              }
                            />
                          </div>
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
                        backgroundColor: "#82AAE3",
                        color: "white",
                      }}
                    >
                      Lưu
                    </button>
                  </div>
                </div>
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
                    <h5 className="mb-0">Thêm Sản phẩm </h5>
                  </div>{" "}
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
                                {selectedOption && (
                                  <div>
                                    <p>Price: {price}</p>
                                    <p>Giá Giảm {price - product.discountMoney}</p>
                                  </div>
                                )}
                                <label
                                  className="form-label"
                                  htmlFor="basic-icon-default-phone"
                                >
                                  Id sản phẩm
                                </label>

                                <Select
                                  onChange={(selectedOption) => {
                                    const drugObj = drug.find(
                                      (d) => d.id === selectedOption.value
                                    );
                                    const price = drugObj ? drugObj.price : 0;
                                    setSelectedOption(selectedOption);
                                    setPrice(
                                      getPriceById(selectedOption.value)
                                    );
                                    setProduct({
                                      ...product,
                                      products: [
                                        ...product.products.slice(0, index - 1),
                                        {
                                          ...product.products[index - 1],
                                          productId: selectedOption.value,
                                        },
                                        ...product.products.slice(index),
                                      ],
                                    });
                                  }}
                                  options={options}
                                />
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
              </div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </div>
  );
};
export default NewDiscount;
