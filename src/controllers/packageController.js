// =========================================
// FILE: src/controllers/packageController.js
// =========================================

import api from '../services/api';

export const packageController = {
  // Get all packages
  getPackages: async () => {
    try {
      const response = await api.get('/packages');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get package by ID
  getPackageById: async (id) => {
    try {
      const response = await api.get(`/packages/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get package features
  getPackageFeatures: async (packageId) => {
    try {
      const response = await api.get(`/packages/${packageId}/features`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
