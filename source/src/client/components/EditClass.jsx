import React, { Component } from "react";
import InpField from "./InputField";
import { Redirect } from "react-router-dom";
import { updateClass, deleteClass } from "../api/apiCalls";
import { Pane, Button } from "evergreen-ui";

export default class EditClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      inp: props.location.state.className,
      isValid: "",
      id: props.location.state.classID
    };
  }

  handleInpChange = e => {
    this.setState({
      inp: e.target.value
    });
  };

  onDeleteClickHandler = () => {
    const id = this.state.id;
    deleteClass(id).then(this.setState({ redirect: true }));
  };

  onSubmitClickHandler = () => {
    const data = { inp: this.state.inp, id: this.state.id };
    // const inp = this.state.inp
    if (data.inp.length >= 3) {
      this.setState({
        inp: ""
      });
      updateClass(data).then(this.setState({ redirect: true, isValid: null }));
    } else {
      this.setState({ isValid: "notValid" });
    }
  };

  onKeyChange = e => {
    if (e.key === "Enter") {
      this.onSubmitClickHandler();
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/adminview" />;
    }
    return (
      <Pane display="flex" alignItems="center" justifyContent="center">
        <Pane>
          <h1>Edit Class</h1>
          <InpField
            type="text"
            className={"inpfield " + this.state.isValid}
            placeholder=""
            passedfunc={this.handleInpChange}
            value={this.state.inp}
            onKeyPress={this.onKeyChange}
          />
          <Pane width="100%">
            <Button iconBefore="trash" marginRight={16}  onClick={this.onDeleteClickHandler}>
              Delete Class
            </Button>

            <Button iconBefore="edit" onClick={this.onSubmitClickHandler}>
              Edit Class
            </Button>
          </Pane>  
        </Pane>
      </Pane>
    );
  }
}
