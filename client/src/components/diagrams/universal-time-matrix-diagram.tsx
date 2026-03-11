import { motion } from "framer-motion";
import { useState } from "react";
import { sacredColorPalettes } from "@/lib/visual-design-system";

interface UTMDiagramProps {
  selectedHU?: string | null;
  onHUSelect?: (huId: string) => void;
  interactive?: boolean;
  className?: string;
}

// Authentic Universal Time Matrix structure based on ES teachings
const harmonicUniverses = [
  {
    id: 'hu1',
    name: 'HU-1 (Matter Universe)',
    dimensions: ['1D Physical', '2D Emotional', '3D Mental'],
    colors: ['#cc0000', '#ff6600', '#ffdd33'],
    position: { x: 50, y: 85 },
    description: 'Dense matter reality, 3D Earth experience'
  },
  {
    id: 'hu2',
    name: 'HU-2 (Anti-Matter Universe)',
    dimensions: ['4D Astral', '5D Archetypal', '6D Celestial'],
    colors: ['#ff66cc', '#ff9933', '#33ff66'],
    position: { x: 50, y: 65 },
    description: 'Soul matrix, astral planes, archetypal realms'
  },
  {
    id: 'hu3',
    name: 'HU-3 (Light Matter Universe)',
    dimensions: ['7D Mental', '8D Monadic', '9D Avatar'],
    colors: ['#ffdd33', '#c7a2ff', '#3366ff'],
    position: { x: 50, y: 45 },
    description: 'Monad matrix, lightbody activation, avatar consciousness'
  },
  {
    id: 'hu4',
    name: 'HU-4 (Liquid Light Universe)',
    dimensions: ['10D Avatar', '11D Monadic', '12D Christ'],
    colors: ['#9966ff', '#c7a2ff', '#ffffff'],
    position: { x: 50, y: 25 },
    description: 'Avatar matrix, Christ consciousness, liquid light body'
  },
  {
    id: 'hu5',
    name: 'HU-5 (Plasma Light Universe)',
    dimensions: ['13D Mother Arc', '14D Solar', '15D Universal'],
    colors: ['#66ffff', '#ffdd77', '#ffffff'],
    position: { x: 50, y: 8 },
    description: 'Founder matrix, plasma light body, universal consciousness'
  }
];

const densityLevels = [
  { name: 'Density 1', dimensions: [1, 2, 3], color: '#ff4444' },
  { name: 'Density 2', dimensions: [4, 5, 6], color: '#44ff44' },
  { name: 'Density 3', dimensions: [7, 8, 9], color: '#4444ff' },
  { name: 'Density 4', dimensions: [10, 11, 12], color: '#ffff44' },
  { name: 'Density 5', dimensions: [13, 14, 15], color: '#ff44ff' }
];

export function UTMDiagram({
  selectedHU,
  onHUSelect,
  interactive = true,
  className = ""
}: UTMDiagramProps) {
  const [hoveredHU, setHoveredHU] = useState<string | null>(null);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Main UTM Diagram */}
      <div
        className="relative rounded-xl p-6 min-h-[500px] border border-white/10 overflow-hidden"
        style={{ background: `linear-gradient(to bottom, ${sacredColorPalettes.cosmic.background}, ${sacredColorPalettes.cosmic.surface})` }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10"
          style={{ minHeight: '400px' }}
        >
          <defs>
            {/* Gradient definitions for each HU */}
            {harmonicUniverses.map((hu, index) => (
              <radialGradient key={`grad-${hu.id}`} id={`gradient-${hu.id}`} cx="50%" cy="50%">
                <stop offset="0%" stopColor={hu.colors[0]} stopOpacity="0.8" />
                <stop offset="50%" stopColor={hu.colors[1]} stopOpacity="0.6" />
                <stop offset="100%" stopColor={hu.colors[2]} stopOpacity="0.4" />
              </radialGradient>
            ))}

            <filter id="utm-glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connected Flow Line - Time Matrix Pillar */}
          <motion.path
            d="M 50 10 L 50 90"
            stroke={sacredColorPalettes.cosmic.accent}
            strokeWidth="0.5"
            strokeDasharray="2 2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Animated Energy Pulse along the pillar */}
          <motion.circle
            r="1"
            fill={sacredColorPalettes.cosmic.accent}
            initial={{ cx: 50, cy: 90 }}
            animate={{ cy: 10 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            filter="url(#utm-glow)"
          />

          {/* Harmonic Universe spheres */}
          {harmonicUniverses.map((hu, index) => (
            <g key={hu.id}>
              {/* Connection Curves between HUs */}
              {index < harmonicUniverses.length - 1 && (
                <motion.path
                  d={`M 50 ${hu.position.y} C 30 ${hu.position.y - 10}, 30 ${harmonicUniverses[index + 1].position.y + 10}, 50 ${harmonicUniverses[index + 1].position.y}`}
                  fill="none"
                  stroke={hu.colors[2]}
                  strokeWidth="0.1"
                  opacity="0.3"
                  strokeDasharray="1 1"
                  animate={{ strokeDashoffset: [0, 2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              )}

              {/* HU container sphere */}
              <motion.ellipse
                cx={hu.position.x}
                cy={hu.position.y}
                rx="18"
                ry="8"
                fill={`url(#gradient-${hu.id})`}
                stroke={hoveredHU === hu.id ? '#ffffff' : hu.colors[1]}
                strokeWidth={hoveredHU === hu.id ? "0.3" : "0.1"}
                filter="url(#utm-glow)"
                className={interactive ? "cursor-pointer" : ""}
                onClick={() => interactive && onHUSelect?.(hu.id)}
                onMouseEnter={() => setHoveredHU(hu.id)}
                onMouseLeave={() => setHoveredHU(null)}
                animate={{
                  scale: hoveredHU === hu.id ? 1.05 : 1,
                  opacity: selectedHU === hu.id ? 1 : 0.9,
                  filter: hoveredHU === hu.id ? 'url(#utm-glow) brightness(1.2)' : 'url(#utm-glow)'
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Breathing animation for selected HU */}
              {selectedHU === hu.id && (
                <motion.ellipse
                  cx={hu.position.x}
                  cy={hu.position.y}
                  rx="18"
                  ry="8"
                  fill="none"
                  stroke={sacredColorPalettes.cosmic.accent}
                  strokeWidth="0.2"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Individual dimension points within each HU */}
              {hu.dimensions.map((dim, dimIndex) => (
                <motion.circle
                  key={`${hu.id}-${dimIndex}`}
                  cx={hu.position.x + (dimIndex - 1) * 6}
                  cy={hu.position.y}
                  r="1.5"
                  fill={hu.colors[dimIndex]}
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="0.1"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2 + dimIndex * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {/* HU labels */}
              <text
                x={hu.position.x + 20}
                y={hu.position.y + 1}
                fill="rgba(255,255,255,0.9)"
                fontSize="2.5"
                textAnchor="start"
                className="font-medium tracking-wide"
                style={{ textShadow: '0 0 5px rgba(0,0,0,0.5)' }}
              >
                {hu.name.split('(')[0]}
              </text>

              {/* Dimension labels */}
              <text
                x={hu.position.x + 20}
                y={hu.position.y + 4}
                fill="rgba(255,255,255,0.6)"
                fontSize="1.5"
                textAnchor="start"
              >
                {hu.dimensions.join(' • ')}
              </text>
            </g>
          ))}

          {/* Density level indicators on the right */}
          {densityLevels.map((density, index) => (
            <g key={`density-${index}`}>
              <rect
                x="85"
                y={85 - index * 20}
                width="12"
                height="15"
                fill={density.color}
                opacity="0.2"
                rx="2"
              />
              <text
                x="91"
                y={93 - index * 20}
                fill="rgba(255,255,255,0.8)"
                fontSize="1.5"
                textAnchor="middle"
              >
                D{index + 1}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md rounded-lg p-3 text-xs border border-white/20 z-20 max-w-[180px]">
          <h4 className="text-sacred-gold font-bold mb-1 tracking-tight">UNIVERSAL TIME MATRIX</h4>
          <div className="space-y-1 text-cosmic-200">
            <div className="flex items-center gap-1.5">• <span className="text-white">5</span> Harmonic Universes</div>
            <div className="flex items-center gap-1.5">• <span className="text-white">15</span> Dimensional Levels</div>
            <div className="flex items-center gap-1.5">• <span className="text-white">5</span> Density Planes</div>
            <div className="flex items-center gap-1.5">• Consciousness Evolution</div>
          </div>
        </div>
      </div>

      {/* HU Information Panel */}
      {selectedHU && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-xl rounded-xl p-6 border border-white/10"
        >
          {(() => {
            const hu = harmonicUniverses.find(h => h.id === selectedHU);
            return hu ? (
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">{hu.name}</h3>
                <p className="text-gray-300 mb-4">{hu.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  {hu.dimensions.map((dim, index) => (
                    <div key={index} className="text-center p-3 bg-white/5 rounded-lg border border-white/5">
                      <div
                        className="w-3 h-3 rounded-full mx-auto mb-2 shadow-[0_0_10px_currentColor]"
                        style={{ backgroundColor: hu.colors[index], color: hu.colors[index] }}
                      />
                      <div className="text-sm text-white font-medium">{dim}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}
        </motion.div>
      )}

      {/* Interactive Controls */}
      {interactive && (
        <div className="flex justify-center space-x-2 flex-wrap gap-y-2">
          {harmonicUniverses.map((hu, index) => (
            <button
              key={hu.id}
              onClick={() => onHUSelect?.(hu.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${selectedHU === hu.id
                  ? 'bg-sacred-gold text-black shadow-[0_0_15px_rgba(255,215,0,0.5)]'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
            >
              HU-{index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { UTMDiagram as UniversalTimeMatrixDiagram };