import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RotateCcw, Home } from 'lucide-react';

interface GameOverModalProps {
  isVisible: boolean;
  score: number;
  onRetry: () => void;
  onQuit: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isVisible,
  score,
  onRetry,
  onQuit
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <Card className="w-96 bg-card border-2 border-destructive shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <img 
              src="/paddy-losty.jpg" 
              alt="Paddy Losty disappointed" 
              className="w-20 h-20 rounded-full border-4 border-destructive shadow-lg object-cover grayscale"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                console.error('Failed to load Paddy Losty image');
              }}
            />
          </div>
          <CardTitle className="text-3xl font-celtic text-destructive mb-2">
            The Pub Has Fallen!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              The invaders pushed through the defenses and wrecked Paddy's pub. 
              All that's left are broken stools and spilled pints.
            </p>
            
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Final Score</p>
              <p className="text-2xl font-bold text-accent">⭐ {score.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onRetry}
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retry
            </Button>
            
            <Button
              onClick={onQuit}
              variant="outline"
              className="w-full border-muted text-muted-foreground hover:bg-muted font-bold py-3"
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Quit
            </Button>
          </div>


        </CardContent>
      </Card>
    </div>
  );
};