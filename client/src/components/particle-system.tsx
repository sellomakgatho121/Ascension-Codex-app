import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  color: string;
  opacity: number;
}

const COLORS = ['#8b5cf6', '#3b82f6', '#ffd700', '#ffffff'];
const MAX_PARTICLES = 60; // down from 100 — imperceptible difference

export function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Init particles
    particlesRef.current = Array.from({ length: MAX_PARTICLES }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.5 + 0.2,
    }));

    // Track visibility
    const onVisibility = () => {
      runningRef.current = !document.hidden;
      if (document.hidden) {
        // Tab hidden — cancel RAF and bail
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      } else {
        // Tab visible — resume
        rafRef.current = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Track viewport visibility via IntersectionObserver
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      } else if (entry.isIntersecting && !rafRef.current && runningRef.current) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }, { threshold: 0 });
    observer.observe(canvas);

    // Animation loop
    let lastTime = performance.now();
    // Cap to 30fps to reduce battery drain
    const frameInterval = 1000 / 30;

    function frame(now: number) {
      const elapsed = now - lastTime;
      if (elapsed < frameInterval) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      lastTime = now - (elapsed % frameInterval);

      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width) p.x = 0;
        else if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        else if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 gpu-layer"
      style={{ willChange: 'transform' }}
    />
  );
}
