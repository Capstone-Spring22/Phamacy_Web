import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import SideBar from "../sidebar/SideBarOwner";
import Creatable, { useCreatable } from "react-select/creatable";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { Link } from "react-router-dom";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
} from "../../services/data.service";
import axios from "axios";
import ReactPaginate from "react-paginate";

const NewDrug = () => {
  const [ingredientCount, setIngredientCount] = useState(1);
  const [unitCount, setUnitCount] = useState(1);
  const [imageInputCount, setImageInputCount] = useState(1);
  const [manufactuner, setManufactuner] = useState([]);
  const [manufactunerId, setManufactunerId] = useState("");
  const [productIngredient, setProductIngredient] = useState([]);
  const [productIngredientID, setProductIngredientID] = useState([]);
  const [addUnit, setAddUnit] = useState(false);
  const [unit, setUnit] = useState([]);
  const [unit2, setUnit2] = useState([]);

  const [categorySelected, setCategorySelected] = useState(false);
  const [manufactunerSelected, setManufactunerSelected] = useState(false);
  const [isBatches, setIsBatches] = useState(false);
  const [isPrescription, setIsPrescription] = useState(false);
  const [unitID, setUnitID] = useState("");
  const [unitID2, setUnitID2] = useState("");
  const [isSell, setIsSell] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [newIngredient, setNewIngredient] = useState([]);
  const resDataRef = useRef(null);
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryID, setSubCategoryID] = useState("");
  const [changeImg, setChangeImg] = useState("");
  const [product, setProduct] = useState({
    name: "",
    subCategoryId: "",
    manufacturerId: "",
    isPrescription: 0,
    isBatches: 0,
    productDetailModel: [
      {
        unitId: "",
        unitLevel: 1,
        quantitative: 1,
        price: "",
        isSell: 0,
        barCode: "",
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
    imageModel: [
      {
        imageURL: "",
        isFirstImage: true,
      },
    ],
  });

  async function loadDataUnit() {
    const path = `Unit?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setUnit(res.data.items);
    }
  }

  async function loadDataCategory() {
    const path = `SubCategory?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setSubCategory(res.data.items);
    }
  }
  async function loadDataManufacturer() {
    const path = `Manufacturer?pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setManufactuner(res.data.items);
    }
  }
  useEffect(() => {
    loadDataCategory();
  }, [currentPage, perPage]);
  const handleSubCategory = (e) => {
    e.preventDefault();
    const subCategoryID = e.target.value;
    setSubCategoryID(subCategoryID);
    console.log("subCategoryID", subCategoryID);
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
  const handleManufactuner = (e) => {
    e.preventDefault();
    const manufactunerId = e.target.value;
    setManufactunerId(manufactunerId);
    console.log("manufactunerID", manufactunerId);
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
  const [selectedOption, setSelectedOption] = useState(null);
  {
    unit &&
      unit.length &&
      unit.map((e, index) => {
        return (
          <>
            <option key={e.id} value={e.id}>
              {e.unitName}
            </option>
          </>
        );
      });
  }
  const options = productIngredient.map((e) => ({
    label: e.ingredientName,
    value: e.id,
  }));
  async function createNewProducts() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (checkValidation()) {
        const selectedImageIndex = product.imageModel.findIndex(
          (image) => image.isFirstImage !== null
        );
        const data = {
          // product
          ...product,
          imageModel: product.imageModel.map((image, index) => ({
            ...image,
            isFirstImage: index === selectedImageIndex,
          })),
        };
        const path = "Product";
        const res = await createDataByPath(path, accessToken, data);
        console.log("Check res", res);
        console.log("display acc", accessToken);
        console.log("display", data);
        console.log("res", changeImg);
        if (res && res.status === 201) {
          Swal.fire("Create Success", "", "success");
          // window.location.reload();
        }
      }
    }
  }
  async function createNewURL(e, index) {
    if (checkValidation()) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);

      const res = await axios.post(
        "https://betterhealthapi.azurewebsites.net/api/v1/Utility/UploadFile",
        data
      );
      console.log("display", res.data);
      if (res && res.status === 200) {
        const newImageModel = [...product.imageModel];
        newImageModel[index - 1] = {
          ...newImageModel[index - 1],
          imageURL: res.data,
        };
        setProduct((prevState) => ({
          ...prevState,
          imageModel: newImageModel,
        }));
      }
    }
  }

  async function createNewIngredient(value) {
    console.log("display 123", value);

    if (checkValidation()) {
      const data = {
        ingredient_Name: value,
      };
      const path = "ProductIngredient";
      const res = await createDataByPath(path, "", data);
      console.log("Check res", res);

      if (res && res.status === 201) {
        loadDataProductIngredient();
        // window.location.reload();
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
    setProduct({
      ...product,
      descriptionModel: {
        ...product.descriptionModel,
        ingredientModel: [
          ...product.descriptionModel.ingredientModel,
          {
            ingredientId: "",
            content: "",
            unitId: "",
          },
        ],
      },
    });
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
          price: "",
          isSell: 0,
        },
      ],
    });
    setUnitCount(unitCount + 1);
  };
  const handleAddImage = () => {
    setProduct({
      ...product,
      imageModel: [...product.imageModel, { imageURL: "", isFirstImage: null }],
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
                    <h5 className="mb-0">Thêm Thuốc Mới</h5>
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
                          Tên Danh Mục Sản Phẩm
                        </label>

                        <div className="input-group input-group-merge">
                          <select
                            name="city"
                            id="basic-icon-default-email"
                            className="form-control"
                            onChange={(e) => {
                              handleSubCategory(e);
                              setCategorySelected(true);
                              setProduct((prevState) => ({
                                ...prevState,
                                subCategoryId: e.target.value,
                              }));
                            }}
                            value={product.subCategoryId}
                          >
                            {!categorySelected && (
                              <option value="">--- Chọn Danh Mục </option>
                            )}
                            {subCategory &&
                              subCategory.length &&
                              subCategory.map((e, index) => {
                                return (
                                  <>
                                    <option key={e.id} value={e.id}>
                                      {e.subCategoryName}
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
                          htmlFor="basic-icon-default-phone"
                        >
                          Tên Nhà Sản Xuất
                        </label>
                        <div className="input-group input-group-merge">
                          <select
                            name="city"
                            id="basic-icon-default-email"
                            className="form-control"
                            onChange={(e) => {
                              handleManufactuner(e);
                              setProduct((prevState) => ({
                                ...prevState,
                                manufacturerId: e.target.value,
                              }));
                            }}
                            value={product.manufactunerId}
                          >
                            {!manufactunerSelected && (
                              <option value="">--- Chọn Nhà Sản Xuất</option>
                            )}
                            {manufactuner &&
                              manufactuner.length &&
                              manufactuner.map((e, index) => {
                                return (
                                  <>
                                    <option key={e.id} value={e.id}>
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
                          className=" fw-semibold d-block"
                          style={{ color: "white" }}
                        >
                          Inline Checkboxes
                        </small>
                        <div className="form-check form-check-inline mt-3">
                          <input
                            style={{
                              height: 20,
                              width: 20,
                              backgroundColor: "#82AAE3",
                              borderColor: "#82AAE3",
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
                              backgroundColor: "#82AAE3",
                              borderColor: "#82AAE3",
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

                      <div className="col-md"></div>

                      <div className="col-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row "
              style={{ width: 1200, marginTop: 10, marginLeft: 25 }}
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
                    <h5 className="mb-0">Thêm Công Dụng Cho Sản Phẩm</h5>
                  </div>{" "}
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
                          htmlFor="basic-icon-default-company"
                        >
                          Công dung
                        </label>
                        <div className="input-group input-group-merge">
                          <textarea
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
                          <textarea
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
                          <textarea
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
                          <textarea
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
                          <textarea
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row "
              style={{ width: 1200, marginTop: 10, marginLeft: 25 }}
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
                    <h5 className="mb-0">Thêm Đơn Vị Mới </h5>
                  </div>{" "}
                  {Array.from({ length: unitCount }, (_, i) => i + 1).map(
                    (index) => (
                      <div key={index} className="card-body">
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
                              style={{ width: "20%", marginRight: 20 }}
                            >
                              <label
                                className="form-label"
                                htmlFor="basic-icon-default-phone"
                              >
                                Đơn vị cho hàng
                              </label>
                              <div className="input-group input-group-merge">
                                <select
                                  name="city"
                                  id="basic-icon-default-email"
                                  className="form-control"
                                  value={
                                    product.productDetailModel[index - 1].unitId
                                  }
                                  onChange={(e) => {
                                    handleUnit(e);
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
                                          unitId: e.target.value,
                                          unitLevel: index,
                                        },
                                        ...product.productDetailModel.slice(
                                          index
                                        ),
                                      ],
                                    });
                                  }}
                                >
                                  {unit &&
                                    unit.length &&
                                    unit.map((e, index) => {
                                      return (
                                        <>
                                          <option key={e.id} value={e.id}>
                                            {e.unitName}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                            <div
                              className="mb-3"
                              style={{ width: "20%", marginRight: 20 }}
                            >
                              <label
                                className="form-label"
                                htmlFor={`unitId${index}`}
                              >
                                định lượng
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id={`quantitative${index}`}
                                  className="form-control"
                                  placeholder="Định Lượng"
                                  aria-label="Unit Id"
                                  aria-describedby={`quantitative${index}2`}
                                  value={
                                    product.productDetailModel[index - 1]
                                      .quantitative
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
                                          quantitative:
                                            index === 1 ? "1" : e.target.value,
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
                            {/* <div
                              className="mb-3"
                              style={{ width: "20%", marginRight: 20 }}
                            >
                              <label
                                className="form-label"
                                htmlFor={`unitId${index}`}
                              >
                                Số lượng bán
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id={`sellQuantity${index}`}
                                  className="form-control"
                                  placeholder="Số lượng bán"
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
                            </div> */}
                            <div
                              className="mb-3"
                              style={{ width: "20%", marginRight: 20 }}
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
                              className="mb-3"
                              style={{ width: "20%", marginRight: 20 }}
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
                            </div>

                            <div className="mb-3" style={{ width: "20%" }}>
                              <div className="form-check form-check-inline">
                                <small
                                  className=" fw-semibold d-block"
                                  style={{ color: "#fff" }}
                                >
                                  Inline Checkboxes
                                </small>
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
                                    backgroundColor: "#82AAE3",
                                    borderColor: "#82AAE3",
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`isSell${index}`}
                                >
                                  For sale
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    )
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
                    Thêm Đơn Vị Mới
                  </button>
                </div>
              </div>
            </div>
            <div
              className="row "
              style={{ width: 1200, marginTop: 10, marginLeft: 25 }}
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
                    <h5 className="mb-0">Thêm Hình Ảnh</h5>
                  </div>

                  {Array.from({ length: ingredientCount }, (_, i) => i + 1).map(
                    (index) => (
                      <div>
                        <div className="card-body">
                          <div
                            style={{
                              display: "flex",
                              marginLeft: 100,
                              padding: 30,
                              flexWrap: "wrap",
                              marginTop: -30,
                              marginBottom: -40,
                            }}
                          >
                            <div className="form-text"></div>
                            <div
                              className="mb-3"
                              style={{ width: "30%", marginRight: 20 }}
                            >
                              <label
                                htmlFor="exampleDataList"
                                className="form-label"
                              >
                                TÊN NGUYÊN LIỆU
                              </label>
                              <Creatable
                                label={
                                  product.descriptionModel.ingredientModel[
                                    index - 1
                                  ].ingredientId
                                }
                                onCreateOption={(input) => {
                                  createNewIngredient(input);
                                }}
                                onChange={(selectedOption) => {
                                  setSelectedOption(selectedOption);
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
                                          ingredientId: selectedOption.value,
                                        },
                                        ...product.descriptionModel.ingredientModel.slice(
                                          index
                                        ),
                                      ],
                                    },
                                  });
                                }}
                                options={options}
                              />
                            </div>

                            <div
                              className="mb-3"
                              style={{ width: "30%", marginRight: 20 }}
                            >
                              <label
                                className="form-label"
                                htmlFor={`content${index}`}
                              >
                                DUNG TÍCH
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id={`content${index}`}
                                  className="form-control"
                                  placeholder="DUNG TÍCH"
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

                            <div className="mb-3" style={{ width: "30%" }}>
                              <label
                                className="form-label"
                                htmlFor={`unitId${index}`}
                              >
                                ĐƠN VỊ CHO DUNG TICH
                              </label>
                              <div className="input-group input-group-merge">
                                <select
                                  name="city"
                                  id="basic-icon-default-email"
                                  className="form-control"
                                  onChange={(e) => {
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
                                            unitId: e.target.value,
                                          },
                                          ...product.descriptionModel.ingredientModel.slice(
                                            index
                                          ),
                                        ],
                                      },
                                    });
                                  }}
                                  value={
                                    product.descriptionModel.ingredientModel[
                                      index - 1
                                    ].unitId
                                  }
                                >
                                  {unit2 &&
                                    unit2.length &&
                                    unit2.map((e, index) => {
                                      return (
                                        <>
                                          <option key={e.id} value={e.id}>
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
                        <hr />
                      </div>
                    )
                  )}
                  <button
                    style={{
                      height: 50,
                      width: 200,
                      fontSize: 13,
                      paddingTop: 1,
                      marginLeft: "44%",
                      marginBottom: "20px",
                      backgroundColor: "#fff",
                    }}
                    className="button-28"
                    onClick={handleAddIngredient}
                  >
                    {" "}
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
                    </svg>
                    them nguyen lieu
                  </button>
                </div>
              </div>
            </div>{" "}
            <div>
              <div
                className="row "
                style={{ width: 1200, marginTop: 10, marginLeft: 25 }}
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
                      <h5 className="mb-0">Thêm Nguyên Liệu Cho Sản Phẩm</h5>
                    </div>

                    <div>
                      <div className="card-body">
                        <div
                          style={{
                            display: "flex",

                            padding: 70,
                            marginBottom: -199,
                            flexWrap: "wrap",
                          }}
                        >
                          {Array.from(
                            { length: imageInputCount },
                            (_, i) => i + 1
                          ).map((index) => (
                            <div
                              style={{  marginBottom: 200 }}
                            >
                              <label
                                style={{ marginBottom: 60, marginLeft: 30 }}
                                className="form-label"
                                htmlFor="basic-icon-default-email"
                              >
                                Thêm Hình Ảnh
                              </label>
                              <div
                                className="mb-3"
                                style={{
                                  width: "30%",
                                  marginRight: 20,
                                
                                }}
                              >
                                <div
                                  className="input-group input-group-merge"
                                  style={{ marginBottom: -250 }}
                                >
                                  <form className="form1" method="POST">
                                    <input
                                      style={{ marginBottom: 100 }}
                                      type="file"
                                      multiple
                                      onChange={(e) => createNewURL(e, index)}
                                    />

                                    {product.imageModel[index - 1].imageURL ? (
                                      <img
                                        src={
                                          product.imageModel[index - 1].imageURL
                                        }
                                      />
                                    ) : (
                                      <img src="https://media.istockphoto.com/id/1165482953/vector/picture-icon-vector-photo-gallery-icon-on-a-white-background-black-and-white.jpg?s=170x170&k=20&c=jKfPYRfAkoYKeW01wMivX6adqzT1maHpW70XiufNpg0=" />
                                    )}
                                  </form>
                                </div>
                              </div>
                              <div
                                className="mb-3"
                                style={{
                                  width: "30%",
                                 
                                  marginLeft:35
                                }}
                              >
                                <div>
                                  <button
                                  style={{ marginTop:390,}}
                                    className={`button-img ${
                                      product.imageModel[index - 1]
                                        .isFirstImage 
                                        ? "active-img "
                                        : ""
                                    }`}
                                    onClick={(e) => {
                                      const newImageModel = [
                                        ...product.imageModel,
                                      ];
                                      newImageModel.forEach((image, i) => {
                                        newImageModel[i].isFirstImage =
                                          i === index - 1 ? index - 1 : null;
                                      });
                                      setProduct({
                                        ...product,
                                        imageModel: newImageModel,
                                      });
                                    }}
                                  >
                                    
                                       {product.imageModel[index - 1].isFirstImage ? 'First Image' : 'Set as First'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      style={{
                        height: 50,
                        width: 200,
                        fontSize: 13,
                        paddingTop: 1,
                        marginLeft: "44%",
                        marginBottom: "20px",
                        backgroundColor: "#fff",
                      }}
                      className="button-28"
                      onClick={handleAddImage}
                    >
                      {" "}
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
                      </svg>
                      thêm ảnh
                    </button>
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
                        marginTop: "-40px",
                        backgroundColor: "#82AAE3",
                        color: "white",
                        marginBottom: 30,
                      }}
                    >
                      LƯU
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
export default NewDrug;
