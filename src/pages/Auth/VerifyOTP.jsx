// =========================================
// FILE: src/pages/Auth/VerifyOTP.jsx
// =========================================

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authController } from '../../controllers/authController';
import { validateOTP, validateForm } from '../../utils/validation';
import { getErrorMessage } from '../../utils/helpers';
import Button from '../../components/common/Button';
import '../../styles/Style_forWebsite/Auth.css';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  if (!email) {
    return (
      <div className="auth-container">
        <div className="auth-card text-center">
          <h2 className="text-red-500">Email tidak ditemukan</h2>
          <p className="text-muted mt-2">Silakan daftar terlebih dahulu</p>
          <Button onClick={() => navigate('/register')} variant="primary" className="mt-4">
            Kembali ke Daftar
          </Button>
        </div>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateOTP(otp)) {
      setError('OTP harus 6 digit angka');
      return;
    }

    setLoading(true);
    try {
      await authController.verifyOTP(email, otp);
      setSuccess('Email berhasil diverifikasi! Silakan login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Verifikasi Email</h2>
          <p className="text-muted">Masukkan kode OTP yang dikirim ke {email}</p>
        </div>

        <form onSubmit={handleVerify} className="auth-form">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="otp">Kode OTP (6 Digit)</label>
            <input
              type="text"
              id="otp"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
            disabled={loading}
          >
            Verifikasi
          </Button>

          <div className="auth-footer">
            <p className="text-sm">Tidak menerima kode?</p>
            <button type="button" className="text-blue-600 font-semibold hover:underline">
              Kirim ulang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
