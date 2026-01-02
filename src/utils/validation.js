// =========================================
// FILE: src/utils/validation.js
// =========================================

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^(\+62|62|0)?[0-9]{9,12}$/;
  return phoneRegex.test(phone.replace(/[^\d]/g, ''));
};

export const validateOTP = (otp) => {
  return otp && otp.length === 6 && /^\d+$/.test(otp);
};

export const validateForm = (formData, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = `${field} is required`;
    }
  });

  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (formData.password && !validatePassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Invalid phone number';
  }

  return errors;
};