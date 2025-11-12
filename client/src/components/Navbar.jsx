import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const handleNavigate = () => setMenuOpen(false);

  return (
    <nav>
      {/* Left Side: Logo */}
      <Link to="/" className="logo" onClick={handleNavigate}>🚀 LMS Plateform</Link>

      <button
        className="nav-toggle"
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      
      {/* Right Side: Links */}
      <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <Link to="/" onClick={handleNavigate}>Home</Link>
        <Link to="/dashboard" onClick={handleNavigate}>Dashboard</Link>
        <Link to="/login" className="btn nav-cta" onClick={handleNavigate}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;