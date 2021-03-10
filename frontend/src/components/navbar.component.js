import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">HealthTracker</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">View Activities</Link>
            </li>
            <li className="navbar-item">
              <Link to="/exercises/add" className="nav-link">Record an Exercise</Link>
            </li>
            <li className="navbar-item">
              <Link to="/diets/add" className="nav-link">Record an Diet</Link>
            </li>
            <li className="navbar-item">
              <Link to="/users/add" className="nav-link">User Sign Up</Link>
            </li>
            <li className="navbar-item">
              <Link to="/users/update" className="nav-link">User Management</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}