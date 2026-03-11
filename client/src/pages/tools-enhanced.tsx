
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, Music, BookOpen, Shield, Target, Sparkles, Star, Brain } from "lucide-react";
import { AdvancedSpiritualTools } from "@/components/advanced-spiritual-tools";
import { SpiritualJournal } from "@/components/spiritual-journal";
import { MeditationCenter } from "@/components/meditation-center";
import { ProgressDashboard } from "@/components/progress-dashboard";
import { Advanced3DVisualizations } from "@/components/advanced-3d-visualizations";
import { SpiritualAssessment } from "@/components/spiritual-assessment";
import { PersonalizedLearningPath } from "@/components/personalized-learning-path";

export default function ToolsEnhancedPage() {
  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
            Enhanced Spiritual Tools
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Complete toolkit for spiritual development, energy work, and consciousness expansion
          </p>
        </div>
      </section>

      {/* Enhanced Tools Interface */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="energy-tools" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-cosmic-700/50">
              <TabsTrigger value="energy-tools" className="flex items-center gap-1 text-xs">
                <Shield className="w-3 h-3" />
                <span className="hidden sm:inline">Energy</span>
              </TabsTrigger>
              <TabsTrigger value="3d-visual" className="flex items-center gap-1 text-xs">
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">3D Visual</span>
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center gap-1 text-xs">
                <Brain className="w-3 h-3" />
                <span className="hidden sm:inline">Assessment</span>
              </TabsTrigger>
              <TabsTrigger value="learning" className="flex items-center gap-1 text-xs">
                <Star className="w-3 h-3" />
                <span className="hidden sm:inline">Learning</span>
              </TabsTrigger>
              <TabsTrigger value="meditation" className="flex items-center gap-1 text-xs">
                <Timer className="w-3 h-3" />
                <span className="hidden lg:inline">Meditation</span>
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-1 text-xs">
                <BookOpen className="w-3 h-3" />
                <span className="hidden lg:inline">Journal</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-1 text-xs">
                <Target className="w-3 h-3" />
                <span className="hidden lg:inline">Progress</span>
              </TabsTrigger>
              <TabsTrigger value="sounds" className="flex items-center gap-1 text-xs">
                <Music className="w-3 h-3" />
                <span className="hidden lg:inline">Sounds</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="energy-tools">
              <AdvancedSpiritualTools />
            </TabsContent>

            <TabsContent value="3d-visual">
              <Advanced3DVisualizations />
            </TabsContent>

            <TabsContent value="assessment">
              <SpiritualAssessment />
            </TabsContent>

            <TabsContent value="learning">
              <PersonalizedLearningPath />
            </TabsContent>

            <TabsContent value="meditation">
              <MeditationCenter />
            </TabsContent>

            <TabsContent value="journal">
              <SpiritualJournal />
            </TabsContent>

            <TabsContent value="progress">
              <ProgressDashboard />
            </TabsContent>

            <TabsContent value="sounds">
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                    <Music className="w-6 h-6 mr-3" />
                    Healing Frequencies & Binaural Beats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-sacred text-sacred-silver">Solfeggio Frequencies</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-cosmic-800 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-cosmic-100">396 Hz - Liberation from Fear</span>
                            <button className="px-3 py-1 bg-sacred-gold text-cosmic-900 rounded text-sm">Play</button>
                          </div>
                        </div>
                        <div className="p-4 bg-cosmic-800 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-cosmic-100">528 Hz - DNA Repair</span>
                            <button className="px-3 py-1 bg-sacred-gold text-cosmic-900 rounded text-sm">Play</button>
                          </div>
                        </div>
                        <div className="p-4 bg-cosmic-800 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-cosmic-100">741 Hz - Consciousness Expansion</span>
                            <button className="px-3 py-1 bg-sacred-gold text-cosmic-900 rounded text-sm">Play</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-sacred text-sacred-silver">Binaural Beats</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-cosmic-800 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-cosmic-100">Alpha Waves (8-12 Hz)</span>
                            <button className="px-3 py-1 bg-sacred-gold text-cosmic-900 rounded text-sm">Play</button>
                          </div>
                          <p className="text-xs text-cosmic-400">Relaxed awareness, meditation</p>
                        </div>
                        <div className="p-4 bg-cosmic-800 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-cosmic-100">Theta Waves (4-8 Hz)</span>
                            <button className="px-3 py-1 bg-sacred-gold text-cosmic-900 rounded text-sm">Play</button>
                          </div>
                          <p className="text-xs text-cosmic-400">Deep meditation, visions</p>
                        </div>
                        <div className="p-4 bg-cosmic-800 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-cosmic-100">Gamma Waves (30-100 Hz)</span>
                            <button className="px-3 py-1 bg-sacred-gold text-cosmic-900 rounded text-sm">Play</button>
                          </div>
                          <p className="text-xs text-cosmic-400">Higher consciousness</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-cosmic-800/50 rounded-lg border border-cosmic-600">
                    <p className="text-cosmic-300 text-sm">
                      <strong className="text-sacred-gold">Note:</strong> Audio implementation requires web audio API integration. 
                      Use headphones for optimal binaural beat effectiveness.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
