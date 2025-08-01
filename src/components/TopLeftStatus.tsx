import React from 'react';
import { Badge } from './ui/badge';

interface TopLeftStatusProps {
  gold: number;
  lives: number;
  wave: number;
  score: number;
}

export const TopLeftStatus: React.FC<TopLeftStatusProps> = ({ gold, lives, wave, score }) => {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-3">
      {/* Gold Display */}
      <Badge 
        variant="secondary" 
        className="bg-accent text-accent-foreground font-bold text-lg px-4 py-2 shadow-lg border-2 border-accent/50"
      >
        💰 {gold}
      </Badge>
      
      {/* Lives Display */}
      <Badge 
        variant="destructive" 
        className="font-bold text-lg px-4 py-2 shadow-lg border-2 border-red-600/50"
      >
        ❤️ {lives}
      </Badge>

      {/* Wave Display */}
      <Badge 
        variant="secondary" 
        className="bg-primary text-primary-foreground font-bold text-lg px-4 py-2 shadow-lg border-2 border-primary/50"
      >
        🌊 {wave}
      </Badge>

      {/* Score Display */}
      <Badge 
        variant="secondary" 
        className="bg-primary text-primary-foreground font-bold text-lg px-4 py-2 shadow-lg border-2 border-primary/50"
      >
        ⭐ {score}
      </Badge>
    </div>
  );
};