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
import Trail from './trail';
import IndividTrail from './IndividTrail';
import UserTrails from './UserTrails';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: {}
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.logout = this.logout.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  liftTokenToState(data) {
    this.setState({token: data.token, user: data.user})
  }

  logout() {
    localStorage.removeItem('mernToken')
    this.setState({token: '', user: {}})
  }

  componentDidMount() {
    // If there is a token in localStorage
    var token = localStorage.getItem('mernToken')
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: {}
      })
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token)
        this.setState({
          token: response.data.token,
          user: response.data.user
        })
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log(err)
      })
    }
  }

  render() {
    var theUser = this.state.user
    // console.log('theUser: ', theUser);
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== 0) {
      return (
        <Router>
          <div>

          <nav class="navbar navbar-expand-lg navbar-light bg-faded py-lg-4">
            <div class="container">
              <a class="navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none" href="/">Trails</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav mx-auto">
                  <li class="nav-item active px-lg-4">
                    <a class="nav-link text-uppercase text-expanded" href="/"> Home
                      <span class="sr-only"></span>
                    </a></li>
                      <li class="nav-item px-lg-4">
                    <a class="nav-link text-uppercase text-expanded" href="/trail">  Search   </a>
                      </li>
                      <li class="nav-item px-lg-4">
                    <a class="nav-link text-uppercase text-expanded" href="/UserTrails">  All Trails   </a>
                      </li>
                </ul>
              </div>
            </div>
          </nav>
          <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a class="nav-link text-uppercase " href="/"> <span class="glyphicon glyphicon-home"></span> Home </a>
            <a href="/trail"><span class="glyphicon">&#xe003;</span> Search </a>
            <a href="/UserTrails"><span class="glyphicon">&#xe008;</span>All Trails </a>
          </div>
        <div className='App'>
          <UserProfile user={this.state.user} logout={this.logout} />
          <Route exact path="/trail"
            render={() => <Trail user={this.state.user} />}
          />
          <Route exact path="/usertrails"
              render={() => <UserTrails user={this.state.user} />}
            />
          <Route path="/usertrails/:id"
              render={() => <IndividTrail user={this.state.user} />}
            />
          </div>

        </div>
      </Router>
      );
    } else {
      return (
        <div className='App'>
          <div className='SignupBox'>
            <Signup lift={this.liftTokenToState} />
          </div>

          <div className='LoginBox'>
            <Login lift={this.liftTokenToState} />
          </div>

        </div>
      );
    }
  }
}

export default App;
