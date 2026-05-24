import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  getCurrentUser,
  login as loginUser,
  logout as logoutUser,
  signup as signupUser,
  updateCurrentUser,
  updatePassword as changePassword,
  resetPassword as sendResetPassword,
} from './auth';
import type { User, UserRole } from './types';

// ─── Types ──────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (displayName: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  canAccessAdmin: boolean;
}

// ─── Context ────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ───────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);

    return () => {
      setLoading(false);
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const authenticatedUser = loginUser(email, password);
    if (!authenticatedUser) {
      throw new Error('Invalid email or password.');
    }

    setUser(authenticatedUser);
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string, role: UserRole = 'viewer') => {
    const createdUser = signupUser(email, password, name, role);
    setUser(createdUser);
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    logoutUser();
    setUser(null);
    setLoading(false);
  }, []);

  const updateProfile = useCallback(async (displayName: string) => {
    const updatedUser = updateCurrentUser({ name: displayName });
    if (updatedUser) {
      setUser(updatedUser);
    }
  }, []);

  const updatePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const changed = changePassword(currentPassword, newPassword);
    if (!changed) {
      throw new Error('Current password is incorrect.');
    }
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    const sent = sendResetPassword(email);
    if (!sent) {
      throw new Error('No account found with this email address.');
    }
  }, []);

  const hasRole = useCallback(
    (roles: UserRole | UserRole[]): boolean => {
      if (!user) return false;
      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(user.role);
    },
    [user]
  );

  const canAccessAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        updatePassword,
        sendPasswordReset,
        isAuthenticated: !!user,
        hasRole,
        canAccessAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return context;
}
