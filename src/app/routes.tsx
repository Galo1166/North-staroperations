import { createBrowserRouter, Navigate } from 'react-router';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Operations from './pages/Operations';
import Admin from './pages/Admin';
import { isAuthenticated, canAccessAdmin } from './lib/auth';

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Admin route wrapper
function AdminRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  if (!canAccessAdmin()) {
    return <Navigate to="/dashboard/main" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/about',
    element: <About />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/services',
    element: <Services />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/blog',
    element: <Blog />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/contact',
    element: <Contact />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/main" replace />,
      },
      {
        path: 'main',
        element: <Dashboard />,
      },
      {
        path: 'inventory',
        element: <Inventory />,
      },
      {
        path: 'operations',
        element: <Operations />,
      },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/dashboard/main" replace />,
      },
    ],
  },
]);
