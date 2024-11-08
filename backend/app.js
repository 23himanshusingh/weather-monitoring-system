const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/weather', weatherRoutes);

app.get('/health', (req, res) => res.send('Backend is running!'));

module.exports = app;
