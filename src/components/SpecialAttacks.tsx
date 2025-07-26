import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface SpecialAttack {
  id: string;
  name: string;
  icon: string;
  description: string;
  cooldown: number;
  currentCooldown: number;
  cost: number;
}

interface SpecialAttacksProps {
  specialAttacks: SpecialAttack[];
  gold: number;
  isWaveActive: boolean;
  onUseSpecialAttack: (attackId: string, position?: { x: number; y: number }) => void;
  canvasRect?: DOMRect;
}

export const SpecialAttacks: React.FC<SpecialAttacksProps> = ({
  specialAttacks,
  gold,
  isWaveActive,
  onUseSpecialAttack,
  canvasRect
}) => {
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, attackId: string) => {
    const attack = specialAttacks.find(a => a.id === attackId);
    if (!attack || attack.currentCooldown > 0 || !isWaveActive) return;

    setDragging(attackId);
    setDragPosition({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent, attackId: string) => {
    const attack = specialAttacks.find(a => a.id === attackId);
    if (!attack || attack.currentCooldown > 0 || !isWaveActive) return;

    const touch = e.touches[0];
    setDragging(attackId);
    setDragPosition({ x: touch.clientX, y: touch.clientY });
    e.preventDefault();
  };

  // Use useEffect to handle global mouse and touch events when dragging
  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setDragPosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setDragPosition({ x: touch.clientX, y: touch.clientY });
      e.preventDefault(); // Prevent scrolling while dragging
    };

    const handleEnd = (clientX: number, clientY: number) => {
      // Get fresh canvas rect to ensure accuracy
      const canvas = document.querySelector('canvas');
      const rect = canvas?.getBoundingClientRect() || canvasRect;
      
      if (rect) {
        const canvasX = Math.max(0, Math.min(900, clientX - rect.left)); // Clamp to canvas bounds
        const canvasY = Math.max(0, Math.min(600, clientY - rect.top));
        console.log(`🎯 SPECIAL ATTACK DEBUG - Position: (${clientX}, ${clientY})`);
        console.log(`🎯 SPECIAL ATTACK DEBUG - Canvas rect: left=${rect.left}, top=${rect.top}, width=${rect.width}, height=${rect.height}`);
        console.log(`🎯 SPECIAL ATTACK DEBUG - Calculated canvas coordinates: (${canvasX}, ${canvasY})`);
        console.log(`🎯 SPECIAL ATTACK DEBUG - Calling onUseSpecialAttack with position: (${canvasX}, ${canvasY})`);
        onUseSpecialAttack(dragging, { x: canvasX, y: canvasY });
      } else {
        console.warn('⚠️ SPECIAL ATTACK DEBUG - No canvas rect available, using center position');
        onUseSpecialAttack(dragging, { x: 450, y: 300 });
      }
      setDragging(null);
    };

    const handleMouseUp = (e: MouseEvent) => {
      handleEnd(e.clientX, e.clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      handleEnd(touch.clientX, touch.clientY);
      e.preventDefault();
    };

    // Attach global event listeners for both mouse and touch
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Cleanup on unmount or when dragging stops
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragging, canvasRect, onUseSpecialAttack]);

  return (
    <>
      {/* Special Attack Icons - positioned on bottom right of game map */}
      <div 
        className="absolute bottom-4 right-4 z-40 flex flex-col space-y-2"
      >
        {specialAttacks.map((attack) => {
          const isOnCooldown = attack.currentCooldown > 0;
          const canUse = !isOnCooldown && isWaveActive;
          const isDisabledByWave = !isWaveActive;
          
          return (
            <div
              key={attack.id}
              className={`relative w-16 h-16 rounded-full border-2 border-accent bg-card/95 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all ${
                canUse 
                  ? 'cursor-pointer hover:scale-110 hover:bg-accent/20' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              onMouseDown={(e) => handleMouseDown(e, attack.id)}
              onTouchStart={(e) => handleTouchStart(e, attack.id)}

            >
              <span className="text-2xl">{attack.icon}</span>
              
              {/* Cooldown overlay */}
              {isOnCooldown && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Badge variant="destructive" className="text-xs">
                    {Math.ceil(attack.currentCooldown / 1000)}s
                  </Badge>
                </div>
              )}
            </div>
          );
        })}
        
        {/* Instructions */}
        <div className="text-xs text-accent text-center mt-2 bg-black/50 rounded p-1">
          Drag to use
        </div>
      </div>

      {/* Dragging preview */}
      {dragging && (
        <div
          className="fixed pointer-events-none z-50 w-12 h-12 rounded-full bg-accent/80 flex items-center justify-center shadow-lg"
          style={{
            left: dragPosition.x - 24,
            top: dragPosition.y - 24,
          }}
        >
          <span className="text-xl">
            {specialAttacks.find(a => a.id === dragging)?.icon}
          </span>
        </div>
      )}
    </>
  );
};