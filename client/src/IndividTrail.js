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
    // this.updateState = this.updateState.bind(this);
    this.change = this.change.bind(this);
    // this.stateChangeActivity = this.stateChangeActivity.bind(this);
    // this.stateChangeState = this.stateChangeState.bind(this);
    // this.stateChangeCity = this.stateChangeCity.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
    // this.addToDatabase = this.addToDatabase.bind(this);
    this.updateState = this.updateState.bind(this);
    // this.viewDetails = this.viewDetails.bind(this);
    this.updateBrewState = this.updateBrewState.bind(this);

  }

  change(e) {
    console.log("this.state in IndividTrail.js parent: ", this.state);
  }

  updateState(response) {
    console.log("update state response in individTrail", response);
    this.setState({
      records: response
    })
    let records = response;
  }
  updateBrewState(response) {
    console.log('update state brews in IndividTrail', response);
    this.setState({
      breweries: response
    })
  }

  // handleDelete(i) {
  //   // console.log("handle delete after delete button in trail.js parent");
  //   let currentState = this.state.records;
  //   let listing = this.state.records[i];
  //   let a = this;
  //   axios.put('/UserTrail', {
  //     data: listing
  //   }).then(function (response) {
  //     console.log("currentState: ", currentState);
  //     currentState.splice(i, 1);
  //     a.setState({
  //       records: currentState
  //     })
  //   }).catch(function (error) {
  //     console.log("error: ", error);
  //   })
  // }

  // viewDetails(i) {
  //   let currentState = this.state.records;
  //   let listing = this.state.records[i]._id;
  //   console.log("listing id in UserTrails.js", listing);
  //   axios.get('/UserTrail/user/' + listing, {
  //     data: listing
  //   }).then(function (response) {
  //     console.log("currentState: ", currentState);
  //     currentState.splice(i, 1);
  //   }).catch(function (error) {
  //     console.log("error: ", error);
  //   })
  // }

  // stateChangeActivity(e) {
  //   this.setState({activities_name: e.target.value});
  //   console.log("this.state: ", this.state);
  // }
  // stateChangeState(e) {
  //   this.setState({state: e.target.value});
  //   console.log("this.state: ", this.state);
  // }
  // stateChangeCity(e) {
  //   this.setState({city: e.target.value});
  //   console.log("this.state: ", this.state);
  // }

  // updateState(e) {
  //   let activities_name = this.state.activities_name;
  //   let state = this.state.state;
  //   let city = this.state.city;
  //   let activity = this.state.activities_name;
  //   // console.log("this.state: ", this.state);
  //   let params;
  //   if (activity !== '' && city === '' && state === '') {
  //     params = 'q[activities_activity_type_name_eq]='+activity
  //     console.log("params activity: ", params);
  //   } else if (activity !== '' && city !== '' && state === '') {
  //     params = 'q[activities_activity_type_name_eq]='+activity+'&q[city_cont]='+city
  //     console.log("params activity/city: ", params);
  //   } else if (activity !== '' && city !== '' && state !== '') {
  //     params = 'q[activities_activity_type_name_eq]='+activity+'&q[city_cont]='+city+'&q[state_cont]='+state
  //     console.log("params activity/city/state: ", params);
  //   } else if (activity === '' && city !== '' && state !== '') {
  //     params = 'q[city_cont]='+city+'&q[state_cont]='+state
  //     console.log("params city/state: ", params);
  //   } else if (activity !== '' && city !== '' && state === '') {
  //     params = 'q[state_cont]='+state
  //     console.log("params state: ", params);
  //   } else if (activity !== '' && city === '' && state !== '') {
  //     params = 'q[city_cont]='+city
  //     console.log("params city: ", params);
  //   }
  //   let records;
  //   let a = this;
  //   let user = this.state.user;
  //   unirest.get("https://trailapi-trailapi.p.mashape.com/?" + params)
  //     .header("X-Mashape-Key", "rDdlPSAkGDmshHDgEMzXDZA0fr6op1ayAEEjsnEInsBvBRqJze")
  //     .header("Accept", "text/plain")
  //     .end(function (result) {
  //       // console.log("result.body.places: ", result.body.places);
  //       records = result.body.places;
  //       console.log("results in updateState: ", records);
  //       a.setState({
  //         records: records
  //       });
  //       // //add userId to results and send over
  //       // for (var i = 0; i < records.length; i++) {
  //       //   records[i].userId = user.id;
  //       //   console.log("records[i]: ", records[i])
  //       // }
  //       // console.log('records.userId', records)
  //       // axios.post('/trail', {
  //       //   data: records
  //       // }).then(function(response) {
  //       //   console.log("response: ", response);
  //       // }).catch(function(err) {
  //       //   console.log("err: ", err);
  //       // })
  //   });
  // }

  // addToDatabase(data) {
  //   console.log("data in parent: ", data)
  //   let records = data
  //   let a = this;
  //   let user = this.state.user;
  //   for (var i = 0; i < records.length; i++) {
  //     records[i].userId = user.id;
  //     console.log("records[i]: ", records[i])
  //   }
  //   console.log('records.userId', records)
  //   axios.post('/trail', {
  //     data: records
  //   }).then(function(response) {
  //     console.log("response: ", response);
  //   }).catch(function(err) {
  //     console.log("err: ", err);
  //   })
  // }

  componentDidMount() {
    let user = this.props.user;
    console.log("user.id in compdidmount in IndividTrail: ", user.id)
    this.setState({
      user: user
    });
    let url = window.location.pathname
    // let url2 = this._reactInternalFiber.return.stateNode.context.router.route.location.pathname;
    // console.log("params in IndividTrail: ", this._reactInternalFiber.return.stateNode.context.router.route.location.pathname)
    // console.log("window.location: ", window.location.pathname)
    var id = url.substring(url.lastIndexOf('/') + 1);
    // console.log("URL: ", url);
    console.log("ID: ", id);
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
          //set the state for both here
          console.log("response: ", response.data.data);
          a.updateBrewState(response.data.data);
        }).catch(function(error) {
          console.log("error: ", error);
        })
      )


        // fetch('http://api.brewerydb.com/v2/?key=c15fafad9d8e7f636ad350c36535f65a'))
        // .then(response => response.json())
        // .then(response =>
        // this.updateBrewState(response))

      //   .then(
      // this.updateState(response))
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
