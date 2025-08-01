// Helper functions defined first
const drawUrbanPub = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // === EXACT COPY OF PADDY'S PUB DESIGN ===
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



// Cohesive urban texture background (matching Irish countryside grass texture)
const drawUrbanTexture = (ctx: CanvasRenderingContext2D) => {
  // Create completely static urban texture with fixed positions
  const urbanColors = ['#A0A0A0', '#B0B0B0', '#C0C0C0', '#D0D0D0', '#909090'];
  
  // Use seeded random for consistent texture placement
  const seed = 12345; // Fixed seed for consistent pattern
  let random = seed;
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };
  
  // Draw static urban texture elements - reduced count to avoid visual clutter
  for (let i = 0; i < 200; i++) {
    const x = seededRandom() * 900;
    const y = seededRandom() * 600;
    const colorIndex = Math.floor(seededRandom() * urbanColors.length);
    const color = urbanColors[colorIndex];
    
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.15 + seededRandom() * 0.2; // Reduced opacity
    
    // Draw small static urban element
    ctx.fillRect(x, y, 1, 1 + seededRandom() * 1.5);
  }
  
  // Add fewer static urban markings to reduce visual noise
  for (let i = 0; i < 15; i++) {
    const x = seededRandom() * 900;
    const y = seededRandom() * 600;
    
    ctx.fillStyle = seededRandom() > 0.5 ? '#FFFF00' : '#FFFFFF';
    ctx.globalAlpha = 0.3; // Reduced opacity
    ctx.beginPath();
    ctx.arc(x, y, 0.8, 0, Math.PI * 2); // Smaller size
    ctx.fill();
  }
  
  ctx.globalAlpha = 1.0;
};

// Border building (simple buildings for framing - matching reference image style)
const drawBorderBuilding = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const width = 18;
  const height = 22;
  
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(x - width/2 + 1, y - height/2 + 1, width, height);
  
  // Main building (using reference image colors)
  const borderColors = ['#4A90E2', '#7ED321', '#9013FE', '#50E3C2', '#F5A623'];
  const colorIndex = Math.floor((x + y) / 100) % borderColors.length;
  ctx.fillStyle = borderColors[colorIndex];
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1;
  ctx.fillRect(x - width/2, y - height/2, width, height);
  ctx.strokeRect(x - width/2, y - height/2, width, height);
  
  // Simple windows
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x - 5, y - 6, 3, 3);
  ctx.fillRect(x + 2, y - 6, 3, 3);
  ctx.fillRect(x - 5, y + 1, 3, 3);
  ctx.fillRect(x + 2, y + 1, 3, 3);
  
  // Simple roof
  ctx.fillStyle = '#666666';
  ctx.beginPath();
  ctx.moveTo(x - width/2 - 1, y - height/2);
  ctx.lineTo(x, y - height/2 - 6);
  ctx.lineTo(x + width/2 + 1, y - height/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

// European-style row house (matching the attached reference image)
const drawEuropeanRowHouse = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string, stories: number = 4) => {
  const buildingWidth = 35 * scale;
  const storyHeight = 18 * scale;
  const buildingHeight = stories * storyHeight;
  
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(x - buildingWidth/2 + 3, y - buildingHeight/2 + 3, buildingWidth, buildingHeight);
  
  // Main building body (European style with ornate details)
  ctx.fillStyle = color;
  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 2;
  ctx.fillRect(x - buildingWidth/2, y - buildingHeight/2, buildingWidth, buildingHeight);
  ctx.strokeRect(x - buildingWidth/2, y - buildingHeight/2, buildingWidth, buildingHeight);
  
  // Decorative cornice at top
  ctx.fillStyle = '#F8F9FA';
  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 1;
  ctx.fillRect(x - buildingWidth/2 - 2, y - buildingHeight/2 - 3, buildingWidth + 4, 3);
  ctx.strokeRect(x - buildingWidth/2 - 2, y - buildingHeight/2 - 3, buildingWidth + 4, 3);
  
  // Ornate windows - arched like reference image
  ctx.fillStyle = '#F8F9FA';
  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 1.5;
  
  const windowWidth = 10 * scale;
  const windowHeight = 14 * scale;
  const windowSpacing = 18 * scale;
  
  // Draw ornate windows for each story
  for (let story = 0; story < stories; story++) {
    const storyY = y - buildingHeight/2 + (story + 0.5) * storyHeight;
    
    // Two arched windows per story like reference
    for (let i = 0; i < 2; i++) {
      const winX = x - windowSpacing/2 + i * windowSpacing;
      
      // Arched window top
      ctx.beginPath();
      ctx.arc(winX, storyY - windowHeight/2 + windowWidth/2, windowWidth/2, Math.PI, 0);
      ctx.lineTo(winX + windowWidth/2, storyY + windowHeight/2);
      ctx.lineTo(winX - windowWidth/2, storyY + windowHeight/2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Window decorative frame
      ctx.strokeStyle = '#34495E';
      ctx.lineWidth = 2;
      ctx.strokeRect(winX - windowWidth/2 - 1, storyY - windowHeight/2, windowWidth + 2, windowHeight);
      
      // Window cross pattern for European style
      ctx.strokeStyle = '#2C3E50';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(winX, storyY - windowHeight/2);
      ctx.lineTo(winX, storyY + windowHeight/2);
      ctx.moveTo(winX - windowWidth/2, storyY);
      ctx.lineTo(winX + windowWidth/2, storyY);
      ctx.stroke();
      
      // Window sill
      ctx.fillStyle = '#BDC3C7';
      ctx.fillRect(winX - windowWidth/2 - 1, storyY + windowHeight/2, windowWidth + 2, 2);
    }
  }
  
  // Ornate entrance door (European style)
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 2;
  const doorWidth = 12 * scale;
  const doorHeight = 16 * scale;
  
  // Arched door
  ctx.beginPath();
  ctx.arc(x, y + buildingHeight/2 - doorHeight + doorWidth/2, doorWidth/2, Math.PI, 0);
  ctx.lineTo(x + doorWidth/2, y + buildingHeight/2);
  ctx.lineTo(x - doorWidth/2, y + buildingHeight/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Door decorative panels
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 1;
  ctx.strokeRect(x - doorWidth/2 + 2, y + buildingHeight/2 - doorHeight + 4, doorWidth - 4, doorHeight/2 - 2);
  ctx.strokeRect(x - doorWidth/2 + 2, y + buildingHeight/2 - doorHeight/2 + 2, doorWidth - 4, doorHeight/2 - 4);
  
  // Ornate door handle
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(x + 3 * scale, y + buildingHeight/2 - 6 * scale, 2 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Door knocker
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y + buildingHeight/2 - 10 * scale, 2 * scale, 0, Math.PI);
  ctx.stroke();
  
  // Decorative stonework pattern
  ctx.strokeStyle = 'rgba(44, 62, 80, 0.3)';
  ctx.lineWidth = 1;
  for (let i = 0; i < stories; i++) {
    const lineY = y - buildingHeight/2 + (i + 1) * storyHeight;
    ctx.beginPath();
    ctx.moveTo(x - buildingWidth/2, lineY);
    ctx.lineTo(x + buildingWidth/2, lineY);
    ctx.stroke();
  }
};

// European row house cluster (connected buildings like reference image)
const drawEuropeanRowCluster = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, clusterSize: number) => {
  const colors = ['#2E8B57', '#708090', '#008B8B', '#228B22', '#2F4F4F', '#191970', '#20B2AA', '#696969', '#006400', '#000080'];
  
  // Create connected row house layout based on size
  const positions = [];
  const buildingSpacing = 35; // Closer spacing for connected appearance
  
  if (clusterSize === 2) {
    positions.push(
      { x: centerX - buildingSpacing/2, y: centerY, scale: 1.0, color: colors[0], stories: 4 },
      { x: centerX + buildingSpacing/2, y: centerY, scale: 1.0, color: colors[1], stories: 4 }
    );
  } else if (clusterSize === 3) {
    positions.push(
      { x: centerX - buildingSpacing, y: centerY, scale: 1.0, color: colors[0], stories: 4 },
      { x: centerX, y: centerY, scale: 1.0, color: colors[1], stories: 5 },
      { x: centerX + buildingSpacing, y: centerY, scale: 1.0, color: colors[2], stories: 4 }
    );
  } else if (clusterSize === 4) {
    positions.push(
      { x: centerX - buildingSpacing * 1.5, y: centerY, scale: 1.0, color: colors[0], stories: 4 },
      { x: centerX - buildingSpacing/2, y: centerY, scale: 1.0, color: colors[1], stories: 5 },
      { x: centerX + buildingSpacing/2, y: centerY, scale: 1.0, color: colors[2], stories: 4 },
      { x: centerX + buildingSpacing * 1.5, y: centerY, scale: 1.0, color: colors[3], stories: 5 }
    );
  }
  
  // Draw all buildings in the connected row
  positions.forEach(pos => {
    drawEuropeanRowHouse(ctx, pos.x, pos.y, pos.scale, pos.color, pos.stories);
  });
  
  // Add connecting elements between buildings for seamless row appearance
  if (positions.length > 1) {
    ctx.fillStyle = 'rgba(44, 62, 80, 0.1)';
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < positions.length - 1; i++) {
      const pos1 = positions[i];
      const pos2 = positions[i + 1];
      const connectionX = (pos1.x + pos2.x) / 2;
      const connectionY = centerY;
      
      // Small connecting element
      ctx.fillRect(connectionX - 2, connectionY - 30, 4, 60);
      ctx.strokeRect(connectionX - 2, connectionY - 30, 4, 60);
    }
  }
};

// Clean-cut circular/oval tree (as requested in references)
const drawCleanCutTree = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
  const trunkHeight = 6 * scale;
  const trunkWidth = 3 * scale;
  const foliageWidth = 8 * scale;
  const foliageHeight = 10 * scale;
  
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.beginPath();
  ctx.ellipse(x + 1, y - foliageHeight/2 + 1, foliageWidth/2 + 1, foliageHeight/2 + 1, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Tree trunk (clean rectangular)
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 1;
  ctx.fillRect(x - trunkWidth/2, y - 2, trunkWidth, trunkHeight);
  ctx.strokeRect(x - trunkWidth/2, y - 2, trunkWidth, trunkHeight);
  
  // Clean-cut oval foliage (as requested)
  ctx.fillStyle = '#228B22';
  ctx.strokeStyle = '#006400';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(x, y - foliageHeight/2, foliageWidth/2, foliageHeight/2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Clean highlight for depth
  ctx.fillStyle = 'rgba(50, 205, 50, 0.2)';
  ctx.beginPath();
  ctx.ellipse(x - 1 * scale, y - foliageHeight/2 - 1 * scale, foliageWidth/3, foliageHeight/3, 0, 0, Math.PI * 2);
  ctx.fill();
};

// Irish flag (as requested to tie into Irish Pub theme)
const drawIrishFlag = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  const flagWidth = 16 * scale;
  const flagHeight = 10 * scale;
  const poleHeight = 25 * scale;
  
  // Flag pole
  ctx.fillStyle = '#8B4513';
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 1;
  ctx.fillRect(x - 1, y - poleHeight, 2, poleHeight);
  ctx.strokeRect(x - 1, y - poleHeight, 2, poleHeight);
  
  // Flag background
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.fillRect(x + 2, y - poleHeight + 3, flagWidth, flagHeight);
  ctx.strokeRect(x + 2, y - poleHeight + 3, flagWidth, flagHeight);
  
  // Irish flag stripes
  // Green stripe (left)
  ctx.fillStyle = '#009639';
  ctx.fillRect(x + 2, y - poleHeight + 3, flagWidth/3, flagHeight);
  
  // White stripe (middle) - already white from background
  
  // Orange stripe (right)
  ctx.fillStyle = '#FF7900';
  ctx.fillRect(x + 2 + (flagWidth * 2/3), y - poleHeight + 3, flagWidth/3, flagHeight);
  
  // Flag outline
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 2, y - poleHeight + 3, flagWidth, flagHeight);
};

// Traffic light (subtle urban cue as requested)
const drawTrafficLight = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  const poleHeight = 20 * scale;
  const lightWidth = 4 * scale;
  const lightHeight = 12 * scale;
  
  // Pole
  ctx.fillStyle = '#606060';
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 1;
  ctx.fillRect(x - 1, y - poleHeight, 2, poleHeight);
  ctx.strokeRect(x - 1, y - poleHeight, 2, poleHeight);
  
  // Traffic light housing
  ctx.fillStyle = '#2C2C2C';
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 1;
  ctx.fillRect(x + 2, y - poleHeight, lightWidth, lightHeight);
  ctx.strokeRect(x + 2, y - poleHeight, lightWidth, lightHeight);
  
  // Lights (red, yellow, green)
  const lightRadius = 1 * scale;
  
  // Red light (top)
  ctx.fillStyle = '#FF0000';
  ctx.beginPath();
  ctx.arc(x + 2 + lightWidth/2, y - poleHeight + 2, lightRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Yellow light (middle)
  ctx.fillStyle = '#FFFF00';
  ctx.beginPath();
  ctx.arc(x + 2 + lightWidth/2, y - poleHeight + 6, lightRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Green light (bottom) - brighter to show it's active
  ctx.fillStyle = '#00FF00';
  ctx.beginPath();
  ctx.arc(x + 2 + lightWidth/2, y - poleHeight + 10, lightRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Add glow to active green light
  ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
  ctx.beginPath();
  ctx.arc(x + 2 + lightWidth/2, y - poleHeight + 10, lightRadius + 1, 0, Math.PI * 2);
  ctx.fill();
};

// Road sign (subtle urban cue as requested)
const drawRoadSign = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  const poleHeight = 15 * scale;
  const signWidth = 12 * scale;
  const signHeight = 8 * scale;
  
  // Pole
  ctx.fillStyle = '#606060';
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 1;
  ctx.fillRect(x - 1, y - poleHeight, 2, poleHeight);
  ctx.strokeRect(x - 1, y - poleHeight, 2, poleHeight);
  
  // Sign background
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.fillRect(x + 2, y - poleHeight, signWidth, signHeight);
  ctx.strokeRect(x + 2, y - poleHeight, signWidth, signHeight);
  
  // Simple arrow or text indication
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  // Arrow pointing right
  ctx.moveTo(x + 4, y - poleHeight + 4);
  ctx.lineTo(x + 10, y - poleHeight + 4);
  ctx.moveTo(x + 8, y - poleHeight + 2);
  ctx.lineTo(x + 10, y - poleHeight + 4);
  ctx.lineTo(x + 8, y - poleHeight + 6);
  ctx.stroke();
};

// Faint crosswalk (subtle urban cue as requested)
const drawCrosswalk = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  const crosswalkWidth = 20 * scale;
  const crosswalkHeight = 8 * scale;
  const stripeWidth = 2 * scale;
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // Faint white stripes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  
  // Draw zebra crossing stripes
  for (let i = 0; i < crosswalkWidth; i += stripeWidth * 2) {
    ctx.fillRect(x + i, y, stripeWidth, crosswalkHeight);
  }
};

// Dublin's Poolbeg Towers (iconic twin red and white striped smokestacks)
const drawPoolbegTowers = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  const towerHeight = 100 * scale;      // Very tall industrial chimneys
  const towerWidth = 8 * scale;         // Narrow cylindrical shape
  const towerSpacing = 20 * scale;      // Space between the twin towers
  const powerStationWidth = 45 * scale; // Industrial power station base
  const powerStationHeight = 25 * scale;
  const stripeHeight = 8 * scale;       // Height of each red/white stripe
  
  // === INDUSTRIAL POWER STATION BASE ===
  // Shadow for power station
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(x - powerStationWidth/2 + 3, y + 3, powerStationWidth, powerStationHeight);
  
  // Main power station building
  ctx.fillStyle = '#B0B0B0'; // Industrial gray
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 2;
  ctx.fillRect(x - powerStationWidth/2, y, powerStationWidth, powerStationHeight);
  ctx.strokeRect(x - powerStationWidth/2, y, powerStationWidth, powerStationHeight);
  
  // Power station industrial details
  ctx.fillStyle = '#909090';
  ctx.fillRect(x - powerStationWidth/2 + 5, y + 3, powerStationWidth - 10, 8);
  ctx.fillRect(x - powerStationWidth/2 + 8, y + 12, powerStationWidth - 16, 6);
  
  // Industrial windows
  ctx.fillStyle = '#404040';
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const windowX = x - powerStationWidth/2 + 8 + i * 8;
    ctx.fillRect(windowX, y + 18, 4, 4);
    ctx.strokeRect(windowX, y + 18, 4, 4);
  }
  
  // === LEFT POOLBEG TOWER ===
  const leftTowerX = x - towerSpacing/2;
  const towerBaseY = y;
  
  // Tower shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(leftTowerX - towerWidth/2 + 2, towerBaseY - towerHeight + 2, towerWidth, towerHeight);
  
  // Draw tower with alternating red and white stripes (Poolbeg signature)
  const numStripes = Math.floor(towerHeight / stripeHeight);
  
  for (let i = 0; i < numStripes; i++) {
    const stripeY = towerBaseY - towerHeight + (i * stripeHeight);
    const isRedStripe = i % 2 === 0;
    
    // Alternate between red and white stripes
    ctx.fillStyle = isRedStripe ? '#DC143C' : '#FFFFFF'; // Red or white
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 1;
    
    ctx.fillRect(leftTowerX - towerWidth/2, stripeY, towerWidth, stripeHeight);
    ctx.strokeRect(leftTowerX - towerWidth/2, stripeY, towerWidth, stripeHeight);
  }
  
  // Tower outline for definition
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 2;
  ctx.strokeRect(leftTowerX - towerWidth/2, towerBaseY - towerHeight, towerWidth, towerHeight);
  
  // Tower top cap
  ctx.fillStyle = '#808080';
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 1;
  ctx.fillRect(leftTowerX - towerWidth/2 - 1, towerBaseY - towerHeight - 3, towerWidth + 2, 3);
  ctx.strokeRect(leftTowerX - towerWidth/2 - 1, towerBaseY - towerHeight - 3, towerWidth + 2, 3);
  
  // === RIGHT POOLBEG TOWER ===
  const rightTowerX = x + towerSpacing/2;
  
  // Tower shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(rightTowerX - towerWidth/2 + 2, towerBaseY - towerHeight + 2, towerWidth, towerHeight);
  
  // Draw tower with alternating red and white stripes
  for (let i = 0; i < numStripes; i++) {
    const stripeY = towerBaseY - towerHeight + (i * stripeHeight);
    const isRedStripe = i % 2 === 0;
    
    // Alternate between red and white stripes
    ctx.fillStyle = isRedStripe ? '#DC143C' : '#FFFFFF'; // Red or white
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 1;
    
    ctx.fillRect(rightTowerX - towerWidth/2, stripeY, towerWidth, stripeHeight);
    ctx.strokeRect(rightTowerX - towerWidth/2, stripeY, towerWidth, stripeHeight);
  }
  
  // Tower outline for definition
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 2;
  ctx.strokeRect(rightTowerX - towerWidth/2, towerBaseY - towerHeight, towerWidth, towerHeight);
  
  // Tower top cap
  ctx.fillStyle = '#808080';
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 1;
  ctx.fillRect(rightTowerX - towerWidth/2 - 1, towerBaseY - towerHeight - 3, towerWidth + 2, 3);
  ctx.strokeRect(rightTowerX - towerWidth/2 - 1, towerBaseY - towerHeight - 3, towerWidth + 2, 3);
  
  // === INDUSTRIAL CONNECTING PIPES ===
  ctx.strokeStyle = '#707070';
  ctx.lineWidth = 3;
  
  // Pipes connecting power station to towers
  ctx.beginPath();
  ctx.moveTo(leftTowerX, towerBaseY);
  ctx.lineTo(leftTowerX, towerBaseY + 8);
  ctx.lineTo(x - powerStationWidth/2 + 10, towerBaseY + 8);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(rightTowerX, towerBaseY);
  ctx.lineTo(rightTowerX, towerBaseY + 8);
  ctx.lineTo(x + powerStationWidth/2 - 10, towerBaseY + 8);
  ctx.stroke();
  
  // === INDUSTRIAL DETAILS ===
  // Small maintenance platforms on towers
  ctx.fillStyle = '#505050';
  ctx.strokeStyle = '#404040';
  ctx.lineWidth = 1;
  
  // Left tower platform
  ctx.fillRect(leftTowerX + towerWidth/2, towerBaseY - towerHeight/2, 4, 2);
  ctx.strokeRect(leftTowerX + towerWidth/2, towerBaseY - towerHeight/2, 4, 2);
  
  // Right tower platform
  ctx.fillRect(rightTowerX + towerWidth/2, towerBaseY - towerHeight/2, 4, 2);
  ctx.strokeRect(rightTowerX + towerWidth/2, towerBaseY - towerHeight/2, 4, 2);
  
  // Cooling towers (smaller round structures)
  ctx.fillStyle = '#C0C0C0';
  ctx.strokeStyle = '#909090';
  ctx.lineWidth = 1;
  
  ctx.beginPath();
  ctx.arc(x - 15, y + 10, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(x + 15, y + 10, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Steam/smoke effect from towers (very subtle)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.arc(leftTowerX, towerBaseY - towerHeight - 8, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(rightTowerX, towerBaseY - towerHeight - 8, 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Industrial complex name sign (optional detail)
  ctx.fillStyle = '#2C3E50';
  ctx.strokeStyle = '#1A252F';
  ctx.lineWidth = 1;
  ctx.fillRect(x - 12, y + powerStationHeight + 2, 24, 6);
  ctx.strokeRect(x - 12, y + powerStationHeight + 2, 24, 6);
  
  // Simple text indication (POOLBEG)
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '8px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('POOLBEG', x, y + powerStationHeight + 6);
};

// Authentic Irish Gothic Cathedral (Christ Church Cathedral Dublin inspired)
// Based on research of Irish Gothic cathedral architecture and my drawing limitations
const drawChurch = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  // === COMPREHENSIVE IRISH GOTHIC CATHEDRAL DESIGN ===
  // Dimensions based on authentic Irish cathedral proportions
  const cathedralWidth = 70 * scale;      // Wider for authentic proportions
  const cathedralHeight = 50 * scale;     // Taller main body
  const centralTowerHeight = 65 * scale;  // Much taller central tower (key feature)
  const centralTowerWidth = 22 * scale;   // Wider tower for stability
  const roundTowerHeight = 45 * scale;    // Irish round tower feature
  const roundTowerWidth = 8 * scale;      // Narrow round tower
  
  // === COMPLEX SHADOW SYSTEM ===
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  // Main cathedral shadow
  ctx.fillRect(x - cathedralWidth/2 + 4, y - cathedralHeight/2 + 4, cathedralWidth, cathedralHeight);
  // Central tower shadow
  ctx.fillRect(x - centralTowerWidth/2 + 4, y - cathedralHeight/2 - centralTowerHeight + 4, centralTowerWidth, centralTowerHeight);
  // Round tower shadow (Irish feature)
  ctx.fillRect(x + cathedralWidth/2 - 5 + 4, y - cathedralHeight/2 - roundTowerHeight + 4, roundTowerWidth, roundTowerHeight);
  // Side towers shadows
  ctx.fillRect(x - cathedralWidth/2 - 8 + 4, y - cathedralHeight/2 - 35 + 4, 14, 35);
  ctx.fillRect(x + cathedralWidth/2 - 6 + 4, y - cathedralHeight/2 - 35 + 4, 14, 35);
  
  // === MAIN CATHEDRAL NAVE (AUTHENTIC IRISH LIMESTONE) ===
  ctx.fillStyle = '#B8B8B8'; // Authentic Irish limestone color
  ctx.strokeStyle = '#808080'; // Darker stone outline
  ctx.lineWidth = 2.5;
  ctx.fillRect(x - cathedralWidth/2, y - cathedralHeight/2, cathedralWidth, cathedralHeight);
  ctx.strokeRect(x - cathedralWidth/2, y - cathedralHeight/2, cathedralWidth, cathedralHeight);
  
  // === CENTRAL TOWER (CHRIST CHURCH STYLE) ===
  ctx.fillStyle = '#B8B8B8'; // Same limestone
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 2.5;
  ctx.fillRect(x - centralTowerWidth/2, y - cathedralHeight/2 - centralTowerHeight, centralTowerWidth, centralTowerHeight);
  ctx.strokeRect(x - centralTowerWidth/2, y - cathedralHeight/2 - centralTowerHeight, centralTowerWidth, centralTowerHeight);
  
  // === AUTHENTIC MEDIEVAL BATTLEMENTS ===
  ctx.fillStyle = '#B8B8B8';
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 1.5;
  const battlementTop = y - cathedralHeight/2 - centralTowerHeight;
  const battlementWidth = 4;
  const battlementHeight = 6;
  
  // Seven battlements for authentic medieval appearance
  for (let i = 0; i < 7; i++) {
    const battlementX = x - centralTowerWidth/2 + 2 + i * (centralTowerWidth - 4) / 6;
    ctx.fillRect(battlementX, battlementTop - battlementHeight, battlementWidth, battlementHeight);
    ctx.strokeRect(battlementX, battlementTop - battlementHeight, battlementWidth, battlementHeight);
  }
  
  // === IRISH ROUND TOWER (UNIQUE IRISH FEATURE) ===
  ctx.fillStyle = '#B8B8B8';
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 2;
  ctx.fillRect(x + cathedralWidth/2 - 5, y - cathedralHeight/2 - roundTowerHeight, roundTowerWidth, roundTowerHeight);
  ctx.strokeRect(x + cathedralWidth/2 - 5, y - cathedralHeight/2 - roundTowerHeight, roundTowerWidth, roundTowerHeight);
  
  // Round tower conical roof (authentic Irish style)
  ctx.fillStyle = '#696969'; // Dark gray slate
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + cathedralWidth/2 - 5, y - cathedralHeight/2 - roundTowerHeight);
  ctx.lineTo(x + cathedralWidth/2 - 1, y - cathedralHeight/2 - roundTowerHeight - 12);
  ctx.lineTo(x + cathedralWidth/2 + 3, y - cathedralHeight/2 - roundTowerHeight);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // === SIDE TOWERS (ASYMMETRICAL LIKE REAL CATHEDRALS) ===
  // Left tower (taller)
  const leftTowerWidth = 14 * scale;
  const leftTowerHeight = 38 * scale;
  ctx.fillStyle = '#B8B8B8';
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 2;
  ctx.fillRect(x - cathedralWidth/2 - 8, y - cathedralHeight/2 - leftTowerHeight, leftTowerWidth, leftTowerHeight);
  ctx.strokeRect(x - cathedralWidth/2 - 8, y - cathedralHeight/2 - leftTowerHeight, leftTowerWidth, leftTowerHeight);
  
  // Left tower spire (Gothic pointed)
  ctx.fillStyle = '#696969';
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x - cathedralWidth/2 - 8, y - cathedralHeight/2 - leftTowerHeight);
  ctx.lineTo(x - cathedralWidth/2 - 1, y - cathedralHeight/2 - leftTowerHeight - 15);
  ctx.lineTo(x + cathedralWidth/2 - 8 + leftTowerWidth, y - cathedralHeight/2 - leftTowerHeight);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Right tower (shorter, different design)
  const rightTowerWidth = 12 * scale;
  const rightTowerHeight = 32 * scale;
  ctx.fillStyle = '#B8B8B8';
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 2;
  ctx.fillRect(x + cathedralWidth/2 - 6, y - cathedralHeight/2 - rightTowerHeight, rightTowerWidth, rightTowerHeight);
  ctx.strokeRect(x + cathedralWidth/2 - 6, y - cathedralHeight/2 - rightTowerHeight, rightTowerWidth, rightTowerHeight);
  
  // Right tower flat roof with battlements
  ctx.fillStyle = '#B8B8B8';
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const battlementX = x + cathedralWidth/2 - 5 + i * 3;
    ctx.fillRect(battlementX, y - cathedralHeight/2 - rightTowerHeight - 4, 2, 4);
    ctx.strokeRect(battlementX, y - cathedralHeight/2 - rightTowerHeight - 4, 2, 4);
  }
  
  // === ELABORATE GOTHIC WINDOWS ===
  ctx.fillStyle = '#1E3A8A'; // Deep blue stained glass
  ctx.strokeStyle = '#F5F5F5'; // Light stone tracery
  ctx.lineWidth = 2;
  
  // Great West Window (massive central window)
  const greatWindowWidth = 14 * scale;
  const greatWindowHeight = 24 * scale;
  ctx.beginPath();
  ctx.arc(x, y - 8 * scale, greatWindowWidth/2, Math.PI, 0);
  ctx.lineTo(x + greatWindowWidth/2, y + 16 * scale);
  ctx.lineTo(x - greatWindowWidth/2, y + 16 * scale);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Elaborate Gothic tracery (stone framework)
  ctx.strokeStyle = '#F5F5F5';
  ctx.lineWidth = 2;
  ctx.beginPath();
  // Central mullion (vertical divider)
  ctx.moveTo(x, y - 8 * scale);
  ctx.lineTo(x, y + 16 * scale);
  // Horizontal transom
  ctx.moveTo(x - greatWindowWidth/2, y + 4 * scale);
  ctx.lineTo(x + greatWindowWidth/2, y + 4 * scale);
  // Gothic pointed arch details
  ctx.moveTo(x - 4, y - 6);
  ctx.lineTo(x, y - 8);
  ctx.lineTo(x + 4, y - 6);
  // Quatrefoil (four-leaf design) in upper section
  ctx.arc(x - 3, y - 2, 2, 0, Math.PI * 2);
  ctx.moveTo(x + 1, y - 2);
  ctx.arc(x + 3, y - 2, 2, 0, Math.PI * 2);
  ctx.stroke();
  
  // Side chapel windows (smaller Gothic windows)
  const chapelWindowWidth = 8 * scale;
  const chapelWindowHeight = 14 * scale;
  
  // Left chapel window
  ctx.fillStyle = '#1E3A8A';
  ctx.strokeStyle = '#F5F5F5';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x - 22 * scale, y + 2, chapelWindowWidth/2, Math.PI, 0);
  ctx.lineTo(x - 22 * scale + chapelWindowWidth/2, y + 16);
  ctx.lineTo(x - 22 * scale - chapelWindowWidth/2, y + 16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Right chapel window
  ctx.beginPath();
  ctx.arc(x + 22 * scale, y + 2, chapelWindowWidth/2, Math.PI, 0);
  ctx.lineTo(x + 22 * scale + chapelWindowWidth/2, y + 16);
  ctx.lineTo(x + 22 * scale - chapelWindowWidth/2, y + 16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // === TOWER WINDOWS (MULTIPLE LEVELS) ===
  ctx.fillStyle = '#000000'; // Dark openings
  ctx.strokeStyle = '#F5F5F5';
  ctx.lineWidth = 1.5;
  
  // Central tower windows (three levels)
  for (let level = 0; level < 3; level++) {
    const windowY = y - cathedralHeight/2 - centralTowerHeight + 15 + level * 20;
    ctx.beginPath();
    ctx.arc(x, windowY, 3, Math.PI, 0);
    ctx.lineTo(x + 3, windowY + 6);
    ctx.lineTo(x - 3, windowY + 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  // Round tower window (high up, small)
  ctx.beginPath();
  ctx.arc(x + cathedralWidth/2 - 1, y - cathedralHeight/2 - roundTowerHeight + 10, 1.5, Math.PI, 0);
  ctx.lineTo(x + cathedralWidth/2 - 1 + 1.5, y - cathedralHeight/2 - roundTowerHeight + 13);
  ctx.lineTo(x + cathedralWidth/2 - 1 - 1.5, y - cathedralHeight/2 - roundTowerHeight + 13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Side tower windows
  ctx.beginPath();
  ctx.arc(x - cathedralWidth/2 - 1, y - cathedralHeight/2 - leftTowerHeight/2, 2.5, Math.PI, 0);
  ctx.lineTo(x - cathedralWidth/2 - 1 + 2.5, y - cathedralHeight/2 - leftTowerHeight/2 + 5);
  ctx.lineTo(x - cathedralWidth/2 - 1 - 2.5, y - cathedralHeight/2 - leftTowerHeight/2 + 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(x + cathedralWidth/2, y - cathedralHeight/2 - rightTowerHeight/2, 2, Math.PI, 0);
  ctx.lineTo(x + cathedralWidth/2 + 2, y - cathedralHeight/2 - rightTowerHeight/2 + 4);
  ctx.lineTo(x + cathedralWidth/2 - 2, y - cathedralHeight/2 - rightTowerHeight/2 + 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // === GRAND ENTRANCE PORTAL ===
  ctx.fillStyle = '#654321'; // Rich brown oak doors
  ctx.strokeStyle = '#4A2C17';
  ctx.lineWidth = 2.5;
  const doorWidth = 16 * scale;
  const doorHeight = 20 * scale;
  
  // Triple Gothic arched doorway (authentic cathedral style)
  // Central door (largest)
  ctx.beginPath();
  ctx.arc(x, y + cathedralHeight/2 - doorHeight + doorWidth/3, doorWidth/3, Math.PI, 0);
  ctx.lineTo(x + doorWidth/3, y + cathedralHeight/2);
  ctx.lineTo(x - doorWidth/3, y + cathedralHeight/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Left door (smaller)
  ctx.beginPath();
  ctx.arc(x - doorWidth/2, y + cathedralHeight/2 - doorHeight + doorWidth/4, doorWidth/4, Math.PI, 0);
  ctx.lineTo(x - doorWidth/2 + doorWidth/4, y + cathedralHeight/2);
  ctx.lineTo(x - doorWidth/2 - doorWidth/4, y + cathedralHeight/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Right door (smaller)
  ctx.beginPath();
  ctx.arc(x + doorWidth/2, y + cathedralHeight/2 - doorHeight + doorWidth/4, doorWidth/4, Math.PI, 0);
  ctx.lineTo(x + doorWidth/2 + doorWidth/4, y + cathedralHeight/2);
  ctx.lineTo(x + doorWidth/2 - doorWidth/4, y + cathedralHeight/2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Elaborate door ironwork
  ctx.strokeStyle = '#2C1810';
  ctx.lineWidth = 1.5;
  // Central door panels
  ctx.strokeRect(x - doorWidth/3 + 2, y + cathedralHeight/2 - doorHeight + 6, doorWidth/3 - 4, doorHeight/3);
  ctx.strokeRect(x - doorWidth/3 + 2, y + cathedralHeight/2 - doorHeight/2, doorWidth/3 - 4, doorHeight/3);
  // Side door panels
  ctx.strokeRect(x - doorWidth/2 - doorWidth/4 + 1, y + cathedralHeight/2 - doorHeight/2, doorWidth/2 - 2, doorHeight/2 - 2);
  ctx.strokeRect(x + doorWidth/2 - doorWidth/4 + 1, y + cathedralHeight/2 - doorHeight/2, doorWidth/2 - 2, doorHeight/2 - 2);
  
  // Ornate door handles and hinges
  ctx.fillStyle = '#B8860B'; // Dark goldenrod (aged brass)
  ctx.beginPath();
  // Central door handles
  ctx.arc(x - 2, y + cathedralHeight/2 - 8, 2, 0, Math.PI * 2);
  ctx.arc(x + 2, y + cathedralHeight/2 - 8, 2, 0, Math.PI * 2);
  // Side door handles
  ctx.arc(x - doorWidth/2 + 2, y + cathedralHeight/2 - 6, 1.5, 0, Math.PI * 2);
  ctx.arc(x + doorWidth/2 - 2, y + cathedralHeight/2 - 6, 1.5, 0, Math.PI * 2);
  ctx.fill();
  
  // === FLYING BUTTRESSES (GOTHIC ARCHITECTURAL FEATURE) ===
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#B8B8B8';
  
  // Left flying buttress
  ctx.beginPath();
  ctx.moveTo(x - cathedralWidth/2 - 15, y + 10);
  ctx.lineTo(x - cathedralWidth/2, y - 15);
  ctx.lineTo(x - cathedralWidth/2, y - 10);
  ctx.lineTo(x - cathedralWidth/2 - 12, y + 15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Right flying buttress
  ctx.beginPath();
  ctx.moveTo(x + cathedralWidth/2 + 15, y + 10);
  ctx.lineTo(x + cathedralWidth/2, y - 15);
  ctx.lineTo(x + cathedralWidth/2, y - 10);
  ctx.lineTo(x + cathedralWidth/2 + 12, y + 15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // === PROMINENT CELTIC CROSS ===
  ctx.strokeStyle = '#DAA520'; // Goldenrod (aged gold)
  ctx.lineWidth = 4;
  ctx.beginPath();
  // Vertical beam
  ctx.moveTo(x, y - cathedralHeight/2 - centralTowerHeight - 8);
  ctx.lineTo(x, y - cathedralHeight/2 - centralTowerHeight - 20);
  // Horizontal beam
  ctx.moveTo(x - 6, y - cathedralHeight/2 - centralTowerHeight - 14);
  ctx.lineTo(x + 6, y - cathedralHeight/2 - centralTowerHeight - 14);
  // Celtic circle (distinctive Irish feature)
  ctx.arc(x, y - cathedralHeight/2 - centralTowerHeight - 14, 4, 0, Math.PI * 2);
  ctx.stroke();
  
  // === AUTHENTIC STONE MASONRY TEXTURE ===
  ctx.strokeStyle = 'rgba(128, 128, 128, 0.4)';
  ctx.lineWidth = 1;
  
  // Horizontal stone courses (main cathedral)
  for (let i = 0; i < 6; i++) {
    const courseY = y - cathedralHeight/2 + (i + 1) * 8;
    ctx.beginPath();
    ctx.moveTo(x - cathedralWidth/2, courseY);
    ctx.lineTo(x + cathedralWidth/2, courseY);
    ctx.stroke();
  }
  
  // Vertical stone joints (random pattern)
  for (let i = 0; i < 8; i++) {
    const jointX = x - cathedralWidth/2 + (i + 1) * (cathedralWidth / 9);
    const jointHeight = 15 + (i % 3) * 5;
    ctx.beginPath();
    ctx.moveTo(jointX, y - cathedralHeight/2 + 10);
    ctx.lineTo(jointX, y - cathedralHeight/2 + 10 + jointHeight);
    ctx.stroke();
  }
  
  // Tower stone courses
  for (let i = 0; i < 8; i++) {
    const courseY = y - cathedralHeight/2 - centralTowerHeight + (i + 1) * 8;
    ctx.beginPath();
    ctx.moveTo(x - centralTowerWidth/2, courseY);
    ctx.lineTo(x + centralTowerWidth/2, courseY);
    ctx.stroke();
  }
  
  // === WEATHERING AND AGE EFFECTS ===
  ctx.fillStyle = 'rgba(105, 105, 105, 0.2)';
  // Subtle weathering stains
  ctx.fillRect(x - 8, y - cathedralHeight/2 + 20, 16, 3);
  ctx.fillRect(x - centralTowerWidth/2 + 2, y - cathedralHeight/2 - centralTowerHeight + 30, 4, 15);
  ctx.fillRect(x + centralTowerWidth/2 - 6, y - cathedralHeight/2 - centralTowerHeight + 45, 4, 10);
  
  // === ARCHITECTURAL DETAILS ===
  // Gargoyles (simplified)
  ctx.fillStyle = '#808080';
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 1;
  // Left gargoyle
  ctx.beginPath();
  ctx.arc(x - cathedralWidth/2 - 3, y - 5, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Right gargoyle
  ctx.beginPath();
  ctx.arc(x + cathedralWidth/2 + 3, y - 5, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Rose window (circular window above main entrance)
  ctx.strokeStyle = '#F5F5F5';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#1E3A8A';
  ctx.beginPath();
  ctx.arc(x, y - 25, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Rose window tracery
  ctx.strokeStyle = '#F5F5F5';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x - 4, y - 25);
  ctx.lineTo(x + 4, y - 25);
  ctx.moveTo(x, y - 29);
  ctx.lineTo(x, y - 21);
  ctx.moveTo(x - 3, y - 28);
  ctx.lineTo(x + 3, y - 22);
  ctx.moveTo(x + 3, y - 28);
  ctx.lineTo(x - 3, y - 22);
  ctx.stroke();
};

// Modern glass skyscraper (inspired by reference image)
const drawModernGlassSkyscraper = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0, type: 'blue' | 'teal' = 'blue') => {
  const buildingWidth = 35 * scale;
  const buildingHeight = 120 * scale; // Much taller for skyscraper effect
  
  // Shadow (larger for tall building)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(x - buildingWidth/2 + 3, y - buildingHeight/2 + 3, buildingWidth, buildingHeight);
  
  // Main building body - glass colors inspired by reference
  let glassColor = '#4A90E2'; // Clean blue glass
  let accentColor = '#87CEEB'; // Light blue accent
  if (type === 'teal') {
    glassColor = '#20B2AA'; // Clean teal glass
    accentColor = '#AFEEEE'; // Light teal accent
  }
  
  ctx.fillStyle = glassColor;
  ctx.strokeStyle = '#2C3E50'; // Dark outline for definition
  ctx.lineWidth = 2;
  ctx.fillRect(x - buildingWidth/2, y - buildingHeight/2, buildingWidth, buildingHeight);
  ctx.strokeRect(x - buildingWidth/2, y - buildingHeight/2, buildingWidth, buildingHeight);
  
  // Flat modern roof with antenna
  ctx.fillStyle = '#34495E';
  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 2;
  ctx.fillRect(x - buildingWidth/2 - 1, y - buildingHeight/2 - 4, buildingWidth + 2, 4);
  ctx.strokeRect(x - buildingWidth/2 - 1, y - buildingHeight/2 - 4, buildingWidth + 2, 4);
  
  // Antenna on roof
  ctx.fillStyle = '#606060';
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 1;
  ctx.fillRect(x - 1, y - buildingHeight/2 - 15, 2, 15);
  ctx.strokeRect(x - 1, y - buildingHeight/2 - 15, 2, 15);
  
  // Red blinking light on antenna
  ctx.fillStyle = '#FF0000';
  ctx.beginPath();
  ctx.arc(x, y - buildingHeight/2 - 16, 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Horizontal window bands (inspired by reference image)
  ctx.fillStyle = accentColor;
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  
  const windowBandHeight = 3 * scale;
  const windowBandSpacing = 8 * scale;
  const numBands = Math.floor(buildingHeight / windowBandSpacing);
  
  for (let i = 0; i < numBands; i++) {
    const bandY = y - buildingHeight/2 + (i + 1) * windowBandSpacing;
    
    // Horizontal window band across full width
    ctx.fillRect(x - buildingWidth/2 + 2, bandY, buildingWidth - 4, windowBandHeight);
    ctx.strokeRect(x - buildingWidth/2 + 2, bandY, buildingWidth - 4, windowBandHeight);
    
    // Individual window divisions within the band
    const windowWidth = 6 * scale;
    const numWindows = Math.floor((buildingWidth - 8) / windowWidth);
    
    for (let j = 0; j < numWindows; j++) {
      const windowX = x - buildingWidth/2 + 4 + j * windowWidth;
      
      // Window glass with reflection effect
      ctx.fillStyle = j % 2 === 0 ? '#E6F3FF' : accentColor; // Alternating for glass effect
      ctx.fillRect(windowX, bandY, windowWidth - 1, windowBandHeight);
      
      // Vertical window divider
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(windowX + windowWidth - 1, bandY);
      ctx.lineTo(windowX + windowWidth - 1, bandY + windowBandHeight);
      ctx.stroke();
    }
  }
  
  // Glass reflection effect (diagonal highlight)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.moveTo(x - buildingWidth/2, y - buildingHeight/2);
  ctx.lineTo(x - buildingWidth/2 + buildingWidth/3, y - buildingHeight/2);
  ctx.lineTo(x - buildingWidth/2, y - buildingHeight/2 + buildingHeight/2);
  ctx.closePath();
  ctx.fill();
  
  // Modern entrance at ground level
  ctx.fillStyle = '#2C3E50';
  ctx.strokeStyle = '#1A252F';
  ctx.lineWidth = 2;
  const entranceWidth = 12 * scale;
  const entranceHeight = 15 * scale;
  ctx.fillRect(x - entranceWidth/2, y + buildingHeight/2 - entranceHeight, entranceWidth, entranceHeight);
  ctx.strokeRect(x - entranceWidth/2, y + buildingHeight/2 - entranceHeight, entranceWidth, entranceHeight);
  
  // Glass entrance doors
  ctx.fillStyle = accentColor;
  ctx.fillRect(x - entranceWidth/2 + 1, y + buildingHeight/2 - entranceHeight + 2, entranceWidth - 2, entranceHeight - 4);
  
  // Door handles
  ctx.fillStyle = '#C0C0C0';
  ctx.beginPath();
  ctx.arc(x - 2, y + buildingHeight/2 - 6, 1, 0, Math.PI * 2);
  ctx.arc(x + 2, y + buildingHeight/2 - 6, 1, 0, Math.PI * 2);
  ctx.fill();
};

// Cohesive urban building (matching Irish cottage style but urban)
const drawCohesiveUrbanBuilding = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0, type: string) => {
  const baseSize = 14 * scale;
  const buildingWidth = 25 * scale;
  const buildingHeight = 30 * scale;
  
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(x - buildingWidth/2 + 2, y - buildingHeight/2 + 2, buildingWidth, buildingHeight);
  
  // Building colors - cohesive urban palette
  let buildingColor = '#B8B8B8'; // Light gray
  if (type === 'office') buildingColor = '#A8A8A8'; // Medium gray
  if (type === 'shop') buildingColor = '#C8C8C8'; // Lighter gray
  if (type === 'apartment') buildingColor = '#989898'; // Darker gray
  
  // Main building body
  ctx.fillStyle = buildingColor;
  ctx.strokeStyle = '#808080'; // Consistent dark gray outline
  ctx.lineWidth = 1.5;
  ctx.fillRect(x - buildingWidth/2, y - buildingHeight/2, buildingWidth, buildingHeight);
  ctx.strokeRect(x - buildingWidth/2, y - buildingHeight/2, buildingWidth, buildingHeight);
  
  // Roof (consistent dark gray)
  ctx.fillStyle = '#707070';
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 1;
  
  if (type === 'office') {
    // Flat roof for office
    ctx.fillRect(x - buildingWidth/2 - 1, y - buildingHeight/2 - 3, buildingWidth + 2, 3);
    ctx.strokeRect(x - buildingWidth/2 - 1, y - buildingHeight/2 - 3, buildingWidth + 2, 3);
  } else {
    // Angled roof for others
    ctx.beginPath();
    ctx.moveTo(x - buildingWidth/2 - 2, y - buildingHeight/2);
    ctx.lineTo(x, y - buildingHeight/2 - 10);
    ctx.lineTo(x + buildingWidth/2 + 2, y - buildingHeight/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  // Windows (consistent light gray)
  ctx.fillStyle = '#E8E8E8';
  ctx.strokeStyle = '#D0D0D0';
  ctx.lineWidth = 1;
  
  // Window pattern based on type
  if (type === 'office') {
    // Grid of office windows
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 2; col++) {
        const winX = x - 8 + col * 8;
        const winY = y - 10 + row * 6;
        ctx.fillRect(winX, winY, 6, 4);
        ctx.strokeRect(winX, winY, 6, 4);
      }
    }
  } else {
    // Simple residential windows
    ctx.fillRect(x - 8, y - 8, 6, 6);
    ctx.strokeRect(x - 8, y - 8, 6, 6);
    ctx.fillRect(x + 2, y - 8, 6, 6);
    ctx.strokeRect(x + 2, y - 8, 6, 6);
  }
  
  // Door (consistent dark gray)
  ctx.fillStyle = '#606060';
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 1;
  ctx.fillRect(x - 3, y + buildingHeight/2 - 8, 6, 8);
  ctx.strokeRect(x - 3, y + buildingHeight/2 - 8, 6, 8);
  
  // Door handle
  ctx.fillStyle = '#D0D0D0';
  ctx.beginPath();
  ctx.arc(x + 1, y + buildingHeight/2 - 4, 1, 0, Math.PI * 2);
  ctx.fill();
};

// Urban infrastructure (matching Irish countryside rocks)
const drawUrbanInfrastructure = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0, type: string) => {
  const baseSize = 12 * scale;
  const shadowOffset = 2 * scale;
  
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(x + shadowOffset, y + shadowOffset, baseSize, baseSize * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  
  if (type === 'streetlight') {
    // Street light pole
    ctx.fillStyle = '#606060'; // Dark gray
    ctx.strokeStyle = '#505050';
    ctx.lineWidth = 1;
    ctx.fillRect(x - 2, y - 15, 4, 20);
    ctx.strokeRect(x - 2, y - 15, 4, 20);
    
    // Light fixture
    ctx.fillStyle = '#808080';
    ctx.beginPath();
    ctx.arc(x, y - 15, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Light glow (subtle)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y - 15, 6, 0, Math.PI * 2);
    ctx.fill();
    
  } else if (type === 'mailbox') {
    // Mailbox body
    ctx.fillStyle = '#4169E1'; // Royal blue
    ctx.strokeStyle = '#2E4BC7';
    ctx.lineWidth = 1;
    ctx.fillRect(x - 4, y - 8, 8, 12);
    ctx.strokeRect(x - 4, y - 8, 8, 12);
    
    // Mailbox slot
    ctx.fillStyle = '#000000';
    ctx.fillRect(x - 3, y - 2, 6, 1);
    
  } else if (type === 'hydrant') {
    // Fire hydrant body
    ctx.fillStyle = '#DC143C'; // Crimson
    ctx.strokeStyle = '#B22222';
    ctx.lineWidth = 1;
    ctx.fillRect(x - 3, y - 6, 6, 10);
    ctx.strokeRect(x - 3, y - 6, 6, 10);
    
    // Hydrant cap
    ctx.fillStyle = '#FFD700'; // Gold
    ctx.fillRect(x - 4, y - 8, 8, 2);
    ctx.strokeRect(x - 4, y - 8, 8, 2);
    
    // Side connections
    ctx.fillStyle = '#C0C0C0'; // Silver
    ctx.fillRect(x - 5, y - 2, 2, 3);
    ctx.fillRect(x + 3, y - 2, 2, 3);
  }
};

// Urban signs (matching Celtic banners)
const drawUrbanSign = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // Sign pole
  ctx.fillStyle = '#606060';
  ctx.fillRect(x - 1, y - 30, 2, 50);
  
  // Sign board
  ctx.fillStyle = '#E0E0E0';
  ctx.strokeStyle = '#A0A0A0';
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.fillRect(x + 2, y - 25, 20, 12);
  ctx.strokeRect(x + 2, y - 25, 20, 12);
  
  // Simple urban icon
  ctx.strokeStyle = '#606060';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x + 12, y - 19, 3, 0, Math.PI * 2);
  ctx.stroke();
  
  // Arrow
  ctx.beginPath();
  ctx.moveTo(x + 8, y - 19);
  ctx.lineTo(x + 16, y - 19);
  ctx.moveTo(x + 14, y - 21);
  ctx.lineTo(x + 16, y - 19);
  ctx.lineTo(x + 14, y - 17);
  ctx.stroke();
};

// Urban element (simple geometric shape)
const drawUrbanElement = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1.0) => {
  const elementSize = 3 * scale;
  
  ctx.fillStyle = '#B0B0B0';
  ctx.strokeStyle = '#909090';
  ctx.lineWidth = 1;
  
  // Simple square urban element
  ctx.beginPath();
  ctx.fillRect(x - elementSize/2, y - elementSize/2, elementSize, elementSize);
  ctx.strokeRect(x - elementSize/2, y - elementSize/2, elementSize, elementSize);
};

// Urban border frame (matching reference image building border)
const drawUrbanBorderFrame = (ctx: CanvasRenderingContext2D) => {
  // Create urban border using colorful buildings around the edges (like reference image)
  const borderBuildings = [
    // Top border
    { x: 50, y: 25 }, { x: 120, y: 30 }, { x: 190, y: 25 }, { x: 260, y: 30 }, 
    { x: 330, y: 25 }, { x: 400, y: 30 }, { x: 470, y: 25 }, { x: 540, y: 30 }, 
    { x: 610, y: 25 }, { x: 680, y: 30 }, { x: 750, y: 25 }, { x: 820, y: 30 }, { x: 850, y: 25 },
    
    // Bottom border
    { x: 50, y: 575 }, { x: 120, y: 570 }, { x: 190, y: 575 }, { x: 260, y: 570 }, 
    { x: 330, y: 575 }, { x: 400, y: 570 }, { x: 470, y: 575 }, { x: 540, y: 570 }, 
    { x: 610, y: 575 }, { x: 680, y: 570 }, { x: 750, y: 575 }, { x: 820, y: 570 }, { x: 850, y: 575 },
    
    // Left border
    { x: 25, y: 80 }, { x: 30, y: 140 }, { x: 25, y: 200 }, { x: 30, y: 260 }, 
    { x: 25, y: 320 }, { x: 30, y: 380 }, { x: 25, y: 440 }, { x: 30, y: 500 }, { x: 25, y: 560 },
    
    // Right border
    { x: 875, y: 80 }, { x: 870, y: 140 }, { x: 875, y: 200 }, { x: 870, y: 260 }, 
    { x: 875, y: 320 }, { x: 870, y: 380 }, { x: 875, y: 440 }, { x: 870, y: 500 }, { x: 875, y: 560 }
  ];
  
  borderBuildings.forEach(pos => {
    drawBorderBuilding(ctx, pos.x, pos.y);
  });
};

// Urban decoration patches (matching shamrock patches)
const drawUrbanDecorationPatch = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  // Multiple urban elements in a small area - using seeded random for consistent positions
  const seed = x + y * 1000; // Create seed based on position
  let random = seed;
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };
  
  for (let i = 0; i < 5; i++) {
    const elementX = x + (seededRandom() - 0.5) * 20;
    const elementY = y + (seededRandom() - 0.5) * 20;
    const scale = 0.5 + seededRandom() * 0.5;
    
    drawUrbanElement(ctx, elementX, elementY, scale);
  }
};

// Small urban elements (matching small decorations)
const drawSmallUrbanElements = (ctx: CanvasRenderingContext2D) => {
  // Small urban details
  const detailPositions = [
    { x: 130, y: 350 },
    { x: 280, y: 420 },
    { x: 520, y: 300 },
    { x: 680, y: 420 }
  ];
  
  detailPositions.forEach(pos => {
    // Small urban fixture
    ctx.fillStyle = '#A0A0A0';
    ctx.fillRect(pos.x - 1, pos.y, 2, 6);
    
    // Top element
    ctx.fillStyle = '#808080';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y - 1, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Small details
    ctx.fillStyle = '#C0C0C0';
    ctx.beginPath();
    ctx.arc(pos.x - 1, pos.y - 2, 1, 0, Math.PI * 2);
    ctx.arc(pos.x + 1, pos.y, 0.5, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Urban ground markings
  const markingPositions = [
    { x: 200, y: 150 },
    { x: 500, y: 200 },
    { x: 350, y: 450 }
  ];
  
  markingPositions.forEach(pos => {
    ctx.strokeStyle = '#FFFFFF';
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





// No frame for City Pub world - replaced with animated river background

// City-themed map decorations for urban pub world - BUILDING CLUSTERS WITH REFERENCE STYLE
export const drawCityMapDecorations = (ctx: CanvasRenderingContext2D) => {
  // Save context
  ctx.save();
  
  // No frame for City Pub world - animated river background handles the border
  
  // Building clusters positioned with breathing space from map and each other (matching reference image)
  // Enemy path: (-20,300) → (150,300) → (150,150) → (350,150) → (350,450) → (550,450) → (550,250) → (750,250) → (750,350) → (850,350)
  // Tower pads: (75,240), (210,225), (250,90), (290,300), (450,390), (610,300), (700,190)
  const buildingClusters = [
    // Upper left area - large buildings with breathing space
    { x: 100, y: 100, size: 3 },    // Upper left corner, good spacing from edges
    { x: 220, y: 120, size: 2 },    // Upper left central, respecting tower pad spacing
    
    // Upper central area - scattered with spacing 
    { x: 400, y: 80, size: 2 },     // Upper central, well above path and pads
    { x: 520, y: 100, size: 3 },    // Upper right central, good spacing
    
    // Upper right area - buildings with breathing space
    { x: 680, y: 120, size: 2 },    // Upper right, away from tower pad at (700,190)
    { x: 780, y: 100, size: 3 },    // Upper right corner, good edge spacing
    
    // Left side - individual buildings with space
    { x: 80, y: 200, size: 2 },     // Left side, respecting path at (150,300)
    { x: 60, y: 350, size: 2 },     // Lower left side, good spacing from path
    
    // Central areas - scattered buildings avoiding landmarks
    { x: 400, y: 220, size: 2 },    // Central, between path segments, away from church area
    { x: 580, y: 200, size: 2 },    // Central right, respecting tower pad spacing
    
    // Lower areas - buildings with good spacing
    { x: 120, y: 480, size: 3 },    // Lower left, good spacing from edges
    { x: 300, y: 520, size: 2 },    // Lower central, well spaced
    { x: 500, y: 480, size: 3 },    // Lower right central, good spacing
    { x: 700, y: 520, size: 2 },    // Lower right, good edge spacing
    
    // Additional scattered buildings - matching reference image density
    { x: 160, y: 320, size: 2 },    // Left central, between path segments
    { x: 650, y: 340, size: 2 }     // Right central, good spacing from landmarks
  ];
  
  buildingClusters.forEach(cluster => {
    drawEuropeanRowCluster(ctx, cluster.x, cluster.y, cluster.size);
  });
  
  // Clean-cut circular/oval trees positioned with natural spacing (matching reference image)
  // Positioned to complement buildings and landmarks, not compete with them
  const treePositions = [
    // Upper areas - scattered naturally between buildings
    { x: 160, y: 80, size: 0.9 },    // Upper left, between building clusters
    { x: 340, y: 100, size: 0.8 },   // Upper central, natural spacing
    { x: 600, y: 90, size: 1.0 },    // Upper right, good spacing
    
    // Left side - natural park-like placement
    { x: 120, y: 160, size: 0.8 },   // Left side, natural spacing
    { x: 80, y: 280, size: 0.9 },    // Left side, away from landmarks
    
    // Central areas - scattered between landmarks for natural appearance
    { x: 380, y: 240, size: 0.8 },   // Central, between church and skyscraper
    { x: 520, y: 280, size: 0.9 },   // Central right, natural placement
    { x: 620, y: 240, size: 0.8 },   // Right central, good spacing
    
    // Right side - natural placement
    { x: 780, y: 180, size: 0.9 },   // Right side, natural spacing
    { x: 820, y: 260, size: 0.8 },   // Right side, good placement
    
    // Lower areas - scattered naturally
    { x: 140, y: 440, size: 0.8 },   // Lower left, natural placement
    { x: 380, y: 480, size: 0.9 },   // Lower central, between buildings
    { x: 580, y: 460, size: 0.8 },   // Lower right, natural spacing
    { x: 750, y: 480, size: 0.9 }    // Lower right corner, good spacing
  ];
  
  treePositions.forEach(pos => {
    drawCleanCutTree(ctx, pos.x, pos.y, pos.size);
  });
  
  // Irish flags positioned to avoid enemy path and tower pads
  const flagPositions = [
    { x: 800, y: 200, size: 1.2 },  // Near Paddy's Pub, above final path segment
    { x: 780, y: 450, size: 1.1 },  // Near pub, below path
    { x: 120, y: 160, size: 1.1 },  // Upper left, safe area
    { x: 450, y: 120, size: 1.0 },  // Upper central, safe from path
    { x: 650, y: 160, size: 1.1 },  // Upper right, safe area
    { x: 120, y: 400, size: 1.0 },  // Lower left, safe area
    { x: 400, y: 480, size: 1.0 },  // Lower central, safe area
    { x: 680, y: 450, size: 1.0 }   // Lower right, safe area
  ];
  
  flagPositions.forEach(pos => {
    drawIrishFlag(ctx, pos.x, pos.y, pos.size);
  });
  
  // Urban infrastructure positioned to avoid enemy path and tower pads
  // Traffic lights - positioned safely away from gameplay elements
  const trafficLightPositions = [
    { x: 160, y: 120, size: 1.0 },  // Upper left, safe area
    { x: 380, y: 110, size: 1.0 },  // Upper central, safe area
    { x: 600, y: 120, size: 1.0 },  // Upper right, safe area
    { x: 120, y: 280, size: 1.0 },  // Left side, safe from path
    { x: 750, y: 180, size: 1.0 }   // Right side, safe area
  ];
  
  trafficLightPositions.forEach(pos => {
    drawTrafficLight(ctx, pos.x, pos.y, pos.size);
  });
  
  // Road signs - positioned in safe areas
  const roadSignPositions = [
    { x: 140, y: 140, size: 1.0 },  // Upper left, safe
    { x: 460, y: 140, size: 1.0 },  // Upper central, safe
    { x: 680, y: 140, size: 1.0 },  // Upper right, safe
    { x: 140, y: 460, size: 1.0 },  // Lower left, safe
    { x: 680, y: 460, size: 1.0 }   // Lower right, safe
  ];
  
  roadSignPositions.forEach(pos => {
    drawRoadSign(ctx, pos.x, pos.y, pos.size);
  });
  
  // Faint crosswalks - positioned away from main gameplay areas
  const crosswalkPositions = [
    { x: 200, y: 120, size: 0.8 },  // Upper area, safe
    { x: 600, y: 480, size: 0.8 },  // Lower area, safe
    { x: 120, y: 320, size: 0.8 }   // Left side, safe
  ];
  
  crosswalkPositions.forEach(pos => {
    drawCrosswalk(ctx, pos.x, pos.y, pos.size);
  });
  
  // Landmark buildings positioned with their own areas (no other buildings nearby as requested)
  // Church positioned with clear space around it
  drawChurch(ctx, 280, 350, 1.4);  // Central left area, isolated from other buildings
  
  // Modern glass skyscrapers positioned as landmarks with breathing space
  drawModernGlassSkyscraper(ctx, 450, 180, 1.2, 'blue');  // Central upper area, isolated
  drawModernGlassSkyscraper(ctx, 750, 320, 1.1, 'teal');  // Right central area, isolated
  
  // Dublin's Poolbeg Towers positioned as iconic Dublin landmark with clear area
  drawPoolbegTowers(ctx, 180, 400, 1.0);  // Left central area, isolated from other buildings
  
  // Draw the main pub entrance - Paddy's Pub (keep where it is as requested)
  drawUrbanPub(ctx, 840, 280);
  
  // Restore context
  ctx.restore();
};