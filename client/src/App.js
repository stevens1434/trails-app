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
    // var theUser = this.state.user
    // console.log('theUser: ', theUser);
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== 0) {
      return (
        <Router>
          <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-faded py-lg-4">
            <div className="container">
              <img src='http://res.cloudinary.com/stevens1434/image/upload/v1510878793/Menu_icon-128_ad6fhn.png' className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"></img>
              <a className="navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none" href="/">Trails</a>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item active px-lg-4">
                    <a className="nav-link text-uppercase text-expanded" href="/"> Home
                      <span className="sr-only"></span>
                    </a></li>
                      <li className="nav-item px-lg-4">
                        <a className="nav-link text-uppercase text-expanded" href="/trail">  Search   </a>
                      </li>
                      <li className="nav-item px-lg-4">
                        <a className="nav-link text-uppercase text-expanded" href="/UserTrails">All Trails</a>
                      </li>
                  <li className="nav-item active px-lg-4 navfloat">
                      <p className="nav-link text-uppercase text-expanded" href="/"> Hello, {this.state.user.name}
                        <span className="sr-only"></span>
                      </p>
                    </li>
                  <li className="nav-item active px-lg-4 navfloat">
                    <a className="nav-link text-uppercase text-expanded" onClick={this.logout}> Logout
                      <span className="sr-only"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div id="mySidenav" className="sidenav">
            <img src='http://res.cloudinary.com/stevens1434/image/upload/v1510878793/Menu_icon-128_ad6fhn.png' className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"></img>
            <a href="javascript:void(0)" className="closebtn" onClick="closeNav()">&times;</a>
            <a className="nav-link text-uppercase " href="/"> <span className="glyphicon glyphicon-home"></span> Home </a>
            <a href="/trail"><span className="glyphicon">&#xe003;</span> Search </a>
            <a href="/UserTrails"><span className="glyphicon">&#xe008;</span>All Trails</a>
          </div>
          <div className='App'>
            <UserProfile user={this.state.user} logout={this.logout} />
            <Route className='Application' exact path="/trail"
              render={() => <Trail user={this.state.user} />}
            />
            <Route className='Application' exact path="/usertrails"
                render={() => <UserTrails user={this.state.user} />}
              />
            <Route className='Application' path="/usertrails/:id"
                render={() => <IndividTrail user={this.state.user} />}
              />
            </div>
          </div>
        </Router>
      );
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-faded py-lg-4">
            <div className="container">
              <img src='http://res.cloudinary.com/stevens1434/image/upload/v1510878793/Menu_icon-128_ad6fhn.png' className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"></img>
              <a className="navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none" href="/">Trails</a>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item active px-lg-4">
                    <a className="nav-link text-uppercase text-expanded" href="/"> Home
                      <span className="sr-only"></span>
                    </a></li>
                  <li className="nav-item px-lg-4">
                    <a className="nav-link text-uppercase text-expanded" href="/trail">  Search   </a>
                  </li>
                  <li className="nav-item px-lg-4">
                    <a className="nav-link text-uppercase text-expanded" href="/UserTrails">All Trails</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className='App'>
            <div className='SignupBox'>
              <Signup lift={this.liftTokenToState} />
            </div>
            <div className='LoginBox'>
              <Login lift={this.liftTokenToState} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
