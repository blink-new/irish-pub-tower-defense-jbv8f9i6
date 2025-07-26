import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Play, Sword, Shield, Zap } from 'lucide-react';
import { WAVES, ENEMY_STATS } from '../data/gameConfig';
import { soundManager } from '../utils/soundManager';

interface PreWaveModalProps {
  isVisible: boolean;
  wave: number;
  onStartWave: () => void;
}

export const PreWaveModal: React.FC<PreWaveModalProps> = ({
  isVisible,
  wave,
  onStartWave
}) => {
  if (!isVisible) return null;

  const currentWave = WAVES[wave - 1];
  if (!currentWave) return null;

  const handleStartWave = () => {
    soundManager.playSound('button_click');
    onStartWave();
  };

  // Get unique enemy types in this wave for preview
  const uniqueEnemyTypes = [...new Set(currentWave.enemies.map(group => group.type))];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with subtle blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <Card className="relative z-10 w-96 bg-primary/95 border-2 border-accent shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-celtic text-accent">
            Wave {wave} Incoming!
          </CardTitle>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Sword className="w-5 h-5 text-accent" />
            <span className="text-primary-foreground font-medium">
              Prepare your defenses
            </span>
            <Shield className="w-5 h-5 text-accent" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Wave Reward */}
          <div className="text-center">
            <Badge variant="secondary" className="bg-accent text-accent-foreground font-bold text-lg px-4 py-2">
              💰 Reward: {currentWave.reward} Gold
            </Badge>
          </div>

          {/* Enemy Preview */}
          <div className="bg-card/50 rounded-lg p-4 border border-accent/30">
            <h4 className="text-accent font-celtic text-lg mb-3 text-center">
              Incoming Enemies:
            </h4>
            <div className="space-y-2">
              {currentWave.enemies.map((enemyGroup, index) => {
                const enemyStats = ENEMY_STATS[enemyGroup.type as keyof typeof ENEMY_STATS];
                if (!enemyStats) return null;

                return (
                  <div key={index} className="flex items-center justify-between bg-card/30 rounded p-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{enemyStats.icon}</span>
                      <div>
                        <span className="text-primary-foreground font-medium">
                          {enemyStats.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            {enemyStats.health}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            {enemyStats.speed}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent">
                      ×{enemyGroup.count}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Start Wave Button */}
          <div className="text-center pt-2">
            <Button
              onClick={handleStartWave}
              size="lg"
              className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold text-lg py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Wave {wave}
            </Button>
          </div>

          {/* Flavor Text */}
          <div className="text-center">
            <p className="text-sm text-primary-foreground/80 italic font-celtic">
              {wave === 1 && "The first wave approaches the pub..."}
              {wave === 2 && "More creatures emerge from the mist..."}
              {wave === 3 && "The assault intensifies!"}
              {wave === 4 && "Stronger foes test your defenses..."}
              {wave === 5 && "The enemy grows desperate..."}
              {wave === 6 && "The final wave - defend the pub at all costs!"}
              {wave > 6 && "Unexpected reinforcements arrive!"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};