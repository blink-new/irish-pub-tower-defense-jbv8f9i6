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
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuthState({
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
        user: state.user
      });
    });

    return unsubscribe;
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

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <img 
            src="/paddy-losty.jpg" 
            alt="Paddy Losty" 
            className="w-24 h-24 rounded-full border-4 border-accent shadow-lg object-cover mx-auto mb-6"
          />
          <h1 className="text-3xl font-celtic text-accent mb-4">
            Welcome to the Pub! 🍺
          </h1>
          <p className="text-muted-foreground mb-6">
            Sign in to unlock AI-powered character voices and save your progress in defending Paddy Losty's pub!
          </p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Sign In to Play
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            Don't worry, it's quick and free! You'll get the full Irish experience with character voices.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};