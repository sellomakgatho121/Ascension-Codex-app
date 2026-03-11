import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animation-system";
import { useLocation } from "wouter";
import { ReactNode } from "react";

interface PageTransitionWrapperProps {
    children: ReactNode;
    variant?: 'fade' | 'portal' | 'dimensional';
}

/**
 * Wrapper for every page to ensure consistent, premium transitions.
 * Implements "Bold and Elegant" transitions as requested.
 */
export function PageTransitionWrapper({ children, variant = 'portal' }: PageTransitionWrapperProps) {
    const [location] = useLocation();

    // Custom variants for specific transition styles
    const portalVariants = {
        initial: {
            opacity: 0,
            scale: 0.95,
            z: -100,
            filter: "blur(20px) brightness(0.5)",
        },
        animate: {
            opacity: 1,
            scale: 1,
            z: 0,
            filter: "blur(0px) brightness(1)",
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1], // Sacred easing
                staggerChildren: 0.15,
            },
        },
        exit: {
            opacity: 0,
            scale: 1.05,
            z: 100,
            filter: "blur(20px) brightness(1.5)",
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <motion.div
            key={location}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variant === 'portal' ? portalVariants : pageTransition}
            className="w-full min-h-screen origin-center perspective-1000"
        >
            {children}
        </motion.div>
    );
}

/**
 * Particle background wrapper for cinematic entry
 */
export function CinematicEntry({ children }: { children: ReactNode }) {
    return (
        <div className="relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 pointer-events-none"
            >
                {/* Subtle golden rays effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-sacred-gold/5 via-transparent to-transparent opacity-30" />
            </motion.div>
            {children}
        </div>
    );
}
