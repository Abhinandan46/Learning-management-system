import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login details:", email, password);
    // Yahan API call hogi
  };

  return (
    <div className="auth-container"> {/* <-- CSS YAHAN SE SHURU HOTI HAI */}
      <div className="auth-box">      {/* <-- YE HAI AAPKA BOX */}
        <h2>Welcome Back 👋</h2>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Please login to continue learning.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="student@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn" style={{ marginTop: '10px' }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;