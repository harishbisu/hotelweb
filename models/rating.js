const mongoose = require('mongoose');

// Define the Rating schema
const ratingSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  count: {
    type: Number,
    defaultValue:0
  },
});

// Create the Rating model
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
