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
    this.handDelete = this.handDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  change(e) {
    console.log("this.state in traillist child: ", this.state);
  }

  handDelete(e) {
    e.preventDefault();
    let i = e.target.getAttribute('data-key');
    this.props.handleDelete(i);
  }

  handleAdd(e) {
    e.preventDefault();
    let i = e.target.getAttribute('data-key');
    let data = this.props.records[i];
    this.props.addToDatabase(data);
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
    let mappedItems = this.props.records.map((records, index) => (
      <div className="col-xs-10 col-sm-5 col-lg-4 brewcard trailresult">
        <div className="well trailwell trailresultwell" key={index}>
          <div className='brewName' data-key={index}><h3>{records.name}</h3></div>
          <div className='col s2' data-key={index}>{records.city}</div>
          <div className='col s2' data-key={index}>{records.state}</div><br/>
          <div className='col s2' data-key={index}>{records.description}</div> <br/><br/>
          <button className="btn btn-primary dropdown-toggle butbot" type="Submit" data-key={index} data-value={records} onClick={this.handleAdd}>Add To Trails</button>
          <button className="btn btn-primary dropdown-toggle butbot" type="delete" data-key={index} value="delete" onClick={this.handDelete}>Delete</button>
        </div>
      </div>
    ))
      return (
        <div className='trail'>
          <div>
            <p onClick={this.change}>{mappedItems}</p>
          </div>
        </div>
      );
    }
}

export default Traillist;
