import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaCamera, FaShieldAlt, FaClock } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    location: '',
    website: '',
    profilePicture: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Update formData when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        phone: user.phone || '',
        location: user.location || '',
        website: user.website || '',
        profilePicture: user.profilePicture || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = updateProfile(formData);

    if (result.success) {
      setMessage('Profile updated successfully!');
      setMessageType('success');
      setIsEditing(false);
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    } else {
      setMessage(result.error || 'Failed to update profile');
      setMessageType('error');
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        phone: user.phone || '',
        location: user.location || '',
        website: user.website || '',
        profilePicture: user.profilePicture || ''
      });
    }
    setIsEditing(false);
    setMessage('');
    setMessageType('');
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-error">
        <FaShieldAlt size={48} />
        <h2>Access Denied</h2>
        <p>Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="header-content">
          <h1>My Profile</h1>
          <p className="header-subtitle">Manage your account information and preferences</p>
        </div>
        <button
          className={`edit-toggle-btn ${isEditing ? 'editing' : ''}`}
          onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <FaTimes /> Cancel
            </>
          ) : (
            <>
              <FaEdit /> Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`message-banner ${messageType}`}>
          <div className="message-content">
            <span>{message}</span>
          </div>
        </div>
      )}

      <div className="profile-content">
        {/* Profile Picture Section */}
        <div className="profile-picture-section">
          <div className="picture-container">
            <div className="profile-picture">
              {formData.profilePicture ? (
                <img src={formData.profilePicture} alt="Profile" />
              ) : (
                <div className="default-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {isEditing && (
              <div className="picture-upload">
                <label htmlFor="profilePicture" className="upload-label">
                  <FaCamera /> Change Photo
                </label>
                <input
                  type="url"
                  id="profilePicture"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  className="upload-input"
                />
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <form onSubmit={handleSubmit} className="profile-form">
            {/* Basic Information */}
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser /> Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  ) : (
                    <div className="display-value">{user.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope /> Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  ) : (
                    <div className="display-value">{user.email}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                {isEditing ? (
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    className="form-textarea"
                    rows="3"
                  />
                ) : (
                  <div className="display-value">
                    {user.bio || 'No bio added yet.'}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-section">
              <h3 className="section-title">Contact Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="form-input"
                    />
                  ) : (
                    <div className="display-value">
                      {user.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="form-input"
                    />
                  ) : (
                    <div className="display-value">
                      {user.location || 'Not specified'}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    className="form-input"
                  />
                ) : (
                  <div className="display-value">
                    {user.website ? (
                      <a href={user.website} target="_blank" rel="noopener noreferrer">
                        {user.website}
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Account Information (Read-only) */}
            <div className="form-section">
              <h3 className="section-title">Account Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FaShieldAlt /> Account Type
                  </label>
                  <div className="display-value role-badge">
                    {user.role === 'admin' ? 'Administrator' : 'Student'}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <FaCalendarAlt /> Member Since
                  </label>
                  <div className="display-value">
                    {new Date(user.registeredAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              {user.lastLogin && (
                <div className="form-group">
                  <label>
                    <FaClock /> Last Login
                  </label>
                  <div className="display-value">
                    {new Date(user.lastLogin).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="form-actions">
                <button type="submit" className="save-btn">
                  <FaSave /> Save Changes
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;