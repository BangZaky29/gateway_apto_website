// =========================================
// FILE: src/components/sections/Packages.jsx
// =========================================

import { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import PackageCard from '../cards/PackageCard';
import LoadingSpinner from '../common/LoadingSpinner';

const Packages = () => {
  const { data: packages, loading, error } = useFetch('/packages');

  return (
    <section id="pricing" className="packages-section">
      <div className="container-max">
        <div className="text-center mb-16 animate-fade-in">
          <h2>Paket Berlangganan</h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan Anda. Semua paket bisa diupgrade atau downgrade kapan saja.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Gagal memuat paket. Silakan coba lagi.</p>
          </div>
        ) : packages && packages.length > 0 ? (
          <div className="packages-grid">
            {packages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                id={pkg.id}
                name={pkg.name}
                price={pkg.price}
                duration_days={pkg.duration_days}
                description={pkg.description}
                features={typeof pkg.features === 'string' ? JSON.parse(pkg.features || '[]') : pkg.features}
                isPopular={index === 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted">
            <p>Tidak ada paket yang tersedia saat ini</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Packages;