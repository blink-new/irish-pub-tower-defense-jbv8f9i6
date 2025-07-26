import { Position } from '../types/game';

// Strategic tower placement positions along the enemy path
// Optimized for 7-wave difficulty - 7 carefully spaced pads for strategic gameplay
// Path: (-20,300) → (150,300) → (150,150) → (350,150) → (350,450) → (550,450) → (550,250) → (750,250) → (750,350) → (850,350)
export const TOWER_PLACEMENT_PADS: Position[] = [
  // Entry defense - covers first horizontal segment
  { x: 75, y: 240 },     // Above entry path - 60px from path center, covers x=-20 to 150
  
  // First turn control - covers vertical segment  
  { x: 210, y: 225 },    // Right of first turn - 60px from path, covers y=300 to 150
  
  // Mid-path coverage - covers second horizontal segment
  { x: 250, y: 90 },     // Above middle horizontal - 60px from path, covers x=150 to 350
  
  // Central strategic position - covers long vertical segment
  { x: 290, y: 300 },    // Left of central vertical - 60px from path, covers y=150 to 450
  
  // Bottom path control - covers bottom horizontal segment
  { x: 450, y: 390 },    // Above bottom horizontal - 60px from path, covers x=350 to 550
  
  // Final turn coverage - covers final vertical segment
  { x: 610, y: 300 },    // Right of final vertical - 60px from path, covers y=450 to 250
  
  // Pub approach defense - covers final horizontal to pub
  { x: 700, y: 190 },    // Above final approach - 60px from path, covers x=550 to 850
];

// Angled Side-View High Stool - Permanent Design
const drawHighStoolAngledView = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  isOccupied: boolean = false,
  isHighlighted: boolean = false
) => {
  const stoolRadius = 20; // 20% smaller than original 25px
  const stoolHeight = 28; // Much taller legs for proper high stool proportions
  
  // Draw shadow first (larger shadow for taller stool)
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.beginPath();
  ctx.ellipse(x + 3, y + 12, stoolRadius + 4, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  
  // Draw legs (angled perspective showing 2-3 legs clearly)
  ctx.strokeStyle = '#8B4513'; // Muted brown wood
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.8;
  ctx.lineCap = 'round';
  
  // Front legs (more visible) - much taller
  ctx.beginPath();
  ctx.moveTo(x - 14, y + 4); // Left front leg top (wider stance)
  ctx.lineTo(x - 16, y + stoolHeight); // Left front leg bottom
  ctx.moveTo(x + 14, y + 4); // Right front leg top (wider stance)
  ctx.lineTo(x + 16, y + stoolHeight); // Right front leg bottom
  ctx.stroke();
  
  // Back legs (partially visible due to angle) - taller
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(x - 10, y - 1); // Left back leg top
  ctx.lineTo(x - 12, y + stoolHeight - 3); // Left back leg bottom
  ctx.moveTo(x + 10, y - 1); // Right back leg top
  ctx.lineTo(x + 12, y + stoolHeight - 3); // Right back leg bottom
  ctx.stroke();
  
  // Cross-bracing between legs (positioned higher for tall stool)
  ctx.globalAlpha = 0.6;
  ctx.lineWidth = 2;
  ctx.beginPath();
  // Front cross-brace (positioned about 2/3 down the legs)
  ctx.moveTo(x - 14, y + 18);
  ctx.lineTo(x + 14, y + 18);
  // Side cross-braces (partial view)
  ctx.moveTo(x - 12, y + 16);
  ctx.lineTo(x - 10, y + 14);
  ctx.moveTo(x + 12, y + 16);
  ctx.lineTo(x + 10, y + 14);
  // Additional lower cross-brace for stability (typical of high stools)
  ctx.moveTo(x - 14, y + 24);
  ctx.lineTo(x + 14, y + 24);
  ctx.stroke();
  
  ctx.globalAlpha = 1.0;
  
  // Draw wooden seat base (elliptical for perspective)
  const woodGradient = ctx.createRadialGradient(x - 6, y - 4, 0, x, y, stoolRadius);
  woodGradient.addColorStop(0, '#D2B48C'); // Light wood
  woodGradient.addColorStop(0.7, '#CD853F'); // Medium wood
  woodGradient.addColorStop(1, '#8B4513');   // Dark wood edge
  
  ctx.fillStyle = woodGradient;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(x, y, stoolRadius, stoolRadius * 0.6, 0, 0, Math.PI * 2); // Elliptical for perspective
  ctx.fill();
  ctx.globalAlpha = 1.0;
  
  // Draw green leather cushion on top (slightly smaller, with perspective)
  const cushionGradient = ctx.createRadialGradient(x - 4, y - 6, 0, x, y - 2, stoolRadius - 3);
  cushionGradient.addColorStop(0, '#6B8E23');  // Muted olive green
  cushionGradient.addColorStop(0.7, '#556B2F'); // Medium olive green
  cushionGradient.addColorStop(1, '#2F4F2F');   // Dark forest green
  
  ctx.fillStyle = cushionGradient;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.ellipse(x, y - 2, stoolRadius - 3, (stoolRadius - 3) * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  
  // Add decorative studs around cushion edge
  if (!isOccupied) {
    ctx.fillStyle = '#DAA520'; // Muted gold studs
    ctx.globalAlpha = 0.7;
    
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI * 2) / 10;
      const studRadius = stoolRadius - 5;
      const studX = x + Math.cos(angle) * studRadius;
      const studY = y - 2 + Math.sin(angle) * studRadius * 0.6; // Perspective adjustment
      
      ctx.beginPath();
      ctx.arc(studX, studY, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.globalAlpha = 1.0;
  }
  
  // Cushion border
  ctx.strokeStyle = '#2F4F2F';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.ellipse(x, y - 2, stoolRadius - 3, (stoolRadius - 3) * 0.6, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1.0;
  
  // Highlight effect when placing tower
  if (isHighlighted) {
    ctx.strokeStyle = '#E6C200'; // Muted gold
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.8;
    ctx.setLineDash([6, 3]);
    ctx.beginPath();
    ctx.ellipse(x, y - 1, stoolRadius + 2, (stoolRadius + 2) * 0.6, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1.0;
  }
};

// Main drawing function - uses angled pub stool design permanently
export const drawTowerPlacementPad = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  isOccupied: boolean = false,
  isHighlighted: boolean = false
) => {
  drawHighStoolAngledView(ctx, x, y, isOccupied, isHighlighted);
};

export const drawTowerPlacementPads = (
  ctx: CanvasRenderingContext2D,
  occupiedPositions: Position[] = [],
  highlightedPosition?: Position
) => {
  TOWER_PLACEMENT_PADS.forEach(pad => {
    const isOccupied = occupiedPositions.some(pos => {
      const distance = Math.sqrt(
        Math.pow(pos.x - pad.x, 2) + Math.pow(pos.y - pad.y, 2)
      );
      return distance < 32; // Adjusted for smaller pad size
    });
    
    const isHighlighted = highlightedPosition && 
      Math.sqrt(
        Math.pow(highlightedPosition.x - pad.x, 2) + 
        Math.pow(highlightedPosition.y - pad.y, 2)
      ) < 32;
    
    drawTowerPlacementPad(ctx, pad.x, pad.y, isOccupied, isHighlighted);
  });
};

// Helper function to find the nearest placement pad to a given position
export const findNearestPlacementPad = (position: Position): Position | null => {
  let nearestPad: Position | null = null;
  let minDistance = Infinity;
  
  TOWER_PLACEMENT_PADS.forEach(pad => {
    const distance = Math.sqrt(
      Math.pow(position.x - pad.x, 2) + Math.pow(position.y - pad.y, 2)
    );
    
    if (distance < minDistance && distance < 40) { // Within snap range
      minDistance = distance;
      nearestPad = pad;
    }
  });
  
  return nearestPad;
};

// Check if a position is a valid placement pad
export const isValidPlacementPosition = (
  position: Position, 
  occupiedPositions: Position[] = []
): boolean => {
  // Check if position is near a placement pad
  const nearestPad = findNearestPlacementPad(position);
  if (!nearestPad) return false;
  
  // Check if the pad is already occupied
  const isOccupied = occupiedPositions.some(pos => {
    const distance = Math.sqrt(
      Math.pow(pos.x - nearestPad.x, 2) + Math.pow(pos.y - nearestPad.y, 2)
    );
    return distance < 32; // Adjusted for smaller pad size
  });
  
  return !isOccupied;
};