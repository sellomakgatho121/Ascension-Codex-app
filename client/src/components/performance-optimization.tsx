import { lazy, Suspense, memo, useMemo, useCallback, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LoadingState } from "@/components/loading-states";

// Lazy loading for heavy components based on awesome-react performance patterns
export const LazyChakraVisualization = lazy(() => 
  import("@/components/chakra-visualization").then(module => ({
    default: module.ChakraVisualization
  }))
);

export const LazyCreativeVisuals = lazy(() => 
  import("@/components/creative-coding/spiritual-visuals").then(module => ({
    default: module.SpiritualVisuals
  }))
);

export const LazyAdvancedConversationalAI = lazy(() => 
  import("@/components/advanced-conversational-ai").then(module => ({
    default: module.AdvancedConversationalAI
  }))
);

export const Lazy3DVisualizations = lazy(() => 
  import("@/components/advanced-3d-visualizations").then(module => ({
    default: module.Advanced3DVisualizations
  }))
);

// Performance-optimized wrapper component
interface OptimizedComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  priority?: 'high' | 'medium' | 'low';
}

export const OptimizedComponent = memo(({ 
  children, 
  fallback = <LoadingState />,
  priority = 'medium'
}: OptimizedComponentProps) => {
  const loadingElement = useMemo(() => {
    if (priority === 'high') {
      return <LoadingState />;
    }
    if (priority === 'low') {
      return <div className="h-64 bg-cosmic-800/30 rounded-lg animate-pulse" />;
    }
    return fallback;
  }, [fallback, priority]);

  return (
    <Suspense fallback={loadingElement}>
      {children}
    </Suspense>
  );
});

// Virtualized list for large datasets
interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function VirtualizedList<T>({ 
  items, 
  renderItem, 
  itemHeight, 
  containerHeight,
  overscan = 5
}: VirtualizedListProps<T>) {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const totalHeight = items.length * itemHeight;

  const renderVisibleItems = useCallback(() => {
    const startIndex = Math.max(0, 0 - overscan);
    const endIndex = Math.min(items.length - 1, visibleCount + overscan);
    
    return items.slice(startIndex, endIndex + 1).map((item, idx) => (
      <div
        key={startIndex + idx}
        style={{
          position: 'absolute',
          top: (startIndex + idx) * itemHeight,
          height: itemHeight,
          width: '100%'
        }}
      >
        {renderItem(item, startIndex + idx)}
      </div>
    ));
  }, [items, itemHeight, overscan, renderItem, visibleCount]);

  return (
    <div 
      style={{ 
        height: containerHeight, 
        overflow: 'auto',
        position: 'relative'
      }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {renderVisibleItems()}
      </div>
    </div>
  );
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(entry.target);
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [callback, options]);

  return targetRef;
}

// Image optimization component
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  className?: string;
}

export const OptimizedImage = memo(({ 
  src, 
  alt, 
  width, 
  height, 
  quality = 75,
  priority = false,
  className = ""
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Progressive enhancement for WebP support
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-cosmic-700/30 animate-pulse"
          style={{ width, height }}
        />
      )}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
});

// Bundle size analyzer utility
export function BundleAnalyzer() {
  const [bundleInfo, setBundleInfo] = useState<any>(null);

  useEffect(() => {
    // Simulate bundle analysis
    const analyze = () => {
      const chunks = performance.getEntriesByType('navigation');
      const resources = performance.getEntriesByType('resource');
      
      setBundleInfo({
        mainBundle: chunks[0]?.transferSize || 0,
        totalResources: resources.length,
        jsSize: resources
          .filter(r => r.name.includes('.js'))
          .reduce((sum, r) => sum + (r.transferSize || 0), 0),
        cssSize: resources
          .filter(r => r.name.includes('.css'))
          .reduce((sum, r) => sum + (r.transferSize || 0), 0),
      });
    };

    if (process.env.NODE_ENV === 'development') {
      analyze();
    }
  }, []);

  if (!bundleInfo || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-cosmic-800 border border-cosmic-600 rounded-lg p-3 text-xs z-50">
      <h4 className="font-medium text-sacred-gold mb-2">Bundle Info</h4>
      <div className="space-y-1 text-cosmic-300">
        <div>JS: {(bundleInfo.jsSize / 1024).toFixed(1)}KB</div>
        <div>CSS: {(bundleInfo.cssSize / 1024).toFixed(1)}KB</div>
        <div>Resources: {bundleInfo.totalResources}</div>
      </div>
    </div>
  );
}

// Memory leak prevention
export function useCleanup(cleanup: () => void) {
  useEffect(() => {
    return cleanup;
  }, [cleanup]);
}

// Animation performance monitor
export function useAnimationPerformance() {
  const [fps, setFps] = useState(60);
  const frameRef = useRef<number>();
  const timestampRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  useEffect(() => {
    const measureFps = (timestamp: number) => {
      frameCountRef.current++;
      
      if (timestamp - timestampRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (timestamp - timestampRef.current)));
        frameCountRef.current = 0;
        timestampRef.current = timestamp;
      }
      
      frameRef.current = requestAnimationFrame(measureFps);
    };

    frameRef.current = requestAnimationFrame(measureFps);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return fps;
}