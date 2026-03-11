import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  comprehensiveESKnowledgeBase as energeticSynthesisKnowledgeBase,
  searchESKnowledge,
  getESConceptsByCategory,
  getRelatedESConcepts,
  esCategories,
  type ComprehensiveESConcept as ESConcept
} from "@/lib/comprehensive-es-knowledge";
import {
  Search,
  BookOpen,
  Star,
  Filter,
  ExternalLink,
  Brain,
  Shield,
  Zap,
  Globe,
  Clock,
  Layers,
  Target
} from "lucide-react";

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedConcept, setSelectedConcept] = useState<ESConcept | null>(null);
  const [searchResults, setSearchResults] = useState<ESConcept[]>(energeticSynthesisKnowledgeBase);

  // Check for concept ID in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const conceptId = urlParams.get('concept');
    if (conceptId) {
      const concept = energeticSynthesisKnowledgeBase.find(c => c.id === conceptId);
      if (concept) {
        setSelectedConcept(concept);
      }
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults(selectedCategory === "all"
        ? energeticSynthesisKnowledgeBase
        : getESConceptsByCategory(selectedCategory)
      );
    } else {
      const results = searchESKnowledge(query, selectedCategory === "all" ? undefined : selectedCategory);
      setSearchResults(results);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setSearchResults(energeticSynthesisKnowledgeBase);
    } else {
      setSearchResults(getESConceptsByCategory(category));
    }
    setSearchQuery("");
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ascension': return <Star className="w-4 h-4" />;
      case 'consciousness': return <Brain className="w-4 h-4" />;
      case 'anatomy': return <Layers className="w-4 h-4" />;
      case 'protection': return <Shield className="w-4 h-4" />;
      case 'timeline': return <Clock className="w-4 h-4" />;
      case 'planetary': return <Globe className="w-4 h-4" />;
      case 'galactic': return <Zap className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
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

  const relatedConcepts = selectedConcept ? getRelatedESConcepts(selectedConcept.id) : [];

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full transform rotate-45"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
            Energetic Synthesis Knowledge Base
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Comprehensive collection of authentic teachings from Lisa Renee's Energetic Synthesis materials
          </p>
        </div>
      </section>

      {/* Knowledge Base Interface */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Search and Filter */}
            <div className="lg:col-span-2">
              <Card className="sacred-card mb-6">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-cosmic-400" />
                      <Input
                        placeholder="Search ES concepts, definitions, applications..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 bg-cosmic-800 border-cosmic-600"
                      />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center space-x-4">
                      <Filter className="w-4 h-4 text-cosmic-400" />
                      <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
                        <SelectTrigger className="w-48 bg-cosmic-800 border-cosmic-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-cosmic-800 border-cosmic-600">
                          <SelectItem value="all">All Categories</SelectItem>
                          {esCategories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              <div className="flex items-center space-x-2">
                                {getCategoryIcon(cat.id)}
                                <span>{cat.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="text-sm text-cosmic-400">
                        {searchResults.length} concepts found
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Search Results */}
              <div className="space-y-4">
                {searchResults.map((concept) => (
                  <Card
                    key={concept.id}
                    className={`sacred-card cursor-pointer transition-all duration-300 touch-manipulation ${selectedConcept?.id === concept.id ? 'border-sacred-gold/60' : 'hover:border-sacred-gold/30'
                      }`}
                    onClick={() => setSelectedConcept(concept)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedConcept(concept);
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{concept.term}</h3>
                              <Badge variant="outline" className={getCategoryColor(concept.category)}>
                                {getCategoryIcon(concept.category)}
                                <span className="ml-1 text-xs">
                                  {esCategories.find(cat => cat.id === concept.category)?.label}
                                </span>
                              </Badge>
                            </div>
                            <p className="text-cosmic-100 text-sm leading-relaxed line-clamp-3">
                              {concept.definition}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {concept.relatedTerms.slice(0, 3).map((term) => (
                            <Badge key={term} variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                              {term}
                            </Badge>
                          ))}
                          {concept.relatedTerms.length > 3 && (
                            <Badge variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                              +{concept.relatedTerms.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Concept Detail Panel */}
            <div className="space-y-6">
              {selectedConcept ? (
                <>
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(selectedConcept.category)}
                          <span>{selectedConcept.term}</span>
                        </div>
                        <Badge variant="outline" className={getCategoryColor(selectedConcept.category)}>
                          {esCategories.find(cat => cat.id === selectedConcept.category)?.label}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-2">Definition</h4>
                        <p className="text-cosmic-100 leading-relaxed">
                          {selectedConcept.definition}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white mb-2">Related Terms</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedConcept.relatedTerms.map((term) => (
                            <Badge key={term} variant="outline" className="border-cosmic-500/30 text-cosmic-400">
                              {term}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white mb-2">Practical Applications</h4>
                        <ul className="space-y-1">
                          {selectedConcept.applications.map((app, index) => (
                            <li key={index} className="text-cosmic-100 text-sm flex items-start">
                              <Target className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0 text-sacred-gold" />
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {selectedConcept.detailedExplanation && (
                        <div>
                          <h4 className="font-semibold text-white mb-2">Detailed Explanation</h4>
                          <div className="text-cosmic-100 leading-relaxed whitespace-pre-line">
                            {selectedConcept.detailedExplanation}
                          </div>
                        </div>
                      )}

                      {selectedConcept.historicalContext && (
                        <div>
                          <h4 className="font-semibold text-white mb-2">Historical Context</h4>
                          <div className="text-cosmic-100 leading-relaxed whitespace-pre-line">
                            {selectedConcept.historicalContext}
                          </div>
                        </div>
                      )}

                      {selectedConcept.mechanicsAndProcess && (
                        <div>
                          <h4 className="font-semibold text-white mb-2">Mechanics & Process</h4>
                          <div className="text-cosmic-100 leading-relaxed whitespace-pre-line">
                            {selectedConcept.mechanicsAndProcess}
                          </div>
                        </div>
                      )}

                      {selectedConcept.warningsSafety && (
                        <div className="p-4 rounded-lg bg-red-900/10 border border-red-500/20">
                          <h4 className="font-semibold text-red-400 mb-2 flex items-center">
                            <Shield className="w-4 h-4 mr-2" />
                            Safety & Warnings
                          </h4>
                          <div className="text-cosmic-100 leading-relaxed whitespace-pre-line text-sm">
                            {selectedConcept.warningsSafety}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t border-cosmic-700">
                        <div className="flex items-center justify-between text-xs text-cosmic-400">
                          <span>Source: {selectedConcept.source}</span>
                          <Button variant="ghost" size="sm" className="text-cosmic-400 hover:text-sacred-gold">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Concepts */}
                  {relatedConcepts.length > 0 && (
                    <Card className="sacred-card">
                      <CardHeader>
                        <CardTitle className="text-lg font-sacred text-sacred-silver">
                          Related Concepts
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {relatedConcepts.slice(0, 5).map((concept) => (
                            <div
                              key={concept.id}
                              className="p-3 rounded-lg bg-cosmic-700/30 cursor-pointer hover:bg-cosmic-700/50 transition-all duration-300"
                              onClick={() => setSelectedConcept(concept)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-white text-sm">{concept.term}</h4>
                                  <p className="text-cosmic-300 text-xs line-clamp-2">
                                    {concept.definition.substring(0, 100)}...
                                  </p>
                                </div>
                                <Badge variant="outline" className={`${getCategoryColor(concept.category)} text-xs`}>
                                  {getCategoryIcon(concept.category)}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <Card className="sacred-card">
                  <CardContent className="p-8 text-center">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-cosmic-400" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Select a Concept
                    </h3>
                    <p className="text-cosmic-300 text-sm">
                      Click on any concept from the list to view detailed information, related terms, and practical applications.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Category Overview */}
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="text-lg font-sacred text-sacred-silver">
                    Knowledge Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {esCategories.map((category) => {
                      const count = getESConceptsByCategory(category.id).length;
                      return (
                        <div
                          key={category.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedCategory === category.id
                              ? 'bg-sacred-gold/20 border border-sacred-gold/40'
                              : 'bg-cosmic-700/30 hover:bg-cosmic-700/50'
                            }`}
                          onClick={() => handleCategoryFilter(category.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getCategoryIcon(category.id)}
                              <div>
                                <div className="font-medium text-white text-sm">{category.label}</div>
                                <div className="text-cosmic-300 text-xs">{category.description}</div>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {count}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}