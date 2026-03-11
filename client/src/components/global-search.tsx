import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X, BookOpen, Heart, Shield, TreePine, Star, Sun } from "lucide-react";
import { chakraData } from "@/lib/chakra-data";
import { lightbodyLayers } from "@/lib/lightbody-data";
import { hovaShields, treeGridSpheres } from "@/lib/spiritual-content";
import { comprehensiveESKnowledgeBase } from "@/lib/comprehensive-es-knowledge";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'chakra' | 'lightbody' | 'hova' | 'tree-grid' | 'meditation' | 'concept';
  relevance: number;
  path: string;
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Build searchable content index
  const searchIndex = [
    // Chakras
    ...chakraData.map(chakra => ({
      id: `chakra-${chakra.id}`,
      title: chakra.name,
      description: chakra.description,
      category: chakra.category,
      type: 'chakra' as const,
      content: `${chakra.name} ${chakra.description} ${chakra.function} ${chakra.ascensionPurpose}`,
      path: `/chakras?selected=${chakra.id}`
    })),

    // Lightbody Layers
    ...lightbodyLayers.map(layer => ({
      id: `lightbody-${layer.id}`,
      title: layer.name,
      description: layer.description,
      category: 'lightbody',
      type: 'lightbody' as const,
      content: `${layer.name} ${layer.description} ${layer.function} ${layer.ascensionPurpose}`,
      path: `/lightbody?selected=${layer.id}`
    })),

    // Hova Bodies
    ...hovaShields.map(shield => ({
      id: `hova-${shield.id}`,
      title: shield.name,
      description: shield.description,
      category: 'protection',
      type: 'hova' as const,
      content: `${shield.name} ${shield.description} ${shield.function} ${shield.ascensionPurpose}`,
      path: `/hova-bodies?selected=${shield.id}`
    })),

    // Tree Grid Spheres
    ...treeGridSpheres.map(sphere => ({
      id: `tree-${sphere.id}`,
      title: `Sphere ${sphere.id}: ${sphere.name}`,
      description: sphere.function,
      category: 'tree-grid',
      type: 'tree-grid' as const,
      content: `${sphere.name} ${sphere.function} ${sphere.dimension}`,
      path: `/tree-grid?selected=${sphere.id}`
    })),

    // Meditation concepts
    {
      id: 'meditation-12d-shield',
      title: '12D Shield Protection',
      description: 'Foundational protection practice for spiritual work',
      category: 'meditation',
      type: 'meditation' as const,
      content: '12D Shield protection spiritual safety Christ consciousness',
      path: '/meditation'
    },
    {
      id: 'meditation-ra-center',
      title: 'RA Center Activation',
      description: 'Solar hub activation for cosmic timeline alignment',
      category: 'meditation',
      type: 'meditation' as const,
      content: 'RA Center solar hub plasma rivers golden sphere',
      path: '/soul-codex'
    },

    // Comprehensive Knowledge Base Concepts
    ...comprehensiveESKnowledgeBase.map(concept => ({
      id: `kb-${concept.id}`,
      title: concept.term,
      description: concept.definition,
      category: concept.category,
      type: 'concept' as const,
      content: `${concept.term} ${concept.definition} ${concept.relatedTerms.join(' ')} ${concept.detailedExplanation} ${concept.source}`,
      path: `/knowledge-base?concept=${concept.id}`
    }))
  ];

  // Search function with relevance scoring
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    const searchTerms = searchQuery.toLowerCase().split(' ');
    const searchResults: SearchResult[] = [];

    searchIndex.forEach(item => {
      let relevance = 0;
      const searchableText = item.content.toLowerCase();

      // Title exact match gets highest score
      if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        relevance += 100;
      }

      // Each search term match in content
      searchTerms.forEach(term => {
        if (term.length > 2) {
          const matches = (searchableText.match(new RegExp(term, 'g')) || []).length;
          relevance += matches * 10;
        }
      });

      // Category relevance boost
      if (item.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        relevance += 20;
      }

      if (relevance > 0) {
        searchResults.push({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          type: item.type,
          relevance,
          path: item.path
        });
      }
    });

    // Sort by relevance
    searchResults.sort((a, b) => b.relevance - a.relevance);
    setResults(searchResults.slice(0, 10)); // Top 10 results
    setIsSearching(false);
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chakra': return <Heart className="w-4 h-4" />;
      case 'lightbody': return <Star className="w-4 h-4" />;
      case 'hova': return <Shield className="w-4 h-4" />;
      case 'tree-grid': return <TreePine className="w-4 h-4" />;
      case 'meditation': return <Sun className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      physical: 'bg-red-500/20 text-red-400',
      morphogenetic: 'bg-purple-500/20 text-purple-400',
      avatar: 'bg-gold-500/20 text-gold-400',
      lightbody: 'bg-blue-500/20 text-blue-400',
      protection: 'bg-green-500/20 text-green-400',
      'tree-grid': 'bg-indigo-500/20 text-indigo-400',
      meditation: 'bg-orange-500/20 text-orange-400'
    };
    return colors[category as keyof typeof colors] || 'bg-cosmic-500/20 text-cosmic-400';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 border-cosmic-600 text-cosmic-300 hover:bg-cosmic-700"
        >
          <Search className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">Search spiritual content...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border border-cosmic-600 bg-cosmic-800 px-1.5 font-mono text-[10px] font-medium text-cosmic-400 xl:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0" aria-describedby="search-dialog-description">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-sacred text-sacred-gold">
            Search Spiritual Content
          </DialogTitle>
          <div className="sr-only">
            <p id="search-dialog-description">Search through chakras, lightbody layers, spiritual concepts, and meditation content</p>
          </div>
        </DialogHeader>

        <div className="p-6 pt-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-cosmic-400" />
            <Input
              placeholder="Search chakras, lightbody, meditations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-cosmic-800 border-cosmic-600 text-white placeholder-cosmic-400"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto px-6 pb-6">
          {isSearching ? (
            <div className="text-center py-8 text-cosmic-300">
              <div className="animate-spin w-6 h-6 border-2 border-sacred-gold border-t-transparent rounded-full mx-auto mb-2"></div>
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              {results.map((result) => (
                <Card
                  key={result.id}
                  className="sacred-card cursor-pointer hover:border-sacred-gold/40 transition-all duration-300"
                  onClick={() => {
                    window.location.href = result.path;
                    setIsOpen(false);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-0.5">
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm truncate">
                            {result.title}
                          </h3>
                          <p className="text-cosmic-300 text-xs mt-1 line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`ml-2 text-xs ${getCategoryColor(result.category)}`}>
                        {result.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-8 text-cosmic-300">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-2">Try searching for chakras, lightbody, meditations, or spiritual concepts</p>
            </div>
          ) : (
            <div className="text-center py-8 text-cosmic-300">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search spiritual content</p>
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div>• Chakra systems</div>
                <div>• Lightbody layers</div>
                <div>• Protection practices</div>
                <div>• Tree Grid spheres</div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}