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

class Traillist extends Component {
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
    // this.flatten = this.flatten.bind(this);
  }

  change(e) {
    console.log("this.state in traillist child: ", this.state);
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
    console.log('this.props.records in compondidmount in traillist: ', this.props.records)
    this.setState({
      records: records
    })

}


  render() {
    let user = this.props.user
    // this.setState({
    //   user: user
    // })
    let records = this.props.records
    console.log("this.props.records in render in traillist: ", records)
    let mappedItems = this.props.records.map((records, index) => (
      <div key={index}>
        <div className='col s2' data-key={index}>{records.name} {records.city}</div>
        <div className='col s4' data-key={index}>{records.lat}</div>
        <div className='col s2' data-key={index}>{records.description}</div>
        <hr />
      </div>
    ))

      return (
        <div className='trail'>

          <h3 onClick={this.change}>here is the traillist</h3>
          <p>{mappedItems}</p>

        </div>
      );
    }
}

export default Traillist;