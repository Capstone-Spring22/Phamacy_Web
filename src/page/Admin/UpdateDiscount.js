import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarOwner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { getDataByPath, updateDataByPath } from "../../services/data.service";
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
        setUnitCount(res.data.products.length);
      }
    }
  }

  const [discountType, setDiscountType] = useState("percent");

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
        discountMoney: "",
      }));
    } else if (selectedOption.value === "money") {
      setProduct((prevState) => ({
        ...prevState,
        discountPercent: "",
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

        console.log("display", res.data.items);
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
    // if (id.trim() === "") {
    //   Swal.fire("ID Can't Empty", "", "question");
    //   return false;
    // }
    return true;
  };

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
                    <h5 className="mb-0">Thêm Sản Phẩm Giảm Giá</h5>
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
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Giảm Giá (%)
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            name="city"
                            id="basic-icon-default-email"
                            className="form-control"
                            value={product.discountPercent}
                            onChange={(e) =>
                              setProduct((prevState) => ({
                                ...prevState,
                                discountPercent: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Số tiền giảm
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            name="city"
                            id="basic-icon-default-email"
                            className="form-control"
                            value={product.discountMoney}
                            onChange={(e) =>
                              setProduct((prevState) => ({
                                ...prevState,
                                discountMoney: e.target.value,
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
                    <h5 className="mb-0">Xem Sản phẩm </h5>
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
                                {/* {selectedOption && (
                                  <div>
                                    <p>Price: {price}</p>
                                    <p>Giá Giảm {price - product.discountMoney}</p>
                                  </div>
                                )} */}
                                {product?.eventProductDiscounts &&
                                  product?.eventProductDiscounts.length &&
                                  product?.eventProductDiscounts.map(
                                    (e, index) => {
                                      return (
                                        <>
                                          <label
                                            className="form-label"
                                            htmlFor="basic-icon-default-phone"
                                          >
                                            Sản phẩm
                                          </label>
                                          <div
                                            style={{
                                              display: "flex",
                                              width: 1100,
                                              flexWrap: "wrap",
                                            }}
                                          >
                                            <Select
                                            
                                              value={options.find(
                                                (option) =>
                                                  option.value === e.productId
                                              )}
                                              isDisabled
                                              onChange={(selectedOption) => {
                                                const drugObj = drug.find(
                                                  (d) =>
                                                    d.id ===
                                                    selectedOption.value
                                                );
                                                const price = drugObj
                                                  ? drugObj.price
                                                  : 0;
                                                setSelectedOption(
                                                  selectedOption
                                                );
                                                setPrice(
                                                  getPriceById(
                                                    selectedOption.value
                                                  )
                                                );
                                                setProduct({
                                                  ...product,
                                                  products: [
                                                    ...product.products.slice(
                                                      0,
                                                      index - 1
                                                    ),
                                                    {
                                                      ...product.products[
                                                        index - 1
                                                      ],
                                                      productId:
                                                        selectedOption.value,
                                                    },
                                                    ...product.products.slice(
                                                      index
                                                    ),
                                                  ],
                                                });
                                              }}
                                              options={options}
                                            />
                                            <div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  margin: "0 0 0 50px",
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
                                                    {e.price.toLocaleString(
                                                      "en-US"
                                                    )}{" "}
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
                                                    Giá sau khi giảm:
                                                    {e.priceAfterDiscount.toLocaleString(
                                                      "en-US"
                                                    )}{" "}
                                                    đ
                                                  </p>
                                                ) : (
                                                  <p
                                                    style={{
                                                      color: "black",
                                                      fontWeight: "bold",
                                                      fontSize: "20px",
                                                    }}
                                                  >
                                                    Giá sau khi giảm:{" "}
                                                    {e.priceAfterDiscount.toLocaleString(
                                                      "en-US"
                                                    )}{" "}
                                                    đ
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    }
                                  )}
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    }
                  )}
               
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
