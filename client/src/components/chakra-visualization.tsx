import { useState, useEffect, useRef } from "react";
import { Interactive3DVisualBase } from "@/components/interactive-3d-visual-base";
import { chakraData, getChakraColors, type ChakraData } from "@/lib/chakra-data";
import { motion, AnimatePresence } from "framer-motion";
import { useAdvancedAnimations } from "@/lib/advanced-animations";
import { sacredColorPalettes } from "@/lib/visual-design-system";

interface ChakraVisualizationProps {
  selectedChakra?: ChakraData | null;
  onChakraSelect: (chakra: ChakraData) => void;
}

export function ChakraVisualization({ selectedChakra, onChakraSelect }: ChakraVisualizationProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const chakraColors = getChakraColors();
  const { createParticleSystem, createEnergyField } = useAdvancedAnimations();
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger particle effects on selection
  useEffect(() => {
    if (selectedChakra && containerRef.current) {
      // Clear previous canvases if any (handled by system but good to be aware)
      createParticleSystem(containerRef.current, {
        count: 50,
        size: 2,
        speed: 1.5,
        color: chakraColors[selectedChakra.id as keyof typeof chakraColors],
        opacity: 0.6,
        lifeSpan: 100,
        gravity: -0.05, // Slight upward float
        turbulence: 0.5
      });

      createEnergyField(containerRef.current, 0.3);
    }
  }, [selectedChakra, createParticleSystem, createEnergyField, chakraColors]);

  // Vitruvian man style SVG with chakra positioning
  const VitruvianBody = () => {
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 900" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="sacred-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="bodyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: sacredColorPalettes.cosmic.accent, stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        {/* Sacred Geometry Background - Flower of Life element */}
        <g opacity="0.1" stroke={sacredColorPalettes.cosmic.accent} strokeWidth="0.5" fill="none">
          <circle cx="300" cy="450" r="150" />
          <circle cx="300" cy="300" r="150" />
          <circle cx="300" cy="600" r="150" />
          <circle cx="150" cy="450" r="150" />
          <circle cx="450" cy="450" r="150" />
        </g>

        {/* Central energy channel - Sushumna Nadi with PHI proportions */}
        <motion.line
          x1="300" y1="50" x2="300" y2="850"
          stroke={sacredColorPalettes.cosmic.accent}
          strokeWidth="2.5"
          filter="url(#sacred-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Vitruvian Man Body Outline - PHI Ratio centered */}
        <g stroke={sacredColorPalettes.cosmic.accent} strokeWidth="1.2" fill="none" filter="url(#sacred-glow)">
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {/* Proportional Head */}
            <circle cx="300" cy="110" r="38" />
            
            {/* Torso - Heart area aligned with PHI */}
            <path d="M 260 150 Q 300 140, 340 150 L 350 350 Q 300 370, 250 350 Z" opacity="0.4" />
            
            {/* Arms at Golden Ratio extension */}
            <path d="M 260 160 L 150 200 M 340 160 L 450 200" strokeWidth="2" opacity="0.6" />
            
            {/* Legs with PHI length */}
            <path d="M 270 350 L 240 750 M 330 350 L 360 750" strokeWidth="2" opacity="0.6" />
          </motion.g>
        </g>

        {/* Crystalline Core at feet */}
        <motion.circle
          cx="300" cy="800" r="40"
          fill="none" stroke={sacredColorPalettes.cosmic.accent}
          strokeWidth="0.5" strokeDasharray="5,5"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    );
  };

  const ChakraPoint = ({ chakra }: { chakra: ChakraData }) => {
    const isSelected = selectedChakra?.id === chakra.id;
    const isHovered = hoveredId === chakra.id;
    const color = chakraColors[chakra.id as keyof typeof chakraColors];
    
    // Size hierarchy based on Golden Ratio (PHI ~ 1.618)
    const size = chakra.category === 'physical' ? 45 : chakra.category === 'morphogenetic' ? 34 : 26;

    return (
      <div
        className="chakra-container absolute z-10"
        style={{
          left: `${chakra.position.x}%`,
          top: `${chakra.position.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: isSelected ? 50 : isHovered ? 40 : 10,
        }}
        onMouseEnter={() => setHoveredId(chakra.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => onChakraSelect(chakra)}
        data-testid={`chakra-${chakra.id}`}
      >
        {/* Helper glow for selection/hover */}
        <AnimatePresence>
          {(isHovered || isSelected) && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [1.2, 1.618, 1.2], // PHI expansion
                opacity: [0.6, 0.3, 0.6]
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{
                duration: 2.618, // PHI duration
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                inset: `${-size / 1.618}px`, // PHI inset
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                borderRadius: '50%',
                pointerEvents: 'none',
                filter: 'blur(8px)'
              }}
            />
          )}
        </AnimatePresence>

        {/* Main chakra point */}
        <motion.button
          whileHover={{ scale: 1.25, filter: 'brightness(1.5)' }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: isSelected ? 1.2 : 1,
            boxShadow: isSelected || isHovered
              ? `0 0 30px ${color}, inset 0 0 10px ${color}`
              : `0 0 10px ${color}66`,
            borderColor: isSelected ? sacredColorPalettes.cosmic.accent : 'rgba(255, 255, 255, 0.5)'
          }}
          className="relative focus:outline-none rounded-full flex items-center justify-center font-bold transition-colors"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: chakra.category === 'physical'
              ? `radial-gradient(circle at 30% 30%, ${color}, #000)`
              : `rgba(0,0,0,0.6)`,
            borderWidth: '2px',
            borderStyle: 'solid',
            color: '#fff',
            fontSize: size > 35 ? '12px' : '10px',
            textShadow: '0 0 4px #000'
          }}
          title={`${chakra.id}. ${chakra.name}`}
        >
          {chakra.id}
        </motion.button>

        {/* Chakra label on hover */}
        <AnimatePresence>
          {(isHovered || isSelected) && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 5, x: "-50%" }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: '-45px',
                left: '50%',
                background: 'rgba(5, 5, 5, 0.95)',
                color: color,
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 100,
                border: `1px solid ${color}`,
                boxShadow: `0 4px 12px rgba(0,0,0,0.8), 0 0 15px ${color}44`
              }}
            >
              {chakra.name}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <Interactive3DVisualBase
      title="15-Chakra System - Energetic Anatomy"
      subtitle="Complete energy center map with Vitruvian body structure - 7 physical + 8 morphogenetic chakras"
      layerCount={15}
      autoRotate={false}
      showControls={true}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden"
      >
        <VitruvianBody />

        {/* Chakra points overlay */}
        <div className="absolute inset-0 w-full h-full" style={{ perspective: '1000px' }}>
          {chakraData.map((chakra) => (
            <ChakraPoint key={chakra.id} chakra={chakra} />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="glass-panel absolute bottom-5 right-5 p-4 rounded-xl border border-sacred-gold/30 bg-cosmic-950/80 backdrop-blur-md max-w-[200px]"
        >
          <div className="font-sacred text-sacred-gold mb-2 text-xs uppercase tracking-wider">Chakra Categories</div>
          <div className="space-y-2 text-xs text-cosmic-200">
            <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></span>Physical (1-7)</div>
            <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-2 shadow-[0_0_5px_rgba(168,85,247,0.8)]"></span>Morphogenetic (8-9)</div>
            <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>Avatar (10-15)</div>
          </div>
        </motion.div>
      </div>
    </Interactive3DVisualBase>
  );
}
