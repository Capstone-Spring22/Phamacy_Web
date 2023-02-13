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
function App() {
  return (
    <div className="site-wrap">
      <BrowserRouter>
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Sidebar">
            <SideBar />
          </Route>
          <Route path="/Medicine">
            <Medicine />
          </Route>
          <Route path="/Drug">
            <Drug />
          </Route>
          <Route path="/ViewDetail">
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
        </Switch>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
