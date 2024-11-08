import React, { useEffect, useState } from 'react';
import { fetchCurrentWeather } from '../utils/api';
import '../styles.css';

const CurrentWeather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchCurrentWeather()
      .then(data => setWeather(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="current-weather">
      <h2>Current Weather</h2>
      {weather ? (
        <div>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CurrentWeather;
