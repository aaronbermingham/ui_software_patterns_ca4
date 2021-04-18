import React, { Component } from "react";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";
import { Card, Form, Row, Col, ListGroup, Button } from "react-bootstrap";
import CartService from "../services/CartService";
import AddressService from "../services/AddressService";

class OrderSummaryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      userId: 0,
      name: "",
      uName: "",
      address1: "",
      address2: "",
      town: "",
      county: "",
      country: "",
      price: 0,
      stock: 0,
      type: "",
      bisUser: false,
      pp: false,
      cc: false,
      currentUser: undefined,
      itemList: [],
      totalPrice: 0,
      cardNum: 0,
      ccv: 0,
      expDate: "",
      email: "",
      password: "",
      discountString: "",
      discount: 0,
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeAddress1Handler = this.changeAddress1Handler.bind(this);
    this.changeAddress2Handler = this.changeAddress2Handler.bind(this);
    this.changeTownHandler = this.changeTownHandler.bind(this);
    this.changeCountyHandler = this.changeCountyHandler.bind(this);
    this.changeCountryHandler = this.changeCountryHandler.bind(this);
    this.changeCardNumHandler = this.changeCardNumHandler.bind(this);
    this.handlePaypalChange = this.handlePaypalChange.bind(this);
    this.handleCreditChange = this.handleCreditChange.bind(this);
    this.changeCcvNumHandler = this.changeCcvNumHandler.bind(this);
    this.changeExpDateHandler = this.changeExpDateHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeDiscountHandler = this.changeDiscountHandler.bind(this);
    this.applyDiscount = this.applyDiscount.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user ", user);
    console.log("Current id ", this.state.id);
    if (user) {
      this.setState({
        currentUser: user,
        userId: user.id,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
    this.getCartSummary();
    ItemService.getItemById(this.state.id);
    ItemService.getItemById(this.state.id).then((res) => {
      let item = res.data;
      this.setState({
        name: item.name,
        manufacturer: item.manufacturer,
        price: item.price,
        stock: item.stock,
        type: item.type,
      });
    });
  }

  getCartSummary() {
    CartService.getCartById(this.state.id).then((res) => {
      let cart = res.data;
      this.setState({
        itemList: cart.itemList,
        totalPrice: cart.totalPrice,
      });
    });
  }

  handlePaypalChange(pp) {
    this.setState({ pp: !this.state.pp });
    this.setState({ cc: false });
  }
  handleCreditChange(cc) {
    this.setState({ cc: !this.state.cc });
    this.setState({ pp: false });
  }

  changeNameHandler = (event) => {
    this.setState({ uName: event.target.value });
  };

  changeAddress1Handler = (event) => {
    this.setState({ address1: event.target.value });
  };

  changeAddress2Handler = (event) => {
    this.setState({ address2: event.target.value });
  };

  changeTownHandler = (event) => {
    this.setState({ town: event.target.value });
  };

  changeCountyHandler = (event) => {
    this.setState({ county: event.target.value });
  };

  changeCountryHandler = (event) => {
    this.setState({ country: event.target.value });
  };

  changeExpDateHandler = (event) => {
    this.setState({ expDate: event.target.value });
  };

  changeCcvNumHandler = (event) => {
    this.setState({ ccv: event.target.value });
  };

  changeCardNumHandler = (event) => {
    this.setState({ cardNum: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  changeDiscountHandler = (event) => {
    this.setState({ discountString: event.target.value });
  };

  addAddress = (e) => {
    e.preventDefault();
    let address = {
      address1: this.state.address1,
      address2: this.state.address2,
      town: this.state.town,
      county: this.state.county,
      country: this.state.country,
    };
    console.log("item => " + JSON.stringify(address));
    AddressService.addAddress(address, this.state.userId).then((res) => {});
  };

  applyDiscount() {
    CartService.discountCart(this.state.id, this.state.discountString).then(
      (res) => {
        let num = res.data;
        this.setState({
          discountPrice: num,
        });
        console.log("Discount ", num);
        CartService.getCartById(this.state.id).then((res) => {
          let cart = res.data;
          this.setState({
            itemList: cart.itemList,
            totalPrice: cart.totalPrice,
          });
        });
      }
    );
  }

  cancel() {
    this.props.history.push("/allProducts");
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Add your details</h3>
              <Col>
                <Card border="primary">
                  <Card.Body>
                    <Card.Title>Your order</Card.Title>
                    <Card.Text>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          {this.state.itemList.map((subitem, i) => {
                            return (
                              <ListGroup.Item>{subitem.name}</ListGroup.Item>
                            );
                          })}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Price: {this.state.totalPrice}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="form-group">
                            <label>Discount</label>
                            <input
                              placeholder="Discount"
                              name="discountString"
                              className="form-control"
                              value={this.state.discountString}
                              onChange={this.changeDiscountHandler}
                            />
                            <Button
                              variant="primary"
                              type="submit"
                              onClick={this.applyDiscount}
                              disabled={this.state.discountPrice > 0}
                            >
                              Submit
                            </Button>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <div className="card-body">
                  <form>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            placeholder="Name"
                            name="uName"
                            className="form-control"
                            value={this.state.uName}
                            onChange={this.changeNameHandler}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Address Line 1</label>
                          <input
                            placeholder="Address Line 1"
                            name="address1"
                            className="form-control"
                            value={this.state.address1}
                            onChange={this.changeAddress1Handler}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>Address Line 2</label>
                          <input
                            placeholder="Address Line 2"
                            name="address2"
                            className="form-control"
                            value={this.state.address2}
                            onChange={this.changeAddress2Handler}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Town</label>
                          <input
                            placeholder="Town"
                            name="town"
                            className="form-control"
                            value={this.state.town}
                            onChange={this.changeTownHandler}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label>County</label>
                          <input
                            placeholder="County"
                            name="county"
                            className="form-control"
                            value={this.state.county}
                            onChange={this.changeCountyHandler}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            placeholder="Country"
                            name="country"
                            className="form-control"
                            value={this.state.country}
                            onChange={this.changeCountryHandler}
                          />
                        </div>
                      </Col>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={this.addAddress}
                      >
                        Submit
                      </Button>
                    </Row>
                    <Row>
                      <Form.Check
                        type="switch"
                        id="pp"
                        label="Paypal"
                        onChange={this.handlePaypalChange}
                        checked={this.state.pp}
                      />
                      <Form.Check
                        type="switch"
                        id="cc"
                        label="Credit Card"
                        onChange={this.handleCreditChange}
                        checked={this.state.cc}
                      />
                    </Row>
                    {this.state.cc ? (
                      <Col>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label>Name</label>
                              <input
                                placeholder="Name"
                                name="name"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.changeNameHandler}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label>Card Number</label>
                              <input
                                placeholder="Card number"
                                name="card"
                                className="form-control"
                                value={this.state.cardNum}
                                onChange={this.changeCardNumHandler}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label>Card expiry date</label>
                              <input
                                placeholder="Card expiry date"
                                name="expDate"
                                className="form-control"
                                value={this.state.expDate}
                                onChange={this.changeExpDateHandler}
                              />
                            </div>
                          </Col>
                          <Row>
                            <div className="form-group">
                              <label>CCV</label>
                              <input
                                placeholder="CCV"
                                name="ccv"
                                className="form-control"
                                value={this.state.ccv}
                                onChange={this.changeCcvNumHandler}
                              />
                            </div>
                          </Row>
                        </Row>
                        <Row>
                          <div className="form-group">
                            <label>CCV</label>
                            <input
                              placeholder="CCV"
                              name="ccv"
                              className="form-control"
                              value={this.state.ccv}
                              onChange={this.changeCcvNumHandler}
                            />
                          </div>
                        </Row>
                      </Col>
                    ) : (
                      <p></p>
                    )}
                    {this.state.pp ? (
                      <Row>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label>Email address</label>
                              <input
                                placeholder="Card expiry date"
                                name="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.changeEmailHandler}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label>Paypal password</label>
                              <input
                                placeholder="Password"
                                name="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.changePasswordHandler}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Row>
                    ) : (
                      <p></p>
                    )}
                  </form>
                </div>
              </Col>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSummaryComponent;
