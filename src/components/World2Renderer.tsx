// WORLD 2 ONLY - Completely independent rendering system
// This will NEVER share code with World 1

import { Position } from '../types/game';

// World 2 specific enemy path - Zigzag pattern with SAME start/end as World 1
export const WORLD2_ENEMY_PATH: Position[] = [
  // SAME START as World 1
  { x: -20, y: 300 },   // Start off-screen left (SAME as World 1)
  { x: 80, y: 300 },    // Enter screen at same level
  
  // First zigzag: UP and RIGHT
  { x: 150, y: 200 },   // First curve UP
  { x: 250, y: 150 },   // Continue up and right
  { x: 350, y: 200 },   // Peak of first bend
  
  // Second zigzag: DOWN and RIGHT  
  { x: 400, y: 300 },   // Curve down to middle
  { x: 450, y: 450 },   // Bottom of zigzag (dramatic down)
  { x: 550, y: 450 },   // Move right along bottom
  
  // Third zigzag: UP and RIGHT
  { x: 600, y: 350 },   // Begin upward curve
  { x: 650, y: 200 },   // Second peak (dramatic up)
  { x: 700, y: 150 },   // Top of second peak
  
  // Final approach: RIGHT ANGLE + STRAIGHT LINE (like World 1)
  { x: 750, y: 200 },   // Begin final descent
  { x: 750, y: 350 },   // RIGHT ANGLE: Turn straight down to pub level
  { x: 850, y: 350 }    // STRAIGHT LINE: Go straight right to pub entrance (SAME END as World 1)
];

// World 2 specific tower placement pads - positioned around zigzag path
export const WORLD2_TOWER_PADS: Position[] = [
  // Entry area - both sides of path
  { x: 80, y: 250 },     // Above entry path
  { x: 80, y: 350 },     // Below entry path
  
  // First zigzag (UP curve) - around the upward bend
  { x: 150, y: 150 },    // Above first curve
  { x: 200, y: 250 },    // Side of first curve
  { x: 300, y: 120 },    // Above peak of first bend
  { x: 350, y: 250 },    // Below peak of first bend
  
  // Second zigzag (DOWN curve) - around the downward bend
  { x: 400, y: 250 },    // Above second curve
  { x: 450, y: 400 },    // At bottom of zigzag
  { x: 500, y: 500 },    // Below bottom section
  { x: 550, y: 400 },    // Right side of bottom
  
  // Third zigzag (UP curve) - around the second upward bend
  { x: 600, y: 300 },    // Left side of third curve
  { x: 650, y: 150 },    // At second peak
  { x: 700, y: 100 },    // Above second peak
  
  // Final approach to pub - around right angle and straight line
  { x: 700, y: 150 },    // Above final curve
  { x: 700, y: 250 },    // Left side of right angle
  { x: 750, y: 300 },    // At the right angle corner
  { x: 800, y: 300 },    // Along straight line to pub
  { x: 750, y: 400 },    // Below right angle
];

const drawCobblestonePattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Create a static seed for consistent pattern
  const staticSeed = (x: number, y: number) => {
    return ((x * 73) + (y * 37)) % 1000;
  };
  
  const stoneBaseSize = 8;
  const spacing = 10;
  
  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      const offsetX = (Math.floor(y / spacing) % 2) * (spacing / 2);
      const stoneX = x + offsetX;
      
      if (stoneX < width - stoneBaseSize * 2) {
        const seed = staticSeed(stoneX, y);
        
        // Varied stone sizes (8-14px)
        const stoneWidth = stoneBaseSize + (seed % 6);
        const stoneHeight = stoneBaseSize + ((seed * 7) % 6);
        
        // Less busy cobblestone colors - more grey and brown tones, much less green
        const colorVariants = [
          '#8B8B8B', '#A0A0A0', '#696969', '#778899', '#9E9E9E', // More grays
          '#8B7355', '#A0826D', '#CD853F', '#D2B48C', '#BC9A6A', // More browns
          '#708090', '#2F4F4F'  // Minimal weathered tones (removed greens)
        ];
        const stoneColor = colorVariants[seed % colorVariants.length];
        
        // Draw stone with slight randomness for organic feel
        const stoneOffsetX = (seed % 3) - 1;
        const stoneOffsetY = ((seed * 3) % 3) - 1;
        
        ctx.fillStyle = stoneColor;
        ctx.beginPath();
        ctx.roundRect(
          stoneX + stoneOffsetX, 
          y + stoneOffsetY, 
          stoneWidth, 
          stoneHeight, 
          2 // Slightly rounded corners for weathered look
        );
        ctx.fill();
        
        // Darker outline for definition
        ctx.strokeStyle = '#2F2F2F';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        // Add subtle highlight on some stones
        if (seed % 7 === 0) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.beginPath();
          ctx.roundRect(
            stoneX + stoneOffsetX + 1, 
            y + stoneOffsetY + 1, 
            stoneWidth - 2, 
            stoneHeight - 2, 
            1
          );
          ctx.fill();
        }
        
        // Add very small moss/grass tufts between some stones (very sparingly)
        if (seed % 50 === 0) { // Only ~2% of stones get moss (reduced from 4%)
          const mossX = stoneX + stoneWidth + 1;
          const mossY = y + stoneHeight / 2;
          
          // Very small green tuft (reduced size)
          ctx.fillStyle = '#556B2F'; // Darker, more muted green
          ctx.beginPath();
          ctx.arc(mossX, mossY, 1, 0, Math.PI * 2); // Reduced from 1.5 to 1
          ctx.fill();
          
          // Tiny grass blades (smaller and more muted)
          ctx.strokeStyle = '#6B8E23'; // More muted green
          ctx.lineWidth = 0.3; // Thinner
          ctx.beginPath();
          ctx.moveTo(mossX - 0.5, mossY);
          ctx.lineTo(mossX - 0.5, mossY - 2); // Shorter
          ctx.moveTo(mossX + 0.5, mossY);
          ctx.lineTo(mossX + 0.5, mossY - 1.5); // Shorter
          ctx.stroke();
        }
      }
    }
  }
};

const drawWindingStreet = (ctx: CanvasRenderingContext2D) => {
  // Draw the winding street path with cobblestone road texture
  ctx.strokeStyle = '#8B7355';
  ctx.lineWidth = 40; // Street width
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Draw street base
  ctx.beginPath();
  ctx.moveTo(WORLD2_ENEMY_PATH[0].x, WORLD2_ENEMY_PATH[0].y);
  for (let i = 1; i < WORLD2_ENEMY_PATH.length; i++) {
    ctx.lineTo(WORLD2_ENEMY_PATH[i].x, WORLD2_ENEMY_PATH[i].y);
  }
  ctx.stroke();
  
  // Draw street center line
  ctx.strokeStyle = '#FFFF99';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 10]);
  
  ctx.beginPath();
  ctx.moveTo(WORLD2_ENEMY_PATH[0].x, WORLD2_ENEMY_PATH[0].y);
  for (let i = 1; i < WORLD2_ENEMY_PATH.length; i++) {
    ctx.lineTo(WORLD2_ENEMY_PATH[i].x, WORLD2_ENEMY_PATH[i].y);
  }
  ctx.stroke();
  ctx.setLineDash([]); // Reset dash
};

const drawPaddysPub = (ctx: CanvasRenderingContext2D) => {
  // Copy the exact Paddy's Pub design from World 1 (from MapDecorations.tsx)
  // Position it at the same location as World 1: (840, 280)
  const x = 840;
  const y = 280;
  
  // === ENHANCED PADDY'S PUB - EXACT COPY FROM WORLD 1 ===
  // Two-story Irish pub with proper window spacing and higher resolution details
  
  const pubWidth = 70; // Slightly smaller to fit within map boundaries
  const pubHeight = 80; // Taller for two-story design
  const cornerRadius = 2;
  const shadowOffset = 3;
  
  // === SHADOW (drawn first, behind everything) ===
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  
  // Main building shadow
  ctx.beginPath();
  ctx.roundRect(x - pubWidth/2 + shadowOffset, y - pubHeight/2 + shadowOffset, pubWidth, pubHeight, cornerRadius);
  ctx.fill();
  
  // Roof shadow
  ctx.beginPath();
  ctx.moveTo(x - pubWidth/2 - 3 + shadowOffset, y - pubHeight/2 + shadowOffset);
  ctx.lineTo(x + shadowOffset, y - pubHeight/2 - 15 + shadowOffset);
  ctx.lineTo(x + pubWidth/2 + 3 + shadowOffset, y - pubHeight/2 + shadowOffset);
  ctx.closePath();
  ctx.fill();
  
  // === MAIN BUILDING WALLS (Irish green like reference) ===
  ctx.fillStyle = '#2E7D32'; // Rich Irish green
  ctx.beginPath();
  ctx.roundRect(x - pubWidth/2, y - pubHeight/2, pubWidth, pubHeight, cornerRadius);
  ctx.fill();
  
  // Wall outline for definition
  ctx.strokeStyle = '#1B5E20'; // Darker green outline
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // === ROOF (brown shingles like reference) ===
  ctx.fillStyle = '#8D6E63'; // Brown roof color
  ctx.strokeStyle = '#5D4037'; // Darker brown outline
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.moveTo(x - pubWidth/2 - 3, y - pubHeight/2);
  ctx.lineTo(x, y - pubHeight/2 - 15);
  ctx.lineTo(x + pubWidth/2 + 3, y - pubHeight/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Roof shingle texture (horizontal lines)
  ctx.strokeStyle = '#6D4C41';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const roofY = y - pubHeight/2 - 12 + i * 3;
    const roofWidth = (pubWidth + 6) * (1 - i * 0.15);
    ctx.beginPath();
    ctx.moveTo(x - roofWidth/2, roofY);
    ctx.lineTo(x + roofWidth/2, roofY);
    ctx.stroke();
  }
  
  // === CHIMNEY (brick-like with better detail) ===
  ctx.fillStyle = '#8D6E63'; // Brick color
  ctx.strokeStyle = '#5D4037'; // Darker outline
  ctx.lineWidth = 1.5;
  
  ctx.beginPath();
  ctx.roundRect(x + 18, y - pubHeight/2 - 22, 8, 14, 1);
  ctx.fill();
  ctx.stroke();
  
  // Chimney brick texture
  ctx.strokeStyle = '#6D4C41';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(x + 18, y - pubHeight/2 - 20 + i * 4);
    ctx.lineTo(x + 26, y - pubHeight/2 - 20 + i * 4);
    ctx.stroke();
  }
  
  // === UPPER FLOOR WINDOWS (like reference image) ===
  const upperWindowWidth = 12;
  const upperWindowHeight = 14;
  const upperWindowY = y - pubHeight/2 + 15;
  
  // Upper left window
  ctx.fillStyle = '#FFFFFF'; // White window frame
  ctx.strokeStyle = '#E0E0E0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - 24, upperWindowY, upperWindowWidth, upperWindowHeight, 1);
  ctx.fill();
  ctx.stroke();
  
  // Window glass with reflection
  ctx.fillStyle = '#87CEEB'; // Sky blue glass
  ctx.beginPath();
  ctx.roundRect(x - 23, upperWindowY + 1, upperWindowWidth - 2, upperWindowHeight - 2, 1);
  ctx.fill();
  
  // Window cross pattern (4 panes)
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x - 18, upperWindowY + 1);
  ctx.lineTo(x - 18, upperWindowY + upperWindowHeight - 1);
  ctx.moveTo(x - 23, upperWindowY + 7);
  ctx.lineTo(x - 11, upperWindowY + 7);
  ctx.stroke();
  
  // Upper center window
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#E0E0E0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - 6, upperWindowY, upperWindowWidth, upperWindowHeight, 1);
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = '#87CEEB';
  ctx.beginPath();
  ctx.roundRect(x - 5, upperWindowY + 1, upperWindowWidth - 2, upperWindowHeight - 2, 1);
  ctx.fill();
  
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x, upperWindowY + 1);
  ctx.lineTo(x, upperWindowY + upperWindowHeight - 1);
  ctx.moveTo(x - 5, upperWindowY + 7);
  ctx.lineTo(x + 7, upperWindowY + 7);
  ctx.stroke();
  
  // Upper right window
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#E0E0E0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x + 12, upperWindowY, upperWindowWidth, upperWindowHeight, 1);
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = '#87CEEB';
  ctx.beginPath();
  ctx.roundRect(x + 13, upperWindowY + 1, upperWindowWidth - 2, upperWindowHeight - 2, 1);
  ctx.fill();
  
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 18, upperWindowY + 1);
  ctx.lineTo(x + 18, upperWindowY + upperWindowHeight - 1);
  ctx.moveTo(x + 13, upperWindowY + 7);
  ctx.lineTo(x + 25, upperWindowY + 7);
  ctx.stroke();
  
  // === DECORATIVE TRIM LINES (like reference) ===
  ctx.strokeStyle = '#FFD700'; // Gold trim
  ctx.lineWidth = 2;
  
  // Upper trim line
  ctx.beginPath();
  ctx.moveTo(x - pubWidth/2 + 2, upperWindowY - 3);
  ctx.lineTo(x + pubWidth/2 - 2, upperWindowY - 3);
  ctx.stroke();
  
  // Lower trim line
  ctx.beginPath();
  ctx.moveTo(x - pubWidth/2 + 2, upperWindowY + upperWindowHeight + 3);
  ctx.lineTo(x + pubWidth/2 - 2, upperWindowY + upperWindowHeight + 3);
  ctx.stroke();
  
  // === PUB SIGN (completely redesigned with proper positioning and text handling) ===
  const signText = "PADDY'S PUB";
  const signHeight = 20; // Increased height for better text visibility
  const yellowLineY = upperWindowY - 3; // The yellow decorative line position
  
  // Position the sign so its BOTTOM edge sits on the yellow line
  const signY = yellowLineY - signHeight/2; // Center the sign above the yellow line
  
  // Set font with increased size for better readability
  ctx.font = 'bold 16px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Measure the actual text width with the new font
  const textMetrics = ctx.measureText(signText);
  const textWidth = textMetrics.width;
  
  // Calculate sign width with generous padding to ensure text fits completely
  const signWidth = Math.max(textWidth + 20, 85); // Increased padding and minimum width
  
  // Draw sign background with calculated dimensions
  ctx.fillStyle = '#1A237E'; // Dark blue sign background
  ctx.strokeStyle = '#FFD700'; // Gold outline
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.roundRect(x - signWidth/2, signY - signHeight/2, signWidth, signHeight, 3);
  ctx.fill();
  ctx.stroke();
  
  // Draw inner decorative border with more spacing
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - signWidth/2 + 3, signY - signHeight/2 + 3, signWidth - 6, signHeight - 6, 2);
  ctx.stroke();
  
  // Draw sign text with the measured font (guaranteed to fit with proper padding)
  ctx.fillStyle = '#FFD700'; // Gold text
  ctx.fillText(signText, x, signY);
  
  // === LOWER FLOOR ELEMENTS ===
  
  // Main entrance door (arched like reference)
  const doorWidth = 14;
  const doorHeight = 24;
  const doorY = y + pubHeight/2 - doorHeight;
  
  ctx.fillStyle = '#2E7D32'; // Same green as walls
  ctx.strokeStyle = '#1B5E20';
  ctx.lineWidth = 2;
  
  // Arched door top
  ctx.beginPath();
  ctx.arc(x, doorY + doorWidth/2, doorWidth/2, Math.PI, 0);
  ctx.lineTo(x + doorWidth/2, doorY + doorHeight);
  ctx.lineTo(x - doorWidth/2, doorY + doorHeight);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Door window (arched)
  ctx.fillStyle = '#87CEEB';
  ctx.beginPath();
  ctx.arc(x, doorY + 6, 4, Math.PI, 0);
  ctx.lineTo(x + 4, doorY + 12);
  ctx.lineTo(x - 4, doorY + 12);
  ctx.closePath();
  ctx.fill();
  
  // Door cross pattern
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, doorY + 6);
  ctx.lineTo(x, doorY + 12);
  ctx.moveTo(x - 4, doorY + 9);
  ctx.lineTo(x + 4, doorY + 9);
  ctx.stroke();
  
  // Door handle
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(x + 4, doorY + 16, 1.5, 0, Math.PI * 2);
  ctx.fill();
  
  // === LOWER FLOOR WINDOWS (flanking the door) ===
  const lowerWindowWidth = 16;
  const lowerWindowHeight = 20;
  const lowerWindowY = y + 8;
  
  // Left lower window
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#E0E0E0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - 28, lowerWindowY, lowerWindowWidth, lowerWindowHeight, 1);
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = '#87CEEB';
  ctx.beginPath();
  ctx.roundRect(x - 27, lowerWindowY + 1, lowerWindowWidth - 2, lowerWindowHeight - 2, 1);
  ctx.fill();
  
  // Window grid (6 panes)
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  // Vertical lines
  ctx.moveTo(x - 22, lowerWindowY + 1);
  ctx.lineTo(x - 22, lowerWindowY + lowerWindowHeight - 1);
  ctx.moveTo(x - 17, lowerWindowY + 1);
  ctx.lineTo(x - 17, lowerWindowY + lowerWindowHeight - 1);
  // Horizontal lines
  ctx.moveTo(x - 27, lowerWindowY + 7);
  ctx.lineTo(x - 11, lowerWindowY + 7);
  ctx.moveTo(x - 27, lowerWindowY + 14);
  ctx.lineTo(x - 11, lowerWindowY + 14);
  ctx.stroke();
  
  // Right lower window
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#E0E0E0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x + 12, lowerWindowY, lowerWindowWidth, lowerWindowHeight, 1);
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = '#87CEEB';
  ctx.beginPath();
  ctx.roundRect(x + 13, lowerWindowY + 1, lowerWindowWidth - 2, lowerWindowHeight - 2, 1);
  ctx.fill();
  
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  // Vertical lines
  ctx.moveTo(x + 18, lowerWindowY + 1);
  ctx.lineTo(x + 18, lowerWindowY + lowerWindowHeight - 1);
  ctx.moveTo(x + 23, lowerWindowY + 1);
  ctx.lineTo(x + 23, lowerWindowY + lowerWindowHeight - 1);
  // Horizontal lines
  ctx.moveTo(x + 13, lowerWindowY + 7);
  ctx.lineTo(x + 29, lowerWindowY + 7);
  ctx.moveTo(x + 13, lowerWindowY + 14);
  ctx.lineTo(x + 29, lowerWindowY + 14);
  ctx.stroke();
  
  // === LANTERNS (hanging beside door) ===
  // Left lantern
  ctx.fillStyle = '#2C2C2C'; // Black lantern frame
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 1;
  
  ctx.beginPath();
  ctx.roundRect(x - 18, doorY + 8, 4, 8, 1);
  ctx.fill();
  ctx.stroke();
  
  // Lantern glass (warm glow)
  ctx.fillStyle = '#FFD700';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.roundRect(x - 17.5, doorY + 8.5, 3, 7, 0.5);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  
  // Right lantern
  ctx.fillStyle = '#2C2C2C';
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 1;
  
  ctx.beginPath();
  ctx.roundRect(x + 14, doorY + 8, 4, 8, 1);
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = '#FFD700';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.roundRect(x + 14.5, doorY + 8.5, 3, 7, 0.5);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  
  // === FLOWER BOXES (like reference) ===
  // Left flower box
  ctx.fillStyle = '#8D6E63'; // Brown wood
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - 30, y + pubHeight/2 - 8, 16, 4, 1);
  ctx.fill();
  ctx.stroke();
  
  // Flowers in left box
  ctx.fillStyle = '#FF6B6B'; // Red flowers
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(x - 28 + i * 3, y + pubHeight/2 - 7, 1, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Right flower box
  ctx.fillStyle = '#8D6E63';
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x + 14, y + pubHeight/2 - 8, 16, 4, 1);
  ctx.fill();
  ctx.stroke();
  
  // Flowers in right box
  ctx.fillStyle = '#FF6B6B';
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(x + 16 + i * 3, y + pubHeight/2 - 7, 1, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // === SIDEWALK/ENTRANCE AREA ===
  ctx.fillStyle = '#BDBDBD'; // Light gray sidewalk
  ctx.strokeStyle = '#9E9E9E';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - pubWidth/2 - 2, y + pubHeight/2, pubWidth + 4, 6, 1);
  ctx.fill();
  ctx.stroke();
  
  // Sidewalk texture lines
  ctx.strokeStyle = '#9E9E9E';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(x - pubWidth/2, y + pubHeight/2 + 1 + i * 2);
    ctx.lineTo(x + pubWidth/2, y + pubHeight/2 + 1 + i * 2);
    ctx.stroke();
  }
};

// World 2 specific tower placement pad drawing
const drawWorld2TowerPad = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  isOccupied: boolean = false,
  isHighlighted: boolean = false
) => {
  const stoolRadius = 20;
  const stoolHeight = 28;
  
  // Draw shadow first
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.beginPath();
  ctx.ellipse(x + 3, y + 12, stoolRadius + 4, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  
  // Draw legs (angled perspective)
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.8;
  ctx.lineCap = 'round';
  
  // Front legs
  ctx.beginPath();
  ctx.moveTo(x - 14, y + 4);
  ctx.lineTo(x - 16, y + stoolHeight);
  ctx.moveTo(x + 14, y + 4);
  ctx.lineTo(x + 16, y + stoolHeight);
  ctx.stroke();
  
  // Back legs
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(x - 10, y - 1);
  ctx.lineTo(x - 12, y + stoolHeight - 3);
  ctx.moveTo(x + 10, y - 1);
  ctx.lineTo(x + 12, y + stoolHeight - 3);
  ctx.stroke();
  
  // Cross-bracing
  ctx.globalAlpha = 0.6;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 14, y + 18);
  ctx.lineTo(x + 14, y + 18);
  ctx.moveTo(x - 14, y + 24);
  ctx.lineTo(x + 14, y + 24);
  ctx.stroke();
  
  ctx.globalAlpha = 1.0;
  
  // Draw wooden seat base
  const woodGradient = ctx.createRadialGradient(x - 6, y - 4, 0, x, y, stoolRadius);
  woodGradient.addColorStop(0, '#D2B48C');
  woodGradient.addColorStop(0.7, '#CD853F');
  woodGradient.addColorStop(1, '#8B4513');
  
  ctx.fillStyle = woodGradient;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(x, y, stoolRadius, stoolRadius * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  
  // Draw green leather cushion
  const cushionGradient = ctx.createRadialGradient(x - 4, y - 6, 0, x, y - 2, stoolRadius - 3);
  cushionGradient.addColorStop(0, '#6B8E23');
  cushionGradient.addColorStop(0.7, '#556B2F');
  cushionGradient.addColorStop(1, '#2F4F2F');
  
  ctx.fillStyle = cushionGradient;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.ellipse(x, y - 2, stoolRadius - 3, (stoolRadius - 3) * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  
  // Highlight effect when placing tower
  if (isHighlighted) {
    ctx.strokeStyle = '#E6C200';
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

export const drawWorld2TowerPads = (
  ctx: CanvasRenderingContext2D,
  occupiedPositions: Position[] = [],
  highlightedPosition?: Position
) => {
  WORLD2_TOWER_PADS.forEach(pad => {
    const isOccupied = occupiedPositions.some(pos => {
      const distance = Math.sqrt(
        Math.pow(pos.x - pad.x, 2) + Math.pow(pos.y - pad.y, 2)
      );
      return distance < 32;
    });
    
    const isHighlighted = highlightedPosition && 
      Math.sqrt(
        Math.pow(highlightedPosition.x - pad.x, 2) + 
        Math.pow(highlightedPosition.y - pad.y, 2)
      ) < 32;
    
    drawWorld2TowerPad(ctx, pad.x, pad.y, isOccupied, isHighlighted);
  });
};

export const drawWorld2Background = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // CLEAN SLATE: Start with realistic cobblestone base color (no grass, no trees)
  ctx.fillStyle = '#6B6B6B'; // Darker gray base for authentic cobblestone look
  ctx.fillRect(0, 0, width, height);
  
  // Add realistic cobblestone texture (STATIC - no animation)
  drawCobblestonePattern(ctx, width, height);
  
  // Draw the winding street path
  drawWindingStreet(ctx);
};

// Helper functions for World 2 buildings (from backup)
const drawChurch = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  // Simplified Christ Church Cathedral for World 2
  const cathedralWidth = 50 * scale;
  const cathedralHeight = 35 * scale;
  const centralTowerHeight = 45 * scale;
  const centralTowerWidth = 16 * scale;
  
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(x - cathedralWidth/2 + 3, y - cathedralHeight/2 + 3, cathedralWidth, cathedralHeight);
  ctx.fillRect(x - centralTowerWidth/2 + 3, y - cathedralHeight/2 - centralTowerHeight + 3, centralTowerWidth, centralTowerHeight);
  
  // Main cathedral body (Irish limestone)
  ctx.fillStyle = '#B8B8B8';
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 2;
  ctx.fillRect(x - cathedralWidth/2, y - cathedralHeight/2, cathedralWidth, cathedralHeight);
  ctx.strokeRect(x - cathedralWidth/2, y - cathedralHeight/2, cathedralWidth, cathedralHeight);
  
  // Central tower
  ctx.fillRect(x - centralTowerWidth/2, y - cathedralHeight/2 - centralTowerHeight, centralTowerWidth, centralTowerHeight);
  ctx.strokeRect(x - centralTowerWidth/2, y - cathedralHeight/2 - centralTowerHeight, centralTowerWidth, centralTowerHeight);
  
  // Gothic windows
  ctx.fillStyle = '#1E3A8A';
  ctx.strokeStyle = '#F5F5F5';
  ctx.lineWidth = 1.5;
  
  // Great window
  const windowWidth = 10 * scale;
  const windowHeight = 16 * scale;
  ctx.beginPath();
  ctx.arc(x, y - 5 * scale, windowWidth/2, Math.PI, 0);
  ctx.lineTo(x + windowWidth/2, y + 11 * scale);
  ctx.lineTo(x - windowWidth/2, y + 11 * scale);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Gothic entrance
  ctx.fillStyle = '#654321';
  ctx.strokeStyle = '#4A2C17';
  ctx.lineWidth = 2;
  const doorWidth = 12 * scale;
  const doorHeight = 16 * scale;
  
  ctx.beginPath();
  ctx.arc(x, y + cathedralHeight/2 - doorHeight + doorWidth/3, doorWidth/3, Math.PI, 0);
  ctx.lineTo(x + doorWidth/3, y + cathedralHeight/2);
  ctx.lineTo(x - doorWidth/3, y + cathedralHeight/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

const drawPoolbegTowers = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  // Dublin's iconic twin red and white striped smokestacks
  const towerHeight = 70 * scale;
  const towerWidth = 6 * scale;
  const towerSpacing = 15 * scale;
  const powerStationWidth = 30 * scale;
  const powerStationHeight = 18 * scale;
  const stripeHeight = 6 * scale;
  
  // Power station base
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(x - powerStationWidth/2 + 2, y + 2, powerStationWidth, powerStationHeight);
  
  ctx.fillStyle = '#B0B0B0';
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 1.5;
  ctx.fillRect(x - powerStationWidth/2, y, powerStationWidth, powerStationHeight);
  ctx.strokeRect(x - powerStationWidth/2, y, powerStationWidth, powerStationHeight);
  
  // Left tower
  const leftTowerX = x - towerSpacing/2;
  const towerBaseY = y;
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(leftTowerX - towerWidth/2 + 1, towerBaseY - towerHeight + 1, towerWidth, towerHeight);
  
  const numStripes = Math.floor(towerHeight / stripeHeight);
  for (let i = 0; i < numStripes; i++) {
    const stripeY = towerBaseY - towerHeight + (i * stripeHeight);
    const isRedStripe = i % 2 === 0;
    
    ctx.fillStyle = isRedStripe ? '#DC143C' : '#FFFFFF';
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 0.5;
    
    ctx.fillRect(leftTowerX - towerWidth/2, stripeY, towerWidth, stripeHeight);
    ctx.strokeRect(leftTowerX - towerWidth/2, stripeY, towerWidth, stripeHeight);
  }
  
  // Right tower
  const rightTowerX = x + towerSpacing/2;
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(rightTowerX - towerWidth/2 + 1, towerBaseY - towerHeight + 1, towerWidth, towerHeight);
  
  for (let i = 0; i < numStripes; i++) {
    const stripeY = towerBaseY - towerHeight + (i * stripeHeight);
    const isRedStripe = i % 2 === 0;
    
    ctx.fillStyle = isRedStripe ? '#DC143C' : '#FFFFFF';
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 0.5;
    
    ctx.fillRect(rightTowerX - towerWidth/2, stripeY, towerWidth, stripeHeight);
    ctx.strokeRect(rightTowerX - towerWidth/2, stripeY, towerWidth, stripeHeight);
  }
  
  // Tower outlines
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(leftTowerX - towerWidth/2, towerBaseY - towerHeight, towerWidth, towerHeight);
  ctx.strokeRect(rightTowerX - towerWidth/2, towerBaseY - towerHeight, towerWidth, towerHeight);
};

const drawEuropeanRowHouse = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string, stories: number = 3) => {
  const buildingWidth = 25 * scale;
  const storyHeight = 12 * scale;
  const buildingHeight = stories * storyHeight;
  
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(x - buildingWidth/2 + 2, y - buildingHeight/2 + 2, buildingWidth, buildingHeight);
  
  // Main building body
  ctx.fillStyle = color;
  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 1.5;
  ctx.fillRect(x - buildingWidth/2, y - buildingHeight/2, buildingWidth, buildingHeight);
  ctx.strokeRect(x - buildingWidth/2, y - buildingHeight/2, buildingWidth, buildingHeight);
  
  // Roof
  ctx.fillStyle = '#696969';
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x - buildingWidth/2 - 2, y - buildingHeight/2);
  ctx.lineTo(x, y - buildingHeight/2 - 8);
  ctx.lineTo(x + buildingWidth/2 + 2, y - buildingHeight/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Windows
  ctx.fillStyle = '#F8F9FA';
  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 1;
  
  const windowWidth = 6 * scale;
  const windowHeight = 8 * scale;
  
  for (let story = 0; story < stories; story++) {
    const storyY = y - buildingHeight/2 + (story + 0.5) * storyHeight;
    
    // Two windows per story
    for (let i = 0; i < 2; i++) {
      const winX = x - 8 + i * 8;
      
      ctx.fillRect(winX, storyY - windowHeight/2, windowWidth, windowHeight);
      ctx.strokeRect(winX, storyY - windowHeight/2, windowWidth, windowHeight);
      
      // Window cross
      ctx.beginPath();
      ctx.moveTo(winX + windowWidth/2, storyY - windowHeight/2);
      ctx.lineTo(winX + windowWidth/2, storyY + windowHeight/2);
      ctx.moveTo(winX, storyY);
      ctx.lineTo(winX + windowWidth, storyY);
      ctx.stroke();
    }
  }
  
  // Door
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 1.5;
  const doorWidth = 8 * scale;
  const doorHeight = 12 * scale;
  
  ctx.fillRect(x - doorWidth/2, y + buildingHeight/2 - doorHeight, doorWidth, doorHeight);
  ctx.strokeRect(x - doorWidth/2, y + buildingHeight/2 - doorHeight, doorWidth, doorHeight);
  
  // Door handle
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(x + 2, y + buildingHeight/2 - 6, 1, 0, Math.PI * 2);
  ctx.fill();
};

export const drawWorld2Decorations = (ctx: CanvasRenderingContext2D) => {
  // Draw Paddy's Pub at the exact same location as World 1
  drawPaddysPub(ctx);
  
  // Add buildings from backup, positioned to avoid enemy path, pub, and tower pads
  // Enemy path goes through: (-20,300) → (80,300) → (150,200) → (250,150) → (350,200) → (400,300) → (450,450) → (550,450) → (600,350) → (650,200) → (700,150) → (750,200) → (750,350) → (850,350)
  // Tower pads are at various positions around the path
  
  // Christ Church Cathedral - positioned away from path and pads
  drawChurch(ctx, 200, 500, 1.0); // Lower left area, safe from path
  
  // Poolbeg Towers - iconic Dublin landmark, positioned safely
  drawPoolbegTowers(ctx, 500, 100, 1.0); // Upper central area, away from path
  
  // European terraced houses - positioned in safe areas
  const terracedHouseColors = ['#2E8B57', '#708090', '#008B8B', '#228B22', '#2F4F4F'];
  
  // Upper area terraced houses
  drawEuropeanRowHouse(ctx, 120, 120, 1.0, terracedHouseColors[0], 3); // Upper left
  drawEuropeanRowHouse(ctx, 180, 100, 1.0, terracedHouseColors[1], 3); // Upper left
  drawEuropeanRowHouse(ctx, 240, 120, 1.0, terracedHouseColors[2], 3); // Upper left
  
  // Right side terraced houses
  drawEuropeanRowHouse(ctx, 600, 500, 1.0, terracedHouseColors[3], 3); // Lower right
  drawEuropeanRowHouse(ctx, 660, 480, 1.0, terracedHouseColors[4], 3); // Lower right
  drawEuropeanRowHouse(ctx, 720, 500, 1.0, terracedHouseColors[0], 3); // Lower right
  
  // Left side terraced houses
  drawEuropeanRowHouse(ctx, 80, 400, 1.0, terracedHouseColors[1], 3); // Left side
  drawEuropeanRowHouse(ctx, 120, 450, 1.0, terracedHouseColors[2], 3); // Left side
  
  // Central area terraced houses (positioned carefully around path)
  drawEuropeanRowHouse(ctx, 320, 500, 1.0, terracedHouseColors[3], 3); // Lower central
  drawEuropeanRowHouse(ctx, 380, 480, 1.0, terracedHouseColors[4], 3); // Lower central
};

// World 2 specific helper functions for tower placement
export const findNearestWorld2PlacementPad = (position: Position): Position | null => {
  let nearestPad: Position | null = null;
  let minDistance = Infinity;
  
  WORLD2_TOWER_PADS.forEach(pad => {
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

export const isValidWorld2PlacementPosition = (
  position: Position, 
  occupiedPositions: Position[] = []
): boolean => {
  // Check if position is near a World 2 placement pad
  const nearestPad = findNearestWorld2PlacementPad(position);
  if (!nearestPad) return false;
  
  // Check if the pad is already occupied
  const isOccupied = occupiedPositions.some(pos => {
    const distance = Math.sqrt(
      Math.pow(pos.x - nearestPad.x, 2) + Math.pow(pos.y - nearestPad.y, 2)
    );
    return distance < 32;
  });
  
  return !isOccupied;
};

// NO TREES, NO GRASS, NO SHARED CODE WITH WORLD 1