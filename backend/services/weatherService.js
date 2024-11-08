require('dotenv').config(); 
const axios = require('axios');
const Weather = require('../models/weather');


const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

async function fetchWeatherData() {

  for (const city of cities) {
    try {
        const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      const { main, weather, dt } = response.data;
      const tempCelsius = main.temp - 273.15; // Convert from Kelvin to Celsius
      const feelsLikeCelsius = main.feels_like - 273.15;
      const humidity = main.humidity;
      console.log(humidity);
      // Save data to the database
      const weatherData = new Weather({
        city,
        main: weather[0].main,
        temp: tempCelsius,
        feels_like: feelsLikeCelsius,
        humidity,
        timestamp: new Date(dt * 1000), // Convert from Unix timestamp
      });

      await weatherData.save();
      console.log(`Saved weather data for ${city}`);
    } catch (error) {
      console.error(`Failed to fetch weather data for ${city}:`, error.message);
    }
  }
}

module.exports = fetchWeatherData;
