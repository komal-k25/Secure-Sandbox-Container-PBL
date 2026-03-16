import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface AuthState {
  token: string | null;
  userEmail: string | null;
  username: string | null;
}

interface UseAuthReturn {
  token: string | null;
  userEmail: string | null;
  username: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState<AuthState>(() => ({
    token: localStorage.getItem('token'),
    userEmail: localStorage.getItem('user_email'),
    username: localStorage.getItem('username'),
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Invalid email or password');
      }

      // Backend should return { token, username, email }
      const { token, username } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('user_email', email);
      if (username) localStorage.setItem('username', username);

      // Trigger update across tabs/components
      window.dispatchEvent(new Event('storage'));

      setAuthState({ token, userEmail: email, username });
      navigate('/profile');
    } catch (err: any) {
      console.error('[useAuth] Login error:', err.message);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const register = useCallback(async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Registration failed');
      }

      const { token } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('user_email', email);
      localStorage.setItem('username', username);

      window.dispatchEvent(new Event('storage'));

      setAuthState({ token, userEmail: email, username });
      navigate('/profile');
    } catch (err: any) {
      console.error('[useAuth] Registration error:', err.message);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('username');
    // Important: Clear local simulated VMs too so they don't leak between users
    localStorage.removeItem('ssem_simulated_vms');

    window.dispatchEvent(new Event('storage'));
    setAuthState({ token: null, userEmail: null, username: null });
    navigate('/');
  }, [navigate]);

  return {
    token: authState.token,
    userEmail: authState.userEmail,
    username: authState.username,
    isAuthenticated: !!authState.token,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };
}