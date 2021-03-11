import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Navbar from "./components/navbar.component";
import ViewActivities from "./components/view-activities.component";
import AddExercise from "./components/add-exercise.component";
import AddDiet from "./components/add-diet.component";
import AddUser from "./components/add-user.component";
import UpdateUser from "./components/update-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br/>
        <Route path="/" exact component={ViewActivities} />
        <Route path="/exercises/add" component={AddExercise} />
        <Route path="/exercises/update/:id" component={AddExercise} />
        <Route path="/diets/add" component={AddDiet} /> 
        <Route path="/diets/update/:id" component={AddDiet} />
        <Route path="/users/add" component={AddUser} />
        <Route path="/users/update" component={UpdateUser} />
      </div>
    </Router>
  );
}

export default App;
