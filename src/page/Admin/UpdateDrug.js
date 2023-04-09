import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import SideBar from "../sidebar/SideBarOwner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import {
  getDataByPath,
  updateDataByPath,

} from "../../services/data.service";
import axios from "axios";
const UpdateDrug = () => {
  const myId = localStorage.getItem("id");

  const [ingredientCount, setIngredientCount] = useState(1);
  const [unitCount, setUnitCount] = useState(1);
  const [imageInputCount, setImageInputCount] = useState(1);
  const [manufactuner, setManufactuner] = useState([]);
  const [manufactunerID, setManufactunerID] = useState("");
  const [productIngredient, setProductIngredient] = useState([]);
  const [productIngredientID, setProductIngredientID] = useState([]);

  const [unit, setUnit] = useState([]);
  const [unit2, setUnit2] = useState([]);


  const [isBatches, setIsBatches] = useState(false);
  const [isPrescription, setIsPrescription] = useState(false);
  const [unitID, setUnitID] = useState("");
  const [unitID2, setUnitID2] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryID, setSubCategoryID] = useState("");
  const [perPage, setPerPage] = useState(7);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    subCategoryId: "",
    manufacturerId: "",
    isPrescription: 0,
    userTarget: "",
    productDetailModel: [
      {
        id: "",
        sellQuantity: "",
        price: "",
        isSell: 0,
        isVisible: 0,
        barCode: "",
      },
    ],
    descriptionModel: {
      id: "",
      effect: "",
      instruction: "",
      sideEffect: "",
      contraindications: "",
      preserve: "",
      ingredientModel: [{ id: "", ingredientId: "", content: "", unitId: "" }],
    },
    imageModels: [{ id: "", imageUrl: "", isFirstImage: true }],
  });
  async function loadDataDrugByID() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `Product/Update/${myId}`;
      const res = await getDataByPath(path, accessToken, "");

      if (res !== null && res !== undefined && res.status === 200) {
        setProduct(res.data);
        console.log("display", res.data);
        setUnitCount(res.data.productDetailModel.length);
        setIngredientCount(res.data.descriptionModel.ingredientModel.length);
        setImageInputCount(res.data.imageModels.length);
      }
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
  async function loadDataUnit() {
    const path = `Unit?pageIndex=1&pageItems=111`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setUnit(res.data.items);
    }
  }
  async function loadDataManufacturer() {
    const path = `Manufacturer?pageIndex=1&pageItems=100`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setManufactuner(res.data.items);
    }
  }
  async function loadDataProductIngredient() {
    const path = `ProductIngredient?pageIndex=1&pageItems=100`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setProductIngredient(res.data.items);
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
  const handleProductIngredient = (event) => {
    event.preventDefault();
    const productIngredientID = event.target.value;
    setProductIngredientID(productIngredientID);
  };
  async function loadDataUnit2() {
    const path = `Unit?pageIndex=1&pageItems=100`;
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
    console.log("display", event.target.value);
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
  const [userUsage, setUserUsage] = useState([]);
  const userUsages = [
    { name: "trẻ em", value: 1 },
    { name: "người lớn", value: 2 },
    { name: "người cao tuổi", value: 3 },
    { name: "phụ nữ cho con bú", value: 4 },
    { name: "mọi lứa tuổi", value: "" },
  ];
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

  async function updateProducts() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");

      const selectedImageIndex = product.imageModels.findIndex(
        (image) => image.isFirstImage !== null
      );
      const data = {
        // product
        ...product,
        imageModels: product.imageModels.map((image, index) => ({
          ...image,
          isFirstImage: index === selectedImageIndex,
        })),
      };
      const path = `Product`;
      const res = await updateDataByPath(path, accessToken, data);
      // console.log("display", data.homeAddress);
      if (res && res.status === 200) {
        Swal.fire("Update successfully!", "", "success");
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
        setProduct({
          ...product,
          imageModels: [
            ...product.imageModels.slice(0, index - 1),
            {
              ...product.imageModels[index - 1],
              imageUrl: res.data,
            },
            ...product.imageModels.slice(index),
          ],
        });
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
    loadDataDrugByID();
  }, []);
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
          sellQuantity: 0,
          price: "",
          isVisible: 0,
          isSell: 0,
          imageModels: [{ id: "", imageUrl: "", isFirstImage: 1 }],
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
                  <h5 className="mb-0">Cập nhật sản phẩm</h5>
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
                          value={product.name}
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
                        <select
                          name="city"
                          id="basic-icon-default-email"
                          className="form-control"
                          onChange={(e) => {
                            handleSubCategory(e);

                            setProduct((prevState) => ({
                              ...prevState,
                              subCategoryId: e.target.value,
                            }));
                          }}
                          value={product.subCategoryId}
                        >
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
                          value={product.manufacturerId}
                        >
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
                    <div className="mb-3" style={{ width: "100%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-company"
                      >
                        Đối Tượng Dùng Sản Phẩm
                      </label>

                      <div className="input-group input-group-merge">
                        <select
                          name="city"
                          id="basic-icon-default-email"
                          className="form-control"
                          onChange={(e) => {
                            // handleUserTarget(e);
                            // setUserUsageSelected(true);
                            setProduct((prevState) => ({
                              ...prevState,
                              userTarget: e.target.value,
                            }));
                          }}
                          value={product.userTarget}
                        >
                          {/* {!userUsageSelected && (
                              <option value="">--Chọn Đối Tượng</option>
                            )} */}
                          {userUsages &&
                            userUsages.length &&
                            userUsages.map((e, index) => {
                              return (
                                <>
                                  <option key={e.value} value={e.value}>
                                    {e.name}
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
                          checked={product.isPrescription}
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
                          checked={product.isBatches}
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

                    <div className="col-md"></div>

                    <div className="col-md"></div>
                  </div>

                  <button
                    type="submit"
                    className="button-28"
                    onClick={(e) => {
                      e.preventDefault();
                      updateProducts();
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
                          value={product.descriptionModel.effect}
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
                          value={product.descriptionModel.instruction}
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
                          value={product.descriptionModel.sideEffect}
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
                          value={product.descriptionModel.contraindications}
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
                          value={product.descriptionModel.preserve}
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
                  <h5 className="mb-0">Cập nhật đơn vị của sản phẩm</h5>
                </div>
                <div className="card-body">
                  {Array.from({ length: unitCount }, (_, i) => i + 1).map(
                    (index) => (
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
                            style={{ width: "20%", marginRight: 20 }}
                          >
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-phone"
                            >
                              đơn vị tính cho sản phẩm
                            </label>
                            <div className="input-group input-group-merge">
                              <select
                                name="city"
                                id="basic-icon-default-email"
                                className="form-control"
                                placeholder="đơn vị tính cho sản phẩm"
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
                                value={
                                  product.productDetailModel[index - 1].unitId
                                }
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
                              Định lượng
                            </label>
                            <div className="input-group input-group-merge">
                              <input
                                type="text"
                                id={`quantitative${index}`}
                                className="form-control"
                                placeholder="Định lượng"
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
                                value={
                                  product.productDetailModel[index - 1]
                                    .sellQuantity
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
                                placeholder="Giá"
                                aria-label="Unit Id"
                                aria-describedby={`price${index}2`}
                                value={
                                  product.productDetailModel[index - 1].price
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
                              Mã vạch
                            </label>
                            <div className="input-group input-group-merge">
                              <input
                                type="text"
                                id={`barCode${index}`}
                                className="form-control"
                                placeholder="Mã vạch"
                                aria-label="Unit Id"
                                aria-describedby={`barCode${index}2`}
                                value={
                                  product.productDetailModel[index - 1].barCode
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

                          <div
                            className="mb-3"
                            style={{ width: "20%", marginRight: 20 }}
                          >
                            <div className="form-check form-check-inline">
                              <small
                                className=" fw-semibold d-block"
                                style={{ color: "#fff" }}
                              >
                                Inline Checkboxes
                              </small>
                              <input
                                className="form-check-input"
                                type="hidden"
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
                              {/* <label
                                className="form-check-label"
                                htmlFor={`isSell${index}`}
                              >
                                is Visible
                              </label> */}
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
                          </div>
                        </div>
                        <hr />
                      </div>
                    )
                  )}

                  {/* <button
                    className="button-28"
                    style={{
                      height: 50,
                      width: 200,
                      fontSize: 13,
                      paddingRight: 20,
                      marginLeft: "44%",
                      marginBottom: "20px",
                      backgroundColor: "#fff",
                      border: "1px solid"
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
                    style={{marginRight:10}}
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    />
                  </svg>
                    {" "}
                    Thêm Đơn Vị Mới
                  </button> */}
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
                  <h5 className="mb-0">Cập nhật thành phần của sản phẩm</h5>
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
                          }}
                        >
                          <div className="form-text"></div>
                          <div
                            className="mb-3"
                            style={{ width: "30%", marginRight: 20 }}
                          >
                            <label
                              className="form-label"
                              htmlFor={`unitId${index}`}
                            >
                              Tên thành phần
                            </label>
                            <div className="input-group input-group-merge">
                              <select
                                name="city"
                                id="basic-icon-default-email"
                                className="form-control"
                                onChange={(e) => {
                                  handleProductIngredient(e);
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
                                          ingredientId: e.target.value,
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
                                  ].ingredientId
                                }
                              >
                                {productIngredient &&
                                  productIngredient.length &&
                                  productIngredient.map((e, index) => {
                                    return (
                                      <>
                                        <option key={e.id} value={e.id}>
                                          {e.ingredientName}
                                        </option>
                                      </>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                          <div
                            className="mb-3"
                            style={{ width: "30%", marginRight: 20 }}
                          >
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
                                value={
                                  product.descriptionModel.ingredientModel[
                                    index - 1
                                  ].content
                                }
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

                          <div
                            className="mb-3"
                            style={{ width: "30%", marginRight: 20 }}
                          >
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
                                onChange={(e) => {
                                  handleUnit2(e);
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
                    </div>
                  )
                )}
                {/* <button
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
                </button> */}
              </div>
            </div>
          </div>
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
                    <h5 className="mb-0">Thêm Ảnh Cho Sản Phẩm</h5>
                  </div>
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
                        <div style={{ marginBottom: 200 }}>
                          <label
                            style={{ marginBottom: 60, marginLeft: 30 }}
                            className="form-label"
                            htmlFor="basic-icon-default-email"
                          >
                            Sửa Hình Ảnh
                          </label>
                          <div
                            className="mb-3"
                            style={{ width: "20%", marginRight: 20 }}
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

                                {product.imageModels[index - 1].imageUrl ? (
                                  <img
                                    style={{ objectFit: "cover" }}
                                    src={
                                      product.imageModels[index - 1].imageUrl
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

                              marginLeft: 21,
                            }}
                          >
                            <div>
                              <button
                                style={{ marginTop: 390 }}
                                className={`button-img ${
                                  product.imageModels[index - 1].isFirstImage
                                    ? "active-img"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  const newImageModel = [
                                    ...product.imageModels,
                                  ];
                                  newImageModel.forEach((image, i) => {
                                    newImageModel[i].isFirstImage =
                                      i === index - 1 ? true : null;
                                  });
                                  setProduct({
                                    ...product,
                                    imageModels: newImageModel,
                                  });
                                  console.log("display", product);
                                }}
                              >
                                {product.imageModels[index - 1].isFirstImage
                                  ? "First Image"
                                  : "Set as First"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
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
export default UpdateDrug;
