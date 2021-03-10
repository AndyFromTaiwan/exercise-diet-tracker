import React, { Component } from 'react';

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email
    }

    console.log(user);
    //TODO

    this.setState({
      username: '',
      email: ''
    });
  }

  render() {
    return (
      <div>
        <h3>Please register your info here:</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={ e => this.setState({username: e.target.value}) }
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={ e => this.setState({email: e.target.value}) }
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