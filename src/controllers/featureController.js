// =========================================
// FILE: src/controllers/featureController.js
// =========================================

import api from '../services/api';

export const featureController = {
  // Get all features
  getFeatures: async () => {
    try {
      const response = await api.get('/feature');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get featured features
  getFeaturedFeatures: async () => {
    try {
      const response = await api.get('/feature?featured=true');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
