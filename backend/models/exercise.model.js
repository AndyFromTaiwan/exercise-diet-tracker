const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calorie: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true, default: '' },
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;