import React from 'react';

interface ThreeFoldFlameLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function ThreeFoldFlameLogo({ 
  size = 40, 
  className = "", 
  animated = false 
}: ThreeFoldFlameLogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? "animate-pulse-gentle" : ""}
      >
        {/* Sacred Circle Foundation */}
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="url(#circleGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />

        {/* Blue Flame (Left) - Divine Will */}
        <path
          d="M35 75 Q30 60 35 45 Q40 30 45 35 Q40 50 35 65 Q32 70 35 75 Z"
          fill="url(#blueFlame)"
          className={animated ? "animate-flame-dance" : ""}
        />

        {/* Golden Flame (Center) - Christ Consciousness */}
        <path
          d="M50 80 Q45 65 50 45 Q55 25 60 30 Q55 50 50 70 Q47 75 50 80 Z"
          fill="url(#goldenFlame)"
          className={animated ? "animate-flame-dance animation-delay-200" : ""}
        />

        {/* Pink Flame (Right) - Divine Love */}
        <path
          d="M65 75 Q60 60 65 45 Q70 30 75 35 Q70 50 65 65 Q62 70 65 75 Z"
          fill="url(#pinkFlame)"
          className={animated ? "animate-flame-dance animation-delay-400" : ""}
        />

        {/* Sacred Geometry Pattern */}
        <path
          d="M50 20 L60 40 L40 40 Z"
          stroke="url(#geometryGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />

        <defs>
          {/* Blue Flame Gradient */}
          <linearGradient id="blueFlame" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.9 }} />
            <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#93c5fd', stopOpacity: 0.6 }} />
          </linearGradient>

          {/* Golden Flame Gradient */}
          <linearGradient id="goldenFlame" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#d97706', stopOpacity: 0.9 }} />
            <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#fde047', stopOpacity: 0.7 }} />
          </linearGradient>

          {/* Pink Flame Gradient */}
          <linearGradient id="pinkFlame" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#be185d', stopOpacity: 0.9 }} />
            <stop offset="50%" style={{ stopColor: '#ec4899', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#fbcfe8', stopOpacity: 0.6 }} />
          </linearGradient>

          {/* Circle Gradient */}
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--sacred-gold)', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: 'var(--sacred-silver)', stopOpacity: 0.3 }} />
          </linearGradient>

          {/* Geometry Gradient */}
          <linearGradient id="geometryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--sacred-crystal)', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: 'var(--sacred-violet)', stopOpacity: 0.2 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Animated version for special cases
export function AnimatedThreeFoldFlameLogo(props: ThreeFoldFlameLogoProps) {
  return <ThreeFoldFlameLogo {...props} animated={true} />;
}