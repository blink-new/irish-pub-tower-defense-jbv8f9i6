import { useState, useCallback, useRef, useEffect } from 'react';
import { GameState, Tower, Enemy, Projectile, TowerType, Position } from '../types/game';
import { TOWER_STATS, COMBINED_ENEMY_STATS, WAVES, GAME_PATH, SPECIAL_ATTACKS } from '../data/gameConfig';
import { WORLD2_ENEMY_PATH } from '../components/World2Renderer';
import { ParticleSystem } from '../utils/particleSystem';
import { soundManager } from '../utils/soundManager';
import { SpecialAttackEffect } from '../utils/specialAttackEffects';
import { useWorldManager } from './useWorldManager';

const INITIAL_STATE: GameState = {
  gold: 200,
  lives: 20,
  wave: 1,
  score: 0,
  isPlaying: false,
  isPaused: false,
  gameSpeed: 1,
  towers: [],
  enemies: [],
  projectiles: [],
  selectedTower: undefined,
  placingTowerType: undefined,
  particles: [],
  isMusicMuted: false,
  isSoundFxMuted: false,
  specialAttacks: SPECIAL_ATTACKS.map(attack => ({ ...attack }))
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [specialAttackEffects, setSpecialAttackEffects] = useState<SpecialAttackEffect[]>([]);
  
  // World management
  const worldManager = useWorldManager();
  
  // Helper function to get current enemy path based on world
  const getCurrentPath = useCallback(() => {
    const currentWorld = worldManager.getCurrentWorld();
    return currentWorld.id === 'city-pub' ? WORLD2_ENEMY_PATH : GAME_PATH;
  }, [worldManager]);

  const gameLoopRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const enemiesSpawnedRef = useRef<number>(0);
  const totalEnemiesInWaveRef = useRef<number>(0);
  const particleSystemRef = useRef<ParticleSystem>(new ParticleSystem());

  // Initialize sound manager
  useEffect(() => {
    soundManager.initializeSounds();
    
    // Note: Background music is disabled to prevent auto-play errors
    // Music will only start after user interaction (like starting a wave)
    console.log('🎵 Sound system initialized - background music disabled to prevent auto-play errors');
  }, []);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const placeTower = useCallback((position: Position, type: TowerType) => {
    console.log(`🏗️ Attempting to place ${type} tower at position:`, position);
    
    let placementSuccess = false;
    
    setGameState(prev => {
      const stats = TOWER_STATS[type];
      if (!stats) {
        console.error(`❌ No stats found for tower type: ${type}`);
        return prev;
      }
      
      if (prev.gold < stats.cost) {
        console.warn(`❌ Insufficient gold: need ${stats.cost}, have ${prev.gold}`);
        return prev;
      }

      const newTower: Tower = {
        id: generateId(),
        type,
        position,
        level: 1,
        damage: stats.damage,
        range: stats.range,
        attackSpeed: stats.attackSpeed,
        cost: stats.cost,
        lastAttack: 0,
        kills: 0,
        totalDamage: 0
      };

      console.log(`✅ Successfully creating ${type} tower:`, newTower);
      placementSuccess = true;

      // Play character-specific voice or tower placement sound
      if (type === 'paddy-losty') {
        soundManager.playPaddyLostyVoice().catch(error => {
          console.warn('⚠️ Paddy Losty voice failed, using sound effect:', error.message || error);
          soundManager.playSound('tower_place'); // Fallback
        });
      } else if (type === 'maureen') {
        soundManager.playMaureenVoice().catch(error => {
          console.warn('⚠️ Maureen voice failed, using sound effect:', error.message || error);
          soundManager.playSound('tower_place'); // Fallback
        });
      } else if (type === 'fiddler') {
        soundManager.playCreamerVoice().catch(error => {
          console.warn('⚠️ Creamer voice failed, using sound effect:', error.message || error);
          soundManager.playSound('tower_place'); // Fallback
        });
      } else if (type === 'leprechaun') {
        soundManager.playJohnBKeaneVoice().catch(error => {
          console.warn('⚠️ John B Keane voice failed, using sound effect:', error.message || error);
          soundManager.playSound('tower_place'); // Fallback
        });
      } else {
        soundManager.playSound('tower_place');
      }

      return {
        ...prev,
        towers: [...prev.towers, newTower],
        gold: prev.gold - stats.cost,
        placingTowerType: undefined
      };
    });

    console.log(`🏗️ Tower placement result: ${placementSuccess ? 'SUCCESS' : 'FAILED'}`);
    return placementSuccess;
  }, []);

  const spawnEnemy = useCallback((type: string) => {
    const stats = COMBINED_ENEMY_STATS[type as keyof typeof COMBINED_ENEMY_STATS];
    if (!stats) {
      console.error(`❌ No stats found for enemy type: ${type}`);
      return;
    }
    
    const currentPath = getCurrentPath();
    const newEnemy: Enemy = {
      id: generateId(),
      type: type as any,
      position: { x: currentPath[0].x, y: currentPath[0].y },
      health: stats.health,
      maxHealth: stats.health,
      speed: stats.speed,
      pathIndex: 0,
      pathProgress: 0,
      gold: stats.gold,
      isDead: false,
      isBoss: false,
      size: 1,
      abilities: undefined,
      lastAbilityUse: {},
      statusEffects: {}
    };

    console.log(`👹 Spawning enemy: ${stats.name} (${type})`);
    
    // Special spawn message for The Recession boss
    if (type === 'recession') {
      console.log('🐻‍💼 THE RECESSION BEAR (MARKET) IS COMING!');
      // Show flash message on screen
      if ((window as any).showFlashMessage) {
        (window as any).showFlashMessage('The recession bear (market) is coming');
      }
    }

    setGameState(prev => ({
      ...prev,
      enemies: [...prev.enemies, newEnemy]
    }));

    enemiesSpawnedRef.current += 1;
  }, [getCurrentPath]);

  const upgradeTower = useCallback((towerId: string) => {
    setGameState(prev => {
      const tower = prev.towers.find(t => t.id === towerId);
      if (!tower) return prev;

      const stats = TOWER_STATS[tower.type];
      const upgradeCost = stats.upgradeCost * tower.level;

      if (prev.gold < upgradeCost) return prev;

      const upgradedTowers = prev.towers.map(t => {
        if (t.id === towerId) {
          return {
            ...t,
            level: t.level + 1,
            damage: Math.floor(t.damage * 1.5),
            range: Math.floor(t.range * 1.1),
            attackSpeed: t.attackSpeed * 1.2
          };
        }
        return t;
      });

      // Play upgrade sound
      soundManager.playSound('tower_place');

      return {
        ...prev,
        towers: upgradedTowers,
        gold: prev.gold - upgradeCost,
        selectedTower: upgradedTowers.find(t => t.id === towerId)
      };
    });
  }, []);

  const sellTower = useCallback((towerId: string) => {
    setGameState(prev => {
      const tower = prev.towers.find(t => t.id === towerId);
      if (!tower) return prev;

      const stats = TOWER_STATS[tower.type];
      
      // Calculate sell value (75% of total investment)
      const totalInvestment = stats.cost + (stats.upgradeCost * (tower.level - 1) * tower.level / 2);
      const sellValue = Math.floor(totalInvestment * 0.75);

      // Remove tower from towers array
      const remainingTowers = prev.towers.filter(t => t.id !== towerId);

      // Play sell sound
      soundManager.playSound('coin_collect');

      console.log(`💰 Sold ${stats.name} (Level ${tower.level}) for ${sellValue} gold`);

      return {
        ...prev,
        towers: remainingTowers,
        gold: prev.gold + sellValue,
        selectedTower: undefined // Clear selection since tower is sold
      };
    });
  }, []);

  const startWave = useCallback(() => {
    setGameState(prev => {
      const currentWave = WAVES[prev.wave - 1];
      if (!currentWave || prev.isPlaying) return prev;

      // Calculate total enemies in this wave
      const totalEnemies = currentWave.enemies.reduce((total, group) => total + group.count, 0);
      totalEnemiesInWaveRef.current = totalEnemies;
      enemiesSpawnedRef.current = 0;

      // Clear any remaining enemies from previous wave
      const cleanState = { ...prev, enemies: [], projectiles: [] };

      // Play wave start sound
      soundManager.playSound('wave_start');
      
      // Start background music on first user interaction (wave start)
      if (!prev.isMusicMuted) {
        soundManager.startBackgroundMusic();
      }

      // Log boss wave information
      if (currentWave.isBossWave) {
        console.log(`🔥 BOSS WAVE ${prev.wave} STARTING: ${currentWave.description}`);
      }

      return { ...cleanState, isPlaying: true };
    });

    // Spawn enemies with delays after state update
    const currentWave = WAVES[gameState.wave - 1];
    if (currentWave) {
      currentWave.enemies.forEach(enemyGroup => {
        const baseDelay = enemyGroup.spawnDelay || 0;
        for (let i = 0; i < enemyGroup.count; i++) {
          setTimeout(() => {
            spawnEnemy(enemyGroup.type as string);
          }, baseDelay + (i * enemyGroup.delay));
        }
      });
    }
  }, [spawnEnemy, gameState.wave]);

  const updateGame = useCallback((deltaTime: number) => {
    setGameState(prev => {
      if (!prev.isPlaying || prev.isPaused) return prev;

      try {
        const newState = { ...prev };
      const currentTime = Date.now();

      // Update enemies movement
      const currentPath = getCurrentPath();
      newState.enemies = newState.enemies.map(enemy => {
        if (enemy.isDead || enemy.health <= 0) return enemy;

        // Move enemy along path
        const nextWaypointIndex = enemy.pathIndex + 1;
        
        if (nextWaypointIndex < currentPath.length) {
          const currentTarget = currentPath[nextWaypointIndex];
          const dx = currentTarget.x - enemy.position.x;
          const dy = currentTarget.y - enemy.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 15) {
            // Reached waypoint, move to next
            enemy.pathIndex = nextWaypointIndex;
            enemy.position.x = currentTarget.x;
            enemy.position.y = currentTarget.y;
            
            // Check if this was the last waypoint
            if (enemy.pathIndex >= currentPath.length - 1) {
              // Enemy reached end
              newState.lives--;
              enemy.isDead = true;
            }
          } else {
            // Move towards target at consistent speed
            const moveDistance = enemy.speed * (deltaTime / 1000) * 60; // Convert to pixels per second
            const normalizedX = dx / distance;
            const normalizedY = dy / distance;
            
            enemy.position.x += normalizedX * moveDistance;
            enemy.position.y += normalizedY * moveDistance;
          }
        } else {
          // Enemy has reached the end
          newState.lives--;
          enemy.isDead = true;
        }

        return enemy;
      });

      // Remove dead enemies (either killed or reached end)
      newState.enemies = newState.enemies.filter(enemy => !enemy.isDead);

      // Update towers and create projectiles
      newState.towers.forEach(tower => {
        if (currentTime - tower.lastAttack > (1000 / tower.attackSpeed)) {
          // Find nearest alive enemy in range
          const enemiesInRange = newState.enemies.filter(enemy => {
            if (enemy.isDead || enemy.health <= 0) return false;
            
            const dx = enemy.position.x - tower.position.x;
            const dy = enemy.position.y - tower.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= tower.range;
          });

          if (enemiesInRange.length > 0) {
            // Target the enemy that's furthest along the path
            const target = enemiesInRange.reduce((furthest, current) => 
              current.pathIndex > furthest.pathIndex ? current : furthest
            );

            const projectile: Projectile = {
              id: generateId(),
              position: { ...tower.position },
              target,
              damage: tower.damage,
              speed: 200, // Reduced speed for better visibility
              towerId: tower.id
            };

            newState.projectiles.push(projectile);
            tower.lastAttack = currentTime;
          }
        }
      });

      // Update projectiles
      newState.projectiles = newState.projectiles.filter(projectile => {
        const target = newState.enemies.find(e => e.id === projectile.target.id);
        if (!target || target.isDead || target.health <= 0) {
          return false; // Remove projectile if target is dead
        }

        const dx = target.position.x - projectile.position.x;
        const dy = target.position.y - projectile.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 10) {
          // Hit target
          target.health -= projectile.damage;
          
          // Update tower stats
          const tower = newState.towers.find(t => t.id === projectile.towerId);
          if (tower) {
            tower.totalDamage += projectile.damage;
          }

          // Create hit effect
          particleSystemRef.current.createHitEffect(target.position);
          soundManager.playSound('enemy_hit');

          if (target.health <= 0) {
            target.isDead = true;
            newState.gold += target.gold;
            // Score is now based on stars earned from killing enemies (1 star per enemy killed)
            newState.score += 1;
            
            // Update tower kill count
            if (tower) {
              tower.kills += 1;
            }

            // Create death effects
            particleSystemRef.current.createExplosion(target.position, '#FF4444');
            soundManager.playSound('enemy_death');
            
            particleSystemRef.current.createGoldEffect(target.position);
            
            // Play coin collection sound after a short delay
            setTimeout(() => {
              soundManager.playSound('coin_collect');
            }, 100);
          }
          return false; // Remove projectile
        } else {
          // Move projectile towards target at consistent speed
          const moveDistance = projectile.speed * (deltaTime / 1000); // Convert to pixels per second
          const normalizedX = dx / distance;
          const normalizedY = dy / distance;
          
          projectile.position.x += normalizedX * moveDistance;
          projectile.position.y += normalizedY * moveDistance;
          return true; // Keep projectile
        }
      });

      // Check if wave is complete (all enemies spawned AND no enemies left)
      if (newState.isPlaying && 
          newState.enemies.length === 0 && 
          enemiesSpawnedRef.current >= totalEnemiesInWaveRef.current &&
          totalEnemiesInWaveRef.current > 0) {
        const currentWave = WAVES[newState.wave - 1];
        if (currentWave) {
          console.log(`🎉 Wave ${newState.wave} completed! Preparing Wave ${newState.wave + 1}`);
          console.log(`🔍 DEBUG: Current wave: ${newState.wave}, Total waves: ${WAVES.length}`);
          newState.gold += currentWave.reward;
          newState.wave++;
          newState.isPlaying = false;
          
          // Clear any remaining projectiles
          newState.projectiles = [];
          
          // Reset enemy counters for next wave
          enemiesSpawnedRef.current = 0;
          totalEnemiesInWaveRef.current = 0;
          
          // Update world progress
          worldManager.updateWorldProgress(newState.wave - 1);
          
          // Check if this was the last wave (wave 10)
          if (newState.wave > WAVES.length) {
            // Player won the game after completing all 10 waves!
            newState.isPaused = true;
            soundManager.playSound('victory');
            console.log(`🎉 VICTORY! Player completed all ${WAVES.length} waves!`);
          } else {
            // Wave completed, need to show wave control for next wave
            console.log(`🎯 Wave ${newState.wave - 1} completed, will show wave control for Wave ${newState.wave}`);
            
            // Auto-switch world if needed for next wave
            worldManager.autoSwitchWorldForWave(newState.wave);
          }
        }
      }

      // Update special attack cooldowns
      newState.specialAttacks = newState.specialAttacks.map(attack => ({
        ...attack,
        currentCooldown: Math.max(0, attack.currentCooldown - deltaTime)
      }));

      // Update particle system
      particleSystemRef.current.update(deltaTime);

      // Check game over
      if (newState.lives <= 0) {
        newState.isPlaying = false;
        newState.isPaused = true;
        soundManager.playSound('game_over');
      }

        return newState;
      } catch (error) {
        console.error('❌ Error in game update loop:', error);
        return prev; // Return previous state on error to prevent crash
      }
    });
  }, [getCurrentPath, worldManager]);

  // Game loop
  useEffect(() => {
    const gameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      
      if (deltaTime > 16) { // ~60 FPS
        // Apply game speed multiplier to deltaTime
        const adjustedDeltaTime = deltaTime * gameState.gameSpeed;
        updateGame(adjustedDeltaTime);
        lastTimeRef.current = currentTime;
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [updateGame, gameState.gameSpeed]);



  const togglePause = useCallback(() => {
    setGameState(prev => {
      const newPaused = !prev.isPaused;
      
      // Control background music based on pause state
      if (newPaused) {
        soundManager.pauseBackgroundMusic();
      } else {
        soundManager.resumeBackgroundMusic();
      }
      
      return { ...prev, isPaused: newPaused };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
    setSpecialAttackEffects([]);
    enemiesSpawnedRef.current = 0;
    totalEnemiesInWaveRef.current = 0;
    
    // Stop any background music when game resets
    soundManager.stopBackgroundMusic();
    console.log('🔄 Game reset - background music stopped');
  }, []);

  const retryGame = useCallback(() => {
    // Reset to initial state
    setGameState(INITIAL_STATE);
    setSpecialAttackEffects([]);
    enemiesSpawnedRef.current = 0;
    totalEnemiesInWaveRef.current = 0;
    
    // Stop any background music
    soundManager.stopBackgroundMusic();
    
    console.log('🔄 Game retried');
  }, []);

  const quitGame = useCallback(() => {
    // Reset to initial state but don't auto-start
    setGameState(INITIAL_STATE);
    setSpecialAttackEffects([]);
    enemiesSpawnedRef.current = 0;
    totalEnemiesInWaveRef.current = 0;
    
    // Stop any background music
    soundManager.stopBackgroundMusic();
    console.log('🔄 Game quit - returned to initial state');
  }, []);

  const handleEffectComplete = useCallback((effectId: string) => {
    setSpecialAttackEffects(prev => prev.filter(effect => effect.id !== effectId));
  }, []);

  const useSpecialAttack = useCallback((attackId: string, position?: { x: number; y: number }) => {
    setGameState(prev => {
      const attack = prev.specialAttacks.find(a => a.id === attackId);
      if (!attack || attack.currentCooldown > 0) {
        return prev;
      }

      const newState = { ...prev };
      
      // Start cooldown (no cost since they're free now)
      newState.specialAttacks = newState.specialAttacks.map(a => 
        a.id === attackId 
          ? { ...a, currentCooldown: a.cooldown }
          : a
      );

      const targetPosition = position || { x: 450, y: 300 }; // Default to center if no position
      console.log(`🎯 SPECIAL ATTACK DEBUG - useSpecialAttack called with position:`, position);
      console.log(`🎯 SPECIAL ATTACK DEBUG - Using target position:`, targetPosition);

      if (attackId === 'peanuts') {
        // Create simple peanut splash effect
        const peanutEffect = {
          id: `peanut_effect_${Date.now()}`,
          type: 'peanuts' as const,
          x: targetPosition.x,
          y: targetPosition.y,
          startTime: Date.now()
        };
        console.log(`🎯 SPECIAL ATTACK DEBUG - Created peanut effect at:`, peanutEffect);
        setSpecialAttackEffects(prev => [...prev, peanutEffect]);

        // Peanuts: Stun enemies in target area for 3 seconds
        const affectedEnemies: string[] = [];
        
        newState.enemies = newState.enemies.map(enemy => {
          const dx = enemy.position.x - targetPosition.x;
          const dy = enemy.position.y - targetPosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance <= attack.radius) {
            affectedEnemies.push(enemy.id);
            return {
              ...enemy,
              speed: enemy.speed * 0.1 // Slow to 10% speed for stun effect
            };
          }
          return enemy;
        });

        // Peanut effect is now handled by the simple emoji splash system
        
        // Play special attack voice line for Peanuts
        soundManager.playSpecialAttackAudio('peanuts', 0.8).catch(error => {
          console.warn('⚠️ Peanuts voice failed, using sound effect:', error.message || error);
          soundManager.playSound('special_attack'); // Fallback
        });

        // Reset enemy speeds after 3 seconds
        setTimeout(() => {
          setGameState(current => ({
            ...current,
            enemies: current.enemies.map(enemy => 
              affectedEnemies.includes(enemy.id)
                ? { ...enemy, speed: enemy.speed / 0.1 } // Restore original speed
                : enemy
            )
          }));
        }, 3000);

      } else if (attackId === 'shirt_rip') {
        // Create simple shirt splash effect
        const shirtEffect = {
          id: `shirt_effect_${Date.now()}`,
          type: 'shirt' as const,
          x: targetPosition.x,
          y: targetPosition.y,
          startTime: Date.now()
        };
        console.log(`🎯 SPECIAL ATTACK DEBUG - Created shirt effect at:`, shirtEffect);
        setSpecialAttackEffects(prev => [...prev, shirtEffect]);

        // Shirt Rip: Area damage to enemies in target location
        newState.enemies = newState.enemies.map(enemy => {
          const dx = enemy.position.x - targetPosition.x;
          const dy = enemy.position.y - targetPosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance <= attack.radius) {
            const newEnemy = { ...enemy };
            newEnemy.health -= attack.damage;
            
            if (newEnemy.health <= 0) {
              newEnemy.isDead = true;
              newState.gold += newEnemy.gold;
              // Score is now based on stars earned from killing enemies (1 star per enemy killed)
              newState.score += 1;
              
              // Create death effects
              particleSystemRef.current.createExplosion(newEnemy.position, '#FF4444');
              particleSystemRef.current.createGoldEffect(newEnemy.position);
            } else {
              // Create damage effect
              particleSystemRef.current.createHitEffect(newEnemy.position);
            }
            
            return newEnemy;
          }
          return enemy;
        });

        // Shirt effect is now handled by the simple emoji splash system
        
        // Play special attack voice line for Shirt
        soundManager.playSpecialAttackAudio('shirt', 0.8).catch(error => {
          console.warn('⚠️ Shirt voice failed, using sound effect:', error.message || error);
          soundManager.playSound('special_attack'); // Fallback
        });
      }

      return newState;
    });
  }, []);

  const selectTower = useCallback((tower: Tower | undefined) => {
    setGameState(prev => ({ ...prev, selectedTower: tower }));
  }, []);

  const setPlacingTowerType = useCallback((type: TowerType | undefined) => {
    setGameState(prev => ({ ...prev, placingTowerType: type }));
  }, []);

  const changeGameSpeed = useCallback(() => {
    setGameState(prev => {
      const speeds = [1, 1.5, 2, 3];
      const currentIndex = speeds.indexOf(prev.gameSpeed);
      const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
      return { ...prev, gameSpeed: nextSpeed };
    });
  }, []);

  const toggleMusic = useCallback(() => {
    setGameState(prev => {
      const newMusicMuted = !prev.isMusicMuted;
      soundManager.setMusicMuted(newMusicMuted);
      
      // Note: Background music is disabled due to missing audio file
      // This prevents auto-play errors
      console.log(`🎵 Music ${newMusicMuted ? 'muted' : 'unmuted'} (background music disabled)`);
      
      return { ...prev, isMusicMuted: newMusicMuted };
    });
  }, []);

  const toggleSoundFx = useCallback(() => {
    setGameState(prev => {
      const newSoundFxMuted = !prev.isSoundFxMuted;
      soundManager.setSoundFxMuted(newSoundFxMuted);
      
      return { ...prev, isSoundFxMuted: newSoundFxMuted };
    });
  }, []);

  // Legacy method for backward compatibility
  const toggleSound = useCallback(() => {
    setGameState(prev => {
      const newMuted = !prev.isMusicMuted; // Use music state as primary
      soundManager.setMuted(newMuted);
      
      // Note: Background music is disabled due to missing audio file
      console.log(`🔊 Sound ${newMuted ? 'muted' : 'unmuted'} (background music disabled)`);
      
      return { ...prev, isMusicMuted: newMuted, isSoundFxMuted: newMuted };
    });
  }, []);

  // Expose particle system for rendering
  const getParticleSystem = useCallback(() => {
    return particleSystemRef.current;
  }, []);

  return {
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
    toggleSound, // Legacy method
    getParticleSystem,
    useSpecialAttack,
    worldManager
  };
};