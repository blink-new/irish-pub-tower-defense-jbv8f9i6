import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { soundManager } from '../utils/soundManager';
import { saveGameScore } from '../utils/scoreManager';

interface VictoryModalProps {
  isVisible: boolean;
  score: number;
  onPlayAgain: () => void;
  worldId?: string;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isVisible,
  score,
  onPlayAgain,
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
          wave: 11, // Victory means completed all 10 waves
          worldId: worldId || 'forest-pub' // Use passed worldId or default
        });
        
        if (success) {
          setScoreSaved(true);
          // Calculate stars for display (same logic as in scoreManager)
          let calculatedStars = 3; // 3 stars for completing all waves
          if (score >= 50000) calculatedStars = 3; // Max stars
          setStars(calculatedStars);
        }
      };
      
      saveScore();
    }
  }, [isVisible, score, scoreSaved, worldId]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-primary/95 border-4 border-accent max-w-md w-full mx-auto shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* Paddy Losty Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="/paddy-losty.jpg" 
                alt="Victory - Paddy Losty celebrating" 
                className="w-24 h-24 rounded-full border-4 border-accent shadow-lg object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error('Failed to load Paddy Losty image');
                }}
              />
              {/* Golden glow effect */}
              <div className="absolute inset-0 rounded-full border-4 border-accent animate-pulse shadow-lg shadow-accent/50"></div>
            </div>
          </div>

          {/* Victory Title */}
          <h1 className="text-4xl font-celtic text-accent mb-4 animate-bounce">
            Victory! 🍺
          </h1>

          {/* Victory Message */}
          <p className="text-xl text-primary-foreground mb-2 font-bold">
            "Well done, lad! The pub is safe!"
          </p>

          {/* Score Display */}
          <div className="mb-6 space-y-2">
            <p className="text-primary-foreground text-lg">
              Paddy Losty is proud! Final Score: <span className="text-accent font-bold">{score.toLocaleString()}</span>
            </p>
            
            {/* Stars Display */}
            {stars > 0 && (
              <div className="flex justify-center items-center gap-1">
                {Array.from({ length: stars }, (_, i) => (
                  <span key={i} className="text-2xl animate-pulse">⭐</span>
                ))}
                <span className="text-primary-foreground ml-2">
                  {stars === 3 ? 'Perfect Victory!' : stars === 2 ? 'Great Job!' : 'Well Done!'}
                </span>
              </div>
            )}
            
            {scoreSaved && (
              <p className="text-sm text-primary-foreground/80">
                ✅ Score saved to leaderboard!
              </p>
            )}
          </div>

          {/* Play Again Button */}
          <Button 
            onClick={() => {
              soundManager.playSound('button_click');
              onPlayAgain();
            }}
            className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold text-lg px-8 py-3 shadow-lg"
            size="lg"
          >
            Play Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};