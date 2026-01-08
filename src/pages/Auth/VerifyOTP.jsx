// =========================================
// FILE: src/pages/Auth/VerifyOTP.jsx
// =========================================

import { useLocation, useNavigate } from 'react-router-dom';
import { authController } from '../../controllers/authController';
import { validateOTP } from '../../utils/validation';
import { getErrorMessage } from '../../utils/helpers';
import Button from '../../components/common/Button';
import '../../styles/Style_forWebsite/Auth.css';
import { useState, useEffect } from 'react';



const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ⬇️ Ambil PHONE dari state (bukan email)
  const phone = location.state?.phone || '';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
  if (cooldown <= 0) return;

  const timer = setInterval(() => {
    setCooldown((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [cooldown]);


  const handleResendOtp = async () => {
  if (cooldown > 0) return;

  setResendLoading(true);
  setError('');
  setSuccess('');

  try {
    await authController.resendOtp(phone);
    setSuccess('OTP baru berhasil dikirim');
    setCooldown(60); // ⏱️ sync dengan backend cooldown
  } catch (err) {
    setError(getErrorMessage(err));
  } finally {
    setResendLoading(false);
  }
};


  // ⬇️ Kalau phone tidak ada
  if (!phone) {
    return (
      <div className="auth-container">
        <div className="auth-card text-center">
          <h2 className="text-red-500">Nomor HP tidak ditemukan</h2>
          <p className="text-muted mt-2">
            Silakan daftar atau login terlebih dahulu
          </p>
          <Button
            onClick={() => navigate('/register')}
            variant="primary"
            className="mt-4"
          >
            Kembali ke Daftar
          </Button>
        </div>
      </div>
    );
  }

  // ⬇️ Masking nomor (opsional tapi recommended)
  const maskedPhone = phone.replace(/(\d{2})\d+(\d{3})/, '$1****$2');

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
      // ⬇️ Kirim PHONE + OTP ke backend
      await authController.verifyOtp(phone, otp);

      setSuccess('Nomor HP berhasil diverifikasi! Silakan login.');
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
          <h2>Verifikasi OTP</h2>
          <p className="text-muted">
            Masukkan kode OTP yang dikirim ke{' '}
            <strong>{maskedPhone}</strong>
          </p>
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
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ''))
              }
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
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendLoading || cooldown > 0}
              className={`font-semibold hover:underline
                ${cooldown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600'}
              `}
            >
              {cooldown > 0
                ? `Kirim ulang (${cooldown}s)`
                : resendLoading
                ? 'Mengirim...'
                : 'Kirim ulang'}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
