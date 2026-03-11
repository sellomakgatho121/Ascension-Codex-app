import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DNAActivationDiagramProps {
  selectedStrand?: number | null;
  onStrandSelect?: (strand: number) => void;
  showActivation?: boolean;
  interactive?: boolean;
  className?: string;
}

// 12-Strand DNA template based on ES teachings
const dnaStrands = [
  { id: 1, name: 'Physical DNA Strand 1', color: '#ff0000', dimension: '1D', activated: true },
  { id: 2, name: 'Physical DNA Strand 2', color: '#ff6600', dimension: '2D', activated: true },
  { id: 3, name: 'Mental DNA Strand 3', color: '#ffdd33', dimension: '3D', activated: false },
  { id: 4, name: 'Astral DNA Strand 4', color: '#33ff66', dimension: '4D', activated: false },
  { id: 5, name: 'Archetypal DNA Strand 5', color: '#33ffdd', dimension: '5D', activated: false },
  { id: 6, name: 'Celestial DNA Strand 6', color: '#3366ff', dimension: '6D', activated: false },
  { id: 7, name: 'Mental DNA Strand 7', color: '#6633ff', dimension: '7D', activated: false },
  { id: 8, name: 'Monadic DNA Strand 8', color: '#9966ff', dimension: '8D', activated: false },
  { id: 9, name: 'Avatar DNA Strand 9', color: '#cc33ff', dimension: '9D', activated: false },
  { id: 10, name: 'Avatar DNA Strand 10', color: '#ff33cc', dimension: '10D', activated: false },
  { id: 11, name: 'Avatar DNA Strand 11', color: '#ff6699', dimension: '11D', activated: false },
  { id: 12, name: 'Avatar DNA Strand 12', color: '#ffffff', dimension: '12D', activated: false }
];

const activationStages = [
  { stage: 1, strands: [1, 2], name: 'Base Human Template', description: 'Standard 2-strand human DNA' },
  { stage: 2, strands: [1, 2, 3], name: 'Mental Body Activation', description: 'Beginning awakening consciousness' },
  { stage: 3, strands: [1, 2, 3, 4], name: 'Astral Body Integration', description: 'Emotional healing and psychic abilities' },
  { stage: 4, strands: [1, 2, 3, 4, 5, 6], name: 'Soul Integration', description: 'Higher heart activation and soul embodiment' },
  { stage: 5, strands: [1, 2, 3, 4, 5, 6, 7, 8, 9], name: 'Monadic Integration', description: 'Avatar consciousness begins' },
  { stage: 6, strands: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], name: 'Christos Avatar', description: 'Full 12D template activation' }
];

export function DNAActivationDiagram({
  selectedStrand,
  onStrandSelect,
  showActivation = false,
  interactive = true,
  className = ""
}: DNAActivationDiagramProps) {
  const [currentStage, setCurrentStage] = useState(1);
  const [hoveredStrand, setHoveredStrand] = useState<number | null>(null);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Main DNA Helix Visualization */}
      <div className="glass-panel relative rounded-lg p-6 min-h-[600px] border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-950/50 -z-10"></div>
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full"
          style={{ minHeight: '500px' }}
        >
          <defs>
            <radialGradient id="strandGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </radialGradient>

            <filter id="helixGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central energy column */}
          <motion.line
            x1="100" y1="20"
            x2="100" y2="280"
            stroke="rgba(255,215,0,0.6)"
            strokeWidth="2"
            strokeDasharray="4,4"
            animate={{ strokeDashoffset: [0, 8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* DNA Double Helix Structure */}
          {Array.from({ length: 24 }, (_, i) => {
            const y = 30 + i * 10;
            const angle1 = (i * 30) * (Math.PI / 180);
            const angle2 = angle1 + Math.PI;
            const radius = 25;

            const x1 = 100 + Math.cos(angle1) * radius;
            const x2 = 100 + Math.cos(angle2) * radius;

            return (
              <g key={`helix-${i}`}>
                {/* Helix backbone - Simplified for visibility */}
                <line
                  x1={x1} y1={y}
                  x2={x2} y2={y}
                  stroke="#6495ED"
                  strokeWidth="2"
                  opacity="0.6"
                />

                {/* Connecting base pairs */}
                <circle cx={x1} cy={y} r="3" fill="#6495ED" fillOpacity="0.8" />
                <circle cx={x2} cy={y} r="3" fill="#6495ED" fillOpacity="0.8" />
              </g>
            );
          })}

          {/* 12 DNA Strands positioned around the helix */}
          {dnaStrands.map((strand, index) => {
            const angle = (index * 30) * (Math.PI / 180);
            const radius = 40 + (index % 4) * 8;
            const x = 100 + Math.cos(angle) * radius;
            const y = 50 + index * 18;

            const isActive = showActivation ?
              activationStages[currentStage - 1]?.strands.includes(strand.id) :
              strand.activated;

            return (
              <g key={strand.id}>
                {/* Strand energy field */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill={isActive ? strand.color : '#4a5568'}
                  initial={{ opacity: 0.8, scale: 1 }}
                  opacity={isActive ? 0.9 : 0.4}
                  stroke={hoveredStrand === strand.id ? '#ffffff' : strand.color}
                  strokeWidth={hoveredStrand === strand.id ? "2" : "1"}
                  className={interactive ? "cursor-pointer" : ""}
                  onClick={() => interactive && onStrandSelect?.(strand.id)}
                  onMouseEnter={() => setHoveredStrand(strand.id)}
                  onMouseLeave={() => setHoveredStrand(null)}
                  whileHover={{ scale: 1.2 }}
                  animate={isActive ? {
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1
                  }}
                />

                {/* Strand number */}
                <text
                  x={x}
                  y={y + 1}
                  fill="white"
                  fontSize="4"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {strand.id}
                </text>

                {/* Dimension label */}
                <text
                  x={x + 12}
                  y={y + 2}
                  fill={isActive ? strand.color : 'rgba(255,255,255,0.5)'}
                  fontSize="3"
                  textAnchor="start"
                >
                  {strand.dimension}
                </text>

                {/* Connection to central column */}
                {isActive && (
                  <motion.line
                    x1={x - 6}
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke={strand.color}
                    strokeWidth="0.5"
                    opacity="0.6"
                    strokeDasharray="2,2"
                    animate={{ strokeDashoffset: [0, 4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </g>
            );
          })}

          {/* Activation energy flow */}
          {showActivation && (
            <motion.circle
              cx="100"
              cy="150"
              r="50"
              fill="none"
              stroke="rgba(255,215,0,0.6)"
              strokeWidth="2"
              strokeDasharray="8,8"
              animate={{
                strokeDashoffset: [0, 16],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </svg>

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-cosmic-900/80 rounded-lg p-3 text-xs">
          <h4 className="text-white font-semibold mb-2">12-Strand DNA Template</h4>
          <div className="space-y-1 text-cosmic-200">
            <div>• Physical: Strands 1-2</div>
            <div>• Soul Matrix: Strands 3-6</div>
            <div>• Monadic: Strands 7-9</div>
            <div>• Avatar: Strands 10-12</div>
          </div>
        </div>
      </div>

      {/* Activation Stages Control */}
      {showActivation && (
        <div className="glass-panel rounded-xl p-6 border border-sacred-gold/20">
          <h3 className="text-lg font-sacred text-sacred-gold mb-4">DNA Activation Stages</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {activationStages.map((stage) => (
              <button
                key={stage.stage}
                onClick={() => setCurrentStage(stage.stage)}
                className={`p-2 rounded text-sm transition-all duration-300 ${currentStage === stage.stage
                  ? 'bg-sacred-gold text-cosmic-950 font-bold shadow-[0_0_10px_rgba(255,215,0,0.5)]'
                  : 'bg-cosmic-800/50 text-cosmic-300 hover:bg-cosmic-700 hover:text-white border border-transparent hover:border-cosmic-500/50'
                  }`}
              >
                Stage {stage.stage}
              </button>
            ))}
          </div>

          {(() => {
            const stage = activationStages[currentStage - 1];
            return stage ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={stage.stage}
                className="text-center bg-cosmic-950/30 rounded-lg p-4 border border-white/5"
              >
                <h4 className="text-white font-medium mb-2">{stage.name}</h4>
                <p className="text-cosmic-200 text-sm mb-3">{stage.description}</p>
                <div className="text-cosmic-300 text-xs">
                  Active Strands: {stage.strands.join(', ')}
                </div>
              </motion.div>
            ) : null;
          })()}
        </div>
      )}

      {/* Selected Strand Info */}
      <AnimatePresence mode="wait">
        {selectedStrand && (
          <motion.div
            key="strand-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass-panel rounded-xl p-6 border border-sacred-gold/40"
          >
            {(() => {
              const strand = dnaStrands.find(s => s.id === selectedStrand);
              return strand ? (
                <div>
                  <h3 className="text-lg font-sacred text-white mb-2">
                    {strand.name}
                  </h3>
                  <div className="flex items-center space-x-4 mb-3">
                    <div
                      className="w-6 h-6 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                      style={{ backgroundColor: strand.color }}
                    />
                    <span className="text-cosmic-200">{strand.dimension} Frequency</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${strand.activated
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-cosmic-700/50 text-cosmic-400 border border-cosmic-600/30'
                      }`}>
                      {strand.activated ? 'Activated' : 'Dormant'}
                    </span>
                  </div>
                  <p className="text-cosmic-300 text-sm leading-relaxed">
                    This strand corresponds to the {strand.dimension} dimensional frequency and is part of the
                    {strand.id <= 2 ? ' physical' :
                      strand.id <= 6 ? ' soul matrix' :
                        strand.id <= 9 ? ' monadic' : ' avatar'} template.
                  </p>
                </div>
              ) : null;
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}