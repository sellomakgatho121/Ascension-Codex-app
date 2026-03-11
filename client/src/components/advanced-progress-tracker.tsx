import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Star,
  Target,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Atom,
  Layers,
  TreePine,
  Heart,
  Award,
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";
import { ProgressMetrics, progressStages, calculateCurrentStage, getProgressRecommendations } from "@/lib/progress-system";

interface AdvancedProgressTrackerProps {
  userId: number;
}

export function AdvancedProgressTracker({ userId }: AdvancedProgressTrackerProps) {
  const [metrics, setMetrics] = useState<ProgressMetrics>({
    chakraActivation: {
      physicalChakras: [1, 2, 3],
      morphogeneticChakras: [8, 9],
      integrationLevel: 45,
      lastActivation: new Date()
    },
    lightbodyDevelopment: {
      layersActivated: ["etheric", "emotional"],
      integrationStage: 2,
      frequencyLevel: 4,
      stabilityRating: 6
    },
    protectionSkills: {
      shieldActivations: 25,
      shieldDuration: 15,
      shieldStrength: 7,
      consistentPractice: true
    },
    gridWork: {
      spheresExplored: [1, 2, 3, 4, 5],
      pathworkCompleted: ["1-2", "2-3"],
      dimensionalAccess: [1, 2, 3, 4],
      gridStability: 5
    },
    meditationPractice: {
      totalSessions: 42,
      averageSessionLength: 18,
      consecutiveDays: 7,
      longestStreak: 14,
      focusQuality: 6,
      techniques: ["12D Shield", "Chakra Clearing", "Heart Opening"]
    },
    consciousnessExpansion: {
      perceptualShifts: ["Energy Sensitivity", "Intuitive Knowing"],
      intuitionLevel: 6,
      energyAwareness: 7,
      multidimensionalAwareness: 4,
      sovereigntyLevel: 5
    },
    serviceIntegration: {
      selfHealing: 6,
      serviceToOthers: 4,
      earthService: 3,
      knowledgeSharing: 5
    }
  });

  const currentStage = calculateCurrentStage(metrics);
  const currentStageData = progressStages.find(s => s.id === currentStage);
  const recommendations = getProgressRecommendations(metrics);

  const updateMetric = (category: keyof ProgressMetrics, field: string, operation: 'increment' | 'decrement' | 'toggle', value?: any) => {
    setMetrics(prev => {
      const newMetrics = { ...prev };
      const categoryData = newMetrics[category] as any;
      
      if (operation === 'increment') {
        if (Array.isArray(categoryData[field])) {
          // For arrays, add new item if not exists
          if (value && !categoryData[field].includes(value)) {
            categoryData[field] = [...categoryData[field], value];
          }
        } else {
          categoryData[field] = Math.min((categoryData[field] || 0) + 1, 10);
        }
      } else if (operation === 'decrement') {
        if (Array.isArray(categoryData[field])) {
          // For arrays, remove item
          if (value) {
            categoryData[field] = categoryData[field].filter((item: any) => item !== value);
          }
        } else {
          categoryData[field] = Math.max((categoryData[field] || 0) - 1, 0);
        }
      } else if (operation === 'toggle') {
        categoryData[field] = !categoryData[field];
      }
      
      return newMetrics;
    });
  };

  const MetricAdjuster = ({ 
    category, 
    field, 
    label, 
    value, 
    type = 'number',
    arrayType = null 
  }: { 
    category: keyof ProgressMetrics; 
    field: string; 
    label: string; 
    value: any;
    type?: 'number' | 'array' | 'boolean';
    arrayType?: 'chakra' | 'layer' | 'sphere' | null;
  }) => {
    if (type === 'boolean') {
      return (
        <div className="flex items-center justify-between p-3 bg-cosmic-800/30 rounded-lg">
          <span className="text-cosmic-100 text-sm">{label}</span>
          <Button
            size="sm"
            variant={value ? "default" : "outline"}
            onClick={() => updateMetric(category, field, 'toggle')}
            className="h-8"
          >
            {value ? "Active" : "Inactive"}
          </Button>
        </div>
      );
    }

    if (type === 'array') {
      return (
        <div className="p-3 bg-cosmic-800/30 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-cosmic-100 text-sm">{label}</span>
            <span className="text-sacred-gold font-bold">{value.length}</span>
          </div>
          {arrayType === 'chakra' && (
            <div className="flex flex-wrap gap-1">
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(chakraId => (
                <Button
                  key={chakraId}
                  size="sm"
                  variant={value.includes(chakraId) ? "default" : "outline"}
                  onClick={() => updateMetric(category, field, value.includes(chakraId) ? 'decrement' : 'increment', chakraId)}
                  className="h-6 w-8 text-xs"
                >
                  {chakraId}
                </Button>
              ))}
            </div>
          )}
          {arrayType === 'sphere' && (
            <div className="flex flex-wrap gap-1">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(sphereId => (
                <Button
                  key={sphereId}
                  size="sm"
                  variant={value.includes(sphereId) ? "default" : "outline"}
                  onClick={() => updateMetric(category, field, value.includes(sphereId) ? 'decrement' : 'increment', sphereId)}
                  className="h-6 w-8 text-xs"
                >
                  {sphereId}
                </Button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between p-3 bg-cosmic-800/30 rounded-lg">
        <span className="text-cosmic-100 text-sm">{label}</span>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateMetric(category, field, 'decrement')}
            className="h-8 w-8 p-0"
            disabled={value <= 0}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="text-sacred-gold font-bold min-w-[2rem] text-center">{value}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateMetric(category, field, 'increment')}
            className="h-8 w-8 p-0"
            disabled={value >= 10}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );
  };

  const StageProgressCard = () => (
    <Card className="sacred-card">
      <CardHeader>
        <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
          <Star className="w-6 h-6 mr-2" />
          Current Stage: {currentStageData?.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-cosmic-100 text-sm leading-relaxed">
          {currentStageData?.description}
        </p>
        
        <div className="space-y-3">
          <h4 className="text-sacred-silver font-semibold">Stage Benefits:</h4>
          <ul className="space-y-1">
            {currentStageData?.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start text-cosmic-100 text-sm">
                <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {currentStageData?.nextStages && currentStageData.nextStages.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sacred-silver font-semibold">Next Possible Stages:</h4>
            <div className="flex flex-wrap gap-2">
              {currentStageData.nextStages.map(stageId => {
                const nextStage = progressStages.find(s => s.id === stageId);
                return (
                  <Badge key={stageId} variant="outline" className="border-sacred-gold/50 text-sacred-gold">
                    {nextStage?.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sacred-silver font-semibold">Advancement Recommendations:</h4>
            <ul className="space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start text-cosmic-100 text-sm">
                  <ArrowRight className="w-3 h-3 text-sacred-gold mr-2 mt-1 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Current Stage Overview */}
      <StageProgressCard />

      {/* Detailed Metrics */}
      <Tabs defaultValue="chakras" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-cosmic-700/50">
          <TabsTrigger value="chakras">Chakras</TabsTrigger>
          <TabsTrigger value="lightbody">Lightbody</TabsTrigger>
          <TabsTrigger value="protection">Protection</TabsTrigger>
          <TabsTrigger value="consciousness">Consciousness</TabsTrigger>
        </TabsList>

        <TabsContent value="chakras" className="space-y-4">
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
                <Atom className="w-5 h-5 mr-2" />
                Chakra System Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MetricAdjuster
                category="chakraActivation"
                field="physicalChakras"
                label="Physical Chakras (1-7)"
                value={metrics.chakraActivation.physicalChakras}
                type="array"
                arrayType="chakra"
              />
              <MetricAdjuster
                category="chakraActivation"
                field="morphogeneticChakras"
                label="Morphogenetic Chakras (8-15)"
                value={metrics.chakraActivation.morphogeneticChakras}
                type="array"
                arrayType="chakra"
              />
              <MetricAdjuster
                category="chakraActivation"
                field="integrationLevel"
                label="Integration Level (%)"
                value={metrics.chakraActivation.integrationLevel}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lightbody" className="space-y-4">
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
                <Layers className="w-5 h-5 mr-2" />
                Lightbody Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MetricAdjuster
                category="lightbodyDevelopment"
                field="integrationStage"
                label="Integration Stage (1-7)"
                value={metrics.lightbodyDevelopment.integrationStage}
              />
              <MetricAdjuster
                category="lightbodyDevelopment"
                field="frequencyLevel"
                label="Frequency Level (1-10)"
                value={metrics.lightbodyDevelopment.frequencyLevel}
              />
              <MetricAdjuster
                category="lightbodyDevelopment"
                field="stabilityRating"
                label="Stability Rating (1-10)"
                value={metrics.lightbodyDevelopment.stabilityRating}
              />
              
              <div className="p-3 bg-cosmic-800/30 rounded-lg">
                <div className="text-cosmic-100 text-sm mb-2">Active Layers:</div>
                <div className="flex flex-wrap gap-2">
                  {["etheric", "emotional", "mental", "astral", "etheric_template", "celestial", "ketheric"].map(layer => (
                    <Button
                      key={layer}
                      size="sm"
                      variant={metrics.lightbodyDevelopment.layersActivated.includes(layer) ? "default" : "outline"}
                      onClick={() => updateMetric("lightbodyDevelopment", "layersActivated", 
                        metrics.lightbodyDevelopment.layersActivated.includes(layer) ? 'decrement' : 'increment', layer)}
                      className="h-7 text-xs"
                    >
                      {layer.replace('_', ' ')}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protection" className="space-y-4">
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Protection & Shield Mastery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MetricAdjuster
                category="protectionSkills"
                field="shieldActivations"
                label="Total Shield Activations"
                value={metrics.protectionSkills.shieldActivations}
              />
              <MetricAdjuster
                category="protectionSkills"
                field="shieldDuration"
                label="Average Duration (minutes)"
                value={metrics.protectionSkills.shieldDuration}
              />
              <MetricAdjuster
                category="protectionSkills"
                field="shieldStrength"
                label="Shield Strength (1-10)"
                value={metrics.protectionSkills.shieldStrength}
              />
              <MetricAdjuster
                category="protectionSkills"
                field="consistentPractice"
                label="Daily Practice Streak"
                value={metrics.protectionSkills.consistentPractice}
                type="boolean"
              />
            </CardContent>
          </Card>

          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
                <TreePine className="w-5 h-5 mr-2" />
                Grid Work & Kathara
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MetricAdjuster
                category="gridWork"
                field="spheresExplored"
                label="Spheres Explored (1-12)"
                value={metrics.gridWork.spheresExplored}
                type="array"
                arrayType="sphere"
              />
              <MetricAdjuster
                category="gridWork"
                field="gridStability"
                label="Grid Stability (1-10)"
                value={metrics.gridWork.gridStability}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consciousness" className="space-y-4">
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Consciousness Expansion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MetricAdjuster
                category="consciousnessExpansion"
                field="intuitionLevel"
                label="Intuition Level (1-10)"
                value={metrics.consciousnessExpansion.intuitionLevel}
              />
              <MetricAdjuster
                category="consciousnessExpansion"
                field="energyAwareness"
                label="Energy Awareness (1-10)"
                value={metrics.consciousnessExpansion.energyAwareness}
              />
              <MetricAdjuster
                category="consciousnessExpansion"
                field="multidimensionalAwareness"
                label="Multidimensional Awareness (1-10)"
                value={metrics.consciousnessExpansion.multidimensionalAwareness}
              />
              <MetricAdjuster
                category="consciousnessExpansion"
                field="sovereigntyLevel"
                label="Sovereignty Level (1-10)"
                value={metrics.consciousnessExpansion.sovereigntyLevel}
              />
            </CardContent>
          </Card>

          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Service Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MetricAdjuster
                category="serviceIntegration"
                field="selfHealing"
                label="Self Healing (1-10)"
                value={metrics.serviceIntegration.selfHealing}
              />
              <MetricAdjuster
                category="serviceIntegration"
                field="serviceToOthers"
                label="Service to Others (1-10)"
                value={metrics.serviceIntegration.serviceToOthers}
              />
              <MetricAdjuster
                category="serviceIntegration"
                field="earthService"
                label="Earth Service (1-10)"
                value={metrics.serviceIntegration.earthService}
              />
              <MetricAdjuster
                category="serviceIntegration"
                field="knowledgeSharing"
                label="Knowledge Sharing (1-10)"
                value={metrics.serviceIntegration.knowledgeSharing}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}