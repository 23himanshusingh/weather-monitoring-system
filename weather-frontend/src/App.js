import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CurrentWeather from './components/CurrentWeather';
import DailySummary from './components/DailySummary';
import Alerts from './components/Alerts';

const App = () => (
  <Router>
    <Navbar />
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/current" element={<CurrentWeather />} />
        <Route path="/summary" element={<DailySummary />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </div>
  </Router>
);

export default App;
