import { useEffect, useState } from "react";
import React, { Fragment } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
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
import AddProductCard from "./components/AddProductCard";

const AddImportProduct = () => {
  const [ingredientCount, setIngredientCount] = useState(1);
  const [unitCount, setUnitCount] = useState(1);
  const [imageInputCount, setImageInputCount] = useState(1);
  const [manufactuner, setManufactuner] = useState([]);
  const [manufactunerID, setManufactunerID] = useState([]);
  const [indexUnit, setIndexUnit] = useState(0);
  const [countQuantity, setCountQuantity] = useState(0);
  const [countprice, setcountPrice] = useState(0);

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
  const [productID, setProductID] = useState("");
  const [isSell, setIsSell] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [drug, setDrug] = useState([]);
  const [drugId, setDrugId] = useState("");
  const [totalRecord, setTotalRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productRef, setProductRef] = useState([]);
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
  // const options = () => {
  //   if(drug == null){

  //   }else{
  //     drug.map((e)=>({
  //       label: e.name,
  //       value: e.id,
  //     }))
  //   }

  // };

  async function loadDataProductIngredient() {
    const path = `ProductIngredient?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setProductIngredient(res.data.items);
    }
  }
  const handleProduct = (event) => {
    event.preventDefault();
    const productID = event.target.value;
    setProductID(productID);
  };
  async function loadDataUnit2() {
    const path = `Unit?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setUnit2(res.data.items);
    }
  }

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

  async function loadDataDrug() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Product?pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("display", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
        setTotalRecord(res.data.totalRecord);
        console.log("display", currentPage);
      }
    }
  }
  async function loadDataDrugID(id) {
    // if (localStorage && localStorage.getItem("accessToken")) {
    //   const accessToken = localStorage.getItem("accessToken");
    //   console.log("Id", Id);
    //   const path = `Product/View/${Id}`;
    //   const res = await getDataByPath(path, accessToken, "");
    //   console.log("display", res);
    //   if (res !== null && res !== undefined && res.status === 200) {
    //     setProductRef(res.data.productUnitReferences);
    //   }
    // }
    console.log("display unit", id);
    setProductRef(id);
  }

  useEffect(() => {
    loadDataDrug();
  }, []);

  const options = drug.map((e) => ({
    label: e.name,
    value: e.id,
    unit: e.productUnitReferences,
  }));
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
    if (indexUnit === 0) {
    } else {
      handleAddQuantity(indexUnit);
    }
  }, [countQuantity]);

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
  useEffect(() => {
    setProduct({
      ...product,
      totalPrice:
        parseInt(product.totalProductPrice) +
        parseInt(product.taxPrice) +
        parseInt(product.totalShippingFee),
    });
  }, [product.totalProductPrice, product.taxPrice, product.totalShippingFee]);
  useEffect(() => {
    setProduct({
      ...product,
      totalProductPrice: product.productImportDetails.reduce(
        (total, curent) => total + curent.quantity * curent.importPrice,
        0
      ),
    });
  }, [countprice]);

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
  const [activeItem, setActiveItem] = useState("ImportProduct");
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
                    <h5 className="mb-0">Thêm Sản phẩm </h5>
                  </div>{" "}
                  {Array.from({ length: unitCount }, (_, i) => i + 1).map(
                    (index) => {
                      return (
                        <AddProductCard
                          key={index}
                          options={options}
                          setProduct={setProduct}
                          product={product}
                          index={index}
                          handleAddQuantityBatch={handleAddQuantityBatch}
                          setIndexUnit={setIndexUnit}
                          setCountQuantity={setCountQuantity}
                          drug={drug}
                          setcountPrice={setcountPrice}
                          
                        />
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
                    <h5 className="mb-0">Thêm Sản Phẩm Nhập Kho</h5>
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
                            placeholder="Ghi chú"
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
                            placeholder="Tổng giá sản phẩm"
                            aria-label="Tên Loại Con Sản Phẩm"
                            aria-describedby="basic-icon-default-company2"
                            value={product.totalProductPrice}
                            // onChange={(e) =>
                            //   setProduct((prevState) => ({
                            //     ...prevState,
                            //     totalProductPrice: e.target.value,
                            //   }))
                            // }
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
                            placeholder="Thuế"
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
                            placeholder="Phí ship"
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
                            placeholder="Tổng giá"
                            aria-label="Công dung"
                            aria-describedby="basic-icon-default-company2"
                            value={product.totalPrice}
                            // onChange={(e) =>
                            //   setProduct((prevState) => ({
                            //     ...prevState,
                            //     totalPrice: e.target.value,
                            //   }))
                            // }
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
                        height: 35,
                        width: 100,
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
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </div>
  );
};
export default AddImportProduct;
