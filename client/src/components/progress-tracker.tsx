import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Atom, Layers, TreePine, TrendingUp, CheckCircle, Clock, Circle } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { SpiritualAssessment } from "./spiritual-assessment";

interface ProgressTrackerProps {
  userId: number;
}

export function ProgressTracker({ userId }: ProgressTrackerProps) {
  const queryClient = useQueryClient();
  const [showAssessment, setShowAssessment] = useState(false);

  const { data: progress, isLoading } = useQuery<UserProgress>({
    queryKey: ["/api/progress", userId],
    enabled: !!userId,
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (progressData: Partial<UserProgress>) => {
      const response = await apiRequest("PUT", `/api/progress/${userId}`, progressData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", userId] });
    },
  });

  const chakraProgress = progress?.chakraProgress || { physicalChakras: [], morphogeneticChakras: [], completedChakras: [] };
  const lightbodyProgress = progress?.lightbodyProgress || { activatedLayers: [], integrationLevel: 0 };
  const gridProgress = progress?.gridProgress || { activatedSpheres: [], shieldIntegration: [] };

  const physicalChakrasProgress = (chakraProgress.physicalChakras.length / 7) * 100;
  const morphogeneticChakrasProgress = (chakraProgress.morphogeneticChakras.length / 8) * 100;
  const lightbodyIntegrationProgress = lightbodyProgress.integrationLevel;
  const gridActivationProgress = (gridProgress.activatedSpheres.length / 12) * 100;

  const lightbodyLayers = [
    { id: "etheric", name: "Etheric Body" },
    { id: "emotional", name: "Emotional Body" },
    { id: "mental", name: "Mental Body" },
    { id: "astral", name: "Astral Body" },
    { id: "etheric_template", name: "Etheric Template" },
    { id: "celestial", name: "Celestial Body" },
    { id: "ketheric", name: "Ketheric Body" }
  ];

  const getLayerStatus = (layerId: string) => {
    if (lightbodyProgress.activatedLayers.includes(layerId)) return "complete";
    if (lightbodyProgress.activatedLayers.length > lightbodyLayers.findIndex(l => l.id === layerId)) return "progress";
    return "pending";
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Circle className="w-4 h-4 text-cosmic-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="sacred-card animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-cosmic-700/50 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-cosmic-700/50 rounded w-3/4"></div>
                <div className="h-4 bg-cosmic-700/50 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <AnimatePresence>
        {showAssessment && (
          <SpiritualAssessment
            onClose={() => setShowAssessment(false)}
            onComplete={(results) => {
              // Update progress based on assessment results
              // This is a simplified logic - in a real app these would be more granular
              const newChakras = results.chakraScore > 70 ? [...chakraProgress.physicalChakras, 1, 2, 3] : chakraProgress.physicalChakras;
              const newLevel = Math.floor((results.chakraScore + results.gridScore + results.lightbodyScore) / 30);

              updateProgressMutation.mutate({
                overallLevel: newLevel,
                // Simulate some progress updates based on the quiz
                lightbodyProgress: {
                  ...lightbodyProgress,
                  integrationLevel: Math.max(lightbodyProgress.integrationLevel, results.lightbodyScore)
                }
              });

              // Close happens inside the component's 'results' step usually, but we can do it here too if needed
              // The component handles its own 'results' view, so we just wait for user to close it.
            }}
          />
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Chakra Mastery */}
        <Card className="sacred-card">
          <CardHeader>
            <div className="flex items-center">
              <Atom className="text-sacred-gold text-2xl mr-3" />
              <CardTitle className="text-xl font-sacred text-sacred-gold">
                Chakra Mastery
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-cosmic-100">Physical Chakras (1-7)</span>
                <span className="text-sacred-gold font-bold">
                  {chakraProgress.physicalChakras.length}/7
                </span>
              </div>
              <Progress value={physicalChakrasProgress} className="h-2" />

              <div className="flex justify-between items-center text-sm">
                <span className="text-cosmic-100">Morphogenetic Chakras (8-15)</span>
                <span className="text-sacred-gold font-bold">
                  {chakraProgress.morphogeneticChakras.length}/8
                </span>
              </div>
              <Progress value={morphogeneticChakrasProgress} className="h-2" />
            </div>

            <div className="pt-2">
              <Badge variant="outline" className="border-sacred-gold/50 text-sacred-gold">
                Level {Math.floor((physicalChakrasProgress + morphogeneticChakrasProgress) / 20)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Lightbody Integration */}
        <Card className="sacred-card">
          <CardHeader>
            <div className="flex items-center">
              <Layers className="text-sacred-silver text-2xl mr-3" />
              <CardTitle className="text-xl font-sacred text-sacred-silver">
                Lightbody Integration
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lightbodyLayers.map((layer) => {
                const status = getLayerStatus(layer.id);
                return (
                  <div key={layer.id} className="flex items-center justify-between">
                    <span className="text-cosmic-100 text-sm">{layer.name}</span>
                    <StatusIcon status={status} />
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-cosmic-700">
              <div className="flex justify-between items-center text-sm">
                <span className="text-cosmic-100">Integration Level</span>
                <span className="text-sacred-silver font-bold">
                  {lightbodyIntegrationProgress}%
                </span>
              </div>
              <Progress value={lightbodyIntegrationProgress} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>

        {/* Grid Activation */}
        <Card className="sacred-card">
          <CardHeader>
            <div className="flex items-center">
              <TreePine className="text-sacred-gold text-2xl mr-3" />
              <CardTitle className="text-xl font-sacred text-sacred-gold">
                Grid Activation
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-sacred font-bold text-sacred-gold mb-2">
                {gridProgress.activatedSpheres.length}/12
              </div>
              <p className="text-sm text-cosmic-100">Tree Spheres Active</p>
            </div>

            <Progress value={gridActivationProgress} className="h-2" />

            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((sphereId) => (
                <div
                  key={sphereId}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${gridProgress.activatedSpheres.includes(sphereId)
                    ? 'bg-sacred-gold text-cosmic-900'
                    : 'bg-cosmic-500/30 border border-cosmic-500 text-cosmic-300'
                    }`}
                >
                  {sphereId}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-cosmic-100">Shield Integration</span>
              <span className="text-sacred-gold font-bold">
                {gridProgress.shieldIntegration.length}/5
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress Summary */}
      <Card className="cosmic-gradient rounded-2xl border border-sacred-gold/30">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
            <TrendingUp className="mr-3" />
            Spiritual Development Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-sacred font-bold text-sacred-gold mb-1">
                {progress?.overallLevel || 0}
              </div>
              <p className="text-sm text-cosmic-100">Overall Level</p>
            </div>
            <div>
              <div className="text-2xl font-sacred font-bold text-sacred-silver mb-1">
                {chakraProgress.completedChakras.length}
              </div>
              <p className="text-sm text-cosmic-100">Chakras Mastered</p>
            </div>
            <div>
              <div className="text-2xl font-sacred font-bold text-sacred-gold mb-1">
                {lightbodyProgress.activatedLayers.length}
              </div>
              <p className="text-sm text-cosmic-100">Layers Integrated</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              className="sacred-button px-8 py-3 text-lg"
              onClick={() => setShowAssessment(true)}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Complete Spiritual Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
