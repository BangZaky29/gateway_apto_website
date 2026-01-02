// =========================================
// FILE: src/components/cards/FeatureCard.jsx
// =========================================

import { Link } from 'react-router-dom';

const FeatureCard = ({ id, name, code, description, icon = '🚀' }) => {
  return (
    <div className="group bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-500 hover:shadow-lg transition animate-fade-in">
      <div className="text-4xl mb-4 group-hover:scale-110 transition">{icon}</div>
      
      <h3 className="text-xl font-bold text-dark mb-3">{name}</h3>
      
      <p className="text-muted text-sm mb-4">
        {description || 'Powerful feature untuk meningkatkan produktivitas Anda'}
      </p>

      <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-4">
        {code}
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <Link 
          to={`/features/${id}`}
          className="flex-1 text-center text-blue-600 font-semibold hover:text-blue-700 transition"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;