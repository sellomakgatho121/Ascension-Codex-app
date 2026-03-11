import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { treeGridSpheres, treeGridPaths } from "@/lib/spiritual-content";

interface TreeGridDiagramProps {
  selectedSphere?: number | null;
  onSphereSelect?: (sphereId: number) => void;
  showPaths?: boolean;
  interactive?: boolean;
}

export function TreeGridDiagram({
  selectedSphere,
  onSphereSelect,
  showPaths = true,
  interactive = true
}: TreeGridDiagramProps) {
  const [hoveredSphere, setHoveredSphere] = useState<number | null>(null);

  const isActive = (sphereId: number) => {
    return selectedSphere === sphereId || hoveredSphere === sphereId;
  };

  const getSphereById = (id: number) => {
    return treeGridSpheres.find(s => s.id === id);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* SVG Tree of Life Diagram */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Background sacred geometry */}
        <defs>
          <radialGradient id="sphereGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Paths between spheres */}
        {showPaths && treeGridPaths.map((path, index) => {
          const fromSphere = getSphereById(path.from);
          const toSphere = getSphereById(path.to);
          if (!fromSphere || !toSphere) return null;

          const isPathActive = isActive(path.from) || isActive(path.to);

          return (
            <motion.line
              key={`path-${index}`}
              x1={fromSphere.position.x}
              y1={fromSphere.position.y}
              x2={toSphere.position.x}
              y2={toSphere.position.y}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: isPathActive ? 0.8 : 0.2,
                strokeWidth: isPathActive ? 1 : 0.3
              }}
              transition={{ duration: 1.5, delay: index * 0.05 }}
              stroke={isPathActive ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.3)"}
            />
          );
        })}

        {/* Tree spheres */}
        {treeGridSpheres.map((sphere) => {
          const active = isActive(sphere.id);

          return (
            <motion.g
              key={sphere.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + Math.random() * 0.5 }}
              style={{ cursor: interactive ? 'pointer' : 'default' }}
              onClick={() => interactive && onSphereSelect?.(sphere.id)}
              onMouseEnter={() => interactive && setHoveredSphere(sphere.id)}
              onMouseLeave={() => interactive && setHoveredSphere(null)}
            >
              {/* Sphere glow effect */}
              <AnimatePresence>
                {active && (
                  <motion.circle
                    cx={sphere.position.x}
                    cy={sphere.position.y}
                    r={8}
                    fill={sphere.color}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1.2 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
                    filter="url(#glow)"
                    className="pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Main sphere */}
              <motion.circle
                cx={sphere.position.x}
                cy={sphere.position.y}
                r={3.5}
                fill={sphere.color}
                animate={{
                  scale: active ? 1.2 : 1,
                  stroke: active ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
                  strokeWidth: active ? 0.8 : 0.3
                }}
                whileHover={{ scale: 1.3 }}
                style={{ filter: 'url(#sphereGradient)' }}
              />

              {/* Inner sacred symbol (Rotating ring) */}
              <motion.circle
                cx={sphere.position.x}
                cy={sphere.position.y}
                r={active ? 1.5 : 0}
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="0.3"
                animate={{ rotate: 360, opacity: active ? 1 : 0 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                style={{ originX: "50%", originY: "50%" }}
              />

              {/* Sphere labels */}
              {active && (
                <g className="pointer-events-none">
                  <text
                    x={sphere.position.x}
                    y={sphere.position.y - 6}
                    fill="#ffffff"
                    fontSize="2.5"
                    fontWeight="bold"
                    textAnchor="middle"
                    style={{ textShadow: '0px 0px 3px rgba(0,0,0,0.8)' }}
                  >
                    {sphere.name}
                  </text>
                  <text
                    x={sphere.position.x}
                    y={sphere.position.y + 8}
                    fill={sphere.color}
                    fontSize="1.8"
                    textAnchor="middle"
                    style={{ textShadow: '0px 0px 2px rgba(0,0,0,0.8)' }}
                  >
                    {sphere.dimension}
                  </text>
                </g>
              )}
            </motion.g>
          );
        })}

        {/* Three Kathara Pillars */}
        <g opacity="0.6" className="pointer-events-none">
          {/* Left Pillar - Magnetic/Feminine */}
          <motion.line 
            x1="25" y1="5" x2="25" y2="95" 
            stroke="#ff3366" strokeWidth="0.2" strokeDasharray="2,2" 
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
          />
          <text x="25" y="4" fill="#ff3366" fontSize="2.5" fontWeight="bold" textAnchor="middle" className="tracking-tighter uppercase">MAGNETIC</text>

          {/* Central Pillar - Christ Consciousness */}
          <motion.line 
            x1="50" y1="2" x2="50" y2="98" 
            stroke="#ffdd33" strokeWidth="0.3" strokeDasharray="3,1" 
            initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
          />
          <text x="50" y="3" fill="#ffdd33" fontSize="3" fontWeight="bold" textAnchor="middle" className="tracking-widest uppercase">CHRIST</text>

          {/* Right Pillar - Electrical/Masculine */}
          <motion.line 
            x1="75" y1="5" x2="75" y2="95" 
            stroke="#3366ff" strokeWidth="0.2" strokeDasharray="2,2" 
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
          />
          <text x="75" y="4" fill="#3366ff" fontSize="2.5" fontWeight="bold" textAnchor="middle" className="tracking-tighter uppercase">ELECTRICAL</text>
        </g>
      </svg>

      {/* Selected Sphere Info */}
      <AnimatePresence mode="wait">
        {selectedSphere && (
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
                  const sphere = getSphereById(selectedSphere);
                  if (!sphere) return null;

                  return (
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-10 h-10 rounded-full mx-auto mb-3 border-2 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        style={{ backgroundColor: sphere.color }}
                      />
                      <h4 className="font-sacred font-semibold text-white mb-2 text-lg">
                        {sphere.name}
                      </h4>
                      <div className="flex justify-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-200">
                          {sphere.dimension}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-200">
                          Sephirah
                        </Badge>
                      </div>
                      <p className="text-cosmic-200 text-sm">
                        {sphere.function}
                      </p>
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