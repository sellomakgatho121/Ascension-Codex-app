// Comprehensive Concept Page Component
// Displays in-depth information for any ES concept with complete coverage

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  History, 
  Cog, 
  Lightbulb, 
  AlertTriangle,
  Eye,
  Link2,
  Shield,
  TrendingUp,
  CheckCircle,
  HelpCircle,
  Target
} from 'lucide-react';
import { type ComprehensiveESConcept } from '@/lib/comprehensive-es-knowledge';

interface ComprehensiveConceptPageProps {
  concept: ComprehensiveESConcept;
  userProgress?: {
    studyComplete: boolean;
    practiceLevel: number;
    masteryStage: number;
    keyIndicatorsAchieved: number;
  };
  onProgressUpdate?: (progress: any) => void;
}

export function ComprehensiveConceptPage({ 
  concept, 
  userProgress = {
    studyComplete: false,
    practiceLevel: 0,
    masteryStage: 0,
    keyIndicatorsAchieved: 0
  },
  onProgressUpdate 
}: ComprehensiveConceptPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [studyProgress, setStudyProgress] = useState(userProgress);

  const categoryColors = {
    ascension: 'bg-sacred-gold/20 text-sacred-gold border-sacred-gold/30',
    consciousness: 'bg-cosmic-blue/20 text-cosmic-blue border-cosmic-blue/30',
    anatomy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    protection: 'bg-red-500/20 text-red-400 border-red-500/30',
    timeline: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    planetary: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    galactic: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
  };

  const tabSections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'detailed', label: 'Detailed Explanation', icon: Eye },
    { id: 'history', label: 'Historical Context', icon: History },
    { id: 'mechanics', label: 'Mechanics & Process', icon: Cog },
    { id: 'practical', label: 'Practical Application', icon: Target },
    { id: 'advanced', label: 'Advanced Insights', icon: Lightbulb },
    { id: 'safety', label: 'Safety & Warnings', icon: AlertTriangle },
    { id: 'related', label: 'Related Phenomena', icon: Link2 },
    { id: 'progression', label: 'Progression Stages', icon: TrendingUp },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: HelpCircle }
  ];

  const handleProgressUpdate = (field: keyof typeof studyProgress, value: any) => {
    const newProgress = { ...studyProgress, [field]: value };
    setStudyProgress(newProgress);
    onProgressUpdate?.(newProgress);
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-cosmic-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-cosmic-800 to-cosmic-900 border-b border-cosmic-700">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-sacred text-sacred-gold mb-2">
                {concept.term}
              </h1>
              <Badge className={categoryColors[concept.category] || categoryColors.consciousness}>
                {concept.category.charAt(0).toUpperCase() + concept.category.slice(1)}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm text-cosmic-400 mb-2">Study Progress</div>
              <Progress 
                value={(studyProgress.masteryStage / concept.progressionStages.length) * 100} 
                className="w-32 h-2 mb-2"
              />
              <div className="text-xs text-cosmic-500">
                Stage {studyProgress.masteryStage + 1} of {concept.progressionStages.length}
              </div>
            </div>
          </div>

          <p className="text-lg text-cosmic-300 leading-relaxed mb-4">
            {concept.definition}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {concept.relatedTerms.map((term, index) => (
              <Badge key={index} variant="outline" className="border-cosmic-600 text-cosmic-300">
                {term}
              </Badge>
            ))}
          </div>

          <div className="text-sm text-cosmic-500">
            Source: {concept.source}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <div className="bg-cosmic-800 rounded-lg p-4">
            <TabsList className="grid grid-cols-5 gap-2 bg-transparent">
              {tabSections.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 data-[state=active]:bg-sacred-gold data-[state=active]:text-cosmic-900"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <TabsContent value="overview" className="mt-0">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Overview & Definition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-cosmic-300 leading-relaxed text-lg">
                        {concept.definition}
                      </p>
                    </div>
                    
                    <Separator className="bg-cosmic-700" />
                    
                    <div>
                      <h4 className="font-semibold text-sacred-gold mb-3">Primary Applications</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {concept.applications.map((app, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-cosmic-800 rounded">
                            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-cosmic-300 text-sm">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleProgressUpdate('studyComplete', true)}
                      disabled={studyProgress.studyComplete}
                      className="w-full bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
                    >
                      {studyProgress.studyComplete ? 'Overview Studied ✓' : 'Mark Overview as Studied'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="detailed" className="mt-0">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Detailed Explanation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="prose prose-invert max-w-none">
                        <div className="text-cosmic-300 leading-relaxed space-y-4">
                          {concept.detailedExplanation.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center gap-2">
                      <History className="w-5 h-5" />
                      Historical Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="prose prose-invert max-w-none">
                        <div className="text-cosmic-300 leading-relaxed space-y-4">
                          {concept.historicalContext.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mechanics" className="mt-0">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center gap-2">
                      <Cog className="w-5 h-5" />
                      Mechanics & Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="prose prose-invert max-w-none">
                        <div className="text-cosmic-300 leading-relaxed space-y-4">
                          {concept.mechanicsAndProcess.split('\n\n').map((paragraph, index) => (
                            <div key={index}>
                              {paragraph.includes('**') ? (
                                <div className="space-y-2">
                                  {paragraph.split('**').map((part, partIndex) => (
                                    partIndex % 2 === 1 ? (
                                      <strong key={partIndex} className="text-sacred-gold">{part}</strong>
                                    ) : (
                                      <span key={partIndex}>{part}</span>
                                    )
                                  ))}
                                </div>
                              ) : (
                                <p>{paragraph}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="practical" className="mt-0">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Practical Application
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="prose prose-invert max-w-none">
                        <div className="text-cosmic-300 leading-relaxed space-y-4">
                          {concept.practicalApplication.split('\n\n').map((paragraph, index) => (
                            <div key={index}>
                              {paragraph.includes('**') ? (
                                <div className="space-y-2">
                                  {paragraph.split('**').map((part, partIndex) => (
                                    partIndex % 2 === 1 ? (
                                      <strong key={partIndex} className="text-sacred-gold">{part}</strong>
                                    ) : (
                                      <span key={partIndex}>{part}</span>
                                    )
                                  ))}
                                </div>
                              ) : (
                                <p>{paragraph}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="mt-0">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Advanced Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="prose prose-invert max-w-none">
                        <div className="text-cosmic-300 leading-relaxed space-y-4">
                          {concept.advancedInsights.split('\n\n').map((paragraph, index) => (
                            <div key={index}>
                              {paragraph.includes('**') ? (
                                <div className="space-y-2">
                                  {paragraph.split('**').map((part, partIndex) => (
                                    partIndex % 2 === 1 ? (
                                      <strong key={partIndex} className="text-sacred-gold">{part}</strong>
                                    ) : (
                                      <span key={partIndex}>{part}</span>
                                    )
                                  ))}
                                </div>
                              ) : (
                                <p>{paragraph}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="safety" className="mt-0">
                <Card className="sacred-card border-amber-500/30">
                  <CardHeader>
                    <CardTitle className="text-amber-400 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Safety & Warnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="prose prose-invert max-w-none">
                        <div className="text-cosmic-300 leading-relaxed space-y-4">
                          {concept.warningsSafety.split('\n\n').map((paragraph, index) => (
                            <div key={index} className="p-3 bg-amber-500/10 border border-amber-500/20 rounded">
                              {paragraph.includes('**') ? (
                                <div className="space-y-2">
                                  {paragraph.split('**').map((part, partIndex) => (
                                    partIndex % 2 === 1 ? (
                                      <strong key={partIndex} className="text-amber-400">{part}</strong>
                                    ) : (
                                      <span key={partIndex}>{part}</span>
                                    )
                                  ))}
                                </div>
                              ) : (
                                <p>{paragraph}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="mt-0">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center gap-2">
                      <Link2 className="w-5 h-5" />
                      Related Phenomena
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="prose prose-invert max-w-none">
                        <div className="text-cosmic-300 leading-relaxed space-y-4">
                          {concept.relatedPhenomena.split('\n\n').map((paragraph, index) => (
                            <div key={index}>
                              {paragraph.includes('**') ? (
                                <div className="space-y-2">
                                  {paragraph.split('**').map((part, partIndex) => (
                                    partIndex % 2 === 1 ? (
                                      <strong key={partIndex} className="text-sacred-gold">{part}</strong>
                                    ) : (
                                      <span key={partIndex}>{part}</span>
                                    )
                                  ))}
                                </div>
                              ) : (
                                <p>{paragraph}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progression" className="mt-0">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Progression Stages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {concept.progressionStages.map((stage, index) => (
                        <div 
                          key={index}
                          className={`p-4 rounded-lg border ${
                            index <= studyProgress.masteryStage 
                              ? 'bg-emerald-500/20 border-emerald-500/30' 
                              : 'bg-cosmic-800 border-cosmic-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index <= studyProgress.masteryStage
                                  ? 'bg-emerald-500 text-cosmic-900'
                                  : 'bg-cosmic-700 text-cosmic-300'
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className={`font-semibold ${
                                index <= studyProgress.masteryStage 
                                  ? 'text-emerald-400' 
                                  : 'text-cosmic-300'
                              }`}>
                                {stage}
                              </div>
                            </div>
                            {index <= studyProgress.masteryStage && (
                              <CheckCircle className="w-5 h-5 text-emerald-400" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="troubleshooting" className="mt-0">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center gap-2">
                      <HelpCircle className="w-5 h-5" />
                      Troubleshooting & Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-cosmic-blue mb-3">Common Challenges & Solutions</h4>
                          <div className="prose prose-invert max-w-none">
                            <div className="text-cosmic-300 leading-relaxed space-y-4">
                              {concept.troubleshooting.split('\n\n').map((paragraph, index) => (
                                <div key={index}>
                                  {paragraph.includes('**') ? (
                                    <div className="space-y-2">
                                      {paragraph.split('**').map((part, partIndex) => (
                                        partIndex % 2 === 1 ? (
                                          <strong key={partIndex} className="text-cosmic-blue">{part}</strong>
                                        ) : (
                                          <span key={partIndex}>{part}</span>
                                        )
                                      ))}
                                    </div>
                                  ) : (
                                    <p>{paragraph}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <Separator className="bg-cosmic-700" />

                        <div>
                          <h4 className="font-semibold text-emerald-400 mb-3">Integration Tips</h4>
                          <div className="prose prose-invert max-w-none">
                            <div className="text-cosmic-300 leading-relaxed space-y-4">
                              {concept.integrationTips.split('\n\n').map((paragraph, index) => (
                                <div key={index}>
                                  {paragraph.includes('**') ? (
                                    <div className="space-y-2">
                                      {paragraph.split('**').map((part, partIndex) => (
                                        partIndex % 2 === 1 ? (
                                          <strong key={partIndex} className="text-emerald-400">{part}</strong>
                                        ) : (
                                          <span key={partIndex}>{part}</span>
                                        )
                                      ))}
                                    </div>
                                  ) : (
                                    <p>{paragraph}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Tracking */}
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="text-sacred-gold text-lg">
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-cosmic-300">Mastery Stage</span>
                      <span className="text-sacred-gold">
                        {studyProgress.masteryStage + 1}/{concept.progressionStages.length}
                      </span>
                    </div>
                    <Progress 
                      value={(studyProgress.masteryStage / concept.progressionStages.length) * 100}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-cosmic-300">Key Indicators</span>
                      <span className="text-emerald-400">
                        {studyProgress.keyIndicatorsAchieved}/{concept.keyIndicators.length}
                      </span>
                    </div>
                    <Progress 
                      value={(studyProgress.keyIndicatorsAchieved / concept.keyIndicators.length) * 100}
                      className="h-2"
                    />
                  </div>

                  <Button 
                    onClick={() => handleProgressUpdate('masteryStage', Math.min(studyProgress.masteryStage + 1, concept.progressionStages.length - 1))}
                    disabled={studyProgress.masteryStage >= concept.progressionStages.length - 1}
                    className="w-full bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
                    size="sm"
                  >
                    Advance to Next Stage
                  </Button>
                </CardContent>
              </Card>

              {/* Key Indicators Checklist */}
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="text-sacred-gold text-lg">
                    Key Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {concept.keyIndicators.map((indicator, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-2 p-2 rounded hover:bg-cosmic-800 cursor-pointer"
                          onClick={() => {
                            const newCount = studyProgress.keyIndicatorsAchieved > index 
                              ? index 
                              : index + 1;
                            handleProgressUpdate('keyIndicatorsAchieved', newCount);
                          }}
                        >
                          <CheckCircle 
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              index < studyProgress.keyIndicatorsAchieved 
                                ? 'text-emerald-400' 
                                : 'text-cosmic-600'
                            }`}
                          />
                          <span className={`text-sm ${
                            index < studyProgress.keyIndicatorsAchieved 
                              ? 'text-emerald-300' 
                              : 'text-cosmic-400'
                          }`}>
                            {indicator}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Common Misunderstandings */}
              <Card className="sacred-card border-amber-500/30">
                <CardHeader>
                  <CardTitle className="text-amber-400 text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Avoid These Mistakes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-sm text-cosmic-300 leading-relaxed space-y-3">
                        {concept.commonMisunderstandings.split('\n\n').slice(0, 3).map((mistake, index) => (
                          <div key={index} className="p-2 bg-amber-500/10 border border-amber-500/20 rounded">
                            {mistake.includes('**') ? (
                              <div>
                                {mistake.split('**').map((part, partIndex) => (
                                  partIndex % 2 === 1 ? (
                                    <strong key={partIndex} className="text-amber-400">{part}</strong>
                                  ) : (
                                    <span key={partIndex}>{part}</span>
                                  )
                                ))}
                              </div>
                            ) : (
                              <p className="mb-0">{mistake}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}