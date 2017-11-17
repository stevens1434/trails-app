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
        <div onClick={this.check} className="col-xs-10 col-sm-10 col-md-12 col-lg-12 trail">
          <form action="/trail">
            <div className='form-group'>
              <label for='city'></label>
              <input className="form-control" id='city' type="text" name="city" placeholder='Choose City...' onChange={this.handleCity}/>
              <label for='state'></label>
              <input className="form-control" id='state' type="text" name="state" placeholder='Choose State...' onChange={this.handleState}/>
              <div className='dropdown'>
              <br />
              <button className="btn btn-primary dropdown-toggle dropdown-menu-center" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Activities
              <span class="caret"></span></button>
              <br />
              <ul  onChange={this.handleActivity} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item" href="#">Hiking</li>
                <li className="dropdown-item" href="#">Mountain Biking</li>
                <li className="dropdown-item" href="#">Camping</li>
                <li className="dropdown-item" href="#">Caving</li>
                <li className="dropdown-item" href="#">Trail Running</li>
                <li className="dropdown-item" href="#">Snow Sports</li>
                <li className="dropdown-item" href="#">Horseback Riding</li>
                <li className="dropdown-item" href="#">ATV</li>
                <li className="dropdown-item" href="#">Water Sports</li>
              </ul>
              <br />
              </div>
                <button className='btn btn-primary submit' type="submit" name="submit" onClick={this.search}>Submit</button>
              </div>
          </form>
        </div>
      );
    }
}

export default Trailapi;
