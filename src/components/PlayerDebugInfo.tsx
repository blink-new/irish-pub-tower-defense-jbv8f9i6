import React, { useState, useEffect } from 'react';
import { blink } from '../blink/client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const PlayerDebugInfo: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await blink.auth.me();
        setUser(currentUser);
        console.log('🎮 Current Player Info:', {
          id: currentUser?.id,
          email: currentUser?.email,
          displayName: currentUser?.displayName || 'Anonymous Player'
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get user info');
        console.error('❌ Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <Card className="fixed top-4 right-4 w-80 bg-card/90 backdrop-blur-sm z-50">
        <CardContent className="p-4">
          <p className="text-sm">Loading player info...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="fixed top-4 right-4 w-80 bg-destructive/90 backdrop-blur-sm z-50">
        <CardContent className="p-4">
          <p className="text-sm text-destructive-foreground">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed top-4 right-4 w-80 bg-primary/90 backdrop-blur-sm z-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-primary-foreground">🎮 Player Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div className="text-xs text-primary-foreground/90">
          <p><strong>Player ID:</strong> {user?.id || 'Unknown'}</p>
          <p><strong>Email:</strong> {user?.email || 'Unknown'}</p>
          <p><strong>Display Name:</strong> {user?.displayName || 'Anonymous Player'}</p>
          <p><strong>Auth Status:</strong> ✅ Authenticated</p>
          <p className="text-accent font-semibold mt-2">
            Ready for leaderboard! 🏆
          </p>
        </div>
      </CardContent>
    </Card>
  );
};