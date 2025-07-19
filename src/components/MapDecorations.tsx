import React from 'react';
import { GAME_PATH } from '../data/gameConfig';

interface Position {
  x: number;
  y: number;
}

// Seeded random number generator for consistent results
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// REALM DEFENSE APPROACH: Create a proper path mask using actual path rendering
function createPathMask(width: number, height: number): boolean[][] {
  // Create a 2D boolean array representing the map
  const mask: boolean[][] = Array(height).fill(null).map(() => Array(width).fill(false));
  
  // Mark path areas as blocked (true = blocked, false = available)
  const pathWidth = 35; // Slightly wider than visual path for safety
  
  for (let i = 0; i < GAME_PATH.length - 1; i++) {
    const start = GAME_PATH[i];
    const end = GAME_PATH[i + 1];
    
    // Draw thick line between path points
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.ceil(distance);
    
    for (let step = 0; step <= steps; step++) {
      const t = step / steps;
      const x = Math.round(start.x + dx * t);
      const y = Math.round(start.y + dy * t);
      
      // Mark area around this point as blocked
      for (let px = x - pathWidth/2; px <= x + pathWidth/2; px++) {
        for (let py = y - pathWidth/2; py <= y + pathWidth/2; py++) {
          if (px >= 0 && px < width && py >= 0 && py < height) {
            mask[py][px] = true;
          }
        }
      }
    }
  }
  
  return mask;
}

// REALM DEFENSE APPROACH: Strategic placement in clear zones
function findStrategicPositions(
  pathMask: boolean[][],
  count: number,
  minDistance: number,
  decorationSize: number,
  seed: number,
  mapWidth: number,
  mapHeight: number
): Position[] {
  const positions: Position[] = [];
  const margin = 40;
  let attempts = 0;
  const maxAttempts = count * 50;
  
  while (positions.length < count && attempts < maxAttempts) {
    attempts++;
    
    const x = margin + seededRandom(seed + attempts * 2) * (mapWidth - 2 * margin);
    const y = margin + seededRandom(seed + attempts * 2 + 1) * (mapHeight - 2 * margin);
    
    // Check if this position is clear of path
    const halfSize = decorationSize / 2;
    let isBlocked = false;
    
    for (let px = x - halfSize; px <= x + halfSize && !isBlocked; px++) {
      for (let py = y - halfSize; py <= y + halfSize && !isBlocked; py++) {
        const mapX = Math.floor(px);
        const mapY = Math.floor(py);
        
        if (mapX >= 0 && mapX < mapWidth && mapY >= 0 && mapY < mapHeight) {
          if (pathMask[mapY] && pathMask[mapY][mapX]) {
            isBlocked = true;
          }
        }
      }
    }
    
    if (!isBlocked) {
      // Check distance from other decorations
      const tooClose = positions.some(pos => {
        const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
        return distance < minDistance;
      });
      
      if (!tooClose) {
        positions.push({ x, y });
      }
    }
  }
  
  return positions;
}

const MapDecorations: React.FC = () => {
  const mapWidth = 800;
  const mapHeight = 600;
  
  // Create path mask once
  const pathMask = React.useMemo(() => createPathMask(mapWidth, mapHeight), [mapWidth, mapHeight]);
  
  // REALM DEFENSE STYLE: Much fewer, strategically placed decorations
  const treePositions = React.useMemo(() => 
    findStrategicPositions(pathMask, 8, 120, 40, 1000, mapWidth, mapHeight), 
    [pathMask]
  );
  
  const cottagePositions = React.useMemo(() => 
    findStrategicPositions(pathMask, 4, 150, 50, 2000, mapWidth, mapHeight), 
    [pathMask]
  );
  
  const rockPositions = React.useMemo(() => 
    findStrategicPositions(pathMask, 6, 100, 30, 3000, mapWidth, mapHeight), 
    [pathMask]
  );
  
  const bushPositions = React.useMemo(() => 
    findStrategicPositions(pathMask, 5, 80, 25, 4000, mapWidth, mapHeight), 
    [pathMask]
  );

  // Tree component - Clean, Realm Defense style
  const Tree = ({ x, y, index }: { x: number; y: number; index: number }) => {
    const leafColors = ['#228B22', '#32CD32', '#2E8B57'];
    const leafColor = leafColors[index % leafColors.length];
    
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Shadow */}
        <ellipse cx="20" cy="45" rx="15" ry="3" fill="#000000" opacity="0.2"/>
        
        {/* Trunk */}
        <rect x="16" y="25" width="8" height="20" fill="#8B4513" stroke="#654321" strokeWidth="1" rx="2"/>
        
        {/* Main canopy */}
        <circle cx="20" cy="20" r="18" fill={leafColor} stroke="#006400" strokeWidth="1.5"/>
        
        {/* Canopy highlights */}
        <circle cx="15" cy="15" r="5" fill="#90EE90" opacity="0.6"/>
        <circle cx="25" cy="18" r="3" fill="#90EE90" opacity="0.4"/>
        
        {/* Canopy shadows */}
        <circle cx="22" cy="25" r="6" fill="#006400" opacity="0.3"/>
      </g>
    );
  };

  // Cottage component - Clean, strategic placement
  const Cottage = ({ x, y, index }: { x: number; y: number; index: number }) => {
    const roofColors = ['#B8860B', '#CD853F', '#D2691E'];
    const wallColors = ['#F5DEB3', '#DEB887', '#D2B48C'];
    const roofColor = roofColors[index % roofColors.length];
    const wallColor = wallColors[index % wallColors.length];
    
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Shadow */}
        <ellipse cx="25" cy="50" rx="20" ry="4" fill="#000000" opacity="0.2"/>
        
        {/* House base */}
        <rect x="5" y="20" width="40" height="25" fill={wallColor} stroke="#8B7355" strokeWidth="1.5" rx="2"/>
        
        {/* Roof */}
        <path d="M0,20 L25,5 L50,20 L45,18 L25,8 L5,18 Z" fill={roofColor} stroke="#8B4513" strokeWidth="1"/>
        
        {/* Door */}
        <rect x="20" y="30" width="10" height="15" fill="#8B4513" stroke="#654321" strokeWidth="1" rx="1"/>
        
        {/* Windows */}
        <rect x="10" y="25" width="6" height="6" fill="#87CEEB" stroke="#654321" strokeWidth="1"/>
        <rect x="34" y="25" width="6" height="6" fill="#87CEEB" stroke="#654321" strokeWidth="1"/>
        
        {/* Chimney */}
        <rect x="35" y="8" width="5" height="12" fill="#696969" stroke="#2F4F4F" strokeWidth="1"/>
      </g>
    );
  };

  // Rock component - Simple, clean
  const Rock = ({ x, y, index }: { x: number; y: number; index: number }) => {
    const rockColors = ['#696969', '#778899', '#708090'];
    const rockColor = rockColors[index % rockColors.length];
    
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Shadow */}
        <ellipse cx="15" cy="25" rx="12" ry="2" fill="#000000" opacity="0.3"/>
        
        {/* Main rock */}
        <ellipse cx="15" cy="20" rx="12" ry="8" fill={rockColor} stroke="#2F4F4F" strokeWidth="1"/>
        
        {/* Highlight */}
        <ellipse cx="12" cy="17" rx="3" ry="2" fill="#A9A9A9" opacity="0.6"/>
      </g>
    );
  };

  // Bush component - Small gap filler
  const Bush = ({ x, y, index }: { x: number; y: number; index: number }) => {
    const bushColors = ['#228B22', '#32CD32', '#2E8B57'];
    const bushColor = bushColors[index % bushColors.length];
    
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Shadow */}
        <ellipse cx="12" cy="20" rx="8" ry="2" fill="#000000" opacity="0.2"/>
        
        {/* Bush cluster */}
        <circle cx="12" cy="16" r="8" fill={bushColor} stroke="#006400" strokeWidth="1"/>
        <circle cx="8" cy="14" r="5" fill={bushColor} opacity="0.9"/>
        <circle cx="16" cy="14" r="5" fill={bushColor} opacity="0.9"/>
        
        {/* Highlight */}
        <circle cx="10" cy="14" r="2" fill="#90EE90" opacity="0.5"/>
      </g>
    );
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 800 600" className="absolute inset-0">
        {/* Render trees - strategic placement */}
        {treePositions.map((pos, index) => (
          <Tree key={`tree-${index}`} x={pos.x} y={pos.y} index={index} />
        ))}
        
        {/* Render cottages - fewer, well-spaced */}
        {cottagePositions.map((pos, index) => (
          <Cottage key={`cottage-${index}`} x={pos.x} y={pos.y} index={index} />
        ))}
        
        {/* Render rocks - accent pieces */}
        {rockPositions.map((pos, index) => (
          <Rock key={`rock-${index}`} x={pos.x} y={pos.y} index={index} />
        ))}
        
        {/* Render bushes - gap fillers */}
        {bushPositions.map((pos, index) => (
          <Bush key={`bush-${index}`} x={pos.x} y={pos.y} index={index} />
        ))}

        {/* Pub entrance */}
        <g transform="translate(350, 20)">
          <rect x="0" y="0" width="100" height="40" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="5"/>
          <text x="50" y="25" textAnchor="middle" fill="#FFD700" fontSize="12" fontWeight="bold">
            O'Malley's Pub
          </text>
        </g>
      </svg>
    </div>
  );
};

export default MapDecorations;