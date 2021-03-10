import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: '',
      username: '',
      email: '',
      isUsersAvailable: false,
      message: ''
    }
  }

  componentDidMount = () => {
    this.getUsers();
  }

  getUsers = (message='') => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/`)
      .then(res => {
        this.setState({
          users: res.data,
          id: '',
          username: '',
          email: '',
          isUsersAvailable: true,
          message: message
        });
      })
      .catch(err => {
        let error = <strong className="msg-error">{JSON.stringify(err)}</strong>;
        if(err && err.response) error = <strong className="msg-error">{err.response.data}</strong>;
        this.setState({
          users: [],
          id: '',
          username: '',
          email: '',
          isUsersAvailable: false,
          message: error
        });
      });
  }

  onChangeUsername = e => {
    let user = JSON.parse(e.target.value);
    this.setState({ 
      id: user._id,
      username: user.username,
      email: user.email,
      message: ''
    });
  }
  
  onUpdateUser = e => {
    e.preventDefault();
    const user = {
      username: this.state.username, 
      email: this.state.email
    }

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/update/${this.state.id}`, user)
    .then(res => {
      let prompt =  <strong className="msg-prompt">Updates user {this.state.username} successfully!</strong>;
      this.setState({
        message: prompt
      });
    })
    .catch(err => {
      let error = <strong className="msg-error">{JSON.stringify(err)}</strong>;
      if(err && err.response) error = <strong className="msg-error">{err.response.data}</strong>;
      this.setState({
        message: error
      });
    });
  }

  onDeleteUser = () => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/${this.state.id}`)
    .then(res => {
      let prompt =  <strong className="msg-prompt">Deletes user {this.state.username} successfully!</strong>;
      this.getUsers(prompt);
    })
    .catch(err => {
      let error = <strong className="msg-error">{JSON.stringify(err)}</strong>;
      if(err && err.response) error = <strong className="msg-error">{err.response.data}</strong>;
      this.setState({
        message: error
      });
    });
  }

  render() {
    if(!this.state.isUsersAvailable) {
      return <div>{this.state.message}</div>;
    }
    if(this.state.users.length === 0) {
      return (
        <div>
          <div>{this.state.message}</div>
          <span className="inline">No registered user yet, be the first user!</span>
          <Link to="/users/add" className="nav-link inline">Sign Up</Link>
        </div>
      );
    }
    if(!this.state.username) {
      return (
        <div>
          <h3>Please choose a user</h3>
          <div>{this.state.message}</div>
          <div>
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}  
              onChange={this.onChangeUsername}    
            >
              <option value="" selected disabled hidden>Select</option>
              {
                this.state.users.map(user => {
                  return (<option 
                    value={JSON.stringify(user)}>{user.username}
                    </option>);
                  })
              }
           </select>
          </div>
       </div>
      );
    }
    return (
      <div>
        <h3>Update info for {this.state.username} here</h3>
        <div>{this.state.message}</div>
        <div>
          <form onSubmit={this.onUpdateUser}>
            <div className="form-group">
              <label>Email: </label>
              <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value, message: ''})}
              />
            </div>
            <div>
              <input type="button" value="Reselect a User" className="btn btn-primary margin-right" onClick={() => this.getUsers()}/>
              <input type="submit" value="Update" className="btn btn-primary margin-right" />
              <input type="button" value={`Delete ${this.state.username}`} className="btn btn-primary margin-right" onClick={() => this.onDeleteUser()}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}