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
    loadSellProduct: 1,
    isBatches: 0,
    productDetailModel: [
      {
        unitId: "",
        unitLevel: 1,
        quantitative: 1,
        sellQuantity: 1,
        price: "",
        isSell: 0,
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

  const handleSellChange = (event) => {
    setIsSell(event.target.checked);

    // Lấy giá trị cho batch tại đây
    if (event.target.checked) {
      setProduct({
        ...product,
        productDetailModel: [
          {
            ...product.productDetailModel[0],
            isSell: 1,
          },
          ...product.productDetailModel.slice(1),
        ],
      });
    } else {
      setProduct({
        ...product,
        productDetailModel: [
          {
            ...product.productDetailModel[0],
            isSell: 0,
          },
          ...product.productDetailModel.slice(1),
        ],
      });
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

  const updateProductDetailModel = (index, value) => {
    setProduct((prevProduct) => {
      const newProductDetailModel = [...prevProduct.productDetailModel];
      newProductDetailModel[index] = {
        ...newProductDetailModel[index],
        ...value,
      };
      return {
        ...prevProduct,
        productDetailModel: newProductDetailModel,
      };
    });
  };

  const handleInput1Change = (e) => {
    const price1 = e.target.value;
    updateProductDetailModel(0, { price: price1 });
  };
  // const handleInput2Change = (e) => {
  //   const price2 = e.target.value;
  //   updateProductDetailModel(1, { price: price2 });
  // };
  // // Sử dụng lại trong một hàm khác
  // const handleInput3Change = (e) => {
  //   const price3 = e.target.value;
  //   updateProductDetailModel(2, { price: price3 });
  // };
  const handleInput1ChangeBarCode = (e) => {
    const barCode1 = e.target.value;
    updateProductDetailModel(0, { barCode: barCode1 });
  };
  // const handleInput2ChangeBarCode = (e) => {
  //   const barCode2 = e.target.value;
  //   updateProductDetailModel(0, { barCode: barCode2 });
  // };
  // const handleInput3ChangeBarCode = (e) => {
  //   const barCode3 = e.target.value;
  //   updateProductDetailModel(0, { barCode: barCode3 });
  // };
  const handleInput1ChangeUnit = (e) => {
    const unitId1 = e.target.value;
    updateProductDetailModel(0, { unitId: unitId1 });
  };
  // const handleInput2ChangeUnit = (e) => {
  //   const unitId2 = e.target.value;
  //   updateProductDetailModel(1, { unitId: unitId2 });
  // };
  // const handleInput3ChangeUnit = (e) => {
  //   const unitId3 = e.target.value;
  //   updateProductDetailModel(1, { unitId: unitId3 });
  // };
  const handleImageURL1Change = (e) => {
    const imageURL1 = e.target.value;

    setProduct((prevState) => {
      const newProductDetailModel = [...prevState.productDetailModel];
      newProductDetailModel[0].imageURL = [
        {
          ...newProductDetailModel[0].imageURL[0],
          imageURL: imageURL1,
        },
      ];
      return {
        ...prevState,
        productDetailModel: newProductDetailModel,
      };
    });
  };

  //   const handleImageURL2Change = (e) => {
  //     const imageURL2 = e.target.value;
  //     setProduct({
  //       ...product,
  //       productDetailModel: [
  //         product.productDetailModel[0],
  //         {
  //           ...(product.productDetailModel[1] || {}), // Check if the element exists
  //           imageURL: [
  //             {
  //               ...(product.productDetailModel[1]?.imageURL?.[0] || {}), // Check if the property exists
  //               imageURL: imageURL2,
  //               isFirstImage: 0,
  //             },
  //           ],
  //         },
  //         ...(product.productDetailModel[2]
  //           ? [product.productDetailModel[2]]
  //           : []), // Add the element if it exists
  //       ],
  //     });
  //   };

  // const handleImageURL3Change = (e) => {
  //   const imageURL3 = e.target.value;
  //   setProduct({
  //     ...product,
  //     productDetailModel: [
  //       product.productDetailModel[0],
  //       product.productDetailModel[1],

  //       {
  //         ...(product.productDetailModel[2] || {}),

  //         imageURL: [
  //           ...(product.productDetailModel[2]?.imageURL || []),
  //           {
  //             imageURL: imageURL3,
  //             isFirstImage: 0,
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // };
  const handleImageURL1Change1 = (e) => {
    const imageURL1 = e.target.value;
    setProduct({
      ...product,
      productDetailModel: [
        {
          ...product.productDetailModel[0],
          imageURL: [
            {
              ...product.productDetailModel[0].imageURL[0],
              imageURL: imageURL1,
            },
          ],
        },
      ],
    });
  };

  // const handleImageURL2Change2 = (e) => {
  //   const imageURL2 = e.target.value;
  //   setProduct({
  //     ...product,
  //     productDetailModel: [
  //       {
  //         ...product.productDetailModel[0],
  //         imageURL: [
  //           ...product.productDetailModel[0].imageURL.slice(0, 1),
  //           {
  //             ...product.productDetailModel[0].imageURL[1],
  //             imageURL: imageURL2,
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // };

  // const handleImageURL3Change3 = (e) => {
  //   const imageURL3 = e.target.value;
  //   setProduct({
  //     ...product,
  //     productDetailModel: [
  //       {
  //         ...product.productDetailModel[0],
  //         imageURL: [
  //           ...product.productDetailModel[0].imageURL.slice(0, 2),
  //           {
  //             ...product.productDetailModel[0].imageURL[2],
  //             imageURL: imageURL3,
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // };
  // Load Product
  //   async function loadData() {
  //     if (localStorage && localStorage.getItem("accessToken")) {
  //       const accessToken = localStorage.getItem("accessToken");
  //     const path = `Product?isSellFirstLevel=true&pageIndex=${currentPage}&pageItems=${perPage}`;
  //     const res = await getDataByPath(path, accessToken, "");
  //     console.log("check1", res);
  //     if (res !== null && res !== undefined && res.status === 200) {
  //       setEmployees(res.data.items);
  //       setTotalEmployees(res.data.totalRecord);
  //     }
  //   }
  // }

  const genders = [
    { name: "Male", value: 0 },
    { name: "FeMale", value: 1 },
  ];
  const checkValidation = () => {
    // if (id.trim() === "") {
    //   Swal.fire("ID Can't Empty", "", "question");
    //   return false;
    // }
    return true;
  };
  const dataForCreate = () => {
    return {};
  };

  const handleButtonAdd = () => {
    if (addUnit) {
      return <label>add</label>;
    } else {
      return <label>cc</label>;
    }
  };

  // useEffect(() => {
  //   loadDataEmployee();
  // }, [currentPage, perPage]);
  const [inputs, setInputs] = useState([{ value: "" }]);
  useEffect(() => {
    loadDataUnit();
  }, []);
  useEffect(() => {
    loadDataUnit2();
  }, []);
  const handleAddInput = () => {
    setInputs([...inputs, { value: "" }]);
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

          {inputs.map((input, index) => (
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
                          Drug Name
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            className="form-control"
                            id="basic-icon-default-fullname"
                            placeholder="Name"
                            aria-label="John Doe"
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
                          SubCategory Name
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder="User Name"
                            aria-label="ACME Inc."
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
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-email"
                        >
                          Manufacturer Name
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-email"
                            className="form-control"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            aria-describedby="basic-icon-default-email2"
                            onChange={(e) =>
                              setProduct((prevState) => ({
                                ...prevState,
                                manufacturerId: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="form-text"></div>
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
                            Prescription
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
                            Batches
                          </label>
                        </div>
                      </div>
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-company"
                        >
                          effect
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder="User Name"
                            aria-label="ACME Inc."
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
                          instruction
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-email"
                            className="form-control"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
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
                          sideEffect
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder="User Name"
                            aria-label="ACME Inc."
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
                          contraindications
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-email"
                            className="form-control"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
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
                          preserve
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder="User Name"
                            aria-label="ACME Inc."
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
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-company"
                        >
                          ingredientId
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder="User Name"
                            aria-label="ACME Inc."
                            aria-describedby="basic-icon-default-company2"
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                descriptionModel: {
                                  ...product.descriptionModel,
                                  ingredientModel: [
                                    {
                                      ...product.descriptionModel
                                        .ingredientModel[0],
                                      ingredientId: e.target.value,
                                    },
                                    ...product.descriptionModel.ingredientModel.slice(
                                      1
                                    ),
                                  ],
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
                          content
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-email"
                            className="form-control"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            aria-describedby="basic-icon-default-email2"
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                descriptionModel: {
                                  ...product.descriptionModel,
                                  ingredientModel: [
                                    {
                                      ...product.descriptionModel
                                        .ingredientModel[0],
                                      content: e.target.value,
                                    },
                                    ...product.descriptionModel.ingredientModel.slice(
                                      1
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
                          htmlFor="basic-icon-default-phone"
                        >
                          Unit Nguyen lieu
                        </label>
                        <div className="input-group input-group-merge">
                          <select
                            name="unit"
                            id="basic-icon-default-email"
                            className="form-control"
                            onChange={(e) => {
                              setUnitID(e.target.value);
                              setProduct({
                                ...product,
                                descriptionModel: {
                                  ...product.descriptionModel,
                                  ingredientModel: [
                                    {
                                      ...product.descriptionModel
                                        .ingredientModel[0],
                                      unitId: e.target.value,
                                    },
                                    ...product.descriptionModel.ingredientModel.slice(
                                      1
                                    ),
                                  ],
                                },
                              });
                            }}
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
                                      onClick={() => {
                                        setUnit(e.id);
                                      }}
                                    >
                                      {e.unitName}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                      </div>

                      {/* <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-company"
                        >
                          ingredientId
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder="User Name"
                            aria-label="ACME Inc."
                            aria-describedby="basic-icon-default-company2"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-email"
                        >
                          content
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-email"
                            className="form-control"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            aria-describedby="basic-icon-default-email2"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="form-text"></div>
                      </div>
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-company"
                        >
                          unitId
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder="User Name"
                            aria-label="ACME Inc."
                            aria-describedby="basic-icon-default-company2"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div> */}

                     
                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-phone"
                        >
                          Unit
                        </label>
                        <div className="input-group input-group-merge">
                          <select
                            name="unit"
                            id="basic-icon-default-email"
                            className="form-control"
                            onChange={(e) => {
                              setUnitID2(e.target.value);
                              const unitId1 = e.target.value;
                              updateProductDetailModel(0, { unitId: unitId1 });
                            }}
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
                                      onClick={() => {
                                        setUnit2(e.id);
                                      }}
                                    >
                                      {e.unitName}
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
                          htmlFor="basic-icon-default-email"
                        >
                          Price
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-email"
                            className="form-control"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            aria-describedby="basic-icon-default-email2"
                            onChange={handleInput1Change}
                          />
                        </div>
                        <div className="form-text"></div>
                      </div>

                      {/* <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-email"
                        >
                          Giá trị quy đổi
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-email"
                            className="form-control"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            aria-describedby="basic-icon-default-email2"
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                productDetailModel: {
                                  ...product.productDetailModel,
                                  unitId: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="form-text"></div>
                      </div> */}

                      <div className="mb-3" style={{ width: "95%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-email"
                        >
                          BarCode
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-icon-default-email"
                            className="form-control"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            aria-describedby="basic-icon-default-email2"
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                productDetailModel: [
                                  {
                                    ...product.productDetailModel[0],
                                    barCode: e.target.value,
                                  },
                                  ...product.productDetailModel.slice(1),
                                ],
                              })
                            }
                          />
                        </div>
                        <div className="form-text"></div>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox2"
                          checked={isSell}
                          onChange={handleSellChange}
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
                            onChange={handleImageURL1Change}
                          />
                        </div>

                        <div className="form-text"></div>
                      </div>

                      <div className="col-md"></div>

                      <button
                        type="submit"
                        className="button-28"
                        style={{
                          height: 30,
                          width: 80,
                          fontSize: 13,
                          paddingTop: 5,

                          marginTop: "20px",
                        }}
                        onClick={() => setAddnewUnit(!addNewUnit)}
                      >
                        {addNewUnit ? <>-</> : <>+</>}
                      </button>

                      {/* lan 2*/}
                      {/* 
                      {addNewUnit && (
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-company"
                          >
                            Unit
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-company"
                              className="form-control"
                              placeholder="User Name"
                              aria-label="ACME Inc."
                              aria-describedby="basic-icon-default-company2"
                              onChange={handleInput3ChangeUnit}
                            />
                          </div>
                        </div>
                      )}

                      {addNewUnit && (
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-email"
                          >
                            Price
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-email"
                              className="form-control"
                              placeholder="Phone Number"
                              aria-label="Phone Number"
                              aria-describedby="basic-icon-default-email2"
                              onChange={handleInput2Change}
                            />
                          </div>
                          <div className="form-text"></div>
                        </div>
                      )} */}
                      {/* // {addNewUnit && (
                      //   <div className="mb-3" style={{ width: "95%" }}>
                      //     <label
                      //       className="form-label"
                      //       htmlFor="basic-icon-default-email"
                      //     >
                      //       Giá trị quy đổi
                      //     </label>
                      //     <div className="input-group input-group-merge">
                      //       <input
                      //         type="text"
                      //         id="basic-icon-default-email"
                      //         className="form-control"
                      //         placeholder="Phone Number"
                      //         aria-label="Phone Number"
                      //         aria-describedby="basic-icon-default-email2"
                      //         onChange={(e) => setPhone(e.target.value)}
                      //       />
                      //     </div>
                      //     <div className="form-text"></div>
                      //   </div>
                      // )} */}
                      {/* {addNewUnit && (
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-email"
                          >
                            BarCode
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-email"
                              className="form-control"
                              placeholder="Phone Number"
                              aria-label="Phone Number"
                              aria-describedby="basic-icon-default-email2"
                              onChange={handleInput2ChangeBarCode}
                            />
                          </div>
                          <div className="form-text"></div>
                        </div>
                      )}
                      {addNewUnit && (
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            checked={isSell}
                            onChange={handleSellChange}
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
                            For sale
                          </label>
                        </div>
                      )}
                      {addNewUnit && (
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
                              onChange={handleImageURL2Change}
                            />
                          </div>
                          <div className="form-text"></div>
                        </div>
                      )}

                      <div className="col-md"></div>
                      {addNewUnit && (
                        <button
                          type="submit"
                          className="button-28"
                          style={{
                            height: 30,
                            width: 80,
                            fontSize: 13,
                            paddingTop: 5,

                            marginTop: "20px",
                          }}
                          onClick={() => setAddnewUnit2(!addNewUnit2)}
                        >
                          {addNewUnit2 ? <>-</> : <>+</>}
                        </button>
                      )}
                      {addNewUnit2 && (
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-company"
                          >
                            Unit
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-company"
                              className="form-control"
                              placeholder="User Name"
                              aria-label="ACME Inc."
                              aria-describedby="basic-icon-default-company2"
                              onChange={(e) =>
                                setProduct({
                                  ...product,
                                  productDetailModel: [
                                    {
                                      ...product.productDetailModel[0],
                                      unitId: e.target.value,
                                    },
                                    ...product.productDetailModel.slice(1),
                                  ],
                                })
                              }
                            />
                          </div>
                        </div>
                      )}

                      {addNewUnit2 && (
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-email"
                          >
                            Price
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-email"
                              className="form-control"
                              placeholder="Phone Number"
                              aria-label="Phone Number"
                              aria-describedby="basic-icon-default-email2"
                              onChange={handleInput3Change}
                            />
                          </div>
                          <div className="form-text"></div>
                        </div>
                      )} */}
                      {/* {addNewUnit2 && (
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-email"
                          >
                            Giá trị quy đổi
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-email"
                              className="form-control"
                              placeholder="Phone Number"
                              aria-label="Phone Number"
                              aria-describedby="basic-icon-default-email2"
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                          <div className="form-text"></div>
                        </div>
                      )} */}
                      {/* {addNewUnit2 && (
                        <div className="mb-3" style={{ width: "95%" }}>
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-email"
                          >
                            BarCode
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="basic-icon-default-email"
                              className="form-control"
                              placeholder="Phone Number"
                              aria-label="Phone Number"
                              aria-describedby="basic-icon-default-email2"
                              onChange={handleInput3ChangeBarCode}
                            />
                          </div>
                          <div className="form-text"></div>
                        </div>
                      )}
                      {addNewUnit2 && (
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            defaultValue="option2"
                            checked={isSell}
                            onChange={handleSellChange}
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
                            For sale
                          </label>
                        </div>
                      )}

                      {addNewUnit2 && (
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
                              onChange={handleImageURL3Change}
                            />
                          </div>
                          <div className="form-text"></div>
                        </div>
                      )} */}

                      {/* <div className="mb-3" style={{ width: "95%" }}>
                      <label
                        className="form-label"
                        htmlFor="basic-icon-default-phone"
                      >
                        Khi thuộc tính quản lý theo lô dc kick hoạt, sản phẩm tạo xong sẽ không thay đổi
                      </label>
                      
                    </div> */}
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
          ))}
        </div>

        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </div>
  );
};
export default NewDrug;
