import { useEffect, useState } from "react";
import React, { Fragment } from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarManager";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { Link } from "react-router-dom";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
} from "../../services/data.service";
import ReactPaginate from "react-paginate";

const AddImportProduct = () => {
  const [ingredientCount, setIngredientCount] = useState(1);
  const [unitCount, setUnitCount] = useState(1);
  const [imageInputCount, setImageInputCount] = useState(1);
  const [manufactuner, setManufactuner] = useState([]);
  const [manufactunerID, setManufactunerID] = useState([]);
  const [productIngredient, setProductIngredient] = useState([]);
  const [productIngredientID, setProductIngredientID] = useState([]);
  const [addUnit, setAddUnit] = useState(false);
  const [unit, setUnit] = useState([]);
  const [unit2, setUnit2] = useState([]);
  const [addNewUnit, setAddnewUnit] = useState(false);
  const [addNewUnit2, setAddnewUnit2] = useState(false);
  const [isBatches, setIsBatches] = useState(false);
  const [isPrescription, setIsPrescription] = useState(false);
  const [unitID, setUnitID] = useState("");
  const [unitID2, setUnitID2] = useState("");
  const [isSell, setIsSell] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);

  const [product, setProduct] = useState({
    productImportDetails: [
      {
        productId: "",
        quantity: 0,
        importPrice: 0,
        productBatches: [
          {
            quantity: 0,
            manufactureDate: "",
            expireDate: "",
          },
        ],
      },
    ],
    note: "",
    totalProductPrice: 0,
    taxPrice: 0,
    totalShippingFee: 0,
    totalPrice: 0,
    isReleased: false,
  });
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
  const addProductBatch = () => {
    setProduct({
      ...product,
      productImportDetails: product.productImportDetails.map((detail) => {
        return {
          ...detail,
          productBatches: [
            ...detail.productBatches,
            {
              quantity: 0,
              manufactureDate: "",
              expireDate: "",
            },
          ],
        };
      }),
    });
  };
  async function loadDataProductIngredient() {
    const path = `ProductIngredient?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setProductIngredient(res.data.items);
    }
  }
  const handleProductIngredient = (event) => {
    event.preventDefault();
    const productIngredientID = event.target.value;
    setProductIngredientID(productIngredientID);
  };
  async function loadDataUnit2() {
    const path = `Unit?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setUnit2(res.data.items);
    }
  }
  const handleUnit = (event) => {
    event.preventDefault();
    const unitID = event.target.value;
    setUnitID(unitID);
  };
  const handleUnit2 = (event) => {
    event.preventDefault();
    const unitID2 = event.target.value;
    setUnitID2(unitID2);
  };
  const handleManufactuner = (event) => {
    event.preventDefault();
    const manufactunerID = event.target.value;
    setManufactunerID(manufactunerID);
  };
  const handleBatchChange = (event) => {
    setIsBatches(event.target.checked);

    // Lấy giá trị cho batch tại đây
    if (event.target.checked) {
      setProduct((prevState) => ({
        ...prevState,
        isBatches: 1,
      }));
    } else {
      setProduct((prevState) => ({
        ...prevState,
        isBatches: 0,
      }));
    }
  };
  const handlePrescriptionChange = (event) => {
    setIsPrescription(event.target.checked);

    // Lấy giá trị cho batch tại đây
    if (event.target.checked) {
      setProduct((prevState) => ({
        ...prevState,
        isPrescription: 1,
      }));
    } else {
      setProduct((prevState) => ({
        ...prevState,
        isPrescription: 0,
      }));
    }
  };

  async function createNewProducts() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (checkValidation()) {
        const data = product;
        const path = "ProductImport";
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
  }, []);
  useEffect(() => {
    loadDataUnit2();
  }, []);
  useEffect(() => {
    loadDataManufacturer();
  }, []);
  useEffect(() => {
    loadDataProductIngredient();
  }, []);
  const [numBatches, setNumBatches] = useState(1);

  const handleAddUnit = () => {
    setProduct({
      ...product,
      productImportDetails: [
        ...product.productImportDetails,
        {
          productId: "",
          quantity: 0,
          importPrice: 0,
          productBatches: [
            {
              quantity: 0,
              manufactureDate: "",
              expireDate: "",
            },
          ],
        },
      ],
    });
    setUnitCount(unitCount + 1);
  };
  const handleAddImage = () => {
    setProduct({
      ...product,
      productDetailModel: [
        ...product.productDetailModel,
        {
          imageURL: [{ imageURL: "", isFirstImage: 0 }],
        },
      ],
    });
    setImageInputCount(imageInputCount + 1);
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
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* Place this tag where you want the button to render. */}
                <li className="nav-item lh-1 me-3">
                  <a
                    className="github-button"
                    href="https://github.com/themeselection/sneat-html-admin-template-free"
                    data-icon="octicon-star"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                  >
                    Star
                  </a>
                </li>
                {/* User */}

                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <Link
                    className="nav-link dropdown-toggle hide-arrow"
                    to="/Profile"
                    data-bs-toggle="dropdown"
                  >
                    <div className="avatar avatar-online">
                      <img
                        src="https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg"
                        alt=""
                        className="w-px-40 h-auto rounded-circle"
                      />
                    </div>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <img
                                src="../assets/img/avatars/1.png"
                                alt=""
                                className="w-px-40 h-auto rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">
                              John Doe
                            </span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-user me-2" />
                        <span className="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-cog me-2" />
                        <span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="d-flex align-items-center align-middle">
                          <i className="flex-shrink-0 bx bx-credit-card me-2" />
                          <span className="flex-grow-1 align-middle">
                            Billing
                          </span>
                          <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                            4
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="auth-login-basic.html">
                        <i className="bx bx-power-off me-2" />
                        <span className="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>

                {/*/ User */}
              </ul>
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
                    <h5 className="mb-0">Add new Import Product</h5>
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
                          Ghi chú
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            className="form-control"
                            id="basic-icon-default-fullname"
                            placeholder="Tên Sản Phẩm"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
                            onChange={(e) =>
                              setProduct((prevState) => ({
                                ...prevState,
                                note: e.target.value,
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
                          Tổng giá sản phẩm
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder="Tên Loại Con Sản Phẩm"
                            aria-label="Tên Loại Con Sản Phẩm"
                            aria-describedby="basic-icon-default-company2"
                            onChange={(e) =>
                              setProduct((prevState) => ({
                                ...prevState,
                                totalProductPrice: e.target.value,
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
                          Thuế
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            name="city"
                            id="basic-icon-default-email"
                            className="form-control"
                            onChange={(e) =>
                              setProduct((prevState) => ({
                                ...prevState,
                                taxPrice: e.target.value,
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
                          Phí ship
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            name="city"
                            id="basic-icon-default-email"
                            className="form-control"
                            onChange={(e) =>
                              setProduct((prevState) => ({
                                ...prevState,
                                totalShippingFee: e.target.value,
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
                          Tổng giá
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder="Công dung"
                            aria-label="Công dung"
                            aria-describedby="basic-icon-default-company2"
                            onChange={(e) =>
                              setProduct((prevState) => ({
                                ...prevState,
                                totalPrice: e.target.value,
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
                      Save
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
                      const currentNumBatches =
                        product.productImportDetails[index - 1]?.productBatches
                          ?.length || 0;
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
                                  Id sản phẩm
                                </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    name="city"
                                    id="basic-icon-default-email"
                                    className="form-control"
                                    onChange={(e) => {
                                      setProduct({
                                        ...product,
                                        productImportDetails: [
                                          ...product.productImportDetails.slice(
                                            0,
                                            index - 1
                                          ),
                                          {
                                            ...product.productImportDetails[
                                              index - 1
                                            ],
                                            productId: e.target.value,
                                          },
                                          ...product.productImportDetails.slice(
                                            index
                                          ),
                                        ],
                                      });
                                    }}
                                  ></input>
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
                                  <input
                                    type="text"
                                    id={`quantitative${index}`}
                                    className="form-control"
                                    placeholder="Định Lượng"
                                    aria-label="Unit Id"
                                    aria-describedby={`quantitative${index}2`}
                                    onChange={(e) => {
                                      setProduct({
                                        ...product,
                                        productImportDetails: [
                                          ...product.productImportDetails.slice(
                                            0,
                                            index - 1
                                          ),
                                          {
                                            ...product.productImportDetails[
                                              index - 1
                                            ],
                                            quantity: e.target.value,
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
                                style={{ width: "30%", marginRight: 20 }}
                              >
                                <label
                                  className="form-label"
                                  htmlFor={`unitId${index}`}
                                >
                                  Giá
                                </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    type="text"
                                    id={`sellQuantity${index}`}
                                    className="form-control"
                                    placeholder="Số lượng bán"
                                    aria-label="Unit Id"
                                    aria-describedby={`sellQuantity${index}2`}
                                    onChange={(e) => {
                                      setProduct({
                                        ...product,
                                        productImportDetails: [
                                          ...product.productImportDetails.slice(
                                            0,
                                            index - 1
                                          ),
                                          {
                                            ...product.productImportDetails[
                                              index - 1
                                            ],
                                            importPrice: e.target.value,
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

                              {Array.from(
                                { length: currentNumBatches },
                                (_, j) => j + 1
                              ).map((batchIndex) => (
                                <React.Fragment key={`${index}-${batchIndex}`}>
                                  {" "}
                                  <div
                                    className="mb-3"
                                    style={{ width: "30%", marginRight: 20 }}
                                  >
                                    <label className="form-label">
                                      Hạn sử dụng
                                    </label>
                                    <div className="input-group input-group-merge">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="expireDate"
                                        aria-label="expireDate"
                                        onChange={(e) => {
                                          setProduct({
                                            ...product,
                                            productImportDetails: [
                                              ...product.productImportDetails.slice(
                                                0,
                                                index - 1
                                              ),
                                              {
                                                ...product.productImportDetails[
                                                  index - 1
                                                ],
                                                productBatches: [
                                                  ...product.productImportDetails[
                                                    index - 1
                                                  ].productBatches.slice(
                                                    0,
                                                    batchIndex - 1
                                                  ),
                                                  {
                                                    ...product
                                                      .productImportDetails[
                                                      index - 1
                                                    ].productBatches[
                                                      batchIndex - 1
                                                    ],
                                                    expireDate: e.target.value,
                                                  },
                                                  ...product.productImportDetails[
                                                    index - 1
                                                  ].productBatches.slice(
                                                    batchIndex
                                                  ),
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
                                    style={{ width: "30%", marginRight: 20 }}
                                  >
                                    <label className="form-label">
                                      Ngày sản xuất
                                    </label>
                                    <div className="input-group input-group-merge">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="manufactureDate"
                                        aria-label="Unit Id"
                                        onChange={(e) => {
                                          setProduct({
                                            ...product,
                                            productImportDetails: [
                                              ...product.productImportDetails.slice(
                                                0,
                                                index - 1
                                              ),
                                              {
                                                ...product.productImportDetails[
                                                  index - 1
                                                ],
                                                productBatches: [
                                                  ...product.productImportDetails[
                                                    index - 1
                                                  ].productBatches.slice(
                                                    0,
                                                    batchIndex - 1
                                                  ),
                                                  {
                                                    ...product
                                                      .productImportDetails[
                                                      index - 1
                                                    ].productBatches[
                                                      batchIndex - 1
                                                    ],
                                                    manufactureDate:
                                                      e.target.value,
                                                  },
                                                  ...product.productImportDetails[
                                                    index - 1
                                                  ].productBatches.slice(
                                                    batchIndex
                                                  ),
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
                                    style={{ width: "30%", marginRight: 20 }}
                                  >
                                    <label
                                      className="form-label"
                                      htmlFor="basic-icon-default-email"
                                    >
                                      số lượng sản phẩm lô
                                    </label>
                                    <div className="input-group input-group-merge">
                                      <input
                                        type="text"
                                        id="basic-icon-default-email"
                                        className="form-control"
                                        placeholder="Phone Number"
                                        aria-label="Phone Number"
                                        aria-describedby="basic-icon-default-email2"
                                        onChange={(e) => {
                                          setProduct({
                                            ...product,
                                            productImportDetails: [
                                              ...product.productImportDetails.slice(
                                                0,
                                                index - 1
                                              ),
                                              {
                                                ...product.productImportDetails[
                                                  index - 1
                                                ],
                                                productBatches: [
                                                  ...product.productImportDetails[
                                                    index - 1
                                                  ].productBatches.slice(
                                                    0,
                                                    batchIndex - 1
                                                  ),
                                                  {
                                                    ...product
                                                      .productImportDetails[
                                                      index - 1
                                                    ].productBatches[
                                                      batchIndex - 1
                                                    ],
                                                    quantity: e.target.value,
                                                  },
                                                  ...product.productImportDetails[
                                                    index - 1
                                                  ].productBatches.slice(
                                                    batchIndex
                                                  ),
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

                                    <div className="form-text"></div>
                                  </div>
                                </React.Fragment>
                              ))}
                              <button
                              className="button-batches"
                                onClick={() => {
                                  setProduct({
                                    ...product,
                                    productImportDetails: [
                                      ...product.productImportDetails.slice(
                                        0,
                                        index - 1
                                      ),
                                      {
                                        ...product.productImportDetails[
                                          index - 1
                                        ],
                                        productBatches: [
                                          ...product.productImportDetails[
                                            index - 1
                                          ].productBatches,
                                          {
                                            // Khởi tạo giá trị mặc định cho trường mới
                                            quantity: "",
                                            manufactureDate: "",
                                            expireDate: "",
                                          },
                                        ],
                                      },
                                      ...product.productImportDetails.slice(
                                        index
                                      ),
                                    ],
                                  });
                                }}
                              >
                             +
                              </button>
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
export default AddImportProduct;
