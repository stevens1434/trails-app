import React, { Component } from 'react';
import './App.css';
import UserTrailsList from './UserTrailsList';
import axios from 'axios';

class UserTrails extends Component {
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
    this.change = this.change.bind(this);
    // this.stateChangeActivity = this.stateChangeActivity.bind(this);
    // this.stateChangeState = this.stateChangeState.bind(this);
    // this.stateChangeCity = this.stateChangeCity.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.addToDatabase = this.addToDatabase.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  change(e) {
    console.log("this.state in trail.js parent: ", this.state);
  }

  updateState(response) {
    this.setState({
      records: response
    })
  }

  handleDelete(i) {
    console.log("handle delete after delete button in trail.js parent");
    let currentState = this.state.records;
    let listing = this.state.records[i];
    let a = this;
    axios.put('/UserTrail', {
      data: listing
    }).then(function (response) {
      console.log("currentState: ", currentState);
      currentState.splice(i, 1);
      a.setState({
        records: currentState
      })
    }).catch(function (error) {
      console.log("error: ", error);
    })
  }

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
    console.log("abc");
    let user = this.props.user;
    console.log("user.id in compdidmount in UserTrails: ", user.id)
    this.setState({
      user: user
    })
    fetch('/UserTrail/' + user.id)
      .then(response => response.json())
      .then(response =>
      this.updateState(response))

    }


  render() {
    let user = this.props.user
    console.log("user: ", user);


      return (
        <div className='userTrails'>

          <p onClick={this.change}>UserTrails</p>
          <UserTrailsList
            user = {this.state.user}
            records = {this.state.records}
            handleDelete = {this.handleDelete}
            />
        </div>
      );
    }
}

export default UserTrails;
