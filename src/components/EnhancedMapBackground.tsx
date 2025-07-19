// Enhanced map background with lush fantasy field terrain like Realm Defense
export const drawEnhancedMapBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Create rich, vibrant grass background with depth and lighting variation
  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, '#2E7D32');    // Deep forest green (top-left)
  bgGradient.addColorStop(0.3, '#388E3C');  // Rich green
  bgGradient.addColorStop(0.6, '#4CAF50');  // Vibrant green
  bgGradient.addColorStop(0.8, '#66BB6A');  // Bright green
  bgGradient.addColorStop(1, '#81C784');    // Light green (bottom-right)
  
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Add subtle lighting variation with overlapping gradients
  drawLightingVariation(ctx, width, height);
  
  // Create lush grass texture with multiple detailed layers
  drawDetailedGrassTexture(ctx, width, height, 0.08, '#1B5E20', 1200); // Deep shadow layer
  drawDetailedGrassTexture(ctx, width, height, 0.12, '#2E7D32', 900);  // Dark base layer
  drawDetailedGrassTexture(ctx, width, height, 0.15, '#388E3C', 700);  // Medium layer
  drawDetailedGrassTexture(ctx, width, height, 0.18, '#4CAF50', 500);  // Bright layer
  drawDetailedGrassTexture(ctx, width, height, 0.22, '#66BB6A', 300);  // Light highlights
  drawDetailedGrassTexture(ctx, width, height, 0.25, '#81C784', 150);  // Brightest highlights

  // Add natural terrain features for depth
  drawWornPatches(ctx, width, height);
  drawGrassTufts(ctx, width, height);
  drawWildflowerPatches(ctx, width, height);
  drawDirtPatches(ctx, width, height);
  drawRockFormations(ctx, width, height);
  drawMossPatches(ctx, width, height);
  drawShadowAreas(ctx, width, height);
};

// Add subtle lighting variation for depth
const drawLightingVariation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Create multiple overlapping light sources for natural variation
  const lightSources = [
    { x: width * 0.3, y: height * 0.2, radius: width * 0.4, intensity: 0.15 },
    { x: width * 0.7, y: height * 0.6, radius: width * 0.5, intensity: 0.12 },
    { x: width * 0.1, y: height * 0.8, radius: width * 0.3, intensity: 0.08 }
  ];

  lightSources.forEach(light => {
    const gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${light.intensity})`);
    gradient.addColorStop(0.6, `rgba(255, 255, 255, ${light.intensity * 0.5})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  });

  // Add shadow areas for contrast
  const shadowGradient = ctx.createLinearGradient(0, 0, width * 0.3, height * 0.3);
  shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
  shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = shadowGradient;
  ctx.fillRect(0, 0, width, height);
};

// Enhanced grass texture with more variety and detail
const drawDetailedGrassTexture = (
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

    if (grassType < 0.4) {
      // Varied grass blades with different heights and widths
      const bladeHeight = 1 + seededRandom() * 4;
      const bladeWidth = 0.5 + seededRandom() * 1.5;
      ctx.fillRect(x, y, bladeWidth, bladeHeight);
    } else if (grassType < 0.7) {
      // Curved grass strands for more natural look
      const startX = x;
      const startY = y;
      const controlX = x + (seededRandom() - 0.5) * 4;
      const controlY = y - 1 - seededRandom() * 2;
      const endX = x + (seededRandom() - 0.5) * 3;
      const endY = y - 2 - seededRandom() * 4;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      ctx.stroke();
    } else if (grassType < 0.9) {
      // Small grass clusters
      const clusterSize = 1 + seededRandom() * 2;
      ctx.beginPath();
      ctx.arc(x, y, clusterSize * 0.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Tiny grass dots for texture
      ctx.beginPath();
      ctx.arc(x, y, 0.3 + seededRandom() * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1.0;
};

// Add worn patches where grass is thinner (like paths or heavy traffic areas)
const drawWornPatches = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  let seed = 98765;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < 8; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const size = 15 + seededRandom() * 25;
    const rotation = seededRandom() * Math.PI;
    
    // Create worn patch with darker, less vibrant grass
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(46, 125, 50, 0.3)'); // Darker green center
    gradient.addColorStop(0.7, 'rgba(56, 142, 60, 0.2)'); // Medium green
    gradient.addColorStop(1, 'rgba(76, 175, 80, 0.1)'); // Light green edge
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.6, rotation, 0, Math.PI * 2);
    ctx.fill();
  }
};

// Add tufts of longer grass for texture variation
const drawGrassTufts = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  let seed = 13579;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < 25; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const tuftSize = 3 + seededRandom() * 5;
    const grassCount = 4 + Math.floor(seededRandom() * 6);
    
    ctx.strokeStyle = `rgba(56, 142, 60, ${0.4 + seededRandom() * 0.3})`;
    ctx.lineWidth = 1 + seededRandom() * 0.5;
    
    for (let j = 0; j < grassCount; j++) {
      const angle = (j / grassCount) * Math.PI * 2 + seededRandom() * 0.5;
      const length = tuftSize + seededRandom() * 3;
      const startX = x + Math.cos(angle) * (tuftSize * 0.3);
      const startY = y + Math.sin(angle) * (tuftSize * 0.3);
      const endX = startX + Math.cos(angle - 0.2) * length;
      const endY = startY + Math.sin(angle - 0.2) * length;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }
};

// Add shadow areas for depth and realism
const drawShadowAreas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  let seed = 24680;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < 6; i++) {
    const x = seededRandom() * width;
    const y = seededRandom() * height;
    const size = 20 + seededRandom() * 40;
    const rotation = seededRandom() * Math.PI;
    
    // Create subtle shadow areas
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.15)');
    gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.08)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.7, rotation, 0, Math.PI * 2);
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