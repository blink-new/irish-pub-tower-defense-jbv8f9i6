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
  const baseSize = 30 + (level - 1) * 3; // Match the placement preview ring size
  
  // Save context for transformations
  ctx.save();
  
  switch (type) {
    case 'paddy-losty': {
      // Simplified Paddy Losty - just his image in a circle without extra gold rim
      
      if (paddyImage && paddyImage.complete && paddyImage.naturalWidth > 0) {
        try {
          // Clip to circular area for image
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, baseSize, 0, Math.PI * 2);
          ctx.clip();
          
          // Draw Paddy's image
          ctx.drawImage(
            paddyImage, 
            x - baseSize, 
            y - baseSize, 
            baseSize * 2, 
            baseSize * 2
          );
          
          ctx.restore();
          
          // Add simple border
          ctx.strokeStyle = '#8B4513';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, baseSize, 0, Math.PI * 2);
          ctx.stroke();
        } catch (error) {
          // If image drawing fails, fall back to the default rendering
          drawFallbackBartender();
        }
      } else {
        drawFallbackBartender();
      }
      
      function drawFallbackBartender() {
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
    
    case 'maureen': {
      // Enhanced Maureen's Kitchen tower - Full Irish Breakfast in Frying Pan
      
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
      
      // Draw large frying pan with much smaller black rim
      const panGradient = ctx.createRadialGradient(x, y - 6, 0, x, y - 6, baseSize + 2);
      panGradient.addColorStop(0, '#3A3A3A');
      panGradient.addColorStop(0.95, '#2C2C2C'); // Much smaller black rim
      panGradient.addColorStop(1, '#1A1A1A');
      
      ctx.fillStyle = panGradient;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y - 6, baseSize + 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Inner pan surface (much larger to reduce black showing)
      const innerPanGradient = ctx.createRadialGradient(x, y - 6, 0, x, y - 6, baseSize + 1);
      innerPanGradient.addColorStop(0, '#4A4A4A');
      innerPanGradient.addColorStop(1, '#3A3A3A');
      
      ctx.fillStyle = innerPanGradient;
      ctx.beginPath();
      ctx.arc(x, y - 6, baseSize + 1, 0, Math.PI * 2);
      ctx.fill();
      
      // Pan handle with wood texture
      const handleGradient = ctx.createLinearGradient(x + baseSize, y - 8, x + baseSize + 14, y - 6);
      handleGradient.addColorStop(0, '#8B4513');
      handleGradient.addColorStop(0.5, '#A0522D');
      handleGradient.addColorStop(1, '#654321');
      
      ctx.fillStyle = handleGradient;
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 2;
      ctx.fillRect(x + baseSize, y - 10, 14, 6);
      ctx.strokeRect(x + baseSize, y - 10, 14, 6);
      
      // Wood grain on handle
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x + baseSize + 2 + i * 3, y - 9);
        ctx.lineTo(x + baseSize + 2 + i * 3, y - 5);
        ctx.stroke();
      }
      
      // Full Irish Breakfast Components
      
      // 1. HUGE Fried Eggs (2 large eggs covering much more area)
      const eggPositions = [
        { x: x - 10, y: y - 8 },
        { x: x + 8, y: y - 12 }
      ];
      
      eggPositions.forEach(eggPos => {
        // Much larger egg white
        const eggWhiteGradient = ctx.createRadialGradient(eggPos.x, eggPos.y, 0, eggPos.x, eggPos.y, 12);
        eggWhiteGradient.addColorStop(0, '#FFFEF7');
        eggWhiteGradient.addColorStop(0.7, '#FFF8DC');
        eggWhiteGradient.addColorStop(1, '#F5F5DC');
        
        ctx.fillStyle = eggWhiteGradient;
        ctx.strokeStyle = '#E6E6FA';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(eggPos.x, eggPos.y, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Much larger egg yolk (runny)
        const yolkGradient = ctx.createRadialGradient(eggPos.x, eggPos.y, 0, eggPos.x, eggPos.y, 6);
        yolkGradient.addColorStop(0, '#FFD700');
        yolkGradient.addColorStop(0.6, '#FFA500');
        yolkGradient.addColorStop(1, '#FF8C00');
        
        ctx.fillStyle = yolkGradient;
        ctx.strokeStyle = '#FF8C00';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(eggPos.x, eggPos.y, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Larger yolk highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(eggPos.x - 1.5, eggPos.y - 1.5, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // 2. MASSIVE Irish Sausages (4 large sausages covering much more area)
      const sausagePositions = [
        { x: x - 15, y: y + 2, rotation: 0.3 },
        { x: x - 5, y: y + 8, rotation: -0.2 },
        { x: x + 6, y: y + 4, rotation: 0.4 },
        { x: x + 12, y: y + 10, rotation: -0.1 }
      ];
      
      sausagePositions.forEach(pos => {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(pos.rotation);
        
        // Much larger sausage gradient
        const sausageGradient = ctx.createLinearGradient(-10, -3, 10, 3);
        sausageGradient.addColorStop(0, '#8B4513');
        sausageGradient.addColorStop(0.5, '#A0522D');
        sausageGradient.addColorStop(1, '#654321');
        
        ctx.fillStyle = sausageGradient;
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 4, 0, 0, Math.PI * 2); // Much larger sausages
        ctx.fill();
        ctx.stroke();
        
        // Sausage texture and grill marks
        ctx.strokeStyle = '#4A2C17';
        ctx.lineWidth = 0.5;
        for (let i = -8; i <= 8; i += 2) {
          ctx.beginPath();
          ctx.moveTo(i, -3);
          ctx.lineTo(i, 3);
          ctx.stroke();
        }
        
        ctx.restore();
      });
      
      // 3. LARGE Bacon Rashers (3 big strips covering more area)
      const baconPositions = [
        { x: x + 12, y: y - 2, rotation: 0.1 },
        { x: x + 10, y: y + 6, rotation: -0.1 },
        { x: x - 8, y: y + 12, rotation: 0.2 }
      ];
      
      baconPositions.forEach(pos => {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(pos.rotation);
        
        // Much larger bacon gradient
        const baconGradient = ctx.createLinearGradient(-9, -2.5, 9, 2.5);
        baconGradient.addColorStop(0, '#CD853F');
        baconGradient.addColorStop(0.3, '#D2691E');
        baconGradient.addColorStop(0.7, '#A0522D');
        baconGradient.addColorStop(1, '#8B4513');
        
        ctx.fillStyle = baconGradient;
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, 9, 2.5, 0, 0, Math.PI * 2); // Much larger bacon
        ctx.fill();
        ctx.stroke();
        
        // Bacon fat streaks (white marbling)
        ctx.strokeStyle = '#F5F5DC';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(6, 0);
        ctx.moveTo(-5, -1);
        ctx.lineTo(5, 1);
        ctx.moveTo(-4, 1);
        ctx.lineTo(4, -1);
        ctx.stroke();
        
        ctx.restore();
      });
      
      // 4. LARGE Black Pudding (3 big slices)
      const blackPuddingPositions = [
        { x: x - 8, y: y + 14 },
        { x: x + 4, y: y + 16 },
        { x: x - 2, y: y + 18 }
      ];
      
      blackPuddingPositions.forEach(pos => {
        // Much larger black pudding (dark with speckles)
        ctx.fillStyle = '#2F1B14';
        ctx.strokeStyle = '#1A0F0A';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2); // Much larger black pudding
        ctx.fill();
        ctx.stroke();
        
        // More white speckles in black pudding
        ctx.fillStyle = '#F5F5DC';
        for (let i = 0; i < 8; i++) {
          const speckleX = pos.x + (Math.random() - 0.5) * 8;
          const speckleY = pos.y + (Math.random() - 0.5) * 8;
          ctx.beginPath();
          ctx.arc(speckleX, speckleY, 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // 5. LARGE Baked Beans (big cluster covering more area)
      const beansX = x - 12;
      const beansY = y + 10;
      
      // Much larger beans sauce base
      ctx.fillStyle = '#CD853F';
      ctx.beginPath();
      ctx.ellipse(beansX, beansY, 10, 7, 0, 0, Math.PI * 2); // Much larger sauce base
      ctx.fill();
      
      // Many more individual beans
      const beanPositions = [
        { x: beansX - 6, y: beansY - 3 },
        { x: beansX - 3, y: beansY - 1 },
        { x: beansX - 1, y: beansY + 2 },
        { x: beansX + 2, y: beansY - 3 },
        { x: beansX + 5, y: beansY },
        { x: beansX, y: beansY + 4 },
        { x: beansX - 4, y: beansY + 3 },
        { x: beansX + 3, y: beansY + 3 },
        { x: beansX - 7, y: beansY + 1 },
        { x: beansX + 6, y: beansY - 2 }
      ];
      
      beanPositions.forEach(bean => {
        ctx.fillStyle = '#8B4513';
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(bean.x, bean.y, 2.5, 1.5, 0, 0, Math.PI * 2); // Larger individual beans
        ctx.fill();
        ctx.stroke();
      });
      
      // 6. LARGE Grilled Tomato (big half covering more area)
      const tomatoX = x + 15;
      const tomatoY = y + 12;
      
      // Much larger tomato half
      const tomatoGradient = ctx.createRadialGradient(tomatoX, tomatoY, 0, tomatoX, tomatoY, 7);
      tomatoGradient.addColorStop(0, '#FF6347');
      tomatoGradient.addColorStop(0.7, '#DC143C');
      tomatoGradient.addColorStop(1, '#B22222');
      
      ctx.fillStyle = tomatoGradient;
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(tomatoX, tomatoY, 6.5, 0, Math.PI * 2); // Much larger tomato
      ctx.fill();
      ctx.stroke();
      
      // More tomato seeds
      ctx.fillStyle = '#FFFACD';
      const seedPositions = [
        { x: tomatoX - 2, y: tomatoY - 1 },
        { x: tomatoX + 2, y: tomatoY - 2 },
        { x: tomatoX, y: tomatoY + 2 },
        { x: tomatoX - 1, y: tomatoY + 1 },
        { x: tomatoX + 1, y: tomatoY },
        { x: tomatoX - 3, y: tomatoY + 1 }
      ];
      
      seedPositions.forEach(seed => {
        ctx.beginPath();
        ctx.arc(seed.x, seed.y, 0.8, 0, Math.PI * 2); // Larger seeds
        ctx.fill();
      });
      
      // Add cooking steam/smoke
      if (level > 1) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(x - 6 + i * 4, y - 25 - i * 2, 2 + i * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Level indicators (cooking flames)
      if (level > 1) {
        for (let i = 0; i < level - 1; i++) {
          // Flame gradient
          const flameGradient = ctx.createRadialGradient(x - 15 + i * 8, y + 18, 0, x - 15 + i * 8, y + 18, 4);
          flameGradient.addColorStop(0, '#FFD700');
          flameGradient.addColorStop(0.5, '#FF4500');
          flameGradient.addColorStop(1, '#8B0000');
          
          ctx.fillStyle = flameGradient;
          ctx.beginPath();
          ctx.ellipse(x - 15 + i * 8, y + 18, 3, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      break;
    }
    
    case 'fiddler': {
      // AUTHENTIC GUINNESS PINT - Using Real Image
      
      // Create image element if not already created
      if (!ctx.canvas.guinnessImage) {
        const img = new Image();
        img.src = '/GuinnessPint.png';
        ctx.canvas.guinnessImage = img;
      }
      
      const guinnessImage = ctx.canvas.guinnessImage;
      
      // Shadow beneath glass
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(x, y + baseSize + 5, baseSize/2, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw the Guinness pint image if loaded
      if (guinnessImage && guinnessImage.complete && guinnessImage.naturalWidth > 0) {
        try {
          // Calculate proper aspect ratio to avoid distortion
          const imageAspectRatio = guinnessImage.naturalWidth / guinnessImage.naturalHeight;
          
          // Size the image to fit within baseSize * 1.8 while maintaining aspect ratio
          let imageWidth, imageHeight;
          const maxSize = baseSize * 1.8; // Slightly smaller for better fit
          
          if (imageAspectRatio > 1) {
            // Image is wider than tall
            imageWidth = maxSize;
            imageHeight = maxSize / imageAspectRatio;
          } else {
            // Image is taller than wide (typical for Guinness pint)
            imageHeight = maxSize;
            imageWidth = maxSize * imageAspectRatio;
          }
          
          // Center the image properly
          const imageX = x - imageWidth/2;
          const imageY = y - imageHeight/2;
          
          // Enable high-quality image rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          // Draw the Guinness pint image with proper proportions
          ctx.drawImage(
            guinnessImage,
            imageX,
            imageY,
            imageWidth,
            imageHeight
          );
          
        } catch (error) {
          console.error('Error drawing Guinness image:', error);
          // Fall back to simple representation
          drawFallbackGuinness();
        }
      } else {
        // Fall back to simple representation while image loads
        drawFallbackGuinness();
      }
      
      function drawFallbackGuinness() {
        // Simple fallback - black circle with white top
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, baseSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // White foam head
        ctx.fillStyle = '#F5F5DC';
        ctx.beginPath();
        ctx.arc(x, y - baseSize/3, baseSize * 0.8, 0, Math.PI);
        ctx.fill();
        
        // "G" for Guinness
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${baseSize/2}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('G', x, y + baseSize/4);
      }
      
      // Level indicators - mini Guinness pints
      if (level > 1) {
        for (let i = 0; i < level - 1; i++) {
          const miniX = x - 15 + i * 8;
          const miniY = y + baseSize + 12;
          const miniSize = 3;
          
          // Mini Guinness image or fallback
          if (guinnessImage && guinnessImage.complete && guinnessImage.naturalWidth > 0) {
            try {
              // Calculate proper aspect ratio for mini pint
              const imageAspectRatio = guinnessImage.naturalWidth / guinnessImage.naturalHeight;
              
              let miniWidth, miniHeight;
              const maxMiniSize = miniSize * 1.8; // Consistent with main image sizing
              
              if (imageAspectRatio > 1) {
                miniWidth = maxMiniSize;
                miniHeight = maxMiniSize / imageAspectRatio;
              } else {
                miniHeight = maxMiniSize;
                miniWidth = maxMiniSize * imageAspectRatio;
              }
              
              // Center the mini image properly
              ctx.drawImage(
                guinnessImage,
                miniX - miniWidth/2,
                miniY - miniHeight/2,
                miniWidth,
                miniHeight
              );
            } catch (error) {
              // Mini fallback
              ctx.fillStyle = '#000000';
              ctx.beginPath();
              ctx.arc(miniX, miniY, miniSize, 0, Math.PI * 2);
              ctx.fill();
              
              ctx.fillStyle = '#F5F5DC';
              ctx.beginPath();
              ctx.arc(miniX, miniY - miniSize/2, miniSize * 0.7, 0, Math.PI);
              ctx.fill();
            }
          } else {
            // Mini fallback
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(miniX, miniY, miniSize, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#F5F5DC';
            ctx.beginPath();
            ctx.arc(miniX, miniY - miniSize/2, miniSize * 0.7, 0, Math.PI);
            ctx.fill();
          }
        }
      }
      
      break;
    }
    
    case 'leprechaun': {
      // John B Keane's Cartoon-Style Whiskey Glass with Ice Cubes
      
      // Draw shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(x + 1, y + baseSize/2 + 2, baseSize/2 + 2, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw cartoon-style whiskey glass (simple tumbler shape)
      const glassWidth = baseSize * 0.8;
      const glassHeight = baseSize * 1.2;
      
      // Glass outline (bold black border like cartoon style)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Very subtle glass tint
      ctx.strokeStyle = '#000000'; // Bold black outline
      ctx.lineWidth = 3;
      
      // Simple rectangular glass with slightly rounded bottom
      ctx.beginPath();
      ctx.moveTo(x - glassWidth/2, y - glassHeight/2);
      ctx.lineTo(x + glassWidth/2, y - glassHeight/2);
      ctx.lineTo(x + glassWidth/2, y + glassHeight/2 - 4);
      ctx.quadraticCurveTo(x + glassWidth/2, y + glassHeight/2, x + glassWidth/2 - 4, y + glassHeight/2);
      ctx.lineTo(x - glassWidth/2 + 4, y + glassHeight/2);
      ctx.quadraticCurveTo(x - glassWidth/2, y + glassHeight/2, x - glassWidth/2, y + glassHeight/2 - 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw amber whiskey (cartoon style with simple gradient)
      const whiskeyLevel = y + glassHeight/2 - 6; // Leave space at bottom
      const whiskeyTop = y - glassHeight/4; // Fill about 3/4 of glass
      
      const whiskeyGradient = ctx.createLinearGradient(x, whiskeyTop, x, whiskeyLevel);
      whiskeyGradient.addColorStop(0, '#DAA520'); // Golden
      whiskeyGradient.addColorStop(0.5, '#B8860B'); // Dark golden
      whiskeyGradient.addColorStop(1, '#8B4513'); // Darker amber
      
      ctx.fillStyle = whiskeyGradient;
      ctx.strokeStyle = '#654321'; // Dark outline for whiskey
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(x - glassWidth/2 + 3, whiskeyTop);
      ctx.lineTo(x + glassWidth/2 - 3, whiskeyTop);
      ctx.lineTo(x + glassWidth/2 - 3, whiskeyLevel - 4);
      ctx.quadraticCurveTo(x + glassWidth/2 - 3, whiskeyLevel, x + glassWidth/2 - 7, whiskeyLevel);
      ctx.lineTo(x - glassWidth/2 + 7, whiskeyLevel);
      ctx.quadraticCurveTo(x - glassWidth/2 + 3, whiskeyLevel, x - glassWidth/2 + 3, whiskeyLevel - 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw ice cubes (cartoon style with bold outlines)
      const iceCubes = [
        { x: x - 6, y: y + 2, size: 5, rotation: 0.2 },
        { x: x + 4, y: y - 2, size: 4, rotation: -0.3 },
        { x: x - 2, y: y + 6, size: 4.5, rotation: 0.1 }
      ];
      
      iceCubes.forEach(ice => {
        ctx.save();
        ctx.translate(ice.x, ice.y);
        ctx.rotate(ice.rotation);
        
        // Ice cube gradient (clear to slightly blue-white)
        const iceGradient = ctx.createLinearGradient(-ice.size/2, -ice.size/2, ice.size/2, ice.size/2);
        iceGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        iceGradient.addColorStop(0.5, 'rgba(230, 240, 255, 0.8)');
        iceGradient.addColorStop(1, 'rgba(200, 220, 255, 0.7)');
        
        ctx.fillStyle = iceGradient;
        ctx.strokeStyle = '#000000'; // Bold black outline
        ctx.lineWidth = 2;
        
        // Draw ice cube as rounded square
        ctx.beginPath();
        ctx.roundRect(-ice.size/2, -ice.size/2, ice.size, ice.size, 1);
        ctx.fill();
        ctx.stroke();
        
        // Add ice cube highlight (cartoon style)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-ice.size/2 + 1, -ice.size/2 + 1, ice.size/3, ice.size/3, 0.5);
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
      });
      
      // Glass rim highlight (simple white line)
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(x - glassWidth/2, y - glassHeight/2);
      ctx.lineTo(x + glassWidth/2, y - glassHeight/2);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
      
      // Level indicators (whiskey drops around the glass)
      if (level > 1) {
        for (let i = 0; i < level - 1; i++) {
          const dropX = x - 15 + i * 8;
          const dropY = y + baseSize/2 + 8;
          
          // Whiskey drop with cartoon style
          ctx.fillStyle = '#DAA520';
          ctx.strokeStyle = '#8B4513';
          ctx.lineWidth = 2;
          
          ctx.beginPath();
          ctx.arc(dropX, dropY, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          
          // Drop highlight
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(dropX - 1, dropY - 1, 1, 0, Math.PI * 2);
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