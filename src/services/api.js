// =========================================
// FILE: src/services/api.js - COMPLETE FIX
// =========================================

import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// 🔧 Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // ✅ 10 detik timeout
});

console.log('[API] Base URL:', API_BASE_URL);

// =============================================
// REQUEST INTERCEPTOR - Attach Token
// =============================================
api.interceptors.request.use(
  (config) => {
    // 🔑 Ambil token dari localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // ✅ Format header dengan Bearer
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[API] Token attached to request:', config.url);
    } else {
      console.log('[API] No token found for:', config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('[API] Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// =============================================
// RESPONSE INTERCEPTOR - Handle Token Expiry
// =============================================
api.interceptors.response.use(
  (response) => {
    // ✅ Jika response berhasil
    console.log('[API] Response success:', response.config.url, response.status);
    return response;
  },
  (error) => {
    // ❌ Handle error
    const status = error.response?.status;
    const url = error.config?.url;
    
    console.error('[API] Response Error:', {
      status,
      url,
      message: error.message,
      data: error.response?.data
    });

    // 🚨 Routes yang tidak memerlukan token (PUBLIC)
    const publicRoutes = [
      '/auth/login',
      '/auth/register',
      '/auth/verify-otp',
      '/auth/resend-otp',
      '/auth/forgot-password',
      '/auth/verify-reset-otp',
      '/auth/reset-password',
      '/packages',
      '/feature',
    ];

    const isPublicRoute = publicRoutes.some(route => url?.includes(route));

    // ✅ Jika 401/403 dan BUKAN public route → logout
    if ((status === 401 || status === 403) && !isPublicRoute) {
      console.warn('[API] Unauthorized! Redirecting to login...');
      
      // Hapus token
      localStorage.removeItem('token');
      
      // Redirect ke login (sesuaikan dengan routing app Anda)
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    // ✅ 404 - Resource tidak ditemukan
    if (status === 404) {
      console.warn('[API] Resource not found:', url);
    }

    // ✅ 500 - Server error
    if (status >= 500) {
      console.error('[API] Server error:', status);
    }

    return Promise.reject(error);
  }
);

export default api;