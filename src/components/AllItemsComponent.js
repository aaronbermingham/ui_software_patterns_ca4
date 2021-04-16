import React, { Component } from "react";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";
import { Card, Button, Row, Col, ListGroup } from "react-bootstrap";

class AllItemsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: [],
      bisUser: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    ItemService.getItems().then((res) => {
      this.setState({ item: res.data });
      console.log("Item ", this.state.item)
    });
   
    const user = AuthService.getCurrentUser();
    console.log("Current user ", user);

    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
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

  updateItem(id) {
    this.props.history.push(`/updateProduct/${id}`);
  }

  deleteItem(id) {
    ItemService.deleteItem(id).then((res) => {
      ItemService.getItems().then((res) => {
        this.setState({ item: res.data });
        console.log("Item ", this.state.item)
      });
    });
  }


  render() {
    const { businessUser } = this.state;
    return (
      <div>
        {businessUser ? (
          <div>
            <h3 className="text-center">Products</h3>
            <div>
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
            </div>
            <div className="row">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                  <th>Item Id</th>
                    <th>Item Name</th>
                    <th>Manufacturer</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Type</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.item.map((item) => (
                    <tr key={item.id}>
                       <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.manufacturer}</td>
                      <td>{item.price}</td>
                      <td>{item.stock}</td>
                      <td>{item.type}</td>
                      <td>
                        <button
                          onClick={() => this.updateItem(item.id)}
                          className="btn btn-info"
                        >
                          Update
                        </button>
                      
                      </td>
                      <td>
                        <button
                          onClick={() => this.deleteItem(item.id)}
                          className="btn btn-info"
                        >
                          Delete
                        </button>
                      
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          <Lost />
        )}
      </div>
    );
  }
}

export default AllItemsComponent;
