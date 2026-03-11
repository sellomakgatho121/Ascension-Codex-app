/**
 * Advanced Data Visualizations
 * Based on awesome data visualization patterns and spiritual analytics
 */

import React, { useEffect, useRef, useState } from 'react';
import { useAdvancedAnimations } from './advanced-animations';

export interface SpiritualDataPoint {
  timestamp: number;
  value: number;
  category: string;
  energy: number;
  frequency: number;
}

export interface ChakraAnalytics {
  chakra: string;
  energy: number;
  frequency: number;
  balance: number;
  activation: number;
  trends: SpiritualDataPoint[];
}

export interface SpiritualProgress {
  level: number;
  experience: number;
  chakras: ChakraAnalytics[];
  practices: Array<{
    name: string;
    frequency: number;
    duration: number;
    effectiveness: number;
  }>;
  insights: Array<{
    type: string;
    message: string;
    confidence: number;
  }>;
}

export interface EnergyFieldData {
  x: number;
  y: number;
  intensity: number;
  frequency: number;
  color: string;
}

// Advanced Spiritual Progress Chart
export const SpiritualProgressChart: React.FC<{
  data: SpiritualProgress;
  size?: number;
  animated?: boolean;
}> = ({ data, size = 600, animated = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createEnergyFlow } = useAdvancedAnimations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawProgressChart = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 3;
      
      // Draw background circle
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw chakra progress
      data.chakras.forEach((chakra, index) => {
        const angle = (index / data.chakras.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Draw chakra energy level
        const energyRadius = 20 + (chakra.energy / 100) * 30;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, energyRadius);
        gradient.addColorStop(0, `rgba(138, 43, 226, ${chakra.energy / 100})`);
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, energyRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw chakra name
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(chakra.chakra, x, y + 4);
      });
      
      // Draw progress lines
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      data.chakras.forEach((chakra, index) => {
        const angle = (index / data.chakras.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.closePath();
      ctx.stroke();
    };

    drawProgressChart();

    if (animated) {
      const animate = () => {
        drawProgressChart();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [data, animated]);

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

// Advanced Energy Field Visualization
export const EnergyFieldVisualization: React.FC<{
  data: EnergyFieldData[];
  size?: number;
  animated?: boolean;
}> = ({ data, size = 600, animated = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createEnergyField } = useAdvancedAnimations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawEnergyField = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw energy field points
      data.forEach(point => {
        const x = (point.x / 100) * canvas.width;
        const y = (point.y / 100) * canvas.height;
        const radius = 10 + (point.intensity / 100) * 40;
        
        // Create energy field gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `${point.color}${Math.floor(point.intensity / 100 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${point.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw frequency waves
        const waveCount = Math.floor(point.frequency / 10);
        for (let i = 0; i < waveCount; i++) {
          const waveRadius = radius + (i * 10);
          const opacity = (point.intensity / 100) * (1 - i / waveCount);
          
          ctx.strokeStyle = `${point.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, waveRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    };

    drawEnergyField();

    if (animated) {
      const animate = () => {
        drawEnergyField();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [data, animated]);

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

// Advanced Spiritual Analytics Dashboard
export const SpiritualAnalyticsDashboard: React.FC<{
  data: SpiritualProgress;
  size?: number;
  animated?: boolean;
}> = ({ data, size = 800, animated = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createEnergyFlow, createChakraActivation } = useAdvancedAnimations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawDashboard = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const padding = 50;
      const chartWidth = canvas.width - (padding * 2);
      const chartHeight = canvas.height - (padding * 2);
      
      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(138, 43, 226, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw chakra energy bars
      const barWidth = chartWidth / data.chakras.length;
      data.chakras.forEach((chakra, index) => {
        const x = padding + (index * barWidth);
        const y = padding + chartHeight - (chakra.energy / 100) * chartHeight;
        const barHeight = (chakra.energy / 100) * chartHeight;
        
        // Draw energy bar
        const barGradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        barGradient.addColorStop(0, `rgba(138, 43, 226, ${chakra.energy / 100})`);
        barGradient.addColorStop(1, `rgba(138, 43, 226, ${chakra.energy / 200})`);
        
        ctx.fillStyle = barGradient;
        ctx.fillRect(x, y, barWidth - 10, barHeight);
        
        // Draw chakra name
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(chakra.chakra, x + barWidth / 2, canvas.height - 20);
      });
      
      // Draw practice effectiveness chart
      const practiceY = padding + 100;
      const practiceHeight = 100;
      
      data.practices.forEach((practice, index) => {
        const x = padding + (index * (chartWidth / data.practices.length));
        const y = practiceY + practiceHeight - (practice.effectiveness / 100) * practiceHeight;
        const barHeight = (practice.effectiveness / 100) * practiceHeight;
        
        // Draw practice bar
        ctx.fillStyle = `rgba(0, 255, 255, ${practice.effectiveness / 100})`;
        ctx.fillRect(x, y, (chartWidth / data.practices.length) - 10, barHeight);
        
        // Draw practice name
        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(practice.name, x + (chartWidth / data.practices.length) / 2, practiceY + practiceHeight + 15);
      });
      
      // Draw insights
      const insightsY = practiceY + practiceHeight + 50;
      data.insights.forEach((insight, index) => {
        const x = padding + (index * 200);
        const y = insightsY;
        
        // Draw insight box
        ctx.fillStyle = `rgba(255, 215, 0, ${insight.confidence / 100})`;
        ctx.fillRect(x, y, 180, 40);
        
        // Draw insight text
        ctx.fillStyle = '#000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(insight.message, x + 90, y + 25);
      });
    };

    drawDashboard();

    if (animated) {
      const animate = () => {
        drawDashboard();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [data, animated]);

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

// Advanced Spiritual Timeline
export const SpiritualTimeline: React.FC<{
  data: SpiritualDataPoint[];
  size?: number;
  animated?: boolean;
}> = ({ data, size = 800, animated = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createEnergyFlow } = useAdvancedAnimations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawTimeline = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const padding = 50;
      const chartWidth = canvas.width - (padding * 2);
      const chartHeight = canvas.height - (padding * 2);
      
      // Draw timeline line
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(padding, padding + chartHeight / 2);
      ctx.lineTo(padding + chartWidth, padding + chartHeight / 2);
      ctx.stroke();
      
      // Draw data points
      data.forEach((point, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + chartHeight / 2 - (point.value / 100) * (chartHeight / 2);
        const radius = 5 + (point.energy / 100) * 10;
        
        // Draw energy field
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
        gradient.addColorStop(0, `rgba(138, 43, 226, ${point.energy / 100})`);
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw data point
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw frequency waves
        const waveCount = Math.floor(point.frequency / 10);
        for (let i = 0; i < waveCount; i++) {
          const waveRadius = radius + (i * 5);
          const opacity = (point.energy / 100) * (1 - i / waveCount);
          
          ctx.strokeStyle = `rgba(138, 43, 226, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, y, waveRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
      
      // Draw trend line
      if (data.length > 1) {
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((point, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth;
          const y = padding + chartHeight / 2 - (point.value / 100) * (chartHeight / 2);
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
      }
    };

    drawTimeline();

    if (animated) {
      const animate = () => {
        drawTimeline();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [data, animated]);

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

// Advanced Spiritual Heatmap
export const SpiritualHeatmap: React.FC<{
  data: Array<{
    x: number;
    y: number;
    intensity: number;
    frequency: number;
    color: string;
  }>;
  size?: number;
  animated?: boolean;
}> = ({ data, size = 600, animated = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createEnergyField } = useAdvancedAnimations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawHeatmap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create heatmap grid
      const gridSize = 20;
      const gridWidth = Math.floor(canvas.width / gridSize);
      const gridHeight = Math.floor(canvas.height / gridSize);
      
      // Calculate heatmap values
      const heatmap = new Array(gridHeight).fill(null).map(() => new Array(gridWidth).fill(0));
      
      data.forEach(point => {
        const gridX = Math.floor((point.x / 100) * gridWidth);
        const gridY = Math.floor((point.y / 100) * gridHeight);
        
        if (gridX >= 0 && gridX < gridWidth && gridY >= 0 && gridY < gridHeight) {
          heatmap[gridY][gridX] += point.intensity;
        }
      });
      
      // Draw heatmap
      for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
          const intensity = heatmap[y][x] / 100;
          const color = `rgba(138, 43, 226, ${intensity})`;
          
          ctx.fillStyle = color;
          ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
        }
      }
      
      // Draw data points
      data.forEach(point => {
        const x = (point.x / 100) * canvas.width;
        const y = (point.y / 100) * canvas.height;
        const radius = 5 + (point.intensity / 100) * 15;
        
        // Draw energy field
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `${point.color}${Math.floor(point.intensity / 100 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${point.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    drawHeatmap();

    if (animated) {
      const animate = () => {
        drawHeatmap();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [data, animated]);

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

// Advanced Spiritual Network Graph
export const SpiritualNetworkGraph: React.FC<{
  nodes: Array<{
    id: string;
    x: number;
    y: number;
    energy: number;
    frequency: number;
    color: string;
  }>;
  edges: Array<{
    from: string;
    to: string;
    energy: number;
    frequency: number;
  }>;
  size?: number;
  animated?: boolean;
}> = ({ nodes, edges, size = 600, animated = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createEnergyFlow } = useAdvancedAnimations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw edges
      edges.forEach(edge => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        
        if (fromNode && toNode) {
          const fromX = (fromNode.x / 100) * canvas.width;
          const fromY = (fromNode.y / 100) * canvas.height;
          const toX = (toNode.x / 100) * canvas.width;
          const toY = (toNode.y / 100) * canvas.height;
          
          // Draw energy flow
          ctx.strokeStyle = `rgba(138, 43, 226, ${edge.energy / 100})`;
          ctx.lineWidth = 2 + (edge.energy / 100) * 3;
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.stroke();
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        const x = (node.x / 100) * canvas.width;
        const y = (node.y / 100) * canvas.height;
        const radius = 10 + (node.energy / 100) * 20;
        
        // Draw energy field
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
        gradient.addColorStop(0, `${node.color}${Math.floor(node.energy / 100 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${node.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw node label
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.id, x, y + 4);
      });
    };

    drawNetwork();

    if (animated) {
      const animate = () => {
        drawNetwork();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [nodes, edges, animated]);

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
