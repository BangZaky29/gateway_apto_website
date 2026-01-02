// =========================================
// FILE: src/pages/Auth/Register.jsx
// =========================================

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import RegisterForm from '../../components/forms/RegisterForm';
import '../../styles/Style_forWebsite/Auth.css';

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Buat Akun Baru</h2>
          <p className="text-muted">Daftar untuk mendapatkan akses ke semua fitur</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;