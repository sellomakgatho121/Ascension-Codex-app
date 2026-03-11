// Type-Safe API Client for Spiritual Development Platform
// Implements comprehensive type safety, retry logic, and spiritual context awareness

import { 
  Result, 
  success, 
  failure, 
  ChakraID, 
  EnergyLevel, 
  SpiritualFrequency,
  VERSResponse,
  SpiritualProgressData,
  MeditationSession
} from './advanced-type-system';

import { 
  SpiritualRetryManager, 
  spiritualCircuitBreaker, 
  SpiritualErrorFactory 
} from './spiritual-error-handling';

// API Request Types
export interface APIRequest {
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  readonly path: string;
  readonly body?: unknown;
  readonly headers?: Record<string, string>;
  readonly timeout?: number;
}

export interface APIResponse<T = unknown> {
  readonly data: T;
  readonly status: number;
  readonly headers: Record<string, string>;
  readonly timestamp: Date;
}

// Spiritual API Endpoints
export type APIEndpoint = 
  | '/api/users'
  | '/api/spiritual-progress'
  | '/api/chakra-activation'
  | '/api/lightbody-status'
  | '/api/meditation-sessions'
  | '/api/vers-chat'
  | '/api/vers-voice'
  | '/api/performance-metrics'
  | '/api/protection-status'
  | '/api/energy-analysis'
  | '/api/dna-activation'
  | '/api/merkaba-status';

// Request/Response Type Mappings
export interface APITypeMap {
  '/api/users': {
    GET: { response: User };
    POST: { body: CreateUserRequest; response: User };
    PUT: { body: UpdateUserRequest; response: User };
  };
  '/api/spiritual-progress': {
    GET: { response: SpiritualProgressData };
    POST: { body: UpdateProgressRequest; response: SpiritualProgressData };
  };
  '/api/chakra-activation': {
    POST: { body: ChakraActivationRequest; response: ChakraActivationResponse };
  };
  '/api/lightbody-status': {
    GET: { response: LightbodyStatus };
    PUT: { body: LightbodyUpdateRequest; response: LightbodyStatus };
  };
  '/api/meditation-sessions': {
    GET: { response: MeditationSession[] };
    POST: { body: CreateMeditationRequest; response: MeditationSession };
  };
  '/api/vers-chat': {
    POST: { body: VERSChatRequest; response: VERSResponse };
  };
  '/api/vers-voice': {
    POST: { body: VERSVoiceRequest; response: VERSVoiceResponse };
  };
  '/api/performance-metrics': {
    GET: { response: PerformanceMetrics };
    POST: { body: PerformanceData; response: void };
  };
  '/api/protection-status': {
    GET: { response: ProtectionStatus };
    POST: { body: ActivateProtectionRequest; response: ProtectionStatus };
  };
  '/api/energy-analysis': {
    POST: { body: EnergyAnalysisRequest; response: EnergyAnalysisResponse };
  };
  '/api/dna-activation': {
    POST: { body: DNAActivationRequest; response: DNAActivationResponse };
  };
  '/api/merkaba-status': {
    GET: { response: MerkabaStatus };
    PUT: { body: MerkabaUpdateRequest; response: MerkabaStatus };
  };
}

// User Types
export interface User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly spiritualLevel: EnergyLevel;
  readonly joinDate: string;
  readonly lastActive: string;
}

export interface CreateUserRequest {
  readonly username: string;
  readonly email: string;
  readonly spiritualGoals: readonly string[];
}

export interface UpdateUserRequest {
  readonly username?: string;
  readonly email?: string;
  readonly spiritualGoals?: readonly string[];
}

// Chakra Activation Types
export interface ChakraActivationRequest {
  readonly chakraId: ChakraID;
  readonly frequency: SpiritualFrequency;
  readonly duration: number;
  readonly intensity: EnergyLevel;
}

export interface ChakraActivationResponse {
  readonly success: boolean;
  readonly newEnergyLevel: EnergyLevel;
  readonly balanceAchieved: boolean;
  readonly recommendedNextStep: string;
  readonly activationId: string;
}

// Lightbody Types
export interface LightbodyStatus {
  readonly layers: readonly {
    readonly level: number;
    readonly activationPercentage: number;
    readonly frequency: SpiritualFrequency;
    readonly isStable: boolean;
  }[];
  readonly overallIntegration: number;
  readonly nextActivationReady: boolean;
}

export interface LightbodyUpdateRequest {
  readonly layer: number;
  readonly activationData: {
    readonly frequency: SpiritualFrequency;
    readonly intensity: EnergyLevel;
    readonly duration: number;
  };
}

// Meditation Types
export interface CreateMeditationRequest {
  readonly type: 'chakra_balancing' | 'lightbody_activation' | 'merkaba_spinning' | 'dna_activation';
  readonly duration: number;
  readonly frequency: SpiritualFrequency;
  readonly guidanceVoice: 'aurora_divine' | 'orion_guardian' | 'luna_harmony' | 'ember_wisdom';
  readonly binauralBeats?: SpiritualFrequency;
}

// VERS Types
export interface VERSChatRequest {
  readonly message: string;
  readonly spiritualContext?: {
    readonly currentPractice?: string;
    readonly activeChakra?: ChakraID;
    readonly energyLevel?: EnergyLevel;
    readonly urgency?: 'low' | 'medium' | 'high';
  };
  readonly conversationId?: string;
}

export interface VERSVoiceRequest {
  readonly text: string;
  readonly voiceProfile: 'aurora_divine' | 'orion_guardian' | 'luna_harmony' | 'ember_wisdom';
  readonly spiritualContext?: {
    readonly chakraFocus?: ChakraID;
    readonly energyType?: 'nurturing' | 'protective' | 'balanced' | 'mystical';
    readonly urgency?: 'low' | 'medium' | 'high';
  };
}

export interface VERSVoiceResponse {
  readonly audioUrl: string;
  readonly duration: number;
  readonly frequency: SpiritualFrequency;
  readonly success: boolean;
}

// Performance Types
export interface PerformanceMetrics {
  readonly fps: number;
  readonly memoryUsage: number;
  readonly renderTime: number;
  readonly energyEfficiency: EnergyLevel;
  readonly spiritualResonance: SpiritualFrequency;
}

export interface PerformanceData {
  readonly metrics: PerformanceMetrics;
  readonly timestamp: string;
  readonly sessionId: string;
}

// Protection Types
export interface ProtectionStatus {
  readonly shieldActive: boolean;
  readonly protectionLevel: EnergyLevel;
  readonly lastActivation: string;
  readonly threatsDetected: number;
  readonly energyBoundariesIntact: boolean;
}

export interface ActivateProtectionRequest {
  readonly protocolType: '12d_shield' | 'golden_bubble' | 'violet_flame' | 'emergency_protocol';
  readonly intensity: EnergyLevel;
  readonly duration?: number;
}

// Energy Analysis Types
export interface EnergyAnalysisRequest {
  readonly chakraReadings: readonly {
    readonly chakraId: ChakraID;
    readonly frequency: SpiritualFrequency;
    readonly energyLevel: EnergyLevel;
  }[];
  readonly auricFieldData?: unknown;
  readonly lightbodyMetrics?: unknown;
}

export interface EnergyAnalysisResponse {
  readonly overallBalance: EnergyLevel;
  readonly chakraRecommendations: readonly {
    readonly chakraId: ChakraID;
    readonly action: 'balance' | 'activate' | 'clear' | 'maintain';
    readonly priority: 'low' | 'medium' | 'high';
    readonly guidance: string;
  }[];
  readonly spiritualGuidance: string;
  readonly nextSessionRecommended: string;
}

// DNA Activation Types
export interface DNAActivationRequest {
  readonly strand: number;
  readonly frequency: SpiritualFrequency;
  readonly preparationComplete: boolean;
  readonly protectionActive: boolean;
}

export interface DNAActivationResponse {
  readonly success: boolean;
  readonly activationLevel: number;
  readonly newCapabilities: readonly string[];
  readonly integrationTime: number;
  readonly nextStrandReady: boolean;
}

// Merkaba Types
export interface MerkabaStatus {
  readonly spinRate: number;
  readonly stability: EnergyLevel;
  readonly geometricAccuracy: number;
  readonly lightQuotient: EnergyLevel;
  readonly isActive: boolean;
}

export interface MerkabaUpdateRequest {
  readonly spinDirection: 'clockwise' | 'counterclockwise';
  readonly frequency: SpiritualFrequency;
  readonly intensity: EnergyLevel;
}

// Progress Update Types
export interface UpdateProgressRequest {
  readonly chakraProgress?: readonly {
    readonly chakraId: ChakraID;
    readonly energyLevel: EnergyLevel;
    readonly lastActivation: string;
  }[];
  readonly lightbodyProgress?: {
    readonly layer: number;
    readonly activationPercentage: number;
  };
  readonly overallLevel?: EnergyLevel;
  readonly milestones?: readonly string[];
}

// Type-Safe API Client Class
export class TypeSafeAPIClient {
  private readonly baseURL: string;
  private readonly defaultHeaders: Record<string, string>;
  private readonly defaultTimeout: number;

  constructor(
    baseURL = '',
    defaultHeaders: Record<string, string> = {},
    defaultTimeout = 30000
  ) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
    this.defaultTimeout = defaultTimeout;
  }

  // Generic request method with type safety
  async request<
    TEndpoint extends keyof APITypeMap,
    TMethod extends keyof APITypeMap[TEndpoint]
  >(
    endpoint: TEndpoint,
    method: TMethod,
    options: APITypeMap[TEndpoint][TMethod] extends { body: infer TBody }
      ? { body: TBody; headers?: Record<string, string>; timeout?: number }
      : { headers?: Record<string, string>; timeout?: number } = {} as any
  ): Promise<Result<
    APITypeMap[TEndpoint][TMethod] extends { response: infer TResponse }
      ? TResponse
      : void,
    Error
  >> {
    const requestOptions: APIRequest = {
      method: method as any,
      path: endpoint,
      body: 'body' in options ? options.body : undefined,
      headers: { ...this.defaultHeaders, ...options.headers },
      timeout: options.timeout || this.defaultTimeout
    };

    return spiritualCircuitBreaker.execute(
      `${method} ${endpoint}`,
      () => this.executeRequest(requestOptions),
      {
        currentPractice: `API ${method} ${endpoint}`,
        energyLevel: 50
      }
    );
  }

  private async executeRequest<T>(request: APIRequest): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), request.timeout);

    try {
      const response = await fetch(`${this.baseURL}${request.path}`, {
        method: request.method,
        headers: request.headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw SpiritualErrorFactory.create(
          'NETWORK_DISRUPTION',
          `API request failed: ${response.status} ${response.statusText}`,
          'error'
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return response.text() as any;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw SpiritualErrorFactory.create(
          'NETWORK_DISRUPTION',
          'Request timeout - spiritual energy flow may be disrupted',
          'warning'
        );
      }

      throw error;
    }
  }

  // Specialized API methods with retry logic
  async getSpiritualProgress(): Promise<Result<SpiritualProgressData, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/spiritual-progress', 'GET'),
      { maxAttempts: 3, healingPause: true },
      { currentPractice: 'progress_retrieval' }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async updateSpiritualProgress(updates: UpdateProgressRequest): Promise<Result<SpiritualProgressData, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/spiritual-progress', 'POST', { body: updates }),
      { maxAttempts: 2, healingPause: true },
      { currentPractice: 'progress_update' }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async activateChakra(request: ChakraActivationRequest): Promise<Result<ChakraActivationResponse, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/chakra-activation', 'POST', { body: request }),
      { maxAttempts: 1, healingPause: false }, // No retry for activation
      { 
        currentPractice: 'chakra_activation',
        activeChakra: request.chakraId,
        energyLevel: request.intensity
      }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async chatWithVERS(request: VERSChatRequest): Promise<Result<VERSResponse, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/vers-chat', 'POST', { body: request }),
      { maxAttempts: 2, healingPause: true },
      { 
        currentPractice: 'vers_guidance',
        activeChakra: request.spiritualContext?.activeChakra,
        energyLevel: request.spiritualContext?.energyLevel
      }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async generateVoice(request: VERSVoiceRequest): Promise<Result<VERSVoiceResponse, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/vers-voice', 'POST', { body: request }),
      { maxAttempts: 1, healingPause: false },
      { 
        currentPractice: 'voice_synthesis',
        chakraFocus: request.spiritualContext?.chakraFocus
      }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async createMeditationSession(request: CreateMeditationRequest): Promise<Result<MeditationSession, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/meditation-sessions', 'POST', { body: request }),
      { maxAttempts: 2, healingPause: true },
      { currentPractice: 'meditation_creation' }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async getMeditationSessions(): Promise<Result<MeditationSession[], Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/meditation-sessions', 'GET'),
      { maxAttempts: 3, healingPause: true },
      { currentPractice: 'meditation_retrieval' }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async analyzeEnergy(request: EnergyAnalysisRequest): Promise<Result<EnergyAnalysisResponse, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/energy-analysis', 'POST', { body: request }),
      { maxAttempts: 2, healingPause: true },
      { currentPractice: 'energy_analysis' }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async activateDNA(request: DNAActivationRequest): Promise<Result<DNAActivationResponse, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/dna-activation', 'POST', { body: request }),
      { maxAttempts: 1, healingPause: false }, // Critical operation, no retry
      { 
        currentPractice: 'dna_activation',
        energyLevel: 100 // Maximum energy for DNA work
      }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async activateProtection(request: ActivateProtectionRequest): Promise<Result<ProtectionStatus, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/protection-status', 'POST', { body: request }),
      { maxAttempts: 3, healingPause: false }, // Protection is urgent
      { currentPractice: 'protection_activation' }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async getMerkabaStatus(): Promise<Result<MerkabaStatus, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/merkaba-status', 'GET'),
      { maxAttempts: 2, healingPause: true },
      { currentPractice: 'merkaba_status_check' }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  async updateMerkaba(request: MerkabaUpdateRequest): Promise<Result<MerkabaStatus, Error>> {
    return SpiritualRetryManager.executeWithRetry(
      () => this.request('/api/merkaba-status', 'PUT', { body: request }),
      { maxAttempts: 1, healingPause: false },
      { currentPractice: 'merkaba_adjustment' }
    ).then(result => result.success ? success(result.data.data!) : failure(result.error));
  }

  // Batch operations for efficiency
  async batchChakraUpdate(updates: readonly ChakraActivationRequest[]): Promise<Result<ChakraActivationResponse[], Error>> {
    const results = await Promise.allSettled(
      updates.map(update => this.activateChakra(update))
    );

    const successes: ChakraActivationResponse[] = [];
    const errors: Error[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        successes.push(result.value.data);
      } else {
        const error = result.status === 'rejected' ? 
          new Error(`Chakra ${updates[index].chakraId} activation failed`) :
          result.value.error;
        errors.push(error);
      }
    });

    if (errors.length > 0 && successes.length === 0) {
      return failure(errors[0]);
    }

    return success(successes);
  }

  // Health check for all spiritual services
  async getServiceHealth(): Promise<Record<string, boolean>> {
    const services = [
      '/api/spiritual-progress',
      '/api/vers-chat',
      '/api/meditation-sessions',
      '/api/protection-status'
    ];

    const healthChecks = await Promise.allSettled(
      services.map(async (service) => {
        try {
          const response = await fetch(`${this.baseURL}${service}/health`, {
            method: 'GET',
            headers: this.defaultHeaders,
            signal: AbortSignal.timeout(5000)
          });
          return { service, healthy: response.ok };
        } catch {
          return { service, healthy: false };
        }
      })
    );

    const health: Record<string, boolean> = {};
    healthChecks.forEach((result) => {
      if (result.status === 'fulfilled') {
        health[result.value.service] = result.value.healthy;
      }
    });

    return health;
  }
}

// Export singleton API client
export const spiritualAPIClient = new TypeSafeAPIClient();

// React Hook for API operations
export function useAPIClient() {
  return spiritualAPIClient;
}