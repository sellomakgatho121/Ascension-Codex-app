import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function AntiScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const width = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const glitchX = useTransform(smoothProgress, [0, 0.5, 1], [0, 3, 0]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[99990] h-[2px] bg-anti-void/50">
      <motion.div
        style={{ width, x: glitchX }}
        className="h-full bg-gradient-to-r from-anti-acid via-anti-neon to-anti-cyan shadow-[0_0_10px_rgba(57,255,20,0.5),0_0_20px_rgba(255,0,110,0.3)]"
      />
      <motion.div
        style={{ left: width }}
        className="absolute top-0 w-[3px] h-[6px] bg-anti-glitch"
        animate={{
          opacity: [1, 0.3, 1],
          scaleY: [1, 2, 1],
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
