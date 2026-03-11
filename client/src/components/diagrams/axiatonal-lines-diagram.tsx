import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getChakraColors } from "@/lib/chakra-data";

interface AxiatonalLinesDiagramProps {
  interactive?: boolean;
}

const axiatonalLines = [
  { id: 1, side: 'right', color: '#DC143C', dimension: '1D', identity: 'Physical' },
  { id: 2, side: 'left', color: '#FF8C00', dimension: '2D', identity: 'Emotional' },
  { id: 3, side: 'center', color: '#FFD700', dimension: '3D', identity: 'Mental' },
  { id: 4, side: 'right', color: '#32CD32', dimension: '4D', identity: 'Astral' },
  { id: 5, side: 'left', color: '#1E90FF', dimension: '5D', identity: 'Archetype' },
  { id: 6, side: 'center', color: '#4B0082', dimension: '6D', identity: 'Celestial' },
  { id: 7, side: 'right', color: '#9370DB', dimension: '7D', identity: 'Ketheric' },
  { id: 8, side: 'left', color: '#FFD700', dimension: '8D', identity: 'Monadic' },
  { id: 9, side: 'center', color: '#C0C0C0', dimension: '9D', identity: 'Keriatric' },
  { id: 10, side: 'right', color: '#00008B', dimension: '10D', identity: 'Christiac' },
  { id: 11, side: 'left', color: '#2F4F4F', dimension: '11D', identity: 'Buddhic' },
  { id: 12, side: 'center', color: '#FFFFFF', dimension: '12D', identity: 'Nirvanic' }
];

export function AxiatonalLinesDiagram({ interactive = true }: AxiatonalLinesDiagramProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const chakraColors = getChakraColors();

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 200 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Human Silhouette */}
        <g opacity="0.3" stroke="white" strokeWidth="0.5" fill="none">
          <circle cx="100" cy="40" r="12" />
          <path d="M 100 52 L 100 150 M 70 70 L 130 70 M 70 70 L 60 130 M 130 70 L 140 130 M 85 150 L 80 250 M 115 150 L 120 250" />
        </g>

        {/* Axiatonal Lines */}
        {axiatonalLines.map((line) => {
          const isSelected = selectedLine === line.id;
          const xPos = line.side === 'left' ? 70 - (line.id * 2) : line.side === 'right' ? 130 + (line.id * 2) : 100;
          const opacity = selectedLine === null ? 0.4 : isSelected ? 1 : 0.1;

          return (
            <motion.g 
              key={line.id}
              className={interactive ? "cursor-pointer" : ""}
              onClick={() => setSelectedLine(isSelected ? null : line.id)}
            >
              {/* The vertical line */}
              <motion.line
                x1={xPos}
                y1="20"
                x2={xPos}
                y2="280"
                stroke={line.color}
                strokeWidth={isSelected ? "2" : "0.8"}
                strokeOpacity={opacity}
                filter={isSelected ? "url(#lineGlow)" : "none"}
                animate={isSelected ? {
                  strokeDasharray: ["1,10", "10,1"],
                  strokeDashoffset: [0, -20]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Energy frequency "nodes" along the line */}
              {[60, 100, 140, 180, 220].map((y, idx) => (
                <motion.circle
                  key={`${line.id}-node-${idx}`}
                  cx={xPos}
                  cy={y}
                  r={isSelected ? 2 : 1}
                  fill={line.color}
                  opacity={opacity}
                  animate={isSelected ? {
                    scale: [1, 2, 1],
                    opacity: [0.5, 1, 0.5]
                  } : {}}
                  transition={{ duration: 1.5, delay: idx * 0.2, repeat: Infinity }}
                />
              ))}
            </motion.g>
          );
        })}
      </svg>

      {/* Info Panel */}
      <AnimatePresence>
        {selectedLine && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-0 right-0 w-48 p-4 glass-panel border border-sacred-gold/30 rounded-xl"
          >
            {(() => {
              const line = axiatonalLines.find(l => l.id === selectedLine)!;
              return (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line.color }} />
                    <span className="text-white font-bold text-sm">Line {line.id}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-white/20 text-cosmic-200">
                    {line.dimension} - {line.identity}
                  </Badge>
                  <p className="text-[10px] text-cosmic-300 leading-tight">
                    Frequency line supplying the {line.id}D DNA strand and corresponding identity level.
                  </p>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 text-center">
        <p className="text-xs text-cosmic-400 font-medium italic">
          Click a line to isolate its frequency path and identity connection.
        </p>
      </div>
    </div>
  );
}