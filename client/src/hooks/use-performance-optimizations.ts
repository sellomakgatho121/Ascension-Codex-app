import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useMobileOptimizations } from "./use-mobile-optimizations";

// Performance optimization hooks based on React best practices
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

// Intersection Observer for lazy loading
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
}

// Memory usage monitor
export function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null>(null);

  useEffect(() => {
    if ('memory' in performance) {
      const updateMemoryInfo = () => {
        const memory = (performance as any).memory;
        setMemoryInfo({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        });
      };

      updateMemoryInfo();
      const interval = setInterval(updateMemoryInfo, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  return memoryInfo;
}

// FPS monitor
export function useFPSMonitor() {
  const [fps, setFps] = useState(60);
  const frameRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  useEffect(() => {
    const measureFPS = (timestamp: number) => {
      frameCountRef.current++;
      
      if (timestamp - timeRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (timestamp - timeRef.current)));
        frameCountRef.current = 0;
        timeRef.current = timestamp;
      }
      
      frameRef.current = requestAnimationFrame(measureFPS);
    };

    frameRef.current = requestAnimationFrame(measureFPS);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return fps;
}

// Image preloader
export function useImagePreloader(sources: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (sources.length === 0) {
      setIsLoading(false);
      return;
    }

    const imagePromises = sources.map((src) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
        img.src = src;
      });
    });

    Promise.allSettled(imagePromises).then((results) => {
      const loaded = new Set<string>();
      const failed = new Set<string>();

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          loaded.add(result.value);
        } else {
          failed.add(sources[index]);
        }
      });

      setLoadedImages(loaded);
      setErrors(failed);
      setIsLoading(false);
    });
  }, [sources]);

  return { loadedImages, isLoading, errors };
}

// Efficient event listener
export function useEventListener<T extends keyof WindowEventMap>(
  event: T,
  handler: (event: WindowEventMap[T]) => void,
  element?: HTMLElement | Window
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const targetElement = element || window;
    const eventListener = (event: Event) => handlerRef.current(event as WindowEventMap[T]);

    targetElement.addEventListener(event, eventListener);

    return () => {
      targetElement.removeEventListener(event, eventListener);
    };
  }, [event, element]);
}

// Resource usage optimizer
export function useResourceOptimizer() {
  const { adaptiveLoading, batteryStatus } = useMobileOptimizations();
  const memoryInfo = useMemoryMonitor();
  const fps = useFPSMonitor();

  const optimizationLevel = useMemo(() => {
    let level: 'low' | 'medium' | 'high' = 'medium';

    // High optimization for low battery
    if (batteryStatus.isLowBattery) {
      level = 'high';
    }
    // High optimization for low memory
    else if (memoryInfo && (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) > 0.8) {
      level = 'high';
    }
    // High optimization for low FPS
    else if (fps < 30) {
      level = 'high';
    }
    // Medium optimization for moderate conditions
    else if (adaptiveLoading.shouldReduceQuality || fps < 50) {
      level = 'medium';
    }
    // Low optimization for good conditions
    else {
      level = 'low';
    }

    return level;
  }, [batteryStatus.isLowBattery, memoryInfo, fps, adaptiveLoading.shouldReduceQuality]);

  const getOptimizedSettings = useCallback(() => {
    switch (optimizationLevel) {
      case 'high':
        return {
          particleCount: 25,
          animationDuration: 0,
          enableShadows: false,
          enableBlur: false,
          imageQuality: 0.5,
          frameRate: 30
        };
      case 'medium':
        return {
          particleCount: 50,
          animationDuration: 200,
          enableShadows: false,
          enableBlur: true,
          imageQuality: 0.7,
          frameRate: 45
        };
      case 'low':
      default:
        return {
          particleCount: 100,
          animationDuration: 400,
          enableShadows: true,
          enableBlur: true,
          imageQuality: 1,
          frameRate: 60
        };
    }
  }, [optimizationLevel]);

  return {
    optimizationLevel,
    settings: getOptimizedSettings(),
    metrics: {
      fps,
      memoryUsage: memoryInfo?.usedJSHeapSize,
      batteryLevel: batteryStatus.level
    }
  };
}

// Animation frame scheduler
export function useAnimationFrame(callback: (deltaTime: number) => void, deps: any[] = []) {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const callbackRef = useRef(callback);

  // Update callback ref
  callbackRef.current = callback;

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callbackRef.current(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, deps);

  const start = useCallback(() => {
    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const stop = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
  }, []);

  return { start, stop };
}

// Bundle analyzer
export function useBundleAnalyzer() {
  const [bundleStats, setBundleStats] = useState<{
    chunks: number;
    totalSize: number;
    jsSize: number;
    cssSize: number;
    loadTime: number;
  } | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const analyzeBundle = () => {
        const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const jsResources = entries.filter(entry => entry.name.includes('.js'));
        const cssResources = entries.filter(entry => entry.name.includes('.css'));
        
        setBundleStats({
          chunks: jsResources.length,
          totalSize: entries.reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
          jsSize: jsResources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
          cssSize: cssResources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
          loadTime: navigation.loadEventEnd - navigation.fetchStart
        });
      };

      // Wait for resources to load
      if (document.readyState === 'complete') {
        analyzeBundle();
      } else {
        window.addEventListener('load', analyzeBundle);
        return () => window.removeEventListener('load', analyzeBundle);
      }
    }
  }, []);

  return bundleStats;
}