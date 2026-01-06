// =========================================
// FILE: src/components/sections/Features.jsx - UPDATED
// =========================================

import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';

const MAIN_SITE_URL = 'https://nuansasolution.id';

const Features = () => {
  const { data: features, loading, error } = useFetch('/feature');
  const { data: userTokens } = useFetch('/users/tokens');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ✅ Cek apakah user sudah berlangganan feature tertentu
  const isFeatureSubscribed = (featureCode) => {
    if (!userTokens || userTokens.length === 0) return false;
    
    // Cek apakah ada token aktif yang mencakup feature ini
    return userTokens.some(token => 
      token.is_active === 1 && 
      new Date(token.expired_at) > new Date()
    );
  };

  const handleFeatureClick = async (feature) => {
    const targetUrl = `${MAIN_SITE_URL}${feature.code}/`;

    // ===== FREE FEATURE =====
    if (feature.status === 'free') {
      window.location.href = targetUrl;
      return;
    }

    // ===== PREMIUM → LOGIN =====
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/link/check`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ path: feature.code })
        }
      );

      const result = await response.json();

      if (result.success && result.allowed) {
        window.location.href = targetUrl;
      } else {
        alert(result.message);
        navigate('/payment');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan');
    }
  };

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

  return (
    <section id="features" className="features-section">
      <div className="container-max">
        <div className="features-header">
          <h2>Fitur-Fitur Unggulan</h2>
          <p>Akses berbagai tools untuk meningkatkan produktivitas Anda</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="features-error">
            <p>Gagal memuat fitur. Silakan coba lagi.</p>
          </div>
        ) : features && features.length > 0 ? (
          <div className="features-grid-modern">
            {features.map((feature) => {
              const isSubscribed = isFeatureSubscribed(feature.code);
              
              return (
                <div
                  key={feature.id}
                  className="feature-card-modern"
                  onClick={() => handleFeatureClick(feature)}
                >
                  {/* Icon */}
                  <div className="feature-card-icon">
                    {getFeatureIcon(feature.name)}
                  </div>

                  {/* Content */}
                  <div className="feature-card-content">
                    <h3 className="feature-card-title">{feature.name}</h3>
                    
                    {/* Badge */}
                    <div className="feature-card-badges">
                      {feature.status === 'free' ? (
                        <span className="feature-badge free">Gratis</span>
                      ) : isSubscribed ? (
                        <span className="feature-badge subscribed">
                          ✓ Berlangganan
                        </span>
                      ) : (
                        <span className="feature-badge premium">Premium</span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="feature-card-arrow">→</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="features-empty">
            <p>Tidak ada fitur yang tersedia saat ini</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;