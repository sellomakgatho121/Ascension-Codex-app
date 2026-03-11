import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Scan, 
  Activity, 
  Zap,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Waves,
  Circle,
  Target
} from "lucide-react";

interface EnergyReading {
  chakraId: number;
  name: string;
  frequency: number;
  balance: number;
  blockages: string[];
  vitality: number;
  color: string;
  status: 'clear' | 'minor-blockage' | 'major-blockage' | 'overactive';
}

interface AuraLayer {
  id: string;
  name: string;
  integrity: number;
  color: string;
  thickness: number;
  frequency: number;
  issues: string[];
}

interface ScanResult {
  timestamp: Date;
  overallBalance: number;
  energyLevel: number;
  chakraReadings: EnergyReading[];
  auraLayers: AuraLayer[];
  recommendations: string[];
  scanQuality: number;
}

export function EnergyFieldScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);
  const [selectedChakra, setSelectedChakra] = useState<number | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Simulate energy field scanning
  const performScan = async () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Wait for scan completion
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate scan results  
    const chakraReadings: EnergyReading[] = [
      {
        chakraId: 1,
        name: "Root Chakra",
        frequency: 194.18,
        balance: 75 + Math.random() * 20,
        blockages: Math.random() > 0.7 ? ["Fear patterns", "Survival anxiety"] : [],
        vitality: 70 + Math.random() * 25,
        color: "#E53E3E",
        status: Math.random() > 0.8 ? 'minor-blockage' : 'clear'
      },
      {
        chakraId: 2,
        name: "Sacral Chakra", 
        frequency: 210.42,
        balance: 65 + Math.random() * 30,
        blockages: Math.random() > 0.6 ? ["Emotional blocks", "Creative suppression"] : [],
        vitality: 60 + Math.random() * 35,
        color: "#FF8C00",
        status: Math.random() > 0.7 ? 'minor-blockage' : 'clear'
      },
      {
        chakraId: 3,
        name: "Solar Plexus",
        frequency: 126.22,
        balance: 80 + Math.random() * 15,
        blockages: Math.random() > 0.8 ? ["Power struggles", "Self-doubt"] : [],
        vitality: 75 + Math.random() * 20,
        color: "#FFD700",
        status: 'clear'
      },
      {
        chakraId: 4,
        name: "Heart Chakra",
        frequency: 341.3,
        balance: 85 + Math.random() * 10,
        blockages: [],
        vitality: 85 + Math.random() * 15,
        color: "#48BB78",
        status: 'clear'
      },
      {
        chakraId: 5,
        name: "Throat Chakra",
        frequency: 141.27,
        balance: 70 + Math.random() * 25,
        blockages: Math.random() > 0.7 ? ["Communication blocks"] : [],
        vitality: 65 + Math.random() * 30,
        color: "#4299E1",
        status: Math.random() > 0.6 ? 'minor-blockage' : 'clear'
      },
      {
        chakraId: 6,
        name: "Third Eye",
        frequency: 221.23,
        balance: 60 + Math.random() * 35,
        blockages: Math.random() > 0.5 ? ["Mental fog", "Intuition blocks"] : [],
        vitality: 55 + Math.random() * 40,
        color: "#805AD5",
        status: Math.random() > 0.5 ? 'minor-blockage' : 'clear'
      },
      {
        chakraId: 7,
        name: "Crown Chakra",
        frequency: 172.06,
        balance: 90 + Math.random() * 10,
        blockages: [],
        vitality: 90 + Math.random() * 10,
        color: "#9F7AEA",
        status: 'clear'
      }
    ];

    const auraLayers: AuraLayer[] = [
      {
        id: "etheric",
        name: "Etheric Layer",
        integrity: 80 + Math.random() * 15,
        color: "#E6FFFA",
        thickness: 2 + Math.random(),
        frequency: 7.83,
        issues: Math.random() > 0.7 ? ["Minor tears"] : []
      },
      {
        id: "emotional", 
        name: "Emotional Layer",
        integrity: 70 + Math.random() * 25,
        color: "#FED7D7",
        thickness: 3 + Math.random() * 2,
        frequency: 14.1,
        issues: Math.random() > 0.6 ? ["Emotional residue"] : []
      },
      {
        id: "mental",
        name: "Mental Layer",
        integrity: 75 + Math.random() * 20,
        color: "#FFF5D6",
        thickness: 4 + Math.random() * 2,
        frequency: 28.2,
        issues: Math.random() > 0.8 ? ["Thought patterns"] : []
      }
    ];

    const overallBalance = chakraReadings.reduce((sum, chakra) => sum + chakra.balance, 0) / chakraReadings.length;
    const energyLevel = chakraReadings.reduce((sum, chakra) => sum + chakra.vitality, 0) / chakraReadings.length;

    const newScan: ScanResult = {
      timestamp: new Date(),
      overallBalance,
      energyLevel,
      chakraReadings,
      auraLayers,
      recommendations: generateRecommendations(chakraReadings, auraLayers),
      scanQuality: 85 + Math.random() * 15
    };

    setCurrentScan(newScan);
    setIsScanning(false);
    setScanProgress(0);
  };

  const generateRecommendations = (chakras: EnergyReading[], aura: AuraLayer[]): string[] => {
    const recommendations: string[] = [];
    
    // Chakra-based recommendations
    chakras.forEach(chakra => {
      if (chakra.balance < 70) {
        recommendations.push(`Focus on ${chakra.name} balancing exercises`);
      }
      if (chakra.blockages.length > 0) {
        recommendations.push(`Clear ${chakra.name} blockages: ${chakra.blockages.join(', ')}`);
      }
    });

    // Aura-based recommendations
    aura.forEach(layer => {
      if (layer.integrity < 75) {
        recommendations.push(`Strengthen ${layer.name} through specific healing practices`);
      }
    });

    // General recommendations
    if (recommendations.length === 0) {
      recommendations.push("Continue regular energy maintenance practices");
      recommendations.push("Consider advanced lightbody activation work");
    }

    return recommendations.slice(0, 5);
  };

  // Animate energy visualization
  useEffect(() => {
    if (!currentScan || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw aura layers
      currentScan.auraLayers.forEach((layer, index) => {
        const radius = 50 + (index * 30);
        const alpha = 0.1 + (layer.integrity / 100) * 0.3;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${layer.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = layer.thickness;
        ctx.stroke();
        
        // Animate energy flow
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + time * 0.02;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = layer.color;
          ctx.fill();
        }
      });
      
      // Draw chakra points
      currentScan.chakraReadings.forEach((chakra, index) => {
        const angle = (index / 7) * Math.PI * 2 - Math.PI / 2;
        const radius = 40;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const size = 4 + (chakra.vitality / 100) * 6;
        const pulse = Math.sin(time * 0.1 + index) * 0.5 + 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = chakra.color;
        ctx.fill();
        
        if (selectedChakra === chakra.chakraId) {
          ctx.beginPath();
          ctx.arc(x, y, size + 8, 0, Math.PI * 2);
          ctx.strokeStyle = '#FFD700';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
      
      time++;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentScan, selectedChakra]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clear': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'minor-blockage': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'major-blockage': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'overactive': return <Zap className="w-4 h-4 text-orange-400" />;
      default: return <Circle className="w-4 h-4 text-cosmic-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return 'text-green-400';
      case 'minor-blockage': return 'text-yellow-400';
      case 'major-blockage': return 'text-red-400';
      case 'overactive': return 'text-orange-400';
      default: return 'text-cosmic-400';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
            <Scan className="w-6 h-6 mr-3" />
            Energy Field Scanner
          </CardTitle>
          <p className="text-cosmic-100">
            Advanced energetic analysis of your chakra system and auric field
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            {!isScanning && !currentScan && (
              <div className="space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-cosmic-700 flex items-center justify-center">
                  <Activity className="w-12 h-12 text-cosmic-400" />
                </div>
                <p className="text-cosmic-300">Ready to perform energy field scan</p>
              </div>
            )}
            
            {isScanning && (
              <div className="space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-cosmic-700 flex items-center justify-center animate-pulse">
                  <Waves className="w-12 h-12 text-sacred-gold" />
                </div>
                <div className="space-y-2">
                  <p className="text-cosmic-100">Scanning energy field...</p>
                  <Progress value={scanProgress} className="w-64 mx-auto" />
                  <p className="text-sm text-cosmic-400">{Math.round(scanProgress)}% complete</p>
                </div>
              </div>
            )}
            
            <Button
              onClick={performScan}
              disabled={isScanning}
              className="sacred-button"
              size="lg"
            >
              {isScanning ? (
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Scan className="w-5 h-5 mr-2" />
              )}
              {isScanning ? 'Scanning...' : 'Start Energy Scan'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {currentScan && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-cosmic-700/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chakras">Chakras</TabsTrigger>
            <TabsTrigger value="aura">Aura Field</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="text-lg font-sacred text-sacred-silver">
                    Energy Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={300}
                    className="w-full max-w-sm mx-auto border border-cosmic-600 rounded-lg bg-cosmic-800"
                  />
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="text-lg font-sacred text-sacred-silver">
                    Scan Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sacred-gold">
                        {Math.round(currentScan.overallBalance)}%
                      </div>
                      <div className="text-sm text-cosmic-300">Overall Balance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sacred-gold">
                        {Math.round(currentScan.energyLevel)}%
                      </div>
                      <div className="text-sm text-cosmic-300">Energy Level</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-cosmic-100">Scan Quality</span>
                      <span className="text-sm text-sacred-gold">{Math.round(currentScan.scanQuality)}%</span>
                    </div>
                    <Progress value={currentScan.scanQuality} className="h-2" />
                  </div>
                  
                  <div className="text-xs text-cosmic-400">
                    Scanned: {currentScan.timestamp.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chakras" className="space-y-6">
            <div className="grid gap-4">
              {currentScan.chakraReadings.map((chakra) => (
                <Card 
                  key={chakra.chakraId}
                  className={`sacred-card cursor-pointer transition-all duration-300 ${
                    selectedChakra === chakra.chakraId ? 'border-sacred-gold/60' : 'hover:border-sacred-gold/30'
                  }`}
                  onClick={() => setSelectedChakra(selectedChakra === chakra.chakraId ? null : chakra.chakraId)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: chakra.color }}
                        />
                        <div>
                          <h3 className="font-semibold text-white">{chakra.name}</h3>
                          <div className="flex items-center space-x-2 text-sm">
                            {getStatusIcon(chakra.status)}
                            <span className={getStatusColor(chakra.status)}>
                              {chakra.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <div className="text-sm text-cosmic-300">
                          Balance: <span className="text-sacred-gold">{Math.round(chakra.balance)}%</span>
                        </div>
                        <div className="text-sm text-cosmic-300">
                          Vitality: <span className="text-sacred-gold">{Math.round(chakra.vitality)}%</span>
                        </div>
                        <div className="text-xs text-cosmic-400">
                          {chakra.frequency.toFixed(2)} Hz
                        </div>
                      </div>
                    </div>
                    
                    {selectedChakra === chakra.chakraId && (
                      <div className="mt-4 pt-4 border-t border-cosmic-700 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-cosmic-100 mb-1">Balance</div>
                            <Progress value={chakra.balance} className="h-2" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-cosmic-100 mb-1">Vitality</div>
                            <Progress value={chakra.vitality} className="h-2" />
                          </div>
                        </div>
                        
                        {chakra.blockages.length > 0 && (
                          <div>
                            <div className="text-sm font-medium text-cosmic-100 mb-2">Detected Issues:</div>
                            <div className="space-y-1">
                              {chakra.blockages.map((blockage, index) => (
                                <Badge key={index} variant="outline" className="text-yellow-400 border-yellow-500/30">
                                  {blockage}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="aura" className="space-y-6">
            <div className="grid gap-4">
              {currentScan.auraLayers.map((layer) => (
                <Card key={layer.id} className="sacred-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-6 h-6 rounded-full border-2"
                          style={{ 
                            backgroundColor: layer.color,
                            borderColor: layer.color,
                            opacity: layer.integrity / 100
                          }}
                        />
                        <div>
                          <h3 className="font-semibold text-white">{layer.name}</h3>
                          <div className="text-sm text-cosmic-300">
                            {layer.frequency.toFixed(1)} Hz • {layer.thickness.toFixed(1)}cm thick
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-sacred-gold">
                          {Math.round(layer.integrity)}%
                        </div>
                        <div className="text-sm text-cosmic-300">Integrity</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <Progress value={layer.integrity} className="h-2" />
                      
                      {layer.issues.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {layer.issues.map((issue, index) => (
                            <Badge key={index} variant="outline" className="text-red-400 border-red-500/30">
                              {issue}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-lg font-sacred text-sacred-silver">
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentScan.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-cosmic-700/30">
                      <Target className="w-5 h-5 text-sacred-gold mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-cosmic-100">{recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}