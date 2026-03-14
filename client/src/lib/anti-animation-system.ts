import { Variants } from 'framer-motion';

export const antiSprings = {
  snap: { type: 'spring' as const, stiffness: 600, damping: 15 },
  wobble: { type: 'spring' as const, stiffness: 150, damping: 5 },
  smooth: { type: 'spring' as const, stiffness: 50, damping: 20 },
  harsh: { type: 'spring' as const, stiffness: 800, damping: 35 },
};

export const antiPageTransition: Variants = {
  initial: {
    opacity: 0, x: -30, skewY: 2,
    filter: 'blur(8px) brightness(1.5)',
  },
  animate: {
    opacity: 1, x: 0, skewY: 0,
    filter: 'blur(0px) brightness(1)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 },
  },
  exit: {
    opacity: 0, x: 30, skewY: -2,
    filter: 'blur(8px) brightness(0.5)',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const antiStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const antiStaggerChild: Variants = {
  hidden: () => ({
    opacity: 0,
    y: 20 + Math.random() * 30,
    x: (Math.random() - 0.5) * 20,
    rotate: (Math.random() - 0.5) * 4,
  }),
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, x: 0, rotate: 0,
    transition: { ...antiSprings.snap, delay: custom * 0.05 + Math.random() * 0.1 },
  }),
};

export const antiHoverCard: Variants = {
  rest: {
    scale: 1, rotateX: 0, rotateY: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    scale: 1.02, rotateX: -2, rotateY: 3,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

export const antiFadeIn: Variants = {
  hidden: { opacity: 0, y: 20, skewY: 1.5 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const antiScrollReveal: Variants = {
  hidden: (custom: { direction?: string } = {}) => {
    const dirs: Record<string, Record<string, number>> = {
      left: { x: -60, y: 0, rotate: -3 },
      right: { x: 60, y: 0, rotate: 3 },
      up: { x: 0, y: -60, rotate: 2 },
      down: { x: 0, y: 60, rotate: -2 },
    };
    const direction = custom.direction || ['left', 'right', 'up', 'down'][Math.floor(Math.random() * 4)];
    const d = dirs[direction] || dirs.down;
    return { opacity: 0, ...d };
  },
  visible: {
    opacity: 1, x: 0, y: 0, rotate: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const antiTextContainer: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

export const antiTextChar: Variants = {
  hidden: {
    opacity: 0,
    y: 20 + Math.random() * 40,
    rotate: (Math.random() - 0.5) * 10,
    scale: 0.8,
  },
  visible: {
    opacity: 1, y: 0, rotate: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const antiGlitchFlash: Variants = {
  idle: { x: 0, textShadow: '0 0 0 transparent' },
  glitch: {
    x: [0, -3, 5, -2, 0],
    textShadow: [
      '0 0 0 transparent',
      '-3px 0 #ff0033, 3px 0 #00f0ff',
      '2px 0 #39ff14, -2px 0 #ff006e',
      '-1px 0 #ff0033, 1px 0 #00f0ff',
      '0 0 0 transparent',
    ],
    transition: { duration: 0.3, ease: 'linear' },
  },
};

export const antiCardFlip: Variants = {
  front: { rotateY: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  back: { rotateY: 180, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const antiDistortionOnScroll: Variants = {
  offscreen: { opacity: 0, scale: 0.9, skewX: 5, filter: 'blur(10px)' },
  onscreen: {
    opacity: 1, scale: 1, skewX: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};
