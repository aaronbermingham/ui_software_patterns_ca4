import React, { Component } from "react";
import CartService from "../services/CartService";
import ItemService from "../services/ItemService";
import { Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import AuthService from "../services/AuthService";

class ItemsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      item: [],
    };
    //this.getItemSummary = this.getItemSummary.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("C user auth", user.accessToken);
    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    ItemService.getItems().then((res) => {
      this.setState({ item: res.data });
      console.log("Item ", this.state.item);
    });

    console.log("id", this.state.id);
  }

  addItemtoCart(id) {
    console.log("Booking id", this.state.id);
    CartService.addItemToCart(id).then((res) => {
      //this.getItemSummary();
    });

    alert("Great choice, that has been added to your order!");
  }

  // getItemSummary(){
  //     BookingService.getBookingsById(this.state.id).then((res) => {
  //         let booking = res.data
  //         this.setState({
  //             date: booking.date,
  //             time: booking.time,
  //             numGuests: booking.numGuests,
  //             items: booking.items,
  //             price: booking.price
  //         });
  //     });
  // }

  continue() {
    this.props.history.push(`/booksum/${this.state.id}`);
  }

  render() {
    return (
      <div>
        <h3 id="main">Products</h3>
        <Col>
          <Row>
            {this.state.item.map((item) => (
              <Card>
                <Card.Header>Name: {item.name}</Card.Header>
                <Card.Body>
                  <Card.Title>Manufacturer: {item.manufacturer}</Card.Title>
                  <Card.Text>
                    <p>Price: {item.price}</p>

                    <p>Type: {item.type}</p>
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => this.addItemtoCart(item.id)}
                  >
                    Add to order
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Col>
      </div>
    );
  }
}
export default ItemsComponent;
