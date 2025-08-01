/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

interface MapDecorationsProps {
  ctx: CanvasRenderingContext2D;
}

export const drawMapDecorations = (ctx: CanvasRenderingContext2D) => {
  // Save context
  ctx.save();
  
  // Draw enhanced grass texture background
  drawGrassTexture(ctx);
  
  // Draw trees with enhanced styling
  const treePositions = [
    { x: 80, y: 80, size: 1.2 },
    { x: 250, y: 50, size: 0.9 },
    { x: 420, y: 80, size: 1.1 },
    { x: 680, y: 60, size: 1.0 },
    { x: 820, y: 90, size: 1.3 },
    { x: 50, y: 400, size: 1.0 },
    { x: 200, y: 380, size: 0.8 },
    { x: 480, y: 520, size: 1.2 },
    { x: 650, y: 480, size: 1.1 },
    { x: 850, y: 450, size: 0.9 },
    { x: 120, y: 520, size: 1.0 },
    { x: 780, y: 520, size: 1.1 }
  ];
  
  treePositions.forEach(pos => {
    drawEnhancedTree(ctx, pos.x, pos.y, pos.size);
  });
  
  // Draw enhanced rocks with more detail
  const rockPositions = [
    { x: 300, y: 100, size: 1.0 },
    { x: 600, y: 120, size: 1.2 },
    { x: 150, y: 480, size: 0.8 },
    { x: 400, y: 380, size: 1.1 },
    { x: 750, y: 400, size: 0.9 },
    { x: 520, y: 180, size: 1.0 },
    { x: 320, y: 520, size: 1.3 },
    { x: 680, y: 180, size: 0.7 }
  ];
  
  rockPositions.forEach(pos => {
    drawEnhancedRock(ctx, pos.x, pos.y, pos.size);
  });
  
  // Draw Irish cottages with more detail
  const cottagePositions = [
    { x: 60, y: 200 },
    { x: 180, y: 250 },
    { x: 420, y: 300 },
    { x: 650, y: 320 },
    { x: 800, y: 180 }
  ];
  
  cottagePositions.forEach(pos => {
    drawIrishCottage(ctx, pos.x, pos.y);
  });
  
  // Draw Celtic banners
  const bannerPositions = [
    { x: 100, y: 120 },
    { x: 300, y: 200 },
    { x: 600, y: 150 },
    { x: 750, y: 300 }
  ];
  
  bannerPositions.forEach(pos => {
    drawCelticBanner(ctx, pos.x, pos.y);
  });
  
  // Draw pub signs
  drawSmallPubSign(ctx, 150, 180);
  
  // Draw shamrock patches
  const shamrockPatches = [
    { x: 120, y: 300 },
    { x: 380, y: 200 },
    { x: 580, y: 380 },
    { x: 720, y: 150 }
  ];
  
  shamrockPatches.forEach(pos => {
    drawShamrockPatch(ctx, pos.x, pos.y);
  });
  
  // Draw small decorative elements
  drawSmallDecorations(ctx);
  
  // Draw the main pub entrance at the end of the path - centered with green space on both sides
  drawPubEntrance(ctx, 840, 280);
  
  // Draw small wooden banner sign AFTER the pub so it appears in front
  drawSmallWoodenBanner(ctx, 870, 320);
  
  // Restore context
  ctx.restore();
};

const drawGrassTexture = (ctx: CanvasRenderingContext2D) => {
  // Create completely static grass texture with fixed positions
  const grassColors = ['#228B22', '#32CD32', '#3CB371', '#90EE90', '#006400'];
  
  // Use seeded random for consistent grass placement
  const seed = 12345; // Fixed seed for consistent pattern
  let random = seed;
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };
  
  // Draw static grass blades - reduced count to avoid visual clutter
  for (let i = 0; i < 200; i++) {
    const x = seededRandom() * 900;
    const y = seededRandom() * 600;
    const colorIndex = Math.floor(seededRandom() * grassColors.length);
    const color = grassColors[colorIndex];
    
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.15 + seededRandom() * 0.2; // Reduced opacity
    
    // Draw small static grass blade
    ctx.fillRect(x, y, 1, 1 + seededRandom() * 1.5);
  }
  
  // Add fewer static flower spots to reduce visual noise
  for (let i = 0; i < 15; i++) {
    const x = seededRandom() * 900;
    const y = seededRandom() * 600;
    
    ctx.fillStyle = seededRandom() > 0.5 ? '#FFD700' : '#FF69B4';
    ctx.globalAlpha = 0.3; // Reduced opacity
    ctx.beginPath();
    ctx.arc(x, y, 0.8, 0, Math.PI * 2); // Smaller size
    ctx.fill();
  }
  
  ctx.globalAlpha = 1.0;
};

const drawEnhancedTree = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  // Realm Defense style chunky tree with puffy foliage clusters
  const baseSize = 14 * scale;
  const trunkWidth = 5 * scale;
  const trunkHeight = 22 * scale;
  
  // === TRUNK - Thick and textured like Realm Defense ===
  // Main trunk with gradient for depth
  const trunkGradient = ctx.createLinearGradient(x - trunkWidth/2, y, x + trunkWidth/2, y);
  trunkGradient.addColorStop(0, '#8B4513'); // Dark brown shadow side
  trunkGradient.addColorStop(0.3, '#A0522D'); // Medium brown
  trunkGradient.addColorStop(0.7, '#CD853F'); // Light brown highlight side
  trunkGradient.addColorStop(1, '#8B4513'); // Dark brown edge
  
  ctx.fillStyle = trunkGradient;
  ctx.fillRect(x - trunkWidth/2, y, trunkWidth, trunkHeight);
  
  // Trunk outline for definition
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x - trunkWidth/2, y, trunkWidth, trunkHeight);
  
  // Bark texture - vertical lines
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const lineX = x - trunkWidth/2 + 1 + i * (trunkWidth - 2) / 3;
    ctx.beginPath();
    ctx.moveTo(lineX, y + 2);
    ctx.lineTo(lineX, y + trunkHeight - 2);
    ctx.stroke();
  }
  
  // === FOLIAGE - Multiple chunky, puffy clusters ===
  
  // Shadow base for all foliage (drawn first, behind everything)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  const shadowOffset = 2 * scale;
  
  // Main center cluster shadow
  ctx.beginPath();
  ctx.arc(x + shadowOffset, y - 2 * scale + shadowOffset, baseSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Side clusters shadows
  ctx.beginPath();
  ctx.arc(x - 8 * scale + shadowOffset, y - 8 * scale + shadowOffset, baseSize * 0.8, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x + 8 * scale + shadowOffset, y - 8 * scale + shadowOffset, baseSize * 0.8, 0, Math.PI * 2);
  ctx.fill();
  
  // Top cluster shadow
  ctx.beginPath();
  ctx.arc(x + shadowOffset, y - 15 * scale + shadowOffset, baseSize * 0.7, 0, Math.PI * 2);
  ctx.fill();
  
  // === MAIN FOLIAGE CLUSTERS ===
  
  // 1. Main center cluster (largest, darkest base)
  ctx.fillStyle = '#2E7D32'; // Dark forest green base
  ctx.beginPath();
  ctx.arc(x, y - 2 * scale, baseSize, 0, Math.PI * 2);
  ctx.fill();
  
  // 2. Left side cluster
  ctx.fillStyle = '#388E3C'; // Medium green
  ctx.beginPath();
  ctx.arc(x - 8 * scale, y - 8 * scale, baseSize * 0.8, 0, Math.PI * 2);
  ctx.fill();
  
  // 3. Right side cluster
  ctx.fillStyle = '#388E3C'; // Medium green
  ctx.beginPath();
  ctx.arc(x + 8 * scale, y - 8 * scale, baseSize * 0.8, 0, Math.PI * 2);
  ctx.fill();
  
  // 4. Top center cluster
  ctx.fillStyle = '#43A047'; // Lighter green (gets more light)
  ctx.beginPath();
  ctx.arc(x, y - 15 * scale, baseSize * 0.7, 0, Math.PI * 2);
  ctx.fill();
  
  // === HIGHLIGHT LAYERS (soft edge highlights) ===
  
  // Main cluster highlight (top-left where light hits)
  ctx.fillStyle = '#66BB6A'; // Bright green highlight
  ctx.beginPath();
  ctx.arc(x - 3 * scale, y - 5 * scale, baseSize * 0.6, 0, Math.PI * 2);
  ctx.fill();
  
  // Left cluster highlight
  ctx.fillStyle = '#66BB6A';
  ctx.beginPath();
  ctx.arc(x - 10 * scale, y - 11 * scale, baseSize * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Right cluster highlight
  ctx.fillStyle = '#66BB6A';
  ctx.beginPath();
  ctx.arc(x + 6 * scale, y - 11 * scale, baseSize * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Top cluster highlight
  ctx.fillStyle = '#81C784'; // Brightest highlight (most light)
  ctx.beginPath();
  ctx.arc(x - 2 * scale, y - 18 * scale, baseSize * 0.4, 0, Math.PI * 2);
  ctx.fill();
  
  // === SMALL ACCENT CLUSTERS ===
  
  // Small clusters to fill gaps and add organic feel
  ctx.fillStyle = '#4CAF50';
  
  // Bottom left small cluster
  ctx.beginPath();
  ctx.arc(x - 12 * scale, y - 3 * scale, baseSize * 0.4, 0, Math.PI * 2);
  ctx.fill();
  
  // Bottom right small cluster
  ctx.beginPath();
  ctx.arc(x + 12 * scale, y - 3 * scale, baseSize * 0.4, 0, Math.PI * 2);
  ctx.fill();
  
  // Top left small cluster
  ctx.beginPath();
  ctx.arc(x - 5 * scale, y - 20 * scale, baseSize * 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  // Top right small cluster
  ctx.beginPath();
  ctx.arc(x + 5 * scale, y - 20 * scale, baseSize * 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  // === FINAL BRIGHT HIGHLIGHTS (very small, very bright) ===
  
  ctx.fillStyle = '#A5D6A7'; // Very bright highlight
  
  // Tiny bright spots where light hits most
  ctx.beginPath();
  ctx.arc(x - 4 * scale, y - 7 * scale, baseSize * 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x - 1 * scale, y - 19 * scale, baseSize * 0.15, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x + 7 * scale, y - 12 * scale, baseSize * 0.18, 0, Math.PI * 2);
  ctx.fill();
  
  // === OPTIONAL DETAILS ===
  
  // Add some small berries or fruits occasionally - using seeded random for consistency
  const seed = x + y * 1000;
  let random = seed;
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };
  
  if (seededRandom() > 0.6) {
    ctx.fillStyle = '#E57373'; // Soft red berries
    for (let i = 0; i < 4; i++) {
      const berryX = x + (seededRandom() - 0.5) * baseSize * 1.5;
      const berryY = y - 8 * scale + (seededRandom() - 0.5) * baseSize;
      ctx.beginPath();
      ctx.arc(berryX, berryY, 1.5 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      // Berry highlight
      ctx.fillStyle = '#FFCDD2';
      ctx.beginPath();
      ctx.arc(berryX - 0.5 * scale, berryY - 0.5 * scale, 0.8 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#E57373'; // Reset for next berry
    }
  }
};

const drawEnhancedRock = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  // Realm Defense style chunky rock cluster with warm colors and soft highlights
  const baseSize = 12 * scale;
  const shadowOffset = 2 * scale;
  
  // === SHADOWS (drawn first, behind everything) ===
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  
  // Main rock shadow
  ctx.beginPath();
  ctx.ellipse(x + shadowOffset, y + shadowOffset, baseSize, baseSize * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Side rocks shadows
  ctx.beginPath();
  ctx.ellipse(x + 8 * scale + shadowOffset, y + 4 * scale + shadowOffset, baseSize * 0.7, baseSize * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x - 6 * scale + shadowOffset, y + 3 * scale + shadowOffset, baseSize * 0.5, baseSize * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Small accent rocks shadows
  ctx.beginPath();
  ctx.ellipse(x - 3 * scale + shadowOffset, y - 4 * scale + shadowOffset, baseSize * 0.3, baseSize * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x + 10 * scale + shadowOffset, y - 2 * scale + shadowOffset, baseSize * 0.35, baseSize * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // === MAIN ROCK CLUSTER (warm base colors) ===
  
  // 1. Main center rock (largest, warm gray base)
  ctx.fillStyle = '#8D7B68'; // Warm brownish-gray base
  ctx.beginPath();
  ctx.ellipse(x, y, baseSize, baseSize * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // 2. Right side rock
  ctx.fillStyle = '#9C8B7A'; // Slightly lighter warm gray
  ctx.beginPath();
  ctx.ellipse(x + 8 * scale, y + 4 * scale, baseSize * 0.7, baseSize * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // 3. Left side rock
  ctx.fillStyle = '#7A6B5D'; // Darker warm gray for variety
  ctx.beginPath();
  ctx.ellipse(x - 6 * scale, y + 3 * scale, baseSize * 0.5, baseSize * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // 4. Small accent rocks for organic clustering
  ctx.fillStyle = '#A69B8E'; // Light warm gray
  ctx.beginPath();
  ctx.ellipse(x - 3 * scale, y - 4 * scale, baseSize * 0.3, baseSize * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x + 10 * scale, y - 2 * scale, baseSize * 0.35, baseSize * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // === SHADOW LAYERS (darker areas where light doesn't reach) ===
  
  // Main rock shadow areas
  ctx.fillStyle = '#6B5D52'; // Dark shadow color
  ctx.beginPath();
  ctx.ellipse(x + 2 * scale, y + 2 * scale, baseSize * 0.6, baseSize * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Side rocks shadow areas
  ctx.fillStyle = '#6B5D52';
  ctx.beginPath();
  ctx.ellipse(x + 9 * scale, y + 5 * scale, baseSize * 0.4, baseSize * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x - 5 * scale, y + 4 * scale, baseSize * 0.3, baseSize * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // === HIGHLIGHT LAYERS (where light hits the rocks) ===
  
  // Main rock highlights (top-left where light comes from)
  ctx.fillStyle = '#B8ADA0'; // Warm light highlight
  ctx.beginPath();
  ctx.ellipse(x - 3 * scale, y - 2 * scale, baseSize * 0.5, baseSize * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Side rocks highlights
  ctx.fillStyle = '#B8ADA0';
  ctx.beginPath();
  ctx.ellipse(x + 6 * scale, y + 2 * scale, baseSize * 0.35, baseSize * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x - 7 * scale, y + 1 * scale, baseSize * 0.25, baseSize * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Small accent highlights
  ctx.fillStyle = '#C4B9AC'; // Brighter highlight
  ctx.beginPath();
  ctx.ellipse(x - 4 * scale, y - 5 * scale, baseSize * 0.15, baseSize * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x + 8 * scale, y - 3 * scale, baseSize * 0.18, baseSize * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // === BRIGHTEST HIGHLIGHTS (very small, very bright spots) ===
  
  ctx.fillStyle = '#D4C9BC'; // Very bright warm highlight
  
  // Tiny bright spots where light hits most directly
  ctx.beginPath();
  ctx.ellipse(x - 4 * scale, y - 3 * scale, baseSize * 0.12, baseSize * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x + 7 * scale, y + 1 * scale, baseSize * 0.1, baseSize * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(x - 6 * scale, y + 0.5 * scale, baseSize * 0.08, baseSize * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // === TEXTURE AND DETAILS ===
  
  // Add subtle crack lines for rock texture
  ctx.strokeStyle = '#5A4D42'; // Dark brown for cracks
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.6;
  
  // Main rock cracks
  ctx.beginPath();
  ctx.moveTo(x - 4 * scale, y - 6 * scale);
  ctx.lineTo(x + 2 * scale, y + 4 * scale);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(x + 3 * scale, y - 3 * scale);
  ctx.lineTo(x - 2 * scale, y + 6 * scale);
  ctx.stroke();
  
  // Side rock cracks
  ctx.beginPath();
  ctx.moveTo(x + 6 * scale, y + 1 * scale);
  ctx.lineTo(x + 10 * scale, y + 6 * scale);
  ctx.stroke();
  
  ctx.globalAlpha = 1.0;
  
  // === MOSS AND VEGETATION (optional, based on position) ===
  
  // Use seeded random for consistent moss placement
  const seed = x + y * 1000;
  let random = seed;
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };
  
  if (seededRandom() > 0.4) { // 60% chance of moss
    // Moss patches in shadowed areas
    ctx.fillStyle = '#4A5D23'; // Dark moss green
    ctx.globalAlpha = 0.8;
    
    ctx.beginPath();
    ctx.ellipse(x + 1 * scale, y + 3 * scale, 3 * scale, 2 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Lighter moss highlight
    ctx.fillStyle = '#6B8E23';
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.ellipse(x + 0.5 * scale, y + 2.5 * scale, 2 * scale, 1.5 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Small moss spots on other rocks
    if (seededRandom() > 0.5) {
      ctx.fillStyle = '#4A5D23';
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.ellipse(x - 5 * scale, y + 2 * scale, 1.5 * scale, 1 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.globalAlpha = 1.0;
  }
  
  // === SUBTLE OUTLINES (very light, for definition) ===
  
  ctx.strokeStyle = '#5A4D42'; // Subtle dark outline
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.3;
  
  // Main rock outline
  ctx.beginPath();
  ctx.ellipse(x, y, baseSize, baseSize * 0.8, 0, 0, Math.PI * 2);
  ctx.stroke();
  
  // Side rocks outlines
  ctx.beginPath();
  ctx.ellipse(x + 8 * scale, y + 4 * scale, baseSize * 0.7, baseSize * 0.6, 0, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.ellipse(x - 6 * scale, y + 3 * scale, baseSize * 0.5, baseSize * 0.4, 0, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.globalAlpha = 1.0;
};

const drawIrishCottage = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // === REALM DEFENSE STYLE COTTAGE ===
  // Inspired by the reference image with clean, simple shapes and warm colors
  
  const cottageWidth = 32;
  const cottageHeight = 22;
  const cornerRadius = 3;
  
  // === SHADOW (drawn first, behind everything) ===
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  const shadowOffset = 2;
  
  // Cottage shadow
  ctx.beginPath();
  ctx.roundRect(x - cottageWidth/2 + shadowOffset, y + shadowOffset, cottageWidth, cottageHeight, cornerRadius);
  ctx.fill();
  
  // Roof shadow
  ctx.beginPath();
  ctx.moveTo(x - cottageWidth/2 - 2 + shadowOffset, y + shadowOffset);
  ctx.lineTo(x + shadowOffset, y - 16 + shadowOffset);
  ctx.lineTo(x + cottageWidth/2 + 2 + shadowOffset, y + shadowOffset);
  ctx.closePath();
  ctx.fill();
  
  // === COTTAGE WALLS (warm beige like Realm Defense) ===
  ctx.fillStyle = '#D2B48C'; // Warm sandy beige from reference
  ctx.beginPath();
  ctx.roundRect(x - cottageWidth/2, y, cottageWidth, cottageHeight, cornerRadius);
  ctx.fill();
  
  // Wall outline for definition
  ctx.strokeStyle = '#BC9A6A'; // Darker beige outline
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // === ROOF (rich brown like Realm Defense) ===
  ctx.fillStyle = '#8B4513'; // Rich brown roof
  ctx.strokeStyle = '#654321'; // Darker brown outline
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.moveTo(x - cottageWidth/2 - 2, y);
  ctx.lineTo(x, y - 16);
  ctx.lineTo(x + cottageWidth/2 + 2, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Roof highlight (where light hits)
  ctx.fillStyle = '#A0522D'; // Lighter brown highlight
  ctx.beginPath();
  ctx.moveTo(x - cottageWidth/2 - 2, y);
  ctx.lineTo(x - 2, y - 14);
  ctx.lineTo(x, y - 16);
  ctx.lineTo(x - cottageWidth/2 - 2, y);
  ctx.closePath();
  ctx.fill();
  
  // === CHIMNEY (simple gray like Realm Defense) ===
  ctx.fillStyle = '#808080'; // Medium gray
  ctx.strokeStyle = '#696969'; // Darker gray outline
  ctx.lineWidth = 1.5;
  
  ctx.beginPath();
  ctx.roundRect(x + 8, y - 20, 6, 14, 1);
  ctx.fill();
  ctx.stroke();
  
  // Chimney highlight
  ctx.fillStyle = '#A9A9A9'; // Light gray highlight
  ctx.beginPath();
  ctx.roundRect(x + 8, y - 20, 3, 14, 1);
  ctx.fill();
  
  // === ANIMATED SMOKE (handled by AnimatedSmokeSystem) ===
  // Cottage smoke is now handled by the AnimatedSmokeSystem in GameBoard
  // This keeps the chimney visible but removes static smoke
  
  // === DOOR (dark brown like Realm Defense) ===
  const doorWidth = 8;
  const doorHeight = 14;
  
  ctx.fillStyle = '#654321'; // Dark brown door
  ctx.strokeStyle = '#4A2C17'; // Very dark brown outline
  ctx.lineWidth = 1.5;
  
  ctx.beginPath();
  ctx.roundRect(x - doorWidth/2, y + cottageHeight - doorHeight, doorWidth, doorHeight, 1);
  ctx.fill();
  ctx.stroke();
  
  // Door panel (simple inset)
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - doorWidth/2 + 1, y + cottageHeight - doorHeight + 1, doorWidth - 2, doorHeight - 2, 1);
  ctx.stroke();
  
  // Door handle (simple brass dot)
  ctx.fillStyle = '#FFD700'; // Gold handle
  ctx.beginPath();
  ctx.arc(x + 2, y + cottageHeight - doorHeight/2, 1.5, 0, Math.PI * 2);
  ctx.fill();
  
  // === WINDOWS (blue with white frames like Realm Defense) ===
  const windowSize = 8;
  
  // Left window
  ctx.fillStyle = '#FFFFFF'; // White window frame
  ctx.strokeStyle = '#E0E0E0'; // Light gray frame outline
  ctx.lineWidth = 1;
  
  ctx.beginPath();
  ctx.roundRect(x - 12, y + 6, windowSize, windowSize, 1);
  ctx.fill();
  ctx.stroke();
  
  // Blue window glass
  ctx.fillStyle = '#4A90E2'; // Clean blue glass
  ctx.beginPath();
  ctx.roundRect(x - 11, y + 7, windowSize - 2, windowSize - 2, 1);
  ctx.fill();
  
  // Window cross (simple white lines)
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x - 8, y + 7);
  ctx.lineTo(x - 8, y + 13);
  ctx.moveTo(x - 11, y + 10);
  ctx.lineTo(x - 5, y + 10);
  ctx.stroke();
  
  // Right window
  ctx.fillStyle = '#FFFFFF'; // White window frame
  ctx.strokeStyle = '#E0E0E0'; // Light gray frame outline
  ctx.lineWidth = 1;
  
  ctx.beginPath();
  ctx.roundRect(x + 4, y + 6, windowSize, windowSize, 1);
  ctx.fill();
  ctx.stroke();
  
  // Blue window glass
  ctx.fillStyle = '#4A90E2'; // Clean blue glass
  ctx.beginPath();
  ctx.roundRect(x + 5, y + 7, windowSize - 2, windowSize - 2, 1);
  ctx.fill();
  
  // Window cross (simple white lines)
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 8, y + 7);
  ctx.lineTo(x + 8, y + 13);
  ctx.moveTo(x + 5, y + 10);
  ctx.lineTo(x + 11, y + 10);
  ctx.stroke();
  
  // === SUBTLE DETAILS (minimal, clean) ===
  
  // Wall highlight (where light hits the cottage)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.roundRect(x - cottageWidth/2, y, cottageWidth/3, cottageHeight, cornerRadius);
  ctx.fill();
  
  // Small decorative elements (very subtle)
  // Tiny shamrock near door (optional Irish touch)
  ctx.fillStyle = '#32CD32';
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.arc(x - 8, y + cottageHeight - 2, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
};

const drawCelticBanner = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // Banner pole
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(x - 1, y - 30, 2, 50);
  
  // Banner cloth
  ctx.fillStyle = '#228B22';
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.moveTo(x + 2, y - 25);
  ctx.lineTo(x + 25, y - 25);
  ctx.lineTo(x + 20, y - 15);
  ctx.lineTo(x + 25, y - 5);
  ctx.lineTo(x + 2, y - 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Celtic knot design
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x + 13, y - 15, 4, 0, Math.PI * 2);
  ctx.stroke();
  
  // Cross pattern
  ctx.beginPath();
  ctx.moveTo(x + 9, y - 15);
  ctx.lineTo(x + 17, y - 15);
  ctx.moveTo(x + 13, y - 19);
  ctx.lineTo(x + 13, y - 11);
  ctx.stroke();
};

const drawMainPubSign = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // Sign post with Celtic carving
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(x - 3, y, 6, 50);
  
  // Celtic spiral on post
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y + 25, 2, 0, Math.PI * 2);
  ctx.stroke();
  
  // Main sign board
  ctx.fillStyle = '#DEB887';
  ctx.strokeStyle = '#8B7355';
  ctx.lineWidth = 3;
  ctx.fillRect(x - 30, y - 20, 60, 25);
  ctx.strokeRect(x - 30, y - 20, 60, 25);
  
  // Decorative border
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 28, y - 18, 56, 21);
  
  // Sign text "THE IRISH PUB"
  ctx.fillStyle = '#228B22';
  ctx.font = 'bold 10px Celtic Hand, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('THE IRISH', x, y - 12);
  ctx.fillText('PUB', x, y - 2);
  
  // Shamrocks decoration
  ctx.fillStyle = '#32CD32';
  drawShamrock(ctx, x - 40, y - 7, 0.8);
  drawShamrock(ctx, x + 40, y - 7, 0.8);
  
  // Hanging chains
  ctx.strokeStyle = '#696969';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 25, y - 20);
  ctx.lineTo(x - 25, y - 30);
  ctx.moveTo(x + 25, y - 20);
  ctx.lineTo(x + 25, y - 30);
  ctx.stroke();
  
  // Chain links
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.ellipse(x - 25, y - 28 + i * 3, 2, 1, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 25, y - 28 + i * 3, 2, 1, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
};

const drawSmallPubSign = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // Small directional sign
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(x - 1, y, 2, 20);
  
  // Arrow sign
  ctx.fillStyle = '#DEB887';
  ctx.strokeStyle = '#8B7355';
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.moveTo(x + 2, y - 5);
  ctx.lineTo(x + 20, y - 5);
  ctx.lineTo(x + 25, y);
  ctx.lineTo(x + 20, y + 5);
  ctx.lineTo(x + 2, y + 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Text
  ctx.fillStyle = '#228B22';
  ctx.font = '7px Arial, sans-serif'; // Changed to Arial for better readability
  ctx.textAlign = 'center';
  ctx.fillText('PUB', x + 13, y + 1);
};

const drawSmallWoodenBanner = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // Small wooden post
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(x - 2, y, 4, 30);
  
  // Small banner - made wider to contain "WELCOME" text properly
  ctx.fillStyle = '#DEB887';
  ctx.strokeStyle = '#8B7355';
  ctx.lineWidth = 2;
  ctx.fillRect(x - 18, y - 8, 36, 12); // Increased from 30 to 36 width
  ctx.strokeRect(x - 18, y - 8, 36, 12);
  
  // Simple decorative border
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 1;
  ctx.strokeRect(x - 16, y - 6, 32, 8); // Adjusted border to match new width
  
  // Small text
  ctx.fillStyle = '#228B22';
  ctx.font = 'bold 9px Arial, sans-serif'; // Slightly larger for better visibility
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('WELCOME', x, y - 2);
};

const drawCelticStoneCircle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const stones = 6;
  const radius = 15;
  
  for (let i = 0; i < stones; i++) {
    const angle = (i / stones) * Math.PI * 2;
    const stoneX = x + Math.cos(angle) * radius;
    const stoneY = y + Math.sin(angle) * radius;
    
    // Stone
    ctx.fillStyle = '#696969';
    ctx.strokeStyle = '#2F4F4F';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.ellipse(stoneX, stoneY, 3, 5, angle, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  
  // Center stone with Celtic symbol
  ctx.fillStyle = '#808080';
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Celtic triple spiral
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, Math.PI * 2);
  ctx.stroke();
};

const drawShamrockPatch = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // Multiple shamrocks in a small area - using seeded random for consistent positions
  const seed = x + y * 1000; // Create seed based on position
  let random = seed;
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };
  
  for (let i = 0; i < 5; i++) {
    const shamrockX = x + (seededRandom() - 0.5) * 20;
    const shamrockY = y + (seededRandom() - 0.5) * 20;
    const scale = 0.5 + seededRandom() * 0.5;
    
    drawShamrock(ctx, shamrockX, shamrockY, scale);
  }
};

const drawShamrock = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  const leafSize = 3 * scale;
  
  ctx.fillStyle = '#32CD32';
  ctx.strokeStyle = '#228B22';
  ctx.lineWidth = 1;
  
  // Four leaves
  ctx.beginPath();
  ctx.arc(x - leafSize/2, y - leafSize/2, leafSize, 0, Math.PI * 2);
  ctx.arc(x + leafSize/2, y - leafSize/2, leafSize, 0, Math.PI * 2);
  ctx.arc(x - leafSize/2, y + leafSize/2, leafSize, 0, Math.PI * 2);
  ctx.arc(x + leafSize/2, y + leafSize/2, leafSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Stem
  ctx.fillStyle = '#228B22';
  ctx.fillRect(x - 0.5, y + leafSize, 1, leafSize * 1.5);
};

const drawSmallDecorations = (ctx: CanvasRenderingContext2D) => {
  // Small mushrooms
  const mushroomPositions = [
    { x: 130, y: 350 },
    { x: 280, y: 420 },
    { x: 520, y: 300 },
    { x: 680, y: 420 }
  ];
  
  mushroomPositions.forEach(pos => {
    // Mushroom stem
    ctx.fillStyle = '#F5DEB3';
    ctx.fillRect(pos.x - 1, pos.y, 2, 6);
    
    // Mushroom cap
    ctx.fillStyle = '#DC143C';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y - 1, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // White spots
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(pos.x - 1, pos.y - 2, 1, 0, Math.PI * 2);
    ctx.arc(pos.x + 2, pos.y, 0.5, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Celtic knot decorations on ground
  const knotPositions = [
    { x: 200, y: 150 },
    { x: 500, y: 200 },
    { x: 350, y: 450 }
  ];
  
  knotPositions.forEach(pos => {
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(pos.x - 6, pos.y);
    ctx.lineTo(pos.x + 6, pos.y);
    ctx.moveTo(pos.x, pos.y - 6);
    ctx.lineTo(pos.x, pos.y + 6);
    ctx.stroke();
    
    ctx.globalAlpha = 1.0;
  });
};

const drawPubEntrance = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // === ENHANCED PADDY'S PUB - INSPIRED BY REFERENCE IMAGE ===
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