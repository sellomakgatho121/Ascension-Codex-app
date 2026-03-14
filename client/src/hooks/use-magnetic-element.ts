import { useRef, useEffect, useCallback } from 'react';

interface UseMagneticOptions {
  radius?: number;
  strength?: number;
  damping?: number;
}

export function useMagneticElement<T extends HTMLElement>(options: UseMagneticOptions = {}) {
  const { radius = 100, strength = 0.3, damping = 0.15 } = options;
  const ref = useRef<T>(null);
  const animationRef = useRef<number>(0);
  const currentTransform = useRef({ x: 0, y: 0 });
  const targetTransform = useRef({ x: 0, y: 0 });

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength;
        targetTransform.current = { x: distX * pull, y: distY * pull };
      } else {
        targetTransform.current = { x: 0, y: 0 };
      }
    };

    const handleMouseLeave = () => {
      targetTransform.current = { x: 0, y: 0 };
    };

    const animate = () => {
      currentTransform.current.x = lerp(currentTransform.current.x, targetTransform.current.x, damping);
      currentTransform.current.y = lerp(currentTransform.current.y, targetTransform.current.y, damping);
      element.style.transform = `translate(${currentTransform.current.x}px, ${currentTransform.current.y}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
      if (element) element.style.transform = '';
    };
  }, [radius, strength, damping, lerp]);

  return ref;
}
