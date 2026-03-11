/**
 * Advanced Spiritual Visualizations
 * Based on awesome data visualization patterns and spiritual design principles
 */

import React, { useEffect, useRef, useState } from 'react';
import { useAdvancedAnimations } from './advanced-animations';

export interface ChakraVisualizationProps {
  activeChakras: number[];
  energyLevels: number[];
  size?: number;
  animated?: boolean;
}

export interface LightbodyVisualizationProps {
  layers: Array<{
    name: string;
    color: string;
    opacity: number;
    energy: number;
  }>;
  size?: number;
  animated?: boolean;
}

export interface MerkabaVisualizationProps {
  rotation: number;
  energy: number;
  size?: number;
  animated?: boolean;
}

export interface TreeOfLifeVisualizationProps {
  sephiroth: Array<{
    name: string;
    position: { x: number; y: number };
    energy: number;
    color: string;
  }>;
  connections: Array<{
    from: number;
    to: number;
    energy: number;
  }>;
  size?: number;
  animated?: boolean;
}

// Advanced Chakra Visualization Component
export const ChakraVisualization: React.FC<ChakraVisualizationProps> = ({
  activeChakras,
  energyLevels,
  size = 400,
  animated = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createChakraActivation, createEnergyFlow } = useAdvancedAnimations();

  const chakraData = [
    { name: 'Root', color: '#ff0000', position: { x: 0.5, y: 0.9 } },
    { name: 'Sacral', color: '#ff8000', position: { x: 0.5, y: 0.8 } },
    { name: 'Solar Plexus', color: '#ffff00', position: { x: 0.5, y: 0.7 } },
    { name: 'Heart', color: '#00ff00', position: { x: 0.5, y: 0.6 } },
    { name: 'Throat', color: '#00ffff', position: { x: 0.5, y: 0.5 } },
    { name: 'Third Eye', color: '#0000ff', position: { x: 0.5, y: 0.4 } },
    { name: 'Crown', color: '#8000ff', position: { x: 0.5, y: 0.3 } }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawChakras = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw energy flow lines
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let i = 0; i < chakraData.length - 1; i++) {
        const current = chakraData[i];
        const next = chakraData[i + 1];
        
        ctx.moveTo(current.position.x * canvas.width, current.position.y * canvas.height);
        ctx.lineTo(next.position.x * canvas.width, next.position.y * canvas.height);
      }
      
      ctx.stroke();

      // Draw chakras
      chakraData.forEach((chakra, index) => {
        const isActive = activeChakras.includes(index + 1);
        const energyLevel = energyLevels[index] || 0;
        const radius = 20 + (energyLevel / 100) * 30;
        
        const x = chakra.position.x * canvas.width;
        const y = chakra.position.y * canvas.height;

        // Draw energy field
        if (isActive) {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
          gradient.addColorStop(0, `${chakra.color}40`);
          gradient.addColorStop(1, `${chakra.color}00`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw chakra circle
        ctx.fillStyle = isActive ? chakra.color : '#333';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw chakra symbol
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(chakra.name, x, y + 4);
      });
    };

    drawChakras();

    if (animated) {
      const animate = () => {
        drawChakras();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [activeChakras, energyLevels, animated]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-auto"
        style={{ background: 'radial-gradient(circle, rgba(138,43,226,0.1) 0%, rgba(0,0,0,0.8) 100%)' }}
      />
    </div>
  );
};

// Advanced Lightbody Visualization Component
export const LightbodyVisualization: React.FC<LightbodyVisualizationProps> = ({
  layers,
  size = 400,
  animated = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createEnergyField } = useAdvancedAnimations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawLightbody = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      layers.forEach((layer, index) => {
        const radius = 50 + (index * 20);
        const energy = layer.energy / 100;
        
        // Create energy field
        const gradient = ctx.createRadialGradient(
          centerX, centerY, radius * 0.5,
          centerX, centerY, radius
        );
        gradient.addColorStop(0, `${layer.color}${Math.floor(energy * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${layer.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw layer name
        ctx.fillStyle = layer.color;
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(layer.name, centerX, centerY - radius - 10);
      });
    };

    drawLightbody();

    if (animated) {
      const animate = () => {
        drawLightbody();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [layers, animated]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-auto"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.9) 100%)' }}
      />
    </div>
  );
};

// Advanced Merkaba Visualization Component
export const MerkabaVisualization: React.FC<MerkabaVisualizationProps> = ({
  rotation,
  energy,
  size = 400,
  animated = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createSacredGeometry } = useAdvancedAnimations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawMerkaba = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 100;
      const energyRadius = baseRadius + (energy / 100) * 50;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      // Draw Merkaba triangles
      const triangleSize = energyRadius;
      
      // Upward triangle
      ctx.strokeStyle = `rgba(138, 43, 226, ${energy / 100})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -triangleSize);
      ctx.lineTo(-triangleSize * 0.866, triangleSize * 0.5);
      ctx.lineTo(triangleSize * 0.866, triangleSize * 0.5);
      ctx.closePath();
      ctx.stroke();
      
      // Downward triangle
      ctx.beginPath();
      ctx.moveTo(0, triangleSize);
      ctx.lineTo(-triangleSize * 0.866, -triangleSize * 0.5);
      ctx.lineTo(triangleSize * 0.866, -triangleSize * 0.5);
      ctx.closePath();
      ctx.stroke();
      
      // Draw energy field
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, energyRadius);
      gradient.addColorStop(0, `rgba(138, 43, 226, ${energy / 200})`);
      gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, energyRadius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    drawMerkaba();

    if (animated) {
      const animate = () => {
        drawMerkaba();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [rotation, energy, animated]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-auto"
        style={{ background: 'radial-gradient(circle, rgba(138,43,226,0.1) 0%, rgba(0,0,0,0.8) 100%)' }}
      />
    </div>
  );
};

// Advanced Tree of Life Visualization Component
export const TreeOfLifeVisualization: React.FC<TreeOfLifeVisualizationProps> = ({
  sephiroth,
  connections,
  size = 600,
  animated = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createEnergyFlow } = useAdvancedAnimations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawTreeOfLife = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connections.forEach(connection => {
        const from = sephiroth[connection.from];
        const to = sephiroth[connection.to];
        
        if (from && to) {
          ctx.strokeStyle = `rgba(138, 43, 226, ${connection.energy / 100})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(from.position.x * canvas.width, from.position.y * canvas.height);
          ctx.lineTo(to.position.x * canvas.width, to.position.y * canvas.height);
          ctx.stroke();
        }
      });
      
      // Draw sephiroth
      sephiroth.forEach((sephira, index) => {
        const x = sephira.position.x * canvas.width;
        const y = sephira.position.y * canvas.height;
        const radius = 20 + (sephira.energy / 100) * 20;
        
        // Draw energy field
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
        gradient.addColorStop(0, `${sephira.color}40`);
        gradient.addColorStop(1, `${sephira.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw sephira
        ctx.fillStyle = sephira.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw name
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(sephira.name, x, y + 4);
      });
    };

    drawTreeOfLife();

    if (animated) {
      const animate = () => {
        drawTreeOfLife();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [sephiroth, connections, animated]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-auto"
        style={{ background: 'radial-gradient(circle, rgba(138,43,226,0.1) 0%, rgba(0,0,0,0.8) 100%)' }}
      />
    </div>
  );
};

// Advanced Energy Field Visualization Component
export const EnergyFieldVisualization: React.FC<{
  intensity: number;
  frequency: number;
  size?: number;
  animated?: boolean;
}> = ({ intensity, frequency, size = 400, animated = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawEnergyField = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) / 2;
      
      // Create energy field
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius
      );
      gradient.addColorStop(0, `rgba(138, 43, 226, ${intensity / 100})`);
      gradient.addColorStop(0.5, `rgba(75, 0, 130, ${intensity / 200})`);
      gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw frequency waves
      const waveCount = Math.floor(frequency / 10);
      for (let i = 0; i < waveCount; i++) {
        const radius = (maxRadius / waveCount) * (i + 1);
        const opacity = (intensity / 100) * (1 - i / waveCount);
        
        ctx.strokeStyle = `rgba(138, 43, 226, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    drawEnergyField();

    if (animated) {
      const animate = () => {
        drawEnergyField();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [intensity, frequency, animated]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-auto"
        style={{ background: 'radial-gradient(circle, rgba(138,43,226,0.1) 0%, rgba(0,0,0,0.8) 100%)' }}
      />
    </div>
  );
};

// Advanced Sacred Geometry Visualization Component
export const SacredGeometryVisualization: React.FC<{
  type: 'flower' | 'mandala' | 'metatron' | 'merkaba';
  size?: number;
  animated?: boolean;
}> = ({ type, size = 400, animated = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawSacredGeometry = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 3;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      
      switch (type) {
        case 'flower':
          drawFlowerOfLife(ctx, radius);
          break;
        case 'mandala':
          drawMandala(ctx, radius);
          break;
        case 'metatron':
          drawMetatronCube(ctx, radius);
          break;
        case 'merkaba':
          drawMerkaba(ctx, radius);
          break;
      }
      
      ctx.restore();
    };

    const drawFlowerOfLife = (ctx: CanvasRenderingContext2D, radius: number) => {
      const circles = 7;
      const angle = (Math.PI * 2) / circles;
      
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.8)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < circles; i++) {
        const x = Math.cos(angle * i) * radius;
        const y = Math.sin(angle * i) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const drawMandala = (ctx: CanvasRenderingContext2D, radius: number) => {
      const petals = 8;
      const angle = (Math.PI * 2) / petals;
      
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.8)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < petals; i++) {
        const x1 = Math.cos(angle * i) * radius;
        const y1 = Math.sin(angle * i) * radius;
        const x2 = Math.cos(angle * (i + 1)) * radius;
        const y2 = Math.sin(angle * (i + 1)) * radius;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
      }
    };

    const drawMetatronCube = (ctx: CanvasRenderingContext2D, radius: number) => {
      const points = 13;
      const angle = (Math.PI * 2) / points;
      
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.8)';
      ctx.lineWidth = 2;
      
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw inner connections
      for (let i = 0; i < points; i++) {
        const x1 = Math.cos(angle * i) * radius;
        const y1 = Math.sin(angle * i) * radius;
        const x2 = Math.cos(angle * (i + 2)) * radius;
        const y2 = Math.sin(angle * (i + 2)) * radius;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    };

    const drawMerkaba = (ctx: CanvasRenderingContext2D, radius: number) => {
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.8)';
      ctx.lineWidth = 2;
      
      // Draw upward triangle
      ctx.beginPath();
      ctx.moveTo(0, -radius);
      ctx.lineTo(-radius * 0.866, radius * 0.5);
      ctx.lineTo(radius * 0.866, radius * 0.5);
      ctx.closePath();
      ctx.stroke();
      
      // Draw downward triangle
      ctx.beginPath();
      ctx.moveTo(0, radius);
      ctx.lineTo(-radius * 0.866, -radius * 0.5);
      ctx.lineTo(radius * 0.866, -radius * 0.5);
      ctx.closePath();
      ctx.stroke();
    };

    drawSacredGeometry();

    if (animated) {
      const animate = () => {
        drawSacredGeometry();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [type, animated]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-auto"
        style={{ background: 'radial-gradient(circle, rgba(138,43,226,0.1) 0%, rgba(0,0,0,0.8) 100%)' }}
      />
    </div>
  );
};
