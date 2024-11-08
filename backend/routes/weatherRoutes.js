const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/current', weatherController.getCurrentWeather);
router.get('/summary/:date', weatherController.getDailySummary);
router.get('/alerts', weatherController.getAlerts);

module.exports = router;
