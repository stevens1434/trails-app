import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
var unirest = require('unirest');

class IndividTrailList extends Component {
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
    // this.handDelete = this.handDelete.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);
  }

  change(e) {
    console.log("this.state in traillist child: ", this.state);
  }

  // handDelete(e) {
  //   e.preventDefault();
  //   let i = e.target.getAttribute('data-key');
  //   console.log("delete that listing: ", i);
  //   this.props.handleDelete(i);
  // }

  // handleAdd(e) {
  //   e.preventDefault();
  //   let i = e.target.getAttribute('data-key');
  //   let data = this.props.records[i];
  //   console.log("data in handleAdd: ", data, "XXX...XXX i in handleAdd: ", i);
  //   this.props.addToDatabase(data);
  // }

  componentDidMount() {
    let records = this.props.records;
    // console.log('this.props.records in compondidmount in traillist: ', this.props.records)
    this.setState({
      records: records
    })
}

  render() {
    let user = this.props.user
    let records = this.props.records
    console.log("this.props.records in render in traillist: ", records)
    let mappedItems = this.props.records.map((records, index) => (
      <div key={index}>
        <div className='col s2' data-key={index}>{records.name}</div>
        <div className='col s2' data-key={index}>{records.city}</div>
        <div className='col s2' data-key={index}>{records.state}</div>
        <div className='col s4' data-key={index}>{records.lat}</div>
        <div className='col s2' data-key={index}>{records.description}</div>
        <hr />
      </div>
    ))
      return (
        <div className='individTrailList'>
          <div>
            <h3 onClick={this.change}>here is the traillist</h3>
            <p>{mappedItems}</p>
          </div>
        </div>
      );
    }
}

export default IndividTrailList;
