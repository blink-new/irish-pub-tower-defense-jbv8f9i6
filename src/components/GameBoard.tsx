import React, { useRef, useEffect, useCallback, useState } from 'react';
import { GameState, Position, TowerType } from '../types/game';
import { GAME_PATH, GRID_SIZE, GAME_WIDTH, GAME_HEIGHT } from '../data/gameConfig';
import { TowerUpgradePopup } from './TowerUpgradePopup';
import { SpecialAttacks } from './SpecialAttacks';
import { TopRightControls } from './TopRightControls';
import { TopLeftStatus } from './TopLeftStatus';
import { PauseMenu } from './PauseMenu';

import { SpecialAttackEffect } from '../utils/specialAttackEffects';
import { TowerIcon, EnemyIcon } from './TowerIcons';
import { drawMapDecorations } from './MapDecorations';
import { drawEnhancedMapBackground } from './EnhancedMapBackground';
import { drawNaturalMapBorder } from './NaturalMapBorder';
import { drawWorld2Background, drawWorld2Decorations, drawWorld2TowerPads, WORLD2_ENEMY_PATH, WORLD2_TOWER_PADS, findNearestWorld2PlacementPad, isValidWorld2PlacementPosition } from './World2Renderer';
import { drawEnhancedTowerIcon, drawEnhancedEnemyIcon } from './EnhancedTowerGraphics';
import { drawEnhancedEnemyIcon as drawRealmDefenseEnemySprite } from './EnhancedEnemySprites';
import { AnimatedSmokeSystem } from './AnimatedSmoke';
import { 
  drawTowerPlacementPads, 
  findNearestPlacementPad, 
  isValidPlacementPosition,
  TOWER_PLACEMENT_PADS 
} from './TowerPlacementPads';

interface GameBoardProps {
  gameState: GameState;
  specialAttackEffects: SpecialAttackEffect[];
  onEffectComplete: (effectId: string) => void;
  onTowerPlace: (position: Position, type: TowerType) => boolean;
  onTowerSelect: (towerId: string | undefined) => void;
  onUpgradeTower: (towerId: string) => void;
  onSellTower: (towerId: string) => void;
  onUseSpecialAttack: (attackId: string, position?: { x: number; y: number }) => void;
  onTogglePause: () => void;
  onChangeGameSpeed: () => void;
  onToggleMusic: () => void;
  onToggleSoundFx: () => void;
  onRetryGame: () => void;
  onQuitGame: () => void;
  particleSystem?: any;
  onShowFlashMessage?: (message: string) => void;
  worldManager: any; // World manager for theme switching
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  specialAttackEffects,
  onEffectComplete,
  onTowerPlace,
  onTowerSelect,
  onUpgradeTower,
  onSellTower,
  onUseSpecialAttack,
  onTogglePause,
  onChangeGameSpeed,
  onToggleMusic,
  onToggleSoundFx,
  onRetryGame,
  onQuitGame,
  particleSystem,
  onShowFlashMessage,
  worldManager
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const paddyImageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  
  // Animated smoke systems
  const smokeSystems = useRef<AnimatedSmokeSystem[]>([]);
  const lastAnimationTime = useRef<number>(0);

  // Flash message handler
  const showFlashMessage = useCallback((message: string) => {
    setFlashMessage(message);
    // Clear the message after 3 seconds
    setTimeout(() => {
      setFlashMessage(null);
    }, 3000);
  }, []);

  // Expose flash message function globally for useGameState hook to access
  useEffect(() => {
    (window as any).showFlashMessage = showFlashMessage;
    return () => {
      delete (window as any).showFlashMessage;
    };
  }, [showFlashMessage]);

  // Preload Paddy Losty image and initialize component
  useEffect(() => {
    const img = new Image();
    img.src = '/paddy-losty.jpg';
    img.onload = () => {
      paddyImageRef.current = img;
      setImageLoadError(false);
      setIsInitialized(true);
    };
    img.onerror = (error) => {
      console.warn('Paddy Losty image failed to load, using fallback:', error);
      setImageLoadError(true);
      paddyImageRef.current = null;
      setIsInitialized(true); // Still initialize even if image fails
    };
  }, []);

  // Initialize smoke systems when canvas is ready
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInitialized) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear existing smoke systems
    smokeSystems.current = [];

    // Only create smoke systems for Irish Countryside world (not City Pub world)
    const currentWorld = worldManager.getCurrentWorld();
    if (currentWorld.background.type !== 'city') {
      // Create smoke systems for various chimneys in Irish Countryside
      // Main pub chimney (Paddy's Pub) - bigger and more prominent
      smokeSystems.current.push(new AnimatedSmokeSystem(ctx, 840 + 22, 280 - 80/2 - 22));
      
      // Cottage chimneys - smaller smoke
      const cottagePositions = [
        { x: 60, y: 200 },
        { x: 180, y: 250 },
        { x: 420, y: 300 },
        { x: 650, y: 320 },
        { x: 800, y: 180 }
      ];
      
      cottagePositions.forEach(pos => {
        smokeSystems.current.push(new AnimatedSmokeSystem(ctx, pos.x + 11, pos.y - 22));
      });
    }
    // City Pub world has no smoke systems - no cottages, no smoke

  }, [isInitialized, worldManager]);

  // Custom drawing functions for better graphics
  const drawTowerIcon = useCallback((ctx: CanvasRenderingContext2D, type: string, x: number, y: number, level: number) => {
    const size = 12 + (level - 1) * 2;
    
    switch (type) {
      case 'paddy-losty': {
        // Create circular clipping path for the image
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.clip();
        
        // Draw the Paddy Losty image if it's loaded and valid
        if (paddyImageRef.current && paddyImageRef.current.complete && paddyImageRef.current.naturalWidth > 0 && !imageLoadError) {
          try {
            ctx.drawImage(paddyImageRef.current, x - size, y - size, size * 2, size * 2);
          } catch (error) {
            console.warn('Error drawing Paddy Losty image, using fallback:', error);
            // Fallback to beer mug if image drawing fails
            drawBeerMugFallback();
          }
        } else {
          drawBeerMugFallback();
        }
        
        function drawBeerMugFallback() {
          // Fallback to beer mug if image isn't loaded
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(x - size/2, y - size/2, size, size * 1.2);
          ctx.fillStyle = '#FFFACD';
          ctx.fillRect(x - size/2, y - size/2, size, size/3);
        }
        
        ctx.restore();
        
        // Add border
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
        
      case 'maureen': {
        // Frying pan with sausages
        ctx.fillStyle = '#2C2C2C';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        // Sausages
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - size/2, y - 2, size, 4);
        ctx.fillRect(x - size/3, y - size/2, 3, size);
        break;
      }
        
      case 'fiddler': {
        // Prime Mutton - meat cut
        ctx.fillStyle = '#CD5C5C';
        ctx.beginPath();
        ctx.ellipse(x, y, size, size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        // Marbling
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - size/2, y);
        ctx.lineTo(x + size/2, y);
        ctx.stroke();
        // Bone
        ctx.fillStyle = '#F5F5DC';
        ctx.fillRect(x - size/4, y - size, 2, size/2);
        break;
      }
        
      case 'leprechaun': {
        // Four-leaf clover
        ctx.fillStyle = '#228B22';
        const leafSize = size / 3;
        ctx.beginPath();
        ctx.arc(x - leafSize/2, y - leafSize/2, leafSize, 0, Math.PI * 2);
        ctx.arc(x + leafSize/2, y - leafSize/2, leafSize, 0, Math.PI * 2);
        ctx.arc(x - leafSize/2, y + leafSize/2, leafSize, 0, Math.PI * 2);
        ctx.arc(x + leafSize/2, y + leafSize/2, leafSize, 0, Math.PI * 2);
        ctx.fill();
        // Stem
        ctx.fillStyle = '#228B22';
        ctx.fillRect(x - 1, y + leafSize, 2, leafSize);
        break;
      }
    }
  }, [imageLoadError]);

  const drawEnemyIcon = useCallback((ctx: CanvasRenderingContext2D, type: string, x: number, y: number) => {
    const size = 8;
    
    switch (type) {
      case 'goblin':
        // Goblin head with horns
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(x - 3, y - 2, 1, 0, Math.PI * 2);
        ctx.arc(x + 3, y - 2, 1, 0, Math.PI * 2);
        ctx.fill();
        // Horns
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 4, y - 6);
        ctx.lineTo(x - 6, y - 10);
        ctx.moveTo(x + 4, y - 6);
        ctx.lineTo(x + 6, y - 10);
        ctx.stroke();
        break;
        
      case 'banshee':
        // Ghostly figure
        ctx.fillStyle = 'rgba(230, 230, 250, 0.9)';
        ctx.beginPath();
        ctx.arc(x, y - 2, size, 0, Math.PI * 2);
        ctx.fill();
        // Flowing bottom
        ctx.beginPath();
        ctx.moveTo(x - size, y + 2);
        ctx.quadraticCurveTo(x - size/2, y + size, x, y + 2);
        ctx.quadraticCurveTo(x + size/2, y + size, x + size, y + 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(x - 2, y - 4, 1, 0, Math.PI * 2);
        ctx.arc(x + 2, y - 4, 1, 0, Math.PI * 2);
        ctx.fill();
        break;
        
      case 'troll':
        // Large troll body
        ctx.fillStyle = '#556B2F';
        ctx.beginPath();
        ctx.arc(x, y, size * 1.2, 0, Math.PI * 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#FF4500';
        ctx.beginPath();
        ctx.arc(x - 3, y - 2, 1, 0, Math.PI * 2);
        ctx.arc(x + 3, y - 2, 1, 0, Math.PI * 2);
        ctx.fill();
        // Tusks
        ctx.strokeStyle = '#FFFACD';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 2, y + 2);
        ctx.lineTo(x - 4, y + 6);
        ctx.moveTo(x + 2, y + 2);
        ctx.lineTo(x + 4, y + 6);
        ctx.stroke();
        break;
        
      case 'dragon':
        // Dragon with wings
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.ellipse(x, y, size * 1.3, size, 0, 0, Math.PI * 2);
        ctx.fill();
        // Wings
        ctx.fillStyle = 'rgba(101, 67, 33, 0.8)';
        ctx.beginPath();
        ctx.ellipse(x - size, y - 2, size/2, size, Math.PI/4, 0, Math.PI * 2);
        ctx.ellipse(x + size, y - 2, size/2, size, -Math.PI/4, 0, Math.PI * 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x - 2, y - 2, 1, 0, Math.PI * 2);
        ctx.arc(x + 2, y - 2, 1, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
  }, []);

  const drawPath = useCallback((ctx: CanvasRenderingContext2D) => {
    // Get current world to determine which path to use
    const currentWorld = worldManager.getCurrentWorld();
    const currentPath = currentWorld.id === 'city-pub' ? WORLD2_ENEMY_PATH : GAME_PATH;
    
    // Draw path shadow first (subtle depth)
    ctx.strokeStyle = 'rgba(139, 69, 19, 0.3)';
    ctx.lineWidth = 46;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(currentPath[0].x + 2, currentPath[0].y + 2);
    
    for (let i = 1; i < currentPath.length; i++) {
      ctx.lineTo(currentPath[i].x + 2, currentPath[i].y + 2);
    }
    
    ctx.stroke();

    // Draw main path with Realm Defense colors
    const pathGradient = ctx.createLinearGradient(0, 0, GAME_WIDTH, GAME_HEIGHT);
    pathGradient.addColorStop(0, '#F5DEB3');    // Wheat - light sandy color
    pathGradient.addColorStop(0.3, '#DEB887');  // Burlywood - medium tone
    pathGradient.addColorStop(0.7, '#D2B48C');  // Tan - main path color
    pathGradient.addColorStop(1, '#BC9A6A');    // Slightly darker tan
    
    ctx.strokeStyle = pathGradient;
    ctx.lineWidth = 42;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(currentPath[0].x, currentPath[0].y);
    
    for (let i = 1; i < currentPath.length; i++) {
      ctx.lineTo(currentPath[i].x, currentPath[i].y);
    }
    
    ctx.stroke();

    // Add organic edge variations (like Realm Defense)
    ctx.strokeStyle = '#C19A6B';
    ctx.lineWidth = 38;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Use seeded random for consistent organic edges
    let edgeSeed = 54321;
    const edgeRandom = () => {
      edgeSeed = (edgeSeed * 9301 + 49297) % 233280;
      return edgeSeed / 233280;
    };
    
    ctx.beginPath();
    ctx.moveTo(currentPath[0].x, currentPath[0].y);
    
    for (let i = 1; i < currentPath.length; i++) {
      // Add slight organic variation to path edges
      const variation = (edgeRandom() - 0.5) * 3;
      ctx.lineTo(currentPath[i].x + variation, currentPath[i].y + variation);
    }
    
    ctx.stroke();
    
    // Add subtle dirt texture (minimal, not cluttered)
    const dirtColors = ['#D2B48C', '#C19A6B', '#B8860B', '#CD853F'];
    
    // Use seeded random for consistent dirt placement
    let dirtSeed = 24680;
    const dirtRandom = () => {
      dirtSeed = (dirtSeed * 9301 + 49297) % 233280;
      return dirtSeed / 233280;
    };
    
    for (let i = 0; i < currentPath.length - 1; i++) {
      const start = currentPath[i];
      const end = currentPath[i + 1];
      const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const segments = Math.floor(distance / 25); // Less dense than before
      
      for (let j = 0; j < segments; j++) {
        const t = j / segments;
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        
        // Draw subtle dirt patches (smaller and fewer)
        if (dirtRandom() > 0.7) { // Only 30% chance for dirt patch
          const patchSize = 2 + dirtRandom() * 3;
          const offsetX = (dirtRandom() - 0.5) * 15;
          const offsetY = (dirtRandom() - 0.5) * 15;
          
          const colorIndex = Math.floor(dirtRandom() * dirtColors.length);
          ctx.fillStyle = dirtColors[colorIndex];
          ctx.globalAlpha = 0.4;
          
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, patchSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    
    ctx.globalAlpha = 1.0;
    
    // Add organic grass edges (like Realm Defense)
    const grassColors = ['#7CB342', '#689F38', '#558B2F'];
    
    // Use seeded random for consistent grass placement
    let grassSeed = 97531;
    const grassRandom = () => {
      grassSeed = (grassSeed * 9301 + 49297) % 233280;
      return grassSeed / 233280;
    };
    
    for (let i = 0; i < currentPath.length - 1; i++) {
      const start = currentPath[i];
      const end = currentPath[i + 1];
      const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const segments = Math.floor(distance / 20);
      
      for (let j = 0; j < segments; j++) {
        const t = j / segments;
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        
        // Calculate perpendicular direction for grass on sides
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const perpX = -dy / length;
        const perpY = dx / length;
        
        // Draw organic grass tufts on both sides (like Realm Defense)
        for (let side = -1; side <= 1; side += 2) {
          if (grassRandom() > 0.6) { // Only 40% chance for grass tuft
            const grassX = x + perpX * side * (21 + grassRandom() * 4);
            const grassY = y + perpY * side * (21 + grassRandom() * 4);
            
            const colorIndex = Math.floor(grassRandom() * grassColors.length);
            ctx.fillStyle = grassColors[colorIndex];
            ctx.globalAlpha = 0.7;
            
            // Draw small organic grass clump
            const clumpSize = 2 + grassRandom() * 2;
            ctx.beginPath();
            ctx.arc(grassX, grassY, clumpSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Add a few grass blades
            ctx.strokeStyle = grassColors[colorIndex];
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.5;
            
            for (let blade = 0; blade < 3; blade++) {
              const bladeX = grassX + (grassRandom() - 0.5) * 4;
              const bladeY = grassY + (grassRandom() - 0.5) * 4;
              
              ctx.beginPath();
              ctx.moveTo(bladeX, bladeY);
              ctx.lineTo(bladeX + (grassRandom() - 0.5) * 2, bladeY - 2 - grassRandom() * 3);
              ctx.stroke();
            }
          }
        }
      }
    }
    
    ctx.globalAlpha = 1.0;
  }, [worldManager]);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    for (let x = 0; x <= GAME_WIDTH; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, GAME_HEIGHT);
      ctx.stroke();
    }

    for (let y = 0; y <= GAME_HEIGHT; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(GAME_WIDTH, y);
      ctx.stroke();
    }
  }, []);

  const drawTowers = useCallback((ctx: CanvasRenderingContext2D) => {
    gameState.towers.forEach(tower => {
      // Draw tower shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(tower.position.x + 2, tower.position.y + 2, 32, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw tower base with enhanced styling
      const baseSize = 30 + (tower.level - 1) * 3; // Match the placement preview ring size
      
      // Create gradient for tower base
      const gradient = ctx.createRadialGradient(
        tower.position.x - 5, tower.position.y - 5, 0,
        tower.position.x, tower.position.y, baseSize
      );
      
      if (tower.level > 2) {
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(0.7, '#FFA500');
        gradient.addColorStop(1, '#FF8C00');
      } else if (tower.level > 1) {
        gradient.addColorStop(0, '#32CD32');
        gradient.addColorStop(0.7, '#228B22');
        gradient.addColorStop(1, '#006400');
      } else {
        gradient.addColorStop(0, '#90EE90');
        gradient.addColorStop(0.7, '#32CD32');
        gradient.addColorStop(1, '#228B22');
      }
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.arc(tower.position.x, tower.position.y, baseSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Add decorative ring
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tower.position.x, tower.position.y, baseSize - 5, 0, Math.PI * 2);
      ctx.stroke();

      // Draw level indicator for upgraded towers
      if (tower.level > 1) {
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        ctx.font = 'bold 10px Celtic Hand, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw level badge with Celtic styling
        ctx.beginPath();
        ctx.arc(tower.position.x + 18, tower.position.y - 18, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add decorative border
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(tower.position.x + 18, tower.position.y - 18, 8, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = '#8B4513';
        ctx.fillText(tower.level.toString(), tower.position.x + 18, tower.position.y - 18);
      }

      // Draw enhanced tower icon
      drawEnhancedTowerIcon(ctx, tower.type, tower.position.x, tower.position.y, tower.level, paddyImageRef.current || undefined);

      // Draw range if selected with enhanced styling
      if (gameState.selectedTower?.id === tower.id) {
        // Outer range circle
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.lineWidth = 4;
        ctx.setLineDash([8, 4]);
        ctx.beginPath();
        ctx.arc(tower.position.x, tower.position.y, tower.range, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner range circle
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 2]);
        ctx.beginPath();
        ctx.arc(tower.position.x, tower.position.y, tower.range - 5, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.setLineDash([]);
        
        // Add pulsing effect
        const pulseRadius = tower.range + Math.sin(Date.now() * 0.005) * 5;
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(tower.position.x, tower.position.y, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  }, [gameState.towers, gameState.selectedTower]);

  const drawEnemies = useCallback((ctx: CanvasRenderingContext2D) => {
    gameState.enemies.forEach(enemy => {
      if (enemy.isDead || enemy.health <= 0) return;

      // Draw Realm Defense style enemy sprite (includes shadow and styling)
      drawRealmDefenseEnemySprite(ctx, enemy.type, enemy.position.x, enemy.position.y, enemy.health, enemy.maxHealth);

      // Draw enhanced health bar for enemies
      const barWidth = 32;
      const barHeight = 5;
      const healthPercent = Math.max(0, enemy.health / enemy.maxHealth);
      
      // Health bar background
      ctx.fillStyle = '#2F2F2F';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.fillRect(
        enemy.position.x - barWidth / 2,
        enemy.position.y - 28,
        barWidth,
        barHeight
      );
      ctx.strokeRect(
        enemy.position.x - barWidth / 2,
        enemy.position.y - 28,
        barWidth,
        barHeight
      );
      
      // Health bar fill with gradient
      const healthGradient = ctx.createLinearGradient(
        enemy.position.x - barWidth / 2, 0,
        enemy.position.x + barWidth / 2, 0
      );
      
      if (healthPercent > 0.6) {
        healthGradient.addColorStop(0, '#00FF00');
        healthGradient.addColorStop(1, '#32CD32');
      } else if (healthPercent > 0.3) {
        healthGradient.addColorStop(0, '#FFD700');
        healthGradient.addColorStop(1, '#FFA500');
      } else {
        healthGradient.addColorStop(0, '#FF4500');
        healthGradient.addColorStop(1, '#FF0000');
      }
      
      ctx.fillStyle = healthGradient;
      ctx.fillRect(
        enemy.position.x - barWidth / 2,
        enemy.position.y - 28,
        barWidth * healthPercent,
        barHeight
      );
      
      // Add health bar shine effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(
        enemy.position.x - barWidth / 2,
        enemy.position.y - 28,
        barWidth * healthPercent,
        2
      );
    });
  }, [gameState.enemies]);

  const drawSpecialAttackSplashes = useCallback((ctx: CanvasRenderingContext2D) => {
    specialAttackEffects.forEach(effect => {
      const age = Date.now() - effect.startTime;
      const maxAge = 1500; // 1.5 seconds total duration
      
      if (age > maxAge) {
        // Clean up expired effects
        onEffectComplete(effect.id);
        return;
      }
      
      // Calculate expansion and fade
      const expansionPhase = Math.min(1, age / 500); // Expand over first 500ms
      const fadeAlpha = Math.max(0, 1 - (age / maxAge));
      
      if (effect.type === 'peanuts') {
        // Simple peanut emoji splash
        const peanutCount = 8;
        const maxRadius = 60; // Smaller, contained radius
        const currentRadius = expansionPhase * maxRadius;
        
        for (let i = 0; i < peanutCount; i++) {
          const angle = (i / peanutCount) * Math.PI * 2;
          const distance = currentRadius;
          const x = effect.x + Math.cos(angle) * distance;
          const y = effect.y + Math.sin(angle) * distance;
          
          ctx.save();
          ctx.globalAlpha = fadeAlpha;
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🥜', x, y);
          ctx.restore();
        }
      } else if (effect.type === 'shirt') {
        // Simple shirt emoji splash
        const shirtCount = 6;
        const maxRadius = 70; // Smaller, contained radius
        const currentRadius = expansionPhase * maxRadius;
        
        for (let i = 0; i < shirtCount; i++) {
          const angle = (i / shirtCount) * Math.PI * 2;
          const distance = currentRadius;
          const x = effect.x + Math.cos(angle) * distance;
          const y = effect.y + Math.sin(angle) * distance;
          
          ctx.save();
          ctx.globalAlpha = fadeAlpha;
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('👕', x, y);
          ctx.restore();
        }
      }
    });
  }, [specialAttackEffects, onEffectComplete]);

  const drawProjectiles = useCallback((ctx: CanvasRenderingContext2D) => {
    gameState.projectiles.forEach(projectile => {
      // Find the tower that fired this projectile to determine projectile type
      const tower = gameState.towers.find(t => t.id === projectile.towerId);
      
      if (tower?.type === 'paddy-losty') {
        // Enhanced foam-topped pint glass projectile (Paddy Losty's pints)
        const glassWidth = 8;
        const glassHeight = 12;
        const x = projectile.position.x;
        const y = projectile.position.y;
        
        // Draw pint glass shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(x + 1, y + 1, glassWidth/2, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw pint glass body (slightly tapered like real pint glass)
        const glassGradient = ctx.createLinearGradient(x - glassWidth/2, y - glassHeight/2, x + glassWidth/2, y + glassHeight/2);
        glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        glassGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
        glassGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
        
        ctx.fillStyle = glassGradient;
        ctx.strokeStyle = '#C0C0C0';
        ctx.lineWidth = 1;
        
        // Pint glass shape (wider at top, narrower at bottom)
        ctx.beginPath();
        ctx.moveTo(x - glassWidth/2 - 1, y + glassHeight/2);
        ctx.lineTo(x - glassWidth/2, y - glassHeight/2);
        ctx.lineTo(x + glassWidth/2, y - glassHeight/2);
        ctx.lineTo(x + glassWidth/2 + 1, y + glassHeight/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw dark beer (Guinness-style stout)
        const beerGradient = ctx.createLinearGradient(x, y - glassHeight/2 + 2, x, y + glassHeight/2 - 2);
        beerGradient.addColorStop(0, '#2F1B14');  // Very dark brown
        beerGradient.addColorStop(0.8, '#1A0F0A'); // Almost black
        beerGradient.addColorStop(1, '#0D0706');   // Deep black
        
        ctx.fillStyle = beerGradient;
        ctx.beginPath();
        ctx.moveTo(x - glassWidth/2, y + glassHeight/2 - 1);
        ctx.lineTo(x - glassWidth/2 + 1, y - glassHeight/2 + 4);
        ctx.lineTo(x + glassWidth/2 - 1, y - glassHeight/2 + 4);
        ctx.lineTo(x + glassWidth/2, y + glassHeight/2 - 1);
        ctx.closePath();
        ctx.fill();
        
        // Draw creamy foam head (signature of a good pint)
        const foamGradient = ctx.createLinearGradient(x, y - glassHeight/2, x, y - glassHeight/2 + 4);
        foamGradient.addColorStop(0, '#FFFEF7');  // Pure cream white
        foamGradient.addColorStop(0.5, '#FFF8DC'); // Cream
        foamGradient.addColorStop(1, '#F5F5DC');   // Beige cream
        
        ctx.fillStyle = foamGradient;
        ctx.strokeStyle = '#E6E6FA';
        ctx.lineWidth = 0.5;
        
        // Foam head with slightly irregular top for realism
        ctx.beginPath();
        ctx.moveTo(x - glassWidth/2 + 1, y - glassHeight/2);
        ctx.lineTo(x + glassWidth/2 - 1, y - glassHeight/2);
        ctx.lineTo(x + glassWidth/2 - 1, y - glassHeight/2 + 4);
        ctx.lineTo(x - glassWidth/2 + 1, y - glassHeight/2 + 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Add foam texture with small bubbles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 4; i++) {
          const bubbleX = x - glassWidth/3 + (i * glassWidth/6);
          const bubbleY = y - glassHeight/2 + 1 + (Math.random() * 2);
          ctx.beginPath();
          ctx.arc(bubbleX, bubbleY, 0.3 + Math.random() * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Glass rim highlight for realism
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - glassWidth/2, y - glassHeight/2);
        ctx.lineTo(x + glassWidth/2, y - glassHeight/2);
        ctx.stroke();
        
        // Add motion blur effect for flying pint
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.ellipse(x - 3, y, glassWidth/3, glassHeight/4, 0, 0, Math.PI * 2);
        ctx.fill();
        
      } else if (tower?.type === 'maureen') {
        // Draw sausage projectile (Maureen's sausages)
        ctx.fillStyle = '#8B4513'; // Brown for sausage
        ctx.strokeStyle = '#654321'; // Darker brown outline
        ctx.lineWidth = 2;
        
        // Draw oval sausage shape
        ctx.beginPath();
        ctx.ellipse(projectile.position.x, projectile.position.y, 8, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add sausage texture lines
        ctx.strokeStyle = '#A0522D';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(projectile.position.x - 6, projectile.position.y);
        ctx.lineTo(projectile.position.x + 6, projectile.position.y);
        ctx.stroke();
      } else {
        // Default projectile for other towers
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#FFA500';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(projectile.position.x, projectile.position.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add a glowing effect
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(projectile.position.x, projectile.position.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  }, [gameState.projectiles, gameState.towers]);

  const draw = useCallback((currentTime?: number) => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

    // Get current world theme and renderer
    const currentWorld = worldManager.getCurrentWorld();
    
    // Draw world-specific content based on world type - COMPLETELY SEPARATE RENDERING
    if (currentWorld.id === 'irish-countryside') {
      // Irish Countryside gets: enhanced background + tree border + countryside decorations
      drawEnhancedMapBackground(ctx, GAME_WIDTH, GAME_HEIGHT);
      drawNaturalMapBorder(ctx, GAME_WIDTH, GAME_HEIGHT);
      drawMapDecorations(ctx);
    } else if (currentWorld.id === 'city-pub') {
      // City Pub gets: CLEAN SLATE - cobblestone background + only Paddy's Pub
      drawWorld2Background(ctx, GAME_WIDTH, GAME_HEIGHT);
      drawWorld2Decorations(ctx);
    }
    drawPath(ctx);
    
    // Draw tower placement pads based on current world
    const occupiedPositions = gameState.towers.map(tower => tower.position);
    if (currentWorld.id === 'city-pub') {
      drawWorld2TowerPads(ctx, occupiedPositions);
    } else {
      drawTowerPlacementPads(ctx, occupiedPositions);
    }
    
    drawTowers(ctx);
    drawEnemies(ctx);
    drawProjectiles(ctx);
    
    // Draw particles
    if (particleSystem) {
      particleSystem.draw(ctx);
    }

    // Draw special attack splash effects
    drawSpecialAttackSplashes(ctx);

    // Update and draw animated smoke systems
    if (currentTime && smokeSystems.current.length > 0) {
      smokeSystems.current.forEach((smokeSystem) => {
        smokeSystem.update(currentTime);
        smokeSystem.draw();
      });
    }

    // Draw placement preview
    if (gameState.placingTowerType) {
      ctx.font = '18px Celtic Hand, cursive';
      ctx.fillStyle = '#FFD700';
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw instruction text with Celtic styling in lower third of map
      const instructionY = GAME_HEIGHT * 0.75; // Position in lower third (75% down)
      ctx.strokeText('click on a high stool to place defender', GAME_WIDTH / 2, instructionY);
      ctx.fillText('click on a high stool to place defender', GAME_WIDTH / 2, instructionY);
      
      // Highlight available placement pads based on current world
      const currentPads = currentWorld.id === 'city-pub' ? WORLD2_TOWER_PADS : TOWER_PLACEMENT_PADS;
      currentPads.forEach(pad => {
        const isOccupied = gameState.towers.some(tower => {
          const distance = Math.sqrt(
            Math.pow(tower.position.x - pad.x, 2) + Math.pow(tower.position.y - pad.y, 2)
          );
          return distance < 40;
        });
        
        if (!isOccupied) {
          // Pulse effect for available pads
          const pulseAlpha = 0.3 + Math.sin(Date.now() * 0.005) * 0.2;
          ctx.strokeStyle = `rgba(255, 215, 0, ${pulseAlpha})`;
          ctx.lineWidth = 3;
          ctx.setLineDash([6, 3]);
          ctx.beginPath();
          ctx.arc(pad.x, pad.y, 30, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
      
      ctx.setLineDash([]);
    }

    // Draw flash message if active
    if (flashMessage) {
      ctx.save();
      
      // Create flashing effect
      const flashTime = Date.now() % 1000; // Flash cycle every 1 second
      const flashAlpha = 0.4 + Math.sin(flashTime * 0.006) * 0.6; // Oscillate between 0.4 and 1.0
      
      // Use the same font style as the tower placement instruction
      ctx.font = '24px Celtic Hand, cursive';
      ctx.fillStyle = `rgba(255, 215, 0, ${flashAlpha})`;
      ctx.strokeStyle = `rgba(139, 69, 19, ${flashAlpha})`;
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw the message in the center of the screen
      const messageX = GAME_WIDTH / 2;
      const messageY = GAME_HEIGHT / 2;
      
      ctx.strokeText(flashMessage, messageX, messageY);
      ctx.fillText(flashMessage, messageX, messageY);
      
      ctx.restore();
    }
    } catch (error) {
      console.error('❌ Error in canvas drawing:', error);
      // Continue without crashing - canvas will be blank but app remains functional
    }
  }, [worldManager, gameState, drawPath, drawTowers, drawEnemies, drawProjectiles, particleSystem, drawSpecialAttackSplashes, flashMessage]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Update canvas rect for overlay positioning
  useEffect(() => {
    const updateCanvasRect = () => {
      if (canvasRef.current) {
        setCanvasRect(canvasRef.current.getBoundingClientRect());
      }
    };

    updateCanvasRect();
    window.addEventListener('resize', updateCanvasRect);
    window.addEventListener('scroll', updateCanvasRect);

    return () => {
      window.removeEventListener('resize', updateCanvasRect);
      window.removeEventListener('scroll', updateCanvasRect);
    };
  }, []);

  // Animation loop for smoke and other animations
  useEffect(() => {
    let animationFrameId: number;
    
    const animate = (currentTime: number) => {
      draw(currentTime);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [draw]);

  // Pause menu handlers - Always show menu when pause button is clicked
  const handleTogglePause = useCallback(() => {
    // Always show the pause menu when pause button is clicked
    setShowPauseMenu(!showPauseMenu);
    
    // Only toggle game pause state if the game is actually playing
    if (gameState.isPlaying) {
      onTogglePause();
    }
  }, [gameState.isPlaying, showPauseMenu, onTogglePause]);

  const handleResume = useCallback(() => {
    setShowPauseMenu(false);
    if (gameState.isPaused) {
      onTogglePause();
    }
  }, [gameState.isPaused, onTogglePause]);

  const handleRetryLevel = useCallback(() => {
    setShowPauseMenu(false);
    onRetryGame();
  }, [onRetryGame]);

  const handleQuitLevel = useCallback(() => {
    setShowPauseMenu(false);
    onQuitGame();
  }, [onQuitGame]);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;



    if (gameState.placingTowerType) {
      // Get current world to determine which placement system to use
      const currentWorld = worldManager.getCurrentWorld();
      
      // Find nearest placement pad based on current world
      const nearestPad = currentWorld.id === 'city-pub' 
        ? findNearestWorld2PlacementPad({ x, y })
        : findNearestPlacementPad({ x, y });
      
      if (nearestPad) {
        // Check if the placement pad is valid (not occupied)
        const occupiedPositions = gameState.towers.map(tower => tower.position);
        const isValid = currentWorld.id === 'city-pub'
          ? isValidWorld2PlacementPosition(nearestPad, occupiedPositions)
          : isValidPlacementPosition(nearestPad, occupiedPositions);
        
        if (isValid) {
          try {
            const success = onTowerPlace(nearestPad, gameState.placingTowerType);
            if (!success) {
              console.warn('⚠️ Tower placement failed - insufficient gold or other issue');
            }
          } catch (error) {
            console.error('❌ Error placing tower:', error);
          }
        } else {
          console.log('❌ Placement pad is already occupied');
        }
      } else {
        console.log('❌ No placement pad nearby - click closer to a wooden platform');
      }
    } else {
      // Check if clicking on a tower
      const clickedTower = gameState.towers.find(tower => {
        const distance = Math.sqrt(
          Math.pow(x - tower.position.x, 2) + Math.pow(y - tower.position.y, 2)
        );

        return distance < 35; // Match the larger tower size
      });


      onTowerSelect(clickedTower?.id);
    }
  }, [gameState.placingTowerType, gameState.towers, onTowerPlace, onTowerSelect, worldManager]);

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="relative">
        <div 
          className="border-2 border-accent rounded-lg bg-background flex items-center justify-center"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2"></div>
            <p className="text-accent font-celtic">Loading the pub...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        onClick={handleCanvasClick}
        className="border-2 border-accent rounded-lg cursor-pointer bg-background"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Top Left Status - Gold, Lives, Wave, and Score */}
      <TopLeftStatus
        gold={gameState.gold}
        lives={gameState.lives}
        wave={gameState.wave}
        score={gameState.score}
      />
      
      {/* Top Right Controls - Realm Defense Style */}
      <TopRightControls
        isPlaying={gameState.isPlaying}
        isPaused={gameState.isPaused}
        gameSpeed={gameState.gameSpeed}
        onTogglePause={handleTogglePause}
        onChangeGameSpeed={onChangeGameSpeed}
      />
      
      {/* Tower Upgrade Popup */}
      {gameState.selectedTower && canvasRect && (
        <>
          <TowerUpgradePopup
            tower={gameState.selectedTower}
            gold={gameState.gold}
            onUpgrade={onUpgradeTower}
            onSell={onSellTower}
            onClose={() => onTowerSelect(undefined)}
            position={{
              x: canvasRect.left + gameState.selectedTower.position.x,
              y: canvasRect.top + gameState.selectedTower.position.y
            }}
          />
        </>
      )}
      
      {/* Debug info when tower is selected but no canvasRect */}
      {gameState.selectedTower && !canvasRect && (
        <></>
      )}
      
      {/* Special Attacks */}
      <SpecialAttacks
        specialAttacks={gameState.specialAttacks}
        gold={gameState.gold}
        isWaveActive={gameState.isPlaying}
        onUseSpecialAttack={onUseSpecialAttack}
        canvasRect={canvasRect || canvasRef.current?.getBoundingClientRect()}
      />
      
      {/* Pause Menu - Always accessible */}
      <PauseMenu
        isVisible={showPauseMenu}
        isMusicMuted={gameState.isMusicMuted}
        isSoundFxMuted={gameState.isSoundFxMuted}
        onResume={handleResume}
        onToggleMusic={onToggleMusic}
        onToggleSoundFx={onToggleSoundFx}
        onRetryLevel={handleRetryLevel}
        onQuitLevel={handleQuitLevel}
      />

    </div>
  );
};