import { useState, useRef } from "react";
import { Interactive3DVisualBase } from "@/components/interactive-3d-visual-base";
import { lightbodyLayers, type LightbodyLayer } from "@/lib/lightbody-data";

interface InteractiveLightbodyExplorerProps {
  onLayerSelect?: (layer: LightbodyLayer) => void;
  selectedLayerId?: string | null;
}

export function InteractiveLightbodyExplorer({
  onLayerSelect,
  selectedLayerId
}: InteractiveLightbodyExplorerProps) {
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [energy, setEnergy] = useState(75);
  const containerRef = useRef<HTMLDivElement>(null);

  const getLayerColor = (layerId: string): string => {
    const colors: Record<string, string> = {
      'etheric': 'rgba(239, 68, 68, 0.8)',
      'emotional': 'rgba(249, 115, 22, 0.8)',
      'mental': 'rgba(234, 179, 8, 0.8)',
      'astral': 'rgba(34, 197, 94, 0.8)',
      'etheric_template': 'rgba(59, 130, 246, 0.8)',
      'celestial': 'rgba(168, 85, 247, 0.8)',
      'ketheric': 'rgba(236, 72, 153, 0.8)',
    };
    return colors[layerId] || 'rgba(255, 215, 0, 0.8)';
  };

  const getLayerRadius = (index: number): number => {
    return 100 + (index * 40);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    // Get mouse position relative to center of the 3D container
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate 2D distance from center (ignoring Z depth for selection ease)
    // We adjust for the elliptical aspect ratio (height is 1.6x width in original, but spheres should be 1:1 visually or matched)
    // The user requested "Spherical", so we treat radius as uniform circle for selection physics
    // Distance = sqrt(dx^2 + dy^2). We correct dy by dividing by perspective factor if needed, but simple radial works for spheres.
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Adjust distance by zoom to match rendered scale
    const adjustedDistance = distance / zoom;

    // Find layer with radius closest to mouse distance
    let closestLayerId: string | null = null;
    let minDiff = Infinity;

    lightbodyLayers.forEach((layer, index) => {
      const radius = getLayerRadius(index);
      // Determine selection tolerance (rim thickness)
      // Be generous: +/- 25px
      const diff = Math.abs(adjustedDistance - radius);

      if (diff < 25 && diff < minDiff) {
        minDiff = diff;
        closestLayerId = layer.id;
      }
    });

    setHoveredLayerId(closestLayerId);
  };

  const handleContainerClick = () => {
    if (hoveredLayerId) {
      const layer = lightbodyLayers.find(l => l.id === hoveredLayerId);
      if (layer) onLayerSelect?.(layer);
    }
  };

  return (
    <Interactive3DVisualBase
      title="Interactive Lightbody Explorer"
      subtitle="Interactive 3D visualization of all seven electromagnetic field layers"
      layerCount={7}
      onZoomChange={setZoom}
      onEnergyChange={setEnergy}
      autoRotate={true}
      showControls={true}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-crosshair z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredLayerId(null)}
        onClick={handleContainerClick}
      />

      {/* Custom scaled Vitruvian body for lightbody layers - Static Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ opacity: 0.25, transform: `scale(${zoom}) transition(transform 0.3s)` }}
      >
        <defs>
          <filter id="bodyGlowLightbody">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <line x1="200" y1="60" x2="200" y2="560" stroke="rgba(255, 215, 0, 0.4)" strokeWidth="2" filter="url(#bodyGlowLightbody)" />
        <g stroke="rgba(255, 215, 0, 0.35)" strokeWidth="1.5" fill="none" filter="url(#bodyGlowLightbody)">
          <circle cx="200" cy="80" r="25" />
          <ellipse cx="200" cy="200" rx="35" ry="70" />
          <line x1="165" y1="120" x2="100" y2="220" />
          <line x1="235" y1="120" x2="300" y2="220" />
          <ellipse cx="200" cy="300" rx="40" ry="50" />
          <line x1="175" y1="350" x2="160" y2="540" />
          <line x1="225" y1="350" x2="240" y2="540" />
        </g>
      </svg>

      {/* 3D Wireframe Spheres */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        {lightbodyLayers.map((layer, index) => {
          const isHovered = hoveredLayerId === layer.id;
          const isSelected = selectedLayerId === layer.id;
          const radius = getLayerRadius(index);
          const color = getLayerColor(layer.id);
          const isActive = isHovered || isSelected;

          return (
            <div
              key={layer.id}
              className="absolute flex items-center justify-center transition-all duration-500"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                transformStyle: 'preserve-3d',
                opacity: isActive ? 1 : energy / 100,
              }}
            >
              {/* Ring 1 - XY Plane */}
              <div
                className="absolute inset-0 rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: color,
                  opacity: isActive ? 0.9 : 0.3,
                  boxShadow: isActive ? `0 0 20px ${color}` : 'none'
                }}
              />

              {/* Ring 2 - Rotated X */}
              <div
                className="absolute inset-0 rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: color,
                  transform: 'rotateX(60deg)',
                  opacity: isActive ? 0.9 : 0.3
                }}
              />

              {/* Ring 3 - Rotated Y (or inverse X) */}
              <div
                className="absolute inset-0 rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: color,
                  transform: 'rotateX(-60deg)',
                  opacity: isActive ? 0.9 : 0.3
                }}
              />

              {/* Subtle Sphere Fill for Volume */}
              <div
                className="absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  background: isActive
                    ? `radial-gradient(circle, ${color}20 0%, ${color}10 60%, transparent 80%)`
                    : 'transparent',
                  transform: 'scale(0.95)'
                }}
              />

              {isActive && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-cosmic-900/90 rounded border backdrop-blur-md z-50 whitespace-nowrap"
                  style={{
                    borderColor: color,
                    transform: 'translateZ(60px) scale(1)', // Billboarding attempt or just push front
                    boxShadow: `0 0 10px ${color}`
                  }}
                >
                  <div className="font-bold text-sm text-white">{layer.name}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Interactive3DVisualBase>
  );
}
