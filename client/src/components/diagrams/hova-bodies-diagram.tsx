import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hovaShields, HovaShield } from "@/lib/spiritual-content";
import { motion, AnimatePresence } from "framer-motion";
import { getChakraColors } from "@/lib/chakra-data";

interface HovaBodiesDiagramProps {
  selectedShield?: string | null;
  onShieldSelect?: (shieldId: string) => void;
  interactive?: boolean;
}

const PHI = 1.618;

export function HovaBodiesDiagram({
  selectedShield,
  onShieldSelect,
  interactive = true
}: HovaBodiesDiagramProps) {
  const [hoveredShield, setHoveredShield] = useState<string | null>(null);
  const chakraColors = getChakraColors();

  const isActive = (shieldId: string) => {
    return selectedShield === shieldId || hoveredShield === shieldId;
  };

  // Base radii for nesting, using PHI influence
  const shieldRadii = [
    { id: 'doradic', rx: 25, ry: 45 },
    { id: 'telluric', rx: 35, ry: 60 },
    { id: 'teuric', rx: 45, ry: 75 },
    { id: 'maharic', rx: 55, ry: 90 },
    { id: 'rishic', rx: 65, ry: 105 }
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* SVG Hova Bodies Diagram */}
      <svg
        viewBox="0 0 200 250"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {hovaShields.map((shield) => (
            <radialGradient key={`grad-${shield.id}`} id={`grad-${shield.id}`} cx="50%" cy="50%">
              <stop offset="0%" stopColor={shield.color} stopOpacity="0.05" />
              <stop offset="85%" stopColor={shield.color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={shield.color} stopOpacity="0.4" />
            </radialGradient>
          ))}
          
          <filter id="hovaGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Human Silhouette - PHI Proportions */}
        <g opacity="0.6" stroke="rgba(255,215,0,0.4)" strokeWidth="0.5" fill="rgba(255,255,255,0.1)">
          <circle cx="100" cy="60" r="8" /> {/* Head */}
          <path d="M 100 68 L 100 140 M 80 85 L 120 85 M 80 85 L 75 120 M 120 85 L 125 120 M 90 140 L 85 190 M 110 140 L 115 190" strokeWidth="1" />
          <ellipse cx="100" cy="105" rx="15" ry="30" fill="none" /> {/* Torso */}
        </g>

        {/* Hova Shields (Nested Harmonic Bodies) */}
        {shieldRadii.slice().reverse().map((r, index) => {
          const shield = hovaShields.find(s => s.id === r.id)!;
          const active = isActive(shield.id);
          const isSelected = selectedShield === shield.id;

          return (
            <motion.g key={shield.id} initial={false}>
              {/* Shield Ellipse */}
              <motion.ellipse
                cx="100"
                cy="110"
                rx={r.rx}
                ry={r.ry}
                fill={`url(#grad-${shield.id})`}
                stroke={shield.color}
                strokeWidth={active ? "1.5" : "0.5"}
                strokeOpacity={active ? "1" : "0.3"}
                className={interactive ? "cursor-pointer" : ""}
                onClick={() => interactive && onShieldSelect?.(shield.id)}
                onMouseEnter={() => interactive && setHoveredShield(shield.id)}
                onMouseLeave={() => interactive && setHoveredShield(null)}
                animate={{
                  scale: isSelected ? 1.05 : 1,
                  opacity: selectedShield && !active ? 0.2 : 1
                }}
                transition={{ duration: 0.5 }}
                filter={active ? "url(#hovaGlow)" : "none"}
              />

              {/* Energy Sparkles along the shield perimeter */}
              {active && (
                <motion.ellipse
                  cx="100"
                  cy="110"
                  rx={r.rx + 2}
                  ry={r.ry + 2}
                  fill="none"
                  stroke={shield.color}
                  strokeWidth="0.2"
                  strokeDasharray="1,5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ originX: "100px", originY: "110px" }}
                />
              )}

              {/* Label Positioned via PHI distance */}
              <AnimatePresence>
                {active && (
                  <motion.g
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none"
                  >
                    <rect 
                      x={100 + r.rx + 5} 
                      y={110 - r.ry/PHI} 
                      width="100" height="20" 
                      rx="4" fill="rgba(0,0,0,0.8)" 
                    />
                    <text
                      x={100 + r.rx + 10}
                      y={110 - r.ry/PHI + 13}
                      fill={shield.color}
                      fontSize="7"
                      fontWeight="bold"
                    >
                      {shield.name.split(' (')[0]}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Highlight associated chakras */}
              {active && shield.chakras.map((chakraId) => {
                // Approximate positions based on silhouette
                const chakraY = 60 + (chakraId === 1 ? 100 : chakraId === 2 ? 85 : chakraId === 3 ? 70 : chakraId === 4 ? 50 : chakraId === 5 ? 35 : chakraId === 6 ? 20 : 0);
                // Wait, I should use the chakraData positions if possible or just simplified ones for this diagram
                return (
                  <motion.circle
                    key={`chakra-highlight-${shield.id}-${chakraId}`}
                    cx="100"
                    cy={190 - (chakraId * 12)} // Simplified vertical stack
                    r="2"
                    fill={chakraColors[chakraId as keyof typeof chakraColors]}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                );
              })}
            </motion.g>
          );
        })}

        {/* Central Vertical Channel */}
        <line x1="100" y1="30" x2="100" y2="220" stroke="white" strokeWidth="0.3" strokeDasharray="2,2" opacity="0.4" />
      </svg>

      {/* Selected Shield Info */}
      <AnimatePresence mode="wait">
        {selectedShield && (
          <motion.div
            key="shield-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="glass-panel border border-sacred-gold/40 overflow-hidden">
              <CardContent className="p-5">
                {(() => {
                  const shield = hovaShields.find(s => s.id === selectedShield);
                  if (!shield) return null;

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-sacred font-bold text-white text-xl uppercase tracking-wider">
                          {shield.name}
                        </h4>
                        <Badge className="bg-sacred-gold/20 text-sacred-gold border-sacred-gold/40">
                          {shield.dimensions}
                        </Badge>
                      </div>
                      
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-cosmic-100 text-sm leading-relaxed font-medium">
                          {shield.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-sacred-gold uppercase font-bold block mb-1">Function</span>
                          <p className="text-xs text-cosmic-200">{shield.function}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-sacred-gold uppercase font-bold block mb-1">Ascension Purpose</span>
                          <p className="text-xs text-cosmic-200">{shield.ascensionPurpose}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                        <span className="text-[10px] text-cosmic-400 uppercase font-bold mr-2 self-center">Associated Chakras:</span>
                        {shield.chakras.map(id => (
                          <div 
                            key={id} 
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border border-white/20"
                            style={{ backgroundColor: chakraColors[id as keyof typeof chakraColors] }}
                          >
                            {id}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}