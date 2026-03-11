// Type-Safe Storage System for Spiritual Development Data
// Implements branded types, validation, and spiritual context awareness

import { 
  ChakraID, 
  EnergyLevel, 
  SpiritualFrequency, 
  VibrationRate,
  createChakraID,
  createEnergyLevel,
  createSpiritualFrequency,
  createVibrationRate,
  Result,
  success,
  failure
} from './advanced-type-system';

// Storage Keys with Type Safety
export type StorageKey = 
  | 'spiritual_progress'
  | 'chakra_states'
  | 'lightbody_activation'
  | 'meditation_preferences'
  | 'vers_settings'
  | 'user_preferences'
  | 'performance_settings'
  | 'protection_protocols'
  | 'energy_signatures'
  | 'ascension_milestones';

// Spiritual Progress Data Structure
export interface SpiritualProgressData {
  readonly userId: string;
  readonly overallLevel: EnergyLevel;
  readonly lastUpdate: string; // ISO date string
  readonly chakraProgress: readonly ChakraProgressData[];
  readonly lightbodyProgress: LightbodyProgressData;
  readonly merkabaDevelopment: MerkabaProgressData;
  readonly dnaActivationLevel: number;
  readonly protectionMastery: EnergyLevel;
  readonly version: number;
}

export interface ChakraProgressData {
  readonly id: ChakraID;
  readonly energyLevel: EnergyLevel;
  readonly frequency: SpiritualFrequency;
  readonly vibrationRate: VibrationRate;
  readonly isBalanced: boolean;
  readonly lastActivation?: string;
  readonly activationCount: number;
}

export interface LightbodyProgressData {
  readonly layers: readonly {
    readonly level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    readonly activationPercentage: number;
    readonly frequency: SpiritualFrequency;
    readonly isStable: boolean;
  }[];
  readonly overallIntegration: number;
}

export interface MerkabaProgressData {
  readonly spinRate: VibrationRate;
  readonly stability: EnergyLevel;
  readonly geometricAccuracy: number;
  readonly lightQuotient: EnergyLevel;
}

// Meditation Preferences
export interface MeditationPreferences {
  readonly defaultDuration: number;
  readonly preferredVoice: 'aurora_divine' | 'orion_guardian' | 'luna_harmony' | 'ember_wisdom';
  readonly binauralBeatsEnabled: boolean;
  readonly defaultFrequency: SpiritualFrequency;
  readonly backgroundMusic: boolean;
  readonly guidanceLevel: 'minimal' | 'moderate' | 'comprehensive';
  readonly practiceReminders: boolean;
}

// VERS Settings
export interface VERSSettings {
  readonly voiceProfile: 'aurora_divine' | 'orion_guardian' | 'luna_harmony' | 'ember_wisdom';
  readonly responseStyle: 'concise' | 'detailed' | 'poetic';
  readonly spiritualLevel: 'beginner' | 'intermediate' | 'advanced' | 'master';
  readonly contextAwareness: boolean;
  readonly personalizedGuidance: boolean;
  readonly emergencyProtocols: boolean;
}

// User Preferences
export interface UserPreferences {
  readonly theme: 'cosmic' | 'light' | 'high-contrast';
  readonly fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  readonly animationsEnabled: boolean;
  readonly soundEnabled: boolean;
  readonly notificationsEnabled: boolean;
  readonly accessibilityMode: boolean;
  readonly language: string;
  readonly timeZone: string;
}

// Performance Settings
export interface PerformanceSettings {
  readonly maxFPS: number;
  readonly visualQuality: 'low' | 'medium' | 'high' | 'ultra';
  readonly particleCount: 'minimal' | 'moderate' | 'maximum';
  readonly shaderComplexity: 'simple' | 'standard' | 'advanced';
  readonly memoryOptimization: boolean;
  readonly backgroundProcessing: boolean;
}

// Protection Protocols
export interface ProtectionProtocols {
  readonly autoShield: boolean;
  readonly emergencyProtection: readonly string[];
  readonly threatDetection: boolean;
  readonly energyBoundaries: boolean;
  readonly entityFiltering: boolean;
  readonly auricFieldMaintenance: boolean;
}

// Type-Safe Storage Interface
export interface TypeSafeStorage {
  get<T>(key: StorageKey): Promise<Result<T | null, Error>>;
  set<T>(key: StorageKey, value: T): Promise<Result<void, Error>>;
  remove(key: StorageKey): Promise<Result<void, Error>>;
  clear(): Promise<Result<void, Error>>;
  keys(): Promise<Result<StorageKey[], Error>>;
}

// Validation Schemas
const ValidationSchemas = {
  spiritual_progress: (data: any): data is SpiritualProgressData => {
    try {
      return (
        typeof data.userId === 'string' &&
        typeof data.overallLevel === 'number' &&
        data.overallLevel >= 0 && data.overallLevel <= 100 &&
        typeof data.lastUpdate === 'string' &&
        Array.isArray(data.chakraProgress) &&
        data.chakraProgress.every((chakra: any) => 
          typeof chakra.id === 'number' &&
          chakra.id >= 1 && chakra.id <= 15 &&
          typeof chakra.energyLevel === 'number' &&
          chakra.energyLevel >= 0 && chakra.energyLevel <= 100
        ) &&
        typeof data.version === 'number'
      );
    } catch {
      return false;
    }
  },

  meditation_preferences: (data: any): data is MeditationPreferences => {
    const validVoices = ['aurora_divine', 'orion_guardian', 'luna_harmony', 'ember_wisdom'];
    const validGuidance = ['minimal', 'moderate', 'comprehensive'];
    
    return (
      typeof data.defaultDuration === 'number' &&
      data.defaultDuration > 0 &&
      validVoices.includes(data.preferredVoice) &&
      typeof data.binauralBeatsEnabled === 'boolean' &&
      typeof data.defaultFrequency === 'number' &&
      validGuidance.includes(data.guidanceLevel)
    );
  },

  user_preferences: (data: any): data is UserPreferences => {
    const validThemes = ['cosmic', 'light', 'high-contrast'];
    const validFontSizes = ['small', 'medium', 'large', 'extra-large'];
    
    return (
      validThemes.includes(data.theme) &&
      validFontSizes.includes(data.fontSize) &&
      typeof data.animationsEnabled === 'boolean' &&
      typeof data.soundEnabled === 'boolean' &&
      typeof data.language === 'string'
    );
  }
};

// Local Storage Implementation
export class TypeSafeLocalStorage implements TypeSafeStorage {
  private readonly prefix = 'ascension_codex_';

  async get<T>(key: StorageKey): Promise<Result<T | null, Error>> {
    try {
      if (typeof window === 'undefined') {
        return success(null);
      }

      const item = localStorage.getItem(this.prefix + key);
      if (!item) {
        return success(null);
      }

      const parsed = JSON.parse(item);
      
      // Validate data structure if validator exists
      const validator = ValidationSchemas[key as keyof typeof ValidationSchemas];
      if (validator && !validator(parsed)) {
        return failure(new Error(`Invalid data structure for key: ${key}`));
      }

      return success(parsed as T);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to get item from storage'));
    }
  }

  async set<T>(key: StorageKey, value: T): Promise<Result<void, Error>> {
    try {
      if (typeof window === 'undefined') {
        return failure(new Error('Local storage not available'));
      }

      // Validate data before storing if validator exists
      const validator = ValidationSchemas[key as keyof typeof ValidationSchemas];
      if (validator && !validator(value)) {
        return failure(new Error(`Invalid data structure for key: ${key}`));
      }

      const serialized = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, serialized);
      
      return success(undefined);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to set item in storage'));
    }
  }

  async remove(key: StorageKey): Promise<Result<void, Error>> {
    try {
      if (typeof window === 'undefined') {
        return failure(new Error('Local storage not available'));
      }

      localStorage.removeItem(this.prefix + key);
      return success(undefined);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to remove item from storage'));
    }
  }

  async clear(): Promise<Result<void, Error>> {
    try {
      if (typeof window === 'undefined') {
        return failure(new Error('Local storage not available'));
      }

      // Only clear items with our prefix
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      return success(undefined);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to clear storage'));
    }
  }

  async keys(): Promise<Result<StorageKey[], Error>> {
    try {
      if (typeof window === 'undefined') {
        return success([]);
      }

      const keys: StorageKey[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          const storageKey = key.substring(this.prefix.length) as StorageKey;
          keys.push(storageKey);
        }
      }

      return success(keys);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to get storage keys'));
    }
  }
}

// Spiritual Progress Manager
export class SpiritualProgressManager {
  constructor(private storage: TypeSafeStorage) {}

  async getSpiritualProgress(userId: string): Promise<Result<SpiritualProgressData | null, Error>> {
    const result = await this.storage.get<SpiritualProgressData>('spiritual_progress');
    
    if (!result.success) {
      return result;
    }

    // Return null if no data or wrong user
    if (!result.data || result.data.userId !== userId) {
      return success(null);
    }

    return success(result.data);
  }

  async updateSpiritualProgress(progress: SpiritualProgressData): Promise<Result<void, Error>> {
    // Increment version for optimistic locking
    const updatedProgress = {
      ...progress,
      version: progress.version + 1,
      lastUpdate: new Date().toISOString()
    };

    return this.storage.set('spiritual_progress', updatedProgress);
  }

  async updateChakraProgress(
    userId: string, 
    chakraId: ChakraID, 
    updates: Partial<ChakraProgressData>
  ): Promise<Result<void, Error>> {
    const progressResult = await this.getSpiritualProgress(userId);
    
    if (!progressResult.success) {
      return progressResult;
    }

    let progress = progressResult.data;
    if (!progress) {
      // Create new progress data
      progress = this.createDefaultProgress(userId);
    }

    // Update specific chakra
    const updatedChakras = progress.chakraProgress.map(chakra => 
      chakra.id === chakraId 
        ? { ...chakra, ...updates, lastActivation: new Date().toISOString() }
        : chakra
    );

    const updatedProgress = {
      ...progress,
      chakraProgress: updatedChakras
    };

    return this.updateSpiritualProgress(updatedProgress);
  }

  private createDefaultProgress(userId: string): SpiritualProgressData {
    const defaultChakras: ChakraProgressData[] = Array.from({ length: 15 }, (_, i) => ({
      id: createChakraID(i + 1),
      energyLevel: createEnergyLevel(0),
      frequency: createSpiritualFrequency(100 + (i * 50)),
      vibrationRate: createVibrationRate(1),
      isBalanced: false,
      activationCount: 0
    }));

    return {
      userId,
      overallLevel: createEnergyLevel(0),
      lastUpdate: new Date().toISOString(),
      chakraProgress: defaultChakras,
      lightbodyProgress: {
        layers: Array.from({ length: 7 }, (_, i) => ({
          level: (i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7,
          activationPercentage: 0,
          frequency: createSpiritualFrequency(200 + (i * 100)),
          isStable: false
        })),
        overallIntegration: 0
      },
      merkabaDevelopment: {
        spinRate: createVibrationRate(0),
        stability: createEnergyLevel(0),
        geometricAccuracy: 0,
        lightQuotient: createEnergyLevel(0)
      },
      dnaActivationLevel: 0,
      protectionMastery: createEnergyLevel(0),
      version: 1
    };
  }
}

// Preferences Manager
export class PreferencesManager {
  constructor(private storage: TypeSafeStorage) {}

  async getMeditationPreferences(): Promise<Result<MeditationPreferences, Error>> {
    const result = await this.storage.get<MeditationPreferences>('meditation_preferences');
    
    if (!result.success) {
      return result;
    }

    return success(result.data || this.getDefaultMeditationPreferences());
  }

  async updateMeditationPreferences(preferences: Partial<MeditationPreferences>): Promise<Result<void, Error>> {
    const currentResult = await this.getMeditationPreferences();
    
    if (!currentResult.success) {
      return currentResult;
    }

    const updated = { ...currentResult.data, ...preferences };
    return this.storage.set('meditation_preferences', updated);
  }

  async getUserPreferences(): Promise<Result<UserPreferences, Error>> {
    const result = await this.storage.get<UserPreferences>('user_preferences');
    
    if (!result.success) {
      return result;
    }

    return success(result.data || this.getDefaultUserPreferences());
  }

  async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<Result<void, Error>> {
    const currentResult = await this.getUserPreferences();
    
    if (!currentResult.success) {
      return currentResult;
    }

    const updated = { ...currentResult.data, ...preferences };
    return this.storage.set('user_preferences', updated);
  }

  private getDefaultMeditationPreferences(): MeditationPreferences {
    return {
      defaultDuration: 20,
      preferredVoice: 'aurora_divine',
      binauralBeatsEnabled: true,
      defaultFrequency: createSpiritualFrequency(432),
      backgroundMusic: false,
      guidanceLevel: 'moderate',
      practiceReminders: true
    };
  }

  private getDefaultUserPreferences(): UserPreferences {
    return {
      theme: 'cosmic',
      fontSize: 'medium',
      animationsEnabled: true,
      soundEnabled: true,
      notificationsEnabled: true,
      accessibilityMode: false,
      language: 'en',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }
}

// Export singleton instances
export const typeSafeStorage = new TypeSafeLocalStorage();
export const spiritualProgressManager = new SpiritualProgressManager(typeSafeStorage);
export const preferencesManager = new PreferencesManager(typeSafeStorage);

// React Hooks for Type-Safe Storage
export function useTypeSafeStorage<T>(key: StorageKey) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const refresh = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await typeSafeStorage.get<T>(key);
    
    if (result.success) {
      setData(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  }, [key]);

  const update = React.useCallback(async (value: T) => {
    const result = await typeSafeStorage.set(key, value);
    
    if (result.success) {
      setData(value);
    } else {
      setError(result.error);
    }
    
    return result;
  }, [key]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    data,
    loading,
    error,
    refresh,
    update
  };
}

export function useSpiritualProgress(userId: string) {
  const [progress, setProgress] = React.useState<SpiritualProgressData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const refresh = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await spiritualProgressManager.getSpiritualProgress(userId);
    
    if (result.success) {
      setProgress(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  }, [userId]);

  const updateProgress = React.useCallback(async (updates: Partial<SpiritualProgressData>) => {
    if (!progress) return failure(new Error('No progress data available'));

    const updated = { ...progress, ...updates };
    const result = await spiritualProgressManager.updateSpiritualProgress(updated);
    
    if (result.success) {
      setProgress(updated);
    } else {
      setError(result.error);
    }
    
    return result;
  }, [progress]);

  const updateChakra = React.useCallback(async (
    chakraId: ChakraID, 
    updates: Partial<ChakraProgressData>
  ) => {
    const result = await spiritualProgressManager.updateChakraProgress(userId, chakraId, updates);
    
    if (result.success) {
      await refresh(); // Refresh to get updated data
    } else {
      setError(result.error);
    }
    
    return result;
  }, [userId, refresh]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    progress,
    loading,
    error,
    refresh,
    updateProgress,
    updateChakra
  };
}

// React import
import React from 'react';