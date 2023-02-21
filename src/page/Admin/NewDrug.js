import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarOwner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { Link } from "react-router-dom";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
} from "../../services/data.service";
import ReactPaginate from "react-paginate";

const NewDrug = () => {
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
    name: "",
    subCategoryId: "",
    manufacturerId: "",
    isPrescription: 0,
    isBatches: 0,
    productDetailModel: [
      {
        unitId: "",
        unitLevel: "",
        quantitative: "",
        sellQuantity: "",
        price: "",
        isSell: 0,
        isVisible: 0,
        barCode: "",
        imageURL: [
          {
            imageURL: "",
            isFirstImage: 1,
          },
        ],
      },
    ],
    descriptionModel: {
      effect: "",
      instruction: "",
      sideEffect: "",
      contraindications: "",
      preserve: "",
      ingredientModel: [
        {
          ingredientId: "",
          content: "",
          unitId: "",
        },
      ],
    },
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
        const path = "Product";
        const res = await createDataByPath(path, accessToken, data);
        console.log("Check res", res);
        console.log("display acc", accessToken);
        console.log("display", data);
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

  const handleAddIngredient = () => {
    setIngredientCount(ingredientCount + 1);
  };
  const handleAddUnit = () => {
    setProduct({
      ...product,
      productDetailModel: [
        ...product.productDetailModel,
        {
          unitId: "",
          unitLevel: "",
          quantitative: "",
          sellQuantity: 0,
          price: "",
          isVisible: 0,
          isSell: 0,
          imageURL: [{ imageURL: "", isFirstImage: 0 }],
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
        <div></div>
        <div className="layout-page" style={{ backgroundColor: "#f4f6fb" }}>
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
                  <h5 className="mb-0">Add new Drug</h5>
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
                        Tên Sản Phẩm
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
                              name: e.target.value,
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
                        Tên Loại Con Sản Phẩm
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
                              subCategoryId: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3" style={{ width: "100%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-phone"
                      >
                        Tên Nhà Sản Xuất
                      </label>
                      <div className="input-group input-group-merge">
                        <select
                          name="city"
                          id="basic-icon-default-email"
                          className="form-control"
                          onChange={(e) => handleManufactuner(e)}
                          value={manufactunerID}
                        >
                          {manufactuner &&
                            manufactuner.length &&
                            manufactuner.map((e, index) => {
                              return (
                                <>
                                  <option
                                    key={e.id}
                                    value={e.id}
                                    onChange={(e) =>
                                      setProduct((prevState) => ({
                                        ...prevState,
                                        manufacturerId: e.target.value,
                                      }))
                                    }
                                  >
                                    {e.manufacturerName}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                      </div>
                    </div>

                    <div className="col-md">
                      <small
                        className="text-light fw-semibold d-block"
                        style={{ color: "white" }}
                      >
                        Inline Checkboxes
                      </small>
                      <div className="form-check form-check-inline mt-3">
                        <input
                          style={{
                            height: 20,
                            width: 20,
                            backgroundColor: "#86a8c5",
                            borderColor: "#86a8c5",
                          }}
                          checked={isPrescription}
                          onChange={handlePrescriptionChange}
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox1"
                          defaultValue="option1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineCheckbox1"
                        >
                          Thuốc kê đơn
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          checked={isBatches}
                          onChange={handleBatchChange}
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox2"
                          defaultValue="option2"
                          style={{
                            height: 20,
                            width: 20,
                            backgroundColor: "#86a8c5",
                            borderColor: "#86a8c5",
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineCheckbox2"
                        >
                          Lô Hàng
                        </label>
                      </div>
                    </div>
                    <div className="mb-3" style={{ width: "95%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-company"
                      >
                        Công dung
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
                            setProduct({
                              ...product,
                              descriptionModel: {
                                ...product.descriptionModel,
                                effect: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3" style={{ width: "95%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-email"
                      >
                        Hướng dẫn sử dụng
                      </label>
                      <div className="input-group input-group-merge">
                        <input
                          type="text"
                          id="basic-icon-default-email"
                          className="form-control"
                          placeholder="Hướng dẫn sử dụng"
                          aria-label="Hướng dẫn sử dụng"
                          aria-describedby="basic-icon-default-email2"
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              descriptionModel: {
                                ...product.descriptionModel,
                                instruction: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="form-text"></div>
                    </div>
                    <div className="mb-3" style={{ width: "95%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-company"
                      >
                        Tác Dụng Phụ
                      </label>
                      <div className="input-group input-group-merge">
                        <input
                          type="text"
                          id="basic-icon-default-company"
                          className="form-control"
                          placeholder="Tác Dụng Phụ"
                          aria-label="Tác Dụng Phụ"
                          aria-describedby="basic-icon-default-company2"
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              descriptionModel: {
                                ...product.descriptionModel,
                                sideEffect: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3" style={{ width: "95%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-email"
                      >
                        Chống chỉ định
                      </label>
                      <div className="input-group input-group-merge">
                        <input
                          type="text"
                          id="basic-icon-default-email"
                          className="form-control"
                          placeholder="Chống chỉ định"
                          aria-label="Chống chỉ định"
                          aria-describedby="basic-icon-default-email2"
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              descriptionModel: {
                                ...product.descriptionModel,
                                contraindications: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="form-text"></div>
                    </div>
                    <div className="mb-3" style={{ width: "95%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-company"
                      >
                        Bảo quản
                      </label>
                      <div className="input-group input-group-merge">
                        <input
                          type="text"
                          id="basic-icon-default-company"
                          className="form-control"
                          placeholder=" Bảo quản"
                          aria-label=" Bảo quản"
                          aria-describedby="basic-icon-default-company2"
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              descriptionModel: {
                                ...product.descriptionModel,
                                preserve: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md"></div>

                    <div className="col-md"></div>
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
                  <h5 className="mb-0">Add new Drug</h5>
                </div>
                <div className="card-body">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      padding: 30,
                    }}
                  >
                    {Array.from({ length: unitCount }, (_, i) => i + 1).map(
                      (index) => (
                        <div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "auto auto",
                              padding: 30,
                            }}
                          >
                            <div
                              key={index}
                              className="mb-3"
                              style={{ width: "100%" }}
                            >
                              <label
                                className="form-label"
                                htmlFor="basic-icon-default-phone"
                              >
                                Unit Id đơn vị cho hàng
                              </label>
                              <div className="input-group input-group-merge">
                                <select
                                  name="city"
                                  id="basic-icon-default-email"
                                  className="form-control"
                                  onChange={(e) => handleUnit(e)}
                                  value={unitID}
                                >
                                  {unit &&
                                    unit.length &&
                                    unit.map((e, index) => {
                                      return (
                                        <>
                                          <option
                                            key={e.id}
                                            value={e.id}
                                            onChange={(e) =>
                                              setProduct({
                                                ...product,
                                                productDetailModel: [
                                                  ...product.productDetailModel.slice(
                                                    0,
                                                    index - 1
                                                  ),
                                                  {
                                                    ...product
                                                      .productDetailModel[
                                                      index - 1
                                                    ],
                                                    unitId: e.target.value,
                                                    unitLevel: index,
                                                  },
                                                  ...product.productDetailModel.slice(
                                                    index
                                                  ),
                                                ],
                                              })
                                            }
                                          >
                                            {e.unitName}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                            <div
                              key={index}
                              className="mb-3"
                              style={{ width: "95%" }}
                            >
                              <label
                                className="form-label"
                                htmlFor={`unitId${index}`}
                              >
                                Quantitative
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id={`quantitative${index}`}
                                  className="form-control"
                                  placeholder="Unit Id"
                                  aria-label="Unit Id"
                                  aria-describedby={`quantitative${index}2`}
                                  onChange={(e) =>
                                    setProduct({
                                      ...product,
                                      productDetailModel: [
                                        ...product.productDetailModel.slice(
                                          0,
                                          index - 1
                                        ),
                                        {
                                          ...product.productDetailModel[
                                            index - 1
                                          ],
                                          quantitative: e.target.value,
                                        },
                                        ...product.productDetailModel.slice(
                                          index
                                        ),
                                      ],
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div
                              key={index}
                              className="mb-3"
                              style={{ width: "95%" }}
                            >
                              <label
                                className="form-label"
                                htmlFor={`unitId${index}`}
                              >
                                Sell Quantity
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id={`sellQuantity${index}`}
                                  className="form-control"
                                  placeholder="Unit Id"
                                  aria-label="Unit Id"
                                  aria-describedby={`sellQuantity${index}2`}
                                  onChange={(e) =>
                                    setProduct({
                                      ...product,
                                      productDetailModel: [
                                        ...product.productDetailModel.slice(
                                          0,
                                          index - 1
                                        ),
                                        {
                                          ...product.productDetailModel[
                                            index - 1
                                          ],
                                          sellQuantity: e.target.value,
                                        },
                                        ...product.productDetailModel.slice(
                                          index
                                        ),
                                      ],
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div
                              key={index}
                              className="mb-3"
                              style={{ width: "95%" }}
                            >
                              <label
                                className="form-label"
                                htmlFor={`unitId${index}`}
                              >
                                Price
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id={`price${index}`}
                                  className="form-control"
                                  placeholder="Unit Id"
                                  aria-label="Unit Id"
                                  aria-describedby={`price${index}2`}
                                  onChange={(e) =>
                                    setProduct({
                                      ...product,
                                      productDetailModel: [
                                        ...product.productDetailModel.slice(
                                          0,
                                          index - 1
                                        ),
                                        {
                                          ...product.productDetailModel[
                                            index - 1
                                          ],
                                          price: e.target.value,
                                        },
                                        ...product.productDetailModel.slice(
                                          index
                                        ),
                                      ],
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div
                              key={index}
                              className="mb-3"
                              style={{ width: "95%" }}
                            >
                              <label
                                className="form-label"
                                htmlFor={`unitId${index}`}
                              >
                                BarCode
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id={`barCode${index}`}
                                  className="form-control"
                                  placeholder="Unit Id"
                                  aria-label="Unit Id"
                                  aria-describedby={`barCode${index}2`}
                                  onChange={(e) =>
                                    setProduct({
                                      ...product,
                                      productDetailModel: [
                                        ...product.productDetailModel.slice(
                                          0,
                                          index - 1
                                        ),
                                        {
                                          ...product.productDetailModel[
                                            index - 1
                                          ],
                                          barCode: e.target.value,
                                        },
                                        ...product.productDetailModel.slice(
                                          index
                                        ),
                                      ],
                                    })
                                  }
                                />
                              </div>

                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`isVisible${index}`}
                                  checked={
                                    product.productDetailModel[index - 1]
                                      .isVisible
                                  }
                                  onChange={(e) =>
                                    setProduct({
                                      ...product,
                                      productDetailModel: [
                                        ...product.productDetailModel.slice(
                                          0,
                                          index - 1
                                        ),
                                        {
                                          ...product.productDetailModel[
                                            index - 1
                                          ],
                                          isVisible: e.target.checked ? 1 : 0,
                                        },
                                        ...product.productDetailModel.slice(
                                          index
                                        ),
                                      ],
                                    })
                                  }
                                  defaultValue="option2"
                                  style={{
                                    height: 20,
                                    width: 20,
                                    backgroundColor: "#86a8c5",
                                    borderColor: "#86a8c5",
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`isSell${index}`}
                                >
                                  is Visible
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`isSell${index}`}
                                  checked={
                                    product.productDetailModel[index - 1].isSell
                                  }
                                  onChange={(e) =>
                                    setProduct({
                                      ...product,
                                      productDetailModel: [
                                        ...product.productDetailModel.slice(
                                          0,
                                          index - 1
                                        ),
                                        {
                                          ...product.productDetailModel[
                                            index - 1
                                          ],
                                          isSell: e.target.checked ? 1 : 0,
                                        },
                                        ...product.productDetailModel.slice(
                                          index
                                        ),
                                      ],
                                    })
                                  }
                                  defaultValue="option2"
                                  style={{
                                    height: 20,
                                    width: 20,
                                    backgroundColor: "#86a8c5",
                                    borderColor: "#86a8c5",
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`isSell${index}`}
                                >
                                  For sale
                                </label>
                              </div>

                              <div className="mb-3" style={{ width: "95%" }}>
                                <label
                                  className="form-label"
                                  htmlFor="basic-icon-default-email"
                                >
                                  Image
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
                                        productDetailModel: [
                                          ...product.productDetailModel.slice(
                                            0,
                                            index - 1
                                          ),
                                          {
                                            ...product.productDetailModel[
                                              index - 1
                                            ],
                                            imageURL: [
                                              {
                                                ...product.productDetailModel[
                                                  index - 1
                                                ].imageURL[0],
                                                imageURL: e.target.value,
                                              },
                                            ],
                                          },
                                          ...product.productDetailModel.slice(
                                            index
                                          ),
                                        ],
                                      });
                                    }}
                                  />
                                </div>

                                <div className="form-text"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <button
                    className="button-28"
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
                    onClick={handleAddUnit}
                  >
                    {" "}
                    them đơn vị
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
                  <h5 className="mb-0">Add new Drug</h5>
                </div>

                {Array.from({ length: ingredientCount }, (_, i) => i + 1).map(
                  (index) => (
                    <div>
                      <div className="card-body">
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "auto auto",
                            padding: 30,
                          }}
                        >
                          <div className="form-text"></div>
                          <div className="mb-3" style={{ width: "95%" }}>
                            <label
                              className="form-label"
                              htmlFor={`unitId${index}`}
                            >
                              unitId
                            </label>
                            <div className="input-group input-group-merge">
                              <select
                                name="city"
                                id="basic-icon-default-email"
                                className="form-control"
                                onChange={(e) => handleProductIngredient(e)}
                                value={productIngredientID}
                              >
                                {productIngredient &&
                                  productIngredient.length &&
                                  productIngredient.map((e, index) => {
                                    return (
                                      <>
                                        <option
                                          key={e.id}
                                          value={e.id}
                                          onChange={(e) =>
                                            setProduct({
                                              ...product,
                                              descriptionModel: {
                                                ...product.descriptionModel,
                                                ingredientModel: [
                                                  ...product.descriptionModel.ingredientModel.slice(
                                                    0,
                                                    index - 1
                                                  ),
                                                  {
                                                    ...product.descriptionModel
                                                      .ingredientModel[
                                                      index - 1
                                                    ],
                                                    ingredientId:
                                                      e.target.value,
                                                  },
                                                  ...product.descriptionModel.ingredientModel.slice(
                                                    index
                                                  ),
                                                ],
                                              },
                                            })
                                          }
                                        >
                                          {e.ingredientName}
                                        </option>
                                      </>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                          <div className="mb-3" style={{ width: "95%" }}>
                            <label
                              className="form-label"
                              htmlFor={`content${index}`}
                            >
                              content
                            </label>
                            <div className="input-group input-group-merge">
                              <input
                                type="text"
                                id={`content${index}`}
                                className="form-control"
                                placeholder="Phone Number"
                                aria-label="Phone Number"
                                aria-describedby={`content${index}2`}
                                onChange={(e) =>
                                  setProduct({
                                    ...product,
                                    descriptionModel: {
                                      ...product.descriptionModel,
                                      ingredientModel: [
                                        ...product.descriptionModel.ingredientModel.slice(
                                          0,
                                          index - 1
                                        ),
                                        {
                                          ...product.descriptionModel
                                            .ingredientModel[index - 1],
                                          content: e.target.value,
                                        },
                                        ...product.descriptionModel.ingredientModel.slice(
                                          index
                                        ),
                                      ],
                                    },
                                  })
                                }
                              />
                            </div>
                            <div className="form-text"></div>
                          </div>

                          <div className="mb-3" style={{ width: "95%" }}>
                            <label
                              className="form-label"
                              htmlFor={`unitId${index}`}
                            >
                              unitId
                            </label>
                            <div className="input-group input-group-merge">
                              <select
                                name="city"
                                id="basic-icon-default-email"
                                className="form-control"
                                onChange={(e) => handleUnit2(e)}
                                value={unitID2}
                              >
                                {unit2 &&
                                  unit2.length &&
                                  unit2.map((e, index) => {
                                    return (
                                      <>
                                        <option
                                          key={e.id}
                                          value={e.id}
                                          onChange={(e) =>
                                            setProduct({
                                              ...product,
                                              descriptionModel: {
                                                ...product.descriptionModel,
                                                ingredientModel: [
                                                  ...product.descriptionModel.ingredientModel.slice(
                                                    0,
                                                    index - 1
                                                  ),
                                                  {
                                                    ...product.descriptionModel
                                                      .ingredientModel[
                                                      index - 1
                                                    ],
                                                    unitId: e.target.value,
                                                  },
                                                  ...product.descriptionModel.ingredientModel.slice(
                                                    index
                                                  ),
                                                ],
                                              },
                                            })
                                          }
                                        >
                                          {e.unitName}
                                        </option>
                                      </>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  )
                )}
                 <button
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
                className="button-28"
                onClick={handleAddIngredient}
              >
                {" "}
                them nguyen lieu
              </button>
              </div>
             
            </div>
          </div>
        </div>

        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </div>
  );
};
export default NewDrug;
