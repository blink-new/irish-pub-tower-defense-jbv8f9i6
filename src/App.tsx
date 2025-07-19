import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameUI } from './components/GameUI';
import { AuthWrapper } from './components/AuthWrapper';
import { AchievementNotification } from './components/AchievementNotification';
import { AchievementPanel } from './components/AchievementPanel';
import { useGameState } from './hooks/useGameState';
import { TowerType } from './types/game';
import { ACHIEVEMENTS } from './data/achievements';
import { Button } from './components/ui/button';
import { Trophy } from 'lucide-react';

function App() {
  const [showAchievements, setShowAchievements] = useState(false);
  
  const {
    gameState,
    placeTower,
    upgradeTower,
    startWave,
    togglePause,
    resetGame,
    selectTower,
    setPlacingTowerType,
    changeGameSpeed,
    toggleMusic,
    toggleSoundFx,
    getParticleSystem,
    useSpecialAttack,
    clearAchievementNotification
  } = useGameState();

  const handleTowerPlace = (position: { x: number; y: number }, type: TowerType) => {
    return placeTower(position, type);
  };

  const handleTowerSelect = (towerId: string | undefined) => {
    const tower = towerId ? gameState.towers.find(t => t.id === towerId) : undefined;
    selectTower(tower);
  };

  const handleTowerTypeSelect = (type: TowerType) => {
    setPlacingTowerType(gameState.placingTowerType === type ? undefined : type);
  };

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="bg-primary border-b-2 border-accent p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="/Paddy Losty Sticker_.jpg" 
                  alt="Paddy Losty" 
                  className="w-16 h-16 rounded-full border-4 border-accent shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    console.error('Failed to load Paddy Losty image');
                  }}
                />
                <div className="text-center">
                  <h1 className="text-4xl font-celtic text-accent">
                    Irish Pub Tower Defense 🍺
                  </h1>
                  <p className="text-primary-foreground mt-1 font-medium">
                    Help Paddy Losty defend the pub from mythical creatures!
                  </p>
                </div>
              </div>
              
              {/* Achievement Button */}
              <Button
                onClick={() => setShowAchievements(true)}
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Achievements
              </Button>
              
              <img 
                src="/Paddy Losty Sticker_.jpg" 
                alt="Paddy Losty" 
                className="w-16 h-16 rounded-full border-4 border-accent shadow-lg object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error('Failed to load Paddy Losty image');
                }}
              />
            </div>
          </div>
        </header>

        {/* Main Game Area */}
        <main className="flex max-w-7xl mx-auto">
          {/* Game Board */}
          <div className="flex-1 p-6">
            <div className="bg-card rounded-lg p-4 border-2 border-accent">
              <GameBoard
                gameState={gameState}
                onTowerPlace={handleTowerPlace}
                onTowerSelect={handleTowerSelect}
                onUpgradeTower={upgradeTower}
                onUseSpecialAttack={useSpecialAttack}
                particleSystem={getParticleSystem()}
              />
            </div>
            
            {/* Instructions */}
            <div className="mt-4 bg-card rounded-lg p-4 border border-muted">
              <h3 className="font-celtic text-lg text-accent mb-2">How to Play:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Select a defender from the shop and click on the board to place them</li>
                <li>• Defenders automatically attack enemies within their range</li>
                <li>• Start waves to spawn enemies that follow the brown path</li>
                <li>• Earn gold by defeating enemies to buy more defenders</li>
                <li>• Don't let enemies reach the end or you'll lose lives!</li>
              </ul>
            </div>
          </div>

          {/* Game UI Sidebar */}
          <GameUI
            gameState={gameState}
            onStartWave={startWave}
            onTogglePause={togglePause}
            onResetGame={resetGame}
            onTowerSelect={handleTowerTypeSelect}
            onUpgradeTower={upgradeTower}
            onChangeGameSpeed={changeGameSpeed}
            onToggleMusic={toggleMusic}
            onToggleSoundFx={toggleSoundFx}
          />
        </main>

        {/* Footer */}
        <footer className="bg-primary border-t-2 border-accent p-4 mt-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img 
                src="/Paddy Losty Sticker_.jpg" 
                alt="Paddy Losty" 
                className="w-8 h-8 rounded-full border-2 border-accent shadow-md object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error('Failed to load Paddy Losty image');
                }}
              />
              <p className="text-primary-foreground text-sm">
                Made with ❤️ and a pint of Guinness | Defend the pub, save Ireland! 🇮🇪
              </p>
              <img 
                src="/Paddy Losty Sticker_.jpg" 
                alt="Paddy Losty" 
                className="w-8 h-8 rounded-full border-2 border-accent shadow-md object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error('Failed to load Paddy Losty image');
                }}
              />
            </div>
          </div>
        </footer>

        {/* Achievement Notifications */}
        {gameState.newAchievements.map((achievementId) => {
          const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
          if (!achievement) return null;
          
          return (
            <AchievementNotification
              key={achievementId}
              achievement={achievement}
              onClose={() => clearAchievementNotification(achievementId)}
            />
          );
        })}

        {/* Achievement Panel */}
        {showAchievements && (
          <AchievementPanel
            progress={gameState.achievementProgress}
            onClose={() => setShowAchievements(false)}
          />
        )}
      </div>
    </AuthWrapper>
  );
}

export default App;