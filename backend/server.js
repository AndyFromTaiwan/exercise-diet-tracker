const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const usersRouter = require('./routes/users.route');
//const exercisesRouter = require('./routes/exercises.route');
//const dietRouter = require('./routes/diets.route');

// Server settings
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB Atlas connection established!");
})

// Routers
app.use('/users', usersRouter);
//app.use('/exercises', exercisesRouter);
//app.use('/diets', dietRouter);

// Starts server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});