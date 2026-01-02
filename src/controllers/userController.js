// =========================================
// FILE: src/controllers/userController.js
// =========================================

import api from '../services/api';

export const userController = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/me', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user tokens/subscriptions
  getUserTokens: async () => {
    try {
      const response = await api.get('/users/tokens');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user subscription status
  getSubscriptionStatus: async () => {
    try {
      const response = await api.get('/users/subscription-status');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
