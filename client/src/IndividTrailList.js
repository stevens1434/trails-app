import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
var unirest = require('unirest');

class IndividTrailList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      records: [],
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
    let mappedItems = this.props.records.map((records, index) => (
      <ul class="" key={index}>
        <p data-key={index}><h3>{records.name}</h3></p>
        <p data-key={index}>{records.city}</p>
        <p data-key={index}>{records.state}</p>
        <p data-key={index}>{records.lat}</p>
        <p data-key={index}>{records.description}</p>
        <hr />
      </ul>
    ))
      return (
          <div>
            <p onClick={this.change}>{mappedItems}</p>
          </div>
      );
    }
}

export default IndividTrailList;
