import React, { Component } from "react";
import CartService from "../services/CartService";
import ItemService from "../services/ItemService";
import { Card, Button, Row, Col } from "react-bootstrap";
import AuthService from "../services/AuthService";

class ItemsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      item: [],
      id: 0,
    };
    this.sortItemTitleAscending = this.sortItemTitleAscending.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("C user auth", user.accessToken);
    if (user) {
      this.setState({
        currentUser: user,
        id: user.id,
      });
    }

    ItemService.getItems().then((res) => {
      this.setState({ item: res.data });
      console.log("Item ", this.state.item);
    });

    console.log("id", this.state.id);
  }

  sortItemTitleAscending() {
    console.log("SORT CLICK");
    ItemService.sortItemNameAscending().then((res) => {
      this.setState({ item: res.data });
      console.log("Item sort ", this.state.item);
    });
  }

  sortItemCategoryAscending() {
    console.log("SORT CLICK");
    ItemService.sortItemTypeAscending().then((res) => {
      this.setState({ item: res.data });
      console.log("Item sort ", this.state.item);
    });
  }

  sortItemManufacturerAscending() {
    console.log("SORT CLICK");
    ItemService.sortItemManufacturerAscending().then((res) => {
      this.setState({ item: res.data });
      console.log("Item sort ", this.state.item);
    });
  }

  sortItemPriceAscending() {
    console.log("SORT CLICK");
    ItemService.sortItemPriceAscending().then((res) => {
      this.setState({ item: res.data });
      console.log("Item sort ", this.state.item);
    });
  }

  sortItemTitleDescending() {
    console.log("SORT CLICK");
    ItemService.sortItemNameDescending().then((res) => {
      this.setState({ item: res.data });
      console.log("Item sort ", this.state.item);
    });
  }

  sortItemCategoryDescending() {
    console.log("SORT CLICK");
    ItemService.sortItemTypeDescending().then((res) => {
      this.setState({ item: res.data });
      console.log("Item sort ", this.state.item);
    });
  }

  sortItemManufacturerDescending() {
    console.log("SORT CLICK");
    ItemService.sortItemManufacturerDescending().then((res) => {
      this.setState({ item: res.data });
      console.log("Item sort ", this.state.item);
    });
  }

  sortItemPriceDescending() {
    console.log("SORT CLICK");
    ItemService.sortItemPriceDescending().then((res) => {
      this.setState({ item: res.data });
      console.log("Item sort ", this.state.item);
    });
  }

  addItemtoCart(id) {
    console.log("Booking id", this.state.id);
    CartService.addItemToCart(id, this.state.id).then((res) => {
      //this.getItemSummary();
    });

    alert("Great choice, that has been added to your order!");
  }

  continue() {
    this.props.history.push(`/booksum/${this.state.id}`);
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Products</h3>
        <Row>
        <Col>
            <Button
              variant="dark"
              onClick={() => this.sortItemTitleAscending()}
            >
              Name A-Z
            </Button> 
        </Col>
        <Col>
            <Button
              variant="danger"
              onClick={() => this.sortItemCategoryAscending()}
            >
              Category A-Z
            </Button> 
        </Col>
        <Col>
            <Button
              variant="warning"
              onClick={() => this.sortItemManufacturerAscending()}
            >
              Manufacturer A-Z
            </Button> 
        </Col>
        <Col>
            <Button
              variant="success"
              onClick={() => this.sortItemPriceAscending()}
            >
              Price low to high
            </Button> 
        </Col>
        </Row>
        <Col>
         <Row>
        <Col>
            <Button
              variant="dark"
              onClick={() => this.sortItemTitleDescending()}
            >
              Name Z-A
            </Button> 
        </Col>
        <Col>
            <Button
              variant="danger"
              onClick={() => this.sortItemCategoryDescending()}
            >
              Category Z-A
            </Button> 
        </Col>
        <Col>
            <Button
              variant="warning"
              onClick={() => this.sortItemManufacturerDescending()}
            >
              Manufacturer Z-A
            </Button> 
        </Col>
        <Col>
            <Button
              variant="success"
              onClick={() => this.sortItemPriceDescending()}
            >
              Price high to low
            </Button> 
        </Col>
        </Row>
        
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
