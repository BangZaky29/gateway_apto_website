// =========================================
// FILE: src/components/forms/LoginForm.jsx
// =========================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateForm, validateEmail, validatePassword } from '../../utils/validation';
import { getErrorMessage } from '../../utils/helpers';
import Button from '../common/Button';
import '../../styles/Style_forWebsite/Auth.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setGeneralError(''); // reset error lama

  // Validasi form
  const validationErrors = validateForm(formData, ['email', 'password']);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setLoading(true);

  try {
    // Panggil login dari useAuth
    const res = await login(formData.email, formData.password);

    // Jika berhasil, redirect ke profile
    navigate('/profile');
  } catch (err) {
    // Tangani error API dengan aman
    const msg = err?.response?.data?.message ?? err.message ?? 'Terjadi kesalahan';
    setGeneralError(msg);
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>

      <div className="auth-footer">
        <p>Belum punya akun?</p>
        <Link to="/register">Daftar sekarang</Link>
      </div>
    </form>
  );
};

export default LoginForm;
