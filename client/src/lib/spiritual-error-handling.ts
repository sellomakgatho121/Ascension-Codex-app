// Advanced Error Handling System with Spiritual Context Awareness
// Implements graceful degradation, retry mechanisms, and spiritual healing patterns

import { spiritualEventEmitter, Result, success, failure, ChakraID } from './advanced-type-system';

// Error Types with Spiritual Context
export interface SpiritualError extends Error {
  readonly code: ErrorCode;
  readonly severity: ErrorSeverity;
  readonly chakraAffected?: ChakraID;
  readonly spiritualContext?: SpiritualContext;
  readonly timestamp: Date;
  readonly userGuidance: string;
  readonly healingAction?: HealingAction;
}

export type ErrorCode = 
  | 'CHAKRA_ACTIVATION_FAILED'
  | 'LIGHTBODY_CONNECTION_ERROR'
  | 'MERKABA_SPIN_DISRUPTED'
  | 'DNA_ACTIVATION_BLOCKED'
  | 'ENERGY_FIELD_UNSTABLE'
  | 'VERS_CONNECTION_LOST'
  | 'MEDITATION_INTERRUPTED'
  | 'PSYCHIC_INTERFERENCE'
  | 'FREQUENCY_MISMATCH'
  | 'PERFORMANCE_DEGRADED'
  | 'NETWORK_DISRUPTION'
  | 'AUDIO_SYNTHESIS_FAILED'
  | 'VISUALIZATION_ERROR'
  | 'DATABASE_CONNECTION_LOST'
  | 'AUTHENTICATION_EXPIRED';

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface SpiritualContext {
  readonly currentPractice?: string;
  readonly activeChakra?: ChakraID;
  readonly meditationPhase?: 'preparation' | 'activation' | 'integration' | 'completion';
  readonly energyLevel?: number;
  readonly protectionActive?: boolean;
}

export type HealingAction = 
  | 'apply_12d_shield'
  | 'clear_negative_energy'
  | 'reconnect_higher_self'
  | 'ground_earth_connection'
  | 'invoke_protection'
  | 'balance_chakras'
  | 'restore_light_quotient';

// Error Recovery Strategies
export interface RecoveryStrategy {
  readonly name: string;
  readonly description: string;
  readonly execute: () => Promise<boolean>;
  readonly spiritualGuidance: string;
}

// Retry Configuration
export interface RetryConfig {
  readonly maxAttempts: number;
  readonly baseDelay: number;
  readonly maxDelay: number;
  readonly backoffMultiplier: number;
  readonly healingPause?: boolean;
}

// Circuit Breaker State
export interface CircuitBreakerState {
  readonly isOpen: boolean;
  readonly failureCount: number;
  readonly lastFailureTime?: Date;
  readonly nextAttemptTime?: Date;
}

// Spiritual Error Factory
export class SpiritualErrorFactory {
  static create(
    code: ErrorCode,
    message: string,
    severity: ErrorSeverity = 'error',
    options: {
      chakraAffected?: ChakraID;
      spiritualContext?: SpiritualContext;
      healingAction?: HealingAction;
      cause?: Error;
    } = {}
  ): SpiritualError {
    const error = new Error(message) as SpiritualError;
    
    Object.assign(error, {
      code,
      severity,
      chakraAffected: options.chakraAffected,
      spiritualContext: options.spiritualContext,
      timestamp: new Date(),
      userGuidance: this.generateUserGuidance(code, severity),
      healingAction: options.healingAction || this.getDefaultHealingAction(code),
      cause: options.cause
    });

    return error;
  }

  private static generateUserGuidance(code: ErrorCode, severity: ErrorSeverity): string {
    const guidanceMap: Record<ErrorCode, string> = {
      CHAKRA_ACTIVATION_FAILED: 'Take deep breaths and center yourself. Your chakra may need gentle clearing before activation.',
      LIGHTBODY_CONNECTION_ERROR: 'Pause and reconnect with your higher self. Ground yourself and try again.',
      MERKABA_SPIN_DISRUPTED: 'Your energy field needs stabilization. Use the 12D Shield technique to restore balance.',
      DNA_ACTIVATION_BLOCKED: 'Clear any resistance patterns. Ask your higher self for guidance on what needs healing.',
      ENERGY_FIELD_UNSTABLE: 'Step back from practice momentarily. Invoke protection and ground your energy.',
      VERS_CONNECTION_LOST: 'VERS is temporarily unavailable. Your inner guidance is always accessible.',
      MEDITATION_INTERRUPTED: 'External energies may be interfering. Apply psychic protection and resume when ready.',
      PSYCHIC_INTERFERENCE: 'Immediately invoke the 12D Shield. Clear your space and apply protection protocols.',
      FREQUENCY_MISMATCH: 'Your current vibration needs adjustment. Take time to align with your practice.',
      PERFORMANCE_DEGRADED: 'The system is working hard. Consider reducing complexity or taking a break.',
      NETWORK_DISRUPTION: 'Connection issues detected. Your spiritual connection remains strong.',
      AUDIO_SYNTHESIS_FAILED: 'Voice guidance is temporarily unavailable. Trust your inner voice.',
      VISUALIZATION_ERROR: 'Visual elements are having difficulty. Focus on inner visualization instead.',
      DATABASE_CONNECTION_LOST: 'Progress saving is temporarily interrupted. Your spiritual growth continues.',
      AUTHENTICATION_EXPIRED: 'Session has ended. Please reconnect to continue your spiritual journey.'
    };

    return guidanceMap[code] || 'Trust in the process. All challenges are opportunities for growth.';
  }

  private static getDefaultHealingAction(code: ErrorCode): HealingAction {
    const healingMap: Record<ErrorCode, HealingAction> = {
      CHAKRA_ACTIVATION_FAILED: 'balance_chakras',
      LIGHTBODY_CONNECTION_ERROR: 'reconnect_higher_self',
      MERKABA_SPIN_DISRUPTED: 'apply_12d_shield',
      DNA_ACTIVATION_BLOCKED: 'clear_negative_energy',
      ENERGY_FIELD_UNSTABLE: 'ground_earth_connection',
      VERS_CONNECTION_LOST: 'invoke_protection',
      MEDITATION_INTERRUPTED: 'apply_12d_shield',
      PSYCHIC_INTERFERENCE: 'invoke_protection',
      FREQUENCY_MISMATCH: 'balance_chakras',
      PERFORMANCE_DEGRADED: 'ground_earth_connection',
      NETWORK_DISRUPTION: 'restore_light_quotient',
      AUDIO_SYNTHESIS_FAILED: 'reconnect_higher_self',
      VISUALIZATION_ERROR: 'restore_light_quotient',
      DATABASE_CONNECTION_LOST: 'ground_earth_connection',
      AUTHENTICATION_EXPIRED: 'reconnect_higher_self'
    };

    return healingMap[code] || 'apply_12d_shield';
  }
}

// Advanced Retry System with Spiritual Awareness
export class SpiritualRetryManager {
  private static readonly defaultConfig: RetryConfig = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2,
    healingPause: true
  };

  static async executeWithRetry<T>(
    operation: () => Promise<T>,
    config: Partial<RetryConfig> = {},
    spiritualContext?: SpiritualContext
  ): Promise<Result<T, SpiritualError>> {
    const fullConfig = { ...this.defaultConfig, ...config };
    let lastError: SpiritualError | null = null;

    for (let attempt = 1; attempt <= fullConfig.maxAttempts; attempt++) {
      try {
        const result = await operation();
        
        // Emit success event if we had previous failures
        if (attempt > 1) {
          spiritualEventEmitter.emit('spiritual-recovery', {
            attempt,
            previousError: lastError,
            spiritualContext
          });
        }

        return success(result);
      } catch (error) {
        lastError = error instanceof Error ? 
          SpiritualErrorFactory.create(
            'PERFORMANCE_DEGRADED',
            error.message,
            'error',
            { spiritualContext, cause: error }
          ) : 
          SpiritualErrorFactory.create(
            'PERFORMANCE_DEGRADED',
            'Unknown error occurred',
            'error',
            { spiritualContext }
          );

        // Emit retry attempt event
        spiritualEventEmitter.emit('spiritual-retry-attempt', {
          attempt,
          maxAttempts: fullConfig.maxAttempts,
          error: lastError,
          spiritualContext
        });

        // Don't retry on the last attempt
        if (attempt === fullConfig.maxAttempts) {
          break;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(
          fullConfig.baseDelay * Math.pow(fullConfig.backoffMultiplier, attempt - 1),
          fullConfig.maxDelay
        );

        // Add spiritual healing pause if configured
        if (fullConfig.healingPause) {
          await this.performHealingPause(delay, lastError.healingAction);
        } else {
          await this.delay(delay);
        }
      }
    }

    return failure(lastError!);
  }

  private static async performHealingPause(delay: number, healingAction?: HealingAction): Promise<void> {
    // Emit healing event
    spiritualEventEmitter.emit('spiritual-healing-pause', {
      duration: delay,
      healingAction
    });

    // Simulate spiritual healing with progressive delay
    const steps = 5;
    const stepDelay = delay / steps;

    for (let i = 0; i < steps; i++) {
      await this.delay(stepDelay);
      
      // Emit healing progress
      spiritualEventEmitter.emit('healing-progress', {
        step: i + 1,
        totalSteps: steps,
        healingAction
      });
    }
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Circuit Breaker for Spiritual Services
export class SpiritualCircuitBreaker {
  private states = new Map<string, CircuitBreakerState>();
  private readonly failureThreshold = 5;
  private readonly recoveryTimeout = 30000; // 30 seconds

  async execute<T>(
    serviceKey: string,
    operation: () => Promise<T>,
    spiritualContext?: SpiritualContext
  ): Promise<Result<T, SpiritualError>> {
    const state = this.getState(serviceKey);

    // Check if circuit is open
    if (state.isOpen) {
      if (this.shouldAttemptRecovery(state)) {
        // Attempt to close the circuit
        this.resetState(serviceKey);
      } else {
        return failure(SpiritualErrorFactory.create(
          'ENERGY_FIELD_UNSTABLE',
          `Service ${serviceKey} is temporarily unavailable. Allow healing time before retry.`,
          'warning',
          { spiritualContext, healingAction: 'ground_earth_connection' }
        ));
      }
    }

    try {
      const result = await operation();
      
      // Success - reset failure count
      if (state.failureCount > 0) {
        this.resetState(serviceKey);
        spiritualEventEmitter.emit('spiritual-service-recovered', {
          serviceKey,
          spiritualContext
        });
      }

      return success(result);
    } catch (error) {
      // Record failure
      this.recordFailure(serviceKey);
      
      const spiritualError = SpiritualErrorFactory.create(
        'NETWORK_DISRUPTION',
        `Service ${serviceKey} failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'error',
        { spiritualContext, cause: error instanceof Error ? error : undefined }
      );

      spiritualEventEmitter.emit('spiritual-service-failure', {
        serviceKey,
        error: spiritualError,
        isCircuitOpen: this.getState(serviceKey).isOpen,
        spiritualContext
      });

      return failure(spiritualError);
    }
  }

  private getState(serviceKey: string): CircuitBreakerState {
    return this.states.get(serviceKey) || {
      isOpen: false,
      failureCount: 0
    };
  }

  private recordFailure(serviceKey: string): void {
    const state = this.getState(serviceKey);
    const newFailureCount = state.failureCount + 1;
    const now = new Date();

    this.states.set(serviceKey, {
      isOpen: newFailureCount >= this.failureThreshold,
      failureCount: newFailureCount,
      lastFailureTime: now,
      nextAttemptTime: newFailureCount >= this.failureThreshold 
        ? new Date(now.getTime() + this.recoveryTimeout)
        : undefined
    });
  }

  private shouldAttemptRecovery(state: CircuitBreakerState): boolean {
    return state.nextAttemptTime ? new Date() >= state.nextAttemptTime : false;
  }

  private resetState(serviceKey: string): void {
    this.states.set(serviceKey, {
      isOpen: false,
      failureCount: 0
    });
  }

  getServiceHealth(): Record<string, CircuitBreakerState> {
    const health: Record<string, CircuitBreakerState> = {};
    this.states.forEach((state, key) => {
      health[key] = { ...state };
    });
    return health;
  }
}

// Global Error Handler
export class GlobalSpiritualErrorHandler {
  private static instance: GlobalSpiritualErrorHandler;
  private errorLog: SpiritualError[] = [];
  private maxLogSize = 100;

  static getInstance(): GlobalSpiritualErrorHandler {
    if (!this.instance) {
      this.instance = new GlobalSpiritualErrorHandler();
    }
    return this.instance;
  }

  private constructor() {
    this.setupGlobalHandlers();
  }

  private setupGlobalHandlers(): void {
    // Handle unhandled promise rejections
    if (typeof window !== 'undefined') {
      window.addEventListener('unhandledrejection', (event) => {
        const error = SpiritualErrorFactory.create(
          'ENERGY_FIELD_UNSTABLE',
          `Unhandled promise rejection: ${event.reason}`,
          'error'
        );
        this.handleError(error);
      });

      // Handle uncaught errors
      window.addEventListener('error', (event) => {
        const error = SpiritualErrorFactory.create(
          'VISUALIZATION_ERROR',
          `Uncaught error: ${event.error?.message || event.message}`,
          'error'
        );
        this.handleError(error);
      });
    }

    // Handle spiritual event errors
    spiritualEventEmitter.on('spiritual-error', (event) => {
      this.handleError(event.data);
    });
  }

  handleError(error: SpiritualError, shouldNotifyUser = true): void {
    // Add to error log
    this.errorLog.push(error);
    
    // Maintain log size
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    // Log to console with spiritual context
    console.group(`🔮 Spiritual Error [${error.severity.toUpperCase()}]`);
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    console.error('User Guidance:', error.userGuidance);
    console.error('Healing Action:', error.healingAction);
    if (error.spiritualContext) {
      console.error('Spiritual Context:', error.spiritualContext);
    }
    console.error('Stack:', error.stack);
    console.groupEnd();

    // Emit error event for UI handling
    spiritualEventEmitter.emit('global-spiritual-error', {
      error,
      shouldNotifyUser
    });

    // Automatic healing for critical errors
    if (error.severity === 'critical') {
      this.performEmergencyHealing(error);
    }
  }

  private async performEmergencyHealing(error: SpiritualError): Promise<void> {
    console.log('🛡️ Performing emergency spiritual healing...');
    
    // Emit emergency healing event
    spiritualEventEmitter.emit('emergency-healing-initiated', {
      error,
      healingAction: error.healingAction
    });

    // Simulate healing process
    await new Promise(resolve => setTimeout(resolve, 2000));

    spiritualEventEmitter.emit('emergency-healing-completed', {
      error,
      success: true
    });
  }

  getErrorLog(): readonly SpiritualError[] {
    return [...this.errorLog];
  }

  getErrorStats(): {
    total: number;
    bySeverity: Record<ErrorSeverity, number>;
    byCode: Record<string, number>;
    recentErrors: SpiritualError[];
  } {
    const bySeverity: Record<ErrorSeverity, number> = {
      info: 0,
      warning: 0,
      error: 0,
      critical: 0
    };

    const byCode: Record<string, number> = {};

    this.errorLog.forEach(error => {
      bySeverity[error.severity]++;
      byCode[error.code] = (byCode[error.code] || 0) + 1;
    });

    const recentErrors = this.errorLog.slice(-10);

    return {
      total: this.errorLog.length,
      bySeverity,
      byCode,
      recentErrors
    };
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }
}

// Singleton instances
export const spiritualCircuitBreaker = new SpiritualCircuitBreaker();
export const globalSpiritualErrorHandler = GlobalSpiritualErrorHandler.getInstance();

// Utility functions for common error scenarios
export const SpiritualErrorUtils = {
  wrapAsync: <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    errorCode: ErrorCode,
    spiritualContext?: SpiritualContext
  ): T => {
    return (async (...args: any[]) => {
      try {
        return await fn(...args);
      } catch (error) {
        const spiritualError = SpiritualErrorFactory.create(
          errorCode,
          error instanceof Error ? error.message : 'Unknown error',
          'error',
          { spiritualContext, cause: error instanceof Error ? error : undefined }
        );
        
        globalSpiritualErrorHandler.handleError(spiritualError);
        throw spiritualError;
      }
    }) as T;
  },

  createRecoveryStrategy: (
    name: string,
    description: string,
    spiritualGuidance: string,
    execute: () => Promise<boolean>
  ): RecoveryStrategy => ({
    name,
    description,
    spiritualGuidance,
    execute
  }),

  isRecoverableError: (error: SpiritualError): boolean => {
    const recoverableCodes: ErrorCode[] = [
      'NETWORK_DISRUPTION',
      'PERFORMANCE_DEGRADED',
      'AUDIO_SYNTHESIS_FAILED',
      'VISUALIZATION_ERROR',
      'DATABASE_CONNECTION_LOST'
    ];
    
    return recoverableCodes.includes(error.code);
  }
};