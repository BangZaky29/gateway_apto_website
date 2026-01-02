// =========================================
// FILE: src/utils/helpers.js
// =========================================

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (dateTime) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateTime));
};

export const getSubscriptionStatus = (packageName, expiredAt) => {
  if (!packageName) return 'none';
  
  const now = new Date();
  const expiredDate = new Date(expiredAt);
  
  return expiredDate > now ? 'active' : 'expired';
};

export const getDaysRemaining = (expiredAt) => {
  const now = new Date();
  const expiredDate = new Date(expiredAt);
  const diffTime = expiredDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeText = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const generatePaymentId = () => {
  return `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'Terjadi kesalahan. Silakan coba lagi.';
};

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));