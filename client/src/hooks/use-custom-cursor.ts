import { useState, useEffect, useRef } from 'react';

interface CursorState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  isHovering: boolean;
  isPressed: boolean;
  mode: 'default' | 'expand' | 'text' | 'hidden';
}

export function useCustomCursor() {
  const [state, setState] = useState<CursorState>({
    x: 0, y: 0, velocityX: 0, velocityY: 0,
    isHovering: false, isPressed: false, mode: 'default',
  });

  const posRef = useRef({ x: 0, y: 0 });
  const prevPosRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const smoothPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      prevPosRef.current = { ...posRef.current };
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setState(s => ({ ...s, isPressed: true }));
    const handleMouseUp = () => setState(s => ({ ...s, isPressed: false }));

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.magnetic-hover, [data-cursor="expand"]')) {
        setState(s => ({ ...s, isHovering: true, mode: 'expand' }));
      } else if (target.closest('a, button, [role="button"]')) {
        setState(s => ({ ...s, isHovering: true, mode: 'text' }));
      } else {
        setState(s => ({ ...s, isHovering: false, mode: 'default' }));
      }
    };

    const animate = () => {
      const damping = 0.12;
      smoothPos.current.x += (posRef.current.x - smoothPos.current.x) * damping;
      smoothPos.current.y += (posRef.current.y - smoothPos.current.y) * damping;
      const vx = posRef.current.x - prevPosRef.current.x;
      const vy = posRef.current.y - prevPosRef.current.y;

      setState(s => ({
        ...s, x: smoothPos.current.x, y: smoothPos.current.y,
        velocityX: vx, velocityY: vy,
      }));
      animRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return state;
}
