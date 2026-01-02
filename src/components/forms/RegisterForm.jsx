// =========================================
// FILE: src/components/forms/RegisterForm.jsx
// =========================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateForm, validatePhone } from '../../utils/validation';
import { getErrorMessage } from '../../utils/helpers';
import Button from '../common/Button';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    const validationErrors = validateForm(formData, ['name', 'email', 'phone', 'password']);
    
    if (!validatePhone(formData.phone)) {
      validationErrors.phone = 'Nomor telepon tidak valid';
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Password tidak cocok';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error) {
      setGeneralError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {generalError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {generalError}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Nama Lengkap</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          disabled={loading}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          disabled={loading}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Nomor WhatsApp</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="08123456789"
          disabled={loading}
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          disabled={loading}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Konfirmasi Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          disabled={loading}
        />
        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={loading}
        disabled={loading}
      >
        Daftar
      </Button>

      <div className="auth-footer">
        <p>Sudah punya akun?</p>
        <Link to="/login">Login sekarang</Link>
      </div>
    </form>
  );
};

export default RegisterForm;