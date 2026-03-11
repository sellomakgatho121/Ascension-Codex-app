import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Play, Pause, Volume2, VolumeX, Sparkles, CheckCircle } from "lucide-react";

interface PracticeStep {
    duration: number; // in seconds
    instruction: string;
    subtext?: string;
    visualType: 'breath' | 'scan' | 'expand' | 'hold';
}

interface InteractivePracticeSessionProps {
    title: string;
    steps: PracticeStep[];
    onComplete: () => void;
    onClose: () => void;
    color?: string;
}

export function InteractivePracticeSession({
    title,
    steps,
    onComplete,
    onClose,
    color = "hsl(45, 100%, 50%)"
}: InteractivePracticeSessionProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [timeLeftInStep, setTimeLeftInStep] = useState(steps[0].duration);
    const [isMuted, setIsMuted] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);

    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    const currentStep = steps[currentStepIndex];

    // Calculate total progress
    const completedDuration = steps.slice(0, currentStepIndex).reduce((acc, s) => acc + s.duration, 0) + (currentStep.duration - timeLeftInStep);
    const progressPercentage = (completedDuration / totalDuration) * 100;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isPlaying && !sessionComplete) {
            interval = setInterval(() => {
                setTimeLeftInStep((prev) => {
                    if (prev <= 1) {
                        // Step complete, move to next
                        if (currentStepIndex < steps.length - 1) {
                            setCurrentStepIndex(prevIndex => prevIndex + 1);
                            return steps[currentStepIndex + 1].duration;
                        } else {
                            // Session complete
                            setSessionComplete(true);
                            setIsPlaying(false);
                            onComplete();
                            return 0;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isPlaying, currentStepIndex, steps, sessionComplete, onComplete]);

    // Visualizer Animation Variants
    const visualizerVariants = {
        breath: {
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        },
        scan: {
            y: ["-100%", "100%"],
            opacity: [0, 0.5, 0],
            transition: { duration: 4, repeat: Infinity, ease: "linear" }
        },
        expand: {
            scale: [0.5, 2],
            opacity: [0.8, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeOut" }
        },
        hold: {
            scale: 1.2,
            opacity: 0.8,
            transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" }
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-cosmic-950 flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Ambient Background */}
            <div
                className="absolute inset-0 opacity-20 transition-colors duration-1000"
                style={{
                    background: `radial-gradient(circle at center, ${color}, transparent 70%)`
                }}
            />

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-white/10 transition-colors z-50"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-2xl px-8 text-center">
                {!sessionComplete ? (
                    <>
                        <motion.div
                            key={currentStepIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl md:text-5xl font-sacred font-bold mb-6 text-sacred-gold">
                                {currentStep.instruction}
                            </h2>
                            {currentStep.subtext && (
                                <p className="text-xl text-cosmic-200 font-light">
                                    {currentStep.subtext}
                                </p>
                            )}
                        </motion.div>

                        {/* Visualizer - Centerpiece */}
                        <div className="relative w-64 h-64 mx-auto mb-12 flex items-center justify-center">
                            {/* Core Circle */}
                            <motion.div
                                className="w-32 h-32 rounded-full absolute blur-md"
                                style={{ backgroundColor: color }}
                                animate={isPlaying ? visualizerVariants[currentStep.visualType] : { scale: 1, opacity: 0.5 }}
                            />
                            <motion.div
                                className="w-16 h-16 rounded-full bg-white absolute mix-blend-overlay"
                                animate={isPlaying ? visualizerVariants[currentStep.visualType] : { scale: 1, opacity: 0.8 }}
                                style={{ animationDelay: "0.2s" }}
                            />

                            {/* Rings */}
                            <div className="absolute inset-0 rounded-full border border-white/10" />
                            <div className="absolute inset-8 rounded-full border border-white/20" />
                        </div>

                        {/* Timer Display */}
                        <div className="mb-8 font-mono text-4xl font-light tracking-wider opacity-80">
                            {Math.floor(timeLeftInStep / 60).toString().padStart(2, '0')}:
                            {(timeLeftInStep % 60).toString().padStart(2, '0')}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-6">
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-16 h-16 rounded-full border-white/20 hover:bg-white/10 hover:text-sacred-gold backdrop-blur-sm"
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                            </Button>
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-green-400" />
                        </div>
                        <h2 className="text-4xl font-sacred font-bold mb-4">Complete</h2>
                        <p className="text-cosmic-200 mb-8 max-w-md mx-auto">
                            You have successfully completed the {title}. Your energy field is now harmonized.
                        </p>
                        <Button
                            onClick={onClose}
                            className="sacred-button px-8 py-6 text-lg"
                        >
                            Return to Guide
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Footer Progress */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <span className="text-xs text-cosmic-400 font-mono">
                        {Math.round(progressPercentage)}%
                    </span>
                    <Progress value={progressPercentage} className="h-1 bg-white/10" indicatorClassName="bg-sacred-gold" />
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-cosmic-400 hover:text-white transition-colors"
                    >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
