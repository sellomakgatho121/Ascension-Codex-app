import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Tag, Clock, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useMobileOptimizations } from "@/hooks/use-mobile-optimizations";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'spiritual' | 'tools' | 'knowledge' | 'practice';
  tags: string[];
  relevance: number;
  path: string;
  lastUpdated?: Date;
}

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  placeholder?: string;
  results?: SearchResult[];
  onSearch?: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
  categories: string[];
  tags: string[];
  timeRange: 'all' | 'recent' | 'week' | 'month';
  sortBy: 'relevance' | 'date' | 'title';
}

const defaultFilters: SearchFilters = {
  categories: [],
  tags: [],
  timeRange: 'all',
  sortBy: 'relevance',
};

const categories = [
  { id: 'spiritual', label: 'Spiritual Systems', icon: <Sparkles className="w-4 h-4" />, color: 'sacred-gold' },
  { id: 'tools', label: 'Practice Tools', icon: <Tag className="w-4 h-4" />, color: 'cosmic-400' },
  { id: 'knowledge', label: 'Knowledge Base', icon: <BookOpen className="w-4 h-4" />, color: 'cosmic-300' },
  { id: 'practice', label: 'Practical Guides', icon: <Clock className="w-4 h-4" />, color: 'cosmic-200' },
];

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: '15-Chakra System Activation',
    description: 'Complete guide to activating all 15 chakras including morphogenetic layers',
    category: 'spiritual',
    tags: ['chakras', 'activation', 'morphogenetic'],
    relevance: 0.95,
    path: '/chakras',
    lastUpdated: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: '12D Shield Protection Technique',
    description: 'Essential spiritual protection method using 12-dimensional shield',
    category: 'practice',
    tags: ['protection', '12D shield', 'defense'],
    relevance: 0.88,
    path: '/psychic-self-defense',
    lastUpdated: new Date('2024-01-20'),
  },
];

export function AdvancedSearch({ 
  isOpen, 
  onClose, 
  placeholder = "Search spiritual knowledge, tools, and practices...",
  results = mockResults,
  onSearch 
}: AdvancedSearchProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { viewport, touchDevice } = useMobileOptimizations();

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredResults = useMemo(() => {
    return results.filter(result => {
      const searchTerms = query.toLowerCase().split(' ');
      const searchableText = `${result.title} ${result.description} ${result.tags.join(' ')}`.toLowerCase();
      return query === '' || searchTerms.every(term => searchableText.includes(term));
    });
  }, [results, query]);

  const getTouchClasses = () => {
    return touchDevice.isTouch 
      ? "active:scale-95 transition-transform" 
      : "hover:bg-cosmic-700/50 transition-colors";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`
              fixed top-4 left-4 right-4 bottom-4 
              ${viewport.isMobile ? 'top-2 left-2 right-2 bottom-2' : 'top-16 left-1/2 -translate-x-1/2 w-full max-w-4xl bottom-16'}
              bg-cosmic-900 border border-sacred-gold/20 rounded-2xl shadow-2xl
              flex flex-col overflow-hidden
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-cosmic-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-sacred text-sacred-gold">
                  Spiritual Search
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className={`text-cosmic-300 hover:text-sacred-gold ${getTouchClasses()}`}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cosmic-400" />
                <Input
                  ref={searchInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  className="pl-10 pr-12 bg-cosmic-800 border-cosmic-600 text-white placeholder:text-cosmic-400 text-base"
                  style={{ fontSize: '16px' }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {filteredResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`
                      bg-cosmic-800/50 border-cosmic-600 cursor-pointer transition-all
                      hover:border-sacred-gold/50 hover:bg-cosmic-700/50
                      ${getTouchClasses()}
                    `}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-cosmic-100 mb-2">
                          {result.title}
                        </h3>
                        <p className="text-cosmic-300 text-sm mb-3">
                          {result.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {result.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-cosmic-700 text-cosmic-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}