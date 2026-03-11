import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Gauge, 
  Wifi, 
  HardDrive, 
  Monitor,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  memoryUsage: number;
  renderTime: number;
  bundleSize: number;
  networkLatency: number;
  fps: number;
  errors: number;
  timestamp: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    memoryUsage: 0,
    renderTime: 0,
    bundleSize: 0,
    networkLatency: 0,
    fps: 60,
    errors: 0,
    timestamp: Date.now()
  });
  
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [history, setHistory] = useState<PerformanceMetrics[]>([]);
  const frameRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  const frameCount = useRef<number>(0);

  // Performance monitoring
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        collectMetrics();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  // FPS monitoring
  useEffect(() => {
    if (isMonitoring) {
      const measureFPS = (timestamp: number) => {
        frameCount.current++;
        
        if (timestamp - lastFrameTime.current >= 1000) {
          const currentMetrics = {
            ...metrics,
            fps: frameCount.current,
            timestamp: Date.now()
          };
          
          setMetrics(currentMetrics);
          setHistory(prev => [...prev.slice(-29), currentMetrics]); // Keep last 30 entries
          
          frameCount.current = 0;
          lastFrameTime.current = timestamp;
        }
        
        if (isMonitoring) {
          frameRef.current = requestAnimationFrame(measureFPS);
        }
      };
      
      frameRef.current = requestAnimationFrame(measureFPS);
      
      return () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    }
  }, [isMonitoring]);

  const collectMetrics = () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const memory = (performance as any).memory;
    
    const newMetrics: PerformanceMetrics = {
      loadTime: navigation ? navigation.loadEventEnd - navigation.navigationStart : 0,
      memoryUsage: memory ? (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100 : 0,
      renderTime: performance.now(),
      bundleSize: 0, // Would need build-time injection
      networkLatency: navigation ? navigation.responseStart - navigation.requestStart : 0,
      fps: metrics.fps,
      errors: window.performance.getEntriesByType('error').length,
      timestamp: Date.now()
    };
    
    setMetrics(newMetrics);
  };

  const getPerformanceScore = () => {
    let score = 100;
    
    // Load time penalty
    if (metrics.loadTime > 3000) score -= 20;
    else if (metrics.loadTime > 2000) score -= 10;
    
    // Memory usage penalty
    if (metrics.memoryUsage > 80) score -= 15;
    else if (metrics.memoryUsage > 60) score -= 8;
    
    // FPS penalty
    if (metrics.fps < 30) score -= 25;
    else if (metrics.fps < 50) score -= 10;
    
    // Network latency penalty
    if (metrics.networkLatency > 500) score -= 10;
    else if (metrics.networkLatency > 200) score -= 5;
    
    // Error penalty
    if (metrics.errors > 0) score -= metrics.errors * 5;
    
    return Math.max(0, score);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (score >= 50) return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    return <AlertTriangle className="w-4 h-4 text-red-400" />;
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const score = getPerformanceScore();

  return (
    <Card className="sacred-card">
      <CardHeader>
        <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center justify-between">
          <span className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Performance Monitor
          </span>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={`border-current ${getScoreColor(score)}`}>
              {getScoreIcon(score)}
              <span className="ml-1">{score}/100</span>
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMonitoring(!isMonitoring)}
              className="border-cosmic-600"
            >
              {isMonitoring ? 'Stop' : 'Start'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Performance Score */}
        <div className="text-center p-4 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
          <div className={`text-3xl font-bold ${getScoreColor(score)} mb-2`}>
            {score}
          </div>
          <p className="text-cosmic-300 text-sm">Performance Score</p>
          <Progress value={score} className="mt-2 h-2" />
        </div>

        {/* Core Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg border border-cosmic-700">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-cosmic-400">Load Time</span>
            </div>
            <p className="text-lg font-medium text-white">
              {(metrics.loadTime / 1000).toFixed(2)}s
            </p>
          </div>

          <div className="p-3 rounded-lg border border-cosmic-700">
            <div className="flex items-center justify-between mb-2">
              <HardDrive className="w-4 h-4 text-green-400" />
              <span className="text-xs text-cosmic-400">Memory</span>
            </div>
            <p className="text-lg font-medium text-white">
              {metrics.memoryUsage.toFixed(1)}%
            </p>
          </div>

          <div className="p-3 rounded-lg border border-cosmic-700">
            <div className="flex items-center justify-between mb-2">
              <Monitor className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-cosmic-400">FPS</span>
            </div>
            <p className="text-lg font-medium text-white">
              {metrics.fps}
            </p>
          </div>

          <div className="p-3 rounded-lg border border-cosmic-700">
            <div className="flex items-center justify-between mb-2">
              <Wifi className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-cosmic-400">Latency</span>
            </div>
            <p className="text-lg font-medium text-white">
              {metrics.networkLatency.toFixed(0)}ms
            </p>
          </div>

          <div className="p-3 rounded-lg border border-cosmic-700">
            <div className="flex items-center justify-between mb-2">
              <Gauge className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-cosmic-400">Render</span>
            </div>
            <p className="text-lg font-medium text-white">
              {metrics.renderTime.toFixed(1)}ms
            </p>
          </div>

          <div className="p-3 rounded-lg border border-cosmic-700">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-cosmic-400">Errors</span>
            </div>
            <p className="text-lg font-medium text-white">
              {metrics.errors}
            </p>
          </div>
        </div>

        {/* Performance Recommendations */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-cosmic-100">Recommendations</h4>
          <div className="space-y-2 text-xs text-cosmic-300">
            {metrics.loadTime > 3000 && (
              <div className="flex items-center p-2 rounded bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-3 h-3 text-red-400 mr-2" />
                Load time is high. Consider code splitting or image optimization.
              </div>
            )}
            {metrics.memoryUsage > 80 && (
              <div className="flex items-center p-2 rounded bg-orange-500/10 border border-orange-500/20">
                <AlertTriangle className="w-3 h-3 text-orange-400 mr-2" />
                High memory usage detected. Check for memory leaks.
              </div>
            )}
            {metrics.fps < 45 && (
              <div className="flex items-center p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle className="w-3 h-3 text-yellow-400 mr-2" />
                Low FPS detected. Reduce animations or complex calculations.
              </div>
            )}
            {score >= 90 && (
              <div className="flex items-center p-2 rounded bg-green-500/10 border border-green-500/20">
                <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                Excellent performance! Your app is running smoothly.
              </div>
            )}
          </div>
        </div>

        {/* Monitoring Status */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
          <span className="text-cosmic-100 text-sm">Real-time Monitoring</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-cosmic-300 text-xs">
              {isMonitoring ? 'Active' : 'Inactive'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => collectMetrics()}
              disabled={isMonitoring}
              aria-label="Refresh metrics"
            >
              <RefreshCw className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}