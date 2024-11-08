import React, { useEffect, useState } from 'react';
import '../styles.css';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/weather/alerts')
      .then(response => response.json())
      .then(data => setAlerts(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="alerts">
      <h2>Weather Alerts</h2>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>
              <strong>{alert.title}</strong>: {alert.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No alerts at this time.</p>
      )}
    </div>
  );
};

export default Alerts;
