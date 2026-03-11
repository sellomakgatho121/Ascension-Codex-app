/**
 * Orpheus-TTS Integration for VERS
 * Provides ultra-realistic voice synthesis with spiritual-appropriate tones
 * Replaces robotic Resemble.ai voices with human-like speech quality
 */

export interface OrpheusVoiceConfig {
  voice: 'tara' | 'leah' | 'jess' | 'leo' | 'dan' | 'mia' | 'zac' | 'zoe';
  emotion?: 'calm' | 'compassionate' | 'wise' | 'nurturing' | 'supportive';
  speed?: number; // 0.5 to 2.0
  streaming?: boolean;
}

export interface OrpheusResponse {
  audioUrl: string;
  duration: number;
  text: string;
  voice: string;
}

// Spiritual voice profiles with appropriate characteristics
export const SPIRITUAL_VOICE_PROFILES = {
  'aurora-divine': {
    voice: 'tara' as const,
    emotion: 'compassionate' as const,
    description: 'Divine feminine energy, perfect for chakra guidance',
    characteristics: ['gentle', 'nurturing', 'ethereal']
  },
  'orion-guardian': {
    voice: 'leo' as const,
    emotion: 'wise' as const,
    description: 'Masculine guardian energy, ideal for protection guidance',
    characteristics: ['strong', 'protective', 'grounding']
  },
  'luna-harmony': {
    voice: 'leah' as const,
    emotion: 'calm' as const,
    description: 'Balanced feminine wisdom, great for meditation',
    characteristics: ['balanced', 'serene', 'harmonious']
  },
  'ember-wisdom': {
    voice: 'jess' as const,
    emotion: 'supportive' as const,
    description: 'Young wisdom energy, perfect for learning guidance',
    characteristics: ['encouraging', 'supportive', 'enthusiastic']
  },
  'sage-masculine': {
    voice: 'dan' as const,
    emotion: 'wise' as const,
    description: 'Mature masculine wisdom, ideal for advanced teachings',
    characteristics: ['authoritative', 'wise', 'grounding']
  },
  'crystal-clarity': {
    voice: 'mia' as const,
    emotion: 'calm' as const,
    description: 'Clear and precise energy, perfect for technical spiritual concepts',
    characteristics: ['clear', 'precise', 'illuminating']
  }
} as const;

export type SpiritualVoiceProfile = keyof typeof SPIRITUAL_VOICE_PROFILES;

class OrpheusVoiceEngine {
  private baseUrl: string;
  private isInitialized: boolean = false;

  constructor() {
    // Using Hugging Face Inference API for Orpheus-TTS
    this.baseUrl = 'https://api-inference.huggingface.co/models/canopylabs/orpheus-tts-0.1-finetune-prod';
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // Test connection to Orpheus API
      const response = await fetch('/api/orpheus-health');
      if (response.ok) {
        this.isInitialized = true;
        console.log('Orpheus-TTS voice engine initialized successfully');
      }
    } catch (error) {
      console.warn('Orpheus-TTS not available, falling back to browser synthesis:', error);
    }
  }

  async synthesizeText(
    text: string, 
    profile: SpiritualVoiceProfile = 'aurora-divine',
    options: Partial<OrpheusVoiceConfig> = {}
  ): Promise<OrpheusResponse> {
    
    const voiceProfile = SPIRITUAL_VOICE_PROFILES[profile];
    const config: OrpheusVoiceConfig = {
      voice: voiceProfile.voice,
      emotion: voiceProfile.emotion,
      speed: 1.0,
      streaming: false,
      ...options
    };

    // Add spiritual emotion tags to enhance the speech
    const enhancedText = this.addEmotionTags(text, config.emotion);
    
    try {
      const response = await fetch('/api/orpheus-synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: enhancedText,
          voice: config.voice,
          emotion: config.emotion,
          speed: config.speed,
          streaming: config.streaming,
          profile: profile
        })
      });

      if (!response.ok) {
        throw new Error(`Orpheus synthesis failed: ${response.statusText}`);
      }

      return await response.json();
      
    } catch (error) {
      console.error('Orpheus synthesis error:', error);
      
      // Fallback to browser speech synthesis with enhanced spiritual tone
      return this.fallbackSynthesis(text, profile);
    }
  }

  private addEmotionTags(text: string, emotion?: string): string {
    if (!emotion) return text;

    // Add appropriate emotion tags for spiritual content
    switch (emotion) {
      case 'compassionate':
        return text.replace(/\./g, '. <gentle_breath>').replace(/\?/g, '? <soft_pause>');
      case 'wise':
        return text.replace(/\./g, '. <thoughtful_pause>').replace(/\!/g, '! <affirming_breath>');
      case 'calm':
        return text.replace(/\./g, '. <peaceful_pause>').replace(/,/g, ', <gentle_breath>');
      case 'nurturing':
        return text.replace(/\./g, '. <warm_pause>').replace(/\?/g, '? <caring_tone>');
      case 'supportive':
        return text.replace(/\./g, '. <encouraging_pause>').replace(/\!/g, '! <uplifting_tone>');
      default:
        return text;
    }
  }

  private async fallbackSynthesis(text: string, profile: SpiritualVoiceProfile): Promise<OrpheusResponse> {
    // Enhanced browser synthesis as fallback
    const voiceProfile = SPIRITUAL_VOICE_PROFILES[profile];
    
    // Use SpeechSynthesis API with improved settings
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find appropriate voice
    const voices = speechSynthesis.getVoices();
    const femaleVoices = voices.filter(v => 
      v.name.toLowerCase().includes('female') || 
      v.name.toLowerCase().includes('woman') ||
      v.name.toLowerCase().includes('samantha') ||
      v.name.toLowerCase().includes('karen')
    );
    
    const maleVoices = voices.filter(v => 
      v.name.toLowerCase().includes('male') || 
      v.name.toLowerCase().includes('man') ||
      v.name.toLowerCase().includes('alex') ||
      v.name.toLowerCase().includes('daniel')
    );

    // Select voice based on profile
    if (['aurora-divine', 'luna-harmony', 'ember-wisdom', 'crystal-clarity'].includes(profile)) {
      utterance.voice = femaleVoices[0] || voices[0];
    } else {
      utterance.voice = maleVoices[0] || voices[1] || voices[0];
    }

    // Spiritual-appropriate speech settings
    utterance.rate = 0.85; // Slightly slower for contemplative pace
    utterance.pitch = 1.1; // Slightly higher for warmth
    utterance.volume = 0.9; // Gentle volume

    return new Promise((resolve) => {
      utterance.onend = () => {
        resolve({
          audioUrl: '', // Browser synthesis doesn't provide URL
          duration: text.length * 0.1, // Estimate duration
          text: text,
          voice: voiceProfile.voice
        });
      };

      speechSynthesis.speak(utterance);
    });
  }

  // Real-time streaming synthesis for live conversations
  async *streamSynthesis(
    text: string, 
    profile: SpiritualVoiceProfile = 'aurora-divine'
  ): AsyncGenerator<ArrayBuffer, void, unknown> {
    
    try {
      const response = await fetch('/api/orpheus-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          profile: profile,
          streaming: true
        })
      });

      if (!response.body) {
        throw new Error('No response body for streaming');
      }

      const reader = response.body.getReader();
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        yield value.buffer;
      }
      
    } catch (error) {
      console.error('Streaming synthesis error:', error);
      // Fallback to regular synthesis
      const result = await this.synthesizeText(text, profile);
      // Convert to stream-like response (simplified)
      yield new ArrayBuffer(0);
    }
  }

  getAvailableVoices(): Array<{
    id: SpiritualVoiceProfile;
    name: string;
    description: string;
    characteristics: string[];
    voice: string;
  }> {
    return Object.entries(SPIRITUAL_VOICE_PROFILES).map(([id, profile]) => ({
      id: id as SpiritualVoiceProfile,
      name: id.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      description: profile.description,
      characteristics: profile.characteristics,
      voice: profile.voice
    }));
  }

  // Test voice with sample spiritual text
  async testVoice(profile: SpiritualVoiceProfile): Promise<OrpheusResponse> {
    const sampleTexts = {
      'aurora-divine': 'Breathe deeply and feel the divine feminine energy flowing through your heart chakra. You are loved, you are safe, you are whole.',
      'orion-guardian': 'Stand strong in your power. Your spiritual protection is absolute. Trust in the guardian energy that surrounds you.',
      'luna-harmony': 'Find balance within yourself. Let the lunar wisdom guide you to inner peace and harmonious alignment.',
      'ember-wisdom': 'Every step on your spiritual journey matters. You are growing, learning, and awakening to your true potential.',
      'sage-masculine': 'Ancient wisdom flows through you. Connect with the grounded masculine energy that provides stability and strength.',
      'crystal-clarity': 'Clear your mind and open your awareness. The truth of your spiritual nature shines bright like crystal light.'
    };

    return this.synthesizeText(sampleTexts[profile], profile);
  }
}

// Export singleton instance
export const orpheusVoice = new OrpheusVoiceEngine();

// Utility functions for VERS integration
export async function initializeVoiceEngine(): Promise<void> {
  await orpheusVoice.initialize();
}

export async function speakSpiritualGuidance(
  text: string,
  voiceProfile: SpiritualVoiceProfile = 'aurora-divine'
): Promise<OrpheusResponse> {
  return orpheusVoice.synthesizeText(text, voiceProfile);
}

export function getRecommendedVoiceForContent(content: string): SpiritualVoiceProfile {
  const contentLower = content.toLowerCase();
  
  // Content analysis for voice recommendation
  if (contentLower.includes('chakra') || contentLower.includes('feminine') || contentLower.includes('goddess')) {
    return 'aurora-divine';
  } else if (contentLower.includes('protection') || contentLower.includes('shield') || contentLower.includes('guard')) {
    return 'orion-guardian';
  } else if (contentLower.includes('meditation') || contentLower.includes('balance') || contentLower.includes('harmony')) {
    return 'luna-harmony';
  } else if (contentLower.includes('learning') || contentLower.includes('growth') || contentLower.includes('journey')) {
    return 'ember-wisdom';
  } else if (contentLower.includes('wisdom') || contentLower.includes('ancient') || contentLower.includes('mastery')) {
    return 'sage-masculine';
  } else if (contentLower.includes('clarity') || contentLower.includes('understanding') || contentLower.includes('insight')) {
    return 'crystal-clarity';
  }
  
  // Default to divine feminine for general spiritual content
  return 'aurora-divine';
}

export default orpheusVoice;