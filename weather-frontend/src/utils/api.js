const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/weather';

export const fetchCurrentWeather = async () => {
  const response = await fetch(`${BASE_URL}/current`);
  return response.json();
};

export const fetchDailySummary = async (date) => {
  const response = await fetch(`${BASE_URL}/summary/${date}`);
  return response.json();
};

export const fetchAlerts = async () => {
  const response = await fetch(`${BASE_URL}/alerts`);
  return response.json();
};
