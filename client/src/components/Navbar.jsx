import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const handleNavigate = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

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

        {isAuthenticated ? (
          <div className="user-menu">
            <div className="user-info">
              <FaUser size={16} />
              <span>{user?.name || 'User'}</span>
            </div>
            <Link to="/profile" onClick={handleNavigate} className="profile-link">
              <FaUser size={14} />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="logout-btn"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.9rem'
              }}
            >
              <FaSignOutAlt size={14} />
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" onClick={handleNavigate}>Login</Link>
            <Link to="/register" className="btn nav-cta" onClick={handleNavigate}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;