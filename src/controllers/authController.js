// =========================================
// FILE: src/controllers/authController.js
// =========================================

import api from '../services/api';

export const authController = {
  // ======================
  // REGISTER
  // ======================
  register: async (name, email, phone, password) => {
    const res = await api.post('/auth/register', { name, email, phone, password });
    return res.data;
  },

  verifyOtp: async (phone, otp) => {
    const res = await api.post('/auth/verify-otp', { phone, otp });
    return res.data;
  },

  resendOtp: async (phone) => {
    const res = await api.post('/auth/resend-otp', { phone });
    return res.data;
  },

  // ======================
  // LOGIN
  // ======================
  login: async (phone, password) => {
    const res = await api.post('/auth/login', { phone, password });

    if (res.data?.token) {
      localStorage.setItem('token', res.data.token);
    }

    return res.data;
  },

  // ======================
  // FORGOT PASSWORD
  // ======================
  forgotPassword: async (phone) => {
    const res = await api.post('/auth/forgot-password', { phone });
    return res.data;
  },

  verifyResetOtp: async (phone, otp) => {
    const res = await api.post('/auth/verify-reset-otp', { phone, otp });
    return res.data;
  },

  resetPassword: async (phone, newPassword) => {
    const res = await api.post('/auth/reset-password', { phone, newPassword });
    return res.data;
  },

  // ======================
  // SESSION
  // ======================
  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};
