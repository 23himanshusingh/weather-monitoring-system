import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/current">Current Weather</Link></li>
      <li><Link to="/summary">Daily Summary</Link></li>
      <li><Link to="/alerts">Alerts</Link></li>
    </ul>
  </nav>
);

export default Navbar;
