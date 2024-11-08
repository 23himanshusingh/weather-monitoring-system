const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  main: { type: String, required: true }, // Main weather condition (e.g., Rain, Clear)
  temp: { type: Number, required: true }, // Temperature in Celsius
  feels_like: { type: Number, required: true }, // Feels-like temperature in Celsius
  humidity: {type: Number},
  timestamp: { type: Date, default: Date.now }, // Time of data update
});

module.exports = mongoose.model('Weather', weatherSchema);
