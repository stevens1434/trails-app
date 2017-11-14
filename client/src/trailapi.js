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
import axios from 'axios';
var unirest = require('unirest');

class Trailapi extends Component {
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
    // this.updateState = this.updateState.bind(this);
    // this.flatten = this.flatten.bind(this);
    this.search = this.search.bind(this);
    this.handleActivity = this.handleActivity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.check = this.check.bind(this);
  }

  check(e) {
    console.log("this.state: ", this.state);
  }

  search(e) {
    e.preventDefault();
    console.log("search in trailapi from form", e);
    console.log("e.target", e.target.parent);
    this.props.updateState(e);
    // let activities_name = this.state.activities_name;
    // let state = this.state.state;
    // let city = this.state.city;
    // let activity = this.state.activities_name;
    // console.log("this.state: ", this.state);
    // let a = this;
    // let params;
    // if (activity !== '' && city == '' && city === '') {
    //   params = 'q[activities_activity_type_name_eq]='+activity
    //   console.log("params activity: ", params);
    // } else if (activity !== '' && city !== '' && city === '') {
    //   params = 'q[activities_activity_type_name_eq]='+activity+'&q[city_cont]='+city
    //   console.log("params activity/city: ", params);
    // } else if (activity !== '' && city !== '' && city !== '') {
    //   params = 'q[activities_activity_type_name_eq]='+activity+'&q[city_cont]='+city+'&q[state_cont]='+state
    //   console.log("params activity/city/state: ", params);
    // }
    // unirest.get("https://trailapi-trailapi.p.mashape.com/?" + params)
    //   .header("X-Mashape-Key", "rDdlPSAkGDmshHDgEMzXDZA0fr6op1ayAEEjsnEInsBvBRqJze")
    //   .header("Accept", "text/plain")
    //   .end(function (result) {
    //     console.log("result.body.places: ", result.body.places);
    //     let results = result.body.places
    //     a.props.updateState(result.body.places);
    // })
  }

  handleActivity(e) {
    e.preventDefault();
    this.props.stateChangeActivity(e);
  }
  handleState(e) {
    e.preventDefault();
    this.props.stateChangeState(e);
  }
  handleCity(e) {
    e.preventDefault();
    this.props.stateChangeCity(e);
  }


  // flatten(data) {
  //     var result = {};
  //     function recurse (cur, prop) {
  //         if (Object(cur) !== cur) {
  //             result[prop] = cur;
  //         } else if (Array.isArray(cur)) {
  //              for(var i=0, l=cur.length; i<l; i++)
  //                  recurse(cur[i], prop + "[" + i + "]");
  //             if (l == 0)
  //                 result[prop] = [];
  //         } else {
  //             var isEmpty = true;
  //             for (var p in cur) {
  //                 isEmpty = false;
  //                 recurse(cur[p], prop ? prop+"."+p : p);
  //             }
  //             if (isEmpty && prop)
  //                 result[prop] = {};
  //         }
  //     }
  //     recurse(data, "");
  //     console.log("the result: ", result)
  // }

  componentDidMount() {
    let records = this.props.records;
    // this.setState =
}


  render() {
    let user = this.props.user
    let records = this.props.records
    console.log("this.props.records in render in trailapi: ", records)

      return (
        <div className='trail'>

          <h3 onClick={this.check}>insert search form here</h3>
          <form action="/trail">
          City: <input type="text" name="city" onChange={this.handleCity}/>
          State: <input type="text" name="state" onChange={this.handleState}/>
          Activities: <select onChange={this.handleActivity}>
            <option value="hiking">Hiking</option>
            <option value="mountain biking">Mountain Biking</option>
            <option value="camping">Camping</option>
            <option value="caving">Caving</option>
            <option value="trail running">Trail Running</option>
            <option value="snow sports">Snow Sports</option>
            <option value="horseback riding">Horseback Riding</option>
            <option value="atv">ATV</option>
            <option value="water sports">Water Sports</option>
          </select>
              <input type="submit" name="submit" onClick={this.search}/>
        </form>

        </div>
      );
    }
}

export default Trailapi;
