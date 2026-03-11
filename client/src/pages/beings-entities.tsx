import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  Star, 
  Eye, 
  Search,
  Heart,
  Zap,
  Skull,
  Bot,
  TreePine,
  Crown,
  Sparkles,
  X,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  beingsEntitiesData, 
  categoryDescriptions, 
  interactionPrinciples,
  getBeingById,
  getBeingsByCategory,
  getBeingsByAlignment,
  searchBeings,
  type BeingEntity
} from '@/lib/beings-entities-data';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface UserInteractions {
  encounteredBeings: string[];
  identifiedThreats: string[];
  positiveContacts: string[];
  notes: Record<string, string>;
}

export default function BeingsEntitiesPage() {
  const [interactions, setInteractions] = useLocalStorage<UserInteractions>('beings-interactions', {
    encounteredBeings: [],
    identifiedThreats: [],
    positiveContacts: [],
    notes: {}
  });

  const [selectedBeing, setSelectedBeing] = useState<BeingEntity | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterAlignment, setFilterAlignment] = useState<string>('all');

  const markEncountered = (beingId: string, type: 'encountered' | 'threat' | 'positive') => {
    setInteractions(prev => {
      const updated = { ...prev };
      
      if (type === 'encountered' && !updated.encounteredBeings.includes(beingId)) {
        updated.encounteredBeings.push(beingId);
      } else if (type === 'threat' && !updated.identifiedThreats.includes(beingId)) {
        updated.identifiedThreats.push(beingId);
        if (!updated.encounteredBeings.includes(beingId)) {
          updated.encounteredBeings.push(beingId);
        }
      } else if (type === 'positive' && !updated.positiveContacts.includes(beingId)) {
        updated.positiveContacts.push(beingId);
        if (!updated.encounteredBeings.includes(beingId)) {
          updated.encounteredBeings.push(beingId);
        }
      }
      
      return updated;
    });
  };

  const addNote = (beingId: string, note: string) => {
    setInteractions(prev => ({
      ...prev,
      notes: { ...prev.notes, [beingId]: note }
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'guardian': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'negative': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'neutral': return <Eye className="w-5 h-5 text-yellow-400" />;
      case 'artificial': return <Bot className="w-5 h-5 text-purple-400" />;
      case 'elemental': return <TreePine className="w-5 h-5 text-green-400" />;
      case 'angelic': return <Crown className="w-5 h-5 text-gold-400" />;
      case 'galactic': return <Star className="w-5 h-5 text-cyan-400" />;
      default: return <Sparkles className="w-5 h-5 text-cosmic-400" />;
    }
  };

  const getAlignmentColor = (alignment: string) => {
    switch (alignment) {
      case 'positive': return 'border-green-400/40 text-green-400 bg-green-400/10';
      case 'negative': return 'border-red-400/40 text-red-400 bg-red-400/10';
      case 'neutral': return 'border-yellow-400/40 text-yellow-400 bg-yellow-400/10';
      case 'artificial': return 'border-purple-400/40 text-purple-400 bg-purple-400/10';
      default: return 'border-cosmic-400/40 text-cosmic-400 bg-cosmic-400/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guardian': return <Shield className="w-4 h-4" />;
      case 'alien': return <Star className="w-4 h-4" />;
      case 'entity': return <Eye className="w-4 h-4" />;
      case 'demon': return <Skull className="w-4 h-4" />;
      case 'angel': return <Crown className="w-4 h-4" />;
      case 'ai': return <Bot className="w-4 h-4" />;
      case 'elemental': return <TreePine className="w-4 h-4" />;
      case 'god': return <Crown className="w-4 h-4" />;
      case 'avatar': return <Sparkles className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const filteredBeings = beingsEntitiesData.filter(being => {
    const matchesSearch = searchTerm === '' || searchBeings(searchTerm).includes(being);
    const matchesCategory = filterCategory === 'all' || being.category === filterCategory;
    const matchesAlignment = filterAlignment === 'all' || being.alignment === filterAlignment;
    return matchesSearch && matchesCategory && matchesAlignment;
  });

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
            Beings & Entities Identification
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-200 max-w-4xl mx-auto leading-relaxed">
            Comprehensive guide to identifying various conscious beings, entities, aliens, demons, 
            and spiritual beings based on Energetic Synthesis teachings and discernment protocols.
          </p>
          
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sacred-gold">{getBeingsByAlignment('positive').length}</div>
              <div className="text-cosmic-300 text-sm">Positive Beings</div>
            </div>
            <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sacred-gold">{getBeingsByAlignment('negative').length}</div>
              <div className="text-cosmic-300 text-sm">Negative Entities</div>
            </div>
            <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
              <Eye className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sacred-gold">{interactions.encounteredBeings.length}</div>
              <div className="text-cosmic-300 text-sm">Encountered</div>
            </div>
            <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
              <Bot className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sacred-gold">{getBeingsByAlignment('artificial').length}</div>
              <div className="text-cosmic-300 text-sm">Artificial Beings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-cosmic-700/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="catalog">Being Catalog</TabsTrigger>
              <TabsTrigger value="identification">Identification</TabsTrigger>
              <TabsTrigger value="protection">Protection Guide</TabsTrigger>
              <TabsTrigger value="personal">Personal Log</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="space-y-8">
                {/* Introduction */}
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Understanding Conscious Beings & Entities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-cosmic-200 leading-relaxed">
                      In our multidimensional reality, humans interact with various types of conscious beings and entities. 
                      Understanding their nature, intentions, and proper interaction protocols is essential for spiritual safety 
                      and development. This guide provides comprehensive information based on Energetic Synthesis teachings.
                    </p>
                    
                    <Alert className="border-yellow-400/40 bg-yellow-400/10">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertDescription className="text-cosmic-100">
                        <strong>Critical:</strong> Always maintain spiritual sovereignty and use proper protection protocols 
                        when encountering any unknown beings or entities. Never surrender your personal power.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                {/* Categories Overview */}
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Being Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(categoryDescriptions).map(([category, description]) => (
                        <div key={category} className="p-4 rounded-lg border border-cosmic-700 hover:border-sacred-gold/40 transition-colors">
                          <div className="flex items-center mb-3">
                            {getCategoryIcon(category)}
                            <h4 className="font-medium text-white ml-3 capitalize">{category}</h4>
                          </div>
                          <p className="text-cosmic-300 text-sm leading-relaxed">{description}</p>
                          <div className="mt-3">
                            <span className="text-xs text-cosmic-400">
                              {getBeingsByCategory(category).length} beings documented
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Interaction Principles */}
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Universal Interaction Principles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {interactionPrinciples.map((principle, index) => (
                        <div key={index} className="p-4 rounded-lg border border-cosmic-700">
                          <h4 className="font-medium text-white mb-2">{principle.title}</h4>
                          <p className="text-cosmic-300 text-sm mb-3 leading-relaxed">{principle.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {principle.practices.map((practice, practiceIndex) => (
                              <Badge key={practiceIndex} variant="outline" className="border-cosmic-600 text-cosmic-400">
                                {practice}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Being Catalog Tab */}
            <TabsContent value="catalog">
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cosmic-400" />
                    <Input
                      placeholder="Search beings by name, characteristics, or signs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-cosmic-800/50 border-cosmic-600"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 bg-cosmic-800/50 border border-cosmic-600 rounded-md text-white"
                  >
                    <option value="all">All Categories</option>
                    {Object.keys(categoryDescriptions).map(category => (
                      <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                    ))}
                  </select>
                  <select
                    value={filterAlignment}
                    onChange={(e) => setFilterAlignment(e.target.value)}
                    className="px-3 py-2 bg-cosmic-800/50 border border-cosmic-600 rounded-md text-white"
                  >
                    <option value="all">All Alignments</option>
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                    <option value="neutral">Neutral</option>
                    <option value="artificial">Artificial</option>
                  </select>
                </div>

                {/* Beings Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBeings.map((being) => (
                    <Card 
                      key={being.id} 
                      className="sacred-card hover:border-sacred-gold/40 transition-colors cursor-pointer touch-manipulation" 
                      onClick={() => setSelectedBeing(being)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedBeing(being);
                        }
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            {getCategoryIcon(being.category)}
                            <span className="ml-2 text-sm text-cosmic-400 capitalize">{being.category}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getAlignmentColor(being.alignment)}>
                              {being.alignment}
                            </Badge>
                            {interactions.encounteredBeings.includes(being.id) && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                        </div>
                        
                        <h3 className="font-medium text-white mb-2">{being.name}</h3>
                        <p className="text-cosmic-300 text-sm mb-4 leading-relaxed line-clamp-3">{being.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-cosmic-400">Type:</span>
                            <div className="flex items-center text-cosmic-200">
                              {getTypeIcon(being.type)}
                              <span className="ml-1 capitalize">{being.type}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-cosmic-400">Dimensional:</span>
                            <span className="text-cosmic-200">{being.dimensional}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Being Detail Modal */}
                {selectedBeing && (
                  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="sacred-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                      <CardHeader>
                        <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center justify-between">
                          <span className="flex items-center">
                            {getCategoryIcon(selectedBeing.category)}
                            <span className="ml-3">{selectedBeing.name}</span>
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedBeing(null)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <Badge className={getAlignmentColor(selectedBeing.alignment)}>
                            {selectedBeing.alignment} alignment
                          </Badge>
                          <Badge variant="outline" className="border-cosmic-600 text-cosmic-400">
                            {selectedBeing.type}
                          </Badge>
                          <Badge variant="outline" className="border-cosmic-600 text-cosmic-400">
                            {selectedBeing.dimensional}
                          </Badge>
                        </div>

                        <p className="text-cosmic-100 leading-relaxed">{selectedBeing.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-white mb-3">Characteristics:</h4>
                            <ul className="text-cosmic-300 text-sm space-y-1">
                              {selectedBeing.characteristics.map((char, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-sacred-gold mr-2">•</span>
                                  {char}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-white mb-3">Abilities:</h4>
                            <ul className="text-cosmic-300 text-sm space-y-1">
                              {selectedBeing.abilities.map((ability, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-sacred-silver mr-2">•</span>
                                  {ability}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-white mb-3">Intentions:</h4>
                            <ul className="text-cosmic-300 text-sm space-y-1">
                              {selectedBeing.intentions.map((intention, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-cosmic-400 mr-2">•</span>
                                  {intention}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-white mb-3">Recognition Signs:</h4>
                            <ul className="text-cosmic-300 text-sm space-y-1">
                              {selectedBeing.recognition_signs.map((sign, index) => (
                                <li key={index} className="flex items-start">
                                  <Eye className="w-3 h-3 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                                  {sign}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
                          <h4 className="font-medium text-white mb-3 flex items-center">
                            <Info className="w-4 h-4 mr-2" />
                            Interaction Guidance
                          </h4>
                          <p className="text-cosmic-100 text-sm leading-relaxed">{selectedBeing.interaction_guidance}</p>
                        </div>

                        {selectedBeing.warnings && (
                          <Alert className="border-red-400/40 bg-red-400/10">
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                            <AlertDescription>
                              <div className="space-y-1">
                                <strong className="text-red-400">Warnings:</strong>
                                {selectedBeing.warnings.map((warning, index) => (
                                  <div key={index} className="text-cosmic-100 text-sm">• {warning}</div>
                                ))}
                              </div>
                            </AlertDescription>
                          </Alert>
                        )}

                        <div>
                          <h4 className="font-medium text-white mb-3">Protection Methods:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedBeing.protection_methods.map((method, index) => (
                              <Badge key={index} variant="outline" className="border-blue-400/40 text-blue-400">
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-cosmic-700">
                          <div className="text-sm text-cosmic-400">
                            Origin: {selectedBeing.source_origin}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markEncountered(selectedBeing.id, 'encountered')}
                              className={`${interactions.encounteredBeings.includes(selectedBeing.id) ? 'border-green-400 text-green-400' : 'border-cosmic-600'}`}
                            >
                              {interactions.encounteredBeings.includes(selectedBeing.id) ? 'Encountered' : 'Mark Encountered'}
                            </Button>
                            {selectedBeing.alignment === 'negative' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markEncountered(selectedBeing.id, 'threat')}
                                className={`${interactions.identifiedThreats.includes(selectedBeing.id) ? 'border-red-400 text-red-400' : 'border-cosmic-600'}`}
                              >
                                {interactions.identifiedThreats.includes(selectedBeing.id) ? 'Threat Noted' : 'Mark as Threat'}
                              </Button>
                            )}
                            {selectedBeing.alignment === 'positive' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markEncountered(selectedBeing.id, 'positive')}
                                className={`${interactions.positiveContacts.includes(selectedBeing.id) ? 'border-green-400 text-green-400' : 'border-cosmic-600'}`}
                              >
                                {interactions.positiveContacts.includes(selectedBeing.id) ? 'Positive Contact' : 'Mark Positive'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Identification Tab */}
            <TabsContent value="identification">
              <div className="space-y-6">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Quick Identification Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-100 mb-6 leading-relaxed">
                      Use these guidelines to quickly assess and identify beings you encounter during spiritual practice, meditation, or other consciousness experiences.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Positive Signs */}
                      <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                        <h4 className="font-medium text-green-400 mb-3 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Positive Being Indicators
                        </h4>
                        <ul className="text-cosmic-300 text-sm space-y-2">
                          <li>• Emanates unconditional love and peace</li>
                          <li>• Respects your free will and boundaries</li>
                          <li>• Never demands worship or submission</li>
                          <li>• Provides guidance without fear tactics</li>
                          <li>• Increases your spiritual awareness</li>
                          <li>• Supports your personal empowerment</li>
                          <li>• Feels warm, loving, and safe</li>
                          <li>• Encourages connection to divine source</li>
                        </ul>
                      </div>

                      {/* Negative Signs */}
                      <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                        <h4 className="font-medium text-red-400 mb-3 flex items-center">
                          <XCircle className="w-4 h-4 mr-2" />
                          Negative Being Indicators
                        </h4>
                        <ul className="text-cosmic-300 text-sm space-y-2">
                          <li>• Uses fear, guilt, or shame tactics</li>
                          <li>• Demands worship, submission, or obedience</li>
                          <li>• Violates your free will or boundaries</li>
                          <li>• Creates dependency or addiction</li>
                          <li>• Drains your energy or vitality</li>
                          <li>• Promises power over others</li>
                          <li>• Feels cold, dark, or threatening</li>
                          <li>• Discourages spiritual sovereignty</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Identification */}
                <Card className="sacred-card border-red-500/40">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-red-400">
                      Emergency Identification Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert className="border-red-400/40 bg-red-400/10">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <AlertDescription className="text-cosmic-100">
                          If you encounter a being and feel threatened, confused, or unsafe, immediately implement this protocol.
                        </AlertDescription>
                      </Alert>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border border-cosmic-700">
                          <h4 className="font-medium text-white mb-2">1. Immediate Protection</h4>
                          <ul className="text-cosmic-300 text-sm space-y-1">
                            <li>• Activate 12D Shield immediately</li>
                            <li>• Declare GSF sovereignty</li>
                            <li>• Call upon Guardian Host</li>
                            <li>• Refuse all interaction</li>
                          </ul>
                        </div>

                        <div className="p-4 rounded-lg border border-cosmic-700">
                          <h4 className="font-medium text-white mb-2">2. Assess & Identify</h4>
                          <ul className="text-cosmic-300 text-sm space-y-1">
                            <li>• Note physical appearance</li>
                            <li>• Observe energy signature</li>
                            <li>• Document behavior patterns</li>
                            <li>• Trust your gut feelings</li>
                          </ul>
                        </div>

                        <div className="p-4 rounded-lg border border-cosmic-700">
                          <h4 className="font-medium text-white mb-2">3. Take Action</h4>
                          <ul className="text-cosmic-300 text-sm space-y-1">
                            <li>• Command departure if negative</li>
                            <li>• Verify authenticity if positive</li>
                            <li>• Document the encounter</li>
                            <li>• Seek guidance if needed</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Protection Guide Tab */}
            <TabsContent value="protection">
              <div className="space-y-6">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Universal Protection Protocols
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <p className="text-cosmic-100 leading-relaxed">
                        These protection methods work universally against negative beings and entities. Practice them regularly to maintain strong spiritual boundaries.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                          <h4 className="font-medium text-blue-400 mb-3">Core Protection Methods</h4>
                          <ul className="text-cosmic-300 text-sm space-y-2">
                            <li>• <strong>12D Shield:</strong> Primary spiritual protection barrier</li>
                            <li>• <strong>GSF Decree:</strong> Sovereignty declaration</li>
                            <li>• <strong>Guardian Host:</strong> Divine protection team</li>
                            <li>• <strong>Christ Consciousness:</strong> Highest spiritual authority</li>
                            <li>• <strong>Spiritual Authority:</strong> Personal power declaration</li>
                          </ul>
                        </div>

                        <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
                          <h4 className="font-medium text-purple-400 mb-3">Advanced Techniques</h4>
                          <ul className="text-cosmic-300 text-sm space-y-2">
                            <li>• <strong>Violet Flame:</strong> Transmutation energy</li>
                            <li>• <strong>Entity Clearing:</strong> Attachment removal</li>
                            <li>• <strong>Space Clearing:</strong> Environmental protection</li>
                            <li>• <strong>Krystal Star:</strong> Authentic Guardian connection</li>
                            <li>• <strong>Aurora Clearing:</strong> Deep healing and restoration</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alignment-Specific Protocols */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="sacred-card border-red-500/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-red-400">
                        Negative Beings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-cosmic-300 text-sm space-y-2">
                        <li>• <strong>Never engage:</strong> Refuse all communication</li>
                        <li>• <strong>Immediate protection:</strong> 12D Shield + GSF</li>
                        <li>• <strong>Command departure:</strong> Use spiritual authority</li>
                        <li>• <strong>Guardian support:</strong> Call authentic help</li>
                        <li>• <strong>Follow-up clearing:</strong> Remove any attachments</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="sacred-card border-yellow-500/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-yellow-400">
                        Unknown Beings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-cosmic-300 text-sm space-y-2">
                        <li>• <strong>Protection first:</strong> Always establish shield</li>
                        <li>• <strong>Test authenticity:</strong> Verify through Guardians</li>
                        <li>• <strong>Observe carefully:</strong> Note all characteristics</li>
                        <li>• <strong>Trust intuition:</strong> Honor your inner knowing</li>
                        <li>• <strong>Proceed cautiously:</strong> Take time to assess</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="sacred-card border-green-500/40">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-green-400">
                        Positive Beings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-cosmic-300 text-sm space-y-2">
                        <li>• <strong>Verify authenticity:</strong> Always confirm identity</li>
                        <li>• <strong>Maintain boundaries:</strong> Keep personal power</li>
                        <li>• <strong>Heart-centered:</strong> Connect through love</li>
                        <li>• <strong>Ask for guidance:</strong> Request specific help</li>
                        <li>• <strong>Express gratitude:</strong> Honor the connection</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Personal Log Tab */}
            <TabsContent value="personal">
              <div className="space-y-6">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Personal Encounter Log
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-100 mb-6 leading-relaxed">
                      Track your personal encounters with beings and entities. This helps build your discernment and recognition abilities over time.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 rounded-lg border border-cosmic-700 text-center">
                        <div className="text-2xl font-bold text-sacred-gold mb-2">{interactions.encounteredBeings.length}</div>
                        <div className="text-cosmic-300 text-sm">Total Encounters</div>
                      </div>
                      <div className="p-4 rounded-lg border border-cosmic-700 text-center">
                        <div className="text-2xl font-bold text-green-400 mb-2">{interactions.positiveContacts.length}</div>
                        <div className="text-cosmic-300 text-sm">Positive Contacts</div>
                      </div>
                      <div className="p-4 rounded-lg border border-cosmic-700 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-2">{interactions.identifiedThreats.length}</div>
                        <div className="text-cosmic-300 text-sm">Identified Threats</div>
                      </div>
                    </div>

                    {interactions.encounteredBeings.length === 0 ? (
                      <div className="text-center py-8">
                        <Eye className="w-12 h-12 mx-auto mb-4 text-cosmic-400 opacity-50" />
                        <h3 className="text-lg font-medium text-cosmic-100 mb-2">No Encounters Logged</h3>
                        <p className="text-cosmic-300">Start exploring the being catalog to learn and track encounters.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {interactions.encounteredBeings.map((beingId) => {
                          const being = getBeingById(beingId);
                          if (!being) return null;

                          return (
                            <div key={beingId} className="p-4 rounded-lg border border-cosmic-700">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                  {getCategoryIcon(being.category)}
                                  <h4 className="font-medium text-white ml-3">{being.name}</h4>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge className={getAlignmentColor(being.alignment)}>
                                    {being.alignment}
                                  </Badge>
                                  {interactions.positiveContacts.includes(beingId) && (
                                    <Badge className="border-green-400/40 text-green-400 bg-green-400/10">
                                      Positive
                                    </Badge>
                                  )}
                                  {interactions.identifiedThreats.includes(beingId) && (
                                    <Badge className="border-red-400/40 text-red-400 bg-red-400/10">
                                      Threat
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-cosmic-300 text-sm mb-3">{being.description}</p>
                              
                              {interactions.notes[beingId] && (
                                <div className="p-3 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
                                  <h5 className="text-sm font-medium text-cosmic-200 mb-2">Personal Notes:</h5>
                                  <p className="text-cosmic-300 text-sm">{interactions.notes[beingId]}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}