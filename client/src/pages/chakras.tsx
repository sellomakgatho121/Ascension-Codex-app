import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { ChakraVisualization } from "@/components/chakra-visualization";
import { EnhancedChakraVisualization } from "@/components/enhanced-chakra-visualization"; // Using ChakraDiagram instead
import { ProgressTracker } from "@/components/progress-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedChakraDiagram } from "@/components/diagrams/enhanced-chakra-diagram";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { chakraData, getChakrasByCategory, type ChakraData } from "@/lib/chakra-data";
import type { SpiritualContent } from "@shared/schema";
import { Atom, Zap, Heart, Crown, BookOpen, Play, Eye, Shield } from "lucide-react";
import { AdvancedSystemGuide } from "@/components/advanced-system-guide";

export default function ChakrasPage() {
  const [selectedChakra, setSelectedChakra] = useState<ChakraData | null>(null);
  const [useEnhancedView, setUseEnhancedView] = useState(false);

  // Fetch spiritual content for chakras
  const { data: chakraContent, isLoading } = useQuery<SpiritualContent[]>({
    queryKey: ["/api/content", { type: "chakra" }],
  });

  const physicalChakras = getChakrasByCategory("physical");
  const morphogeneticChakras = getChakrasByCategory("morphogenetic");
  const avatarChakras = getChakrasByCategory("avatar");

  const handleChakraSelect = (chakra: ChakraData) => {
    setSelectedChakra(chakra);
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full transform rotate-45 sacred-geometry-bg"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
            15-Chakra System
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Spinning energy vortices along the central channel that vitalize the body and consciousness,
            including 7 particle (physical) plus 8 morphogenetic chakras
          </p>
          <div className="flex items-center justify-center space-x-8 text-cosmic-100">
            <div className="flex items-center">
              <Atom className="w-6 h-6 mr-2 text-sacred-gold" />
              <span>15 Energy Centers</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-6 h-6 mr-2 text-sacred-gold" />
              <span>Multi-Dimensional</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-6 h-6 mr-2 text-sacred-gold" />
              <span>Ascension Path</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Chakra Diagram */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Card className="sacred-card mb-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-sacred text-sacred-gold text-center">
                Interactive Chakra System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedChakraDiagram
                selectedChakra={selectedChakra ? String(selectedChakra.id) : null}
                onChakraSelect={(chakraId) => {
                  const chakra = chakraData.find(c => String(c.id) === chakraId);
                  setSelectedChakra(chakra || null);
                }}
                showLabels={true}
                interactive={true}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Chakra Visualization */}
      <section className="py-20 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-6 text-sacred-gold">
              Interactive Chakra Map
            </h2>
            <p className="text-lg text-cosmic-100 max-w-3xl mx-auto">
              Click on any chakra point to explore its role in the human energetic system and ascension process
            </p>
          </div>

          <div className="text-center p-8">
            <p className="text-cosmic-300 mb-4">
              Interactive chakra visualization has been enhanced with the diagram above.
            </p>
            <p className="text-cosmic-400 text-sm">
              Click on any chakra in the diagram to explore its details and spiritual significance.
            </p>
          </div>
        </div>
      </section>

      {/* Chakra Categories */}
      <section className="py-20 bg-gradient-to-b from-cosmic-900 to-cosmic-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-12 text-center text-sacred-gold">
            Chakra Categories
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Physical Chakras */}
            <Card className="sacred-card">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-chakra-root mr-3"></div>
                  <CardTitle className="text-xl font-sacred text-chakra-root">
                    Physical Chakras (1-7)
                  </CardTitle>
                </div>
                <p className="text-cosmic-100">
                  The seven traditional chakras governing physical and emotional aspects of being.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {physicalChakras.map((chakra) => (
                    <li
                      key={chakra.id}
                      className="flex items-center cursor-pointer hover:text-sacred-gold transition-colors duration-300 touch-manipulation"
                      onClick={() => handleChakraSelect(chakra)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleChakraSelect(chakra);
                        }
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: `var(--chakra-${chakra.name.toLowerCase().replace(' chakra', '').replace(' ', '-').replace('plexus', 'plexus').replace('eye', 'eye')})` }}
                      ></div>
                      <span className="text-sm">
                        {chakra.id}. {chakra.name.replace(' Chakra', '')} - {chakra.function}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Morphogenetic Chakras */}
            <Card className="sacred-card">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-chakra-higher mr-3"></div>
                  <CardTitle className="text-xl font-sacred text-chakra-higher">
                    Soul Chakras (8-9)
                  </CardTitle>
                </div>
                <p className="text-cosmic-100">
                  Higher heart and oversoul gateways for monadic integration.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {morphogeneticChakras.slice(0, 2).map((chakra) => (
                    <li
                      key={chakra.id}
                      className="flex items-center cursor-pointer hover:text-sacred-gold transition-colors duration-300 group"
                      onClick={() => handleChakraSelect(chakra)}
                    >
                      <div
                        className="w-3 h-3 rounded-full mr-3 morphogenetic-chakra group-hover:scale-125 transition-transform duration-300"
                        style={{
                          backgroundColor: chakra.id === 8 ? 'hsl(186, 94%, 55%)' : 'hsl(295, 76%, 65%)',
                          boxShadow: `0 0 10px ${chakra.id === 8 ? 'hsl(186, 94%, 55%)' : 'hsl(295, 76%, 65%)'}`,
                          animation: 'morphogeneticPulse 3s ease-in-out infinite'
                        }}
                      ></div>
                      <span className="text-sm text-white">
                        {chakra.id}. {chakra.name.replace(' Chakra', '')} - {chakra.function}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Avatar Chakras */}
            <Card className="sacred-card">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-chakra-solar-star mr-3"></div>
                  <CardTitle className="text-xl font-sacred text-chakra-solar-star">
                    Avatar Chakras (10-15)
                  </CardTitle>
                </div>
                <p className="text-cosmic-100">
                  Higher dimensional gateways to Avatar-Christ consciousness.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {avatarChakras.map((chakra) => (
                    <li
                      key={chakra.id}
                      className="flex items-center cursor-pointer hover:text-sacred-gold transition-colors duration-300 group"
                      onClick={() => handleChakraSelect(chakra)}
                    >
                      <div
                        className="w-3 h-3 rounded-full mr-3 morphogenetic-chakra group-hover:scale-125 transition-transform duration-300"
                        style={{
                          backgroundColor: chakra.id === 10 ? 'hsl(217, 72%, 50%)' :
                            chakra.id === 11 ? 'hsl(280, 65%, 55%)' :
                              chakra.id === 12 ? 'hsl(45, 100%, 75%)' :
                                chakra.id === 13 ? 'hsl(186, 94%, 45%)' :
                                  chakra.id === 14 ? 'hsl(48, 96%, 63%)' :
                                    'hsl(322, 82%, 52%)',
                          boxShadow: `0 0 10px ${chakra.id === 10 ? 'hsl(217, 72%, 50%)' :
                            chakra.id === 11 ? 'hsl(280, 65%, 55%)' :
                              chakra.id === 12 ? 'hsl(45, 100%, 75%)' :
                                chakra.id === 13 ? 'hsl(186, 94%, 45%)' :
                                  chakra.id === 14 ? 'hsl(48, 96%, 63%)' :
                                    'hsl(322, 82%, 52%)'}`,
                          animation: 'morphogeneticPulse 4s ease-in-out infinite'
                        }}
                      ></div>
                      <span className="text-xs text-white">
                        {chakra.id}. {chakra.name.replace(' Chakra', '')}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ascension Process */}
      <section className="py-20 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-12 text-center text-sacred-gold">
              Ascension Integration
            </h2>

            <Card className="cosmic-gradient rounded-3xl border border-sacred-gold/30">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Crown className="w-16 h-16 text-sacred-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-sacred font-bold text-sacred-gold mb-4">
                    The Path of Chakra Mastery
                  </h3>
                </div>

                <div className="space-y-6 text-cosmic-100 leading-relaxed">
                  <p>
                    The 7 physical chakras work with particle energy, while chakras 8-15 (morphogenetic chakras)
                    are antiparticle energy centers. During monadic integration, these antiparticle doubles merge
                    with the physical chakras to form a unified consciousness column, creating the Diamond Sun
                    Merkabah (15D) or Christic Lightbody around the physical form.
                  </p>

                  <p>
                    In ascension, clearing and unifying all 15 chakras restores the 12-strand DNA blueprint and
                    opens all levels of divine Self. This particle-antiparticle merger represents gender unification
                    between male and female principle chakras, supporting the complete unfoldment of Avatar Christ consciousness.
                  </p>

                  <div className="bg-sacred-gold/10 rounded-lg p-6 border border-sacred-gold/20 mt-6">
                    <h4 className="text-lg font-sacred font-bold text-sacred-gold mb-3">
                      Key Functions of the Chakra System:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-sacred-gold mr-3 mt-0.5 flex-shrink-0" />
                        <span>Vitalizing auric and physical bodies</span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-sacred-gold mr-3 mt-0.5 flex-shrink-0" />
                        <span>Developing aspects of self-consciousness and spiritual bodies</span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-sacred-gold mr-3 mt-0.5 flex-shrink-0" />
                        <span>Transmitting energy between dimensional layers</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1 sacred-button">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Advanced Chakra Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl w-[95vw] h-[80vh] p-0 overflow-hidden bg-cosmic-950 border-white/10">
                      <DialogHeader className="sr-only">
                        <DialogTitle>Complete 15-Chakra System Guide</DialogTitle>
                      </DialogHeader>
                      <AdvancedSystemGuide
                        title="Sacred Chakra System"
                        description="The 15-chakra system represents the complete spiritual anatomy necessary for ascension, including 7 physical chakras and 8 morphogenetic chakras."
                        type="chakra"
                        items={chakraData.map(c => ({
                          id: c.id,
                          title: `${c.id}. ${c.name}`,
                          subtitle: `${c.dimension} Frequency`,
                          color: c.color,
                          description: c.description,
                          category: c.category,
                          details: [
                            { label: "Function", value: c.function, icon: Zap },
                            { label: "Location", value: c.location, icon: Eye },
                            { label: "Ascension Purpose", value: c.ascensionPurpose, icon: Crown },
                            { label: "Element", value: c.element || "Ether", icon: Atom }
                          ],
                          practices: c.practices
                        }))}
                      />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 border-sacred-silver text-sacred-silver hover:bg-sacred-silver hover:text-cosmic-900">
                        <Play className="w-4 h-4 mr-2" />
                        Chakra Clearing Practices
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                          <Zap className="w-6 h-6 mr-3" />
                          Chakra Clearing & Activation Practices
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 text-cosmic-100">
                        <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                          <p className="text-sacred-gold font-semibold mb-2">Essential Clearing Techniques</p>
                          <p className="text-sm">These practices clear distortions, activate dormant potentials, and prepare the chakra system for higher dimensional frequencies and ascension consciousness.</p>
                        </div>

                        <div>
                          <h4 className="text-lg font-sacred text-sacred-silver mb-3">Daily Foundation Practice:</h4>
                          <ol className="space-y-3 text-sm">
                            <li className="flex items-start">
                              <span className="bg-sacred-gold text-cosmic-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                              <div>
                                <p className="font-semibold text-sacred-gold">12D Shield Activation</p>
                                <p>Always begin with your 12D Shield to protect and stabilize your energy field during chakra work.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-sacred-gold text-cosmic-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                              <div>
                                <p className="font-semibold text-sacred-gold">Sequential Chakra Breathing</p>
                                <p>Breathe golden-white light into each chakra from 1-7, then 8-15. Hold for 3 breaths, visualizing expansion and clearing.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-sacred-gold text-cosmic-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                              <div>
                                <p className="font-semibold text-sacred-gold">Color and Sound Integration</p>
                                <p>Use each chakra's color and corresponding sound (LAM, VAM, RAM, YAM, HAM, OM, SILENCE) to activate and harmonize.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-sacred-gold text-cosmic-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                              <div>
                                <p className="font-semibold text-sacred-gold">Column Integration</p>
                                <p>Visualize all 15 chakras as unified column of light. Feel the central channel (sushumna) as pure crystalline tube.</p>
                              </div>
                            </li>
                          </ol>
                        </div>

                        <Separator className="bg-cosmic-700" />

                        <div>
                          <h4 className="text-lg font-sacred text-sacred-silver mb-3">Advanced Clearing Techniques:</h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="border border-cosmic-600 rounded-lg p-4">
                              <h5 className="font-semibold text-sacred-gold mb-2">Emotional Clearing (Heart Chakra)</h5>
                              <ul className="space-y-1 text-xs text-cosmic-300">
                                <li>• Place hands on heart, breathe green-pink light</li>
                                <li>• Send forgiveness to all past hurts and relationships</li>
                                <li>• Invoke: "I release all that does not serve love"</li>
                                <li>• Feel heart expanding with unconditional love</li>
                              </ul>
                            </div>

                            <div className="border border-cosmic-600 rounded-lg p-4">
                              <h5 className="font-semibold text-sacred-gold mb-2">Throat Chakra Expression</h5>
                              <ul className="space-y-1 text-xs text-cosmic-300">
                                <li>• Practice speaking your truth in safe environments</li>
                                <li>• Chant HAM or OM to open blocked energy</li>
                                <li>• Journal unexpressed emotions and thoughts</li>
                                <li>• Ask: "What truth wants to be spoken through me?"</li>
                              </ul>
                            </div>

                            <div className="border border-cosmic-600 rounded-lg p-4">
                              <h5 className="font-semibold text-sacred-gold mb-2">Third Eye Activation</h5>
                              <ul className="space-y-1 text-xs text-cosmic-300">
                                <li>• Gaze at indigo light between eyebrows</li>
                                <li>• Practice meditation and inner vision development</li>
                                <li>• Ask for divine guidance and intuitive downloads</li>
                                <li>• Clear mental programming and illusions</li>
                              </ul>
                            </div>

                            <div className="border border-cosmic-600 rounded-lg p-4">
                              <h5 className="font-semibold text-sacred-gold mb-2">Crown Chakra Opening</h5>
                              <ul className="space-y-1 text-xs text-cosmic-300">
                                <li>• Visualize violet-white light pouring from above</li>
                                <li>• Surrender ego control to divine will</li>
                                <li>• Practice devotion and spiritual service</li>
                                <li>• Connect to your higher self and Avatar consciousness</li>
                              </ul>
                            </div>

                            <div className="border border-cosmic-600 rounded-lg p-4">
                              <h5 className="font-semibold text-sacred-gold mb-2">Morphogenetic Integration</h5>
                              <ul className="space-y-1 text-xs text-cosmic-300">
                                <li>• Work with chakras 8-15 in meditation</li>
                                <li>• Call in your Avatar Self and monadic consciousness</li>
                                <li>• Practice merkaba activation and spinning</li>
                                <li>• Connect to Krystal Star and Christos frequencies</li>
                              </ul>
                            </div>

                            <div className="border border-cosmic-600 rounded-lg p-4">
                              <h5 className="font-semibold text-sacred-gold mb-2">Energy Maintenance</h5>
                              <ul className="space-y-1 text-xs text-cosmic-300">
                                <li>• Daily grounding in nature and Earth connection</li>
                                <li>• Adequate hydration and light-based nutrition</li>
                                <li>• Regular energy field clearing and protection</li>
                                <li>• Sacred movement, yoga, or qigong practice</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                          <p className="text-xs text-cosmic-300">
                            <strong>Practice Schedule:</strong> Begin with 15-20 minutes daily focusing on chakras 1-7. As you develop sensitivity, gradually include morphogenetic chakras 8-15. Advanced practitioners maintain continuous chakra awareness throughout daily activities.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="py-20 bg-gradient-to-b from-cosmic-900 to-cosmic-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-6 text-sacred-gold">
              Your Chakra Development
            </h2>
            <p className="text-lg text-cosmic-100 max-w-3xl mx-auto">
              Track your progress through the chakra system and spiritual development
            </p>
          </div>

          <ProgressTracker userId={1} />
        </div>
      </section>
    </div>
  );
}
