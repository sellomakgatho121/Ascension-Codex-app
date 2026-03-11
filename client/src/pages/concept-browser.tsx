import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  energeticSynthesisKnowledgeBase, 
  searchESKnowledge, 
  getESConceptsByCategory,
  esCategories,
  type ESConcept 
} from "@/lib/es-knowledge-base";
import { 
  Search, 
  BookOpen, 
  Star, 
  Brain, 
  Shield, 
  Clock, 
  Globe, 
  Zap, 
  Layers, 
  Filter,
  Grid3X3,
  List,
  ArrowRight
} from "lucide-react";

export default function ConceptBrowserPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchResults, setSearchResults] = useState<ESConcept[]>(energeticSynthesisKnowledgeBase);
  const [sortBy, setSortBy] = useState<'alphabetical' | 'category' | 'recent'>('alphabetical');

  useEffect(() => {
    let results = selectedCategory === "all" 
      ? energeticSynthesisKnowledgeBase 
      : getESConceptsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      results = searchESKnowledge(searchQuery, selectedCategory === "all" ? undefined : selectedCategory);
    }

    // Sort results
    switch (sortBy) {
      case 'alphabetical':
        results.sort((a, b) => a.term.localeCompare(b.term));
        break;
      case 'category':
        results.sort((a, b) => a.category.localeCompare(b.category) || a.term.localeCompare(b.term));
        break;
      case 'recent':
        // Since we don't have dates, we'll sort by source and then alphabetically
        results.sort((a, b) => a.source.localeCompare(b.source) || a.term.localeCompare(b.term));
        break;
    }

    setSearchResults(results);
  }, [searchQuery, selectedCategory, sortBy]);

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

  const categoryStats = esCategories.map(cat => ({
    ...cat,
    count: getESConceptsByCategory(cat.id).length
  }));

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Header */}
      <section className="cosmic-gradient py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
            ES Concept Browser
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Explore {energeticSynthesisKnowledgeBase.length}+ authentic Energetic Synthesis concepts with comprehensive search and categorization
          </p>
        </div>
      </section>

      {/* Browser Interface */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          {/* Search and Controls */}
          <Card className="sacred-card mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-cosmic-400" />
                  <Input
                    placeholder="Search concepts, terms, applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-cosmic-800 border-cosmic-600"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2.5 bg-cosmic-800 border border-cosmic-600 rounded-md text-white"
                  >
                    <option value="all">All Categories</option>
                    {esCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label} ({categoryStats.find(s => s.id === cat.id)?.count || 0})
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Controls */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="flex-1"
                  >
                    <Grid3X3 className="w-4 h-4 mr-1" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="flex-1"
                  >
                    <List className="w-4 h-4 mr-1" />
                    List
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-cosmic-700">
                <div className="text-sm text-cosmic-400">
                  Showing {searchResults.length} of {energeticSynthesisKnowledgeBase.length} concepts
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-cosmic-400">Sort by:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm p-1 bg-cosmic-800 border border-cosmic-600 rounded text-white"
                  >
                    <option value="alphabetical">Alphabetical</option>
                    <option value="category">Category</option>
                    <option value="recent">Source</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Category Stats */}
            <div className="lg:col-span-1">
              <Card className="sacred-card mb-6">
                <CardHeader>
                  <CardTitle className="text-lg font-sacred text-sacred-silver">
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div 
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedCategory === 'all' 
                          ? 'bg-sacred-gold/20 border border-sacred-gold/40' 
                          : 'bg-cosmic-700/30 hover:bg-cosmic-700/50'
                      }`}
                      onClick={() => setSelectedCategory('all')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedCategory('all');
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4" />
                          <span className="font-medium text-white text-sm">All Concepts</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {energeticSynthesisKnowledgeBase.length}
                        </Badge>
                      </div>
                    </div>
                    {categoryStats.map((category) => (
                      <div 
                        key={category.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedCategory === category.id 
                            ? 'bg-sacred-gold/20 border border-sacred-gold/40' 
                            : 'bg-cosmic-700/30 hover:bg-cosmic-700/50'
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedCategory(category.id);
                          }
                        }}
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
                            {category.count}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {searchResults.map((concept) => (
                    <Card 
                      key={concept.id}
                      className="sacred-card cursor-pointer hover:border-sacred-gold/40 transition-all duration-300 group"
                      onClick={() => window.location.href = `/concept/${concept.id}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-sacred text-sacred-gold group-hover:text-sacred-silver transition-colors line-clamp-2">
                            {concept.term}
                          </CardTitle>
                          <Badge variant="outline" className={`${getCategoryColor(concept.category)} text-xs flex-shrink-0 ml-2`}>
                            {getCategoryIcon(concept.category)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-cosmic-100 text-sm leading-relaxed line-clamp-4">
                          {concept.definition}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {concept.relatedTerms.slice(0, 3).map((term) => (
                            <Badge key={term} variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                              {term}
                            </Badge>
                          ))}
                          {concept.relatedTerms.length > 3 && (
                            <Badge variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                              +{concept.relatedTerms.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-cosmic-700">
                          <span className="text-xs text-cosmic-400 truncate">
                            {concept.source.replace('Energetic Synthesis - ', '')}
                          </span>
                          <ArrowRight className="w-4 h-4 text-cosmic-400 group-hover:text-sacred-gold transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="space-y-4">
                  {searchResults.map((concept) => (
                    <Card 
                      key={concept.id}
                      className="sacred-card cursor-pointer hover:border-sacred-gold/40 transition-all duration-300 group"
                      onClick={() => window.location.href = `/concept/${concept.id}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-sacred-gold group-hover:text-sacred-silver transition-colors">
                                {concept.term}
                              </h3>
                              <Badge variant="outline" className={getCategoryColor(concept.category)}>
                                {getCategoryIcon(concept.category)}
                                <span className="ml-1 text-xs">
                                  {esCategories.find(cat => cat.id === concept.category)?.label}
                                </span>
                              </Badge>
                            </div>
                            <p className="text-cosmic-100 text-sm leading-relaxed line-clamp-2 mb-3">
                              {concept.definition}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {concept.relatedTerms.slice(0, 6).map((term) => (
                                <Badge key={term} variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                                  {term}
                                </Badge>
                              ))}
                              {concept.relatedTerms.length > 6 && (
                                <Badge variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                                  +{concept.relatedTerms.length - 6} more
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-cosmic-400">
                              {concept.source.replace('Energetic Synthesis - ', '')}
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-cosmic-400 group-hover:text-sacred-gold transition-colors ml-4 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {searchResults.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-cosmic-400" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Concepts Found</h3>
                  <p className="text-cosmic-300">Try adjusting your search terms or selecting a different category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}