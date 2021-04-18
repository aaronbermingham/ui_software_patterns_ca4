import React, { Component } from "react";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";

class AddProductComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      manufacturer: "",
      price: 0,
      stock: 0,
      type: "",
      bisUser: false,
      currentUser: undefined,
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeManufacturerHandler = this.changeManufacturerHandler.bind(this);
    this.changePriceHandler = this.changePriceHandler.bind(this);
    this.changeTypeHandler = this.changeTypeHandler.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changePriceHandler = (event) => {
    this.setState({ price: event.target.value });
  };
  changeManufacturerHandler = (event) => {
    this.setState({ manufacturer: event.target.value });
  };

  changeStockHandler = (event) => {
    this.setState({ stock: event.target.value });
  };

  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value });
  };

  createProduct = (e) => {
    e.preventDefault();
    let product = {
      name: this.state.name,
      manufacturer: this.state.manufacturer,
      price: this.state.price,
      stock: this.state.stock,
      type: this.state.type,
    };
    console.log("product => " + JSON.stringify(product));
    ItemService.addItem(product).then((res) => {
      this.props.history.push("/allProducts");
    });
  };

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

  cancel() {
    this.props.history.push("/allProducts");
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        {businessUser ? (
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                <h3 className="text-center">Add item</h3>
                <div className="card-body">
                  <form>
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
                    <div className="form-group">
                      <label>Manufacturer</label>
                      <input
                        placeholder="Manufacturer"
                        name="manufacturer"
                        className="form-control"
                        value={this.state.manufacturer}
                        onChange={this.changeManufacturerHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        placeholder="Price"
                        name="price"
                        className="form-control"
                        value={this.state.price}
                        onChange={this.changePriceHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Stock</label>
                      <input
                        placeholder="Stock"
                        name="stock"
                        className="form-control"
                        value={this.state.stock}
                        onChange={this.changeStockHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Type</label>
                      <input
                        placeholder="Type"
                        name="type"
                        className="form-control"
                        value={this.state.type}
                        onChange={this.changeTypeHandler}
                      />
                    </div>

                    <button
                      className="btn btn-success"
                      onClick={this.createProduct}
                    >
                      Add item
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Lost />
        )}
      </div>
    );
  }
}

export default AddProductComponent;
