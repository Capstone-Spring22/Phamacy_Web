import { useEffect, useState } from "react";

import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { BsPlus } from "react-icons/bs";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import Header from "../Header/Header";
import { getDataByPath, deleteDataByPath } from "../../services/data.service";
import { CATEGORIES, ListNewProduct } from "../Data";

const Home = () => {
  const [apartment, setApartment] = useState([]);
  let history = useHistory();

  const viewDetail = () => {
    history.push("/ViewDetail");
  };

  async function loadDataMedicine() {
    const path = `posts`;
    const res = await getDataByPath(path, "", "");
    console.log("check", res);
    if (res !== null && res !== undefined && res.status === 200) {
      setApartment(res.data);
    }
  }

  useEffect(() => {
    loadDataMedicine();
  }, []);

  return (
    <>
      <Header />
      <div className="site-wrap">
        <Carousel fade>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src="https://images.fpt.shop/unsafe/fit-in/1600x400/filters:quality(80):fill(white)/nhathuoclongchau.com/upload/slide/1670468707-psqD-santen-1000-shop.png"
              style={{ height: 400 }}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100 "
              style={{ height: 400 }}
              src="https://images.fpt.shop/unsafe/fit-in/1600x400/filters:quality(80):fill(white)/nhathuoclongchau.com/upload/slide/1670988843-j0YT-abbott-1000-shop.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.fpt.shop/unsafe/fit-in/1600x400/filters:quality(80):fill(white)/nhathuoclongchau.com/upload/slide/1670988143-DNwb-dac-quyen-mua-hang-1k.jpg"
              style={{ height: 400 }}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>


        <div className="site-section" style={{marginBottom:-111}}>
          <div className="container" >
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">Buy Medicines Easily In Phama</h2>
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
                            style={{ height: 100 , width: 100 }}
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
        <div className="site-section" >
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

            <div className="container ">
              <div className="row karl-new-arrivals ">
                {/* {apartment &&
                apartment.length  &&
                apartment.map((e) => {
                  return ( */}
                {ListNewProduct.map((item, index) => {
                  return (
                    <div
                      className=" col-md-2 single_gallery_item women wow fadeInUpBig "
                      data-wow-delay="0.2s"
                    >
                      {/* Product Image */}
                      <div
                        className="product-img "
                        style={{borderRadius:5,height:280}}
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
                {/* );
    })} */}
              </div>
            </div>
          </div>
        </section>
        <Carousel fade>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src="https://images.fpt.shop/unsafe/fit-in/1600x400/filters:quality(80):fill(white)/nhathuoclongchau.com/upload/slide/1670468707-psqD-santen-1000-shop.png"
              style={{ height: 400 }}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100 "
              style={{ height: 400 }}
              src="https://images.fpt.shop/unsafe/fit-in/1600x400/filters:quality(80):fill(white)/nhathuoclongchau.com/upload/slide/1670468502-rwBT-hoang-gia-royal-1000-shop.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.fpt.shop/unsafe/fit-in/1600x400/filters:quality(80):fill(white)/nhathuoclongchau.com/upload/slide/1670471568-TkWI-davimin-1000-shop.jpg"
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
                   {ListNewProduct.map((item, index) => {
                  return (
                    <div
                      className=" col-md-2 single_gallery_item women wow fadeInUpBig "
                      data-wow-delay="0.2s"
                    >
                      {/* Product Image */}
                      <div
                        className="product-img "
                        style={{borderRadius:5,height:280}}
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
