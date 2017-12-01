import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
var unirest = require('unirest');
let records = [];
let mappedItems;

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
      location: {},
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
    records = this.props.records;
    let breweries = this.props.breweries;
    let location = this.props.location;
    this.setState({
      records: records,
      breweries: breweries,
      locaiton: location
    })
}

  render() {
    let user = this.props.user
    records = this.props.records
    let breweries = this.props.breweries
    console.log("breweries in brewerylist render: ", breweries);
    if (this.props.breweries === undefined || this.props.breweries === []) {
      mappedItems =
      <br/><div className="col-xs-10 col-sm-5 col-lg-4 brewcard">
        <div className="well brewwell">
          <div className="brewName"><h3>No Breweries Found</h3></div>
        </div>
      </div>;
    } else {
      mappedItems = this.props.breweries.map((breweries, index) => (
            <div className="col-xs-10 col-sm-5 col-lg-4 brewcard">
              <div className="well brewwell" key={index}>
                <div className="brewName" data-key={index}><h3>
                    <a href={breweries.brewery.website}>{breweries.brewery.name}</a>
                    </h3></div>
                <div data-key={index}>{breweries.streetAddress}</div>
                <div data-key={index}>{breweries.locality}</div>
                <div data-key={index}>{breweries.region}</div>
                <div data-key={index}>Phone: {breweries.phone}</div>
                <div data-key={index}>Distance from Hike: {breweries.distance} Miles</div>
                <div data-key={index}>Type: {breweries.locationTypeDisplay}</div>
              </div>
            </div>
      ))
    }
      return (
            <div className="row brews" onClick={this.change}>{mappedItems}</div>
      );
    }
}

export default BreweryList;
