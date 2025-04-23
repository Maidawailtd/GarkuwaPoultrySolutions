import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/lib/store';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

// This component redirects authenticated users away from routes like login/register
const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard if already authenticated
      setLocation('/dashboard');
    }
  }, [isAuthenticated, setLocation]);

  // Show nothing while redirecting
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;