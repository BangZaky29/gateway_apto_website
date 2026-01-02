// =========================================
// FILE: src/pages/Payment/PaymentConfirmation.jsx
// =========================================

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../../components/common/Button';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentId = location.state?.paymentId;

  useEffect(() => {
    if (!paymentId) {
      navigate('/');
    }
  }, [paymentId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-4">
      <div className="bg-white rounded-lg shadow-xl p-12 max-w-md w-full text-center animate-slide-up">
        <div className="text-6xl mb-6">✅</div>

        <h1 className="text-3xl font-bold text-dark mb-4">
          Pembayaran Diterima!
        </h1>

        <p className="text-muted text-lg mb-2">
          Terima kasih telah melakukan pembayaran
        </p>

        <div className="bg-blue-50 rounded-lg p-4 my-6">
          <p className="text-sm text-muted">ID Pembayaran</p>
          <p className="font-bold text-dark text-lg break-all">{paymentId}</p>
        </div>

        <p className="text-muted text-sm mb-8">
          Pembayaran Anda sedang dikonfirmasi oleh admin. Anda akan menerima notifikasi melalui email
          ketika paket Anda sudah aktif. Biasanya prosesnya memakan waktu 1-5 menit.
        </p>

        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => navigate('/profile')}
          >
            Kembali ke Profile
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => navigate('/')}
          >
            Kembali ke Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
