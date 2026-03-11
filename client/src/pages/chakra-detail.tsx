import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { chakraData, getChakraById, type ChakraData } from "@/lib/chakra-data";
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Brain, 
  Shield, 
  Target,
  Users,
  Calendar,
  Play,
  Book
} from "lucide-react";
import { Link } from "wouter";

export default function ChakraDetailPage() {
  const [chakra, setChakra] = useState<ChakraData | null>(null);
  const [userProgress, setUserProgress] = useState(0);
  const [activationLevel, setActivationLevel] = useState(0);

  useEffect(() => {
    // Get chakra ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const chakraId = parseInt(urlParams.get('id') || '1');
    
    const foundChakra = getChakraById(chakraId);
    if (foundChakra) {
      setChakra(foundChakra);
      
      // Load saved progress
      const savedProgress = localStorage.getItem(`chakra-progress-${chakraId}`);
      setUserProgress(savedProgress ? parseInt(savedProgress) : 0);
      
      const savedActivation = localStorage.getItem(`chakra-activation-${chakraId}`);
      setActivationLevel(savedActivation ? parseInt(savedActivation) : 0);
    }
  }, []);

  const updateProgress = (newProgress: number) => {
    setUserProgress(newProgress);
    localStorage.setItem(`chakra-progress-${chakra?.id}`, newProgress.toString());
  };

  const updateActivation = (newLevel: number) => {
    setActivationLevel(newLevel);
    localStorage.setItem(`chakra-activation-${chakra?.id}`, newLevel.toString());
  };

  if (!chakra) {
    return (
      <div className="min-h-screen bg-cosmic-900 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-cosmic-400" />
          <h2 className="text-xl font-semibold text-white mb-2">Chakra Not Found</h2>
          <p className="text-cosmic-300">The requested chakra could not be found.</p>
          <Link href="/chakras">
            <Button className="mt-4" variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chakras
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Header */}
      <section className="cosmic-gradient py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <Link href="/chakras">
            <Button variant="ghost" className="mb-6 text-cosmic-200 hover:text-sacred-gold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chakra System
            </Button>
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center space-x-6 mb-6">
              <div 
                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: chakra.color }}
              >
                {chakra.id}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-sacred font-bold text-sacred-gold">
                  {chakra.name}
                </h1>
                <p className="text-xl text-cosmic-100 mt-2">
                  {chakra.location} • {chakra.dimension}
                </p>
                <Badge variant="outline" className="mt-2 border-sacred-gold/50 text-sacred-gold">
                  {chakra.category.charAt(0).toUpperCase() + chakra.category.slice(1)} Chakra
                </Badge>
              </div>
            </div>
            
            <p className="text-xl text-cosmic-100 leading-relaxed">
              {chakra.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid grid-cols-4 bg-cosmic-700/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activation">Activation</TabsTrigger>
                  <TabsTrigger value="practices">Practices</TabsTrigger>
                  <TabsTrigger value="healing">Healing</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Chakra Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Function</h3>
                          <p className="text-cosmic-100 leading-relaxed">
                            {chakra.function}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Ascension Purpose</h3>
                          <p className="text-cosmic-100 leading-relaxed">
                            {chakra.ascensionPurpose}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Connections</h3>
                        <div className="flex flex-wrap gap-2">
                          {chakra.connections.map((connection) => (
                            <Badge key={connection} variant="outline" className="border-cosmic-500/30 text-cosmic-400">
                              {connection}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Associated Practices</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {chakra.practices.map((practice, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 rounded-lg bg-cosmic-700/30">
                              <Target className="w-4 h-4 text-sacred-gold" />
                              <span className="text-cosmic-100 text-sm">{practice}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activation">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Chakra Activation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-cosmic-300">Activation Level</span>
                            <span className="text-sacred-gold">{activationLevel}%</span>
                          </div>
                          <Progress value={activationLevel} className="h-3" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-semibold text-white">Activation Techniques</h4>
                            <ul className="space-y-2 text-sm text-cosmic-100">
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-gold rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                Focused meditation on chakra location
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-gold rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                Visualization with appropriate color
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-gold rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                Sound healing and mantras
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-gold rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                Energy breathing exercises
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-4">
                            <h4 className="font-semibold text-white">Signs of Activation</h4>
                            <ul className="space-y-2 text-sm text-cosmic-100">
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-silver rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                Increased awareness and sensitivity
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-silver rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                Enhanced intuitive abilities
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-silver rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                Emotional balance and stability
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-silver rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                Increased life force energy
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button 
                            onClick={() => updateActivation(Math.min(100, activationLevel + 20))}
                            className="sacred-button"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Practice Session
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => window.location.href = '/meditation'}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Guided Meditation
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="practices">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Daily Practices
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white flex items-center">
                            <Star className="w-4 h-4 mr-2 text-sacred-gold" />
                            Morning Practices
                          </h4>
                          <ul className="space-y-3">
                            <li className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                              <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                                <span className="text-xs text-sacred-gold">1</span>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Activation Meditation</h5>
                                <p className="text-xs text-cosmic-300">10-15 minutes focused meditation</p>
                              </div>
                            </li>
                            <li className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                              <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                                <span className="text-xs text-sacred-gold">2</span>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Energy Breathing</h5>
                                <p className="text-xs text-cosmic-300">Conscious breathing exercises</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white flex items-center">
                            <Brain className="w-4 h-4 mr-2 text-sacred-gold" />
                            Evening Practices
                          </h4>
                          <ul className="space-y-3">
                            <li className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                              <div className="w-6 h-6 rounded-full bg-sacred-silver/20 flex items-center justify-center mt-0.5">
                                <span className="text-xs text-sacred-silver">1</span>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Reflection & Journaling</h5>
                                <p className="text-xs text-cosmic-300">Document insights and experiences</p>
                              </div>
                            </li>
                            <li className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                              <div className="w-6 h-6 rounded-full bg-sacred-silver/20 flex items-center justify-center mt-0.5">
                                <span className="text-xs text-sacred-silver">2</span>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Gratitude Practice</h5>
                                <p className="text-xs text-cosmic-300">Appreciation and integration</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cosmic-700">
                        <h4 className="font-semibold text-white mb-3">Practice Progress</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-cosmic-300">Consistency Level</span>
                            <span className="text-sacred-gold">{userProgress}%</span>
                          </div>
                          <Progress value={userProgress} className="h-2" />
                          <div className="flex gap-2 mt-3">
                            <Button 
                              size="sm" 
                              onClick={() => updateProgress(Math.min(100, userProgress + 25))}
                              className="sacred-button"
                            >
                              Complete Session
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateProgress(0)}
                            >
                              Reset Progress
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="healing">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Healing & Balance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">Common Imbalances</h4>
                          <div className="space-y-3 text-sm">
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                              <h5 className="text-red-400 font-medium mb-1">Underactive Symptoms</h5>
                              <p className="text-cosmic-100">Blockages, low energy, emotional numbness</p>
                            </div>
                            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                              <h5 className="text-orange-400 font-medium mb-1">Overactive Symptoms</h5>
                              <p className="text-cosmic-100">Excessive energy, emotional volatility, restlessness</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">Healing Techniques</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                              <Shield className="w-5 h-5 text-green-400" />
                              <div>
                                <h5 className="text-sm font-medium text-white">Energy Clearing</h5>
                                <p className="text-xs text-cosmic-300">Remove blockages and stagnant energy</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                              <Heart className="w-5 h-5 text-pink-400" />
                              <div>
                                <h5 className="text-sm font-medium text-white">Emotional Healing</h5>
                                <p className="text-xs text-cosmic-300">Process and integrate emotions</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                              <Star className="w-5 h-5 text-yellow-400" />
                              <div>
                                <h5 className="text-sm font-medium text-white">Light Integration</h5>
                                <p className="text-xs text-cosmic-300">Increase frequency and vibration</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cosmic-700">
                        <div className="flex gap-3">
                          <Button 
                            variant="outline"
                            onClick={() => window.location.href = '/tools'}
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Healing Tools
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => window.location.href = '/community'}
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Join Healing Circle
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Chakras */}
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="text-lg font-sacred text-sacred-silver">
                    Related Chakras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {chakraData.filter(c => c.id !== chakra.id && c.category === chakra.category).slice(0, 3).map((relatedChakra) => (
                      <div 
                        key={relatedChakra.id}
                        className="p-3 rounded-lg bg-cosmic-700/30 cursor-pointer hover:bg-cosmic-700/50 transition-all duration-300"
                        onClick={() => window.location.href = `/chakra-detail?id=${relatedChakra.id}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: relatedChakra.color }}
                          >
                            {relatedChakra.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-white text-sm">{relatedChakra.name}</h4>
                            <p className="text-cosmic-300 text-xs">{relatedChakra.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => window.location.href = '/chakras'}
                  >
                    View All Chakras
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
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
                    Start Meditation
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/tools'}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Energy Scanner
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/progress'}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Track Progress
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}