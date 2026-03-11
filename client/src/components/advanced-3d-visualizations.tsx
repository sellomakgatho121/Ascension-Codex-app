import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Circle, 
  Star, 
  Sparkles,
  Eye,
  Settings
} from 'lucide-react';

interface Advanced3DVisualizationsProps {
  className?: string;
}

export function Advanced3DVisualizations({ className = "" }: Advanced3DVisualizationsProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState([50]);
  const [energyIntensity, setEnergyIntensity] = useState([75]);
  const [selectedVisualization, setSelectedVisualization] = useState('chakra-spinning');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Chakra Spinning Animation
  const ChakraSpinning3D = () => {
    const chakras = [
      { name: 'Root', color: 'hsl(0, 84%, 60%)', position: 0 },
      { name: 'Sacral', color: 'hsl(22, 89%, 58%)', position: 1 },
      { name: 'Solar', color: 'hsl(48, 89%, 55%)', position: 2 },
      { name: 'Heart', color: 'hsl(120, 60%, 50%)', position: 3 },
      { name: 'Throat', color: 'hsl(217, 91%, 65%)', position: 4 },
      { name: 'Third Eye', color: 'hsl(248, 53%, 68%)', position: 5 },
      { name: 'Crown', color: 'hsl(258, 90%, 72%)', position: 6 },
    ];

    return (
      <div className="relative h-96 bg-cosmic-800 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {chakras.map((chakra, index) => (
              <div
                key={chakra.name}
                className={`absolute w-16 h-16 rounded-full border-4 ${isAnimating ? 'animate-spin' : ''}`}
                style={{
                  borderColor: chakra.color,
                  backgroundColor: `${chakra.color}20`,
                  transform: `translateY(${(index - 3) * 60}px)`,
                  animationDuration: `${2 + index * 0.3}s`,
                  boxShadow: `0 0 20px ${chakra.color}60`,
                }}
              >
                <div 
                  className={`w-full h-full rounded-full ${isAnimating ? 'animate-pulse' : ''}`}
                  style={{
                    background: `radial-gradient(circle, ${chakra.color}40, transparent 70%)`,
                    animationDuration: `${1 + index * 0.2}s`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Circle 
                    className="w-6 h-6"
                    style={{ color: chakra.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Sacred Geometry Pattern Generator
  const SacredGeometryGenerator = () => {
    const patterns = ['flower-of-life', 'merkaba', 'sri-yantra', 'vesica-piscis'];
    const [currentPattern, setCurrentPattern] = useState('flower-of-life');

    const renderPattern = () => {
      switch (currentPattern) {
        case 'flower-of-life':
          return (
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {Array.from({ length: 19 }).map((_, i) => {
                const angle = (i * 360) / 19;
                const x = 200 + 60 * Math.cos(angle * Math.PI / 180);
                const y = 200 + 60 * Math.sin(angle * Math.PI / 180);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="30"
                    fill="none"
                    stroke="hsl(45, 100%, 70%)"
                    strokeWidth="2"
                    className={isAnimating ? 'animate-pulse' : ''}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                );
              })}
              <circle
                cx="200"
                cy="200"
                r="30"
                fill="none"
                stroke="hsl(45, 100%, 80%)"
                strokeWidth="3"
                className={isAnimating ? 'animate-spin' : ''}
              />
            </svg>
          );
        case 'merkaba':
          return (
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <polygon
                points="200,50 320,200 200,350 80,200"
                fill="none"
                stroke="hsl(186, 94%, 55%)"
                strokeWidth="3"
                className={isAnimating ? 'animate-spin' : ''}
              />
              <polygon
                points="200,350 320,200 200,50 80,200"
                fill="none"
                stroke="hsl(280, 65%, 55%)"
                strokeWidth="3"
                className={isAnimating ? 'animate-spin' : ''}
                style={{ animationDirection: 'reverse' }}
              />
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <div className="relative h-96 bg-cosmic-800 rounded-lg overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <div className="flex gap-2">
            {patterns.map((pattern) => (
              <Button
                key={pattern}
                size="sm"
                variant={currentPattern === pattern ? "default" : "outline"}
                onClick={() => setCurrentPattern(pattern)}
                className="text-xs"
              >
                {pattern.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {renderPattern()}
        </div>
      </div>
    );
  };

  // Energy Field Animation
  const EnergyFieldAnimation = () => {
    return (
      <div className="relative h-96 bg-cosmic-800 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-sacred-gold rounded-full ${isAnimating ? 'animate-bounce' : ''}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                opacity: energyIntensity[0] / 100,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`w-32 h-32 rounded-full border-4 border-sacred-gold ${isAnimating ? 'animate-pulse' : ''}`}
              style={{
                boxShadow: `0 0 ${energyIntensity[0]}px hsl(45, 100%, 70%)`,
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-radial from-sacred-gold/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVisualization = () => {
    switch (selectedVisualization) {
      case 'chakra-spinning':
        return <ChakraSpinning3D />;
      case 'sacred-geometry':
        return <SacredGeometryGenerator />;
      case 'energy-field':
        return <EnergyFieldAnimation />;
      default:
        return <ChakraSpinning3D />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Advanced 3D Visualizations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={selectedVisualization} onValueChange={setSelectedVisualization}>
            <TabsList className="grid w-full grid-cols-3 bg-cosmic-700">
              <TabsTrigger value="chakra-spinning">Chakra Spinning</TabsTrigger>
              <TabsTrigger value="sacred-geometry">Sacred Geometry</TabsTrigger>
              <TabsTrigger value="energy-field">Energy Field</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedVisualization} className="space-y-4">
              {renderVisualization()}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-cosmic-300">Animation Speed</label>
                  <Slider
                    value={rotationSpeed}
                    onValueChange={setRotationSpeed}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <span className="text-xs text-cosmic-400">{rotationSpeed[0]}%</span>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-cosmic-300">Energy Intensity</label>
                  <Slider
                    value={energyIntensity}
                    onValueChange={setEnergyIntensity}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <span className="text-xs text-cosmic-400">{energyIntensity[0]}%</span>
                </div>

                <div className="flex items-end gap-2">
                  <Button
                    onClick={() => setIsAnimating(!isAnimating)}
                    className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
                  >
                    {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isAnimating ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAnimating(false);
                      setRotationSpeed([50]);
                      setEnergyIntensity([75]);
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}