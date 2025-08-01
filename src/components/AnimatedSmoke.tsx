import React, { useEffect, useRef } from 'react';

interface SmokeParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
  age: number;
  maxAge: number;
  baseX: number; // Original X position for gentle swaying
  swayOffset: number; // How much it sways
  swaySpeed: number; // Speed of swaying motion
}

interface AnimatedSmokeProps {
  ctx: CanvasRenderingContext2D;
  chimneyX: number;
  chimneyY: number;
  isActive: boolean;
}

export class AnimatedSmokeSystem {
  private particles: SmokeParticle[] = [];
  private lastTime = 0;
  private spawnTimer = 0;
  public spawnRate = 800; // Much slower spawn rate (800ms between particles)
  public maxParticles = 6; // Limit total particles for subtlety

  constructor(
    private ctx: CanvasRenderingContext2D,
    private chimneyX: number,
    private chimneyY: number
  ) {}

  update(currentTime: number) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Spawn new particles only if we haven't reached the limit
    this.spawnTimer += deltaTime;
    if (this.spawnTimer >= this.spawnRate && this.particles.length < this.maxParticles) {
      this.spawnParticle();
      this.spawnTimer = 0;
    }

    // Update existing particles
    this.particles.forEach(particle => {
      // Age the particle
      particle.age += deltaTime;
      
      // Gentle upward movement that slows down over time
      const ageRatio = particle.age / particle.maxAge;
      const speedMultiplier = Math.max(0.2, 1 - ageRatio * 0.8); // Slows down as it ages
      
      particle.y += particle.velocityY * speedMultiplier * (deltaTime / 16);
      
      // Gentle swaying motion (billowing effect)
      const swayAmount = Math.sin(currentTime * particle.swaySpeed + particle.age * 0.001) * particle.swayOffset;
      particle.x = particle.baseX + swayAmount;
      
      // Very subtle horizontal drift
      particle.baseX += particle.velocityX * 0.3 * (deltaTime / 16);
      
      // Gradual size increase (smoke expands as it rises)
      particle.size = 4 + ageRatio * 8; // Grows from 4px to 12px
      
      // Gentle fade out
      particle.opacity = Math.max(0, 0.4 * (1 - ageRatio * ageRatio)); // Quadratic fade for smoother transition
    });

    // Remove old particles
    this.particles = this.particles.filter(particle => particle.age < particle.maxAge);
  }

  private spawnParticle() {
    const particle: SmokeParticle = {
      x: this.chimneyX,
      y: this.chimneyY - 5, // Start slightly above chimney
      size: 4, // Start small
      opacity: 0.3 + Math.random() * 0.1, // Very subtle opacity
      velocityX: (Math.random() - 0.5) * 0.2, // Very gentle horizontal drift
      velocityY: -0.8 - Math.random() * 0.3, // Gentle upward movement
      age: 0,
      maxAge: 8000 + Math.random() * 4000, // 8-12 seconds lifespan (longer for gentle effect)
      baseX: this.chimneyX + (Math.random() - 0.5) * 2, // Small initial offset
      swayOffset: 3 + Math.random() * 4, // How much it sways (3-7 pixels)
      swaySpeed: 0.0008 + Math.random() * 0.0004 // Very slow swaying (0.0008-0.0012)
    };
    
    this.particles.push(particle);
  }

  draw() {
    this.particles.forEach(particle => {
      this.ctx.save();
      
      // Set up particle rendering with very low opacity
      this.ctx.globalAlpha = particle.opacity;
      
      // Create soft, realistic smoke gradient
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      gradient.addColorStop(0, 'rgba(240, 240, 240, 0.6)'); // Very light center
      gradient.addColorStop(0.3, 'rgba(220, 220, 220, 0.4)'); // Light gray
      gradient.addColorStop(0.6, 'rgba(200, 200, 200, 0.2)'); // Medium gray
      gradient.addColorStop(1, 'rgba(180, 180, 180, 0)'); // Transparent edge
      
      this.ctx.fillStyle = gradient;
      
      // Draw soft, round smoke puff
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Add very subtle inner highlight for depth
      this.ctx.globalAlpha = particle.opacity * 0.2;
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      this.ctx.beginPath();
      this.ctx.arc(
        particle.x - particle.size * 0.3, 
        particle.y - particle.size * 0.3, 
        particle.size * 0.3, 
        0, 
        Math.PI * 2
      );
      this.ctx.fill();
      
      this.ctx.restore();
    });
  }

  // Update chimney position if needed
  updatePosition(x: number, y: number) {
    this.chimneyX = x;
    this.chimneyY = y;
  }

  // Clear all particles (useful for cleanup)
  clear() {
    this.particles = [];
  }
}

// Hook for using animated smoke in React components
export const useAnimatedSmoke = (
  ctx: CanvasRenderingContext2D | null,
  chimneyX: number,
  chimneyY: number,
  isActive: boolean = true
) => {
  const smokeSystemRef = useRef<AnimatedSmokeSystem | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!ctx) return;

    // Create smoke system
    smokeSystemRef.current = new AnimatedSmokeSystem(ctx, chimneyX, chimneyY);

    // Animation loop
    const animate = (currentTime: number) => {
      if (smokeSystemRef.current && isActive) {
        smokeSystemRef.current.update(currentTime);
        smokeSystemRef.current.draw();
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (smokeSystemRef.current) {
        smokeSystemRef.current.clear();
      }
    };
  }, [ctx, chimneyX, chimneyY, isActive]);

  // Update position if chimney moves
  useEffect(() => {
    if (smokeSystemRef.current) {
      smokeSystemRef.current.updatePosition(chimneyX, chimneyY);
    }
  }, [chimneyX, chimneyY]);

  return smokeSystemRef.current;
};