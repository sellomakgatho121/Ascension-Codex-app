import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Play, 
  Star, 
  Heart, 
  Shield, 
  TreePine,
  Target,
  BookOpen,
  Sparkles
} from "lucide-react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  icon: React.ReactNode;
  action?: {
    label: string;
    path: string;
  };
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const tourSteps: TourStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Ascension Codex',
      description: 'This interactive platform guides you through consciousness evolution based on Lisa Renee\'s Energetic Synthesis teachings. Let me show you around.',
      position: 'center',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      id: 'chakra-system',
      title: '15-Chakra System',
      description: 'Explore the complete chakra system including 7 physical and 8 morphogenetic chakras. Each chakra has detailed information and practices.',
      position: 'center',
      icon: <Heart className="w-6 h-6" />,
      action: {
        label: 'Explore Chakras',
        path: '/chakras'
      }
    },
    {
      id: 'lightbody',
      title: 'Lightbody Layers',
      description: 'Discover the 7 electromagnetic frequency layers that form your lightbody. These are essential for consciousness expansion.',
      position: 'center',
      icon: <Star className="w-6 h-6" />,
      action: {
        label: 'View Lightbody',
        path: '/lightbody'
      }
    },
    {
      id: 'protection',
      title: 'Hova Bodies & Protection',
      description: 'Learn about the 5 horizontal triad bodies that form your protective auric field shields for spiritual safety.',
      position: 'center',
      icon: <Shield className="w-6 h-6" />,
      action: {
        label: 'Study Protection',
        path: '/hova-bodies'
      }
    },
    {
      id: 'tree-grid',
      title: '12-Tree Grid',
      description: 'Master the Kathara Grid - the primary holographic template for multidimensional consciousness navigation.',
      position: 'center',
      icon: <TreePine className="w-6 h-6" />,
      action: {
        label: 'Explore Grid',
        path: '/tree-grid'
      }
    },
    {
      id: 'meditation',
      title: 'Meditation & Practices',
      description: 'Access guided meditations, timers, and animated technique tutorials for spiritual development.',
      position: 'center',
      icon: <Play className="w-6 h-6" />,
      action: {
        label: 'Start Meditating',
        path: '/meditation'
      }
    },
    {
      id: 'soul-codex',
      title: 'Soul Codex - Advanced Teachings',
      description: 'Dive into advanced concepts like RA Center activation, timeline navigation, and plasma consciousness.',
      position: 'center',
      icon: <BookOpen className="w-6 h-6" />,
      action: {
        label: 'Advanced Studies',
        path: '/soul-codex'
      }
    },
    {
      id: 'progress',
      title: 'Track Your Journey',
      description: 'Monitor your spiritual development across all systems with detailed progress tracking and insights.',
      position: 'center',
      icon: <Target className="w-6 h-6" />,
      action: {
        label: 'View Progress',
        path: '/progress'
      }
    },
    {
      id: 'search',
      title: 'Global Search',
      description: 'Use the search feature (Ctrl+K or Cmd+K) to quickly find any spiritual concept, practice, or teaching.',
      position: 'center',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: 'complete',
      title: 'Your Spiritual Journey Begins',
      description: 'You\'re ready to begin your consciousness evolution journey. Remember, consistency in practice is key to spiritual development.',
      position: 'center',
      icon: <Star className="w-6 h-6" />
    }
  ];

  const currentTourStep = tourSteps[currentStep] as TourStep | undefined;

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete();
      onClose();
    }, 1500);
  };

  const skipTour = () => {
    onClose();
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleAction = () => {
    if (currentTourStep?.action) {
      window.location.href = currentTourStep.action.path;
      onClose();
    }
  };

  if (!isOpen || !currentTourStep) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#0a0a0a] border border-neutral-800" aria-describedby="onboarding-description">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39ff14]/50 to-transparent" />
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-anti-display text-[#39ff14] uppercase tracking-wider flex items-center">
              {currentTourStep.icon}
              <span className="ml-3">Guided Tour</span>
            </DialogTitle>
            <div className="sr-only">
              <p id="onboarding-description">Interactive guided tour to introduce Ascension Codex platform features</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border border-[#39ff14]/30 text-[#39ff14] font-anti-mono text-xs uppercase tracking-widest bg-[#39ff14]/5">
                {currentStep + 1} of {tourSteps.length}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={skipTour}
                className="text-neutral-500 hover:text-[#39ff14]"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center space-x-2">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-[#39ff14] w-8' 
                    : index < currentStep 
                    ? 'bg-[#39ff14]/60' 
                    : 'bg-neutral-700'
                }`}
              />
            ))}
          </div>

          <Card className="bg-[#0a0a0a] border border-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39ff14]/30 to-transparent" />
            <CardContent className="p-8 text-center">
              {isCompleted ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-sm bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center">
                    <Star className="w-8 h-8 text-[#39ff14] animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-anti-display text-[#39ff14] uppercase tracking-wider">Welcome to Your Journey!</h3>
                  <p className="text-[#e8e8e8] font-anti-mono text-sm">
                    You're ready to begin exploring consciousness evolution through Ascension Codex's comprehensive teachings.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-sm bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center">
                    <div className="text-[#39ff14]">
                      {currentTourStep.icon}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-anti-mono font-bold text-[#e8e8e8] uppercase tracking-wide mb-4">
                      {currentTourStep.title}
                    </h3>
                    <p className="text-neutral-400 font-anti-mono text-sm leading-relaxed">
                      {currentTourStep.description}
                    </p>
                  </div>

                  {currentTourStep.action && (
                    <Button
                      onClick={handleAction}
                      className="bg-[#39ff14] text-black font-anti-mono font-bold uppercase tracking-wider hover:bg-[#39ff14]/80"
                    >
                      {currentTourStep.action.label}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {!isCompleted && (
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="border border-neutral-700 text-neutral-400 font-anti-mono uppercase tracking-wider hover:border-[#39ff14]/50 hover:text-[#39ff14] disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                variant="outline"
                onClick={skipTour}
                className="border border-neutral-700 text-neutral-500 font-anti-mono uppercase tracking-wider hover:border-[#39ff14]/50 hover:text-[#39ff14]"
              >
                Skip Tour
              </Button>

              <Button
                onClick={nextStep}
                className="bg-[#39ff14] text-black font-anti-mono font-bold uppercase tracking-wider hover:bg-[#39ff14]/80"
              >
                {currentStep === tourSteps.length - 1 ? 'Complete' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
