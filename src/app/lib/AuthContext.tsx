import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';
import type { User, UserRole } from './types';

// ─── Types ──────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
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

  // Build user from Supabase auth session + profiles table (if available)
  const buildUser = useCallback(async (authUser: { id: string; email?: string; user_metadata?: Record<string, string> }): Promise<User> => {
    // Try profiles table first
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (!error && data) {
        return data as User;
      }
    } catch {
      // profiles table likely doesn't exist — that's fine
    }

    // Fallback: build user from Supabase auth metadata
    const email = authUser.email ?? '';
    const meta = authUser.user_metadata ?? {};
    return {
      id: authUser.id,
      organization_id: '',
      role: (meta.role as UserRole) || 'admin',
      email,
      name: meta.name || email.split('@')[0],
      created_at: new Date().toISOString(),
    };
  }, []);

  // Initialize: check existing session
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await buildUser(session.user);
        setUser(profile);
      }
      setLoading(false);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const profile = await buildUser(session.user);
          setUser(profile);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [buildUser]);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Build and set user immediately so navigation works
    if (data.user) {
      const profile = await buildUser(data.user);
      setUser(profile);
    }
  }, [buildUser]);

  // Signup — stores name/role in auth metadata (profiles table is optional)
  const signup = useCallback(async (email: string, password: string, name: string, role: UserRole = 'viewer') => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
      },
    });
    if (error) throw error;

    // Optionally insert into profiles table (won't break if table doesn't exist)
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.from('profiles').insert({
          id: session.user.id,
          email,
          name,
          role,
          organization_id: null,
        });
      }
    } catch {
      // profiles table not set up yet — that's okay
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  }, []);

  // Role helpers
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
