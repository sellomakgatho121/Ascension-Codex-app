import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConceptVisualization } from "@/components/interactive/concept-visualization";
import { ProgressTracker } from "@/components/interactive/progress-tracker";
import { generateConceptPageData, type ConceptPageData } from "@/lib/page-generator";
import { 
  ArrowLeft, 
  BookOpen, 
  Play, 
  Target, 
  Users, 
  Calendar,
  Star,
  Clock,
  CheckCircle,
  Lightbulb,
  Heart,
  Shield,
  Zap
} from "lucide-react";

export default function ConceptDetailPage() {
  const [pageData, setPageData] = useState<ConceptPageData | null>(null);
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  useEffect(() => {
    // Get concept ID from URL
    const pathParts = window.location.pathname.split('/');
    const conceptId = pathParts[pathParts.length - 1];
    
    if (conceptId) {
      const data = generateConceptPageData(conceptId);
      setPageData(data);
      
      // Load completed exercises
      const saved = localStorage.getItem(`completed-exercises-${conceptId}`);
      if (saved) {
        setCompletedExercises(JSON.parse(saved));
      }
    }
  }, []);

  const markExerciseComplete = (exerciseId: string) => {
    const updated = [...completedExercises, exerciseId];
    setCompletedExercises(updated);
    localStorage.setItem(`completed-exercises-${pageData?.concept.id}`, JSON.stringify(updated));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'protection': return <Shield className="w-5 h-5" />;
      case 'consciousness': return <Lightbulb className="w-5 h-5" />;
      case 'anatomy': return <Heart className="w-5 h-5" />;
      case 'ascension': return <Star className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'protection': return 'text-blue-400 border-blue-400/40';
      case 'consciousness': return 'text-purple-400 border-purple-400/40';
      case 'anatomy': return 'text-green-400 border-green-400/40';
      case 'ascension': return 'text-yellow-400 border-yellow-400/40';
      case 'timeline': return 'text-orange-400 border-orange-400/40';
      case 'planetary': return 'text-teal-400 border-teal-400/40';
      case 'galactic': return 'text-indigo-400 border-indigo-400/40';
      default: return 'text-sacred-gold border-sacred-gold/40';
    }
  };

  if (!pageData) {
    return (
      <div className="min-h-screen bg-cosmic-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-cosmic-400" />
          <h2 className="text-xl font-semibold text-white mb-2">Loading Concept...</h2>
          <p className="text-cosmic-300">Please wait while we prepare your comprehensive study materials.</p>
        </div>
      </div>
    );
  }

  const { concept, relatedConcepts, practicalExercises, studyPlan, interactiveElements } = pageData;

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
              <div className={`p-3 rounded-lg bg-cosmic-700/50 ${getCategoryColor(concept.category).split(' ')[0]}`}>
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
                <TabsList className="grid grid-cols-5 bg-cosmic-700/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="exercises">Exercises</TabsTrigger>
                  <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
                  <TabsTrigger value="interactive">Interactive</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-6">
                    <Card className="sacred-card">
                      <CardHeader>
                        <CardTitle className="text-xl font-sacred text-sacred-gold">
                          Comprehensive Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Core Definition</h3>
                          <p className="text-cosmic-100 leading-relaxed">
                            {concept.definition}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Related Concepts</h3>
                          <div className="flex flex-wrap gap-2">
                            {concept.relatedTerms.map((term) => (
                              <Badge key={term} variant="outline" className="border-cosmic-500/30 text-cosmic-400">
                                {term}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Practical Applications</h3>
                          <div className="grid gap-3">
                            {concept.applications.map((app, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-cosmic-700/30">
                                <Target className="w-5 h-5 text-sacred-gold mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium text-white text-sm mb-1">
                                    Application {index + 1}
                                  </h4>
                                  <p className="text-cosmic-100 text-sm">
                                    {app}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-cosmic-700">
                          <div className="flex items-center justify-between text-sm text-cosmic-400">
                            <span>Source: {concept.source}</span>
                            <Badge variant="outline" className="text-cosmic-400 border-cosmic-500/30">
                              {concept.category}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="exercises">
                  <div className="space-y-6">
                    <Card className="sacred-card">
                      <CardHeader>
                        <CardTitle className="text-xl font-sacred text-sacred-gold">
                          Practical Exercises
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {practicalExercises.map((exercise, index) => (
                            <Card 
                              key={exercise.id}
                              className={`cursor-pointer transition-all duration-300 ${
                                selectedExercise === index 
                                  ? 'border-sacred-gold/60 bg-cosmic-700/50' 
                                  : 'border-cosmic-600/30 hover:border-cosmic-500/50'
                              }`}
                              onClick={() => setSelectedExercise(index)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <h4 className="font-medium text-white">{exercise.title}</h4>
                                      <Badge 
                                        variant="outline" 
                                        className={
                                          exercise.difficulty === 'beginner' ? 'text-green-400 border-green-400/40' :
                                          exercise.difficulty === 'intermediate' ? 'text-yellow-400 border-yellow-400/40' :
                                          'text-red-400 border-red-400/40'
                                        }
                                      >
                                        {exercise.difficulty}
                                      </Badge>
                                      {completedExercises.includes(exercise.id) && (
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                      )}
                                    </div>
                                    <p className="text-cosmic-300 text-sm mb-2">{exercise.description}</p>
                                    <div className="flex items-center space-x-4 text-xs text-cosmic-400">
                                      <span className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {exercise.duration}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        {/* Selected Exercise Details */}
                        {practicalExercises[selectedExercise] && (
                          <div className="mt-6 p-6 rounded-lg bg-cosmic-700/30 border border-cosmic-600">
                            <h4 className="font-semibold text-white mb-4">Exercise Steps</h4>
                            <ol className="space-y-2">
                              {practicalExercises[selectedExercise].steps.map((step, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                  <div className="w-6 h-6 rounded-full bg-sacred-gold/20 flex items-center justify-center mt-0.5">
                                    <span className="text-xs text-sacred-gold font-bold">{index + 1}</span>
                                  </div>
                                  <span className="text-cosmic-100 text-sm">{step}</span>
                                </li>
                              ))}
                            </ol>
                            <div className="mt-4 flex gap-2">
                              <Button 
                                onClick={() => {
                                  const exercise = practicalExercises[selectedExercise];
                                  if (exercise) markExerciseComplete(exercise.id);
                                }}
                                disabled={!practicalExercises[selectedExercise] || completedExercises.includes(practicalExercises[selectedExercise]?.id ?? '')}
                                className="sacred-button"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {completedExercises.includes(practicalExercises[selectedExercise].id) 
                                  ? 'Completed' 
                                  : 'Mark Complete'
                                }
                              </Button>
                              <Button variant="outline">
                                <Play className="w-4 h-4 mr-2" />
                                Start Exercise
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="study-plan">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Comprehensive Study Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {studyPlan.map((phase) => (
                        <div key={phase.phase} className="border border-cosmic-600 rounded-lg p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-sacred-gold/20 flex items-center justify-center">
                              <span className="text-sm font-bold text-sacred-gold">{phase.phase}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{phase.title}</h4>
                              <p className="text-xs text-cosmic-400">{phase.duration}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-cosmic-200 mb-2">Objectives</h5>
                              <ul className="space-y-1">
                                {phase.objectives.map((objective, index) => (
                                  <li key={index} className="text-sm text-cosmic-300 flex items-start">
                                    <Target className="w-3 h-3 mr-2 mt-0.5 text-sacred-gold flex-shrink-0" />
                                    {objective}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-cosmic-200 mb-2">Activities</h5>
                              <ul className="space-y-1">
                                {phase.activities.map((activity, index) => (
                                  <li key={index} className="text-sm text-cosmic-300 flex items-start">
                                    <Calendar className="w-3 h-3 mr-2 mt-0.5 text-sacred-silver flex-shrink-0" />
                                    {activity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="interactive">
                  <div className="space-y-6">
                    <ConceptVisualization 
                      conceptTerm={concept.term}
                      category={concept.category}
                    />
                    
                    <Card className="sacred-card">
                      <CardHeader>
                        <CardTitle className="text-lg font-sacred text-sacred-gold">
                          Interactive Learning Tools
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {interactiveElements.map((element, index) => (
                            <div key={index} className="p-4 rounded-lg bg-cosmic-700/30 border border-cosmic-600">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="p-2 rounded bg-cosmic-600/30">
                                  {element.type === 'visualization' && <Zap className="w-4 h-4 text-yellow-400" />}
                                  {element.type === 'meditation' && <Heart className="w-4 h-4 text-pink-400" />}
                                  {element.type === 'quiz' && <Lightbulb className="w-4 h-4 text-blue-400" />}
                                  {element.type === 'tracker' && <Target className="w-4 h-4 text-green-400" />}
                                  {element.type === 'journal' && <BookOpen className="w-4 h-4 text-purple-400" />}
                                </div>
                                <h4 className="font-medium text-white">{element.title}</h4>
                              </div>
                              <p className="text-cosmic-300 text-sm mb-3">{element.description}</p>
                              <Button size="sm" variant="outline">
                                Launch Tool
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="community">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Community & Discussion
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 mx-auto mb-4 text-cosmic-400" />
                        <h3 className="text-lg font-semibold text-white mb-2">Join the Discussion</h3>
                        <p className="text-cosmic-300 mb-4">
                          Connect with others studying {concept.term} and share your insights.
                        </p>
                        <Button 
                          onClick={() => window.location.href = '/community'}
                          className="sacred-button"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Join Community
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ProgressTracker 
                conceptId={concept.id}
                conceptTerm={concept.term}
              />

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
                        onClick={() => window.location.href = `/concept-detail/${relatedConcept.id}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-white text-sm">{relatedConcept.term}</h4>
                            <p className="text-cosmic-300 text-xs line-clamp-2">
                              {relatedConcept.definition.substring(0, 80)}...
                            </p>
                          </div>
                          <Badge variant="outline" className={`${getCategoryColor(relatedConcept.category)} text-xs`}>
                            {getCategoryIcon(relatedConcept.category)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
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
                    Start Practice
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/tools'}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Energy Tools
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/community'}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Study Groups
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