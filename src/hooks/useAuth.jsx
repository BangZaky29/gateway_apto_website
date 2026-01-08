// =========================================
// FILE: src/hooks/useAuth.jsx
// =========================================

import { useState, useEffect, useContext, createContext } from 'react';
import { authController } from '../controllers/authController';
import { userController } from '../controllers/userController';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // ======================
  // LOGIN + Fetch User
  // ======================
  const login = async (phone, password) => {
    setLoading(true);
    try {
      const res = await authController.login(phone, password);

      if (!res.success || !res.token) {
        throw new Error(res.message || 'Login gagal');
      }

      // Fetch user profile setelah token tersimpan
      const userData = await userController.getProfile();
      setUser(userData);

      return { success: true, user: userData };
    } catch (err) {
      console.error('[useAuth] login failed:', err);
      authController.logout();
      setUser(null);
      return { success: false, message: err.message || 'Login gagal' };
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // CHECK AUTH ON LOAD
  // ======================
  const checkAuth = async () => {
    try {
      if (!authController.isAuthenticated()) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userData = await userController.getProfile();
      setUser(userData);
    } catch (err) {
      console.error('[useAuth] checkAuth failed:', err);
      authController.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ======================
  // REGISTER
  // ======================
  const register = async (name, email, phone, password) => {
    return authController.register(name, email, phone, password);
  };

  // ======================
  // LOGOUT
  // ======================
  const logout = () => {
    authController.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
