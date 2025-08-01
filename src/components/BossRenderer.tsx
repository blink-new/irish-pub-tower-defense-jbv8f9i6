import React from 'react';
import { Enemy } from '../types/game';
import { renderBoss } from '../utils/bossRenderer';

interface BossRendererProps {
  enemy: Enemy;
  ctx: CanvasRenderingContext2D;
}

// Component for React integration (if needed)
export const BossRenderer: React.FC<BossRendererProps> = ({ enemy, ctx }) => {
  React.useEffect(() => {
    renderBoss(enemy, ctx);
  }, [enemy, ctx]);

  return null; // This component doesn't render anything directly
};