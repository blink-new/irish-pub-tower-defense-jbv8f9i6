import React from 'react';
import { Tower } from '../types/game';
import { TOWER_STATS } from '../data/gameConfig';

interface TowerUpgradePopupProps {
  tower: Tower;
  gold: number;
  onUpgrade: (towerId: string) => void;
  onSell: (towerId: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
}

export const TowerUpgradePopup: React.FC<TowerUpgradePopupProps> = ({
  tower,
  gold,
  onUpgrade,
  onSell,
  onClose,
  position
}) => {
  const stats = TOWER_STATS[tower.type];
  const upgradeCost = stats.upgradeCost * tower.level;
  const canUpgrade = gold >= upgradeCost && tower.level < 5;
  
  // Calculate sell value (75% of total investment)
  const totalInvestment = stats.cost + (stats.upgradeCost * (tower.level - 1) * tower.level / 2);
  const sellValue = Math.floor(totalInvestment * 0.75);

  // Position popup near the tower but ensure it stays on screen
  const popupWidth = 280;
  const popupHeight = 320;
  
  // Calculate position relative to the tower, but ensure it's always visible
  let adjustedX = position.x + 50; // Default to right of tower
  let adjustedY = position.y - 50; // Default to above tower
  
  // Ensure popup stays within viewport bounds
  if (adjustedX + popupWidth > window.innerWidth) {
    adjustedX = position.x - popupWidth - 50; // Move to left of tower
  }
  if (adjustedX < 10) {
    adjustedX = 10; // Minimum left margin
  }
  
  if (adjustedY < 10) {
    adjustedY = position.y + 50; // Move below tower if too high
  }
  if (adjustedY + popupHeight > window.innerHeight) {
    adjustedY = window.innerHeight - popupHeight - 10; // Maximum bottom margin
  }

  // Get tower quotes
  const getQuote = () => {
    switch (tower.type) {
      case 'paddy-losty':
        return '"I do have 45 pints in about 2 hours!"';
      case 'maureen':
        return '"Maureen would have the fry on!"';
      case 'fiddler':
        return '"I\'d take the shirt off any man\'s back!"';
      case 'leprechaun':
        return '"Bastards!"';
      default:
        return '';
    }
  };

  // Debug logging
  console.log('🏗️ TowerUpgradePopup rendering for tower:', tower.type, 'at position:', { adjustedX, adjustedY });

  return (
    <div
      className="fixed z-[9999] pointer-events-auto"
      style={{
        left: adjustedX,
        top: adjustedY,
      }}
    >
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/20 -z-10"
        onClick={onClose}
      />
      
      {/* Popup content */}
      <div className="bg-background/95 backdrop-blur-sm border-2 border-accent rounded-lg shadow-2xl p-4 w-70">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{stats.icon}</span>
            <div>
              <h3 className="font-bold text-foreground text-lg font-celtic">
                {stats.name}
              </h3>
              <p className="text-sm text-accent">
                Level {tower.level}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            ✕
          </button>
        </div>

        {/* Stats */}
        <div className="bg-primary/10 rounded-lg p-3 mb-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Damage:</span>
              <span className="font-bold text-accent">{tower.damage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Range:</span>
              <span className="font-bold text-accent">{tower.range}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Speed:</span>
              <span className="font-bold text-accent">{tower.attackSpeed.toFixed(1)}/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kills:</span>
              <span className="font-bold text-accent">{tower.kills}</span>
            </div>
          </div>
        </div>

        {/* Upgrade Button */}
        <div className="space-y-2 mb-4">
          {tower.level < 5 ? (
            <button
              onClick={() => onUpgrade(tower.id)}
              disabled={!canUpgrade}
              className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                canUpgrade
                  ? 'bg-accent hover:bg-accent/80 text-accent-foreground shadow-lg hover:shadow-xl'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {canUpgrade ? (
                <div className="flex items-center justify-between">
                  <span>Upgrade to Level {tower.level + 1}</span>
                  <span className="bg-background/20 px-2 py-1 rounded text-xs">
                    💰 {upgradeCost}
                  </span>
                </div>
              ) : (
                <span>Need 💰 {upgradeCost} Gold</span>
              )}
            </button>
          ) : (
            <div className="w-full py-3 px-4 rounded-lg bg-accent/20 text-center">
              <span className="text-accent font-bold">⭐ MAX LEVEL ⭐</span>
            </div>
          )}

          {/* Sell Button */}
          <button
            onClick={() => onSell(tower.id)}
            className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground font-bold text-sm transition-all shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span>Sell Tower</span>
              <span className="bg-background/20 px-2 py-1 rounded text-xs">
                💰 {sellValue}
              </span>
            </div>
          </button>
        </div>

        {/* Quote */}
        <div className="bg-accent/10 rounded-lg p-3 text-center">
          <p className="text-accent font-celtic text-sm italic">
            {getQuote()}
          </p>
        </div>
      </div>
    </div>
  );
};