import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { getDataByPath, deleteDataByPath } from "../../services/data.service";
import Header from "../Header/Header";
import { ListProduct } from "../Data";
import { SimpleDropdown } from "react-js-dropdavn";
import Footer from "./Footer";
const Medicine = () => {
  let history = useHistory();
  const { categoryId } = useParams();

  const viewDetail = (detailId) => {
    localStorage.setItem("detailId", detailId);
    history.push("/ViewDetail");
  };
  const [apartment, setApartment] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [rooms, setRooms] = useState([]);
  const [roomsMsg, setRoomsMsg] = useState([]);
  const [userRoom, setUserRoom] = useState([]);
  const [patientId, setPatientId] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newMessageType, setNewMessageType] = useState("text");
  const roomId = "";
  const [countUs, setCountUs] = useState("2");
  const id = localStorage.getItem("id");
  console.log("checkp", apartment);

  async function loadDataMedicine() {
    const path = `Product?isSellFirstLevel=true&pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDrug(res.data.items);
      setTotalRecord(res.data.totalRecord);
      console.log("display", currentPage);
      setIsLoading(false);
    }
  }
  async function loadDataMedicinebycategoryID(categoryID) {
    const path = `Product?isSellFirstLevel=true&mainCategoryID=${categoryID}&pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDrug(res.data.items);
      setTotalRecord(res.data.totalRecord);
      console.log("display", currentPage);
      setIsLoading(false);
    }
  }
  async function loadDataCategory2() {
    const path = `MainCategory?pageIndex=1&pageItems=10`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setCategory(res.data.items);
    }
  }
  useEffect(() => {
    if (categoryId) {
      loadDataMedicinebycategoryID(categoryId);
    } else {
      loadDataMedicine();
    }
  }, []);
  useEffect(() => {
    loadDataCategory2();
  }, []);

  return (
    <div>
      <Header />
      <div className="site-wrap">
        <div id="wrapper">
          <div class="bg-light py-3">
            <div class="container">
              <div class="row">
                <div class="col-md-12 mb-0">
                  <a
                    href="/Home"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Trang chủ
                  </a>{" "}
                  <span class="mx-2 mb-0">/</span>{" "}
                  <strong class="text-black">Sản phẩm</strong>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="quickview"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="quickview"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
            >
              <div className="modal-content">
                <button
                  type="button"
                  className="close btn"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <div className="modal-body">
                  <div className="quickview_body">
                    <div className="container">
                      <div className="row">
                        <div className="col-12 col-lg-5">
                          <div className="quickview_pro_img">
                            <img src="img/product-img/product-1.jpg" alt="" />
                          </div>
                        </div>
                        <div className="col-12 col-lg-7">
                          <div className="quickview_pro_des">
                            <h4 className="title">Boutique Silk Dress</h4>
                            <div className="top_seller_product_rating mb-15">
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                              <i className="fa fa-star" aria-hidden="true" />
                            </div>
                            <h5 className="price">
                              $120.99 <span>$130</span>
                            </h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Mollitia expedita quibusdam
                              aspernatur, sapiente consectetur accusantium
                              perspiciatis praesentium eligendi, in fugiat?
                            </p>
                            <a href="#">View Full Product Details</a>
                          </div>
                          {/* Add to Cart Form */}
                          <form className="cart" method="post">
                            <div className="quantity">
                              <span
                                className="qty-minus"
                                onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) && qty > 1 ) effect.value--;return false;"
                              >
                                <i className="fa fa-minus" aria-hidden="true" />
                              </span>
                              <input
                                type="number"
                                className="qty-text"
                                id="qty"
                                step={1}
                                min={1}
                                max={12}
                                name="quantity"
                                defaultValue={1}
                              />
                              <span
                                className="qty-plus"
                                onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"
                              >
                                <i className="fa fa-plus" aria-hidden="true" />
                              </span>
                            </div>
                            <button
                              type="submit"
                              name="addtocart"
                              value={5}
                              className="cart-submit"
                            >
                              Add to cart
                            </button>
                            {/* Wishlist */}
                            <div className="modal_pro_wishlist">
                              <a href="wishlist.html" target="_blank">
                                <i className="ti-heart" />
                              </a>
                            </div>
                            {/* Compare */}
                            <div className="modal_pro_compare">
                              <a href="compare.html" target="_blank">
                                <i className="ti-stats-up" />
                              </a>
                            </div>
                          </form>
                          <div className="share_wf mt-30">
                            <p>Share With Friend</p>
                            <div className="_icon">
                              <a href="#">
                                <i
                                  className="fa fa-facebook"
                                  aria-hidden="true"
                                />
                              </a>
                              <a href="#">
                                <i
                                  className="fa fa-twitter"
                                  aria-hidden="true"
                                />
                              </a>
                              <a href="#">
                                <i
                                  className="fa fa-pinterest"
                                  aria-hidden="true"
                                />
                              </a>
                              <a href="#">
                                <i
                                  className="fa fa-google-plus"
                                  aria-hidden="true"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ****** Quick View Modal Area End ****** */}
          <section className="shop_grid_area section_padding_100">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                  <div className="shop_sidebar_area"></div>
                </div>
                <div className="flex-w flex-sb-m p-b-52">
                  <div
                    className="flex-w flex-l-m filter-tope-group m-tb-10"
                    style={{ marginBottom: 50 }}
                  >
                    <div
                      style={{
                        width: 1400,
                        display: "flex",
                        flexWrap: "wrap",
                        marginBottom: 50,
                        cursor: "pointer",
                      }}
                    >
                      {category &&
                        category.length &&
                        category.map((result) => {
                          return (
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                loadDataMedicinebycategoryID(result.id);
                              }}
                              style={{
                                border: "none",
                                marginRight: 30,
                                fontSize: "16px",
                                fontFamily: "Poppins-Regular",
                              }}
                              className="category-home"
                            >
                              <div style={{ display: "flex" }}>
                                <img
                                  src={result.imageUrl}
                                  style={{
                                    height: 40,
                                    width: 40,
                                    marginRight: 10,
                                  }}
                                />
                                <div>
                                  <div
                                    style={{
                                      fontSize: "18px",
                                    }}
                                  >
                                    {result.categoryName}
                                  </div>
                                  <div>{result.noOfProducts} Sản Phẩm</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {isLoading ? (
                      <div style={{ height: 300 }}>
                        <div className="loading" style={{ marginTop: 170 }}>
                          <div className="pill"></div>
                          <div className="loading-text">Đang Tải...</div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="container "
                        style={{ display: "flex", flexWrap: "wrap" }}
                      >
                        {drug.length > 0 ? (
                          <>
                            {drug &&
                              drug.length &&
                              drug.map((item, index) => {
                                return (
                                  <Link
                                    className="product-card"
                                    style={{ width: "190px" }}
                                    key={item.id}
                                    to={`/ViewDetail/${item.id}`}
                                  >
                                    <img
                                      src={item.imageModel.imageURL}
                                      className="product-img-new"
                                      alt="Product Image"
                                    />
                                    <div className="product-info">
                                      {" "}
                                      <h2 className="product-name">
                                        {item.name}
                                      </h2>
                                      <div style={{ display: "flex" }}>
                                        <p className="product-price">
                                          {" "}
                                          {item.priceAfterDiscount.toLocaleString(
                                            "en-US"
                                          )}{" "}
                                          đ /
                                          {
                                            item.productUnitReferences[0]
                                              .unitName
                                          }
                                        </p>
                                      </div>
                                      <p>
                                        {" "}
                                        {item.price ===
                                        item.priceAfterDiscount ? (
                                          ""
                                        ) : (
                                          <del>{item.price} đ</del>
                                        )}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                          </>
                        ) : (
                          <div style={{ height: 300 }}>
                            
                              <div className="loading-text">
                                <img src="https://cdn-icons-png.flaticon.com/512/1106/1106992.png"/>
                                Không Có Sản Phẩm Của Danh Mục Này
                              </div>
                       
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <Footer /> */}
          {/* ****** Footer Area End ****** */}
        </div>
      </div>
    </div>
  );
};
export default Medicine;
