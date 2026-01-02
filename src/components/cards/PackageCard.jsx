// =========================================
// FILE: src/components/cards/PackageCard.jsx
// =========================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrency } from '../../utils/helpers';
import Button from '../common/Button';

const PackageCard = ({ 
  id, 
  name, 
  price, 
  duration_days, 
  description,
  features = [],
  isPopular = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSelectPackage = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    navigate(`/payment?packageId=${id}`);
  };

  return (
    <div className={`
      bg-white rounded-lg overflow-hidden animate-slide-up transition
      ${isPopular ? 'border-2 border-blue-500 shadow-xl transform scale-105' : 'border border-gray-200 hover:shadow-lg'}
    `}>
      {isPopular && (
        <div className="bg-gradient-primary text-white text-center py-2 font-semibold text-sm">
          ⭐ PALING POPULER
        </div>
      )}

      <div className="p-8">
        <h3 className="text-2xl font-bold text-dark mb-2">{name}</h3>
        
        <p className="text-muted text-sm mb-6">{description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold gradient-primary">{formatCurrency(price)}</span>
            <span className="text-muted text-sm">/ {duration_days} hari</span>
          </div>
        </div>

        <Button
          variant={isPopular ? 'primary' : 'outline'}
          size="lg"
          className="w-full mb-8"
          onClick={handleSelectPackage}
          loading={isLoading}
        >
          Pilih Paket
        </Button>

        <div className="space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase">Termasuk:</p>
          {features && features.length > 0 ? (
            features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-green-500 text-xl mt-1">✓</span>
                <span className="text-muted text-sm">{feature}</span>
              </div>
            ))
          ) : (
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl mt-1">✓</span>
              <span className="text-muted text-sm">Akses penuh ke semua tools</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
