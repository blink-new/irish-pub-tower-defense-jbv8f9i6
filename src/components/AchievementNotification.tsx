import React, { useEffect, useState } from 'react';
import { Achievement } from '../types/achievements';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-close after 4 seconds
    const timer2 = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onClose]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
      default: return 'border-gray-400';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <Card className={`w-80 bg-card/95 backdrop-blur-sm border-2 ${getRarityBorder(achievement.rarity)} shadow-lg`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            {/* Achievement Icon */}
            <div className="text-3xl">{achievement.icon}</div>
            
            {/* Achievement Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold text-foreground text-sm">
                  Achievement Unlocked!
                </h3>
                <Badge className={`${getRarityColor(achievement.rarity)} text-white text-xs`}>
                  {achievement.rarity.toUpperCase()}
                </Badge>
              </div>
              
              <h4 className="font-bold text-accent text-base mb-1">
                {achievement.name}
              </h4>
              
              <p className="text-xs text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          </div>
          
          {/* Celebration Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 right-2 text-yellow-400 animate-bounce">✨</div>
            <div className="absolute top-4 right-8 text-yellow-300 animate-pulse">⭐</div>
            <div className="absolute bottom-2 right-4 text-yellow-500 animate-bounce delay-150">✨</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};