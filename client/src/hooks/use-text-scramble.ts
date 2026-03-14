import { useState, useCallback, useRef, useEffect } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>{}[]';

interface UseTextScrambleOptions {
  speed?: number;
  revealDelay?: number;
  scrambleDuration?: number;
}

export function useTextScramble(initialText: string, options: UseTextScrambleOptions = {}) {
  const { speed = 30, revealDelay = 40, scrambleDuration = 8 } = options;
  const [text, setText] = useState(initialText);
  const [isScrambling, setIsScrambling] = useState(false);
  const targetRef = useRef(initialText);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentTextRef = useRef(initialText);

  const start = useCallback((newText?: string) => {
    const target = newText ?? targetRef.current;
    targetRef.current = target;
    setIsScrambling(true);

    if (frameRef.current) clearInterval(frameRef.current);

    let frame = 0;
    const maxLength = Math.max(currentTextRef.current.length, target.length);
    const savedText = currentTextRef.current;

    frameRef.current = setInterval(() => {
      const result = target.split('').map((targetChar, i) => {
        const revealFrame = i * (revealDelay / speed);

        if (frame >= revealFrame + scrambleDuration) {
          return targetChar;
        }
        if (frame >= revealFrame) {
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        return savedText[i] || ' ';
      }).join('');

      setText(result);
      currentTextRef.current = result;
      frame++;

      const totalFrames = maxLength * (revealDelay / speed) + scrambleDuration;
      if (frame > totalFrames) {
        if (frameRef.current) clearInterval(frameRef.current);
        setText(target);
        currentTextRef.current = target;
        setIsScrambling(false);
      }
    }, speed);
  }, [speed, revealDelay, scrambleDuration]);

  useEffect(() => {
    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, []);

  return { text, start, isScrambling };
}
