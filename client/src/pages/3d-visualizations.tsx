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
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full transform rotate-45"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-sacred-gold/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          {/* 3D symbols */}
          <div className="absolute top-1/3 right-1/3 flex items-center space-x-2 opacity-20">
            <Atom className="w-8 h-8 text-blue-400" />
            <Layers className="w-8 h-8 text-purple-400" />
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={() => window.history.back()}
              variant="ghost" 
              className="mb-6 text-cosmic-200 hover:text-sacred-gold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="p-4 rounded-full bg-sacred-gold/20 border-2 border-sacred-gold">
                <Atom className="w-12 h-12 text-sacred-gold" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-sacred font-bold text-sacred-gold">
                  3D Visualizations
                </h1>
                <p className="text-xl text-cosmic-100 mt-2">Immersive Consciousness Exploration</p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 text-cosmic-100 leading-relaxed">
              Experience consciousness layers, chakra systems, and energy fields in interactive 3D space
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              {visualizations.map((viz) => (
                <button
                  key={viz.id}
                  onClick={() => setSelectedVisualization(viz.id)}
                  className="text-center hover:scale-105 transition-transform"
                >
                  <div className={`p-4 rounded-full border-2 mx-auto w-16 h-16 flex items-center justify-center mb-4 ${
                    selectedVisualization === viz.id 
                      ? 'border-sacred-gold bg-sacred-gold/20' 
                      : 'border-cosmic-500/30 bg-cosmic-500/10'
                  }`}>
                    <div className={selectedVisualization === viz.id ? 'text-sacred-gold' : 'text-cosmic-400'}>
                      {viz.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{viz.title}</h3>
                  <p className="text-cosmic-300 text-xs mb-2 line-clamp-2">{viz.description}</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {viz.features.slice(0, 1).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs border-cosmic-500/30">
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

      {/* System Requirements */}
      <section className="py-8 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Card className="sacred-card mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                System Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {systemRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div className="text-cosmic-400">
                      {req.icon}
                    </div>
                    <span className="text-cosmic-200">{req.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-200 text-sm">
                  <Eye className="w-4 h-4 inline mr-2" />
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