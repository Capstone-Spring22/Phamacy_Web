import { useEffect, useState } from "react";

import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { AiOutlineContainer } from "react-icons/ai";
import { FaUserNurse } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import Header from "../Header/Header";
import {
  getDataByPath,
  deleteDataByPath,
} from "../../services/data.service";

const CATEGORIES = [{src:"https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm373batch15-217-01-kqdjajvh.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=15fccb3bc143a97781dc8845d6b00c9c", name:"physiological"},
{src:"https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/ho-tro-tieu-hoa.png",name:"medicine"}];
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
    <Header/>
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
     
      <div className="site-section">
        <div className="container">
          <div className="title-section text-center col-12">
            <h2 className="text-uppercase">Buy Medicines Easily In Phama</h2>
          </div>
          <section class="ftco-section ftco-no-pt ftco-no-pb" >
            <div class="container">
              <div class="row no-gutters ftco-services">
                <div class="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                  <div class="media block-6 services p-4 py-md-5">
                    <div class="media-body">
                      <div class="icon d-flex justify-content-center align-items-center mb-4">
                      <img src="https://nhathuoclongchau.com/frontend_v3/images/banner-html/home/chuptoathuoc.png" 
          style={{height:100,width:100}}
          />
                      </div>
                      <h3 class="heading"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;PHOTOGRAPHY OF MEDICINE</h3>
                      <p>simple & fast</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                  <div class="media block-6 services p-4 py-md-5">
                    <div class="media-body">
                      <div class="icon d-flex justify-content-center align-items-center mb-4">
                      <img src="https://nhathuoclongchau.com/frontend_v3/images/banner-html/home/info-ct.png" 
          style={{height:100,width:100}}
          />
                      </div>
                      <h3 class="heading">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ENTER CONTACT INFORMATION &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</h3>
                      <p>for ordering advice</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 text-center d-flex align-self-stretch ftco-animate">
                  <div class="media block-6 services p-4 py-md-5">
                    <div class="media-body">
                      <div class="icon d-flex justify-content-center align-items-center mb-4">
                        <img src="https://nhathuoclongchau.com/frontend_v3/images/banner-html/home/duoc-sy.png" 
          style={{height:100,width:100}}
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
      <div className="col-md-3 col-lg-2 mb-2 mb-lg-2"  >
        <div className="banner-wrap   h-100 " style={{backgroundColor: "#e8f5fd"}}>
        
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/sinh-ly-noi-tiet-to.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          
            <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
      <div className="col-md-2 col-lg-2 mb-4 mb-lg-2">
        <div className="banner-wrap h-100" style={{backgroundColor: "#fef7dc"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/images/category/20220624120650-9722.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            {}
            </h6>
            
          </a>
        </div>
      </div>
      <div className="col-md-2 col-lg-2 mb-2 mb-lg-2">
        <div className="banner-wrap  h-100" style={{backgroundColor: "#e8f5fd"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/ho-tro-tieu-hoa.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
      <div className="col-md-2 col-lg-2 mb-2 mb-lg-2">
        <div className="banner-wrap  h-100" style={{backgroundColor: "#fef7dc"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/than-kinh-nao.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
      <div className="col-md-2 col-lg-2 mb-2 mb-lg-2">
        <div className="banner-wrap  h-100" style={{backgroundColor: "#e8f5fd"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/cai-thien-tang-cuong-chuc-nang.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
      <div className="col-md-2 col-lg-2 mb-2 mb-lg-2">
        <div className="banner-wrap  h-100" style={{backgroundColor: "#fef7dc"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/images/category/20220624120646-2097.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
      {/* </div>
  </div>
</div>
<div className="site-section">
  <div className="container">
    <div className="row align-items-stretch section-overlap"> */}
      <div className="col-md-2 col-lg-2 mb-2 mb-lg-2">
        <div className="banner-wrap  h-100" style={{backgroundColor: "#fef7dc"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/cham-soc-da-mat.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
      <div className="col-md-2 col-lg-2 mb-2 mb-lg-2">
        <div className="banner-wrap  h-100" style={{backgroundColor: "#e8f5fd"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/cham-soc-toc-da-dau.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
      <div className="col-md-2 col-lg-2 mb-2 mb-lg-2">
        <div className="banner-wrap  h-100" style={{backgroundColor: "#fef7dc"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/ho-tro-tinh-duc.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
      <div className="col-md-2 col-lg-2 mb-2 mb-lg-2">
        <div className="banner-wrap  h-100" style={{backgroundColor: "#e8f5fd"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/cham-soc-rang-mieng.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
      <div className="col-md-2 col-lg-2 mb-2 mb-lg-2">
        <div className="banner-wrap  h-100" style={{backgroundColor: "#fef7dc"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/upload/images/filtercate/ve-sinh-ca-nhan.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
      <div className="col-md-2 col-lg-2 mb-2 mb-lg-2">
        <div className="banner-wrap  h-100" style={{backgroundColor: "#e8f5fd"}}>
          <a href="#" className="h-100" style={{textDecoration: "none", color: "black"}}>
          <img src="https://images.fpt.shop/unsafe/fit-in/150x150/filters:quality(90):fill(white)/nhathuoclongchau.com/images/category/20220624120605-4612.png" 
          style={{height:100,width:100}}
          />
          <br/>
          <br/>
          <h6 style={{color: "black", fontSize:17}}>
            physiological
            </h6>
           
          </a>
        </div>
      </div>
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

              <div
                className=" col-md-2 single_gallery_item women wow fadeInUpBig "
                data-wow-delay="0.2s"
              >
                {/* Product Image */}
                <div
                  className="product-img "
                  style={{ borderRadius: 10 }}
                  onClick={() => {
                    viewDetail();
                  }}
                >
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/09/00345416-vien-uong-bo-sung-vitamin-multi-vitas-lab-well-60-vien-7536-6327_large.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>

                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">212121</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              {/* );
    })} */}

              {/* Single gallery Item Start */}
              <div
                className="col-12 col-sm-6 col-md-2 single_gallery_item women wow fadeInUpBig"
                data-wow-delay="0.3s"
              >
                {/* Product Image */}
                <div className="product-img" style={{ borderRadius: 10 }}>
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/10/00021988-anica-phytextra-60v-5137-6347_large.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">$39.90</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              {/* Single gallery Item Start */}
              <div
                className="col-12 col-sm-6 col-md-2 single_gallery_item access wow fadeInUpBig"
                data-wow-delay="0.4s"
              >
                {/* Product Image */}
                <div className="product-img" style={{ borderRadius: 10 }}>
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/08/00501778--3834-630e_large.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">$39.90</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-md-2 single_gallery_item access wow fadeInUpBig"
                data-wow-delay="0.4s"
              >
                {/* Product Image */}
                <div className="product-img" style={{ borderRadius: 10 }}>
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/08/00501778--3834-630e_large.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">$39.90</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-md-2 single_gallery_item access wow fadeInUpBig"
                data-wow-delay="0.4s"
              >
                {/* Product Image */}
                <div className="product-img" style={{ borderRadius: 10 }}>
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/08/00501778--3834-630e_large.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">$39.90</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              {/* Single gallery Item Start */}
              <div
                className="col-12 col-sm-6 col-md-2 single_gallery_item shoes wow fadeInUpBig"
                data-wow-delay="0.5s"
              >
                {/* Product Image */}
                <div className="product-img" style={{ borderRadius: 10 }}>
                  <img
                    src="https://2.bp.blogspot.com/-YgMzXWPY5HQ/WuP5zki97KI/AAAAAAAABlI/4xeIr098pfcnS1ikDL0uUCkyMRntS-h7gCLcBGAs/s320/pic-nature-bounty-fish-oil-200ct-www.huynhgia.biz.jpeg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">$39.90</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              {/* Single gallery Item Start */}

              {/* Single gallery Item */}
            </div>
          </div>
        </div>
      </section>
      <Carousel fade>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://images.fpt.shop/unsafe/fit-in/1600x400/filters:quality(80):fill(white)/nhathuoclongchau.com/upload/slide/1670468707-psqD-santen-1000-shop.png"
            style={{ height: 400}}
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

              <div
                className=" col-md-2 single_gallery_item women wow fadeInUpBig "
                data-wow-delay="0.2s"
              >
                {/* Product Image */}
                <div
                  className="product-img "
                  style={{ borderRadius: 10 }}
                  onClick={() => {
                    viewDetail();
                  }}
                >
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/09/00345416-vien-uong-bo-sung-vitamin-multi-vitas-lab-well-60-vien-7536-6327_large.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>

                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">212121</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              {/* );
    })} */}

              {/* Single gallery Item Start */}
              <div
                className="col-12 col-sm-6 col-md-2 single_gallery_item women wow fadeInUpBig"
                data-wow-delay="0.3s"
              >
                {/* Product Image */}
                <div className="product-img" style={{ borderRadius: 10 }}>
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/10/00021988-anica-phytextra-60v-5137-6347_large.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">$39.90</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              {/* Single gallery Item Start */}
              <div
                className="col-12 col-sm-6 col-md-2 single_gallery_item access wow fadeInUpBig"
                data-wow-delay="0.4s"
              >
                {/* Product Image */}
                <div className="product-img" style={{ borderRadius: 10 }}>
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/08/00501778--3834-630e_large.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">$39.90</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-md-2 single_gallery_item access wow fadeInUpBig"
                data-wow-delay="0.4s"
              >
                {/* Product Image */}
                <div className="product-img" style={{ borderRadius: 10 }}>
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/08/00501778--3834-630e_large.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">$39.90</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-md-2 single_gallery_item access wow fadeInUpBig"
                data-wow-delay="0.4s"
              >
                {/* Product Image */}
                <div className="product-img" style={{ borderRadius: 10 }}>
                  <img
                    src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/08/00501778--3834-630e_large.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">$39.90</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
              {/* Single gallery Item Start */}

              {/* Single gallery Item */}

              <div
                className="col-12 col-sm-6 col-md-2 single_gallery_item kids man wow fadeInUpBig"
                data-wow-delay="0.7s"
              >
                {/* Product Image */}
                <div className="product-img" style={{ borderRadius: 10 }}>
                  <img
                    src="https://www.lamdepeva.vn/images/201802/goods_img/vien-dep-da-vitamin-e-kirkland-signature-cua-my---500-vien-P207-1519328879626.jpg"
                    alt=""
                  />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                      <BsPlus style={{ marginBottom: 10 }} />
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">$39.90</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
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
