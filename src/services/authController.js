// =========================================
// FILE: src/services/authController.js
// Auth API Controller
// =========================================

import api from './api';

const authController = {
  forgotPassword: (phone) => {
    return api.post('/auth/forgot-password', { phone });
  },

  resetPassword: ({ phone, otp, newPassword }) => {
    return api.post('/auth/reset-password', {
      phone,
      otp,
      newPassword,
    });
  },
};

export default authController;
