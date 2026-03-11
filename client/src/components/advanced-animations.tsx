import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import { useMobileOptimizations } from "@/hooks/use-mobile-optimizations";

// Sacred Geometry Animated Background
export function SacredGeometryBackground() {
  const { adaptiveLoading } = useMobileOptimizations();
  
  if (adaptiveLoading.shouldReduceQuality) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flower of Life Pattern */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          {Array.from({ length: 19 }, (_, i) => {
            const angle = (i * 360) / 19;
            const radius = 200;
            const x = 600 + Math.cos((angle * Math.PI) / 180) * radius;
            const y = 400 + Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="60"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </motion.g>

        {/* Metatron's Cube */}
        <motion.g
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.02, rotate: 360 }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Central hexagon */}
          <polygon
            points="600,350 650,375 650,425 600,450 550,425 550,375"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.5"
          />
          
          {/* Surrounding circles */}
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (i * 60) * (Math.PI / 180);
            const radius = 80;
            const x = 600 + Math.cos(angle) * radius;
            const y = 400 + Math.sin(angle) * radius;
            
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="30"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
              />
            );
          })}
        </motion.g>

        {/* Floating Sacred Symbols */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.g
            key={i}
            initial={{ 
              x: Math.random() * 1200, 
              y: Math.random() * 800,
              opacity: 0 
            }}
            animate={{ 
              x: Math.random() * 1200, 
              y: Math.random() * 800,
              opacity: [0, 0.1, 0]
            }}
            transition={{ 
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <circle
              r="3"
              fill="#D4AF37"
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

// Particle System for Spiritual Energy
export function SpiritualParticleSystem({ active = false }: { active?: boolean }) {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 2 + 0.5,
  }));

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, #D4AF37 0%, transparent 70%)`,
              }}
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: particle.x + (Math.random() - 0.5) * 200,
                y: particle.y - 100,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

// Chakra Energy Visualization
export function ChakraEnergyFlow({ chakraIndex = 0 }: { chakraIndex?: number }) {
  const chakraColors = [
    "#FF0000", // Root
    "#FF7F00", // Sacral
    "#FFFF00", // Solar Plexus
    "#00FF00", // Heart
    "#0000FF", // Throat
    "#4B0082", // Third Eye
    "#9400D3", // Crown
  ];

  const color = chakraColors[chakraIndex] || "#D4AF37";

  return (
    <div className="relative w-20 h-20">
      {/* Central chakra point */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Energy rings */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: `${color}4D` }}
          animate={{
            scale: [1, 2, 3],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Rotating energy petals */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-8 rounded-full"
            style={{ 
              backgroundColor: color,
              top: "10%",
              left: "50%",
              transformOrigin: "50% 300%",
              transform: `rotate(${i * 45}deg)`,
            }}
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// Morphing Sacred Geometry
export function MorphingSacredGeometry() {
  const [currentShape, setCurrentShape] = useState(0);
  
  const shapes = [
    // Triangle (Fire)
    "M50,10 L90,90 L10,90 Z",
    // Circle (Spirit)
    "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
    // Square (Earth)
    "M20,20 L80,20 L80,80 L20,80 Z",
    // Hexagon (Water)
    "M50,10 L80,30 L80,70 L50,90 L20,70 L20,30 Z",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-24 h-24">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d={shapes[currentShape]}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          animate={{
            d: shapes[currentShape],
            rotate: [0, 360],
          }}
          transition={{
            d: { duration: 2, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
        />
        
        {/* Inner glow effect */}
        <motion.path
          d={shapes[currentShape]}
          fill="rgba(212, 175, 55, 0.1)"
          stroke="none"
          animate={{
            d: shapes[currentShape],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            d: { duration: 2, ease: "easeInOut" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </svg>
    </div>
  );
}

// Scroll-triggered animations
export function ScrollReveal({ children, direction = "up" }: { 
  children: React.ReactNode; 
  direction?: "up" | "down" | "left" | "right" | "scale" 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const variants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
    scale: { scale: 0.8, opacity: 0 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

// Parallax Background Elements
export function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -600]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-full h-full opacity-5"
      >
        <div className="absolute top-20 left-10 w-32 h-32 border border-sacred-gold rounded-full" />
        <div className="absolute top-40 right-20 w-24 h-24 border border-sacred-gold" />
      </motion.div>
      
      <motion.div
        style={{ y: y2 }}
        className="absolute top-0 left-0 w-full h-full opacity-3"
      >
        <div className="absolute top-60 left-1/4 w-16 h-16 border border-sacred-gold rotate-45" />
        <div className="absolute top-80 right-1/3 w-20 h-20 border border-sacred-gold rounded-full" />
      </motion.div>
      
      <motion.div
        style={{ y: y3 }}
        className="absolute top-0 left-0 w-full h-full opacity-2"
      >
        <div className="absolute top-96 left-1/2 w-12 h-12 border border-sacred-gold" />
      </motion.div>
    </div>
  );
}

// Interactive Hover Effects
export function InteractiveCard({ children, ...props }: { 
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      {...props}
    >
      <motion.div
        whileHover={{
          boxShadow: "0 20px 40px rgba(212, 175, 55, 0.2)",
          transition: { duration: 0.3 },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Loading Animations
export function SacredLoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 border-2 border-sacred-gold border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 border-2 border-cosmic-400 border-b-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-6 bg-sacred-gold rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

// Page Transition Effects
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger Animation Container
export function StaggerContainer({ children, delay = 0.1 }: { 
  children: React.ReactNode; 
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}