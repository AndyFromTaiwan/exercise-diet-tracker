import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Diet = props => (
  <tr>
    <td>{props.diet.username}</td>
    <td>{props.diet.meal}</td>
    <td>{props.diet.food}</td>
    <td>{props.diet.quantity}</td>
    <td>{props.diet.calorie}</td>
    <td>{props.diet.date.substring(0,10)}</td>
    <td>{props.diet.description}</td>
    <td>
      <Link to={"/diets/update/"+props.diet._id} id="iconPencil">
        <FontAwesomeIcon icon={faPencilAlt} />
      </Link>
      { 
        // eslint-disable-next-line
      }<a href="#" onClick={() => { props.deleteDiet(props.diet._id)}} id="iconTrash">
        <FontAwesomeIcon icon={faTrashAlt} />
      </a>
    </td>
  </tr>
)

export default class ViewDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diets: [],
      message: ''
    };
  }

  componentDidMount() {
    this.getDiets();
  }

  getDiets = (message='') => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/diets/`)
    .then(res => {
      this.setState({
        diets: res.data,
        message: message
      });
    })
    .catch(err => {
      let error = <strong className="msg-error">{JSON.stringify(err)}</strong>;
      if(err && err.response) error = <strong className="msg-error">{err.response.data}</strong>;
      this.setState({
        diets: [],
        message: error
      });
    });
  }

  deleteDiet = id => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/diets/`+id)
    .then( res => {
      let prompt =  <strong className="msg-prompt">{res.data} </strong>;
      this.getDiets(prompt);
    })
    .catch(err => {
      let error = <strong className="msg-error">{JSON.stringify(err)}</strong>;
      if(err && err.response) error = <strong className="msg-error">{err.response.data}</strong>;
      this.setState({
        diets: [],
        message: error
      });
    });
  }

  dietList = () => {
    return this.state.diets.map(diet => {
      return <Diet diet={diet} key={diet._id} deleteDiet={this.deleteDiet} />;
    });
  }

  render() {
    let dietTable = <div />;
    if(this.state.diets.length === 0) {
      dietTable = (
        <div>
          <div>{this.state.message}</div>
          <span className="inline">No logged diets yet!</span>
          <Link to="/diets/add" className="nav-link inline">Log an Diet</Link>
          <Link to="/users/add" className="nav-link inline">Sign Up</Link>
        </div>
      );
    }
    else {
      dietTable = (
        <div>
          <h3>Logged Diets</h3>
          <div>{this.state.message}</div>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Meal</th>
                <th>Food</th>
                <th>Quantity (g)</th>
                <th>Calorie (Kcal)</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.dietList() }
            </tbody>
          </table>
        </div>
      )
    }
    return <div>{dietTable}</div>;
  }
}