import React, { Component } from 'react'
import WeekPicker from '../components/WeekPicker'
import { getModuleOptions, createNewClassModule } from '../api/apiCalls'
import Select from 'react-select'
import moment from 'moment'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'evergreen-ui/commonjs/buttons';

export default class AddModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      moduleOptions: [],
      from: null,
      to: null,
      classID: props.location.state.classID,
      className: props.location.state.className,
      selectedOption: null,
      numberOfWeeks: 0,
      modulesSessions: null
    }
  }

  handleBtnClick = () => {
    const data = {
      classID: this.state.classID,
      className: this.state.className,
      moduleName: this.state.selectedOption.label,
      moduleID: this.state.selectedOption.value,
      start: moment(this.state.from).format('YYYY-MM-DD'),
      end: moment(this.state.to).format('YYYY-MM-DD'),
      numberOfWeeks: this.state.numberOfWeeks
    }
    //post request to server for assigning mentor to module for itteration 1, then if there's time for assigning mentor to session.
    createNewClassModule(data).then(res =>
      this.setState({ modulesSessions: res, redirect: true })
    )
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  componentDidMount() {
    getModuleOptions().then(data => this.setState({ moduleOptions: data }))
  }

  updateDates = days => {
    if (days.from !== this.state.from || days.to !== this.state.to)
      this.setState({
        from: days.from,
        to: days.to,
        numberOfWeeks: days.numberOfWeeks
      })
  }
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/adminview/assignmentor',
            state: {
              classID: this.state.classID,
              className: this.state.className,
              moduleName: this.state.selectedOption,
              numberOfWeeks: this.state.numberOfWeeks,
              startDate: this.state.from,
              endDate: this.state.to,
              modulesSessions: this.state.modulesSessions
            }
          }}
        />
      )
    }

    const options = []
    this.state.moduleOptions.map(item => {
      return options.push({ value: item.id, label: item.title })
    })
    const { selectedOption } = this.state
    return (
      <div className='addModule'>
        <div className='dropDown'>
          <Select
            vlaue={selectedOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>
        <div>
          <h3>{this.state.className}</h3>
          <WeekPicker updateParent={this.updateDates} />
        </div>
        <div className='modulebtns'>
          <Link to='/adminview'>
            <Button marginRight={12} iconBefore="trash" intent="danger">
            Delete this module
            </Button>
          </Link>

          <Button
            marginRight={12} 
            iconBefore="manual"
            className='createClass'
            disabled={!this.state.selectedOption || !this.state.numberOfWeeks}
            onClick={this.handleBtnClick}>
            Create Class and Assign Mentor(s)
          </Button>
        </div>
      </div>
    )
  }
}
