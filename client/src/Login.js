import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token)
      this.props.lift(result.data)
    })
  }

  render() {
    return (
      <section className="login">
        <div className="container">
        	<div className="row">
        	    <div className="col-xs-12">
            	    <div className="form-wrap">
                    <h1>Log in with your email account</h1>
                        <form onSubmit={this.handleSubmit} role="form">
                            <div className="form-group">
                                <label for="email" class="sr-only">Email</label>
                                <input type='text' id="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <label for="key" className="sr-only">Password</label>
                                <input type='password' value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
                            </div>
                            <input type="submit" id="btn-login" className="btn btn-custom btn-lg btn-block" value="Log in"/>
                        </form>
                        <a href="#" className="forget" data-toggle="modal" data-target=".forget-modal">Forgot your password?</a>
                        <hr/>
            	    </div>
        		</div>
        	</div>
        </div>
      </section>
    );
  }
}

export default Login;
