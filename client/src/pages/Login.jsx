import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaSignInAlt, FaSpinner, FaCheck } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [success, setSuccess] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Add entrance animation
    const timer = setTimeout(() => {
      document.querySelector('.auth-box').classList.add('animate-in');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Please enter both email and password');
      shakeForm();
      return;
    }

    setLoading(true);

    try {
      // Use the actual login method from AuthContext
      const result = login(email, password);

      if (result.success) {
        setSuccess(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate('/', { replace: true });
      } else {
        setError(result.error);
        shakeForm();
      }
    } catch {
      setError('Login failed. Please try again.');
      shakeForm();
    } finally {
      setLoading(false);
    }
  };

  const shakeForm = () => {
    const form = document.querySelector('.auth-box');
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 500);
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  return (
    <div className="auth-container">
      {/* Animated Background */}
      <div className="auth-bg">
        <div className="floating-shapes">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="floating-shape"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        <div className="gradient-overlay" />
      </div>

      <div className="auth-box">
        {/* Success Animation */}
        {success && (
          <div className="success-overlay">
            <div className="success-checkmark">
              <FaCheck size={40} />
            </div>
            <h3>Welcome Back!</h3>
            <p>Redirecting to your dashboard...</p>
          </div>
        )}

        <div className="auth-header">
          <div className="auth-icon">
            <FaSignInAlt size={24} />
          </div>
          <h2>Welcome Back 👋</h2>
          <p>Please login to continue your learning journey.</p>
        </div>

        {error && (
          <div className="error-message animate-slide-down">
            <div className="error-icon">⚠️</div>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
            <label className="form-label">
              <FaUser size={14} />
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                disabled={loading}
                className="form-input"
              />
              {email && <div className="input-highlight" />}
            </div>
          </div>

          <div className={`form-group ${focusedField === 'password' ? 'focused' : ''}`}>
            <label className="form-label">
              <FaLock size={14} />
              Password
            </label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                required
                disabled={loading}
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
              {password && <div className="input-highlight" />}
            </div>
          </div>

          <button
            type="submit"
            className={`auth-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner" size={16} />
                Logging in...
              </>
            ) : (
              <>
                <FaSignInAlt size={16} />
                Login
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?
            <Link
              to="/register"
              className="auth-link"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="demo-notice">
          <div className="demo-icon">🎓</div>
          <div>
            <strong>Demo Credentials:</strong>
            <br />
            Student: john@example.com / password123
            <br />
            Admin: admin@example.com / admin123
            <br />
            <button
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('currentUser');
                localStorage.removeItem('userData');
                window.location.reload();
              }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: 'var(--primary)',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Reset All Data (for testing)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;