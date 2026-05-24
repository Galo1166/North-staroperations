import type { User, UserRole } from './types';

const USER_STORAGE_KEY = 'north-star-operations-user';
const PASSWORD_STORAGE_KEY = 'north-star-operations-passwords';

const defaultPasswords: Record<string, string> = {
  'admin@north-staroperations.com': 'password',
  'analyst@north-staroperations.com': 'password',
  'viewer@north-staroperations.com': 'password',
};

export const mockUsers: Record<string, User> = {
  admin: {
    id: '1',
    organization_id: '1',
    role: 'admin',
    email: 'admin@north-staroperations.com',
    name: 'John Manager',
    created_at: '2024-01-01T00:00:00Z',
  },
  analyst: {
    id: '2',
    organization_id: '1',
    role: 'analyst',
    email: 'analyst@north-staroperations.com',
    name: 'Sarah Analyst',
    created_at: '2024-02-01T00:00:00Z',
  },
  viewer: {
    id: '3',
    organization_id: '1',
    role: 'viewer',
    email: 'viewer@north-staroperations.com',
    name: 'Mike Viewer',
    created_at: '2024-02-10T00:00:00Z',
  },
};

let currentUser: User | null = null;

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readPasswordStore(): Record<string, string> {
  if (!isBrowser()) return { ...defaultPasswords };

  try {
    const stored = window.localStorage.getItem(PASSWORD_STORAGE_KEY);
    return stored ? { ...defaultPasswords, ...JSON.parse(stored) } : { ...defaultPasswords };
  } catch {
    return { ...defaultPasswords };
  }
}

function writePasswordStore(store: Record<string, string>) {
  if (!isBrowser()) return;
  window.localStorage.setItem(PASSWORD_STORAGE_KEY, JSON.stringify(store));
}

function readStoredUser(): User | null {
  if (!isBrowser()) return currentUser;

  try {
    const stored = window.localStorage.getItem(USER_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user: User | null) {
  currentUser = user;
  if (!isBrowser()) return;

  if (user) {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(USER_STORAGE_KEY);
  }
}

function createUserId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `user-${Date.now()}`;
}

export function login(email: string, password: string): User | null {
  const user = Object.values(mockUsers).find((candidate) => candidate.email.toLowerCase() === email.toLowerCase()) ?? null;
  const passwordStore = readPasswordStore();

  if (user && passwordStore[user.email] === password) {
    writeStoredUser(user);
    return user;
  }

  return null;
}

export function signup(email: string, password: string, name: string, role: UserRole = 'viewer'): User {
  const user: User = {
    id: createUserId(),
    organization_id: '1',
    role,
    email,
    name,
    created_at: new Date().toISOString(),
  };

  const passwordStore = readPasswordStore();
  passwordStore[email] = password;
  writePasswordStore(passwordStore);
  writeStoredUser(user);

  return user;
}

export function logout(): void {
  writeStoredUser(null);
}

export function getCurrentUser(): User | null {
  if (currentUser) return currentUser;

  const storedUser = readStoredUser();
  currentUser = storedUser;
  return storedUser;
}

export function setCurrentUser(user: User | null): User | null {
  writeStoredUser(user);
  return user;
}

export function updateCurrentUser(updates: Partial<User>): User | null {
  const user = getCurrentUser();
  if (!user) return null;

  const nextUser = { ...user, ...updates };
  writeStoredUser(nextUser);
  return nextUser;
}

export function updatePassword(currentPassword: string, newPassword: string): boolean {
  const user = getCurrentUser();
  if (!user) return false;

  const passwordStore = readPasswordStore();
  if (passwordStore[user.email] !== currentPassword) {
    return false;
  }

  passwordStore[user.email] = newPassword;
  writePasswordStore(passwordStore);
  return true;
}

export function resetPassword(email: string): boolean {
  const passwordStore = readPasswordStore();
  return !!passwordStore[email];
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function hasRole(role: UserRole | UserRole[]): boolean {
  const user = getCurrentUser();
  if (!user) return false;

  const roles = Array.isArray(role) ? role : [role];
  return roles.includes(user.role);
}

export function canAccessAdmin(): boolean {
  return hasRole('admin');
}

export function canManageUsers(): boolean {
  return hasRole('admin');
}

export function canUploadData(): boolean {
  return hasRole('admin');
}

export function canEditInventory(): boolean {
  return hasRole(['admin', 'analyst']);
}

export function canViewReports(): boolean {
  return isAuthenticated();
}
