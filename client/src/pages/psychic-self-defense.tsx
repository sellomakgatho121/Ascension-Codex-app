import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  Zap, 
  Eye, 
  Sword,
  Heart,
  Clock,
  CheckCircle,
  X,
  Play,
  Book,
  Target,
  Users,
  Flame,
  Star
} from 'lucide-react';
import { 
  psychicDefenseMethods, 
  threatTypes, 
  emergencyProtocols, 
  protectionLevels,
  getDefenseMethod,
  getThreatType,
  getMethodsByCategory,
  type PsychicDefenseMethod,
  type ThreatType
} from '@/lib/psychic-defense-data';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface UserProgress {
  completedMethods: string[];
  currentLevel: number;
  practiceStreak: number;
  lastPractice: string;
  threatAssessments: Record<string, boolean>;
}

export default function PsychicSelfDefensePage() {
  const [progress, setProgress] = useLocalStorage<UserProgress>('psychic-defense-progress', {
    completedMethods: [],
    currentLevel: 0,
    practiceStreak: 0,
    lastPractice: '',
    threatAssessments: {}
  });

  const [selectedMethod, setSelectedMethod] = useState<PsychicDefenseMethod | null>(null);
  const [selectedThreat, setSelectedThreat] = useState<ThreatType | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEmergency, setShowEmergency] = useState(false);

  const completeMethod = (methodId: string) => {
    if (!progress.completedMethods.includes(methodId)) {
      setProgress(prev => ({
        ...prev,
        completedMethods: [...prev.completedMethods, methodId],
        lastPractice: new Date().toISOString(),
        practiceStreak: prev.practiceStreak + 1
      }));
    }
  };

  const assessThreat = (threatId: string, present: boolean) => {
    setProgress(prev => ({
      ...prev,
      threatAssessments: { ...prev.threatAssessments, [threatId]: present }
    }));
  };

  const getMethodIcon = (category: string) => {
    switch (category) {
      case 'protection': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'clearing': return <Flame className="w-5 h-5 text-purple-400" />;
      case 'detection': return <Eye className="w-5 h-5 text-yellow-400" />;
      case 'emergency': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Star className="w-5 h-5 text-cosmic-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'border-green-400/40 text-green-400';
      case 'intermediate': return 'border-yellow-400/40 text-yellow-400';
      case 'advanced': return 'border-red-400/40 text-red-400';
      default: return 'border-cosmic-400/40 text-cosmic-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-green-400/40 text-green-400 bg-green-400/10';
      case 'medium': return 'border-yellow-400/40 text-yellow-400 bg-yellow-400/10';
      case 'high': return 'border-orange-400/40 text-orange-400 bg-orange-400/10';
      case 'critical': return 'border-red-400/40 text-red-400 bg-red-400/10';
      default: return 'border-cosmic-400/40 text-cosmic-400 bg-cosmic-400/10';
    }
  };

  const overallProgress = (progress.completedMethods.length / psychicDefenseMethods.length) * 100;

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
            Psychic Self Defense
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-200 max-w-4xl mx-auto leading-relaxed">
            Comprehensive spiritual protection techniques and practices for maintaining energetic sovereignty 
            in the face of psychic attacks, entity interference, and negative alien agenda manipulation.
          </p>
          
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sacred-gold">{progress.completedMethods.length}</div>
              <div className="text-cosmic-300 text-sm">Methods Learned</div>
            </div>
            <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
              <Flame className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sacred-gold">{progress.practiceStreak}</div>
              <div className="text-cosmic-300 text-sm">Practice Streak</div>
            </div>
            <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sacred-gold">{Math.round(overallProgress)}%</div>
              <div className="text-cosmic-300 text-sm">Progress</div>
            </div>
            <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sacred-gold">{Object.values(progress.threatAssessments).filter(Boolean).length}</div>
              <div className="text-cosmic-300 text-sm">Active Threats</div>
            </div>
          </div>

          {/* Emergency Button */}
          <div className="mt-8">
            <Button
              onClick={() => setShowEmergency(true)}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white border-red-500"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Emergency Protection Protocol
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Protocol Modal */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="sacred-card max-w-2xl w-full border-red-500/40">
            <CardHeader>
              <CardTitle className="text-xl font-sacred text-red-400 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3" />
                Emergency Protection Protocol
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEmergency(false)}
                  className="ml-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {emergencyProtocols.map((protocol, index) => (
                <div key={index} className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                  <h3 className="text-lg font-medium text-white mb-3">{protocol.situation}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-red-400 mb-2">Immediate Actions:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-cosmic-100 text-sm">
                        {protocol.immediateActions.map((action, actionIndex) => (
                          <li key={actionIndex}>{action}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-yellow-400 mb-2">Follow-up Actions:</h4>
                      <ul className="list-disc list-inside space-y-1 text-cosmic-100 text-sm">
                        {protocol.followUp.map((action, actionIndex) => (
                          <li key={actionIndex}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-cosmic-700/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="methods">Defense Methods</TabsTrigger>
              <TabsTrigger value="threats">Threat Assessment</TabsTrigger>
              <TabsTrigger value="training">Training Program</TabsTrigger>
              <TabsTrigger value="reference">Quick Reference</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="space-y-8">
                {/* Introduction */}
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Understanding Psychic Self Defense
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-cosmic-200 leading-relaxed">
                      Psychic Self Defense is the practice of protecting your energy field, consciousness, and spiritual 
                      sovereignty from various forms of interference, attack, and manipulation. In the current planetary 
                      ascension cycle, these skills are essential for maintaining spiritual clarity and personal empowerment.
                    </p>
                    
                    <Alert className="border-yellow-400/40 bg-yellow-400/10">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertDescription className="text-cosmic-100">
                        <strong>Important:</strong> These techniques are based on Energetic Synthesis teachings and require 
                        discernment, practice, and spiritual maturity to use effectively.
                      </AlertDescription>
                    </Alert>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="p-4 rounded-lg border border-cosmic-700">
                        <h4 className="font-medium text-white mb-3 flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-blue-400" />
                          Core Principles
                        </h4>
                        <ul className="text-cosmic-300 text-sm space-y-1">
                          <li>• Spiritual sovereignty through GSF principles</li>
                          <li>• 12D Shield as primary protection</li>
                          <li>• Guardian Host connection for support</li>
                          <li>• Energy field maintenance and clearing</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-lg border border-cosmic-700">
                        <h4 className="font-medium text-white mb-3 flex items-center">
                          <Eye className="w-4 h-4 mr-2 text-yellow-400" />
                          Common Threats
                        </h4>
                        <ul className="text-cosmic-300 text-sm space-y-1">
                          <li>• Entity attachments and possession</li>
                          <li>• Psychic attacks and energy vampirism</li>
                          <li>• NAA interference and mind control</li>
                          <li>• Environmental energy toxins</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Protection Levels */}
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Protection Levels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {protectionLevels.map((level, index) => (
                        <div key={index} className="p-4 rounded-lg border border-cosmic-700 hover:border-sacred-gold/40 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white">{level.level}</h4>
                            <Badge variant="outline" className={index === progress.currentLevel ? 'border-sacred-gold text-sacred-gold' : 'border-cosmic-600 text-cosmic-400'}>
                              {index === progress.currentLevel ? 'Current' : 'Available'}
                            </Badge>
                          </div>
                          <p className="text-cosmic-300 text-sm mb-3">{level.effectiveness}</p>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-cosmic-400">Practices:</span>
                              <ul className="text-cosmic-200 mt-1">
                                {level.practices.map((practice, practiceIndex) => (
                                  <li key={practiceIndex}>• {practice}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="text-cosmic-400">Time Commitment:</span>
                              <p className="text-cosmic-200 mt-1">{level.timeCommitment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Defense Methods Tab */}
            <TabsContent value="methods">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {psychicDefenseMethods.map((method) => (
                    <Card key={method.id} className="sacred-card hover:border-sacred-gold/40 transition-colors cursor-pointer" onClick={() => setSelectedMethod(method)}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          {getMethodIcon(method.category)}
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getDifficultyColor(method.difficulty)}>
                              {method.difficulty}
                            </Badge>
                            {progress.completedMethods.includes(method.id) && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                        </div>
                        
                        <h3 className="font-medium text-white mb-2">{method.name}</h3>
                        <p className="text-cosmic-300 text-sm mb-4 leading-relaxed">{method.description}</p>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-cosmic-400">Effectiveness:</span>
                            <span className="text-sacred-gold">{method.effectiveness}%</span>
                          </div>
                          <Progress value={method.effectiveness} className="h-1" />
                          
                          <div className="flex justify-between">
                            <span className="text-cosmic-400">Duration:</span>
                            <span className="text-cosmic-200">{method.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Method Detail Modal */}
                {selectedMethod && (
                  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="sacred-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <CardHeader>
                        <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center justify-between">
                          <span className="flex items-center">
                            {getMethodIcon(selectedMethod.category)}
                            <span className="ml-3">{selectedMethod.name}</span>
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedMethod(null)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline" className={getDifficultyColor(selectedMethod.difficulty)}>
                            {selectedMethod.difficulty}
                          </Badge>
                          <Badge variant="outline" className="border-cosmic-600 text-cosmic-400">
                            {selectedMethod.category}
                          </Badge>
                          <div className="flex items-center text-sm text-cosmic-300">
                            <Clock className="w-4 h-4 mr-1" />
                            {selectedMethod.duration}
                          </div>
                        </div>

                        <p className="text-cosmic-100 leading-relaxed">{selectedMethod.description}</p>

                        <div className="p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
                          <h4 className="font-medium text-white mb-3 flex items-center">
                            <Book className="w-4 h-4 mr-2" />
                            Technique
                          </h4>
                          <p className="text-cosmic-100 text-sm leading-relaxed font-mono bg-cosmic-900/50 p-3 rounded border">
                            {selectedMethod.technique}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-white mb-2">Best Used For:</h4>
                            <ul className="text-cosmic-300 text-sm space-y-1">
                              {selectedMethod.situations.map((situation, index) => (
                                <li key={index}>• {situation}</li>
                              ))}
                            </ul>
                          </div>
                          
                          {selectedMethod.warnings && (
                            <div>
                              <h4 className="font-medium text-yellow-400 mb-2">Warnings:</h4>
                              <ul className="text-cosmic-300 text-sm space-y-1">
                                {selectedMethod.warnings.map((warning, index) => (
                                  <li key={index}>• {warning}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-cosmic-700">
                          <div className="flex items-center">
                            <span className="text-cosmic-400 text-sm mr-2">Frequency:</span>
                            <span className="text-cosmic-200 text-sm">{selectedMethod.frequency}</span>
                          </div>
                          <Button
                            onClick={() => completeMethod(selectedMethod.id)}
                            disabled={progress.completedMethods.includes(selectedMethod.id)}
                            className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
                          >
                            {progress.completedMethods.includes(selectedMethod.id) ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Completed
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Practice Now
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Threat Assessment Tab */}
            <TabsContent value="threats">
              <div className="space-y-6">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Threat Assessment & Recognition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-100 mb-6 leading-relaxed">
                      Understanding different types of psychic and energetic threats is crucial for effective defense. 
                      Use this assessment to identify potential issues in your energy field.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {threatTypes.map((threat) => (
                    <Card key={threat.id} className="sacred-card hover:border-sacred-gold/40 transition-colors cursor-pointer" onClick={() => setSelectedThreat(threat)}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-white">{threat.name}</h3>
                          <Badge className={getSeverityColor(threat.severity)}>
                            {threat.severity}
                          </Badge>
                        </div>
                        
                        <p className="text-cosmic-300 text-sm mb-4 leading-relaxed">{threat.description}</p>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-cosmic-200">Common Symptoms:</h4>
                          <ul className="text-cosmic-300 text-xs space-y-1">
                            {threat.symptoms.slice(0, 3).map((symptom, index) => (
                              <li key={index}>• {symptom}</li>
                            ))}
                            {threat.symptoms.length > 3 && (
                              <li className="text-cosmic-400">... and {threat.symptoms.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-xs text-cosmic-400">
                            {threat.defenses.length} defense methods available
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              assessThreat(threat.id, !progress.threatAssessments[threat.id]);
                            }}
                            className={`text-xs ${progress.threatAssessments[threat.id] ? 'border-red-400 text-red-400' : 'border-cosmic-600'}`}
                          >
                            {progress.threatAssessments[threat.id] ? 'Present' : 'Not Present'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Threat Detail Modal */}
                {selectedThreat && (
                  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="sacred-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <CardHeader>
                        <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center justify-between">
                          <span>{selectedThreat.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedThreat(null)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <Badge className={getSeverityColor(selectedThreat.severity)}>
                            {selectedThreat.severity} severity
                          </Badge>
                          <Badge variant="outline" className="border-cosmic-600 text-cosmic-400">
                            {selectedThreat.category}
                          </Badge>
                        </div>

                        <p className="text-cosmic-100 leading-relaxed">{selectedThreat.description}</p>

                        <div>
                          <h4 className="font-medium text-white mb-3">All Symptoms to Watch For:</h4>
                          <ul className="text-cosmic-300 text-sm space-y-2 grid md:grid-cols-2 gap-x-4">
                            {selectedThreat.symptoms.map((symptom, index) => (
                              <li key={index} className="flex items-start">
                                <AlertTriangle className="w-3 h-3 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-white mb-3">Recommended Defense Methods:</h4>
                          <div className="space-y-2">
                            {selectedThreat.defenses.map((defenseId) => {
                              const method = getDefenseMethod(defenseId);
                              return method ? (
                                <div key={defenseId} className="flex items-center justify-between p-3 rounded-lg border border-cosmic-700">
                                  <div className="flex items-center">
                                    {getMethodIcon(method.category)}
                                    <span className="ml-3 text-white">{method.name}</span>
                                  </div>
                                  <Badge variant="outline" className={getDifficultyColor(method.difficulty)}>
                                    {method.difficulty}
                                  </Badge>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-cosmic-700">
                          <span className="text-cosmic-400 text-sm">Is this threat present in your experience?</span>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => assessThreat(selectedThreat.id, false)}
                              className={`${!progress.threatAssessments[selectedThreat.id] ? 'border-green-400 text-green-400' : 'border-cosmic-600'}`}
                            >
                              No
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => assessThreat(selectedThreat.id, true)}
                              className={`${progress.threatAssessments[selectedThreat.id] ? 'border-red-400 text-red-400' : 'border-cosmic-600'}`}
                            >
                              Yes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Training Program Tab */}
            <TabsContent value="training">
              <div className="space-y-6">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-sacred text-sacred-gold">
                      Progressive Training Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-100 mb-6 leading-relaxed">
                      Follow this structured approach to develop your psychic self-defense skills systematically.
                    </p>
                    
                    <div className="space-y-6">
                      {['Beginner', 'Intermediate', 'Advanced'].map((level, levelIndex) => {
                        const methodsForLevel = psychicDefenseMethods.filter(method => 
                          method.difficulty === level.toLowerCase()
                        );
                        const completedInLevel = methodsForLevel.filter(method => 
                          progress.completedMethods.includes(method.id)
                        ).length;
                        const progressInLevel = (completedInLevel / methodsForLevel.length) * 100;

                        return (
                          <div key={level} className="p-4 rounded-lg border border-cosmic-700">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-medium text-white">{level} Level</h3>
                              <Badge variant="outline" className={getDifficultyColor(level.toLowerCase())}>
                                {completedInLevel}/{methodsForLevel.length} Complete
                              </Badge>
                            </div>
                            
                            <Progress value={progressInLevel} className="mb-4 h-2" />
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              {methodsForLevel.map((method) => (
                                <div key={method.id} className="flex items-center justify-between p-3 rounded-lg bg-cosmic-800/30">
                                  <div className="flex items-center">
                                    {getMethodIcon(method.category)}
                                    <span className="ml-3 text-cosmic-100">{method.name}</span>
                                  </div>
                                  {progress.completedMethods.includes(method.id) ? (
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedMethod(method)}
                                      className="text-xs"
                                    >
                                      Learn
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Quick Reference Tab */}
            <TabsContent value="reference">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Quick Defense Methods */}
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-sacred-gold">
                        Quick Defense Methods
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getMethodsByCategory('emergency').concat(getMethodsByCategory('protection')).slice(0, 4).map((method) => (
                          <div key={method.id} className="p-3 rounded-lg border border-cosmic-700">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-white text-sm">{method.name}</h4>
                              <span className="text-xs text-cosmic-400">{method.duration}</span>
                            </div>
                            <p className="text-cosmic-300 text-xs leading-relaxed">{method.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Warning Signs */}
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-red-400">
                        Warning Signs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          'Sudden unexplained fatigue or energy drain',
                          'Intrusive thoughts that don\'t feel like your own',
                          'Feeling watched or monitored',
                          'Technology malfunctions around you',
                          'Sudden personality or mood changes',
                          'Sleep disturbances or vivid nightmares',
                          'Feeling like someone else is in your body'
                        ].map((sign, index) => (
                          <div key={index} className="flex items-start p-2 rounded border border-red-500/20 bg-red-500/5">
                            <AlertTriangle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-cosmic-100 text-xs">{sign}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Daily Practice Schedule */}
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-sacred text-sacred-gold">
                      Daily Practice Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-4 rounded-lg border border-cosmic-700">
                        <h4 className="font-medium text-green-400 mb-3">Morning (5 minutes)</h4>
                        <ul className="text-cosmic-300 text-sm space-y-1">
                          <li>• 12D Shield activation</li>
                          <li>• GSF decree</li>
                          <li>• Boundary check</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-cosmic-700">
                        <h4 className="font-medium text-yellow-400 mb-3">Midday (2 minutes)</h4>
                        <ul className="text-cosmic-300 text-sm space-y-1">
                          <li>• Boundary test</li>
                          <li>• Shield reinforcement</li>
                          <li>• Quick clearing if needed</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg border border-cosmic-700">
                        <h4 className="font-medium text-purple-400 mb-3">Evening (10 minutes)</h4>
                        <ul className="text-cosmic-300 text-sm space-y-1">
                          <li>• Energy field clearing</li>
                          <li>• Space clearing</li>
                          <li>• Gratitude & protection renewal</li>
                        </ul>
                      </div>
                    </div>
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