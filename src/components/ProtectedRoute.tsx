import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to signin page
  if (!isAuthenticated) {
    toast.error('Please sign in to access this page');
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If authenticated but wrong role, show error and redirect
  if (user && user.role !== requiredRole) {
    toast.error(`Access denied. You don't have permission to view this page.`);
    
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'student':
        return <Navigate to="/dashboard/student" replace />;
      case 'teacher':
        return <Navigate to="/dashboard/teacher" replace />;
      case 'parent':
        return <Navigate to="/dashboard/parent" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 