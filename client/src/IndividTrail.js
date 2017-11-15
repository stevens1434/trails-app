import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import IndividTrailList from './IndividTrailList';
import BreweryList from './BreweryList';
var unirest = require('unirest');
let records;

class IndividTrail extends Component {
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
    this.setState({
      records: response
    })
    let records = response;
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
    fetch('/UserTrail/id/' + id)
      .then(response => response.json())
      .then(response =>
        this.updateState(response, result = response))
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
      return (
        <div className='userTrails'>
          <p onClick={this.change}>IndividTrail</p>
          <IndividTrailList
            user = {this.state.user}
            records = {this.state.records}
            />
          <BreweryList
            user = {this.state.user}
            records = {this.state.records}
            breweries = {this.state.breweries}
            />
        </div>
      );
    }
}

export default IndividTrail;
