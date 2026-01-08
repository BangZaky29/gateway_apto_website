// =========================================
// FILE: src/controllers/userController.js
// =========================================

import api from '../services/api';

export const userController = {
  // ======================
  // GET CURRENT USER
  // ======================
  getProfile: async () => {
    try {
      const response = await api.get('/users/me');
      // return user object langsung
      return response.data.user;
    } catch (error) {
      console.error('[userController] getProfile failed:', error);
      throw error;
    }
  },

  // ======================
  // UPDATE USER PROFILE
  // ======================
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/me', userData);
      return response.data.user;
    } catch (error) {
      console.error('[userController] updateProfile failed:', error);
      throw error;
    }
  },

  // ======================
  // GET USER TOKENS/SUBSCRIPTIONS
  // ======================
  getUserTokens: async () => {
    try {
      const response = await api.get('/users/tokens');
      return response.data.tokens || [];
    } catch (error) {
      console.error('[userController] getUserTokens failed:', error);
      throw error;
    }
  },

  getSubscriptionStatus: async () => {
    try {
      const response = await api.get('/users/subscription-status');
      return response.data.status || null;
    } catch (error) {
      console.error('[userController] getSubscriptionStatus failed:', error);
      throw error;
    }
  },
};
