import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  hgsKnowledgeBase, 
  searchHGSKnowledge, 
  getHGSConceptsByArea,
  hgsCategories 
} from "@/lib/hgs-knowledge";
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Brain, 
  Shield, 
  Users, 
  Target,
  Calendar,
  Play,
  BookOpen,
  Zap,
  Crown,
  Sparkles,
  Infinity,
  Sun,
  Moon
} from "lucide-react";

export default function HGSPage() {
  const [selectedTab, setSelectedTab] = useState("foundation");
  const [userProgress, setUserProgress] = useState({
    foundation: 0,
    clearing: 0,
    gender: 0,
    sessions: 0,
    integration: 0,
    advanced: 0
  });

  useEffect(() => {
    // Load saved progress
    const savedProgress = localStorage.getItem('hgs-progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (category: string, newProgress: number) => {
    const updated = { ...userProgress, [category]: newProgress };
    setUserProgress(updated);
    localStorage.setItem('hgs-progress', JSON.stringify(updated));
  };

  const hgsPrinciples = [
    {
      id: 'sacred-marriage',
      title: 'Sacred Marriage',
      description: 'Union of masculine and feminine principles within',
      icon: <Heart className="w-6 h-6" />,
      color: 'text-pink-400'
    },
    {
      id: 'consciousness-clearing',
      title: 'Consciousness Clearing',
      description: 'Removal of implants and consciousness distortions',
      icon: <Brain className="w-6 h-6" />,
      color: 'text-purple-400'
    },
    {
      id: 'template-restoration',
      title: 'Template Restoration',
      description: 'Restoring the original divine human blueprint',
      icon: <Crown className="w-6 h-6" />,
      color: 'text-yellow-400'
    },
    {
      id: 'gender-healing',
      title: 'Gender Healing',
      description: 'Healing masculine and feminine principles',
      icon: <Infinity className="w-6 h-6" />,
      color: 'text-blue-400'
    },
    {
      id: 'protection-protocols',
      title: 'Protection Protocols',
      description: 'Safe spiritual boundaries and divine protection',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-green-400'
    },
    {
      id: 'integration-embodiment',
      title: 'Integration & Embodiment',
      description: 'Living from divine wholeness in daily life',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'text-orange-400'
    }
  ];

  const overallProgress = Math.round(Object.values(userProgress).reduce((a, b) => a + b, 0) / 6);

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full transform rotate-45"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-sacred-gold/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          {/* Sacred Marriage Symbol */}
          <div className="absolute top-1/3 right-1/3 flex items-center space-x-2 opacity-20">
            <Sun className="w-8 h-8 text-yellow-400" />
            <Moon className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="p-4 rounded-full bg-sacred-gold/20 border-2 border-sacred-gold">
                <Heart className="w-12 h-12 text-sacred-gold" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-sacred font-bold text-sacred-gold">
                  HGS
                </h1>
                <p className="text-xl text-cosmic-100 mt-2">Hieros Gamos System</p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 text-cosmic-100 leading-relaxed">
              Sacred Marriage healing practice for consciousness clearing and divine template restoration
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="p-4 rounded-full bg-pink-500/20 border border-pink-500/30 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Sacred Marriage</h3>
                <p className="text-cosmic-300 text-sm">Divine masculine and feminine union</p>
              </div>
              <div className="text-center">
                <div className="p-4 rounded-full bg-purple-500/20 border border-purple-500/30 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Consciousness Clearing</h3>
                <p className="text-cosmic-300 text-sm">Implant removal and healing</p>
              </div>
              <div className="text-center">
                <div className="p-4 rounded-full bg-yellow-500/20 border border-yellow-500/30 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Template Restoration</h3>
                <p className="text-cosmic-300 text-sm">Divine human blueprint recovery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="py-8 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Card className="sacred-card mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Your HGS Journey</h3>
                <span className="text-sacred-gold font-bold text-xl">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-3 mb-4" />
              <div className="grid md:grid-cols-6 gap-4">
                {hgsCategories.map((category, index) => (
                  <div key={category.id} className="text-center">
                    <div className="text-xs text-cosmic-400 mb-1">{category.label}</div>
                    <div className="text-sm font-semibold text-sacred-gold">
                      {userProgress[category.id as keyof typeof userProgress]}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
            <TabsList className="grid grid-cols-6 bg-cosmic-700/50 max-w-4xl mx-auto">
              <TabsTrigger value="foundation">Foundation</TabsTrigger>
              <TabsTrigger value="clearing">Clearing</TabsTrigger>
              <TabsTrigger value="gender">Gender</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="foundation">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        HGS Foundation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-cosmic-100 leading-relaxed">
                        The Hieros Gamos System is a comprehensive spiritual practice and healing modality designed to clear consciousness distortions, remove alien implants, and restore the divine human template through sacred marriage principles. HGS facilitates the union of masculine and feminine principles within individual consciousness.
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white">Core Components</h4>
                        <div className="grid gap-4">
                          <div className="flex items-start space-x-3 p-4 rounded-lg bg-cosmic-700/30">
                            <Heart className="w-6 h-6 text-pink-400 mt-1" />
                            <div>
                              <h5 className="font-medium text-white">Sacred Marriage</h5>
                              <p className="text-cosmic-300 text-sm">Union of divine masculine and feminine within</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-4 rounded-lg bg-cosmic-700/30">
                            <Brain className="w-6 h-6 text-purple-400 mt-1" />
                            <div>
                              <h5 className="font-medium text-white">Consciousness Clearing</h5>
                              <p className="text-cosmic-300 text-sm">Removal of implants and distortions</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-4 rounded-lg bg-cosmic-700/30">
                            <Crown className="w-6 h-6 text-yellow-400 mt-1" />
                            <div>
                              <h5 className="font-medium text-white">Template Restoration</h5>
                              <p className="text-cosmic-300 text-sm">Divine human blueprint recovery</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-sacred-silver">
                        Foundation Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-cosmic-300">Understanding Level</span>
                            <span className="text-sacred-gold">{userProgress.foundation}%</span>
                          </div>
                          <Progress value={userProgress.foundation} className="h-2" />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => updateProgress('foundation', Math.min(100, userProgress.foundation + 25))}
                            className="sacred-button flex-1"
                          >
                            Study Session
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateProgress('foundation', 0)}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-sacred-silver">
                        Sacred Marriage Symbols
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-6">
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Sun className="w-8 h-8 text-yellow-400" />
                          <span className="text-yellow-400 font-medium">Masculine</span>
                        </div>
                        <Heart className="w-6 h-6 text-sacred-gold" />
                        <div className="flex items-center space-x-2">
                          <Moon className="w-8 h-8 text-blue-400" />
                          <span className="text-blue-400 font-medium">Feminine</span>
                        </div>
                      </div>
                      <p className="text-cosmic-300 text-sm">
                        The sacred union of polarities within consciousness
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="clearing">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Consciousness Clearing Techniques
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-cosmic-100 leading-relaxed">
                      HGS clearing techniques are designed to remove consciousness distortions, alien implants, entity attachments, and various forms of consciousness manipulation. These methods restore organic consciousness and the natural divine human template.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Clearing Methods</h4>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <h5 className="text-blue-400 font-medium mb-1">Implant Removal</h5>
                          <p className="text-cosmic-100 text-sm">Identifying and removing alien technology and control devices</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <h5 className="text-purple-400 font-medium mb-1">Entity Clearing</h5>
                          <p className="text-cosmic-100 text-sm">Removing consciousness attachments and parasitic entities</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <h5 className="text-green-400 font-medium mb-1">Template Restoration</h5>
                          <p className="text-cosmic-100 text-sm">Repairing and restoring organic consciousness templates</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={() => updateProgress('clearing', Math.min(100, userProgress.clearing + 20))}
                        className="sacred-button w-full"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Practice Clearing
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Protection Protocols
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Safety Measures</h4>
                      <div className="grid gap-3">
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">12D Shield Protection</h5>
                          <p className="text-cosmic-300 text-xs">Establish divine protection before clearing work</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Guardian Invocation</h5>
                          <p className="text-cosmic-300 text-xs">Call upon spiritual guardians and protection</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Energy Boundaries</h5>
                          <p className="text-cosmic-300 text-xs">Maintain strong energetic boundaries during sessions</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Integration Support</h5>
                          <p className="text-cosmic-300 text-xs">Proper integration and grounding after clearing</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Clearing Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cosmic-300">Mastery Level</span>
                          <span className="text-sacred-gold">{userProgress.clearing}%</span>
                        </div>
                        <Progress value={userProgress.clearing} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gender">
              <div className="space-y-8">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold text-center">
                      Gender Principle Healing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Masculine Healing */}
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="p-4 rounded-full bg-yellow-500/20 border-2 border-yellow-500/40 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                            <Sun className="w-8 h-8 text-yellow-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Divine Masculine Healing</h3>
                          <p className="text-cosmic-300 text-sm">
                            Restoration of healthy masculine principle within both men and women
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <h5 className="text-yellow-400 font-medium mb-1">Masculine Wounds</h5>
                            <p className="text-cosmic-100 text-sm">Healing trauma and distortions in masculine energy</p>
                          </div>
                          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <h5 className="text-yellow-400 font-medium mb-1">Authentic Power</h5>
                            <p className="text-cosmic-100 text-sm">Reconnecting with true spiritual authority</p>
                          </div>
                          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <h5 className="text-yellow-400 font-medium mb-1">Protection & Service</h5>
                            <p className="text-cosmic-100 text-sm">Healthy masculine expression through service</p>
                          </div>
                        </div>
                      </div>

                      {/* Feminine Healing */}
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="p-4 rounded-full bg-blue-500/20 border-2 border-blue-500/40 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                            <Moon className="w-8 h-8 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-blue-400 mb-2">Divine Feminine Healing</h3>
                          <p className="text-cosmic-300 text-sm">
                            Restoration of divine feminine principle within both women and men
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <h5 className="text-blue-400 font-medium mb-1">Feminine Wounds</h5>
                            <p className="text-cosmic-100 text-sm">Healing goddess suppression and feminine trauma</p>
                          </div>
                          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <h5 className="text-blue-400 font-medium mb-1">Intuitive Wisdom</h5>
                            <p className="text-cosmic-100 text-sm">Reconnecting with feminine wisdom and intuition</p>
                          </div>
                          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <h5 className="text-blue-400 font-medium mb-1">Nurturing & Creation</h5>
                            <p className="text-cosmic-100 text-sm">Healthy feminine expression through nurturing</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sacred Marriage Integration */}
                    <div className="mt-8 p-6 rounded-lg bg-cosmic-700/30 border border-sacred-gold/30">
                      <div className="text-center mb-4">
                        <div className="flex items-center justify-center space-x-4 mb-4">
                          <Sun className="w-6 h-6 text-yellow-400" />
                          <Infinity className="w-8 h-8 text-sacred-gold" />
                          <Moon className="w-6 h-6 text-blue-400" />
                        </div>
                        <h4 className="font-semibold text-sacred-gold">Sacred Marriage Integration</h4>
                        <p className="text-cosmic-300 text-sm mt-2">
                          The union of healed masculine and feminine principles creates wholeness and divine completion
                        </p>
                      </div>
                      
                      <Button 
                        onClick={() => updateProgress('gender', Math.min(100, userProgress.gender + 15))}
                        className="sacred-button w-full"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Practice Gender Integration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sessions">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      HGS Session Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-cosmic-100 leading-relaxed">
                      HGS sessions follow a systematic approach including preparation, protection, clearing sequences, template restoration, and integration. Each session follows specific protocols for safe and effective healing.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Session Phases</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                            <span className="text-xs text-sacred-gold font-bold">1</span>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-white">Preparation & Protection</h5>
                            <p className="text-xs text-cosmic-300">Establish sacred space and divine protection</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                            <span className="text-xs text-sacred-gold font-bold">2</span>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-white">Assessment & Scanning</h5>
                            <p className="text-xs text-cosmic-300">Identify consciousness distortions and implants</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                            <span className="text-xs text-sacred-gold font-bold">3</span>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-white">Clearing Sequence</h5>
                            <p className="text-xs text-cosmic-300">Remove implants, entities, and distortions</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                            <span className="text-xs text-sacred-gold font-bold">4</span>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-white">Template Restoration</h5>
                            <p className="text-xs text-cosmic-300">Restore divine human template and blueprint</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                            <span className="text-xs text-sacred-gold font-bold">5</span>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-white">Integration & Sealing</h5>
                            <p className="text-xs text-cosmic-300">Integrate healing and seal the energy field</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Practitioner Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Ethical Practice</h4>
                      <div className="grid gap-3">
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Consent & Boundaries</h5>
                          <p className="text-cosmic-300 text-xs">Always maintain clear consent and healthy boundaries</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Professional Training</h5>
                          <p className="text-cosmic-300 text-xs">Complete proper training and certification</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Ongoing Support</h5>
                          <p className="text-cosmic-300 text-xs">Provide integration support and follow-up</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Self-Care</h5>
                          <p className="text-cosmic-300 text-xs">Maintain personal spiritual hygiene and protection</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Session Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cosmic-300">Session Skills</span>
                          <span className="text-sacred-gold">{userProgress.sessions}%</span>
                        </div>
                        <Progress value={userProgress.sessions} className="h-2" />
                      </div>
                    </div>

                    <Button 
                      onClick={() => updateProgress('sessions', Math.min(100, userProgress.sessions + 20))}
                      className="sacred-button w-full"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Practice Session
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integration">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Daily Life Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-cosmic-100 leading-relaxed">
                      HGS integration involves embodying healed consciousness and restored templates in daily life. This includes authentic expression, healthy relationships, and service from divine wholeness.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Integration Areas</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                          <Heart className="w-5 h-5 text-pink-400" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Relationships</h5>
                            <p className="text-cosmic-300 text-xs">Sacred partnerships and healthy dynamics</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                          <Target className="w-5 h-5 text-green-400" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Work & Service</h5>
                            <p className="text-cosmic-300 text-xs">Authentic expression through career and service</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                          <Sparkles className="w-5 h-5 text-yellow-400" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Creative Expression</h5>
                            <p className="text-cosmic-300 text-xs">Artistic and creative manifestation</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                          <Users className="w-5 h-5 text-blue-400" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Community</h5>
                            <p className="text-cosmic-300 text-xs">Healthy community participation and leadership</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={() => updateProgress('integration', Math.min(100, userProgress.integration + 25))}
                        className="sacred-button w-full"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Integration Practice
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Relationship Healing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-cosmic-100 leading-relaxed">
                      HGS principles applied to relationships create sacred partnerships based on divine masculine-feminine polarity and mutual spiritual growth.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Sacred Partnership</h4>
                      <div className="grid gap-3">
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Polarity Balance</h5>
                          <p className="text-cosmic-300 text-xs">Healthy masculine-feminine polarity in relationships</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Mutual Growth</h5>
                          <p className="text-cosmic-300 text-xs">Supporting each other's spiritual development</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Authentic Communication</h5>
                          <p className="text-cosmic-300 text-xs">Heart-centered, honest communication</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Sacred Sexuality</h5>
                          <p className="text-cosmic-300 text-xs">Healthy, conscious intimate expression</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Integration Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cosmic-300">Life Integration</span>
                          <span className="text-sacred-gold">{userProgress.integration}%</span>
                        </div>
                        <Progress value={userProgress.integration} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="advanced">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Advanced HGS Techniques
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-cosmic-100 leading-relaxed">
                      Advanced HGS work involves sophisticated healing methods for complex consciousness clearing, multi-dimensional healing, and advanced template restoration work.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Master Level Work</h4>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <h5 className="text-purple-400 font-medium mb-1">Multi-Dimensional Clearing</h5>
                          <p className="text-cosmic-100 text-sm">Complex clearing across multiple dimensions and timelines</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <h5 className="text-blue-400 font-medium mb-1">Advanced Template Work</h5>
                          <p className="text-cosmic-100 text-sm">Sophisticated restoration of consciousness blueprints</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <h5 className="text-green-400 font-medium mb-1">Teaching & Mentorship</h5>
                          <p className="text-cosmic-100 text-sm">Training and mentoring other HGS practitioners</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={() => updateProgress('advanced', Math.min(100, userProgress.advanced + 30))}
                        className="sacred-button w-full"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Advanced Practice
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      HGS & Christ Consciousness
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-cosmic-100 leading-relaxed">
                      HGS work facilitates the embodiment of Christ Consciousness through the sacred marriage of masculine and feminine principles, representing the divine human potential.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Divine Embodiment</h4>
                      <div className="grid gap-3">
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Christ Template Activation</h5>
                          <p className="text-cosmic-300 text-xs">Embodying the Christ consciousness template</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Divine Service</h5>
                          <p className="text-cosmic-300 text-xs">Service to others through divine embodiment</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Planetary Healing</h5>
                          <p className="text-cosmic-300 text-xs">Contributing to planetary consciousness evolution</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Advanced Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cosmic-300">Mastery Development</span>
                          <span className="text-sacred-gold">{userProgress.advanced}%</span>
                        </div>
                        <Progress value={userProgress.advanced} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}