// =========================================
// FILE: src/pages/NotFound.jsx
// =========================================

import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-dark mb-4">404</h1>
        <h2 className="text-3xl font-bold text-dark mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-muted text-lg mb-8 max-w-md">
          Halaman yang Anda cari tidak ada. Silakan kembali ke halaman utama.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Kembali ke Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;