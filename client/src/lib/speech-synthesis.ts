// Web Speech API speech synthesis for VERS AI Assistant
// Uses browser-native voices with cross-platform fallback detection

export interface VoiceProfile {
  id: string;
  name: string;
  description: string;
  /** Preferred voice characteristics — matched against available system voices */
  preferredVoiceType: 'female' | 'male' | 'any';
  pitch: number;
  rate: number;
  volume: number;
  language: string;
}

export const SPIRITUAL_VOICES: VoiceProfile[] = [
  {
    id: 'sophia-divine',
    name: 'Sophia Divine',
    description: 'Nurturing feminine wisdom voice for healing and guidance',
    preferredVoiceType: 'female',
    pitch: 1.2,
    rate: 1.1,
    volume: 0.9,
    language: 'en-US'
  },
  {
    id: 'michael-guardian',
    name: 'Michael Guardian',
    description: 'Strong protective masculine voice for empowerment',
    preferredVoiceType: 'male',
    pitch: 0.9,
    rate: 1.05,
    volume: 1.0,
    language: 'en-US'
  },
  {
    id: 'krystal-harmony',
    name: 'Krystal Harmony',
    description: 'Balanced voice for universal wisdom',
    preferredVoiceType: 'any',
    pitch: 1.0,
    rate: 1.1,
    volume: 0.9,
    language: 'en-US'
  },
  {
    id: 'thoth-wisdom',
    name: 'Thoth Wisdom',
    description: 'Calm, measured voice for deep teachings',
    preferredVoiceType: 'male',
    pitch: 0.95,
    rate: 1.0,
    volume: 1.0,
    language: 'en-US'
  }
];

function detectVoiceGender(name: string): 'female' | 'male' | 'unknown' {
  const lower = name.toLowerCase();
  // Common female indicators across platforms
  if (lower.includes('female') || lower.includes('woman') ||
      lower.includes('girl') || lower.includes('samantha') ||
      lower.includes('zira') || lower.includes('siri') ||
      lower.includes('google us') || lower.includes('sarah') ||
      lower.includes('victoria') || lower.includes('karen') ||
      lower.includes('moira') || lower.includes('tessa') ||
      lower.includes('fiona') || lower.includes('catherine') ||
      lower.includes('veena') || lower.includes('lekha') ||
      lower.includes('helena') || lower.includes('zosia') ||
      lower.includes('salma') || lower.includes('nora') ||
      lower.includes('amira') || lower.includes('mari') ||
      lower.includes('emma') || lower.includes('iona') ||
      lower.includes('carla') || lower.includes('giorgia') ||
      lower.includes('laura') || lower.includes('alice') ||
      lower.includes('lisa') || lower.includes('elena') ||
      lower.includes('sara') || lower.includes('lucia') ||
      lower.includes('joana') || lower.includes('yuna') ||
      lower.includes('heami') || lower.includes('sora') ||
      lower.includes('naomi') || lower.includes('ayame') ||
      lower.includes('linh') || lower.includes('aditi') ||
      lower.includes('neel') || lower.includes('priya') ||
      lower.includes('kanya')) {
    return 'female';
  }
  // Male indicators
  if (lower.includes('male') || lower.includes('man') ||
      lower.includes('boy') || lower.includes('david') ||
      lower.includes('mark') || lower.includes('daniel') ||
      lower.includes('thomas') || lower.includes('alex') ||
      lower.includes('fred') || lower.includes('james') ||
      lower.includes('tom') || lower.includes('oliver') ||
      lower.includes('charlie') || lower.includes('sam') ||
      lower.includes('arthur') || lower.includes('harry') ||
      lower.includes('luca') || lower.includes('matteo') ||
      lower.includes('emiliano') || lower.includes('tomas') ||
      lower.includes('ioan') || lower.includes('damayanti') ||
      lower.includes('arun') || lower.includes('prabhat') ||
      lower.includes('vincent') || lower.includes('remi') ||
      lower.includes('henri')) {
    return 'male';
  }
  return 'unknown';
}

export class SpiritualSpeechSynthesis {
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private currentVoice: VoiceProfile = SPIRITUAL_VOICES[0];
  private isInitialized = false;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initializeVoices();
  }

  private async initializeVoices(): Promise<void> {
    // If voices are already loaded, resolve immediately
    if (this.synthesis.getVoices().length > 0) {
      this.voices = this.synthesis.getVoices();
      this.isInitialized = true;
      return;
    }
    // Otherwise wait for them to load
    return new Promise((resolve) => {
      const handler = () => {
        this.voices = this.synthesis.getVoices();
        this.isInitialized = true;
        this.synthesis.removeEventListener('voiceschanged', handler);
        resolve();
      };
      this.synthesis.addEventListener('voiceschanged', handler);
    });
  }

  setVoiceProfile(profileId: string): void {
    const profile = SPIRITUAL_VOICES.find(v => v.id === profileId);
    if (profile) {
      this.currentVoice = profile;
    }
  }

  getCurrentVoice(): VoiceProfile {
    return this.currentVoice;
  }

  getAvailableVoices(): VoiceProfile[] {
    return SPIRITUAL_VOICES;
  }

  /**
   * Cross-platform voice matching:
   * 1. Prefer Google voices (highest quality on Chrome/Chromium/Android WebView)
   * 2. Match by preferred gender and language
   * 3. Fall back to any voice in the target language
   * 4. Last resort: first available voice
   */
  private findBestVoice(language: string, preferredType: 'female' | 'male' | 'any'): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) return null;

    // Step 1: Google voice in target language (best quality across platforms)
    const googleVoice = this.voices.find(v =>
      v.name.includes('Google') && v.lang.startsWith(language.split('-')[0])
    );
    if (googleVoice) return googleVoice;

    // Step 2: Match by preferred gender + language, then fall back to any gender
    if (preferredType !== 'any') {
      const genderMatch = this.voices.find(v =>
        v.lang.startsWith(language.split('-')[0]) &&
        detectVoiceGender(v.name) === preferredType
      );
      if (genderMatch) return genderMatch;
    }

    // Step 3: Any voice in target language
    const langMatch = this.voices.find(v => v.lang.startsWith(language.split('-')[0]));
    if (langMatch) return langMatch;

    // Step 4: Any Google voice
    const anyGoogle = this.voices.find(v => v.name.includes('Google'));
    if (anyGoogle) return anyGoogle;

    // Step 5: First available
    return this.voices[0];
  }

  async speak(text: string, onStart?: () => void, onEnd?: () => void, onError?: (error: Error) => void): Promise<void> {
    if (!this.isInitialized) {
      await this.initializeVoices();
    }

    this.synthesis.cancel();

    return new Promise((resolve) => {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      let currentSentenceIndex = 0;

      const speakNextSentence = () => {
        if (currentSentenceIndex >= sentences.length) {
          onEnd?.();
          resolve();
          return;
        }

        const sentence = sentences[currentSentenceIndex].trim();
        if (!sentence) {
          currentSentenceIndex++;
          speakNextSentence();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(sentence);

        const voice = this.findBestVoice(this.currentVoice.language, this.currentVoice.preferredVoiceType);
        if (voice) utterance.voice = voice;

        // Micro-variation per sentence to sound more natural
        const variance = 0.05;
        const randomRate = this.currentVoice.rate + (Math.random() * variance - variance / 2);
        const randomPitch = this.currentVoice.pitch + (Math.random() * variance - variance / 2);

        utterance.rate = Math.max(0.5, Math.min(2.0, randomRate));
        utterance.pitch = Math.max(0.5, Math.min(2.0, randomPitch));
        utterance.volume = this.currentVoice.volume;
        utterance.lang = this.currentVoice.language;

        if (currentSentenceIndex === 0) onStart?.();

        utterance.onend = () => {
          currentSentenceIndex++;
          speakNextSentence();
        };

        utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
          console.warn("Speech error on chunk:", event.error, event.message);
          // Continue to next sentence even on error
          currentSentenceIndex++;
          speakNextSentence();
        };

        this.synthesis.speak(utterance);
      };

      speakNextSentence();
    });
  }

  pause(): void {
    this.synthesis.pause();
  }

  resume(): void {
    this.synthesis.resume();
  }

  stop(): void {
    this.synthesis.cancel();
  }

  isSpeaking(): boolean {
    return this.synthesis.speaking;
  }

  isPaused(): boolean {
    return this.synthesis.paused;
  }

  /** Speak with spiritual emphasis by adjusting prosody, not by adding periods */
  async speakSpiritualGuidance(text: string, onStart?: () => void, onEnd?: () => void): Promise<void> {
    return this.speak(text, onStart, onEnd);
  }
}

// Singleton instance
export const spiritualSpeech = new SpiritualSpeechSynthesis();
