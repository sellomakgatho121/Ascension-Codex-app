import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Heart, 
  Zap, 
  Shield, 

  Play,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  actionLabel: string;
  actionUrl?: string;
  completed?: boolean;
}

interface OnboardingState {
  currentStep: number;
  completed: boolean;
  skipped: boolean;
  completedSteps: string[];
}

export function OnboardingSystem() {
  const [onboardingState, setOnboardingState] = useLocalStorage<OnboardingState>('onboarding-state', {
    currentStep: 0,
    completed: false,
    skipped: false,
    completedSteps: []
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!onboardingState.completed && !onboardingState.skipped) {
      setIsVisible(true);
    }
  }, [onboardingState]);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Ascension Codex',
      description: 'Begin your spiritual awakening journey with authentic Energetic Synthesis teachings through the Ascension Codex platform.',
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-sm bg-[#39ff14]/10 border-2 border-[#39ff14]/40 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-[#39ff14]" />
          </div>
          <p className="text-neutral-400 font-anti-mono text-sm leading-relaxed">
            This platform provides comprehensive tools and teachings to support your consciousness expansion 
            and spiritual development. Let's get you started with the essential features.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-3 bg-[#0a0a0a] border border-neutral-800">
              <Heart className="w-6 h-6 text-[#ff006e] mx-auto mb-2" />
              <p className="text-sm text-neutral-400 font-anti-mono">15-Chakra System</p>
            </div>
            <div className="p-3 bg-[#0a0a0a] border border-neutral-800">
              <Zap className="w-6 h-6 text-[#00f0ff] mx-auto mb-2" />
              <p className="text-sm text-neutral-400 font-anti-mono">Lightbody Layers</p>
            </div>
            <div className="p-3 bg-[#0a0a0a] border border-neutral-800">
              <Shield className="w-6 h-6 text-[#39ff14] mx-auto mb-2" />
              <p className="text-sm text-neutral-400 font-anti-mono">GSF Protection</p>
            </div>
            <div className="p-3 bg-[#0a0a0a] border border-neutral-800">
              <Play className="w-6 h-6 text-[#7b2dff] mx-auto mb-2" />
              <p className="text-sm text-neutral-400 font-anti-mono">Meditation Tools</p>
            </div>
          </div>
        </div>
      ),
      actionLabel: 'Start Journey'
    },
    {
      id: 'gsf',
      title: 'Foundation: GSF Principles',
      description: 'Learn the core God Sovereign Free consciousness principles for spiritual protection.',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-[#39ff14]/5 border border-[#39ff14]/20">
            <h4 className="font-anti-mono font-bold text-[#39ff14] mb-2 uppercase tracking-wide">GSF - God Sovereign Free</h4>
            <p className="text-neutral-400 font-anti-mono text-sm leading-relaxed">
              GSF represents the foundation of spiritual sovereignty. It's about maintaining your 
              connection to divine source while protecting your energy field from interference.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 border border-neutral-800">
              <div className="w-8 h-8 rounded-sm bg-[#39ff14]/10 border border-[#39ff14]/40 mx-auto mb-2 flex items-center justify-center">
                <span className="text-[#39ff14] font-anti-mono font-bold text-sm">G</span>
              </div>
              <p className="text-xs text-neutral-500 font-anti-mono">God</p>
            </div>
            <div className="p-3 border border-neutral-800">
              <div className="w-8 h-8 rounded-sm bg-[#39ff14]/10 border border-[#39ff14]/40 mx-auto mb-2 flex items-center justify-center">
                <span className="text-[#39ff14] font-anti-mono font-bold text-sm">S</span>
              </div>
              <p className="text-xs text-neutral-500 font-anti-mono">Sovereign</p>
            </div>
            <div className="p-3 border border-neutral-800">
              <div className="w-8 h-8 rounded-sm bg-[#39ff14]/10 border border-[#39ff14]/40 mx-auto mb-2 flex items-center justify-center">
                <span className="text-[#39ff14] font-anti-mono font-bold text-sm">F</span>
              </div>
              <p className="text-xs text-neutral-500 font-anti-mono">Free</p>
            </div>
          </div>
        </div>
      ),
      actionLabel: 'Explore GSF',
      actionUrl: '/gsf'
    },
    {
      id: 'protection',
      title: 'Essential Protection: 12D Shield',
      description: 'Learn to build your spiritual protection shield for safe energy work.',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-sm border-2 border-[#39ff14]/50 animate-pulse"></div>
              <div className="absolute inset-2 rounded-sm border border-[#00f0ff]/30"></div>
              <div className="absolute inset-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#39ff14]" />
              </div>
            </div>
            <h4 className="font-anti-mono font-bold text-[#e8e8e8] mb-2 uppercase tracking-wide">12-Dimensional Shield</h4>
          </div>
          <p className="text-neutral-400 font-anti-mono text-sm leading-relaxed">
            The 12D Shield is your primary spiritual protection tool. It creates a sacred container 
            around your energy field, connecting you to the 12th dimension while maintaining sovereignty.
          </p>
          <div className="p-3 bg-[#00f0ff]/5 border border-[#00f0ff]/20">
            <p className="text-[#00f0ff] font-anti-mono text-sm">
              Always activate your 12D Shield before any spiritual practice or energy work.
            </p>
          </div>
        </div>
      ),
      actionLabel: 'Learn Protection',
      actionUrl: '/tools'
    },
    {
      id: 'chakras',
      title: 'Energy Centers: 15-Chakra System',
      description: 'Understand your extended chakra system beyond the traditional 7.',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { name: 'Physical', count: '1-7', color: 'text-[#ff006e]' },
              { name: 'Morphogenetic', count: '8-15', color: 'text-[#00f0ff]' },
              { name: 'Avatar', count: '16-22', color: 'text-[#7b2dff]' }
            ].map((group, index) => (
              <div key={index} className="p-3 border border-neutral-800">
                <div className={`w-8 h-8 rounded-sm bg-current/20 border border-current mx-auto mb-2 ${group.color}`}></div>
                <p className="text-xs text-neutral-400 font-anti-mono">{group.name}</p>
                <p className="text-xs text-neutral-600 font-anti-mono">{group.count}</p>
              </div>
            ))}
          </div>
          <p className="text-neutral-400 font-anti-mono text-sm leading-relaxed">
            The 15-chakra system includes the traditional 7 physical chakras plus 8 morphogenetic 
            chakras that govern higher dimensional consciousness and spiritual evolution.
          </p>
        </div>
      ),
      actionLabel: 'Explore Chakras',
      actionUrl: '/chakras'
    },
    {
      id: 'meditation',
      title: 'Daily Practice: Meditation Center',
      description: 'Establish your daily spiritual practice with guided meditations.',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-sm bg-[#7b2dff]/10 border-2 border-[#7b2dff]/40 flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-[#7b2dff]" />
            </div>
          </div>
          <p className="text-neutral-400 font-anti-mono text-sm leading-relaxed">
            Regular meditation practice is essential for spiritual development. Our meditation center 
            provides guided sessions for protection, chakra clearing, and consciousness expansion.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#0a0a0a] border border-neutral-800">
              <p className="text-sm font-anti-mono font-bold text-[#e8e8e8]">12D Shield</p>
              <p className="text-xs text-neutral-600 font-anti-mono">15 min</p>
            </div>
            <div className="p-3 bg-[#0a0a0a] border border-neutral-800">
              <p className="text-sm font-anti-mono font-bold text-[#e8e8e8]">Chakra Clearing</p>
              <p className="text-xs text-neutral-600 font-anti-mono">20 min</p>
            </div>
          </div>
        </div>
      ),
      actionLabel: 'Start Meditating',
      actionUrl: '/meditation'
    },
    {
      id: 'progress',
      title: 'Track Your Journey',
      description: 'Monitor your spiritual development and celebrate achievements.',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-sm bg-[#39ff14]/10 border-2 border-[#39ff14]/40 flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-[#39ff14]" />
            </div>
          </div>
          <p className="text-neutral-400 font-anti-mono text-sm leading-relaxed">
            Track your meditation streaks, unlock achievements, and monitor your progress across 
            different areas of spiritual development. Set goals and celebrate milestones.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-neutral-800">
              <span className="text-sm text-[#e8e8e8] font-anti-mono">Meditation Streak</span>
              <Badge variant="outline" className="border-[#39ff14]/30 text-[#39ff14] font-anti-mono text-xs">7 days</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-neutral-800">
              <span className="text-sm text-[#e8e8e8] font-anti-mono">Chakra Progress</span>
              <Badge variant="outline" className="border-[#00f0ff]/30 text-[#00f0ff] font-anti-mono text-xs">45%</Badge>
            </div>
          </div>
        </div>
      ),
      actionLabel: 'View Progress',
      actionUrl: '/progress'
    }
  ];

  const nextStep = () => {
    const newStep = Math.min(onboardingState.currentStep + 1, steps.length - 1);
    setOnboardingState(prev => ({
      ...prev,
      currentStep: newStep,
      completedSteps: [...prev.completedSteps, steps[prev.currentStep]?.id ?? '']
    }));
  };

  const prevStep = () => {
    const newStep = Math.max(onboardingState.currentStep - 1, 0);
    setOnboardingState(prev => ({ ...prev, currentStep: newStep }));
  };

  const completeOnboarding = () => {
    setOnboardingState(prev => ({
      ...prev,
      completed: true,
      completedSteps: steps.map(s => s.id)
    }));
    setIsVisible(false);
  };

  const skipOnboarding = () => {
    setOnboardingState(prev => ({ ...prev, skipped: true }));
    setIsVisible(false);
  };

  const goToStep = (stepIndex: number) => {
    setOnboardingState(prev => ({ ...prev, currentStep: stepIndex }));
  };

  const navigateToAction = () => {
    const currentStepData = steps[onboardingState.currentStep];
    if (currentStepData?.actionUrl) {
      window.location.href = currentStepData.actionUrl;
      setIsVisible(false);
    } else {
      nextStep();
    }
  };

  if (!isVisible) return null;

  const currentStep = steps[onboardingState.currentStep];
  const progress = ((onboardingState.currentStep + 1) / steps.length) * 100;
  const isLastStep = onboardingState.currentStep === steps.length - 1;

  if (!currentStep) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <Card className="bg-[#0a0a0a] border border-neutral-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39ff14]/50 to-transparent" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-anti-display text-[#39ff14] uppercase tracking-wider">
              Getting Started
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={skipOnboarding}
              className="text-neutral-500 font-anti-mono hover:text-[#39ff14] uppercase tracking-wider text-xs"
            >
              Skip Tour
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-anti-mono">
              <span className="text-neutral-500">Step {onboardingState.currentStep + 1} of {steps.length}</span>
              <span className="text-[#39ff14]">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-neutral-900 [&>div]:bg-[#39ff14]" />
          </div>

          <div className="flex items-center justify-center space-x-2 mt-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === onboardingState.currentStep
                    ? 'bg-[#39ff14]'
                    : index < onboardingState.currentStep
                    ? 'bg-[#39ff14]/60'
                    : 'bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-anti-mono font-bold text-[#e8e8e8] uppercase tracking-wide mb-2">{currentStep.title}</h2>
            <p className="text-neutral-500 font-anti-mono text-sm mb-6">{currentStep.description}</p>
          </div>

          <div className="max-w-lg mx-auto">
            {currentStep.content}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-neutral-800">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={onboardingState.currentStep === 0}
              className="border border-neutral-700 text-neutral-400 font-anti-mono uppercase tracking-wider hover:border-[#39ff14]/50 hover:text-[#39ff14] disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-3">
              {isLastStep ? (
                <Button
                  onClick={completeOnboarding}
                  className="bg-[#39ff14] text-black font-anti-mono font-bold uppercase tracking-wider hover:bg-[#39ff14]/80"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Setup
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={nextStep}
                    className="border border-neutral-700 text-neutral-400 font-anti-mono uppercase tracking-wider hover:border-[#39ff14]/50 hover:text-[#39ff14]"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    onClick={navigateToAction}
                    className="bg-[#39ff14] text-black font-anti-mono font-bold uppercase tracking-wider hover:bg-[#39ff14]/80"
                  >
                    {currentStep.actionLabel}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
