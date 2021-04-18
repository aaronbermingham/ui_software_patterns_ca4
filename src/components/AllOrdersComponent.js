import React, { Component } from "react";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";
import UserService from "../services/UserService";
import CartService from "../services/CartService";
import { Card, Button, Row, Col, ListGroup } from "react-bootstrap";

class AllOrdersComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      email: "",
      paymentMethod: "",
      password: "",
      cartId: 0,
      cart: [],
      items: [],
      bisUser: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("Current user ", user);
    console.log("Current id ", this.state.id);
    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }

    CartService.getOrders().then((res) => {
      let shoppingCart = res.data;
      console.log("Carts ", shoppingCart);
      this.setState({
        cart: shoppingCart,
      });
    });
    console.log("Cart userId ", this.state.cart);
  }

  reviewItem(id) {
    this.props.history.push(`/productReview/${id}`);
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div>
           <h2>All orders</h2>
              {this.state.cart.map((shopCart) => (
                <Card>
                  <Card.Header>Order num: {shopCart.id}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      
                      <p>Total price: €{shopCart.totalPrice}</p>
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Add review</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shopCart.itemList.map((item) => (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>€{item.price}</td>
                              <td>
                                <button
                                  onClick={() => this.reviewItem(item.id)}
                                  className="btn btn-info"
                                >
                                  Review
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllOrdersComponent;
