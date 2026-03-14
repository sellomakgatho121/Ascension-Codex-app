import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface UseScrollDistortionOptions {
  intensity?: number;
  direction?: 'horizontal' | 'vertical' | 'both';
  range?: [number, number];
}

interface ScrollDistortionValues {
  skewX: MotionValue<number>;
  skewY: MotionValue<number>;
  scale: MotionValue<number>;
  rotate: MotionValue<number>;
  opacity: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  ref: React.RefObject<HTMLDivElement>;
}

export function useScrollDistortion(options: UseScrollDistortionOptions = {}): ScrollDistortionValues {
  const { intensity = 1, direction = 'both', range = [0, 1] } = options;
  const ref = useRef<HTMLDivElement>(null!);
  const mid = (range[0] + range[1]) / 2;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const skewX = useTransform(scrollYProgress, [range[0], mid, range[1]],
    direction !== 'vertical' ? [3 * intensity, 0, -3 * intensity] : [0, 0, 0]);

  const skewY = useTransform(scrollYProgress, [range[0], mid, range[1]],
    direction !== 'horizontal' ? [2 * intensity, 0, -2 * intensity] : [0, 0, 0]);

  const scale = useTransform(scrollYProgress, [range[0], mid, range[1]], [0.95, 1, 0.98]);

  const rotate = useTransform(scrollYProgress, [range[0], mid, range[1]],
    [-1 * intensity, 0, 1 * intensity]);

  const opacity = useTransform(scrollYProgress,
    [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0, 1, 1, 0]);

  const x = useTransform(scrollYProgress, [range[0], mid, range[1]],
    direction !== 'vertical' ? [-20 * intensity, 0, 20 * intensity] : [0, 0, 0]);

  const y = useTransform(scrollYProgress, [range[0], mid, range[1]],
    direction !== 'horizontal' ? [30 * intensity, 0, -30 * intensity] : [0, 0, 0]);

  return { skewX, skewY, scale, rotate, opacity, x, y, ref };
}
