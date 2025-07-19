import React from 'react';

// Enhanced tower graphics with professional styling
export const drawEnhancedTowerIcon = (
  ctx: CanvasRenderingContext2D, 
  type: string, 
  x: number, 
  y: number, 
  level: number,
  paddyImage?: HTMLImageElement
) => {
  const baseSize = 16 + (level - 1) * 3;
  
  // Save context for transformations
  ctx.save();
  
  switch (type) {
    case 'bartender': {
      // Simplified Paddy Losty - just his image in a gold circle
      
      if (paddyImage) {
        // Draw golden circle background
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, baseSize + 4);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(0.7, '#DAA520');
        gradient.addColorStop(1, '#B8860B');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, baseSize + 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Clip to circular area for image
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, baseSize - 2, 0, Math.PI * 2);
        ctx.clip();
        
        // Draw Paddy's image
        ctx.drawImage(
          paddyImage, 
          x - (baseSize - 2), 
          y - (baseSize - 2), 
          (baseSize - 2) * 2, 
          (baseSize - 2) * 2
        );
        
        ctx.restore();
        
        // Add golden border
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, baseSize - 2, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add inner golden ring
        ctx.strokeStyle = '#B8860B';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, baseSize - 4, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Fallback golden circle if image not loaded
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, baseSize + 2);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(0.7, '#DAA520');
        gradient.addColorStop(1, '#B8860B');
        
        ctx.fillStyle = gradient;
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, baseSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add "P" for Paddy
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${baseSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('P', x, y);
      }
      
      // Add level indicators for upgrades
      if (level > 1) {
        for (let i = 0; i < level - 1; i++) {
          ctx.fillStyle = '#FFD700';
          ctx.strokeStyle = '#B8860B';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x - 15 + i * 8, y - 25, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          
          // Add star in center
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '6px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('★', x - 15 + i * 8, y - 22);
        }
      }
      
      break;
    }
    
    case 'bouncer': {
      // Enhanced Maureen's Kitchen tower
      
      // Draw stove base
      const stoveGradient = ctx.createRadialGradient(x, y, 0, x, y, baseSize + 6);
      stoveGradient.addColorStop(0, '#2F2F2F');
      stoveGradient.addColorStop(1, '#1A1A1A');
      
      ctx.fillStyle = stoveGradient;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, baseSize + 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Draw frying pan
      ctx.fillStyle = '#2C2C2C';
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y - 8, baseSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Pan handle
      ctx.fillStyle = '#8B4513';
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 2;
      ctx.fillRect(x + baseSize - 2, y - 10, 12, 4);
      ctx.strokeRect(x + baseSize - 2, y - 10, 12, 4);
      
      // Sizzling sausages with enhanced detail
      const sausagePositions = [
        { x: x - 6, y: y - 12, rotation: 0.3 },
        { x: x + 2, y: y - 8, rotation: -0.2 },
        { x: x - 2, y: y - 4, rotation: 0.5 },
        { x: x + 6, y: y - 10, rotation: -0.4 }
      ];
      
      sausagePositions.forEach(pos => {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(pos.rotation);
        
        // Sausage gradient
        const sausageGradient = ctx.createLinearGradient(-6, -2, 6, 2);
        sausageGradient.addColorStop(0, '#CD853F');
        sausageGradient.addColorStop(0.5, '#8B4513');
        sausageGradient.addColorStop(1, '#A0522D');
        
        ctx.fillStyle = sausageGradient;
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, 6, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Sausage texture lines
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 0.5;
        for (let i = -4; i <= 4; i += 2) {
          ctx.beginPath();
          ctx.moveTo(i, -1);
          ctx.lineTo(i, 1);
          ctx.stroke();
        }
        
        ctx.restore();
      });
      
      // Add cooking steam/smoke
      if (level > 1) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(x - 4 + i * 4, y - 20 - i * 2, 2 + i * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Level indicators
      if (level > 1) {
        for (let i = 0; i < level - 1; i++) {
          ctx.fillStyle = '#FF4500';
          ctx.strokeStyle = '#8B0000';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x - 12 + i * 6, y + 15, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      
      break;
    }
    
    case 'fiddler': {
      // Prime Mutton tower - now shows a pint of Guinness
      
      // Draw pint glass base
      const glassGradient = ctx.createLinearGradient(x - baseSize/2, y - baseSize, x + baseSize/2, y + baseSize);
      glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      glassGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
      glassGradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
      
      // Pint glass shape (slightly wider at top)
      ctx.fillStyle = glassGradient;
      ctx.strokeStyle = '#C0C0C0';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(x - baseSize/2 - 2, y + baseSize/2);
      ctx.lineTo(x - baseSize/2, y - baseSize);
      ctx.lineTo(x + baseSize/2, y - baseSize);
      ctx.lineTo(x + baseSize/2 + 2, y + baseSize/2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Guinness beer (dark stout)
      const beerGradient = ctx.createLinearGradient(x, y - baseSize + 2, x, y + baseSize/2 - 4);
      beerGradient.addColorStop(0, '#2F1B14');  // Very dark brown
      beerGradient.addColorStop(0.8, '#1A0F0A'); // Almost black
      beerGradient.addColorStop(1, '#0D0706');   // Deep black
      
      ctx.fillStyle = beerGradient;
      ctx.beginPath();
      ctx.moveTo(x - baseSize/2 - 1, y + baseSize/2 - 2);
      ctx.lineTo(x - baseSize/2 + 1, y - baseSize + 8);
      ctx.lineTo(x + baseSize/2 - 1, y - baseSize + 8);
      ctx.lineTo(x + baseSize/2 + 1, y + baseSize/2 - 2);
      ctx.closePath();
      ctx.fill();
      
      // Guinness foam head (creamy white)
      const foamGradient = ctx.createLinearGradient(x, y - baseSize + 2, x, y - baseSize + 8);
      foamGradient.addColorStop(0, '#FFFEF7');
      foamGradient.addColorStop(0.5, '#FFF8DC');
      foamGradient.addColorStop(1, '#F5F5DC');
      
      ctx.fillStyle = foamGradient;
      ctx.beginPath();
      ctx.moveTo(x - baseSize/2 + 1, y - baseSize + 2);
      ctx.lineTo(x + baseSize/2 - 1, y - baseSize + 2);
      ctx.lineTo(x + baseSize/2 - 1, y - baseSize + 8);
      ctx.lineTo(x - baseSize/2 + 1, y - baseSize + 8);
      ctx.closePath();
      ctx.fill();
      
      // Add foam texture with small bubbles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = 0; i < 6; i++) {
        const bubbleX = x - baseSize/3 + (i * baseSize/8);
        const bubbleY = y - baseSize + 3 + (Math.random() * 3);
        ctx.beginPath();
        ctx.arc(bubbleX, bubbleY, 0.5 + Math.random() * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Glass rim highlight
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(x - baseSize/2, y - baseSize);
      ctx.lineTo(x + baseSize/2, y - baseSize);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
      
      // Glass handle
      ctx.strokeStyle = '#C0C0C0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x + baseSize/2 + 6, y - baseSize/4, baseSize/3, -Math.PI/2, Math.PI/2, false);
      ctx.stroke();
      
      // Add Guinness logo/harp symbol on glass
      if (level > 1) {
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Simple harp outline
        ctx.moveTo(x - 2, y - 2);
        ctx.quadraticCurveTo(x - 6, y - 8, x - 2, y - 12);
        ctx.moveTo(x - 2, y - 12);
        ctx.lineTo(x + 2, y - 8);
        ctx.lineTo(x + 2, y - 2);
        // Harp strings
        for (let i = 0; i < 3; i++) {
          ctx.moveTo(x - 2 + i, y - 10 + i * 2);
          ctx.lineTo(x + 2, y - 8 + i * 2);
        }
        ctx.stroke();
      }
      
      // Level indicators (beer drops)
      if (level > 1) {
        for (let i = 0; i < level - 1; i++) {
          ctx.fillStyle = '#2F1B14';
          ctx.strokeStyle = '#1A0F0A';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x - 15 + i * 8, y + baseSize/2 + 8, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      
      break;
    }
    
    case 'leprechaun': {
      // Enhanced Lucky's Shamrock tower
      
      // Draw magical stone circle base
      const magicGradient = ctx.createRadialGradient(x, y, 0, x, y, baseSize + 8);
      magicGradient.addColorStop(0, '#32CD32');
      magicGradient.addColorStop(0.7, '#228B22');
      magicGradient.addColorStop(1, '#006400');
      
      ctx.fillStyle = magicGradient;
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, baseSize + 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Add Celtic knot border
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(x, y, baseSize + 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw large central shamrock with detail
      const leafSize = baseSize / 2;
      
      // Shamrock leaves with gradient
      const leafGradient = ctx.createRadialGradient(x, y - 8, 0, x, y - 8, leafSize + 2);
      leafGradient.addColorStop(0, '#90EE90');
      leafGradient.addColorStop(0.5, '#32CD32');
      leafGradient.addColorStop(1, '#228B22');
      
      ctx.fillStyle = leafGradient;
      ctx.strokeStyle = '#006400';
      ctx.lineWidth = 2;
      
      // Four-leaf clover pattern
      const leafPositions = [
        { x: x - leafSize/2, y: y - 8 - leafSize/2 }, // Top left
        { x: x + leafSize/2, y: y - 8 - leafSize/2 }, // Top right
        { x: x - leafSize/2, y: y - 8 + leafSize/2 }, // Bottom left
        { x: x + leafSize/2, y: y - 8 + leafSize/2 }  // Bottom right
      ];
      
      leafPositions.forEach(pos => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, leafSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add leaf veins
        ctx.strokeStyle = '#006400';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y - leafSize/2);
        ctx.lineTo(pos.x, pos.y + leafSize/2);
        ctx.moveTo(pos.x - leafSize/2, pos.y);
        ctx.lineTo(pos.x + leafSize/2, pos.y);
        ctx.stroke();
      });
      
      // Shamrock stem
      ctx.fillStyle = '#228B22';
      ctx.strokeStyle = '#006400';
      ctx.lineWidth = 2;
      ctx.fillRect(x - 2, y - 8 + leafSize, 4, leafSize + 4);
      ctx.strokeRect(x - 2, y - 8 + leafSize, 4, leafSize + 4);
      
      // Add magical sparkles
      const sparklePositions = [
        { x: x - 12, y: y - 20 },
        { x: x + 12, y: y - 18 },
        { x: x - 8, y: y + 12 },
        { x: x + 10, y: y + 14 },
        { x: x, y: y - 25 }
      ];
      
      sparklePositions.forEach((pos, index) => {
        if (index < level) {
          ctx.fillStyle = '#FFD700';
          ctx.strokeStyle = '#FFA500';
          ctx.lineWidth = 1;
          
          // Draw sparkle star
          ctx.save();
          ctx.translate(pos.x, pos.y);
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const radius = i % 2 === 0 ? 3 : 1.5;
            const px = Math.cos(angle) * radius;
            const py = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      });
      
      // Add pot of gold for higher levels
      if (level > 2) {
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#B8860B';
        ctx.lineWidth = 2;
        
        // Pot
        ctx.beginPath();
        ctx.arc(x + 15, y + 8, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Gold coins
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(x + 15 + (i - 1) * 3, y + 8 - 4, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      break;
    }
  }
  
  // Restore context
  ctx.restore();
};

// Enhanced enemy graphics
export const drawEnhancedEnemyIcon = (
  ctx: CanvasRenderingContext2D, 
  type: string, 
  x: number, 
  y: number,
  health: number,
  maxHealth: number
) => {
  const size = type === 'dragon' ? 12 : type === 'troll' ? 10 : 8;
  const healthPercent = health / maxHealth;
  
  ctx.save();
  
  switch (type) {
    case 'goblin': {
      // Enhanced goblin with armor and weapons
      
      // Body with armor
      const bodyGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      bodyGradient.addColorStop(0, '#CD853F');
      bodyGradient.addColorStop(1, '#8B4513');
      
      ctx.fillStyle = bodyGradient;
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Armor details
      ctx.strokeStyle = '#696969';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, size - 2, 0, Math.PI * 2);
      ctx.stroke();
      
      // Glowing red eyes
      ctx.fillStyle = '#FF0000';
      ctx.shadowColor = '#FF0000';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(x - 3, y - 2, 1.5, 0, Math.PI * 2);
      ctx.arc(x + 3, y - 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Horns with detail
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 4, y - 6);
      ctx.lineTo(x - 6, y - 10);
      ctx.moveTo(x + 4, y - 6);
      ctx.lineTo(x + 6, y - 10);
      ctx.stroke();
      
      // Weapon (club)
      ctx.fillStyle = '#8B4513';
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 1;
      ctx.fillRect(x + 8, y - 4, 2, 8);
      ctx.strokeRect(x + 8, y - 4, 2, 8);
      
      // Club head
      ctx.beginPath();
      ctx.arc(x + 9, y - 6, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      break;
    }
    
    case 'banshee': {
      // Enhanced banshee with ethereal effects
      
      // Ghostly body with transparency
      const ghostGradient = ctx.createRadialGradient(x, y - 2, 0, x, y, size + 2);
      ghostGradient.addColorStop(0, 'rgba(230, 230, 250, 0.9)');
      ghostGradient.addColorStop(0.7, 'rgba(147, 112, 219, 0.7)');
      ghostGradient.addColorStop(1, 'rgba(75, 0, 130, 0.5)');
      
      ctx.fillStyle = ghostGradient;
      ctx.strokeStyle = 'rgba(147, 112, 219, 0.8)';
      ctx.lineWidth = 1;
      
      // Main body
      ctx.beginPath();
      ctx.arc(x, y - 2, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Flowing ethereal tail
      ctx.beginPath();
      ctx.moveTo(x - size, y + 2);
      ctx.quadraticCurveTo(x - size/2, y + size + 2, x, y + 2);
      ctx.quadraticCurveTo(x + size/2, y + size + 2, x + size, y + 2);
      ctx.fill();
      ctx.stroke();
      
      // Glowing eyes
      ctx.fillStyle = '#00FFFF';
      ctx.shadowColor = '#00FFFF';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(x - 2, y - 4, 1, 0, Math.PI * 2);
      ctx.arc(x + 2, y - 4, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Ethereal aura
      ctx.strokeStyle = 'rgba(147, 112, 219, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, size + 4, 0, Math.PI * 2);
      ctx.stroke();
      
      break;
    }
    
    case 'troll': {
      // Enhanced troll with detailed features
      
      // Large muscular body
      const trollGradient = ctx.createRadialGradient(x, y, 0, x, y, size + 2);
      trollGradient.addColorStop(0, '#90EE90');
      trollGradient.addColorStop(0.6, '#556B2F');
      trollGradient.addColorStop(1, '#2F4F2F');
      
      ctx.fillStyle = trollGradient;
      ctx.strokeStyle = '#2F4F2F';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, size + 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Muscle definition
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x - 3, y - 1, 3, 0, Math.PI * 2);
      ctx.arc(x + 3, y - 1, 3, 0, Math.PI * 2);
      ctx.stroke();
      
      // Fierce orange eyes
      ctx.fillStyle = '#FF4500';
      ctx.shadowColor = '#FF4500';
      ctx.shadowBlur = 3;
      ctx.beginPath();
      ctx.arc(x - 3, y - 2, 1.5, 0, Math.PI * 2);
      ctx.arc(x + 3, y - 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Large tusks
      ctx.strokeStyle = '#FFFACD';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 2, y + 2);
      ctx.lineTo(x - 4, y + 8);
      ctx.moveTo(x + 2, y + 2);
      ctx.lineTo(x + 4, y + 8);
      ctx.stroke();
      
      // War paint
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 6, y - 4);
      ctx.lineTo(x - 2, y);
      ctx.moveTo(x + 6, y - 4);
      ctx.lineTo(x + 2, y);
      ctx.stroke();
      
      break;
    }
    
    case 'dragon': {
      // Enhanced dragon with detailed scales and fire
      
      // Dragon body with scales
      const dragonGradient = ctx.createRadialGradient(x, y, 0, x, y, size + 3);
      dragonGradient.addColorStop(0, '#FF6347');
      dragonGradient.addColorStop(0.6, '#8B0000');
      dragonGradient.addColorStop(1, '#4B0000');
      
      ctx.fillStyle = dragonGradient;
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x, y, size + 2, size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Scale texture
      ctx.strokeStyle = '#CD5C5C';
      ctx.lineWidth = 1;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          ctx.beginPath();
          ctx.arc(x + i * 4, y + j * 3, 1.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      
      // Detailed wings
      ctx.fillStyle = 'rgba(101, 67, 33, 0.8)';
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 1;
      
      // Left wing
      ctx.beginPath();
      ctx.moveTo(x - size - 2, y - 4);
      ctx.quadraticCurveTo(x - size - 6, y - 8, x - size - 4, y - 2);
      ctx.quadraticCurveTo(x - size - 6, y + 4, x - size - 2, y + 2);
      ctx.fill();
      ctx.stroke();
      
      // Right wing
      ctx.beginPath();
      ctx.moveTo(x + size + 2, y - 4);
      ctx.quadraticCurveTo(x + size + 6, y - 8, x + size + 4, y - 2);
      ctx.quadraticCurveTo(x + size + 6, y + 4, x + size + 2, y + 2);
      ctx.fill();
      ctx.stroke();
      
      // Wing membrane details
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x - size - 4, y - 6);
      ctx.lineTo(x - size - 2, y);
      ctx.lineTo(x - size - 4, y + 2);
      ctx.moveTo(x + size + 4, y - 6);
      ctx.lineTo(x + size + 2, y);
      ctx.lineTo(x + size + 4, y + 2);
      ctx.stroke();
      
      // Golden eyes
      ctx.fillStyle = '#FFD700';
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(x - 2, y - 2, 1.5, 0, Math.PI * 2);
      ctx.arc(x + 2, y - 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Pupil slits
      ctx.fillStyle = '#000000';
      ctx.fillRect(x - 2.5, y - 2, 1, 2);
      ctx.fillRect(x + 1.5, y - 2, 1, 2);
      
      // Fire breath
      const fireGradient = ctx.createLinearGradient(x + size + 2, y, x + size + 8, y);
      fireGradient.addColorStop(0, 'rgba(255, 69, 0, 0.8)');
      fireGradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.6)');
      fireGradient.addColorStop(1, 'rgba(255, 215, 0, 0.3)');
      
      ctx.fillStyle = fireGradient;
      ctx.beginPath();
      ctx.moveTo(x + size + 2, y - 1);
      ctx.lineTo(x + size + 8, y - 3);
      ctx.lineTo(x + size + 10, y);
      ctx.lineTo(x + size + 8, y + 3);
      ctx.lineTo(x + size + 2, y + 1);
      ctx.fill();
      
      // Fire particles
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = `rgba(255, ${69 + i * 40}, 0, ${0.8 - i * 0.2})`;
        ctx.beginPath();
        ctx.arc(x + size + 6 + i * 2, y + (Math.random() - 0.5) * 4, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      
      break;
    }
  }
  
  // Health-based visual effects
  if (healthPercent < 0.3) {
    // Add damage effects for low health
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y, size + 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.restore();
};