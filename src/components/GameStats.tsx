import React from 'react';
import { GameState } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface GameStatsProps {
  gameState: GameState;
}

export const GameStats: React.FC<GameStatsProps> = ({ gameState }) => {
  // Calculate statistics
  const totalKills = gameState.towers.reduce((total, tower) => total + tower.kills, 0);
  const totalDamage = gameState.towers.reduce((total, tower) => total + tower.totalDamage, 0);
  const averageTowerLevel = gameState.towers.length > 0 
    ? gameState.towers.reduce((total, tower) => total + tower.level, 0) / gameState.towers.length 
    : 0;
  
  const livesPercent = (gameState.lives / 20) * 100;
  const waveProgress = ((gameState.wave - 1) / 6) * 100;
  
  // Get tower type counts
  const towerCounts = gameState.towers.reduce((counts, tower) => {
    counts[tower.type] = (counts[tower.type] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  const towerNames = {
    bartender: 'Paddy Losty',
    maureen: 'Maureen',
    fiddler: 'Prime Mutton',
    leprechaun: 'John B Keane'
  };

  return (
    <Card className="bg-primary/20 border-accent">
      <CardHeader className="pb-3">
        <CardTitle className="text-accent font-celtic text-xl">Game Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Lives Remaining</span>
              <span>{gameState.lives}/20</span>
            </div>
            <Progress 
              value={livesPercent} 
              className="h-2"
              style={{
                background: livesPercent > 50 ? '#22c55e' : livesPercent > 25 ? '#f59e0b' : '#ef4444'
              }}
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Wave Progress</span>
              <span>{gameState.wave}/6</span>
            </div>
            <Progress value={waveProgress} className="h-2" />
          </div>
        </div>

        {/* Combat Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Kills:</span>
            <Badge variant="secondary" className="bg-red-500 text-white">
              ⚔️ {totalKills}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Damage:</span>
            <Badge variant="secondary" className="bg-orange-500 text-white">
              💥 {totalDamage.toLocaleString()}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Towers Built:</span>
            <Badge variant="secondary" className="bg-blue-500 text-white">
              🏗️ {gameState.towers.length}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Avg Level:</span>
            <Badge variant="secondary" className="bg-purple-500 text-white">
              ⭐ {averageTowerLevel.toFixed(1)}
            </Badge>
          </div>
        </div>

        {/* Tower Composition */}
        {gameState.towers.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-accent mb-2">Tower Composition</h4>
            <div className="space-y-1">
              {Object.entries(towerCounts).map(([type, count]) => (
                <div key={type} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {towerNames[type as keyof typeof towerNames]}:
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Progress */}
        <div>
          <h4 className="text-sm font-bold text-accent mb-2">Achievements</h4>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Unlocked:</span>
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              🏆 {Object.values(gameState.achievementProgress).filter(a => a.unlocked).length}
            </Badge>
          </div>
        </div>

        {/* Performance Rating */}
        <div>
          <h4 className="text-sm font-bold text-accent mb-2">Performance</h4>
          <div className="text-center">
            {gameState.lives >= 18 && (
              <Badge className="bg-green-500 text-white">🌟 Excellent Defense</Badge>
            )}
            {gameState.lives >= 15 && gameState.lives < 18 && (
              <Badge className="bg-blue-500 text-white">👍 Good Defense</Badge>
            )}
            {gameState.lives >= 10 && gameState.lives < 15 && (
              <Badge className="bg-yellow-500 text-white">⚠️ Fair Defense</Badge>
            )}
            {gameState.lives < 10 && gameState.lives > 0 && (
              <Badge className="bg-red-500 text-white">🚨 Poor Defense</Badge>
            )}
            {gameState.lives <= 0 && (
              <Badge className="bg-gray-500 text-white">💀 Defeated</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};