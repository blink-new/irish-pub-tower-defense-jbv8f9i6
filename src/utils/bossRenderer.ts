import { Enemy } from '../types/game';
import { getBossStats } from '../data/bossConfig';

export const renderBoss = (enemy: Enemy, ctx: CanvasRenderingContext2D) => {
  if (!enemy.isBoss) return;

  const bossStats = getBossStats(enemy.type as any);
  const size = bossStats.size;
  const baseSize = 30;
  const actualSize = baseSize * size;

  // Save context
  ctx.save();

  // Draw boss with enhanced visuals
  ctx.translate(enemy.position.x, enemy.position.y);

  // Draw boss aura/glow effect
  const glowRadius = actualSize * 1.5;
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
  
  // Different aura colors for different bosses
  switch (enemy.type) {
    case 'banshee_queen':
      gradient.addColorStop(0, 'rgba(138, 43, 226, 0.3)'); // Purple
      gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
      break;
    case 'troll_king':
      gradient.addColorStop(0, 'rgba(139, 69, 19, 0.3)'); // Brown
      gradient.addColorStop(1, 'rgba(139, 69, 19, 0)');
      break;
    case 'dragon_lord':
      gradient.addColorStop(0, 'rgba(255, 69, 0, 0.4)'); // Red-orange
      gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
      break;
    case 'shadow_demon':
      gradient.addColorStop(0, 'rgba(75, 0, 130, 0.4)'); // Dark purple
      gradient.addColorStop(1, 'rgba(75, 0, 130, 0)');
      break;
    case 'pub_destroyer':
      gradient.addColorStop(0, 'rgba(220, 20, 60, 0.5)'); // Crimson
      gradient.addColorStop(1, 'rgba(220, 20, 60, 0)');
      break;
    default:
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)'); // Gold
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(-glowRadius, -glowRadius, glowRadius * 2, glowRadius * 2);

  // Draw shield effect if active
  if (enemy.statusEffects?.shield) {
    ctx.strokeStyle = '#00FFFF';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(0, 0, actualSize + 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Draw speed boost effect if active
  if (enemy.statusEffects?.speedBoost) {
    ctx.strokeStyle = '#FFFF00';
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(0, 0, actualSize + 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Draw boss crown/indicator
  ctx.fillStyle = '#FFD700';
  ctx.font = `${Math.floor(actualSize * 0.4)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('👑', 0, -actualSize - 15);

  // Draw boss icon (larger than normal enemies)
  ctx.font = `${actualSize}px Arial`;
  ctx.fillText(bossStats.icon, 0, 0);

  // Draw health bar (enhanced for bosses)
  const barWidth = actualSize * 2;
  const barHeight = 8;
  const healthPercent = enemy.health / enemy.maxHealth;

  // Background
  ctx.fillStyle = '#333333';
  ctx.fillRect(-barWidth / 2, actualSize + 10, barWidth, barHeight);

  // Health bar (color changes based on health)
  if (healthPercent > 0.6) {
    ctx.fillStyle = '#00FF00'; // Green
  } else if (healthPercent > 0.3) {
    ctx.fillStyle = '#FFFF00'; // Yellow
  } else {
    ctx.fillStyle = '#FF0000'; // Red
  }
  ctx.fillRect(-barWidth / 2, actualSize + 10, barWidth * healthPercent, barHeight);

  // Health bar border
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.strokeRect(-barWidth / 2, actualSize + 10, barWidth, barHeight);

  // Draw boss name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '12px Arial';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.strokeText(bossStats.name, 0, actualSize + 30);
  ctx.fillText(bossStats.name, 0, actualSize + 30);

  // Restore context
  ctx.restore();
};