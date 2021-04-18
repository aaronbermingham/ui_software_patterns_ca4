import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,

      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {this.state.userReady ? (
          <div>
            <h3>
              Welcome {currentUser.username}
            </h3>

            <p>
              Email: {currentUser.email}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}
export default UserProfileComponent;
