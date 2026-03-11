import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  universalTimeMatrixKnowledge,
  getUTMConceptsByCategory,
  searchUTMKnowledge,
  utmCategories,
  harmonicUniverses,
  type TimeMatrixConcept
} from "@/lib/universal-time-matrix";
import { UniversalTimeMatrixDiagram } from "@/components/diagrams/universal-time-matrix-diagram";
import {
  ArrowLeft,
  Atom,
  Grid3X3,
  Layers,
  Zap,
  Clock,
  Eye,
  Crown,
  Heart,
  Star,
  Globe,
  Infinity,
  Triangle,
  Circle,
  Square
} from "lucide-react";

export default function UniversalTimeMatrixPage() {
  const [selectedCategory, setSelectedCategory] = useState("structure");
  const [selectedHU, setSelectedHU] = useState<string | null>(null);

  const handleHUSelect = (huId: string) => {
    console.log('Page received HU selection:', huId);
    setSelectedHU(huId);
  };

  const [studyProgress, setStudyProgress] = useState({
    structure: 0,
    dimensions: 0,
    mechanics: 0,
    history: 0,
    consciousness: 0,
    ascension: 0
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem('utm-study-progress');
    if (savedProgress) {
      setStudyProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (category: string, increment: number) => {
    const updated = { ...studyProgress, [category]: Math.min(100, studyProgress[category as keyof typeof studyProgress] + increment) };
    setStudyProgress(updated);
    localStorage.setItem('utm-study-progress', JSON.stringify(updated));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'structure': return <Grid3X3 className="w-5 h-5 text-blue-400" />;
      case 'dimensions': return <Layers className="w-5 h-5 text-purple-400" />;
      case 'mechanics': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'history': return <Clock className="w-5 h-5 text-green-400" />;
      case 'consciousness': return <Eye className="w-5 h-5 text-pink-400" />;
      case 'ascension': return <Crown className="w-5 h-5 text-orange-400" />;
      default: return <Atom className="w-5 h-5 text-cosmic-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'structure': return 'border-blue-400/40 bg-blue-400/10';
      case 'dimensions': return 'border-purple-400/40 bg-purple-400/10';
      case 'mechanics': return 'border-yellow-400/40 bg-yellow-400/10';
      case 'history': return 'border-green-400/40 bg-green-400/10';
      case 'consciousness': return 'border-pink-400/40 bg-pink-400/10';
      case 'ascension': return 'border-orange-400/40 bg-orange-400/10';
      default: return 'border-cosmic-500/40 bg-cosmic-500/10';
    }
  };

  const getHUColor = (huIndex: number) => {
    const colors = [
      'border-red-400/40 text-red-400', // HU1 - Red (Physical)
      'border-orange-400/40 text-orange-400', // HU2 - Orange (Soul)
      'border-yellow-400/40 text-yellow-400', // HU3 - Yellow (Monad)
      'border-blue-400/40 text-blue-400', // HU4 - Blue (Avatar)
      'border-purple-400/40 text-purple-400'  // HU5 - Violet (Rishi)
    ];
    return colors[huIndex] || 'border-white/40 text-white';
  };

  const getHUIcon = (huIndex: number) => {
    switch (huIndex) {
      case 0: return <Square className="w-4 h-4" />; // HU1 - Physical
      case 1: return <Circle className="w-4 h-4" />; // HU2 - Soul
      case 2: return <Triangle className="w-4 h-4" />; // HU3 - Monad
      case 3: return <Star className="w-4 h-4" />; // HU4 - Avatar
      case 4: return <Crown className="w-4 h-4" />; // HU5 - Rishi
      default: return <Atom className="w-4 h-4" />;
    }
  };

  const filteredConcepts = getUTMConceptsByCategory(selectedCategory);
  const overallProgress = Math.round(Object.values(studyProgress).reduce((a, b) => a + b, 0) / 6);

  // Helper to find selected HU data
  const selectedHUData = selectedHU ? harmonicUniverses.find(h => h.id === selectedHU) : null;
  const selectedHUIndex = selectedHU ? harmonicUniverses.findIndex(h => h.id === selectedHU) : -1;

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-sacred-gold/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          {/* Matrix symbols */}
          <div className="absolute top-1/3 right-1/3 flex items-center space-x-2 opacity-20">
            <Grid3X3 className="w-8 h-8 text-blue-400" />
            <Layers className="w-8 h-8 text-purple-400" />
            <Infinity className="w-8 h-8 text-sacred-gold" />
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              className="mb-6 text-cosmic-200 hover:text-sacred-gold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Knowledge Base
            </Button>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="p-4 rounded-full bg-sacred-gold/20 border-2 border-sacred-gold">
                <Atom className="w-12 h-12 text-sacred-gold" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-sacred font-bold text-sacred-gold">
                  Universal Time Matrix
                </h1>
                <p className="text-xl text-cosmic-100 mt-2">15-Dimensional Reality Structure</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl mb-8 text-cosmic-100 leading-relaxed">
              The foundational architecture of our Universe - 5 Harmonic Universes containing 15 dimensions
            </p>

            <div className="grid md:grid-cols-5 gap-4 mt-12">
              {harmonicUniverses.map((hu, index) => (
                <div key={hu.id} className="text-center">
                  <div className={`p-3 rounded-full border mx-auto w-14 h-14 flex items-center justify-center mb-3 ${index === 0 ? 'border-red-400/30 bg-red-400/20' :
                    index === 1 ? 'border-orange-400/30 bg-orange-400/20' :
                      index === 2 ? 'border-yellow-400/30 bg-yellow-400/20' :
                        index === 3 ? 'border-blue-400/30 bg-blue-400/20' :
                          'border-purple-400/30 bg-purple-400/20'
                    }`}>
                    <div className={getHUColor(index).split(' ')[0]}>
                      {getHUIcon(index)}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">HU{index + 1}</h3>
                  <p className="text-cosmic-300 text-xs">{hu.level}</p>
                  <p className="text-cosmic-400 text-xs">D{hu.dimensions.join('-')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Study Progress */}
      <section className="py-8 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Card className="sacred-card mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Your UTM Study Progress</h3>
                <span className="text-sacred-gold font-bold text-xl">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-3 mb-4" />
              <div className="grid md:grid-cols-6 gap-4">
                {utmCategories.map((category) => (
                  <div key={category.id} className="text-center">
                    <div className="text-xs text-cosmic-400 mb-1">{category.label}</div>
                    <div className="text-sm font-semibold text-sacred-gold">
                      {studyProgress[category.id as keyof typeof studyProgress]}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive UTM Diagram */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Card className="sacred-card mb-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-sacred text-sacred-gold text-center">
                Interactive Universal Time Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UniversalTimeMatrixDiagram
                selectedHU={selectedCategory === 'harmonic-universe' ? 'hu1' : null}
                onHUSelect={(huId) => setSelectedCategory('harmonic-universe')}
                interactive={true}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-8">
            <TabsList className="grid grid-cols-6 bg-cosmic-700/50 max-w-4xl mx-auto">
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
              <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="consciousness">Consciousness</TabsTrigger>
              <TabsTrigger value="ascension">Ascension</TabsTrigger>
            </TabsList>

            <TabsContent value="structure">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Interactive UTM Diagram */}
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Interactive UTM Structure
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <UniversalTimeMatrixDiagram
                        selectedHU={selectedHU}
                        onHUSelect={handleHUSelect}
                        interactive={true}
                      />
                    </CardContent>
                  </Card>
                  {/* Harmonic Universe Overview */}
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold">
                        Five Harmonic Universes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-cosmic-100 leading-relaxed">
                        The Universal Time Matrix consists of 5 Harmonic Universes, each containing 3 dimensions and representing different stages of consciousness evolution.
                      </p>

                      <div className="space-y-4">
                        {harmonicUniverses.map((hu, index) => (
                          <div
                            key={hu.id}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${selectedHU === hu.id
                              ? getCategoryColor('structure') + ' border border-blue-400/40'
                              : 'bg-cosmic-700/30 hover:bg-cosmic-700/50'
                              }`}
                            onClick={() => setSelectedHU(hu.id)}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`p-2 rounded-full border ${getHUColor(index)}`}>
                                {getHUIcon(index)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-white mb-1">{hu.name}</h4>
                                <div className="flex items-center space-x-4 text-sm text-cosmic-400 mb-2">
                                  <span>Dimensions {hu.dimensions.join(', ')}</span>
                                  <Badge variant="outline" className={getHUColor(index)}>
                                    {hu.level}
                                  </Badge>
                                </div>
                                <p className="text-cosmic-300 text-sm">{hu.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Structure Concepts */}
                  <div className="space-y-6">
                    {filteredConcepts.map((concept) => (
                      <Card key={concept.id} className={`sacred-card ${getCategoryColor(concept.category)}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-lg bg-cosmic-700/50">
                              {getCategoryIcon(concept.category)}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-sacred-gold mb-2">{concept.title}</h3>
                              <p className="text-cosmic-100 mb-4 leading-relaxed">{concept.description}</p>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Detailed Information</h4>
                                  <p className="text-cosmic-200 text-sm leading-relaxed">{concept.details}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Significance</h4>
                                  <p className="text-yellow-200 text-sm leading-relaxed">{concept.significance}</p>
                                </div>
                                {concept.relatedConcepts.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-white mb-2">Related Concepts</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {concept.relatedConcepts.map((relatedConcept) => (
                                        <Badge
                                          key={relatedConcept}
                                          variant="outline"
                                          className="border-cosmic-500/30 text-cosmic-400"
                                        >
                                          {relatedConcept}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Selected HU Details */}
                  {selectedHUData && (
                    <Card className="sacred-card">
                      <CardHeader>
                        <CardTitle className="text-lg font-sacred text-sacred-silver">
                          {selectedHUData?.name} Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className={`p-4 rounded-full border-2 mx-auto w-16 h-16 flex items-center justify-center mb-4 ${getHUColor(selectedHUIndex)}`}>
                            {getHUIcon(selectedHUIndex)}
                          </div>
                          <h3 className="font-semibold text-white mb-2">{selectedHUData?.level}</h3>
                          <p className="text-cosmic-300 text-sm mb-4">{selectedHUData?.consciousness}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-white mb-2">Dimensional Bodies</h4>
                          <div className="space-y-2">
                            {selectedHUData?.bodies?.map((body, index) => (
                              <div key={index} className="flex items-center justify-between p-2 rounded bg-cosmic-700/30">
                                <span className="text-cosmic-200 text-sm">{body}</span>
                                <Badge variant="outline" className="text-xs border-cosmic-500/30">
                                  {selectedHUData?.dimensions?.[index]}D
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={() => updateProgress('structure', 20)}
                          className="sacred-button w-full"
                        >
                          Study Complete
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Progress for this category */}
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-sacred-silver">
                        Structure Understanding
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-cosmic-300">Progress</span>
                          <span className="text-sacred-gold">{studyProgress.structure}%</span>
                        </div>
                        <Progress value={studyProgress.structure} className="h-2" />
                        <p className="text-cosmic-400 text-xs">
                          Complete study of UTM structure and Harmonic Universes
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Other tab contents would follow similar pattern */}
            {['dimensions', 'mechanics', 'history', 'consciousness', 'ascension'].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-6">
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                        {getCategoryIcon(category)}
                        <span className="ml-3">
                          {utmCategories.find(c => c.id === category)?.label}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-200 mb-6">
                        {utmCategories.find(c => c.id === category)?.description}
                      </p>
                      <div className="text-center">
                        <Progress value={studyProgress[category as keyof typeof studyProgress]} className="h-3 mb-4" />
                        <Button
                          onClick={() => updateProgress(category, 25)}
                          className="sacred-button"
                        >
                          Study {utmCategories.find(c => c.id === category)?.label}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {filteredConcepts.map((concept) => (
                    <Card key={concept.id} className={`sacred-card ${getCategoryColor(concept.category)}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-lg bg-cosmic-700/50">
                            {getCategoryIcon(concept.category)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-sacred-gold mb-2">{concept.title}</h3>
                            <p className="text-cosmic-100 mb-4 leading-relaxed">{concept.description}</p>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-white mb-2">Detailed Information</h4>
                                <p className="text-cosmic-200 text-sm leading-relaxed">{concept.details}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white mb-2">Significance</h4>
                                <p className="text-yellow-200 text-sm leading-relaxed">{concept.significance}</p>
                              </div>
                              {concept.relatedConcepts.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Related Concepts</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {concept.relatedConcepts.map((relatedConcept) => (
                                      <Badge
                                        key={relatedConcept}
                                        variant="outline"
                                        className="border-cosmic-500/30 text-cosmic-400"
                                      >
                                        {relatedConcept}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Related Navigation */}
      <section className="py-12 bg-cosmic-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-sacred-gold text-center mb-8">Explore Related Topics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Crown className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                  <h3 className="font-semibold text-white mb-2">Creation Journey</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Humanity's evolution through the UTM
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.location.href = '/humanity-creation'}
                  >
                    View Timeline
                  </Button>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 mx-auto mb-4 text-pink-400" />
                  <h3 className="font-semibold text-white mb-2">Lightbody Systems</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Multidimensional anatomy for UTM access
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.location.href = '/lightbody'}
                  >
                    Explore Lightbody
                  </Button>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Grid3X3 className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <h3 className="font-semibold text-white mb-2">12-Tree Grid</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Consciousness template within UTM
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.location.href = '/tree-grid'}
                  >
                    Study Grid
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