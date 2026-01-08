// =========================================
// FILE: src/hooks/useAuth.jsx - COMPLETE FIX
// PRODUCTION READY VERSION
// =========================================

import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
  useRef
} from 'react';
import { authController } from '../controllers/authController';
import { userController } from '../controllers/userController';

// 🔐 Create Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ===== STATE =====
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 🔧 Ref untuk tracking jika auth check sudah jalan
  const authCheckRef = useRef(false);

  const isAuthenticated = !!user;

  // ===================================
  // 1️⃣ CHECK AUTH ON INITIAL LOAD
  // ===================================
  const checkAuth = useCallback(async () => {
    // ✅ Prevent double calls
    if (authCheckRef.current) {
      console.log('[useAuth] Auth check already in progress, skipping...');
      return;
    }

    authCheckRef.current = true;

    try {
      console.log('[useAuth] Checking authentication...');
      setLoading(true);
      setError(null);

      // 🔑 Cek apakah token ada di localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('[useAuth] No token found in localStorage');
        setUser(null);
        setLoading(false);
        authCheckRef.current = false;
        return;
      }

      console.log('[useAuth] Token found, fetching user profile...');

      // 👤 Fetch user data dari backend
      const userData = await userController.getProfile();

      if (!userData || !userData.id) {
        throw new Error('Invalid user data received');
      }

      console.log('[useAuth] User profile loaded:', {
        id: userData.id,
        name: userData.name,
        email: userData.email
      });

      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('[useAuth] checkAuth failed:', {
        message: err.message,
        status: err.response?.status
      });

      // ❌ Jika error 401/403 → hapus token dan logout
      if (err.response?.status === 401 || err.response?.status === 403) {
        console.log('[useAuth] Token invalid or expired, clearing...');
        localStorage.removeItem('token');
        setUser(null);
      }

      setError(err.message || 'Failed to check authentication');
      setUser(null);
    } finally {
      setLoading(false);
      authCheckRef.current = false;
    }
  }, []);

  // ===================================
  // EFFECT: RUN CHECKAUTH ONCE ON MOUNT
  // ===================================
  useEffect(() => {
    // ✅ Hanya run sekali saat app mount
    checkAuth();
  }, []); // Empty dependency = run once

  // ===================================
  // 2️⃣ LOGIN FUNCTION
  // ===================================
  const login = useCallback(async (phone, password) => {
    try {
      console.log('[useAuth] Starting login process...');
      setLoading(true);
      setError(null);

      // ✅ Validasi input
      if (!phone || !password) {
        throw new Error('Phone and password are required');
      }

      // 🔐 Call backend login
      console.log('[useAuth] Sending login request...');
      const loginResponse = await authController.login(phone, password);

      if (!loginResponse.success) {
        throw new Error(loginResponse.message || 'Login failed');
      }

      if (!loginResponse.token) {
        throw new Error('No token received from server');
      }

      // 💾 PENTING: Save token SEBELUM fetch user
      console.log('[useAuth] Saving token to localStorage...');
      localStorage.setItem('token', loginResponse.token);

      // ✅ PENTING: Tunggu sejenak agar token ter-set di localStorage
      // Ini memberikan waktu untuk axios interceptor membaca token
      await new Promise(resolve => setTimeout(resolve, 100));

      // 👤 Fetch user profile dengan token yang sudah tersimpan
      console.log('[useAuth] Fetching user profile with token...');
      const userData = await userController.getProfile();

      if (!userData || !userData.id) {
        throw new Error('Failed to fetch user profile');
      }

      console.log('[useAuth] Login successful:', {
        id: userData.id,
        name: userData.name,
        email: userData.email
      });

      // ✅ Set user state
      setUser(userData);
      setError(null);

      return {
        success: true,
        user: userData,
        message: 'Login successful'
      };
    } catch (err) {
      console.error('[useAuth] Login error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });

      // ❌ Error handling
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      setUser(null);
      localStorage.removeItem('token');

      throw err; // Re-throw untuk component bisa catch
    } finally {
      setLoading(false);
    }
  }, []);

  // ===================================
  // 3️⃣ REGISTER FUNCTION
  // ===================================
  const register = useCallback(async (name, email, phone, password) => {
    try {
      console.log('[useAuth] Starting registration...');
      setLoading(true);
      setError(null);

      // ✅ Validasi input
      if (!name || !email || !phone || !password) {
        throw new Error('All fields are required');
      }

      // 📝 Call backend register
      const registerResponse = await authController.register(name, email, phone, password);

      console.log('[useAuth] Registration successful');
      setError(null);

      return {
        success: true,
        message: registerResponse.message || 'Registration successful'
      };
    } catch (err) {
      console.error('[useAuth] Register error:', err.message);

      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ===================================
  // 4️⃣ LOGOUT FUNCTION
  // ===================================
  const logout = useCallback(() => {
    try {
      console.log('[useAuth] Logging out...');

      // 🗑️ Clear token
      localStorage.removeItem('token');

      // 👤 Clear user
      setUser(null);
      setError(null);

      // ✅ Reset auth check ref
      authCheckRef.current = false;

      console.log('[useAuth] Logout successful');
    } catch (err) {
      console.error('[useAuth] Logout error:', err.message);
      setError(err.message);
    }
  }, []);

  // ===================================
  // RETURN CONTEXT VALUE
  // ===================================
  const value = {
    // State
    user,
    loading,
    error,
    isAuthenticated,

    // Methods
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ===================================
// HOOK: USE AUTH
// ===================================
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export default useAuth;