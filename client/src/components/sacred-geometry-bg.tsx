import { useMemo, useState, useEffect } from "react";

type GeomType = 'flower-of-life' | 'merkaba' | 'sri-yantra' | 'torus' | 'vesica-piscis';

interface GeometryPattern {
  id: string;
  type: GeomType;
  size: number;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  speed: number; // used to set CSS animation duration
}

interface SacredGeometryBgProps {
  interactive?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  patterns?: string[];
  className?: string;
}

/**
 * SacredGeometryBg — GPU-composited sacred geometry background.
 *
 * Replaces the previous setInterval-based rotation loop (which caused 20fps React
 * re-renders) with CSS animation-driven rotation. Each pattern gets a unique
 * CSS animation duration based on its `speed`. Zero JS overhead after mount.
 */
export function SacredGeometryBg({
  intensity = 'medium',
  patterns = ['flower-of-life', 'merkaba', 'vesica-piscis'],
  className = ""
}: SacredGeometryBgProps) {
  // Generate patterns once — stable reference via useMemo
  const geometryPatterns = useMemo(() => {
    const count = intensity === 'low' ? 3 : intensity === 'medium' ? 6 : 9;
    const results: GeometryPattern[] = [];
    for (let i = 0; i < count; i++) {
      const type = patterns[i % patterns.length] as GeomType;
      results.push({
        id: `geom-${i}`,
        type: type || 'flower-of-life',
        size: Math.random() * 100 + 50,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        opacity: 0.05 + Math.random() * 0.2,
        speed: 0.1 + Math.random() * 0.3, // used for CSS animation duration
      });
    }
    return results;
  }, [intensity, patterns.join(',')]);

  const renderPattern = (pattern: GeometryPattern) => {
    // CSS animation duration: faster speed = shorter duration
    const duration = (8 / pattern.speed).toFixed(1);

    switch (pattern.type) {
      case 'flower-of-life':
        return (
          <div
            key={pattern.id}
            className="absolute gpu-layer"
            style={{
              left: `${pattern.x}%`,
              top: `${pattern.y}%`,
              width: `${pattern.size}px`,
              height: `${pattern.size}px`,
              opacity: pattern.opacity,
              animation: `geom-rotate ${duration}s linear infinite`,
              willChange: 'transform',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <circle key={i}
                  cx={50 + 25 * Math.cos((i * 60 * Math.PI) / 180)}
                  cy={50 + 25 * Math.sin((i * 60 * Math.PI) / 180)}
                  r={25} fill="none" stroke="currentColor" strokeWidth="0.5"
                />
              ))}
              <circle cx={50} cy={50} r={25} fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        );
      case 'merkaba':
        return (
          <div
            key={pattern.id}
            className="absolute gpu-layer"
            style={{
              left: `${pattern.x}%`,
              top: `${pattern.y}%`,
              width: `${pattern.size}px`,
              height: `${pattern.size}px`,
              opacity: pattern.opacity,
              animation: `geom-rotate-reverse ${duration}s linear infinite`,
              willChange: 'transform',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <polygon points="50,90 90,10 10,10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        );
      case 'sri-yantra':
        return (
          <div
            key={pattern.id}
            className="absolute gpu-layer"
            style={{
              left: `${pattern.x}%`,
              top: `${pattern.y}%`,
              width: `${pattern.size}px`,
              height: `${pattern.size}px`,
              opacity: pattern.opacity,
              animation: `geom-rotate ${duration}s linear infinite`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <circle key={i} cx={50} cy={50} r={10 + i * 8}
                  fill="none" stroke="currentColor" strokeWidth="0.3"
                />
              ))}
            </svg>
          </div>
        );
      case 'torus':
        return (
          <div
            key={pattern.id}
            className="absolute gpu-layer"
            style={{
              left: `${pattern.x}%`,
              top: `${pattern.y}%`,
              width: `${pattern.size}px`,
              height: `${pattern.size}px`,
              opacity: pattern.opacity,
              animation: `geom-rotate ${duration}s linear infinite`,
              willChange: 'transform',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <ellipse cx={50} cy={50} rx={40} ry={20} fill="none"
                stroke="currentColor" strokeWidth="0.5"
                transform="rotate(30 50 50)"
              />
              <ellipse cx={50} cy={50} rx={40} ry={20} fill="none"
                stroke="currentColor" strokeWidth="0.5"
                transform="rotate(90 50 50)"
              />
              <ellipse cx={50} cy={50} rx={40} ry={20} fill="none"
                stroke="currentColor" strokeWidth="0.5"
                transform="rotate(150 50 50)"
              />
            </svg>
          </div>
        );
      case 'vesica-piscis':
        return (
          <div
            key={pattern.id}
            className="absolute gpu-layer"
            style={{
              left: `${pattern.x}%`,
              top: `${pattern.y}%`,
              width: `${pattern.size}px`,
              height: `${pattern.size}px`,
              opacity: pattern.opacity,
              animation: `geom-rotate-slow ${duration}s linear infinite`,
              willChange: 'transform',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx={35} cy={50} r={30} fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx={65} cy={50} r={30} fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-[-1] select-none text-anti-acid ${className}`}>
      {geometryPatterns.map(renderPattern)}
    </div>
  );
}
