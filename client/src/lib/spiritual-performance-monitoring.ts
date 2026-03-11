/**
 * Spiritual Performance Monitoring System
 * Focused on spiritual development and ascension metrics
 */

import { useState, useCallback } from 'react';

export interface SpiritualMetrics {
  // Spiritual resonance metrics
  chakraActivationTime?: number;
  meditationSessionDuration?: number;
  visualizationLoadTime?: number;
  knowledgeBaseSearchTime?: number;
  spiritualResonance: number;
  energyFieldStrength: number;
  consciousnessExpansion: number;
}

export interface SpiritualThresholds {
  excellent: number;
  good: number;
  needsImprovement: number;
}

export const SPIRITUAL_THRESHOLDS: Record<keyof SpiritualMetrics, SpiritualThresholds> = {
  chakraActivationTime: { excellent: 200, good: 500, needsImprovement: 1000 },
  meditationSessionDuration: { excellent: 300000, good: 600000, needsImprovement: 300000 },
  visualizationLoadTime: { excellent: 500, good: 1000, needsImprovement: 2000 },
  knowledgeBaseSearchTime: { excellent: 100, good: 300, needsImprovement: 500 },
  spiritualResonance: { excellent: 90, good: 70, needsImprovement: 50 },
  energyFieldStrength: { excellent: 85, good: 65, needsImprovement: 45 },
  consciousnessExpansion: { excellent: 80, good: 60, needsImprovement: 40 },
};

class SpiritualPerformanceMonitor {
  private metrics: Partial<SpiritualMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeSpiritualMetrics();
  }

  private initializeSpiritualMetrics() {
    // Initialize with default spiritual values
    this.metrics = {
      spiritualResonance: 75,
      energyFieldStrength: 70,
      consciousnessExpansion: 65,
    };
  }

  trackChakraActivation(chakraId: number, startTime: number) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    this.metrics.chakraActivationTime = duration;
    console.log(`🌈 Chakra ${chakraId} activated in ${duration.toFixed(2)}ms`);
  }

  trackMeditationSession(startTime: number) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    this.metrics.meditationSessionDuration = duration;
    console.log(`🧘 Meditation session: ${(duration / 1000).toFixed(2)}s`);
  }

  trackVisualizationLoad(componentName: string, startTime: number) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    this.metrics.visualizationLoadTime = duration;
    console.log(`🔮 ${componentName} loaded in ${duration.toFixed(2)}ms`);
  }

  trackKnowledgeBaseSearch(query: string, startTime: number) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    this.metrics.knowledgeBaseSearchTime = duration;
    console.log(`📚 Knowledge search "${query}" completed in ${duration.toFixed(2)}ms`);
  }

  updateSpiritualResonance(value: number) {
    this.metrics.spiritualResonance = Math.max(0, Math.min(100, value));
  }

  updateEnergyFieldStrength(value: number) {
    this.metrics.energyFieldStrength = Math.max(0, Math.min(100, value));
  }

  updateConsciousnessExpansion(value: number) {
    this.metrics.consciousnessExpansion = Math.max(0, Math.min(100, value));
  }

  getSpiritualScore(): number {
    const metrics = this.metrics;
    if (!metrics.spiritualResonance || !metrics.energyFieldStrength || !metrics.consciousnessExpansion) {
      return 0;
    }

    const avgScore = (
      metrics.spiritualResonance + 
      metrics.energyFieldStrength + 
      metrics.consciousnessExpansion
    ) / 3;

    return Math.round(avgScore);
  }

  getSpiritualReport() {
    const score = this.getSpiritualScore();
    const recommendations = this.getSpiritualRecommendations();
    
    return {
      score,
      metrics: this.metrics,
      recommendations,
      status: score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'needsImprovement'
    };
  }

  private getSpiritualRecommendations(): string[] {
    const recommendations: string[] = [];
    const metrics = this.metrics;

    if (metrics.spiritualResonance && metrics.spiritualResonance < 60) {
      recommendations.push('Practice daily meditation to increase spiritual resonance');
    }

    if (metrics.energyFieldStrength && metrics.energyFieldStrength < 60) {
      recommendations.push('Work on chakra balancing and energy field strengthening');
    }

    if (metrics.consciousnessExpansion && metrics.consciousnessExpansion < 60) {
      recommendations.push('Engage in consciousness expansion practices and study');
    }

    if (metrics.chakraActivationTime && metrics.chakraActivationTime > 1000) {
      recommendations.push('Focus on chakra activation techniques for faster response');
    }

    if (metrics.meditationSessionDuration && metrics.meditationSessionDuration < 300000) {
      recommendations.push('Extend meditation sessions for deeper spiritual development');
    }

    return recommendations;
  }

  disconnectObservers(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const spiritualPerformanceMonitor = new SpiritualPerformanceMonitor();

export function useSpiritualPerformanceMonitoring() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [metrics, setMetrics] = useState<Partial<SpiritualMetrics> | null>(null);

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    const interval = setInterval(() => {
      setMetrics({
        spiritualResonance: 75 + Math.random() * 20,
        energyFieldStrength: 70 + Math.random() * 20,
        consciousnessExpansion: 65 + Math.random() * 20
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    setMetrics(null);
  }, []);

  const getSpiritualScore = useCallback(() => {
    return spiritualPerformanceMonitor.getSpiritualScore();
  }, []);

  const getSpiritualRecommendations = useCallback(() => {
    return spiritualPerformanceMonitor.getSpiritualReport().recommendations;
  }, []);

  const trackVisualizationLoad = (componentName: string) => {
    const startTime = performance.now();
    return () => spiritualPerformanceMonitor.trackVisualizationLoad(componentName, startTime);
  };

  const trackMeditationSession = () => {
    const startTime = performance.now();
    return () => spiritualPerformanceMonitor.trackMeditationSession(startTime);
  };

  const trackSearch = (query: string) => {
    const startTime = performance.now();
    return () => spiritualPerformanceMonitor.trackKnowledgeBaseSearch(query, startTime);
  };

  const getSpiritualReport = () => spiritualPerformanceMonitor.getSpiritualReport();

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    getSpiritualScore,
    getSpiritualRecommendations,
    trackVisualizationLoad,
    trackMeditationSession,
    trackSearch,
    getSpiritualReport
  };
}

export class SpiritualPerformanceDebugger {
  static logMetrics(): void {
    const report = spiritualPerformanceMonitor.getSpiritualReport();
    console.group('🔮 Spiritual Performance Debugger');
    console.log('📊 Spiritual Score:', report.score);
    console.log('📈 Metrics:', report.metrics);
    console.log('💡 Recommendations:', report.recommendations);
    console.groupEnd();
  }

  static getCurrentMetrics(): Partial<SpiritualMetrics> {
    return spiritualPerformanceMonitor.getSpiritualReport().metrics;
  }

  static getSpiritualScore(): number {
    return spiritualPerformanceMonitor.getSpiritualScore();
  }

  static getRecommendations(): string[] {
    return spiritualPerformanceMonitor.getSpiritualReport().recommendations;
  }

  static startProfiling(name: string): void {
    console.time(`🔮 ${name}`);
  }

  static endProfiling(name: string): void {
    console.timeEnd(`🔮 ${name}`);
  }

  static measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
    return result;
  }

  static async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
    return result;
  }
}
