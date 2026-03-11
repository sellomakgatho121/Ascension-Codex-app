import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  gsfKnowledgeBase, 
  searchGSFKnowledge, 
  getGSFConceptsByArea,
  gsfCategories 
} from "@/lib/gsf-knowledge";
import { 
  ArrowLeft, 
  Shield, 
  Heart, 
  Star, 
  Brain, 
  Users, 
  Target,
  Calendar,
  Play,
  BookOpen,
  Zap,
  Globe,
  Crown,
  Sparkles
} from "lucide-react";

export default function GSFPage() {
  const [selectedTab, setSelectedTab] = useState("foundation");
  const [userProgress, setUserProgress] = useState({
    foundation: 0,
    protection: 0,
    behavioral: 0,
    relationships: 0,
    healing: 0,
    community: 0
  });

  useEffect(() => {
    // Load saved progress
    const savedProgress = localStorage.getItem('gsf-progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (category: string, newProgress: number) => {
    const updated = { ...userProgress, [category]: newProgress };
    setUserProgress(updated);
    localStorage.setItem('gsf-progress', JSON.stringify(updated));
  };

  const gsfPrinciples = [
    {
      id: 'empathy',
      title: 'Empathy and Compassion',
      description: 'Understanding and sharing feelings while maintaining boundaries',
      icon: <Heart className="w-6 h-6" />,
      color: 'text-pink-400'
    },
    {
      id: 'discipline',
      title: 'Mental Discipline',
      description: 'Control over thoughts and emotional reactions',
      icon: <Brain className="w-6 h-6" />,
      color: 'text-purple-400'
    },
    {
      id: 'responsibility',
      title: 'Responsibility',
      description: 'Accountability for thoughts, emotions, and actions',
      icon: <Target className="w-6 h-6" />,
      color: 'text-blue-400'
    },
    {
      id: 'honesty',
      title: 'Honesty',
      description: 'Truthfulness and authentic self-expression',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'text-yellow-400'
    },
    {
      id: 'sovereignty',
      title: 'Sovereignty',
      description: 'Personal authority and energetic boundaries',
      icon: <Crown className="w-6 h-6" />,
      color: 'text-orange-400'
    },
    {
      id: 'acceptance',
      title: 'Acceptance',
      description: 'Acknowledging what is while maintaining discernment',
      icon: <Globe className="w-6 h-6" />,
      color: 'text-green-400'
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
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="p-4 rounded-full bg-sacred-gold/20 border-2 border-sacred-gold">
                <Shield className="w-12 h-12 text-sacred-gold" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-sacred font-bold text-sacred-gold">
                  GSF
                </h1>
                <p className="text-xl text-cosmic-100 mt-2">God Sovereign Free</p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 text-cosmic-100 leading-relaxed">
              Guardian Support Foundation: Spiritual principles and practices supporting Law of One consciousness
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="p-4 rounded-full bg-blue-500/20 border border-blue-500/30 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Protection</h3>
                <p className="text-cosmic-300 text-sm">12D Shield and spiritual defense</p>
              </div>
              <div className="text-center">
                <div className="p-4 rounded-full bg-purple-500/20 border border-purple-500/30 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Principles</h3>
                <p className="text-cosmic-300 text-sm">Six behavioral guidelines</p>
              </div>
              <div className="text-center">
                <div className="p-4 rounded-full bg-green-500/20 border border-green-500/30 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                <p className="text-cosmic-300 text-sm">Collective spiritual support</p>
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
                <h3 className="text-lg font-semibold text-white">Your GSF Journey</h3>
                <span className="text-sacred-gold font-bold text-xl">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-3 mb-4" />
              <div className="grid md:grid-cols-6 gap-4">
                {gsfCategories.map((category, index) => (
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
              <TabsTrigger value="protection">Protection</TabsTrigger>
              <TabsTrigger value="principles">Principles</TabsTrigger>
              <TabsTrigger value="practices">Practices</TabsTrigger>
              <TabsTrigger value="healing">Healing</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="foundation">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        GSF Foundation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-cosmic-100 leading-relaxed">
                        The Guardian Support Foundation represents the spiritual principles and practices that support the Law of One consciousness. GSF provides a practical framework for living divine principles in daily life through concrete tools and practices for maintaining unity consciousness, serving others, and evolving spiritually.
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white">Core Components</h4>
                        <div className="grid gap-4">
                          <div className="flex items-start space-x-3 p-4 rounded-lg bg-cosmic-700/30">
                            <Shield className="w-6 h-6 text-blue-400 mt-1" />
                            <div>
                              <h5 className="font-medium text-white">12D Shield Practice</h5>
                              <p className="text-cosmic-300 text-sm">Core protection technique using 12th dimensional light</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-4 rounded-lg bg-cosmic-700/30">
                            <Heart className="w-6 h-6 text-pink-400 mt-1" />
                            <div>
                              <h5 className="font-medium text-white">Unity Vow</h5>
                              <p className="text-cosmic-300 text-sm">Declaration of alignment with God consciousness</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-4 rounded-lg bg-cosmic-700/30">
                            <Star className="w-6 h-6 text-yellow-400 mt-1" />
                            <div>
                              <h5 className="font-medium text-white">Law of One Principles</h5>
                              <p className="text-cosmic-300 text-sm">Natural laws governing universal creation</p>
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
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.location.href = '/meditation'}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        12D Shield Practice
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.location.href = '/tools'}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        GSF Tools
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.location.href = '/community'}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        GSF Community
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="protection">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      12D Shield Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-cosmic-100 leading-relaxed">
                      The 12D Shield is the core GSF protection practice that involves visualizing a 12th dimensional horizontal light shield around the aura. This practice calls upon Unity with God/Source and creates an impenetrable light field that serves as spiritual protection.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Practice Steps</h4>
                      <ol className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                            <span className="text-xs text-sacred-gold font-bold">1</span>
                          </div>
                          <div>
                            <h5 className="font-medium text-white text-sm">Invocation</h5>
                            <p className="text-cosmic-300 text-sm">Call upon your inner Christ and Unity with God</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                            <span className="text-xs text-sacred-gold font-bold">2</span>
                          </div>
                          <div>
                            <h5 className="font-medium text-white text-sm">Visualization</h5>
                            <p className="text-cosmic-300 text-sm">See 12th dimensional light surrounding your aura</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                            <span className="text-xs text-sacred-gold font-bold">3</span>
                          </div>
                          <div>
                            <h5 className="font-medium text-white text-sm">Seal and Command</h5>
                            <p className="text-cosmic-300 text-sm">Seal the field and command spiritual protection</p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={() => updateProgress('protection', Math.min(100, userProgress.protection + 20))}
                        className="sacred-button w-full"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Practice 12D Shield
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      GSF Clearing & Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Protection Techniques</h4>
                      <div className="grid gap-3">
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Entity Clearing</h5>
                          <p className="text-cosmic-300 text-xs">Remove unwanted consciousness attachments</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Implant Removal</h5>
                          <p className="text-cosmic-300 text-xs">Clear alien technology and control devices</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Space Clearing</h5>
                          <p className="text-cosmic-300 text-xs">Purify home and work environments</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Boundary Setting</h5>
                          <p className="text-cosmic-300 text-xs">Establish energetic sovereignty</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Protection Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cosmic-300">Mastery Level</span>
                          <span className="text-sacred-gold">{userProgress.protection}%</span>
                        </div>
                        <Progress value={userProgress.protection} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="principles">
              <div className="space-y-8">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold text-center">
                      Six GSF Behavioral Principles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gsfPrinciples.map((principle) => (
                        <Card key={principle.id} className="sacred-card hover:border-sacred-gold/40 transition-all duration-300">
                          <CardContent className="p-6 text-center">
                            <div className={`${principle.color} mb-4`}>
                              {principle.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {principle.title}
                            </h3>
                            <p className="text-cosmic-300 text-sm leading-relaxed">
                              {principle.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-sacred-silver">
                        Daily Application
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Morning Practice</h5>
                          <p className="text-cosmic-300 text-xs">Set intention to embody GSF principles</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Mindful Response</h5>
                          <p className="text-cosmic-300 text-xs">Apply principles in challenging situations</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Evening Reflection</h5>
                          <p className="text-cosmic-300 text-xs">Review daily application and growth</p>
                        </div>
                      </div>

                      <Button 
                        onClick={() => updateProgress('behavioral', Math.min(100, userProgress.behavioral + 15))}
                        className="sacred-button w-full"
                      >
                        Practice Session Complete
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-sacred-silver">
                        Principle Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-cosmic-300">Integration Level</span>
                            <span className="text-sacred-gold">{userProgress.behavioral}%</span>
                          </div>
                          <Progress value={userProgress.behavioral} className="h-2" />
                        </div>
                        
                        <div className="text-center">
                          <p className="text-cosmic-300 text-sm mb-4">
                            Character development through spiritual principles
                          </p>
                          <Button 
                            variant="outline"
                            onClick={() => window.location.href = '/concept/gsf-behavioral-principles'}
                          >
                            <BookOpen className="w-4 h-4 mr-2" />
                            Study Principles
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="practices">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Daily GSF Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Morning Routine</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-white">12D Shield Activation</h5>
                            <p className="text-xs text-cosmic-300">Begin day with spiritual protection</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <Heart className="w-5 h-5 text-pink-400 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Unity Vow Declaration</h5>
                            <p className="text-xs text-cosmic-300">Align with God consciousness</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <Star className="w-5 h-5 text-yellow-400 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Intention Setting</h5>
                            <p className="text-xs text-cosmic-300">Set daily spiritual intentions</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Evening Routine</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <Brain className="w-5 h-5 text-purple-400 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Daily Review</h5>
                            <p className="text-xs text-cosmic-300">Reflect on principle application</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <Zap className="w-5 h-5 text-green-400 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Energy Clearing</h5>
                            <p className="text-xs text-cosmic-300">Clear accumulated daily stress</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <Globe className="w-5 h-5 text-teal-400 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Gratitude Practice</h5>
                            <p className="text-xs text-cosmic-300">Acknowledge blessings and growth</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      GSF Tools & Techniques
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="p-4 rounded-lg bg-cosmic-700/30 border border-cosmic-600">
                        <h5 className="font-medium text-white mb-2">Unity Vow</h5>
                        <p className="text-cosmic-300 text-sm mb-3">
                          "Beloved God, I call upon my inner Christ spirit to lovingly seal and fortify my energy field..."
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Practice Unity Vow
                        </Button>
                      </div>

                      <div className="p-4 rounded-lg bg-cosmic-700/30 border border-cosmic-600">
                        <h5 className="font-medium text-white mb-2">GSF Blessing</h5>
                        <p className="text-cosmic-300 text-sm mb-3">
                          Invoke divine protection and healing for self, relationships, and community.
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          <Heart className="w-4 h-4 mr-2" />
                          GSF Blessing Practice
                        </Button>
                      </div>

                      <div className="p-4 rounded-lg bg-cosmic-700/30 border border-cosmic-600">
                        <h5 className="font-medium text-white mb-2">Relationship Healing</h5>
                        <p className="text-cosmic-300 text-sm mb-3">
                          Apply GSF principles to heal and harmonize relationships.
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          <Users className="w-4 h-4 mr-2" />
                          Relationship Practice
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-cosmic-700">
                      <Button 
                        onClick={() => updateProgress('community', Math.min(100, userProgress.community + 20))}
                        className="sacred-button w-full"
                      >
                        Complete Practice Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="healing">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      GSF Healing Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-cosmic-100 leading-relaxed">
                      GSF Healing focuses on addressing root causes of illness and imbalance through spiritual healing, energy work, consciousness clearing, and alignment with natural laws and divine healing forces.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Healing Principles</h4>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <h5 className="text-green-400 font-medium mb-1">Spiritual Healing</h5>
                          <p className="text-cosmic-100 text-sm">Connecting with divine healing forces and Source energy</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <h5 className="text-blue-400 font-medium mb-1">Energy Work</h5>
                          <p className="text-cosmic-100 text-sm">Clearing blockages and restoring natural energy flow</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <h5 className="text-purple-400 font-medium mb-1">Consciousness Clearing</h5>
                          <p className="text-cosmic-100 text-sm">Removing negative patterns and consciousness distortions</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={() => updateProgress('healing', Math.min(100, userProgress.healing + 25))}
                        className="sacred-button w-full"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Healing Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Healing Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Healing Areas</h4>
                      <div className="grid gap-3">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                          <Heart className="w-5 h-5 text-pink-400" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Emotional Healing</h5>
                            <p className="text-cosmic-300 text-xs">Process and integrate emotions</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                          <Brain className="w-5 h-5 text-purple-400" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Mental Healing</h5>
                            <p className="text-cosmic-300 text-xs">Clear negative thought patterns</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                          <Zap className="w-5 h-5 text-yellow-400" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Energy Healing</h5>
                            <p className="text-cosmic-300 text-xs">Restore energetic balance</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                          <Users className="w-5 h-5 text-green-400" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Relationship Healing</h5>
                            <p className="text-cosmic-300 text-xs">Harmonize connections</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Healing Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cosmic-300">Healing Development</span>
                          <span className="text-sacred-gold">{userProgress.healing}%</span>
                        </div>
                        <Progress value={userProgress.healing} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      GSF Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-cosmic-100 leading-relaxed">
                      GSF Community represents groups of people committed to living the GSF principles and supporting each other's spiritual development through shared practices, mutual support, and collective service to the Law of One consciousness.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Community Elements</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <Users className="w-5 h-5 text-blue-400 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Group Meditation</h5>
                            <p className="text-xs text-cosmic-300">Collective spiritual practice and connection</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <Heart className="w-5 h-5 text-pink-400 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Mutual Support</h5>
                            <p className="text-xs text-cosmic-300">Emotional and spiritual support network</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                          <Globe className="w-5 h-5 text-green-400 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-white">Service Projects</h5>
                            <p className="text-xs text-cosmic-300">Collective service to humanity and Earth</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={() => window.location.href = '/community'}
                        className="sacred-button w-full"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Join GSF Community
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Stewardship & Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-cosmic-100 leading-relaxed">
                      GSF Stewardship involves taking responsibility for planetary healing, environmental consciousness, and serving as guardians of Earth and humanity during the ascension process.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Service Areas</h4>
                      <div className="grid gap-3">
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Planetary Healing</h5>
                          <p className="text-cosmic-300 text-xs">Earth grid work and environmental consciousness</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Community Service</h5>
                          <p className="text-cosmic-300 text-xs">Local community support and outreach</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cosmic-700/30">
                          <h5 className="text-sm font-medium text-white mb-1">Conscious Living</h5>
                          <p className="text-cosmic-300 text-xs">Sustainable and ethical lifestyle choices</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Community Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cosmic-300">Service Development</span>
                          <span className="text-sacred-gold">{userProgress.community}%</span>
                        </div>
                        <Progress value={userProgress.community} className="h-2" />
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