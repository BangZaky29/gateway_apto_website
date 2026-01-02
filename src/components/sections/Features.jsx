// =========================================
// FILE: src/components/sections/Features.jsx
// =========================================

import { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import FeatureCard from '../cards/FeatureCard';
import LoadingSpinner from '../common/LoadingSpinner';

const Features = () => {
  const { data: features, loading, error } = useFetch('/feature');

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16 animate-fade-in">
          <h2>Fitur-Fitur Unggulan</h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">
            Dapatkan akses ke berbagai tools dan features yang dirancang untuk meningkatkan produktivitas Anda
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
    </section>
  );
};

export default Features;