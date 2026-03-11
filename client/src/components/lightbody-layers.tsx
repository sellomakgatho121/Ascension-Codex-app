import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { lightbodyLayers, type LightbodyLayer } from "@/lib/lightbody-data";

interface LightbodyLayersProps {
  selectedLayer?: LightbodyLayer | null;
  onLayerSelect: (layer: LightbodyLayer) => void;
}

export function LightbodyLayers({ selectedLayer, onLayerSelect }: LightbodyLayersProps) {
  const LayerRing = ({ layer, scale }: { layer: LightbodyLayer; scale: number }) => {
    const isSelected = selectedLayer?.id === layer.id;
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div
        className="lightbody-container absolute inset-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer energy pulse ring */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 ${
            isHovered || isSelected ? 'animate-pulse-energy' : ''
          }`}
          style={{
            transform: `scale(${scale + 0.3})`,
            background: `radial-gradient(circle, transparent 70%, ${layer.color}15 80%, transparent 100%)`,
            opacity: isHovered || isSelected ? 1 : 0,
            animation: isHovered || isSelected ? 'energyPulse 2.5s ease-in-out infinite' : 'none'
          }}
        />

        {/* Main layer ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 lightbody-layer cursor-pointer transition-all duration-300 ${
            isSelected ? 'border-sacred-gold/80' : 'border-white/30'
          }`}
          style={{
            transform: `scale(${scale}) ${isHovered ? 'scale(1.05)' : ''}`,
            borderColor: isSelected ? 'var(--sacred-gold)' : layer.color + '80',
            backgroundColor: layer.color + (isHovered ? '20' : '10'),
            boxShadow: `0 0 ${isSelected || isHovered ? '20px' : '10px'} ${layer.color}40`,
            filter: isHovered ? 'brightness(1.2) saturate(1.3)' : 'none'
          }}
          onClick={() => onLayerSelect(layer)}
        >
          <div className="absolute inset-0 rounded-full flex items-center justify-center">
            <span 
              className={`text-xs font-bold text-white transition-all duration-300 ${
                isHovered ? 'scale-110' : ''
              }`}
              style={{ 
                opacity: isHovered ? 1 : 0.8,
                textShadow: isHovered ? `0 0 10px ${layer.color}` : 'none'
              }}
            >
              {layer.name.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Energy particles on hover */}
        {isHovered && (
          <>
            <div
              className="absolute animate-spin-slow"
              style={{
                width: '6px',
                height: '6px',
                background: layer.color,
                borderRadius: '50%',
                left: '70%',
                top: '25%',
                opacity: 0.7,
                animation: 'floatParticle 3s ease-in-out infinite',
                transform: `scale(${scale})`
              }}
            />
            <div
              className="absolute animate-spin-slow"
              style={{
                width: '4px',
                height: '4px',
                background: layer.color,
                borderRadius: '50%',
                left: '25%',
                top: '70%',
                opacity: 0.6,
                animation: 'floatParticle 2.5s ease-in-out infinite 0.5s',
                transform: `scale(${scale})`
              }}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
      {/* Lightbody Visualization */}
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-center text-sacred-silver">
            Auric Field Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-64 md:w-80 h-64 md:h-80 mx-auto">
            {lightbodyLayers.map((layer, index) => (
              <LayerRing
                key={layer.id}
                layer={layer}
                scale={0.3 + (index * 0.15)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Layer Details */}
      <div className="space-y-6">
        {lightbodyLayers.map((layer) => (
          <Card
            key={layer.id}
            className={`sacred-card cursor-pointer transition-all duration-300 ${
              selectedLayer?.id === layer.id
                ? 'border-sacred-gold/60 bg-cosmic-700/50'
                : 'hover:border-sacred-gold/30'
            }`}
            onClick={() => onLayerSelect(layer)}
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <div
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: layer.color }}
                />
                <h3 className="text-lg font-sacred font-bold" style={{ color: layer.color }}>
                  {layer.name}
                </h3>
                <Badge variant="outline" className="ml-auto text-xs">
                  {layer.dimension}
                </Badge>
              </div>
              <p className="text-cosmic-100 text-sm leading-relaxed">
                {layer.description}
              </p>
              {selectedLayer?.id === layer.id && (
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-sacred-gold mb-1">Function:</h4>
                    <p className="text-cosmic-100 text-xs leading-relaxed">
                      {layer.function}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-sacred-gold mb-1">Ascension Purpose:</h4>
                    <p className="text-cosmic-100 text-xs leading-relaxed">
                      {layer.ascensionPurpose}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
