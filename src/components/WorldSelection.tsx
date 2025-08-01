import React from 'react';
import { WorldTheme } from '../types/world';
import { getAllWorlds, isWorldUnlocked } from '../data/worldConfig';

interface WorldSelectionProps {
  isVisible: boolean;
  currentWorldId: string;
  highestCompletedWave: number;
  onWorldSelect: (worldId: string) => void;
  onClose: () => void;
}

export const WorldSelection: React.FC<WorldSelectionProps> = ({
  isVisible,
  currentWorldId,
  highestCompletedWave,
  onWorldSelect,
  onClose
}) => {
  const worlds = getAllWorlds();

  const handleWorldSelect = (worldId: string) => {
    onWorldSelect(worldId);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card border-2 border-accent rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-celtic text-accent">Select World</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {worlds.map((world) => {
            const unlocked = isWorldUnlocked(world.id, highestCompletedWave);
            const isCurrent = world.id === currentWorldId;
            
            return (
              <div
                key={world.id}
                className={`
                  relative border-2 rounded-lg p-4 transition-all cursor-pointer
                  ${isCurrent 
                    ? 'border-accent bg-accent/10' 
                    : unlocked 
                      ? 'border-muted hover:border-accent/50 bg-card hover:bg-accent/5' 
                      : 'border-muted/30 bg-muted/10 cursor-not-allowed opacity-50'
                  }
                `}
                onClick={() => unlocked && handleWorldSelect(world.id)}
              >
                {/* Lock indicator for locked worlds */}
                {!unlocked && (
                  <div className="absolute top-2 right-2 text-muted-foreground">
                    🔒
                  </div>
                )}

                {/* Current world indicator */}
                {isCurrent && (
                  <div className="absolute top-2 right-2 text-accent">
                    ⭐
                  </div>
                )}

                <div className="mb-3">
                  <h3 className="text-xl font-celtic text-foreground mb-1">
                    {world.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Waves {world.waveRange.start}-{world.waveRange.end}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {world.description}
                </p>

                {/* World preview - show some key elements */}
                <div className="space-y-3">
                  {/* Enemies preview */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Enemies:</h4>
                    <div className="flex gap-2 text-lg">
                      {Object.values(world.enemies).slice(0, 4).map((enemy, index) => (
                        <span key={index} title={enemy.name}>
                          {enemy.icon}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Towers preview */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Defenders:</h4>
                    <div className="flex gap-2 text-lg">
                      {Object.values(world.towers).slice(0, 4).map((tower, index) => (
                        <span key={index} title={tower.name}>
                          {tower.icon}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Unlock requirement for locked worlds */}
                  {!unlocked && (
                    <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted/20 rounded">
                      Complete wave {world.waveRange.start - 1} to unlock
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};