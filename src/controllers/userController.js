// =========================================
// FILE: src/controllers/userController.js
// FIXED VERSION WITH PROPER ERROR HANDLING
// =========================================

import api from '../services/api';

/**
 * User Controller - Handle all user-related API calls
 */
export const userController = {
  /**
   * ✅ GET CURRENT USER PROFILE
   * Endpoint: GET /users/me
   * Requires: Authorization header dengan JWT token
   */
  getProfile: async () => {
    try {
      console.log('[userController] Fetching user profile...');
      
      const response = await api.get('/users/me');

      // ✅ Backend sekarang return: { success, data, message }
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch profile');
      }

      // ✅ Return user data dari response.data.data
      const userData = response.data.data;
      
      console.log('[userController] Profile fetched:', {
        id: userData?.id,
        name: userData?.name,
        email: userData?.email
      });

      return userData;
    } catch (error) {
      console.error('[userController] getProfile failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });

      throw error;
    }
  },

  /**
   * ✅ UPDATE USER PROFILE
   * Endpoint: PUT /users/me
   * Requires: Authorization header dengan JWT token
   */
  updateProfile: async (userData) => {
    try {
      console.log('[userController] Updating user profile...');

      if (!userData || typeof userData !== 'object') {
        throw new Error('Invalid user data');
      }

      const response = await api.put('/users/me', userData);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update profile');
      }

      console.log('[userController] Profile updated successfully');
      return response.data.data;
    } catch (error) {
      console.error('[userController] updateProfile failed:', error.message);
      throw error;
    }
  },

  /**
   * ✅ GET USER TOKENS/SUBSCRIPTIONS
   * Endpoint: GET /users/tokens
   * Requires: Authorization header dengan JWT token
   */
  getUserTokens: async () => {
    try {
      console.log('[userController] Fetching user tokens...');

      const response = await api.get('/users/tokens');

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch tokens');
      }

      const tokens = response.data.data || [];
      
      console.log('[userController] Tokens fetched:', {
        count: tokens.length
      });

      return tokens;
    } catch (error) {
      console.error('[userController] getUserTokens failed:', error.message);
      throw error;
    }
  },

  /**
   * ✅ GET SUBSCRIPTION STATUS
   * Endpoint: GET /users/tokens
   * Returns: Subscription details atau null
   */
  getSubscriptionStatus: async () => {
    try {
      console.log('[userController] Checking subscription status...');

      const tokens = await userController.getUserTokens();

      // ✅ Cari token yang aktif dan belum expired
      const activeToken = tokens.find(token => {
        return (
          token.is_active === 1 &&
          new Date(token.expired_at) > new Date()
        );
      });

      if (activeToken) {
        console.log('[userController] Active subscription found:', {
          package: activeToken.package_name,
          expiresAt: activeToken.expired_at
        });
        return activeToken;
      }

      console.log('[userController] No active subscription');
      return null;
    } catch (error) {
      console.error('[userController] getSubscriptionStatus failed:', error.message);
      return null; // Fallback: tidak ada subscription
    }
  },

  /**
   * ✅ GET FEATURE ACCESS STATUS
   * Endpoint: GET /users/feature-access-status
   * Returns: Object mapping feature codes to access status
   */
  getFeatureAccessStatus: async () => {
    try {
      console.log('[userController] Fetching feature access status...');

      const response = await api.get('/users/feature-access-status');

      if (!response.data.success) {
        return {}; // Fallback: empty object
      }

      console.log('[userController] Feature access status fetched');
      return response.data.data || {};
    } catch (error) {
      console.error('[userController] getFeatureAccessStatus failed:', error.message);
      return {}; // Fallback: empty object
    }
  },

  /**
   * ✅ GET FEATURE ACCESS DETAILS
   * Endpoint: GET /users/feature-access-details
   * Returns: Details tentang paket dan fitur yang bisa diakses
   */
  getFeatureAccessDetails: async () => {
    try {
      console.log('[userController] Fetching feature access details...');

      const response = await api.get('/users/feature-access-details');

      if (!response.data.success) {
        return {
          package_name: null,
          active_features: [],
          expired_at: null
        };
      }

      console.log('[userController] Feature access details fetched');
      return response.data.data || {};
    } catch (error) {
      console.error('[userController] getFeatureAccessDetails failed:', error.message);
      return {
        package_name: null,
        active_features: [],
        expired_at: null
      };
    }
  }
};

export default userController;