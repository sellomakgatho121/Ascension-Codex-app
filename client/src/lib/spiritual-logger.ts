// Comprehensive Logging System with Spiritual Context Awareness
// Implements structured logging, performance tracking, and spiritual development insights

import { 
  ChakraID, 
  EnergyLevel, 
  SpiritualFrequency, 
  spiritualEventEmitter 
} from './advanced-type-system';

// Log Levels with Spiritual Context
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical' | 'spiritual';

// Spiritual Log Categories
export type SpiritualCategory = 
  | 'chakra_activation'
  | 'lightbody_development'
  | 'merkaba_spinning'
  | 'dna_activation'
  | 'energy_healing'
  | 'psychic_protection'
  | 'meditation_practice'
  | 'vers_guidance'
  | 'consciousness_expansion'
  | 'frequency_alignment'
  | 'performance_monitoring'
  | 'user_interaction'
  | 'system_operation';

// Log Entry Interface
export interface LogEntry {
  readonly id: string;
  readonly timestamp: Date;
  readonly level: LogLevel;
  readonly category: SpiritualCategory;
  readonly message: string;
  readonly data?: unknown;
  readonly spiritualContext?: SpiritualLogContext;
  readonly performanceData?: PerformanceLogData;
  readonly userContext?: UserLogContext;
  readonly stack?: string;
  readonly tags?: readonly string[];
}

// Spiritual Context for Logging
export interface SpiritualLogContext {
  readonly activeChakra?: ChakraID;
  readonly energyLevel?: EnergyLevel;
  readonly frequency?: SpiritualFrequency;
  readonly practiceType?: string;
  readonly protectionActive?: boolean;
  readonly dimensionalLevel?: number;
  readonly lightbodyLayer?: number;
  readonly merkabaSpin?: 'clockwise' | 'counterclockwise' | 'stopped';
  readonly dnaStrands?: number;
}

// Performance Context for Logging
export interface PerformanceLogData {
  readonly executionTime?: number;
  readonly memoryUsage?: number;
  readonly renderTime?: number;
  readonly fps?: number;
  readonly apiLatency?: number;
  readonly errorCount?: number;
}

// User Context for Logging
export interface UserLogContext {
  readonly userId?: string;
  readonly sessionId?: string;
  readonly userAgent?: string;
  readonly spiritualLevel?: EnergyLevel;
  readonly currentPage?: string;
  readonly previousPage?: string;
  readonly timeOnPage?: number;
}

// Log Formatter Interface
export interface LogFormatter {
  format(entry: LogEntry): string;
}

// Log Transport Interface
export interface LogTransport {
  log(entry: LogEntry): Promise<void>;
}

// Console Log Formatter
export class ConsoleLogFormatter implements LogFormatter {
  format(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const level = entry.level.toUpperCase().padEnd(8);
    const category = entry.category.padEnd(20);
    
    let formatted = `${timestamp} [${level}] ${category} ${entry.message}`;
    
    if (entry.spiritualContext) {
      const spiritual = this.formatSpiritualContext(entry.spiritualContext);
      formatted += `\n  🔮 Spiritual: ${spiritual}`;
    }
    
    if (entry.performanceData) {
      const performance = this.formatPerformanceData(entry.performanceData);
      formatted += `\n  ⚡ Performance: ${performance}`;
    }
    
    if (entry.data) {
      formatted += `\n  📊 Data: ${JSON.stringify(entry.data, null, 2)}`;
    }
    
    if (entry.stack && entry.level === 'error') {
      formatted += `\n  📍 Stack: ${entry.stack}`;
    }
    
    return formatted;
  }

  private formatSpiritualContext(context: SpiritualLogContext): string {
    const parts: string[] = [];
    
    if (context.activeChakra) parts.push(`Chakra=${context.activeChakra}`);
    if (context.energyLevel) parts.push(`Energy=${context.energyLevel}%`);
    if (context.frequency) parts.push(`Freq=${context.frequency}Hz`);
    if (context.practiceType) parts.push(`Practice=${context.practiceType}`);
    if (context.protectionActive) parts.push(`Protected=true`);
    if (context.dimensionalLevel) parts.push(`Dimension=${context.dimensionalLevel}D`);
    if (context.lightbodyLayer) parts.push(`Lightbody=${context.lightbodyLayer}`);
    if (context.merkabaSpin) parts.push(`Merkaba=${context.merkabaSpin}`);
    if (context.dnaStrands) parts.push(`DNA=${context.dnaStrands} strands`);
    
    return parts.join(', ');
  }

  private formatPerformanceData(data: PerformanceLogData): string {
    const parts: string[] = [];
    
    if (data.executionTime) parts.push(`ExecTime=${data.executionTime.toFixed(2)}ms`);
    if (data.memoryUsage) parts.push(`Memory=${data.memoryUsage.toFixed(1)}MB`);
    if (data.renderTime) parts.push(`RenderTime=${data.renderTime.toFixed(2)}ms`);
    if (data.fps) parts.push(`FPS=${data.fps}`);
    if (data.apiLatency) parts.push(`API=${data.apiLatency.toFixed(2)}ms`);
    if (data.errorCount) parts.push(`Errors=${data.errorCount}`);
    
    return parts.join(', ');
  }
}

// JSON Log Formatter for Production
export class JSONLogFormatter implements LogFormatter {
  format(entry: LogEntry): string {
    return JSON.stringify({
      '@timestamp': entry.timestamp.toISOString(),
      level: entry.level,
      category: entry.category,
      message: entry.message,
      id: entry.id,
      data: entry.data,
      spiritual_context: entry.spiritualContext,
      performance_data: entry.performanceData,
      user_context: entry.userContext,
      stack: entry.stack,
      tags: entry.tags
    });
  }
}

// Console Transport
export class ConsoleTransport implements LogTransport {
  constructor(private formatter: LogFormatter = new ConsoleLogFormatter()) {}

  async log(entry: LogEntry): Promise<void> {
    const formatted = this.formatter.format(entry);
    
    switch (entry.level) {
      case 'debug':
        console.debug(formatted);
        break;
      case 'info':
      case 'spiritual':
        console.info(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'error':
      case 'critical':
        console.error(formatted);
        break;
      default:
        console.log(formatted);
    }
  }
}

// Memory Transport for Testing
export class MemoryTransport implements LogTransport {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  async log(entry: LogEntry): Promise<void> {
    this.logs.push(entry);
    
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  getLogs(): readonly LogEntry[] {
    return [...this.logs];
  }

  getLogsByLevel(level: LogLevel): readonly LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  getLogsByCategory(category: SpiritualCategory): readonly LogEntry[] {
    return this.logs.filter(log => log.category === category);
  }

  clear(): void {
    this.logs = [];
  }
}

// Remote Transport for Production Logging
export class RemoteTransport implements LogTransport {
  constructor(
    private endpoint: string,
    private apiKey?: string,
    private batchSize = 10,
    private flushInterval = 5000
  ) {
    this.startBatchProcessor();
  }

  private batch: LogEntry[] = [];
  private flushTimer?: number;

  async log(entry: LogEntry): Promise<void> {
    this.batch.push(entry);
    
    if (this.batch.length >= this.batchSize) {
      await this.flush();
    }
  }

  private startBatchProcessor(): void {
    this.flushTimer = window.setInterval(() => {
      if (this.batch.length > 0) {
        this.flush().catch(console.error);
      }
    }, this.flushInterval);
  }

  private async flush(): Promise<void> {
    if (this.batch.length === 0) return;

    const logsToSend = [...this.batch];
    this.batch = [];

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      await fetch(this.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({ logs: logsToSend })
      });
    } catch (error) {
      // Re-add failed logs to batch for retry
      this.batch.unshift(...logsToSend);
      console.error('Failed to send logs to remote endpoint:', error);
    }
  }

  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush().catch(console.error);
  }
}

// Main Spiritual Logger Class
export class SpiritualLogger {
  private static instance: SpiritualLogger;
  private transports: LogTransport[] = [];
  private defaultContext: Partial<SpiritualLogContext> = {};
  private performanceStart = new Map<string, number>();

  static getInstance(): SpiritualLogger {
    if (!this.instance) {
      this.instance = new SpiritualLogger();
    }
    return this.instance;
  }

  private constructor() {
    // Add default console transport
    this.addTransport(new ConsoleTransport());
    
    // Set up spiritual event logging
    this.setupSpiritualEventLogging();
  }

  addTransport(transport: LogTransport): void {
    this.transports.push(transport);
  }

  removeTransport(transport: LogTransport): void {
    const index = this.transports.indexOf(transport);
    if (index > -1) {
      this.transports.splice(index, 1);
    }
  }

  setDefaultSpiritualContext(context: Partial<SpiritualLogContext>): void {
    this.defaultContext = { ...this.defaultContext, ...context };
  }

  private async createLogEntry(
    level: LogLevel,
    category: SpiritualCategory,
    message: string,
    data?: unknown,
    spiritualContext?: Partial<SpiritualLogContext>,
    performanceData?: Partial<PerformanceLogData>,
    userContext?: Partial<UserLogContext>
  ): Promise<LogEntry> {
    return {
      id: this.generateId(),
      timestamp: new Date(),
      level,
      category,
      message,
      data,
      spiritualContext: { ...this.defaultContext, ...spiritualContext },
      performanceData,
      userContext,
      stack: level === 'error' ? new Error().stack : undefined,
      tags: this.generateTags(category, spiritualContext)
    };
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateTags(
    category: SpiritualCategory, 
    spiritualContext?: Partial<SpiritualLogContext>
  ): string[] {
    const tags = [category];
    
    if (spiritualContext?.activeChakra) {
      tags.push(`chakra-${spiritualContext.activeChakra}`);
    }
    
    if (spiritualContext?.practiceType) {
      tags.push(`practice-${spiritualContext.practiceType}`);
    }
    
    if (spiritualContext?.protectionActive) {
      tags.push('protected');
    }
    
    return tags;
  }

  private async log(entry: LogEntry): Promise<void> {
    // Send to all transports
    await Promise.all(
      this.transports.map(transport => 
        transport.log(entry).catch(error => 
          console.error('Transport error:', error)
        )
      )
    );

    // Emit spiritual logging event
    spiritualEventEmitter.emit('log-entry-created', entry);
  }

  // Public logging methods
  async debug(
    category: SpiritualCategory,
    message: string,
    data?: unknown,
    spiritualContext?: Partial<SpiritualLogContext>
  ): Promise<void> {
    const entry = await this.createLogEntry('debug', category, message, data, spiritualContext);
    await this.log(entry);
  }

  async info(
    category: SpiritualCategory,
    message: string,
    data?: unknown,
    spiritualContext?: Partial<SpiritualLogContext>
  ): Promise<void> {
    const entry = await this.createLogEntry('info', category, message, data, spiritualContext);
    await this.log(entry);
  }

  async warn(
    category: SpiritualCategory,
    message: string,
    data?: unknown,
    spiritualContext?: Partial<SpiritualLogContext>
  ): Promise<void> {
    const entry = await this.createLogEntry('warn', category, message, data, spiritualContext);
    await this.log(entry);
  }

  async error(
    category: SpiritualCategory,
    message: string,
    error?: Error,
    spiritualContext?: Partial<SpiritualLogContext>
  ): Promise<void> {
    const entry = await this.createLogEntry(
      'error', 
      category, 
      message, 
      error ? { 
        name: error.name, 
        message: error.message, 
        stack: error.stack 
      } : undefined,
      spiritualContext
    );
    await this.log(entry);
  }

  async spiritual(
    category: SpiritualCategory,
    message: string,
    spiritualContext: SpiritualLogContext,
    data?: unknown
  ): Promise<void> {
    const entry = await this.createLogEntry('spiritual', category, message, data, spiritualContext);
    await this.log(entry);
  }

  // Performance measurement helpers
  startPerformanceMeasurement(operationId: string): void {
    this.performanceStart.set(operationId, performance.now());
  }

  async endPerformanceMeasurement(
    operationId: string,
    category: SpiritualCategory,
    message: string,
    spiritualContext?: Partial<SpiritualLogContext>
  ): Promise<void> {
    const startTime = this.performanceStart.get(operationId);
    if (!startTime) {
      await this.warn('performance_monitoring', `No start time found for operation: ${operationId}`);
      return;
    }

    const executionTime = performance.now() - startTime;
    this.performanceStart.delete(operationId);

    const performanceData: PerformanceLogData = {
      executionTime,
      memoryUsage: this.getMemoryUsage()
    };

    const entry = await this.createLogEntry(
      'info',
      category,
      message,
      { operationId },
      spiritualContext,
      performanceData
    );

    await this.log(entry);
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024);
    }
    return 0;
  }

  // Spiritual event logging setup
  private setupSpiritualEventLogging(): void {
    spiritualEventEmitter.on('chakra-activated', async (event) => {
      await this.spiritual(
        'chakra_activation',
        `Chakra ${event.data.chakraId} activated successfully`,
        {
          activeChakra: event.data.chakraId,
          energyLevel: event.data.energyLevel,
          frequency: event.data.frequency
        },
        event.data
      );
    });

    spiritualEventEmitter.on('meditation-started', async (event) => {
      await this.spiritual(
        'meditation_practice',
        `Meditation session started: ${event.data.type}`,
        {
          practiceType: event.data.type,
          frequency: event.data.frequency
        },
        event.data
      );
    });

    spiritualEventEmitter.on('protection-activated', async (event) => {
      await this.spiritual(
        'psychic_protection',
        `Protection protocol activated: ${event.data.type}`,
        {
          protectionActive: true,
          energyLevel: event.data.intensity
        },
        event.data
      );
    });

    spiritualEventEmitter.on('vers-response', async (event) => {
      await this.info(
        'vers_guidance',
        'VERS provided spiritual guidance',
        event.data,
        {
          activeChakra: event.data.spiritualContext?.chakraFocus,
          practiceType: 'ai_guidance'
        }
      );
    });

    spiritualEventEmitter.on('performance-measured', async (event) => {
      if (event.data.fps < 30 || event.data.memoryUsage > 256) {
        await this.warn(
          'performance_monitoring',
          'Performance degradation detected',
          event.data,
          {
            energyLevel: event.data.energyEfficiency,
            frequency: event.data.spiritualResonance
          }
        );
      }
    });
  }

  // Utility methods for debugging
  async logUserAction(action: string, data?: unknown): Promise<void> {
    await this.info('user_interaction', `User action: ${action}`, data);
  }

  async logAPICall(endpoint: string, method: string, latency: number): Promise<void> {
    await this.debug(
      'system_operation',
      `API call: ${method} ${endpoint}`,
      { endpoint, method },
      undefined,
      { apiLatency: latency }
    );
  }

  async logChakraBalance(chakraStates: Array<{ id: ChakraID; balanced: boolean }>): Promise<void> {
    const unbalanced = chakraStates.filter(c => !c.balanced);
    
    if (unbalanced.length > 0) {
      await this.warn(
        'chakra_activation',
        `${unbalanced.length} chakras need balancing`,
        { unbalancedChakras: unbalanced.map(c => c.id) }
      );
    } else {
      await this.spiritual(
        'chakra_activation',
        'All chakras are balanced',
        { energyLevel: 100 },
        { balancedChakras: chakraStates.length }
      );
    }
  }
}

// Export singleton logger
export const spiritualLogger = SpiritualLogger.getInstance();

// Decorator for automatic performance logging
export function logPerformance(
  category: SpiritualCategory,
  message: string,
  spiritualContext?: Partial<SpiritualLogContext>
) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const operationId = `${target.constructor.name}.${propertyKey}`;
      spiritualLogger.startPerformanceMeasurement(operationId);

      try {
        const result = await originalMethod.apply(this, args);
        
        await spiritualLogger.endPerformanceMeasurement(
          operationId,
          category,
          `${message} completed successfully`,
          spiritualContext
        );

        return result;
      } catch (error) {
        await spiritualLogger.error(
          category,
          `${message} failed: ${error}`,
          error instanceof Error ? error : new Error(String(error)),
          spiritualContext
        );
        throw error;
      }
    };

    return descriptor;
  };
}

// React Hook for Logging
export function useSpiritualLogger() {
  return spiritualLogger;
}

// Development utilities
export const LoggingUtils = {
  enableDebugMode: () => {
    spiritualLogger.setDefaultSpiritualContext({ practiceType: 'debug_mode' });
    spiritualLogger.info('system_operation', 'Debug mode enabled');
  },

  createMemoryTransport: () => {
    const memoryTransport = new MemoryTransport();
    spiritualLogger.addTransport(memoryTransport);
    return memoryTransport;
  },

  exportLogs: (transport: MemoryTransport) => {
    const logs = transport.getLogs();
    const jsonData = JSON.stringify(logs, null, 2);
    
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `spiritual-logs-${new Date().toISOString()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }
};