import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  energeticSynthesisKnowledgeBase, 
  getRelatedESConcepts,
  type ESConcept 
} from "@/lib/es-knowledge-base";
import { 
  ArrowLeft, 
  BookOpen, 
  Star, 
  Brain, 
  Shield, 
  Clock, 
  Globe, 
  Zap, 
  Layers, 
  ExternalLink,
  Target,
  Users,
  Calendar,
  Heart
} from "lucide-react";

export default function ConceptPage() {
  const [concept, setConcept] = useState<ESConcept | null>(null);
  const [relatedConcepts, setRelatedConcepts] = useState<ESConcept[]>([]);
  const [userProgress, setUserProgress] = useState(0);

  useEffect(() => {
    // Get concept ID from URL path
    const pathParts = window.location.pathname.split('/');
    const conceptId = pathParts[pathParts.length - 1];
    
    if (conceptId) {
      const foundConcept = energeticSynthesisKnowledgeBase.find(c => c.id === conceptId);
      if (foundConcept) {
        setConcept(foundConcept);
        setRelatedConcepts(getRelatedESConcepts(conceptId));
        
        // Simulate user progress for this concept
        const savedProgress = localStorage.getItem(`concept-progress-${conceptId}`);
        setUserProgress(savedProgress ? parseInt(savedProgress) : 0);
      }
    }
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ascension': return <Star className="w-5 h-5" />;
      case 'consciousness': return <Brain className="w-5 h-5" />;
      case 'anatomy': return <Layers className="w-5 h-5" />;
      case 'protection': return <Shield className="w-5 h-5" />;
      case 'timeline': return <Clock className="w-5 h-5" />;
      case 'planetary': return <Globe className="w-5 h-5" />;
      case 'galactic': return <Zap className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ascension': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'consciousness': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'anatomy': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'protection': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'timeline': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'planetary': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'galactic': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      default: return 'bg-cosmic-500/20 text-cosmic-400 border-cosmic-500/30';
    }
  };

  const updateProgress = (newProgress: number) => {
    setUserProgress(newProgress);
    localStorage.setItem(`concept-progress-${concept?.id}`, newProgress.toString());
  };

  if (!concept) {
    return (
      <div className="min-h-screen bg-cosmic-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-cosmic-400" />
          <h2 className="text-xl font-semibold text-white mb-2">Concept Not Found</h2>
          <p className="text-cosmic-300">The requested concept could not be found.</p>
          <Button 
            onClick={() => window.history.back()}
            className="mt-4"
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Header */}
      <section className="cosmic-gradient py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <Button 
            onClick={() => window.history.back()}
            variant="ghost" 
            className="mb-6 text-cosmic-200 hover:text-sacred-gold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Knowledge Base
          </Button>
          
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className={`p-3 rounded-lg ${getCategoryColor(concept.category).replace('text-', 'bg-').replace('border-', '').split(' ')[0]}`}>
                {getCategoryIcon(concept.category)}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-sacred font-bold text-sacred-gold">
                  {concept.term}
                </h1>
                <Badge variant="outline" className={`mt-2 ${getCategoryColor(concept.category)}`}>
                  {concept.category.charAt(0).toUpperCase() + concept.category.slice(1)}
                </Badge>
              </div>
            </div>
            
            <p className="text-xl text-cosmic-100 leading-relaxed">
              {concept.definition}
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
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="practices">Practices</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Detailed Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Definition</h3>
                        <p className="text-cosmic-100 leading-relaxed">
                          {concept.definition}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Key Aspects</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Target className="w-4 h-4 text-sacred-gold" />
                              <span className="text-sm font-medium text-cosmic-200">Category</span>
                            </div>
                            <p className="text-cosmic-100 text-sm pl-6">
                              {concept.category.charAt(0).toUpperCase() + concept.category.slice(1)} mechanics and principles
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="w-4 h-4 text-sacred-gold" />
                              <span className="text-sm font-medium text-cosmic-200">Source</span>
                            </div>
                            <p className="text-cosmic-100 text-sm pl-6">
                              {concept.source}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Related Terms</h3>
                        <div className="flex flex-wrap gap-2">
                          {concept.relatedTerms.map((term) => (
                            <Badge key={term} variant="outline" className="border-cosmic-500/30 text-cosmic-400">
                              {term}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="applications">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Practical Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {concept.applications.map((application, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-cosmic-700/30">
                            <Target className="w-5 h-5 text-sacred-gold mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-white mb-1">
                                Application {index + 1}
                              </h4>
                              <p className="text-cosmic-100 text-sm leading-relaxed">
                                {application}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="practices">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Recommended Practices
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white flex items-center">
                            <Heart className="w-4 h-4 mr-2 text-sacred-gold" />
                            Daily Integration
                          </h4>
                          <ul className="space-y-2 text-sm text-cosmic-100">
                            <li>• Contemplation and reflection practices</li>
                            <li>• Meditation focused on this concept</li>
                            <li>• Journaling insights and experiences</li>
                            <li>• Integration in daily spiritual routine</li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white flex items-center">
                            <Users className="w-4 h-4 mr-2 text-sacred-gold" />
                            Group Study
                          </h4>
                          <ul className="space-y-2 text-sm text-cosmic-100">
                            <li>• Discussion circles and study groups</li>
                            <li>• Shared experiences and insights</li>
                            <li>• Collaborative research projects</li>
                            <li>• Community integration practices</li>
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cosmic-700">
                        <h4 className="font-semibold text-white mb-3">Study Progress</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-cosmic-300">Understanding Level</span>
                            <span className="text-sacred-gold">{userProgress}%</span>
                          </div>
                          <Progress value={userProgress} className="h-2" />
                          <div className="flex gap-2 mt-3">
                            <Button 
                              size="sm" 
                              onClick={() => updateProgress(Math.min(100, userProgress + 25))}
                              className="sacred-button"
                            >
                              Mark Progress
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateProgress(0)}
                            >
                              Reset
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Additional Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-sacred-gold" />
                            Study Materials
                          </h4>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Energetic Synthesis Articles
                            </Button>
                            <Button variant="outline" className="w-full justify-start" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Ascension Glossary
                            </Button>
                            <Button variant="outline" className="w-full justify-start" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Monthly Newsletters
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-sacred-gold" />
                            Study Schedule
                          </h4>
                          <div className="space-y-2 text-sm text-cosmic-100">
                            <div className="flex justify-between">
                              <span>Week 1:</span>
                              <span>Foundation study</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Week 2:</span>
                              <span>Practical application</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Week 3:</span>
                              <span>Integration practice</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Week 4:</span>
                              <span>Advanced concepts</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Concepts */}
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="text-lg font-sacred text-sacred-silver">
                    Related Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedConcepts.slice(0, 5).map((relatedConcept) => (
                      <div 
                        key={relatedConcept.id}
                        className="p-3 rounded-lg bg-cosmic-700/30 cursor-pointer hover:bg-cosmic-700/50 transition-all duration-300"
                        onClick={() => window.location.href = `/concept/${relatedConcept.id}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-white text-sm">{relatedConcept.term}</h4>
                            <p className="text-cosmic-300 text-xs line-clamp-2">
                              {relatedConcept.definition.substring(0, 100)}...
                            </p>
                          </div>
                          <Badge variant="outline" className={`${getCategoryColor(relatedConcept.category)} text-xs`}>
                            {getCategoryIcon(relatedConcept.category)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => window.location.href = '/knowledge-base'}
                  >
                    View All Concepts
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
                    onClick={() => window.location.href = '/tools'}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Practice Tools
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/community'}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Join Discussion
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