// =========================================
// FILE: src/hooks/useAuth.js
// =========================================

import { useState, useEffect, useContext, createContext } from 'react';
import { authController } from '../controllers/authController';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authController.isAuthenticated()) {
          const userData = await authController.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authController.login(email, password);
      const userData = await authController.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      return await authController.register(name, email, phone, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authController.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
