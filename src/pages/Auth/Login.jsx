// =========================================
// FILE: src/pages/Auth/Login.jsx
// =========================================

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from '../../components/forms/LoginForm';
import '../../styles/Style_forWebsite/Auth.css';

const Login = () => {
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
          <h2>Masuk ke Akun Anda</h2>
          <p className="text-muted">Silakan login untuk melanjutkan</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;