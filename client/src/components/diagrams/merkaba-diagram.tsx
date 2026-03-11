import { motion } from "framer-motion";
import { useState } from "react";

interface MerkabaDiagramProps {
  showRotation?: boolean;
  showLayers?: boolean;
  interactive?: boolean;
  className?: string;
}

// Merkaba structure based on sacred geometry
const merkabaLayers = [
  { name: 'Physical Merkaba', color: '#ff6600', speed: 1, direction: 1 },
  { name: 'Emotional Merkaba', color: '#ffdd33', speed: 1.2, direction: -1 },
  { name: 'Mental Merkaba', color: '#33ff66', speed: 1.4, direction: 1 },
  { name: 'Spiritual Merkaba', color: '#3366ff', speed: 1.6, direction: -1 },
  { name: 'Cosmic Merkaba', color: '#9966ff', speed: 1.8, direction: 1 },
  { name: 'Universal Merkaba', color: '#ffffff', speed: 2, direction: -1 }
];

export function MerkabaDiagram({
  showRotation = true,
  showLayers = true,
  interactive = true,
  className = ""
}: MerkabaDiagramProps) {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [rotationSpeed, setRotationSpeed] = useState(1);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Main Merkaba Visualization */}
      <div className="relative bg-gradient-radial from-cosmic-900 to-cosmic-950 rounded-lg p-6 min-h-[500px]">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        >
          <defs>
            {/* Gradient definitions for each layer */}
            {merkabaLayers.map((layer, index) => (
              <radialGradient key={`merkaba-grad-${index}`} id={`merkaba-gradient-${index}`} cx="50%" cy="50%">
                <stop offset="0%" stopColor={layer.color} stopOpacity="0.8" />
                <stop offset="50%" stopColor={layer.color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={layer.color} stopOpacity="0.1" />
              </radialGradient>
            ))}
            
            <filter id="merkaba-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Central point */}
          <circle cx="100" cy="100" r="2" fill="rgba(255,255,255,0.9)" />

          {/* Merkaba layers - Star Tetrahedrons */}
          {merkabaLayers.map((layer, layerIndex) => {
            const size = 30 + layerIndex * 8;
            const opacity = showLayers ? 0.7 - layerIndex * 0.1 : layerIndex === 0 ? 0.8 : 0.3;
            
            return (
              <g key={layerIndex}>
                {/* Upper tetrahedron (pointing up) */}
                <motion.polygon
                  points={`100,${100-size} ${100-size*0.866},${100+size*0.5} ${100+size*0.866},${100+size*0.5}`}
                  fill={`url(#merkaba-gradient-${layerIndex})`}
                  stroke={layer.color}
                  strokeWidth="1"
                  opacity={opacity}
                  filter="url(#merkaba-glow)"
                  className={interactive ? "cursor-pointer" : ""}
                  onClick={() => interactive && setSelectedLayer(layerIndex)}
                  animate={showRotation ? {
                    rotate: layer.direction > 0 ? [0, 360] : [360, 0]
                  } : {}}
                  transition={showRotation ? {
                    duration: 4 / (layer.speed * rotationSpeed),
                    repeat: Infinity,
                    ease: "linear"
                  } : {}}
                  style={{ originX: "100px", originY: "100px" }}
                />
                
                {/* Lower tetrahedron (pointing down) */}
                <motion.polygon
                  points={`100,${100+size} ${100-size*0.866},${100-size*0.5} ${100+size*0.866},${100-size*0.5}`}
                  fill={`url(#merkaba-gradient-${layerIndex})`}
                  stroke={layer.color}
                  strokeWidth="1"
                  opacity={opacity}
                  filter="url(#merkaba-glow)"
                  className={interactive ? "cursor-pointer" : ""}
                  onClick={() => interactive && setSelectedLayer(layerIndex)}
                  animate={showRotation ? {
                    rotate: layer.direction > 0 ? [360, 0] : [0, 360]
                  } : {}}
                  transition={showRotation ? {
                    duration: 4 / (layer.speed * rotationSpeed),
                    repeat: Infinity,
                    ease: "linear"
                  } : {}}
                  style={{ originX: "100px", originY: "100px" }}
                />

                {/* Layer identifier dots */}
                {Array.from({ length: 6 }, (_, dotIndex) => {
                  const angle = (dotIndex * 60) * (Math.PI / 180);
                  const dotRadius = size + 5;
                  const x = 100 + Math.cos(angle) * dotRadius;
                  const y = 100 + Math.sin(angle) * dotRadius;
                  
                  return (
                    <motion.circle
                      key={`dot-${layerIndex}-${dotIndex}`}
                      cx={x}
                      cy={y}
                      r="1.5"
                      fill={layer.color}
                      opacity={opacity}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [opacity * 0.5, opacity, opacity * 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: layerIndex * 0.2 + dotIndex * 0.1
                      }}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Energy flow lines */}
          {showRotation && (
            <>
              {/* Vertical axis */}
              <motion.line
                x1="100" y1="20"
                x2="100" y2="180"
                stroke="rgba(255,215,0,0.6)"
                strokeWidth="2"
                strokeDasharray="4,4"
                animate={{ strokeDashoffset: [0, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Horizontal energy rings */}
              {[60, 100, 140].map((y, index) => (
                <motion.circle
                  key={`ring-${index}`}
                  cx="100"
                  cy={y}
                  r={20 + index * 5}
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  animate={{ rotate: [0, 360] }}
                  transition={{ 
                    duration: 6 + index * 2, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ originX: "100px", originY: `${y}px` }}
                />
              ))}
            </>
          )}
        </svg>

        {/* Control Panel */}
        <div className="absolute top-4 right-4 bg-cosmic-900/80 rounded-lg p-3 space-y-2">
          <h4 className="text-white font-semibold text-sm">Merkaba Controls</h4>
          
          {interactive && (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-cosmic-200 text-xs">Speed:</span>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  className="w-16"
                />
              </div>
              
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedLayer(null)}
                  className="block w-full text-xs bg-cosmic-800 hover:bg-cosmic-700 text-white px-2 py-1 rounded"
                >
                  Show All
                </button>
              </div>
            </>
          )}
          
          <div className="text-xs text-cosmic-300">
            {showRotation ? 'Rotating' : 'Static'} • {showLayers ? 'All Layers' : 'Single Layer'}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-cosmic-900/80 rounded-lg p-3 text-xs">
          <h4 className="text-white font-semibold mb-2">Sacred Geometry</h4>
          <div className="space-y-1 text-cosmic-200">
            <div>• Star Tetrahedron</div>
            <div>• Counter-rotating fields</div>
            <div>• Multi-dimensional vehicle</div>
            <div>• Light body activation</div>
          </div>
        </div>
      </div>

      {/* Layer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {merkabaLayers.map((layer, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              selectedLayer === index 
                ? 'bg-cosmic-800/50 border-cosmic-500' 
                : 'bg-cosmic-900/30 border-cosmic-700 hover:bg-cosmic-800/30'
            }`}
            onClick={() => setSelectedLayer(selectedLayer === index ? null : index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: layer.color }}
              />
              <h4 className="text-white font-medium text-sm">{layer.name}</h4>
            </div>
            
            <div className="text-xs text-cosmic-300 space-y-1">
              <div>Speed: {layer.speed}x</div>
              <div>Direction: {layer.direction > 0 ? 'Clockwise' : 'Counter-clockwise'}</div>
              <div>Layer: {index + 1} of {merkabaLayers.length}</div>
            </div>
            
            {selectedLayer === index && (
              <motion.div 
                className="mt-3 pt-3 border-t border-cosmic-600 text-xs text-cosmic-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                This merkaba layer represents the {layer.name.toLowerCase()} and rotates at {layer.speed}x speed. 
                It creates a {layer.direction > 0 ? 'masculine' : 'feminine'} energy field that contributes to 
                your multidimensional light body vehicle.
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Activation Instructions */}
      <div className="bg-cosmic-900/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Merkaba Activation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-2">Breathing Pattern</h4>
            <div className="space-y-2 text-sm text-cosmic-200">
              <div>1. Inhale for 7 counts</div>
              <div>2. Hold for 7 counts</div>
              <div>3. Exhale for 7 counts</div>
              <div>4. Hold empty for 7 counts</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-2">Visualization</h4>
            <div className="space-y-2 text-sm text-cosmic-200">
              <div>• See upper tetrahedron spinning clockwise</div>
              <div>• See lower tetrahedron spinning counter-clockwise</div>
              <div>• Feel the energy field expanding around you</div>
              <div>• Maintain love and gratitude frequency</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}