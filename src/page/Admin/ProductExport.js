import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import SideBar from "../sidebar/SideBarManager";
import ReactPaginate from "react-paginate";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../assets/css/core.css";
import "../../assets/css2/dropDownAvartar.css";
import { getDataByPath, updateDataByPath } from "../../services/data.service";
import Swal from "sweetalert2";

const ProductExport = () => {
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [productExport, setProductExport] = useState([]);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  let history = useHistory();
  const [quantityError, setQuantityError] = useState([]);
  const siteId = localStorage.getItem("SiteID");
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
  const [quantity, setQuantity] = useState("");
  const create = () => {
    history.push("/NewDiscount");
  };

  async function loadDataProductExportID(id) {
    const path = `ProductExport/${id}`;
    const res = await getDataByPath(path, "", "");
    if (res !== null && res !== undefined && res.status === 200) {
      setProductExport(res.data);
      console.log("display 2", id);
    }
  }
  const checkValidation = () => {
    let isValid = true;
    if (!quantity.trim()) {
      setQuantityError("Vui lòng Điềm Số Lượng");
      isValid = false;
    } else {
      setQuantityError("");
    }
    if (quantity > productExport.quantity) {
      setQuantityError("Số Lượng Vượt Quá Số Lượng Tổng");
      isValid = false;
    } else {
      setQuantityError("");
    }
    return isValid;
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
                                  <h5 className="mb-0">Hoàn Thành Đơn Hàng</h5>
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
                                          Thời Gian Hết Hàng :
                                        </label>
                                        <div className="input-group input-group-merge">
                                          <div>{productExport?.expireDate}</div>
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

                                      <div
                                        style={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          width: 600,
                                          padding: 1,
                                          height: 100,
                                          marginTop: 70,
                                        }}
                                      >
                                        <div
                                          className="mb-3"
                                          style={{
                                            width: "100%",
                                            height: 10,
                                            marginRight: 30,
                                          }}
                                        >
                                          <label
                                            className="form-label"
                                            htmlFor="basic-icon-default-fullname"
                                          >
                                            Số Lượng Hỏng
                                          </label>
                                          <div className="input-group input-group-merge">
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="basic-icon-default-fullname"
                                              placeholder="Nhập Số lượng"
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
                                  Đơn Vị
                                </th>

                                <th
                                  style={{
                                    backgroundColor: "#f6f9fc",
                                    borderColor: "white",
                                    color: "#bfc8d3",
                                  }}
                                >
                                  Tổng SP
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#f6f9fc",
                                    borderColor: "white",
                                    color: "#bfc8d3",
                                  }}
                                >
                                  Ngày Hết Hạng
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#f6f9fc",
                                    borderColor: "white",
                                    color: "#bfc8d3",
                                  }}
                                >
                                  Lý Do
                                </th>
                                <th
                                  style={{
                                    backgroundColor: "#f6f9fc",
                                    borderColor: "white",
                                    color: "#bfc8d3",
                                  }}
                                >
                                  Xuất Hỏng
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

                                      <td>{e.unitName}</td>
                                      <td>{e.quantity}</td>
                                      <td>
                                        {new Date(
                                          e.expireDate
                                        ).toLocaleDateString("vi-VN", {
                                          timeZone: "Asia/Ho_Chi_Minh",
                                        })}
                                      </td>

                                      <td>{e.status}</td>
                                      <td>
                                        {e.status === "Đã kết thúc" ? (
                                          <a
                                            class="button-81"
                                            role="button"
                                            href="#my-dialog2"
                                            onClick={() => {
                                              view(e.id);
                                            }}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                              class="bi bi-eye"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                            </svg>
                                          </a>
                                        ) : (
                                          <a
                                            class="button-81"
                                            role="button"
                                            href="#my-dialog2"
                                            onClick={() => {
                                              loadDataProductExportID(
                                                e.siteInventoryId
                                              );
                                              setIsOpen(true);
                                            }}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                              class="bi bi-pencil-square"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                              <path
                                                fill-rule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                              />
                                            </svg>
                                          </a>
                                        )}
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
