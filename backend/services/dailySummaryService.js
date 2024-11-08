const Weather = require('../models/weather');
const DailyWeatherSummary = require('../models/dailySummary');
const moment = require('moment');

async function getDailyWeatherSummary(date) {
    try {
        // Retrieve all weather records for the given date across all cities
        const weatherData = await Weather.find({
            timestamp: {
                $gte: moment(date).startOf('day').toDate(),
                $lt: moment(date).endOf('day').toDate(),
            },
        });

        if (weatherData.length === 0) {
            console.log(`No weather data available for ${date}`);
            return { message: `No data for ${date}`, status: 404 };
        }

        // Group weather data by city
        const cityWeatherData = weatherData.reduce((acc, record) => {
            const { city } = record;
            if (!acc[city]) acc[city] = [];
            acc[city].push(record);
            return acc;
        }, {});

        // Initialize an array to store daily summaries for each city
        const dailySummaries = [];

        for (const city in cityWeatherData) {
            const cityData = cityWeatherData[city];

            // Calculate temperature and humidity aggregates
            const temperatures = cityData.map((record) => record.temp);
            const humidities = cityData
                .map((record) => record.humidity)
                .filter((humidity) => typeof humidity === 'number');

            const maxTemp = Math.max(...temperatures);
            const minTemp = Math.min(...temperatures);
            const avgTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
            const avgHumidity = humidities.length
                ? humidities.reduce((a, b) => a + b, 0) / humidities.length
                : null; // Set to null if no humidity data

            // Determine dominant weather condition for the city
            const weatherConditions = cityData.map((record) => record.main);
            const dominantWeather = weatherConditions
                .sort(
                    (a, b) =>
                        weatherConditions.filter((v) => v === a).length -
                        weatherConditions.filter((v) => v === b).length
                )
                .pop();

            // Create summary for the city
            const citySummary = new DailyWeatherSummary({
                date: moment(date).format('YYYY-MM-DD'),
                city,
                avgTemp: avgTemp.toFixed(2),
                maxTemp,
                minTemp,
                avgHumidity,  // No string fallback; keep as null if no data
                dominantWeather,
            });

            await citySummary.save();
            
            // Add to summaries array
            dailySummaries.push({
                date: moment(date).format('YYYY-MM-DD'),
                city,
                avgTemp: avgTemp.toFixed(2),
                maxTemp,
                minTemp,
                avgHumidity,  // No string fallback; keep as null if no data
                dominantWeather,
            });
        }

        // Return all daily summaries
        return { data: dailySummaries, status: 200 };
    } catch (error) {
        console.error('Error calculating daily weather summary:', error.message);
        return { error: error.message, status: 500 };
    }
}

module.exports = getDailyWeatherSummary;
