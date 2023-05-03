import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";
import { toast, Toaster } from "react-hot-toast";

import SideBar from "../sidebar/SideBarPharmacist";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import { getDataByPath, createDataByPath } from "../../services/data.service";
import { useHistory } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

import { Modal } from "antd";
import e from "cors";
const CheckOutPharmacist = () => {
  const [activeItem, setActiveItem] = useState("CheckOutPharmacist");
  const [drug, setDrug] = useState(null);
  const [listCart, setListCart] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [unit, setUnit] = useState([]);
  const [pdfUrl, setPdfUrl] = useState([]);
  let history = useHistory();
  const [point, setPoint] = useState(0);
  const [count, setCount] = useState(2);
  const [valueSearch, setvalueSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [moneyReceived, setMoneyReceived] = useState(0);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [pointErrorMessage, setPointErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isQuaSoLuong, setIsQuaSoLuong] = useState(false);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [minUnit, setMinUnit] = useState([
    {
      productParentId: "",
      minUnitId: "",
      quantityAfterConvert: "",
    },
  ]);
  async function loadDataMedicineDefault() {
    if (localStorage && localStorage.getItem("accessToken")) {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const path = `Product?isSellFirstLevel=true&pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("display", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
      }
      setIsLoading(false);
    }
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Define a state variable to store the number of pages in the PDF file
  const [numPages, setNumPages] = useState(null);

  // Define a function to handle opening the modal
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  // Define a function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  async function loadDataMinUnit(productId, quantity) {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `ProductImport/Message?ProductId=${productId}&Quantity=${quantity}`;
      const res = await getDataByPath(path, accessToken, "");

      if (res !== null && res !== undefined && res.status === 200) {
        const checkProduct = minUnit?.find(
          (item) => item?.productParentId === productId
        );
        if (checkProduct?.productParentId === productId) {
          setMinUnit((prevState) =>
            prevState.map((item) => {
              if (item?.productParentId === productId) {
                return {
                  ...item,
                  quantityAfterConvert: parseInt(res.data.quantityAfterConvert),
                };
              }
              return item;
            })
          );
        } else if (!checkProduct) {
          setMinUnit([
            ...minUnit,
            {
              productParentId: productId,
              minUnitId: res.data.productIdAfterConvert,
              quantityAfterConvert: res.data.quantityAfterConvert,
            },
          ]);
        }
      }
    }
  }
  const productQuantities = minUnit.reduce((accumulator, product) => {
    const index = accumulator.findIndex(
      (item) => item.minUnitId === product.minUnitId
    );
    if (index !== -1) {
      accumulator[index].productParentId.push(product);
      accumulator[index].quantityAfterConvert1 += product.quantityAfterConvert;
    } else {
      accumulator.push({
        productParentId: [product],
        minUnitId: product.minUnitId,
        quantityAfterConvert1: product.quantityAfterConvert,
      });
    }
    return accumulator;
  }, []);

  async function loadDataMedicine(search) {
    setIsLoading(true);
    if (search === "") {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const path = `Product?isSellFirstLevel=true&pageIndex=${currentPage}&pageItems=${perPage}`;
        const res = await getDataByPath(path, accessToken, "");
        if (res !== null && res !== undefined && res.status === 200) {
          setDrug(res.data.items);
        }
      }
    } else {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const path = `Product?isSellFirstLevel=true&productName=${search}&pageIndex=${currentPage}&pageItems=${perPage}`;
        const res = await getDataByPath(path, accessToken, "");
        if (res !== null && res !== undefined && res.status === 200) {
          setDrug(res.data.items);
        }
      }
    }
    setIsLoading(false);
  }
  async function loadDataUnit() {
    const path = `Unit?isCountable=true&pageIndex=1&pageItems=111`;
    const res = await getDataByPath(path, "", "");
    console.log("display unit", res.data.items);
    if (res !== null && res !== undefined && res.status === 200) {
      setUnit(res.data.items);
    }
  }
  async function Checkout() {
    if (checkValidation()) {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const data = product;
        const path = "Order/Checkout";
        const res = await createDataByPath(path, accessToken, data);
        console.log("Check res", res);
        console.log("display du lieu", data);
        if (res && res.status === 200) {
          Swal.fire({
            title: "Create Success",
            text: "Bạn có muốn in hóa đơn không?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Có",
            cancelButtonText: "Trở Về",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const path = `Invoice/${product.orderId}`;
              const res1 = await getDataByPath(path, accessToken, "");
              if (res1 !== null && res1 !== undefined && res1.status === 200) {
                setPdfUrl(res1.data);
                console.log("res.data", res1.data);
                handleOpenModal();
              }
            } else {
              history.push("/Order");
            }
          });

          setListCart([]);
        }
      }
    }
  }

  const handleMoneyReceivedChange = (event) => {
    const value = event.target.value;
    const money = parseFloat(value);
    setMoneyReceived(isNaN(money) ? 0 : money);
    setErrorMessage("");
  };

  const handleMoneyReceivedBlur = () => {
    if (moneyReceived < product.totalPrice) {
      setErrorMessage("Số tiền nhận phải lớn hơn hoặc bằng số tiền đơn hàng");
    }
  };
  const loadDataUserByPhone = async () => {
    if (checkValidation()) {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const path = `Customer?NameOrPhone=${product.reveicerInformation.phoneNumber}&pageIndex=1&pageItems=12`;
        const res = await getDataByPath(path, accessToken, "");
        console.log("Check res", res);
        if (res && res.status === 200 && res.data.totalRecord > 0) {
          // window.location.reload();
          setProduct({
            ...product,
            reveicerInformation: {
              ...product.reveicerInformation,
              fullname: res.data.items[0].fullname,
            },
          });
        } else if (res && res.status === 200 && res.data.totalRecord === 0) {
          setProduct({
            ...product,
            reveicerInformation: {
              ...product.reveicerInformation,
              fullname: "Khách vãng lai",
            },
          });
        }
      }
    }
  };
  const loadPointUserByPhone = async () => {
    if (checkValidation()) {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const path = `CustomerPoint/${product.reveicerInformation.phoneNumber}/CustomerAvailablePoint`;
        const res = await getDataByPath(path, accessToken, "");
        console.log("Check res", res);
        if (res && res.status === 200) {
          // window.location.reload();
          setPoint(res.data);
        } else if (res && res.status === 404) {
          setPoint(0);
        }
      }
    }
  };
  const checkValidation = () => {
    // if (id.trim() === "") {
    //   Swal.fire("ID Can't Empty", "", "question");
    //   return false;
    // }
    return true;
  };

  async function addToCart(productId) {
    if (checkValidation()) {
      const drug1 = drug.find((item) => item.id === productId);
      console.log("display drug1", drug1);
      // console.log(
      //   "drug1.id === listCart.find((product)=> product.id )",
      //   drug1.id ===
      //     listCart.find((product) => product.productId === productId).productId
      // );
      if (
        listCart &&
        listCart.find((product) => product.productId === productId)?.productId
      ) {
        // setListCart((prevState) => {
        //   prevState.map((item) => {
        //     if (item.productId === productId) {
        //       return {
        //         ...item,
        //         quantity: 14,
        //       };
        //     }
        //     return item;
        //   });
        // });
        toast.error("Đã có sản phẩm trong giỏ hàng");
      } else if (drug1?.productInventoryModel?.quantity === 0) {
        toast.error("Sản phẩm không còn hàng");
      } else {
        listCart.push({
          productId: drug1.id,
          imageURL: drug1.imageModel.imageURL,
          productInventoryModel: drug1.productInventoryModel.quantity,
          quantity: 1,
          originalPrice: drug1.price,
          discountPrice: drug1.priceAfterDiscount,
          name: drug1.name,
          unitId: drug1.unitId,
        });
        setListCart([...listCart]);
      }

      console.log("display", listCart);
    }
  }

  const [newArrayOfObjects, setNewArrayOfObjects] = useState([]);

  const [product, setProduct] = useState({
    orderId: null,
    orderTypeId: 1,
    siteId: null,
    pharmacistId: null,
    subTotalPrice: 0,
    discountPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    usedPoint: 0,
    payType: 1,
    isPaid: 1,
    note: "",

    products: null,
    reveicerInformation: {
      fullname: "Khách vãng lai",
      phoneNumber: "",
    },
  });
  async function loadOrderId() {
    const path = `Order/GenerateOrderId`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setProduct({
        ...product,
        orderId: res.data,
        pharmacistId: localStorage.getItem("userID"),
        siteId: localStorage.getItem("SiteID"),
      });
    }
  }
  useEffect(() => {
    loadOrderId();
    loadDataUnit();
  }, []);
  useEffect(() => {
    // Update the document title using the browser API
    if (document.querySelector(".quaSoLuong") !== null) {
      setIsQuaSoLuong(true);
    } else {
      setIsQuaSoLuong(false)
    }
  });
  useEffect(() => {
    loadDataMedicineDefault();
  }, []);
  useEffect(() => {
    setProduct({
      ...product,
      products: newArrayOfObjects,
    });
  }, [newArrayOfObjects]);
  useEffect(() => {
    setNewArrayOfObjects(
      listCart &&
      listCart.length &&
      listCart.map(
        ({ productId, quantity, originalPrice, discountPrice }) => ({
          productId: productId,
          quantity: quantity,
          originalPrice: originalPrice,
          discountPrice: discountPrice,
        })
      )
    );
  }, [listCart]);
  function updateQuantity(productId, newQuantity) {
    if (product.quantity < 1) {
      // Nếu giá trị nhập vào nhỏ hơn 1, thông báo cho người dùng
      alert("Số lượng phải lớn hơn hoặc bằng 1!");
      return;
    }
    setListCart((prevState) =>
      prevState.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: parseInt(newQuantity),
          };
        }
        return item;
      })
    );
  }

  function updateProductID(productId, newID, newPrice, unitId1) {
    console.log("display", productId, newID, newPrice, unitId1);
    let equalID = true;
    setDrug((prevState) =>
      prevState.map((item) => {
        if (newID === item.id) {
          equalID = false;
        } else if (item.id === productId && equalID) {
          const updatedProductUnitReferences = [...item.productUnitReferences];

          return {
            ...item,
            id: newID,
            priceAfterDiscount: parseInt(newPrice),
            unitId: unitId1,
            productUnitReferences: updatedProductUnitReferences,
          };
        }
        return item;
      })
    );
  }

  useEffect(() => {
    if (product?.usedPoint > point) {
      setPointErrorMessage(
        "Số lượng Điểm Thưởng đã nhập vượt quá số Điểm Thưởng hiện có"
      );
    } else if (
      parseInt(product?.usedPoint) * 1000 >
      listCart?.reduce(
        (total, curent) => total + curent.quantity * curent.discountPrice,
        0
      )
    ) {
      setPointErrorMessage(
        `Số Điểm tối đa được nhập là ${listCart?.reduce(
          (total, curent) => total + curent.quantity * curent.discountPrice,
          0
        ) / 1000
        }`
      );
    } else if (
      product?.usedPoint <= point &&
      parseInt(product?.usedPoint) * 1000 <=
      listCart?.reduce(
        (total, curent) => total + curent.quantity * curent.discountPrice,
        0
      )
    ) {
      setProduct({
        ...product,
        subTotalPrice: listCart?.reduce(
          (total, curent) => total + curent.quantity * curent.discountPrice,
          0
        ),
        discountPrice: parseInt(product?.usedPoint) * 1000,
        totalPrice:
          listCart?.reduce(
            (total, curent) => total + curent.quantity * curent.discountPrice,
            0
          ) -
          parseInt(product?.usedPoint) * 1000,
      });
    }
  }, [count]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDataMedicine(searchValue);
      setvalueSearch(searchValue);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar activeItem={activeItem} />

        <div className="layout-page" style={{ backgroundColor: "#f4f6fb" }}>
          {/* Navbar */}
          <nav
            style={{ marginLeft: 150, width: 850 }}
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
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* /Search */}
            </div>
          </nav>
          <Modal
            title="Hóa Đơn Khách Hàng"
            visible={isModalVisible}
            onCancel={handleCloseModal}
            footer={null}
            width={650}
            style={{ padding: 0 }}
            bodyStyle={{ padding: 0, margin: 0 }}
          >
            <div style={{ overflow: "auto", height: "100%" }}>
              <Document
                file={pdfUrl}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            </div>
          </Modal>

          <div style={{ display: "flex", flexWrap: "wrap", marginLeft: 180 }}>
            {/* <div className="search-result">
              {drug.map((e) => {
                return (
                  <div
                    key={e.id}
                    className="product-cart-p2"
                    onClick={() => addToCart(e.id)}
                  >
                    <img
                      src={e.imageModel.imageURL}
                      style={{
                        height: 90,
                        width: 70,
                        borderRadius: 7,
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{ width: 380, marginRight: 30, marginLeft: 30 }}
                    >
                      <div>Tên sản phẩm:</div>
                      <div> {e.name}</div>
                    </div>

                    <div style={{ width: 380 }}>
                      <div>Số Lượng Tồn Kho:</div>
                      <div>{e.productInventoryModel.quantity}</div>
                    </div>
                  </div>
                );
              })}
            </div> */}

            <div
              className="row cart-pharmacist "
              style={{ marginTop: 10, marginLeft: -50 }}
            >
              <div className="col-xl">
                <div
                  className=""
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: 20,
                    marginTop: 20,
                  }}
                >
                  {valueSearch === "" ? (
                    <h5>Sản Phẩm Đề Xuất:</h5>
                  ) : (
                    <h5>Kết Quả Tra Cứu:</h5>
                  )}
                  {isLoading ? (
                    <div style={{ height: 200 }}>
                      <div className="loading" style={{}}>
                        <div className="pill"></div>
                        <div className="loading-text">Đang Tải Sản Phẩm...</div>
                      </div>
                    </div>
                  ) : (
                    <div className="card-body scroll-p">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto",
                          padding: 30,
                          marginLeft: 70,
                          marginTop: -20,
                          height: 670,
                        }}
                      >
                        <div className="mb-3" style={{ width: "95%" }}>
                          <div className="input-group input-group-merge ">
                            <div
                              type="text"
                              id="basic-icon-default-fullname"
                              placeholder="Tên Sản Phẩm"
                              aria-label="Tên Sản Phẩm"
                              aria-describedby="basic-icon-default-fullname2"
                              style={{ marginLeft: -110 }}
                            >
                              {drug &&
                                drug.map((product) => {
                                  return (
                                    <>
                                      {" "}
                                      <div
                                        key={product.id}
                                        className="product-cart-p"
                                      >
                                        <img
                                          src={product.imageModel.imageURL}
                                          style={{
                                            height: 70,
                                            width: 60,
                                            borderRadius: 7,
                                            objectFit: "cover",
                                          }}
                                        />
                                        <div>
                                          <div
                                            onClick={() => {
                                              addToCart(product.id);
                                              loadDataMinUnit(product.id, 1);
                                              setCount(parseInt(count) + 1);
                                            }}
                                            className="name-product-pharmacist"
                                          >
                                            <div>Tên Sản Phẩm</div>
                                            <div> {product.name}</div>
                                          </div>
                                          {product.productInventoryModel
                                            .siteInventoryModel
                                            .totalQuantity === 0 ||
                                            (product.productInventoryModel
                                              .siteInventoryModel
                                              .totalQuantity ===
                                              product.productInventoryModel
                                                .siteInventoryModel
                                                .totalQuantityForFirst &&
                                              product.productInventoryModel.siteInventoryModel.message.includes(
                                                product.productInventoryModel.siteInventoryModel.totalQuantityForFirst.toString()
                                              )) ? (
                                            <></>
                                          ) : (
                                            <div
                                              style={{
                                                marginLeft: 10,
                                                color: "#EB455F",
                                              }}
                                            >
                                              {
                                                product.productInventoryModel
                                                  .siteInventoryModel.message
                                              }
                                            </div>
                                          )}
                                        </div>
                                        {product.productInventoryModel
                                          .siteInventoryModel.totalQuantity ===
                                          0 ? (
                                          <>
                                            {" "}
                                            <div style={{ width: 380 }}>
                                              <div style={{ color: "red " }}>
                                                {" "}
                                                SẢN PHẨM ĐÃ
                                              </div>
                                              <div style={{ color: "red " }}>
                                                {" "}
                                                HẾT HÀNG
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <div style={{ width: 380 }}>
                                            <div>Số Lượng Tồn Kho:</div>
                                            <div>
                                              {
                                                product.productInventoryModel
                                                  ?.quantity
                                              }{" "}
                                              {
                                                product.productInventoryModel
                                                  ?.unitName
                                              }
                                            </div>
                                          </div>
                                        )}

                                        <div style={{ width: 380 }}>
                                          <div>Giá</div>

                                          <div>
                                            {product.priceAfterDiscount?.toLocaleString(
                                              "en-US"
                                            )}{" "}
                                            đ /{" "}
                                            <select
                                              style={{
                                                height: 30,
                                                marginLeft: 0,
                                                border: "none",
                                              }}
                                              value={
                                                product?.productUnitReferences?.find(
                                                  (item) =>
                                                    item.id === product.id
                                                ).id
                                              }
                                              onChange={(e) => {
                                                setCount(parseInt(count) + 1);
                                                updateProductID(
                                                  product.id,
                                                  e.target.value,
                                                  e.target.options[
                                                    e.target.selectedIndex
                                                  ].getAttribute("quantity"),
                                                  e.target.options[
                                                    e.target.selectedIndex
                                                  ].getAttribute("unitId")
                                                );
                                              }}
                                            >
                                              {product.productUnitReferences.map(
                                                (unit) => {
                                                  return (
                                                    <option
                                                      key={unit.id}
                                                      value={unit.id}
                                                      unitId={unit.unitId}
                                                      quantity={
                                                        unit.priceAfterDiscount
                                                      }
                                                    >
                                                      {unit.unitName}
                                                    </option>
                                                  );
                                                }
                                              )}
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Toaster toastOptions={{ duration: 4000 }} />
            {/* <div
              className="row "
              style={{ width: 900, marginTop: -30, marginLeft: 25 }}
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
                    <h5 className="mb-0">Thông Tin Đơn Hàng</h5>
                  </div>
                  <div className="card-body scroll-p">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        padding: 30,
                        marginLeft: 100,
                        height: 420,
                      }}
                    >
                      <div className="mb-3" style={{ width: "95%" }}>
                        <div className="input-group input-group-merge ">
                          <div
                            type="text"
                            id="basic-icon-default-fullname"
                            placeholder="Tên Sản Phẩm"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
                          >
                            {listCart.length === 0 ? (
                              <img
                                style={{ height: 400 }}
                                src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
                              />
                            ) : (
                              <>
                                {listCart &&
                                  listCart.map((product) => {
                                    return (
                                      <div className="product-cart-p">
                                        <img
                                          src={product.imageURL}
                                          style={{
                                            height: 90,
                                            width: 70,
                                            borderRadius: 7,
                                            objectFit: "cover",
                                          }}
                                        />
                                        <div
                                          key={product.id}
                                          style={{ width: 400 }}
                                        >
                                          <div>Tên sản phẩm:</div>
                                          <div> {product.name}</div>
                                        </div>
                                        <div
                                          style={{ width: 100, marginLeft:10 }}
                                        >
                                           <div>Giá </div>
                                          <div> {product.originalPrice}</div>
                                          
                                        </div>
                                        <div style={{ width: 100 }}>
                                        <div>SL mua:</div>
                                        <input
                                          style={{ height: 30, width: 70 }}
                                          value={product.quantity}
                                          onChange={(e) => {
                                            setCount(parseInt(count) +1)
                                            updateQuantity(
                                              product.productId,
                                              e.target.value
                                            );
                                          }}
                                        ></input>
                                        </div>
                                        <div style={{ width: 100 }}>
                                        <div>Đơn vị:</div>
                                        <select
                                          style={{ height: 30, marginLeft: 10 }}
                                          onChange={(e) =>{
                                            setCount(parseInt(count) +1)
                                            updateProductID(
                                              product.productId,
                                              e.target.value
                                            )}
                                          }
                                        >
                                          {product.productPrefer.map((unit) => {
                                            return (
                                              <option
                                                key={unit.id}
                                                value={unit.id}
                                              >
                                                {unit.unitName}
                                              </option>
                                            );
                                          })}
                                        </select>
                                        </div>
                                       
                                        <button
                                          style={{
                                            height: 30,
                                            marginLeft: 10,
                                            backgroundColor: "white",
                                            border: "1px solid white",
                                            color: "red",
                                          }}
                                          onClick={() => {
                                            const newList = listCart.filter(
                                              (item) =>
                                                item.productId !==
                                                product.productId
                                            );

                                            setListCart(newList);
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-trash3"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                          </svg>
                                        </button>
                                      </div>
                                    );
                                  })}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div
              className={`dialog overlay ${isOpen ? "" : "hidden"}`}
              id="my-dialog"
            >
              <a href="#" className="overlay-close" />

              <div className="row " style={{ width: 560 }}>
                <div className="col-xl">
                  <div className="card mb-4">
                    <div
                      className="card-header d-flex justify-content-between align-items-center"
                      style={{
                        height: 70,
                        backgroundColor: "white",

                        marginLeft: 170,
                        borderColor: "#f4f4f4",
                      }}
                    >
                      <h5 className="mb-0">Xác Nhận Đơn Hàng</h5>
                    </div>
                    <div className="card-body">
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          padding: 1,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: 500,
                            padding: 1,
                            height: 200,
                          }}
                        >
                          <div
                            className="mb-3"
                            style={{
                              width: "47%",
                              height: 10,
                              marginRight: 20,
                            }}
                          >
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-fullname"
                            >
                              Số Điện Thoại Khách
                            </label>
                            <div style={{ display: "flex" }}>
                              {" "}
                              <div className="input-group input-group-merge">
                                <input
                                  style={{ marginRight: 0 }}
                                  type="text"
                                  className="form-control"
                                  id="basic-icon-default-fullname"
                                  placeholder="Số điện thoại "
                                  aria-label="Tên Người Mua"
                                  aria-describedby="basic-icon-default-fullname2"
                                  onChange={(e) => {
                                    setProduct({
                                      ...product,
                                      reveicerInformation: {
                                        ...product.reveicerInformation,
                                        phoneNumber: e.target.value,
                                      },
                                    });
                                  }}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      loadDataUserByPhone();
                                      loadPointUserByPhone();
                                    }
                                  }}
                                />
                              </div>
                              <button
                                onClick={(e) => {
                                  loadDataUserByPhone();
                                  loadPointUserByPhone();
                                }}
                                className="button-28"
                                style={{
                                  height: 36,
                                  width: 50,
                                  marginLeft: 10,

                                  backgroundColor: "#82AAE3",
                                  color: "white",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-search"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div
                            className="mb-3"
                            style={{ width: "45%", height: 10 }}
                          >
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-fullname"
                            >
                              Tên Người Mua
                            </label>
                            <div className="input-group input-group-merge">
                              <input
                                type="text"
                                className="form-control"
                                id="basic-icon-default-fullname"
                                placeholder="Tên người mua"
                                aria-label="Tên Sản Phẩm"
                                aria-describedby="basic-icon-default-fullname2"
                                value={product.reveicerInformation.fullname}
                                onChange={(e) =>
                                  setProduct({
                                    ...product,
                                    reveicerInformation: {
                                      ...product.reveicerInformation,
                                      fullname: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="mb-3"
                            style={{ width: "45%", height: 10 }}
                          >
                            {point !== 0 ? (
                              <div>
                                <div>Điểm : {point}</div>
                                <label
                                  className="form-label"
                                  htmlFor="basic-icon-default-fullname"
                                >
                                  Điểm Cần Sử Dụng
                                </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="basic-icon-default-fullname"
                                    placeholder="Nhập Điểm "
                                    aria-label="Tên Sản Phẩm"
                                    aria-describedby="basic-icon-default-fullname2"
                                    value={
                                      product.usedPoint === 0
                                        ? 0
                                        : product.usedPoint
                                    }
                                    onChange={(e) => {
                                      if (e.target.value === "") {
                                        setProduct({
                                          ...product,
                                          usedPoint: 0,
                                        });
                                      } else if (e.target.value > point) {
                                        setPointErrorMessage(
                                          "Số lượng Điểm Thưởng đã nhập vượt quá số Điểm Thưởng hiện có"
                                        );
                                      } else if (
                                        parseInt(e.target.value) * 1000 >
                                        listCart?.reduce(
                                          (total, curent) =>
                                            total +
                                            curent.quantity *
                                            curent.discountPrice,
                                          0
                                        )
                                      ) {
                                        setPointErrorMessage(
                                          `Số Điểm tối đa được nhập là ${listCart?.reduce(
                                            (total, curent) =>
                                              total +
                                              curent.quantity *
                                              curent.discountPrice,
                                            0
                                          ) / 1000
                                          }`
                                        );
                                      } else if (
                                        e.target.value <= point &&
                                        parseInt(e.target.value) * 1000 <=
                                        listCart?.reduce(
                                          (total, curent) =>
                                            total +
                                            curent.quantity *
                                            curent.discountPrice,
                                          0
                                        )
                                      ) {
                                        setProduct({
                                          ...product,
                                          usedPoint: e.target.value,
                                        });
                                        setPointErrorMessage("");
                                      } else {
                                        setProduct({
                                          ...product,
                                          usedPoint: 0,
                                        });
                                      }

                                      setCount(parseInt(count) + 1);
                                    }}
                                  />
                                </div>
                                <div className="form-text">
                                  Số điểm không được nhập quá số tiền: 1 điểm =
                                  1.000 đ
                                </div>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: 500,
                            padding: 1,
                            height: 100,
                            marginTop: 70,
                          }}
                        >
                          <div
                            className="mb-3"
                            style={{
                              width: "45%",
                              height: 10,
                              marginRight: 30,
                            }}
                          >
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-fullname"
                            >
                              Số Tiền Nhận
                            </label>
                            <div className="input-group input-group-merge">
                              <input
                                type="text"
                                className="form-control"
                                id="basic-icon-default-fullname"
                                placeholder="Số Tiền Nhận"
                                aria-label="Tên Sản Phẩm"
                                aria-describedby="basic-icon-default-fullname2"
                                value={moneyReceived}
                                onChange={handleMoneyReceivedChange}
                                onBlur={handleMoneyReceivedBlur}
                              />
                            </div>
                          </div>
                          <div
                            className="mb-3"
                            style={{ width: "45%", height: 10 }}
                          >
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-fullname"
                            >
                              Tiền Thối Cho Khách Hàng
                            </label>
                            <div className="input-group input-group-merge">
                              <input
                                type="text"
                                disabled
                                className="form-control"
                                id="basic-icon-default-fullname"
                                placeholder="Tiền Thối "
                                aria-label="Tên Sản Phẩm"
                                aria-describedby="basic-icon-default-fullname2"
                                value={Math.max(
                                  moneyReceived - product.totalPrice,
                                  0
                                )}
                              />
                            </div>
                            {errorMessage && (
                              <div style={{ color: "red" }}>{errorMessage}</div>
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: 500,
                            padding: 1,
                            height: 150,
                            marginTop: 70,
                          }}
                        >
                          <div className="mb-3" style={{ width: "45%" }}>
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-fullname"
                              style={{ fontSize: 15 }}
                            >
                              Tạm Tính
                            </label>
                          </div>
                          <div className="mb-3" style={{ width: "45%" }}>
                            <div className="input-group input-group-merge">
                              <div
                                style={{ marginLeft: "auto" }}
                                id="basic-icon-default-fullname"
                                placeholder="Tên người nhận"
                                aria-label="Tên Sản Phẩm"
                                aria-describedby="basic-icon-default-fullname2"
                              >
                                {product.subTotalPrice.toLocaleString("en-US")}{" "}
                                đ
                              </div>
                            </div>
                          </div>

                          <div className="mb-3" style={{ width: "45%" }}>
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-fullname"
                              style={{ fontSize: 15 }}
                            >
                              Số Tiền Giảm
                            </label>
                          </div>
                          <div className="mb-3" style={{ width: "45%" }}>
                            <div className="input-group input-group-merge">
                              <div
                                type="text"
                                style={{ marginLeft: "auto", fontSize: 15 }}
                                id="basic-icon-default-fullname"
                                placeholder="Tên người nhận"
                                aria-label="Tên Sản Phẩm"
                                aria-describedby="basic-icon-default-fullname2"
                              >
                                {(product?.usedPoint * 1000).toLocaleString(
                                  "en-US"
                                )}{" "}
                                đ
                              </div>
                            </div>
                          </div>

                          <div className="mb-3" style={{ width: "45%" }}>
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-fullname"
                              style={{ fontSize: 15 }}
                            >
                              Tổng Giá
                            </label>
                          </div>
                          <div className="mb-3" style={{ width: "45%" }}>
                            <div className="input-group input-group-merge">
                              <div
                                type="text"
                                style={{ marginLeft: "auto", fontSize: 15 }}
                                id="basic-icon-default-fullname"
                                placeholder="Tên người nhận"
                                aria-label="Tên Sản Phẩm"
                                aria-describedby="basic-icon-default-fullname2"
                              >
                                {product.totalPrice.toLocaleString("en-US")} đ
                              </div>
                            </div>
                          </div>
                        </div>
                        {moneyReceived < product.totalPrice ? (
                          <>
                            {" "}
                            <a
                              className="button-28"
                              style={{
                                height: 40,
                                width: 500,
                                fontSize: 13,
                                paddingTop: 10,

                                marginTop: "10px",

                                backgroundColor: "grey",
                                color: "white",
                              }}
                            >
                              Thanh Toán
                            </a>
                          </>
                        ) : (
                          <>
                            {" "}
                            <a
                              className="button-28"
                              onClick={Checkout}
                              style={{
                                height: 40,
                                width: 500,
                                fontSize: 13,
                                paddingTop: 10,

                                marginTop: "10px",

                                backgroundColor: "#82AAE3",
                                color: "white",
                              }}
                            >
                              Thanh Toán
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="row "
              style={{ width: 440, marginTop: -70, marginLeft: -80 }}
            >
              <div className="col-xl">
                <div className="card mb-4" style={{ height: 740 }}>
                  <div className="card-body">
                    <div
                      className="card-header d-flex justify-content-between align-items-center"
                      style={{
                        height: 50,
                        backgroundColor: "white",
                        marginBottom: 20,
                        borderColor: "#f4f4f4",
                      }}
                    >
                      <h5 className="mb-0">Tạo Đơn Tại Chỗ</h5>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        padding: 1,
                      }}
                    >
                      <div>Giỏ Hàng Của Khách</div>
                      <div className="cart-pharmacist-checkout">
                        {listCart.length === 0 ? (
                          <img
                            style={{ objectFit: "cover", height: 300 }}
                            src="https://hazzyweekend.com/static/d7b42f8124510bb7b518c690908f8978/6db19/empty_cart.png"
                          />
                        ) : (
                          <>
                            {listCart &&
                              listCart.map((product) => {
                                return (
                                  <div className="product-cart-p2">
                                    <img
                                      src={product.imageURL}
                                      style={{
                                        height: 30,
                                        width: 30,
                                        borderRadius: 7,
                                        objectFit: "cover",
                                        marginTop: 10,
                                      }}
                                    />
                                    <div
                                      key={product.productId}
                                      style={{ width: 400 }}
                                    >
                                      <div className="name-product-pharmacist2">
                                        {" "}
                                        {product.name}
                                        <div style={{ display: "flex" }}>
                                          <button
                                            className="button-minus"
                                            onClick={() => {
                                              if (product.quantity > 1) {
                                                setCount(parseInt(count) + 1);
                                                loadDataMinUnit(
                                                  product.productId,
                                                  product.quantity - 1
                                                );
                                                updateQuantity(
                                                  product.productId,
                                                  product.quantity - 1
                                                );
                                              }
                                            }}
                                          >
                                            -
                                          </button>
                                          <input
                                            style={{
                                              height: 30,
                                              width: 30,
                                              marginLeft: 15,
                                              marginTop: 5,
                                            }}
                                            className="input-quantity-pharma"
                                            value={product.quantity || 1}
                                            onChange={(e) => {
                                              const value = parseInt(
                                                e.target.value
                                              );
                                              if (!value) {
                                                e.target.value = 1;
                                              } else {
                                                setCount(parseInt(count) + 1);
                                                loadDataMinUnit(
                                                  product.productId,
                                                  value
                                                );
                                                updateQuantity(
                                                  product.productId,
                                                  value
                                                );
                                              }
                                            }}
                                          ></input>
                                          <button
                                            className="button-plus"
                                            onClick={() => {
                                              setCount(parseInt(count) + 1);
                                              loadDataMinUnit(
                                                product.productId,
                                                product.quantity + 1
                                              );
                                              updateQuantity(
                                                product.productId,
                                                product.quantity + 1
                                              );
                                            }}
                                          >
                                            +
                                          </button>
                                          <div
                                            style={{
                                              height: 30,
                                              marginLeft: 20,
                                              marginTop: 10,
                                              border: "none",
                                            }}
                                          // onChange={(e) => {
                                          //   setCount(parseInt(count) + 1);
                                          //   updateProductID(
                                          //     product.productId,
                                          //     e.target.value,
                                          //     e.target.options[
                                          //       e.target.selectedIndex
                                          //     ].getAttribute("quantity"),
                                          //     e.target.options[
                                          //       e.target.selectedIndex
                                          //     ].getAttribute("unitId")
                                          //   );
                                          // }}
                                          >
                                            {
                                              unit.find(
                                                (item) =>
                                                  item.id === product.unitId
                                              ).unitName
                                            }
                                            {/* {product.productPrefer.map(
                                              (unit) => {
                                                return (
                                                  <option
                                                    key={unit.id}
                                                    value={unit.id}
                                                    unitId={unit.unitLevel}
                                                    quantity={
                                                      unit.priceAfterDiscount
                                                    }
                                                  >
                                                    {unit.unitName}
                                                  </option>
                                                );
                                              }
                                            )} */}
                                          </div>
                                          <strong
                                            style={{
                                              height: 30,
                                              marginLeft: 10,
                                              border: "none",

                                              marginTop: 10,
                                            }}
                                          >
                                            Giá:{" "}
                                          </strong>
                                          <div
                                            style={{
                                              height: 30,
                                              marginLeft: 10,
                                              border: "none",
                                              marginTop: 10,
                                            }}
                                          >
                                            {product?.discountPrice?.toLocaleString(
                                              "en-US"
                                            )}{" "}
                                            đ
                                          </div>
                                        </div>
                                      </div>

                                      {parseInt(
                                        productQuantities.find((item) =>
                                          item.productParentId.find(
                                            (childItem) =>
                                              childItem.productParentId ===
                                              product.productId
                                          )
                                        )?.quantityAfterConvert1
                                      ) >
                                        parseInt(
                                          product.productInventoryModel
                                        ) ? (
                                        <>
                                          <div className="quaSoLuong" style={{ color: "red" }}>
                                            Sản phẩm này quá số lượng tồn kho
                                          </div>
                                        </>
                                      ) : (
                                        <div></div>
                                      )}
                                    </div>

                                    <button
                                      style={{
                                        height: 30,
                                        backgroundColor: "white",
                                        border: "1px solid white",
                                        color: "red",
                                      }}
                                      onClick={() => {
                                        setCount(parseInt(count) + 1);
                                        const lisminUnit = minUnit.filter(
                                          (item) =>
                                            item.productParentId !==
                                            product.productId
                                        );
                                        setMinUnit(lisminUnit);
                                        const newList = listCart.filter(
                                          (item) =>
                                            item.productId !== product.productId
                                        );

                                        setListCart(newList);

                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-trash3"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                      </svg>
                                    </button>
                                  </div>
                                );
                              })}
                          </>
                        )}
                      </div>

                      <div className="mb-3" style={{ width: "45%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-fullname"
                          style={{ fontSize: 15 }}
                        >
                          Tạm Tính
                        </label>
                      </div>
                      <div className="mb-3" style={{ width: "45%" }}>
                        <div className="input-group input-group-merge">
                          <div
                            style={{ marginLeft: "auto" }}
                            id="basic-icon-default-fullname"
                            placeholder="Tên người nhận"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
                          >
                            {product.subTotalPrice.toLocaleString("en-US")} đ
                          </div>
                        </div>
                      </div>
                      <div className="mb-3" style={{ width: "45%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-fullname"
                          style={{ fontSize: 15 }}
                        >
                          Số Tiền Giảm
                        </label>
                      </div>
                      <div className="mb-3" style={{ width: "45%" }}>
                        <div className="input-group input-group-merge">
                          <div
                            type="text"
                            style={{ marginLeft: "auto", fontSize: 15 }}
                            id="basic-icon-default-fullname"
                            placeholder="Tên người nhận"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
                          >
                            {(product?.usedPoint * 1000).toLocaleString(
                              "en-US"
                            )}{" "}
                            đ
                          </div>
                        </div>
                      </div>
                      <div className="mb-3" style={{ width: "45%" }}>
                        <label
                          className="form-label"
                          htmlFor="basic-icon-default-fullname"
                          style={{ fontSize: 15 }}
                        >
                          Tổng Giá
                        </label>
                      </div>
                      <div className="mb-3" style={{ width: "45%" }}>
                        <div className="input-group input-group-merge">
                          <div
                            type="text"
                            style={{ marginLeft: "auto", fontSize: 15 }}
                            id="basic-icon-default-fullname"
                            placeholder="Tên người nhận"
                            aria-label="Tên Sản Phẩm"
                            aria-describedby="basic-icon-default-fullname2"
                          >
                            {product.totalPrice.toLocaleString("en-US")} đ
                          </div>
                        </div>
                      </div>

                      {(isError || isQuaSoLuong) ? (
                        <a
                          className="button-28"
                          // href="#my-dialog"
                          // onClick={() => {
                          //   setIsOpen(true);
                          // }}
                          // onClick={Checkout}
                          style={{
                            height: 40,
                            width: 900,
                            fontSize: 13,
                            paddingTop: 10,
                            backgroundColor: "grey",
                            marginTop: "10px",
                            marginBottom: -20,
                            color: "white",
                          }}
                        >
                          Thanh Toán
                        </a>
                      ) : (
                        <a
                          className="button-28"
                          href="#my-dialog"
                          onClick={() => {
                            setIsOpen(true);
                          }}
                          // onClick={Checkout}
                          style={{
                            height: 40,
                            width: 900,
                            fontSize: 13,
                            paddingTop: 10,

                            marginTop: "10px",
                            marginBottom: -20,
                            backgroundColor: "#82AAE3",
                            color: "white",
                          }}
                        >
                          Thanh Toán
                        </a>
                      )}
                    </div>
                    {/* <button onClick={hiennew}>Hiện</button> */}
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
export default CheckOutPharmacist;
