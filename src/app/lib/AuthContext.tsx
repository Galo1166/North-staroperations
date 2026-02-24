import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
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

  // Build app User from Firebase auth user + Firestore profile (if available)
  const buildUser = useCallback(async (firebaseUser: FirebaseUser): Promise<User> => {
    // Try Firestore profiles collection first
    try {
      const profileRef = doc(db, 'profiles', firebaseUser.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        return profileSnap.data() as User;
      }
    } catch {
      // profiles collection likely doesn't exist — that's fine
    }

    // Fallback: build user from Firebase auth data
    const email = firebaseUser.email ?? '';
    return {
      id: firebaseUser.uid,
      organization_id: '',
      role: 'admin' as UserRole,
      email,
      name: firebaseUser.displayName || email.split('@')[0],
      created_at: new Date().toISOString(),
    };
  }, []);

  // Initialize: listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await buildUser(firebaseUser);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [buildUser]);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);

    // Build and set user immediately so navigation works
    const profile = await buildUser(firebaseUser);
    setUser(profile);
  }, [buildUser]);

  // Signup — stores name/role in Firestore profiles collection
  const signup = useCallback(async (email: string, password: string, name: string, role: UserRole = 'viewer') => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);

    // Set display name on Firebase auth profile
    await updateProfile(firebaseUser, { displayName: name });

    // Optionally save to Firestore profiles collection (won't break if permissions aren't set)
    try {
      await setDoc(doc(db, 'profiles', firebaseUser.uid), {
        id: firebaseUser.uid,
        email,
        name,
        role,
        organization_id: null,
        created_at: new Date().toISOString(),
      });
    } catch {
      // Firestore profiles collection not set up yet — that's okay
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    await signOut(auth);
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
