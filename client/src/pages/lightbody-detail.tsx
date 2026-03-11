import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { lightbodyLayers, type LightbodyLayer } from "@/lib/lightbody-data";
import { 
  ArrowLeft, 
  Layers, 
  Star, 
  Brain, 
  Shield, 
  Target,
  Users,
  Calendar,
  Play,
  Zap
} from "lucide-react";
import { Link } from "wouter";

export default function LightbodyDetailPage() {
  const [layer, setLayer] = useState<LightbodyLayer | null>(null);
  const [userProgress, setUserProgress] = useState(0);
  const [integrationLevel, setIntegrationLevel] = useState(0);

  useEffect(() => {
    // Get layer ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const layerId = parseInt(urlParams.get('id') || '1');
    
    const foundLayer = lightbodyLayers.find(l => l.id === layerId);
    if (foundLayer) {
      setLayer(foundLayer);
      
      // Load saved progress
      const savedProgress = localStorage.getItem(`lightbody-progress-${layerId}`);
      setUserProgress(savedProgress ? parseInt(savedProgress) : 0);
      
      const savedIntegration = localStorage.getItem(`lightbody-integration-${layerId}`);
      setIntegrationLevel(savedIntegration ? parseInt(savedIntegration) : 0);
    }
  }, []);

  const updateProgress = (newProgress: number) => {
    setUserProgress(newProgress);
    localStorage.setItem(`lightbody-progress-${layer?.id}`, newProgress.toString());
  };

  const updateIntegration = (newLevel: number) => {
    setIntegrationLevel(newLevel);
    localStorage.setItem(`lightbody-integration-${layer?.id}`, newLevel.toString());
  };

  if (!layer) {
    return (
      <div className="min-h-screen bg-cosmic-900 flex items-center justify-center">
        <div className="text-center">
          <Layers className="w-12 h-12 mx-auto mb-4 text-cosmic-400" />
          <h2 className="text-xl font-semibold text-white mb-2">Layer Not Found</h2>
          <p className="text-cosmic-300">The requested lightbody layer could not be found.</p>
          <Link href="/lightbody">
            <Button className="mt-4" variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lightbody
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
          <Link href="/lightbody">
            <Button variant="ghost" className="mb-6 text-cosmic-200 hover:text-sacred-gold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lightbody System
            </Button>
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center space-x-6 mb-6">
              <div 
                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-2xl font-bold relative"
                style={{ backgroundColor: layer.color }}
              >
                <Zap className="w-8 h-8" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-sacred-gold rounded-full flex items-center justify-center text-xs font-bold text-cosmic-900">
                  {layer.id}
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-sacred font-bold text-sacred-gold">
                  {layer.name}
                </h1>
                <p className="text-xl text-cosmic-100 mt-2">
                  {layer.frequency} • Layer {layer.id}
                </p>
                <Badge variant="outline" className="mt-2 border-sacred-gold/50 text-sacred-gold">
                  Lightbody Layer
                </Badge>
              </div>
            </div>
            
            <p className="text-xl text-cosmic-100 leading-relaxed">
              {layer.description}
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
                  <TabsTrigger value="integration">Integration</TabsTrigger>
                  <TabsTrigger value="practices">Practices</TabsTrigger>
                  <TabsTrigger value="activation">Activation</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Layer Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Function</h3>
                          <p className="text-cosmic-100 leading-relaxed">
                            {layer.function}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Ascension Purpose</h3>
                          <p className="text-cosmic-100 leading-relaxed">
                            {layer.ascensionPurpose}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Key Characteristics</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                              <Zap className="w-5 h-5 text-sacred-gold" />
                              <div>
                                <h4 className="text-sm font-medium text-white">Frequency</h4>
                                <p className="text-xs text-cosmic-300">{layer.frequency}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                              <Layers className="w-5 h-5 text-sacred-silver" />
                              <div>
                                <h4 className="text-sm font-medium text-white">Layer Position</h4>
                                <p className="text-xs text-cosmic-300">Position {layer.id} of 7</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                              <Star className="w-5 h-5 text-yellow-400" />
                              <div>
                                <h4 className="text-sm font-medium text-white">Integration Level</h4>
                                <p className="text-xs text-cosmic-300">{integrationLevel}% Complete</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                              <Target className="w-5 h-5 text-green-400" />
                              <div>
                                <h4 className="text-sm font-medium text-white">Study Progress</h4>
                                <p className="text-xs text-cosmic-300">{userProgress}% Complete</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Related Connections</h3>
                        <div className="flex flex-wrap gap-2">
                          {layer.connections.map((connection) => (
                            <Badge key={connection} variant="outline" className="border-cosmic-500/30 text-cosmic-400">
                              {connection}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="integration">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Lightbody Integration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-cosmic-300">Integration Progress</span>
                            <span className="text-sacred-gold">{integrationLevel}%</span>
                          </div>
                          <Progress value={integrationLevel} className="h-3" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-semibold text-white">Integration Process</h4>
                            <ul className="space-y-3 text-sm text-cosmic-100">
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-gold rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                Frequency attunement and alignment
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-gold rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                Cellular restructuring and DNA activation
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-gold rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                Consciousness expansion and awareness
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-gold rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                Energy field stabilization
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-4">
                            <h4 className="font-semibold text-white">Integration Signs</h4>
                            <ul className="space-y-3 text-sm text-cosmic-100">
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-silver rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                Enhanced intuitive abilities
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-silver rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                Increased energy sensitivity
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-silver rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                Expanded consciousness states
                              </li>
                              <li className="flex items-start">
                                <span className="w-2 h-2 bg-sacred-silver rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                Physical and emotional clearing
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button 
                            onClick={() => updateIntegration(Math.min(100, integrationLevel + 15))}
                            className="sacred-button"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Integration Session
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => window.location.href = '/meditation'}
                          >
                            <Layers className="w-4 h-4 mr-2" />
                            Guided Integration
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
                        Layer Practices
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white flex items-center">
                            <Star className="w-4 h-4 mr-2 text-sacred-gold" />
                            Activation Practices
                          </h4>
                          <div className="space-y-3">
                            {layer.practices.map((practice, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                                <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                                  <span className="text-xs text-sacred-gold">{index + 1}</span>
                                </div>
                                <div className="flex-1">
                                  <h5 className="text-sm font-medium text-white">{practice}</h5>
                                  <p className="text-xs text-cosmic-300 mt-1">
                                    Recommended daily practice for optimal integration
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white flex items-center">
                            <Brain className="w-4 h-4 mr-2 text-sacred-gold" />
                            Support Practices
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                              <div className="w-6 h-6 rounded-full bg-sacred-silver/20 flex items-center justify-center mt-0.5">
                                <span className="text-xs text-sacred-silver">1</span>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Energy Protection</h5>
                                <p className="text-xs text-cosmic-300">12D Shield and boundary practices</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                              <div className="w-6 h-6 rounded-full bg-sacred-silver/20 flex items-center justify-center mt-0.5">
                                <span className="text-xs text-sacred-silver">2</span>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Grounding Work</h5>
                                <p className="text-xs text-cosmic-300">Earth connection and stability</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/20">
                              <div className="w-6 h-6 rounded-full bg-sacred-silver/20 flex items-center justify-center mt-0.5">
                                <span className="text-xs text-sacred-silver">3</span>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-white">Integration Support</h5>
                                <p className="text-xs text-cosmic-300">Nutrition, rest, and self-care</p>
                              </div>
                            </div>
                          </div>
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
                              onClick={() => updateProgress(Math.min(100, userProgress + 20))}
                              className="sacred-button"
                            >
                              Complete Practice
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

                <TabsContent value="activation">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Layer Activation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">Activation Sequence</h4>
                          <div className="space-y-3 text-sm">
                            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                              <h5 className="text-blue-400 font-medium mb-1">Phase 1: Preparation</h5>
                              <p className="text-cosmic-100">Grounding, protection, and intention setting</p>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                              <h5 className="text-purple-400 font-medium mb-1">Phase 2: Attunement</h5>
                              <p className="text-cosmic-100">Frequency alignment and energy calibration</p>
                            </div>
                            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                              <h5 className="text-green-400 font-medium mb-1">Phase 3: Integration</h5>
                              <p className="text-cosmic-100">Cellular absorption and consciousness expansion</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">Activation Support</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                              <Shield className="w-5 h-5 text-green-400" />
                              <div>
                                <h5 className="text-sm font-medium text-white">Protection Protocol</h5>
                                <p className="text-xs text-cosmic-300">Maintain 12D Shield during activation</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                              <Star className="w-5 h-5 text-yellow-400" />
                              <div>
                                <h5 className="text-sm font-medium text-white">Divine Connection</h5>
                                <p className="text-xs text-cosmic-300">Invoke highest guidance and support</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                              <Target className="w-5 h-5 text-blue-400" />
                              <div>
                                <h5 className="text-sm font-medium text-white">Integration Focus</h5>
                                <p className="text-xs text-cosmic-300">Allow natural integration process</p>
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
                            Energy Tools
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => window.location.href = '/community'}
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Activation Group
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
              {/* Related Layers */}
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="text-lg font-sacred text-sacred-silver">
                    Related Layers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lightbodyLayers.filter(l => l.id !== layer.id).slice(0, 3).map((relatedLayer) => (
                      <div 
                        key={relatedLayer.id}
                        className="p-3 rounded-lg bg-cosmic-700/30 cursor-pointer hover:bg-cosmic-700/50 transition-all duration-300"
                        onClick={() => window.location.href = `/lightbody-detail?id=${relatedLayer.id}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: relatedLayer.color }}
                          >
                            {relatedLayer.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-white text-sm">{relatedLayer.name}</h4>
                            <p className="text-cosmic-300 text-xs">{relatedLayer.frequency}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => window.location.href = '/lightbody'}
                  >
                    View All Layers
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
                    Start Integration
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/tools'}
                  >
                    <Zap className="w-4 h-4 mr-2" />
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