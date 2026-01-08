// =========================================
// FILE: src/components/sections/Features.jsx
// =========================================

import { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { featureAccessService } from '../../services/featureAccessService';
import LoadingSpinner from '../common/LoadingSpinner';
import PremiumAccessModal from '../common/PremiumAccessModal';

const MAIN_SITE_URL = 'https://nuansasolution.id';

const Features = () => {
  const { data: apiData, loading, error } = useFetch('/feature');
  const features = apiData?.data || [];

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [featureAccessStatus, setFeatureAccessStatus] = useState({});
  const [accessLoading, setAccessLoading] = useState(true);
  const [userPackageInfo, setUserPackageInfo] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  // ========================================
  // FETCH FEATURE ACCESS DETAILS
  // ========================================
  useEffect(() => {
    const fetchAccessDetails = async () => {
      if (!isAuthenticated) {
        setAccessLoading(false);
        return;
      }

      try {
        setAccessLoading(true);

        const accessStatus = await featureAccessService.getFeatureAccessStatus();
        setFeatureAccessStatus(accessStatus);

        const accessDetails = await featureAccessService.getFeatureAccessDetails();
        setUserPackageInfo(accessDetails);

      } catch (err) {
        console.error('Error fetching access details:', err);
      } finally {
        setAccessLoading(false);
      }
    };

    fetchAccessDetails();
  }, [isAuthenticated]);

  // ========================================
  // GET FEATURE ACCESS STATUS
  // ========================================
  const getFeatureAccessStatus = (featureCode) => {
    if (!isAuthenticated) return 'login-required';
    if (accessLoading) return 'loading';
    return featureAccessStatus[featureCode] || 'premium';
  };

  // ========================================
  // HANDLE FEATURE CLICK
  // ========================================
  const handleFeatureClick = (feature) => {
    const accessStatus = getFeatureAccessStatus(feature.code);

    if (feature.status === 'free' || accessStatus === 'free' || accessStatus === 'subscribed') {
      window.location.href = `${MAIN_SITE_URL}${feature.code}/`;
      return;
    }

    if (!isAuthenticated || accessStatus === 'premium' || accessStatus === 'login-required') {
      setSelectedFeature(feature);
      setShowModal(true);
    }
  };

  // ========================================
  // GET FEATURE ICON
  // ========================================
  const getFeatureIcon = (name) => {
    const icons = {
      'Generator Surat Kuasa': '📄',
      'Kalkulator PPh': '🧮',
      'Kalkulator Pajak Properti': '🏠',
      'Surat Pernyataan': '📝',
      'Surat Permohonan': '✉️',
      'Surat Perintah Kerja': '🛠️',
      'Surat Jalan': '🚚',
      'Invoice': '🧾'
    };
    return icons[name] || '📋';
  };

  // ========================================
  // GET BADGE INFO
  // ========================================
  const getBadgeInfo = (feature, accessStatus) => {
    if (feature.status === 'free') return { text: 'Gratis', color: 'free' };
    if (accessStatus === 'loading') return { text: 'Mengecek...', color: 'loading' };
    if (accessStatus === 'subscribed') return { text: '✓ Berlangganan', color: 'subscribed' };
    if (!isAuthenticated || accessStatus === 'login-required') return { text: '🔒 Dibutuhkan Login', color: 'login-required' };
    if (accessStatus === 'premium') return { text: 'Premium', color: 'premium' };
    return { text: 'Premium', color: 'premium' };
  };

  return (
    <section id="features" className="features-section">
      <div className="container-max">
        <div className="features-header">
          <h2>Fitur-Fitur Unggulan</h2>
          <p>Akses berbagai tools untuk meningkatkan produktivitas Anda</p>

          {isAuthenticated && userPackageInfo && (
            <div className="package-info-badge animate-fade-in">
              <span className="badge-icon">📦</span>
              <div className="badge-content">
                <span className="badge-label">Paket Aktif:</span>
                <span className="badge-package">{userPackageInfo.package_name}</span>
              </div>
              {userPackageInfo.expired_at && (
                <span className="badge-expiry">
                  Berakhir: {new Date(userPackageInfo.expired_at).toLocaleDateString('id-ID')}
                </span>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : features.length > 0 ? (
          <div className="features-grid-modern">
            {features.map(feature => {
              const accessStatus = getFeatureAccessStatus(feature.code);
              const badgeInfo = getBadgeInfo(feature, accessStatus);

              return (
                <div
                  key={feature.id}
                  className="feature-card-modern"
                  onClick={() => handleFeatureClick(feature)}
                >
                  <div className="feature-card-icon">{getFeatureIcon(feature.name)}</div>

                  <div className="feature-card-content">
                    <h3 className="feature-card-title">{feature.name}</h3>
                    <div className="feature-card-badges">
                      <span className={`feature-badge ${badgeInfo.color}`}>
                        {badgeInfo.text}
                      </span>
                    </div>
                    {feature.description && (
                      <p className="feature-description">{feature.description}</p>
                    )}
                  </div>

                  <div className="feature-card-arrow">
                    {(!isAuthenticated || accessStatus === 'premium') ? '🔒' : '→'}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="features-empty animate-slide-up">
            <p>📭 Tidak ada fitur yang tersedia saat ini</p>
          </div>
        )}
      </div>

      <PremiumAccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpgrade={() => navigate('/payment')}
        featureName={selectedFeature?.name}
        packageName={userPackageInfo?.package_name}
      />
    </section>
  );
};

export default Features;
