import { useState } from "react";
import { Interactive3DVisualBase } from "@/components/interactive-3d-visual-base";
import { Interactive3DGradientLayers } from "@/components/interactive-3d-gradient-layers";
import { generateGradientLayers } from "@/lib/interactive-3d-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EnergyFieldScanner3D() {
  const [energy, setEnergy] = useState(75);
  const auraLayers = generateGradientLayers('lightbody', 7);

  return (
    <div className="space-y-6">
      <Interactive3DVisualBase
        title="Energy Field Aura Visualization"
        subtitle="7 electromagnetic field layers surrounding the physical body"
        layerCount={7}
        onEnergyChange={setEnergy}
        autoRotate={true}
        showControls={true}
      >
        {/* Custom scaled Vitruvian body for 7-layer aura */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 400 700" 
          preserveAspectRatio="xMidYMid meet"
          style={{ opacity: 0.25 }}
        >
          <defs>
            <filter id="bodyGlowAura">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Central channel */}
          <line x1="200" y1="50" x2="200" y2="650" stroke="rgba(100, 200, 255, 0.5)" strokeWidth="3" filter="url(#bodyGlowAura)" />

          {/* Detailed Vitruvian body for aura layers */}
          <g stroke="rgba(100, 200, 255, 0.4)" strokeWidth="1.5" fill="none" filter="url(#bodyGlowAura)">
            {/* Head */}
            <circle cx="200" cy="90" r="30" />
            {/* Neck */}
            <line x1="180" y1="120" x2="180" y2="140" />
            <line x1="220" y1="120" x2="220" y2="140" />
            {/* Shoulders */}
            <line x1="160" y1="140" x2="240" y2="140" />
            {/* Torso */}
            <ellipse cx="200" cy="230" rx="40" ry="90" />
            {/* Arms */}
            <line x1="160" y1="140" x2="120" y2="280" />
            <line x1="240" y1="140" x2="280" y2="280" />
            {/* Pelvis */}
            <ellipse cx="200" cy="360" rx="45" ry="60" />
            {/* Legs */}
            <line x1="170" y1="420" x2="150" y2="630" />
            <line x1="230" y1="420" x2="250" y2="630" />
            {/* Feet */}
            <line x1="150" y1="630" x2="140" y2="660" />
            <line x1="250" y1="630" x2="260" y2="660" />
          </g>
        </svg>

        <Interactive3DGradientLayers
          layers={auraLayers}
          energyIntensity={energy}
          shape="ellipse"
        />
      </Interactive3DVisualBase>

      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-lg font-sacred text-sacred-gold">
            Aura Layer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {auraLayers.map((layer, idx) => (
            <div key={layer.id} className="border-l-2 border-sacred-gold/50 pl-4">
              <h4 className="font-semibold text-white mb-1">Layer {idx + 1}: {layer.label}</h4>
              <p className="text-sm text-cosmic-300">Energy intensity affects the luminosity and protective qualities of this layer</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
