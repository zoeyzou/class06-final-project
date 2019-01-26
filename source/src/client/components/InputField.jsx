import React, { Component } from 'react'
import { TextInput } from 'evergreen-ui'

export default class InputField extends Component {
  render() {
    return (
      <div>
        <TextInput
          width={520}
          marginBottom={16}         
          type={this.props.type}
          className={this.props.className}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.passedfunc}
          onKeyPress={e => this.props.onKeyPress(e)}
        />
      </div>
    )
  }
}
