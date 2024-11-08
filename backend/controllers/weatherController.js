const axios = require('axios');
const getDailyWeatherSummaryForCities = require('../services/dailySummaryService');
const checkForAlerts = require('../services/alertService');
const API_KEY = process.env.OPENWEATHERMAP_API_KEY; // Your OpenWeatherMap API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// List of metro cities in India
const metroCities = [
    'Delhi',
    'Mumbai',
    'Kolkata',
    'Chennai',
    'Bengaluru',
    'Hyderabad'
];

// Fetch current weather data for multiple cities
exports.getCurrentWeather = async (req, res) => {
    try {
        const cityDataPromises = metroCities.map(async (city) => {
            // Make API request for each city
            const response = await axios.get(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);

            if (response.status === 200) {
                return {
                    city: city,
                    temperature: response.data.main.temp,
                    condition: response.data.weather[0].description,
                    humidity: response.data.main.humidity,
                    windSpeed: response.data.wind.speed
                };
            } else {
                throw new Error(`Failed to fetch weather data for ${city}`);
            }
        });

        // Wait for all promises to resolve
        const weatherData = await Promise.all(cityDataPromises);

        // Return the weather data for all cities
        return res.status(200).json(weatherData);
    } catch (error) {
        console.error('Error fetching current weather:', error.message);
        return res.status(500).json({
            message: 'Error fetching current weather for cities.',
            error: error.message
        });
    }
};

// Fetch daily summary for a specific date (for all cities) 
exports.getDailySummary = async (req, res) => {
    const date = req.params.date;
    try {
        // Call the service to get the summary for all cities
        const summaries = await getDailyWeatherSummaryForCities(date);

        // If summaries is an empty array, return a message indicating no data
        if (summaries.length === 0) {
            return res.status(500).json({
                message: 'No weather data available for the specified date.',
            });
        }

        // Return the summaries in the response
        return res.status(200).json(summaries);
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching daily weather summaries.',
            error: error.message,
        });
    }
};

// Fetch weather alerts
exports.getAlerts = async (req, res) => {
    try {
        const alerts = await checkForAlerts();
        return res.status(200).json({ status: 200, alerts });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Error fetching alerts', error: error.message });
    }
};
