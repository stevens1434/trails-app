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
    this.change = this.change.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateState = this.updateState.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
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
    let currentState = this.state.records;
    let listing = this.state.records[i];
    let a = this;
    axios.put('/UserTrail', {
      data: listing
    }).then(function (response) {
      currentState.splice(i, 1);
      a.setState({
        records: currentState
      })
    }).catch(function (error) {
      console.log("error: ", error);
    })
  }

  viewDetails(i) {
    let currentState = this.state.records;
    let listing = this.state.records[i]._id;
    axios.get('/UserTrail/user/' + listing, {
      data: listing
    }).then(function (response) {
      // console.log("currentState: ", currentState);
    }).catch(function (error) {
      console.log("error: ", error);
    })
  }

  componentDidMount() {
    let user = this.props.user;
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
        <div onClick={this.change} className='userTrails'>
          <div className="container-fluid">
            <div className="row content">
              <div  className="col-sm-12 well">
                <div className="row">
                  <UserTrailsList
                    user = {this.state.user}
                    records = {this.state.records}
                    handleDelete = {this.handleDelete}
                    viewDetails = {this.viewDetails}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default UserTrails;
