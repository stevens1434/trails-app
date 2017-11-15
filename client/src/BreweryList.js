import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
var unirest = require('unirest');

class BreweryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      records: [],
      breweries: [],
      city: '',
      state: '',
      country: '',
      name: '',
      unique_id: '',
      lat: '',
      lon: '',
      directions: '',
      description: '',
      activities: [],
      activities_name: '',
      activities_id: '',
      activities_rating: '',
      activities_thumbnail: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.change = this.change.bind(this);
  }

  change(e) {
    console.log("this.state in traillist child: ", this.state);
  }

  componentDidMount() {
    let records = this.props.records;
    this.setState({
      records: records
    })
}

  render() {
    let user = this.props.user
    let records = this.props.records
    let breweries = this.props.breweries
    let mappedItems = this.props.breweries.map((breweries, index) => (
      <div key={index}>
        <div className='col s2' data-key={index}>Name: {breweries.name}</div>
        <div className='col s2' data-key={index}>Address: {breweries.streetAddress}</div>
        <div className='col s2' data-key={index}>City: {breweries.locality}</div>
        <div className='col s4' data-key={index}>Distance from Hike: {breweries.distance}</div>
        <div className='col s2' data-key={index}>Closed: {breweries.isClosed}</div>
        <div className='col s2' data-key={index}>Type: {breweries.locationTypeDisplay}</div>
        <div className='col s2' data-key={index}>Open to Public: {breweries.openToPublic}</div>
        <div className='col s2' data-key={index}>Phone: {breweries.phone}</div>
        <hr />
      </div>
    ))
      return (
        <div className='individTrailList'>
          <div>
            <h3 onClick={this.change}>Here is the BreweryList</h3>
            <p>{mappedItems}</p>
          </div>
        </div>
      );
    }
}

export default BreweryList;
