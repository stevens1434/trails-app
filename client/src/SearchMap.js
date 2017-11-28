/* eslint-disable no-undef */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import TrailList from './traillist';
import TrailApi from './trailapi';
import Trail from './trail';
import { GoogleMapLoader, GoogleMap, DirectionsRenderer } from "react-google-maps";
let records;
let location = {};

export default class SearchMap extends Component {
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

  componentWillUpdate() {
    let user = this.props.user;
    let a = this.props;
    let b = this;
    let refs = this.refs;
    setTimeout(function(){
      let locate = location;
      console.log("locate in compdidmount2: ", locate);
      let record = records;
      let lat = locate.lat;
      let lon = locate.lon;
        // b.setState({
        //   user: user,
        //   location: locate,
        //   locate: locate,
        //   lat: locate.lat,
        //   lon: locate.lon,
        // })
      if (records.length !== 0) {
        console.log("records.length !== 0");
        let map = new google.maps.Map(refs.map, {
          center: {
              lat: record[0].lat,
              lng: record[0].lon
          },
          zoom: 10,
          title: 'example title'
        })
        for (var i = 0; i < record.length; i++) {
          let recordLat = record[i].lat;
          let recordLon = record[i].lon;
          let key = i;
          let name = record[i].name
          let description = record[i].description
          console.log("record name in map.js: ", name);
          console.log("record.length: ", record.length);
          console.log('recordLat: ', recordLat);
          console.log('recordLon: ', recordLon);
          let marker = new google.maps.Marker({
            position: {
              lat: recordLat,
              lng: recordLon
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
            lat: record[1].lat,
            lng: record[1].lon
          },
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          map: map
        })
      } else {
        console.log("records.length === 0");
        let map = new google.maps.Map(refs.map, {
          center: {
            lat: lat,
            lng: lon
          },
          zoom: 10,
          title: 'example title'
        })
      }
      console.log("records.length: ", record.length);
      console.log("record in searchmap.js: ", record);
    }, 3500);
  }

  componentDidMount() {
      let user = this.props.user;
      let a = this.props;
      let b = this;
      let refs = this.refs;
      setTimeout(function(){
        let locate = location;
        console.log("locate in compdidmount2: ", locate);
        let record = records;
        let lat = locate.lat;
        let lon = locate.lon;
          // b.setState({
          //   user: user,
          //   location: locate,
          //   locate: locate,
          //   lat: locate.lat,
          //   lon: locate.lon,
          // })
        let map = new google.maps.Map(refs.map, {
          center: {
            lat: lat,
            lng: lon
          },
          zoom: 10,
          title: 'example title'
        })
        console.log("records.length: ", record.length);
        console.log("record in searchmap.js: ", record);

        // for (var i = 0; i < record.length; i++) {
        //   let recordLat = record[i].lat;
        //   let recordLon = record[i].lon;
        //   let key = i;
        //   let name = record[i].name
        //   let description = record[i].description
        //   console.log("record name in map.js: ", name);
        //   console.log("record.length: ", record.length);
        //   console.log('recordLat: ', recordLat);
        //   console.log('recordLon: ', recordLon);
        //   let marker = new google.maps.Marker({
        //     position: {
        //       lat: recordLat,
        //       lng: recordLon
        //     },
        //     label: key[i],
        //     icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569',
        //     map: map
        //   })
        //   let info;
        //   let infoWindow = new google.maps.InfoWindow({
        //     content: name
        //   });
        //   let listener = google.maps.event.addListener(marker, 'click', (function(marker, i) {
        //     return function() {
        //       infoWindow.setContent(name);
        //       infoWindow.open(map, marker);
        //     }
        //   })(marker, i));
        // }


        let mark = new google.maps.Marker({
          position: {
            lat: lat,
            lng: lon
          },
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          map: map
        })
    }, 3500);
  }


  render() {
    let user = this.props.user
    records = this.props.records;
    console.log('records in render in SearchMap.js: ', records);
    location = this.props.location;
    console.log('location in render in SearchMap.js: ', location);
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
