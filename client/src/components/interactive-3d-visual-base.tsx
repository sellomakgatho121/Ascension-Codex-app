import { useState, useEffect, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";

interface Interactive3DVisualBaseProps {
  title: string;
  subtitle?: string;
  layerCount?: number;
  children: ReactNode;
  onRotationChange?: (angle: number) => void;
  onZoomChange?: (zoom: number) => void;
  onEnergyChange?: (energy: number) => void;
  autoRotate?: boolean;
  showControls?: boolean;
}

export function Interactive3DVisualBase({
  title,
  subtitle,
  layerCount,
  children,
  onRotationChange,
  onZoomChange,
  onEnergyChange,
  autoRotate = true,
  showControls = true
}: Interactive3DVisualBaseProps) {
  const [isAnimating, setIsAnimating] = useState(autoRotate);
  const [zoomLevel, setZoomLevel] = useState([1]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [energyIntensity, setEnergyIntensity] = useState([75]);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimating]);

  useEffect(() => {
    onRotationChange?.(rotationAngle);
  }, [rotationAngle, onRotationChange]);

  useEffect(() => {
    if (zoomLevel[0]) onZoomChange?.(zoomLevel[0]);
  }, [zoomLevel, onZoomChange]);

  useEffect(() => {
    if (energyIntensity[0]) onEnergyChange?.(energyIntensity[0]);
  }, [energyIntensity, onEnergyChange]);

  const handleReset = () => {
    setZoomLevel([1]);
    setRotationAngle(0);
    setEnergyIntensity([75]);
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      {showControls && (
        <Card className="sacred-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center justify-between">
              {title}
              {layerCount && (
                <Badge variant="outline" className="border-sacred-gold/50 text-sacred-gold">
                  {layerCount} Layers
                </Badge>
              )}
            </CardTitle>
            {subtitle && <p className="text-sm text-cosmic-300 mt-1">{subtitle}</p>}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setIsAnimating(!isAnimating)}
                variant={isAnimating ? "default" : "outline"}
                size="sm"
                className="sacred-button-sm"
              >
                {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isAnimating ? 'Pause' : 'Play'}
              </Button>

              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-cosmic-300">Zoom Level</label>
                <Slider
                  value={zoomLevel}
                  onValueChange={setZoomLevel}
                  min={0.5}
                  max={1.5}
                  step={0.1}
                  className="w-full"
                />
                <span className="text-xs text-cosmic-400">{(zoomLevel[0] ?? 1).toFixed(1)}x</span>
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

              <div className="space-y-2">
                <label className="text-sm text-cosmic-300">Rotation</label>
                <div className="text-sm text-cosmic-100">{Math.round(rotationAngle)}°</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 3D Visualization Container */}
      <Card className="sacred-card">
        <CardContent className="p-8">
          <div
            className="relative w-full h-[600px] flex items-center justify-center overflow-hidden"
            style={{
              perspective: '1000px' as const,
              transformStyle: 'preserve-3d' as const
            }}
          >
            <div
              style={{
                transform: `scale(${zoomLevel[0] ?? 1}) rotateY(${rotationAngle}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease-out',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {children}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
