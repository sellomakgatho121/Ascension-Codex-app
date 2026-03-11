/**
 * Advanced Animation System
 * Based on awesome animation patterns and modern CSS/JS animation best practices
 */

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  iterations?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface SpiritualAnimationConfig extends AnimationConfig {
  energyLevel: number;
  chakraResonance: number;
  spiritualFrequency: number;
  consciousnessLevel: number;
}

export interface ParticleSystemConfig {
  count: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
  lifeSpan: number;
  gravity: number;
  turbulence: number;
}

export interface SacredGeometryConfig {
  sides: number;
  radius: number;
  rotation: number;
  scale: number;
  color: string;
  strokeWidth: number;
  opacity: number;
}

class AdvancedAnimationSystem {
  private animations: Map<string, Animation> = new Map();
  private particleSystems: Map<string, ParticleSystem> = new Map();
  private sacredGeometries: Map<string, SacredGeometry> = new Map();

  // Spiritual Energy Animations
  createEnergyFlowAnimation(element: HTMLElement, config: SpiritualAnimationConfig): void {
    const keyframes = [
      { 
        transform: 'scale(1) rotate(0deg)', 
        filter: 'brightness(1) saturate(1)',
        boxShadow: '0 0 20px rgba(138, 43, 226, 0.3)'
      },
      { 
        transform: `scale(${1 + config.energyLevel / 100}) rotate(360deg)`, 
        filter: 'brightness(1.5) saturate(1.5)',
        boxShadow: '0 0 40px rgba(138, 43, 226, 0.8)'
      },
      { 
        transform: 'scale(1) rotate(720deg)', 
        filter: 'brightness(1) saturate(1)',
        boxShadow: '0 0 20px rgba(138, 43, 226, 0.3)'
      }
    ];

    const animation = element.animate(keyframes, {
      duration: config.duration,
      easing: config.easing,
      delay: config.delay,
      iterations: config.iterations,
      direction: config.direction,
      fillMode: config.fillMode
    });

    this.animations.set(`energy-flow-${Date.now()}`, animation);
  }

  // Chakra Activation Animation
  createChakraActivationAnimation(element: HTMLElement, chakraNumber: number): void {
    const chakraColors = [
      '#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8000ff'
    ];

    const color = chakraColors[chakraNumber - 1] || '#8000ff';
    
    const keyframes = [
      { 
        transform: 'scale(0.8)',
        opacity: 0.3,
        filter: `hue-rotate(0deg) brightness(0.5)`
      },
      { 
        transform: 'scale(1.2)',
        opacity: 1,
        filter: `hue-rotate(180deg) brightness(2)`
      },
      { 
        transform: 'scale(1)',
        opacity: 0.8,
        filter: `hue-rotate(360deg) brightness(1)`
      }
    ];

    const animation = element.animate(keyframes, {
      duration: 2000,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      iterations: 1,
      fillMode: 'forwards'
    });

    // Add pulsing effect
    const pulseAnimation = element.animate([
      { boxShadow: `0 0 0px ${color}` },
      { boxShadow: `0 0 30px ${color}` },
      { boxShadow: `0 0 0px ${color}` }
    ], {
      duration: 1000,
      iterations: 3,
      delay: 500
    });

    this.animations.set(`chakra-${chakraNumber}-${Date.now()}`, animation);
  }

  // Consciousness Expansion Animation
  createConsciousnessExpansionAnimation(element: HTMLElement, level: number): void {
    const expansionFactor = 1 + (level * 0.1);
    
    const keyframes = [
      { 
        transform: 'scale(1)',
        borderRadius: '50%',
        filter: 'blur(0px)'
      },
      { 
        transform: `scale(${expansionFactor})`,
        borderRadius: '0%',
        filter: 'blur(2px)'
      },
      { 
        transform: 'scale(1)',
        borderRadius: '50%',
        filter: 'blur(0px)'
      }
    ];

    const animation = element.animate(keyframes, {
      duration: 3000,
      easing: 'ease-in-out',
      iterations: 1,
      fillMode: 'forwards'
    });

    this.animations.set(`consciousness-${Date.now()}`, animation);
  }

  // Sacred Geometry Animation
  createSacredGeometryAnimation(element: HTMLElement, config: SacredGeometryConfig): void {
    const geometry = new SacredGeometry(config);
    this.sacredGeometries.set(`geometry-${Date.now()}`, geometry);
    
    geometry.animate(element);
  }

  // Particle System for Spiritual Energy
  createParticleSystem(container: HTMLElement, config: ParticleSystemConfig): void {
    const particleSystem = new ParticleSystem(config);
    this.particleSystems.set(`particles-${Date.now()}`, particleSystem);
    
    particleSystem.attachTo(container);
  }

  // Meditation Breathing Animation
  createBreathingAnimation(element: HTMLElement, duration: number = 4000): void {
    const keyframes = [
      { 
        transform: 'scale(1)',
        opacity: 0.7
      },
      { 
        transform: 'scale(1.1)',
        opacity: 1
      },
      { 
        transform: 'scale(1)',
        opacity: 0.7
      }
    ];

    const animation = element.animate(keyframes, {
      duration: duration,
      easing: 'ease-in-out',
      iterations: 'infinite',
      direction: 'alternate'
    });

    this.animations.set(`breathing-${Date.now()}`, animation);
  }

  // Energy Field Visualization
  createEnergyFieldAnimation(element: HTMLElement, intensity: number): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';

    element.appendChild(canvas);

    const animate = () => {
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create energy field effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      
      gradient.addColorStop(0, `rgba(138, 43, 226, ${intensity * 0.8})`);
      gradient.addColorStop(0.5, `rgba(75, 0, 130, ${intensity * 0.4})`);
      gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      requestAnimationFrame(animate);
    };

    animate();
  }

  // Spiritual Resonance Wave Animation
  createResonanceWaveAnimation(element: HTMLElement, frequency: number): void {
    const keyframes = [
      { 
        transform: 'scale(1)',
        filter: 'hue-rotate(0deg) brightness(1)'
      },
      { 
        transform: `scale(${1 + frequency / 1000})`,
        filter: `hue-rotate(${frequency / 10}deg) brightness(${1 + frequency / 500})`
      },
      { 
        transform: 'scale(1)',
        filter: 'hue-rotate(0deg) brightness(1)'
      }
    ];

    const animation = element.animate(keyframes, {
      duration: 1000 / (frequency / 100), // Frequency-based duration
      easing: 'ease-in-out',
      iterations: 'infinite',
      direction: 'alternate'
    });

    this.animations.set(`resonance-${Date.now()}`, animation);
  }

  // Cleanup method
  cleanup(): void {
    this.animations.forEach(animation => animation.cancel());
    this.particleSystems.forEach(system => system.destroy());
    this.sacredGeometries.forEach(geometry => geometry.destroy());
    
    this.animations.clear();
    this.particleSystems.clear();
    this.sacredGeometries.clear();
  }
}

class ParticleSystem {
  private config: ParticleSystemConfig;
  private particles: Particle[] = [];
  private container: HTMLElement | null = null;
  private animationId: number | null = null;

  constructor(config: ParticleSystemConfig) {
    this.config = config;
    this.createParticles();
  }

  private createParticles(): void {
    for (let i = 0; i < this.config.count; i++) {
      this.particles.push(new Particle(this.config));
    }
  }

  attachTo(container: HTMLElement): void {
    this.container = container;
    this.startAnimation();
  }

  private startAnimation(): void {
    if (!this.container) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10';

    this.container.appendChild(canvas);

    const animate = () => {
      canvas.width = this.container!.offsetWidth;
      canvas.height = this.container!.offsetHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      this.particles.forEach(particle => {
        particle.update();
        particle.draw(ctx, canvas.width, canvas.height);
      });
      
      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.container) {
      const canvas = this.container.querySelector('canvas');
      if (canvas) {
        canvas.remove();
      }
    }
  }
}

class Particle {
  private config: ParticleSystemConfig;
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private life: number;
  private maxLife: number;

  constructor(config: ParticleSystemConfig) {
    this.config = config;
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;
    this.vx = (Math.random() - 0.5) * config.speed;
    this.vy = (Math.random() - 0.5) * config.speed;
    this.life = config.lifeSpan;
    this.maxLife = config.lifeSpan;
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.config.gravity;
    this.life--;
    
    if (this.life <= 0) {
      this.reset();
    }
  }

  draw(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const alpha = this.life / this.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha * this.config.opacity;
    ctx.fillStyle = this.config.color;
    ctx.beginPath();
    ctx.arc(
      (this.x / 100) * width, 
      (this.y / 100) * height, 
      this.config.size, 
      0, 
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();
  }

  private reset(): void {
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;
    this.vx = (Math.random() - 0.5) * this.config.speed;
    this.vy = (Math.random() - 0.5) * this.config.speed;
    this.life = this.config.lifeSpan;
  }
}

class SacredGeometry {
  private config: SacredGeometryConfig;
  private animationId: number | null = null;

  constructor(config: SacredGeometryConfig) {
    this.config = config;
  }

  animate(element: HTMLElement): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '5';

    element.appendChild(canvas);

    let rotation = 0;
    let scale = 1;

    const animate = () => {
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * this.config.radius / 2;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      
      ctx.strokeStyle = this.config.color;
      ctx.lineWidth = this.config.strokeWidth;
      ctx.globalAlpha = this.config.opacity;
      
      this.drawSacredGeometry(ctx, radius);
      
      ctx.restore();
      
      rotation += 0.01;
      scale = 1 + Math.sin(rotation) * 0.1;
      
      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  private drawSacredGeometry(ctx: CanvasRenderingContext2D, radius: number): void {
    const sides = this.config.sides;
    const angle = (Math.PI * 2) / sides;
    
    ctx.beginPath();
    
    for (let i = 0; i <= sides; i++) {
      const x = Math.cos(angle * i) * radius;
      const y = Math.sin(angle * i) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw inner connections for sacred geometry
    if (sides >= 6) {
      ctx.beginPath();
      for (let i = 0; i < sides; i += 2) {
        const x1 = Math.cos(angle * i) * radius;
        const y1 = Math.sin(angle * i) * radius;
        const x2 = Math.cos(angle * (i + 2)) * radius;
        const y2 = Math.sin(angle * (i + 2)) * radius;
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    }
  }

  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Singleton instance
export const animationSystem = new AdvancedAnimationSystem();

// React hook for animations
export function useAdvancedAnimations() {
  const createEnergyFlow = (element: HTMLElement, config: SpiritualAnimationConfig) => {
    animationSystem.createEnergyFlowAnimation(element, config);
  };

  const createChakraActivation = (element: HTMLElement, chakraNumber: number) => {
    animationSystem.createChakraActivationAnimation(element, chakraNumber);
  };

  const createConsciousnessExpansion = (element: HTMLElement, level: number) => {
    animationSystem.createConsciousnessExpansionAnimation(element, level);
  };

  const createSacredGeometry = (element: HTMLElement, config: SacredGeometryConfig) => {
    animationSystem.createSacredGeometryAnimation(element, config);
  };

  const createParticleSystem = (container: HTMLElement, config: ParticleSystemConfig) => {
    animationSystem.createParticleSystem(container, config);
  };

  const createBreathingAnimation = (element: HTMLElement, duration?: number) => {
    animationSystem.createBreathingAnimation(element, duration);
  };

  const createEnergyField = (element: HTMLElement, intensity: number) => {
    animationSystem.createEnergyFieldAnimation(element, intensity);
  };

  const createResonanceWave = (element: HTMLElement, frequency: number) => {
    animationSystem.createResonanceWaveAnimation(element, frequency);
  };

  return {
    createEnergyFlow,
    createChakraActivation,
    createConsciousnessExpansion,
    createSacredGeometry,
    createParticleSystem,
    createBreathingAnimation,
    createEnergyField,
    createResonanceWave
  };
}
