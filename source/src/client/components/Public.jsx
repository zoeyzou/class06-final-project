import React, { Component } from 'react'
import Hyflogo from '../assets/hyf-logo.png'

export default class Public extends Component {
  render() {
    return (
    <div>
      <img src={Hyflogo} alt='img' className='AdminLogo' />
      <h1>Welcome to Hack Your Future Calendar App</h1>
    </div>
    );
    
  }
}
