import { useEffect, useRef, useMemo } from "react";

// ─── Animated glitch lines (CSS keyframes — GPU composited) ─────────────
// These run on the compositor thread, zero JS overhead after mount.

const GLITCH_LINES = [
  { top: '10%', width: '65%', left: '15%', delay: 0.3, dur: 5.2 },
  { top: '23%', width: '45%', left: '5%', delay: 1.8, dur: 4.1 },
  { top: '37%', width: '75%', left: '10%', delay: 0.7, dur: 6.3 },
  { top: '48%', width: '35%', left: '25%', delay: 2.5, dur: 3.8 },
  { top: '55%', width: '55%', left: '20%', delay: 0.2, dur: 7.0 },
  { top: '68%', width: '70%', left: '8%', delay: 1.2, dur: 4.7 },
  { top: '79%', width: '40%', left: '30%', delay: 3.0, dur: 5.5 },
  { top: '91%', width: '60%', left: '12%', delay: 1.5, dur: 3.3 },
];

/** Built once — stable references so AmbientBackground itself is referentially stable. */
const SCAN_STYLES = [
  'anti-scan-line',              // <div> — defined in index.css
  'anti-noise-overlay',          // <div> — defined in index.css
] as const;

export function AmbientBackground() {
  // Throttled mouse-follow gradient — only one RAF-driven element
  const gradientRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      if (rafId.current) return; // skip if RAF is already queued
      rafId.current = requestAnimationFrame(() => {
        rafId.current = 0;
        if (!el) return;
        el.style.setProperty('--mx', `${e.clientX}px`);
        el.style.setProperty('--my', `${e.clientY}px`);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-anti-bg">
      {/** Scan-line overlay — CSS-only */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(57,255,20,0.03) 2px, rgba(57,255,20,0.03) 4px
          )`,
        }}
      />

      {/** Animated scan bar — CSS keyframe */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-anti-acid/10 to-transparent animate-scan-bar" />

      {/** Glitch lines — pure CSS keyframes (GPU composited) */}
      {GLITCH_LINES.map((l, i) => (
        <div
          key={i}
          className="absolute h-[1px] animate-glitch-line"
          style={{
            top: l.top,
            left: l.left,
            width: l.width,
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.dur}s`,
            background:
              i % 3 === 0
                ? 'rgba(255, 0, 110, 0.04)'
                : i % 3 === 1
                  ? 'rgba(57, 255, 20, 0.03)'
                  : 'rgba(0, 240, 255, 0.03)',
          }}
        />
      ))}

      {/** Mouse-follow gradient (throttled via RAF) */}
      <div
        ref={gradientRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none gpu-layer"
        style={{
          transform: 'translate(calc(var(--mx, 50vw) - 300px), calc(var(--my, 50vh) - 300px))',
          background: 'radial-gradient(circle, rgba(57,255,20,0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />

      {/** Ambient pulsing gradients — CSS-only */}
      <div className="absolute top-1/4 right-0 w-[40%] h-[40%] animate-ambient-pulse-a"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,0,110,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="absolute bottom-0 left-0 w-[50%] h-[30%] animate-ambient-pulse-b"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,240,255,0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/** CSS grid noise — scroll-linked via CSS scroll-driven animation */}
      <div className="absolute inset-0 opacity-[0.015] animate-grid-rotate gpu-layer"
        style={{ willChange: 'transform' }}
      >
        <div className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(57,255,20,0.1) 49px, rgba(57,255,20,0.1) 50px),
              repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(57,255,20,0.1) 49px, rgba(57,255,20,0.1) 50px)
            `,
          }}
        />
      </div>

      <div className="absolute bottom-4 right-4 font-anti-mono text-[9px] text-anti-acid/10 tracking-widest select-none">
        SYS.VOID.ACTIVE
      </div>
    </div>
  );
}
