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
  
  // === SIMPLE SMOKE (static, clean) ===
  ctx.fillStyle = 'rgba(200, 200, 200, 0.6)';
  for (let i = 0; i < 3; i++) {
    const smokeSize = 2 + i * 0.8;
    const smokeX = x + 11 + (i % 2 === 0 ? 1 : -1) * 1.5;
    const smokeY = y - 22 - i * 4;
    ctx.beginPath();
    ctx.arc(smokeX, smokeY, smokeSize, 0, Math.PI * 2);
    ctx.fill();
  }
  
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
  ctx.font = '8px Celtic Hand, serif';
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
  ctx.font = 'bold 8px Arial, sans-serif';
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
  // Main pub building - sized to fit with green space on both sides
  const pubWidth = 110;
  const pubHeight = 85;
  
  // Pub foundation/base
  ctx.fillStyle = '#8B7355';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 3;
  ctx.fillRect(x - pubWidth/2, y - pubHeight/2, pubWidth, pubHeight);
  ctx.strokeRect(x - pubWidth/2, y - pubHeight/2, pubWidth, pubHeight);
  
  // Stone texture on walls
  ctx.strokeStyle = '#A0522D';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x - pubWidth/2, y - pubHeight/2 + i * 15);
    ctx.lineTo(x + pubWidth/2, y - pubHeight/2 + i * 15);
    ctx.stroke();
  }
  
  // Thatched roof - larger and more detailed
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - pubWidth/2 - 5, y - pubHeight/2);
  ctx.lineTo(x, y - pubHeight/2 - 25);
  ctx.lineTo(x + pubWidth/2 + 5, y - pubHeight/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Detailed roof thatch texture
  ctx.strokeStyle = '#CD853F';
  ctx.lineWidth = 2;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(x - pubWidth/2 + i * 10, y - pubHeight/2 + 2);
    ctx.lineTo(x - pubWidth/2 + 5 + i * 10, y - pubHeight/2 - 20);
    ctx.stroke();
  }
  
  // Main entrance door - larger and more welcoming
  const doorWidth = 25;
  const doorHeight = 45;
  ctx.fillStyle = '#654321';
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 3;
  ctx.fillRect(x - doorWidth/2, y - doorHeight/2, doorWidth, doorHeight);
  ctx.strokeRect(x - doorWidth/2, y - doorHeight/2, doorWidth, doorHeight);
  
  // Door panels
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - doorWidth/2 + 3, y - doorHeight/2 + 5);
  ctx.lineTo(x + doorWidth/2 - 3, y - doorHeight/2 + 5);
  ctx.lineTo(x + doorWidth/2 - 3, y + doorHeight/2 - 5);
  ctx.lineTo(x - doorWidth/2 + 3, y + doorHeight/2 - 5);
  ctx.closePath();
  ctx.stroke();
  
  // Door handle - brass
  ctx.fillStyle = '#FFD700';
  ctx.strokeStyle = '#B8860B';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x + doorWidth/2 - 5, y, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Pub sign above door - "PADDY'S PUB" - made wider to contain text properly
  const signWidth = 95; // Increased from 85 to 95
  const signHeight = 25;
  ctx.fillStyle = '#F5DEB3'; // Lighter background for better contrast
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 3;
  ctx.fillRect(x - signWidth/2, y - pubHeight/2 - 20, signWidth, signHeight);
  ctx.strokeRect(x - signWidth/2, y - pubHeight/2 - 20, signWidth, signHeight);
  
  // Decorative border on sign - more prominent
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 3;
  ctx.strokeRect(x - signWidth/2 + 3, y - pubHeight/2 - 17, signWidth - 6, signHeight - 6);
  
  // Sign text - much larger and bolder with better contrast
  ctx.fillStyle = '#000000'; // Black text for maximum visibility
  ctx.font = 'bold 14px Arial, sans-serif'; // Use Arial for better readability
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText("PADDY'S PUB", x, y - pubHeight/2 - 7);
  
  // Add white outline to text for even better readability
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.strokeText("PADDY'S PUB", x, y - pubHeight/2 - 7);
  
  // Decorative shamrocks on sign - moved away from text for better visibility
  ctx.fillStyle = '#32CD32';
  drawShamrock(ctx, x - 35, y - pubHeight/2 - 25, 0.6); // Moved up and smaller
  drawShamrock(ctx, x + 35, y - pubHeight/2 - 25, 0.6); // Moved up and smaller
  
  // Windows on either side of door - larger for bigger building
  const windowSize = 18;
  // Left window
  ctx.fillStyle = '#87CEEB';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 2;
  ctx.fillRect(x - 45, y - 10, windowSize, windowSize);
  ctx.strokeRect(x - 45, y - 10, windowSize, windowSize);
  
  // Window cross pattern
  ctx.beginPath();
  ctx.moveTo(x - 45 + windowSize/2, y - 10);
  ctx.lineTo(x - 45 + windowSize/2, y - 10 + windowSize);
  ctx.moveTo(x - 45, y - 10 + windowSize/2);
  ctx.lineTo(x - 45 + windowSize, y - 10 + windowSize/2);
  ctx.stroke();
  
  // Right window
  ctx.fillRect(x + 27, y - 10, windowSize, windowSize);
  ctx.strokeRect(x + 27, y - 10, windowSize, windowSize);
  
  // Window cross pattern
  ctx.beginPath();
  ctx.moveTo(x + 27 + windowSize/2, y - 10);
  ctx.lineTo(x + 27 + windowSize/2, y - 10 + windowSize);
  ctx.moveTo(x + 27, y - 10 + windowSize/2);
  ctx.lineTo(x + 27 + windowSize, y - 10 + windowSize/2);
  ctx.stroke();
  
  // Chimney with smoke
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 2;
  ctx.fillRect(x + 15, y - pubHeight/2 - 35, 8, 20);
  ctx.strokeRect(x + 15, y - pubHeight/2 - 35, 8, 20);
  
  // Animated smoke from chimney
  const time = Date.now() * 0.003; // 3x faster animation
  ctx.fillStyle = 'rgba(128, 128, 128, 0.8)';
  for (let i = 0; i < 6; i++) {
    // Animated smoke positions with much more side-to-side movement
    const smokeX = x + 19 + i * 2.5 + (i % 2 === 0 ? 1 : -1) * 0.8 + Math.sin(time * 0.8 + i * 0.7) * 8; // 4x wider movement
    const smokeY = y - pubHeight/2 - 40 - i * 8 - Math.sin(time + i * 0.5) * 3;
    const smokeSize = 3 + i * 1.2;
    const smokeAlpha = 0.8 - i * 0.12;
    
    ctx.globalAlpha = smokeAlpha;
    ctx.beginPath();
    ctx.arc(smokeX, smokeY, smokeSize, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
  
  // Beer barrels at entrance instead of welcome mat
  // Left barrel
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(x - 18, y + doorHeight/2 + 8, 6, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Barrel hoops
  ctx.strokeStyle = '#696969';
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.ellipse(x - 18, y + doorHeight/2 + 4 + i * 3, 6, 1, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  // Right barrel
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(x + 18, y + doorHeight/2 + 8, 6, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Barrel hoops
  ctx.strokeStyle = '#696969';
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.ellipse(x + 18, y + doorHeight/2 + 4 + i * 3, 6, 1, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  // Lanterns on either side of entrance - positioned for larger building
  // Left lantern
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 2;
  ctx.fillRect(x - 55, y - 15, 5, 18);
  ctx.strokeRect(x - 55, y - 15, 5, 18);
  
  // Lantern light
  ctx.fillStyle = '#FFD700';
  ctx.strokeStyle = '#B8860B';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x - 52, y - 20, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Right lantern
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 2;
  ctx.fillRect(x + 50, y - 15, 5, 18);
  ctx.strokeRect(x + 50, y - 15, 5, 18);
  
  // Lantern light
  ctx.fillStyle = '#FFD700';
  ctx.strokeStyle = '#B8860B';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x + 52, y - 20, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Add some ivy or vines on the walls
  ctx.strokeStyle = '#228B22';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.7;
  
  // Left side ivy
  ctx.beginPath();
  ctx.moveTo(x - pubWidth/2, y + pubHeight/2);
  ctx.quadraticCurveTo(x - pubWidth/2 + 10, y + pubHeight/2 - 20, x - pubWidth/2 + 5, y + pubHeight/2 - 40);
  ctx.stroke();
  
  // Right side ivy
  ctx.beginPath();
  ctx.moveTo(x + pubWidth/2, y + pubHeight/2);
  ctx.quadraticCurveTo(x + pubWidth/2 - 10, y + pubHeight/2 - 20, x + pubWidth/2 - 5, y + pubHeight/2 - 40);
  ctx.stroke();
  
  ctx.globalAlpha = 1.0;
  

};