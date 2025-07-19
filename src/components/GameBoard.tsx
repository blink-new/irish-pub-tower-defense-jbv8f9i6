import React, { useRef, useEffect, useCallback, useState } from 'react';
import { GameState, Position, TowerType } from '../types/game';
import { GAME_PATH, GRID_SIZE, GAME_WIDTH, GAME_HEIGHT } from '../data/gameConfig';
import { TowerUpgradeOverlay } from './TowerUpgradeOverlay';
import { SpecialAttacks } from './SpecialAttacks';
import { TowerIcon, EnemyIcon } from './TowerIcons';
import { drawMapDecorations } from './MapDecorations';
import { drawEnhancedTowerIcon, drawEnhancedEnemyIcon } from './EnhancedTowerGraphics';
import { drawEnhancedMapBackground } from './EnhancedMapBackground';

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
    // Draw path shadow first (subtle depth)
    ctx.strokeStyle = 'rgba(139, 69, 19, 0.3)';
    ctx.lineWidth = 46;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(GAME_PATH[0].x + 2, GAME_PATH[0].y + 2);
    
    for (let i = 1; i < GAME_PATH.length; i++) {
      ctx.lineTo(GAME_PATH[i].x + 2, GAME_PATH[i].y + 2);
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
    ctx.moveTo(GAME_PATH[0].x, GAME_PATH[0].y);
    
    for (let i = 1; i < GAME_PATH.length; i++) {
      ctx.lineTo(GAME_PATH[i].x, GAME_PATH[i].y);
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
    ctx.moveTo(GAME_PATH[0].x, GAME_PATH[0].y);
    
    for (let i = 1; i < GAME_PATH.length; i++) {
      // Add slight organic variation to path edges
      const variation = (edgeRandom() - 0.5) * 3;
      ctx.lineTo(GAME_PATH[i].x + variation, GAME_PATH[i].y + variation);
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
    
    for (let i = 0; i < GAME_PATH.length - 1; i++) {
      const start = GAME_PATH[i];
      const end = GAME_PATH[i + 1];
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
    
    for (let i = 0; i < GAME_PATH.length - 1; i++) {
      const start = GAME_PATH[i];
      const end = GAME_PATH[i + 1];
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
  }, []);

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

    // Draw enhanced map background
    drawEnhancedMapBackground(ctx, GAME_WIDTH, GAME_HEIGHT);

    // Draw game elements in proper order
    drawMapDecorations(ctx); // Draw decorations before path
    drawPath(ctx);
    drawTowers(ctx);
    drawEnemies(ctx);
    drawProjectiles(ctx);
    
    // Draw particles
    if (particleSystem) {
      particleSystem.draw(ctx);
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

      // Check if position is within game bounds
      const isInBounds = gridX >= 0 && gridX <= GAME_WIDTH && gridY >= 0 && gridY <= GAME_HEIGHT;

      if (!isOnPath && !isOccupied && isInBounds) {
        try {
          const success = onTowerPlace({ x: gridX, y: gridY }, gameState.placingTowerType);
          if (!success) {
            console.warn('⚠️ Tower placement failed - insufficient gold or other issue');
          }
        } catch (error) {
          console.error('❌ Error placing tower:', error);
        }
      } else {
        console.log('❌ Invalid placement:', { isOnPath, isOccupied, isInBounds, gridX, gridY });
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