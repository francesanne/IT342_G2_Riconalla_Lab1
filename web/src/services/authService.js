import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username: userData.username,
      email: userData.email,
      passwordHash: userData.password
    });
    
    if (response.data) {
      // Don't store password hash in localStorage
      const userToStore = {
        id: response.data.userId,
        email: response.data.email
      };
      localStorage.setItem('user', JSON.stringify(userToStore));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login user
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    
    if (response.data) {
      const userToStore = {
        id: response.data.userId,
        email: response.data.email
      };
      localStorage.setItem('user', JSON.stringify(userToStore));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default authService;