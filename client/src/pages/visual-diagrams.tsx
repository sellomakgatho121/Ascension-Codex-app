import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChakraVisualization } from "@/components/chakra-visualization";
import { LightbodyDiagram } from "@/components/diagrams/lightbody-diagram";
import { TreeGridDiagram } from "@/components/diagrams/tree-grid-diagram";
import { UTMDiagram } from "@/components/diagrams/universal-time-matrix-diagram";
import { DNAActivationDiagram } from "@/components/diagrams/dna-activation-diagram";
import { MerkabaDiagram } from "@/components/diagrams/merkaba-diagram";
import { AuraLayersDiagram } from "@/components/diagrams/aura-layers-diagram";
import { EnergyCentersDiagram } from "@/components/diagrams/energy-centers-diagram";
import { ProtectionShieldDiagram } from "@/components/diagrams/protection-shield-diagram";
import { EnhancedHumanAnatomy } from "@/components/diagrams/enhanced-human-anatomy";
import { HovaBodiesDiagram } from "@/components/diagrams/hova-bodies-diagram";
import { AxiatonalLinesDiagram } from "@/components/diagrams/axiatonal-lines-diagram";
import { HaraLineDiagram } from "@/components/diagrams/hara-line-diagram";
import { HarmonicUniversesDiagram } from "@/components/diagrams/harmonic-universes-diagram";
import {
  Activity,
  Zap,
  GitBranch,
  Globe,
  Dna,
  Star,
  Layers,
  Target,
  Shield,
  User,
  Box,
  Share2,
  LineChart,
  CircleDot
} from "lucide-react";

export default function VisualDiagrams() {
  const [selectedChakra, setSelectedChakra] = useState<any>(null);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [selectedSphere, setSelectedSphere] = useState<number | null>(null);
  const [selectedHU, setSelectedHU] = useState<string | null>(null);
  const [selectedStrand, setSelectedStrand] = useState<number | null>(null);
  const [selectedAuraLayer, setSelectedAuraLayer] = useState<number | null>(null);
  const [selectedEnergyCenter, setSelectedEnergyCenter] = useState<string | null>(null);
  const [selectedShield, setSelectedShield] = useState<string | null>(null);
  const [selectedHova, setSelectedHova] = useState<string | null>(null);

  const diagramCategories = [
    {
      id: 'consciousness',
      name: 'Consciousness Systems',
      description: 'Interactive diagrams of chakras, lightbody, and consciousness evolution',
      icon: Activity,
      diagrams: ['chakras', 'lightbody', 'tree-grid', 'utm', 'hova-bodies', 'harmonic-universes']
    },
    {
      id: 'energy',
      name: 'Energy & DNA',
      description: 'DNA activation, merkaba, and energy field visualizations',
      icon: Zap,
      diagrams: ['dna', 'merkaba', 'aura', 'energy-centers', 'axiatonal-lines', 'hara-line']
    },
    {
      id: 'protection',
      name: 'Protection & Anatomy',
      description: 'Spiritual protection shields and enhanced human anatomy',
      icon: Shield,
      diagrams: ['protection', 'anatomy']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-950 via-cosmic-900 to-cosmic-800">
      {/* Header */}
      <section className="relative py-24 md:py-32 px-5 text-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-purple-900/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto px-4"
        >
          <div className="mb-8 flex justify-center">
            <Activity className="w-20 h-20 text-sacred-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-sacred font-bold text-transparent bg-clip-text bg-gradient-to-r from-sacred-gold via-white to-sacred-gold mb-8 tracking-tight animate-gradient-x leading-tight">
            Visual Diagrams
          </h1>
          <p className="text-xl md:text-2xl text-cosmic-100 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Interactive visualizations of spiritual systems, consciousness evolution,
            and energetic anatomy based on authentic Energetic Synthesis teachings.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-sacred-gold border-sacred-gold/40 bg-sacred-gold/10 px-5 py-2 text-sm font-semibold tracking-wide">
              Interactive SVG Diagrams
            </Badge>
            <Badge variant="outline" className="text-sacred-gold border-sacred-gold/40 bg-sacred-gold/10 px-5 py-2 text-sm font-semibold tracking-wide">
              Sacred Geometry
            </Badge>
            <Badge variant="outline" className="text-sacred-gold border-sacred-gold/40 bg-sacred-gold/10 px-5 py-2 text-sm font-semibold tracking-wide">
              ES Teachings
            </Badge>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="consciousness" className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-xl flex-wrap justify-center h-auto">
                {diagramCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-950 px-8 py-3 rounded-full transition-all duration-500 font-bold tracking-wide m-1"
                  >
                    <category.icon className="w-4 h-4 mr-2.5" />
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Consciousness Systems */}
            <TabsContent value="consciousness" className="space-y-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-sacred font-bold text-white mb-6">Consciousness Systems</h2>
                <p className="text-cosmic-100 max-w-2xl mx-auto text-lg leading-relaxed">
                  Explore the multidimensional architecture of consciousness through interactive
                  chakra systems, hova bodies, and universal matrices.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* 15-Chakra System */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-sacred-gold/20 mr-4 border border-sacred-gold/30">
                        <Activity className="w-7 h-7 text-sacred-gold" />
                      </div>
                      15-Chakra System
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      Complete chakra system including physical and morphogenetic centers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg aspect-[3/4]">
                      <ChakraVisualization
                        selectedChakra={selectedChakra}
                        onChakraSelect={setSelectedChakra}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Hova Bodies & Radial System */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-purple-500/20 mr-4 border border-purple-500/30">
                        <Box className="w-7 h-7 text-purple-400" />
                      </div>
                      Hova Bodies (Harmonic Shields)
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      The five nested harmonic bodies and their corresponding shields
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <HovaBodiesDiagram 
                        selectedShield={selectedHova}
                        onShieldSelect={setSelectedHova}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Lightbody Layers */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-sacred-display/20 mr-4 border border-sacred-display/30">
                        <Layers className="w-7 h-7 text-sacred-display" />
                      </div>
                      Lightbody Layers
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      Seven electromagnetic frequency layers of consciousness
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <LightbodyDiagram
                        selectedLayer={selectedLayer}
                        onLayerSelect={setSelectedLayer}
                        showFrequencies={true}
                        interactive={true}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* 12-Tree Grid */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-emerald-500/20 mr-4 border border-emerald-500/30">
                        <GitBranch className="w-7 h-7 text-emerald-400" />
                      </div>
                      Kathara Grid (12-Tree Grid)
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      Primary holographic template for multidimensional consciousness
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <TreeGridDiagram
                        selectedSphere={selectedSphere}
                        onSphereSelect={setSelectedSphere}
                        showPaths={true}
                        interactive={true}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Universal Time Matrix */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-indigo-500/20 mr-4 border border-indigo-500/30">
                        <Globe className="w-7 h-7 text-indigo-400" />
                      </div>
                      Universal Time Matrix
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      15-dimensional structure with 5 Harmonic Universes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <UTMDiagram
                        selectedHU={selectedHU}
                        onHUSelect={setSelectedHU}
                        interactive={true}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* 15D Harmonic Universes Map */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-orange-500/20 mr-4 border border-orange-500/30">
                        <CircleDot className="w-7 h-7 text-orange-400" />
                      </div>
                      15D Harmonic Universes
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      Macro-level map of the five nested harmonic universes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <HarmonicUniversesDiagram />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Energy & DNA Systems */}
            <TabsContent value="energy" className="space-y-12 min-h-[600px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-sacred font-bold text-white mb-6">Energy & DNA Systems</h2>
                <p className="text-cosmic-100 max-w-2xl mx-auto text-lg leading-relaxed">
                  Discover DNA activation patterns, merkaba light vehicles, auric fields,
                  and spiritual energy centers.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* 12-Strand DNA Activation */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-red-500/20 mr-4 border border-red-500/30">
                        <Dna className="w-7 h-7 text-red-400" />
                      </div>
                      12-Strand DNA Activation
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      DNA template activation stages and dimensional frequencies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <DNAActivationDiagram
                        selectedStrand={selectedStrand}
                        onStrandSelect={setSelectedStrand}
                        showActivation={true}
                        interactive={true}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Axiatonal Lines */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-cyan-500/20 mr-4 border border-cyan-500/30">
                        <Share2 className="w-7 h-7 text-cyan-400" />
                      </div>
                      Axiatonal Lines
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      The energetic grid system providing frequency to the DNA template
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <AxiatonalLinesDiagram />
                    </div>
                  </CardContent>
                </Card>

                {/* Merkaba Vehicle */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-blue-500/20 mr-4 border border-blue-500/30">
                        <Star className="w-7 h-7 text-blue-400" />
                      </div>
                      Merkaba Light Vehicle
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      Multi-dimensional light body vehicle with counter-rotating fields
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <MerkabaDiagram
                        showRotation={true}
                        showLayers={true}
                        interactive={true}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Aura Layers */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-purple-500/20 mr-4 border border-purple-500/30">
                        <Layers className="w-7 h-7 text-purple-400" />
                      </div>
                      Auric Field Layers
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      Seven auric layers extending from the physical body
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <AuraLayersDiagram
                        selectedLayer={selectedAuraLayer}
                        onLayerSelect={setSelectedAuraLayer}
                        showEnergyFlow={true}
                        interactive={true}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Energy Centers */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-orange-500/20 mr-4 border border-orange-500/30">
                        <Target className="w-7 h-7 text-orange-400" />
                      </div>
                      Spiritual Energy Centers
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      Major energy centers and endocrine system bridges
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <EnergyCentersDiagram
                        selectedCenter={selectedEnergyCenter}
                        onCenterSelect={setSelectedEnergyCenter}
                        showEnergyFlow={true}
                        interactive={true}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* The Hara Line */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-yellow-500/20 mr-4 border border-yellow-500/30">
                        <LineChart className="w-7 h-7 text-yellow-400" />
                      </div>
                      The Hara Line
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      The central laser line of light and its Inner Templar points
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <HaraLineDiagram />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Protection & Anatomy */}
            <TabsContent value="protection" className="space-y-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-sacred font-bold text-white mb-6">Protection & Anatomy</h2>
                <p className="text-cosmic-100 max-w-2xl mx-auto text-lg leading-relaxed">
                  Learn about spiritual protection shields and enhanced human anatomy
                  with golden ratio proportions.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Protection Shields */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-yellow-500/20 mr-4 border border-yellow-500/30">
                        <Shield className="w-7 h-7 text-yellow-500" />
                      </div>
                      Protection Shield Matrix
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      Multi-dimensional protection shields and activation protocols
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <ProtectionShieldDiagram
                        selectedShield={selectedShield}
                        onShieldSelect={setSelectedShield}
                        showActivation={true}
                        interactive={true}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Human Anatomy */}
                <Card className="glass-card overflow-hidden group hover:border-sacred-gold/60 transition-all duration-500 mx-auto w-full max-w-2xl">
                  <CardHeader className="bg-white/5 border-b border-white/10 p-8">
                    <CardTitle className="text-white flex items-center text-2xl font-sacred">
                      <div className="p-3 rounded-xl bg-pink-500/20 mr-4 border border-pink-500/30">
                        <User className="w-7 h-7 text-pink-400" />
                      </div>
                      Enhanced Human Anatomy
                    </CardTitle>
                    <CardDescription className="text-cosmic-200 pl-[72px] text-base">
                      Anatomically accurate human figure with energy channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center">
                    <div className="w-full max-w-lg">
                      <EnhancedHumanAnatomy
                        showChakras={true}
                        showAnatomy={true}
                        showEnergyChannels={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="py-16 md:py-24 px-5 bg-black/40 border-t border-white/5">
        <div className="glass-panel p-10 md:p-16 rounded-3xl max-w-5xl mx-auto border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sacred-gold/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-4xl font-sacred font-bold text-white mb-6 tracking-tight">How to Use Visual Diagrams</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sacred-gold to-transparent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 group">
              <div className="w-16 h-16 bg-sacred-gold/20 text-sacred-gold border border-sacred-gold/40 rounded-2xl mx-auto mb-6 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">1</div>
              <h3 className="text-white text-center font-bold mb-3 text-xl tracking-wide">Explore</h3>
              <p className="text-cosmic-200 text-center text-sm leading-relaxed">Click on different elements to explore detailed information about each spiritual system component.</p>
            </div>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 group">
              <div className="w-16 h-16 bg-sacred-gold/20 text-sacred-gold border border-sacred-gold/40 rounded-2xl mx-auto mb-6 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">2</div>
              <h3 className="text-white text-center font-bold mb-3 text-xl tracking-wide">Learn</h3>
              <p className="text-cosmic-200 text-center text-sm leading-relaxed">Read descriptions and functions to understand how each system contributes to spiritual development.</p>
            </div>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 group">
              <div className="w-16 h-16 bg-sacred-gold/20 text-sacred-gold border border-sacred-gold/40 rounded-2xl mx-auto mb-6 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">3</div>
              <h3 className="text-white text-center font-bold mb-3 text-xl tracking-wide">Practice</h3>
              <p className="text-cosmic-200 text-center text-sm leading-relaxed">Use these visual guides for meditation, energy work, and consciousness development practices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}