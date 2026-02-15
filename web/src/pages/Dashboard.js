import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
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

      // You'll need to implement this endpoint in backend
      // For now, we'll use the stored user data
      setUser(currentUser);
      setLoading(false);
      
      // Uncomment when /api/user/me is ready:
      /*
      const response = await axios.get('http://localhost:8080/api/user/me', {
        headers: {
          'Authorization': `Basic ${btoa(currentUser.email + ':')}`
        }
      });
      setUser(response.data);
      */
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
      <div className="glass-card" style={{ textAlign: 'center' }}>
        <p style={{ color: 'white' }}>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card"
      style={{ maxWidth: '600px' }}
    >
      <h2 style={{ color: 'white', marginBottom: '30px', textAlign: 'center' }}>
        Welcome to Your Dashboard
      </h2>
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '15px', 
        padding: '20px',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: 'white', marginBottom: '15px' }}>Profile Information</h3>
        <p style={{ color: 'white', margin: '10px 0' }}>
          <strong>User ID:</strong> {user?.id}
        </p>
        <p style={{ color: 'white', margin: '10px 0' }}>
          <strong>Email:</strong> {user?.email}
        </p>
        <p style={{ color: 'white', margin: '10px 0' }}>
          <strong>Status:</strong> <span style={{ color: '#4caf50' }}>● Active</span>
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '10px', 
          padding: '15px',
          textAlign: 'center'
        }}>
          <h4 style={{ color: 'white', marginBottom: '5px' }}>Account Age</h4>
          <p style={{ color: 'white', fontSize: '14px' }}>New User</p>
        </div>
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '10px', 
          padding: '15px',
          textAlign: 'center'
        }}>
          <h4 style={{ color: 'white', marginBottom: '5px' }}>Last Login</h4>
          <p style={{ color: 'white', fontSize: '14px' }}>Just now</p>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="gradient-btn"
        style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%)' }}
      >
        Logout
      </button>
    </motion.div>
  );
};

export default Dashboard;