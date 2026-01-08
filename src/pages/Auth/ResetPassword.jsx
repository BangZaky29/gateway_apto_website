// =========================================
// FILE: src/pages/Auth/ResetPassword.jsx (NEW)
// Reset Password with OTP
// =========================================

import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { validateOTP, validatePassword, passwordsMatch } from '../../utils/validation';
import Button from '../../components/common/Button';
import { AlertCircle, Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import authController from '../../services/authController';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone;

  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!phone) {
      navigate('/forgot-password');
    }
  }, [phone, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validations
    if (!validateOTP(formData.otp)) {
      setError('OTP harus 6 digit angka');
      return;
    }

    if (!validatePassword(formData.newPassword)) {
      setError('Password minimal 8 karakter');
      return;
    }

    if (!passwordsMatch(formData.newPassword, formData.confirmPassword)) {
      setError('Password tidak cocok');
      return;
    }

    setLoading(true);

    try {
      const response = await authController.resetPassword({
        phone,
        otp: formData.otp,
        newPassword: formData.newPassword,
        });


      if (response.data.success) {
        setSuccess(response.data.message);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.data.message || 'Gagal reset password');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Terjadi kesalahan. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await authController.forgotPassword(phone);
      
      if (response.data.success) {
        setSuccess('Kode OTP baru telah dikirim ke WhatsApp Anda');
        setTimeout(() => setSuccess(''), 4000);
      }
    } catch (err) {
      setError('Gagal mengirim ulang OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Reset Password</h2>
          <p className="text-muted">
            Kode OTP telah dikirim ke {phone}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Info Banner */}
          <div className="welcome-banner" style={{ background: '#FEF3C7', border: '1px solid #FCD34D' }}>
            <h3 style={{ color: '#92400E', fontSize: '1rem', marginBottom: '8px' }}>
              ⏰ Kode OTP berlaku 5 menit
            </h3>
            <p style={{ color: '#78350F', fontSize: '0.9rem' }}>
              Periksa WhatsApp Anda untuk mendapatkan kode verifikasi
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="alert" style={{ background: '#D1FAE5', borderColor: '#86EFAC', color: '#065F46' }}>
              <CheckCircle size={20} />
              <span>{success}</span>
            </div>
          )}

          {/* OTP Input */}
          <div className="form-group">
            <label htmlFor="otp">Kode OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              maxLength="6"
              value={formData.otp}
              onChange={handleChange}
              placeholder="000000"
              disabled={loading}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span className="form-hint">Masukkan 6 digit kode OTP</span>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2E8FE8',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Kirim Ulang
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="form-group">
            <label htmlFor="newPassword">Password Baru</label>
            <div className="input-wrapper password-wrapper">
              <Lock size={20} className="input-icon" style={{ left: '14px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
                style={{ paddingLeft: '44px' }}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password Baru</label>
            <div className="input-wrapper password-wrapper">
              <Lock size={20} className="input-icon" style={{ left: '14px' }} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
                style={{ paddingLeft: '44px' }}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Match Indicator */}
            {formData.confirmPassword && (
              <div className="password-match" style={{ marginTop: '8px' }}>
                {passwordsMatch(formData.newPassword, formData.confirmPassword) ? (
                  <span className="match-success">
                    <CheckCircle size={14} /> Password cocok
                  </span>
                ) : (
                  <span className="match-error">
                    <AlertCircle size={14} /> Password tidak cocok
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full submit-button"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Mengubah Password...' : 'Reset Password'}
          </Button>

          {/* Back to Login */}
          <div className="auth-footer">
            <Link to="/login" className="auth-link">
              Kembali ke Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;