const Weather = require('../models/weather');
const moment = require('moment');

// Thresholds
const HEATWAVE_THRESHOLD = 30; // Celsius
const COLD_SNAP_THRESHOLD = 13; // Celsius
const HIGH_HUMIDITY_THRESHOLD = 40; // Percent
const RAIN_CONDITIONS = ['Rain', 'Thunderstorm', 'Clouds'];

async function checkForAlerts() {
    try {
        const alerts = [];
        const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
        
        // Get latest weather data for each city
        for (const city of cities) {
            const recentData = await Weather.find({ city })
                .sort({ timestamp: -1 })
                .limit(2); // Get last two entries to check for consecutive conditions

            if (recentData.length < 2) continue; // Skip if not enough data

            const [latest, previous] = recentData;

            // Heatwave Alert
            if (latest.temp > HEATWAVE_THRESHOLD && previous.temp > HEATWAVE_THRESHOLD) {
                alerts.push({
                    city,
                    type: 'Heatwave Alert',
                    message: `Temperature has exceeded ${HEATWAVE_THRESHOLD}°C for two consecutive updates.`,
                });
            }

            // Cold Snap Alert
            if (latest.temp < COLD_SNAP_THRESHOLD && previous.temp < COLD_SNAP_THRESHOLD) {
                alerts.push({
                    city,
                    type: 'Cold Snap Alert',
                    message: `Temperature has dropped below ${COLD_SNAP_THRESHOLD}°C for two consecutive updates.`,
                });
            }

            // High Humidity Alert
            if (latest.humidity > HIGH_HUMIDITY_THRESHOLD && previous.humidity > HIGH_HUMIDITY_THRESHOLD) {
                alerts.push({
                    city,
                    type: 'High Humidity Alert',
                    message: `Humidity has exceeded ${HIGH_HUMIDITY_THRESHOLD}% for two consecutive updates.`,
                });
            }

            // Heavy Rain Alert
            if (RAIN_CONDITIONS.includes(latest.main) && RAIN_CONDITIONS.includes(previous.main)) {
                if (latest.main === "Clouds") {
                    message = `Heavy rain is expected!!!`;
                }else{
                    message = `Rain or thunderstorms detected in ${city} for two consecutive updates.`;
                }
                alerts.push({
                    city,
                    type: 'Rain Alert',
                    message
                });
            }
        }

        return alerts;
    } catch (error) {
        console.error('Error checking for alerts:', error.message);
        throw error;
    }
}

module.exports = checkForAlerts;
