/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useRef } from 'react';

interface EnhancedEffectsProps {
  gameState: any;
  canvasWidth: number;
  canvasHeight: number;
}

export const EnhancedEffects: React.FC<EnhancedEffectsProps> = ({
  gameState,
  canvasWidth,
  canvasHeight
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Safety check for gameState
    if (!gameState || typeof gameState !== 'object') return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw ambient effects
    drawAmbientEffects(ctx, canvasWidth, canvasHeight);
    
    // Draw tower auras for upgraded towers
    if (Array.isArray(gameState.towers)) {
      drawTowerAuras(ctx, gameState.towers);
    }
    
    // Draw wave completion celebration
    if (typeof gameState.wave === 'number' && 
        typeof gameState.isPlaying === 'boolean' && 
        typeof gameState.lives === 'number' &&
        gameState.wave > 1 && !gameState.isPlaying && gameState.lives > 0) {
      drawWaveCompletionEffect(ctx, canvasWidth, canvasHeight);
    }

  }, [gameState, canvasWidth, canvasHeight]);

  const drawAmbientEffects = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw floating magical sparkles
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < 15; i++) {
      const x = (Math.sin(time * 0.5 + i) * 0.5 + 0.5) * width;
      const y = (Math.cos(time * 0.3 + i * 1.5) * 0.5 + 0.5) * height;
      const alpha = (Math.sin(time * 2 + i) * 0.5 + 0.5) * 0.3;
      
      ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawTowerAuras = (ctx: CanvasRenderingContext2D, towers: any[]) => {
    const time = Date.now() * 0.002;
    
    towers.forEach(tower => {
      // Safety checks for tower object
      if (!tower || typeof tower !== 'object') return;
      if (typeof tower.level !== 'number') return;
      if (!tower.position || typeof tower.position.x !== 'number' || typeof tower.position.y !== 'number') return;
      if (!tower.id || typeof tower.id !== 'string') return;
      
      if (tower.level > 2) {
        try {
          // Draw pulsing aura for high-level towers
          const pulseRadius = 30 + Math.sin(time + tower.id.charCodeAt(0)) * 5;
          const alpha = 0.1 + Math.sin(time * 2 + tower.id.charCodeAt(0)) * 0.05;
          
          // Safety check for valid radius
          if (pulseRadius <= 0 || isNaN(pulseRadius)) return;
          
          const gradient = ctx.createRadialGradient(
            tower.position.x, tower.position.y, 0,
            tower.position.x, tower.position.y, pulseRadius
          );
          
          // Safety check for gradient
          if (!gradient) return;
          
          gradient.addColorStop(0, `rgba(255, 215, 0, ${Math.max(0, Math.min(1, alpha))})`);
          gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(tower.position.x, tower.position.y, pulseRadius, 0, Math.PI * 2);
          ctx.fill();
        } catch (error) {
          console.warn('Error drawing tower aura:', error);
        }
      }
    });
  };

  const drawWaveCompletionEffect = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const time = Date.now() * 0.003;
    
    // Draw celebration sparkles
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2 + time;
      const radius = 100 + Math.sin(time * 3 + i) * 20;
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;
      const alpha = Math.sin(time * 4 + i) * 0.5 + 0.5;
      
      ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
};