import React, { useRef, useEffect, useCallback, useState } from 'react';
import { GameState, Position, TowerType } from '../types/game';
import { GAME_PATH, GRID_SIZE, GAME_WIDTH, GAME_HEIGHT } from '../data/gameConfig';
import { TowerUpgradeOverlay } from './TowerUpgradeOverlay';
import { SpecialAttacks } from './SpecialAttacks';
import { TowerIcon, EnemyIcon } from './TowerIcons';

import { drawEnhancedTowerIcon, drawEnhancedEnemyIcon } from './EnhancedTowerGraphics';
import { drawEnhancedMapBackground } from './EnhancedMapBackground';
import MapDecorations from './MapDecorations';
import { EnhancedEffects } from './EnhancedEffects';

interface GameBoardProps {
  gameState: GameState;
  onTowerPlace: (position: Position, type: TowerType) => boolean;
  onTowerSelect: (towerId: string | undefined) => void;
  onUpgradeTower: (towerId: string) => void;
  onUseSpecialAttack: (attackId: string, position?: { x: number; y: number }) => void;
  particleSystem?: any;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onTowerPlace,
  onTowerSelect,
  onUpgradeTower,
  onUseSpecialAttack,
  particleSystem
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);
  const paddyImageRef = useRef<HTMLImageElement | null>(null);

  // Preload Paddy Losty image
  useEffect(() => {
    const img = new Image();
    img.src = '/paddy-losty.jpg';
    img.onload = () => {
      paddyImageRef.current = img;
    };
  }, []);

  // Custom drawing functions for better graphics
  const drawTowerIcon = useCallback((ctx: CanvasRenderingContext2D, type: string, x: number, y: number, level: number) => {
    const size = 12 + (level - 1) * 2;
    
    switch (type) {
      case 'bartender': {
        // Draw circular background
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x, y, size + 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Create circular clipping path for the image
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.clip();
        
        // Draw the Paddy Losty image if it's loaded
        if (paddyImageRef.current) {
          ctx.drawImage(paddyImageRef.current, x - size, y - size, size * 2, size * 2);
        } else {
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
        
      case 'bouncer': {
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
  }, []);

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
    // Draw natural dirt path with embedded shadows and organic edges
    
    // First, draw the deepest shadow layer (embedded in ground)
    ctx.strokeStyle = 'rgba(101, 67, 33, 0.4)'; // Dark brown shadow
    ctx.lineWidth = 52;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(GAME_PATH[0].x, GAME_PATH[0].y);
    for (let i = 1; i < GAME_PATH.length; i++) {
      ctx.lineTo(GAME_PATH[i].x, GAME_PATH[i].y);
    }
    ctx.stroke();

    // Draw the main dirt path with varied earth tones
    const pathGradient = ctx.createLinearGradient(0, 0, 900, 600);
    pathGradient.addColorStop(0, '#8B4513');    // Saddle brown
    pathGradient.addColorStop(0.2, '#A0522D');  // Sienna
    pathGradient.addColorStop(0.4, '#CD853F');  // Peru
    pathGradient.addColorStop(0.6, '#D2B48C');  // Tan
    pathGradient.addColorStop(0.8, '#DEB887');  // Burlywood
    pathGradient.addColorStop(1, '#F5DEB3');    // Wheat
    
    ctx.strokeStyle = pathGradient;
    ctx.lineWidth = 46;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(GAME_PATH[0].x, GAME_PATH[0].y);
    for (let i = 1; i < GAME_PATH.length; i++) {
      ctx.lineTo(GAME_PATH[i].x, GAME_PATH[i].y);
    }
    ctx.stroke();

    // Add worn path center with lighter, compacted earth
    const centerGradient = ctx.createLinearGradient(0, 0, 900, 600);
    centerGradient.addColorStop(0, '#DEB887');  // Burlywood
    centerGradient.addColorStop(0.5, '#F5DEB3'); // Wheat
    centerGradient.addColorStop(1, '#FAEBD7');   // Antique white
    
    ctx.strokeStyle = centerGradient;
    ctx.lineWidth = 32;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(GAME_PATH[0].x, GAME_PATH[0].y);
    for (let i = 1; i < GAME_PATH.length; i++) {
      ctx.lineTo(GAME_PATH[i].x, GAME_PATH[i].y);
    }
    ctx.stroke();

    // Add natural path details and texture
    drawPathTexture(ctx);
    drawPathEdges(ctx);
    drawWheelMarks(ctx);
    drawPathPebbles(ctx);
    drawPathWear(ctx);
  }, []);

  // Draw natural path texture with varied dirt and compacted areas
  const drawPathTexture = (ctx: CanvasRenderingContext2D) => {
    const dirtColors = ['#8B4513', '#A0522D', '#CD853F', '#D2B48C', '#DEB887'];
    
    let textureSeed = 54321;
    const textureRandom = () => {
      textureSeed = (textureSeed * 9301 + 49297) % 233280;
      return textureSeed / 233280;
    };
    
    for (let i = 0; i < GAME_PATH.length - 1; i++) {
      const start = GAME_PATH[i];
      const end = GAME_PATH[i + 1];
      const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const segments = Math.floor(distance / 8);
      
      for (let j = 0; j < segments; j++) {
        const t = j / segments;
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        
        // Add varied dirt patches for natural texture
        if (textureRandom() < 0.3) {
          const patchSize = 2 + textureRandom() * 4;
          const offsetX = (textureRandom() - 0.5) * 20;
          const offsetY = (textureRandom() - 0.5) * 20;
          const colorIndex = Math.floor(textureRandom() * dirtColors.length);
          
          ctx.fillStyle = dirtColors[colorIndex];
          ctx.globalAlpha = 0.3 + textureRandom() * 0.4;
          ctx.beginPath();
          ctx.ellipse(x + offsetX, y + offsetY, patchSize, patchSize * 0.7, textureRandom() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1.0;
  };

  // Draw soft, faded edges that blend with grass
  const drawPathEdges = (ctx: CanvasRenderingContext2D) => {
    let edgeSeed = 13579;
    const edgeRandom = () => {
      edgeSeed = (edgeSeed * 9301 + 49297) % 233280;
      return edgeSeed / 233280;
    };
    
    for (let i = 0; i < GAME_PATH.length - 1; i++) {
      const start = GAME_PATH[i];
      const end = GAME_PATH[i + 1];
      const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const segments = Math.floor(distance / 10);
      
      for (let j = 0; j < segments; j++) {
        const t = j / segments;
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        
        // Calculate perpendicular direction for edge effects
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const perpX = -dy / length;
        const perpY = dx / length;
        
        // Draw faded grass edges that blend into path
        for (let side = -1; side <= 1; side += 2) {
          const edgeDistance = 20 + edgeRandom() * 8;
          const grassX = x + perpX * side * edgeDistance;
          const grassY = y + perpY * side * edgeDistance;
          
          // Faded grass transition
          const fadeGradient = ctx.createRadialGradient(grassX, grassY, 0, grassX, grassY, 8);
          fadeGradient.addColorStop(0, 'rgba(34, 139, 34, 0.6)');
          fadeGradient.addColorStop(0.5, 'rgba(34, 139, 34, 0.3)');
          fadeGradient.addColorStop(1, 'rgba(34, 139, 34, 0)');
          
          ctx.fillStyle = fadeGradient;
          ctx.beginPath();
          ctx.arc(grassX, grassY, 6 + edgeRandom() * 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Sparse grass blades at path edge
          if (edgeRandom() < 0.4) {
            ctx.strokeStyle = `rgba(34, 139, 34, ${0.3 + edgeRandom() * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(grassX, grassY);
            ctx.lineTo(grassX + (edgeRandom() - 0.5) * 4, grassY - 2 - edgeRandom() * 3);
            ctx.stroke();
          }
        }
      }
    }
  };

  // Draw wheel marks and cart tracks for realism
  const drawWheelMarks = (ctx: CanvasRenderingContext2D) => {
    let wheelSeed = 24680;
    const wheelRandom = () => {
      wheelSeed = (wheelSeed * 9301 + 49297) % 233280;
      return wheelSeed / 233280;
    };
    
    ctx.strokeStyle = 'rgba(101, 67, 33, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 6, 2, 6]);
    
    for (let track = 0; track < 2; track++) {
      const offset = track === 0 ? -8 : 8; // Left and right wheel tracks
      
      for (let i = 0; i < GAME_PATH.length - 1; i++) {
        const start = GAME_PATH[i];
        const end = GAME_PATH[i + 1];
        
        // Calculate perpendicular offset for wheel tracks
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const perpX = -dy / length;
        const perpY = dx / length;
        
        const trackStartX = start.x + perpX * offset;
        const trackStartY = start.y + perpY * offset;
        const trackEndX = end.x + perpX * offset;
        const trackEndY = end.y + perpY * offset;
        
        // Draw intermittent wheel track marks
        if (wheelRandom() < 0.7) {
          ctx.beginPath();
          ctx.moveTo(trackStartX, trackStartY);
          ctx.lineTo(trackEndX, trackEndY);
          ctx.stroke();
        }
      }
    }
    
    ctx.setLineDash([]);
  };

  // Add small pebbles and stones embedded in the path
  const drawPathPebbles = (ctx: CanvasRenderingContext2D) => {
    const pebbleColors = ['#696969', '#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3'];
    
    let pebbleSeed = 97531;
    const pebbleRandom = () => {
      pebbleSeed = (pebbleSeed * 9301 + 49297) % 233280;
      return pebbleSeed / 233280;
    };
    
    for (let i = 0; i < GAME_PATH.length - 1; i++) {
      const start = GAME_PATH[i];
      const end = GAME_PATH[i + 1];
      const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const segments = Math.floor(distance / 12);
      
      for (let j = 0; j < segments; j++) {
        const t = j / segments;
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        
        // Randomly place small pebbles
        if (pebbleRandom() < 0.15) {
          const pebbleSize = 1 + pebbleRandom() * 2;
          const offsetX = (pebbleRandom() - 0.5) * 18;
          const offsetY = (pebbleRandom() - 0.5) * 18;
          const colorIndex = Math.floor(pebbleRandom() * pebbleColors.length);
          
          // Pebble with subtle shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.beginPath();
          ctx.ellipse(x + offsetX + 0.5, y + offsetY + 0.5, pebbleSize * 0.8, pebbleSize * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Main pebble
          ctx.fillStyle = pebbleColors[colorIndex];
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.ellipse(x + offsetX, y + offsetY, pebbleSize, pebbleSize * 0.8, pebbleRandom() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1.0;
  };

  // Add worn areas and compacted sections
  const drawPathWear = (ctx: CanvasRenderingContext2D) => {
    let wearSeed = 86420;
    const wearRandom = () => {
      wearSeed = (wearSeed * 9301 + 49297) % 233280;
      return wearSeed / 233280;
    };
    
    for (let i = 0; i < GAME_PATH.length - 1; i++) {
      const start = GAME_PATH[i];
      const end = GAME_PATH[i + 1];
      const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const segments = Math.floor(distance / 20);
      
      for (let j = 0; j < segments; j++) {
        const t = j / segments;
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        
        // Add worn, compacted areas
        if (wearRandom() < 0.3) {
          const wearSize = 8 + wearRandom() * 12;
          const offsetX = (wearRandom() - 0.5) * 10;
          const offsetY = (wearRandom() - 0.5) * 10;
          
          // Create worn area with darker, compacted earth
          const wearGradient = ctx.createRadialGradient(x + offsetX, y + offsetY, 0, x + offsetX, y + offsetY, wearSize);
          wearGradient.addColorStop(0, 'rgba(101, 67, 33, 0.4)');
          wearGradient.addColorStop(0.6, 'rgba(139, 69, 19, 0.2)');
          wearGradient.addColorStop(1, 'rgba(160, 82, 45, 0.1)');
          
          ctx.fillStyle = wearGradient;
          ctx.beginPath();
          ctx.ellipse(x + offsetX, y + offsetY, wearSize, wearSize * 0.6, wearRandom() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };



  const drawTowers = useCallback((ctx: CanvasRenderingContext2D) => {
    gameState.towers.forEach(tower => {
      // Draw tower shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(tower.position.x + 2, tower.position.y + 2, 22, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw tower base with enhanced styling
      const baseSize = 20 + (tower.level - 1) * 3;
      
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

      // Draw enemy shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(enemy.position.x + 1, enemy.position.y + 1, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw enemy with enhanced styling
      const enemySize = enemy.type === 'dragon' ? 18 : enemy.type === 'troll' ? 16 : 14;
      
      // Create gradient based on enemy type
      const gradient = ctx.createRadialGradient(
        enemy.position.x - 3, enemy.position.y - 3, 0,
        enemy.position.x, enemy.position.y, enemySize
      );
      
      switch (enemy.type) {
        case 'goblin':
          gradient.addColorStop(0, '#CD853F');
          gradient.addColorStop(1, '#8B4513');
          break;
        case 'banshee':
          gradient.addColorStop(0, '#E6E6FA');
          gradient.addColorStop(1, '#9370DB');
          break;
        case 'troll':
          gradient.addColorStop(0, '#90EE90');
          gradient.addColorStop(1, '#556B2F');
          break;
        case 'dragon':
          gradient.addColorStop(0, '#FF6347');
          gradient.addColorStop(1, '#8B0000');
          break;
        default:
          gradient.addColorStop(0, '#CD853F');
          gradient.addColorStop(1, '#8B4513');
      }
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = enemy.type === 'dragon' ? '#FFD700' : '#654321';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.arc(enemy.position.x, enemy.position.y, enemySize, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw enhanced enemy icon
      drawEnhancedEnemyIcon(ctx, enemy.type, enemy.position.x, enemy.position.y, enemy.health, enemy.maxHealth);

      // Draw enhanced health bar
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

  const drawProjectiles = useCallback((ctx: CanvasRenderingContext2D) => {
    gameState.projectiles.forEach(projectile => {
      // Find the tower that fired this projectile to determine projectile type
      const tower = gameState.towers.find(t => t.id === projectile.towerId);
      
      if (tower?.type === 'bartender') {
        // Draw beer pint projectile (Paddy Losty's pints)
        ctx.fillStyle = '#8B4513'; // Brown for pint
        ctx.strokeStyle = '#FFD700'; // Gold rim
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.arc(projectile.position.x, projectile.position.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add foam effect
        ctx.fillStyle = '#FFFACD';
        ctx.beginPath();
        ctx.arc(projectile.position.x, projectile.position.y - 2, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (tower?.type === 'bouncer') {
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

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Safety check for game state
    if (!gameState) return;

    // Draw enhanced map background
    drawEnhancedMapBackground(ctx, GAME_WIDTH, GAME_HEIGHT);

    // Draw game elements in proper order
    drawPath(ctx);
    drawTowers(ctx);
    drawEnemies(ctx);
    drawProjectiles(ctx);
    
    // Draw particles
    if (particleSystem && typeof particleSystem.draw === 'function') {
      try {
        particleSystem.draw(ctx);
      } catch (error) {
        console.warn('Error drawing particles:', error);
      }
    }

    // Draw placement preview
    if (gameState.placingTowerType) {
      ctx.fillStyle = 'rgba(34, 139, 34, 0.5)';
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      // This would show preview at mouse position
      // For now, just show it's in placement mode
      ctx.font = '20px Celtic Hand, cursive';
      ctx.fillStyle = '#FFD700';
      ctx.textAlign = 'center';
      ctx.fillText('Click to place defender', GAME_WIDTH / 2, 30);
      ctx.setLineDash([]);
    }
  }, [gameState, drawPath, drawTowers, drawEnemies, drawProjectiles, particleSystem]);

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

  // Force re-render when game state changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Always draw to keep animations like smoke running
      draw();
    }, 16); // ~60 FPS

    return () => clearInterval(interval);
  }, [draw]);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (gameState.placingTowerType) {
      // Snap to grid
      const gridX = Math.round(x / GRID_SIZE) * GRID_SIZE;
      const gridY = Math.round(y / GRID_SIZE) * GRID_SIZE;
      
      // Check if position is valid (not on path)
      const isOnPath = GAME_PATH.some(pathPoint => {
        const distance = Math.sqrt(
          Math.pow(gridX - pathPoint.x, 2) + Math.pow(gridY - pathPoint.y, 2)
        );
        return distance < 60; // Path width consideration
      });

      // Check if position is occupied
      const isOccupied = gameState.towers.some(tower => {
        const distance = Math.sqrt(
          Math.pow(gridX - tower.position.x, 2) + Math.pow(gridY - tower.position.y, 2)
        );
        return distance < 40;
      });

      if (!isOnPath && !isOccupied) {
        onTowerPlace({ x: gridX, y: gridY }, gameState.placingTowerType);
      }
    } else {
      // Check if clicking on a tower
      const clickedTower = gameState.towers.find(tower => {
        const distance = Math.sqrt(
          Math.pow(x - tower.position.x, 2) + Math.pow(y - tower.position.y, 2)
        );
        return distance < 25;
      });

      onTowerSelect(clickedTower?.id);
    }
  }, [gameState.placingTowerType, gameState.towers, onTowerPlace, onTowerSelect]);

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
      
      {/* Map Decorations Overlay */}
      <MapDecorations />
      
      {/* Enhanced Effects Overlay */}
      <EnhancedEffects
        gameState={gameState}
        canvasWidth={GAME_WIDTH}
        canvasHeight={GAME_HEIGHT}
      />
      
      {/* Tower Upgrade Overlay */}
      {gameState.selectedTower && canvasRect && (
        <TowerUpgradeOverlay
          tower={gameState.selectedTower}
          gold={gameState.gold}
          onUpgrade={onUpgradeTower}
          onClose={() => onTowerSelect(undefined)}
          canvasRect={canvasRect}
        />
      )}
      
      {/* Special Attacks */}
      <SpecialAttacks
        specialAttacks={gameState.specialAttacks}
        gold={gameState.gold}
        onUseSpecialAttack={onUseSpecialAttack}
        canvasRect={canvasRect}
      />
    </div>
  );
};