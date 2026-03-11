import { useState, useEffect } from "react";
import { Interactive3DVisualBase } from "@/components/interactive-3d-visual-base";

interface GeometryPattern {
  id: string;
  type: 'flower-of-life' | 'merkaba' | 'sri-yantra' | 'torus' | 'vesica-piscis';
  size: number;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  speed: number;
}

interface SacredGeometryBgProps {
  interactive?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  patterns?: string[];
  className?: string;
}

export function SacredGeometryBg({ 
  intensity = 'medium',
  patterns = ['flower-of-life', 'merkaba', 'vesica-piscis'],
  className = ""
}: SacredGeometryBgProps) {
  const [geometryPatterns, setGeometryPatterns] = useState<GeometryPattern[]>([]);
  const [energy, setEnergy] = useState(75);

  useEffect(() => {
    const patternCount = intensity === 'low' ? 3 : intensity === 'medium' ? 6 : 9;
    const newPatterns: GeometryPattern[] = [];

    for (let i = 0; i < patternCount; i++) {
      const pattern: GeometryPattern = {
        id: `pattern-${i}`,
        type: patterns[Math.floor(Math.random() * patterns.length)] as GeometryPattern['type'],
        size: Math.random() * 100 + 50,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        opacity: 0.1 + Math.random() * 0.2,
        speed: 0.1 + Math.random() * 0.3
      };
      newPatterns.push(pattern);
    }
    setGeometryPatterns(newPatterns);
  }, [intensity, patterns]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGeometryPatterns(prev => prev.map(pattern => ({
        ...pattern,
        rotation: pattern.rotation + pattern.speed
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const renderPattern = (pattern: GeometryPattern) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: `${pattern.x}%`,
      top: `${pattern.y}%`,
      width: `${pattern.size}px`,
      height: `${pattern.size}px`,
      opacity: pattern.opacity * (energy / 100),
      transform: `translate(-50%, -50%) rotate(${pattern.rotation}deg)`,
      pointerEvents: 'none' as const,
      transition: 'opacity 0.3s ease-out'
    };

    const renderSVG = (viewBox: string, children: React.ReactNode) => (
      <svg key={pattern.id} style={baseStyle} viewBox={viewBox}>
        <g stroke="currentColor" fill="none" strokeWidth="0.5" opacity={energy / 100}>
          {children}
        </g>
      </svg>
    );

    switch (pattern.type) {
      case 'flower-of-life':
        return renderSVG("0 0 100 100",
          <>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <circle
                key={i}
                cx={50 + 25 * Math.cos((angle * Math.PI) / 180)}
                cy={50 + 25 * Math.sin((angle * Math.PI) / 180)}
                r="25"
              />
            ))}
            <circle cx="50" cy="50" r="25" />
          </>
        );
      case 'merkaba':
        return renderSVG("0 0 100 100",
          <>
            <polygon points="50,10 85,50 50,90 15,50" />
            <polygon points="50,90 85,50 50,10 15,50" transform="rotate(180 50 50)" />
          </>
        );
      case 'vesica-piscis':
        return renderSVG("0 0 100 100",
          <>
            <circle cx="35" cy="50" r="25" />
            <circle cx="65" cy="50" r="25" />
          </>
        );
      default:
        return renderSVG("0 0 100 100", <circle cx="50" cy="50" r="25" />);
    }
  };

  return (
    <Interactive3DVisualBase
      title="Sacred Geometry Visualizer"
      subtitle="Interactive 3D visualization of sacred geometric patterns"
      layerCount={geometryPatterns.length}
      onEnergyChange={setEnergy}
      autoRotate={true}
      showControls={true}
    >
      <div className={`absolute inset-0 w-full h-full ${className}`}>
        {geometryPatterns.map(pattern => renderPattern(pattern))}
      </div>
    </Interactive3DVisualBase>
  );
}
