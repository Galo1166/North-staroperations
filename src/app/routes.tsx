import { createBrowserRouter, Navigate } from 'react-router';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Operations from './pages/Operations';
import Admin from './pages/Admin';
import { useAuth } from './lib/AuthContext';

// Branded loading splash
function LoadingSplash() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="size-14 rounded-xl bg-blue-600 flex items-center justify-center mb-4 animate-pulse">
        <svg className="size-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Welcome to North Star Operations</h1>
      <p className="text-sm text-muted-foreground">Loading your dashboard…</p>
    </div>
  );
}

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSplash />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Admin route wrapper
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, canAccessAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingSplash />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!canAccessAdmin) {
    return <Navigate to="/dashboard/main" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    element: <ScrollToTop />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
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
    ],
  },
]);
