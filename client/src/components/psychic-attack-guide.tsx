import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  Target, 
  Zap, 
  Clock, 
  CheckCircle, 
  X,
  Play,
  Eye,
  Heart,
  Brain,
  Flame,
  Sparkles
} from 'lucide-react';
import {
  attackSymptoms,
  attackTypes,
  neutralizationTechniques,
  recognitionChecklist,
  emergencyResponseSteps,
  assessAttackSeverity,
  recommendTechniques,
  type AttackSymptom,
  type AttackType,
  type NeutralizationTechnique
} from '@/lib/psychic-attack-guide';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface AssessmentState {
  selectedSymptoms: string[];
  identifiedAttackType: string | null;
  severity: string;
  recommendedTechniques: string[];
  lastAssessment: string;
}

export function PsychicAttackGuide() {
  const [assessment, setAssessment] = useLocalStorage<AssessmentState>('psychic-attack-assessment', {
    selectedSymptoms: [],
    identifiedAttackType: null,
    severity: 'mild',
    recommendedTechniques: [],
    lastAssessment: ''
  });

  const [selectedTechnique, setSelectedTechnique] = useState<NeutralizationTechnique | null>(null);
  const [activeTab, setActiveTab] = useState('recognition');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    setAssessment(prev => {
      const newSymptoms = prev.selectedSymptoms.includes(symptomId)
        ? prev.selectedSymptoms.filter(id => id !== symptomId)
        : [...prev.selectedSymptoms, symptomId];
      
      return { ...prev, selectedSymptoms: newSymptoms };
    });
  };

  const runAssessment = () => {
    setIsAssessing(true);
    
    // Simulate assessment processing
    setTimeout(() => {
      const severity = assessAttackSeverity(assessment.selectedSymptoms);
      const techniques = recommendTechniques('', severity);
      
      // Determine most likely attack type based on symptoms
      let likelyAttackType = null;
      if (assessment.selectedSymptoms.includes('sudden-energy-drain')) {
        likelyAttackType = 'energy-vampirism';
      } else if (assessment.selectedSymptoms.includes('intrusive-thoughts')) {
        likelyAttackType = 'entity-interference';
      } else if (assessment.selectedSymptoms.includes('physical-pain')) {
        likelyAttackType = 'direct-psychic-attack';
      }
      
      setAssessment(prev => ({
        ...prev,
        severity,
        identifiedAttackType: likelyAttackType,
        recommendedTechniques: techniques.slice(0, 3).map(t => t.id),
        lastAssessment: new Date().toISOString()
      }));
      
      setIsAssessing(false);
      setActiveTab('assessment');
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-green-400 border-green-400/40 bg-green-400/10';
      case 'moderate': return 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10';
      case 'severe': return 'text-orange-400 border-orange-400/40 bg-orange-400/10';
      case 'critical': return 'text-red-400 border-red-400/40 bg-red-400/10';
      default: return 'text-cosmic-400 border-cosmic-400/40 bg-cosmic-400/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return <Heart className="w-4 h-4 text-red-400" />;
      case 'emotional': return <Heart className="w-4 h-4 text-pink-400" />;
      case 'mental': return <Brain className="w-4 h-4 text-blue-400" />;
      case 'spiritual': return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'environmental': return <Eye className="w-4 h-4 text-green-400" />;
      default: return <Target className="w-4 h-4 text-cosmic-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 border-green-400/40';
      case 'intermediate': return 'text-yellow-400 border-yellow-400/40';
      case 'advanced': return 'text-red-400 border-red-400/40';
      default: return 'text-cosmic-400 border-cosmic-400/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Alert */}
      {emergencyMode && (
        <Alert className="border-red-500/50 bg-red-500/10 animate-pulse">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-red-400">EMERGENCY MODE ACTIVATED</strong>
                <p className="text-cosmic-100 text-sm mt-1">Follow immediate response protocol below</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEmergencyMode(false)}
                className="border-red-400 text-red-400"
              >
                Deactivate
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Emergency Response */}
      {emergencyMode && (
        <Card className="sacred-card border-red-500/40">
          <CardHeader>
            <CardTitle className="text-xl font-sacred text-red-400 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3" />
              IMMEDIATE EMERGENCY RESPONSE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyResponseSteps.map((step, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg border border-red-500/20 bg-red-500/5">
                  <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                    {step.priority}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{step.action}</h4>
                    <p className="text-cosmic-100 text-sm mb-2">{step.description}</p>
                    <Badge variant="outline" className="text-xs border-red-400/40 text-red-400">
                      {step.timeframe}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 sm:grid-cols-5 bg-cosmic-700/50">
            <TabsTrigger value="recognition">Recognition</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="neutralization">Neutralization</TabsTrigger>
            <TabsTrigger value="techniques">Techniques</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
          </TabsList>

          <Button
            onClick={() => setEmergencyMode(true)}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 animate-pulse"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            EMERGENCY HELP
          </Button>
        </div>

        {/* Recognition Tab */}
        <TabsContent value="recognition">
          <div className="space-y-6">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-xl font-sacred text-sacred-gold">
                  Psychic Attack Symptom Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cosmic-100 mb-6 leading-relaxed">
                  Psychic attacks can manifest through various physical, emotional, mental, and spiritual symptoms. 
                  Use this comprehensive checklist to identify potential attacks and assess their severity.
                </p>

                <div className="space-y-6">
                  {recognitionChecklist.map((category, index) => (
                    <div key={index} className="p-4 rounded-lg border border-cosmic-700">
                      <h4 className="font-medium text-white mb-3 flex items-center">
                        {getCategoryIcon(category.category.toLowerCase())}
                        <span className="ml-2">{category.category}</span>
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${category.category}-${itemIndex}`}
                              checked={assessment.selectedSymptoms.some(symptom => 
                                attackSymptoms.find(s => s.id === symptom)?.indicators.includes(item)
                              )}
                              onCheckedChange={(checked) => {
                                const symptom = attackSymptoms.find(s => s.indicators.includes(item));
                                if (symptom && checked) {
                                  toggleSymptom(symptom.id);
                                }
                              }}
                              className="border-cosmic-600"
                            />
                            <label 
                              htmlFor={`${category.category}-${itemIndex}`}
                              className="text-cosmic-300 text-sm cursor-pointer"
                            >
                              {item}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={runAssessment}
                    disabled={assessment.selectedSymptoms.length === 0 || isAssessing}
                    className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
                    size="lg"
                  >
                    {isAssessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-cosmic-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Run Attack Assessment
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Symptoms */}
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-lg font-sacred text-sacred-gold">
                  Detailed Symptom Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {attackSymptoms.map((symptom) => (
                    <div key={symptom.id} className="p-3 rounded-lg border border-cosmic-700 hover:border-sacred-gold/40 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white text-sm">{symptom.name}</h4>
                        <Badge className={getSeverityColor(symptom.severity)}>
                          {symptom.severity}
                        </Badge>
                      </div>
                      <p className="text-cosmic-300 text-xs mb-2 leading-relaxed">{symptom.description}</p>
                      <div className="text-xs text-cosmic-400">
                        Duration: {symptom.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Assessment Tab */}
        <TabsContent value="assessment">
          <div className="space-y-6">
            {assessment.selectedSymptoms.length === 0 ? (
              <Card className="sacred-card">
                <CardContent className="p-8 text-center">
                  <Target className="w-12 h-12 mx-auto mb-4 text-cosmic-400 opacity-50" />
                  <h3 className="text-lg font-medium text-cosmic-100 mb-2">No Assessment Available</h3>
                  <p className="text-cosmic-300">Please complete the recognition checklist first to receive your personalized assessment.</p>
                  <Button
                    onClick={() => setActiveTab('recognition')}
                    className="mt-4"
                    variant="outline"
                  >
                    Go to Recognition
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Assessment Results */}
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Assessment Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 rounded-lg border border-cosmic-700">
                        <div className="text-2xl font-bold text-sacred-gold mb-2">
                          {assessment.selectedSymptoms.length}
                        </div>
                        <div className="text-cosmic-300 text-sm">Symptoms Identified</div>
                      </div>
                      
                      <div className="text-center p-4 rounded-lg border border-cosmic-700">
                        <Badge className={`${getSeverityColor(assessment.severity)} text-lg px-4 py-2`}>
                          {assessment.severity.toUpperCase()}
                        </Badge>
                        <div className="text-cosmic-300 text-sm mt-2">Threat Level</div>
                      </div>
                      
                      <div className="text-center p-4 rounded-lg border border-cosmic-700">
                        <div className="text-2xl font-bold text-sacred-gold mb-2">
                          {assessment.recommendedTechniques.length}
                        </div>
                        <div className="text-cosmic-300 text-sm">Recommended Techniques</div>
                      </div>
                    </div>

                    {assessment.identifiedAttackType && (
                      <Alert className="border-yellow-400/40 bg-yellow-400/10">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <AlertDescription>
                          <strong className="text-yellow-400">Likely Attack Type:</strong>
                          <span className="text-cosmic-100 ml-2">
                            {attackTypes.find(t => t.id === assessment.identifiedAttackType)?.name || 'Unknown'}
                          </span>
                        </AlertDescription>
                      </Alert>
                    )}

                    {assessment.severity === 'critical' && (
                      <Alert className="border-red-400/40 bg-red-400/10">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <AlertDescription>
                          <strong className="text-red-400">CRITICAL THREAT LEVEL:</strong>
                          <span className="text-cosmic-100 ml-2">
                            Immediate action required. Consider emergency protocols and professional spiritual assistance.
                          </span>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Recommended Techniques */}
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Recommended Neutralization Techniques
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assessment.recommendedTechniques.map((techniqueId, index) => {
                        const technique = neutralizationTechniques.find(t => t.id === techniqueId);
                        if (!technique) return null;

                        return (
                          <div key={techniqueId} className="p-4 rounded-lg border border-cosmic-700 hover:border-sacred-gold/40 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-sacred-gold text-cosmic-900 flex items-center justify-center font-bold text-sm mr-3">
                                  {index + 1}
                                </div>
                                <h4 className="font-medium text-white">{technique.name}</h4>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className={getDifficultyColor(technique.difficulty)}>
                                  {technique.difficulty}
                                </Badge>
                                <Badge variant="outline" className="border-cosmic-600 text-cosmic-400">
                                  {technique.effectiveness}% effective
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-cosmic-300 text-sm mb-3 leading-relaxed">{technique.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-xs text-cosmic-400">
                                <Clock className="w-3 h-3 mr-1" />
                                {technique.timeRequired}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedTechnique(technique)}
                                className="border-sacred-gold/40 text-sacred-gold hover:bg-sacred-gold/10"
                              >
                                View Technique
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>

        {/* Neutralization Tab */}
        <TabsContent value="neutralization">
          <div className="space-y-6">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-xl font-sacred text-sacred-gold">
                  Neutralization Protocols by Attack Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {attackTypes.map((attackType) => (
                    <div key={attackType.id} className="p-4 rounded-lg border border-cosmic-700">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">{attackType.name}</h4>
                        <Badge className={getSeverityColor(attackType.severity)}>
                          {attackType.severity} severity
                        </Badge>
                      </div>
                      
                      <p className="text-cosmic-300 text-sm mb-4 leading-relaxed">{attackType.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-cosmic-200 mb-2">Neutralization Steps:</h5>
                          <ol className="text-cosmic-300 text-xs space-y-1">
                            {attackType.neutralizationSteps.map((step, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-sacred-gold mr-2 font-mono">{index + 1}.</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-red-400 mb-2">Emergency Protocol:</h5>
                          <ul className="text-cosmic-300 text-xs space-y-1">
                            {attackType.emergencyProtocol.map((step, index) => (
                              <li key={index} className="flex items-start">
                                <AlertTriangle className="w-3 h-3 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Techniques Tab */}
        <TabsContent value="techniques">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neutralizationTechniques.map((technique) => (
                <Card key={technique.id} className="sacred-card hover:border-sacred-gold/40 transition-colors cursor-pointer" onClick={() => setSelectedTechnique(technique)}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Shield className="w-5 h-5 text-blue-400" />
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getDifficultyColor(technique.difficulty)}>
                          {technique.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-white mb-2">{technique.name}</h3>
                    <p className="text-cosmic-300 text-sm mb-4 leading-relaxed line-clamp-3">{technique.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-cosmic-400">Effectiveness:</span>
                        <span className="text-sacred-gold">{technique.effectiveness}%</span>
                      </div>
                      <Progress value={technique.effectiveness} className="h-1" />
                      
                      <div className="flex justify-between text-xs">
                        <span className="text-cosmic-400">Time Required:</span>
                        <span className="text-cosmic-200">{technique.timeRequired}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Technique Detail Modal */}
            {selectedTechnique && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="sacred-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center justify-between">
                      <span className="flex items-center">
                        <Shield className="w-6 h-6 mr-3" />
                        {selectedTechnique.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTechnique(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className={getDifficultyColor(selectedTechnique.difficulty)}>
                        {selectedTechnique.difficulty}
                      </Badge>
                      <Badge variant="outline" className="border-cosmic-600 text-cosmic-400">
                        {selectedTechnique.effectiveness}% effective
                      </Badge>
                      <div className="flex items-center text-sm text-cosmic-300">
                        <Clock className="w-4 h-4 mr-1" />
                        {selectedTechnique.timeRequired}
                      </div>
                    </div>

                    <p className="text-cosmic-100 leading-relaxed">{selectedTechnique.description}</p>

                    <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
                      <h4 className="font-medium text-white mb-3 flex items-center">
                        <Play className="w-4 h-4 mr-2" />
                        Step-by-Step Instructions
                      </h4>
                      <ol className="text-cosmic-100 text-sm space-y-2">
                        {selectedTechnique.stepByStep.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-6 h-6 rounded-full bg-sacred-gold text-cosmic-900 flex items-center justify-center font-bold text-xs mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Best Used For:</h4>
                        <ul className="text-cosmic-300 text-sm space-y-1">
                          {selectedTechnique.situations.map((situation, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-sacred-gold mr-2">•</span>
                              {situation}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Follow-up Actions:</h4>
                        <ul className="text-cosmic-300 text-sm space-y-1">
                          {selectedTechnique.followUpActions.map((action, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-sacred-silver mr-2">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {selectedTechnique.warnings && (
                      <Alert className="border-yellow-400/40 bg-yellow-400/10">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <AlertDescription>
                          <div className="space-y-1">
                            <strong className="text-yellow-400">Important Warnings:</strong>
                            {selectedTechnique.warnings.map((warning, index) => (
                              <div key={index} className="text-cosmic-100 text-sm">• {warning}</div>
                            ))}
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Prevention Tab */}
        <TabsContent value="prevention">
          <div className="space-y-6">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-xl font-sacred text-sacred-gold">
                  Prevention & Daily Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-cosmic-100 leading-relaxed">
                  The best defense against psychic attacks is strong daily protection practices and maintaining 
                  high spiritual vibration. Implement these preventive measures for ongoing protection.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                    <h4 className="font-medium text-blue-400 mb-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Daily Protection Routine
                    </h4>
                    <ul className="text-cosmic-300 text-sm space-y-2">
                      <li>• <strong>Morning:</strong> 12D Shield activation and GSF decree</li>
                      <li>• <strong>Midday:</strong> Boundary check and shield reinforcement</li>
                      <li>• <strong>Evening:</strong> Energy clearing and gratitude practice</li>
                      <li>• <strong>Before Sleep:</strong> Protection renewal and space clearing</li>
                      <li>• <strong>Weekly:</strong> Comprehensive entity clearing session</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                    <h4 className="font-medium text-green-400 mb-3 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Vibrational Protection
                    </h4>
                    <ul className="text-cosmic-300 text-sm space-y-2">
                      <li>• <strong>Love & Gratitude:</strong> High vibrational emotions</li>
                      <li>• <strong>Spiritual Practice:</strong> Regular meditation and prayer</li>
                      <li>• <strong>Healthy Lifestyle:</strong> Good diet, exercise, and rest</li>
                      <li>• <strong>Positive Environment:</strong> Uplifting people and spaces</li>
                      <li>• <strong>Service to Others:</strong> Compassionate action</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
                    <h4 className="font-medium text-purple-400 mb-3 flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Awareness & Discernment
                    </h4>
                    <ul className="text-cosmic-300 text-sm space-y-2">
                      <li>• <strong>Energy Sensitivity:</strong> Notice energy shifts and changes</li>
                      <li>• <strong>People Assessment:</strong> Recognize energy vampires</li>
                      <li>• <strong>Boundary Setting:</strong> Clear limits with others</li>
                      <li>• <strong>Intuition Development:</strong> Trust inner knowing</li>
                      <li>• <strong>Red Flag Recognition:</strong> Identify potential threats</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
                    <h4 className="font-medium text-yellow-400 mb-3 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Vulnerability Factors
                    </h4>
                    <ul className="text-cosmic-300 text-sm space-y-2">
                      <li>• <strong>Avoid:</strong> Negative people, places, and media</li>
                      <li>• <strong>Limit:</strong> Alcohol, drugs, and consciousness-altering substances</li>
                      <li>• <strong>Address:</strong> Emotional wounds and trauma</li>
                      <li>• <strong>Strengthen:</strong> Self-worth and personal power</li>
                      <li>• <strong>Maintain:</strong> Regular spiritual hygiene</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}