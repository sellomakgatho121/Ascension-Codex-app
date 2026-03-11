import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Play, 
  Pause, 
  RefreshCw, 
  Settings, 
  Eye, 
  Zap, 
  Sparkles,
  Circle,
  Hexagon,
  Star
} from "lucide-react";
import { useMobileOptimizations } from "@/hooks/use-mobile-optimizations";

// Creative coding inspired by awesome-creative-coding for spiritual visualization
interface VisualSettings {
  speed: number;
  complexity: number;
  colorIntensity: number;
  particleCount: number;
  enablePhysics: boolean;
  enableAudio: boolean;
  visualMode: 'sacred_geometry' | 'energy_field' | 'chakra_flow' | 'lightbody' | 'fractal_mandala';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'energy' | 'light' | 'sacred' | 'chakra';
}

interface SacredPoint {
  x: number;
  y: number;
  radius: number;
  angle: number;
  frequency: number;
  amplitude: number;
  phase: number;
}

// Sacred geometry constants
const TWO_PI = Math.PI * 2;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // 137.5 degrees

// Chakra colors with enhanced vibrancy
const CHAKRA_COLORS = [
  '#FF0000', // Root - Red
  '#FF7F00', // Sacral - Orange  
  '#FFD700', // Solar Plexus - Golden Yellow
  '#00FF7F', // Heart - Emerald Green
  '#00BFFF', // Throat - Sky Blue
  '#8A2BE2', // Third Eye - Blue Violet
  '#9400D3', // Crown - Violet
  '#FF69B4', // 8th - Pink
  '#00FFFF', // 9th - Cyan
  '#FFE4B5', // 10th - Moccasin
  '#DDA0DD', // 11th - Plum
  '#F0E68C', // 12th - Khaki
  '#E6E6FA', // 13th - Lavender
  '#FFF8DC', // 14th - Cornsilk
  '#FFFFFF'  // 15th - White
];

export function SpiritualVisuals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [settings, setSettings] = useState<VisualSettings>({
    speed: 1,
    complexity: 5,
    colorIntensity: 80,
    particleCount: 100,
    enablePhysics: true,
    enableAudio: false,
    visualMode: 'sacred_geometry'
  });
  
  const [particles, setParticles] = useState<Particle[]>([]);
  const [sacredPoints, setSacredPoints] = useState<SacredPoint[]>([]);
  const [showControls, setShowControls] = useState(false);
  
  const { adaptiveLoading, batteryStatus } = useMobileOptimizations();

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    initializeParticles();
    initializeSacredPoints();
  }, [settings.particleCount, settings.visualMode]);

  // Start/stop animation
  useEffect(() => {
    if (isPlaying && !batteryStatus.isLowBattery) {
      startAnimation();
    } else {
      stopAnimation();
    }

    return () => stopAnimation();
  }, [isPlaying, settings, batteryStatus.isLowBattery]);

  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newParticles: Particle[] = [];
    const count = adaptiveLoading.shouldReduceQuality ? 
      Math.floor(settings.particleCount / 2) : 
      settings.particleCount;

    for (let i = 0; i < count; i++) {
      newParticles.push(createParticle(canvas.offsetWidth, canvas.offsetHeight));
    }
    
    setParticles(newParticles);
  }, [settings.particleCount, adaptiveLoading.shouldReduceQuality]);

  const initializeSacredPoints = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const points: SacredPoint[] = [];
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    
    // Create sacred geometry patterns
    switch (settings.visualMode) {
      case 'sacred_geometry':
        // Flower of Life pattern
        for (let i = 0; i < 19; i++) {
          const angle = (i * TWO_PI) / 19;
          const radius = Math.min(centerX, centerY) * 0.3;
          points.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            radius: 40,
            angle: angle,
            frequency: 0.02,
            amplitude: 10,
            phase: i * 0.1
          });
        }
        break;
        
      case 'chakra_flow':
        // 15 chakra points in vertical alignment
        for (let i = 0; i < 15; i++) {
          const y = (canvas.offsetHeight / 16) * (i + 1);
          points.push({
            x: centerX,
            y: y,
            radius: 30 + (i * 2),
            angle: 0,
            frequency: 0.01 + (i * 0.001),
            amplitude: 15,
            phase: i * 0.2
          });
        }
        break;
        
      case 'energy_field':
        // Spiral energy pattern
        for (let i = 0; i < settings.complexity * 8; i++) {
          const t = i * 0.1;
          const spiral = t * GOLDEN_ANGLE;
          const radius = t * 5;
          points.push({
            x: centerX + Math.cos(spiral) * radius,
            y: centerY + Math.sin(spiral) * radius,
            radius: 8,
            angle: spiral,
            frequency: 0.05,
            amplitude: 5,
            phase: t
          });
        }
        break;
        
      case 'lightbody':
        // Merkaba structure
        const merkabaPoints = [
          { x: centerX, y: centerY - 100 }, // Top
          { x: centerX - 87, y: centerY + 50 }, // Bottom left
          { x: centerX + 87, y: centerY + 50 }, // Bottom right
          { x: centerX, y: centerY + 100 }, // Bottom
          { x: centerX - 87, y: centerY - 50 }, // Top left
          { x: centerX + 87, y: centerY - 50 }, // Top right
        ];
        
        merkabaPoints.forEach((point, i) => {
          points.push({
            x: point.x,
            y: point.y,
            radius: 25,
            angle: (i * TWO_PI) / 6,
            frequency: 0.03,
            amplitude: 20,
            phase: i * 0.3
          });
        });
        break;
        
      case 'fractal_mandala':
        // Fractal mandala pattern
        for (let layer = 1; layer <= settings.complexity; layer++) {
          const pointsInLayer = layer * 8;
          const layerRadius = layer * 40;
          
          for (let i = 0; i < pointsInLayer; i++) {
            const angle = (i * TWO_PI) / pointsInLayer;
            points.push({
              x: centerX + Math.cos(angle) * layerRadius,
              y: centerY + Math.sin(angle) * layerRadius,
              radius: 15 / layer,
              angle: angle,
              frequency: 0.02 * layer,
              amplitude: 8 / layer,
              phase: i * 0.1 + layer * 0.5
            });
          }
        }
        break;
    }
    
    setSacredPoints(points);
  }, [settings.visualMode, settings.complexity]);

  const createParticle = (width: number, height: number): Particle => {
    const types: Particle['type'][] = ['energy', 'light', 'sacred', 'chakra'];
    const typeIndex = Math.floor(Math.random() * types.length);
    const type: Particle['type'] = types[typeIndex] ?? 'energy';
    
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 8 + 2,
      color: type === 'chakra' ? 
        (CHAKRA_COLORS[Math.floor(Math.random() * CHAKRA_COLORS.length)] ?? '#D4AF37') :
        `hsl(${Math.random() * 360}, 70%, ${50 + Math.random() * 30}%)`,
      life: 1,
      maxLife: 100 + Math.random() * 200,
      type
    };
  };

  const updateParticles = useCallback((particles: Particle[], deltaTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return particles;

    return particles.map(particle => {
      // Update position
      particle.x += particle.vx * settings.speed * deltaTime;
      particle.y += particle.vy * settings.speed * deltaTime;
      
      // Apply physics if enabled
      if (settings.enablePhysics) {
        // Gravity and attraction to sacred points
        sacredPoints.forEach(point => {
          const dx = point.x - particle.x;
          const dy = point.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100 * 0.1;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        });
        
        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      }
      
      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.offsetWidth;
      if (particle.x > canvas.offsetWidth) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.offsetHeight;
      if (particle.y > canvas.offsetHeight) particle.y = 0;
      
      // Update life
      particle.life -= deltaTime;
      
      // Respawn if dead
      if (particle.life <= 0) {
        return createParticle(canvas.offsetWidth, canvas.offsetHeight);
      }
      
      return particle;
    });
  }, [settings.speed, settings.enablePhysics, sacredPoints]);

  const drawFrame = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(15, 10, 25, 0.1)';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    
    const deltaTime = 16.67; // ~60fps

    // Update particles
    const updatedParticles = updateParticles(particles, deltaTime);
    setParticles(updatedParticles);
    
    // Draw connections between nearby particles
    if (settings.complexity > 3) {
      ctx.strokeStyle = `rgba(212, 175, 55, ${settings.colorIntensity / 200})`;
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < updatedParticles.length; i++) {
        for (let j = i + 1; j < updatedParticles.length; j++) {
          const p1 = updatedParticles[i];
          const p2 = updatedParticles[j];
          if (!p1 || !p2) continue;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Draw particles
    updatedParticles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, TWO_PI);
      ctx.fill();
    });
    
    // Draw sacred points
    sacredPoints.forEach((point, index) => {
      const time = timestamp * 0.001;
      const animatedX = point.x + Math.cos(time * point.frequency + point.phase) * point.amplitude;
      const animatedY = point.y + Math.sin(time * point.frequency + point.phase) * point.amplitude;
      const animatedRadius = point.radius + Math.sin(time * point.frequency * 2 + point.phase) * 5;
      
      // Draw main point
      const strokeColor = settings.visualMode === 'chakra_flow' && index < 15 ? 
        (CHAKRA_COLORS[index] ?? '#D4AF37') : 
        `rgba(212, 175, 55, ${settings.colorIntensity / 100})`;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(animatedX, animatedY, animatedRadius, 0, TWO_PI);
      ctx.stroke();
      
      // Draw inner glow
      const gradient = ctx.createRadialGradient(
        animatedX, animatedY, 0,
        animatedX, animatedY, animatedRadius
      );
      gradient.addColorStop(0, strokeColor.replace(')', ', 0.3)'));
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    
  }, [particles, sacredPoints, settings, updateParticles]);

  const startAnimation = () => {
    const animate = (timestamp: number) => {
      drawFrame(timestamp);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const resetVisualization = () => {
    setParticles([]);
    initializeParticles();
    initializeSacredPoints();
  };

  const handleSettingChange = (key: keyof VisualSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getTouchClasses = () => {
    const { touchDevice } = useMobileOptimizations();
    return touchDevice.isTouch 
      ? "active:scale-95 transition-transform" 
      : "hover:bg-cosmic-700/50 transition-colors";
  };

  return (
    <div className="min-h-screen mobile-min-vh-fix bg-cosmic-900 text-white p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-4 text-sacred-gold">
            Spiritual Creative Visuals
          </h1>
          <p className="text-xl text-cosmic-100 max-w-3xl mx-auto leading-relaxed mb-4">
            Immersive Sacred Geometry & Energy Field Visualization
          </p>
          
          {/* Status */}
          <div className="flex justify-center gap-4 text-sm">
            <Badge variant="outline" className={`${isPlaying ? 'border-green-400 text-green-400' : 'border-cosmic-400 text-cosmic-400'}`}>
              {isPlaying ? 'Playing' : 'Paused'}
            </Badge>
            <Badge variant="outline" className="border-sacred-gold text-sacred-gold">
              {settings.visualMode.replace('_', ' ').toUpperCase()}
            </Badge>
            <Badge variant="outline" className="border-cosmic-400 text-cosmic-400">
              {particles.length} Particles
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-cosmic-800/50 border-cosmic-600">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-sacred-gold" />
                    <span>Visual Controls</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowControls(!showControls)}
                    className={getTouchClasses()}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Playback Controls */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex-1 ${getTouchClasses()}`}
                    variant={isPlaying ? "default" : "outline"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button
                    onClick={resetVisualization}
                    variant="outline"
                    size="icon"
                    className={getTouchClasses()}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                {/* Visual Mode Selection */}
                <div>
                  <label className="text-sm font-medium text-cosmic-200 mb-3 block">
                    Visualization Mode
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'sacred_geometry', label: 'Sacred Geometry', icon: <Hexagon className="w-4 h-4" /> },
                      { id: 'energy_field', label: 'Energy Field', icon: <Zap className="w-4 h-4" /> },
                      { id: 'chakra_flow', label: 'Chakra Flow', icon: <Circle className="w-4 h-4" /> },
                      { id: 'lightbody', label: 'Lightbody', icon: <Star className="w-4 h-4" /> },
                      { id: 'fractal_mandala', label: 'Fractal Mandala', icon: <Sparkles className="w-4 h-4" /> },
                    ].map((mode) => (
                      <Button
                        key={mode.id}
                        variant={settings.visualMode === mode.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSettingChange('visualMode', mode.id)}
                        className={`justify-start ${getTouchClasses()}`}
                      >
                        {mode.icon}
                        <span className="ml-2 text-xs">{mode.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {showControls && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      {/* Speed Control */}
                      <div>
                        <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                          Animation Speed: {settings.speed.toFixed(1)}x
                        </label>
                        <Slider
                          value={[settings.speed]}
                          onValueChange={([value]) => handleSettingChange('speed', value)}
                          min={0.1}
                          max={3}
                          step={0.1}
                          className="w-full"
                        />
                      </div>

                      {/* Complexity */}
                      <div>
                        <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                          Complexity: {settings.complexity}
                        </label>
                        <Slider
                          value={[settings.complexity]}
                          onValueChange={([value]) => handleSettingChange('complexity', value)}
                          min={1}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Color Intensity */}
                      <div>
                        <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                          Color Intensity: {settings.colorIntensity}%
                        </label>
                        <Slider
                          value={[settings.colorIntensity]}
                          onValueChange={([value]) => handleSettingChange('colorIntensity', value)}
                          min={10}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      {/* Particle Count */}
                      <div>
                        <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                          Particles: {settings.particleCount}
                        </label>
                        <Slider
                          value={[settings.particleCount]}
                          onValueChange={([value]) => handleSettingChange('particleCount', value)}
                          min={50}
                          max={500}
                          step={25}
                          className="w-full"
                        />
                      </div>

                      {/* Physics Toggle */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-cosmic-200">
                          Physics Simulation
                        </label>
                        <Switch
                          checked={settings.enablePhysics}
                          onCheckedChange={(checked) => handleSettingChange('enablePhysics', checked)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Visualization Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <Card className="bg-cosmic-800/50 border-cosmic-600 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full bg-cosmic-900"
                    style={{ 
                      imageRendering: 'pixelated',
                      background: 'radial-gradient(circle at center, #1A1625 0%, #0F0A19 100%)'
                    }}
                  />
                  
                  {/* Overlay Instructions */}
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50"
                    >
                      <div className="text-center">
                        <Play className="w-16 h-16 text-sacred-gold mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-cosmic-100 mb-2">
                          Sacred Geometry Visualization
                        </h3>
                        <p className="text-cosmic-300">
                          Click Play to begin the spiritual visual journey
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}