/* eslint-disable no-undef */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import IndividTrailList from './IndividTrailList';
import BreweryList from './BreweryList';
import { GoogleMapLoader, GoogleMap, DirectionsRenderer } from "react-google-maps";
let breweries;

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
      locate: {},
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
      let locate = this.props.location;
      let a = this.props;
      let b = this;
      let refs = this.refs;
      setTimeout(function(){
        let location = a.location
        let lat = a.location.lat;
        let lon = a.location.lon;
        breweries = a.breweries
        console.log("breweries in Map.js: ", breweries);
        // if (breweries === undefined) {

          b.setState({
            user: user,
            lat: lat,
            lon: lon,
            location: location,
            locate: locate,
            breweries: breweries
          })
          let map = new google.maps.Map(refs.map, {
            center: {
              lat: lat,
              lng: lon
            },
            zoom: 10,
            title: 'example title'
          })
          for (var i = 0; i < breweries.length; i++) {
            let brewLat = breweries[i].latitude;
            let brewLon = breweries[i].longitude;
            let key = i;
            let name = breweries[i].brewery.name
            let description = breweries[i].brewery.description
            let website = breweries[i].website
            console.log("brewery name in map.js: ", name);
            console.log("breweries.length: ", breweries.length);
            console.log('brewLat: ', brewLat);
            console.log('brewLon: ', brewLon);
            let marker = new google.maps.Marker({
              position: {
                lat: brewLat,
                lng: brewLon
              },
              label: key[i],
              icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569',
              map: map
            })
            let info;
            let infoWindow = new google.maps.InfoWindow({
              content: name
            });
            let listener = google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infoWindow.setContent(name);
                infoWindow.open(map, marker);
              }
            })(marker, i));
          }
          let mark = new google.maps.Marker({
            position: {
              lat: lat,
              lng: lon
            },
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            map: map
          })
      }, 3000);
  }


  render() {
    let user = this.props.user
    breweries = this.props.breweries;
    console.log('breweries in render in map.js: ', breweries);
      return (
            <div onClick={this.change} className='mapitem mapmap' ref='map'>
              <pre>{JSON.stringify(this.props.location, null, 2)}</pre>
              <div className='mapMarker' ref='marker'></div>
            </div>
      )
    }
}

// export default Map;

//&callback=initMap
