import { motion } from "framer-motion";

interface EnhancedHumanAnatomyProps {
  showChakras?: boolean;
  showAnatomy?: boolean;
  showEnergyChannels?: boolean;
  className?: string;
}

// Golden ratio proportions for authentic human figure
const GOLDEN_RATIO = 1.618;
const PHI_INVERSE = 0.618;

export function EnhancedHumanAnatomy({ 
  showChakras = true, 
  showAnatomy = true, 
  showEnergyChannels = true,
  className = ""
}: EnhancedHumanAnatomyProps) {
  
  return (
    <svg
      viewBox="0 0 200 300"
      className={`w-full h-full ${className}`}
      style={{ opacity: 0.7 }}
    >
      <defs>
        <radialGradient id="energyGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(255,215,0,0.8)" />
          <stop offset="100%" stopColor="rgba(255,215,0,0.1)" />
        </radialGradient>
        <linearGradient id="channelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="50%" stopColor="rgba(255,215,0,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
        </linearGradient>
      </defs>

      {showAnatomy && (
        <g stroke="rgba(255,215,0,0.6)" strokeWidth="1.5" fill="none">
          {/* Head - φ proportion (total height / 8) */}
          <circle cx="100" cy="25" r="18" />
          
          {/* Neck - precise anatomical positioning */}
          <line x1="100" y1="43" x2="100" y2="52" />
          
          {/* Shoulders - φ ratio width */}
          <line x1="68" y1="55" x2="132" y2="55" />
          
          {/* Clavicles */}
          <line x1="78" y1="52" x2="122" y2="52" />
          
          {/* Arms - proper anatomical length */}
          <line x1="68" y1="55" x2="55" y2="85" />
          <line x1="55" y1="85" x2="45" y2="115" />
          <line x1="132" y1="55" x2="145" y2="85" />
          <line x1="145" y1="85" x2="155" y2="115" />
          
          {/* Torso - golden ratio proportions */}
          <line x1="100" y1="52" x2="100" y2="155" />
          
          {/* Ribcage - accurate chest cavity */}
          <ellipse cx="100" cy="85" rx="25" ry="35" opacity="0.4" />
          
          {/* Heart area - anatomically correct position */}
          <circle cx="95" cy="80" r="8" opacity="0.3" fill="rgba(255,100,100,0.2)" />
          
          {/* Solar plexus area */}
          <circle cx="100" cy="105" r="6" opacity="0.3" fill="rgba(255,255,0,0.2)" />
          
          {/* Diaphragm */}
          <ellipse cx="100" cy="120" rx="22" ry="4" opacity="0.3" />
          
          {/* Waist - natural waistline */}
          <line x1="85" y1="135" x2="115" y2="135" />
          
          {/* Pelvis - accurate hip structure */}
          <ellipse cx="100" cy="155" rx="18" ry="12" opacity="0.4" />
          
          {/* Sacrum area - important for root chakra */}
          <ellipse cx="100" cy="162" rx="8" ry="10" opacity="0.3" fill="rgba(255,0,0,0.2)" />
          
          {/* Legs - proper proportional length (φ ratio) */}
          <line x1="88" y1="167" x2="80" y2="220" />
          <line x1="80" y1="220" x2="75" y2="270" />
          <line x1="112" y1="167" x2="120" y2="220" />
          <line x1="120" y1="220" x2="125" y2="270" />
          
          {/* Knees - anatomical joint markers */}
          <circle cx="80" cy="220" r="3" opacity="0.4" />
          <circle cx="120" cy="220" r="3" opacity="0.4" />
          
          {/* Feet */}
          <ellipse cx="75" cy="275" rx="8" ry="4" />
          <ellipse cx="125" cy="275" rx="8" ry="4" />
        </g>
      )}

      {showEnergyChannels && (
        <g>
          {/* Central Channel - Sushumna */}
          <motion.line 
            x1="100" y1="15" 
            x2="100" y2="280" 
            stroke="url(#channelGradient)" 
            strokeWidth="3"
            strokeDasharray="4,4"
            animate={{ strokeDashoffset: [0, 8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Ida Nadi - Left channel (lunar/feminine) */}
          <motion.path 
            d="M100,20 Q85,40 100,60 Q115,80 100,100 Q85,120 100,140 Q115,160 100,180 Q85,200 100,220 Q115,240 100,260"
            stroke="rgba(255,182,193,0.6)" 
            strokeWidth="2" 
            fill="none"
            strokeDasharray="2,3"
            animate={{ strokeDashoffset: [0, 5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Pingala Nadi - Right channel (solar/masculine) */}
          <motion.path 
            d="M100,20 Q115,40 100,60 Q85,80 100,100 Q115,120 100,140 Q85,160 100,180 Q115,200 100,220 Q85,240 100,260"
            stroke="rgba(255,215,0,0.6)" 
            strokeWidth="2" 
            fill="none"
            strokeDasharray="2,3"
            animate={{ strokeDashoffset: [0, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Energy vortex at major points */}
          {[25, 52, 80, 105, 135, 162, 190].map((y, index) => (
            <motion.circle
              key={index}
              cx="100"
              cy={y}
              r="4"
              fill="url(#energyGlow)"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </g>
      )}

      {showChakras && (
        <g>
          {/* Chakra positions with authentic anatomical placement and PHI spacing */}
          {[
            { id: 8, name: "Higher Heart", y: 70, color: "#FFD700" }, // Gold (8D)
            { id: 7, name: "Crown", y: 35, color: "#9370DB" }, // Violet (7D)
            { id: 6, name: "Third Eye", y: 48, color: "#4B0082" }, // Indigo (6D)
            { id: 5, name: "Throat", y: 62, color: "#1E90FF" }, // Blue (5D)
            { id: 4, name: "Heart", y: 88, color: "#32CD32" }, // Green (4D)
            { id: 3, name: "Solar Plexus", y: 115, color: "#FFD700" }, // Yellow (3D)
            { id: 2, name: "Sacral", y: 148, color: "#FF8C00" }, // Orange (2D)
            { id: 1, name: "Root", y: 182, color: "#DC143C" } // Red (1D)
          ].map((chakra, idx) => (
            <g key={idx}>
              <motion.circle 
                cx="100" cy={chakra.y} r="5" 
                fill={chakra.color} opacity="0.9" 
                stroke="rgba(255,255,255,0.8)" strokeWidth="1"
                filter="url(#energyGlow)"
                animate={{ 
                  scale: [1, 1.25, 1],
                  filter: ["brightness(1) blur(1px)", "brightness(1.5) blur(2px)", "brightness(1) blur(1px)"]
                }}
                transition={{ duration: 2.618, repeat: Infinity, delay: idx * 0.3 }}
              />
              
              {/* PHI-spaced Labels with improved legibility */}
              <g>
                <rect 
                  x="115" y={chakra.y - 8} 
                  width={chakra.name.length * 6 + 12} height="16" 
                  rx="4" fill="rgba(5, 5, 5, 0.85)" 
                  stroke={chakra.color} strokeWidth="0.5"
                  strokeOpacity="0.4"
                />
                <text 
                  x="121" y={chakra.y + 3} 
                  fill="white" fontSize="8" fontWeight="bold"
                  className="tracking-tight"
                >
                  {chakra.name}
                </text>
              </g>
            </g>
          ))}
        </g>
      )}

      {/* Aura field outline */}
      <ellipse 
        cx="100" 
        cy="150" 
        rx="60" 
        ry="120" 
        fill="none" 
        stroke="rgba(255,255,255,0.2)" 
        strokeWidth="1" 
        strokeDasharray="3,3"
      />
      
      {/* Energy field layers */}
      <ellipse 
        cx="100" 
        cy="150" 
        rx="80" 
        ry="140" 
        fill="none" 
        stroke="rgba(255,215,0,0.1)" 
        strokeWidth="0.5" 
        strokeDasharray="5,5"
      />
    </svg>
  );
}