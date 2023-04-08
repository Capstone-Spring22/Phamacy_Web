import React from "react";
import { toast, Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "../Header/Header";
import { useEffect } from "react";
import { createDataByPath, getDataByPath } from "../../services/data.service";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";
const DetailMedicine = () => {
  const deviceId = axios
    .get("https://api.ipify.org/?format=json")
    .then((res) => res.data.ip);
  const detailId = localStorage.getItem("detailId");
  const [product, setProduct] = useState([]);
  const [descriptionModels, setDescriptionModels] = useState([]);
  const [cart, setCart] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [productID1, setproductID1] = useState(
    localStorage.getItem("detailId")
  );
  const update = (deviceId) => {
    localStorage.setItem("deviceId", deviceId);

    // history.push("/ViewCart");
  };
  const [showPrice, setShowPrice] = useState({
    price: "",
    unitName: "",
  });

  useEffect(() => {
    console.log("Updated cart:", cart);
  }, [cart]);

  async function loadDataProductId() {
    const path = `Product/View/${detailId}`;
    const res = await getDataByPath(path, "", "");
    console.log("res", res.data.name);
    console.log("productcc", product);
    if (res !== null && res !== undefined && res.status === 200) {
      setProduct(res.data);
      setShowPrice({
        ...showPrice,
        price: res.data.price,
        unitName: res.data.unitName,
      });
      setDescriptionModels(res.data.descriptionModels);
      setImageUrl(res.data.imageModels);
    }
  }
  const [subCategory, setSubCategory] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  async function loadDataCategory() {
    const path = `SubCategory?pageIndex=1&pageItems=20`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setSubCategory(res.data.items);
    }
  }
  useEffect(() => {
    loadDataCategory();
  }, []);

  async function addToCart() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      // const deviceId = await axios
      //   .get("https://api.ipify.org/?format=json")
      //   .then((res) => res.data.ip);
      // update(deviceId);
      const data = {
        deviceId: deviceId,
        item: {
          productId: localStorage.getItem("detailId"),
          quantity: quantity,
        },
      };

      console.log("Cart before API call:", cart);
      const path = "Cart";
      const res = await createDataByPath(path, accessToken, data);
      console.log("API response:", res);
      console.log("Product data:", product);

      if (res && res.status === 200) {
        toast.success("Đã Thêm Vào Giở Hàng");
        // window.location.reload();
      }
    } else {
      const deviceId = await axios
        .get("https://api.ipify.org/?format=json")
        .then((res) => res.data.ip);
      update(deviceId);
      const data = {
        deviceId: deviceId,
        item: {
          productId: productID1,
          quantity: quantity,
        },
      };
      console.log("Cart before API call:", cart);
      const path = "Cart";

      const res = await createDataByPath(path, "", data);
      console.log("API response:", res);
      console.log("Product data:", product);
      if (res && res.status === 200) {
        toast.success("Đã Thêm Vào Giở Hàng");
        // window.location.reload();
      }
    }
  }
  const handleSelect = (selectedIndex, e) => {
    setSelectedImageIndex(selectedIndex);
  };
  const subCategorys = subCategory.find(
    (sc) => sc.id === product.subCategoryId
  );
  const subCategoryName = subCategorys ? subCategorys.subCategoryName : "";
  useEffect(() => {
    loadDataProductId();
  }, []);
  useEffect(() => {
    console.log("product", product);
  }, [product]);
  return (
    <>
      <Header />
      <div className="site-wrap">
        <>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div className="breadcumb_area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <ol className="breadcrumb d-flex align-items-center">
                    <li className="breadcrumb-item">
                      <div href="#">Home</div>
                    </li>
                    <li className="breadcrumb-item">
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {subCategoryName}
                      </a>
                    </li>
                    <li className="breadcrumb-item active">{product.name}</li>
                  </ol>
                  {/* btn */}
                  <div href="#" className="backToHome d-block">
                    <i className="fa fa-angle-double-left" /> Back to Category
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="single_product_details_area section_padding_0_100">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="single_product_thumb">
                    <>
                      <Carousel
                        activeIndex={selectedImageIndex}
                        onSelect={handleSelect}
                        style={{ height: 500, width: 500 }}
                      >
                        {imageUrl.map((image) => (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={image.imageURL}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                      <div className="mt-3">
                        {imageUrl.map((image, index) => (
                          <img
                            key={image.id}
                            className={`carousel-thumb ${
                              index === selectedImageIndex ? "selected" : ""
                            }`}
                            src={image.imageURL}
                            onClick={() => setSelectedImageIndex(index)}
                          />
                        ))}
                      </div>
                    </>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="single_product_desc">
                    <h4 className="title">
                      <div href="#" style={{ color: "#82aae3" }}>
                        {product.name}
                      </div>
                    </h4>
                    <hr />
                    <h5
                      className="price"
                      style={{ color: "#1e293b", fontSize: 25 }}
                    >
                      {showPrice.price.toLocaleString("en-US")}/
                      {showPrice.unitName}
                    </h5>
                    <p className="available">
                      <span className="text-muted">Đơn Vị Bán</span>
                      <div
                        onClick={() => {
                          setproductID1(product.id);
                          setShowPrice({
                            ...showPrice,
                            price: product.price,
                            unitName: product.unitName,
                          });
                        }}
                      >
                        {product.unitName}
                      </div>
                      {product.productUnitReferences &&
                        product.productUnitReferences.map((unit) => {
                          return (
                            <div
                              key={unit.id}
                              onClick={() => {
                                setproductID1(unit.id);
                                setShowPrice({
                                  ...showPrice,
                                  price: unit.price,
                                  unitName: unit.unitName,
                                });
                              }}
                            >
                              {unit.unitName}
                            </div>
                          );
                        })}
                    </p>

                    <div className="widget size mb-50">
                      <h6 className="widget-title" style={{ color: "#334155" }}>
                        Danh Mục: {subCategoryName}{" "}
                      </h6>
                      <h6 className="widget-title" style={{ color: "#334155" }}>
                        Nhà Sản Xuất: {product.manufacturerId}{" "}
                      </h6>
                      <h6
                        className="widget-title"
                        style={{ color: "#334155", width: 700 }}
                      >
                        Công Dụng:{" "}
                        <div style={{ fontWeight: 400, lineHeight: 2 }}>
                          {descriptionModels.effect}{" "}
                        </div>
                      </h6>
                    </div>

                    {/* Add to Cart Form */}
                    <div className="cart clearfix mb-50 d-flex" method="post">
                      <div className="quantity">
                        <input
                          type="number"
                          className="qty-text"
                          id="qty"
                          step={1}
                          min={1}
                          max={12}
                          name="quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      <button
                        value={5}
                        className="btn cart-submit d-block"
                        style={{ backgroundColor: "#82aae3" }}
                        onClick={() => addToCart(detailId)}
                      >
                        Chọn Mua
                      </button>
                    </div>
                  </div>
                </div>
                <div id="accordion" role="tablist">
                  <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                      <h6 className="mb-0">
                        <div
                          data-toggle="collapse"
                          href="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Information
                        </div>
                      </h6>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      role="tabpanel"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Proin pharetra tempor so dales. Phasellus
                          sagittis auctor gravida. Integ er bibendum sodales
                          arcu id te mpus. Ut consectetur lacus.
                        </p>
                        <p>
                          Approx length 66cm/26" (Based on a UK size 8 sample)
                          Mixed fibres
                        </p>
                        <p>
                          The Model wears a UK size 8/ EU size 36/ US size 4 and
                          her height is 5'8"
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="headingTwo">
                      <h6 className="mb-0">
                        <div
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Cart Details
                        </div>
                      </h6>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Explicabo quis in veritatis officia inventore,
                          tempore provident dignissimos nemo, nulla quaerat.
                          Quibusdam non, eos, voluptatem reprehenderit hic nam!
                          Laboriosam, sapiente! Praesentium.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Officia magnam laborum eaque.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div
                      id="collapseThree"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Esse quo sint repudiandae suscipit ab soluta
                          delectus voluptate, vero vitae, tempore maxime rerum
                          iste dolorem mollitia perferendis distinctio.
                          Quibusdam laboriosam rerum distinctio. Repudiandae
                          fugit odit, sequi id!
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Beatae qui maxime consequatur laudantium
                          temporibus ad et. A optio inventore deleniti ipsa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <<<<<<<<<<<<<<<<<<<< Single Product Details Area End >>>>>>>>>>>>>>>>>>>>>>>>> */}
          {/* ****** Quick View Modal Area Start ****** */}
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
                                id="qty2"
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
                              Thêm Vào Giỏ Hàng
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
          <>
            <link
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
              rel="stylesheet"
            />
            <div className="container">
              <div className="be-comment-block">
                <h1 className="comments-title">Comments (3)</h1>
                <div className="be-comment">
                  <div className="be-img-comment">
                    <a href="blog-detail-2.html">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt=""
                        className="be-ava-comment"
                      />
                    </a>
                  </div>
                  <div className="be-comment-content">
                    <span className="be-comment-name">
                      <a href="blog-detail-2.html">Ravi Sah</a>
                    </span>
                    <span className="be-comment-time">
                      <i className="fa fa-clock-o" />
                      May 27, 2015 at 3:14am
                    </span>
                    <p className="be-comment-text">Thuoc nhu cc</p>
                  </div>
                </div>
                <div className="be-comment">
                  <div className="be-img-comment">
                    <a href="blog-detail-2.html">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        alt=""
                        className="be-ava-comment"
                      />
                    </a>
                  </div>
                  <div className="be-comment-content">
                    <span className="be-comment-name">
                      <a href="blog-detail-2.html">
                        Phoenix, the Creative Studio
                      </a>
                    </span>
                    <span className="be-comment-time">
                      <i className="fa fa-clock-o" />
                      May 27, 2015 at 3:14am
                    </span>
                    <p className="be-comment-text">dcmm</p>
                  </div>
                </div>
                <div className="be-comment">
                  <div className="be-img-comment">
                    <a href="blog-detail-2.html">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        alt=""
                        className="be-ava-comment"
                      />
                    </a>
                  </div>
                  <div className="be-comment-content">
                    <span className="be-comment-name">
                      <a href="blog-detail-2.html">Cüneyt ŞEN</a>
                    </span>
                    <span className="be-comment-time">
                      <i className="fa fa-clock-o" />
                      May 27, 2015 at 3:14am
                    </span>
                    <p className="be-comment-text">cc</p>
                  </div>
                </div>
                <form className="form-block">
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                      <div className="form-group fl_icon">
                        <div className="icon">
                          <i className="fa fa-user" />
                        </div>
                        <input
                          className="form-input"
                          type="text"
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 fl_icon">
                      <div className="form-group fl_icon">
                        <div className="icon">
                          <i className="fa fa-envelope-o" />
                        </div>
                        <input
                          className="form-input"
                          type="text"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div className="col-xs-12">
                      <div className="form-group">
                        <textarea
                          className="form-input"
                          required=""
                          placeholder="Your text"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <a className="btn btn-primary pull-right">submit</a>
                  </div>
                </form>
              </div>
            </div>
          </>

          <Footer />
          {/* ****** Quick View Modal Area End ****** */}
        </>
      </div>
    </>
  );
};
export default DetailMedicine;
