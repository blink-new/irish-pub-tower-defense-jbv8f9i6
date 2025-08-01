/* eslint-disable @typescript-eslint/no-use-before-define */
// Decorative border for Irish Pub Tower Defense map
// Inspired by Realm Defense style with Irish-themed natural elements

export const drawMapBorder = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Save context
  ctx.save();
  
  // Define border thickness and playable area
  const borderThickness = 40;
  const playableArea = {
    left: borderThickness,
    top: borderThickness,
    right: width - borderThickness,
    bottom: height - borderThickness
  };
  
  // Draw border sections
  drawTopBorder(ctx, width, borderThickness);
  drawBottomBorder(ctx, width, height, borderThickness);
  drawLeftBorder(ctx, height, borderThickness);
  drawRightBorder(ctx, width, height, borderThickness);
  
  // Draw corner decorations
  drawCornerDecorations(ctx, width, height, borderThickness);
  
  // Add natural elements throughout the border
  drawBorderTrees(ctx, width, height, borderThickness);
  drawBorderRocks(ctx, width, height, borderThickness);
  drawBorderStreams(ctx, width, height, borderThickness);
  drawBorderHedges(ctx, width, height, borderThickness);
  
  // Restore context
  ctx.restore();
};

const drawTopBorder = (ctx: CanvasRenderingContext2D, width: number, borderThickness: number) => {
  // Top border background - darker forest green
  const gradient = ctx.createLinearGradient(0, 0, 0, borderThickness);
  gradient.addColorStop(0, '#1B5E20'); // Dark forest green
  gradient.addColorStop(0.7, '#2E7D32'); // Medium green
  gradient.addColorStop(1, '#388E3C'); // Lighter green blending into map
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, borderThickness);
  
  // Add organic texture
  drawBorderTexture(ctx, 0, 0, width, borderThickness);
};

const drawBottomBorder = (ctx: CanvasRenderingContext2D, width: number, height: number, borderThickness: number) => {
  const startY = height - borderThickness;
  
  // Bottom border background
  const gradient = ctx.createLinearGradient(0, startY, 0, height);
  gradient.addColorStop(0, '#388E3C'); // Lighter green blending from map
  gradient.addColorStop(0.3, '#2E7D32'); // Medium green
  gradient.addColorStop(1, '#1B5E20'); // Dark forest green
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, startY, width, borderThickness);
  
  // Add organic texture
  drawBorderTexture(ctx, 0, startY, width, borderThickness);
};

const drawLeftBorder = (ctx: CanvasRenderingContext2D, height: number, borderThickness: number) => {
  // Left border background
  const gradient = ctx.createLinearGradient(0, 0, borderThickness, 0);
  gradient.addColorStop(0, '#1B5E20'); // Dark forest green
  gradient.addColorStop(0.7, '#2E7D32'); // Medium green
  gradient.addColorStop(1, '#388E3C'); // Lighter green blending into map
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, borderThickness, height);
  
  // Add organic texture
  drawBorderTexture(ctx, 0, 0, borderThickness, height);
};

const drawRightBorder = (ctx: CanvasRenderingContext2D, width: number, height: number, borderThickness: number) => {
  const startX = width - borderThickness;
  
  // Right border background
  const gradient = ctx.createLinearGradient(startX, 0, width, 0);
  gradient.addColorStop(0, '#388E3C'); // Lighter green blending from map
  gradient.addColorStop(0.3, '#2E7D32'); // Medium green
  gradient.addColorStop(1, '#1B5E20'); // Dark forest green
  
  ctx.fillStyle = gradient;
  ctx.fillRect(startX, 0, borderThickness, height);
  
  // Add organic texture
  drawBorderTexture(ctx, startX, 0, borderThickness, height);
};

const drawBorderTexture = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
  // Create seeded random for consistent texture
  let seed = x + y * 1000;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  // Add organic grass texture
  const grassColors = ['#2E7D32', '#388E3C', '#43A047', '#4CAF50'];
  
  for (let i = 0; i < Math.floor((width * height) / 100); i++) {
    const grassX = x + seededRandom() * width;
    const grassY = y + seededRandom() * height;
    const colorIndex = Math.floor(seededRandom() * grassColors.length);
    
    ctx.fillStyle = grassColors[colorIndex];
    ctx.globalAlpha = 0.3 + seededRandom() * 0.4;
    
    // Small organic grass patches
    ctx.beginPath();
    ctx.arc(grassX, grassY, 1 + seededRandom() * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.globalAlpha = 1.0;
};

const drawCornerDecorations = (ctx: CanvasRenderingContext2D, width: number, height: number, borderThickness: number) => {
  // Top-left corner - Celtic stone circle
  drawCelticStoneCircle(ctx, borderThickness/2, borderThickness/2, 0.8);
  
  // Top-right corner - Ancient tree
  drawAncientTree(ctx, width - borderThickness/2, borderThickness/2, 1.2);
  
  // Bottom-left corner - Stone cairn
  drawStoneCairn(ctx, borderThickness/2, height - borderThickness/2, 1.0);
  
  // Bottom-right corner - Irish well
  drawIrishWell(ctx, width - borderThickness/2, height - borderThickness/2, 1.0);
};

const drawCelticStoneCircle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number) => {
  const stones = 6;
  const radius = 12 * scale;
  
  // Draw shadow first
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  for (let i = 0; i < stones; i++) {
    const angle = (i / stones) * Math.PI * 2;
    const stoneX = centerX + Math.cos(angle) * radius + 1;
    const stoneY = centerY + Math.sin(angle) * radius + 1;
    
    ctx.beginPath();
    ctx.ellipse(stoneX, stoneY, 3 * scale, 6 * scale, angle, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw stones
  for (let i = 0; i < stones; i++) {
    const angle = (i / stones) * Math.PI * 2;
    const stoneX = centerX + Math.cos(angle) * radius;
    const stoneY = centerY + Math.sin(angle) * radius;
    
    // Stone gradient
    const stoneGradient = ctx.createRadialGradient(stoneX - 1, stoneY - 2, 0, stoneX, stoneY, 4 * scale);
    stoneGradient.addColorStop(0, '#BDBDBD');
    stoneGradient.addColorStop(1, '#757575');
    
    ctx.fillStyle = stoneGradient;
    ctx.strokeStyle = '#424242';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.ellipse(stoneX, stoneY, 3 * scale, 6 * scale, angle, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  
  // Center stone with Celtic symbol
  ctx.fillStyle = '#9E9E9E';
  ctx.strokeStyle = '#616161';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 4 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Celtic triple spiral
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 2 * scale, 0, Math.PI * 2);
  ctx.stroke();
};

const drawAncientTree = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  // Ancient oak tree with gnarled branches
  const trunkWidth = 6 * scale;
  const trunkHeight = 20 * scale;
  
  // Tree shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(x + 2, y + 2, 15 * scale, 12 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Trunk with texture
  const trunkGradient = ctx.createLinearGradient(x - trunkWidth/2, y, x + trunkWidth/2, y);
  trunkGradient.addColorStop(0, '#5D4037');
  trunkGradient.addColorStop(0.5, '#8D6E63');
  trunkGradient.addColorStop(1, '#5D4037');
  
  ctx.fillStyle = trunkGradient;
  ctx.strokeStyle = '#3E2723';
  ctx.lineWidth = 1;
  ctx.fillRect(x - trunkWidth/2, y, trunkWidth, trunkHeight);
  ctx.strokeRect(x - trunkWidth/2, y, trunkWidth, trunkHeight);
  
  // Gnarled branches
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 2 * scale;
  ctx.lineCap = 'round';
  
  // Main branches
  ctx.beginPath();
  ctx.moveTo(x, y - 5);
  ctx.quadraticCurveTo(x - 8 * scale, y - 12 * scale, x - 12 * scale, y - 18 * scale);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(x, y - 5);
  ctx.quadraticCurveTo(x + 8 * scale, y - 12 * scale, x + 12 * scale, y - 18 * scale);
  ctx.stroke();
  
  // Foliage clusters
  const foliageColors = ['#2E7D32', '#388E3C', '#43A047'];
  
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const clusterX = x + Math.cos(angle) * 10 * scale;
    const clusterY = y - 15 * scale + Math.sin(angle) * 8 * scale;
    const clusterSize = 6 + Math.sin(i) * 3;
    
    ctx.fillStyle = foliageColors[i % foliageColors.length];
    ctx.beginPath();
    ctx.arc(clusterX, clusterY, clusterSize * scale, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawStoneCairn = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  // Stack of balanced stones
  const stones = [
    { width: 8 * scale, height: 4 * scale, y: 0 },
    { width: 6 * scale, height: 3 * scale, y: -4 * scale },
    { width: 5 * scale, height: 3 * scale, y: -7 * scale },
    { width: 4 * scale, height: 2 * scale, y: -10 * scale },
    { width: 3 * scale, height: 2 * scale, y: -12 * scale }
  ];
  
  // Draw shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(x + 1, y + 1, 8 * scale, 4 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw stones from bottom to top
  stones.forEach((stone, index) => {
    const stoneY = y + stone.y;
    
    // Stone gradient
    const stoneGradient = ctx.createRadialGradient(x - 1, stoneY - 1, 0, x, stoneY, stone.width);
    stoneGradient.addColorStop(0, '#BDBDBD');
    stoneGradient.addColorStop(1, '#757575');
    
    ctx.fillStyle = stoneGradient;
    ctx.strokeStyle = '#424242';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.ellipse(x, stoneY, stone.width, stone.height, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Add moss on lower stones
    if (index < 2) {
      ctx.fillStyle = '#4CAF50';
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.ellipse(x - stone.width/3, stoneY + stone.height/3, stone.width/4, stone.height/4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  });
};

const drawIrishWell = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  // Traditional Irish stone well
  const wellRadius = 8 * scale;
  const wellDepth = 4 * scale;
  
  // Well shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.arc(x + 1, y + 1, wellRadius + 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Well rim (stone)
  ctx.fillStyle = '#9E9E9E';
  ctx.strokeStyle = '#616161';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, wellRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Well interior (dark water)
  ctx.fillStyle = '#1A237E';
  ctx.beginPath();
  ctx.arc(x, y, wellRadius - 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Water reflection
  ctx.fillStyle = '#3F51B5';
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(x - 2, y - 2, wellRadius - 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  
  // Well bucket (small)
  ctx.fillStyle = '#8D6E63';
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x + wellRadius - 2, y - wellRadius + 2, 4 * scale, 3 * scale, 1);
  ctx.fill();
  ctx.stroke();
  
  // Bucket handle
  ctx.strokeStyle = '#424242';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x + wellRadius, y - wellRadius + 3, 2 * scale, 0, Math.PI);
  ctx.stroke();
};

const drawBorderTrees = (ctx: CanvasRenderingContext2D, width: number, height: number, borderThickness: number) => {
  // Tree positions along borders (avoiding corners and gameplay areas)
  const treePositions = [
    // Top border trees
    { x: width * 0.2, y: borderThickness * 0.5, scale: 0.8 },
    { x: width * 0.4, y: borderThickness * 0.6, scale: 1.0 },
    { x: width * 0.6, y: borderThickness * 0.4, scale: 0.9 },
    { x: width * 0.8, y: borderThickness * 0.5, scale: 1.1 },
    
    // Bottom border trees
    { x: width * 0.15, y: height - borderThickness * 0.6, scale: 0.9 },
    { x: width * 0.35, y: height - borderThickness * 0.4, scale: 1.0 },
    { x: width * 0.65, y: height - borderThickness * 0.7, scale: 0.8 },
    { x: width * 0.85, y: height - borderThickness * 0.5, scale: 1.2 },
    
    // Left border trees
    { x: borderThickness * 0.6, y: height * 0.25, scale: 0.7 },
    { x: borderThickness * 0.4, y: height * 0.5, scale: 1.0 },
    { x: borderThickness * 0.7, y: height * 0.75, scale: 0.9 },
    
    // Right border trees
    { x: width - borderThickness * 0.5, y: height * 0.2, scale: 0.8 },
    { x: width - borderThickness * 0.6, y: height * 0.45, scale: 1.1 },
    { x: width - borderThickness * 0.4, y: height * 0.7, scale: 0.9 }
  ];
  
  treePositions.forEach(pos => {
    drawBorderTree(ctx, pos.x, pos.y, pos.scale);
  });
};

const drawBorderTree = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  // Simplified tree for border decoration
  const trunkWidth = 3 * scale;
  const trunkHeight = 12 * scale;
  const foliageRadius = 8 * scale;
  
  // Tree shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.beginPath();
  ctx.ellipse(x + 1, y + 1, foliageRadius, foliageRadius * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Trunk
  ctx.fillStyle = '#5D4037';
  ctx.strokeStyle = '#3E2723';
  ctx.lineWidth = 1;
  ctx.fillRect(x - trunkWidth/2, y, trunkWidth, trunkHeight);
  ctx.strokeRect(x - trunkWidth/2, y, trunkWidth, trunkHeight);
  
  // Foliage (multiple layers for depth)
  const foliageColors = ['#1B5E20', '#2E7D32', '#388E3C', '#43A047'];
  
  foliageColors.forEach((color, index) => {
    const layerRadius = foliageRadius - index * 1.5;
    const offsetX = (index % 2 === 0 ? -1 : 1) * index;
    const offsetY = -index * 2;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + offsetX, y - 5 + offsetY, layerRadius, 0, Math.PI * 2);
    ctx.fill();
  });
};

const drawBorderRocks = (ctx: CanvasRenderingContext2D, width: number, height: number, borderThickness: number) => {
  // Rock cluster positions
  const rockPositions = [
    // Top border rocks
    { x: width * 0.1, y: borderThickness * 0.7, scale: 0.8 },
    { x: width * 0.3, y: borderThickness * 0.3, scale: 1.0 },
    { x: width * 0.7, y: borderThickness * 0.8, scale: 0.9 },
    { x: width * 0.9, y: borderThickness * 0.4, scale: 0.7 },
    
    // Bottom border rocks
    { x: width * 0.25, y: height - borderThickness * 0.3, scale: 1.1 },
    { x: width * 0.55, y: height - borderThickness * 0.8, scale: 0.8 },
    { x: width * 0.75, y: height - borderThickness * 0.4, scale: 1.0 },
    
    // Side border rocks
    { x: borderThickness * 0.3, y: height * 0.35, scale: 0.9 },
    { x: borderThickness * 0.8, y: height * 0.65, scale: 0.7 },
    { x: width - borderThickness * 0.7, y: height * 0.3, scale: 1.0 },
    { x: width - borderThickness * 0.3, y: height * 0.8, scale: 0.8 }
  ];
  
  rockPositions.forEach(pos => {
    drawBorderRockCluster(ctx, pos.x, pos.y, pos.scale);
  });
};

const drawBorderRockCluster = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  // Small cluster of 2-3 rocks
  const rocks = [
    { offsetX: 0, offsetY: 0, size: 4 * scale },
    { offsetX: 3 * scale, offsetY: 2 * scale, size: 3 * scale },
    { offsetX: -2 * scale, offsetY: 1 * scale, size: 2.5 * scale }
  ];
  
  // Draw shadows first
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  rocks.forEach(rock => {
    ctx.beginPath();
    ctx.ellipse(x + rock.offsetX + 1, y + rock.offsetY + 1, rock.size, rock.size * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Draw rocks
  rocks.forEach(rock => {
    const rockX = x + rock.offsetX;
    const rockY = y + rock.offsetY;
    
    // Rock gradient
    const rockGradient = ctx.createRadialGradient(rockX - 1, rockY - 1, 0, rockX, rockY, rock.size);
    rockGradient.addColorStop(0, '#BDBDBD');
    rockGradient.addColorStop(1, '#757575');
    
    ctx.fillStyle = rockGradient;
    ctx.strokeStyle = '#424242';
    ctx.lineWidth = 0.5;
    
    ctx.beginPath();
    ctx.ellipse(rockX, rockY, rock.size, rock.size * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
};

const drawBorderStreams = (ctx: CanvasRenderingContext2D, width: number, height: number, borderThickness: number) => {
  // Small decorative streams/water features
  const streamSegments = [
    // Top border stream
    {
      start: { x: width * 0.05, y: borderThickness * 0.5 },
      end: { x: width * 0.25, y: borderThickness * 0.7 },
      width: 3
    },
    // Bottom border stream
    {
      start: { x: width * 0.4, y: height - borderThickness * 0.6 },
      end: { x: width * 0.6, y: height - borderThickness * 0.3 },
      width: 4
    },
    // Left border stream
    {
      start: { x: borderThickness * 0.2, y: height * 0.1 },
      end: { x: borderThickness * 0.8, y: height * 0.4 },
      width: 3
    }
  ];
  
  streamSegments.forEach(stream => {
    drawBorderStream(ctx, stream.start, stream.end, stream.width);
  });
};

const drawBorderStream = (ctx: CanvasRenderingContext2D, start: {x: number, y: number}, end: {x: number, y: number}, width: number) => {
  // Stream bed (darker)
  ctx.strokeStyle = '#1565C0';
  ctx.lineWidth = width + 2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  
  // Water surface (lighter blue)
  ctx.strokeStyle = '#42A5F5';
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  
  // Water highlights
  ctx.strokeStyle = '#81D4FA';
  ctx.lineWidth = width - 1;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.globalAlpha = 1.0;
};

const drawBorderHedges = (ctx: CanvasRenderingContext2D, width: number, height: number, borderThickness: number) => {
  // Hedge positions along borders
  const hedgePositions = [
    // Top border hedges
    { x: width * 0.5, y: borderThickness * 0.2, length: 30, vertical: false },
    
    // Bottom border hedges
    { x: width * 0.1, y: height - borderThickness * 0.2, length: 25, vertical: false },
    { x: width * 0.8, y: height - borderThickness * 0.2, length: 35, vertical: false },
    
    // Side border hedges
    { x: borderThickness * 0.2, y: height * 0.6, length: 40, vertical: true },
    { x: width - borderThickness * 0.2, y: height * 0.4, length: 30, vertical: true }
  ];
  
  hedgePositions.forEach(hedge => {
    drawBorderHedge(ctx, hedge.x, hedge.y, hedge.length, hedge.vertical);
  });
};

const drawBorderHedge = (ctx: CanvasRenderingContext2D, x: number, y: number, length: number, vertical: boolean) => {
  const hedgeWidth = 6;
  const hedgeHeight = 8;
  
  // Hedge shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  if (vertical) {
    ctx.fillRect(x + 1, y - length/2 + 1, hedgeWidth, length);
  } else {
    ctx.fillRect(x - length/2 + 1, y + 1, length, hedgeWidth);
  }
  
  // Main hedge body
  ctx.fillStyle = '#2E7D32';
  ctx.strokeStyle = '#1B5E20';
  ctx.lineWidth = 1;
  
  if (vertical) {
    ctx.fillRect(x, y - length/2, hedgeWidth, length);
    ctx.strokeRect(x, y - length/2, hedgeWidth, length);
  } else {
    ctx.fillRect(x - length/2, y, length, hedgeWidth);
    ctx.strokeRect(x - length/2, y, length, hedgeWidth);
  }
  
  // Hedge texture (small leafy details)
  ctx.fillStyle = '#388E3C';
  const segments = Math.floor(length / 8);
  
  for (let i = 0; i < segments; i++) {
    if (vertical) {
      const segmentY = y - length/2 + i * 8 + 2;
      ctx.beginPath();
      ctx.arc(x + hedgeWidth/2, segmentY, 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const segmentX = x - length/2 + i * 8 + 2;
      ctx.beginPath();
      ctx.arc(segmentX, y + hedgeWidth/2, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};