import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Eye, 
  Sparkles,
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";
import { 
  SpiritualParticleSystem, 
  SacredGeometryGenerator,
  creativeEngine 
} from "@/lib/creative-coding-engine";
import { speakSpiritualGuidance } from "@/lib/vers-resemble-integration";
import { SpiritualLogger, performanceMonitor } from "@/lib/typescript-enhancements";

// Advanced Spiritual Visualization Component
export function AdvancedSpiritualVisualizations() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<SpiritualParticleSystem | null>(null);
  const geometryCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVisualization, setCurrentVisualization] = useState('chakras');
  const [intensity, setIntensity] = useState([75]);
  const [frequency, setFrequency] = useState([432]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showMetrics, setShowMetrics] = useState(false);
  
  const [metrics, setMetrics] = useState({
    fps: 0,
    particles: 0,
    renderTime: 0,
    memoryUsage: 0
  });

  // Initialize visualization systems
  useEffect(() => {
    if (canvasRef.current && !particleSystemRef.current) {
      try {
        particleSystemRef.current = new SpiritualParticleSystem(canvasRef.current);
        SpiritualLogger.info('Particle system initialized for advanced visualizations');
      } catch (error) {
        SpiritualLogger.error('Failed to initialize particle system', error as Error);
      }
    }

    // Initialize sacred geometry canvas
    if (geometryCanvasRef.current) {
      drawSacredGeometry();
    }

    return () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.stop();
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // Performance monitoring
  useEffect(() => {
    if (isPlaying && showMetrics) {
      const interval = setInterval(() => {
        const performanceMetrics = performanceMonitor.getMetrics();
        setMetrics({
          fps: Math.round(1000 / (performanceMetrics.renderTime || 16)),
          particles: particleSystemRef.current?.['particles']?.length || 0,
          renderTime: performanceMetrics.renderTime,
          memoryUsage: performanceMetrics.memoryUsage
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, showMetrics]);

  // Draw sacred geometry patterns
  const drawSacredGeometry = () => {
    const canvas = geometryCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear canvas with cosmic background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    );
    gradient.addColorStop(0, 'rgba(10, 5, 30, 0.9)');
    gradient.addColorStop(1, 'rgba(2, 1, 10, 1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseSize = Math.min(canvas.width, canvas.height) * 0.15;

    // Draw multiple sacred geometry patterns
    SacredGeometryGenerator.generateFlowerOfLife(ctx, centerX - 200, centerY - 100, baseSize * 0.8);
    SacredGeometryGenerator.generateMetatronsCube(ctx, centerX + 200, centerY - 100, baseSize);
    SacredGeometryGenerator.generateSriYantra(ctx, centerX, centerY + 150, baseSize * 1.2);

    // Add connecting energy lines
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 10]);
    
    ctx.beginPath();
    ctx.moveTo(centerX - 200, centerY - 100);
    ctx.lineTo(centerX + 200, centerY - 100);
    ctx.moveTo(centerX - 200, centerY - 100);
    ctx.lineTo(centerX, centerY + 150);
    ctx.moveTo(centerX + 200, centerY - 100);
    ctx.lineTo(centerX, centerY + 150);
    ctx.stroke();
  };

  // Start visualization
  const startVisualization = async () => {
    if (!particleSystemRef.current || !canvasRef.current) return;

    setIsPlaying(true);
    particleSystemRef.current.start();

    // Add spiritual particles based on current visualization
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;

    switch (currentVisualization) {
      case 'chakras':
        // Create all 7 chakras in a vertical line
        for (let i = 1; i <= 7; i++) {
          const y = centerY - 150 + (i - 1) * 50;
          particleSystemRef.current.createChakraParticles(i, centerX, y);
        }
        
        if (audioEnabled) {
          await speakSpiritualGuidance(
            "Witness the activation of your seven sacred chakras. Feel the energy rising from your root to your crown, opening pathways of light and consciousness.",
            { voiceProfile: 'aurora_divine', energyType: 'nurturing' }
          );
        }
        break;

      case 'dna':
        particleSystemRef.current.createDNAParticles(centerX, centerY - 100, 200);
        
        if (audioEnabled) {
          await speakSpiritualGuidance(
            "Your divine DNA template is activating. The crystalline strands of light are reconnecting to your galactic heritage and cosmic consciousness.",
            { voiceProfile: 'ember_wisdom', energyType: 'mystical' }
          );
        }
        break;

      case 'merkaba':
        particleSystemRef.current.createMerkabaParticles(centerX, centerY);
        
        if (audioEnabled) {
          await speakSpiritualGuidance(
            "Your merkaba light vehicle is spinning into activation. Feel the sacred geometry of divine protection surrounding your energy field.",
            { voiceProfile: 'orion_guardian', energyType: 'protective' }
          );
        }
        break;
    }

    SpiritualLogger.info(`Started ${currentVisualization} visualization`, {
      intensity: intensity[0],
      frequency: frequency[0],
      audioEnabled
    });
  };

  // Stop visualization
  const stopVisualization = () => {
    setIsPlaying(false);
    if (particleSystemRef.current) {
      particleSystemRef.current.stop();
    }
    SpiritualLogger.info('Stopped spiritual visualization');
  };

  // Reset visualization
  const resetVisualization = () => {
    if (particleSystemRef.current) {
      particleSystemRef.current.clear();
    }
    drawSacredGeometry();
    setIsPlaying(false);
    SpiritualLogger.info('Reset spiritual visualization');
  };

  // Visualization configurations
  const visualizations = [
    {
      id: 'chakras',
      name: 'Chakra Activation',
      description: 'Experience the awakening of your seven sacred energy centers',
      color: 'from-red-500 to-violet-500',
      frequency: 432
    },
    {
      id: 'dna',
      name: 'DNA Activation',
      description: 'Witness the crystalline light codes activating your divine template',
      color: 'from-cyan-400 to-yellow-400',
      frequency: 528
    },
    {
      id: 'merkaba',
      name: 'Merkaba Spinning',
      description: 'Sacred geometry light vehicle for dimensional travel and protection',
      color: 'from-yellow-400 to-orange-500',
      frequency: 741
    }
  ];

  return (
    <div className="min-h-screen bg-cosmic-900 text-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-sacred-gold/20 rounded-full border border-sacred-gold/50">
            <Sparkles className="w-8 h-8 text-sacred-gold" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-4 text-sacred-gold">
          Advanced Spiritual Visualizations
        </h1>
        
        <p className="text-xl text-cosmic-100 max-w-3xl mx-auto">
          Experience immersive spiritual visualizations powered by creative coding and advanced TypeScript architecture
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="bg-cosmic-800/50 border-cosmic-600">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Visualization Controls</span>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant={showMetrics ? "default" : "outline"}
                  onClick={() => setShowMetrics(!showMetrics)}
                  className="bg-cosmic-700 border-cosmic-600"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Metrics
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Visualization Type */}
              <div>
                <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                  Visualization Type
                </label>
                <Tabs value={currentVisualization} onValueChange={setCurrentVisualization}>
                  <TabsList className="grid w-full grid-cols-3 bg-cosmic-700">
                    {visualizations.map(viz => (
                      <TabsTrigger 
                        key={viz.id} 
                        value={viz.id}
                        className="text-xs data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900"
                      >
                        {viz.name.split(' ')[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Intensity */}
              <div>
                <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                  Intensity: {intensity[0]}%
                </label>
                <Slider
                  value={intensity}
                  onValueChange={setIntensity}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                  Frequency: {frequency[0]}Hz
                </label>
                <Slider
                  value={frequency}
                  onValueChange={setFrequency}
                  min={100}
                  max={1000}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-cosmic-200">Audio Guidance</label>
                  <Switch 
                    checked={audioEnabled} 
                    onCheckedChange={setAudioEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-cosmic-200">Auto Rotate</label>
                  <Switch 
                    checked={autoRotate} 
                    onCheckedChange={setAutoRotate}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Button
                onClick={isPlaying ? stopVisualization : startVisualization}
                className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900 font-semibold px-6"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
              
              <Button
                onClick={resetVisualization}
                variant="outline"
                className="border-cosmic-600 text-cosmic-200"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>

              <Button
                onClick={() => setAudioEnabled(!audioEnabled)}
                variant="outline"
                className="border-cosmic-600 text-cosmic-200"
              >
                {audioEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Particle System Canvas */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="bg-cosmic-800/50 border-cosmic-600 h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-sacred-gold" />
                <span>Interactive Particle System</span>
                {isPlaying && (
                  <Badge variant="outline" className="border-green-400 text-green-400">
                    Active
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] relative">
              <canvas
                ref={canvasRef}
                className="w-full h-full rounded-lg border border-cosmic-600 bg-cosmic-900"
                style={{ 
                  background: 'radial-gradient(circle at center, rgba(15, 10, 40, 0.9) 0%, rgba(5, 2, 15, 1) 100%)'
                }}
              />
              
              {/* Current Visualization Info */}
              <div className="absolute top-4 left-4 bg-cosmic-800/80 rounded-lg p-3 border border-cosmic-600">
                <div className="text-sm font-medium text-sacred-gold">
                  {visualizations.find(v => v.id === currentVisualization)?.name}
                </div>
                <div className="text-xs text-cosmic-300 mt-1">
                  {visualizations.find(v => v.id === currentVisualization)?.description}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sacred Geometry Canvas */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="bg-cosmic-800/50 border-cosmic-600 h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-sacred-gold" />
                <span>Sacred Geometry Patterns</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <canvas
                ref={geometryCanvasRef}
                className="w-full h-full rounded-lg border border-cosmic-600"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      {showMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-cosmic-800/50 border-cosmic-600">
            <CardHeader>
              <CardTitle>Real-time Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-cosmic-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{metrics.fps}</div>
                  <div className="text-sm text-cosmic-300">FPS</div>
                </div>
                
                <div className="text-center p-4 bg-cosmic-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{metrics.particles}</div>
                  <div className="text-sm text-cosmic-300">Particles</div>
                </div>
                
                <div className="text-center p-4 bg-cosmic-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{metrics.renderTime.toFixed(1)}ms</div>
                  <div className="text-sm text-cosmic-300">Render Time</div>
                </div>
                
                <div className="text-center p-4 bg-cosmic-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{metrics.memoryUsage.toFixed(1)}MB</div>
                  <div className="text-sm text-cosmic-300">Memory</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}