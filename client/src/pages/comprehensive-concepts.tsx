// Comprehensive Concepts Page
// Displays all in-depth concept explanations with navigation and search

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  BookOpen, 
  Filter, 
  TrendingUp, 
  Shield, 
  Zap, 
  Brain,
  Globe,
  Star,
  Clock
} from 'lucide-react';
import { Link } from 'wouter';
import { 
  comprehensiveESKnowledgeBase, 
  searchComprehensiveConcepts,
  getComprehensiveConceptsByCategory,
  getProgressiveLearningPath,
  getAllComprehensiveConceptsWithCoverage,
  type ComprehensiveESConcept 
} from '@/lib/comprehensive-es-knowledge';
import { allComprehensiveConcepts } from '@/lib/comprehensive-es-expansion';
import { ComprehensiveConceptPage } from '@/components/comprehensive-concept-page';

export default function ComprehensiveConceptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedConcept, setSelectedConcept] = useState<ComprehensiveESConcept | null>(null);
  const [viewMode, setViewMode] = useState<'browse' | 'study' | 'path'>('browse');

  const categories = [
    { id: 'all', label: 'All Concepts', icon: BookOpen, color: 'text-cosmic-300' },
    { id: 'protection', label: 'Protection', icon: Shield, color: 'text-red-400' },
    { id: 'anatomy', label: 'Spiritual Anatomy', icon: Zap, color: 'text-emerald-400' },
    { id: 'consciousness', label: 'Consciousness', icon: Brain, color: 'text-cosmic-blue' },
    { id: 'planetary', label: 'Planetary', icon: Globe, color: 'text-blue-400' },
    { id: 'galactic', label: 'Galactic', icon: Star, color: 'text-indigo-400' },
    { id: 'timeline', label: 'Timeline', icon: Clock, color: 'text-purple-400' },
    { id: 'ascension', label: 'Ascension', icon: TrendingUp, color: 'text-sacred-gold' }
  ];

  const filteredConcepts = useMemo(() => {
    let concepts = allComprehensiveConcepts;
    
    if (searchQuery) {
      concepts = searchComprehensiveConcepts(searchQuery);
    }
    
    if (selectedCategory !== 'all') {
      concepts = concepts.filter(concept => concept.category === selectedCategory);
    }

    return concepts;
  }, [searchQuery, selectedCategory]);

  const learningPath = getProgressiveLearningPath();

  if (selectedConcept) {
    return (
      <div className="min-h-screen bg-cosmic-900">
        <div className="max-w-6xl mx-auto p-6">
          <Button 
            onClick={() => setSelectedConcept(null)}
            variant="outline"
            className="mb-6 border-cosmic-600 text-cosmic-300 hover:bg-cosmic-800"
          >
            ← Back to Concepts
          </Button>
          <ComprehensiveConceptPage concept={selectedConcept} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-900 text-cosmic-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-cosmic-800 to-cosmic-900 border-b border-cosmic-700">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-sacred text-sacred-gold mb-4">
            Comprehensive ES Knowledge
          </h1>
          <p className="text-lg text-cosmic-300 max-w-4xl">
            In-depth explanations of Energetic Synthesis concepts with complete coverage of every aspect. 
            Each topic is explored thoroughly with historical context, practical applications, safety considerations, and integration guidance.
          </p>
        </div>
      </div>

      {/* Navigation and Filters */}
      <div className="max-w-6xl mx-auto p-6">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-cosmic-800">
            <TabsTrigger value="browse" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
              Browse All
            </TabsTrigger>
            <TabsTrigger value="path" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
              Learning Path
            </TabsTrigger>
            <TabsTrigger value="study" className="data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900">
              Study Mode
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-cosmic-500" />
                <Input
                  placeholder="Search comprehensive concepts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-cosmic-800 border-cosmic-600 text-cosmic-100 placeholder-cosmic-500"
                />
              </div>
              <div className="flex gap-2">
                <Filter className="w-5 h-5 text-cosmic-400 mt-2" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`${
                          selectedCategory === category.id 
                            ? 'bg-sacred-gold text-cosmic-900' 
                            : 'border-cosmic-600 text-cosmic-300 hover:bg-cosmic-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">{category.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="text-sm text-cosmic-400">
              Showing {filteredConcepts.length} comprehensive concept{filteredConcepts.length !== 1 ? 's' : ''}
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
            </div>

            {/* Concepts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map((concept) => (
                <ConceptCard 
                  key={concept.id} 
                  concept={concept} 
                  onSelect={() => setSelectedConcept(concept)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="path" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-sacred text-sacred-gold mb-3">Progressive Learning Path</h2>
              <p className="text-cosmic-300">
                Follow this structured path for optimal understanding and integration of ES concepts. 
                Each stage builds upon previous knowledge for comprehensive mastery.
              </p>
            </div>

            <div className="space-y-4">
              {learningPath.map((concept, index) => (
                <Card key={concept.id} className="sacred-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-sacred-gold text-cosmic-900 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-sacred-gold">{concept.term}</h3>
                          <Badge className="bg-cosmic-700 text-cosmic-300">
                            {concept.category}
                          </Badge>
                        </div>
                        <p className="text-cosmic-300 mb-4 leading-relaxed">
                          {concept.definition}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {concept.applications.slice(0, 3).map((app, appIndex) => (
                            <Badge key={appIndex} variant="outline" className="border-cosmic-600 text-cosmic-400 text-xs">
                              {app}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          onClick={() => setSelectedConcept(concept)}
                          className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
                        >
                          Begin In-Depth Study
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="study" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-sacred text-sacred-gold mb-3">Study Mode</h2>
              <p className="text-cosmic-300">
                Intensive study interface with progress tracking, note-taking, and comprehensive exploration tools.
              </p>
            </div>

            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-sacred-gold">Study Features Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-cosmic-800 rounded-lg">
                      <h4 className="font-semibold text-cosmic-blue mb-2">Progress Tracking</h4>
                      <p className="text-sm text-cosmic-300">
                        Track your mastery level through each concept's progression stages with detailed indicators.
                      </p>
                    </div>
                    <div className="p-4 bg-cosmic-800 rounded-lg">
                      <h4 className="font-semibold text-emerald-400 mb-2">Personal Notes</h4>
                      <p className="text-sm text-cosmic-300">
                        Save insights, experiences, and integration notes for each concept.
                      </p>
                    </div>
                    <div className="p-4 bg-cosmic-800 rounded-lg">
                      <h4 className="font-semibold text-purple-400 mb-2">Practice Reminders</h4>
                      <p className="text-sm text-cosmic-300">
                        Set reminders for daily practice and integration activities.
                      </p>
                    </div>
                    <div className="p-4 bg-cosmic-800 rounded-lg">
                      <h4 className="font-semibold text-amber-400 mb-2">Community Discussion</h4>
                      <p className="text-sm text-cosmic-300">
                        Connect with others studying the same concepts for mutual support.
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setViewMode('browse')}
                    className="w-full bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
                  >
                    Start with Browse Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ConceptCard({ concept, onSelect }: { concept: ComprehensiveESConcept; onSelect: () => void }) {
  const categoryColors = {
    ascension: 'bg-sacred-gold/20 text-sacred-gold border-sacred-gold/30',
    consciousness: 'bg-cosmic-blue/20 text-cosmic-blue border-cosmic-blue/30',
    anatomy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    protection: 'bg-red-500/20 text-red-400 border-red-500/30',
    timeline: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    planetary: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    galactic: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
  };

  return (
    <Card className="sacred-card hover:border-sacred-gold/50 transition-all duration-300 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg font-semibold text-sacred-gold leading-tight">
            {concept.term}
          </CardTitle>
          <Badge className={categoryColors[concept.category] || categoryColors.consciousness}>
            {concept.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col h-full">
        <p className="text-cosmic-300 text-sm leading-relaxed mb-4 flex-1">
          {concept.definition.slice(0, 150)}...
        </p>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {concept.relatedTerms.slice(0, 3).map((term, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-cosmic-600 text-cosmic-400 text-xs"
              >
                {term}
              </Badge>
            ))}
            {concept.relatedTerms.length > 3 && (
              <Badge variant="outline" className="border-cosmic-600 text-cosmic-500 text-xs">
                +{concept.relatedTerms.length - 3} more
              </Badge>
            )}
          </div>

          <div className="text-xs text-cosmic-500 mb-3">
            {concept.progressionStages.length} progression stages • {concept.keyIndicators.length} key indicators
          </div>

          <Button 
            onClick={onSelect}
            className="w-full bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
            size="sm"
          >
            Explore In-Depth
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}