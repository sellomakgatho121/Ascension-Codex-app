import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  Zap,
  Heart,
  Eye,
  Waves,
  Sparkles,
  RotateCw,
} from 'lucide-react';

interface ProtectionShieldState {
  isActive: boolean;
  strength: number;
  layers: string[];
  lastActivated: string;
}

interface EnergyReading {
  chakra: string;
  frequency: number;
  balance: number;
  blockages: string[];
  recommendations: string[];
}

export function AdvancedSpiritualTools() {
  const [shieldState, setShieldState] = useState<ProtectionShieldState>({
    isActive: false,
    strength: 0,
    layers: [],
    lastActivated: ''
  });

  const [energyReadings, setEnergyReadings] = useState<EnergyReading[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const [activeTool, setActiveTool] = useState<string>('protection');
  const [clearingState, setClearingState] = useState<{
    isClearing: boolean;
    type: string | null;
    progress: number;
  }>({
    isClearing: false,
    type: null,
    progress: 0
  });

  const startClearing = (type: string, title: string) => {
    if (clearingState.isClearing) return;

    setClearingState({ isClearing: true, type, progress: 0 });
    toast({
      title: `${title} Initiated`,
      description: "Beginning energetic clearing protocol...",
    });

    // Simulate clearing process
    const duration = 5000;
    const intervalTime = 100;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, (currentStep / steps) * 100);

      setClearingState(prev => ({ ...prev, progress }));

      if (currentStep >= steps) {
        clearInterval(interval);
        setClearingState({ isClearing: false, type: null, progress: 0 });
        toast({
          title: "Clearing Complete",
          description: `${title} has been successfully completed.`,
        });
      }
    }, intervalTime);
  };

  // 12D Shield Protection Tool
  const activate12DShield = () => {
    setShieldState(prev => ({ ...prev, isActive: true }));

    // Simulate shield building process
    const layers = [
      'Grounding to Earth Core',
      'Connecting to Universal Source',
      'Establishing 12D Hub',
      'Activating Christos Template',
      'Sealing Energy Field',
      'Harmonizing Frequencies'
    ];

    let currentLayer = 0;
    const interval = setInterval(() => {
      if (currentLayer < layers.length) {
        setShieldState(prev => ({
          ...prev,
          strength: Math.min(100, (currentLayer + 1) * 16.67),
          layers: [...prev.layers, layers[currentLayer]!],
          lastActivated: new Date().toLocaleTimeString()
        }));
        currentLayer++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const deactivateShield = () => {
    setShieldState({
      isActive: false,
      strength: 0,
      layers: [],
      lastActivated: ''
    });
  };

  // Energy Field Scanner
  const performEnergyScan = () => {
    setIsScanning(true);
    setEnergyReadings([]);

    const chakras = [
      'Root', 'Sacral', 'Solar Plexus', 'Heart',
      'Throat', 'Third Eye', 'Crown'
    ];

    let scannedCount = 0;
    const scanInterval = setInterval(() => {
      if (scannedCount < chakras.length) {
        const reading: EnergyReading = {
          chakra: chakras[scannedCount],
          frequency: Math.random() * 1000 + 100,
          balance: Math.random() * 100,
          blockages: Math.random() > 0.7 ? ['Energy blockage detected'] : [],
          recommendations: generateRecommendations(chakras[scannedCount])
        };

        setEnergyReadings(prev => [...prev, reading]);
        scannedCount++;
      } else {
        setIsScanning(false);
        clearInterval(scanInterval);
      }
    }, 500);
  };

  const generateRecommendations = (chakra: string): string[] => {
    const recommendations: Record<string, string[]> = {
      'Root': ['Ground with nature', 'Physical exercise', 'Red light meditation'],
      'Sacral': ['Creative expression', 'Orange visualization', 'Hip opening yoga'],
      'Solar Plexus': ['Core strengthening', 'Yellow light work', 'Personal power affirmations'],
      'Heart': ['Heart opening practices', 'Green healing energy', 'Compassion meditation'],
      'Throat': ['Vocal toning', 'Blue light activation', 'Truth speaking exercises'],
      'Third Eye': ['Intuition development', 'Indigo light focus', 'Meditation practice'],
      'Crown': ['Spiritual connection', 'Violet flame work', 'Unity consciousness']
    };
    return recommendations[chakra] || ['General energy work recommended'];
  };

  const getChakraColor = (chakra: string): string => {
    const colors: Record<string, string> = {
      'Root': 'text-red-400',
      'Sacral': 'text-orange-400',
      'Solar Plexus': 'text-yellow-400',
      'Heart': 'text-green-400',
      'Throat': 'text-blue-400',
      'Third Eye': 'text-indigo-400',
      'Crown': 'text-purple-400'
    };
    return colors[chakra] || 'text-cosmic-400';
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTool} onValueChange={setActiveTool} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-cosmic-700/50">
          <TabsTrigger value="protection">Protection</TabsTrigger>
          <TabsTrigger value="scanner">Energy Scanner</TabsTrigger>
          <TabsTrigger value="clearing">Clearing</TabsTrigger>
          <TabsTrigger value="activation">Activation</TabsTrigger>
        </TabsList>

        {/* 12D Shield Protection */}
        <TabsContent value="protection">
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                12D Shield Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`relative w-32 h-32 mx-auto mb-6 ${shieldState.isActive ? 'animate-pulse' : ''}`}>
                  <div className="absolute inset-0 rounded-full border-4 border-sacred-gold/30"></div>
                  <div className="absolute inset-2 rounded-full border-2 border-sacred-silver/20"></div>
                  <div className="absolute inset-4 rounded-full border border-cosmic-400/20"></div>
                  <div className="absolute inset-8 flex items-center justify-center">
                    <Shield className={`w-12 h-12 ${shieldState.isActive ? 'text-sacred-gold' : 'text-cosmic-500'}`} />
                  </div>
                  {shieldState.isActive && (
                    <div className="absolute -inset-2 rounded-full border-2 border-sacred-gold animate-spin opacity-50"></div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-cosmic-300">Shield Strength</span>
                    <span className="text-sacred-gold font-medium">{Math.round(shieldState.strength)}%</span>
                  </div>
                  <Progress value={shieldState.strength} className="h-3" />
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                  <Button
                    onClick={activate12DShield}
                    disabled={shieldState.isActive}
                    className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Activate Shield
                  </Button>
                  <Button
                    variant="outline"
                    onClick={deactivateShield}
                    disabled={!shieldState.isActive}
                    className="border-cosmic-600"
                  >
                    Deactivate
                  </Button>
                </div>

                {shieldState.layers.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h4 className="text-sm font-medium text-cosmic-100">Active Layers:</h4>
                    {shieldState.layers.map((layer, index) => (
                      <div key={index} className="flex items-center text-sm text-cosmic-300">
                        <Sparkles className="w-3 h-3 mr-2 text-sacred-gold" />
                        {layer}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Energy Field Scanner */}
        <TabsContent value="scanner">
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                <Eye className="w-6 h-6 mr-3" />
                Energy Field Scanner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Button
                  onClick={performEnergyScan}
                  disabled={isScanning}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isScanning ? (
                    <>
                      <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Start Energy Scan
                    </>
                  )}
                </Button>
              </div>

              {energyReadings.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">Scan Results:</h4>
                  {energyReadings.map((reading, index) => (
                    <Card key={index} className="border border-cosmic-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className={`font-medium ${getChakraColor(reading.chakra)}`}>
                            {reading.chakra} Chakra
                          </h5>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className={`${reading.balance > 70 ? 'border-green-400 text-green-400' :
                                reading.balance > 40 ? 'border-yellow-400 text-yellow-400' :
                                  'border-red-400 text-red-400'}`}
                            >
                              {Math.round(reading.balance)}% Balance
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-cosmic-300">Frequency:</span>
                            <span className="text-white">{reading.frequency.toFixed(1)} Hz</span>
                          </div>
                          <Progress value={reading.balance} className="h-2" />
                        </div>

                        {reading.blockages.length > 0 && (
                          <div className="mt-3">
                            <span className="text-sm text-red-400">Blockages detected</span>
                          </div>
                        )}

                        <div className="mt-3">
                          <span className="text-sm text-cosmic-300">Recommendations:</span>
                          <ul className="text-sm text-white mt-1 space-y-1">
                            {reading.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-center">
                                <Sparkles className="w-3 h-3 mr-2 text-sacred-gold" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Energy Clearing Tools */}
        <TabsContent value="clearing">
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                <Waves className="w-6 h-6 mr-3" />
                Energy Clearing Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg border border-cosmic-700">
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-400" />
                    Chakra Clearing
                  </h4>
                  <p className="text-sm text-cosmic-300 mb-4">
                    Clear blockages and restore natural energy flow through all chakra centers.
                  </p>
                  <Button
                    variant={clearingState.type === 'chakra' ? "default" : "outline"}
                    className={`w-full ${clearingState.type === 'chakra' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'border-cosmic-600'}`}
                    onClick={() => startClearing('chakra', 'Chakra Clearing')}
                    disabled={clearingState.isClearing}
                  >
                    {clearingState.type === 'chakra' ? `Clearing... ${Math.round(clearingState.progress)}%` : 'Start Clearing Session'}
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-cosmic-700">
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                    Cord Cutting
                  </h4>
                  <p className="text-sm text-cosmic-300 mb-4">
                    Release energetic attachments and restore personal sovereignty.
                  </p>
                  <Button
                    variant={clearingState.type === 'cord' ? "default" : "outline"}
                    className={`w-full ${clearingState.type === 'cord' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'border-cosmic-600'}`}
                    onClick={() => startClearing('cord', 'Cord Cutting')}
                    disabled={clearingState.isClearing}
                  >
                    {clearingState.type === 'cord' ? `Cutting Cords... ${Math.round(clearingState.progress)}%` : 'Begin Cord Cutting'}
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-cosmic-700">
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                    Aura Cleansing
                  </h4>
                  <p className="text-sm text-cosmic-300 mb-4">
                    Purify your energy field and strengthen your auric boundaries.
                  </p>
                  <Button
                    variant={clearingState.type === 'aura' ? "default" : "outline"}
                    className={`w-full ${clearingState.type === 'aura' ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'border-cosmic-600'}`}
                    onClick={() => startClearing('aura', 'Aura Cleansing')}
                    disabled={clearingState.isClearing}
                  >
                    {clearingState.type === 'aura' ? `Cleansing... ${Math.round(clearingState.progress)}%` : 'Cleanse Aura'}
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-cosmic-700">
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-400" />
                    Space Clearing
                  </h4>
                  <p className="text-sm text-cosmic-300 mb-4">
                    Clear and protect your living and working environments.
                  </p>
                  <Button
                    variant={clearingState.type === 'space' ? "default" : "outline"}
                    className={`w-full ${clearingState.type === 'space' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'border-cosmic-600'}`}
                    onClick={() => startClearing('space', 'Space Clearing')}
                    disabled={clearingState.isClearing}
                  >
                    {clearingState.type === 'space' ? `Clearing Space... ${Math.round(clearingState.progress)}%` : 'Clear Space'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DNA Activation Tools */}
        <TabsContent value="activation">
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                <Sparkles className="w-6 h-6 mr-3" />
                DNA Activation & Lightbody Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg border border-cosmic-700">
                  <h4 className="font-medium text-white mb-3">12-Strand DNA Activation</h4>
                  <p className="text-sm text-cosmic-300 mb-4">
                    Activate dormant DNA strands to access higher dimensional consciousness.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-cosmic-300">Activation Progress</span>
                      <span className="text-sacred-gold">3/12 Strands</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full border-cosmic-600">
                    Continue Activation
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-cosmic-700">
                  <h4 className="font-medium text-white mb-3">Merkaba Activation</h4>
                  <p className="text-sm text-cosmic-300 mb-4">
                    Activate your personal light vehicle for interdimensional travel.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-cosmic-300">Merkaba Spin Rate</span>
                      <span className="text-sacred-gold">33% Speed</span>
                    </div>
                    <Progress value={33} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full border-cosmic-600">
                    Activate Merkaba
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-cosmic-700">
                  <h4 className="font-medium text-white mb-3">Lightbody Integration</h4>
                  <p className="text-sm text-cosmic-300 mb-4">
                    Integrate higher frequency light codes into your physical form.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-cosmic-300">Integration Level</span>
                      <span className="text-sacred-gold">Layer 4/7</span>
                    </div>
                    <Progress value={57} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full border-cosmic-600">
                    Continue Integration
                  </Button>
                </div>

                <div className="p-4 rounded-lg border border-cosmic-700">
                  <h4 className="font-medium text-white mb-3">Christos Template</h4>
                  <p className="text-sm text-cosmic-300 mb-4">
                    Activate your divine blueprint for spiritual ascension.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-cosmic-300">Template Activation</span>
                      <span className="text-sacred-gold">Initiating</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full border-cosmic-600">
                    Activate Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}