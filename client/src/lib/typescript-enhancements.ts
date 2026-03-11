// Advanced TypeScript enhancements inspired by awesome-typescript best practices

// Performance monitoring utilities
export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  firstContentfulPaint: number;
  interactionToNextPaint: number;
}

// Type-safe event emitter for spiritual events
export class SpiritualEventEmitter<T extends Record<string, unknown[]>> {
  private listeners: Partial<{
    [K in keyof T]: Array<(...args: T[K]) => void>;
  }> = {};

  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(...args));
    }
  }

  off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}

// Spiritual events type definitions
export interface SpiritualEvents {
  'chakra-activated': [chakraId: number, frequency: number];
  'energy-shift': [level: number, direction: 'up' | 'down'];
  'protection-enabled': [shieldType: string, strength: number];
  'meditation-started': [duration: number, type: string];
  'vers-response': [message: string, voiceProfile: string];
}

// Advanced error handling with spiritual context
export class SpiritualError extends Error {
  constructor(
    message: string,
    public readonly context: {
      chakra?: number;
      energyLevel?: number;
      practiceType?: string;
      userLevel?: string;
    } = {}
  ) {
    super(message);
    this.name = 'SpiritualError';
  }
}

// Type-safe local storage with spiritual data
export class TypedStorage {
  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }
}

// Debounced function utility with proper typing
export function createDebounce<T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Performance monitor for spiritual visualizations
export class SpiritualPerformanceMonitor {
  private metrics: PerformanceMetrics = {
    renderTime: 0,
    memoryUsage: 0,
    bundleSize: 0,
    firstContentfulPaint: 0,
    interactionToNextPaint: 0
  };

  startRenderMeasurement(): () => void {
    const startTime = performance.now();
    
    return () => {
      this.metrics.renderTime = performance.now() - startTime;
      this.logMetrics();
    };
  }

  measureMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
    }
  }

  measureWebVitals(): void {
    // First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.firstContentfulPaint = entry.startTime;
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Interaction to Next Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'event') {
          this.metrics.interactionToNextPaint = (entry as any).processingStart - entry.startTime;
        }
      }
    }).observe({ entryTypes: ['event'] });
  }

  private logMetrics(): void {
    if (process.env.NODE_ENV === 'development') {
      console.table(this.metrics);
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
}

// Advanced type guards for spiritual data validation
export function isSpiritualFrequency(value: unknown): value is number {
  return typeof value === 'number' && value >= 0 && value <= 1000;
}

export function isChakraId(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 15;
}

export function isSpiritualLevel(value: unknown): value is 'beginner' | 'intermediate' | 'advanced' | 'master' | 'guardian' {
  return typeof value === 'string' && 
    ['beginner', 'intermediate', 'advanced', 'master', 'guardian'].includes(value);
}

// Async error handling with retries
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (i === maxRetries) {
        throw lastError;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  
  throw lastError!;
}

// Type-safe API client for VERS
export class TypedApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async post<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new SpiritualError(`API request failed: ${response.status}`, {
        practiceType: 'api_communication'
      });
    }

    return response.json();
  }

  async get<TResponse>(endpoint: string): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    
    if (!response.ok) {
      throw new SpiritualError(`API request failed: ${response.status}`);
    }

    return response.json();
  }
}

// Enhanced logging system for development
export class SpiritualLogger {
  private static isDevelopment = process.env.NODE_ENV === 'development';

  static info(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      console.log(`🔮 [Spiritual] ${message}`, context || '');
    }
  }

  static error(message: string, error?: Error, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      console.error(`❌ [Spiritual Error] ${message}`, error, context || '');
    }
  }

  static chakra(chakraId: number, action: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.log(`🌈 [Chakra ${chakraId}] ${action}`, data || '');
    }
  }

  static vers(message: string, response?: string): void {
    if (this.isDevelopment) {
      console.log(`🤖 [VERS] ${message}`, response || '');
    }
  }

  static performance(metric: string, value: number): void {
    if (this.isDevelopment) {
      console.log(`⚡ [Performance] ${metric}: ${value.toFixed(2)}ms`);
    }
  }
}

// Spiritual state management with TypeScript
export class SpiritualStateManager<T extends Record<string, unknown>> {
  private state: T;
  private listeners: Array<(state: T) => void> = [];

  constructor(initialState: T) {
    this.state = { ...initialState };
  }

  getState(): Readonly<T> {
    return { ...this.state };
  }

  setState(updates: Partial<T>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  subscribe(listener: (state: T) => void): () => void {
    this.listeners.push(listener);
    
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// Singleton instances for global use
export const spiritualEventEmitter = new SpiritualEventEmitter<SpiritualEvents>();
export const performanceMonitor = new SpiritualPerformanceMonitor();
export const apiClient = new TypedApiClient();

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  performanceMonitor.measureWebVitals();
  performanceMonitor.measureMemoryUsage();
}