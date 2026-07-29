import { useEffect, useState, useRef } from 'react';

/**
 * AntiCursor — GPU-accelerated custom cursor.
 *
 * Uses raw CSS transforms + will-change instead of framer-motion springs.
 * Mousemove is throttled via requestAnimationFrame (zero queued work).
 * Automatically disables on touch devices.
 */
export function AntiCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const [mode, setMode] = useState<'default' | 'expand' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Track last known position
    let mx = 0, my = 0;

    // Smooth follower with lerp (very light, no spring physics)
    let ox = 0, oy = 0;
    let ix = 0, iy = 0;
    let followRaf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const follow = () => {
      ox = lerp(ox, mx, 0.12);
      oy = lerp(oy, my, 0.12);
      ix = lerp(ix, mx, 0.2);
      iy = lerp(iy, my, 0.2);

      const o = outerRef.current;
      const n = innerRef.current;
      if (o) {
        o.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%)`;
      }
      if (n) {
        n.style.transform = `translate3d(${ix}px, ${iy}px, 0) translate(-50%, -50%)`;
      }
      followRaf = requestAnimationFrame(follow);
    };
    follow();

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const closest = t.closest('.magnetic-hover, [data-cursor="expand"]');
      if (closest) {
        setMode('expand');
      } else if (t.closest('a, button, [role="button"], input, textarea, select')) {
        setMode('text');
      } else {
        setMode('default');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseenter', () => setIsVisible(true));
    document.addEventListener('mouseleave', () => setIsVisible(false));

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(followRaf);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] gpu-layer"
        style={{
          width: mode === 'expand' ? '72px' : mode === 'text' ? '36px' : '48px',
          height: mode === 'expand' ? '72px' : mode === 'text' ? '36px' : '48px',
          border: '1px solid rgba(57, 255, 20, 0.6)',
          borderRadius: '50%',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.3s ease, opacity 0.3s ease',
          willChange: 'transform',
          // mix-blend-mode difference removed — was causing full-screen repaints
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] gpu-layer"
        style={{
          width: mode === 'text' ? '2px' : '4px',
          height: mode === 'text' ? '18px' : '4px',
          borderRadius: mode === 'text' ? '1px' : '50%',
          background: '#39ff14',
          boxShadow: '0 0 6px rgba(57, 255, 20, 0.4)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.15s ease, height 0.15s ease, border-radius 0.15s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
