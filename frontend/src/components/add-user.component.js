import React, { Component } from 'react';
import axios from 'axios';

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      message: ''
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username, 
      email: this.state.email
    }

    axios.post('http://localhost:5000/users/add', user)
    .then(res => {
      let prompt =  <strong className="msg-prompt">Creates user {user.username} successfully!</strong>;
      this.setState({
          username: '',
          email: '',
          message: prompt
        });
    })
    .catch(err => {
      let error = <strong className="msg-error">{JSON.stringify(err)}</strong>;
      if(err && err.response) error = <strong className="msg-error">{err.response.data}</strong>;
      this.setState({
        username: '',
        email: '',
        message: error
      });
    });
  }

  render() {
    return (
      <div>
        <h3>Please register your info here</h3>
        {this.state.message}
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={ e => this.setState({username: e.target.value, message: ''}) }
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={ e => this.setState({email: e.target.value, message: ''}) }
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}