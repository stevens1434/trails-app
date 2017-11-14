import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import UserProfile from './UserProfile';
import Trailapi from './trailapi';
import Traillist from './traillist';
import axios from 'axios';
var unirest = require('unirest');

class Trail extends Component {
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
    this.updateState = this.updateState.bind(this);
    this.change = this.change.bind(this);
    this.stateChangeActivity = this.stateChangeActivity.bind(this);
    this.stateChangeState = this.stateChangeState.bind(this);
    this.stateChangeCity = this.stateChangeCity.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  change(e) {
    console.log("this.state in trail.js parent: ", this.state);
  }

  handleDelete(i) {
    console.log("handle delete after delete button in trail.js parent");
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
    console.log("this.state: ", this.state);
    let params;
    if (activity !== '' && city == '' && city === '') {
      params = 'q[activities_activity_type_name_eq]='+activity
      console.log("params activity: ", params);
    } else if (activity !== '' && city !== '' && city === '') {
      params = 'q[activities_activity_type_name_eq]='+activity+'&q[city_cont]='+city
      console.log("params activity/city: ", params);
    } else if (activity !== '' && city !== '' && city !== '') {
      params = 'q[activities_activity_type_name_eq]='+activity+'&q[city_cont]='+city+'&q[state_cont]='+state
      console.log("params activity/city/state: ", params);
    }
    let results;
    let a = this;
    unirest.get("https://trailapi-trailapi.p.mashape.com/?" + params)
      .header("X-Mashape-Key", "rDdlPSAkGDmshHDgEMzXDZA0fr6op1ayAEEjsnEInsBvBRqJze")
      .header("Accept", "text/plain")
      .end(function (result) {
        console.log("result.body.places: ", result.body.places);
        results = result.body.places;
        console.log("results in updateState: ", results);
        let records = [];
        for (var i = 0; i < results.length; i++) {
            records.push(results[i])
          }
          // console.log("bankRecords: ", records);
        console.log("records: ", records);
        a.setState({
          records: records
        })
        axios.post('/trail', {
          data: results
        }).then(function(response) {
          console.log("response: ", response);
        }).catch(function(err) {
          console.log("err: ", err);
        })

    });
    // this.setState({
    //   records: records,
    //   city: '',
    //   state: '',
    //   country: '',
    //   name: '',
    //   unique_id: '',
    //   lat: '',
    //   lon: '',
    //   directions: '',
    //   description: '',
    //   activities: [],
    //   activities_name: '',
    //   activities_id: '',
    //   activities_rating: '',
    //   activities_thumbnail: ''
    // })
    // axios.post('/trail', {
    //   data: results
    // }).then(function(response) {
    //   console.log("response: ", response);
    // }).catch(function(err) {
    //   console.log("err: ", err);
    // })
  }

  componentDidMount() {
    console.log("abc");
    let user = this.props.user;
    this.setState({
      user: user
    })
}


  render() {
    let user = this.props.user
    // this.setState({
    //   user: user
    // })
    console.log("render in trail src");
    console.log("user: ", user);
      return (
        <div className='trail'>

          <p onClick={this.change}>Trails</p>
          <Trailapi
            updateState={this.updateState}
            records = {this.state.records}
            stateChangeActivity = {this.stateChangeActivity}
            stateChangeState = {this.stateChangeState}
            stateChangeCity = {this.stateChangeCity}
            />
            <Traillist
              records = {this.state.records}
              handleDelete = {this.handleDelete}
              />
        </div>
      );
    }
}

export default Trail;
