import React from "react";

import Footer from "../page/Footer";
import Header from "./Header";
const DetailMedicine = () => {
  return (
    <>
    <Header/>
    <div className="site-wrap">
    <>
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
                    Vitamin
                  </a>
                </li>
                <li className="breadcrumb-item active">Anica</li>
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
                <div
                  id="product_details_slider"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <a
                        className="gallery_img"
                        href="img/product-img/product-9.jpg"
                      >
                        <img
                          className="d-block w-100"
                          src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/10/00021988-anica-phytextra-60v-5137-6347_large.jpg"
                          alt="First slide"
                        />
                      </a>
                    </div>
                    <div className="carousel-item">
                      <a
                        className="gallery_img"
                        href="img/product-img/product-2.jpg"
                      >
                        <img
                          className="d-block w-100"
                          src="img/product-img/product-2.jpg"
                          alt="Second slide"
                        />
                      </a>
                    </div>
                    <div className="carousel-item">
                      <a
                        className="gallery_img"
                        href="img/product-img/product-3.jpg"
                      >
                        <img
                          className="d-block w-100"
                          src="img/product-img/product-3.jpg"
                          alt="Third slide"
                        />
                      </a>
                    </div>
                    <div className="carousel-item">
                      <a
                        className="gallery_img"
                        href="img/product-img/product-4.jpg"
                      >
                        <img
                          className="d-block w-100"
                          src="img/product-img/product-4.jpg"
                          alt="Fourth slide"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="single_product_desc">
                <h4 className="title">
                  <div href="#">Anica</div>
                </h4>
                <h4 className="price">$ 39.99</h4>
                <p className="available">
                  Available: <span className="text-muted">In Stock</span>
                </p>
                <div className="single_product_ratings mb-15">
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star-o" aria-hidden="true" />
                </div>
                <div className="widget size mb-50">
                  <h6 className="widget-title">Size</h6>
                </div>
                {/* Add to Cart Form */}
                <form className="cart clearfix mb-50 d-flex" method="post">
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
                    className="btn cart-submit d-block"
                    style={{ backgroundColor: "#51eaea" }}
                  >
                    Add to cart
                  </button>
                </form>
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
                          The Model wears a UK size 8/ EU size 36/ US size 4
                          and her height is 5'8"
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
                          Quibusdam non, eos, voluptatem reprehenderit hic
                          nam! Laboriosam, sapiente! Praesentium.
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
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Mollitia expedita quibusdam aspernatur,
                          sapiente consectetur accusantium perspiciatis
                          praesentium eligendi, in fugiat?
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
                            <i className="fa fa-twitter" aria-hidden="true" />
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
<div className="container" >
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
        <p className="be-comment-text">
          Thuoc nhu cc
        </p>
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
          <a href="blog-detail-2.html">Phoenix, the Creative Studio</a>
        </span>
        <span className="be-comment-time">
          <i className="fa fa-clock-o" />
          May 27, 2015 at 3:14am
        </span>
        <p className="be-comment-text">
         dcmm
        </p>
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
        <p className="be-comment-text">
         cc
        </p>
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
  </div></>
    
  );
};
export default DetailMedicine;
