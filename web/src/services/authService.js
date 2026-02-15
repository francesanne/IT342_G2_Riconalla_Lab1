import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Register user
const register = async (userData) => {
  try {
    const response = await api.post('/register', {
      username: userData.username,
      email: userData.email,
      passwordHash: userData.password
    });
    
    if (response.data.success) {
      const userToStore = {
        id: response.data.userId,
        email: response.data.email,
        username: userData.username  // Store the username from registration
      };
      localStorage.setItem('user', JSON.stringify(userToStore));
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    if (error.response) {
      throw error.response.data.message || 'Registration failed';
    } else if (error.request) {
      throw 'Network error - cannot connect to server';
    } else {
      throw error.message;
    }
  }
};

// Login user
const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email,
      password
    });
    
    if (response.data.success) {
      const userToStore = {
        id: response.data.userId,
        email: response.data.email,
        username: response.data.username  // Make sure username is stored
      };
      localStorage.setItem('user', JSON.stringify(userToStore));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      throw error.response.data.message || 'Login failed';
    } else if (error.request) {
      throw 'Network error - cannot connect to server. Make sure backend is running on port 8080';
    } else {
      throw error.message;
    }
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  // Optional: Call logout endpoint
  // api.post('/logout').catch(err => console.log('Logout error:', err));
};

// Get current user
const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default authService;