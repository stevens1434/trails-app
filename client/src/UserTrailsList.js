import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
var unirest = require('unirest');

class UserTrailsList extends Component {
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
    this.handleView = this.handleView.bind(this);
  }

  change(e) {
    console.log("this.state in traillist child: ", this.state);
  }

  handDelete(e) {
    e.preventDefault();
    let i = e.target.getAttribute('data-key');
    this.props.handleDelete(i);
  }

  handleView(e) {
    let i = e.target.getAttribute('data-key');
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
      <div className="col-xs-12 col-sm-6 col-lg-4 trailCardHolder">
        <div className="well trailcard" key={index}>
          <div key={index}>
            <Link className="linkto" to={"/usertrails/" + records._id} params={records._id} data-key={index} value={records._id} onClick={this.handleView}>
              <div data-key={index}><h3>{records.name}</h3></div></Link> <hr />
              <div data-key={index}>{records.city}</div>
              <div data-key={index}>{records.state}</div><br/>
              <div data-key={index}>{records.description}</div><br/>
              <button type="delete" data-key={index} value="delete" onClick={this.handDelete}>Delete</button><br/><br/>
          </div>
        </div>
      </div>
    ))
      return (
        <div className='trail'>
          <p className='trailTitle' onClick={this.change}>{mappedItems}</p>
        </div>
      );
    }
}

export default UserTrailsList;
