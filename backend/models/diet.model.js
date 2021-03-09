const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dietSchema = new Schema({
    username: { type: String, required: true },
    meal: { type: String, required: true },
    food: { type: String, required: true },
    quantity: { type: Number, required: true },
    calorie: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, default: '' },
}, {
  timestamps: true,
});

const Diet = mongoose.model('Diet', dietSchema);

module.exports = Diet;