import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  humanityCreationTimeline, 
  getEventsByCategory,
  type CreationEvent 
} from "@/lib/humanity-creation";
import { 
  ArrowLeft, 
  Star, 
  Globe, 
  Users, 
  Zap,
  Calendar,
  BookOpen,
  Crown,
  Heart,
  Sparkles,
  Sun,
  Shield,
  Eye,
  Lightbulb
} from "lucide-react";

export default function HumanityCreationPage() {
  const [selectedCategory, setSelectedCategory] = useState("origin");
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'origin', label: 'Universal Origins', icon: <Star className="w-4 h-4" />, color: 'text-yellow-400' },
    { id: 'seeding', label: 'Earth Seeding', icon: <Globe className="w-4 h-4" />, color: 'text-green-400' },
    { id: 'evolution', label: 'Civilization', icon: <Users className="w-4 h-4" />, color: 'text-blue-400' },
    { id: 'intervention', label: 'Intervention', icon: <Zap className="w-4 h-4" />, color: 'text-red-400' },
    { id: 'awakening', label: 'Awakening', icon: <Lightbulb className="w-4 h-4" />, color: 'text-purple-400' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'origin': return <Star className="w-5 h-5 text-yellow-400" />;
      case 'seeding': return <Globe className="w-5 h-5 text-green-400" />;
      case 'evolution': return <Users className="w-5 h-5 text-blue-400" />;
      case 'intervention': return <Zap className="w-5 h-5 text-red-400" />;
      case 'awakening': return <Lightbulb className="w-5 h-5 text-purple-400" />;
      default: return <BookOpen className="w-5 h-5 text-cosmic-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'origin': return 'border-yellow-400/40 bg-yellow-400/10';
      case 'seeding': return 'border-green-400/40 bg-green-400/10';
      case 'evolution': return 'border-blue-400/40 bg-blue-400/10';
      case 'intervention': return 'border-red-400/40 bg-red-400/10';
      case 'awakening': return 'border-purple-400/40 bg-purple-400/10';
      default: return 'border-cosmic-500/40 bg-cosmic-500/10';
    }
  };

  const filteredEvents = getEventsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readingProgress} className="h-1 bg-cosmic-800" />
      </div>

      {/* Hero Section */}
      <section className="cosmic-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-sacred-gold/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          {/* Timeline symbols */}
          <div className="absolute top-1/3 right-1/3 flex items-center space-x-2 opacity-20">
            <Star className="w-8 h-8 text-yellow-400" />
            <Globe className="w-8 h-8 text-green-400" />
            <Eye className="w-8 h-8 text-purple-400" />
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
                <Crown className="w-12 h-12 text-sacred-gold" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-sacred font-bold text-sacred-gold">
                  Humanity's Journey
                </h1>
                <p className="text-xl text-cosmic-100 mt-2">From Creation to Awakening</p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 text-cosmic-100 leading-relaxed">
              The complete story of human consciousness from universal origins to current awakening
            </p>
            
            <div className="grid md:grid-cols-5 gap-4 mt-12">
              {categories.map((category) => (
                <div key={category.id} className="text-center">
                  <div className={`p-3 rounded-full border mx-auto w-14 h-14 flex items-center justify-center mb-3 ${
                    category.id === 'origin' ? 'border-yellow-400/30 bg-yellow-400/20' :
                    category.id === 'seeding' ? 'border-green-400/30 bg-green-400/20' :
                    category.id === 'evolution' ? 'border-blue-400/30 bg-blue-400/20' :
                    category.id === 'intervention' ? 'border-red-400/30 bg-red-400/20' :
                    'border-purple-400/30 bg-purple-400/20'
                  }`}>
                    <div className={category.color}>
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{category.label}</h3>
                  <p className="text-cosmic-300 text-xs">
                    {getEventsByCategory(category.id).length} events
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id 
                    ? 'sacred-button' 
                    : 'border-cosmic-600 text-cosmic-300 hover:border-sacred-gold/40'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Content */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Category Overview */}
            <Card className="sacred-card mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                  {getCategoryIcon(selectedCategory)}
                  <span className="ml-3">
                    {categories.find(c => c.id === selectedCategory)?.label} Era
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-sacred-gold">{filteredEvents.length}</div>
                    <div className="text-sm text-cosmic-400">Major Events</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sacred-silver">
                      {filteredEvents.reduce((acc, event) => acc + event.relatedConcepts.length, 0)}
                    </div>
                    <div className="text-sm text-cosmic-400">Related Concepts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gsf-blue">
                      {new Set(filteredEvents.flatMap(e => e.relatedConcepts)).size}
                    </div>
                    <div className="text-sm text-cosmic-400">Unique Concepts</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Events */}
            <div className="space-y-8">
              {filteredEvents.map((event, index) => (
                <Card key={event.id} className={`sacred-card relative overflow-hidden ${getCategoryColor(event.category)}`}>
                  {/* Timeline connector */}
                  {index < filteredEvents.length - 1 && (
                    <div className="absolute left-8 bottom-0 w-0.5 h-8 bg-gradient-to-b from-sacred-gold to-transparent"></div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      {/* Timeline marker */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-sacred-gold/20 border-2 border-sacred-gold flex items-center justify-center">
                          {getCategoryIcon(event.category)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-sacred-gold mb-2">{event.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-cosmic-400">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {event.timeframe}
                              </div>
                              <Badge variant="outline" className={`${
                                event.category === 'origin' ? 'text-yellow-400 border-yellow-400/40' :
                                event.category === 'seeding' ? 'text-green-400 border-green-400/40' :
                                event.category === 'evolution' ? 'text-blue-400 border-blue-400/40' :
                                event.category === 'intervention' ? 'text-red-400 border-red-400/40' :
                                'text-purple-400 border-purple-400/40'
                              }`}>
                                {event.category}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-white mb-2">Description</h4>
                            <p className="text-cosmic-100 leading-relaxed">{event.description}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-white mb-2">Significance</h4>
                            <p className="text-cosmic-200 leading-relaxed">{event.significance}</p>
                          </div>

                          {event.relatedConcepts.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-white mb-2">Related Concepts</h4>
                              <div className="flex flex-wrap gap-2">
                                {event.relatedConcepts.map((concept) => (
                                  <Badge 
                                    key={concept}
                                    variant="outline" 
                                    className="border-cosmic-500/30 text-cosmic-400 cursor-pointer hover:border-sacred-gold/40 hover:text-sacred-gold transition-colors"
                                    onClick={() => window.location.href = `/concept-detail/${concept.toLowerCase().replace(/\s+/g, '-')}`}
                                  >
                                    {concept}
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

            {/* Navigation between categories */}
            <div className="mt-12 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = categories.findIndex(c => c.id === selectedCategory);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
                  setSelectedCategory(categories[prevIndex].id);
                }}
                className="border-cosmic-600 text-cosmic-300 hover:border-sacred-gold/40"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Era
              </Button>
              
              <div className="text-center">
                <p className="text-cosmic-400 text-sm">
                  Showing {filteredEvents.length} events from {categories.find(c => c.id === selectedCategory)?.label}
                </p>
              </div>
              
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = categories.findIndex(c => c.id === selectedCategory);
                  const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
                  setSelectedCategory(categories[nextIndex].id);
                }}
                className="border-cosmic-600 text-cosmic-300 hover:border-sacred-gold/40"
              >
                Next Era
                <ArrowLeft className="w-4 h-4 ml-2 transform rotate-180" />
              </Button>
            </div>

            {/* Related Actions */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <h3 className="font-semibold text-white mb-2">Timeline Wars</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Explore the conflicts that shaped human history
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = '/timeline-wars'}
                  >
                    View Timeline Wars
                  </Button>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 mx-auto mb-4 text-pink-400" />
                  <h3 className="font-semibold text-white mb-2">GSF Foundation</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Learn the spiritual principles for awakening
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = '/gsf'}
                  >
                    Explore GSF
                  </Button>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                  <h3 className="font-semibold text-white mb-2">HGS Healing</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Sacred marriage and consciousness healing
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = '/hgs'}
                  >
                    Learn HGS
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