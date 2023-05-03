import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SideBar from "../sidebar/SideBarManager";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { getDataByPath, updateDataByPath } from "../../services/data.service";

const ViewImportProduct = () => {
  const myId = localStorage.getItem("id");
  const [unitCount, setUnitCount] = useState(1);

  const [manufactuner, setManufactuner] = useState([]);
  const [productIngredient, setProductIngredient] = useState([]);

  const [unit, setUnit] = useState([]);
  const [unit2, setUnit2] = useState([]);
  const [indexUnit, setIndexUnit] = useState(0);
  const [countQuantity, setCountQuantity] = useState(0);
  const [countprice, setcountPrice] = useState(0);

  const [drug, setDrug] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [product, setProduct] = useState({
    productImportDetails: [
      {
        id: "",
        productId: "",
        quantity: 0,
        importPrice: 0,
        productBatches: [
          {
            id: "",
            quantity: 0,
            manufactureDate: "",
            expireDate: "",
          },
        ],
      },
    ],
    id: "",
    note: "",
    totalProductPrice: 0,
    taxPrice: 0,
    totalShippingFee: 0,
    totalPrice: 0,
    isReleased: "",
  });

  async function loadDataImportProductByID() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `ProductImport/${myId}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("product", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setProduct(res.data);
        setUnitCount(res.data.productImportDetails.length);
      }
    }
  }

  async function loadDataUnit() {
    const path = `Unit?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setUnit(res.data.items);
    }
  }
  async function loadDataManufacturer() {
    const path = `Manufacturer?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setManufactuner(res.data.items);
    }
  }
  async function loadDataProductIngredient() {
    const path = `ProductIngredient?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setProductIngredient(res.data.items);
    }
  }

  async function loadDataUnit2() {
    const path = `Unit?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setUnit2(res.data.items);
    }
  }

  async function loadDataDrug() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Product?pageIndex=1&pageItems=100`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("display", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);

        console.log("display", currentPage);
      }
    }
  }

  const handleAddQuantity = (index) => {
    setProduct({
      ...product,
      productImportDetails: [
        ...product.productImportDetails.slice(0, index - 1),
        {
          ...product.productImportDetails[index - 1],
          quantity: product.productImportDetails[
            index - 1
          ].productBatches.reduce(
            (total, curent) => total + curent.quantity,
            0
          ),
        },
        ...product.productImportDetails.slice(index),
      ],
    });
    setcountPrice(parseInt(countprice) + 1);
  };
  const handleAddQuantityBatch = (index, batchIndex, e) => {
    setProduct({
      ...product,
      productImportDetails: [
        ...product.productImportDetails.slice(0, index - 1),
        {
          ...product.productImportDetails[index - 1],
          productBatches: [
            ...product.productImportDetails[index - 1].productBatches.slice(
              0,
              batchIndex - 1
            ),
            {
              ...product.productImportDetails[index - 1].productBatches[
              batchIndex - 1
              ],
              quantity: parseInt(e.target.value),
            },
            ...product.productImportDetails[index - 1].productBatches.slice(
              batchIndex
            ),
          ],
          quantity: product.productImportDetails[
            index - 1
          ].productBatches.reduce(
            (total, curent) => total + curent.quantity,
            0
          ),
        },
        ...product.productImportDetails.slice(index),
      ],
    });
  };
  useEffect(() => {
    if (indexUnit === 0) {
    } else {
      handleAddQuantity(indexUnit);
    }
  }, [countQuantity]);
  useEffect(() => {
    setProduct({
      ...product,
      totalProductPrice: product.productImportDetails.reduce(
        (total, curent) => total + curent.quantity * curent.importPrice,
        0
      ),
    });
  }, [countprice]);
  useEffect(() => {
    setProduct({
      ...product,
      totalPrice:
        parseInt(product.totalProductPrice) +
        parseInt(product.taxPrice) +
        parseInt(product.totalShippingFee),
    });
  }, [product.totalProductPrice, product.taxPrice, product.totalShippingFee]);
  async function createNewProducts() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (checkValidation()) {
        const data = product;
        const path = "ProductImport";
        const res = await updateDataByPath(path, accessToken, data);
        console.log("Check res", res);
        console.log("display du lieu", data);
        if (res && res.status === 200) {
          Swal.fire("Update Success", "", "success");
          // window.location.reload();
        } else {
          Swal.fire("Đã Được Xác Nhận Không Được Sửaa", "You failed!", "error");
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

  // useEffect(() => {
  //   loadDataEmployee();
  // }, [currentPage, perPage]);
  useEffect(() => {
    loadDataUnit();
    loadDataImportProductByID();
    loadDataProductIngredient();
    loadDataManufacturer();
    loadDataUnit2();
    loadDataDrug();
  }, []);

  const [activeItem, setActiveItem] = useState("ImportProduct");

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
                    <h5 className="mb-0"> Sản phẩm trong lô</h5>
                  </div>{" "}
                  {Array.from({ length: unitCount }, (_, i) => i + 1).map(
                    (index) => {
                      return (
                        <div className="card-body" key={index}>
                          <div>
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
                                  htmlFor={`unitId${index}`}
                                >
                                  Sản Phẩm
                                </label>
                                <div className="input-group input-group-merge">
                                  <div
                                    type="text"
                                    readOnly
                                    id={`quantitative${index}`}
                                    aria-label="Unit Id"
                                    aria-describedby={`quantitative${index}2`}
                                  >
                                    {drug?.find(
                                      (sc) =>
                                        sc.productUnitReferences?.find((item) => item.id ===
                                          product?.productImportDetails[
                                            index - 1
                                          ]?.productId)
                                    )?.name
                                      ? drug?.find(
                                        (sc) =>
                                          sc.productUnitReferences?.find((item) => item.id ===
                                            product?.productImportDetails[
                                              index - 1
                                            ]?.productId)
                                      )?.name
                                      : "Đang Tải ..."}
                                  </div>
                                </div>
                              </div>
                              <div
                                className="mb-3"
                                style={{ width: "30%", marginRight: 20 }}
                              >
                                <label
                                  className="form-label"
                                  htmlFor={`unitId${index}`}
                                >
                                  Đơn vị Sản Phẩm
                                </label>
                                <div className="input-group input-group-merge">
                                  <div
                                    type="text"
                                    readOnly
                                    id={`quantitative${index}`}
                                    aria-label="Unit Id"
                                    aria-describedby={`quantitative${index}2`}
                                  >
                                    {drug?.find(
                                      (sc) =>
                                        sc.productUnitReferences?.find((item) => item.id ===
                                          product?.productImportDetails[
                                            index - 1
                                          ]?.productId)
                                    )
                                      ? drug?.find(
                                        (sc) =>
                                          sc.productUnitReferences?.find((item) => item.id ===
                                            product?.productImportDetails[
                                              index - 1
                                            ]?.productId)
                                      )?.productUnitReferences.find((item) => item.id === product?.productImportDetails[
                                        index - 1
                                      ]?.productId)?.unitName
                                      : "Đang Tải ..."}
                                  </div>
                                </div>
                              </div>
                              <div
                                className="mb-3"
                                style={{ width: "30%", marginRight: 20 }}
                              >
                                <label
                                  className="form-label"
                                  htmlFor={`unitId${index}`}
                                >
                                  Số lượng
                                </label>
                                <div className="input-group input-group-merge">
                                  <div

                                  >

                                    {
                                      product.productImportDetails[index - 1]
                                        .quantity
                                    }
                                  </div>
                                </div>
                              </div>
                              <div
                                className="mb-3"
                                style={{ width: "30%", marginRight: 20 }}
                              >
                                <label
                                  className="form-label"
                                  htmlFor={`unitId${index}`}
                                >
                                  Giá Nhập
                                </label>
                                <div className="input-group input-group-merge">
                                  {(product.productImportDetails[index - 1].importPrice).toLocaleString("en-US")} đ
                                </div>
                              </div>
                              {product.productImportDetails[index - 1]
                                .productBatches.length === 0 ? (
                                <div></div>
                              ) : (
                                <div className="productimport-border">
                                  {product.productImportDetails[
                                    index - 1
                                  ].productBatches.map((productBatch) => {
                                    return (
                                      <div className="productimport">
                                        {" "}
                                        <div
                                          className="mb-3"
                                          style={{
                                            width: "30%",
                                            marginRight: 20,
                                          }}
                                        >
                                          <label
                                            className="form-label"
                                            htmlFor={`unitId${index}`}
                                          >
                                            Ngày sản xuất
                                          </label>
                                          <div className="input-group input-group-merge">
                                            <input
                                              type="date"
                                              id={`barCode${index}`}
                                              disabled="true"
                                              className="form-control"
                                              placeholder="Unit Id"
                                              aria-label="Unit Id"
                                              aria-describedby={`barCode${index}2`}
                                              value={
                                                productBatch.manufactureDate
                                                  ? new Date(
                                                    productBatch.manufactureDate
                                                  )
                                                    .toISOString()
                                                    .slice(0, 10)
                                                  : ""
                                              }
                                              onChange={(e) => {
                                                setProduct({
                                                  ...product,
                                                  productImportDetails: [
                                                    ...product.productImportDetails.slice(
                                                      0,
                                                      index - 1
                                                    ),
                                                    {
                                                      ...product
                                                        .productImportDetails[
                                                      index - 1
                                                      ],
                                                      productBatches: [
                                                        {
                                                          ...product
                                                            .productImportDetails[
                                                            index - 1
                                                          ].productBatches[0],
                                                          manufactureDate:
                                                            e.target.value,
                                                        },
                                                      ],
                                                    },
                                                    ...product.productImportDetails.slice(
                                                      index
                                                    ),
                                                  ],
                                                });
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div
                                          className="mb-3"
                                          style={{
                                            width: "30%",
                                            marginRight: 20,
                                          }}
                                        >
                                          <label
                                            className="form-label"
                                            htmlFor={`unitId${index}`}
                                          >
                                            Hạn sử dụng
                                          </label>
                                          <div className="input-group input-group-merge">
                                            <input
                                              type="date"
                                              disabled="true"
                                              id={`price${index}`}
                                              className="form-control"
                                              placeholder="Unit Id"
                                              aria-label="Unit Id"
                                              aria-describedby={`price${index}2`}
                                              value={
                                                productBatch.expireDate
                                                  ? new Date(
                                                    productBatch.expireDate
                                                  )
                                                    .toISOString()
                                                    .slice(0, 10)
                                                  : ""

                                                // ? new Date(
                                                //     product.productImportDetails[
                                                //       index - 1
                                                //     ].productBatches
                                                //       .map(
                                                //         (productBatch) =>
                                                //           productBatch.expireDate
                                                //       )
                                                //       .join(", ")
                                                //   )
                                                //     .toISOString()
                                                //     .substr(0, 10)
                                                // : ""
                                              }
                                              onChange={(e) => {
                                                setProduct({
                                                  ...product,
                                                  productImportDetails: [
                                                    ...product.productImportDetails.slice(
                                                      0,
                                                      index - 1
                                                    ),
                                                    {
                                                      ...product
                                                        .productImportDetails[
                                                      index - 1
                                                      ],
                                                      productBatches: [
                                                        {
                                                          ...product
                                                            .productImportDetails[
                                                            index - 1
                                                          ].productBatches[0],
                                                          expireDate:
                                                            e.target.value,
                                                        },
                                                      ],
                                                    },
                                                    ...product.productImportDetails.slice(
                                                      index
                                                    ),
                                                  ],
                                                });
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div
                                          className="mb-3"
                                          style={{
                                            width: "30%",
                                            marginRight: 20,
                                          }}
                                        >
                                          <label
                                            className="form-label"
                                            htmlFor="basic-icon-default-email"
                                          >
                                            số lượng sản phẩm lô
                                          </label>

                                          <div className="input-group input-group-merge">
                                            {productBatch.quantity}
                                          </div>
                                          <div className="form-text"></div>
                                        </div>
                                      </div>
                                    );
                                  })}{" "}
                                </div>
                              )}
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
                    <h5 className="mb-0">Thông tin chung</h5>
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
                          Ghi chú của quản lý
                        </label>
                        <div className="input-group input-group-merge">
                          {product.note}
                        </div>
                      </div>
                      <div className="mb-3" style={{ width: "100%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-company"
                        >
                          Tổng giá nhập của sản phẩm
                        </label>
                        <div className="input-group input-group-merge">
                          {(product.totalProductPrice).toLocaleString("en-US")} đ
                        </div>
                      </div>
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Thuế
                        </label>
                        <div className="input-group input-group-merge">
                          {(product.taxPrice).toLocaleString("en-US")} đ
                        </div>
                      </div>
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Phí ship
                        </label>
                        <div className="input-group input-group-merge">
                          {(product.totalShippingFee).toLocaleString("en-US")} đ
                        </div>
                      </div>

                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-company"
                        >
                          Tổng giá
                        </label>
                        <div className="input-group input-group-merge">
                          {(product.totalPrice).toLocaleString()} đ
                        </div>
                      </div>
                    </div>
                    {product.isReleased === true ? (
                      <div></div>
                    ) : (
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
                    )}
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
export default ViewImportProduct;
