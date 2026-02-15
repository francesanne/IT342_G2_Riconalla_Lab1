import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error);
      navigate('/login');
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-card">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            AuthSystem
          </div>
          <div className="navbar-user">
            <span className="user-email">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ width: 'auto' }}
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome back, {user?.username || 'User'}  {/* This will display the username */}
          </h1>
          <p className="welcome-subtitle">
            Here's an overview of your account
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Account status</div>
            <div className="stat-value">
              <span className="status-badge">
                <span className="status-dot"></span>
                Active
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Member since</div>
            <div className="stat-value">
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              })}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Account ID</div>
            <div className="stat-value" style={{ fontSize: '1rem', fontWeight: '500' }}>
              {user?.id}
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-header">
            <h3>Profile information</h3>
          </div>
          <div className="profile-content">
            <div className="profile-grid">
              <div className="profile-item">
                <span className="profile-item-label">Username</span>
                <span className="profile-item-value">
                  {user?.username || 'Not set'}  {/* This will display the username */}
                </span>
              </div>

              <div className="profile-item">
                <span className="profile-item-label">Email address</span>
                <span className="profile-item-value">
                  {user?.email}
                </span>
              </div>

              <div className="profile-item">
                <span className="profile-item-label">Account type</span>
                <span className="profile-item-value">
                  Standard
                </span>
              </div>

              <div className="profile-item">
                <span className="profile-item-label">Last login</span>
                <span className="profile-item-value">
                  Just now
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;