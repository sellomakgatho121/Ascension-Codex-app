// VERS AI integration with Resemble.ai for enhanced spiritual voice synthesis
import { SpiritualLogger } from "./typescript-enhancements";

export interface SpiritualVoiceResponse {
  audioUrl: string;
  clipId: string;
  duration: number;
  voiceProfile: string;
  spiritualFrequency: number;
  generatedAt: string;
}

export interface VERSVoiceRequest {
  text: string;
  voiceProfile: 'aurora_divine' | 'orion_guardian' | 'luna_harmony' | 'ember_wisdom';
  spiritualContext?: {
    chakraFocus?: number;
    energyType?: 'nurturing' | 'protective' | 'balanced' | 'mystical';
    urgency?: 'low' | 'medium' | 'high';
  };
}

// Enhanced VERS voice synthesis using Resemble.ai
export class VERSResembleIntegration {
  private baseUrl: string;
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  // Generate spiritual voice using Resemble.ai
  async generateSpiritualVoice(request: VERSVoiceRequest): Promise<SpiritualVoiceResponse> {
    try {
      SpiritualLogger.vers('Starting Resemble.ai spiritual voice generation', request.text);

      const response = await fetch(`${this.baseUrl}/api/spiritual-voice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Voice synthesis failed: ${errorData.details || response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(`Voice generation failed: ${result.error}`);
      }

      SpiritualLogger.vers('Resemble.ai voice generation completed', {
        voiceProfile: result.data.voiceProfile,
        duration: result.data.duration,
        frequency: result.data.spiritualFrequency
      });

      return result.data;

    } catch (error) {
      SpiritualLogger.error('Resemble.ai voice generation failed', error as Error, {
        practiceType: 'voice_synthesis',
        voiceProfile: request.voiceProfile
      });
      throw error;
    }
  }

  // Play spiritual voice with enhanced audio management
  async playSpiritualVoice(
    text: string, 
    voiceProfile: VERSVoiceRequest['voiceProfile'] = 'aurora_divine',
    spiritualContext?: VERSVoiceRequest['spiritualContext']
  ): Promise<void> {
    try {
      // Generate cache key
      const cacheKey = `${voiceProfile}-${this.hashText(text)}`;
      
      // Check if audio is already cached
      let audio = this.audioCache.get(cacheKey);
      
      if (!audio) {
        // Generate new voice synthesis
        const voiceResponse = await this.generateSpiritualVoice({
          text,
          voiceProfile,
          spiritualContext
        });

        // Create and cache audio element
        audio = new Audio(voiceResponse.audioUrl);
        audio.preload = 'auto';
        this.audioCache.set(cacheKey, audio);

        // Add spiritual audio enhancement
        this.enhanceAudioForSpiritual(audio, voiceResponse.spiritualFrequency);
      }

      // Play with spiritual energy infusion
      await this.playWithSpiritualEffects(audio, voiceProfile);

    } catch (error) {
      SpiritualLogger.error('Failed to play spiritual voice', error as Error);
      throw error;
    }
  }

  // Enhanced audio playback with spiritual effects
  private async playWithSpiritualEffects(
    audio: HTMLAudioElement, 
    voiceProfile: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Set spiritual volume curve
      audio.volume = 0;
      
      const playPromise = audio.play();
      
      if (playPromise) {
        playPromise
          .then(() => {
            // Gentle fade-in for spiritual resonance
            this.fadeInAudio(audio, this.getVoiceVolume(voiceProfile));
            
            audio.onended = () => {
              SpiritualLogger.vers('Spiritual voice playback completed', voiceProfile);
              resolve();
            };
            
            audio.onerror = () => {
              reject(new Error('Audio playback failed'));
            };
          })
          .catch(reject);
      } else {
        reject(new Error('Audio play promise not supported'));
      }
    });
  }

  // Audio enhancement for spiritual frequencies
  private enhanceAudioForSpiritual(audio: HTMLAudioElement, frequency: number): void {
    try {
      // Create Web Audio API context for spiritual enhancement
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audio);
      const gainNode = audioContext.createGain();
      const biquadFilter = audioContext.createBiquadFilter();

      // Configure filter for spiritual frequency enhancement
      biquadFilter.type = 'peaking';
      biquadFilter.frequency.setValueAtTime(frequency, audioContext.currentTime);
      biquadFilter.Q.setValueAtTime(1.2, audioContext.currentTime);
      biquadFilter.gain.setValueAtTime(3, audioContext.currentTime);

      // Connect audio nodes
      source.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      SpiritualLogger.vers('Applied spiritual frequency enhancement', { frequency });

    } catch (error) {
      // Fallback to basic playback if Web Audio API fails
      SpiritualLogger.error('Web Audio API enhancement failed, using basic playback', error as Error);
    }
  }

  // Smooth audio fade-in for spiritual resonance
  private fadeInAudio(audio: HTMLAudioElement, targetVolume: number = 0.8): void {
    const fadeInDuration = 800; // 800ms fade-in
    const fadeSteps = 20;
    const stepDuration = fadeInDuration / fadeSteps;
    const volumeStep = targetVolume / fadeSteps;

    let currentStep = 0;
    
    const fadeInterval = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(volumeStep * currentStep, targetVolume);
      
      if (currentStep >= fadeSteps) {
        clearInterval(fadeInterval);
        audio.volume = targetVolume;
      }
    }, stepDuration);
  }

  // Get optimal volume for voice profile
  private getVoiceVolume(voiceProfile: string): number {
    const volumes = {
      aurora_divine: 0.75,    // Gentle, nurturing
      orion_guardian: 0.85,   // Strong, protective
      luna_harmony: 0.70,     // Soft, balanced
      ember_wisdom: 0.80      // Mystical, clear
    };
    
    return volumes[voiceProfile as keyof typeof volumes] || 0.75;
  }

  // Simple text hashing for cache keys
  private hashText(text: string): string {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  // Test Resemble.ai connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/resemble-test`);
      const data = await response.json();
      return data.success && data.connected;
    } catch {
      return false;
    }
  }

  // Get available spiritual voices
  async getAvailableVoices(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/spiritual-voices`);
      const data = await response.json();
      return data.success ? data.voices : [];
    } catch (error) {
      SpiritualLogger.error('Failed to fetch spiritual voices', error as Error);
      return [];
    }
  }

  // Clear audio cache
  clearCache(): void {
    this.audioCache.clear();
    SpiritualLogger.vers('Spiritual voice cache cleared');
  }

  // Stop all playing audio
  stopAllAudio(): void {
    this.audioCache.forEach(audio => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    SpiritualLogger.vers('All spiritual voice playback stopped');
  }
}

// Create singleton instance for global use
export const versResemble = new VERSResembleIntegration();

// Utility function for easy VERS voice synthesis
export async function speakSpiritualGuidance(
  text: string,
  options: {
    voiceProfile?: VERSVoiceRequest['voiceProfile'];
    chakraFocus?: number;
    energyType?: 'nurturing' | 'protective' | 'balanced' | 'mystical';
    urgency?: 'low' | 'medium' | 'high';
  } = {}
): Promise<void> {
  const {
    voiceProfile = 'aurora_divine',
    chakraFocus,
    energyType = 'nurturing',
    urgency = 'medium'
  } = options;

  return versResemble.playSpiritualVoice(text, voiceProfile, {
    chakraFocus,
    energyType,
    urgency
  });
}

// Voice profile recommendations based on spiritual context
export function recommendVoiceProfile(context: {
  chakraFocus?: number;
  practiceType?: string;
  urgency?: 'low' | 'medium' | 'high';
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
}): VERSVoiceRequest['voiceProfile'] {
  const { chakraFocus, practiceType, urgency, userLevel } = context;

  // Heart chakra guidance - nurturing
  if (chakraFocus === 4 || practiceType?.includes('heart')) {
    return 'aurora_divine';
  }

  // Root/Solar plexus - protective
  if ([1, 3].includes(chakraFocus!) || practiceType?.includes('protection')) {
    return 'orion_guardian';
  }

  // Crown/Third eye - mystical
  if ([6, 7].includes(chakraFocus!) || practiceType?.includes('wisdom')) {
    return 'ember_wisdom';
  }

  // High urgency - protective
  if (urgency === 'high') {
    return 'orion_guardian';
  }

  // Advanced practitioners - mystical
  if (userLevel === 'advanced') {
    return 'ember_wisdom';
  }

  // Default balanced voice
  return 'luna_harmony';
}