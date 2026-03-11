/**
 * Core Animation System Configuration
 * Defines global spring physics, easings, and animation tokens for the Ascension Codex.
 */

import { Variants } from "framer-motion";

// --- Spring Physics Presets ---
export const springs = {
    // Ultra-snappy for interactive elements like buttons
    snappy: { type: "spring", stiffness: 400, damping: 30 },
    // Smooth and elegant for page transitions
    elegant: { type: "spring", stiffness: 100, damping: 20 },
    // Bouncy for success states or playful elements
    bouncy: { type: "spring", stiffness: 300, damping: 10, mass: 1 },
    // Slow, deep transitions for spiritual immersion
    cosmic: { type: "spring", stiffness: 40, damping: 15, mass: 1.5 },
    // Precise for technical UI elements
    precise: { type: "spring", stiffness: 200, damping: 25 },
};

// --- Easing Curves (Sacred Geometry based) ---
export const easings = {
    // Soft entry, precise exit
    sacred: [0.22, 1, 0.36, 1],
    // Deep, flowing curve
    divine: [0.645, 0.045, 0.355, 1],
    // Quick acceleration, slow landing
    ascension: [0.16, 1, 0.3, 1],
    // Balanced out-expo
    standard: [0.33, 1, 0.68, 1],
};

// --- Global Animation Tokens ---
export const durations = {
    fast: 0.15,
    standard: 0.3,
    smooth: 0.5,
    elegant: 0.8,
    immersive: 1.2,
};

// --- Reusable Animation Variants ---

/**
 * Fade and Slide In (Upward)
 */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            ...springs.elegant,
            delay: custom,
        },
    }),
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: easings.ascension },
    },
};

/**
 * Global Page Transitions
 */
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
        x: -20,
        filter: "blur(10px)",
    },
    animate: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: easings.sacred,
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        x: 20,
        filter: "blur(10px)",
        transition: {
            duration: 0.5,
            ease: easings.ascension,
        },
    },
};

/**
 * Staggered Container
 */
export const staggerContainer = (staggerDelay = 0.1): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay,
        },
    },
});

/**
 * Interactive Item (Hover/Tap)
 */
export const interactiveItem: Variants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        y: -2,
        transition: springs.snappy
    },
    tap: {
        scale: 0.98,
        transition: { type: "spring", stiffness: 600, damping: 30 }
    },
};

/**
 * Sacred Glow Pulse
 */
export const sacredGlow: Variants = {
    animate: {
        boxShadow: [
            "0 0 0px rgba(255, 215, 0, 0.4)",
            "0 0 20px rgba(255, 215, 0, 0.6)",
            "0 0 0px rgba(255, 215, 0, 0.4)",
        ],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};
