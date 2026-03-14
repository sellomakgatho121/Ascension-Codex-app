import { motion } from "framer-motion";
import { antiPageTransition } from "@/lib/anti-animation-system";
import { pageTransition } from "@/lib/animation-system";
import { useLocation } from "wouter";
import { ReactNode } from "react";

interface PageTransitionWrapperProps {
  children: ReactNode;
  variant?: 'fade' | 'portal' | 'dimensional';
}

const antiPortalVariants = {
  initial: {
    opacity: 0,
    scale: 0.97,
    skewY: 1.5,
    filter: "blur(12px) brightness(1.8)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    skewY: 0,
    filter: "blur(0px) brightness(1)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    skewY: -1,
    filter: "blur(8px) brightness(0.3)",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const antiDimensionalVariants = {
  initial: {
    opacity: 0,
    x: 40,
    rotateY: -3,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    x: -40,
    rotateY: 3,
    filter: "blur(6px)",
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function getVariants(variant: string) {
  switch (variant) {
    case 'portal': return antiPortalVariants;
    case 'dimensional': return antiDimensionalVariants;
    default: return antiPageTransition;
  }
}

export function PageTransitionWrapper({ children, variant = 'portal' }: PageTransitionWrapperProps) {
  const [location] = useLocation();

  return (
    <motion.div
      key={location}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={getVariants(variant)}
      className="w-full min-h-screen origin-center"
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function CinematicEntry({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-anti-acid/3 via-transparent to-transparent opacity-40" />
      </motion.div>
      {children}
    </div>
  );
}
