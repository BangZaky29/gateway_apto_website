// =========================================
// FILE: src/pages/Payment/PaymentPage.jsx
// =========================================

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks/useFetch';
import { packageController } from '../../controllers/packageController';
import { paymentController } from '../../controllers/paymentController';
import { formatCurrency } from '../../utils/helpers';
import PaymentForm from '../../components/forms/PaymentForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import '../../styles/Style_forWebsite/Payment.css';

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const packageId = searchParams.get('packageId');

  const { data: packageData, loading: pkgLoading } = useFetch(
    packageId ? `/packages/${packageId}` : null
  );

  const [selectedMethod, setSelectedMethod] = useState('QRIS');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (!packageId) {
      navigate('/');
    }
  }, [isAuthenticated, packageId, navigate]);

  const handlePaymentSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Create payment first
      const paymentResult = await paymentController.createPayment(
        packageId,
        formData.paymentMethod
      );

      // Then confirm with proof
      await paymentController.confirmPayment(
        paymentResult.payment_id,
        formData.email,
        formData.phone,
        formData.proofFile
      );

      navigate('/payment-confirmation', {
        state: { paymentId: paymentResult.payment_id }
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  if (pkgLoading) return <LoadingSpinner />;

  return (
    <div className="payment-container">
      <div className="payment-wrapper">
        <PaymentForm
          onSubmit={handlePaymentSubmit}
          loading={loading}
          selectedMethod={selectedMethod}
        />

        <div className="payment-summary">
          <h3 className="text-2xl font-bold text-dark mb-6">Ringkasan Pembayaran</h3>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {packageData && (
            <>
              <div className="space-y-4 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-muted">Paket</span>
                  <span className="font-semibold text-dark">{packageData.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Durasi</span>
                  <span className="font-semibold text-dark">{packageData.duration_days} hari</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Harga</span>
                  <span className="font-semibold text-dark">
                    {formatCurrency(packageData.price)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between my-6">
                <span className="font-bold text-dark">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(packageData.price)}
                </span>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-sm">
                <h4 className="font-semibold text-dark mb-2">Included Features:</h4>
                <ul className="space-y-2 text-muted">
                  {packageData.features && typeof packageData.features === 'string' ? (
                    JSON.parse(packageData.features).map((feature, i) => (
                      <li key={i} className="flex gap-2">
                        <span>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))
                  ) : (
                    <li>✓ Akses penuh ke semua tools</li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;