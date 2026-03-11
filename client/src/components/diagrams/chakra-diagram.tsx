import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { chakraData, getChakraColors } from "@/lib/chakra-data";

interface ChakraDiagramProps {
  selectedChakra?: string | null;
  onChakraSelect?: (chakraId: string) => void;
  showLabels?: boolean;
  interactive?: boolean;
}

export function ChakraDiagram({
  selectedChakra,
  onChakraSelect,
  showLabels = true,
  interactive = true
}: ChakraDiagramProps) {
  const [hoveredChakra, setHoveredChakra] = useState<number | null>(null);

  const chakras = chakraData;

  const getChakraPosition = (chakraId: number) => {
    const chakra = chakraData.find(c => c.id === chakraId);
    return chakra?.position || { x: 50, y: 50 };
  };

  const chakraColors = getChakraColors();

  const getChakraColor = (chakraId: number) => {
    return chakraColors[chakraId as keyof typeof chakraColors] || "hsl(0, 0%, 50%)";
  };

  const isActive = (chakraId: number) => {
    return selectedChakra === String(chakraId) || hoveredChakra === chakraId;
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* SVG Chakra Diagram */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        style={{ aspectRatio: '1/1.2', maxHeight: '500px' }}
      >
        {/* Body outline */}
        <path
          d="M 50 20 
             Q 48 22 48 25
             L 48 30
             Q 47 35 45 40
             L 45 50
             Q 46 55 47 60
             L 48 70
             Q 48 75 49 80
             L 50 90
             Q 50 92 52 92
             Q 50 92 50 90
             L 52 80
             Q 52 75 52 70
             L 53 60
             Q 54 55 55 50
             L 55 40
             Q 53 35 52 30
             L 52 25
             Q 52 22 50 20 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.5"
          className="transition-all duration-300"
        />

        {/* Central Energy Channel (Sushumna) */}
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          stroke="url(#centralChannelGradient)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />

        <defs>
          <linearGradient id="centralChannelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 215, 0, 0)" />
            <stop offset="10%" stopColor="rgba(255, 215, 0, 0.3)" />
            <stop offset="50%" stopColor="rgba(255, 215, 0, 0.6)" />
            <stop offset="90%" stopColor="rgba(255, 215, 0, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
          </linearGradient>
        </defs>

        {/* Chakra points */}
        {chakras.map((chakra, index) => {
          const position = getChakraPosition(chakra.id);
          const active = isActive(chakra.id);
          const radius = active ? 3.5 : (chakra.category === 'physical' ? 2.5 : 2);

          return (
            <g key={chakra.id}>
              {/* Chakra glow effect - different animations for physical vs morphogenetic */}
              {active && (
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={radius * 2}
                  fill={getChakraColor(chakra.id)}
                  opacity={chakra.category === 'physical' ? "0.4" : "0.3"}
                  className={chakra.category === 'physical' ? "animate-pulse" : "animate-spin"}
                  style={chakra.category === 'physical' ? {
                    animationDuration: "var(--anim-slow)",
                    animationTimingFunction: "var(--ease-golden)"
                  } : {
                    animationDuration: "var(--anim-epic)",
                    animationTimingFunction: "linear"
                  }}
                />
              )}

              {/* Main chakra circle */}
              <circle
                cx={position.x}
                cy={position.y}
                r={radius}
                fill={getChakraColor(chakra.id)}
                stroke={active ? "#ffffff" : "rgba(255, 255, 255, 0.3)"}
                strokeWidth={active ? "0.5" : "0.2"}
                className={`chakra-point ${interactive ? 'cursor-pointer hover:opacity-80 touch-manipulation' : ''
                  }`}
                onClick={() => interactive && onChakraSelect?.(String(chakra.id))}
                onMouseEnter={() => interactive && setHoveredChakra(chakra.id)}
                onMouseLeave={() => interactive && setHoveredChakra(null)}
              />

              {/* Enhanced chakra symbol with different animations for physical vs morphogenetic */}
              <circle
                cx={position.x}
                cy={position.y}
                r={radius * 0.4}
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="0.2"
                className={active ? (chakra.category === 'physical' ? 'animate-pulse' : 'animate-spin') : ''}
                style={active ? {
                  animationDuration: chakra.category === 'physical' ? 'var(--anim-medium)' : 'var(--anim-epic)',
                  animationTimingFunction: chakra.category === 'physical' ? 'var(--ease-golden)' : 'linear',
                  animationDirection: chakra.category !== 'physical' && index % 2 === 0 ? 'reverse' : 'normal'
                } : {}}
              >
                {/* Additional rotation animation for physical chakras */}
                {active && chakra.id <= 7 && (
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from={`0 ${position.x} ${position.y}`}
                    to={`360 ${position.x} ${position.y}`}
                    dur="6s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>

              {/* Energy lines connecting physical chakras */}
              {chakra.id < 7 && (
                <line
                  x1={position.x}
                  y1={position.y}
                  x2={getChakraPosition(chakra.id + 1).x}
                  y2={getChakraPosition(chakra.id + 1).y}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="0.2"
                  className="chakra-point"
                />
              )}

              {/* Connection lines from morphogenetic/avatar to physical chakras */}
              {chakra.category !== 'physical' && (
                <line
                  x1={position.x}
                  y1={position.y}
                  x2={50}
                  y2={55}
                  stroke="rgba(255, 215, 0, 0.1)"
                  strokeWidth="0.1"
                  strokeDasharray="2,2"
                  className="chakra-point"
                />
              )}

              {/* Chakra labels - positioned to avoid overlap */}
              {showLabels && active && (
                <g>
                  {/* Label background for better readability */}
                  <rect
                    x={position.x < 50 ? position.x - 12 : position.x + 5}
                    y={position.y - 2}
                    width={chakra.name.length * 1.8}
                    height="4"
                    fill="rgba(0, 0, 0, 0.7)"
                    rx="1"
                    ry="1"
                  />
                  <text
                    x={position.x < 50 ? position.x - 10 : position.x + 7}
                    y={position.y + 1}
                    fill="white"
                    fontSize="2.5"
                    fontWeight="bold"
                    className="drop-shadow-sm"
                    style={{
                      filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.8))',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {chakra.name.replace(' Chakra', '')}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Energy flow visualization */}
        {selectedChakra && (
          <g>
            {chakras.map((_, index) => {
              const position = getChakraPosition(index);
              return (
                <circle
                  key={`energy-${index}`}
                  cx={position.x}
                  cy={position.y}
                  r="1"
                  fill="rgba(255, 255, 255, 0.6)"
                  className="animate-ping"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: '2s'
                  }}
                />
              );
            })}
          </g>
        )}
      </svg>

      {/* Selected Chakra Info */}
      {selectedChakra && (
        <Card className="mt-4 sacred-card border border-sacred-gold/40">
          <CardContent className="p-4">
            {(() => {
              const chakra = chakras.find(c => String(c.id) === selectedChakra);
              if (!chakra) return null;

              return (
                <div className="text-center">
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-3"
                    style={{ backgroundColor: chakra.color }}
                  />
                  <h4 className="font-semibold text-sacred-gold mb-2">
                    {chakra.name}
                  </h4>
                  <div className="flex justify-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs border-cosmic-500/30">
                      {chakra.dimension}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-cosmic-500/30">
                      {chakra.function}
                    </Badge>
                  </div>
                  <p className="text-cosmic-300 text-sm">
                    {chakra.description}
                  </p>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}