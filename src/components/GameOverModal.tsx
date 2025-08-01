import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RotateCcw, Home } from 'lucide-react';
import { saveGameScore } from '../utils/scoreManager';

interface GameOverModalProps {
  isVisible: boolean;
  score: number;
  wave: number;
  onRetry: () => void;
  onQuit: () => void;
  worldId?: string;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isVisible,
  score,
  wave,
  onRetry,
  onQuit,
  worldId
}) => {
  const [scoreSaved, setScoreSaved] = useState(false);
  const [stars, setStars] = useState(0);

  // Save score when modal becomes visible
  useEffect(() => {
    if (isVisible && !scoreSaved) {
      const saveScore = async () => {
        const success = await saveGameScore({
          score,
          wave,
          worldId: worldId || 'forest-pub' // Use passed worldId or default
        });
        
        if (success) {
          setScoreSaved(true);
          // Score now represents stars earned from killing enemies
          setStars(score);
        }
      };
      
      saveScore();
    }
  }, [isVisible, score, wave, scoreSaved, worldId]);

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
            
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20 space-y-2">
              <p className="text-sm text-muted-foreground mb-1">Final Score</p>
              <p className="text-2xl font-bold text-accent">{score.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Reached Wave {wave}</p>
              
              {/* Stars Display */}
              {stars > 0 && (
                <div className="flex justify-center items-center gap-1">
                  {Array.from({ length: stars }, (_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {stars === 3 ? 'Legendary!' : stars === 2 ? 'Great!' : 'Good effort!'}
                  </span>
                </div>
              )}
              
              {scoreSaved && (
                <p className="text-xs text-muted-foreground">
                  ✅ Score saved to leaderboard
                </p>
              )}
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