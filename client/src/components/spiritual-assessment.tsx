import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Zap, Heart, Shield, Activity, CheckCircle, ChevronRight } from "lucide-react";

interface AssessmentQuestion {
  id: string;
  category: 'chakra' | 'lightbody' | 'grid';
  text: string;
  options: {
    label: string;
    value: number; // 0-100 score contribution
  }[];
}

const QUESTIONS: AssessmentQuestion[] = [
  {
    id: "root_grounding",
    category: "chakra",
    text: "How grounded do you feel in your physical reality right now?",
    options: [
      { label: "Completely untethered / floating", value: 20 },
      { label: "Unstable / anxious", value: 40 },
      { label: "Mostly stable but distracted", value: 70 },
      { label: "Deeply rooted and secure", value: 100 }
    ]
  },
  {
    id: "heart_expansion",
    category: "chakra",
    text: "Rate your current capacity for unconditional compassion:",
    options: [
      { label: "Closed / Protective", value: 30 },
      { label: "Neutral / Observation", value: 60 },
      { label: "Open but guarded", value: 80 },
      { label: "Radiant and expansive", value: 100 }
    ]
  },
  {
    id: "shield_integrity",
    category: "grid",
    text: "Can you visualize and maintain your 12D Shield?",
    options: [
      { label: "I cannot visualize it yet", value: 10 },
      { label: "It flickers or fades quickly", value: 40 },
      { label: "I can hold it for short periods", value: 75 },
      { label: "It is solid and permanent", value: 100 }
    ]
  },
  {
    id: "lightbody_symptoms",
    category: "lightbody",
    text: "Are you experiencing 'ascension flu' or electrical sensations?",
    options: [
      { label: "None at all", value: 0 },
      { label: "Mild tingling / heat", value: 50 },
      { label: "Intense waves of energy", value: 80 },
      { label: "Full body electrical integration", value: 100 }
    ]
  }
];

interface SpiritualAssessmentProps {
  onComplete: (results: any) => void;
  onClose: () => void;
}

export function SpiritualAssessment({ onComplete, onClose }: SpiritualAssessmentProps) {
  const [step, setStep] = useState<'intro' | 'questions' | 'analyzing' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleAnswer = (value: number) => {
    const question = QUESTIONS[currentQuestionIndex];
    setScores(prev => ({ ...prev, [question.id]: value }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('analyzing');
    }
  };

  // Simulate analysis
  if (step === 'analyzing') {
    setTimeout(() => {
      onComplete({
        chakraScore: (scores.root_grounding + scores.heart_expansion) / 2,
        gridScore: scores.shield_integrity,
        lightbodyScore: scores.lightbody_symptoms
      });
      setStep('results');
    }, 3000);
  }

  return (
    <div className="fixed inset-0 z-50 bg-cosmic-950/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-sacred-gold/20 flex items-center justify-center mx-auto mb-6">
                <Activity className="w-10 h-10 text-sacred-gold" />
              </div>
              <h2 className="text-3xl font-sacred text-sacred-gold">Spiritual Energy Assessment</h2>
              <p className="text-cosmic-100 text-lg max-w-md mx-auto">
                This diagnostic helps calibrate your progress tracker by analyzing your subjective experience of frequency integration.
              </p>
              <Button onClick={() => setStep('questions')} className="sacred-button text-lg px-8 py-6">
                Begin Assessment
              </Button>
            </motion.div>
          )}

          {step === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center text-sm text-cosmic-300 uppercase tracking-widest">
                <span>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
                <span>{QUESTIONS[currentQuestionIndex].category} Analysis</span>
              </div>

              <h3 className="text-2xl font-medium text-white">
                {QUESTIONS[currentQuestionIndex].text}
              </h3>

              <div className="grid gap-4">
                {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.value)}
                    className="p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sacred-gold/50 text-left transition-all group flex items-center justify-between"
                  >
                    <span className="text-cosmic-100 group-hover:text-white text-lg">{option.label}</span>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 text-sacred-gold transition-opacity" />
                  </button>
                ))}
              </div>

              <Progress value={((currentQuestionIndex) / QUESTIONS.length) * 100} className="h-1 bg-white/5" />
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <motion.div
                  className="absolute inset-0 rounded-full border-t-2 border-sacred-gold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border-t-2 border-sacred-silver"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <Brain className="absolute inset-0 m-auto w-10 h-10 text-cosmic-300" />
              </div>
              <h3 className="text-xl font-sacred text-white animate-pulse">Calculating Vibrational Baseline...</h3>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-sacred text-white">Assessment Complete</h2>
              <p className="text-cosmic-100">
                Your energetic baseline has been updated. The dashboard will now reflect your new calibration.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center my-8">
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-sacred-gold font-bold text-xl">{scores.root_grounding + scores.heart_expansion > 150 ? "High" : "Moderate"}</div>
                  <div className="text-xs text-cosmic-400">Chakra Health</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-sacred-silver font-bold text-xl">{scores.lightbody_symptoms > 50 ? "Active" : "Stable"}</div>
                  <div className="text-xs text-cosmic-400">Lightbody</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-blue-400 font-bold text-xl">{scores.shield_integrity}%</div>
                  <div className="text-xs text-cosmic-400">Shield Integrity</div>
                </div>
              </div>
              <Button onClick={onClose} className="sacred-button px-8 py-3 w-full">
                View Updated Dashboard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}