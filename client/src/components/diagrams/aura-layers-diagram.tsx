import { motion } from "framer-motion";
import { useState } from "react";

interface AuraLayersDiagramProps {
  selectedLayer?: number | null;
  onLayerSelect?: (layer: number) => void;
  showEnergyFlow?: boolean;
  interactive?: boolean;
  className?: string;
}

// 7 Main auric layers based on spiritual teachings
const auraLayers = [
  {
    id: 1,
    name: 'Etheric Body',
    color: '#ff4444',
    distance: 2,
    description: 'Physical vitality and life force energy',
    function: 'Health, vitality, physical sensations',
    thickness: 1.5
  },
  {
    id: 2,
    name: 'Emotional Body',
    color: '#ff8844',
    distance: 8,
    description: 'Emotional states and feelings',
    function: 'Emotions, desires, moods, relationships',
    thickness: 6
  },
  {
    id: 3,
    name: 'Mental Body',
    color: '#ffdd44',
    distance: 18,
    description: 'Thoughts, beliefs, and mental patterns',
    function: 'Thoughts, ideas, mental processes, learning',
    thickness: 10
  },
  {
    id: 4,
    name: 'Astral Body',
    color: '#44ff44',
    distance: 30,
    description: 'Bridge between physical and spiritual',
    function: 'Love, relationships, spiritual connection',
    thickness: 12
  },
  {
    id: 5,
    name: 'Etheric Template',
    color: '#44ddff',
    distance: 45,
    description: 'Blueprint for the physical form',
    function: 'Divine will, higher purpose, communication',
    thickness: 15
  },
  {
    id: 6,
    name: 'Celestial Body',
    color: '#4444ff',
    distance: 65,
    description: 'Unconditional love and spiritual ecstasy',
    function: 'Intuition, celestial love, spiritual sight',
    thickness: 20
  },
  {
    id: 7,
    name: 'Ketheric Template',
    color: '#8844ff',
    distance: 90,
    description: 'Connection to divine mind and universal knowledge',
    function: 'Higher knowing, divine connection, life purpose',
    thickness: 25
  }
];

export function AuraLayersDiagram({
  selectedLayer,
  onLayerSelect,
  showEnergyFlow = true,
  interactive = true,
  className = ""
}: AuraLayersDiagramProps) {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [energyIntensity, setEnergyIntensity] = useState(1);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Main Aura Visualization */}
      <div className="relative bg-gradient-radial from-cosmic-900 via-cosmic-950 to-black rounded-lg p-6 min-h-[600px]">
        <svg
          viewBox="0 0 300 400"
          className="w-full h-full"
          style={{ minHeight: '500px' }}
        >
          <defs>
            {/* Gradient definitions for each aura layer */}
            {auraLayers.map((layer, index) => (
              <radialGradient key={`aura-grad-${layer.id}`} id={`aura-gradient-${layer.id}`} cx="50%" cy="50%">
                <stop offset="0%" stopColor={layer.color} stopOpacity="0.1" />
                <stop offset="50%" stopColor={layer.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={layer.color} stopOpacity="0.6" />
              </radialGradient>
            ))}
            
            <filter id="aura-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="energy-pulse">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Central human figure */}
          <g transform="translate(150, 200)">
            {/* Head */}
            <circle cx="0" cy="-80" r="12" fill="rgba(255,255,255,0.3)" stroke="rgba(255,215,0,0.6)" strokeWidth="1" />
            
            {/* Body */}
            <ellipse cx="0" cy="-30" rx="15" ry="50" fill="rgba(255,255,255,0.2)" stroke="rgba(255,215,0,0.6)" strokeWidth="1" />
            
            {/* Arms */}
            <ellipse cx="-20" cy="-40" rx="8" ry="25" fill="rgba(255,255,255,0.2)" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
            <ellipse cx="20" cy="-40" rx="8" ry="25" fill="rgba(255,255,255,0.2)" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
            
            {/* Legs */}
            <ellipse cx="-8" cy="40" rx="8" ry="35" fill="rgba(255,255,255,0.2)" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
            <ellipse cx="8" cy="40" rx="8" ry="35" fill="rgba(255,255,255,0.2)" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
            
            {/* Chakra points */}
            {[
              { y: -80, color: '#9370DB' }, // Crown
              { y: -70, color: '#4B0082' }, // Third Eye
              { y: -55, color: '#1E90FF' }, // Throat
              { y: -35, color: '#00FF00' }, // Heart
              { y: -15, color: '#FFD700' }, // Solar Plexus
              { y: 5, color: '#FF4500' },   // Sacral
              { y: 25, color: '#FF0000' }   // Root
            ].map((chakra, index) => (
              <motion.circle
                key={index}
                cx="0"
                cy={chakra.y}
                r="3"
                fill={chakra.color}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </g>

          {/* Aura layers */}
          {auraLayers.map((layer, index) => {
            const isVisible = selectedLayer === null || selectedLayer === layer.id;
            const isHighlighted = hoveredLayer === layer.id || selectedLayer === layer.id;
            const opacity = isVisible ? (isHighlighted ? 0.8 : 0.5) : 0.1;
            
            return (
              <g key={layer.id}>
                {/* Main aura layer */}
                <motion.ellipse
                  cx="150"
                  cy="200"
                  rx={50 + layer.distance}
                  ry={100 + layer.distance * 1.2}
                  fill={`url(#aura-gradient-${layer.id})`}
                  stroke={layer.color}
                  strokeWidth={isHighlighted ? "2" : "1"}
                  opacity={opacity}
                  filter="url(#aura-glow)"
                  className={interactive ? "cursor-pointer" : ""}
                  onClick={() => interactive && onLayerSelect?.(layer.id)}
                  onMouseEnter={() => setHoveredLayer(layer.id)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  animate={showEnergyFlow ? {
                    scale: [1, 1.02, 1],
                    opacity: [opacity * 0.8, opacity, opacity * 0.8]
                  } : {}}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Energy flow patterns */}
                {showEnergyFlow && isVisible && (
                  <>
                    {/* Vertical energy channels */}
                    <motion.line
                      x1="150"
                      y1={100 - layer.distance * 0.5}
                      x2="150"
                      y2={300 + layer.distance * 0.5}
                      stroke={layer.color}
                      strokeWidth="1"
                      opacity="0.4"
                      strokeDasharray="4,4"
                      animate={{ strokeDashoffset: [0, 8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Horizontal energy bands */}
                    {[-60, -20, 20, 60].map((yOffset, bandIndex) => (
                      <motion.ellipse
                        key={`band-${layer.id}-${bandIndex}`}
                        cx="150"
                        cy={200 + yOffset}
                        rx={30 + layer.distance * 0.8}
                        ry="5"
                        fill="none"
                        stroke={layer.color}
                        strokeWidth="0.5"
                        opacity="0.3"
                        strokeDasharray="2,2"
                        animate={{ 
                          strokeDashoffset: [0, 4],
                          scaleX: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3 + bandIndex * 0.5, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Layer label */}
                <text
                  x={150 + layer.distance + 55}
                  y={200 - layer.distance * 0.3}
                  fill={isHighlighted ? '#ffffff' : layer.color}
                  fontSize="8"
                  textAnchor="start"
                  fontWeight={isHighlighted ? "bold" : "normal"}
                >
                  {layer.name}
                </text>
                
                {/* Distance indicator */}
                <text
                  x={150 + layer.distance + 55}
                  y={200 - layer.distance * 0.3 + 10}
                  fill="rgba(255,255,255,0.6)"
                  fontSize="6"
                  textAnchor="start"
                >
                  {layer.distance}" from body
                </text>
              </g>
            );
          })}

          {/* Energy intensity control visualization */}
          {showEnergyFlow && (
            <motion.circle
              cx="150"
              cy="200"
              r="120"
              fill="none"
              stroke="rgba(255,215,0,0.3)"
              strokeWidth="2"
              strokeDasharray="8,8"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1 + energyIntensity * 0.1, 1]
              }}
              transition={{ 
                duration: 8 / energyIntensity, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ originX: "150px", originY: "200px" }}
            />
          )}
        </svg>

        {/* Control Panel */}
        <div className="absolute top-4 right-4 bg-cosmic-900/80 rounded-lg p-3 space-y-2">
          <h4 className="text-white font-semibold text-sm">Aura Controls</h4>
          
          {interactive && (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-cosmic-200 text-xs">Energy:</span>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={energyIntensity}
                  onChange={(e) => setEnergyIntensity(parseFloat(e.target.value))}
                  className="w-16"
                />
              </div>
              
              <button
                onClick={() => onLayerSelect?.(0)}
                className="block w-full text-xs bg-cosmic-800 hover:bg-cosmic-700 text-white px-2 py-1 rounded"
              >
                Show All Layers
              </button>
            </>
          )}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-cosmic-900/80 rounded-lg p-3 text-xs">
          <h4 className="text-white font-semibold mb-2">Auric Field</h4>
          <div className="space-y-1 text-cosmic-200">
            <div>• 7 main energy layers</div>
            <div>• Extends 3+ feet from body</div>
            <div>• Contains life experiences</div>
            <div>• Reflects health & emotions</div>
          </div>
        </div>
      </div>

      {/* Layer Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {auraLayers.map((layer) => (
          <motion.div
            key={layer.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              selectedLayer === layer.id 
                ? 'bg-cosmic-800/50 border-cosmic-500' 
                : 'bg-cosmic-900/30 border-cosmic-700 hover:bg-cosmic-800/30'
            }`}
            onClick={() => onLayerSelect?.(selectedLayer === layer.id ? 0 : layer.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-5 h-5 rounded-full border-2 border-white/20"
                style={{ backgroundColor: layer.color }}
              />
              <div>
                <h4 className="text-white font-medium text-sm">{layer.name}</h4>
                <div className="text-xs text-cosmic-400">Layer {layer.id} • {layer.distance}" distance</div>
              </div>
            </div>
            
            <p className="text-xs text-cosmic-200 mb-2">{layer.description}</p>
            
            <div className="text-xs text-cosmic-300">
              <strong>Function:</strong> {layer.function}
            </div>
            
            {selectedLayer === layer.id && (
              <motion.div 
                className="mt-3 pt-3 border-t border-cosmic-600 text-xs text-cosmic-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                This layer extends approximately {layer.distance} inches from the physical body and 
                has a thickness of about {layer.thickness} inches. It vibrates at a frequency that 
                corresponds to {layer.function.toLowerCase()}.
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Aura Reading Guide */}
      <div className="bg-cosmic-900/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Aura Reading Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Color Meanings</h4>
            <div className="space-y-2 text-sm text-cosmic-200">
              <div><span className="inline-block w-3 h-3 bg-red-500 rounded mr-2"></span>Energy, passion, anger</div>
              <div><span className="inline-block w-3 h-3 bg-orange-500 rounded mr-2"></span>Creativity, confidence, joy</div>
              <div><span className="inline-block w-3 h-3 bg-yellow-500 rounded mr-2"></span>Intellect, logic, clarity</div>
              <div><span className="inline-block w-3 h-3 bg-green-500 rounded mr-2"></span>Healing, growth, love</div>
              <div><span className="inline-block w-3 h-3 bg-blue-500 rounded mr-2"></span>Communication, truth, calm</div>
              <div><span className="inline-block w-3 h-3 bg-indigo-500 rounded mr-2"></span>Intuition, spirituality</div>
              <div><span className="inline-block w-3 h-3 bg-purple-500 rounded mr-2"></span>Divine connection, magic</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Health Indicators</h4>
            <div className="space-y-2 text-sm text-cosmic-200">
              <div>• Bright, vibrant colors = Good health</div>
              <div>• Muddy, dark colors = Blocked energy</div>
              <div>• Holes or tears = Energy leaks</div>
              <div>• Uneven edges = Emotional disturbance</div>
              <div>• Pulsing patterns = Active healing</div>
              <div>• Balanced layers = Spiritual alignment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}