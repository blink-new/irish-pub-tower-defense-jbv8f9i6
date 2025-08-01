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

  // Use useEffect to handle global mouse events when dragging
  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setDragPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Get fresh canvas rect to ensure accuracy
      const canvas = document.querySelector('canvas');
      const rect = canvas?.getBoundingClientRect() || canvasRect;
      
      if (rect) {
        const canvasX = Math.max(0, Math.min(900, e.clientX - rect.left)); // Clamp to canvas bounds
        const canvasY = Math.max(0, Math.min(600, e.clientY - rect.top));
        console.log(`🎯 SPECIAL ATTACK DEBUG - Mouse position: (${e.clientX}, ${e.clientY})`);
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

    // Attach global event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup on unmount or when dragging stops
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
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