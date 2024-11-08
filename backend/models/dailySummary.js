const mongoose = require('mongoose');

const dailyWeatherSummarySchema = new mongoose.Schema({
    date: { type: String, required: true },
    city: { type: String, required: true },
    avgTemp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minTemp: { type: Number, required: true },
    avgHumidity: { type: Number},  // New field for average humidity
    dominantWeather: { type: String, required: true },
});

module.exports = mongoose.model('DailyWeatherSummary', dailyWeatherSummarySchema);
