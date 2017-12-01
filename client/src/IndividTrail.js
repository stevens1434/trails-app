import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import IndividTrailList from './IndividTrailList';
import BreweryList from './BreweryList';
import Map from './Map';
import { GoogleMapLoader, GoogleMap, DirectionsRenderer } from "react-google-maps";
var unirest = require('unirest');
let records;
let lon;
let lat;
let location = {};

class IndividTrail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      records: [],
      location: {},
      lon: '',
      lat: '',
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
    this.updateState = this.updateState.bind(this);
    this.updateBrewState = this.updateBrewState.bind(this);
  }


  change(e) {
    console.log("this.state in IndividTrail.js parent: ", this.state);
  }

  updateState(response) {
    let latAndLon = {};
    latAndLon.lat = response[0].lat;
    latAndLon.lon = response[0].lon;
    this.setState({
      records: response,
      lon: response[0].lon,
      lat: response[0].lat,
      location: latAndLon
    })
    let records = response;
    lon = response[0].lon;
    lat = response[0].lat
  }
  updateBrewState(response) {
    this.setState({
      breweries: response
    })
  }

  componentDidMount() {
    let user = this.props.user;
    this.setState({
      user: user
    });
    let url = window.location.pathname
    // let url2 = this._reactInternalFiber.return.stateNode.context.router.route.location.pathname;
    // console.log("params in IndividTrail: ", this._reactInternalFiber.return.stateNode.context.router.route.location.pathname)
    // console.log("window.location: ", window.location.pathname)
    var id = url.substring(url.lastIndexOf('/') + 1);
    let a = this;
    let hikesAndBrews = {};
    let result;
    let breweries;
    // let location = {}
    fetch('/UserTrail/id/' + id)
      .then(response => response.json())
      .then(response =>
        this.updateState(response,
            result = response,
            location.lat = response.lat,
            location.lon = response.lon,
            lat = response.lat,
            lon = response.lon,
          ))
      .then(response =>
        axios.post('/UserTrail/getbrews', {
          data: result
        }).then(function(response) {
          a.updateBrewState(response.data.data);
        }).catch(function(error) {
          console.log("error: ", error);
        })
      )

    }

  render() {
    let user = this.props.user
    location.lon = lon;
    location.lat = lat;
    let locat = location
    // console.log("lon in individ render: ", lon, "lat in individ render: ", lat);
    // console.log("location in individTrail render: ", location);
      return (
          <div className="container-fluid">
            <div className="row content mapAndTrail">
              <div onClick={this.change} className="col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 well side park">
                <IndividTrailList
                  user = {this.state.user}
                  records = {this.state.records}
                  />
              </div>
              <div className='col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 well side map'>
                <Map
                  location = {location}
                  user = {this.state.user}
                  breweries = {this.state.breweries}
                  />
              </div>
            </div>
            <hr />
            <div className='row content right'>
              <div className="col-sm-12">
                <BreweryList
                  location = {location}
                  user = {this.state.user}
                  records = {this.state.records}
                  breweries = {this.state.breweries}
                  />
              </div>
            </div>
          </div>

      );
    }
}

export default IndividTrail;
