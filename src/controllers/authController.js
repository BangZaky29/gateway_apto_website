// =========================================
// FILE: src/controllers/authController.js
// =========================================

import api from '../services/api';

export const authController = {
  // Register user
  register: async (name, email, phone, password) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        phone,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};