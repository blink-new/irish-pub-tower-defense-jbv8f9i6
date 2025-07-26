/* eslint-disable @typescript-eslint/no-use-before-define */
// Natural tree-line border with darker grass gradient for Irish Pub Tower Defense
// Inspired by Realm Defense style natural boundaries

export const drawNaturalMapBorder = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Save context
  ctx.save();
  
  // Draw high-density tree-line border only (grass gradient removed)
  drawTreeLineBorder(ctx, width, height);
  
  // Restore context
  ctx.restore();
};



const drawTreeLineBorder = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const borderDepth = 35; // Border depth for tree placement
  
  // Create seeded random for consistent tree placement
  let treeSeed = 12345;
  const treeRandom = () => {
    treeSeed = (treeSeed * 9301 + 49297) % 233280;
    return treeSeed / 233280;
  };
  
  // Top border trees - high density
  const topTreeCount = Math.floor(width / 25); // Dense spacing
  for (let i = 0; i < topTreeCount; i++) {
    const x = (i / (topTreeCount - 1)) * width + (treeRandom() - 0.5) * 20;
    const y = treeRandom() * borderDepth;
    const scale = 0.6 + treeRandom() * 0.8;
    const treeType = Math.floor(treeRandom() * 3); // 3 different tree types
    
    drawBorderTree(ctx, x, y, scale, treeType);
  }
  
  // Bottom border trees - high density
  const bottomTreeCount = Math.floor(width / 25);
  for (let i = 0; i < bottomTreeCount; i++) {
    const x = (i / (bottomTreeCount - 1)) * width + (treeRandom() - 0.5) * 20;
    const y = height - borderDepth + treeRandom() * borderDepth;
    const scale = 0.6 + treeRandom() * 0.8;
    const treeType = Math.floor(treeRandom() * 3);
    
    drawBorderTree(ctx, x, y, scale, treeType);
  }
  
  // Left border trees - high density
  const leftTreeCount = Math.floor(height / 25);
  for (let i = 0; i < leftTreeCount; i++) {
    const x = treeRandom() * borderDepth;
    const y = (i / (leftTreeCount - 1)) * height + (treeRandom() - 0.5) * 20;
    const scale = 0.6 + treeRandom() * 0.8;
    const treeType = Math.floor(treeRandom() * 3);
    
    drawBorderTree(ctx, x, y, scale, treeType);
  }
  
  // Right border trees - high density
  const rightTreeCount = Math.floor(height / 25);
  for (let i = 0; i < rightTreeCount; i++) {
    const x = width - borderDepth + treeRandom() * borderDepth;
    const y = (i / (rightTreeCount - 1)) * height + (treeRandom() - 0.5) * 20;
    const scale = 0.6 + treeRandom() * 0.8;
    const treeType = Math.floor(treeRandom() * 3);
    
    drawBorderTree(ctx, x, y, scale, treeType);
  }
  
  // Add some bushes and rocks for variety
  drawBorderBushes(ctx, width, height, borderDepth);
  drawBorderRocks(ctx, width, height, borderDepth);
};

const drawBorderTree = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, treeType: number) => {
  const trunkWidth = 4 * scale;
  const trunkHeight = 15 * scale;
  const foliageRadius = 12 * scale;
  
  // Tree shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(x + 2, y + trunkHeight + 2, foliageRadius * 0.8, foliageRadius * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Trunk with wood texture
  const trunkGradient = ctx.createLinearGradient(x - trunkWidth/2, y, x + trunkWidth/2, y);
  trunkGradient.addColorStop(0, '#3E2723');
  trunkGradient.addColorStop(0.5, '#5D4037');
  trunkGradient.addColorStop(1, '#3E2723');
  
  ctx.fillStyle = trunkGradient;
  ctx.strokeStyle = '#2E2E2E';
  ctx.lineWidth = 1;
  ctx.fillRect(x - trunkWidth/2, y + trunkHeight - trunkHeight, trunkWidth, trunkHeight);
  ctx.strokeRect(x - trunkWidth/2, y + trunkHeight - trunkHeight, trunkWidth, trunkHeight);
  
  // Different foliage types for variety
  switch (treeType) {
    case 0: // Oak-style tree
      drawOakFoliage(ctx, x, y, foliageRadius, scale);
      break;
    case 1: // Pine-style tree
      drawPineFoliage(ctx, x, y, foliageRadius, scale);
      break;
    case 2: // Birch-style tree
      drawBirchFoliage(ctx, x, y, foliageRadius, scale);
      break;
  }
};

const drawOakFoliage = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, scale: number) => {
  // Multiple layers of foliage for depth
  const foliageColors = ['#1B5E20', '#2E7D32', '#388E3C', '#43A047'];
  
  foliageColors.forEach((color, index) => {
    const layerRadius = radius - index * 2;
    const offsetX = (index % 2 === 0 ? -1 : 1) * index * scale;
    const offsetY = -index * 2 * scale;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + offsetX, y - 8 * scale + offsetY, layerRadius, 0, Math.PI * 2);
    ctx.fill();
  });
};

const drawPineFoliage = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, scale: number) => {
  // Triangular pine shape with layers
  const layers = 3;
  const layerHeight = radius * 0.8;
  
  for (let i = 0; i < layers; i++) {
    const layerY = y - (i * layerHeight * 0.6);
    const layerWidth = radius * (1 - i * 0.2);
    
    ctx.fillStyle = i === 0 ? '#1B5E20' : i === 1 ? '#2E7D32' : '#388E3C';
    ctx.beginPath();
    ctx.moveTo(x, layerY - layerHeight);
    ctx.lineTo(x - layerWidth, layerY);
    ctx.lineTo(x + layerWidth, layerY);
    ctx.closePath();
    ctx.fill();
  }
};

const drawBirchFoliage = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, scale: number) => {
  // Light, airy foliage with gaps
  const foliageColors = ['#43A047', '#4CAF50', '#66BB6A'];
  
  // Draw multiple small clusters
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const clusterX = x + Math.cos(angle) * radius * 0.6;
    const clusterY = y - 8 * scale + Math.sin(angle) * radius * 0.4;
    const clusterSize = radius * 0.4;
    
    ctx.fillStyle = foliageColors[i % foliageColors.length];
    ctx.beginPath();
    ctx.arc(clusterX, clusterY, clusterSize, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawBorderBushes = (ctx: CanvasRenderingContext2D, width: number, height: number, borderDepth: number) => {
  // Create seeded random for consistent bush placement
  let bushSeed = 54321;
  const bushRandom = () => {
    bushSeed = (bushSeed * 9301 + 49297) % 233280;
    return bushSeed / 233280;
  };
  
  const bushPositions = [
    // Top border bushes
    ...Array.from({length: 8}, (_, i) => ({
      x: (i / 7) * width + (bushRandom() - 0.5) * 40,
      y: bushRandom() * borderDepth * 0.7,
      scale: 0.4 + bushRandom() * 0.4
    })),
    // Bottom border bushes
    ...Array.from({length: 8}, (_, i) => ({
      x: (i / 7) * width + (bushRandom() - 0.5) * 40,
      y: height - borderDepth * 0.7 + bushRandom() * borderDepth * 0.7,
      scale: 0.4 + bushRandom() * 0.4
    })),
    // Side border bushes
    ...Array.from({length: 6}, (_, i) => ({
      x: bushRandom() * borderDepth * 0.7,
      y: (i / 5) * height + (bushRandom() - 0.5) * 40,
      scale: 0.4 + bushRandom() * 0.4
    })),
    ...Array.from({length: 6}, (_, i) => ({
      x: width - borderDepth * 0.7 + bushRandom() * borderDepth * 0.7,
      y: (i / 5) * height + (bushRandom() - 0.5) * 40,
      scale: 0.4 + bushRandom() * 0.4
    }))
  ];
  
  bushPositions.forEach(bush => {
    drawBorderBush(ctx, bush.x, bush.y, bush.scale);
  });
};

const drawBorderBush = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  const bushSize = 8 * scale;
  
  // Bush shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.beginPath();
  ctx.ellipse(x + 1, y + 1, bushSize, bushSize * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Main bush body
  ctx.fillStyle = '#2E7D32';
  ctx.strokeStyle = '#1B5E20';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(x, y, bushSize, bushSize * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Bush texture with small leafy details
  ctx.fillStyle = '#388E3C';
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const leafX = x + Math.cos(angle) * bushSize * 0.5;
    const leafY = y + Math.sin(angle) * bushSize * 0.3;
    
    ctx.beginPath();
    ctx.arc(leafX, leafY, 2 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawBorderRocks = (ctx: CanvasRenderingContext2D, width: number, height: number, borderDepth: number) => {
  // Create seeded random for consistent rock placement
  let rockSeed = 98765;
  const rockRandom = () => {
    rockSeed = (rockSeed * 9301 + 49297) % 233280;
    return rockSeed / 233280;
  };
  
  const rockPositions = [
    // Scattered rocks around the border
    ...Array.from({length: 12}, () => ({
      x: rockRandom() * width,
      y: rockRandom() * borderDepth,
      scale: 0.3 + rockRandom() * 0.5
    })),
    ...Array.from({length: 12}, () => ({
      x: rockRandom() * width,
      y: height - borderDepth + rockRandom() * borderDepth,
      scale: 0.3 + rockRandom() * 0.5
    })),
    ...Array.from({length: 8}, () => ({
      x: rockRandom() * borderDepth,
      y: rockRandom() * height,
      scale: 0.3 + rockRandom() * 0.5
    })),
    ...Array.from({length: 8}, () => ({
      x: width - borderDepth + rockRandom() * borderDepth,
      y: rockRandom() * height,
      scale: 0.3 + rockRandom() * 0.5
    }))
  ];
  
  rockPositions.forEach(rock => {
    drawBorderRock(ctx, rock.x, rock.y, rock.scale);
  });
};

const drawBorderRock = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  const rockSize = 4 * scale;
  
  // Rock shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(x + 1, y + 1, rockSize, rockSize * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Main rock with gradient
  const rockGradient = ctx.createRadialGradient(x - 1, y - 1, 0, x, y, rockSize);
  rockGradient.addColorStop(0, '#BDBDBD');
  rockGradient.addColorStop(1, '#757575');
  
  ctx.fillStyle = rockGradient;
  ctx.strokeStyle = '#424242';
  ctx.lineWidth = 0.5;
  
  ctx.beginPath();
  ctx.ellipse(x, y, rockSize, rockSize * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
};