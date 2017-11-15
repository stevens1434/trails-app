import React, { Component } from 'react';
import Logout from './Logout';

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    };
  }

  render() {
    return (
      <div className='UserProfileBox'>
        <p>Hello, {this.props.user.name}!</p>
        <a onClick={this.props.logout}>Logout</a>
        <ul>
          <li><a className="white-text" href="/trail">Search</a></li>
          <li><a className="white-text" href="/UserTrails">All Trails</a></li>
        </ul>
      </div>
    );
  }
}

export default UserProfile;
