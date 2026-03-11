import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { lightbodyLayers, LightbodyLayer } from "@/lib/lightbody-data";
import { motion, AnimatePresence } from "framer-motion";

interface LightbodyDiagramProps {
  selectedLayer?: string | null;
  onLayerSelect?: (layerId: string) => void;
  showFrequencies?: boolean;
  interactive?: boolean;
}

export function LightbodyDiagram({
  selectedLayer,
  onLayerSelect,
  showFrequencies = false,
  interactive = true
}: LightbodyDiagramProps) {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const isActive = (layerId: string) => {
    return selectedLayer === layerId || hoveredLayer === layerId;
  };

  const getLayerRadius = (index: number) => {
    return 15 + (index * 8); // Progressive expansion
  };

  const getLayerOpacity = (index: number, isActive: boolean) => {
    if (isActive) return 0.4;
    return Math.max(0.1, 0.3 - (index * 0.02));
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* SVG Lightbody Diagram */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        style={{ aspectRatio: '1/1' }}
      >
        <defs>
          {/* Gradients for each layer */}
          {lightbodyLayers.map((layer) => (
            <radialGradient key={`gradient-${layer.id}`} id={`gradient-${layer.id}`} cx="50%" cy="50%">
              <stop offset="0%" stopColor={layer.color} stopOpacity="0.1" />
              <stop offset="70%" stopColor={layer.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={layer.color} stopOpacity="0.1" />
            </radialGradient>
          ))}

          {/* Glow filter */}
          <filter id="lightbodyGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Anatomically accurate human figure with golden ratio proportions */}
        <g opacity="0.7" stroke="rgba(255,215,0,0.4)" strokeWidth="0.3" fill="rgba(255,255,255,0.2)">
          {/* Head - φ proportion */}
          <circle cx="50" cy="25" r="3.2" />
          {/* Neck */}
          <line x1="50" y1="28.2" x2="50" y2="31" />
          {/* Shoulders - golden ratio width */}
          <line x1="42" y1="33" x2="58" y2="33" />
          {/* Arms anatomically positioned */}
          <line x1="42" y1="33" x2="38" y2="50" />
          <line x1="58" y1="33" x2="62" y2="50" />
          {/* Torso - correct proportions */}
          <line x1="50" y1="31" x2="50" y2="55" />
          {/* Ribcage outline */}
          <ellipse cx="50" cy="40" rx="6" ry="8" fill="none" />
          {/* Waist */}
          <line x1="45" y1="55" x2="55" y2="55" />
          {/* Pelvis */}
          <ellipse cx="50" cy="58" rx="4" ry="3" fill="none" />
          {/* Legs - proper length proportions */}
          <line x1="47" y1="61" x2="45" y2="80" />
          <line x1="53" y1="61" x2="55" y2="80" />
          {/* Central channel - authentic placement */}
          <line x1="50" y1="22" x2="50" y2="82" stroke="rgba(255,215,0,0.6)" strokeWidth="0.5" strokeDasharray="1,1" />
        </g>

        {/* Lightbody layers */}
        {lightbodyLayers.map((layer, index) => {
          const active = isActive(layer.id);
          const radius = getLayerRadius(index);
          const opacity = getLayerOpacity(index, active);

          return (
            <motion.g key={layer.id} initial={false}>
              {/* Layer aura */}
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                fill={`url(#gradient-${layer.id})`}
                stroke={layer.color}
                strokeWidth={active ? "0.3" : "0.1"}
                strokeOpacity={active ? "0.8" : "0.3"}
                fillOpacity={opacity}
                className={`transition-colors duration-300 ${interactive ? 'cursor-pointer hover:stroke-opacity-100' : ''
                  }`}
                onClick={() => interactive && onLayerSelect?.(layer.id)}
                onMouseEnter={() => interactive && setHoveredLayer(layer.id)}
                onMouseLeave={() => interactive && setHoveredLayer(null)}
                filter={active ? "url(#lightbodyGlow)" : "none"}
                animate={{
                  scale: active ? 1.05 : 1,
                  opacity: 1
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Energy patterns */}
              <AnimatePresence>
                {active && (
                  <g className="pointer-events-none">
                    {/* Rotating energy circles */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={radius * 0.8}
                      fill="none"
                      stroke={layer.color}
                      strokeWidth="0.2"
                      strokeOpacity="0.6"
                      strokeDasharray="2,2"
                      initial={{ opacity: 0, rotate: 0 }}
                      animate={{ opacity: 1, rotate: 360 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={radius * 0.6}
                      fill="none"
                      stroke={layer.color}
                      strokeWidth="0.15"
                      strokeOpacity="0.4"
                      strokeDasharray="1,3"
                      initial={{ opacity: 0, rotate: 0 }}
                      animate={{ opacity: 1, rotate: -360 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                  </g>
                )}
              </AnimatePresence>

              {/* Layer label */}
              <AnimatePresence>
                {active && (
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="pointer-events-none"
                  >
                    <text
                      x="50"
                      y={50 - radius - 2}
                      fill={layer.color}
                      fontSize="2.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ textShadow: "0px 0px 4px rgba(0,0,0,0.8)" }}
                    >
                      {layer.name}
                    </text>
                    {showFrequencies && (
                      <text
                        x="50"
                        y={50 - radius + 1}
                        fill="rgba(255,255,255,0.8)"
                        fontSize="1.5"
                        textAnchor="middle"
                        className="drop-shadow-sm"
                      >
                        {layer.dimension}
                      </text>
                    )}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Connection points */}
              {active && layer.connections && (
                <g className="pointer-events-none">
                  {layer.connections.map((_connection: string, connectionIndex: number) => (
                    <motion.circle
                      key={`${layer.id}-connection-${connectionIndex}`}
                      cx={50 + Math.cos(connectionIndex * Math.PI / 3) * (radius * 0.7)}
                      cy={50 + Math.sin(connectionIndex * Math.PI / 3) * (radius * 0.7)}
                      r="0.8"
                      fill={layer.color}
                      opacity="0.8"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, delay: connectionIndex * 0.2 }}
                    />
                  ))}
                </g>
              )}
            </motion.g>
          );
        })}

        {/* Central core */}
        <motion.circle
          cx="50"
          cy="50"
          r="2"
          fill="rgba(255,255,255,0.8)"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Energy flow indicators */}
        {selectedLayer && (
          <g className="pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.circle
                key={`flow-${i}`}
                cx={50 + Math.cos(i * Math.PI / 4) * 8}
                cy={50 + Math.sin(i * Math.PI / 4) * 8}
                r="0.5"
                fill="rgba(255,255,255,0.8)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 2] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </g>
        )}
      </svg>

      {/* Selected Layer Info */}
      <AnimatePresence mode="wait">
        {selectedLayer && (
          <motion.div
            key="info-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-4 glass-panel border border-sacred-gold/40">
              <CardContent className="p-4">
                {(() => {
                  const layer = lightbodyLayers.find((l: LightbodyLayer) => l.id === selectedLayer);
                  if (!layer) return null;

                  return (
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full mx-auto mb-3 border-2 border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        style={{ backgroundColor: layer.color }}
                      />
                      <h4 className="font-sacred font-semibold text-white mb-2 text-lg">
                        {layer.name}
                      </h4>
                      <div className="flex justify-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-200">
                          Layer {lightbodyLayers.indexOf(layer) + 1}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-200">
                          {layer.dimension}
                        </Badge>
                      </div>
                      <p className="text-cosmic-200 text-sm">
                        {layer.description}
                      </p>
                      {layer.connections && (
                        <div className="mt-3">
                          <p className="text-cosmic-400 text-xs">
                            Connects to: {layer.connections.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}