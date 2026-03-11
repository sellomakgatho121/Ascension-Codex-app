import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ESConcept } from "@/lib/es-knowledge-base";
import { ExternalLink, Star, Brain, Shield, Clock, Globe, Zap, Layers, BookOpen } from "lucide-react";

interface ESConceptCardProps {
  concept: ESConcept;
  onClick?: () => void;
  showFullDescription?: boolean;
}

export function ESConceptCard({ concept, onClick, showFullDescription = false }: ESConceptCardProps) {
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

  return (
    <Card 
      className={`sacred-card transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:border-sacred-gold/40' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center justify-between">
          <span>{concept.term}</span>
          <Badge variant="outline" className={getCategoryColor(concept.category)}>
            {getCategoryIcon(concept.category)}
            <span className="ml-1 text-xs capitalize">{concept.category}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className={`text-cosmic-100 leading-relaxed ${showFullDescription ? '' : 'line-clamp-3'}`}>
          {concept.definition}
        </p>

        {concept.relatedTerms.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-cosmic-200 mb-2">Related Terms</h4>
            <div className="flex flex-wrap gap-1">
              {concept.relatedTerms.slice(0, showFullDescription ? undefined : 4).map((term) => (
                <Badge key={term} variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                  {term}
                </Badge>
              ))}
              {!showFullDescription && concept.relatedTerms.length > 4 && (
                <Badge variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                  +{concept.relatedTerms.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {showFullDescription && concept.applications.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-cosmic-200 mb-2">Applications</h4>
            <ul className="space-y-1">
              {concept.applications.map((app, index) => (
                <li key={index} className="text-cosmic-100 text-sm flex items-start">
                  <span className="w-1 h-1 bg-sacred-gold rounded-full mt-2 mr-2 flex-shrink-0" />
                  {app}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-cosmic-700">
          <span className="text-xs text-cosmic-400">{concept.source}</span>
          {showFullDescription && (
            <Button variant="ghost" size="sm" className="text-cosmic-400 hover:text-sacred-gold">
              <ExternalLink className="w-3 h-3 mr-1" />
              Learn More
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}