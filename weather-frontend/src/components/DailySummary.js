import React, { useEffect, useState } from 'react';
import '../styles.css';

const DailySummary = () => {
  const [summary, setSummary] = useState(null);
  const today = new Date().toISOString().split('T')[0]; // Format today's date as 'YYYY-MM-DD'

  useEffect(() => {
    fetch(`http://localhost:5000/weather/summary/${today}`)
      .then(response => response.json())
      .then(data => setSummary(data))
      .catch(error => console.error(error));
  }, [today]);

  return (
    <div className="daily-summary">
      <h2>Daily Weather Summary</h2>
      {summary ? (
        <div>
          <p>Temperature High: {summary.tempHigh}°C</p>
          <p>Temperature Low: {summary.tempLow}°C</p>
          <p>Condition: {summary.condition}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DailySummary;
