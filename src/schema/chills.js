const mongoose = require('mongoose');

const ChillsSchema = new mongoose.Schema({
  date: String,
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('chills', ChillsSchema);
