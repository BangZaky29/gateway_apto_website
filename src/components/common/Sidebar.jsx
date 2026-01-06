// =========================================
// FILE: src/components/common/Sidebar.jsx
// Modern Mobile Sidebar Component
// =========================================

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  const handleNavClick = (path) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Features', path: '/#features', icon: '✨' },
    { label: 'Pricing', path: '/#pricing', icon: '💰' },
    { label: 'FAQ', path: '/#faq', icon: '❓' },
  ];

  const infoItems = [
    { label: 'About', path: '/about', icon: 'ℹ️' },
    { label: 'Blog', path: '/blog', icon: '📝' },
    { label: 'Contact', path: '/contact', icon: '📧' },
  ];

  const legalItems = [
    { label: 'Privacy', path: '/privacy', icon: '🔒' },
    { label: 'Terms', path: '/terms', icon: '📜' },
    { label: 'Security', path: '/security', icon: '🛡️' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`sidebar-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          {/* User Section */}
          {isAuthenticated ? (
            <div className="sidebar-user">
              <div className="sidebar-user-avatar">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="sidebar-user-info">
                <p className="sidebar-user-name">{user?.name || 'User'}</p>
                <p className="sidebar-user-email">{user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="sidebar-auth">
              <button 
                className="btn btn-primary sidebar-auth-btn"
                onClick={() => handleNavClick('/login')}
              >
                Login
              </button>
              <button 
                className="btn btn-outline sidebar-auth-btn"
                onClick={() => handleNavClick('/register')}
              >
                Register
              </button>
            </div>
          )}

          {/* Main Menu */}
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Main Menu</h4>
            <nav className="sidebar-nav">
              {menuItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="sidebar-nav-item"
                  onClick={(e) => {
                    if (!item.path.includes('#')) {
                      e.preventDefault();
                      handleNavClick(item.path);
                    } else {
                      onClose();
                    }
                  }}
                >
                  <span className="sidebar-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Info Menu */}
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Information</h4>
            <nav className="sidebar-nav">
              {infoItems.map((item) => (
                <button
                  key={item.path}
                  className="sidebar-nav-item"
                  onClick={() => handleNavClick(item.path)}
                >
                  <span className="sidebar-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Legal Menu */}
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Legal</h4>
            <nav className="sidebar-nav">
              {legalItems.map((item) => (
                <button
                  key={item.path}
                  className="sidebar-nav-item"
                  onClick={() => handleNavClick(item.path)}
                >
                  <span className="sidebar-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* User Actions */}
          {isAuthenticated && (
            <div className="sidebar-section">
              <button
                className="sidebar-nav-item"
                onClick={() => handleNavClick('/profile')}
              >
                <span className="sidebar-nav-icon">👤</span>
                <span>Profile</span>
              </button>
              <button
                className="sidebar-nav-item sidebar-logout"
                onClick={handleLogout}
              >
                <span className="sidebar-nav-icon">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <p>© 2025 Gateway NUANSA</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;