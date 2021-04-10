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
                    <Nav.Link href={"/allUsers"}>Users</Nav.Link>
                    <Nav.Link href={"/allBookings"}>Bookings</Nav.Link>
                    <Nav.Link href={"/bisAnalytics"}>Analytics</Nav.Link>
                  </Nav>
                )}
                {businessUser && (
                  <NavDropdown title="Items" id="collasible-nav-dropdown">
                    <NavDropdown.Item href={"/addFoodItem"}>Add food</NavDropdown.Item>
                    <NavDropdown.Item href={"/addDrinkItem"}>Add drink</NavDropdown.Item>
                    <NavDropdown.Item href={"/allItems"}>View all</NavDropdown.Item>
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                  </NavDropdown>
                )}
                {businessUser && (
                  <NavDropdown title="Staff" id="collasible-nav-dropdown">
                    <NavDropdown.Item href={"/addStaff"}>Add a Staff member</NavDropdown.Item>
                    <NavDropdown.Item href={"/allStaff"}>View all staff</NavDropdown.Item>
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                  </NavDropdown>
                  
                )}
                {businessUser && (
                  <NavDropdown title="Tables" id="collasible-nav-dropdown">
                    <NavDropdown.Item href={"/addTable"}>Add a table</NavDropdown.Item>
                    <NavDropdown.Item href={"/allTables"}>Manage tables/Capacity</NavDropdown.Item>
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                  </NavDropdown>
                  
                )}
                {currentUser && !businessUser && (
                  <Nav className="mr-auto" >
                    <Nav.Link href={"/addBooking"}>New Booking</Nav.Link>
                    <Nav.Link href="/login" onClick={this.logOut}>Your Bookings</Nav.Link>
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
      <Route  path={"/register"} component={Register} /> 
      <Route  path={"/login"} component={Login} />
      <Route  path={"/userProfile"} component={UserProfile} /> 
    </Switch>
    </BrowserRouter>
  </div>
  </div>
  );
}}

export default App;
