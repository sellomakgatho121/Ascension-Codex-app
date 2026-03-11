import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HovaShields } from "@/components/hova-shields";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { hovaShields, type HovaShield } from "@/lib/spiritual-content";
import type { SpiritualContent } from "@shared/schema";
import { Shield, Network, RotateCcw, Zap, TreePine, Eye, BookOpen, Play } from "lucide-react";

export default function HovaBodiesPage() {
  const [selectedShield, setSelectedShield] = useState<HovaShield | null>(null);

  // Fetch spiritual content for hova bodies
  const { data: hovaContent, isLoading } = useQuery<SpiritualContent[]>({
    queryKey: ["/api/content", { type: "hova" }],
  });

  const handleShieldSelect = (shield: HovaShield) => {
    setSelectedShield(shield);
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-cosmic-500 rounded-full transform rotate-45 sacred-geometry-bg"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-gold opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-cosmic-500">
            Hova Bodies
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Horizontal Triad Bodies forming the structural shields of the auric field and 12-Tree Grid
          </p>
          <div className="flex items-center justify-center space-x-8 text-cosmic-100">
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-2 text-cosmic-500" />
              <span>5 Horizontal Shields</span>
            </div>
            <div className="flex items-center">
              <Network className="w-6 h-6 mr-2 text-cosmic-500" />
              <span>Auric Structure</span>
            </div>
            <div className="flex items-center">
              <TreePine className="w-6 h-6 mr-2 text-cosmic-500" />
              <span>12-Tree Grid</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Hova Shields Visualization */}
      <section className="py-20 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-6 text-cosmic-500">
              Five Horizontal Shields
            </h2>
            <p className="text-lg text-cosmic-100 max-w-3xl mx-auto">
              Explore the triad structures that form the horizontal layers of consciousness
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Hova Shields Diagram */}
            <div className="sacred-card p-8">
              <HovaShields
                selectedShield={selectedShield}
                onShieldSelect={handleShieldSelect}
              />
            </div>

            {/* Shield Information */}
            <div className="space-y-6">
              {selectedShield ? (
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                      <Shield className="w-6 h-6 mr-3" />
                      {selectedShield.name}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit border-sacred-silver text-sacred-silver">
                      {selectedShield.dimensions}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-sacred text-sacred-silver mb-2">Shield Function:</h4>
                      <p className="text-cosmic-100 text-sm leading-relaxed">
                        {selectedShield.function}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-sacred text-sacred-silver mb-2">Description:</h4>
                      <p className="text-cosmic-100 text-sm leading-relaxed">
                        {selectedShield.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-sacred text-sacred-silver mb-2">Connected Chakras:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedShield.chakras.map((chakraId) => (
                          <Badge 
                            key={chakraId} 
                            variant="secondary" 
                            className="text-xs bg-cosmic-800 text-cosmic-200"
                          >
                            Chakra {chakraId}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1 border-sacred-gold text-sacred-gold hover:bg-sacred-gold hover:text-cosmic-900">
                            <Eye className="w-4 h-4 mr-2" />
                            Detailed Guide
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                              <Shield className="w-6 h-6 mr-3" />
                              {selectedShield.name} - Complete Guide
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 text-cosmic-100">
                            <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                              <p className="text-sacred-gold font-semibold mb-2">{selectedShield.name} Overview</p>
                              <p className="text-sm">
                                {selectedShield.description} This horizontal triad forms a critical component 
                                of the auric field structure and the 12-Tree Grid's morphogenetic architecture.
                              </p>
                            </div>

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Shield Functions:</h4>
                              <p className="text-sm leading-relaxed mb-4">{selectedShield.function}</p>
                              
                              <div className="space-y-3 text-sm">
                                <div>
                                  <h5 className="font-semibold text-sacred-gold mb-2">Dimensional Integration:</h5>
                                  <p className="text-cosmic-300">
                                    The {selectedShield.name} integrates {selectedShield.dimensions} consciousness 
                                    frequencies, creating horizontal stability across these dimensional planes and 
                                    enabling safe expansion into higher awareness states.
                                  </p>
                                </div>
                                
                                <div>
                                  <h5 className="font-semibold text-sacred-gold mb-2">Chakra Coordination:</h5>
                                  <p className="text-cosmic-300">
                                    This shield coordinates chakras {selectedShield.chakras.join(', ')}, creating 
                                    a horizontal triad that structures the flow of consciousness energy and 
                                    maintains dimensional coherence across these energy centers.
                                  </p>
                                </div>

                                <div>
                                  <h5 className="font-semibold text-sacred-gold mb-2">Ascension Purpose:</h5>
                                  <p className="text-cosmic-300">
                                    {selectedShield.ascensionPurpose} The shield serves as a protective boundary 
                                    while facilitating the integration of higher dimensional frequencies into 
                                    your current embodiment.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <Separator className="bg-cosmic-700" />

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Activation Practices:</h4>
                              <div className="space-y-4 text-sm">
                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Shield Meditation</h5>
                                  <p className="mb-2">Activate the {selectedShield.name} through focused meditation:</p>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Visualize {selectedShield.color.toLowerCase()} light forming a horizontal disk</li>
                                    <li>• Connect chakras {selectedShield.chakras.join(', ')} with light streams</li>
                                    <li>• Feel the triad stabilizing in your auric field</li>
                                    <li>• Hold the activation for 15-20 minutes minimum</li>
                                  </ul>
                                </div>

                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Integration Work</h5>
                                  <p className="mb-2">Integrate the shield into daily consciousness:</p>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Practice awareness of the horizontal energy layer</li>
                                    <li>• Call upon the shield for protection during challenges</li>
                                    <li>• Use shield energy to ground higher dimensional experiences</li>
                                    <li>• Connect with all five shields for complete auric integration</li>
                                  </ul>
                                </div>

                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Advanced Techniques</h5>
                                  <p className="mb-2">Deepen your connection to this shield:</p>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Practice moving consciousness through the dimensional layers</li>
                                    <li>• Work with the rod function to structure energy flow</li>
                                    <li>• Use the shield for timeline healing and integration</li>
                                    <li>• Connect to galactic and cosmic shield frequencies</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                              <p className="text-xs text-cosmic-300">
                                <strong>Integration Note:</strong> Regular work with {selectedShield.name} builds 
                                your capacity to hold {selectedShield.dimensions} frequencies in a stable, 
                                integrated way. This creates the foundation for accessing even higher dimensional 
                                consciousness while maintaining grounding and energetic protection.
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1 border-sacred-silver text-sacred-silver hover:bg-sacred-silver hover:text-cosmic-900">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Shield Practices
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                              <BookOpen className="w-6 h-6 mr-3" />
                              {selectedShield.name} Practices
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 text-cosmic-100">
                            <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                              <p className="text-sacred-gold font-semibold mb-2">Horizontal Shield Work</p>
                              <p className="text-sm">
                                These practices specifically work with the {selectedShield.name} to build your 
                                horizontal triad consciousness and integrate the rod (masculine) function of 
                                your lightbody architecture.
                              </p>
                            </div>

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Core Practices:</h4>
                              <div className="space-y-4 text-sm">
                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Triad Breathing</h5>
                                  <p className="mb-2">Breathe energy through the three connected chakras:</p>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Inhale through chakra {selectedShield.chakras[0]}, hold at chakra {selectedShield.chakras[1]}</li>
                                    <li>• Exhale through chakra {selectedShield.chakras[2]}, creating horizontal flow</li>
                                    <li>• Visualize {selectedShield.color.toLowerCase()} light connecting all three points</li>
                                    <li>• Continue for 12 breath cycles to establish the pattern</li>
                                  </ul>
                                </div>

                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Shield Activation Sequence</h5>
                                  <p className="mb-2">Daily activation practice for the {selectedShield.name}:</p>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Begin with 12D Shield for protection and grounding</li>
                                    <li>• Call forth {selectedShield.color.toLowerCase()} light from cosmic source</li>
                                    <li>• Form horizontal disk at {selectedShield.dimensions} level</li>
                                    <li>• Anchor the shield into your permanent auric structure</li>
                                  </ul>
                                </div>

                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Rod Function Integration</h5>
                                  <p className="mb-2">Activate the masculine structuring principle:</p>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Visualize vertical rod of light through your central channel</li>
                                    <li>• Connect the horizontal {selectedShield.name} to this vertical axis</li>
                                    <li>• Feel the cross-pattern stabilizing your energy field</li>
                                    <li>• Practice holding both horizontal and vertical awareness</li>
                                  </ul>
                                </div>

                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Morphogenetic Field Work</h5>
                                  <p className="mb-2">Connect to the blueprint level of consciousness:</p>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Access the mental body blueprint held in this shield</li>
                                    <li>• Clear distortions in the morphogenetic field patterns</li>
                                    <li>• Restore original divine human template functions</li>
                                    <li>• Integrate healed patterns into physical manifestation</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <Separator className="bg-cosmic-700" />

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Progressive Development:</h4>
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-3">
                                  <div>
                                    <h5 className="font-semibold text-sacred-gold">Beginner Level</h5>
                                    <p className="text-xs">Daily 10-15 minute shield meditation, basic triad breathing, simple protection practices.</p>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-sacred-gold">Intermediate Level</h5>
                                    <p className="text-xs">Extended practice sessions, rod function integration, morphogenetic field clearing work.</p>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <h5 className="font-semibold text-sacred-gold">Advanced Level</h5>
                                    <p className="text-xs">Continuous shield awareness, teaching others, group shield building, cosmic frequency integration.</p>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-sacred-gold">Mastery Level</h5>
                                    <p className="text-xs">Spontaneous shield activation, timeline healing work, galactic connection, planetary service.</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                              <p className="text-xs text-cosmic-300">
                                <strong>Practice Guidance:</strong> Begin with shorter sessions and gradually extend 
                                as your energy field stabilizes. The {selectedShield.name} may take several weeks 
                                or months to fully integrate, so be patient and consistent with your practice.
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="sacred-card">
                  <CardContent className="p-8 text-center">
                    <Shield className="w-16 h-16 mx-auto mb-4 text-sacred-gold opacity-50" />
                    <h3 className="text-xl font-sacred text-sacred-gold mb-2">
                      Select a Shield
                    </h3>
                    <p className="text-cosmic-300">
                      Click on any Hova shield in the diagram to explore its functions, 
                      dimensional connections, and activation practices.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Shield Architecture */}
      <section className="py-20 bg-gradient-to-b from-cosmic-900 to-cosmic-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-12 text-center text-cosmic-500">
            Shield Architecture
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Higher Shields */}
            <div className="space-y-6">
              <h3 className="text-2xl font-sacred font-bold text-sacred-gold mb-6">Higher Shields</h3>
              
              <Card className="sacred-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-sacred text-blue-400">
                      Rishic Shield (13D-14D-15D)
                    </CardTitle>
                    <Badge variant="outline" className="border-blue-400/50 text-blue-400">
                      Cosmic
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-cosmic-100 text-sm leading-relaxed mb-3">
                    The highest triad connecting to Universal Father-Mother-Son consciousness. 
                    Forms the cosmic column foundation.
                  </p>
                  <div className="flex space-x-2">
                    {[13, 14, 15].map((chakraId) => (
                      <div
                        key={chakraId}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white"
                      >
                        {chakraId}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-sacred text-blue-400">
                      Maharata Shield (10D-11D-12D)
                    </CardTitle>
                    <Badge variant="outline" className="border-blue-400/50 text-blue-400">
                      Avatar
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-cosmic-100 text-sm leading-relaxed mb-3">
                    The Avatar mind triad holding the Galactic thrice-fold field. 
                    Connects to Krystal Star frequencies.
                  </p>
                  <div className="flex space-x-2">
                    {[10, 11, 12].map((chakraId) => (
                      <div
                        key={chakraId}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-gray-600 flex items-center justify-center text-xs font-bold text-white"
                      >
                        {chakraId}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-sacred text-purple-400">
                      Teuric Shield (7D-8D-9D)
                    </CardTitle>
                    <Badge variant="outline" className="border-purple-400/50 text-purple-400">
                      Monadic
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-cosmic-100 text-sm leading-relaxed mb-3">
                    The soul/oversoul male line triad. Bridges crown chakra to oversoul connection 
                    and facilitates monadic integration.
                  </p>
                  <div className="flex space-x-2">
                    {[7, 8, 9].map((chakraId) => (
                      <div
                        key={chakraId}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white"
                      >
                        {chakraId}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lower Shields */}
            <div className="space-y-6">
              <h3 className="text-2xl font-sacred font-bold text-sacred-silver mb-6">Foundation Shields</h3>
              
              <Card className="sacred-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-sacred text-green-400">
                      Telluric Shield (4D-5D-6D)
                    </CardTitle>
                    <Badge variant="outline" className="border-green-400/50 text-green-400">
                      Soul Matrix
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-cosmic-100 text-sm leading-relaxed mb-3">
                    The heart-centered triad linked to the interior of the heart. 
                    Enables soul-spirit integration and heart-centered consciousness.
                  </p>
                  <div className="flex space-x-2">
                    {[4, 5, 6].map((chakraId) => (
                      <div
                        key={chakraId}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white"
                      >
                        {chakraId}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-sacred text-yellow-400">
                      Doradic Shield (1D-2D-3D)
                    </CardTitle>
                    <Badge variant="outline" className="border-yellow-400/50 text-yellow-400">
                      Personality
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-cosmic-100 text-sm leading-relaxed mb-3">
                    The ego/personal triad governing the personality structure. 
                    Must be integrated to allow higher soul impulses to flow.
                  </p>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((chakraId) => (
                      <div
                        key={chakraId}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-yellow-600 flex items-center justify-center text-xs font-bold text-white"
                      >
                        {chakraId}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Morphogenetic Field Info */}
              <Card className="cosmic-gradient rounded-2xl border border-cosmic-500/30">
                <CardHeader>
                  <CardTitle className="text-lg font-sacred text-cosmic-500">
                    Morphogenetic Fields
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cosmic-100 text-sm leading-relaxed mb-4">
                    These Hova shields hold the Morphogenetic Field (blueprint) for our mental bodies 
                    and Stations of Identity. They act as the higher male polarity of the auric "tree".
                  </p>
                  <ul className="space-y-2 text-xs text-cosmic-100">
                    <li className="flex items-center">
                      <Network className="w-3 h-3 text-cosmic-500 mr-2" />
                      <span>Structure meridians and axiatonal lines</span>
                    </li>
                    <li className="flex items-center">
                      <RotateCcw className="w-3 h-3 text-cosmic-500 mr-2" />
                      <span>Activate Rod (masculine) function</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="w-3 h-3 text-cosmic-500 mr-2" />
                      <span>Integrate across dimensions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="py-20 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-12 text-center text-cosmic-500">
              Shield Integration & Ascension
            </h2>
            
            <Card className="cosmic-gradient rounded-3xl border border-cosmic-500/30">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Shield className="w-16 h-16 text-cosmic-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-sacred font-bold text-cosmic-500 mb-4">
                    Tree-of-Life Wiring
                  </h3>
                </div>
                
                <div className="space-y-6 text-cosmic-100 leading-relaxed">
                  <p>
                    The Hova Bodies form the horizontal triad structure of the auric field. 
                    Each triad is a set of three chakras across a 45° triad of dimensions, 
                    creating the scaffolding for multidimensional consciousness.
                  </p>
                  
                  <p>
                    Balancing these shields completes the Tree-of-Life wiring and dissolves egotism. 
                    The five Hova shields together form the 12‑Tree Grid's horizontal layers, 
                    creating a stable foundation for higher dimensional activation.
                  </p>
                  
                  <div className="bg-cosmic-500/10 rounded-lg p-6 border border-cosmic-500/20 mt-6">
                    <h4 className="text-lg font-sacred font-bold text-cosmic-500 mb-3">
                      Integration Benefits:
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <Shield className="w-4 h-4 text-cosmic-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Activates the Rod (masculine) function of the lightbody</span>
                      </li>
                      <li className="flex items-start">
                        <Network className="w-4 h-4 text-cosmic-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Structures meridians and energy flow patterns</span>
                      </li>
                      <li className="flex items-start">
                        <RotateCcw className="w-4 h-4 text-cosmic-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Completes Tree-of-Life wiring</span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-cosmic-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Dissolves egotism and enables higher consciousness</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section className="py-20 bg-gradient-to-b from-cosmic-900 to-cosmic-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-12 text-center text-cosmic-500">
            Shield Activation Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-xl font-sacred text-sacred-gold">
                  Foundation Work
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-cosmic-100">
                  <p>• Doradic Shield integration (1D-3D)</p>
                  <p>• Personality structure healing</p>
                  <p>• Ego-soul alignment</p>
                  <p>• Basic survival fear clearing</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full sacred-button mt-4">
                      <Shield className="w-4 h-4 mr-2" />
                      Begin Foundation Work
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                        <Shield className="w-6 h-6 mr-3" />
                        Foundation Shield Work
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 text-cosmic-100">
                      <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                        <p className="text-sacred-gold font-semibold mb-2">Doradic Shield Integration</p>
                        <p className="text-sm">
                          Foundation work begins with the Doradic Shield (1D-2D-3D), which governs the personality 
                          structure and ego patterns. This essential work creates stability for higher shield activation.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-sacred text-sacred-silver mb-3">Core Foundation Practices:</h4>
                        <div className="space-y-4 text-sm">
                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-sacred-gold mb-2">1. Personality Integration</h5>
                            <p className="mb-2">Begin with healing and integrating the lower triad:</p>
                            <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                              <li>• Daily meditation on chakras 1, 2, and 3 for 15-20 minutes</li>
                              <li>• Visualize red, orange, and yellow light connecting horizontally</li>
                              <li>• Address survival fears, emotional wounds, and mental patterns</li>
                              <li>• Practice grounding exercises and physical body awareness</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-sacred-gold mb-2">2. Ego-Soul Alignment</h5>
                            <p className="mb-2">Align the personality with soul purpose:</p>
                            <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                              <li>• Ask daily: "How can I serve my soul's purpose today?"</li>
                              <li>• Practice surrender of ego control and attachment</li>
                              <li>• Develop inner observer consciousness</li>
                              <li>• Cultivate compassion for your human limitations</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-sacred-gold mb-2">3. Telluric Shield Preparation</h5>
                            <p className="mb-2">Prepare for heart-centered consciousness:</p>
                            <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                              <li>• Heart chakra opening and healing practices</li>
                              <li>• Emotional clearing and forgiveness work</li>
                              <li>• Connection to Earth's heart and natural rhythms</li>
                              <li>• Development of unconditional love and compassion</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-sacred-gold mb-2">4. Fear Clearing Protocol</h5>
                            <p className="mb-2">Clear survival fears blocking higher shield access:</p>
                            <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                              <li>• Identify and release core survival fears</li>
                              <li>• Practice 12D Shield for protection during clearing</li>
                              <li>• Use GSF (God-Sovereign-Free) mantras</li>
                              <li>• Invoke spiritual protection and guidance</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-cosmic-700" />

                      <div>
                        <h4 className="text-lg font-sacred text-sacred-silver mb-3">21-Day Foundation Program:</h4>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-sacred-gold">Week 1: Grounding</h5>
                              <p className="text-xs">Daily Doradic Shield meditation, survival fear clearing, physical body healing.</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-sacred-gold">Week 2: Integration</h5>
                              <p className="text-xs">Ego-soul alignment, heart opening, emotional clearing and forgiveness work.</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-sacred-gold">Week 3: Stabilization</h5>
                              <p className="text-xs">Telluric Shield activation, soul matrix connection, prepare for higher shields.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                        <p className="text-xs text-cosmic-300">
                          <strong>Foundation Importance:</strong> Without solid foundation work, higher shield activation 
                          can be unstable or create spiritual crisis. Take time to thoroughly integrate the lower 
                          shields before progressing to monadic and avatar consciousness levels.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-xl font-sacred text-cosmic-500">
                  Advanced Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-cosmic-100">
                  <p>• Maharata Shield activation (10D-12D)</p>
                  <p>• Avatar consciousness integration</p>
                  <p>• Galactic connection establishment</p>
                  <p>• 12D Ray absorption practices</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-cosmic-500 text-cosmic-500 hover:bg-cosmic-500 hover:text-white mt-4">
                      <Network className="w-4 h-4 mr-2" />
                      Advanced Practices
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                        <Network className="w-6 h-6 mr-3" />
                        Advanced Shield Integration
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 text-cosmic-100">
                      <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                        <p className="text-sacred-gold font-semibold mb-2">Maharata Shield & Avatar Consciousness</p>
                        <p className="text-sm">
                          Advanced practices work with the higher shields (Teuric, Maharata, Rishic) to activate 
                          monadic and avatar consciousness. These practices require stable foundation work.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-sacred text-sacred-silver mb-3">Advanced Shield Techniques:</h4>
                        <div className="space-y-4 text-sm">
                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-sacred-gold mb-2">1. Maharata Shield Activation (10D-11D-12D)</h5>
                            <p className="mb-2">Connect to Avatar consciousness and Krystal Star frequencies:</p>
                            <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                              <li>• Meditate on the galactic blue-silver light above your crown</li>
                              <li>• Connect chakras 10, 11, and 12 in horizontal formation</li>
                              <li>• Call upon your Avatar Self and Krystal Star consciousness</li>
                              <li>• Feel the cosmic connection anchoring in your lightbody</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-sacred-gold mb-2">2. 12D Ray Absorption</h5>
                            <p className="mb-2">Work with the twelve founder rays through each shield:</p>
                            <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                              <li>• Call forth each of the 12 Founder Rays sequentially</li>
                              <li>• Absorb each ray frequency through the corresponding shield</li>
                              <li>• Allow the rays to clear distortions and activate DNA</li>
                              <li>• Anchor cosmic frequencies into your cellular structure</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-sacred-gold mb-2">3. Galactic Connection Protocol</h5>
                            <p className="mb-2">Establish connection to galactic consciousness:</p>
                            <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                              <li>• Connect through Maharata Shield to galactic core</li>
                              <li>• Receive transmissions from Krystal Star councils</li>
                              <li>• Download galactic mission and service codes</li>
                              <li>• Integrate cosmic purpose into earthly expression</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-sacred-gold mb-2">4. Teuric Shield Integration (7D-8D-9D)</h5>
                            <p className="mb-2">Activate monadic consciousness and higher self connection:</p>
                            <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                              <li>• Work with violet-flame and higher heart frequencies</li>
                              <li>• Connect to your monadic oversoul identity</li>
                              <li>• Bridge crown chakra to cosmic consciousness</li>
                              <li>• Integrate wisdom teachings from higher dimensions</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-sacred-gold mb-2">5. Complete Shield Integration</h5>
                            <p className="mb-2">Work with all five shields simultaneously:</p>
                            <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                              <li>• Activate all shields in sequence from Doradic to Rishic</li>
                              <li>• Feel the complete auric architecture stabilizing</li>
                              <li>• Experience unified field consciousness</li>
                              <li>• Maintain integrated awareness throughout daily life</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-cosmic-700" />

                      <div>
                        <h4 className="text-lg font-sacred text-sacred-silver mb-3">Advanced Practice Levels:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-sacred-gold">Monadic Integration</h5>
                              <p className="text-xs">Teuric Shield mastery, oversoul connection, crown chakra opening, violet flame work.</p>
                            </div>
                            <div>
                              <h5 className="font-semibold text-sacred-gold">Avatar Embodiment</h5>
                              <p className="text-xs">Maharata Shield activation, cosmic consciousness, Krystal Star connection, mission activation.</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-sacred-gold">Cosmic Integration</h5>
                              <p className="text-xs">Rishic Shield work, universal consciousness, father-mother-son connection, cosmic service.</p>
                            </div>
                            <div>
                              <h5 className="font-semibold text-sacred-gold">Unified Field Mastery</h5>
                              <p className="text-xs">Complete shield integration, continuous cosmic awareness, planetary healing service, teaching others.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-sacred text-sacred-silver mb-3">Prerequisites & Safety:</h4>
                        <div className="bg-cosmic-800/30 rounded-lg p-4 border border-cosmic-600">
                          <ul className="space-y-2 text-sm text-cosmic-300">
                            <li>• <strong>Foundation Required:</strong> Complete Doradic and Telluric Shield integration</li>
                            <li>• <strong>12D Shield Mastery:</strong> Consistent daily protection practice</li>
                            <li>• <strong>Energy Stability:</strong> Ability to ground higher frequencies safely</li>
                            <li>• <strong>Emotional Clarity:</strong> Clear major emotional wounds and trauma</li>
                            <li>• <strong>Service Orientation:</strong> Commitment to serving highest good</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                        <p className="text-xs text-cosmic-300">
                          <strong>Advanced Work Caution:</strong> Higher shield activation can accelerate your 
                          spiritual evolution rapidly. Ensure you have solid foundation work and emotional stability 
                          before proceeding. Work with qualified ES practitioners when possible.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
