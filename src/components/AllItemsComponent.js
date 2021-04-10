import React, { Component } from "react";
import ItemService from "../services/ItemService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";

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
            <h3 className="text-center">Food items</h3>
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
