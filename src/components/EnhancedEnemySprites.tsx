import React from 'react';

// Enhanced enemy sprites matching Realm Defense's polished visual style
export const drawRealmDefenseEnemySprite = (
  ctx: CanvasRenderingContext2D, 
  type: string, 
  x: number, 
  y: number,
  health: number,
  maxHealth: number
) => {
  const baseSize = type === 'dragon' ? 16 : type === 'troll' ? 14 : 12;
  const healthPercent = health / maxHealth;
  
  // Save context for transformations
  ctx.save();
  
  switch (type) {
    case 'goblin': {
      // Realm Defense style goblin - small, green, with shield and weapon
      
      // Draw shadow first
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(x + 1, y + baseSize + 2, baseSize * 0.8, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Main body with bright, appealing colors
      const bodyGradient = ctx.createRadialGradient(x - 2, y - 2, 0, x, y, baseSize);
      bodyGradient.addColorStop(0, '#7CB342'); // Bright green
      bodyGradient.addColorStop(0.6, '#558B2F'); // Medium green
      bodyGradient.addColorStop(1, '#33691E'); // Dark green outline
      
      ctx.fillStyle = bodyGradient;
      ctx.strokeStyle = '#1B5E20'; // Very dark green outline
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, baseSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Armor chest plate with metallic shine
      const armorGradient = ctx.createLinearGradient(x - 6, y - 2, x + 6, y + 4);
      armorGradient.addColorStop(0, '#90A4AE'); // Light steel
      armorGradient.addColorStop(0.5, '#607D8B'); // Medium steel
      armorGradient.addColorStop(1, '#37474F'); // Dark steel
      
      ctx.fillStyle = armorGradient;
      ctx.strokeStyle = '#263238';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(x, y + 2, 8, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Armor rivets
      ctx.fillStyle = '#B0BEC5';
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(x - 4 + i * 4, y + 2, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Expressive eyes with personality
      ctx.fillStyle = '#FFEB3B'; // Bright yellow eyes
      ctx.strokeStyle = '#F57F17';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x - 3, y - 3, 2, 0, Math.PI * 2);
      ctx.arc(x + 3, y - 3, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Eye pupils with angry expression
      ctx.fillStyle = '#D32F2F'; // Red pupils for menacing look
      ctx.beginPath();
      ctx.arc(x - 3, y - 2, 1, 0, Math.PI * 2);
      ctx.arc(x + 3, y - 2, 1, 0, Math.PI * 2);
      ctx.fill();
      
      // Angry eyebrows
      ctx.strokeStyle = '#2E7D32';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 5, y - 6);
      ctx.lineTo(x - 1, y - 4);
      ctx.moveTo(x + 5, y - 6);
      ctx.lineTo(x + 1, y - 4);
      ctx.stroke();
      
      // Small horns with gradient
      const hornGradient = ctx.createLinearGradient(x - 4, y - 8, x - 4, y - 4);
      hornGradient.addColorStop(0, '#8D6E63'); // Light brown
      hornGradient.addColorStop(1, '#5D4037'); // Dark brown
      
      ctx.fillStyle = hornGradient;
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 1;
      
      // Left horn
      ctx.beginPath();
      ctx.moveTo(x - 4, y - 4);
      ctx.lineTo(x - 6, y - 8);
      ctx.lineTo(x - 2, y - 6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Right horn
      ctx.beginPath();
      ctx.moveTo(x + 4, y - 4);
      ctx.lineTo(x + 6, y - 8);
      ctx.lineTo(x + 2, y - 6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Shield with Celtic design
      const shieldGradient = ctx.createRadialGradient(x - 10, y, 0, x - 10, y, 6);
      shieldGradient.addColorStop(0, '#8BC34A'); // Light green
      shieldGradient.addColorStop(0.7, '#689F38'); // Medium green
      shieldGradient.addColorStop(1, '#33691E'); // Dark green
      
      ctx.fillStyle = shieldGradient;
      ctx.strokeStyle = '#1B5E20';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x - 10, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Shield boss (center decoration)
      ctx.fillStyle = '#FFD54F';
      ctx.strokeStyle = '#FF8F00';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x - 10, y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Weapon (club) with spikes
      const weaponGradient = ctx.createLinearGradient(x + 8, y - 6, x + 12, y + 6);
      weaponGradient.addColorStop(0, '#8D6E63'); // Light brown
      weaponGradient.addColorStop(1, '#5D4037'); // Dark brown
      
      ctx.fillStyle = weaponGradient;
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 2;
      
      // Club handle
      ctx.fillRect(x + 8, y - 2, 3, 10);
      ctx.strokeRect(x + 8, y - 2, 3, 10);
      
      // Club head with spikes
      ctx.beginPath();
      ctx.arc(x + 9.5, y - 6, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Spikes on club
      ctx.fillStyle = '#37474F';
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const spikeX = x + 9.5 + Math.cos(angle) * 3;
        const spikeY = y - 6 + Math.sin(angle) * 3;
        const tipX = x + 9.5 + Math.cos(angle) * 6;
        const tipY = y - 6 + Math.sin(angle) * 6;
        
        ctx.beginPath();
        ctx.moveTo(spikeX, spikeY);
        ctx.lineTo(tipX, tipY);
        ctx.lineTo(spikeX + 1, spikeY + 1);
        ctx.closePath();
        ctx.fill();
      }
      
      break;
    }
    
    case 'banshee': {
      // Simplified banshee - just a purple circle with eyes, no extending elements
      
      // Simple purple body - no gradients or complex effects
      ctx.fillStyle = '#9370DB'; // Medium purple
      ctx.strokeStyle = '#4B0082'; // Dark purple outline
      ctx.lineWidth = 2;
      
      // Just a simple circle
      ctx.beginPath();
      ctx.arc(x, y, baseSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Simple eyes - no glow effects
      ctx.fillStyle = '#00FFFF'; // Cyan eyes
      ctx.beginPath();
      ctx.arc(x - 3, y - 2, 2, 0, Math.PI * 2);
      ctx.arc(x + 3, y - 2, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye pupils
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x - 3, y - 2, 1, 0, Math.PI * 2);
      ctx.arc(x + 3, y - 2, 1, 0, Math.PI * 2);
      ctx.fill();
      
      break;
    }
    
    case 'troll': {
      // Realm Defense style troll - large, muscular, with detailed armor and weapon
      
      // Draw shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(x + 2, y + baseSize + 3, baseSize * 1.2, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Muscular body with bright, appealing colors
      const bodyGradient = ctx.createRadialGradient(x - 3, y - 3, 0, x, y, baseSize + 2);
      bodyGradient.addColorStop(0, '#81C784'); // Light green
      bodyGradient.addColorStop(0.4, '#66BB6A'); // Medium green
      bodyGradient.addColorStop(0.8, '#4CAF50'); // Bright green
      bodyGradient.addColorStop(1, '#2E7D32'); // Dark green outline
      
      ctx.fillStyle = bodyGradient;
      ctx.strokeStyle = '#1B5E20'; // Very dark green outline
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, baseSize + 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Muscle definition with highlights
      ctx.strokeStyle = '#A5D6A7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x - 4, y - 2, 4, 0, Math.PI * 2);
      ctx.arc(x + 4, y - 2, 4, 0, Math.PI * 2);
      ctx.stroke();
      
      // Chest muscles highlight
      ctx.strokeStyle = '#C8E6C9';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - 6, y + 2);
      ctx.quadraticCurveTo(x, y - 1, x + 6, y + 2);
      ctx.stroke();
      
      // Fierce expressive eyes
      ctx.fillStyle = '#FF5722'; // Bright orange-red
      ctx.shadowColor = '#FF5722';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(x - 4, y - 4, 2.5, 0, Math.PI * 2);
      ctx.arc(x + 4, y - 4, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Eye pupils with angry expression
      ctx.fillStyle = '#B71C1C'; // Dark red
      ctx.beginPath();
      ctx.arc(x - 4, y - 3, 1.5, 0, Math.PI * 2);
      ctx.arc(x + 4, y - 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Angry eyebrows
      ctx.strokeStyle = '#2E7D32';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 7, y - 8);
      ctx.lineTo(x - 2, y - 5);
      ctx.moveTo(x + 7, y - 8);
      ctx.lineTo(x + 2, y - 5);
      ctx.stroke();
      
      // Large intimidating tusks
      const tuskGradient = ctx.createLinearGradient(x - 3, y + 2, x - 3, y + 10);
      tuskGradient.addColorStop(0, '#FFF8E1'); // Ivory white
      tuskGradient.addColorStop(1, '#F5F5DC'); // Beige
      
      ctx.fillStyle = tuskGradient;
      ctx.strokeStyle = '#8D6E63';
      ctx.lineWidth = 2;
      
      // Left tusk
      ctx.beginPath();
      ctx.moveTo(x - 3, y + 2);
      ctx.lineTo(x - 5, y + 10);
      ctx.lineTo(x - 1, y + 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Right tusk
      ctx.beginPath();
      ctx.moveTo(x + 3, y + 2);
      ctx.lineTo(x + 5, y + 10);
      ctx.lineTo(x + 1, y + 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // War paint stripes
      ctx.strokeStyle = '#D32F2F'; // Bright red war paint
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 8, y - 6);
      ctx.lineTo(x - 3, y - 1);
      ctx.moveTo(x - 8, y - 3);
      ctx.lineTo(x - 3, y + 2);
      ctx.moveTo(x + 8, y - 6);
      ctx.lineTo(x + 3, y - 1);
      ctx.moveTo(x + 8, y - 3);
      ctx.lineTo(x + 3, y + 2);
      ctx.stroke();
      
      // Spiked shoulder armor
      const armorGradient = ctx.createRadialGradient(x - 8, y - 6, 0, x - 8, y - 6, 4);
      armorGradient.addColorStop(0, '#78909C'); // Light steel
      armorGradient.addColorStop(1, '#455A64'); // Dark steel
      
      ctx.fillStyle = armorGradient;
      ctx.strokeStyle = '#263238';
      ctx.lineWidth = 1;
      
      // Left shoulder armor
      ctx.beginPath();
      ctx.arc(x - 8, y - 6, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Right shoulder armor
      ctx.beginPath();
      ctx.arc(x + 8, y - 6, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Armor spikes
      ctx.fillStyle = '#37474F';
      const spikePositions = [
        { x: x - 8, y: y - 10 },
        { x: x - 10, y: y - 6 },
        { x: x - 6, y: y - 6 },
        { x: x + 8, y: y - 10 },
        { x: x + 10, y: y - 6 },
        { x: x + 6, y: y - 6 }
      ];
      
      spikePositions.forEach(spike => {
        ctx.beginPath();
        ctx.moveTo(spike.x, spike.y);
        ctx.lineTo(spike.x - 1, spike.y + 3);
        ctx.lineTo(spike.x + 1, spike.y + 3);
        ctx.closePath();
        ctx.fill();
      });
      
      // Massive war hammer
      const hammerGradient = ctx.createLinearGradient(x + 12, y - 8, x + 12, y + 8);
      hammerGradient.addColorStop(0, '#8D6E63'); // Light brown handle
      hammerGradient.addColorStop(1, '#5D4037'); // Dark brown handle
      
      ctx.fillStyle = hammerGradient;
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 2;
      
      // Hammer handle
      ctx.fillRect(x + 10, y - 4, 4, 12);
      ctx.strokeRect(x + 10, y - 4, 4, 12);
      
      // Hammer head
      const hammerHeadGradient = ctx.createRadialGradient(x + 12, y - 8, 0, x + 12, y - 8, 6);
      hammerHeadGradient.addColorStop(0, '#90A4AE'); // Light steel
      hammerHeadGradient.addColorStop(1, '#37474F'); // Dark steel
      
      ctx.fillStyle = hammerHeadGradient;
      ctx.strokeStyle = '#263238';
      ctx.lineWidth = 2;
      ctx.fillRect(x + 8, y - 12, 8, 8);
      ctx.strokeRect(x + 8, y - 12, 8, 8);
      
      // Hammer spikes
      ctx.fillStyle = '#37474F';
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x + 9 + i * 2, y - 12);
        ctx.lineTo(x + 8 + i * 2, y - 15);
        ctx.lineTo(x + 10 + i * 2, y - 15);
        ctx.closePath();
        ctx.fill();
      }
      
      break;
    }
    
    case 'dragon': {
      // Realm Defense style dragon - majestic, detailed, with fire effects
      
      // Draw shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(x + 3, y + baseSize + 4, baseSize * 1.5, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Majestic dragon body with rich colors
      const dragonGradient = ctx.createRadialGradient(x - 4, y - 4, 0, x, y, baseSize + 4);
      dragonGradient.addColorStop(0, '#FF7043'); // Bright orange-red
      dragonGradient.addColorStop(0.3, '#FF5722'); // Medium red
      dragonGradient.addColorStop(0.7, '#D84315'); // Dark red
      dragonGradient.addColorStop(1, '#BF360C'); // Very dark red outline
      
      ctx.fillStyle = dragonGradient;
      ctx.strokeStyle = '#8D2F00'; // Dark outline
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(x, y, baseSize + 3, baseSize + 1, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Dragon scale texture with detailed patterns
      ctx.strokeStyle = '#FFAB91';
      ctx.lineWidth = 1;
      for (let row = -1; row <= 1; row++) {
        for (let col = -2; col <= 2; col++) {
          const scaleX = x + col * 3;
          const scaleY = y + row * 3;
          ctx.beginPath();
          ctx.arc(scaleX, scaleY, 1.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      
      // Magnificent detailed wings
      const wingGradient = ctx.createRadialGradient(x - 12, y - 4, 0, x - 12, y - 4, 8);
      wingGradient.addColorStop(0, 'rgba(141, 110, 99, 0.9)'); // Light brown
      wingGradient.addColorStop(0.6, 'rgba(101, 67, 33, 0.8)'); // Medium brown
      wingGradient.addColorStop(1, 'rgba(62, 39, 35, 0.7)'); // Dark brown
      
      ctx.fillStyle = wingGradient;
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 2;
      
      // Left wing - detailed membrane structure
      ctx.beginPath();
      ctx.moveTo(x - baseSize - 2, y - 6);
      ctx.quadraticCurveTo(x - baseSize - 10, y - 12, x - baseSize - 8, y - 4);
      ctx.quadraticCurveTo(x - baseSize - 12, y + 2, x - baseSize - 6, y + 4);
      ctx.quadraticCurveTo(x - baseSize - 4, y + 6, x - baseSize - 2, y + 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Right wing
      ctx.beginPath();
      ctx.moveTo(x + baseSize + 2, y - 6);
      ctx.quadraticCurveTo(x + baseSize + 10, y - 12, x + baseSize + 8, y - 4);
      ctx.quadraticCurveTo(x + baseSize + 12, y + 2, x + baseSize + 6, y + 4);
      ctx.quadraticCurveTo(x + baseSize + 4, y + 6, x + baseSize + 2, y + 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Wing membrane details (bone structure)
      ctx.strokeStyle = '#5D4037';
      ctx.lineWidth = 1;
      
      // Left wing bones
      ctx.beginPath();
      ctx.moveTo(x - baseSize - 2, y - 2);
      ctx.lineTo(x - baseSize - 8, y - 8);
      ctx.moveTo(x - baseSize - 2, y);
      ctx.lineTo(x - baseSize - 10, y - 2);
      ctx.moveTo(x - baseSize - 2, y + 2);
      ctx.lineTo(x - baseSize - 8, y + 4);
      ctx.stroke();
      
      // Right wing bones
      ctx.beginPath();
      ctx.moveTo(x + baseSize + 2, y - 2);
      ctx.lineTo(x + baseSize + 8, y - 8);
      ctx.moveTo(x + baseSize + 2, y);
      ctx.lineTo(x + baseSize + 10, y - 2);
      ctx.moveTo(x + baseSize + 2, y + 2);
      ctx.lineTo(x + baseSize + 8, y + 4);
      ctx.stroke();
      
      // Majestic golden eyes with detailed pupils
      ctx.fillStyle = '#FFD700'; // Bright gold
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(x - 3, y - 3, 3, 0, Math.PI * 2);
      ctx.arc(x + 3, y - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Dragon pupils (vertical slits)
      ctx.fillStyle = '#000000';
      ctx.fillRect(x - 3.5, y - 3, 1, 4);
      ctx.fillRect(x + 2.5, y - 3, 1, 4);
      
      // Eye highlights for life-like appearance
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x - 2, y - 4, 1, 0, Math.PI * 2);
      ctx.arc(x + 4, y - 4, 1, 0, Math.PI * 2);
      ctx.fill();
      
      // Dragon horns with detailed ridges
      const hornGradient = ctx.createLinearGradient(x - 4, y - 8, x - 4, y - 4);
      hornGradient.addColorStop(0, '#8D6E63'); // Light brown
      hornGradient.addColorStop(1, '#3E2723'); // Dark brown
      
      ctx.fillStyle = hornGradient;
      ctx.strokeStyle = '#1B0000';
      ctx.lineWidth = 1;
      
      // Left horn
      ctx.beginPath();
      ctx.moveTo(x - 4, y - 4);
      ctx.lineTo(x - 6, y - 12);
      ctx.lineTo(x - 2, y - 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Right horn
      ctx.beginPath();
      ctx.moveTo(x + 4, y - 4);
      ctx.lineTo(x + 6, y - 12);
      ctx.lineTo(x + 2, y - 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Horn ridges
      ctx.strokeStyle = '#5D4037';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x - 5 + i * 0.5, y - 6 - i);
        ctx.lineTo(x - 3 + i * 0.5, y - 6 - i);
        ctx.moveTo(x + 5 - i * 0.5, y - 6 - i);
        ctx.lineTo(x + 3 - i * 0.5, y - 6 - i);
        ctx.stroke();
      }
      
      // Spectacular fire breath effect
      const fireGradient = ctx.createLinearGradient(x + baseSize + 2, y, x + baseSize + 16, y);
      fireGradient.addColorStop(0, 'rgba(255, 87, 34, 0.9)'); // Bright orange
      fireGradient.addColorStop(0.3, 'rgba(255, 152, 0, 0.8)'); // Orange
      fireGradient.addColorStop(0.6, 'rgba(255, 193, 7, 0.7)'); // Yellow
      fireGradient.addColorStop(1, 'rgba(255, 235, 59, 0.4)'); // Light yellow
      
      ctx.fillStyle = fireGradient;
      ctx.beginPath();
      ctx.moveTo(x + baseSize + 2, y - 2);
      ctx.lineTo(x + baseSize + 14, y - 6);
      ctx.lineTo(x + baseSize + 16, y - 3);
      ctx.lineTo(x + baseSize + 18, y);
      ctx.lineTo(x + baseSize + 16, y + 3);
      ctx.lineTo(x + baseSize + 14, y + 6);
      ctx.lineTo(x + baseSize + 2, y + 2);
      ctx.closePath();
      ctx.fill();
      
      // Fire particles and embers
      const fireColors = ['#FF5722', '#FF9800', '#FFC107', '#FFEB3B'];
      for (let i = 0; i < 8; i++) {
        const particleX = x + baseSize + 8 + Math.random() * 12;
        const particleY = y + (Math.random() - 0.5) * 8;
        const colorIndex = Math.floor(Math.random() * fireColors.length);
        
        ctx.fillStyle = fireColors[colorIndex];
        ctx.shadowColor = fireColors[colorIndex];
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.arc(particleX, particleY, 1 + Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.shadowBlur = 0;
      
      // Dragon spinal ridges
      ctx.fillStyle = '#BF360C';
      ctx.strokeStyle = '#8D2F00';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        const ridgeY = y - 6 + i * 4;
        ctx.beginPath();
        ctx.moveTo(x, ridgeY);
        ctx.lineTo(x - 2, ridgeY - 3);
        ctx.lineTo(x + 2, ridgeY - 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      
      break;
    }
    
    case 'recession': {
      // The Recession boss - towering, lumbering bear inspired by reference images
      
      // Draw larger shadow for towering presence
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.beginPath();
      ctx.ellipse(x + 4, y + baseSize + 10, baseSize * 2.2, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Towering bear body - much larger and more upright
      const bearBodyGradient = ctx.createRadialGradient(x - 6, y - 8, 0, x, y, baseSize + 10);
      bearBodyGradient.addColorStop(0, '#A1887F'); // Light brown
      bearBodyGradient.addColorStop(0.3, '#8D6E63'); // Medium brown
      bearBodyGradient.addColorStop(0.7, '#6D4C41'); // Dark brown
      bearBodyGradient.addColorStop(1, '#3E2723'); // Very dark brown outline
      
      ctx.fillStyle = bearBodyGradient;
      ctx.strokeStyle = '#2E1A0E'; // Very dark brown outline
      ctx.lineWidth = 5;
      ctx.beginPath();
      // More upright, towering oval shape
      ctx.ellipse(x, y - 2, baseSize + 8, baseSize + 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Chest area - lighter brown for depth
      const chestGradient = ctx.createRadialGradient(x, y + 2, 0, x, y + 2, 8);
      chestGradient.addColorStop(0, '#BCAAA4'); // Light tan
      chestGradient.addColorStop(1, '#A1887F'); // Medium tan
      
      ctx.fillStyle = chestGradient;
      ctx.strokeStyle = '#6D4C41';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x, y + 2, 7, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Bear head - larger and more prominent
      const headGradient = ctx.createRadialGradient(x - 2, y - 12, 0, x, y - 8, 10);
      headGradient.addColorStop(0, '#A1887F'); // Light brown
      headGradient.addColorStop(0.5, '#8D6E63'); // Medium brown
      headGradient.addColorStop(1, '#5D4037'); // Dark brown
      
      ctx.fillStyle = headGradient;
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y - 8, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Large bear ears positioned higher
      const earGradient = ctx.createRadialGradient(x - 10, y - 14, 0, x - 10, y - 14, 5);
      earGradient.addColorStop(0, '#BCAAA4');
      earGradient.addColorStop(1, '#6D4C41');
      
      ctx.fillStyle = earGradient;
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 2;
      
      // Left ear - larger
      ctx.beginPath();
      ctx.arc(x - 10, y - 14, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Right ear - larger
      ctx.beginPath();
      ctx.arc(x + 10, y - 14, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Inner ears - pink
      ctx.fillStyle = '#F8BBD9';
      ctx.beginPath();
      ctx.arc(x - 10, y - 14, 2.5, 0, Math.PI * 2);
      ctx.arc(x + 10, y - 14, 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Prominent bear snout
      const snoutGradient = ctx.createRadialGradient(x, y - 4, 0, x, y - 4, 7);
      snoutGradient.addColorStop(0, '#D7CCC8'); // Light tan
      snoutGradient.addColorStop(1, '#A1887F'); // Medium tan
      
      ctx.fillStyle = snoutGradient;
      ctx.strokeStyle = '#5D4037';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x, y - 4, 7, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Large black bear nose
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.ellipse(x, y - 6, 3, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Menacing bear eyes - smaller and more focused
      ctx.fillStyle = '#FFFFFF'; // White eye background
      ctx.beginPath();
      ctx.arc(x - 5, y - 10, 3, 0, Math.PI * 2);
      ctx.arc(x + 5, y - 10, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Dark pupils with angry expression
      ctx.fillStyle = '#1A1A1A';
      ctx.beginPath();
      ctx.arc(x - 5, y - 9, 2, 0, Math.PI * 2);
      ctx.arc(x + 5, y - 9, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Angry eyebrows - thicker and more pronounced
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x - 9, y - 14);
      ctx.lineTo(x - 3, y - 11);
      ctx.moveTo(x + 9, y - 14);
      ctx.lineTo(x + 3, y - 11);
      ctx.stroke();
      
      // Bear mouth - grimacing expression
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y - 2, 4, 0.2, Math.PI - 0.2);
      ctx.stroke();
      
      // Sharp teeth
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 1;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(x + i * 2, y - 2);
        ctx.lineTo(x + i * 2 - 0.5, y + 1);
        ctx.lineTo(x + i * 2 + 0.5, y + 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      
      // Massive stock chart being held - larger and more detailed
      const chartBgGradient = ctx.createLinearGradient(x - 20, y - 8, x - 5, y + 15);
      chartBgGradient.addColorStop(0, '#FFFFFF');
      chartBgGradient.addColorStop(1, '#F8F8F8');
      
      ctx.fillStyle = chartBgGradient;
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 3;
      
      // Larger chart background
      ctx.fillRect(x - 20, y - 8, 15, 20);
      ctx.strokeRect(x - 20, y - 8, 15, 20);
      
      // Chart title
      ctx.fillStyle = '#333333';
      ctx.font = '8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('MARKET', x - 12.5, y - 5);
      
      // Grid lines on chart - more detailed
      ctx.strokeStyle = '#E0E0E0';
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 6; i++) {
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(x - 19, y - 6 + (i * 3));
        ctx.lineTo(x - 6, y - 6 + (i * 3));
        ctx.stroke();
        
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(x - 18 + (i * 2.4), y - 6);
        ctx.lineTo(x - 18 + (i * 2.4), y + 9);
        ctx.stroke();
      }
      
      // Dramatic crashing red stock line
      ctx.strokeStyle = '#D32F2F'; // Bright red
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x - 18, y - 4); // Start high
      ctx.lineTo(x - 16, y - 2); // Small recovery
      ctx.lineTo(x - 14, y + 1);  // Drop
      ctx.lineTo(x - 12, y - 1);  // Brief recovery
      ctx.lineTo(x - 10, y + 3);  // Major crash
      ctx.lineTo(x - 8, y + 7);   // Complete collapse
      ctx.stroke();
      
      // Multiple red arrows pointing down
      ctx.fillStyle = '#D32F2F';
      const arrows = [
        {x: x - 10, y: y + 3},
        {x: x - 8, y: y + 7}
      ];
      
      arrows.forEach(arrow => {
        ctx.beginPath();
        ctx.moveTo(arrow.x, arrow.y);
        ctx.lineTo(arrow.x - 1.5, arrow.y - 2);
        ctx.lineTo(arrow.x + 1.5, arrow.y - 2);
        ctx.closePath();
        ctx.fill();
      });
      
      // Powerful bear arms/paws - more muscular
      const armGradient = ctx.createRadialGradient(x - 15, y + 3, 0, x - 15, y + 3, 5);
      armGradient.addColorStop(0, '#A1887F');
      armGradient.addColorStop(1, '#6D4C41');
      
      ctx.fillStyle = armGradient;
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 3;
      
      // Left arm holding chart
      ctx.beginPath();
      ctx.ellipse(x - 15, y + 3, 4, 8, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Right arm
      ctx.beginPath();
      ctx.ellipse(x + 15, y + 3, 4, 8, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Large paws with detailed claws
      const pawGradient = ctx.createRadialGradient(x - 15, y + 8, 0, x - 15, y + 8, 4);
      pawGradient.addColorStop(0, '#8D6E63');
      pawGradient.addColorStop(1, '#5D4037');
      
      ctx.fillStyle = pawGradient;
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 2;
      
      // Left paw
      ctx.beginPath();
      ctx.arc(x - 15, y + 8, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Right paw
      ctx.beginPath();
      ctx.arc(x + 15, y + 8, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Paw pads
      ctx.fillStyle = '#3E2723';
      ctx.beginPath();
      ctx.arc(x - 15, y + 8, 2, 0, Math.PI * 2);
      ctx.arc(x + 15, y + 8, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Sharp claws - more prominent
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 2;
      for (const paw of [{x: x - 15, y: y + 8}, {x: x + 15, y: y + 8}]) {
        for (let i = 0; i < 4; i++) {
          const angle = (i - 1.5) * 0.5;
          const clawX = paw.x + Math.cos(angle) * 3;
          const clawY = paw.y + Math.sin(angle) * 3;
          ctx.beginPath();
          ctx.moveTo(clawX, clawY);
          ctx.lineTo(clawX + Math.cos(angle) * 3, clawY + Math.sin(angle) * 3);
          ctx.stroke();
        }
      }
      
      // Powerful legs - more visible and sturdy
      const legGradient = ctx.createRadialGradient(x - 8, y + 12, 0, x - 8, y + 12, 6);
      legGradient.addColorStop(0, '#8D6E63');
      legGradient.addColorStop(1, '#5D4037');
      
      ctx.fillStyle = legGradient;
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 3;
      
      // Left leg
      ctx.beginPath();
      ctx.ellipse(x - 8, y + 12, 5, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Right leg
      ctx.beginPath();
      ctx.ellipse(x + 8, y + 12, 5, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Large feet
      ctx.fillStyle = '#5D4037';
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 2;
      
      // Left foot
      ctx.beginPath();
      ctx.ellipse(x - 8, y + 18, 6, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Right foot
      ctx.beginPath();
      ctx.ellipse(x + 8, y + 18, 6, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Boss indicator - larger golden crown
      const crownGradient = ctx.createLinearGradient(x - 8, y - 20, x + 8, y - 16);
      crownGradient.addColorStop(0, '#FFD700'); // Gold
      crownGradient.addColorStop(0.5, '#FFC107'); // Medium gold
      crownGradient.addColorStop(1, '#FF8F00'); // Dark gold
      
      ctx.fillStyle = crownGradient;
      ctx.strokeStyle = '#E65100';
      ctx.lineWidth = 2;
      
      // Crown base - larger
      ctx.fillRect(x - 8, y - 18, 16, 4);
      ctx.strokeRect(x - 8, y - 18, 16, 4);
      
      // Crown spikes - more elaborate
      ctx.beginPath();
      ctx.moveTo(x - 6, y - 18);
      ctx.lineTo(x - 4, y - 22);
      ctx.lineTo(x - 2, y - 18);
      ctx.lineTo(x, y - 24); // Center spike tallest
      ctx.lineTo(x + 2, y - 18);
      ctx.lineTo(x + 4, y - 22);
      ctx.lineTo(x + 6, y - 18);
      ctx.lineTo(x + 8, y - 20);
      ctx.lineTo(x + 8, y - 14);
      ctx.lineTo(x - 8, y - 14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Crown jewels - larger
      ctx.fillStyle = '#E91E63'; // Ruby red
      ctx.beginPath();
      ctx.arc(x, y - 16, 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#2196F3'; // Sapphire blue
      ctx.beginPath();
      ctx.arc(x - 4, y - 16, 1, 0, Math.PI * 2);
      ctx.arc(x + 4, y - 16, 1, 0, Math.PI * 2);
      ctx.fill();
      
      // Lumbering animation effect - enhanced ground shake
      ctx.strokeStyle = 'rgba(101, 67, 33, 0.8)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(x - baseSize - 12 + i * 3, y + baseSize + 12 + i * 2);
        ctx.lineTo(x + baseSize + 12 - i * 3, y + baseSize + 12 + i * 2);
        ctx.stroke();
      }
      
      // Dust clouds from heavy footsteps
      ctx.fillStyle = 'rgba(139, 110, 99, 0.4)';
      for (let i = 0; i < 6; i++) {
        const dustX = x + (Math.random() - 0.5) * 30;
        const dustY = y + baseSize + 8 + Math.random() * 8;
        ctx.beginPath();
        ctx.arc(dustX, dustY, 2 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      break;
    }
  }
  
  // Health-based visual effects with Realm Defense style
  if (healthPercent < 0.5) {
    // Add damage cracks/wounds for low health
    ctx.strokeStyle = 'rgba(183, 28, 28, 0.6)'; // Dark red
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Random damage lines
    for (let i = 0; i < 3; i++) {
      const startX = x + (Math.random() - 0.5) * baseSize;
      const startY = y + (Math.random() - 0.5) * baseSize;
      const endX = startX + (Math.random() - 0.5) * 6;
      const endY = startY + (Math.random() - 0.5) * 6;
      
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
    }
    ctx.stroke();
  }
  
  if (healthPercent < 0.2) {
    // Critical health - add red damage overlay
    ctx.fillStyle = 'rgba(244, 67, 54, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y, baseSize + 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.restore();
};

// Export the enhanced drawing function
export const drawEnhancedEnemyIcon = drawRealmDefenseEnemySprite;