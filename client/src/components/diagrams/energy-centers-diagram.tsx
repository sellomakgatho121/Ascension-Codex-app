import { motion } from "framer-motion";
import { useState } from "react";

interface EnergyCentersDiagramProps {
  selectedCenter?: string | null;
  onCenterSelect?: (centerId: string) => void;
  showEnergyFlow?: boolean;
  interactive?: boolean;
  className?: string;
}

// Major energy centers and spiritual anatomy based on ES teachings with golden ratio spacing
const energyCenters = [
  {
    id: 'pineal',
    name: 'Pineal Gland',
    position: { x: 100, y: 50 },
    labelOffset: { x: 25, y: -5 },
    color: '#9370DB',
    description: 'Third eye activation center, receives cosmic frequencies',
    function: 'Spiritual sight, intuition, cosmic communication'
  },
  {
    id: 'pituitary',
    name: 'Pituitary Gland',
    position: { x: 100, y: 58 },
    labelOffset: { x: 25, y: 2 },
    color: '#4B0082',
    description: 'Master endocrine gland, consciousness bridge',
    function: 'Hormonal regulation, consciousness states'
  },
  {
    id: 'alta-major',
    name: 'Alta Major Chakra',
    position: { x: 100, y: 42 },
    labelOffset: { x: -65, y: -2 },
    color: '#6A5ACD',
    description: 'Ancient memory access point at skull base',
    function: 'Past life memories, akashic records access'
  },
  {
    id: 'thymus',
    name: 'Thymus Gland',
    position: { x: 100, y: 80 },
    labelOffset: { x: 20, y: 0 },
    color: '#00CED1',
    description: 'Higher heart center, immune system regulator',
    function: 'Emotional immunity, unconditional love'
  },
  {
    id: 'adrenals',
    name: 'Adrenal Glands',
    position: { x: 90, y: 110 },
    labelOffset: { x: -60, y: 0 },
    color: '#FF6347',
    description: 'Fight-or-flight response, survival instincts',
    function: 'Stress response, physical vitality'
  },
  {
    id: 'gonads',
    name: 'Reproductive Glands',
    position: { x: 100, y: 135 },
    labelOffset: { x: 20, y: 0 },
    color: '#FF4500',
    description: 'Creative and sexual energy centers',
    function: 'Life force energy, creative manifestation'
  },
  {
    id: 'kidney-core',
    name: 'Kidney Energy Core',
    position: { x: 110, y: 110 },
    labelOffset: { x: 15, y: 0 },
    color: '#8B0000',
    description: 'Life essence storage, ancestral patterns',
    function: 'Vitality reserves, genetic memory'
  }
];

const energyChannels = [
  {
    name: 'Central Channel (Sushumna)',
    path: 'M100,30 L100,150',
    color: '#FFD700',
    description: 'Main vertical energy pathway'
  },
  {
    name: 'Left Channel (Ida)',
    path: 'M95,35 Q85,50 95,65 Q105,80 95,95 Q85,110 95,125 Q105,140 95,145',
    color: '#C0C0C0',
    description: 'Lunar, feminine, cooling energy'
  },
  {
    name: 'Right Channel (Pingala)',
    path: 'M105,35 Q115,50 105,65 Q95,80 105,95 Q115,110 105,125 Q95,140 105,145',
    color: '#FFA500',
    description: 'Solar, masculine, heating energy'
  }
];

export function EnergyCentersDiagram({
  selectedCenter,
  onCenterSelect,
  showEnergyFlow = true,
  interactive = true,
  className = ""
}: EnergyCentersDiagramProps) {
  const [hoveredCenter, setHoveredCenter] = useState<string | null>(null);
  const [energyIntensity, setEnergyIntensity] = useState(1);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Main Energy Centers Diagram */}
      <div className="relative bg-gradient-to-b from-cosmic-900 to-cosmic-950 rounded-lg p-6 min-h-[500px]">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        >
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </radialGradient>

            <filter id="energy-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Human silhouette outline */}
          <g stroke="rgba(255,215,0,0.3)" strokeWidth="1" fill="none">
            {/* Head */}
            <circle cx="100" cy="40" r="15" />
            {/* Neck */}
            <line x1="100" y1="55" x2="100" y2="65" />
            {/* Shoulders */}
            <line x1="80" y1="68" x2="120" y2="68" />
            {/* Torso */}
            <ellipse cx="100" cy="95" rx="20" ry="35" />
            {/* Arms */}
            <line x1="80" y1="70" x2="65" y2="110" />
            <line x1="120" y1="70" x2="135" y2="110" />
            {/* Pelvis */}
            <ellipse cx="100" cy="130" rx="15" ry="10" />
            {/* Legs */}
            <line x1="90" y1="140" x2="85" y2="180" />
            <line x1="110" y1="140" x2="115" y2="180" />
          </g>

          {/* Energy channels */}
          {showEnergyFlow && energyChannels.map((channel, index) => (
            <motion.path
              key={channel.name}
              d={channel.path}
              stroke={channel.color}
              strokeWidth="3"
              fill="none"
              opacity="0.8"
              strokeDasharray="4,4"
              initial={{ opacity: 0.8 }}
              animate={{ strokeDashoffset: [0, 8] }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          {/* Energy centers */}
          {energyCenters.map((center) => {
            const isSelected = selectedCenter === center.id;
            const isHovered = hoveredCenter === center.id;
            const isActive = isSelected || isHovered;

            return (
              <g key={center.id}>
                {/* Energy field */}
                <motion.circle
                  cx={center.position.x}
                  cy={center.position.y}
                  r={isActive ? "12" : "8"}
                  fill={center.color}
                  opacity={isActive ? 1 : 0.8}
                  className={interactive ? "cursor-pointer" : ""}
                  onClick={() => interactive && onCenterSelect?.(center.id)}
                  onMouseEnter={() => setHoveredCenter(center.id)}
                  onMouseLeave={() => setHoveredCenter(null)}
                  initial={{ scale: 1 }}
                  animate={showEnergyFlow ? {
                    scale: [1, 1.15, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: energyCenters.indexOf(center) * 0.3
                  }}
                />

                {/* Center core */}
                <circle
                  cx={center.position.x}
                  cy={center.position.y}
                  r="3"
                  fill="rgba(255,255,255,0.9)"
                />

                {/* Energy radiations */}
                {showEnergyFlow && isActive && (
                  <>
                    {Array.from({ length: 8 }, (_, i) => {
                      const angle = (i * 45) * (Math.PI / 180);
                      const startRadius = 12;
                      const endRadius = 20;
                      const x1 = center.position.x + Math.cos(angle) * startRadius;
                      const y1 = center.position.y + Math.sin(angle) * startRadius;
                      const x2 = center.position.x + Math.cos(angle) * endRadius;
                      const y2 = center.position.y + Math.sin(angle) * endRadius;

                      return (
                        <motion.line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={center.color}
                          strokeWidth="1"
                          opacity="0.4"
                          animate={{
                            opacity: [0, 0.8, 0],
                            strokeWidth: [0.5, 2, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                        />
                      );
                    })}
                  </>
                )}

                {/* Label with Background for legibility */}
                <g>
                  <rect
                    x={center.position.x + center.labelOffset.x - 2}
                    y={center.position.y + center.labelOffset.y - 8}
                    width={center.name.length * 5.2 + 8}
                    height="12"
                    rx="4"
                    fill="rgba(0,0,0,0.75)"
                    className="pointer-events-none shadow-xl"
                  />
                  <text
                    x={center.position.x + center.labelOffset.x + 2}
                    y={center.position.y + center.labelOffset.y + 1}
                    fill="white"
                    fontSize="7"
                    fontWeight="bold"
                    textAnchor="start"
                    className="pointer-events-none"
                  >
                    {center.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Chakra connection lines */}
          {showEnergyFlow && (
            <>
              {/* Vertical connections */}
              {energyCenters.slice(0, -1).map((center, index) => {
                const nextCenter = energyCenters[index + 1];
                if (!nextCenter) return null;
                return (
                  <motion.line
                    key={`connection-${index}`}
                    x1={center.position.x}
                    y1={center.position.y}
                    x2={nextCenter.position.x}
                    y2={nextCenter.position.y}
                    stroke="rgba(255,215,0,0.3)"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    animate={{ strokeDashoffset: [0, 4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                );
              })}
            </>
          )}
        </svg>

        {/* Control Panel */}
        <div className="absolute top-4 right-4 bg-cosmic-900/80 rounded-lg p-3 space-y-2">
          <h4 className="text-white font-semibold text-sm">Energy Flow</h4>

          {interactive && (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-cosmic-200 text-xs">Intensity:</span>
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
                onClick={() => onCenterSelect?.("")}
                className="block w-full text-xs bg-cosmic-800 hover:bg-cosmic-700 text-white px-2 py-1 rounded"
              >
                Show All Centers
              </button>
            </>
          )}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-cosmic-900/80 rounded-lg p-3 text-xs">
          <h4 className="text-white font-semibold mb-2">Spiritual Anatomy</h4>
          <div className="space-y-1 text-cosmic-200">
            <div>• Major energy centers</div>
            <div>• Endocrine system bridges</div>
            <div>• Consciousness gateways</div>
            <div>• Energy channel network</div>
          </div>
        </div>
      </div>

      {/* Energy Center Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {energyCenters.map((center) => (
          <motion.div
            key={center.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${selectedCenter === center.id
              ? 'bg-cosmic-800/50 border-cosmic-500'
              : 'bg-cosmic-900/30 border-cosmic-700 hover:bg-cosmic-800/30'
              }`}
            onClick={() => onCenterSelect?.(selectedCenter === center.id ? "" : center.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className="w-5 h-5 rounded-full border-2 border-white/20"
                style={{ backgroundColor: center.color }}
              />
              <h4 className="text-white font-medium text-sm">{center.name}</h4>
            </div>

            <p className="text-xs text-cosmic-200 mb-2">{center.description}</p>

            <div className="text-xs text-cosmic-300">
              <strong>Function:</strong> {center.function}
            </div>

            {selectedCenter === center.id && (
              <motion.div
                className="mt-3 pt-3 border-t border-cosmic-600 text-xs text-cosmic-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                This energy center is a key component of your spiritual anatomy, serving as a
                bridge between physical and subtle energy systems. Regular activation through
                meditation and energy work enhances its function.
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Energy Channel Information */}
      <div className="bg-cosmic-900/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Energy Channel System</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {energyChannels.map((channel, index) => (
            <div key={index} className="text-center">
              <div
                className="w-6 h-6 rounded-full mx-auto mb-2"
                style={{ backgroundColor: channel.color }}
              />
              <h4 className="text-white font-medium mb-2">{channel.name}</h4>
              <p className="text-sm text-cosmic-200">{channel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}