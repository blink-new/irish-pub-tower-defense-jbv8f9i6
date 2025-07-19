import React, { useState, useEffect } from 'react';
import { blink } from '../blink/client';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    isLoading: boolean;
    isAuthenticated: boolean;
    user: any;
  }>({
    isLoading: true,
    isAuthenticated: false,
    user: null
  });

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setAuthState({
        isLoading: false,
        isAuthenticated: true, // Allow access without auth for now
        user: { id: 'demo-user', email: 'demo@example.com' }
      });
    }, 1000);

    try {
      const unsubscribe = blink.auth.onAuthStateChanged((state) => {
        clearTimeout(timeout);
        setAuthState({
          isLoading: state.isLoading,
          isAuthenticated: state.isAuthenticated,
          user: state.user
        });
      });

      return () => {
        clearTimeout(timeout);
        unsubscribe();
      };
    } catch (error) {
      console.error('Auth error:', error);
      clearTimeout(timeout);
      // Fallback to demo mode
      setAuthState({
        isLoading: false,
        isAuthenticated: true,
        user: { id: 'demo-user', email: 'demo@example.com' }
      });
    }
  }, []);

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-lg">Loading Irish Pub Tower Defense...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};