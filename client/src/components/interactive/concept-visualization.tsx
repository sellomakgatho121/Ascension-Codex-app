import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Zap } from "lucide-react";

interface ConceptVisualizationProps {
  conceptTerm: string;
  category: string;
}

export function ConceptVisualization({ conceptTerm, category }: ConceptVisualizationProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [intensity, setIntensity] = useState([50]);
  const [frequency, setFrequency] = useState([30]);
  const [pattern, setPattern] = useState(0);

  const patterns = [
    { name: 'Spiral', description: 'Ascending spiral energy' },
    { name: 'Mandala', description: 'Sacred geometric pattern' },
    { name: 'Wave', description: 'Flowing wave energy' },
    { name: 'Grid', description: 'Crystalline grid structure' }
  ];

  const getCategoryColor = () => {
    switch (category) {
      case 'protection': return 'text-blue-400';
      case 'consciousness': return 'text-purple-400';
      case 'anatomy': return 'text-green-400';
      case 'ascension': return 'text-yellow-400';
      case 'timeline': return 'text-orange-400';
      case 'planetary': return 'text-teal-400';
      case 'galactic': return 'text-indigo-400';
      default: return 'text-sacred-gold';
    }
  };

  const handleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const resetVisualization = () => {
    setIsAnimating(false);
    setIntensity([50]);
    setFrequency([30]);
    setPattern(0);
  };

  return (
    <Card className="sacred-card">
      <CardHeader>
        <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          {conceptTerm} Visualization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visualization Canvas */}
        <div className="relative h-64 bg-cosmic-800/50 rounded-lg border border-cosmic-600 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`w-32 h-32 rounded-full border-2 ${getCategoryColor()} transition-all duration-1000 ${
                isAnimating ? 'animate-pulse scale-110' : ''
              }`}
              style={{
                opacity: intensity[0] / 100,
                animationDuration: `${2000 - frequency[0] * 30}ms`,
                filter: `brightness(${intensity[0]}%)`,
              }}
            >
              <div className={`w-full h-full rounded-full bg-gradient-radial from-current to-transparent opacity-30`}></div>
            </div>
            
            {/* Pattern overlay */}
            <div className={`absolute inset-0 ${isAnimating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 ${getCategoryColor()} rounded-full opacity-60`}
                  style={{
                    top: `${50 + 30 * Math.sin((i * Math.PI * 2) / 8)}%`,
                    left: `${50 + 30 * Math.cos((i * Math.PI * 2) / 8)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Energy field indicator */}
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className={`${getCategoryColor()} border-current`}>
              {patterns[pattern].name}
            </Badge>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={handleAnimation}
              variant={isAnimating ? "default" : "outline"}
              className="flex-1"
            >
              {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isAnimating ? 'Pause' : 'Start'} Visualization
            </Button>
            <Button onClick={resetVisualization} variant="outline">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                Energy Intensity: {intensity[0]}%
              </label>
              <Slider
                value={intensity}
                onValueChange={setIntensity}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                Frequency: {frequency[0]}Hz
              </label>
              <Slider
                value={frequency}
                onValueChange={setFrequency}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                Pattern Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {patterns.map((pat, index) => (
                  <Button
                    key={index}
                    variant={pattern === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPattern(index)}
                    className="text-xs"
                  >
                    {pat.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pattern Description */}
        <div className="p-3 rounded-lg bg-cosmic-700/30 border border-cosmic-600">
          <h4 className="font-medium text-white text-sm mb-1">Current Pattern</h4>
          <p className="text-cosmic-300 text-xs">{patterns[pattern].description}</p>
        </div>

        {/* Guided Instructions */}
        <div className="space-y-2">
          <h4 className="font-medium text-white text-sm">Visualization Guide</h4>
          <ol className="text-xs text-cosmic-300 space-y-1">
            <li>1. Focus on the central energy pattern</li>
            <li>2. Breathe deeply and synchronize with the animation</li>
            <li>3. Visualize {conceptTerm} energy flowing through you</li>
            <li>4. Adjust intensity to match your energy level</li>
            <li>5. Allow insights and understanding to emerge</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}