import { User, UserRole } from './types';

// Mock current user - in real app this would come from API/context
let currentUser: User | null = null;

export const mockUsers = {
  admin: {
    id: '1',
    organization_id: '1',
    role: 'admin' as UserRole,
    email: 'admin@north-staroperations.com',
    name: 'John Manager',
    created_at: '2024-01-01T00:00:00Z',
  },
  analyst: {
    id: '2',
    organization_id: '1',
    role: 'analyst' as UserRole,
    email: 'analyst@north-staroperations.com',
    name: 'Sarah Analyst',
    created_at: '2024-02-01T00:00:00Z',
  },
  viewer: {
    id: '3',
    organization_id: '1',
    role: 'viewer' as UserRole,
    email: 'viewer@north-staroperations.com',
    name: 'Mike Viewer',
    created_at: '2024-02-10T00:00:00Z',
  },
};

export function login(email: string, password: string): User | null {
  // Mock login - in real app this would call API
  const user = Object.values(mockUsers).find(u => u.email === email);
  if (user && password === 'password') {
    currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  return null;
}

export function logout(): void {
  currentUser = null;
  localStorage.removeItem('user');
}

export function getCurrentUser(): User | null {
  if (currentUser) return currentUser;
  
  const stored = localStorage.getItem('user');
  if (stored) {
    currentUser = JSON.parse(stored);
    return currentUser;
  }
  
  return null;
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
  return isAuthenticated(); // All authenticated users can view
}
