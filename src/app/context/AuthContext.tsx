import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';
import { tokenStore } from '../lib/token.store';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: string;
  emailVerified: boolean;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // true until session check completes

  // ── Rehydrate session on mount ──────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        // Try silent refresh first (uses httpOnly cookie)
        const { accessToken } = await authService.refresh();
        tokenStore.set(accessToken);
        // Fetch real user profile
        const me = await authService.getMe();
        setUser(me);
        window.dispatchEvent(new CustomEvent('auth:login'));
      } catch {
        // No valid session — that's fine, stay logged out
        tokenStore.clear();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // ── Listen for forced logout events from axios interceptor ──
  const handleForcedLogout = useCallback(() => {
    setUser(null);
    tokenStore.clear();
  }, []);

  useEffect(() => {
    window.addEventListener('auth:logout', handleForcedLogout);
    return () => window.removeEventListener('auth:logout', handleForcedLogout);
  }, [handleForcedLogout]);

  // ── Auth actions ────────────────────────────────────────────

  const login = async (email: string, password: string) => {
    const { accessToken, user: me } = await authService.login({ email, password });
    tokenStore.set(accessToken);
    setUser(me);
    window.dispatchEvent(new CustomEvent('auth:login'));
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone?: string,
  ) => {
    const { accessToken, user: me } = await authService.signup({
      email,
      password,
      firstName,
      lastName,
      phone,
    });
    tokenStore.set(accessToken);
    setUser(me);
    window.dispatchEvent(new CustomEvent('auth:login'));
  };

  const logout = async () => {
    try {
      await authService.logout(); // revoke session server-side
    } catch {
      // ignore — clear locally regardless
    }
    tokenStore.clear();
    setUser(null);
    localStorage.removeItem('lhl_cart'); // clear guest cart too
  };

  const resetPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  if (isLoading) {
    // Render nothing while we check the session — prevents flash of unauthenticated UI
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
