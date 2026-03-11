import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HarmonicUniversesDiagramProps {
  interactive?: boolean;
}

const harmonicUniverses = [
  { 
    id: 1, 
    name: 'HU-1', 
    identity: 'Incarnate', 
    matter: 'Gross Physical', 
    location: 'Earth',
    dimensions: ['1D', '2D', '3D'],
    color: '#DC143C',
    radius: 40
  },
  { 
    id: 2, 
    name: 'HU-2', 
    identity: 'Soul', 
    matter: 'Semi-Etheric', 
    location: 'Tara',
    dimensions: ['4D', '5D', '6D'],
    color: '#32CD32',
    radius: 70
  },
  { 
    id: 3, 
    name: 'HU-3', 
    identity: 'Oversoul', 
    matter: 'Etheric', 
    location: 'Gaia',
    dimensions: ['7D', '8D', '9D'],
    color: '#9370DB',
    radius: 100
  },
  { 
    id: 4, 
    name: 'HU-4', 
    identity: 'Avatar', 
    matter: 'Liquid Light', 
    location: 'Aramatena',
    dimensions: ['10D', '11D', '12D'],
    color: '#00008B',
    radius: 130
  },
  { 
    id: 5, 
    name: 'HU-5', 
    identity: 'Rishi', 
    matter: 'Ante-Matter', 
    location: 'Cosmic Trinity',
    dimensions: ['13D', '14D', '15D'],
    color: '#FF99CC',
    radius: 160
  }
];

export function HarmonicUniversesDiagram({ interactive = true }: HarmonicUniversesDiagramProps) {
  const [selectedHU, setSelectedHU] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-3xl bg-cosmic-950/50 border border-white/10 p-8">
      <div className="text-center mb-8">
        <h4 className="text-2xl font-sacred font-bold text-white tracking-widest uppercase">The 15-Dimensional Time Matrix</h4>
        <p className="text-cosmic-300 text-sm mt-2">5 Harmonic Universes of Consciousness Evolution</p>
      </div>

      <div className="relative aspect-square flex items-center justify-center">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full max-w-[350px]"
        >
          <defs>
            {harmonicUniverses.map(hu => (
              <radialGradient key={`hu-grad-${hu.id}`} id={`hu-grad-${hu.id}`} cx="50%" cy="50%">
                <stop offset="0%" stopColor={hu.color} stopOpacity="0.05" />
                <stop offset="100%" stopColor={hu.color} stopOpacity="0.2" />
              </radialGradient>
            ))}
          </defs>

          {/* Nested Universes */}
          {harmonicUniverses.slice().reverse().map((hu) => {
            const isSelected = selectedHU === hu.id;
            const opacity = selectedHU === null ? 1 : isSelected ? 1 : 0.2;

            return (
              <motion.g 
                key={hu.id}
                className={interactive ? "cursor-pointer" : ""}
                onClick={() => setSelectedHU(isSelected ? null : hu.id)}
                animate={{ opacity }}
                transition={{ duration: 0.5 }}
              >
                {/* Circle boundary */}
                <motion.circle
                  cx="200" cy="200" r={hu.radius}
                  fill={`url(#hu-grad-${hu.id})`}
                  stroke={hu.color}
                  strokeWidth={isSelected ? "3" : "1"}
                  strokeDasharray={hu.id === 5 ? "5,5" : "0"}
                  animate={isSelected ? {
                    scale: [1, 1.02, 1],
                    strokeWidth: [3, 5, 3]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Dimension Ticks */}
                {hu.dimensions.map((dim, idx) => {
                  const angle = (idx * 30) - 15; // Spread around the arc
                  const x = 200 + hu.radius * Math.cos(angle * Math.PI / 180);
                  const y = 200 + hu.radius * Math.sin(angle * Math.PI / 180);
                  return (
                    <text
                      key={`${hu.id}-${dim}`}
                      x={x + (angle > 0 ? 5 : -15)}
                      y={y}
                      fill="white"
                      fontSize="8"
                      className="font-bold opacity-60"
                    >
                      {dim}
                    </text>
                  );
                })}

                {/* Label */}
                <text
                  x="205"
                  y={200 - hu.radius + 12}
                  fill={hu.color}
                  fontSize="10"
                  fontWeight="bold"
                  className="tracking-tighter uppercase opacity-80"
                >
                  {hu.name}
                </text>
              </motion.g>
            );
          })}

          {/* Central Point - Source */}
          <circle cx="200" cy="200" r="4" fill="white" className="animate-pulse" />
        </svg>

        {/* Floating HU Info */}
        <AnimatePresence>
          {selectedHU && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-48 p-5 glass-panel border border-sacred-gold/40 rounded-2xl z-50 shadow-2xl"
            >
              {(() => {
                const hu = harmonicUniverses.find(h => h.id === selectedHU)!;
                return (
                  <div className="space-y-3">
                    <h5 className="text-white font-sacred font-bold text-xl">{hu.name}</h5>
                    <div className="space-y-1">
                      <p className="text-[10px] text-sacred-gold uppercase font-bold">Identity</p>
                      <p className="text-sm text-white font-medium">{hu.identity}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-sacred-gold uppercase font-bold">Matter Level</p>
                      <p className="text-xs text-cosmic-200">{hu.matter}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-sacred-gold uppercase font-bold">Planetary Station</p>
                      <p className="text-xs text-cosmic-200">{hu.location}</p>
                    </div>
                    <div className="flex gap-1 pt-2">
                      {hu.dimensions.map(d => (
                        <Badge key={d} className="bg-white/10 text-[10px] py-0 px-1.5">{d}</Badge>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 grid grid-cols-5 gap-2">
        {harmonicUniverses.map(hu => (
          <button
            key={hu.id}
            onClick={() => setSelectedHU(hu.id)}
            className={`py-2 rounded-lg text-[10px] font-bold transition-all border ${
              selectedHU === hu.id 
                ? 'bg-white text-cosmic-950 border-white' 
                : 'bg-white/5 text-cosmic-400 border-white/10 hover:bg-white/10'
            }`}
          >
            {hu.name}
          </button>
        ))}
      </div>
    </div>
  );
}