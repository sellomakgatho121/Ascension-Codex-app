/**
 * Visual Enhancements for Superior Aesthetics
 * Based on awesome visual design patterns and modern UI/UX principles
 */

import React, { useEffect, useRef, useState } from 'react';
import { useAdvancedAnimations } from './advanced-animations';
import { useSacredDesignSystem } from './visual-design-system';

// Advanced Glassmorphism Component
export const GlassmorphismCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  blur?: number;
  animated?: boolean;
}> = ({ children, className = '', intensity = 0.1, blur = 10, animated = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { createEnergyFlow } = useAdvancedAnimations();

  useEffect(() => {
    if (animated && cardRef.current) {
      createEnergyFlow(cardRef.current, {
        duration: 2000,
        easing: 'ease-in-out',
        energyLevel: intensity * 100,
        chakraResonance: 500,
        spiritualFrequency: 432,
        consciousnessLevel: 75
      });
    }
  }, [animated, intensity, createEnergyFlow]);

  return (
    <div
      ref={cardRef}
      className={`sacred-card ${className}`}
      style={{
        background: `rgba(138, 43, 226, ${intensity})`,
        backdropFilter: `blur(${blur}px)`,
        border: '1px solid rgba(138, 43, 226, 0.2)',
        boxShadow: '0 8px 32px rgba(138, 43, 226, 0.3)',
        transition: 'all 0.3s ease'
      }}
    >
      {children}
    </div>
  );
};

// Advanced Particle Background
export const ParticleBackground: React.FC<{
  particleCount?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  className?: string;
}> = ({ 
  particleCount = 50, 
  speed = 1, 
  color = '#8A2BE2', 
  opacity = 0.6,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * opacity
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, speed, color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};

// Advanced Gradient Text
export const GradientText: React.FC<{
  children: React.ReactNode;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  className?: string;
  animated?: boolean;
}> = ({ 
  children, 
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  size = 'lg',
  weight = 'bold',
  className = '',
  animated = true
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const { createResonanceWave } = useAdvancedAnimations();

  useEffect(() => {
    if (animated && textRef.current) {
      createResonanceWave(textRef.current, 432);
    }
  }, [animated, createResonanceWave]);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  };

  return (
    <span
      ref={textRef}
      className={`${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
      style={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      {children}
    </span>
  );
};

// Advanced Floating Elements
export const FloatingElements: React.FC<{
  children: React.ReactNode;
  intensity?: number;
  duration?: number;
  delay?: number;
  className?: string;
}> = ({ 
  children, 
  intensity = 10, 
  duration = 3000, 
  delay = 0,
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { createBreathingAnimation } = useAdvancedAnimations();

  useEffect(() => {
    if (elementRef.current) {
      createBreathingAnimation(elementRef.current, duration);
    }
  }, [duration, createBreathingAnimation]);

  return (
    <div
      ref={elementRef}
      className={`sacred-float ${className}`}
      style={{
        animation: `ethereal-float ${duration}ms ease-in-out infinite`,
        animationDelay: `${delay}ms`,
        transform: `translateY(${intensity}px)`
      }}
    >
      {children}
    </div>
  );
};

// Advanced Glow Effect
export const GlowEffect: React.FC<{
  children: React.ReactNode;
  color?: string;
  intensity?: number;
  size?: number;
  animated?: boolean;
  className?: string;
}> = ({ 
  children, 
  color = '#8A2BE2', 
  intensity = 0.5, 
  size = 20,
  animated = true,
  className = ''
}) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const { createEnergyField } = useAdvancedAnimations();

  useEffect(() => {
    if (animated && glowRef.current) {
      createEnergyField(glowRef.current, intensity);
    }
  }, [animated, intensity, createEnergyField]);

  return (
    <div
      ref={glowRef}
      className={`sacred-glow ${className}`}
      style={{
        boxShadow: `0 0 ${size}px ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`,
        transition: 'all 0.3s ease'
      }}
    >
      {children}
    </div>
  );
};

// Advanced Morphing Shapes
export const MorphingShapes: React.FC<{
  shapes: Array<{
    type: 'circle' | 'square' | 'triangle' | 'hexagon';
    color: string;
    size: number;
    x: number;
    y: number;
  }>;
  duration?: number;
  className?: string;
}> = ({ shapes, duration = 2000, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape, index) => {
        const progress = (time + index * 200) % duration / duration;
        const x = shape.x + Math.sin(progress * Math.PI * 2) * 50;
        const y = shape.y + Math.cos(progress * Math.PI * 2) * 50;
        const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.2;

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillStyle = shape.color;
        ctx.globalAlpha = 0.8;

        switch (shape.type) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'square':
            ctx.fillRect(-shape.size, -shape.size, shape.size * 2, shape.size * 2);
            break;
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -shape.size);
            ctx.lineTo(-shape.size, shape.size);
            ctx.lineTo(shape.size, shape.size);
            ctx.closePath();
            ctx.fill();
            break;
          case 'hexagon':
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i / 6) * Math.PI * 2;
              const x = Math.cos(angle) * shape.size;
              const y = Math.sin(angle) * shape.size;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            break;
        }

        ctx.restore();
      });

      time += 16;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shapes, duration]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};

// Advanced Interactive Hover Effects
export const InteractiveHover: React.FC<{
  children: React.ReactNode;
  effect?: 'glow' | 'scale' | 'rotate' | 'morph' | 'particle';
  intensity?: number;
  duration?: number;
  className?: string;
}> = ({ 
  children, 
  effect = 'glow', 
  intensity = 1, 
  duration = 300,
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const getHoverStyle = () => {
    switch (effect) {
      case 'glow':
        return {
          boxShadow: `0 0 ${20 * intensity}px rgba(138, 43, 226, ${intensity})`,
          transform: 'translateY(-2px)'
        };
      case 'scale':
        return {
          transform: `scale(${1 + intensity * 0.1})`
        };
      case 'rotate':
        return {
          transform: `rotate(${intensity * 5}deg)`
        };
      case 'morph':
        return {
          borderRadius: `${intensity * 20}px`,
          transform: 'scale(1.05)'
        };
      case 'particle':
        return {
          background: `radial-gradient(circle, rgba(138, 43, 226, ${intensity}) 0%, transparent 70%)`,
          transform: 'scale(1.1)'
        };
      default:
        return {};
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-${duration} ${className}`}
      style={{
        ...getHoverStyle(),
        transition: `all ${duration}ms ease`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

// Advanced Loading Animation
export const SacredLoading: React.FC<{
  type?: 'spinner' | 'pulse' | 'wave' | 'particle' | 'chakra';
  size?: number;
  color?: string;
  className?: string;
}> = ({ 
  type = 'spinner', 
  size = 40, 
  color = '#8A2BE2',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (type) {
        case 'spinner':
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(time * 0.01);
          ctx.strokeStyle = color;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, Math.PI * 1.5);
          ctx.stroke();
          ctx.restore();
          break;

        case 'pulse':
          const pulseSize = size + Math.sin(time * 0.01) * 10;
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.5 + Math.sin(time * 0.01) * 0.5;
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, pulseSize / 2, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'wave':
          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x += 5) {
            const y = canvas.height / 2 + Math.sin((x + time) * 0.01) * 20;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          break;

        case 'particle':
          for (let i = 0; i < 10; i++) {
            const x = canvas.width / 2 + Math.cos((time + i * 36) * 0.01) * 30;
            const y = canvas.height / 2 + Math.sin((time + i * 36) * 0.01) * 30;
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.5 + Math.sin((time + i * 36) * 0.01) * 0.5;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          break;

        case 'chakra':
          const chakras = 7;
          for (let i = 0; i < chakras; i++) {
            const angle = (i / chakras) * Math.PI * 2;
            const x = canvas.width / 2 + Math.cos(angle + time * 0.01) * 30;
            const y = canvas.height / 2 + Math.sin(angle + time * 0.01) * 30;
            const chakraSize = 5 + Math.sin((time + i * 50) * 0.01) * 3;
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.7 + Math.sin((time + i * 50) * 0.01) * 0.3;
            ctx.beginPath();
            ctx.arc(x, y, chakraSize, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
      }

      time += 16;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [type, size, color]);

  return (
    <canvas
      ref={canvasRef}
      width={size * 2}
      height={size * 2}
      className={`w-${size / 4} h-${size / 4} ${className}`}
    />
  );
};

// Advanced Visual Effects Container
export const VisualEffectsContainer: React.FC<{
  children: React.ReactNode;
  effects?: Array<'particles' | 'gradient' | 'glow' | 'morph' | 'float'>;
  intensity?: number;
  className?: string;
}> = ({ 
  children, 
  effects = ['particles', 'glow'], 
  intensity = 0.5,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {effects.includes('particles') && (
        <ParticleBackground
          particleCount={Math.floor(50 * intensity)}
          speed={intensity}
          opacity={intensity}
        />
      )}
      
      {effects.includes('gradient') && (
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)'
          }}
        />
      )}
      
      {effects.includes('glow') && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 ${100 * intensity}px rgba(138, 43, 226, ${intensity * 0.3})`
          }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
