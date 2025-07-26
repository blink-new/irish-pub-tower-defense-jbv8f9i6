import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { soundManager } from '../utils/soundManager';

interface VictoryModalProps {
  isVisible: boolean;
  score: number;
  onPlayAgain: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isVisible,
  score,
  onPlayAgain
}) => {
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
          <p className="text-primary-foreground mb-6 text-lg">
            Paddy Losty is proud! Final Score: <span className="text-accent font-bold">{score}</span>
          </p>

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