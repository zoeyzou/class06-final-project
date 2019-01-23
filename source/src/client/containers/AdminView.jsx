import React, { Component } from 'react'
import Months from '../components/Months'
import ClassRow from '../components/ClassRow'
import Hyflogo from '../assets/hyf-logo.png'
import { Link } from 'react-router-dom'
import { getClasses } from '../api/apiCalls'
import moment from 'moment'
import { Button, Avatar } from 'evergreen-ui'


export default class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: undefined,
      numberOfWeeks: 7,
      startDate: moment(),
      endDate: moment().add(8, 'weeks')
    }
  }

  componentDidMount() {
    try {
      getClasses().then(res =>
        this.setState({
          classes: res
        })
      )
    } catch (err) {
      throw new Error('Something went wrong while getting classes')
    }
  }

  render() {
    //first off all check if the user has the "admin" type, before rendering aynthing
    if (this.props.user.role_id === 1) {
      return (  
        <div className='adminView'>
          <div className='adminViewHead'>
            <img src={Hyflogo} alt='img' className='AdminLogo' />
            <Link to='/profile/edit'>
            <Avatar src={this.props.user.avatar} size={40} alt='Avatar'/>
            </Link>
          </div>
          {/* Render the line where week number and months are displayed*/}
          <Months
            weeks={this.state.numberOfWeeks + 1}
            dates={{ start: this.state.startDate, end: this.state.endDate }}
          />
          {/* Render the row with class modules and button + title if data is fetched*/}
          {this.state.classes
            ? this.state.classes.map(item => (
                <ClassRow classObj={item} key={item.id} />
              ))
            : null}
          {/* placeholder to be removed, it's acting as a footer at the moment to be clear what page we're on*/}
          <Link className=' button' to='/adminview/createclass'>
          
          <Button appearance="primary">Add a Class</Button>
{/*             <button className='addclassbuttonwrap'>Add a Class</button> */}
          </Link>
        </div>
      )
    } else {
      //If the user dosne't have the admin type render this.
      return (
        <div>
          <strong>Please authenticate that you are admin via login</strong>
        </div>
      )
    }
  }  
}
