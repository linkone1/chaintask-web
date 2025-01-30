import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import '../App.css';

import WelcomeMessage from './welcomeMessage';
import ParticlesBackground from './ParticlesBackground';
import SearchBar from './searchBar';
import Login from './Login';
import Register from './Register';

function App() {
  const handleSearch = (query) => {
    console.log("Searching for...", query);
  };

  // Some inline style objects:
  const navStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    gap: '12px'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    border: '2px solid #fff',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  };

  // If you want a simple hover effect, you can do that in your .css instead.
  // For example, in App.css you might add:
  // .nav-button:hover {
  //   background-color: #fff;
  //   color: #000;
  // }

  return (
    <Router>
      <nav style={navStyle}>
        <Link to="/login" style={linkStyle} className="nav-button">
          Login
        </Link>
        <Link to="/register" style={linkStyle} className="nav-button">
          Register
        </Link>
      </nav>

      <Routes>
        {/* Use "*" or "/" depending on your exact routing needs */}
        <Route
          path="*"
          element={
            <div className="App">
              <ParticlesBackground />
              <WelcomeMessage />
              <SearchBar onSearch={handleSearch} />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
