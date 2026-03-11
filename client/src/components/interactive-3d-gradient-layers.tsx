/**
 * Reusable 3D gradient layer renderer for interactive visualizations
 * Applies smooth gradient colors with rotation and scaling
 */

interface GradientLayer {
  id: string;
  size: number;
  color: string;
  opacity: number;
  glowIntensity?: number;
}

interface Interactive3DGradientLayersProps {
  layers: GradientLayer[];
  energyIntensity: number;
  shape?: 'circle' | 'ellipse' | 'rect';
}

export function Interactive3DGradientLayers({
  layers,
  energyIntensity,
  shape = 'ellipse'
}: Interactive3DGradientLayersProps) {
  return (
    <svg
      viewBox="0 0 600 600"
      className="w-full h-full"
      style={{ filter: `drop-shadow(0 0 ${energyIntensity / 100 * 30}px rgba(255, 215, 0, 0.3))` }}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={energyIntensity / 100 * 15} result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Render layers back to front */}
      {layers.map((layer) => {
        const rx = layer.size;
        const ry = shape === 'ellipse' ? layer.size * 1.3 : layer.size;

        return (
          <g key={layer.id} filter="url(#glow)">
            {/* Outer glow */}
            <ellipse
              cx="300"
              cy="300"
              rx={rx + 15}
              ry={ry + 15}
              fill="none"
              stroke={layer.color}
              strokeWidth="2"
              opacity={layer.opacity * 0.4 * (energyIntensity / 100)}
              style={{
                filter: `blur(${energyIntensity / 100 * 8}px)`
              }}
            />

            {/* Main layer */}
            <ellipse
              cx="300"
              cy="300"
              rx={rx}
              ry={ry}
              fill="none"
              stroke={layer.color}
              strokeWidth="3"
              opacity={layer.opacity * (energyIntensity / 100)}
              style={{
                transition: 'stroke-width 0.3s ease-out'
              }}
            />

            {/* Inner glow */}
            <ellipse
              cx="300"
              cy="300"
              rx={rx - 10}
              ry={ry - 10}
              fill="none"
              stroke={layer.color}
              strokeWidth="1"
              opacity={layer.opacity * 0.5 * (energyIntensity / 100)}
              style={{
                filter: `blur(${energyIntensity / 100 * 4}px)`
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
