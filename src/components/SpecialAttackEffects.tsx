import React, { useEffect, useRef, useCallback } from 'react';
import { SpecialAttackEffect, PeanutParticle, ShirtParticle } from '../utils/specialAttackEffects';

interface SpecialAttackEffectsProps {
  effects: SpecialAttackEffect[];
  onEffectComplete: (effectId: string) => void;
}

export const SpecialAttackEffects: React.FC<SpecialAttackEffectsProps> = ({
  effects,
  onEffectComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  const drawPeanut = (ctx: CanvasRenderingContext2D, particle: PeanutParticle) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    ctx.scale(particle.scale, particle.scale);
    ctx.globalAlpha = particle.alpha;

    // Draw peanut shell (brown oval with texture)
    const gradient = ctx.createRadialGradient(-2, -2, 0, 0, 0, 8);
    gradient.addColorStop(0, '#D2B48C'); // Light tan
    gradient.addColorStop(0.5, '#CD853F'); // Sandy brown
    gradient.addColorStop(1, '#8B4513'); // Saddle brown

    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 1;

    // Peanut shape (figure-8 style)
    ctx.beginPath();
    ctx.ellipse(-3, -2, 4, 3, 0, 0, Math.PI * 2);
    ctx.ellipse(3, 2, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Add peanut texture lines
    ctx.strokeStyle = '#A0522D';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(-6, -1);
    ctx.lineTo(6, 1);
    ctx.moveTo(-5, 1);
    ctx.lineTo(5, -1);
    ctx.stroke();

    // Add highlight for 3D effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(-2, -3, 2, 1, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const drawShirt = (ctx: CanvasRenderingContext2D, particle: ShirtParticle) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    ctx.scale(particle.scale, particle.scale);
    ctx.globalAlpha = particle.alpha;

    // Draw shirt body
    ctx.fillStyle = particle.color;
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1;

    // Shirt body (rectangle with rounded top)
    ctx.beginPath();
    ctx.roundRect(-8, -6, 16, 12, [2, 2, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // Shirt sleeves
    ctx.beginPath();
    ctx.roundRect(-12, -4, 4, 8, 2);
    ctx.roundRect(8, -4, 4, 8, 2);
    ctx.fill();
    ctx.stroke();

    // Shirt collar (V-neck)
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-3, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(3, -6);
    ctx.stroke();

    // Add some wrinkles/tears for "rip" effect
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 1]);
    ctx.beginPath();
    ctx.moveTo(-6, -2);
    ctx.lineTo(-4, 2);
    ctx.moveTo(4, -1);
    ctx.lineTo(6, 3);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
  };

  const updatePeanutParticle = (particle: PeanutParticle, deltaTime: number): boolean => {
    if (!particle.isLanded) {
      // Physics for flying peanuts - faster fall, no bounce
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;
      particle.vy += 600 * deltaTime; // Increased gravity for faster fall
      particle.rotation += particle.rotationSpeed * deltaTime;

      // Apply air resistance to slow horizontal movement
      particle.vx *= 0.98;

      // Check for ground collision (no bounce, just land)
      if (particle.y > 550) { // Ground level
        particle.y = 550;
        particle.isLanded = true;
        particle.landTime = Date.now();
        particle.vy = 0;
        particle.vx = 0;
      }
    } else {
      // Landing phase - fade out immediately
      const timeSinceLand = Date.now() - particle.landTime;
      if (timeSinceLand > 200) { // Wait 200ms before fading
        particle.alpha -= deltaTime * 3; // Fade out quickly over ~0.33 seconds
        if (particle.alpha <= 0) {
          return false; // Remove particle
        }
      }
    }

    return true; // Keep particle
  };

  const updateShirtParticle = (particle: ShirtParticle, deltaTime: number): boolean => {
    // Faster falling motion with minimal floating
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;
    particle.vy += 400 * deltaTime; // Gravity for faster fall
    
    // Apply air resistance to slow horizontal movement
    particle.vx *= 0.95;
    
    // Minimal floating oscillation (much reduced)
    particle.floatPhase += deltaTime * 1;
    particle.y += Math.sin(particle.floatPhase) * 5 * deltaTime;
    
    // Gentle rotation
    particle.rotation += particle.rotationSpeed * deltaTime;
    
    // Check for ground collision
    if (particle.y > 550) {
      particle.y = 550;
      particle.vy = 0;
      particle.vx = 0;
    }
    
    // Fade out over time (faster)
    particle.alpha -= deltaTime * 0.8; // Fade out over ~1.25 seconds
    
    // Scale down slightly as it fades
    particle.scale = Math.max(0.3, particle.scale - deltaTime * 0.3);

    return particle.alpha > 0; // Keep particle while visible
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentTime = Date.now();
    const deltaTime = 1 / 60; // Assume 60 FPS

    // Update and draw all effects
    effects.forEach(effect => {
      const age = currentTime - effect.startTime;

      if (effect.type === 'peanuts') {
        // Update peanut particles
        effect.particles = (effect.particles as PeanutParticle[]).filter(particle => 
          updatePeanutParticle(particle, deltaTime)
        );

        // Draw peanut particles
        effect.particles.forEach(particle => {
          drawPeanut(ctx, particle as PeanutParticle);
        });

        // Remove effect when all particles are gone or after 3 seconds
        if (effect.particles.length === 0 || age > 3000) {
          onEffectComplete(effect.id);
        }

      } else if (effect.type === 'shirt') {
        // Update shirt particles
        effect.particles = (effect.particles as ShirtParticle[]).filter(particle => 
          updateShirtParticle(particle, deltaTime)
        );

        // Draw shirt particles
        effect.particles.forEach(particle => {
          drawShirt(ctx, particle as ShirtParticle);
        });

        // Remove effect when all particles are gone or after 2 seconds
        if (effect.particles.length === 0 || age > 2000) {
          onEffectComplete(effect.id);
        }
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [effects, onEffectComplete]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={600}
      className="absolute inset-0 pointer-events-none z-30"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};