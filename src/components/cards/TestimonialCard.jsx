// =========================================
// FILE: src/components/cards/TestimonialCard.jsx
// =========================================

const TestimonialCard = ({ name, role, content, avatar }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition border border-gray-200">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={avatar || 'https://via.placeholder.com/50'} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-dark">{name}</h4>
          <p className="text-xs text-muted">{role}</p>
        </div>
      </div>

      <p className="text-muted text-sm italic">"{content}"</p>

      <div className="flex gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;