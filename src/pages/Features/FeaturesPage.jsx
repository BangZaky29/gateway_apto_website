// =========================================
// FILE: src/pages/Features/FeaturesPage.jsx
// =========================================

import { useFetch } from '../../hooks/useFetch';
import FeatureCard from '../../components/cards/FeatureCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import '../../styles/Style_forWebsite/Home.css';

const FeaturesPage = () => {
  const { data: features, loading, error } = useFetch('/feature');

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container-max">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="mb-4">Semua Fitur Kami</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Jelajahi semua tools dan features yang tersedia untuk membantu meningkatkan produktivitas Anda
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Gagal memuat fitur. Silakan coba lagi.</p>
          </div>
        ) : features && features.length > 0 ? (
          <div className="features-grid">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                id={feature.id}
                name={feature.name}
                code={feature.code}
                icon={feature.icon || '🚀'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted">
            <p>Tidak ada fitur yang tersedia saat ini</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesPage;
