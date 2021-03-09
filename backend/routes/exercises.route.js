const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const type = req.body.type;
  const duration = Number(req.body.duration);
  const calorie = Number(req.body.calorie);
  const date = Date.parse(req.body.date);
  const description = req.body.description;

  const newExercise = new Exercise({
    username,
    type,
    duration,
    calorie,
    date,
    description,
  });

  newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  const username = req.body.username;
  const type = req.body.type;
  const duration = Number(req.body.duration);
  const calorie = Number(req.body.calorie);
  const date = Date.parse(req.body.date);
  const description = req.body.description;

  Exercise.findById(req.params.id)
    .then(exercise => {    
      exercise.username = username || exercise.username;
      exercise.type = type || exercise.type;
      exercise.duration = duration || exercise.duration;
      exercise.calorie = calorie || exercise.calorie;
      exercise.date = date ||mexercise.date;
      exercise.description = description || exercise.description;

      exercise.save()
        .then(() => res.json('Exercise updated!'));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;