const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const schedule = require('node-schedule');
const fetchWeatherData = require('./services/weatherService');


connectDB();

const app = require('./app');

const PORT = process.env.PORT || 5000;

// Schedule the data-fetching job to run every minute
schedule.scheduleJob('*/1 * * * *', async () => {
  console.log('Fetching weather data...');
  await fetchWeatherData();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
