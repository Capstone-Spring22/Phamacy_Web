import {
  BrowserRouter,
  Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import AddToCart from "./page/Customer/AddToCart";
import Checkout from "./page/Customer/Checkout";
import Home from "./page/Customer/Home";
import Medicine from "./page/Customer/Medicine";
import DetailMedicine from "./page/Customer/Detail";
import SideBar from "./page/sidebar/SideBarAdmin";
import Drug from "./page/Admin/Drug";
import Site from "./page/Admin/Site";
import Employees from "./page/Admin/Employee";
import Profile from "./page/Admin/Profile";
import Order from "./page/Admin/Order";
import Login from "./page/Customer/Login";
import NewEmployees from "./page/Admin/NewEmployee";
import MainCategory from "./page/Admin/MainCategory";
import SubCategory from "./page/Admin/SubCategory";
import LoginAdmin from "./page/Admin/loginAdmin";
import NewDrug from "./page/Admin/NewDrug";
import UpdateDrug from "./page/Admin/UpdateDrug";
import ImportProduct from "./page/Admin/ImportProduct";
import AddImportProduct from "./page/Admin/AddImportProduct";
import UpdateImportProduct from "./page/Admin/UpdateImportProduct";
import ProductDiscount from "./page/Admin/ProductDiscount";
import NewDiscount from "./page/Admin/NewDiscount";
import UpdateDiscount from "./page/Admin/UpdateDiscount";
import OrderDetail from "./page/Admin/OrderDetail";
import CheckOutPharmacist from "./page/Admin/CheckOutPharmacist";
import VNPay from "./page/Customer/VNpay";
import HistoryOrder from "./page/Customer/HistoryOrder";
import Chat from "./page/Customer/Chat";
import ChatPharmacist from "./page/Admin/ChatPhamacist";
import ViewImportProduct from "./page/Admin/ViewImportProduct";

import { Redirect } from "react-router-dom";
import SiteOwner from "./page/Admin/SiteOwner";
import Dashboard from "./page/dashboard/DashBoardOwner";
import DashBoardOwner from "./page/dashboard/DashBoardOwner";
import ViewOrderDetail from "./page/Customer/ViewOrderDetail";
import Manufacturer from "./page/Admin/Manufature";
import DashBoardAdmin from "./page/dashboard/DashBoardAdmin";
import ViewEmployee from "./page/Admin/ViewEmployee";
function App() {
  return (
    <div className="site-wrap">
      <BrowserRouter>
        <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Sidebar">
            <SideBar />
          </Route>
          <Route path="/Medicine/:categoryId">
            <Medicine />
          </Route>
          <Route path="/Medicine">
            <Medicine />
          </Route>
          <Route path="/Drug">
            <Drug />
          </Route>
          <Route path="/ViewDetail/:productId">
            <DetailMedicine />
          </Route>
          <Route path="/ViewCart">
            <AddToCart />
          </Route>
          <Route path="/Checkout">
            <Checkout />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Employees">
            <Employees />
          </Route>
          <Route path="/Order">
            <Order />
          </Route>
          <Route path="/Site">
            <Site />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route path="/NewEmployees">
            <NewEmployees />
          </Route>
          <Route path="/ViewEmployee">
            <ViewEmployee />
          </Route>
          <Route path="/MainCategory">
            <MainCategory />
          </Route>
          <Route path="/SubCategory">
            <SubCategory />
          </Route>
          <Route path="/LoginAdmin">
            <LoginAdmin />
          </Route>
          <Route path="/NewDrug">
            <NewDrug />
          </Route>
          <Route path="/UpdateDrug">
            <UpdateDrug />
          </Route>
          <Route path="/ImportProduct">
            <ImportProduct />
          </Route>
          <Route path="/AddImportProduct">
            <AddImportProduct />
          </Route>
          <Route path="/UpdateImportProduct">
            <UpdateImportProduct />
          </Route>
          <Route path="/ProductDiscount">
            <ProductDiscount />
          </Route>
          <Route path="/NewDiscount">
            <NewDiscount />
          </Route>
          <Route path="/UpdateDiscount">
            <UpdateDiscount />
          </Route>
          <Route path="/OrderDetail">
            <OrderDetail />
          </Route>
          <Route path="/CheckOutPharmacist">
            <CheckOutPharmacist />
          </Route>
          <Route path="/VNPay">
            <VNPay />
          </Route>
          <Route path="/HistoryOrder">
            <HistoryOrder />
          </Route>
          <Route path="/Chat">
            <Chat />
          </Route>
          <Route path="/ChatPharmacist">
            <ChatPharmacist />
          </Route>
          <Route path="/ViewImportProduct">
            <ViewImportProduct />
          </Route>
          <Route path="/SiteOwner">
            <SiteOwner />
          </Route>
          <Route path="/DashBoardOwner">
            <DashBoardOwner />
          </Route>
          <Route path="/ViewOrderDetail">
            <ViewOrderDetail />
          </Route>
          <Route path="/Manufacturer">
            <Manufacturer />
          </Route>
          <Route path="/DashBoardAdmin">
            <DashBoardAdmin />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
