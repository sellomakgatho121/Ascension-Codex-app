import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  timelineWarsChronology, 
  getWarsByCategory,
  getWarsByTimeframe,
  type TimelineWar 
} from "@/lib/timeline-wars";
import { 
  ArrowLeft, 
  Sword, 
  Globe, 
  Shield, 
  Zap,
  Calendar,
  Users,
  Crown,
  Brain,
  Eye,
  Skull,
  AlertTriangle
} from "lucide-react";

export default function TimelineWarsPage() {
  const [selectedCategory, setSelectedCategory] = useState("galactic");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
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
    { id: 'galactic', label: 'Galactic Wars', icon: <Globe className="w-4 h-4" />, color: 'text-blue-400' },
    { id: 'planetary', label: 'Planetary Wars', icon: <Shield className="w-4 h-4" />, color: 'text-green-400' },
    { id: 'dimensional', label: 'Dimensional Wars', icon: <Eye className="w-4 h-4" />, color: 'text-purple-400' },
    { id: 'consciousness', label: 'Consciousness Wars', icon: <Brain className="w-4 h-4" />, color: 'text-red-400' }
  ];

  const timeframes = [
    { id: 'all', label: 'All Periods' },
    { id: 'ancient', label: 'Ancient (Millions of Years)' },
    { id: 'historical', label: 'Historical (BCE - 1900 CE)' },
    { id: 'modern', label: 'Modern (1900 - 2000 CE)' },
    { id: 'current', label: 'Current (2000 CE - Present)' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'galactic': return <Globe className="w-5 h-5 text-blue-400" />;
      case 'planetary': return <Shield className="w-5 h-5 text-green-400" />;
      case 'dimensional': return <Eye className="w-5 h-5 text-purple-400" />;
      case 'consciousness': return <Brain className="w-5 h-5 text-red-400" />;
      default: return <Sword className="w-5 h-5 text-cosmic-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'galactic': return 'border-blue-400/40 bg-blue-400/10';
      case 'planetary': return 'border-green-400/40 bg-green-400/10';
      case 'dimensional': return 'border-purple-400/40 bg-purple-400/10';
      case 'consciousness': return 'border-red-400/40 bg-red-400/10';
      default: return 'border-cosmic-500/40 bg-cosmic-500/10';
    }
  };

  const getFilteredWars = () => {
    let wars = selectedCategory === 'all' 
      ? timelineWarsChronology 
      : getWarsByCategory(selectedCategory);
    
    if (selectedTimeframe !== 'all') {
      wars = wars.filter(war => {
        switch (selectedTimeframe) {
          case 'ancient':
            return war.timeframe.includes('Million') || war.timeframe.includes('000 Years');
          case 'historical':
            return war.timeframe.includes('BCE') || 
                   (war.timeframe.includes('CE') && !war.timeframe.includes('19') && !war.timeframe.includes('20'));
          case 'modern':
            return war.timeframe.includes('19') || war.timeframe.includes('20');
          case 'current':
            return war.timeframe.includes('2012') || war.timeframe.includes('Present') || war.timeframe.includes('2017');
          default:
            return true;
        }
      });
    }
    
    return wars;
  };

  const filteredWars = getFilteredWars();

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readingProgress} className="h-1 bg-cosmic-800" />
      </div>

      {/* Hero Section */}
      <section className="cosmic-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-red-400 rounded-full"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-orange-400 opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-red-400/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          {/* War symbols */}
          <div className="absolute top-1/3 right-1/3 flex items-center space-x-2 opacity-20">
            <Sword className="w-8 h-8 text-red-400" />
            <Shield className="w-8 h-8 text-blue-400" />
            <Skull className="w-8 h-8 text-orange-400" />
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
              <div className="p-4 rounded-full bg-red-400/20 border-2 border-red-400">
                <Sword className="w-12 h-12 text-red-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-sacred font-bold text-red-400">
                  Timeline Wars
                </h1>
                <p className="text-xl text-cosmic-100 mt-2">Chronological History of Galactic Conflicts</p>
              </div>
            </div>
            
            <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-red-400">Important Historical Context</span>
              </div>
              <p className="text-cosmic-100 leading-relaxed">
                These wars represent conflicts between human consciousness evolution and anti-human forces 
                seeking to control and suppress human spiritual development throughout galactic history.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 mt-12">
              {categories.map((category) => (
                <div key={category.id} className="text-center">
                  <div className={`p-3 rounded-full border mx-auto w-14 h-14 flex items-center justify-center mb-3 ${
                    category.id === 'galactic' ? 'border-blue-400/30 bg-blue-400/20' :
                    category.id === 'planetary' ? 'border-green-400/30 bg-green-400/20' :
                    category.id === 'dimensional' ? 'border-purple-400/30 bg-purple-400/20' :
                    'border-red-400/30 bg-red-400/20'
                  }`}>
                    <div className={category.color}>
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{category.label}</h3>
                  <p className="text-cosmic-300 text-xs">
                    {getWarsByCategory(category.id).length} wars
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">War Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? "default" : "outline"}
                  onClick={() => setSelectedCategory('all')}
                  className={selectedCategory === 'all' ? 'sacred-button' : 'border-cosmic-600 text-cosmic-300'}
                >
                  All Wars
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${
                      selectedCategory === category.id 
                        ? 'sacred-button' 
                        : 'border-cosmic-600 text-cosmic-300 hover:border-red-400/40'
                    }`}
                  >
                    {category.icon}
                    <span className="ml-2">{category.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Timeframe Filter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Time Periods</h3>
              <div className="flex flex-wrap gap-2">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe.id}
                    variant={selectedTimeframe === timeframe.id ? "default" : "outline"}
                    onClick={() => setSelectedTimeframe(timeframe.id)}
                    className={`${
                      selectedTimeframe === timeframe.id 
                        ? 'sacred-button' 
                        : 'border-cosmic-600 text-cosmic-300 hover:border-red-400/40'
                    }`}
                  >
                    {timeframe.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wars Content */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Results Summary */}
            <Card className="sacred-card mb-8">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-400">{filteredWars.length}</div>
                    <div className="text-sm text-cosmic-400">Major Wars</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">
                      {new Set(filteredWars.flatMap(w => [...w.participants.human, ...w.participants.antiHuman])).size}
                    </div>
                    <div className="text-sm text-cosmic-400">Participants</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">
                      {new Set(filteredWars.flatMap(w => w.technologies)).size}
                    </div>
                    <div className="text-sm text-cosmic-400">Technologies</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">
                      {filteredWars.filter(w => w.timeframe.includes('Present') || w.timeframe.includes('2017')).length}
                    </div>
                    <div className="text-sm text-cosmic-400">Current Wars</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wars Timeline */}
            <div className="space-y-8">
              {filteredWars.map((war, index) => (
                <Card key={war.id} className={`sacred-card relative overflow-hidden ${getCategoryColor(war.category)}`}>
                  {/* Timeline connector */}
                  {index < filteredWars.length - 1 && (
                    <div className="absolute left-8 bottom-0 w-0.5 h-8 bg-gradient-to-b from-red-400 to-transparent"></div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      {/* Timeline marker */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-red-400/20 border-2 border-red-400 flex items-center justify-center">
                          {getCategoryIcon(war.category)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-red-400 mb-2">{war.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-cosmic-400">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {war.timeframe}
                              </div>
                              <div className="flex items-center">
                                <Globe className="w-4 h-4 mr-1" />
                                {war.location}
                              </div>
                              <Badge variant="outline" className={`${
                                war.category === 'galactic' ? 'text-blue-400 border-blue-400/40' :
                                war.category === 'planetary' ? 'text-green-400 border-green-400/40' :
                                war.category === 'dimensional' ? 'text-purple-400 border-purple-400/40' :
                                'text-red-400 border-red-400/40'
                              }`}>
                                {war.category}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-white mb-2">Conflict Description</h4>
                            <p className="text-cosmic-100 leading-relaxed">{war.description}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-white mb-3">Participants</h4>
                              <div className="space-y-3">
                                <div>
                                  <h5 className="text-sm font-medium text-green-400 mb-2">Human Forces</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {war.participants.human.map((participant) => (
                                      <Badge 
                                        key={participant}
                                        variant="outline" 
                                        className="border-green-400/40 text-green-400 text-xs"
                                      >
                                        {participant}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-red-400 mb-2">Anti-Human Forces</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {war.participants.antiHuman.map((participant) => (
                                      <Badge 
                                        key={participant}
                                        variant="outline" 
                                        className="border-red-400/40 text-red-400 text-xs"
                                      >
                                        {participant}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-white mb-3">Technologies Used</h4>
                              <div className="flex flex-wrap gap-1">
                                {war.technologies.map((tech) => (
                                  <Badge 
                                    key={tech}
                                    variant="outline" 
                                    className="border-purple-400/40 text-purple-400 text-xs"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-white mb-2">Consequences</h4>
                            <p className="text-cosmic-200 leading-relaxed">{war.consequences}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-white mb-2">Historical Significance</h4>
                            <p className="text-yellow-200 leading-relaxed">{war.significance}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredWars.length === 0 && (
              <Card className="sacred-card">
                <CardContent className="p-12 text-center">
                  <Sword className="w-12 h-12 mx-auto mb-4 text-cosmic-400" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Wars Found</h3>
                  <p className="text-cosmic-400">
                    No timeline wars match your current filter criteria. Try adjusting your selection.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Related Actions */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Crown className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                  <h3 className="font-semibold text-white mb-2">Creation Journey</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Explore humanity's complete creation story
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = '/humanity-creation'}
                  >
                    View Creation Timeline
                  </Button>
                </CardContent>
              </Card>

              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <h3 className="font-semibold text-white mb-2">GSF Protection</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Learn spiritual protection principles
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
                  <Brain className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                  <h3 className="font-semibold text-white mb-2">Knowledge Base</h3>
                  <p className="text-cosmic-300 text-sm mb-4">
                    Explore all ES concepts and teachings
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = '/knowledge-base'}
                  >
                    Browse Knowledge
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