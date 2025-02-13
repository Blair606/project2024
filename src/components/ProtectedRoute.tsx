import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'teacher' | 'student' | 'parent';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Allow access if user is an admin or if they have the required role
  if (user.isAdmin || user.role === requiredRole) {
    return <>{children}</>;
  }

  // Redirect to their appropriate dashboard
  return <Navigate to={`/dashboard/${user.role}`} replace />;
};

export default ProtectedRoute; 