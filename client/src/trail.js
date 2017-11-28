import React, { Component } from 'react';
import './App.css';
import Trailapi from './trailapi';
import Traillist from './traillist';
import SearchMap from './SearchMap';
import axios from 'axios';
var unirest = require('unirest');
var jQuery = require('jquery');
require('dotenv').config();
let trailKey;
let location = {};

class Trail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      records: [],
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
    this.updateState = this.updateState.bind(this);
    this.change = this.change.bind(this);
    this.stateChangeActivity = this.stateChangeActivity.bind(this);
    this.stateChangeState = this.stateChangeState.bind(this);
    this.stateChangeCity = this.stateChangeCity.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.addToDatabase = this.addToDatabase.bind(this);
  }

  change(e) {
    console.log("this.state in trail.js parent: ", this.state);
    console.log("trail_key: ", trailKey);
  }

  handleDelete(i) {
    let currentState = this.state.records;
    let listing = this.state.records[i];
    currentState.splice(i, 1);
    this.setState({
      records: currentState
    })
  }

  stateChangeActivity(e) {
    this.setState({activities_name: e.target.value});
    console.log("this.state: ", this.state);
  }
  stateChangeState(e) {
    this.setState({state: e.target.value});
    console.log("this.state: ", this.state);
  }
  stateChangeCity(e) {
    this.setState({city: e.target.value});
    console.log("this.state: ", this.state);
  }

  updateState(e) {
    let activities_name = this.state.activities_name;
    let state = this.state.state;
    let city = this.state.city;
    let activity = this.state.activities_name;
    console.log("activities in trail.js: ", this.state.activities);
    let params;
    if (activity !== '' && city === '' && state === '') {
      params = 'q[activities_activity_type_name_eq]='+activity
      console.log("params activity: ", params);
    } else if (activity !== '' && city !== '' && state === '') {
      params = 'q[activities_activity_type_name_eq]='+activity+'&q[city_cont]='+city
      console.log("params activity/city: ", params);
    } else if (activity !== '' && city !== '' && state !== '') {
      params = 'q[activities_activity_type_name_eq]='+activity+'&q[city_cont]='+city+'&q[state_cont]='+state
      console.log("params activity/city/state: ", params);
    } else if (activity === '' && city !== '' && state !== '') {
      params = 'q[city_cont]='+city+'&q[state_cont]='+state
      console.log("params city/state: ", params);
    } else if (activity !== '' && city !== '' && state === '') {
      params = 'q[state_cont]='+state
      console.log("params state: ", params);
    } else if (activity !== '' && city === '' && state !== '') {
      params = 'q[city_cont]='+city
      console.log("params city: ", params);
    }
    let records;
    let a = this;
    let user = this.state.user;
    unirest.get("https://trailapi-trailapi.p.mashape.com/?" + params)
      .header("X-Mashape-Key", trailKey)
      .header("Accept", "text/plain")
      .end(function (result) {
        records = result.body.places;
        a.setState({
          records: records
        });
    });
  }

  addToDatabase(data) {
    let records = data
    let a = this;
    let user = this.state.user;
    records.userId = user.id;
    axios.post('/trail', {
      data: records
    }).then(function(response) {
      // console.log("response: ", response);
    }).catch(function(err) {
      console.log("err: ", err);
    })
  }

  componentDidMount() {
    let user = this.props.user;
    this.setState({
      user: user,
      location: {lat: 47.6062, lon: -122.3321}
    })
    axios.get('trail/key', {
      data: trailKey
    }).then(function(response) {
      trailKey = response.data;
    }).catch(function(err) {
      console.log("err: ", err);
    })
}

  render() {
    let user = this.props.user
      return (
        <div className='trail container-fluid'>
          <div className='row content right'>
            <h1 onClick={this.change}>Search</h1>
              <div className='col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 well side map trailapi'>
                <Trailapi
                  updateState={this.updateState}
                  records = {this.state.records}
                  stateChangeActivity = {this.stateChangeActivity}
                  stateChangeState = {this.stateChangeState}
                  stateChangeCity = {this.stateChangeCity}
                  />
                  <hr />
                </div>
              <div className='col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 well side map'>
                <SearchMap
                  records = {this.state.records}
                  user = {this.state.user}
                  location = {this.state.location}
                  />
              </div>
            </div>
            <hr />
            <Traillist
              records = {this.state.records}
              handleDelete = {this.handleDelete}
              addToDatabase = {this.addToDatabase}
              />
        </div>
      );
    }
}

export default Trail;
