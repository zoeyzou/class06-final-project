import React, { Component } from "react";
import { Pane } from "evergreen-ui/commonjs/layers";
import { Heading } from "evergreen-ui/commonjs/typography";
import { Avatar } from "evergreen-ui/commonjs/avatar";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: ["Admin", "Mentor", "Student"]
    };
  }

  render() {
    return (
      <Pane
        display="flex"
        border="default"
        width={400}
        height={200}
        justifyContent="center"
        alignItems="center"
      >
      <Pane width="20%">
        <Avatar src={this.props.user.avatar}  alt="admin" size={60} />
      </Pane>
        <Pane>
          <Heading size={500} >
          Name: {this.props.user.name}
          </Heading>
          <Heading size={500}>
          Role: {this.state.roles[this.props.user.role_id - 1]}
          </Heading>
        </Pane>
      </Pane>
    );
  }
}
