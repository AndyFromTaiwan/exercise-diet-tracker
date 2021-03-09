const router = require('express').Router();
let User = require('../models/user.model');
let Exercise = require('../models/exercise.model');
let Diet = require('../models/diet.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  const newUser = new User({username, email});
  newUser.save()
    .then(() => res.json(`User ${username} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      const username = user.username;
      Exercise.remove({ username: username })
        .then( ()=> {
          Diet.remove({ username: username })
            .then( ()=> { 
              user.remove()
                .then(() => res.json(`User ${username} deleted!`));      
          });
        });
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  User.findById(req.params.id)
    .then(user => {
      user.email = email || user.email;

      user.save()
        .then(() => res.json(`User ${username} email updated!`));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;