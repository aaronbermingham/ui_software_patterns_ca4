import React, { Component } from "react";
import CartService from "../services/CartService";
import ItemService from "../services/ItemService";
import { Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import AuthService from "../services/AuthService";

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();

    this.state = {
      currentUser: undefined,
      item: [],
      search: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSearchHandler = this.changeSearchHandler.bind(this);
  }

  handleSubmit(event) {
    //alert("A name was submitted: " + this.input.current.value);
    ItemService.searchItem(this.input.current.value).then((res) => {
      this.setState({ item: res.data });
      console.log("Item ", res.data);
    });
    event.preventDefault();
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("C user auth", user.accessToken);
    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    console.log("id", this.state.id);
  }

  changeSearchHandler = (event) => {
    this.setState({ search: event.target.value });
  };

  addItemtoCart(id) {
    console.log("Booking id", this.state.id);
    CartService.addItemToCart(id).then((res) => {
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
        <form>
          <div className="form-group">
            <label>Search</label>
            <input
              placeholder="Search for item"
              name="item"
              className="form-control"
              ref={this.input}
            />
            <button
              className="btn btn-success"
              onClick={this.handleSubmit}
              style={{ marginTop: "10px" }}
            >
              Search item
            </button>
          </div>
        </form>

        <Row>
          <Col>
            <h3 id="main">Products</h3>
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
          </Col>
        </Row>
      </div>
    );
  }
}
export default SearchComponent;
