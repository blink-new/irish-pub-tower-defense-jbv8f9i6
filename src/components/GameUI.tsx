import React from 'react';
import { GameState, TowerType } from '../types/game';
import { TOWER_STATS } from '../data/gameConfig';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { soundManager } from '../utils/soundManager';



interface GameUIProps {
  gameState: GameState;
  onTowerSelect: (type: TowerType) => void;
  onUpgradeTower: (towerId: string) => void;
  onStartWave: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  onTowerSelect,
  onUpgradeTower,
  onStartWave
}) => {
  return (
    <div className="w-80 bg-card border-l-2 border-accent p-4 space-y-4">


      {/* Wave Control */}
      <Card className="bg-primary/20 border-accent">
        <CardHeader className="pb-3">
          <CardTitle className="text-accent font-celtic text-xl">Wave Control</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              if (!gameState.isPlaying && gameState.lives > 0 && gameState.wave <= 10) {
                soundManager.playSound('button_click');
                onStartWave();
              }
            }}
            disabled={gameState.isPlaying || gameState.lives <= 0 || gameState.wave > 10}
            className={`w-full font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 border-2 ${
              !gameState.isPlaying && gameState.lives > 0 && gameState.wave <= 10
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-green-400 transform hover:scale-105'
                : 'bg-gray-400 text-gray-600 border-gray-300 cursor-not-allowed opacity-50'
            }`}
          >
            🌊 Start Wave {gameState.wave}
          </Button>
        </CardContent>
      </Card>

      {/* Tower Shop */}
      <Card className="bg-primary/20 border-accent">
        <CardHeader className="pb-3">
          <CardTitle className="text-accent font-celtic text-xl">Pub Defenders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(TOWER_STATS).map(([type, stats]) => (
            <Button
              key={type}
              onClick={() => {
                soundManager.playSound('button_click');
                onTowerSelect(type as TowerType);
              }}
              disabled={gameState.gold < stats.cost}
              className={`w-full p-3 h-auto flex flex-col items-start space-y-1 ${
                gameState.placingTowerType === type
                  ? 'bg-accent text-accent-foreground border-2 border-accent'
                  : 'bg-card hover:bg-card/80 text-card-foreground border border-muted'
              }`}
              variant="outline"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  {type === 'paddy-losty' ? (
                    <img 
                      src="/paddy-losty.jpg" 
                      alt={stats.name}
                      className="w-8 h-8 rounded-full object-cover border border-accent"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        console.error('Failed to load Paddy Losty image');
                      }}
                    />
                  ) : (
                    <span className="text-2xl">{stats.icon}</span>
                  )}
                  <span className="font-bold">{stats.name}</span>
                </div>
                <Badge 
                  variant={gameState.gold >= stats.cost ? "secondary" : "destructive"}
                  className="font-bold"
                >
                  💰 {stats.cost}
                </Badge>
              </div>
              <p className="text-xs text-left opacity-80">{stats.description}</p>
              <div className="flex space-x-3 text-xs">
                <span>⚔️ {stats.damage}</span>
                <span>🎯 {stats.range}</span>
                <span>⚡ {stats.attackSpeed}/s</span>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Selected Tower Info - Now appears on map */}
      {gameState.selectedTower && (
        <Card className="bg-primary/20 border-accent">
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              {gameState.selectedTower.type === 'paddy-losty' ? (
                <img 
                  src="/paddy-losty.jpg" 
                  alt={TOWER_STATS[gameState.selectedTower.type].name}
                  className="w-8 h-8 rounded-full object-cover border border-accent"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    console.error('Failed to load Paddy Losty image');
                  }}
                />
              ) : (
                <span className="text-2xl">
                  {TOWER_STATS[gameState.selectedTower.type].icon}
                </span>
              )}
              <div>
                <h3 className="font-bold text-foreground text-sm">
                  {TOWER_STATS[gameState.selectedTower.type].name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Level {gameState.selectedTower.level} Selected
                </p>
              </div>
            </div>
            <p className="text-xs text-accent font-celtic italic">
              Upgrade options appear on the map!
            </p>
          </CardContent>
        </Card>
      )}




    </div>
  );
};