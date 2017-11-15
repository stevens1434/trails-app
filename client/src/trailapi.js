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
    this.props.updateState(e);
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

  componentDidMount() {
    let records = this.props.records;
    this.setState({
      records: records
    })
}

  render() {
    let user = this.props.user
    let records = this.props.records
      return (
        <div className='trail'>
          <h3 onClick={this.check}>insert search form here</h3>
          <form action="/trail">
          City: <input type="text" name="city" onChange={this.handleCity}/>
          State: <input type="text" name="state" onChange={this.handleState}/>
          Activities: <select onChange={this.handleActivity}>
            <option value=""></option>
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
