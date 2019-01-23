import React, {Component} from 'react'
import {Button} from 'evergreen-ui'

export default class LoginButton extends Component {
  render() {
    //checks if user is signed in and render a login or logout button accordingly
    if (!this.props.isAuthenticated) {
      return (
        <Button is="a" href="http://localhost:9001/auth/google">
          login
        </Button>
      )
    } else {
      return (
        <Button is="a" href="http://localhost:9001/auth/google/logout">
          logout
        </Button>
      )
    }
  }
}
