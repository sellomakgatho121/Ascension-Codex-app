import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  Heart,
  Zap,
  Search,
  Users,
  Play,
  TrendingUp,
  Shield,
  BookOpen,
  Compass,
  Target,
  Atom,
  Brain,
  Timer,
  Sparkles,
  Settings,
  Eye,
  Star,
  Sun,
  Mic,
  Headphones,
  Music,
  Accessibility
} from "lucide-react";
import { AccessibilitySettings } from "@/components/accessibility-settings";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("protection");
  const [_, setLocation] = useLocation();

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full transform rotate-45"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-gold opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="p-4 bg-sacred-gold/20 rounded-full border border-sacred-gold/50">
              <Settings className="w-12 h-12 text-sacred-gold" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold"
          >
            Spiritual Development Tools
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed"
          >
            Comprehensive toolkit for spiritual protection, meditation, audio healing, and consciousness development
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <Badge variant="outline" className="border-sacred-gold text-sacred-gold px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Protection Tools
            </Badge>
            <Badge variant="outline" className="border-cosmic-400 text-cosmic-400 px-4 py-2">
              <Timer className="w-4 h-4 mr-2" />
              Meditation Center
            </Badge>
            <Badge variant="outline" className="border-green-400 text-green-400 px-4 py-2">
              <Music className="w-4 h-4 mr-2" />
              Audio Healing
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Tools Interface */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-cosmic-700/50">
              <TabsTrigger value="protection" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Protection</span>
              </TabsTrigger>
              <TabsTrigger value="meditation" className="flex items-center space-x-2">
                <Timer className="w-4 h-4" />
                <span>Meditation</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center space-x-2">
                <Headphones className="w-4 h-4" />
                <span>Audio Healing</span>
              </TabsTrigger>
              <TabsTrigger value="development" className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Development</span>
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="flex items-center space-x-2">
                <Accessibility className="w-4 h-4" />
                <span>Accessibility</span>
              </TabsTrigger>
            </TabsList>

            {/* Protection Tools Tab */}
            <TabsContent value="protection" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass-card h-full border-sacred-gold/20 hover:border-sacred-gold/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-sacred-gold group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] transition-all" />
                        <span className="text-sacred-gold">12D Shield</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Create a protective energy shield using 12th dimensional frequency.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/meditation')}
                        className="w-full bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900 font-medium"
                      >
                        Activate Shield
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass-card h-full border-blue-500/20 hover:border-blue-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all" />
                        <span className="text-blue-400">Energy Clearing</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Clear negative energy attachments and restore energetic balance.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/psychic-self-defense')}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                      >
                        Start Clearing
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass-card h-full border-purple-500/20 hover:border-purple-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all" />
                        <span className="text-purple-400">Entity Detection</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Scan for and identify unwanted spiritual entities or attachments.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/beings-entities')}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white"
                      >
                        Scan Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Meditation Tools Tab */}
            <TabsContent value="meditation" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass-card h-full border-green-500/20 hover:border-green-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Timer className="w-5 h-5 text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] transition-all" />
                        <span className="text-green-400">Meditation Timer</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Set custom meditation sessions with guided breathing and chimes.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/meditation')}
                        className="w-full bg-green-600 hover:bg-green-500 text-white"
                      >
                        Start Session
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass-card h-full border-pink-500/20 hover:border-pink-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-pink-400 group-hover:drop-shadow-[0_0_8px_rgba(244,114,182,0.5)] transition-all" />
                        <span className="text-pink-400">Heart Center</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Open and balance your heart chakra with guided meditation.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/meditation')}
                        className="w-full bg-pink-600 hover:bg-pink-500 text-white"
                      >
                        Open Heart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass-card h-full border-yellow-500/20 hover:border-yellow-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] transition-all" />
                        <span className="text-yellow-400">Light Body</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Activate and strengthen your light body energy field.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/lightbody')}
                        className="w-full bg-yellow-600 hover:bg-yellow-500 text-white"
                      >
                        Activate Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Audio Healing Tab */}
            <TabsContent value="audio" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass-card h-full border-cyan-500/20 hover:border-cyan-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Music className="w-5 h-5 text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all" />
                        <span className="text-cyan-400">Binaural Beats</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Enhance meditation with precisely calibrated frequency patterns.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/meditation')}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white"
                      >
                        Play Frequencies
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass-card h-full border-orange-500/20 hover:border-orange-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Headphones className="w-5 h-5 text-orange-400 group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.5)] transition-all" />
                        <span className="text-orange-400">Sound Healing</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Therapeutic sound frequencies for chakra alignment and healing.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/meditation')}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white"
                      >
                        Begin Healing
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass-card h-full border-yellow-500/20 hover:border-yellow-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Sun className="w-5 h-5 text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] transition-all" />
                        <span className="text-yellow-400">Solar Frequencies</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Connect with solar consciousness through sacred frequencies.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/meditation')}
                        className="w-full bg-yellow-600 hover:bg-yellow-500 text-white"
                      >
                        Solar Attune
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Development Tools Tab */}
            <TabsContent value="development" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass-card h-full border-red-500/20 hover:border-red-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-red-400 group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.5)] transition-all" />
                        <span className="text-red-400">DNA Activation</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Activate dormant DNA strands for enhanced spiritual abilities.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/lightbody')}
                        className="w-full bg-red-600 hover:bg-red-500 text-white"
                      >
                        Begin Activation
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass-card h-full border-blue-500/20 hover:border-blue-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Atom className="w-5 h-5 text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)] transition-all" />
                        <span className="text-blue-400">Merkaba Field</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Activate your light body vehicle for interdimensional travel.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/3d-visualizations')}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                      >
                        Activate Merkaba
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass-card h-full border-purple-500/20 hover:border-purple-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.5)] transition-all" />
                        <span className="text-purple-400">Starseed Awakening</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Connect with your galactic origins and starseed mission.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/higher-self-evolution')}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white"
                      >
                        Activate Mission
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Analysis Tools Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass-card h-full border-green-500/20 hover:border-green-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Search className="w-5 h-5 text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] transition-all" />
                        <span className="text-green-400">Aura Reading</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Analyze your auric field colors, patterns, and energy flow.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/chakras')}
                        className="w-full bg-green-600 hover:bg-green-500 text-white"
                      >
                        Scan Aura
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass-card h-full border-indigo-500/20 hover:border-indigo-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Compass className="w-5 h-5 text-indigo-400 group-hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] transition-all" />
                        <span className="text-indigo-400">Spiritual Assessment</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Evaluate your current spiritual development and growth areas.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/progress')}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
                      >
                        Take Assessment
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass-card h-full border-teal-500/20 hover:border-teal-500/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-teal-400 group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.5)] transition-all" />
                        <span className="text-teal-400">Timeline Analysis</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-4 text-sm leading-relaxed">
                        Analyze personal timeline and identify optimal ascension path.
                      </p>
                      <Button
                        onClick={() => handleNavigation('/universal-time-matrix')}
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white"
                      >
                        Analyze Timeline
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Accessibility Settings Tab */}
            <TabsContent value="accessibility" className="space-y-6">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <AccessibilitySettings />
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Access Footer */}
      <section className="py-8 bg-cosmic-800/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-cosmic-300 mb-4">Need immediate spiritual guidance?</p>
          <Button
            onClick={() => handleNavigation('/vers')}
            className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900 font-semibold px-8 py-3"
          >
            <Brain className="w-5 h-5 mr-2" />
            Consult VERS AI Assistant
          </Button>
        </div>
      </section>
    </div>
  );
}