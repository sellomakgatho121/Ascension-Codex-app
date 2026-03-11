import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HaraLineDiagramProps {
  interactive?: boolean;
}

const templarPoints = [
  { id: 'earth-star', name: 'Earth Star', y: 260, color: '#FFFFFF', description: 'Anchors the 12D Christ mind into the planet.' },
  { id: 'tan-tien', name: 'Tan Tien', y: 180, color: '#FF8C00', description: 'Central storage of physical life force energy.' },
  { id: 'soul-seat', name: 'Soul Seat', y: 120, color: '#32CD32', description: 'The point of individual soul purpose and will.' },
  { id: 'thymus', name: 'Higher Heart (Thymus)', y: 100, color: '#FFD700', description: 'Seat of the Permanent Seed Atom.' },
  { id: 'atomic-doorway', name: 'Atomic Doorway (9D)', y: 60, color: '#C0C0C0', description: 'Portal between Soul and Oversoul matrix.' },
  { id: 'crown-gateway', name: 'Crown Gateway', y: 30, color: '#9370DB', description: 'Connection to higher multidimensional identities.' }
];

export function HaraLineDiagram({ interactive = true }: HaraLineDiagramProps) {
  const [selectedPoint, setSelectedLine] = useState<string | null>(null);
  const [frequencyFlow, setFrequencyFlow] = useState(1);

  return (
    <div className="relative w-full max-w-lg mx-auto p-6 bg-black/40 rounded-3xl border border-white/5 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-sacred-gold font-sacred font-bold text-lg uppercase tracking-tighter">The Hara Line</h4>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-cosmic-400 uppercase font-bold">Flow:</span>
          <input 
            type="range" min="0.5" max="3" step="0.5" 
            value={frequencyFlow} 
            onChange={(e) => setFrequencyFlow(parseFloat(e.target.value))}
            className="w-16 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-sacred-gold"
          />
        </div>
      </div>

      <svg
        viewBox="0 0 100 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="pointGlow">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
          <linearGradient id="haraGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* The Central Hara Line (The Laser Path) */}
        <motion.line
          x1="50" y1="10" x2="50" y2="290"
          stroke="url(#haraGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            strokeWidth: [3, 5, 3],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 3 / frequencyFlow, repeat: Infinity }}
        />

        {/* Internal Pulsing Current */}
        <motion.line
          x1="50" y1="10" x2="50" y2="290"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="2,10"
          animate={{ strokeDashoffset: [0, -40] }}
          transition={{ duration: 2 / frequencyFlow, repeat: Infinity, ease: "linear" }}
        />

        {/* Templar Points (Seals) */}
        {templarPoints.map((point, idx) => {
          const isSelected = selectedPoint === point.id;
          return (
            <motion.g 
              key={point.id}
              className={interactive ? "cursor-pointer" : ""}
              onClick={() => setSelectedLine(isSelected ? null : point.id)}
            >
              {/* Outer Seal Circle */}
              <motion.circle
                cx="50" cy={point.y} r={isSelected ? 10 : 6}
                fill="black"
                stroke={point.color}
                strokeWidth="1.5"
                animate={isSelected ? {
                  r: [10, 12, 10],
                  strokeWidth: [1.5, 3, 1.5]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Inner Core Point */}
              <motion.circle
                cx="50" cy={point.y} r={isSelected ? 4 : 2}
                fill={point.color}
                filter="url(#pointGlow)"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: isSelected ? [1, 1.5, 1] : 1
                }}
                transition={{ duration: 1.5, delay: idx * 0.3, repeat: Infinity }}
              />

              {/* Label */}
              <text
                x="65" y={point.y + 3}
                fill={isSelected ? point.color : "rgba(255,255,255,0.5)"}
                fontSize="6"
                fontWeight={isSelected ? "bold" : "normal"}
                className="font-medium tracking-tight pointer-events-none"
              >
                {point.name}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Selected Point Details */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10"
          >
            {(() => {
              const p = templarPoints.find(tp => tp.id === selectedPoint)!;
              return (
                <div className="space-y-1">
                  <h5 className="text-white font-bold text-sm">{p.name}</h5>
                  <p className="text-xs text-cosmic-200 leading-relaxed">{p.description}</p>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}