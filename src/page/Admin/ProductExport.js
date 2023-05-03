import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import SideBar from "../sidebar/SideBarManager";
import ReactPaginate from "react-paginate";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import "../../assets/css2/dropDownAvartar.css";
import { getDataByPath, updateDataByPath } from "../../services/data.service";
import Swal from "sweetalert2";
import axios from "axios";

const ProductExport = () => {
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [productExport, setProductExport] = useState([]);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();
  const [quantityError, setQuantityError] = useState([]);
  const siteId = localStorage.getItem("SiteID");
  const [unit, setUnit] = useState([]);
  const [message, setMessage] = useState("");
  const [productId, setProductId] = useState([]);
  const [lastProductUnitId, setLastProductUnitId] = useState(null);
  const [UnitList, setUnitList] = useState([]);
  const update = (myId) => {
    localStorage.setItem("id", myId);

    history.push("/UpdateDiscount");
  };

  const view = (myId) => {
    localStorage.setItem("id", myId);

    history.push("/ViewDiscount");
  };
  const [productExportUpdate, setProductExportUpdate] = useState({
    siteInventoryId: "",
    exportQuantity: "",
  });
  async function loadDataUnit() {
    const path = `Unit?isCountable=true&pageIndex=1&pageItems=111`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setUnit(res.data.items);
    }
  }
  useEffect(() => {
    loadDataUnit();
  }, []);
  const [options, setOptions] = useState(null);
  const [quantity, setQuantity] = useState("");
  const create = () => {
    history.push("/NewDiscount");
  };

  async function loadDataProductExportID(id) {
    const accessToken = localStorage.getItem("accessToken");
    const path = `ProductExport/${id}`;
    const res = await getDataByPath(path, accessToken, "");
    if (res !== null && res !== undefined && res.status === 200) {
      setProductExport(res.data);
      
    }
  }
  async function loadProductUnitID(productId) {
    const accessToken = localStorage.getItem("accessToken");
    const path = `Product/Update/${productId}`;
    const res = await getDataByPath(path, accessToken, "");
    console.log("res.data :", res.data.productDetailModel);
    if (res !== null && res !== undefined && res.status === 200) {
      setUnitList(res.data.productDetailModel);
    }
  }

  const checkValidation = () => {
    let isValid = true;
    if (!quantity.trim()) {
      setQuantityError("Vui lòng Điền Số Lượng");
      isValid = false;
      return isValid;
    } else if (quantity <= 0) {
      setQuantityError("Số lượng xuất hỏng không được nhỏ hơn 0.");
      isValid = false;
      return isValid;
    } else {
      setQuantityError("");
    }
    if (quantity > productExport.quantity) {
      setQuantityError("Số Lượng Vượt Quá Số Lượng Tổng");
      isValid = false;
      return isValid;
    } else {
      setQuantityError("");
    }
    return isValid;
  };
  const getMessageAPI = async (productid, quantity) => {
    if (productid && quantity > 0) {
      const res = await axios.get(
        `https://betterhealthapi.azurewebsites.net/api/v1/ProductImport/Message?ProductId=${productid}&Quantity=${quantity}`
      );
      setMessage(res.data.templateMessage);
      
    }
  };
  
  async function updateProducts() {
    if (checkValidation()) {
      const data = {
        siteInventoryId: productExport.siteInventoryId,
        exportQuantity: quantity,
      };

      const path = `ProductExport`;
      const res = await updateDataByPath(path, "", data);
      console.log("checkRes", res);
      console.log("productExportUpdate :", data);
      if (res && res.status === 200) {
        Swal.fire("Xuất Hỏng Thành Công!", "", "success");
        setIsOpen(false);
        setQuantity("");
        loadDataProductExport();
      }
    }
  }
  async function loadDataProductExport() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `ProductExport?SiteId=${siteId}&pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("display", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
        setTotalRecord(res.data.totalRecord);
      }
    }
  }

  useEffect(() => {
    loadDataProductExport();
  }, [currentPage, perPage]);
  const [activeItem, setActiveItem] = useState("ProductExport");
  return (
    <>
      <div>
        <div>
          {" "}
          <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
              <SideBar activeItem={activeItem} />

              <div
                className="layout-page"
                style={{ backgroundColor: "#f4f6fb", marginLeft: 260 }}
              >
                {/* Navbar */}
                <nav class="navbar">
                  <div class="navbar-container"></div>
                </nav>

                {/* / Navbar */}
                {/* Content wrapper */}
                <div>
                  <div className="content-wrapper">
                    {/* Content */}
                    <div className="container-xxl flex-grow-1 container-p-y">
                      {/* Basic Bootstrap Table */}
                      <div
                        className="card"
                        style={{
                          width: "100%",
                          backgroundColor: "#ffffff",
                          width: 1200,
                          margin: 30,
                          borderRadius: 5,
                          border: "none",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <h5
                            className="card-header"
                            style={{
                              padding: "20px 21px",
                              backgroundColor: "#ffffff",
                              borderColor: "white",
                            }}
                          >
                            <h3 className="fontagon">
                              Quản Lý Xuất Hỏng Sản Phẩm
                            </h3>
                          </h5>
                        </div>
                        <div
                          className={`dialog overlay ${isOpen ? "" : "hidden"}`}
                          id="my-dialog2"
                        >
                          <a href="#" className="overlay-close" />

                          <div className="row " style={{ width: 700 }}>
                            <div className="col-xl">
                              <div className="card mb-4">
                                <div
                                  className="card-header d-flex justify-content-between align-items-center"
                                  style={{
                                    height: 70,
                                    backgroundColor: "white",

                                    marginLeft: 230,
                                    borderColor: "#f4f4f4",
                                  }}
                                >
                                  <h5 className="mb-0">Xuất Hỏng Hàng Hóa</h5>
                                </div>
                                <div className="card-body">
                                  <form>
                                    <div
                                      style={{
                                        display: "grid",

                                        padding: 30,
                                      }}
                                    >
                                      <div
                                        className="mb-3"
                                        style={{
                                          width: "95%",
                                          display: "flex",
                                        }}
                                      >
                                        <label
                                          style={{
                                            paddingTop: 2,
                                            width: 400,
                                            fontSize: 15,
                                          }}
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Tên Sản Phẩm :
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <div>
                                            {productExport?.productName}
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{
                                          width: "95%",
                                          display: "flex",
                                        }}
                                      >
                                        <label
                                          style={{
                                            paddingTop: 2,
                                            width: 400,
                                            fontSize: 15,
                                          }}
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Số lượng hỏng :
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <div>{productExport?.quantity}</div>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{
                                          width: "95%",
                                          display: "flex",
                                        }}
                                      >
                                        <label
                                          style={{
                                            paddingTop: 2,
                                            width: 400,
                                            fontSize: 15,
                                          }}
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Đơn Vị :
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <div>{productExport?.unitName}</div>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{
                                          width: "95%",
                                          display: "flex",
                                        }}
                                      >
                                        <label
                                          style={{
                                            paddingTop: 2,
                                            width: 400,
                                            fontSize: 15,
                                          }}
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Hạn Sử Dụng :
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <div>
                                            {new Date(
                                              productExport?.expireDate
                                            ).toLocaleDateString("vi-VN", {
                                              timeZone: "Asia/Ho_Chi_Minh",
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="mb-3"
                                        style={{
                                          width: "95%",
                                          display: "flex",
                                        }}
                                      >
                                        <label
                                          style={{
                                            paddingTop: 2,
                                            width: 400,
                                            fontSize: 15,
                                          }}
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Lý Do Xuất Hỏng:
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <div>{productExport?.status}</div>
                                        </div>
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          className="form-label"
                                          htmlFor="basic-icon-default-phone"
                                        >
                                          Đơn Vị
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <select
                                            name="city"
                                            id="basic-icon-default-email"
                                            className="form-control"
                                          >
                                            {UnitList &&
                                              UnitList.length &&
                                            
                                              UnitList.map((e, index) => {
                                                return (
                                                  
                                                  <>
                                                    <option
                                                      key={e.id}
                                                      value={e.id}
                                                    >
                                                      {(unit.find((sc) => sc.id === e.unitId))?.unitName}
                                                    </option>
                                                  </>
                                                );
                                              })}
                                          </select>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          width: 600,
                                          padding: 1,
                                          height: 100,
                                        }}
                                      >
                                        <div
                                          className="mb-3"
                                          style={{
                                            width: "100%",
                                            height: 10,
                                          }}
                                        >
                                          <label
                                            className="form-label"
                                            htmlFor="basic-icon-default-fullname"
                                          >
                                            Số Lượng Cần Xuất Hỏng
                                          </label>
                                          <div className="input-group input-group-merge">
                                            <input
                                              type="number"
                                              className="form-control"
                                              id="basic-icon-default-fullname"
                                              placeholder="Nhập Số lượng Cần Xuất Hỏng"
                                              aria-label="Tên Sản Phẩm"
                                              aria-describedby="basic-icon-default-fullname2"
                                              value={quantity}
                                              onChange={(e) => {
                                                setQuantity(e.target.value);
                                              }}
                                            />
                                          </div>
                                          <div
                                            className="form-text"
                                            style={{ color: "red" }}
                                          >
                                            {quantityError}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      type="submit"
                                      className="button-28"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        updateProducts();
                                      }}
                                      style={{
                                        height: 50,
                                        width: 600,
                                        fontSize: 13,

                                        backgroundColor: "#82AAE3",
                                        color: "white",
                                      }}
                                    >
                                      Xác Nhận Xuất Hỏng
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="table-responsive ">
                          <table className="table">
                            <thead
                              style={{
                                backgroundColor: "#f6f9fc",
                                borderColor: "white",
                                color: "",
                              }}
                            >
                              <tr>
                                <th
                                  style={{
                                    backgroundColor: "#f6f9fc",
                                    borderColor: "white",
                                    color: "#bfc8d3",
                                  }}
                                >
                                  &nbsp; &nbsp;Tên
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#f6f9fc",
                                    borderColor: "white",
                                    color: "#bfc8d3",
                                  }}
                                >
                                  Số Lượng
                                </th>

                                <th
                                  style={{
                                    backgroundColor: "#f6f9fc",
                                    borderColor: "white",
                                    color: "#bfc8d3",
                                  }}
                                >
                                  Đơn Vị
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#f6f9fc",
                                    borderColor: "white",
                                    color: "#bfc8d3",
                                  }}
                                >
                                  Hạn Sử Dụng
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#f6f9fc",
                                    borderColor: "white",
                                    color: "#bfc8d3",
                                  }}
                                >
                                  Trạng Thái
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#f6f9fc",
                                    borderColor: "white",
                                    color: "#bfc8d3",
                                  }}
                                >
                                  Thao Tác
                                </th>
                              </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                              {drug &&
                                drug.length > 0 &&
                                drug.map((e) => {
                                  return (
                                    <tr key={e.id}>
                                      <td
                                        style={{
                                          width: 10,
                                          whiteSpace: "nowrap",
                                          overFlow: "hidden",
                                          textOverflow: "ellipsis",
                                        }}
                                      >
                                        &nbsp; &nbsp;{e.productName}
                                      </td>

                                      <td>{e.quantity}</td>
                                      <td>{e.unitName}</td>
                                      <td>
                                        {new Date(
                                          e.expireDate
                                        ).toLocaleDateString("vi-VN", {
                                          timeZone: "Asia/Ho_Chi_Minh",
                                        })}
                                      </td>

                                      <td>{e.status}</td>
                                      <td>
                                        <a href="#my-dialog2">
                                          <button
                                            class="btn btn-danger"
                                            role="button"
                                            style={{
                                              width: "auto",
                                              padding: 5,
                                            }}
                                            onClick={() => {
                                              loadProductUnitID(e.productId);
                                              loadDataProductExportID(
                                                e.siteInventoryId
                                              );
                                              setQuantityError("");
                                              setQuantity(0);
                                              setIsOpen(true);
                                            }}
                                          >
                                            Xuất Hỏng
                                          </button>
                                        </a>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>

                          <ReactPaginate
                            className="pagination "
                            breakLabel="..."
                            nextLabel=">"
                            previousLabel="< "
                            nextClassName="next-button"
                            pageClassName="page-item"
                            activeClassName="ac"
                            previousClassName="previous-button"
                            pageCount={totalRecord / perPage}
                            onPageChange={(e) => setCurrentPage(e.selected + 1)}
                            currentPage={currentPage}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="content-backdrop fade" />
                  </div>
                </div>
              </div>

              <div className="layout-overlay layout-menu-toggle" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductExport;
