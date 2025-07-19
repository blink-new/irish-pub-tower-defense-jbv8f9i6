import React from 'react';
import { GameState, TowerType } from '../types/game';
import { TOWER_STATS } from '../data/gameConfig';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Play, Pause, RotateCcw, FastForward, Volume2, VolumeX, Zap, ZapOff } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface GameUIProps {
  gameState: GameState;
  onStartWave: () => void;
  onTogglePause: () => void;
  onResetGame: () => void;
  onTowerSelect: (type: TowerType) => void;
  onUpgradeTower: (towerId: string) => void;
  onChangeGameSpeed: () => void;
  onToggleMusic: () => void;
  onToggleSoundFx: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  onStartWave,
  onTogglePause,
  onResetGame,
  onTowerSelect,
  onUpgradeTower,
  onChangeGameSpeed,
  onToggleMusic,
  onToggleSoundFx
}) => {
  return (
    <div className="w-80 bg-card border-l-2 border-accent p-4 space-y-4">
      {/* Game Stats */}
      <Card className="bg-primary/20 border-accent">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <img 
              src="/Paddy Losty Sticker_.jpg" 
              alt="Paddy Losty" 
              className="w-10 h-10 rounded-full border-2 border-accent shadow-md object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                console.error('Failed to load Paddy Losty image');
              }}
            />
            <CardTitle className="text-accent font-celtic text-xl">Pub Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-foreground">Gold:</span>
            <Badge variant="secondary" className="bg-accent text-accent-foreground font-bold">
              💰 {gameState.gold}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground">Lives:</span>
            <Badge variant="destructive" className="font-bold">
              ❤️ {gameState.lives}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground">Wave:</span>
            <Badge variant="outline" className="border-accent text-accent font-bold">
              🌊 {gameState.wave}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground">Score:</span>
            <Badge variant="secondary" className="bg-primary text-primary-foreground font-bold">
              ⭐ {gameState.score}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <Card className="bg-primary/20 border-accent">
        <CardHeader className="pb-3">
          <CardTitle className="text-accent font-celtic text-xl">Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => {
                soundManager.playSound('button_click');
                onStartWave();
              }}
              disabled={gameState.isPlaying || gameState.wave > 6}
              className="bg-primary hover:bg-primary/80 text-primary-foreground"
            >
              <Play className="w-4 h-4 mr-1" />
              {gameState.wave > 6 ? 'Complete!' : `Start Wave ${gameState.wave}`}
            </Button>
            <Button
              onClick={() => {
                soundManager.playSound('button_click');
                onTogglePause();
              }}
              disabled={!gameState.isPlaying}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              {gameState.isPaused ? <Play className="w-4 h-4 mr-1" /> : <Pause className="w-4 h-4 mr-1" />}
              {gameState.isPaused ? 'Resume' : 'Pause'}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button
              onClick={() => {
                soundManager.playSound('button_click');
                onChangeGameSpeed();
              }}
              variant="outline"
              className="border-muted text-muted-foreground hover:bg-muted"
            >
              <FastForward className="w-4 h-4 mr-1" />
              {gameState.gameSpeed}x
            </Button>
            <Button
              onClick={() => {
                soundManager.playSound('button_click');
                onResetGame();
              }}
              variant="destructive"
              className="bg-destructive hover:bg-destructive/80"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Audio Controls */}
          <div className="grid grid-cols-2 gap-2">
            {/* Music Control */}
            <Button
              onClick={() => {
                if (!gameState.isSoundFxMuted) {
                  soundManager.playSound('button_click');
                }
                onToggleMusic();
              }}
              variant={gameState.isMusicMuted ? "destructive" : "default"}
              className={`h-12 text-sm font-bold ${
                gameState.isMusicMuted 
                  ? 'bg-destructive hover:bg-destructive/80 text-destructive-foreground' 
                  : 'bg-accent hover:bg-accent/80 text-accent-foreground'
              }`}
            >
              {gameState.isMusicMuted ? (
                <>
                  <VolumeX className="w-4 h-4 mr-1" />
                  🎵 OFF
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 mr-1" />
                  🎵 ON
                </>
              )}
            </Button>

            {/* Sound FX Control */}
            <Button
              onClick={() => {
                if (!gameState.isSoundFxMuted) {
                  soundManager.playSound('button_click');
                }
                onToggleSoundFx();
              }}
              variant={gameState.isSoundFxMuted ? "destructive" : "default"}
              className={`h-12 text-sm font-bold ${
                gameState.isSoundFxMuted 
                  ? 'bg-destructive hover:bg-destructive/80 text-destructive-foreground' 
                  : 'bg-primary hover:bg-primary/80 text-primary-foreground'
              }`}
            >
              {gameState.isSoundFxMuted ? (
                <>
                  <ZapOff className="w-4 h-4 mr-1" />
                  🔊 OFF
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-1" />
                  🔊 ON
                </>
              )}
            </Button>
          </div>
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
                  {type === 'bartender' ? (
                    <img 
                      src="/Paddy Losty Sticker_.jpg" 
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
              {gameState.selectedTower.type === 'bartender' ? (
                <img 
                  src="/Paddy Losty Sticker_.jpg" 
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

      {/* Game Status */}
      {gameState.lives <= 0 && (
        <Card className="bg-destructive/20 border-destructive">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-3">
              <img 
                src="/Paddy Losty Sticker_.jpg" 
                alt="Paddy Losty disappointed" 
                className="w-16 h-16 rounded-full border-4 border-destructive shadow-lg object-cover grayscale"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error('Failed to load Paddy Losty image');
                }}
              />
            </div>
            <h2 className="text-2xl font-celtic text-destructive mb-2">Game Over!</h2>
            <p className="text-destructive-foreground mb-2 font-bold">
              "Ah, we gave it our best shot!"
            </p>
            <p className="text-destructive-foreground mb-4 text-sm">
              The pub has been overrun! Final Score: {gameState.score}
            </p>
            <Button 
              onClick={() => {
                soundManager.playSound('button_click');
                onResetGame();
              }} 
              className="bg-primary hover:bg-primary/80"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Victory Status */}
      {gameState.wave > 6 && gameState.lives > 0 && (
        <Card className="bg-accent/20 border-accent">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-3">
              <img 
                src="/Paddy Losty Sticker_.jpg" 
                alt="Paddy Losty celebrating" 
                className="w-20 h-20 rounded-full border-4 border-accent shadow-lg object-cover animate-pulse"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error('Failed to load Paddy Losty image');
                }}
              />
            </div>
            <h2 className="text-2xl font-celtic text-accent mb-2">Victory! 🍺</h2>
            <p className="text-accent-foreground mb-2 font-bold">
              "Well done, lad! The pub is safe!"
            </p>
            <p className="text-accent-foreground mb-4 text-sm">
              Paddy Losty is proud! Final Score: {gameState.score}
            </p>
            <Button 
              onClick={() => {
                soundManager.playSound('button_click');
                onResetGame();
              }} 
              className="bg-primary hover:bg-primary/80"
            >
              Play Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};