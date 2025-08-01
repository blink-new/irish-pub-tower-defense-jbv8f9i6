import { Position } from '../types/game';

export interface Particle {
  id: string;
  position: Position;
  velocity: Position;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'explosion' | 'gold' | 'magic' | 'hit';
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private lastUpdate = 0;

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  createExplosion(position: Position, color: string = '#FFD700', count: number = 8) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 50 + Math.random() * 100;
      
      this.particles.push({
        id: this.generateId(),
        position: { ...position },
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        },
        life: 1.0,
        maxLife: 1.0,
        size: 3 + Math.random() * 4,
        color,
        type: 'explosion'
      });
    }
  }

  createGoldEffect(position: Position, count: number = 5) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        id: this.generateId(),
        position: { 
          x: position.x + (Math.random() - 0.5) * 20,
          y: position.y + (Math.random() - 0.5) * 20
        },
        velocity: {
          x: (Math.random() - 0.5) * 60,
          y: -50 - Math.random() * 50
        },
        life: 1.5,
        maxLife: 1.5,
        size: 2 + Math.random() * 3,
        color: '#FFD700', // Gold color, not green
        type: 'gold'
      });
    }
  }

  createMagicEffect(position: Position, color: string = '#9370DB') {
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 30 + Math.random() * 40;
      
      this.particles.push({
        id: this.generateId(),
        position: { ...position },
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        },
        life: 0.8,
        maxLife: 0.8,
        size: 2 + Math.random() * 2,
        color, // Uses the provided color parameter
        type: 'magic'
      });
    }
  }

  createHitEffect(position: Position) {
    for (let i = 0; i < 4; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 20 + Math.random() * 30;
      
      this.particles.push({
        id: this.generateId(),
        position: { ...position },
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        },
        life: 0.3,
        maxLife: 0.3,
        size: 1 + Math.random() * 2,
        color: '#FF4444',
        type: 'hit'
      });
    }
  }

  createPeanutEffect(position: Position, radius: number) {
    // Create stunning peanut explosion with area indicator
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const distance = radius * (0.5 + Math.random() * 0.5);
      
      this.particles.push({
        id: this.generateId(),
        position: {
          x: position.x + Math.cos(angle) * distance,
          y: position.y + Math.sin(angle) * distance
        },
        velocity: {
          x: Math.cos(angle) * (40 + Math.random() * 30),
          y: Math.sin(angle) * (40 + Math.random() * 30)
        },
        life: 1.2,
        maxLife: 1.2,
        size: 5 + Math.random() * 4,
        color: '#DEB887',
        type: 'explosion'
      });
    }

    // Add floating peanut shells
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        id: this.generateId(),
        position: {
          x: position.x + (Math.random() - 0.5) * radius * 0.8,
          y: position.y + (Math.random() - 0.5) * radius * 0.8
        },
        velocity: {
          x: (Math.random() - 0.5) * 60,
          y: -30 - Math.random() * 40
        },
        life: 2.0,
        maxLife: 2.0,
        size: 4 + Math.random() * 3,
        color: '#CD853F', // Brown peanut color
        type: 'gold'
      });
    }

    // Add stun wave effect
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      this.particles.push({
        id: this.generateId(),
        position: { ...position },
        velocity: {
          x: Math.cos(angle) * 80,
          y: Math.sin(angle) * 80
        },
        life: 0.8,
        maxLife: 0.8,
        size: 8,
        color: '#FFD700', // Gold stun wave
        type: 'magic'
      });
    }
  }

  createShirtRipEffect(position: Position, radius: number) {
    // Create massive explosive shirt rip effect
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 80 + Math.random() * 100;
      
      this.particles.push({
        id: this.generateId(),
        position: { ...position },
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        },
        life: 1.0,
        maxLife: 1.0,
        size: 4 + Math.random() * 5,
        color: '#FF6B6B',
        type: 'explosion'
      });
    }

    // Add flying fabric pieces
    for (let i = 0; i < 12; i++) {
      this.particles.push({
        id: this.generateId(),
        position: {
          x: position.x + (Math.random() - 0.5) * 60,
          y: position.y + (Math.random() - 0.5) * 60
        },
        velocity: {
          x: (Math.random() - 0.5) * 120,
          y: -50 - Math.random() * 80
        },
        life: 2.5,
        maxLife: 2.5,
        size: 3 + Math.random() * 4,
        color: '#87CEEB',
        type: 'magic'
      });
    }

    // Add damage shockwave
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      this.particles.push({
        id: this.generateId(),
        position: { ...position },
        velocity: {
          x: Math.cos(angle) * 100,
          y: Math.sin(angle) * 100
        },
        life: 0.6,
        maxLife: 0.6,
        size: 10,
        color: '#FF4444',
        type: 'magic'
      });
    }
  }

  update(deltaTime: number) {
    // Temporarily disable all particle updates to debug green clusters
    this.particles = [];
    return;
    
    const dt = deltaTime / 1000; // Convert to seconds
    
    this.particles = this.particles.filter(particle => {
      // Update position
      particle.position.x += particle.velocity.x * dt;
      particle.position.y += particle.velocity.y * dt;
      
      // Apply gravity to certain particle types
      if (particle.type === 'gold' || particle.type === 'explosion') {
        particle.velocity.y += 200 * dt; // Gravity
      }
      
      // Reduce life
      particle.life -= dt;
      
      // Remove dead particles and particles that are off-screen
      return particle.life > 0 && 
             particle.position.x > -50 && particle.position.x < 950 &&
             particle.position.y > -50 && particle.position.y < 650;
    });
    
    // Limit total particle count to prevent performance issues
    if (this.particles.length > 500) {
      this.particles = this.particles.slice(-300); // Keep only the most recent 300 particles
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      
      ctx.save();
      ctx.globalAlpha = alpha;
      
      // Different rendering for different particle types
      switch (particle.type) {
        case 'explosion':
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.position.x, particle.position.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'gold':
          ctx.fillStyle = particle.color;
          ctx.strokeStyle = '#FFA500';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(particle.position.x, particle.position.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
          
        case 'magic':
          ctx.fillStyle = particle.color;
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.arc(particle.position.x, particle.position.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
          
        case 'hit':
          ctx.fillStyle = particle.color;
          ctx.fillRect(
            particle.position.x - particle.size / 2,
            particle.position.y - particle.size / 2,
            particle.size,
            particle.size
          );
          break;
      }
      
      ctx.restore();
    });
  }

  getParticleCount(): number {
    return this.particles.length;
  }

  clear() {
    this.particles = [];
  }
}