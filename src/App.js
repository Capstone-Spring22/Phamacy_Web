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
import SideBar from "./page/sidebar/SideBar";
import Drug from "./page/Admin/Drug";
import Employees from "./page/Admin/Employee";
import Order from "./page/Admin/Order";
import Login from "./page/Customer/Login";

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
        </Switch>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
