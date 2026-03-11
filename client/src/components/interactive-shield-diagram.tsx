/**
 * Interactive Shield Diagram - Shows accurate geometries for all 5 Hova Shields
 * with clickable shields that display detailed descriptions
 */

import { useState, useEffect, useCallback } from "react";
import { hovaShields, type HovaShield } from "@/lib/spiritual-content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Info, Shield, ArrowUp, ArrowDown } from "lucide-react";

interface InteractiveShieldDiagramProps {
  onShieldSelect?: (shield: HovaShield | null) => void;
  selectedShield?: HovaShield | null;
  showLabels?: boolean;
  animated?: boolean;
}

// Accurate geometry configurations for each shield layer
// Based on dimensional hierarchy: outer (highest) to inner (lowest)
const SHIELD_GEOMETRIES = [
  {
    id: "rishic",
    // Outermost - 13D-14D-15D - Universal consciousness
    rx: 175,
    ry: 230,
    strokeWidth: 4,
    pulseDelay: 0,
    labelPosition: { x: 350, y: 85 },
    arrowDirection: "up" as const,
  },
  {
    id: "maharata",
    // 10D-11D-12D - Avatar mind
    rx: 145,
    ry: 190,
    strokeWidth: 3.5,
    pulseDelay: 0.2,
    labelPosition: { x: 350, y: 140 },
    arrowDirection: "up" as const,
  },
  {
    id: "teuric",
    // 7D-8D-9D - Soul/Oversoul
    rx: 115,
    ry: 150,
    strokeWidth: 3,
    pulseDelay: 0.4,
    labelPosition: { x: 350, y: 195 },
    arrowDirection: "none" as const,
  },
  {
    id: "telluric",
    // 4D-5D-6D - Heart-centered
    rx: 85,
    ry: 110,
    strokeWidth: 2.5,
    pulseDelay: 0.6,
    labelPosition: { x: 350, y: 250 },
    arrowDirection: "down" as const,
  },
  {
    id: "doradic",
    // Innermost - 1D-2D-3D - Personality/Ego
    rx: 55,
    ry: 70,
    strokeWidth: 2,
    pulseDelay: 0.8,
    labelPosition: { x: 350, y: 305 },
    arrowDirection: "down" as const,
  },
];

// Create ordered shields array (from outermost to innermost as displayed)
const ORDERED_SHIELDS = [
  hovaShields.find(s => s.id === "rishic")!,
  hovaShields.find(s => s.id === "maharata")!,
  hovaShields.find(s => s.id === "teuric")!,
  hovaShields.find(s => s.id === "telluric")!,
  hovaShields.find(s => s.id === "doradic")!,
];

export function InteractiveShieldDiagram({
  onShieldSelect,
  selectedShield,
  showLabels = true,
  animated = true,
}: InteractiveShieldDiagramProps) {
  const [hoveredShield, setHoveredShield] = useState<string | null>(null);
  const [internalSelected, setInternalSelected] = useState<HovaShield | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Use internal or external state
  const activeShield = selectedShield !== undefined ? selectedShield : internalSelected;

  const handleShieldClick = useCallback((shield: HovaShield, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (activeShield?.id === shield.id) {
      // Deselect if clicking the same shield
      if (onShieldSelect) {
        onShieldSelect(null);
      } else {
        setInternalSelected(null);
      }
      setShowTooltip(false);
    } else {
      // Select the clicked shield
      if (onShieldSelect) {
        onShieldSelect(shield);
      } else {
        setInternalSelected(shield);
      }
      setTooltipPosition({ x: event.clientX, y: event.clientY });
      setShowTooltip(true);
    }
  }, [activeShield, onShieldSelect]);

  const handleCloseTooltip = useCallback(() => {
    if (onShieldSelect) {
      onShieldSelect(null);
    } else {
      setInternalSelected(null);
    }
    setShowTooltip(false);
  }, [onShieldSelect]);

  // Get geometry for a shield
  const getGeometry = (shieldId: string) => {
    return SHIELD_GEOMETRIES.find(g => g.id === shieldId);
  };

  return (
    <div className="relative w-full">
      {/* Main SVG Diagram */}
      <div className="relative flex flex-col lg:flex-row items-start gap-6">
        {/* Shield Visualization */}
        <div className="relative w-full lg:w-auto flex-shrink-0">
          <svg
            viewBox="0 0 400 400"
            className="w-full max-w-md mx-auto"
            style={{ minHeight: "350px" }}
          >
            <defs>
              {/* Glow filters for each shield color */}
              {ORDERED_SHIELDS.map((shield) => (
                <filter key={`glow-${shield.id}`} id={`glow-${shield.id}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
              
              {/* Selection glow */}
              <filter id="selection-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Background gradient */}
              <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>
            </defs>

            {/* Background glow */}
            <ellipse
              cx="200"
              cy="200"
              rx="180"
              ry="235"
              fill="url(#bg-gradient)"
            />

            {/* Render shields from outermost to innermost */}
            {ORDERED_SHIELDS.map((shield, index) => {
              const geometry = getGeometry(shield.id);
              if (!geometry) return null;

              const isHovered = hoveredShield === shield.id;
              const isSelected = activeShield?.id === shield.id;
              const isActive = isHovered || isSelected;

              return (
                <g key={shield.id}>
                  {/* Outer glow ring */}
                  <ellipse
                    cx="200"
                    cy="200"
                    rx={geometry.rx + 8}
                    ry={geometry.ry + 8}
                    fill="none"
                    stroke={shield.color}
                    strokeWidth={isActive ? 3 : 1}
                    opacity={isActive ? 0.5 : 0.2}
                    style={{
                      filter: `blur(${isActive ? 6 : 4}px)`,
                      transition: "all 0.3s ease-out",
                    }}
                  />

                  {/* Main shield ellipse - clickable */}
                  <ellipse
                    cx="200"
                    cy="200"
                    rx={geometry.rx}
                    ry={geometry.ry}
                    fill="none"
                    stroke={shield.color}
                    strokeWidth={isActive ? geometry.strokeWidth + 2 : geometry.strokeWidth}
                    opacity={isActive ? 1 : 0.8}
                    filter={isSelected ? "url(#selection-glow)" : `url(#glow-${shield.id})`}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      animation: animated ? `pulse-shield ${3 + index * 0.5}s ease-in-out infinite` : 'none',
                      animationDelay: `${geometry.pulseDelay}s`,
                    }}
                    onClick={(e) => handleShieldClick(shield, e)}
                    onMouseEnter={() => setHoveredShield(shield.id)}
                    onMouseLeave={() => setHoveredShield(null)}
                  />

                  {/* Inner accent ring */}
                  <ellipse
                    cx="200"
                    cy="200"
                    rx={geometry.rx - 5}
                    ry={geometry.ry - 5}
                    fill="none"
                    stroke={shield.color}
                    strokeWidth={1}
                    opacity={isActive ? 0.6 : 0.3}
                    strokeDasharray={isSelected ? "none" : "4 4"}
                    style={{
                      transition: "all 0.3s ease-out",
                    }}
                  />
                </g>
              );
            })}

            {/* Central point */}
            <circle
              cx="200"
              cy="200"
              r="8"
              fill="rgba(255, 255, 255, 0.3)"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="2"
            />

            {/* Central cross/axis indicators */}
            <line
              x1="200"
              y1="160"
              x2="200"
              y2="240"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <line
              x1="160"
              y1="200"
              x2="240"
              y2="200"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>

          {/* Keyframe animation styles */}
          <style>{`
            @keyframes pulse-shield {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>

        {/* Shield List with clickable items */}
        {showLabels && (
          <div className="w-full lg:w-72 space-y-2">
            <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Five Horizontal Shields
            </h3>
            {ORDERED_SHIELDS.map((shield) => {
              const geometry = getGeometry(shield.id);
              const isSelected = activeShield?.id === shield.id;
              const isHovered = hoveredShield === shield.id;

              return (
                <button
                  key={shield.id}
                  onClick={(e) => handleShieldClick(shield, e)}
                  onMouseEnter={() => setHoveredShield(shield.id)}
                  onMouseLeave={() => setHoveredShield(null)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-300 ${
                    isSelected
                      ? "border-opacity-100 bg-opacity-20"
                      : isHovered
                      ? "border-opacity-60 bg-opacity-10"
                      : "border-opacity-30 bg-opacity-5"
                  }`}
                  style={{
                    borderColor: shield.color,
                    backgroundColor: `${shield.color}${isSelected ? "33" : isHovered ? "1A" : "0D"}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm" style={{ color: shield.color }}>
                      {shield.name}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className="text-xs px-2 py-0"
                      style={{ borderColor: shield.color, color: shield.color }}
                    >
                      {shield.dimensions}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">{shield.description}</p>
                  
                  {/* Click indicator */}
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Info className="w-3 h-3" />
                    <span>Click for details</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed Info Panel - Shows when a shield is selected */}
      {activeShield && (
        <Card 
          className="mt-6 border-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ borderColor: activeShield.color }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: activeShield.color, boxShadow: `0 0 12px ${activeShield.color}` }}
                />
                <div>
                  <h3 className="text-xl font-bold" style={{ color: activeShield.color }}>
                    {activeShield.name}
                  </h3>
                  <Badge variant="outline" className="mt-1" style={{ borderColor: activeShield.color }}>
                    Dimensions: {activeShield.dimensions}
                  </Badge>
                </div>
              </div>
              <button
                onClick={handleCloseTooltip}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Description
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {activeShield.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">Function</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {activeShield.function}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-300 mb-2">Ascension Purpose</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {activeShield.ascensionPurpose}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-yellow-300 mb-2">Associated Chakras</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeShield.chakras.map((chakraNum) => (
                      <Badge 
                        key={chakraNum}
                        variant="outline"
                        className="text-sm"
                        style={{ borderColor: activeShield.color, color: activeShield.color }}
                      >
                        Chakra {chakraNum}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
