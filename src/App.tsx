import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameUI } from './components/GameUI';
import { VictoryModal } from './components/VictoryModal';
import { GameOverModal } from './components/GameOverModal';
import { WorldSelection } from './components/WorldSelection';
import { Leaderboard } from './components/Leaderboard';
import { AuthWrapper } from './components/AuthWrapper';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PlayerDebugInfo } from './components/PlayerDebugInfo';
import { ScoreTestButton } from './components/ScoreTestButton';
import { useGameState } from './hooks/useGameState';
import { TowerType } from './types/game';

function App() {
  const [showWorldSelection, setShowWorldSelection] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  const {
    gameState,
    specialAttackEffects,
    handleEffectComplete,
    placeTower,
    upgradeTower,
    sellTower,
    startWave,
    togglePause,
    resetGame,
    retryGame,
    quitGame,
    selectTower,
    setPlacingTowerType,
    changeGameSpeed,
    toggleMusic,
    toggleSoundFx,
    getParticleSystem,
    useSpecialAttack,
    worldManager
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
    <ErrorBoundary>
      <AuthWrapper>
        <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="bg-primary border-b-2 border-accent p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <img 
                src="/paddy-losty.jpg" 
                alt="Paddy Losty" 
                className="w-16 h-16 rounded-full border-4 border-accent shadow-lg object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error('Failed to load Paddy Losty image');
                }}
              />
              
              <div className="flex-1 text-center">
                <h1 className="text-4xl font-celtic text-accent">
                  Irish Pub Tower Defense 🍺
                </h1>
                <p className="text-primary-foreground mt-1 font-medium">
                  {worldManager.getCurrentWorld().name} - {worldManager.getCurrentWorld().description}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowLeaderboard(true)}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-celtic transition-colors flex items-center gap-2"
                >
                  🏆 Leaderboard
                </button>
                <button
                  onClick={() => setShowWorldSelection(true)}
                  className="px-4 py-2 bg-accent hover:bg-accent/80 text-primary rounded-lg font-celtic transition-colors"
                >
                  Select World
                </button>
                <img 
                  src="/paddy-losty.jpg" 
                  alt="Paddy Losty" 
                  className="w-16 h-16 rounded-full border-4 border-accent shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    console.error('Failed to load Paddy Losty image');
                  }}
                />
              </div>
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
                specialAttackEffects={specialAttackEffects}
                onEffectComplete={handleEffectComplete}
                onTowerPlace={handleTowerPlace}
                onTowerSelect={handleTowerSelect}
                onUpgradeTower={upgradeTower}
                onSellTower={sellTower}
                onUseSpecialAttack={useSpecialAttack}
                onTogglePause={togglePause}
                onChangeGameSpeed={changeGameSpeed}
                onToggleMusic={toggleMusic}
                onToggleSoundFx={toggleSoundFx}
                onRetryGame={retryGame}
                onQuitGame={quitGame}
                particleSystem={getParticleSystem()}
                onShowFlashMessage={() => {}}
                worldManager={worldManager}
              />
            </div>
            
            {/* Instructions */}
            <div className="mt-4 bg-card rounded-lg p-4 border border-muted">
              <h3 className="font-celtic text-lg text-accent mb-2">How to Play:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li key="instruction-1">• Select a defender from the shop and click on a high stool to place them</li>
                <li key="instruction-2">• Defenders automatically attack enemies within their range</li>
                <li key="instruction-3">• Start waves to spawn enemies that follow the brown path</li>
                <li key="instruction-4">• Earn gold by defeating enemies to buy more defenders</li>
                <li key="instruction-5">• Towers can be upgraded after placement—simply click on a tower to improve its abilities and strengthen your defenses</li>
                <li key="instruction-6">• Don't let enemies reach the end or you'll lose lives!</li>
              </ul>
            </div>
          </div>

          {/* Game UI Sidebar */}
          <GameUI
            gameState={gameState}
            onTowerSelect={handleTowerTypeSelect}
            onUpgradeTower={upgradeTower}
            onStartWave={startWave}
          />
        </main>

        {/* Footer */}
        <footer className="bg-primary border-t-2 border-accent p-4 mt-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img 
                src="/paddy-losty.jpg" 
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
                src="/paddy-losty.jpg" 
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

        {/* Victory Modal */}
        <VictoryModal
          isVisible={gameState.wave > 10 && gameState.lives > 0}
          score={gameState.score}
          onPlayAgain={resetGame}
          worldId={worldManager.getCurrentWorld().id}
        />

        {/* Game Over Modal */}
        <GameOverModal
          isVisible={gameState.lives <= 0}
          score={gameState.score}
          wave={gameState.wave}
          onRetry={retryGame}
          onQuit={quitGame}
          worldId={worldManager.getCurrentWorld().id}
        />

        {/* World Selection Modal */}
        <WorldSelection
          isVisible={showWorldSelection}
          currentWorldId={worldManager.worldState.currentWorldId}
          highestCompletedWave={worldManager.getHighestCompletedWave()}
          onWorldSelect={worldManager.switchWorld}
          onClose={() => setShowWorldSelection(false)}
        />

        {/* Leaderboard Modal */}
        <Leaderboard
          isVisible={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
        />

        {/* Player Debug Info - Shows current player info for testing */}
        <PlayerDebugInfo />

        {/* Score Test Button - For testing score saving functionality */}
        <ScoreTestButton />
        </div>
      </AuthWrapper>
    </ErrorBoundary>
  );
}

export default App;