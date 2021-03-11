import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.type}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.calorie}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>{props.exercise.description}</td>
    <td>
      <Link to={"/exercises/update/"+props.exercise._id} id="iconPencil">
        <FontAwesomeIcon icon={faPencilAlt} />
      </Link>
      { 
        // eslint-disable-next-line
      }<a href="#" onClick={() => { props.deleteExercise(props.exercise._id)}} id="iconTrash">
        <FontAwesomeIcon icon={faTrashAlt} />
      </a>
    </td>
  </tr>
)

export default class ViewActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      diets: [],
      message: ''
    };
  }

  componentDidMount() {
    this.getExercises();
  }

  getExercises = (message='') => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/exercises/`)
    .then(res => {
      this.setState({
        exercises: res.data,
        message: message
      });
    })
    .catch(err => {
      let error = <strong className="msg-error">{JSON.stringify(err)}</strong>;
      if(err && err.response) error = <strong className="msg-error">{err.response.data}</strong>;
      this.setState({
        exercises: [],
        message: error
      });
    });
  }

  deleteExercise = id => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/exercises/`+id)
    .then( res => {
      let prompt =  <strong className="msg-prompt">{res.data} </strong>;
      this.getExercises(prompt);
    })
    .catch(err => {
      let error = <strong className="msg-error">{JSON.stringify(err)}</strong>;
      if(err && err.response) error = <strong className="msg-error">{err.response.data}</strong>;
      this.setState({
        exercises: [],
        message: error
      });
    });
  }

  exerciseList = () => {
    return this.state.exercises.map(exercise => {
      return <Exercise exercise={exercise} key={exercise._id} deleteExercise={this.deleteExercise} />;
    });
  }

  render() {
    let exerciseTable = <div />;
    if(this.state.exercises.length === 0) {
      exerciseTable = (
        <div>
          <div>{this.state.message}</div>
          <span className="inline">No logged exercises yet!</span>
          <Link to="/exercises/add" className="nav-link inline">Log an Exercise</Link>
          <Link to="/users/add" className="nav-link inline">Sign Up</Link>
        </div>
      );
    }
    else {
      exerciseTable = (
        <div>
          <h3>Logged Exercises</h3>
          <div>{this.state.message}</div>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Exercise Type</th>
                <th>Duration (Minutes)</th>
                <th>Burned Calorie (Kcal)</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.exerciseList() }
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <div>
        {exerciseTable}
      </div>
    );
  }
}