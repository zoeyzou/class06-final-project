import React, { Component } from "react";
import { Pane } from "evergreen-ui";
import EditProfile from "./EditProfile";

export default class Profile extends Component {
  render() {
    //I set up the API as so if the user is not logged in it stores and object with only 1 key.
    //This is not a good way compared to the other way with the isAuthenticated function.
    //but i did it this way aswell as an example, if it's usefull in another case.
    if (Object.keys(this.props.user).length > 1) {
      return (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          margin={16}
        >
          <EditProfile user={this.props.user} />
        </Pane>
      );
    } else {
      return (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingTop={16}
        >
          <h1>Please log in to see your profile information</h1>
        </Pane>
      );
    }
  }
}
