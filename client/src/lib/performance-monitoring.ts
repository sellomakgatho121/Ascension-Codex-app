// Advanced Performance Monitoring System for Spiritual Applications
// Implements Web Vitals, memory tracking, and spiritual-context performance analysis

import { spiritualEventEmitter, SpiritualFrequency, EnergyLevel, createEnergyLevel } from './advanced-type-system';

// Web Vitals Types
export interface WebVital {
  readonly name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  readonly value: number;
  readonly rating: 'good' | 'needs-improvement' | 'poor';
  readonly timestamp: number;
}

// Performance Metrics
export interface PerformanceMetrics {
  readonly fps: number;
  readonly memoryUsage: number; // MB
  readonly renderTime: number; // ms
  readonly energyEfficiency: EnergyLevel;
  readonly spiritualResonance: SpiritualFrequency;
  readonly timestamp: number;
}

// Memory Information
export interface MemoryInfo {
  readonly used: number;
  readonly total: number;
  readonly limit: number;
  readonly percentage: number;
}

// Performance Monitor Class
export class SpiritualPerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private webVitals: WebVital[] = [];
  private isMonitoring = false;
  private animationFrame: number | null = null;
  private startTime = 0;
  private frameCount = 0;
  private lastFrameTime = 0;

  constructor() {
    this.initializeWebVitals();
  }

  private initializeWebVitals(): void {
    // Initialize Web Vitals monitoring
    if (typeof window !== 'undefined') {
      // FCP - First Contentful Paint
      this.observePerformanceEntry('first-contentful-paint', (entry) => {
        this.recordWebVital('FCP', entry.startTime);
      });

      // LCP - Largest Contentful Paint
      this.observeLCP();

      // FID - First Input Delay
      this.observeFID();

      // CLS - Cumulative Layout Shift
      this.observeCLS();

      // TTFB - Time to First Byte
      this.observeTTFB();
    }
  }

  private observePerformanceEntry(type: string, callback: (entry: PerformanceEntry) => void): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(callback);
      });
      observer.observe({ entryTypes: ['paint'] });
    }
  }

  private observeLCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordWebVital('LCP', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  private observeFID(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          this.recordWebVital('FID', entry.processingStart - entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  private observeCLS(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.recordWebVital('CLS', clsValue);
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  private observeTTFB(): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        this.recordWebVital('TTFB', ttfb);
      }
    }
  }

  private recordWebVital(name: WebVital['name'], value: number): void {
    const rating = this.getRating(name, value);
    const webVital: WebVital = {
      name,
      value,
      rating,
      timestamp: Date.now()
    };

    this.webVitals.push(webVital);
    
    // Emit spiritual event for performance tracking
    spiritualEventEmitter.emit('web-vital-recorded', webVital);

    // Log performance issues
    if (rating === 'poor') {
      console.warn(`Poor ${name} performance detected:`, value);
    }
  }

  private getRating(name: WebVital['name'], value: number): WebVital['rating'] {
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[name];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  public startMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.startTime = performance.now();
    this.frameCount = 0;
    this.lastFrameTime = this.startTime;

    this.measureFrame();
  }

  public stopMonitoring(): void {
    this.isMonitoring = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private measureFrame(): void {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    this.frameCount++;

    // Calculate metrics every second
    if (currentTime - this.startTime >= 1000) {
      const fps = Math.round((this.frameCount * 1000) / (currentTime - this.startTime));
      const renderTime = currentTime - this.lastFrameTime;
      const memoryInfo = this.getMemoryInfo();
      
      const metrics: PerformanceMetrics = {
        fps,
        memoryUsage: memoryInfo.used,
        renderTime,
        energyEfficiency: this.calculateEnergyEfficiency(fps, memoryInfo.percentage),
        spiritualResonance: this.calculateSpiritualResonance(fps, memoryInfo.percentage),
        timestamp: Date.now()
      };

      this.metrics.push(metrics);
      
      // Keep only last 100 measurements
      if (this.metrics.length > 100) {
        this.metrics.shift();
      }

      // Emit performance event
      spiritualEventEmitter.emit('performance-measured', metrics);

      // Reset counters
      this.startTime = currentTime;
      this.frameCount = 0;
    }

    this.lastFrameTime = currentTime;
    this.animationFrame = requestAnimationFrame(() => this.measureFrame());
  }

  private getMemoryInfo(): MemoryInfo {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const used = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      const total = Math.round(memory.totalJSHeapSize / 1024 / 1024);
      const limit = Math.round(memory.jsHeapSizeLimit / 1024 / 1024);
      
      return {
        used,
        total,
        limit,
        percentage: Math.round((used / limit) * 100)
      };
    }

    return {
      used: 0,
      total: 0,
      limit: 0,
      percentage: 0
    };
  }

  private calculateEnergyEfficiency(fps: number, memoryPercentage: number): EnergyLevel {
    // Higher FPS and lower memory usage = higher energy efficiency
    const fpsScore = Math.min(fps / 60, 1) * 50; // Max 50 points for 60+ FPS
    const memoryScore = Math.max(0, (100 - memoryPercentage) / 100) * 50; // Max 50 points for low memory
    
    return createEnergyLevel(Math.round(fpsScore + memoryScore));
  }

  private calculateSpiritualResonance(fps: number, memoryPercentage: number): SpiritualFrequency {
    // Spiritual resonance based on performance harmony
    // Perfect 60 FPS with low memory usage creates 528 Hz (Love frequency)
    const baseFrequency = 528;
    const fpsMultiplier = fps / 60;
    const memoryMultiplier = Math.max(0.5, (100 - memoryPercentage) / 100);
    
    return Math.round(baseFrequency * fpsMultiplier * memoryMultiplier) as SpiritualFrequency;
  }

  public getCurrentMetrics(): PerformanceMetrics | null {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
  }

  public getAverageMetrics(samples = 10): Partial<PerformanceMetrics> | null {
    if (this.metrics.length === 0) return null;

    const recentMetrics = this.metrics.slice(-samples);
    const count = recentMetrics.length;

    return {
      fps: Math.round(recentMetrics.reduce((sum, m) => sum + m.fps, 0) / count),
      memoryUsage: Math.round(recentMetrics.reduce((sum, m) => sum + m.memoryUsage, 0) / count),
      renderTime: Math.round(recentMetrics.reduce((sum, m) => sum + m.renderTime, 0) / count),
      energyEfficiency: createEnergyLevel(
        Math.round(recentMetrics.reduce((sum, m) => sum + m.energyEfficiency, 0) / count)
      ),
      spiritualResonance: Math.round(
        recentMetrics.reduce((sum, m) => sum + m.spiritualResonance, 0) / count
      ) as SpiritualFrequency
    };
  }

  public getWebVitals(): readonly WebVital[] {
    return [...this.webVitals];
  }

  public getPerformanceScore(): number {
    const webVitalScore = this.calculateWebVitalScore();
    const runtimeScore = this.calculateRuntimeScore();
    
    return Math.round((webVitalScore + runtimeScore) / 2);
  }

  private calculateWebVitalScore(): number {
    if (this.webVitals.length === 0) return 0;

    const scores = this.webVitals.map(vital => {
      switch (vital.rating) {
        case 'good': return 100;
        case 'needs-improvement': return 50;
        case 'poor': return 0;
        default: return 0;
      }
    });

    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }

  private calculateRuntimeScore(): number {
    const currentMetrics = this.getCurrentMetrics();
    if (!currentMetrics) return 0;

    const fpsScore = Math.min(currentMetrics.fps / 60 * 100, 100);
    const memoryScore = Math.max(0, (100 - (currentMetrics.memoryUsage / 512 * 100)));
    const renderScore = Math.max(0, (100 - (currentMetrics.renderTime / 16.67 * 100)));

    return (fpsScore + memoryScore + renderScore) / 3;
  }

  public generateOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];
    const currentMetrics = this.getCurrentMetrics();

    if (!currentMetrics) {
      return ['Start performance monitoring to receive recommendations'];
    }

    // FPS recommendations
    if (currentMetrics.fps < 30) {
      recommendations.push('Consider reducing visual effects complexity for better frame rate');
      recommendations.push('Disable particle systems during intensive operations');
    }

    // Memory recommendations
    if (currentMetrics.memoryUsage > 256) {
      recommendations.push('High memory usage detected - consider optimizing assets');
      recommendations.push('Clear unused spiritual event listeners');
    }

    // Render time recommendations
    if (currentMetrics.renderTime > 20) {
      recommendations.push('Slow rendering detected - optimize WebGL shader complexity');
      recommendations.push('Consider using requestIdleCallback for non-critical operations');
    }

    // Spiritual resonance recommendations
    if (currentMetrics.spiritualResonance < 400) {
      recommendations.push('Low spiritual resonance - balance performance with energy efficiency');
      recommendations.push('Consider adjusting meditation session parameters');
    }

    if (recommendations.length === 0) {
      recommendations.push('Performance is optimal - spiritual energy flowing harmoniously');
    }

    return recommendations;
  }
}

// Singleton Performance Monitor
export const spiritualPerformanceMonitor = new SpiritualPerformanceMonitor();

// React Hook for Performance Monitoring
export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics | null>(null);
  const [webVitals, setWebVitals] = React.useState<WebVital[]>([]);
  const [isMonitoring, setIsMonitoring] = React.useState(false);

  React.useEffect(() => {
    const handlePerformanceMeasured = (event: any) => {
      setMetrics(event.data);
    };

    const handleWebVitalRecorded = (event: any) => {
      setWebVitals(prev => [...prev, event.data]);
    };

    spiritualEventEmitter.on('performance-measured', handlePerformanceMeasured);
    spiritualEventEmitter.on('web-vital-recorded', handleWebVitalRecorded);

    return () => {
      spiritualEventEmitter.off('performance-measured', handlePerformanceMeasured);
      spiritualEventEmitter.off('web-vital-recorded', handleWebVitalRecorded);
    };
  }, []);

  const startMonitoring = React.useCallback(() => {
    spiritualPerformanceMonitor.startMonitoring();
    setIsMonitoring(true);
  }, []);

  const stopMonitoring = React.useCallback(() => {
    spiritualPerformanceMonitor.stopMonitoring();
    setIsMonitoring(false);
  }, []);

  const getAverageMetrics = React.useCallback((samples?: number) => {
    return spiritualPerformanceMonitor.getAverageMetrics(samples);
  }, []);

  const getPerformanceScore = React.useCallback(() => {
    return spiritualPerformanceMonitor.getPerformanceScore();
  }, []);

  const getOptimizationRecommendations = React.useCallback(() => {
    return spiritualPerformanceMonitor.generateOptimizationRecommendations();
  }, []);

  return {
    metrics,
    webVitals,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    getAverageMetrics,
    getPerformanceScore,
    getOptimizationRecommendations
  };
}

// Performance Debugging Utilities
export const PerformanceDebugger = {
  logMetrics: () => {
    const metrics = spiritualPerformanceMonitor.getCurrentMetrics();
    const webVitals = spiritualPerformanceMonitor.getWebVitals();
    const score = spiritualPerformanceMonitor.getPerformanceScore();

    console.group('🔮 Spiritual Performance Metrics');
    console.log('Current Metrics:', metrics);
    console.log('Web Vitals:', webVitals);
    console.log('Performance Score:', score);
    console.log('Recommendations:', spiritualPerformanceMonitor.generateOptimizationRecommendations());
    console.groupEnd();
  },

  measureFunction: <T extends (...args: any[]) => any>(fn: T, name: string): T => {
    return ((...args: any[]) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      
      console.log(`⚡ ${name} execution time: ${(end - start).toFixed(2)}ms`);
      
      if (result instanceof Promise) {
        return result.finally(() => {
          const asyncEnd = performance.now();
          console.log(`⚡ ${name} total time (async): ${(asyncEnd - start).toFixed(2)}ms`);
        });
      }
      
      return result;
    }) as T;
  },

  measureRender: (componentName: string) => {
    return {
      start: performance.now(),
      end: function(this: { start: number }) {
        const renderTime = performance.now() - this.start;
        console.log(`🎨 ${componentName} render time: ${renderTime.toFixed(2)}ms`);
        
        if (renderTime > 16.67) {
          console.warn(`⚠️ ${componentName} slow render detected (${renderTime.toFixed(2)}ms > 16.67ms)`);
        }
      }
    };
  }
};

// React import - needed for the hook
import React from 'react';