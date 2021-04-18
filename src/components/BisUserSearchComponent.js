import React, { Component } from "react";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";


class BisUserSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      item: [],
      bisUser: false,
      currentUser: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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
        console.log("Item ", this.state.item);
      });
    });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.input.current.value);
    ItemService.searchItem(this.input.current.value).then((res) => {
      this.setState({ item: res.data });
      console.log("Item ", res.data);
    });
    event.preventDefault();
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        {businessUser ? (
          <div>
            <h3 className="text-center">Products</h3>
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

export default BisUserSearchComponent;
