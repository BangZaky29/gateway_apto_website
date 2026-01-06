// =========================================
// FILE: src/components/common/Header.jsx - UPDATED
// =========================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';
import logo from '../../assets/images/NS_blank_02.png';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="header-modern">
        <nav className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img src={logo} alt="Nuansa Solution" />
          </Link>

          {/* Desktop Navigation */}
          <div className="header-nav-desktop">
            <Link to="/" className="header-nav-link">
              Home
            </Link>
            <a href="#features" className="header-nav-link">
              Features
            </a>
            <a href="#pricing" className="header-nav-link">
              Pricing
            </a>
            <a href="#faq" className="header-nav-link">
              FAQ
            </a>
          </div>

          {/* Desktop Auth */}
          <div className="header-auth-desktop">
            {isAuthenticated ? (
              <div className="header-user-menu">
                <Link to="/profile" className="header-user-link">
                  <div className="header-user-avatar">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="header-user-name">{user?.name || 'User'}</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="header-auth-buttons">
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="header-hamburger"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};

export default Header;