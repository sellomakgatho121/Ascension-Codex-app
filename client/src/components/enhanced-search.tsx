import { useState, useEffect } from 'react';
import { Search, Filter, X, ArrowRight, BookOpen, Zap, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  relevance: number;
}

interface EnhancedSearchProps {
  placeholder?: string;
  className?: string;
  onResultSelect?: (result: SearchResult) => void;
}

export function EnhancedSearch({ placeholder = "Search spiritual concepts...", className, onResultSelect }: EnhancedSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);

  const categories = [
    { id: 'all', name: 'All', icon: Search, color: 'text-cosmic-400' },
    { id: 'chakras', name: 'Chakras', icon: Heart, color: 'text-red-400' },
    { id: 'lightbody', name: 'Lightbody', icon: Zap, color: 'text-blue-400' },
    { id: 'concepts', name: 'Concepts', icon: BookOpen, color: 'text-green-400' }
  ];

  // Mock search function - replace with actual search implementation
  const performSearch = async (searchQuery: string, category: string | null) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: 'Root Chakra',
        description: 'Foundation chakra for grounding and survival instincts',
        category: 'chakras',
        path: '/chakras',
        relevance: 0.95
      },
      {
        id: '2', 
        title: 'Lightbody Activation',
        description: 'Process of awakening higher dimensional consciousness',
        category: 'lightbody',
        path: '/lightbody',
        relevance: 0.88
      },
      {
        id: '3',
        title: 'GSF Principles',
        description: 'God Sovereign Free consciousness principles for spiritual protection',
        category: 'concepts',
        path: '/gsf',
        relevance: 0.82
      }
    ].filter(result => {
      const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          result.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !category || category === 'all' || result.category === category;
      return matchesQuery && matchesCategory;
    });

    setResults(mockResults);
    setIsLoading(false);
  };

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      performSearch(debouncedQuery, selectedCategory);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedQuery, selectedCategory]);

  const handleResultClick = (result: SearchResult) => {
    onResultSelect?.(result);
    setIsOpen(false);
    setQuery('');
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    const Icon = cat?.icon || BookOpen;
    return <Icon className={cn("w-4 h-4", cat?.color || "text-cosmic-400")} />;
  };

  return (
    <div className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cosmic-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-cosmic-800/50 border-cosmic-600 text-white placeholder-cosmic-400 focus:border-sacred-gold/50"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Category Filters */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <Card className="sacred-card border-cosmic-600">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                      className={cn(
                        "text-xs",
                        selectedCategory === category.id 
                          ? "bg-sacred-gold text-cosmic-900" 
                          : "border-cosmic-600 text-cosmic-300 hover:border-sacred-gold/50"
                      )}
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>

              {/* Search Results */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-5 h-5 border-2 border-sacred-gold border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-2 text-cosmic-300 text-sm">Searching...</span>
                  </div>
                ) : results.length > 0 ? (
                  results.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="p-3 rounded-lg border border-cosmic-700 hover:border-sacred-gold/40 hover:bg-cosmic-800/30 cursor-pointer transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getCategoryIcon(result.category)}
                            <h4 className="font-medium text-white group-hover:text-sacred-gold transition-colors">
                              {result.title}
                            </h4>
                            <Badge variant="outline" className="text-xs border-cosmic-600 text-cosmic-400">
                              {result.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-cosmic-300 leading-relaxed">
                            {result.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-cosmic-500 group-hover:text-sacred-gold transition-colors ml-2 flex-shrink-0" />
                      </div>
                    </div>
                  ))
                ) : query.length > 0 ? (
                  <div className="text-center py-4 text-cosmic-400">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No results found for "{query}"</p>
                    <p className="text-xs mt-1">Try different keywords or browse categories</p>
                  </div>
                ) : null}
              </div>

              {/* Quick Actions */}
              {results.length > 0 && (
                <div className="border-t border-cosmic-700 mt-4 pt-3">
                  <div className="flex justify-between items-center text-xs text-cosmic-400">
                    <span>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
                    <div className="flex gap-2">
                      <span>↑↓ Navigate</span>
                      <span>Enter Select</span>
                      <span>Esc Close</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}