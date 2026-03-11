import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface TechniqueAnimationsProps {
  technique: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
}

export function TechniqueAnimations({ technique, isPlaying, onPlayPause, onReset }: TechniqueAnimationsProps) {
  const [animationStep, setAnimationStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setAnimationStep(prev => {
          const techniques = getTechniqueSteps(technique);
          return (prev + 1) % techniques.length;
        });
        setProgress(prev => (prev + 2) % 100);
      }, 3000); // 3 second intervals
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, technique]);

  const getTechniqueSteps = (techType: string) => {
    switch (techType) {
      case "12d-shield":
        return [
          {
            title: "Grounding & Centering",
            description: "Connect to Earth's core and center yourself",
            visualization: "grounding",
            instruction: "Breathe deeply and feel your connection to the Earth"
          },
          {
            title: "Call Upon Guardian Forces",
            description: "Invoke the Guardian forces serving the One Eternal Light",
            visualization: "invocation",
            instruction: "State: 'I call upon the Guardian forces serving the One Eternal Light'"
          },
          {
            title: "Platinum Light Activation",
            description: "Visualize bright platinum light surrounding your body",
            visualization: "platinum-light",
            instruction: "See brilliant platinum-white light emanating from your heart"
          },
          {
            title: "12D Shield Declaration",
            description: "Declare your intention to build the 12D shield",
            visualization: "shield-building",
            instruction: "State: 'I build my 12D shield in the Christ vibration now'"
          },
          {
            title: "Shield Expansion",
            description: "Expand the shield 3 feet in all directions",
            visualization: "shield-expansion",
            instruction: "Feel the shield extending around your entire energy field"
          },
          {
            title: "Shield Sealing",
            description: "Seal and strengthen the protective field",
            visualization: "shield-sealing",
            instruction: "Declare: 'My 12D shield is sealed, activated and protected'"
          }
        ];
      case "chakra-clearing":
        return [
          {
            title: "12D Shield First",
            description: "Always begin with 12D shield protection",
            visualization: "shield-base",
            instruction: "Activate your 12D shield as foundation"
          },
          {
            title: "Root Chakra Clearing",
            description: "Clear and activate the root chakra (1st)",
            visualization: "chakra-1",
            instruction: "Focus red light at the base of spine, clear all blocks"
          },
          {
            title: "Sacral Chakra Clearing",
            description: "Clear and activate the sacral chakra (2nd)",
            visualization: "chakra-2",
            instruction: "Orange light at lower abdomen, release emotional blocks"
          },
          {
            title: "Solar Plexus Clearing",
            description: "Clear and activate the solar plexus (3rd)",
            visualization: "chakra-3",
            instruction: "Yellow light at upper abdomen, clear mental fears"
          },
          {
            title: "Heart Chakra Opening",
            description: "Open and activate the heart center (4th)",
            visualization: "chakra-4",
            instruction: "Green light at heart, open to unconditional love"
          },
          {
            title: "Throat Chakra Activation",
            description: "Activate truth and expression (5th)",
            visualization: "chakra-5",
            instruction: "Blue light at throat, speak your truth"
          },
          {
            title: "Third Eye Opening",
            description: "Open spiritual perception (6th)",
            visualization: "chakra-6",
            instruction: "Indigo light at forehead, enhance inner sight"
          },
          {
            title: "Crown Connection",
            description: "Connect to higher consciousness (7th)",
            visualization: "chakra-7",
            instruction: "Violet light at crown, connect to Source"
          }
        ];
      case "lightbody-activation":
        return [
          {
            title: "Foundation Shield",
            description: "Establish 12D shield protection",
            visualization: "foundation",
            instruction: "Create strong protective foundation"
          },
          {
            title: "Etheric Body Activation",
            description: "Activate the first lightbody layer",
            visualization: "etheric-layer",
            instruction: "Feel the etheric template around your physical body"
          },
          {
            title: "Emotional Body Integration",
            description: "Integrate the emotional lightbody layer",
            visualization: "emotional-layer",
            instruction: "Allow emotional healing and integration"
          },
          {
            title: "Mental Body Activation",
            description: "Activate the mental lightbody frequency",
            visualization: "mental-layer",
            instruction: "Clear mental patterns and activate higher mind"
          },
          {
            title: "Astral Body Integration",
            description: "Integrate the astral lightbody layer",
            visualization: "astral-layer",
            instruction: "Connect to astral plane consciousness"
          },
          {
            title: "Frequency Integration",
            description: "Integrate all lightbody frequencies",
            visualization: "frequency-integration",
            instruction: "Feel all layers working in harmony"
          },
          {
            title: "Cellular Anchoring",
            description: "Anchor lightbody into physical cells",
            visualization: "cellular-anchor",
            instruction: "Allow frequencies to anchor into your DNA"
          }
        ];
      default:
        return [];
    }
  };

  const VitruvianManSVG = ({ visualization }: { visualization: string }) => {
    return (
      <div className="relative w-80 h-80 mx-auto">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Base Vitruvian Man Figure */}
          <g className="text-cosmic-300" fill="currentColor" stroke="currentColor" strokeWidth="1">
            {/* Circle */}
            <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            
            {/* Square */}
            <rect x="60" y="60" width="280" height="280" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            
            {/* Body outline */}
            <path d="M200 80 L200 320 M170 100 L230 100 M160 140 L240 140 M170 180 L230 180 M180 220 L220 220 M185 260 L215 260 M190 300 L210 300" 
                  stroke="currentColor" strokeWidth="2" opacity="0.6" />
            
            {/* Head */}
            <circle cx="200" cy="90" r="25" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
            
            {/* Arms */}
            <path d="M200 120 L160 160 M200 120 L240 160" stroke="currentColor" strokeWidth="2" opacity="0.6" />
            
            {/* Legs */}
            <path d="M200 300 L170 360 M200 300 L230 360" stroke="currentColor" strokeWidth="2" opacity="0.6" />
          </g>

          {/* Chakra Points */}
          {(visualization.includes('chakra') || visualization === 'foundation') && (
            <g>
              {/* Root Chakra */}
              <circle cx="200" cy="300" r="8" fill="#ff0000" opacity={visualization === 'chakra-1' ? 1 : 0.6}>
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
              </circle>
              
              {/* Sacral Chakra */}
              <circle cx="200" cy="270" r="8" fill="#ff8800" opacity={visualization === 'chakra-2' ? 1 : 0.6}>
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="0.3s" />
              </circle>
              
              {/* Solar Plexus */}
              <circle cx="200" cy="230" r="8" fill="#ffff00" opacity={visualization === 'chakra-3' ? 1 : 0.6}>
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="0.6s" />
              </circle>
              
              {/* Heart Chakra */}
              <circle cx="200" cy="180" r="8" fill="#00ff00" opacity={visualization === 'chakra-4' ? 1 : 0.6}>
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="0.9s" />
              </circle>
              
              {/* Throat Chakra */}
              <circle cx="200" cy="140" r="8" fill="#0088ff" opacity={visualization === 'chakra-5' ? 1 : 0.6}>
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="1.2s" />
              </circle>
              
              {/* Third Eye */}
              <circle cx="200" cy="100" r="8" fill="#4400ff" opacity={visualization === 'chakra-6' ? 1 : 0.6}>
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="1.5s" />
              </circle>
              
              {/* Crown Chakra */}
              <circle cx="200" cy="65" r="8" fill="#8800ff" opacity={visualization === 'chakra-7' ? 1 : 0.6}>
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="1.8s" />
              </circle>
            </g>
          )}

          {/* 12D Shield Visualization */}
          {(visualization.includes('shield') || visualization === 'platinum-light') && (
            <g>
              {/* Inner Shield */}
              <circle cx="200" cy="200" r="150" fill="none" stroke="#e6e6fa" strokeWidth="3" opacity="0.8">
                <animate attributeName="r" values="150;160;150" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
              </circle>
              
              {/* Outer Shield */}
              <circle cx="200" cy="200" r="170" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6">
                <animate attributeName="r" values="170;180;170" dur="4s" repeatCount="indefinite" />
              </circle>
              
              {/* Platinum Light Rays */}
              {visualization === 'platinum-light' && (
                <g>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                    <line
                      key={angle}
                      x1="200"
                      y1="200"
                      x2={200 + 160 * Math.cos(angle * Math.PI / 180)}
                      y2={200 + 160 * Math.sin(angle * Math.PI / 180)}
                      stroke="#e6e6fa"
                      strokeWidth="2"
                      opacity="0.7"
                    >
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin={`${angle / 45 * 0.2}s`} />
                    </line>
                  ))}
                </g>
              )}
            </g>
          )}

          {/* Lightbody Layers */}
          {visualization.includes('layer') && (
            <g>
              {/* Etheric Layer */}
              <circle cx="200" cy="200" r="120" fill="none" stroke="#87ceeb" strokeWidth="2" opacity={visualization === 'etheric-layer' ? 1 : 0.4}>
                <animate attributeName="r" values="120;125;120" dur="3s" repeatCount="indefinite" />
              </circle>
              
              {/* Emotional Layer */}
              <circle cx="200" cy="200" r="140" fill="none" stroke="#ffa500" strokeWidth="2" opacity={visualization === 'emotional-layer' ? 1 : 0.4}>
                <animate attributeName="r" values="140;145;140" dur="3.5s" repeatCount="indefinite" />
              </circle>
              
              {/* Mental Layer */}
              <circle cx="200" cy="200" r="160" fill="none" stroke="#ffff00" strokeWidth="2" opacity={visualization === 'mental-layer' ? 1 : 0.4}>
                <animate attributeName="r" values="160;165;160" dur="4s" repeatCount="indefinite" />
              </circle>
              
              {/* Astral Layer */}
              <circle cx="200" cy="200" r="180" fill="none" stroke="#ff69b4" strokeWidth="2" opacity={visualization === 'astral-layer' ? 1 : 0.4}>
                <animate attributeName="r" values="180;185;180" dur="4.5s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {/* Grounding Visualization */}
          {visualization === 'grounding' && (
            <g>
              {/* Grounding cord */}
              <line x1="200" y1="300" x2="200" y2="400" stroke="#8b4513" strokeWidth="4" opacity="0.8">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
              </line>
              
              {/* Earth connection */}
              <circle cx="200" cy="390" r="15" fill="#8b4513" opacity="0.6">
                <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {/* Energy Flow for Frequency Integration */}
          {visualization === 'frequency-integration' && (
            <g>
              {[1, 2, 3, 4, 5].map(ring => (
                <circle
                  key={ring}
                  cx="200"
                  cy="200"
                  r={80 + ring * 20}
                  fill="none"
                  stroke="#ffd700"
                  strokeWidth="1"
                  opacity="0.6"
                >
                  <animate attributeName="r" values={`${80 + ring * 20};${90 + ring * 20};${80 + ring * 20}`} dur="2s" repeatCount="indefinite" begin={`${ring * 0.2}s`} />
                </circle>
              ))}
            </g>
          )}

          {/* Cellular Anchoring */}
          {visualization === 'cellular-anchor' && (
            <g>
              {/* DNA helix visualization */}
              <g opacity="0.7">
                {[...Array(12)].map((_, i) => (
                  <circle
                    key={i}
                    cx={200 + 30 * Math.cos(i * Math.PI / 6)}
                    cy={200 + 30 * Math.sin(i * Math.PI / 6)}
                    r="3"
                    fill="#ffd700"
                  >
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" begin={`${i * 0.1}s`} />
                  </circle>
                ))}
              </g>
            </g>
          )}
        </svg>

        {/* Overlay Information */}
        <div className="absolute top-4 left-4 right-4">
          <Badge variant="outline" className="border-sacred-gold/50 text-sacred-gold bg-cosmic-900/80">
            Step {animationStep + 1}
          </Badge>
        </div>
      </div>
    );
  };

  const currentSteps = getTechniqueSteps(technique);
  const currentStep = currentSteps[animationStep] || currentSteps[0];

  return (
    <div className="space-y-6">
      {/* Animation Display */}
      <Card className="sacred-card">
        <CardContent className="p-6">
          <VitruvianManSVG visualization={currentStep?.visualization || 'foundation'} />
        </CardContent>
      </Card>

      {/* Controls */}
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center justify-between">
            <span>{currentStep?.title}</span>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="border-cosmic-500 text-cosmic-500 hover:bg-cosmic-500 hover:text-white"
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onReset}
                className="border-cosmic-500 text-cosmic-500 hover:bg-cosmic-500 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={onPlayPause}
                className="sacred-button"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-cosmic-100 leading-relaxed">
            {currentStep?.description}
          </p>
          
          <div className="p-4 bg-cosmic-800/30 rounded-lg border-l-4 border-sacred-gold">
            <p className="text-sacred-gold font-medium text-sm">
              Instruction: {currentStep?.instruction}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-cosmic-300">
              <span>Animation Progress</span>
              <span>{animationStep + 1} / {currentSteps.length}</span>
            </div>
            <Progress value={((animationStep + 1) / currentSteps.length) * 100} className="h-2" />
          </div>

          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2">
            {currentSteps.map((step, index) => (
              <Button
                key={index}
                size="sm"
                variant={index === animationStep ? "default" : "outline"}
                onClick={() => setAnimationStep(index)}
                className={`text-xs ${
                  index === animationStep 
                    ? 'bg-sacred-gold text-cosmic-900' 
                    : 'border-cosmic-500 text-cosmic-500 hover:bg-cosmic-500 hover:text-white'
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technique Information */}
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-lg font-sacred text-sacred-silver">
            About This Technique
          </CardTitle>
        </CardHeader>
        <CardContent>
          {technique === "12d-shield" && (
            <div className="space-y-3 text-cosmic-100 text-sm">
              <p>
                The 12D Shield is the foundational protection technique in Energetic Synthesis. 
                It creates a protective field in the 12th dimensional frequency, connecting you 
                to the Christ Consciousness vibration.
              </p>
              <p>
                This shield deflects negative energies, psychic attacks, and helps maintain 
                your sovereign energy field. Practice daily for optimal spiritual protection.
              </p>
            </div>
          )}
          
          {technique === "chakra-clearing" && (
            <div className="space-y-3 text-cosmic-100 text-sm">
              <p>
                Chakra clearing works through all 15 chakras in the expanded system, 
                including both physical (1-7) and morphogenetic (8-15) energy centers.
              </p>
              <p>
                Regular chakra clearing removes blocks, balances energy flow, and supports 
                spiritual development and consciousness expansion.
              </p>
            </div>
          )}
          
          {technique === "lightbody-activation" && (
            <div className="space-y-3 text-cosmic-100 text-sm">
              <p>
                Lightbody activation builds the electromagnetic frequency layers that 
                support multidimensional consciousness and spiritual abilities.
              </p>
              <p>
                This advanced practice requires consistent foundation work and gradually 
                integrates higher frequencies into your energy field and DNA.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}