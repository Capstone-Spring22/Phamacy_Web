import { useEffect, useState } from "react";

import Footer from "../page/Footer";
import { useHistory } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { AiOutlineContainer } from "react-icons/ai";
import { FaUserNurse } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import Header from "./Header";
import {
  getDataByPath,
  deleteDataByPath,
} from "../../src/services/data.service";

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
    
    </>
  );
};
export default Home;
