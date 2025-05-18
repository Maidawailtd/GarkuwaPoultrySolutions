import { useEffect, useState } from 'react';
import { useLocation, useRouter } from 'wouter';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Alert,
  AlertDescription,
  AlertTitle 
} from '@/components/ui/alert';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorHandler({ children }: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null);
  const [, navigate] = useLocation();
  
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error);
      setError(event.error);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      if (event.reason instanceof Error) {
        setError(event.reason);
      } else {
        setError(new Error(String(event.reason)));
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  const handleResetError = () => {
    setError(null);
    setErrorInfo(null);
  };

  const handleGoHome = () => {
    handleResetError();
    navigate('/');
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again or contact support.
            </AlertDescription>
          </Alert>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error Details</h2>
            <div className="bg-gray-100 p-4 rounded mb-4 overflow-auto max-h-48">
              <p className="font-mono text-sm">{error.toString()}</p>
              {errorInfo && (
                <div className="mt-2">
                  <p className="font-mono text-sm">{errorInfo.componentStack}</p>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleResetError}>
                Dismiss
              </Button>
              <Button onClick={handleGoHome}>
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}