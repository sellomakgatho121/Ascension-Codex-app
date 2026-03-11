import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Wifi, Activity, MapPin, Music, Brain } from "lucide-react";
import { AdvancedBinauralBeats } from "@/components/advanced-binaural-beats";
import { MeditationTimer } from "@/components/meditation-timer";
import { EnergyFieldScanner } from "@/components/energy-field-scanner";
import { AdvancedSpiritualTools } from "@/components/advanced-spiritual-tools";
import { SpiritualJournal } from "@/components/spiritual-journal";
import { PersonalizedLearningPath } from "@/components/personalized-learning-path";
import { SpiritualAssessment } from "@/components/spiritual-assessment";
import { PlanetaryGridMonitor } from "@/components/planetary-grid-monitor";
import { EnhancedSpiritualCenters } from "@/components/enhanced-spiritual-centers";
import { APIStatusMonitor } from "@/components/api-status-monitor";

export default function EnhancedToolsPage() {
  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
            Enhanced Spiritual Tools
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Advanced toolkit with real-time planetary data, location services, and professional audio
          </p>
        </div>
      </section>

      {/* Enhanced Tools Interface */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="planetary-grid" className="space-y-8">
            <TabsList className="bg-cosmic-800 border-cosmic-600">
              <TabsTrigger value="planetary-grid" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
                <Globe className="w-4 h-4 mr-2" />
                Planetary Grid
              </TabsTrigger>
              <TabsTrigger value="binaural-beats" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
                <Music className="w-4 h-4 mr-2" />
                Binaural Beats
              </TabsTrigger>
              <TabsTrigger value="spiritual-centers" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
                <MapPin className="w-4 h-4 mr-2" />
                Spiritual Centers
              </TabsTrigger>
              <TabsTrigger value="meditation-timer" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
                <Brain className="w-4 h-4 mr-2" />
                Meditation Timer
              </TabsTrigger>
              <TabsTrigger value="energy-scanner" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
                <Activity className="w-4 h-4 mr-2" />
                Energy Scanner
              </TabsTrigger>
              <TabsTrigger value="spiritual-tools" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
                Advanced Tools
              </TabsTrigger>
              <TabsTrigger value="journal" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
                Journal
              </TabsTrigger>
              <TabsTrigger value="learning-path" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
                Learning Path
              </TabsTrigger>
              <TabsTrigger value="assessment" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
                Assessment
              </TabsTrigger>
              <TabsTrigger value="api-status" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
                <Wifi className="w-4 h-4 mr-2" />
                API Status
              </TabsTrigger>
            </TabsList>

            <TabsContent value="planetary-grid" className="space-y-6">
              <PlanetaryGridMonitor />
            </TabsContent>

            <TabsContent value="binaural-beats" className="space-y-6">
              <AdvancedBinauralBeats />
            </TabsContent>

            <TabsContent value="spiritual-centers" className="space-y-6">
              <EnhancedSpiritualCenters />
            </TabsContent>

            <TabsContent value="meditation-timer" className="space-y-6">
              <MeditationTimer />
            </TabsContent>

            <TabsContent value="energy-scanner" className="space-y-6">
              <EnergyFieldScanner />
            </TabsContent>

            <TabsContent value="spiritual-tools" className="space-y-6">
              <AdvancedSpiritualTools />
            </TabsContent>

            <TabsContent value="journal" className="space-y-6">
              <SpiritualJournal />
            </TabsContent>

            <TabsContent value="learning-path" className="space-y-6">
              <PersonalizedLearningPath />
            </TabsContent>

            <TabsContent value="assessment" className="space-y-6">
              <SpiritualAssessment />
            </TabsContent>

            <TabsContent value="api-status" className="space-y-6">
              <APIStatusMonitor />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}