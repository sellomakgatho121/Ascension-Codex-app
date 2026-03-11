// Advanced speech synthesis utility for VERS AI Assistant
export interface VoiceProfile {
  id: string;
  name: string;
  description: string;
  voiceName: string;
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
    voiceName: 'Microsoft Zira - English (United States)',
    pitch: 1.2,
    rate: 1.1,
    volume: 0.9,
    language: 'en-US'
  },
  {
    id: 'michael-guardian',
    name: 'Michael Guardian',
    description: 'Strong protective masculine voice for empowerment',
    voiceName: 'Microsoft David - English (United States)',
    pitch: 0.9,
    rate: 1.05,
    volume: 1.0,
    language: 'en-US'
  },
  {
    id: 'krystal-harmony',
    name: 'Krystal Harmony',
    description: 'Balanced androgynous voice for universal wisdom',
    voiceName: 'Microsoft Mark - English (United States)',
    pitch: 1.0,
    rate: 1.1,
    volume: 0.9,
    language: 'en-US'
  },
  {
    id: 'thoth-wisdom',
    name: 'Thoth Wisdom',
    description: 'Ancient mystical voice for deep teachings',
    voiceName: 'Microsoft Zira - English (United States)',
    pitch: 0.95,
    rate: 1.0,
    volume: 1.0,
    language: 'en-US'
  }
];

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
    return new Promise((resolve) => {
      const loadVoices = () => {
        this.voices = this.synthesis.getVoices();
        this.isInitialized = true;
        resolve();
      };

      if (this.synthesis.getVoices().length !== 0) {
        loadVoices();
      } else {
        this.synthesis.addEventListener('voiceschanged', loadVoices);
      }
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

  private findBestVoice(voiceName: string, language: string): SpeechSynthesisVoice | null {
    // Priority 1: Exact match
    let voice = this.voices.find(v => v.name === voiceName);

    // Priority 2: Google voices (usually higher quality on Chrome)
    if (!voice) {
      voice = this.voices.find(v => v.name.includes("Google") && v.lang === language);
    }

    // Priority 3: Any matching language voice
    if (!voice) {
      voice = this.voices.find(v => v.lang === language);
    }

    // Priority 4: Default
    if (!voice && this.voices.length > 0) {
      voice = this.voices[0];
    }

    return voice || null;
  }

  async speak(text: string, onStart?: () => void, onEnd?: () => void, onError?: (error: Error) => void): Promise<void> {
    if (!this.isInitialized) {
      await this.initializeVoices();
    }

    this.synthesis.cancel();

    return new Promise((resolve, reject) => {
      // Split long text into chunks for better flow and dynamic adjustments
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

      let currentSentenceIndex = 0;

      const speakNextSentence = () => {
        if (currentSentenceIndex >= sentences.length) {
          onEnd?.();
          resolve();
          return;
        }

        const sentence = sentences[currentSentenceIndex];
        const utterance = new SpeechSynthesisUtterance(sentence.trim());

        const voice = this.findBestVoice(this.currentVoice.voiceName, this.currentVoice.language);
        if (voice) utterance.voice = voice;

        // Dynamic Prosody: Micro-variations to sound more "alive"
        // Varies rate and pitch slightly per sentence to avoid robotic monotony
        const variance = 0.05;
        const randomRate = this.currentVoice.rate + (Math.random() * variance - (variance / 2));
        const randomPitch = this.currentVoice.pitch + (Math.random() * variance - (variance / 2));

        utterance.rate = Math.max(0.8, Math.min(2.0, randomRate)); // Clamp
        utterance.pitch = Math.max(0.8, Math.min(1.5, randomPitch));
        utterance.volume = this.currentVoice.volume;
        utterance.lang = this.currentVoice.language;

        if (currentSentenceIndex === 0) onStart?.();

        utterance.onend = () => {
          currentSentenceIndex++;
          speakNextSentence();
        };

        utterance.onerror = (event: any) => {
          // Continue to next sentence even on error if possible
          console.warn("Speech error on chunk:", event);
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

  // Enhanced spiritual guidance speech with emphasized keywords
  async speakSpiritualGuidance(text: string, onStart?: () => void, onEnd?: () => void): Promise<void> {
    // Add spiritual emphasis to key terms
    const enhancedText = this.addSpiritualEmphasis(text);
    return this.speak(enhancedText, onStart, onEnd);
  }

  private addSpiritualEmphasis(text: string): string {
    // Add SSML-like emphasis for spiritual terms
    const spiritualTerms = [
      'twelve dimensional', '12d', 'shield', 'protection',
      'lightbody', 'chakra', 'energy', 'consciousness',
      'ascension', 'guardian', 'krystal', 'star', 'love',
      'divine', 'sacred', 'holy', 'christ', 'universal'
    ];

    let enhancedText = text;

    spiritualTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      enhancedText = enhancedText.replace(regex, (match) => {
        return `${match}.`; // Add slight pause after important terms
      });
    });

    return enhancedText;
  }
}

// Create singleton instance
export const spiritualSpeech = new SpiritualSpeechSynthesis();