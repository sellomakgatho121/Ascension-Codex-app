import { motion } from "framer-motion";
import { useState } from "react";

interface ProtectionShieldDiagramProps {
  selectedShield?: string | null;
  onShieldSelect?: (shieldId: string) => void;
  showActivation?: boolean;
  interactive?: boolean;
  className?: string;
}

// Protection shields based on ES teachings
const protectionShields = [
  {
    id: '12d-shield',
    name: '12D Shield',
    radius: 45,
    color: '#FFD700',
    description: 'Primary Christ consciousness protection field',
    activation: 'I am God, I am Sovereign, I am Free',
    layers: 4
  },
  {
    id: 'doradic-shield',
    name: 'Doradic Shield',
    radius: 38,
    color: '#FF69B4',
    description: 'Astral body protection, 4D-5D-6D matrix',
    activation: 'Pink flame protection around astral body',
    layers: 3
  },
  {
    id: 'telluric-shield',
    name: 'Telluric Shield',
    radius: 32,
    color: '#8B4513',
    description: 'Physical body protection, 1D-2D-3D matrix',
    activation: 'Brown/golden earth energy shield',
    layers: 3
  },
  {
    id: 'teuric-shield',
    name: 'Teuric Shield',
    radius: 26,
    color: '#4169E1',
    description: 'Mental body protection, 7D-8D-9D matrix',
    activation: 'Blue flame mental body protection',
    layers: 3
  },
  {
    id: 'maharata-shield',
    name: 'Maharata Shield',
    radius: 20,
    color: '#9370DB',
    description: 'Avatar body protection, 10D-11D-12D matrix',
    activation: 'Violet flame avatar protection',
    layers: 3
  }
];

const shieldTechniques = [
  {
    name: 'Violet Flame Sweep',
    description: 'Clear negative energies with violet transmutation flame',
    visualization: 'Violet flame burning through entire energy field'
  },
  {
    name: 'GSF Decree',
    description: 'God, Sovereign, Free declaration of divine authority',
    visualization: 'Golden light emanating from heart center'
  },
  {
    name: 'Entity Clearing',
    description: 'Remove attachments and parasitic entities',
    visualization: 'White light extraction of foreign energies'
  },
  {
    name: 'Cord Cutting',
    description: 'Sever energetic connections to toxic relationships',
    visualization: 'Golden scissors cutting etheric cords'
  }
];

export function ProtectionShieldDiagram({
  selectedShield,
  onShieldSelect,
  showActivation = false,
  interactive = true,
  className = ""
}: ProtectionShieldDiagramProps) {
  const [activationPhase, setActivationPhase] = useState(0);
  const [hoveredShield, setHoveredShield] = useState<string | null>(null);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Main Protection Shield Diagram */}
      <div className="relative bg-gradient-radial from-cosmic-900 via-cosmic-950 to-black rounded-lg p-6 min-h-[600px]">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ minHeight: '500px' }}
        >
          <defs>
            {/* Shield gradient definitions */}
            {protectionShields.map((shield, index) => (
              <radialGradient key={`shield-grad-${shield.id}`} id={`shield-gradient-${shield.id}`} cx="50%" cy="50%">
                <stop offset="0%" stopColor={shield.color} stopOpacity="0.1" />
                <stop offset="70%" stopColor={shield.color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={shield.color} stopOpacity="0.8" />
              </radialGradient>
            ))}
            
            <filter id="shield-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="activation-pulse">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Central human figure */}
          <g transform="translate(100, 100)">
            {/* Head */}
            <circle cx="0" cy="-25" r="8" fill="rgba(255,255,255,0.3)" stroke="rgba(255,215,0,0.6)" strokeWidth="1" />
            
            {/* Body */}
            <ellipse cx="0" cy="0" rx="10" ry="25" fill="rgba(255,255,255,0.2)" stroke="rgba(255,215,0,0.6)" strokeWidth="1" />
            
            {/* Arms */}
            <ellipse cx="-12" cy="-5" rx="5" ry="15" fill="rgba(255,255,255,0.2)" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
            <ellipse cx="12" cy="-5" rx="5" ry="15" fill="rgba(255,255,255,0.2)" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
            
            {/* Legs */}
            <ellipse cx="-5" cy="35" rx="5" ry="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
            <ellipse cx="5" cy="35" rx="5" ry="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
          </g>

          {/* Protection shields */}
          {protectionShields.map((shield, index) => {
            const isVisible = selectedShield === null || selectedShield === shield.id;
            const isHighlighted = hoveredShield === shield.id || selectedShield === shield.id;
            const opacity = isVisible ? (isHighlighted ? 0.8 : 0.5) : 0.1;
            
            return (
              <g key={shield.id}>
                {/* Main shield layer */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r={shield.radius}
                  fill={`url(#shield-gradient-${shield.id})`}
                  stroke={shield.color}
                  strokeWidth={isHighlighted ? "3" : "2"}
                  opacity={opacity}
                  filter="url(#shield-glow)"
                  className={interactive ? "cursor-pointer" : ""}
                  onClick={() => interactive && onShieldSelect?.(shield.id)}
                  onMouseEnter={() => setHoveredShield(shield.id)}
                  onMouseLeave={() => setHoveredShield(null)}
                  animate={showActivation ? {
                    scale: [1, 1.05, 1],
                    opacity: [opacity * 0.7, opacity, opacity * 0.7]
                  } : {}}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Shield layers */}
                {Array.from({ length: shield.layers }, (_, layerIndex) => (
                  <motion.circle
                    key={`${shield.id}-layer-${layerIndex}`}
                    cx="100"
                    cy="100"
                    r={shield.radius - layerIndex * 2}
                    fill="none"
                    stroke={shield.color}
                    strokeWidth="1"
                    opacity={opacity * 0.6}
                    strokeDasharray="4,4"
                    animate={showActivation ? {
                      strokeDashoffset: [0, 8],
                      opacity: [opacity * 0.3, opacity * 0.8, opacity * 0.3]
                    } : {}}
                    transition={{
                      duration: 2 + layerIndex * 0.3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}

                {/* Sacred geometry patterns */}
                {isHighlighted && (
                  <>
                    {/* Merkaba points */}
                    {Array.from({ length: 6 }, (_, pointIndex) => {
                      const angle = (pointIndex * 60) * (Math.PI / 180);
                      const x = 100 + Math.cos(angle) * (shield.radius - 5);
                      const y = 100 + Math.sin(angle) * (shield.radius - 5);
                      
                      return (
                        <motion.circle
                          key={`${shield.id}-point-${pointIndex}`}
                          cx={x}
                          cy={y}
                          r="2"
                          fill={shield.color}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: pointIndex * 0.2
                          }}
                        />
                      );
                    })}
                  </>
                )}

                {/* Shield label */}
                <text
                  x={100 + shield.radius + 10}
                  y={100 - shield.radius + 5}
                  fill={isHighlighted ? '#ffffff' : shield.color}
                  fontSize="8"
                  textAnchor="start"
                  fontWeight={isHighlighted ? "bold" : "normal"}
                >
                  {shield.name}
                </text>
              </g>
            );
          })}

          {/* Activation energy waves */}
          {showActivation && (
            <>
              {Array.from({ length: 3 }, (_, waveIndex) => (
                <motion.circle
                  key={`wave-${waveIndex}`}
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="rgba(255,215,0,0.6)"
                  strokeWidth="2"
                  strokeDasharray="8,8"
                  animate={{ 
                    scale: [1, 2, 1],
                    opacity: [0.8, 0, 0.8],
                    strokeDashoffset: [0, 16]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeOut",
                    delay: waveIndex * 1.3
                  }}
                />
              ))}
            </>
          )}

          {/* Central activation point */}
          <motion.circle
            cx="100"
            cy="100"
            r="3"
            fill="rgba(255,255,255,0.9)"
            animate={showActivation ? {
              scale: [1, 2, 1],
              opacity: [0.9, 0.3, 0.9]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </svg>

        {/* Control Panel */}
        <div className="absolute top-4 right-4 bg-cosmic-900/80 rounded-lg p-3 space-y-2">
          <h4 className="text-white font-semibold text-sm">Shield Controls</h4>
          
          {interactive && (
            <>
              <div className="space-y-1">
                <button
                  onClick={() => setActivationPhase((prev) => (prev + 1) % 4)}
                  className="block w-full text-xs bg-cosmic-800 hover:bg-cosmic-700 text-white px-2 py-1 rounded"
                >
                  Activation Phase {activationPhase + 1}
                </button>
                
                <button
                  onClick={() => onShieldSelect?.("")}
                  className="block w-full text-xs bg-cosmic-800 hover:bg-cosmic-700 text-white px-2 py-1 rounded"
                >
                  Show All Shields
                </button>
              </div>
            </>
          )}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-cosmic-900/80 rounded-lg p-3 text-xs">
          <h4 className="text-white font-semibold mb-2">Protection Matrix</h4>
          <div className="space-y-1 text-cosmic-200">
            <div>• Multi-dimensional shielding</div>
            <div>• Consciousness protection</div>
            <div>• Energy field integrity</div>
            <div>• Spiritual sovereignty</div>
          </div>
        </div>
      </div>

      {/* Shield Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {protectionShields.map((shield) => (
          <motion.div
            key={shield.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              selectedShield === shield.id 
                ? 'bg-cosmic-800/50 border-cosmic-500' 
                : 'bg-cosmic-900/30 border-cosmic-700 hover:bg-cosmic-800/30'
            }`}
            onClick={() => onShieldSelect?.(selectedShield === shield.id ? "" : shield.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-5 h-5 rounded-full border-2 border-white/20"
                style={{ backgroundColor: shield.color }}
              />
              <div>
                <h4 className="text-white font-medium text-sm">{shield.name}</h4>
                <div className="text-xs text-cosmic-400">{shield.layers} layers</div>
              </div>
            </div>
            
            <p className="text-xs text-cosmic-200 mb-2">{shield.description}</p>
            
            <div className="text-xs text-cosmic-300">
              <strong>Activation:</strong> {shield.activation}
            </div>
            
            {selectedShield === shield.id && (
              <motion.div 
                className="mt-3 pt-3 border-t border-cosmic-600 text-xs text-cosmic-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                This protection shield operates across {shield.layers} dimensional layers, 
                creating a comprehensive defense matrix against negative energies, entities, 
                and consciousness intrusions.
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Protection Techniques */}
      <div className="bg-cosmic-900/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Protection Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shieldTechniques.map((technique, index) => (
            <div key={index} className="p-4 bg-cosmic-800/30 rounded-lg">
              <h4 className="text-white font-medium mb-2">{technique.name}</h4>
              <p className="text-sm text-cosmic-200 mb-2">{technique.description}</p>
              <div className="text-xs text-cosmic-300">
                <strong>Visualization:</strong> {technique.visualization}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activation Instructions */}
      <div className="bg-cosmic-900/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Shield Activation Protocol</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-cosmic-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">1</div>
            <h4 className="text-white font-medium mb-1">Intention</h4>
            <p className="text-xs text-cosmic-200">Set clear protection intention</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-cosmic-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">2</div>
            <h4 className="text-white font-medium mb-1">Invocation</h4>
            <p className="text-xs text-cosmic-200">Speak activation commands</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-cosmic-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">3</div>
            <h4 className="text-white font-medium mb-1">Visualization</h4>
            <p className="text-xs text-cosmic-200">See shields forming around you</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-cosmic-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">4</div>
            <h4 className="text-white font-medium mb-1">Integration</h4>
            <p className="text-xs text-cosmic-200">Feel the protection active</p>
          </div>
        </div>
      </div>
    </div>
  );
}