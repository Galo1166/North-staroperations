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

  // Build a quick user object from Firebase auth (no network calls)
  const buildUserFast = useCallback((firebaseUser: FirebaseUser): User => {
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

  // Optionally enrich user from Firestore profile (runs in background after initial load)
  const enrichFromFirestore = useCallback(async (firebaseUser: FirebaseUser) => {
    try {
      const profileRef = doc(db, 'profiles', firebaseUser.uid);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        setUser(profileSnap.data() as User);
      }
    } catch {
      // profiles collection not available — keep the fast-built user
    }
  }, []);

  // Initialize: listen for auth state changes — resolve loading ASAP
  useEffect(() => {
    // Safety timeout: never show loading for more than 1.5s
    const timeout = setTimeout(() => setLoading(false), 1500);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Set user instantly from auth data (no async)
        setUser(buildUserFast(firebaseUser));
        setLoading(false);
        // Enrich in background (non-blocking)
        enrichFromFirestore(firebaseUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [buildUserFast, enrichFromFirestore]);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);

    // Set user instantly so navigation works, enrich in background
    setUser(buildUserFast(firebaseUser));
    enrichFromFirestore(firebaseUser);
  }, [buildUserFast, enrichFromFirestore]);

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
    // Set loading so ProtectedRoute shows splash instead of redirecting to /login
    setLoading(true);
    setUser(null);
    await signOut(auth);
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
