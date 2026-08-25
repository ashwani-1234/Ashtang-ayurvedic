import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  // We check local storage for a staff token. 
  // (Later, we will make this a highly secure JWT token from the backend)
  const isAuthenticated = localStorage.getItem('staffToken');

  if (!isAuthenticated) {
    // If no token is found, kick them out to the staff login page
    return <Navigate to="/staff-login" replace />;
  }

  return children;
}