import React, { Component } from 'react';
import ViewExercises from "./view-exercises.component";
import ViewDiets from "./view-diets.component";

export default class ViewActivities extends Component {

  render() {
    return (
      <div>
        <ViewExercises />
        <ViewDiets />
      </div>
    );
  }
}