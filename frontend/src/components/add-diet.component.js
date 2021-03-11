import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class AddDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: '',
      meal: '',
      food: '',
      quantity: 0,
      calorie: 0,
      date: new Date(),
      description: '',
      isSubmitted: false,
      templete: "Create New",
      posturl: `${process.env.REACT_APP_API_BASE_URL}/diets/add`,
      message: ''
    }
  }

  componentDidMount = () => {
    if(this.props.match.params.id) {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/diets/`+this.props.match.params.id)
      .then(res => {
        this.setState({
          username: res.data.username,
          meal: res.data.meal,
          food: res.data.food,
          quantity: res.data.quantity,
          calorie: res.data.calorie,
          date: new Date(res.data.date),
          description: res.data.description,
          templete: "Update",
          posturl: `${process.env.REACT_APP_API_BASE_URL}/diets/update/`+this.props.match.params.id
        })   
      })
      .catch(err => {
        let error = <strong className="msg-error">{JSON.stringify(err)}</strong>;
        if(err && err.response) error = <strong className="msg-error">{err.response.data}</strong>;
        this.setState({
          message: error
        });
      });
    }

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/`)
    .then(res => {
      this.setState({
        users: res.data.map(user => user.username)
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

  onChangeNumber = e => {
    let nam = e.target.name;
    let val = e.target.value;
    let error = '';
    if(val) {
      if((!Number(val) && Number(val)!==0) || Number(val)<0) {
        error = <strong className="msg-error">{nam} field should be a non-negative number</strong>;
      }
    }
    this.setState({[nam]: val, message: error});
  }

  resetForm = e => {
    this.setState({
      username: '',
      meal: '',
      food: '',
      quantity: 0,
      calorie: 0,
      date: new Date(),
      description: '',
      isSubmitted: false,
      message: ''
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const diet = {
      username: this.state.username,
      meal: this.state.meal,
      food: this.state.food,
      quantity: this.state.quantity,
      calorie: this.state.calorie,
      date: this.state.date,
      description: this.state.description
    }

    axios.post(this.state.posturl, diet)
    .then(res => {
      let prompt =  <strong className="msg-prompt">{res.data}</strong>;
      this.setState({ isSubmitted: true, message: prompt });
    })
    .catch(err => {
      let error = <strong className="msg-error">{JSON.stringify(err)}</strong>;
      if(err && err.response) error = <strong className="msg-error">{err.response.data}</strong>;
      this.setState({ isSubmitted: true, message: error });
    });
  }

  render() {
    if(this.state.isSubmitted) {
      return (
        <div>
          <div>{this.state.message}</div>
          <span className="inline">{this.state.templete} Diet Form Submitted!</span>
          <Link to="/" className="nav-link inline">View Activities</Link>
          <Link to="/diets/add" className="nav-link inline" onClick={this.resetForm}>Record More Diets</Link>
        </div>
      );
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
    return (
      <div>
        <h3>{this.state.templete} Diet Log</h3>
        <div>{this.state.message}</div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              name="username"
              value={this.state.username}  
              onChange={ e => this.setState({username: e.target.value, message: ''}) }    
            >
              <option value="" selected disabled hidden>Select</option>
              {
                this.state.users.map(username => {
                  return (<option 
                    value={username}>{username}
                    </option>);
                  })
              }
           </select>
          </div>
          <div className="form-group">
            <label>Meal: </label>
            <select ref="userInput"
              required
              className="form-control"
              name="meal"
              value={this.state.meal}  
              onChange={ e => this.setState({meal: e.target.value, message: ''}) }    
            >
              <option value="" selected disabled hidden>Select</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunck</option>
              <option value="Dinner">Dinner</option>
              <option value="Other">Other</option>
           </select>
          </div>
          <div className="form-group"> 
            <label>Food: </label>
            <input type="text"
              required
              className="form-control"
              name="food"
              value={this.state.food}
              onChange={ e => this.setState({food: e.target.value, message: ''}) }
            />
          </div>

          <div className="form-group"> 
            <label>Quantity (g): </label>
            <input type="text"
              required
              className="form-control"
              name="quantity"
              value={this.state.quantity}
              onChange={ this.onChangeNumber }
            />
          </div>
          <div className="form-group"> 
            <label>Calorie (Kcal): </label>
            <input type="text"
              required
              className="form-control"
              name="calorie"
              value={this.state.calorie}
              onChange={ this.onChangeNumber }
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={ date => this.setState({date: date, message: ''}) }
              />
            </div>
          </div>
          <div className="form-group"> 
            <label>Description (Optional): </label>
            <input type="text"
              className="form-control"
              name="description"
              value={this.state.description}
              onChange={ e => this.setState({description: e.target.value, message: ''}) }
            />
          </div>
          <div className="form-group">
            <input type="submit" value={`${this.state.templete}`} className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}