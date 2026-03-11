import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
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
  Music
} from "lucide-react";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("protection");

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold"
          >
            Spiritual Tools
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed"
          >
            Complete toolkit for spiritual development, protection, and consciousness expansion
          </motion.p>
          
          <div className="flex justify-center space-x-4 text-sm">
            <Badge variant="outline" className="border-sacred-gold text-sacred-gold">
              12D Shield Active
            </Badge>
            <Badge variant="outline" className="border-cosmic-400 text-cosmic-400">
              Voice Integration
            </Badge>
            <Badge variant="outline" className="border-green-400 text-green-400">
              Enhanced Tools
            </Badge>
          </div>
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
            </TabsList>

            {/* Protection Tools */}
            <TabsContent value="protection" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-sacred-gold" />
                      <span>12D Shield</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Primary protection technique for spiritual safety and energy field integrity.
                    </p>
                    <Button className="w-full bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80">
                      Activate 12D Shield
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-cosmic-400" />
                      <span>Entity Clearing</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Remove unwanted entities and attachments from your energy field.
                    </p>
                    <Button className="w-full bg-cosmic-600 text-cosmic-100 hover:bg-cosmic-500">
                      Clear Entities
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-purple-400" />
                      <span>Violet Flame</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Transmute negative energy and karma with violet flame technique.
                    </p>
                    <Button className="w-full bg-purple-600 text-white hover:bg-purple-500">
                      Invoke Violet Flame
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Audio Healing Tools */}
            <TabsContent value="audio" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Headphones className="w-5 h-5 text-sacred-gold" />
                      <span>Binaural Beats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Advanced frequency therapy with chakra-specific binaural beats for deep healing.
                    </p>
                    <Button className="w-full bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80">
                      <Play className="w-4 h-4 mr-2" />
                      Start Session
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mic className="w-5 h-5 text-blue-400" />
                      <span>Voice Healing</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Vocal toning and mantras for chakra activation and energy clearing.
                    </p>
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-500">
                      <Mic className="w-4 h-4 mr-2" />
                      Voice Session
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Music className="w-5 h-5 text-green-400" />
                      <span>Solfeggio Frequencies</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Sacred frequencies (396Hz, 528Hz, 741Hz) for DNA repair and consciousness expansion.
                    </p>
                    <Button className="w-full bg-green-600 text-white hover:bg-green-500">
                      <Music className="w-4 h-4 mr-2" />
                      Play Frequencies
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Meditation Tools */}
            <TabsContent value="meditation" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Timer className="w-5 h-5 text-sacred-gold" />
                      <span>Meditation Timer</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Set intentions and time your meditation practice with sacred sounds.
                    </p>
                    <Button className="w-full bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80">
                      Start Session
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-pink-400" />
                      <span>Heart Center</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Connect with your heart center for love and compassion practice.
                    </p>
                    <Button className="w-full bg-pink-600 text-white hover:bg-pink-500">
                      Open Heart
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sun className="w-5 h-5 text-orange-400" />
                      <span>Solar Plexus</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Strengthen personal power and self-confidence through solar activation.
                    </p>
                    <Button className="w-full bg-orange-600 text-white hover:bg-orange-500">
                      Activate Solar Power
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Development Tools */}
            <TabsContent value="development" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-sacred-gold" />
                      <span>DNA Activation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Activate dormant DNA strands for enhanced spiritual capacity.
                    </p>
                    <Button className="w-full bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80">
                      Activate DNA
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-blue-400" />
                      <span>Lightbody Build</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Progressive lightbody construction through frequency work.
                    </p>
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-500">
                      Build Lightbody
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-green-400" />
                      <span>Akashic Access</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Access personal akashic records for soul history and guidance.
                    </p>
                    <Button className="w-full bg-green-600 text-white hover:bg-green-500">
                      Access Records
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Analysis Tools */}
            <TabsContent value="analysis" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-sacred-gold" />
                      <span>Energy Scan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Comprehensive energy field analysis and chakra assessment.
                    </p>
                    <Button className="w-full bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80">
                      Start Scan
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-red-400" />
                      <span>Implant Detection</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Identify and locate etheric implants and interference patterns.
                    </p>
                    <Button className="w-full bg-red-600 text-white hover:bg-red-500">
                      Detect Implants
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-cosmic-800/50 border-cosmic-600 hover:border-sacred-gold/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-gray-400" />
                      <span>Timeline Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-300 mb-4">
                      Analyze personal timeline and identify optimal ascension path.
                    </p>
                    <Button className="w-full bg-gray-600 text-white hover:bg-gray-500">
                      Analyze Timeline
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Access Footer */}
      <section className="py-8 bg-cosmic-800/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-cosmic-300 mb-4">Need immediate spiritual guidance?</p>
          <Button 
            onClick={() => window.location.href = '/vers'}
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