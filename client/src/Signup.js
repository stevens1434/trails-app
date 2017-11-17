import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      console.log(result.data)
      localStorage.setItem('mernToken', result.data.token)
      this.props.lift(result.data)
    })
  }

  render() {
    return (
      <section className="login">
        <div className="container login2">
        	<div className="row login2">
        	 <div className="col-xs-12 login2">
        	   <div className="form-wrap login2">
               <h1>Log in with your email account</h1>
                 <form onSubmit={this.handleSubmit} role="form">
                   <div className="form-group">
                    <label for="name" class="sr-only">Name</label>
                    <input type='text' value={this.state.name} onChange={this.handleNameChange} placeholder="Your Name"/>
                   </div>
                   <div className="form-group">
                      <label for="email" class="sr-only">Email</label>
                      <input type='text' id="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="somebody@example.com"/>
                   </div>
                   <div className="form-group">
                      <label for="key" className="sr-only">Password</label>
                      <input type='password' value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
                   </div>
                   <input type="submit" id="btn-login" className="btn btn-custom btn-lg btn-block" value="Log in"/>
                 </form>
        	     </div>
        		 </div>
        	 </div>
         </div>
         <br/>
         <hr />
         <br/>
       </section>
    );
  }
}

export default Signup;
