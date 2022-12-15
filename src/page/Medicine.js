import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import {
  getDataByPath,
  deleteDataByPath,
} from "../../src/services/data.service";
import Header from "./Header";
const Medicine = () => {
  let history = useHistory();
  
  const viewDetail = () => {
    history.push("/ViewDetail");
  };
  const [apartment, setApartment] = useState([]);
  console.log("checkp", apartment)
  

  async function loadDataMedicine() {
    const path = `posts?_limit=10&_page=1`;
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
      
      <div id="wrapper" >
      <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0"><a href="index.html" style={{textDecoration: "none", color: "black"}}>Home</a> <span class="mx-2 mb-0">/</span> <strong class="text-black">Store</strong></div>
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Mollitia expedita quibusdam aspernatur, sapiente
                      consectetur accusantium perspiciatis praesentium eligendi,
                      in fugiat?
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
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-google-plus" aria-hidden="true" />
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
          <div className="shop_sidebar_area">
            <div className="widget catagory mb-50">
              {/*  Side Nav  */}
              <div className="nav-side-menu">
                <h6 className="mb-0">Catagories</h6>
                <div className="menu-list">
                  <ul id="menu-content2" className="">
                    {/* Single Item */}
                  
                    {/* Single Item */}
                    <li
                      data-toggle="collapse"
                      data-target="#man2"
                      className="collapsed"
                    >
                      <div href="#">Supplements</div>
                      <ul className="sub-menu collapse" id="man2">
                        <li>
                          <div href="#">Man Dresses</div>
                        </li>
                        <li>
                          <div href="#">Man Black Dresses</div>
                        </li>
                        <li>
                          <div href="#">Man Mini Dresses</div>
                        </li>
                      </ul>
                    </li>
                    {/* Single Item */}
                    <li
                      data-toggle="collapse"
                      data-target="#kids2"
                      className="collapsed"
                    >
                      <div href="#">Children</div>
                      <ul className="sub-menu collapse" id="kids2">
                        <li>
                          <a href="#">Children Dresses</a>
                        </li>
                        <li>
                          <a href="#">Mini Dresses</a>
                        </li>
                      </ul>
                    </li>
                    {/* Single Item */}
                    <li
                      data-toggle="collapse"
                      data-target="#bags2"
                      className="collapsed"
                    >
                      <div href="#">Tea &amp; Coffee</div>
                      <ul className="sub-menu collapse" id="bags2">
                        <li>
                          <a href="#">Bags</a>
                        </li>
                        <li>
                          <a href="#">Purses</a>
                        </li>
                      </ul>
                    </li>
                    {/* Single Item */}
                    <li
                      data-toggle="collapse"
                      data-target="#eyewear2"
                      className="collapsed"
                    >
                      <div href="#">Vitamin</div>
                      <ul className="sub-menu collapse" id="eyewear2">
                        <li>
                          <a href="#">Eyewear Style 1</a>
                        </li>
                        <li>
                          <a href="#">Eyewear Style 2</a>
                        </li>
                        <li>
                          <a href="#">Eyewear Style 3</a>
                        </li>
                      </ul>
                    </li>
                    {/* Single Item */}
                    <li
                      data-toggle="collapse"
                      data-target="#footwear2"
                      className="collapsed"
                    >
                      <div href="#">Diet</div>
                      <ul className="sub-menu collapse" id="footwear2">
                        <li>
                          <a href="#">Footwear 1</a>
                        </li>
                        <li>
                          <a href="#">Footwear 2</a>
                        </li>
                        <li>
                          <a href="#">Footwear 3</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        
           
            
            
          </div>
        </div>
        <div className="col-12 col-md-8 col-lg-9">
          <div className="shop_grid_product_area">
            <div className="row">

            {apartment &&
                apartment.length  &&
                apartment.map((e) => {
                  return (
              <div
                className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
                data-wow-delay="0.2s"
              >
                {/* Product Image */}
                <div className="product-img" onClick={()=>{viewDetail()}}>
                  <img src="https://2.bp.blogspot.com/-YgMzXWPY5HQ/WuP5zki97KI/AAAAAAAABlI/4xeIr098pfcnS1ikDL0uUCkyMRntS-h7gCLcBGAs/s320/pic-nature-bounty-fish-oil-200ct-www.huynhgia.biz.jpeg" alt="" />
                  <div className="product-quicview">
                    
                    <a href="#" data-toggle="modal" data-target="#quickview">
                    <BsPlus style={{marginBottom:10}}/>
                    </a>
                  </div>
                </div>
                {/* Product Description */}
                <div className="product-description">
                  <h4 className="product-price">{e.title}</h4>
                  <p>Jeans midi cocktail dress</p>
                  {/* Add to Cart */}
                  <a href="#" className="add-to-cart-btn">
                    ADD TO CART
                  </a>
                </div>
              </div>
               );
              })}
              {/* Single gallery Item */}
              <div
                className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
                data-wow-delay="0.3s"
              >
                {/* Product Image */}
                <div className="product-img">
                  <img src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/03/00033519-vitamin-c-vitagummies-120v-1353-6226_large.jpg" alt="" />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                    <BsPlus style={{marginBottom:10}}/>
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
              {/* Single gallery Item */}
              <div
                className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
                data-wow-delay="0.4s"
              >
                {/* Product Image */}
                <div className="product-img">
                  <img src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/10/00029877-omega-3-for-kids-300mg-nutrimed-international-100v-6416-633e_large.jpg" alt="" />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                    <BsPlus style={{marginBottom:10}}/>
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
              {/* Single gallery Item */}
              <div
                className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
                data-wow-delay="0.5s"
              >
                {/* Product Image */}
                <div className="product-img">
                  <img src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/01/00033279-xit-mui-muoi-bien-nano-sea-spray-nguoi-lon-75ml-6956-61e8_large.jpg" alt="" />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                    <BsPlus style={{marginBottom:10}}/>
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
              {/* Single gallery Item */}
              <div
                className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
                data-wow-delay="0.6s"
              >
                {/* Product Image */}
                <div className="product-img">
                  <img src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/10/00021988-anica-phytextra-60v-5137-6347_large.jpg" alt="" />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                    <BsPlus style={{marginBottom:10}}/>
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
              {/* Single gallery Item */}
              <div
                className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
                data-wow-delay="0.7s"
              >
                {/* Product Image */}
                <div className="product-img">
                  <img src="https://2.bp.blogspot.com/-YgMzXWPY5HQ/WuP5zki97KI/AAAAAAAABlI/4xeIr098pfcnS1ikDL0uUCkyMRntS-h7gCLcBGAs/s320/pic-nature-bounty-fish-oil-200ct-www.huynhgia.biz.jpeg" alt="" />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                    <BsPlus style={{marginBottom:10}}/>
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
              {/* Single gallery Item */}
              <div
                className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
                data-wow-delay="0.8s"
              >
                {/* Product Image */}
                <div className="product-img">
                  <img src="https://2.bp.blogspot.com/-YgMzXWPY5HQ/WuP5zki97KI/AAAAAAAABlI/4xeIr098pfcnS1ikDL0uUCkyMRntS-h7gCLcBGAs/s320/pic-nature-bounty-fish-oil-200ct-www.huynhgia.biz.jpeg" alt="" />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                    <BsPlus style={{marginBottom:10}}/>
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
              {/* Single gallery Item */}
              <div
                className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
                data-wow-delay="0.9s"
              >
                {/* Product Image */}
                <div className="product-img">
                  <img src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/09/00345416-vien-uong-bo-sung-vitamin-multi-vitas-lab-well-60-vien-7536-6327_large.jpg" alt="" />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                    <BsPlus style={{marginBottom:10}}/>
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
              {/* Single gallery Item */}
              <div
                className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
                data-wow-delay="1s"
              >
                {/* Product Image */}
                <div className="product-img">
                  <img src="https://images.fpt.shop/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com/images/product/2022/09/00345416-vien-uong-bo-sung-vitamin-multi-vitas-lab-well-60-vien-7536-6327_large.jpg" alt="" />
                  <div className="product-quicview">
                    <a href="#" data-toggle="modal" data-target="#quickview">
                    <BsPlus style={{marginBottom:10}}/>
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
          <div
            className="shop_pagination_area wow fadeInUp"
            data-wow-delay="1.1s"
          >
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm">
                <li className="page-item active">
                  <a className="page-link" href="#">
                    01
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    02
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    03
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
 
  {/* ****** Footer Area End ****** */}
</div>

    </div>
   </>
  );
};
export default Medicine;
