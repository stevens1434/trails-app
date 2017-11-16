/* eslint-disable no-undef */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import IndividTrailList from './IndividTrailList';
import BreweryList from './BreweryList';
// import { GoogleMapLoader, GoogleMap, DirectionsRenderer, google } from "react-google-maps";

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      records: [],
      breweries: [],
      lat: '',
      lon: '',
      location: {},
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
    console.log("this.state in IndividTrail.js parent: ", this.state);
  }

  componentDidMount() {
      let user = this.props.user;
      let a = this.props;
      let b = this;
      let refs = this.refs;
      setTimeout(function(){
        let location = a.location
        let lat = a.location.lat;
        let lon = a.location.lon;
          b.setState({
            user: user,
            lat: lat,
            lon: lon,
            location: location
          })
        new google.maps.Map(refs.map, {
          center: {
            lat: lat,
            lng: lon
          },
          zoom: 8
        });
    }, 1500);
  }


  render() {
    let user = this.props.user
      return (
        <div>
          <h2 onClick={this.change}>TheMap</h2>
          <button>Go to place</button>
          <div ref='map' style={{width: 500, height: 500, border: '1px solid black'}}>
            <pre>{JSON.stringify(this.props.location, null, 2)}</pre>
          </div>
        </div>
      )
    }
}

// export default Map;

//&callback=initMap
