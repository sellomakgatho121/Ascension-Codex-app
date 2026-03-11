import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sacredColorPalettes } from '@/lib/visual-design-system';

interface SacredGeometryEnhancedProps {
  pattern?: 'flower-of-life' | 'metatron' | 'seed-of-life' | 'merkaba' | 'sri-yantra';
  opacity?: number;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
  colorTheme?: keyof typeof sacredColorPalettes;
}

export function SacredGeometryEnhanced({
  pattern = 'flower-of-life',
  opacity = 0.1,
  animated = true,
  interactive = true,
  className = '',
  colorTheme = 'cosmic'
}: SacredGeometryEnhancedProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const theme = sacredColorPalettes[colorTheme];
  
  // Motion values for smoother parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 120 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, mouseX, mouseY]);

  const FlowerOfLife = () => (
    <motion.svg 
      viewBox="0 0 200 200" 
      className="w-full h-full"
      style={{ rotateX: interactive ? rotateX : 0, rotateY: interactive ? rotateY : 0 }}
    >
      <defs>
        <filter id={`flowerGlow-${colorTheme}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feFlood floodColor={theme.primary} floodOpacity="0.5" result="glowColor"/>
          <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
          <feMerge>
            <feMergeNode in="softGlow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g stroke={theme.accent} strokeWidth="0.5" fill="none" filter={`url(#flowerGlow-${colorTheme})`}>
        {/* Central circle */}
        <motion.circle 
          cx="100" cy="100" r="20"
          animate={animated ? { r: [20, 21, 20], opacity: [0.8, 1, 0.8] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Six surrounding circles */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const x = 100 + 20 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 20 * Math.sin((angle * Math.PI) / 180);
          return (
            <motion.circle
              key={i}
              cx={x} cy={y} r="20"
              animate={animated ? { r: [20, 21, 20] } : {}}
              transition={{ duration: 4, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
        
        {/* Outer ring of circles */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const x = 100 + 40 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 40 * Math.sin((angle * Math.PI) / 180);
          return (
            <motion.circle
              key={`outer-${i}`}
              cx={x} cy={y} r="20"
              opacity="0.6"
              style={{ originX: "100px", originY: "100px" }}
              animate={animated ? { rotate: 360 } : {}}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
          );
        })}
      </g>
    </motion.svg>
  );

  const Metatron = () => (
    <motion.svg 
      viewBox="0 0 200 200" 
      className="w-full h-full"
      style={{ rotateX: interactive ? rotateX : 0, rotateY: interactive ? rotateY : 0 }}
    >
      <defs>
        <filter id={`metatronGlow-${colorTheme}`}>
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feFlood floodColor={theme.secondary} floodOpacity="0.6" result="glowColor"/>
          <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
          <feMerge>
            <feMergeNode in="softGlow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g stroke={theme.primary} strokeWidth="0.5" fill="none" filter={`url(#metatronGlow-${colorTheme})`}>
        {/* Outer circle - animating */}
        <motion.circle 
          cx="100" cy="100" r="80"
          animate={animated ? { rotate: 360 } : {}}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        />
        
        {/* Inner structure */}
        <g>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x1 = 100 + 40 * Math.cos((angle * Math.PI) / 180);
            const y1 = 100 + 40 * Math.sin((angle * Math.PI) / 180);
            const nextAngle = angle + 60;
            const x2 = 100 + 40 * Math.cos((nextAngle * Math.PI) / 180);
            const y2 = 100 + 40 * Math.sin((nextAngle * Math.PI) / 180);
            
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} />
                <motion.circle
                  cx={x1} cy={y1} r="3"
                  fill={theme.accent}
                  stroke="none"
                  animate={animated ? { r: [3, 4, 3], opacity: [0.6, 1, 0.6] } : {}}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
                <line x1={x1} y1={y1} x2="100" y2="100" opacity="0.5" />
              </g>
            );
          })}
        </g>
        
        {/* Center */}
        <motion.circle 
          cx="100" cy="100" r="4" 
          fill={theme.accent} 
          stroke="none"
          animate={animated ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </g>
    </motion.svg>
  );

  const Merkaba = () => (
    <motion.svg 
      viewBox="0 0 200 200" 
      className="w-full h-full"
      style={{ rotateX: interactive ? rotateX : 0, rotateY: interactive ? rotateY : 0 }}
    >
      <defs>
        <filter id={`merkabaGlow-${colorTheme}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feFlood floodColor={theme.info} floodOpacity="0.4" result="glowColor"/>
          <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
          <feMerge>
            <feMergeNode in="softGlow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g stroke={theme.info} strokeWidth="0.8" fill="none" filter={`url(#merkabaGlow-${colorTheme})`}>
        {/* Star Tetrahedron Components */}
        <motion.polygon
          points="100,30 150,130 50,130"
          animate={animated ? { rotate: 360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "100px", originY: "100px" }}
        />
        
        <motion.polygon
          points="100,170 50,70 150,70"
          animate={animated ? { rotate: -360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "100px", originY: "100px" }}
        />
        
        {/* Energy Field */}
        <motion.circle 
          cx="100" cy="100" r="60" 
          stroke={theme.primary}
          strokeWidth="0.2"
          strokeDasharray="2 2"
          animate={animated ? { rotate: 360, scale: [1, 1.1, 1] } : {}}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ originX: "100px", originY: "100px" }}
        />
        
        <motion.circle 
          cx="100" cy="100" r="25"
          stroke={theme.accent}
          animate={animated ? { r: [25, 28, 25], opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </g>
    </motion.svg>
  );

  const patterns = {
    'flower-of-life': <FlowerOfLife />,
    'metatron': <Metatron />,
    'merkaba': <Merkaba />,
    'seed-of-life': <FlowerOfLife />, // Can be specialized later
    'sri-yantra': <Metatron /> // Can be specialized later
  };

  return (
    <div 
      className={`absolute inset-0 pointer-events-none perspective-distant ${className}`}
      style={{ opacity, perspective: '1000px' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {patterns[pattern]}
      </div>
    </div>
  );
}
