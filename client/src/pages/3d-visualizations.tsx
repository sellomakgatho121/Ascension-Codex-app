import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Note: Advanced 3D visualizations available in the main Tools page
// This page provides basic visualization previews and system requirements
import { 
  ArrowLeft, 
  Layers, 
  Heart, 
  Star, 
  Atom,
  Eye,
  Zap,
  Settings,
  Monitor,
  Wifi
} from "lucide-react";
import { ChakraVisualization } from "@/components/chakra-visualization";
import { HovaShields } from "@/components/hova-shields";
import { SacredGeometryBg } from "@/components/sacred-geometry-bg";
import { EnergyFieldScanner3D } from "@/components/energy-field-scanner-3d";

export default function Visualizations3DPage() {
  const [selectedVisualization, setSelectedVisualization] = useState("chakra-system");
  const [selectedChakra, setSelectedChakra] = useState<any>(null);
  const [selectedShield, setSelectedShield] = useState<any>(null);

  const visualizations = [
    {
      id: 'chakra-system',
      title: '15-Chakra System',
      description: 'Interactive 3D visualization of the complete 15-chakra system with energy dynamics',
      icon: <Heart className="w-5 h-5" />,
      component: <ChakraVisualization selectedChakra={selectedChakra} onChakraSelect={setSelectedChakra} />,
      features: ['15 Chakra System', 'Energy Dynamics', 'Interactive Selection', '3D Rotation']
    },
    {
      id: 'hova-shields',
      title: 'Hova Shields',
      description: 'Five electromagnetic shield layers protecting and structuring the lightbody',
      icon: <Layers className="w-5 h-5" />,
      component: <HovaShields selectedShield={selectedShield} onShieldSelect={setSelectedShield} />,
      features: ['5 Shield Layers', 'Energy Protection', 'Dimensional Integration', 'Morphogenetic Field']
    },
    {
      id: 'aura-field',
      title: 'Aura Energy Field',
      description: 'Seven-layer electromagnetic aura visualization with energy intensity controls',
      icon: <Zap className="w-5 h-5" />,
      component: <EnergyFieldScanner3D />,
      features: ['7 Aura Layers', 'Energy Intensity', 'Real-time Rotation', 'Glow Effects']
    },
    {
      id: 'sacred-geometry',
      title: 'Sacred Geometry',
      description: 'Animated sacred geometric patterns including flower of life and merkaba',
      icon: <Star className="w-5 h-5" />,
      component: <SacredGeometryBg intensity="high" />,
      features: ['Flower of Life', 'Merkaba', 'Animated Patterns', 'Energy Responsive']
    }
  ];

  const systemRequirements = [
    { icon: <Monitor className="w-4 h-4" />, label: 'Desktop/Laptop Recommended' },
    { icon: <Wifi className="w-4 h-4" />, label: 'Stable Internet Connection' },
    { icon: <Zap className="w-4 h-4" />, label: 'Hardware Acceleration Enabled' },
    { icon: <Eye className="w-4 h-4" />, label: 'WebGL Support Required' }
  ];

  return (
    <div className="min-h-screen bg-anti-bg text-anti-static font-anti-mono">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-anti-acid/[0.02] blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-anti-neon/[0.02] blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={() => window.history.back()}
              variant="ghost" 
              className="mb-6 text-anti-static/40 hover:text-anti-acid rounded-none border border-transparent hover:border-anti-acid/30 tracking-widest uppercase text-xs"
            >
              <ArrowLeft className="w-3 h-3 mr-2" />
              BACK_TO_TOOLS
            </Button>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="p-3 bg-anti-void/60 border border-anti-acid/20">
                <Atom className="w-8 h-8 text-anti-acid" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-anti-display tracking-[0.1em] text-anti-static uppercase">
                  3D VISUALIZATIONS
                </h1>
                <p className="text-sm text-anti-acid/60 mt-2 tracking-widest uppercase font-anti-mono">Immersive Consciousness Exploration</p>
              </div>
            </div>
            
            <p className="text-sm md:text-base mb-8 text-anti-static/40 leading-relaxed max-w-2xl mx-auto border-l-2 border-anti-acid/20 pl-4 text-left">
              Experience consciousness layers, chakra systems, and energy fields in interactive 3D space
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              {visualizations.map((viz) => (
                <button
                  key={viz.id}
                  onClick={() => setSelectedVisualization(viz.id)}
                  className={`text-left border p-4 transition-all duration-300 ${
                    selectedVisualization === viz.id 
                      ? 'border-anti-acid bg-anti-acid/10' 
                      : 'border-anti-acid/10 bg-anti-void/40 hover:border-anti-acid/30'
                  }`}
                >
                  <div className={`w-10 h-10 border flex items-center justify-center mb-4 transition-colors ${
                    selectedVisualization === viz.id 
                      ? 'border-anti-acid text-anti-acid' 
                      : 'border-anti-acid/20 text-anti-static/40'
                  }`}>
                    {viz.icon}
                  </div>
                  <h3 className="text-xs font-anti-mono tracking-widest text-anti-static uppercase mb-2">{viz.title}</h3>
                  <p className="text-anti-static/30 text-[10px] mb-3 line-clamp-2 leading-relaxed">{viz.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {viz.features.slice(0, 1).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-[9px] border-anti-acid/20 text-anti-acid/60 rounded-none uppercase">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-anti-bg border-t border-anti-acid/10">
        <div className="container mx-auto px-4">
          <Card className="border border-anti-acid/10 bg-anti-void/60 rounded-none mb-8">
            <CardHeader className="border-b border-anti-acid/10 bg-anti-void/40 p-4">
              <CardTitle className="text-sm font-anti-mono tracking-widest text-anti-acid uppercase flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                SYSTEM_REQUIREMENTS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {systemRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-3 text-xs">
                    <div className="text-anti-acid/60">
                      {req.icon}
                    </div>
                    <span className="text-anti-static/60 uppercase tracking-wide">{req.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 border border-anti-acid/20 bg-anti-acid/5 flex items-start">
                <Eye className="w-4 h-4 text-anti-acid mr-3 mt-0.5 shrink-0" />
                <p className="text-anti-acid/70 text-xs leading-relaxed uppercase tracking-wider">
                  For optimal experience, use a desktop or laptop with hardware-accelerated graphics.
                  Mobile devices may experience reduced performance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Visualization Display */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {visualizations.map(viz => (
              <div
                key={viz.id}
                className={`transition-all duration-300 ${selectedVisualization === viz.id ? 'block' : 'hidden'}`}
              >
                <Card className="sacred-card mb-6">
                  <CardHeader>
                    <CardTitle className="text-2xl font-sacred text-sacred-gold">
                      {viz.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-100 mb-6">{viz.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {viz.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-center py-2 border-sacred-gold/30 text-cosmic-100">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="sacred-card min-h-96">
                  <CardContent className="p-6">
                    {viz.component}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="py-12 bg-cosmic-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-sacred-gold text-center mb-8">How to Use 3D Visualizations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <h3 className="font-semibold text-white mb-2">Navigate</h3>
                  <p className="text-cosmic-300 text-sm">
                    Click and drag to rotate the view. Scroll to zoom in and out. Use controls to adjust settings.
                  </p>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                  <h3 className="font-semibold text-white mb-2">Interact</h3>
                  <p className="text-cosmic-300 text-sm">
                    Click on individual consciousness layers or chakras to focus and learn more about their properties.
                  </p>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Settings className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                  <h3 className="font-semibold text-white mb-2">Customize</h3>
                  <p className="text-cosmic-300 text-sm">
                    Adjust energy intensity, visualization scale, and enable different viewing modes for your practice.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-sacred-gold text-center mb-8">Related Spiritual Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 mx-auto mb-4 text-pink-400" />
                  <h3 className="font-semibold text-white mb-2">Chakra Guide</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Detailed information about each chakra
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = '/chakras'}
                  >
                    Explore Chakras
                  </Button>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Layers className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <h3 className="font-semibold text-white mb-2">Lightbody Layers</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Learn about multidimensional anatomy
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = '/lightbody'}
                  >
                    Study Lightbody
                  </Button>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                  <h3 className="font-semibold text-white mb-2">Meditation Tools</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Guided practices for consciousness development
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = '/meditation'}
                  >
                    Practice Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}