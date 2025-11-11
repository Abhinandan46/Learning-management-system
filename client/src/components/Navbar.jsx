import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      {/* Left Side: Logo */}
      <Link to="/" className="logo">🚀 LMS Plateform</Link>
      
      {/* Right Side: Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login" className="btn" style={{marginLeft: '20px'}}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;