import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple demo login - in real app, this would be an API call
    setTimeout(() => {
      if (email && password) {
        // Demo login - create user data
        const userData = {
          name: email.split('@')[0], // Use email prefix as name
          email: email,
          role: 'student'
        };

        login(userData);
        navigate('/', { replace: true });
      } else {
        setError('Please enter both email and password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back 👋</h2>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Please login to continue learning.
        </p>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '15px',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn"
            style={{ marginTop: '10px' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
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