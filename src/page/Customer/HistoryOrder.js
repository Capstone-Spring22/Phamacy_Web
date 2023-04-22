import React from "react";
import { useEffect, useState } from "react";

import { BsPlus } from "react-icons/bs";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import { getDataByPath, deleteDataByPath } from "../../services/data.service";
import { async } from "q";
import axios, { AxiosHeaders } from "axios";
import ReactPaginate from "react-paginate";

const HistoryOrder = () => {
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [OrderDetail, setOrderDetail] = useState([]);
  let history = useHistory();
  const update = (myId) => {
    localStorage.setItem("Oderid", myId);
    history.push("/ViewOrderDetail");
  };
  async function loadDataOrder() {
    if (localStorage && localStorage.getItem("accessTokenUser")) {
      const accessToken = localStorage.getItem("accessTokenUser");
      const path = `Order?pageIndex=${currentPage}&pageItems=${perPage}`;
      const res = await getDataByPath(path, accessToken, "");
      console.log("check", res);
      if (res !== null && res !== undefined && res.status === 200) {
        setDrug(res.data.items);
        setTotalRecord(res.data.totalRecord);
      }
    }
  }
  const [activeItem, setActiveItem] = useState("Order");
  useEffect(() => {
    loadDataOrder();
  }, [currentPage, perPage]);

  return (
    <div>
      <Header />
      <>
        <div className="catagories-side-menu">{/*  Side Nav  */}</div>
        <div id="wrapper">
          <div class="bg-light py-3">
            <div class="container">
              <div class="row">
                <div class="col-md-12 mb-0">
                  <a
                    href="Home"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Trang chủ
                  </a>{" "}
                  <span class="mx-2 mb-0">/</span>{" "}
                  <strong class="text-black">Lịch sử đặt hàng</strong>
                </div>
              </div>
            </div>
          </div>
          {/* ****** Top Discount Area End ****** */}
          {/* ****** Cart Area Start ****** */}
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
                        padding: "20px 24px",
                        backgroundColor: "#ffffff",
                        borderColor: "white",
                      }}
                    >
                      <h3 className="fontagon">Lịch Sử Đơn Hàng</h3>
                    </h5>

                    <></>
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
                            &nbsp; &nbsp;Id Đơn Hàng
                          </th>
                          <th
                            style={{
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            Loại Đơn Hàng
                          </th>
                          
                          <th
                            style={{
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            Tổng Giá
                          </th>
                          <th
                            style={{
                              backgroundColor: "#f6f9fc",
                              borderColor: "white",
                              color: "#bfc8d3",
                            }}
                          >
                            Trạng Thái Đơn Hàng
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
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table-border-bottom-0">
                        {drug &&
                          drug.length &&
                          drug.map((e) => {
                            return (
                              <tr key={e.id}>
                                <td>&nbsp; &nbsp;{e.id}</td>
                                <td>{e.orderTypeName}</td>
                                <td>{e.totalPrice}</td>
                                <td>{e.orderStatusName}</td>
                                {e.needAcceptance === true ? (
                                  <td>Chưa Xác Nhận</td>
                                ) : (
                                  <td>Đã Xác Nhận</td>
                                )}
                                <td>
                                  <a
                                    class="button-81"
                                    role="button"
                                 
                                    onClick={() => {
                                      update(e.id);
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
          <Footer />
        </div>
      </>
    </div>
  );
};
export default HistoryOrder;
