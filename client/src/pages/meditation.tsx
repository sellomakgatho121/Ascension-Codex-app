import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { TechniqueAnimations } from "@/components/technique-animations";
import { MeditationTimer } from "@/components/meditation-timer";
import { BinauralBeats } from "@/components/binaural-beats";
import { AdvancedBinauralBeats } from "@/components/advanced-binaural-beats";
import { PracticeJournal } from "@/components/practice-journal";
import { Play, Pause, RotateCcw, Timer, Zap, Heart, Shield, BookOpen, Eye, Star } from "lucide-react";
import type { MeditationSession } from "@shared/schema";

export default function MeditationPage() {
  const [selectedMeditation, setSelectedMeditation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const queryClient = useQueryClient();

  // Fetch meditation sessions for user 1 (demo user)
  const { data: sessions, isLoading } = useQuery<MeditationSession[]>({
    queryKey: ["/api/sessions", 1],
  });

  const createSessionMutation = useMutation({
    mutationFn: async (sessionData: { type: string; duration: number; focusArea?: string; notes?: string }) => {
      const response = await apiRequest("POST", "/api/sessions", {
        ...sessionData,
        userId: 1
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sessions", 1] });
    },
  });

  const meditations = [
    {
      id: "12d-shield",
      title: "12D Shield Activation",
      description: "Activate your 12D shield for protection and higher timeline access. This foundational practice creates energetic protection and connects you to your Avatar consciousness.",
      duration: 15,
      type: "protection",
      focus: "12D Shield",
      difficulty: "Beginner",
      instructions: [
        "Breathe in and state: 'I call upon the Guardian forces serving the One Eternal Light'",
        "Visualize a bright platinum light surrounding your entire body",
        "State: 'I build my 12D shield in the Christ vibration'",
        "See the shield extending 3 feet around your body in all directions",
        "Maintain this visualization while breathing deeply"
      ]
    },
    {
      id: "chakra-clearing",
      title: "15-Chakra Clearing & Balancing",
      description: "Clear and balance all 15 chakras with guided visualization. Works through both physical and morphogenetic chakras for complete energetic alignment.",
      duration: 25,
      type: "chakra-work",
      focus: "All Chakras",
      difficulty: "Intermediate",
      instructions: [
        "Begin with 12D shield activation",
        "Focus on each chakra from 1-15, visualizing its color and clearing any blocks",
        "Use the mantra for each chakra while breathing into that energy center",
        "Feel the spinning vortex clearing and brightening",
        "End with integration of all chakras working in harmony"
      ]
    },
    {
      id: "lightbody-activation",
      title: "Lightbody Integration",
      description: "Integrate and activate your lightbody layers for ascension. This advanced practice works with the 7 electromagnetic frequency layers of your auric field.",
      duration: 30,
      type: "lightbody-work",
      focus: "Lightbody Layers",
      difficulty: "Advanced",
      instructions: [
        "Establish 12D shield and clear your chakras",
        "Visualize each of the 7 lightbody layers surrounding your physical form",
        "Feel the electromagnetic frequencies building and integrating",
        "Allow higher dimensional light to flow through each layer",
        "Complete with anchoring the lightbody into your physical cells"
      ]
    },
    {
      id: "heart-opening",
      title: "Sacred Crystal Heart Opening",
      description: "Open your heart chakra to the sacred crystal heart frequency. Connects you to the cosmic heart and universal love consciousness.",
      duration: 18,
      type: "heart-work",
      focus: "Heart Chakra",
      difficulty: "Beginner",
      instructions: [
        "Place hands on heart center and breathe deeply",
        "Visualize a beautiful crystal chamber within your heart",
        "See golden light flowing into this sacred space",
        "Feel your heart expanding with unconditional love",
        "Send this love out to all beings everywhere"
      ]
    },
    {
      id: "hova-shields",
      title: "Hova Body Shield Integration",
      description: "Activate and integrate the five horizontal Hova body shields. These triadic shields form the foundation of your auric field protection.",
      duration: 22,
      type: "shield-work",
      focus: "Hova Bodies",
      difficulty: "Intermediate",
      instructions: [
        "Activate your 12D shield as foundation",
        "Visualize each of the 5 horizontal shields around your body",
        "Feel the Doradic, Monadic, Keriac, Rantic, and Rishic shields forming",
        "Allow each shield to strengthen and integrate",
        "Complete with all shields working as one unified field"
      ]
    }
  ];

  const handleMeditationSelect = (meditation: any) => {
    setSelectedMeditation(meditation.id);
    setDuration(meditation.duration * 60);
    setProgress(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control audio playback
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  const handleComplete = async () => {
    const selectedMed = meditations.find(m => m.id === selectedMeditation);
    if (selectedMed) {
      await createSessionMutation.mutateAsync({
        type: selectedMed.type,
        duration: selectedMed.duration,
        focusArea: selectedMed.focus,
        notes: `Completed ${selectedMed.title}`
      });
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const selectedMed = meditations.find(m => m.id === selectedMeditation);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400 border-green-400/50";
      case "Intermediate": return "text-yellow-400 border-yellow-400/50";
      case "Advanced": return "text-red-400 border-red-400/50";
      default: return "text-cosmic-300 border-cosmic-300/50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "chakra-work": return <Zap className="w-4 h-4" />;
      case "heart-work": return <Heart className="w-4 h-4" />;
      case "shield-work": return <Shield className="w-4 h-4" />;
      default: return <Timer className="w-4 h-4" />;
    }
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
            Guided Meditations
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Sacred practices for spiritual development, protection, and consciousness expansion
          </p>
          <div className="flex items-center justify-center space-x-8 text-cosmic-100">
            <div className="flex items-center">
              <Timer className="w-6 h-6 mr-2 text-sacred-gold" />
              <span>Guided Practices</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-2 text-sacred-gold" />
              <span>Protection Techniques</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-6 h-6 mr-2 text-sacred-gold" />
              <span>Heart Activation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Meditation Interface */}
      <section className="py-20 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="guided" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-cosmic-700/50">
              <TabsTrigger value="guided">Guided</TabsTrigger>
              <TabsTrigger value="timer">Timer</TabsTrigger>
              <TabsTrigger value="sounds">Sounds</TabsTrigger>
              <TabsTrigger value="animations">Animations</TabsTrigger>
              <TabsTrigger value="journal">Journal</TabsTrigger>
            </TabsList>

            <TabsContent value="guided">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Meditation Library */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-sacred text-sacred-silver mb-6">Choose Your Practice</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {meditations.map((meditation) => (
                  <Card
                    key={meditation.id}
                    className={`cursor-pointer transition-all duration-300 touch-manipulation ${
                      selectedMeditation === meditation.id
                        ? 'border-sacred-gold/60 bg-cosmic-700/50'
                        : 'sacred-card hover:border-sacred-gold/30'
                    }`}
                    onClick={() => handleMeditationSelect(meditation)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleMeditationSelect(meditation);
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          {getTypeIcon(meditation.type)}
                          <h4 className="text-sm font-semibold text-white ml-2">
                            {meditation.title}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getDifficultyColor(meditation.difficulty)}>
                            {meditation.difficulty}
                          </Badge>
                          <Badge variant="outline" className="border-cosmic-500/50 text-cosmic-500">
                            {meditation.duration}m
                          </Badge>
                        </div>
                      </div>
                      <p className="text-cosmic-100 text-xs leading-relaxed mb-2">
                        {meditation.description}
                      </p>
                      <div className="flex items-center text-xs text-cosmic-300">
                        <span>Focus: {meditation.focus}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Meditation Player */}
            <div className="space-y-6">
              {selectedMed ? (
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                      {getTypeIcon(selectedMed.type)}
                      <span className="ml-2">{selectedMed.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-cosmic-100 leading-relaxed mb-4">
                        {selectedMed.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-cosmic-300">
                        <span>Duration: {selectedMed.duration} minutes</span>
                        <span>•</span>
                        <span>Focus: {selectedMed.focus}</span>
                        <span>•</span>
                        <Badge variant="outline" className={getDifficultyColor(selectedMed.difficulty)}>
                          {selectedMed.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <Separator className="bg-cosmic-700" />

                    {/* Player Controls */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleReset}
                          className="border-cosmic-500 text-cosmic-500 hover:bg-cosmic-500 hover:text-white"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          size="lg"
                          onClick={handlePlayPause}
                          className="w-16 h-16 rounded-full sacred-button"
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleComplete}
                          className="border-sacred-gold text-sacred-gold hover:bg-sacred-gold hover:text-cosmic-900"
                        >
                          <Timer className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <Progress value={(progress / duration) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-cosmic-300">
                          <span>{Math.floor(progress / 60)}:{(progress % 60).toString().padStart(2, '0')}</span>
                          <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="flex gap-3 mb-4">
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
                              {getTypeIcon(selectedMed.type)}
                              <span className="ml-3">{selectedMed.title} - Complete Guide</span>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 text-cosmic-100">
                            <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                              <p className="text-sacred-gold font-semibold mb-2">Meditation Overview</p>
                              <p className="text-sm">{selectedMed.description}</p>
                            </div>

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Purpose & Benefits:</h4>
                              <div className="space-y-3 text-sm">
                                {selectedMed.id === '12d-shield' && (
                                  <>
                                    <p className="text-cosmic-300">
                                      The 12D Shield is the foundational protection practice in Energetic Synthesis. 
                                      It creates a stable energy field that connects you to your Avatar consciousness 
                                      and protects against negative interference.
                                    </p>
                                    <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                      <li>• Establishes energetic sovereignty and protection</li>
                                      <li>• Connects to Christ consciousness frequency</li>
                                      <li>• Builds stable foundation for all spiritual work</li>
                                      <li>• Clears negative attachments and influences</li>
                                    </ul>
                                  </>
                                )}
                                {selectedMed.id === 'chakra-clearing' && (
                                  <>
                                    <p className="text-cosmic-300">
                                      The 15-chakra system includes both physical and morphogenetic chakras. 
                                      This practice clears blockages and aligns all energy centers for optimal 
                                      spiritual development and consciousness expansion.
                                    </p>
                                    <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                      <li>• Clears energy blockages in all chakras 1-15</li>
                                      <li>• Balances masculine and feminine polarity</li>
                                      <li>• Activates dormant spiritual faculties</li>
                                      <li>• Prepares system for lightbody activation</li>
                                    </ul>
                                  </>
                                )}
                                {selectedMed.id === 'lightbody-activation' && (
                                  <>
                                    <p className="text-cosmic-300">
                                      Lightbody activation works with the seven electromagnetic frequency layers 
                                      that surround your physical form. This advanced practice builds your 
                                      multidimensional awareness and ascension capacity.
                                    </p>
                                    <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                      <li>• Activates 7 frequency layers of the auric field</li>
                                      <li>• Builds multidimensional awareness</li>
                                      <li>• Integrates higher dimensional frequencies</li>
                                      <li>• Prepares for DNA strand activation</li>
                                    </ul>
                                  </>
                                )}
                                {selectedMed.id === 'heart-opening' && (
                                  <>
                                    <p className="text-cosmic-300">
                                      The Sacred Crystal Heart activation connects you to the cosmic heart center 
                                      and universal love frequency. This practice opens your heart to receive 
                                      and transmit unconditional love consciousness.
                                    </p>
                                    <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                      <li>• Opens heart chakra to cosmic frequencies</li>
                                      <li>• Connects to universal love consciousness</li>
                                      <li>• Heals emotional wounds and heart barriers</li>
                                      <li>• Activates compassion and unity awareness</li>
                                    </ul>
                                  </>
                                )}
                              </div>
                            </div>

                            <Separator className="bg-cosmic-700" />

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Detailed Instructions:</h4>
                              <div className="space-y-4 text-sm">
                                {selectedMed.instructions.map((instruction, index) => (
                                  <div key={index} className="border border-cosmic-600 rounded-lg p-4">
                                    <h5 className="font-semibold text-sacred-gold mb-2">Step {index + 1}</h5>
                                    <p className="text-cosmic-300">{instruction}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Tips for Success:</h4>
                              <div className="bg-cosmic-800/30 rounded-lg p-4 border border-cosmic-600">
                                <ul className="space-y-2 text-sm text-cosmic-300">
                                  <li>• <strong>Consistency:</strong> Practice daily, even if only for 5-10 minutes</li>
                                  <li>• <strong>Environment:</strong> Choose a quiet, undisturbed space for practice</li>
                                  <li>• <strong>Intention:</strong> Set clear intention to serve your highest good</li>
                                  <li>• <strong>Protection:</strong> Always begin with 12D Shield if not the main practice</li>
                                  <li>• <strong>Integration:</strong> Allow time after practice to integrate the experience</li>
                                </ul>
                              </div>
                            </div>

                            <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                              <p className="text-xs text-cosmic-300">
                                <strong>Note:</strong> This meditation is part of the Energetic Synthesis curriculum 
                                developed by Lisa Renee. Regular practice builds your spiritual discernment and 
                                supports your consciousness evolution journey.
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1 border-sacred-silver text-sacred-silver hover:bg-sacred-silver hover:text-cosmic-900">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Practice Tips
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                              <BookOpen className="w-6 h-6 mr-3" />
                              {selectedMed.title} - Practice Guide
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 text-cosmic-100">
                            <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                              <p className="text-sacred-gold font-semibold mb-2">Meditation Practice Tips</p>
                              <p className="text-sm">
                                These guidelines will help you get the most benefit from your {selectedMed.title} practice 
                                and integrate the experience safely and effectively.
                              </p>
                            </div>

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Before You Begin:</h4>
                              <div className="space-y-3 text-sm">
                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Preparation</h5>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Find a quiet space where you won't be disturbed</li>
                                    <li>• Sit comfortably with spine straight but relaxed</li>
                                    <li>• Turn off phones and other distractions</li>
                                    <li>• Set intention to serve your highest good and spiritual evolution</li>
                                  </ul>
                                </div>

                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Energy Protection</h5>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Always begin with 12D Shield activation for protection</li>
                                    <li>• Call upon your spiritual guides and highest self</li>
                                    <li>• State intention to connect only with Christ consciousness</li>
                                    <li>• Trust your discernment throughout the practice</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">During Practice:</h4>
                              <div className="space-y-3 text-sm">
                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Breathing & Focus</h5>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Breathe naturally and deeply throughout</li>
                                    <li>• If mind wanders, gently return to the practice</li>
                                    <li>• Use breath to anchor higher frequencies in your body</li>
                                    <li>• Allow natural pauses and rest periods as needed</li>
                                  </ul>
                                </div>

                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Working with Energy</h5>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Visualize with clear intention rather than forcing</li>
                                    <li>• Feel rather than just think the energy movements</li>
                                    <li>• Allow whatever arises without judgment</li>
                                    <li>• If overwhelmed, slow down or return to basic breathing</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">After Practice:</h4>
                              <div className="space-y-3 text-sm">
                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Integration</h5>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Sit quietly for a few minutes to integrate</li>
                                    <li>• Thank your guides and higher self for assistance</li>
                                    <li>• Ground yourself by feeling your body and surroundings</li>
                                    <li>• Drink water and eat something light if needed</li>
                                  </ul>
                                </div>

                                <div className="border border-cosmic-600 rounded-lg p-4">
                                  <h5 className="font-semibold text-sacred-gold mb-2">Recording Progress</h5>
                                  <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                    <li>• Journal any insights, sensations, or experiences</li>
                                    <li>• Note how you feel physically and emotionally</li>
                                    <li>• Track your practice consistency and duration</li>
                                    <li>• Observe changes in daily life and consciousness</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                              <p className="text-xs text-cosmic-300">
                                <strong>Remember:</strong> Spiritual development is a gradual process. Be patient 
                                with yourself and trust that consistent practice will yield results over time. 
                                Each session builds upon the previous ones, creating cumulative positive changes.
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <Card className="cosmic-gradient rounded-lg border border-sacred-gold/20">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-semibold text-sacred-gold mb-3 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Practice Instructions:
                        </h4>
                        <ul className="text-xs text-cosmic-100 space-y-2">
                          {selectedMed.instructions.map((instruction, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-sacred-gold mr-2">{index + 1}.</span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              ) : (
                <Card className="sacred-card h-96 flex items-center justify-center">
                  <CardContent className="text-center">
                    <div className="text-6xl mb-4">🧘‍♀️</div>
                    <h3 className="text-xl font-sacred text-sacred-gold mb-2">
                      Select a Meditation
                    </h3>
                    <p className="text-cosmic-100">
                      Choose a guided practice from the library to begin your spiritual journey
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Recent Sessions */}
              {sessions && sessions.length > 0 && (
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-sacred text-sacred-silver">
                      Recent Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {sessions.slice(0, 5).map((session) => (
                        <div key={session.id} className="flex justify-between items-center text-sm">
                          <span className="text-cosmic-100">{session.type}</span>
                          <span className="text-cosmic-300">{session.duration}m</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="animations">
          <div className="space-y-6">
            <h2 className="text-2xl font-sacred text-sacred-silver mb-6">Interactive Technique Training</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { id: "12d-shield", name: "12D Shield Activation", icon: <Shield className="w-5 h-5" /> },
                { id: "chakra-clearing", name: "Chakra Clearing", icon: <Zap className="w-5 h-5" /> },
                { id: "lightbody-activation", name: "Lightbody Activation", icon: <Heart className="w-5 h-5" /> }
              ].map(technique => (
                <Card 
                  key={technique.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedMeditation === technique.id
                      ? 'border-sacred-gold/60 bg-cosmic-700/50'
                      : 'sacred-card hover:border-sacred-gold/30'
                  }`}
                  onClick={() => {
                    setSelectedMeditation(technique.id);
                    setIsPlaying(false);
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      {technique.icon}
                      <span className="text-sm font-semibold text-white">{technique.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedMeditation && ['12d-shield', 'chakra-clearing', 'lightbody-activation'].includes(selectedMeditation) ? (
              <TechniqueAnimations
                technique={selectedMeditation}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onReset={() => {
                  setIsPlaying(false);
                  setProgress(0);
                }}
              />
            ) : (
              <Card className="sacred-card h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <h3 className="text-xl font-sacred text-sacred-gold mb-2">
                    Choose a Technique
                  </h3>
                  <p className="text-cosmic-100">
                    Select an animated technique to learn proper activation methods
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="timer">
          <MeditationTimer />
        </TabsContent>

        <TabsContent value="sounds">
          <BinauralBeats />
        </TabsContent>

        <TabsContent value="journal">
          <PracticeJournal />
        </TabsContent>
      </Tabs>
        </div>
      </section>
    </div>
  );
}