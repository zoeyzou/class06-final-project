import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'evergreen-ui/commonjs/buttons';

export default class ClassRow extends Component {
  render() {
    return (
      <>
        <div className='classrow'>
          <div className='classrowleft'>
            <h5>{this.props.classObj.classname}</h5>
            <Link
              className='button'
              to={{
                pathname: '/adminview/editclass',
                state: {
                  classID: this.props.classObj.id,
                  className: this.props.classObj.classname
                }
              }}>
              <Button appearance="minimal" intent="none"  marginLeft={12} iconBefore="edit">Edit</Button>
            </Link>
          </div>
          <Link
            className='button'
            to={{
              pathname: '/adminview/createmodule',
              state: {
                classID: this.props.classObj.id,
                className: this.props.classObj.classname
              }
            }}>
            <Button marginLeft={12} iconBefore="plus">Add module</Button>
          </Link>
        </div>
      </>
    )
  }
}
