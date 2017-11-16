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


// <div class="container-fluid">

  // <div class="row content">

    // <div class="col-sm-3 well side">
      // <h2>Logo</h2>
      // <ul class="nav nav-pills nav-stacked">
        // <li class="active"><a href="#section1">Dashboard</a></li>
        // <li><a href="#section2">Age</a></li>
        // <li><a href="#section3">Gender</a></li>
        // <li><a href="#section3">Geo</a></li>
      // </ul><br>
    // </div>
    // <br>
    //
    // <div class="col-sm-8">
    //   <div class="row">
    //     <div class="col-sm-4">
    //       <div class="well">
    //         <h3>Text</h3>
    //         <p>Text</p>
    //         <p>Text</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

  // </div>
// </div>

  render() {
    let user = this.props.user
      return (
        <div class="container-fluid">
          <div class="row content">
            <div  class="col-sm-3 well side">

              <h2 onClick={this.change}>Your Park</h2>
              <IndividTrailList
                user = {this.state.user}
                records = {this.state.records}
                />
                </div>
                <div class="col-sm-8">
              <BreweryList
                user = {this.state.user}
                records = {this.state.records}
                breweries = {this.state.breweries}
                />
                </div>

          </div>
        </div>

      );
    }
}

export default IndividTrail;
