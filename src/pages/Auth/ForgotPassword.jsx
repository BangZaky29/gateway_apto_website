// =========================================
// FILE: src/pages/Auth/ForgotPassword.jsx (NEW)
// Forgot Password - Request OTP
// =========================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validatePhone } from '../../utils/validation';
import Button from '../../components/common/Button';
import { AlertCircle, Phone, ArrowLeft } from 'lucide-react';
import authController from '../../services/authController';

const ForgotPassword = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate phone
    if (!phone) {
      setError('Nomor WhatsApp harus diisi');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Format nomor WhatsApp tidak valid');
      return;
    }

    setLoading(true);

    try {
      const response = await authController.forgotPassword(phone);

      if (response.data.success) {
        setSuccess(response.data.message);
        
        // Navigate to reset password page with email
        setTimeout(() => {
          navigate('/reset-password', { 
            state: { 
              phone: phone 
            } 
          });
        }, 2000);
      } else {
        setError(response.data.message || 'Gagal mengirim OTP');
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

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Lupa Password?</h2>
          <p className="text-muted">
            Masukkan nomor WhatsApp yang terdaftar untuk reset password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Info Banner */}
          <div className="welcome-banner" style={{ background: '#EBF5FF', border: '1px solid #4DA6FF' }}>
            <h3 style={{ color: '#1E7FDB', fontSize: '1rem', marginBottom: '8px' }}>
              🔐 Verifikasi via WhatsApp
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
              Kami akan mengirimkan kode OTP ke nomor WhatsApp Anda untuk verifikasi
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
              <AlertCircle size={20} />
              <span>{success}</span>
            </div>
          )}

          {/* Phone Input */}
          <div className="form-group">
            <label htmlFor="phone">Nomor WhatsApp</label>
            <div className="input-wrapper with-icon">
              <Phone size={20} className="input-icon" />
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08123456789"
                disabled={loading}
              />
            </div>
            <p className="form-hint">
              Gunakan nomor WhatsApp yang terdaftar di akun Anda
            </p>
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
            {loading ? 'Mengirim OTP...' : 'Kirim Kode OTP'}
          </Button>

          {/* Back to Login */}
          <div className="auth-footer">
            <Link to="/login" className="auth-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={16} />
              Kembali ke Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;