import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Nav, Navbar, NavDropdown, } from 'react-bootstrap';
import AuthService from "./services/AuthService";
import Register from "./components/RegisterComponent";
import Login from "./components/LoginComponent"; 
import UserProfile from "./components/UserProfileComponent"; 
import AddProduct from "./components/AddProductComponent"; 
import AllProducts from "./components/AllItemsComponent"; 
import UpdateProduct from "./components/UpdateProductComponent"; 
import Items from "./components/ItemsComponent"; 
import AllUser from "./components/AllUserComponent";
import UserDetails from "./components/UserDetailsComponent";
import UserOrder from "./components/UserOrderComponent"; 
import ProductReview from "./components/ProductReviewComponent"; 
import Search from "./components/SearchComponent";  
import BisUserSearch from "./components/BisUserSearchComponent";  
import OrderSummary from "./components/OrderSummaryComponent";
class App extends Component {
constructor(props) {
  super(props);
  this.logOut = this.logOut.bind(this);

  this.state = {
    businessUser: false,
    currentUser: undefined,
  };
}

componentDidMount() {
  const user = AuthService.getCurrentUser();
  console.log("Current user ", user)
  console.log("User local storage", localStorage.getItem("user"))

  if (user) {
    this.setState({
      currentUser: user,
      businessUser: user.roles.includes("ROLE_BUSINESS"),
    });
  }
}

logOut() {
  AuthService.logout();
}

render() {
  const { currentUser, businessUser } = this.state;

  return (
    <div>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Container>
          {businessUser && (
            <Navbar.Brand href={"/bisMenu"} bg="primary" variant="dark">{!currentUser ? <h2>Electric Shop</h2> : <h2>eShop</h2>}</Navbar.Brand>
          )}
          {!businessUser && (
            <Navbar.Brand href={"/profile"} bg="primary" variant="dark">{!currentUser ? <h2>Electric Shop</h2> : <h2>eShop</h2>}</Navbar.Brand>
          )}
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav " >
              <Nav className="mr-auto"  >

                {businessUser && (
                  <Nav className="mr-auto"  >
                    <Nav.Link href={"/allUser"}>Users</Nav.Link>
                    <Nav.Link href={"/allOrders"}>Orders</Nav.Link>
                  </Nav>
                )}
                {businessUser && (
                  <NavDropdown title="Items" id="collasible-nav-dropdown">
                    <NavDropdown.Item href={"/addProduct"}>Add product</NavDropdown.Item>
                    <NavDropdown.Item href={"/allProducts"}>View all</NavDropdown.Item>
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                  </NavDropdown>
                )}
                {currentUser && !businessUser && (
                  <Nav className="mr-auto" >
                    <Nav.Link href={"/allItems"}>Products</Nav.Link>
                    <Nav.Link href="/userOrder" >Your orders</Nav.Link>
                  </Nav>
                )}
              </Nav>
              {currentUser && (
                <Nav className="ml-auto" >
                  <Nav.Link href={"/profile"}>{currentUser.username}</Nav.Link>
                  <Nav.Link href="/home" onClick={this.logOut}>Log out</Nav.Link>

                </Nav>
              )}
              {!currentUser && (
                <Nav className="ml-auto" >
                  <Nav.Link href={"/login"}>Login</Nav.Link>
                  <Nav.Link className="mr-sm-2" href={"/register"} >Sign up</Nav.Link>
                  <Nav.Link className="mr-sm-2" href={"/registerAdmin"} >Sign up admin</Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>


        </Navbar>
      </div>
  
  
    <div className="container mt-3">
    <BrowserRouter>
    <Switch>
      <Route  path={"/addProduct"} component={AddProduct} /> 
      <Route  path={"/allProducts"} component={AllProducts} />
      <Route  path={"/register"} component={Register} /> 
      <Route  path={"/login"} component={Login} />
      <Route  path={"/userProfile"} component={UserProfile} />  
      <Route  path={"/allItems"} component={Items} />  
      <Route path={"/updateProduct/:id"} component={UpdateProduct}/>
      <Route  path={"/items"} component={Items} /> 
      <Route  path={"/allUser"} component={AllUser} /> 
      <Route path={"/userDetails/:id"} component={UserDetails}/> 
      <Route  path={"/userOrder"} component={UserOrder} /> 
      <Route path={"/productReview/:id"} component={ProductReview}/> 
      <Route path={"/search"} component={Search}/> 
      <Route path={"/bisUserSearch"} component={BisUserSearch}/> 
      <Route path={"/orderSummary/:id"} component={OrderSummary}/> 
    </Switch>
    </BrowserRouter>
  </div>
  </div>
  );
}}

export default App;
