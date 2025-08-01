/* eslint-disable @typescript-eslint/no-use-before-define */
// Enhanced map background with Realm Defense style fantasy field
export const drawEnhancedMapBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Create Realm Defense style base field with warm, vibrant colors
  const baseGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height));
  baseGradient.addColorStop(0, '#7CB342');    // Vibrant center green
  baseGradient.addColorStop(0.3, '#689F38');  // Rich medium green
  baseGradient.addColorStop(0.6, '#558B2F');  // Deeper green
  baseGradient.addColorStop(1, '#33691E');    // Dark forest edges
  
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, width, height);

  // Add organic texture layers (no grid artifacts)
  drawOrganicGrassTexture(ctx, width, height);
  drawGrassClumps(ctx, width, height);
  drawFieldVariations(ctx, width, height);
  
  // Add natural field elements
  drawWildflowerPatches(ctx, width, height);
  drawDirtPatches(ctx, width, height);
  drawRockFormations(ctx, width, height);
  drawMossPatches(ctx, width, height);
};

// Organic grass texture without grid artifacts - Realm Defense style
const drawOrganicGrassTexture = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  let seed = 12345;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // Create organic texture with varied grass tones
  const grassColors = [
    '#8BC34A',  // Light grass
    '#7CB342',  // Medium grass  
    '#689F38',  // Rich grass
    '#558B2F',  // Deep grass
    '#4CAF50',  // Vibrant green
    '#66BB6A'   // Soft green
  ];

  // Draw organic texture patches (no regular patterns)
  for (let i = 0; i < 1200; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const size = 2 + seededRandom() * 4;
    const colorIndex = Math.floor(seededRandom() * grassColors.length);
    
    ctx.fillStyle = grassColors[colorIndex];
    ctx.globalAlpha = 0.15 + seededRandom() * 0.25;
    
    // Organic blob shapes instead of regular patterns
    ctx.beginPath();
    const points = 4 + Math.floor(seededRandom() * 4);
    ctx.moveTo(x, y);
    
    for (let j = 0; j < points; j++) {
      const angle = (j / points) * Math.PI * 2;
      const radius = size * (0.7 + seededRandom() * 0.6);
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      ctx.lineTo(px, py);
    }
    
    ctx.closePath();
    ctx.fill();
  }
  
  ctx.globalAlpha = 1.0;
};

// Grass clumps for natural variation
const drawGrassClumps = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  let seed = 54321;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // Create natural grass clumps
  for (let i = 0; i < 80; i++) {
    const clumpX = seededRandom() * width;
    const clumpY = seededRandom() * height;
    const clumpSize = 15 + seededRandom() * 25;
    const clumpDensity = 8 + Math.floor(seededRandom() * 12);
    
    // Clump base color variation
    const baseHue = 80 + (seededRandom() - 0.5) * 40; // Green hues with variation
    const baseSat = 40 + seededRandom() * 30;
    const baseLit = 35 + seededRandom() * 25;
    
    for (let j = 0; j < clumpDensity; j++) {
      const grassX = clumpX + (seededRandom() - 0.5) * clumpSize;
      const grassY = clumpY + (seededRandom() - 0.5) * clumpSize;
      const grassHeight = 3 + seededRandom() * 5;
      const grassWidth = 1 + seededRandom() * 2;
      
      // Individual grass blade with slight color variation
      const hue = baseHue + (seededRandom() - 0.5) * 20;
      const sat = baseSat + (seededRandom() - 0.5) * 20;
      const lit = baseLit + (seededRandom() - 0.5) * 15;
      
      ctx.fillStyle = `hsl(${hue}, ${sat}%, ${lit}%)`;
      ctx.globalAlpha = 0.6 + seededRandom() * 0.3;
      
      // Draw organic grass blade
      ctx.beginPath();
      ctx.ellipse(grassX, grassY, grassWidth, grassHeight, seededRandom() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  ctx.globalAlpha = 1.0;
};

// Field variations for depth and interest
const drawFieldVariations = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  let seed = 98765;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // Create subtle field variations (lighter and darker areas)
  for (let i = 0; i < 25; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const size = 40 + seededRandom() * 80;
    const isDark = seededRandom() > 0.5;
    
    // Create gradient for natural blending
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    
    if (isDark) {
      gradient.addColorStop(0, 'rgba(51, 105, 30, 0.15)');   // Dark center
      gradient.addColorStop(1, 'rgba(51, 105, 30, 0)');     // Fade to transparent
    } else {
      gradient.addColorStop(0, 'rgba(139, 195, 74, 0.12)'); // Light center
      gradient.addColorStop(1, 'rgba(139, 195, 74, 0)');    // Fade to transparent
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawWildflowerPatches = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const flowerColors = [
    '#FFD700', // Golden yellow
    '#FF69B4', // Hot pink
    '#FF6347', // Tomato red
    '#DDA0DD', // Plum purple
    '#FFFFFF', // White
    '#FFA500', // Orange
    '#FF1493'  // Deep pink
  ];

  let seed = 98765;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // Create flower patches
  for (let patch = 0; patch < 8; patch++) {
    const patchX = seededRandom() * width;
    const patchY = seededRandom() * height;
    const patchSize = 20 + seededRandom() * 30;
    const flowerCount = 5 + Math.floor(seededRandom() * 10);
    const colorIndex = Math.floor(seededRandom() * flowerColors.length);
    const flowerColor = flowerColors[colorIndex];

    for (let i = 0; i < flowerCount; i++) {
      const flowerX = patchX + (seededRandom() - 0.5) * patchSize;
      const flowerY = patchY + (seededRandom() - 0.5) * patchSize;
      
      if (flowerX >= 0 && flowerX <= width && flowerY >= 0 && flowerY <= height) {
        drawWildflower(ctx, flowerX, flowerY, flowerColor, seededRandom);
      }
    }
  }
};

const drawWildflower = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  color: string, 
  random: () => number
) => {
  const flowerSize = 1.5 + random() * 2;
  
  // Flower center
  ctx.fillStyle = '#FFD700';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.arc(x, y, flowerSize * 0.4, 0, Math.PI * 2);
  ctx.fill();
  
  // Flower petals
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.6;
  const petalCount = 4 + Math.floor(random() * 4);
  
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const petalX = x + Math.cos(angle) * flowerSize;
    const petalY = y + Math.sin(angle) * flowerSize;
    
    ctx.beginPath();
    ctx.arc(petalX, petalY, flowerSize * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Stem
  ctx.strokeStyle = '#228B22';
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + (random() - 0.5) * 2, y + 3 + random() * 3);
  ctx.stroke();
  
  ctx.globalAlpha = 1.0;
};

const drawDirtPatches = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  let seed = 54321;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const dirtColors = ['#8B4513', '#A0522D', '#CD853F', '#D2B48C'];

  for (let i = 0; i < 12; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const size = 8 + seededRandom() * 15;
    const rotation = seededRandom() * Math.PI;
    const colorIndex = Math.floor(seededRandom() * dirtColors.length);
    
    // Main dirt patch
    ctx.fillStyle = dirtColors[colorIndex];
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.7, rotation, 0, Math.PI * 2);
    ctx.fill();
    
    // Add texture with smaller patches
    for (let j = 0; j < 3; j++) {
      const subX = x + (seededRandom() - 0.5) * size;
      const subY = y + (seededRandom() - 0.5) * size * 0.7;
      const subSize = size * 0.3 * seededRandom();
      
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      ctx.arc(subX, subY, subSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  ctx.globalAlpha = 1.0;
};

const drawRockFormations = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  let seed = 13579;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < 15; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const size = 3 + seededRandom() * 6;
    
    // Main rock
    const rockGradient = ctx.createRadialGradient(x - 1, y - 1, 0, x, y, size);
    rockGradient.addColorStop(0, '#C0C0C0');
    rockGradient.addColorStop(1, '#696969');
    
    ctx.fillStyle = rockGradient;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.8, seededRandom() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
    
    // Rock shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.ellipse(x + 1, y + 1, size * 0.8, size * 0.6, seededRandom() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.globalAlpha = 1.0;
};

const drawMossPatches = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  let seed = 24680;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const mossColors = ['#228B22', '#32CD32', '#90EE90', '#98FB98'];

  for (let i = 0; i < 20; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const size = 4 + seededRandom() * 8;
    const colorIndex = Math.floor(seededRandom() * mossColors.length);
    
    ctx.fillStyle = mossColors[colorIndex];
    ctx.globalAlpha = 0.2;
    
    // Irregular moss shape
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    const points = 6 + Math.floor(seededRandom() * 4);
    for (let j = 0; j < points; j++) {
      const angle = (j / points) * Math.PI * 2;
      const radius = size * (0.7 + seededRandom() * 0.6);
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      ctx.lineTo(px, py);
    }
    
    ctx.closePath();
    ctx.fill();
  }
  
  ctx.globalAlpha = 1.0;
};