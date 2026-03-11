import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { LightbodyLayers } from "@/components/lightbody-layers"; // Using LightbodyDiagram instead
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LightbodyDiagram } from "@/components/diagrams/lightbody-diagram";
import { InteractiveLightbodyExplorer } from "@/components/interactive-lightbody-explorer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { lightbodyLayers, type LightbodyLayer } from "@/lib/lightbody-data";
import type { SpiritualContent } from "@shared/schema";
import { Layers, Zap, Eye, Brain, Heart, BookOpen, Play, Shield, Star, Activity } from "lucide-react";
import { AdvancedSystemGuide } from "@/components/advanced-system-guide";
import { InteractivePracticeSession } from "@/components/interactive-practice-session";
import { AnimatePresence } from "framer-motion";

export default function LightbodyPage() {
  const [selectedLayer, setSelectedLayer] = useState<LightbodyLayer | null>(null);
  const [activePractice, setActivePractice] = useState<{
    title: string;
    steps: any[];
    color: string;
  } | null>(null);

  // Fetch spiritual content for lightbody
  const { data: lightbodyContent, isLoading } = useQuery<SpiritualContent[]>({
    queryKey: ["/api/content", { type: "lightbody" }],
  });

  const handleLayerSelect = (layer: LightbodyLayer) => {
    setSelectedLayer(layer);
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-white relative">
      <AnimatePresence>
        {activePractice && (
          <InteractivePracticeSession
            title={activePractice.title}
            steps={activePractice.steps}
            color={activePractice.color}
            onComplete={() => setActivePractice(null)}
            onClose={() => setActivePractice(null)}
          />
        )}
      </AnimatePresence>
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-silver rounded-full transform rotate-45 sacred-geometry-bg"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-gold opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-silver">
            Lightbody Layers
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Multiple nested layers of electromagnetic frequencies that carry our consciousness across dimensions
          </p>
          <div className="flex items-center justify-center space-x-8 text-cosmic-100">
            <div className="flex items-center">
              <Layers className="w-6 h-6 mr-2 text-sacred-silver" />
              <span>7 Frequency Layers</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-6 h-6 mr-2 text-sacred-silver" />
              <span>Electromagnetic Fields</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-6 h-6 mr-2 text-sacred-silver" />
              <span>Consciousness Carriers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Lightbody Explorer - New 3D View */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-4 text-sacred-silver">
              3D Lightbody Explorer
            </h2>
            <p className="text-lg text-cosmic-100 max-w-3xl mx-auto">
              Interactive 3D visualization of all seven electromagnetic field layers
            </p>
          </div>
          <InteractiveLightbodyExplorer
            selectedLayerId={selectedLayer?.id || null}
            onLayerSelect={(layer) => setSelectedLayer(layer)}
          />
        </div>
      </section>

      {/* Interactive Lightbody Diagram */}
      <section className="py-12 bg-cosmic-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-4 text-sacred-silver">
              Traditional Diagram View
            </h2>
          </div>
          <Card className="sacred-card mb-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-sacred text-sacred-gold text-center">
                Interactive Lightbody System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LightbodyDiagram
                selectedLayer={selectedLayer?.id || null}
                onLayerSelect={(layerId) => {
                  const layer = lightbodyLayers.find(l => l.id === layerId);
                  setSelectedLayer(layer || null);
                }}
                showFrequencies={true}
                interactive={true}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Lightbody Visualization */}
      <section className="py-20 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-6 text-sacred-silver">
              Auric Field Structure
            </h2>
            <p className="text-lg text-cosmic-100 max-w-3xl mx-auto">
              Explore the nested electromagnetic layers that form your energetic anatomy
            </p>
          </div>

          <div className="text-center p-8">
            <p className="text-cosmic-300 mb-4">
              Interactive lightbody visualization has been enhanced with the diagram above.
            </p>
            <p className="text-cosmic-400 text-sm">
              Explore the seven electromagnetic layers that form your energetic anatomy through the interactive diagram.
            </p>
          </div>
        </div>
      </section>

      {/* Layer Functions */}
      <section className="py-20 bg-gradient-to-b from-cosmic-900 to-cosmic-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-12 text-center text-sacred-silver">
            Dimensional Functions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Etheric Group */}
            <Card className="sacred-card">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                  <CardTitle className="text-xl font-sacred text-red-400">
                    Physical Interface
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div
                    className="p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-red-500/10"
                    onClick={() => handleLayerSelect(lightbodyLayers.find(l => l.id === "etheric")!)}
                  >
                    <h4 className="font-semibold text-red-400 mb-1">Etheric Body</h4>
                    <p className="text-cosmic-100 text-sm">
                      Blueprint for Central Nervous System and organs. Conducts chi/prana through meridians.
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-500/10"
                    onClick={() => handleLayerSelect(lightbodyLayers.find(l => l.id === "etheric_template")!)}
                  >
                    <h4 className="font-semibold text-blue-400 mb-1">Etheric Template</h4>
                    <p className="text-cosmic-100 text-sm">
                      Contains silicate matrix codes for 12-strand DNA activation and light body nutrition.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emotional/Mental Group */}
            <Card className="sacred-card">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Heart className="w-4 h-4 text-orange-400 mr-3" />
                  <CardTitle className="text-xl font-sacred text-orange-400">
                    Psychic Interface
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div
                    className="p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-orange-500/10 touch-manipulation"
                    onClick={() => handleLayerSelect(lightbodyLayers.find(l => l.id === "emotional")!)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLayerSelect(lightbodyLayers.find(l => l.id === "emotional")!);
                      }
                    }}
                  >
                    <h4 className="font-semibold text-orange-400 mb-1">Emotional Body</h4>
                    <p className="text-cosmic-100 text-sm">
                      Realm of dreams, memories and subconscious patterns. Must be cleared of trauma.
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-yellow-500/10 touch-manipulation"
                    onClick={() => handleLayerSelect(lightbodyLayers.find(l => l.id === "mental")!)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLayerSelect(lightbodyLayers.find(l => l.id === "mental")!);
                      }
                    }}
                  >
                    <h4 className="font-semibold text-yellow-400 mb-1">Mental Body</h4>
                    <p className="text-cosmic-100 text-sm">
                      Structure of thoughts and beliefs. Harmonizes by uniting left/right brain.
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-green-500/10 touch-manipulation"
                    onClick={() => handleLayerSelect(lightbodyLayers.find(l => l.id === "astral")!)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLayerSelect(lightbodyLayers.find(l => l.id === "astral")!);
                      }
                    }}
                  >
                    <h4 className="font-semibold text-green-400 mb-1">Astral Body</h4>
                    <p className="text-cosmic-100 text-sm">
                      First level of soul body carrying nascent Soul-Spirit identity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Group */}
            <Card className="sacred-card">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Brain className="w-4 h-4 text-indigo-400 mr-3" />
                  <CardTitle className="text-xl font-sacred text-indigo-400">
                    Divine Interface
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div
                    className="p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-indigo-500/10"
                    onClick={() => handleLayerSelect(lightbodyLayers.find(l => l.id === "celestial")!)}
                  >
                    <h4 className="font-semibold text-indigo-400 mb-1">Celestial Body</h4>
                    <p className="text-cosmic-100 text-sm">
                      6D mind of Spirit. Links Heart feeling with Crown Christ mind.
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-purple-500/10"
                    onClick={() => handleLayerSelect(lightbodyLayers.find(l => l.id === "ketheric")!)}
                  >
                    <h4 className="font-semibold text-purple-400 mb-1">Ketheric Body</h4>
                    <p className="text-cosmic-100 text-sm">
                      7D consciousness holding pure Divine thought patterns and monadic connection.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="py-20 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-12 text-center text-sacred-silver">
              Lightbody Integration
            </h2>

            <Card className="cosmic-gradient rounded-3xl border border-sacred-silver/30">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Layers className="w-16 h-16 text-sacred-silver mx-auto mb-4" />
                  <h3 className="text-2xl font-sacred font-bold text-sacred-silver mb-4">
                    Holographic Energy Matrix
                  </h3>
                </div>

                <div className="space-y-6 text-cosmic-100 leading-relaxed">
                  <p>
                    The human lightbody is a holographic energy matrix that encodes our blueprint and Divine Connection.
                    As Lisa states, it projects our consciousness through a holographic template that generates physical reality.
                  </p>

                  <p>
                    We form multiple "Station of Identity" layers – from the 3D self up through Soul (4D-6D),
                    Oversoul/Monad (7D-9D), to Christos/Founder (10D–15D). These layers overlap and interconnect
                    in a sophisticated multidimensional architecture.
                  </p>

                  <div className="bg-sacred-silver/10 rounded-lg p-6 border border-sacred-silver/20 mt-6">
                    <h4 className="text-lg font-sacred font-bold text-sacred-silver mb-3">
                      Ascension Integration Process:
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-sacred-silver mr-3 mt-0.5 flex-shrink-0" />
                        <span>Removing density from all layers</span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-sacred-silver mr-3 mt-0.5 flex-shrink-0" />
                        <span>Opening chakras and energy channels</span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-sacred-silver mr-3 mt-0.5 flex-shrink-0" />
                        <span>Merging layers from physical/etheric to ketheric</span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-sacred-silver mr-3 mt-0.5 flex-shrink-0" />
                        <span>Integrating all Stations of Identity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Practices Section */}
      <section className="py-20 bg-gradient-to-b from-cosmic-900 to-cosmic-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-12 text-center text-sacred-silver">
            Lightbody Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-xl font-sacred text-sacred-gold">
                  Clearing Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-cosmic-100">
                  <p>• Etheric cleansing and pranic breathing</p>
                  <p>• Emotional clearing and trauma release</p>
                  <p>• Mental body purification</p>
                  <p>• Astral body healing</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full sacred-button mt-4">
                      <Zap className="w-4 h-4 mr-2" />
                      Start Clearing Practice
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl w-[95vw] h-[80vh] p-0 overflow-hidden bg-cosmic-950 border-white/10">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Lightbody Clearing Guide</DialogTitle>
                    </DialogHeader>
                    <AdvancedSystemGuide
                      title="Lightbody Clearing Practices"
                      description="Systematic clearing of distortions from each electromagnetic layer to prepare for higher frequency integration."
                      type="lightbody"
                      items={lightbodyLayers.map(layer => ({
                        id: layer.id,
                        title: layer.name,
                        subtitle: layer.dimension,
                        color: layer.color,
                        description: layer.description,
                        details: [
                          { label: "Key Function", value: layer.function, icon: Activity },
                          { label: "Ascension Goal", value: layer.ascensionPurpose, icon: Star },
                          { label: "Connections", value: layer.connections.join(", "), icon: Layers }
                        ],
                        practices: layer.practices
                      }))}
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-xl font-sacred text-sacred-silver">
                  Integration Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-cosmic-100">
                  <p>• DNA activation and template recalibration</p>
                  <p>• Celestial mind activation</p>
                  <p>• Monadic integration</p>
                  <p>• Station of Identity alignment</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-sacred-silver text-sacred-silver hover:bg-sacred-silver hover:text-cosmic-900 mt-4">
                      <Layers className="w-4 h-4 mr-2" />
                      Begin Integration
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-sacred text-sacred-silver flex items-center">
                        <Star className="w-6 h-6 mr-3" />
                        Lightbody Integration Practices
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 text-cosmic-100">
                      <div className="bg-sacred-silver/10 rounded-lg p-4 border border-sacred-silver/20">
                        <p className="text-sacred-silver font-semibold mb-2">Advanced Integration Techniques</p>
                        <p className="text-sm">These practices integrate cleared lightbody layers into unified consciousness, activating dormant DNA strands and establishing multidimensional awareness.</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-sacred text-sacred-gold mb-3">DNA Activation & Template Recalibration:</h4>
                        <div className="space-y-4 text-sm">
                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-gold mb-2">12-Strand DNA Activation Protocol</h5>
                            <p className="mb-2">Systematic activation of dormant DNA strands through lightbody integration.</p>
                            <ul className="space-y-1 text-xs text-cosmic-300">
                              <li>• Call in your 12D Avatar Self and Krystal Star frequencies</li>
                              <li>• Visualize double helix expanding into 12-strand configuration</li>
                              <li>• Feel each DNA strand connecting to corresponding chakra center</li>
                              <li>• Intend: "I activate my original divine blueprint now"</li>
                              <li>• Practice daily for 21-day activation cycles</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-cyan-400 mb-2">Silicate Matrix Recoding</h5>
                            <p className="mb-2">Replacing carbon-based coding with crystalline silicate matrix.</p>
                            <ul className="space-y-1 text-xs text-cosmic-300">
                              <li>• Breathe liquid light into every cell of your body</li>
                              <li>• Feel density dissolving into crystalline frequency</li>
                              <li>• Command: "I reclaim my silicate matrix divine blueprint"</li>
                              <li>• Visualize body becoming translucent crystalline structure</li>
                              <li>• Integration period: 3-7 years of consistent practice</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-purple-400 mb-2">Merkaba Field Activation</h5>
                            <p className="mb-2">Activating the geometric light vehicle around lightbody layers.</p>
                            <ul className="space-y-1 text-xs text-cosmic-300">
                              <li>• Visualize two counter-rotating tetrahedrons around your body</li>
                              <li>• Spin merkaba clockwise (masculine) and counter-clockwise (feminine)</li>
                              <li>• Feel merkaba expanding to encompass all 7 lightbody layers</li>
                              <li>• Practice: 21 breaths to activate, hold for meditation</li>
                              <li>• Advanced: Travel consciousness through dimensional portals</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-cosmic-700" />

                      <div>
                        <h4 className="text-lg font-sacred text-sacred-gold mb-3">Celestial Mind Activation:</h4>
                        <div className="space-y-4 text-sm">
                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-blue-400 mb-2">Higher Sensory Perception</h5>
                            <p className="mb-2">Developing multidimensional awareness and psychic abilities.</p>
                            <ul className="space-y-1 text-xs text-cosmic-300">
                              <li>• Practice inner vision meditation with third eye activation</li>
                              <li>• Develop clairaudience through crown chakra opening</li>
                              <li>• Cultivate claircognizance via direct knowing reception</li>
                              <li>• Train clairsentience through heart-centered feeling</li>
                              <li>• Record experiences in spiritual development journal</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-green-400 mb-2">Monadic Integration</h5>
                            <p className="mb-2">Connecting with oversoul consciousness and station of identity.</p>
                            <ul className="space-y-1 text-xs text-cosmic-300">
                              <li>• Call in your Monadic Self from 7D-8D-9D planes</li>
                              <li>• Feel expansion beyond individual personality self</li>
                              <li>• Practice: "I am that I am" consciousness meditation</li>
                              <li>• Integrate male/female principle within monadic triad</li>
                              <li>• Embody group consciousness and planetary service</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-pink-400 mb-2">Avatar Christ Integration</h5>
                            <p className="mb-2">Embodying Christos consciousness through all lightbody layers.</p>
                            <ul className="space-y-1 text-xs text-cosmic-300">
                              <li>• Connect to 10D-11D-12D Avatar Self consciousness</li>
                              <li>• Feel Christ consciousness flowing through all layers</li>
                              <li>• Practice unconditional love and compassion for all life</li>
                              <li>• Embody divine service and planetary healing mission</li>
                              <li>• Integration: Living as embodied Avatar in daily life</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-cosmic-700" />

                      <div>
                        <h4 className="text-lg font-sacred text-sacred-gold mb-3">Station of Identity Alignment:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-yellow-400 mb-2">1D-2D-3D: Incarnate Identity</h5>
                            <ul className="space-y-1 text-xs text-cosmic-300">
                              <li>• Physical body consciousness and tribal identity</li>
                              <li>• Emotional-creative self and relationship dynamics</li>
                              <li>• Mental-egoic self and personal achievement</li>
                              <li>• Integration: Healing and clearing lower identity aspects</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-green-400 mb-2">4D-5D-6D: Soul Identity</h5>
                            <ul className="space-y-1 text-xs text-cosmic-300">
                              <li>• Heart-centered consciousness and soul purpose</li>
                              <li>• Higher creative expression and divine communication</li>
                              <li>• Intuitive wisdom and multidimensional awareness</li>
                              <li>• Integration: Embodying soul mission and service</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-purple-400 mb-2">7D-8D-9D: Monadic Identity</h5>
                            <ul className="space-y-1 text-xs text-cosmic-300">
                              <li>• Oversoul consciousness and group identity</li>
                              <li>• Galactic awareness and cosmic citizenship</li>
                              <li>• Universal compassion and planetary healing</li>
                              <li>• Integration: Living as expanded group consciousness</li>
                            </ul>
                          </div>

                          <div className="border border-cosmic-600 rounded-lg p-4">
                            <h5 className="font-semibold text-gold mb-2">10D-11D-12D: Avatar Identity</h5>
                            <ul className="space-y-1 text-xs text-cosmic-300">
                              <li>• Christ consciousness and solar logos awareness</li>
                              <li>• Galactic logos and universal logos connection</li>
                              <li>• Cosmic Avatar embodiment and divine service</li>
                              <li>• Integration: Living as embodied Christos-Sophia</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-silver">
                        <p className="text-xs text-cosmic-300">
                          <strong>Integration Timeline:</strong> Lightbody integration occurs in 7-year cycles. First cycle clears and activates basic layers. Second cycle integrates monadic consciousness. Third cycle embodies Avatar Christ consciousness.
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
