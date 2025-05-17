import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/lib/store';
import { UserRole } from '@shared/schema';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: keyof typeof UserRole;
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      setLocation('/login');
      return;
    }

    if (requiredRole && user && user.role !== requiredRole) {
      // Redirect to dashboard if the user doesn't have the required role
      setLocation('/dashboard');
    }
  }, [isAuthenticated, user, requiredRole, setLocation]);

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  // Show nothing if user doesn't have the required role
  if (requiredRole && user && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;