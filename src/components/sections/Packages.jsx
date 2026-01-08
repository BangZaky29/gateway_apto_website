// =========================================
// FILE: src/components/sections/Packages.jsx
// =========================================

import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import PackageCard from '../cards/PackageCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';

const DURATION_TABS = [
  { label: '1 Bulan', days: 30 },
  { label: '3 Bulan', days: 90, badge: '20% OFF' },
  { label: '6 Bulan', days: 180, badge: '30% OFF' },
  { label: '1 Tahun', days: 365, badge: '40% OFF' },
];

const formatPrice = (price) => {
  if (!price) return '0';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
};

const Packages = () => {
  const { data: apiData, loading, error } = useFetch('/packages');
  const packages = apiData?.data || [];

  const [activeDuration, setActiveDuration] = useState(365);
  const { isAuthenticated } = useAuth();

  const filteredPackages = Array.isArray(packages)
    ? packages.filter(pkg => pkg.duration_days === activeDuration && pkg.is_active === 1)
    : [];

  return (
    <section id="pricing" className="packages-section py-24">
      <div className="container-max">
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Pilih Paket Layanan Anda</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Dapatkan akses ke berbagai dokumen legal dan layanan konsultasi sesuai kebutuhan Anda
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {DURATION_TABS.map(tab => {
            const isActive = activeDuration === tab.days;
            return (
              <button
                key={tab.days}
                onClick={() => setActiveDuration(tab.days)}
                className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all
                  ${isActive
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}
                `}
              >
                {tab.label}
                {tab.badge && (
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-bold
                      ${isActive ? 'bg-white/20 text-white' : 'bg-green-100 text-green-600'}`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : filteredPackages.length > 0 ? (
          <div className="packages-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                id={pkg.id}
                name={pkg.name}
                price={formatPrice(pkg.price)}
                duration_days={pkg.duration_days}
                description={pkg.description}
                isPopular={index === 1}
                loginRequired={!isAuthenticated} // <-- new prop
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Paket tidak tersedia untuk durasi ini</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Packages;
