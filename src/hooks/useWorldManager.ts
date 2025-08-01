import { useState, useCallback, useEffect } from 'react';
import { WorldState } from '../types/world';
import { DEFAULT_WORLD, getWorldByWave, WORLD_THEMES } from '../data/worldConfig';

// Development mode - unlock all worlds for testing
const INITIAL_WORLD_STATE: WorldState = {
  currentWorldId: DEFAULT_WORLD,
  unlockedWorlds: ['irish-countryside', 'city-pub'], // Both worlds unlocked for development
  worldProgress: {
    [DEFAULT_WORLD]: {
      highestWave: 0,
      isCompleted: false
    },
    'city-pub': {
      highestWave: 0,
      isCompleted: false
    }
  }
};

export const useWorldManager = () => {
  const [worldState, setWorldState] = useState<WorldState>(INITIAL_WORLD_STATE);

  // Get current world theme
  const getCurrentWorld = useCallback(() => {
    return WORLD_THEMES[worldState.currentWorldId] || WORLD_THEMES[DEFAULT_WORLD];
  }, [worldState.currentWorldId]);

  // Switch to a different world
  const switchWorld = useCallback((worldId: string) => {
    if (WORLD_THEMES[worldId]) {
      setWorldState(prev => ({
        ...prev,
        currentWorldId: worldId
      }));
    }
  }, []);

  // Get the next world ID in sequence
  const getNextWorldId = useCallback((currentWorldId: string): string | null => {
    const worldIds = Object.keys(WORLD_THEMES);
    const currentIndex = worldIds.indexOf(currentWorldId);
    
    if (currentIndex >= 0 && currentIndex < worldIds.length - 1) {
      return worldIds[currentIndex + 1];
    }
    
    return null;
  }, []);

  // Update progress when a wave is completed
  const updateWorldProgress = useCallback((wave: number, isCompleted: boolean = false) => {
    const world = getWorldByWave(wave);
    
    setWorldState(prev => {
      const newState = { ...prev };
      
      // Update progress for the current world
      if (!newState.worldProgress[world.id]) {
        newState.worldProgress[world.id] = {
          highestWave: 0,
          isCompleted: false
        };
      }
      
      const currentProgress = newState.worldProgress[world.id];
      newState.worldProgress[world.id] = {
        highestWave: Math.max(currentProgress.highestWave, wave),
        isCompleted: isCompleted || currentProgress.isCompleted
      };
      
      // Check if we should unlock the next world
      const nextWorldId = getNextWorldId(world.id);
      if (nextWorldId && wave >= world.waveRange.end && !newState.unlockedWorlds.includes(nextWorldId)) {
        newState.unlockedWorlds.push(nextWorldId);
        
        // Initialize progress for newly unlocked world
        if (!newState.worldProgress[nextWorldId]) {
          newState.worldProgress[nextWorldId] = {
            highestWave: 0,
            isCompleted: false
          };
        }
      }
      
      return newState;
    });
  }, [getNextWorldId]);

  // Get highest completed wave across all worlds
  const getHighestCompletedWave = useCallback(() => {
    let highest = 0;
    Object.values(worldState.worldProgress).forEach(progress => {
      highest = Math.max(highest, progress.highestWave);
    });
    return highest;
  }, [worldState.worldProgress]);

  // Check if a specific world is unlocked
  const isWorldUnlocked = useCallback((worldId: string) => {
    return worldState.unlockedWorlds.includes(worldId);
  }, [worldState.unlockedWorlds]);

  // Get world-specific enemy data (maps to base stats but with world theme)
  const getEnemyData = useCallback((enemyType: string) => {
    const currentWorld = getCurrentWorld();
    
    // Find the themed enemy that maps to this base type
    const themedEnemy = Object.values(currentWorld.enemies).find(
      enemy => enemy.baseType === enemyType
    );
    
    return themedEnemy || {
      name: enemyType,
      description: 'Unknown enemy',
      icon: '❓',
      baseType: enemyType
    };
  }, [getCurrentWorld]);

  // Get world-specific tower data (maps to base stats but with world theme)
  const getTowerData = useCallback((towerType: string) => {
    const currentWorld = getCurrentWorld();
    
    // Find the themed tower that maps to this base type
    const themedTower = Object.values(currentWorld.towers).find(
      tower => tower.baseType === towerType
    );
    
    return themedTower || {
      name: towerType,
      description: 'Unknown tower',
      icon: '❓',
      baseType: towerType
    };
  }, [getCurrentWorld]);

  // Auto-switch world based on wave number
  const autoSwitchWorldForWave = useCallback((wave: number) => {
    const appropriateWorld = getWorldByWave(wave);
    if (appropriateWorld.id !== worldState.currentWorldId && isWorldUnlocked(appropriateWorld.id)) {
      switchWorld(appropriateWorld.id);
    }
  }, [worldState.currentWorldId, isWorldUnlocked, switchWorld]);

  // Reset world state (for testing or new game)
  const resetWorldState = useCallback(() => {
    setWorldState(INITIAL_WORLD_STATE);
  }, []);

  return {
    worldState,
    getCurrentWorld,
    switchWorld,
    updateWorldProgress,
    getHighestCompletedWave,
    isWorldUnlocked,
    getEnemyData,
    getTowerData,
    autoSwitchWorldForWave,
    resetWorldState
  };
};