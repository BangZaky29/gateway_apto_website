// =========================================
// FILE: src/components/forms/LoginForm.jsx (FINAL)
// =========================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateForm } from '../../utils/validation';
import Button from '../common/Button';
import { Eye, EyeOff, AlertCircle, Phone, Lock } from 'lucide-react';
import '../../styles/Style_forWebsite/Auth.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    const validationErrors = validateForm(formData, ['phone', 'password']);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await login(formData.phone, formData.password);

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      navigate('/profile');
    } catch (err) {
      setGeneralError(
        err?.response?.data?.message ?? 'Login gagal'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">

      <div className="welcome-banner">
        <h3>Selamat Datang Kembali 👋</h3>
        <p>Masuk menggunakan nomor HP terdaftar</p>
      </div>

      {generalError && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{generalError}</span>
        </div>
      )}

      {/* PHONE */}
      <div className={`form-group ${focusedField === 'phone' ? 'focused' : ''}`}>
        <label htmlFor="phone">Nomor HP</label>
        <div className="input-wrapper with-icon">
          <Phone size={20} className="input-icon" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField('')}
            placeholder="08xxxxxxxxxx"
            disabled={loading}
          />
        </div>
        {errors.phone && (
          <span className="error-message">
            <AlertCircle size={14} /> {errors.phone}
          </span>
        )}
      </div>

      {/* PASSWORD */}
      <div className={`form-group ${focusedField === 'password' ? 'focused' : ''}`}>
        <label htmlFor="password">Password</label>
        <div className="input-wrapper with-icon password-wrapper">
          <Lock size={20} className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField('')}
            placeholder="••••••••"
            disabled={loading}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.password && (
          <span className="error-message">
            <AlertCircle size={14} /> {errors.password}
          </span>
        )}
      </div>

      <div className="form-options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={loading}
          />
          <span>Ingat saya</span>
        </label>
        <Link to="/forgot-password" className="forgot-link">
          Lupa password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Memproses...' : 'Login'}
      </Button>

      <div className="divider"><span>atau</span></div>

      <div className="auth-footer">
        <p>Belum punya akun?</p>
        <Link to="/register" className="auth-link">Daftar sekarang</Link>
      </div>
    </form>
  );
};

export default LoginForm;
