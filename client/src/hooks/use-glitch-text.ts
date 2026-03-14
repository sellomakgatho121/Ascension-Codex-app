import { useState, useEffect, useCallback, useRef } from 'react';

const GLITCH_CHARS = '█▓▒░╔╗╚╝╠╣║═╬┼─│┤├┬┴';

interface UseGlitchTextOptions {
  intensity?: number;
  speed?: number;
  autoStart?: boolean;
  duration?: number;
}

export function useGlitchText(originalText: string, options: UseGlitchTextOptions = {}) {
  const { intensity = 0.3, speed = 50, autoStart = false, duration = 1000 } = options;
  const [text, setText] = useState(originalText);
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const glitchify = useCallback((str: string, level: number) => {
    return str.split('').map(char => {
      if (char === ' ') return ' ';
      if (Math.random() < level) {
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      return char;
    }).join('');
  }, []);

  const trigger = useCallback(() => {
    setIsGlitching(true);
    let elapsed = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    intervalRef.current = setInterval(() => {
      elapsed += speed;
      const progress = Math.min(elapsed / duration, 1);
      const currentIntensity = intensity * (1 - progress * 0.8);
      setText(glitchify(originalText, currentIntensity));
    }, speed);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setText(originalText);
      setIsGlitching(false);
    }, duration);
  }, [originalText, intensity, speed, duration, glitchify]);

  useEffect(() => {
    if (autoStart) trigger();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [autoStart, trigger]);

  useEffect(() => {
    if (!isGlitching) setText(originalText);
  }, [originalText, isGlitching]);

  return { text, isGlitching, trigger };
}
