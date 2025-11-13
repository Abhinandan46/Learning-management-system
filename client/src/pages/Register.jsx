import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaUserPlus, FaSpinner, FaCheck } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Add entrance animation
    const timer = setTimeout(() => {
      document.querySelector('.auth-box').classList.add('animate-in');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Calculate password strength
    const password = formData.password;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      shakeForm();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      shakeForm();
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      shakeForm();
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo purposes, create user account
      // In real app, this would be an API call to register the user
      const userData = {
        name: formData.name,
        email: formData.email,
        role: 'student',
        registeredAt: new Date().toISOString()
      };

      setSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      login(userData);
      navigate('/', { replace: true });
    } catch (err) {
      setError('Registration failed. Please try again.');
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

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return '#ef4444';
      case 1: return '#f97316';
      case 2: return '#eab308';
      case 3: return '#22c55e';
      case 4: return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="auth-container">
      {/* Animated Background */}
      <div className="auth-bg">
        <div className="floating-shapes">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="floating-shape register-shape"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        <div className="gradient-overlay register-overlay" />
      </div>

      <div className="auth-box register-box">
        {/* Success Animation */}
        {success && (
          <div className="success-overlay">
            <div className="success-checkmark">
              <FaCheck size={40} />
            </div>
            <h3>Account Created!</h3>
            <p>Welcome to the learning community!</p>
          </div>
        )}

        <div className="auth-header">
          <div className="auth-icon register-icon">
            <FaUserPlus size={24} />
          </div>
          <h2>Create Your Account 🚀</h2>
          <p>Join thousands of learners and start your journey today.</p>
        </div>

        {error && (
          <div className="error-message animate-slide-down">
            <div className="error-icon">⚠️</div>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
            <label className="form-label">
              <FaUser size={14} />
              Full Name
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
                disabled={loading}
                className="form-input"
              />
              {formData.name && <div className="input-highlight" />}
            </div>
          </div>

          <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
            <label className="form-label">
              <FaEnvelope size={14} />
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                disabled={loading}
                className="form-input"
              />
              {formData.email && <div className="input-highlight" />}
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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
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
              {formData.password && <div className="input-highlight" />}
            </div>
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${(passwordStrength / 4) * 100}%`,
                      backgroundColor: getPasswordStrengthColor()
                    }}
                  />
                </div>
                <span style={{ color: getPasswordStrengthColor() }}>
                  {getPasswordStrengthText()}
                </span>
              </div>
            )}
          </div>

          <div className={`form-group ${focusedField === 'confirmPassword' ? 'focused' : ''}`}>
            <label className="form-label">
              <FaLock size={14} />
              Confirm Password
            </label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => handleFocus('confirmPassword')}
                onBlur={handleBlur}
                required
                disabled={loading}
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
              {formData.confirmPassword && <div className="input-highlight" />}
            </div>
            {formData.confirmPassword && formData.password && (
              <div className={`password-match ${formData.password === formData.confirmPassword ? 'match' : 'no-match'}`}>
                {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`auth-btn register-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner" size={16} />
                Creating Account...
              </>
            ) : (
              <>
                <FaUserPlus size={16} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>

        <div className="demo-notice register-notice">
          <div className="demo-icon">🎓</div>
          <div>
            <strong>Demo Registration:</strong>
            <br />
            Fill in your details to create an account and start learning immediately!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;