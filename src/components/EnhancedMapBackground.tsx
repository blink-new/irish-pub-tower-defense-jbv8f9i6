// Enhanced map background with professional textures and effects
export const drawEnhancedMapBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Create a more sophisticated grass background
  const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height));
  bgGradient.addColorStop(0, '#4F7942');  // Darker forest green center
  bgGradient.addColorStop(0.4, '#3CB371'); // Medium sea green
  bgGradient.addColorStop(0.7, '#32CD32'); // Lime green
  bgGradient.addColorStop(1, '#228B22');   // Forest green edges
  
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Add depth with multiple grass layers
  drawGrassLayer(ctx, width, height, 0.05, '#1F4F1F', 800); // Dark base layer
  drawGrassLayer(ctx, width, height, 0.1, '#228B22', 600);  // Medium layer
  drawGrassLayer(ctx, width, height, 0.15, '#32CD32', 400); // Bright layer
  drawGrassLayer(ctx, width, height, 0.2, '#90EE90', 200);  // Light highlights

  // Add natural elements
  drawWildflowerPatches(ctx, width, height);
  drawDirtPatches(ctx, width, height);
  drawRockFormations(ctx, width, height);
  drawMossPatches(ctx, width, height);
};

const drawGrassLayer = (
  ctx: CanvasRenderingContext2D, 
  width: number, 
  height: number, 
  alpha: number, 
  color: string, 
  density: number
) => {
  // Use seeded random for consistent, static placement
  let seed = 12345 + density; // Different seed per layer
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  for (let i = 0; i < density; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const grassType = seededRandom();

    if (grassType < 0.7) {
      // Short static grass blades
      const bladeHeight = 1 + seededRandom() * 2;
      ctx.fillRect(x, y, 1, bladeHeight);
    } else if (grassType < 0.95) {
      // Medium grass strands - static positions
      const startX = x;
      const startY = y;
      const endX = x + (seededRandom() - 0.5) * 2; // Reduced movement
      const endY = y - 1 - seededRandom() * 3;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    } else {
      // Small static grass dots
      ctx.beginPath();
      ctx.arc(x, y, 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1.0;
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