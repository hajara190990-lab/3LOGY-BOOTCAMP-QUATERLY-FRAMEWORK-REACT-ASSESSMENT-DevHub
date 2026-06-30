import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user.id;

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = authService.getToken();
        if (token) {
          const profile = await authService.getProfile();
          setUser(profile);
        }
      } catch  {
        authService.logout();
        setUser({});
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await authService.login(email, password);
      setUser(data);
      return data;
    } catch (err) {
      const message = err?.error || err?.message || 'Login failed';
      setError(message);
      throw err;
    }
  };

  const register = async (userName, email, password) => {
    try {
      setError(null);
      const data = await authService.register(userName, email, password);
      return data;
    } catch (err) {
      const message = err?.error || err?.message || 'Registration failed';
      setError(message);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser({});
  };

  const value = { user, isLoading, error, isAuthenticated, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};