import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Wifi, 
  WifiOff, 
  Battery, 
  BatteryLow,
  Signal,
  Vibrate,
  TouchpadOff,
  Eye,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Zap,
  Clock
} from "lucide-react";
import { useMobileOptimizations } from "@/hooks/use-mobile-optimizations";

// Device-aware responsive card component
export function ResponsiveCard({ 
  children, 
  priority = "normal",
  ...props 
}: { 
  children: React.ReactNode;
  priority?: "low" | "normal" | "high";
  [key: string]: any;
}) {
  const { viewport, adaptiveLoading, batteryStatus } = useMobileOptimizations();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      const delay = priority === "high" ? 0 : priority === "normal" ? 0.1 : 0.2;
      
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: adaptiveLoading.shouldReduceQuality ? 0.2 : 0.6,
          delay: adaptiveLoading.shouldReduceQuality ? 0 : delay,
          ease: "easeOut",
        },
      });
    }
  }, [isInView, controls, priority, adaptiveLoading]);

  // Reduce effects on low battery
  const shouldReduceEffects = batteryStatus.isLowBattery || adaptiveLoading.shouldReduceQuality;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={controls}
      className={`
        ${viewport.isMobile ? 'w-full' : 'w-auto'}
        ${shouldReduceEffects ? '' : 'gpu-accelerated'}
      `}
      {...props}
    >
      <Card className={`
        bg-cosmic-800/50 border-cosmic-600 transition-all duration-300
        ${!shouldReduceEffects ? 'hover:border-sacred-gold/50 hover:shadow-lg hover:shadow-sacred-gold/10' : ''}
        ${viewport.isMobile ? 'touch-target' : ''}
      `}>
        {children}
      </Card>
    </motion.div>
  );
}

// Smart image component with adaptive loading
export function AdaptiveImage({ 
  src, 
  alt, 
  className = "",
  priority = false,
  ...props 
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  [key: string]: any;
}) {
  const { adaptiveLoading, networkStatus } = useMobileOptimizations();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    if (!networkStatus.isOnline) {
      // Show placeholder when offline
      setImageSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMUExNjI1Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRDRBRjM3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk9mZmxpbmU8L3RleHQ+Cjwvc3ZnPg==');
      return;
    }

    if (adaptiveLoading.shouldReduceQuality && !priority) {
      // Skip non-priority images on slow connections
      return;
    }

    setImageSrc(src);
  }, [src, priority, adaptiveLoading, networkStatus]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {!imageLoaded && imageSrc && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cosmic-700/30 animate-pulse"
          />
        )}
      </AnimatePresence>
      
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
          {...props}
        />
      )}
    </div>
  );
}

// Gesture-enabled interaction component
export function GestureInteractive({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown,
  ...props 
}: {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  [key: string]: any;
}) {
  const { touchDevice } = useMobileOptimizations();
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startPos) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    setStartPos(null);
  };

  if (!touchDevice.isTouch) {
    return <div {...props}>{children}</div>;
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="gesture-enabled"
      {...props}
    >
      {children}
    </div>
  );
}

// Performance monitor component
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    connectionSpeed: 'unknown',
    loadTime: 0,
  });
  
  const { 
    networkStatus, 
    capabilities, 
    batteryStatus, 
    viewport 
  } = useMobileOptimizations();

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const updateFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime)),
          memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
          connectionSpeed: networkStatus.effectiveType,
          loadTime: performance.now(),
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(updateFPS);
    };

    updateFPS();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [networkStatus]);

  return (
    <Card className="bg-cosmic-800/30 border-cosmic-700">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-cosmic-200 flex items-center">
          <Monitor className="w-4 h-4 mr-2" />
          Performance Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Device Type */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-cosmic-400 flex items-center">
            {viewport.isMobile ? <Smartphone className="w-3 h-3 mr-1" /> :
             viewport.isTablet ? <Tablet className="w-3 h-3 mr-1" /> :
             <Monitor className="w-3 h-3 mr-1" />}
            Device
          </span>
          <Badge variant="outline" className="text-xs">
            {viewport.isMobile ? 'Mobile' : viewport.isTablet ? 'Tablet' : 'Desktop'}
          </Badge>
        </div>

        {/* Network Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-cosmic-400 flex items-center">
            {networkStatus.isOnline ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
            Network
          </span>
          <Badge 
            variant="outline" 
            className={`text-xs ${
              networkStatus.isOnline ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'
            }`}
          >
            {networkStatus.effectiveType || 'offline'}
          </Badge>
        </div>

        {/* Battery */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-cosmic-400 flex items-center">
            {batteryStatus.isLowBattery ? <BatteryLow className="w-3 h-3 mr-1" /> : <Battery className="w-3 h-3 mr-1" />}
            Battery
          </span>
          <Badge 
            variant="outline" 
            className={`text-xs ${
              batteryStatus.isLowBattery ? 'border-red-400 text-red-400' : 'border-green-400 text-green-400'
            }`}
          >
            {Math.round(batteryStatus.level * 100)}%
          </Badge>
        </div>

        {/* Performance FPS */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-cosmic-400 flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            FPS
          </span>
          <Badge 
            variant="outline" 
            className={`text-xs ${
              metrics.fps >= 50 ? 'border-green-400 text-green-400' :
              metrics.fps >= 30 ? 'border-yellow-400 text-yellow-400' :
              'border-red-400 text-red-400'
            }`}
          >
            {metrics.fps}
          </Badge>
        </div>

        {/* Memory Usage */}
        {capabilities.deviceMemory && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-cosmic-400">Memory</span>
              <span className="text-xs text-cosmic-300">
                {Math.round(metrics.memoryUsage / 1024 / 1024)}MB
              </span>
            </div>
            <Progress 
              value={(metrics.memoryUsage / 1024 / 1024) / (capabilities.deviceMemory * 1024) * 100} 
              className="h-1"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Accessibility-enhanced button
export function AccessibleButton({ 
  children, 
  variant = "default",
  reducedMotion = false,
  highContrast = false,
  ...props 
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  reducedMotion?: boolean;
  highContrast?: boolean;
  [key: string]: any;
}) {
  const { 
    touchDevice, 
    prefersReducedMotion, 
    prefersHighContrast 
  } = useMobileOptimizations();

  const shouldReduceMotion = reducedMotion || prefersReducedMotion;
  const shouldUseHighContrast = highContrast || prefersHighContrast;

  return (
    <motion.div
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
    >
      <Button
        variant={variant}
        className={`
          touch-target transition-all duration-200
          ${shouldUseHighContrast ? 'high-contrast-border' : ''}
          ${touchDevice.isTouch ? 'touch-feedback' : ''}
          mobile-focus-visible
        `}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

// Smart loading component with network awareness
export function SmartLoader({ 
  size = "default",
  text = "Loading spiritual guidance...",
  showProgress = false,
  progress = 0
}: {
  size?: "sm" | "default" | "lg";
  text?: string;
  showProgress?: boolean;
  progress?: number;
}) {
  const { adaptiveLoading, networkStatus } = useMobileOptimizations();

  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  if (adaptiveLoading.shouldReduceQuality) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <div className={`${sizeClasses[size]} border-2 border-sacred-gold border-t-transparent rounded-full animate-spin`} />
        {text && <p className="text-sm text-cosmic-300">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div className={`${sizeClasses[size]} border-2 border-sacred-gold/30 rounded-full`} />
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-sacred-gold border-t-transparent rounded-full`} />
      </motion.div>
      
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-cosmic-300 text-center max-w-xs"
        >
          {text}
        </motion.p>
      )}

      {showProgress && (
        <div className="w-full max-w-xs">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-cosmic-400 text-center mt-1">
            {Math.round(progress)}% complete
          </p>
        </div>
      )}

      {!networkStatus.isOnline && (
        <Badge variant="outline" className="border-red-400 text-red-400">
          Working offline
        </Badge>
      )}
    </div>
  );
}