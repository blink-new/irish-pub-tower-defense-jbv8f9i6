import React from 'react';
import { Tower, TowerType } from '../types/game';
import { TOWER_STATS } from '../data/gameConfig';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';

interface TowerUpgradeOverlayProps {
  tower: Tower;
  gold: number;
  onUpgrade: (towerId: string) => void;
  onClose: () => void;
  canvasRect: DOMRect;
}

export const TowerUpgradeOverlay: React.FC<TowerUpgradeOverlayProps> = ({
  tower,
  gold,
  onUpgrade,
  onClose,
  canvasRect
}) => {
  const stats = TOWER_STATS[tower.type];
  const upgradeCost = stats.upgradeCost * tower.level;
  const canUpgrade = gold >= upgradeCost && tower.level < 5; // Max level 5

  // Calculate position relative to canvas
  const overlayX = canvasRect.left + tower.position.x + 30; // Offset to the right of tower
  const overlayY = canvasRect.top + tower.position.y - 50; // Offset above tower

  // Ensure overlay stays within viewport
  const adjustedX = Math.min(overlayX, window.innerWidth - 280);
  const adjustedY = Math.max(overlayY, 10);

  return (
    <div
      className="fixed z-50 pointer-events-auto"
      style={{
        left: adjustedX,
        top: adjustedY,
      }}
    >
      <Card className="w-64 bg-card/95 backdrop-blur-sm border-2 border-accent shadow-lg">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{stats.icon}</span>
              <div>
                <h3 className="font-bold text-foreground text-sm">
                  {stats.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Level {tower.level}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Current Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Damage:</span>
              <span className="font-bold text-foreground">{tower.damage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Range:</span>
              <span className="font-bold text-foreground">{tower.range}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Speed:</span>
              <span className="font-bold text-foreground">{tower.attackSpeed.toFixed(1)}/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kills:</span>
              <span className="font-bold text-foreground">{tower.kills}</span>
            </div>
          </div>

          {/* Upgrade Button */}
          {tower.level < 5 ? (
            <Button
              onClick={() => onUpgrade(tower.id)}
              className="w-full bg-accent hover:bg-accent/80 text-accent-foreground text-sm"
              disabled={!canUpgrade}
            >
              {canUpgrade ? (
                <>
                  Upgrade to Level {tower.level + 1}
                  <Badge variant="secondary" className="ml-2 bg-background text-foreground">
                    💰 {upgradeCost}
                  </Badge>
                </>
              ) : (
                <>
                  Need 💰 {upgradeCost}
                </>
              )}
            </Button>
          ) : (
            <div className="text-center">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                ⭐ MAX LEVEL ⭐
              </Badge>
            </div>
          )}

          {/* Paddy Losty Quote */}
          <div className="mt-3 p-2 bg-primary/20 rounded text-xs text-center italic">
            <span className="text-accent font-celtic">
              {tower.type === 'bartender' && '"I do have 45 pints in about 2 hours!"'}
              {tower.type === 'bouncer' && '"Maureen would have the fry on!"'}
              {tower.type === 'fiddler' && '"I\'d take the shirt off any man\'s back!"'}
              {tower.type === 'leprechaun' && '"Bastards!"'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};