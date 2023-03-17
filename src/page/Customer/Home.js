import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import Header from "../Header/Header";
import {
  getDataByPath,
  deleteDataByPath,
  createDataByPath,
} from "../../services/data.service";
import { CATEGORIES, ListNewProduct } from "../Data";

const Home = () => {
  const [apartment, setApartment] = useState([]);
  let history = useHistory();
  const [drug, setDrug] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalRecord, setTotalRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const update = (cartId) => {
    localStorage.setItem("cartId", cartId);

    history.push("/ViewCart");
  };
  const viewDetail = () => {
    history.push("/ViewDetail");
  };

  async function loadDataMedicine() {
    const path = `Product?isSellFirstLevel=true&pageIndex=${currentPage}&pageItems=${perPage}`;
    const res = await getDataByPath(path, "", "");
    console.log("display", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDrug(res.data.items);
      setTotalRecord(res.data.totalRecord);
      console.log("display", currentPage);
    }
  }
  const checkValidation = () => {
    // if (id.trim() === "") {
    //   Swal.fire("ID Can't Empty", "", "question");
    //   return false;
    // }
    return true;
  };
  const [product, setProduct] = useState({
    cartId: "",
    item: {
      productId: "",
      quantity: 0,
    },
  });
  async function addToCart(productId) {
    if (checkValidation()) {
      const cartId = await axios.get("https://api.ipify.org/?format=json")
      .then((res) => res.data.ip);
    setProduct({
      cartId,
      item: {
        productId,
        quantity: product.item.productId === productId ? product.item.quantity + 1 : 1,
      },
    });
      const path = "Cart";
      const res = await createDataByPath(path, "", product);
      console.log("Check res", res);
      console.log("display du lieu", product);
      if (res && res.status === 201) {
        Swal.fire("Create Success", "", "success");
        // window.location.reload();
      }
    }
  }
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    loadDataMedicine();
  }, [currentPage, perPage]);
  const handleDragStart = (e) => e.preventDefault();
  return (
    <>
        <div className="site-navbar py-2">
      <div className="search-wrap">
        <div className="container">
          <div className="search-box">
            <button className="btn-search">
              <i className="icon-close2" />
            </button>
            <form action="#" method="post">
              <input
                type="text"
                className="input-search"
                placeholder="Type to Search..."
              />
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <div className="site-logo">
              <a href="/Home" className="js-logo-clone" >
                Pharma
              </a>
            </div>
          </div>
          <div className="main-nav d-none d-lg-block">
            <nav
              className="site-navigation text-right text-md-center"
              role="navigation"
            >
              <ul className="site-menu js-clone-nav d-none d-lg-block">
                <li className="active">
                  <Link activeClassName="active" to="/Home" exact>
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" to="/Medicine">
                    <span>Store</span>
                  </Link>
                </li>

              
                <li className="has-children">
                  <Link to="#">Category</Link>
                  <ul className="dropdown">
                    <li>
                      <Link to="#">Supplements</Link>
                    </li>
                    <li className="has-children">
                      <Link to="#">Vitamins</Link>
                      <ul className="dropdown">
                        <li>
                          <Link to="#">Supplements</Link>
                        </li>
                        <li>
                          <Link to="#">Vitamins</Link>
                        </li>
                        <li>
                          <Link to="#">Diet &amp; Nutrition</Link>
                        </li>
                        <li>
                          <Link to="#">Tea &amp; Coffee</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="#">Diet &amp; Nutrition</Link>
                    </li>
                    <li>
                      <Link to="#">Tea &amp; Coffee</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link activeClassName="active" to="/LoginAdmin">
                    <span>LoginAdmin</span>
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" to="/Login">
                    <span>Login</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="icons">
            <Link to="#" className="icons-btn d-inline-block js-search-open"></Link>
            <div className="search-box icons-btn d-inline-block js-search-open">
              <button className="btn-search">
                <span className="icon-search" />
              </button>
              <input
                type="text"
                className="input-search"
                placeholder="Type to Search..."
                style={{ color: "black" }}
              />
            </div>

            <Link to="/ViewCart"  className="icons-btn d-inline-block bag" >
              <span className="icon-shopping-bag" />
              <span className="number">2</span>
            </Link>
            <Link
              href="#"
              className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"
            >
              <span className="icon-menu" />
            </Link>
          </div>
        </div>
      </div>
    </div>
      <div className="site-wrap">
        <Carousel fade>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1678417597-7D25-kem-chong-nang-2023.png"
              style={{ height: 400 }}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100 "
              style={{ height: 400 }}
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1677150972-hsMN-cam-cum.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1677728079-Ssmc-brauer-tang-de-khang.png"
              style={{ height: 400 }}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>

        <div className="site-section" style={{ marginBottom: -111 }}>
          <div className="container">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase" style={{}}>
                Mua Thuốc Dễ Dàng{" "}
              </h2>
            </div>
            <section class="ftco-section ftco-no-pt ftco-no-pb">
              <div class="container">
                <div class="row no-gutters ftco-services">
                  <div class="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                    <div class="media block-6 services p-4 py-md-5">
                      <div class="media-body">
                        <div class="icon d-flex justify-content-center align-items-center mb-4">
                          <img
                            src="https://nhathuoclongchau.com/frontend_v3/images/banner-html/home/chuptoathuoc.png"
                            style={{ height: 100, width: 100 }}
                          />
                        </div>
                        <h3 class="heading">
                          {" "}
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp;PHOTOGRAPHY OF MEDICINE
                        </h3>
                        <p>simple & fast</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                    <div class="media block-6 services p-4 py-md-5">
                      <div class="media-body">
                        <div class="icon d-flex justify-content-center align-items-center mb-4">
                          <img
                            src="https://nhathuoclongchau.com/frontend_v3/images/banner-html/home/info-ct.png"
                            style={{ height: 100, width: 100 }}
                          />
                        </div>
                        <h3 class="heading">
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ENTER CONTACT
                          INFORMATION &nbsp; &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        </h3>
                        <p>for ordering advice</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                    <div class="media block-6 services p-4 py-md-5">
                      <div class="media-body">
                        <div class="icon d-flex justify-content-center align-items-center mb-4">
                          <img
                            src="https://nhathuoclongchau.com/frontend_v3/images/banner-html/home/duoc-sy.png"
                            style={{ height: 100, width: 100 }}
                          />
                        </div>
                        <h3 class="heading">
                          GET A PRICE FROM THE PHARMACEUTICAL
                        </h3>
                        <p>Free consultation included</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="site-section">
          <div className="container">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">Category</h2>
            </div>
            <div className="row align-items-stretch section-overlap">
              {CATEGORIES.map((item, index) => {
                return (
                  <div className="col-md-2 col-lg-2 mb-2 mb-lg-2 hv">
                    <div
                      className="banner-wrap  h-100"
                      style={{ backgroundColor: "#e8f5fd" }}
                    >
                      <a
                        href="#"
                        className="h-100"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <img
                          className="hv"
                          src={item.src}
                          style={{ height: 100, width: 100 }}
                        />

                        <br />
                        <br />
                        <h6
                          key={index}
                          style={{ color: "black", fontSize: 17 }}
                        >
                          {item.name}
                        </h6>
                      </a>
                    </div>
                  </div>
                );
              })}

              {/* </div>
  </div>
</div>
<div className="site-section">
  <div className="container">
    <div className="row align-items-stretch section-overlap"> */}
            </div>
          </div>
        </div>

        <section class="new_arrivals_area section_padding_10_0 clearfix">
          <div className="container">
            <div className="row">
              <div className="title-section text-center col-12">
                <h2 className="text-uppercase">NEW PRODUCT</h2>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="container " style={{ display: "flex" }}>
              {drug &&
                drug.length &&
                drug.map((item, index) => {
                  return (
                    <div className="product-card" key={item.id}>
                      <img src={item.imageModel.imageURL} alt="Product Image" />
                      <div className="product-info">
                        {" "}
                        <h2 className="product-name">{item.name}</h2>
                        <div style={{ display: "flex", marginTop: 50 }}>
                          <p className="product-price">${item.price}</p>
                          <button className="add-to-cart" onClick={() => addToCart(item.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-cart-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
        <Carousel fade>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1676971969-r79p-co-qua-anh-duoc-ve-nha-8-3.png"
              style={{ height: 400 }}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100 "
              style={{ height: 400 }}
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1677728079-Ssmc-brauer-tang-de-khang.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/1600x400/filters:quality(100):fill(white)/https://nhathuoclongchau.com.vn/upload/slide/1678076840-UxPd-sua-abbott.png"
              style={{ height: 400 }}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <section class="new_arrivals_area section_padding_100_0 clearfix">
          <div className="container">
            <div className="row">
              <div className="title-section text-center col-12">
                <h2 className="text-uppercase">Popular Medicine</h2>
              </div>
            </div>
            <br />
            <br />
            <br />

            <div className="container ">
              <div className="row karl-new-arrivals ">
                {/* {apartment &&
                apartment.length  &&
                apartment.map((e) => {
                  return ( */}
                <AliceCarousel>
                  {ListNewProduct.map((item, index) => {
                    return (
                      <div
                        className=" col-md-2 single_gallery_item women wow fadeInUpBig "
                        data-wow-delay="0.2s"
                      >
                        {/* Product Image */}
                        <div
                          className="product-img "
                          style={{ borderRadius: 5, height: 280 }}
                          onClick={() => {
                            viewDetail();
                          }}
                        >
                          <img src={item.src} alt="" />
                          <div className="product-quicview">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#quickview"
                            >
                              <BsPlus style={{ marginBottom: 10 }} />
                            </a>
                          </div>
                        </div>

                        {/* Product Description */}
                        <div className="product-description">
                          <h4 className="product-price"> {item.price}</h4>
                          <p>{item.name}</p>
                          {/* Add to Cart */}
                          <a href="#" className="add-to-cart-btn">
                            ADD TO CART
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </AliceCarousel>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default Home;
