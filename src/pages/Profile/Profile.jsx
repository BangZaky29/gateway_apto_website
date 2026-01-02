// =========================================
// FILE: src/pages/Profile/Profile.jsx
// =========================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks/useFetch';
import { userController } from '../../controllers/userController';
import { getSubscriptionStatus, getDaysRemaining, formatDate, getInitials } from '../../utils/helpers';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/common/Button';
import '../../styles/Style_forWebsite/Profile.css';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: userTokens, loading: tokensLoading, refetch } = useFetch('/users/tokens');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (tokensLoading) return <LoadingSpinner />;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center text-white text-5xl">
          {getInitials(user?.name || 'User')}
        </div>

        <div className="flex-1">
          <h2>{user?.name || 'User'}</h2>
          <p className="text-muted">{user?.email}</p>
          <p className="text-muted">{user?.phone}</p>
        </div>

        <Button variant="outline" onClick={() => navigate('/payment')}>
          Upgrade Paket
        </Button>
      </div>

      <div className="profile-grid">
        {userTokens && userTokens.length > 0 ? (
          userTokens.map((token) => {
            const status = getSubscriptionStatus(token.package_name, token.expired_at);
            const daysLeft = getDaysRemaining(token.expired_at);

            return (
              <div key={token.id} className={`package-card ${status === 'active' ? 'active' : ''}`}>
                <div className={`package-status ${status}`}>
                  {status === 'active' ? '✓ Aktif' : '⚠ Berakhir'}
                </div>

                <h3 className="text-2xl font-bold text-dark mb-4">{token.package_name}</h3>

                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-muted">Status</p>
                    <p className="text-sm font-semibold text-dark capitalize">{status}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted">Tanggal Aktivasi</p>
                    <p className="text-sm font-semibold text-dark">
                      {formatDate(token.activated_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted">Tanggal Berakhir</p>
                    <p className="text-sm font-semibold text-dark">
                      {formatDate(token.expired_at)}
                    </p>
                  </div>

                  {status === 'active' && (
                    <div>
                      <p className="text-xs text-muted">Sisa Hari</p>
                      <p className="text-lg font-bold text-blue-600">{daysLeft} hari</p>
                    </div>
                  )}
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate('/payment')}
                >
                  Perpanjang
                </Button>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted mb-4">Anda belum memiliki paket berlangganan</p>
            <Button variant="primary" onClick={() => navigate('/payment')}>
              Pilih Paket Sekarang
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;