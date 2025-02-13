import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // Add your authentication logic here
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole !== 'admin') {
    return <Navigate to={`/${userRole}`} />;
  }

  return children;
};

export default ProtectedRoute; 