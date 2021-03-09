const router = require('express').Router();
let Diet = require('../models/diet.model');

router.route('/').get((req, res) => {
  Diet.find()
    .then(diets => res.json(diets))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const meal = req.body.meal;
  const food = req.body.food;
  const quantity = Number(req.body.quantity);
  const calorie = Number(req.body.calorie);
  const date = Date.parse(req.body.date);
  const description = req.body.description;

  const newDiet = new Diet({
    username,
    meal,
    food,
    quantity,
    calorie,
    date,
    description,
  });

  newDiet.save()
    .then(() => res.json('Diet added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Diet.findById(req.params.id)
    .then(diet => res.json(diet))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Diet.findByIdAndDelete(req.params.id)
    .then(() => res.json('Diet deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  const username = req.body.username;
  const meal = req.body.meal;
  const food = req.body.food;
  const quantity = Number(req.body.quantity);
  const calorie = Number(req.body.calorie);
  const date = Date.parse(req.body.date);
  const description = req.body.description;

  Diet.findById(req.params.id)
    .then(diet => {    
      diet.username = username || diet.username;
      diet.meal = meal || diet.meal;
      diet.food = food || diet.food;
      diet.quantity = quantity || diet.quantity;
      diet.calorie = calorie || diet.calorie;
      diet.date = date ||mdiet.date;
      diet.description = description || diet.description;

      diet.save()
        .then(() => res.json('Diet updated!'));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;