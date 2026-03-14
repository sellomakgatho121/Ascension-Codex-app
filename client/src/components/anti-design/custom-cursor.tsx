import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function AntiCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [mode, setMode] = useState<'default' | 'expand' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const outerX = useSpring(cursorX, { stiffness: 150, damping: 15 });
  const outerY = useSpring(cursorY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.magnetic-hover, [data-cursor="expand"]')) {
        setMode('expand');
      } else if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setMode('text');
      } else {
        setMode('default');
      }
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  const sizes = {
    default: { inner: 6, outer: 32 },
    expand: { inner: 4, outer: 64 },
    text: { inner: 2, outer: 24 },
  };

  const colors = {
    default: { inner: '#39ff14', outer: 'rgba(57, 255, 20, 0.15)' },
    expand: { inner: '#ff006e', outer: 'rgba(255, 0, 110, 0.1)' },
    text: { inner: '#00f0ff', outer: 'rgba(0, 240, 255, 0.12)' },
  };

  const s = sizes[mode];
  const c = colors[mode];

  return (
    <>
      <motion.div
        style={{
          position: 'fixed', left: cursorX, top: cursorY,
          x: '-50%', y: '-50%', pointerEvents: 'none',
          zIndex: 99999, mixBlendMode: 'difference',
        }}
        animate={{
          width: s.inner, height: s.inner,
          opacity: isVisible ? 1 : 0,
          backgroundColor: c.inner,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
      <motion.div
        style={{
          position: 'fixed', left: outerX, top: outerY,
          x: '-50%', y: '-50%', pointerEvents: 'none',
          zIndex: 99998, mixBlendMode: 'difference', borderRadius: '50%',
        }}
        animate={{
          width: s.outer, height: s.outer,
          opacity: isVisible ? 1 : 0,
          borderColor: c.inner, backgroundColor: c.outer,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="border"
      />
    </>
  );
}
