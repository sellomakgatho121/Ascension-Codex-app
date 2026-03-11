// WhisperLiveKit Integration for VERS Assistant
// Real-time speech-to-text with advanced voice activity detection

export interface WhisperLiveConfig {
  model: 'tiny' | 'base' | 'small' | 'medium' | 'large' | 'large-v3';
  language: string | 'auto';
  backend: 'simulstreaming' | 'whisperstreaming' | 'faster-whisper';
  minChunkSize: number;
  frameThreshold: number;
  enableVAD: boolean;
  enableDiarization: boolean;
  confidenceThreshold: number;
}

export interface TranscriptionResult {
  text: string;
  timestamp: number;
  confidence: number;
  isFinal: boolean;
  speakerId?: string;
  language?: string;
  spiritualScore?: number;
  energeticState?: string;
}

export interface SpiritualTranscriptionContext {
  spiritualTerms: string[];
  energeticContext: 'meditation' | 'guidance' | 'teaching' | 'protection';
  resonanceLevel: number;
  intentionClarity: number;
}

export class WhisperLiveVERS {
  private websocket: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private isRecording = false;
  private config: WhisperLiveConfig;
  private onTranscriptionCallback?: (result: TranscriptionResult) => void;
  private spiritualContext: SpiritualTranscriptionContext;

  constructor(config: Partial<WhisperLiveConfig> = {}) {
    this.config = {
      model: 'base',
      language: 'auto',
      backend: 'simulstreaming',
      minChunkSize: 1.0,
      frameThreshold: 25,
      enableVAD: true,
      enableDiarization: false,
      confidenceThreshold: 0.7,
      ...config
    };

    this.spiritualContext = {
      spiritualTerms: [
        'chakra', 'lightbody', 'merkaba', 'ascension', 'consciousness',
        'frequency', 'vibration', 'energy', 'dimensional', 'stargate',
        'guardian', 'protection', 'shield', 'sacred', 'divine'
      ],
      energeticContext: 'guidance',
      resonanceLevel: 0.8,
      intentionClarity: 0.9
    };
  }

  // Initialize WhisperLive connection
  async initialize(): Promise<void> {
    try {
      // Try to connect to local WhisperLiveKit server
      await this.connectToWhisperServer();
    } catch (error) {
      console.warn('WhisperLiveKit server not available, falling back to browser API');
      await this.initializeBrowserAPI();
    }
  }

  private async connectToWhisperServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      // WebSocket connection to WhisperLiveKit server
      const wsUrl = `ws://localhost:8000/asr`;
      this.websocket = new WebSocket(wsUrl);

      this.websocket.onopen = () => {
        console.log('🔮 [VERS-WhisperLive] Connected to WhisperLiveKit server');
        resolve();
      };

      this.websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleTranscriptionResult(data);
        } catch (error) {
          console.error('Error parsing transcription result:', error);
        }
      };

      this.websocket.onerror = (error) => {
        console.error('WhisperLive WebSocket error:', error);
        reject(error);
      };

      this.websocket.onclose = () => {
        console.log('🔮 [VERS-WhisperLive] Connection closed');
        this.websocket = null;
      };

      // Timeout for connection
      setTimeout(() => {
        if (this.websocket?.readyState !== WebSocket.OPEN) {
          reject(new Error('WhisperLive server connection timeout'));
        }
      }, 5000);
    });
  }

  private async initializeBrowserAPI(): Promise<void> {
    // Fallback to Web Speech API or OpenAI Whisper
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      console.log('🔮 [VERS-WhisperLive] Using Web Speech API fallback');
      await this.initializeWebSpeechAPI();
    } else {
      console.log('🔮 [VERS-WhisperLive] Using manual audio processing');
      await this.initializeManualProcessing();
    }
  }

  private async initializeWebSpeechAPI(): Promise<void> {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = this.config.language === 'auto' ? 'en-US' : this.config.language;

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcription: TranscriptionResult = {
          text: result[0].transcript,
          timestamp: Date.now(),
          confidence: result[0].confidence || 0.8,
          isFinal: result.isFinal,
          language: this.config.language
        };

        this.enhanceWithSpiritualContext(transcription);
        this.onTranscriptionCallback?.(transcription);
      }
    };

    (this as any).speechRecognition = recognition;
  }

  private async initializeManualProcessing(): Promise<void> {
    // Initialize audio context for manual processing
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  // Start real-time transcription
  async startTranscription(): Promise<void> {
    if (this.isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      if (this.websocket?.readyState === WebSocket.OPEN) {
        await this.startWhisperLiveTranscription(stream);
      } else if ((this as any).speechRecognition) {
        (this as any).speechRecognition.start();
      } else {
        await this.startManualTranscription(stream);
      }

      this.isRecording = true;
      console.log('🔮 [VERS-WhisperLive] Started real-time transcription');
    } catch (error) {
      console.error('Error starting transcription:', error);
      throw error;
    }
  }

  private async startWhisperLiveTranscription(stream: MediaStream): Promise<void> {
    // Create MediaRecorder for WhisperLiveKit
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus'
    });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0 && this.websocket?.readyState === WebSocket.OPEN) {
        // Send audio data to WhisperLiveKit server
        event.data.arrayBuffer().then(buffer => {
          this.websocket?.send(buffer);
        });
      }
    };

    // Send audio chunks every 100ms for real-time processing
    this.mediaRecorder.start(100);
  }

  private async startManualTranscription(stream: MediaStream): Promise<void> {
    // Implement manual audio processing with Web Audio API
    if (!this.audioContext) return;

    const source = this.audioContext.createMediaStreamSource(stream);
    const processor = this.audioContext.createScriptProcessor(4096, 1, 1);

    let audioBuffer: Float32Array[] = [];
    const bufferDuration = this.config.minChunkSize * 1000; // Convert to ms
    let lastProcessTime = Date.now();

    processor.onaudioprocess = (event) => {
      const inputData = event.inputBuffer.getChannelData(0);
      audioBuffer.push(new Float32Array(inputData));

      // Process audio chunks at configured intervals
      if (Date.now() - lastProcessTime >= bufferDuration) {
        this.processAudioBuffer(audioBuffer);
        audioBuffer = [];
        lastProcessTime = Date.now();
      }
    };

    source.connect(processor);
    processor.connect(this.audioContext.destination);
  }

  private async processAudioBuffer(audioBuffer: Float32Array[]): Promise<void> {
    // Convert audio buffer to format suitable for API processing
    const combinedBuffer = new Float32Array(
      audioBuffer.reduce((total, chunk) => total + chunk.length, 0)
    );
    
    let offset = 0;
    for (const chunk of audioBuffer) {
      combinedBuffer.set(chunk, offset);
      offset += chunk.length;
    }

    // Apply Voice Activity Detection
    if (this.config.enableVAD && !this.detectVoiceActivity(combinedBuffer)) {
      return; // Skip processing if no voice detected
    }

    // Send to backend API for processing
    await this.processWithBackendAPI(combinedBuffer);
  }

  private detectVoiceActivity(audioData: Float32Array): boolean {
    // Simple VAD implementation
    const rms = Math.sqrt(
      audioData.reduce((sum, sample) => sum + sample * sample, 0) / audioData.length
    );
    
    const threshold = 0.01; // Adjust based on environment
    return rms > threshold;
  }

  private async processWithBackendAPI(audioData: Float32Array): Promise<void> {
    try {
      // Convert Float32Array to WAV format
      const wavData = this.float32ArrayToWav(audioData);
      
      // Send to OpenAI Whisper API (fallback)
      const formData = new FormData();
      formData.append('file', new Blob([wavData], { type: 'audio/wav' }), 'audio.wav');
      formData.append('model', 'whisper-1');
      formData.append('language', this.config.language === 'auto' ? '' : this.config.language);

      const response = await fetch('/api/transcribe-audio', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        const transcription: TranscriptionResult = {
          text: result.text,
          timestamp: Date.now(),
          confidence: 0.8, // OpenAI doesn't provide confidence scores
          isFinal: true,
          language: result.language
        };

        this.enhanceWithSpiritualContext(transcription);
        this.onTranscriptionCallback?.(transcription);
      }
    } catch (error) {
      console.error('Error processing audio with backend API:', error);
    }
  }

  private float32ArrayToWav(audioData: Float32Array): ArrayBuffer {
    const length = audioData.length;
    const buffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, 16000, true);
    view.setUint32(28, 32000, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);

    // Convert float samples to 16-bit PCM
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, audioData[i] || 0));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }

    return buffer;
  }

  private handleTranscriptionResult(data: any): void {
    if (data.type === 'transcription') {
      const transcription: TranscriptionResult = {
        text: data.text || '',
        timestamp: data.timestamp || Date.now(),
        confidence: data.confidence || 0.8,
        isFinal: data.is_final || false,
        speakerId: data.speaker_id,
        language: data.language
      };

      this.enhanceWithSpiritualContext(transcription);
      this.onTranscriptionCallback?.(transcription);
    }
  }

  private enhanceWithSpiritualContext(transcription: TranscriptionResult): void {
    // Enhance transcription with spiritual context awareness
    const text = transcription.text.toLowerCase();
    
    // Check for spiritual terms
    const containsSpiritualTerms = this.spiritualContext.spiritualTerms.some(term => 
      text.includes(term.toLowerCase())
    );

    if (containsSpiritualTerms) {
      transcription.confidence = Math.min(1.0, transcription.confidence * 1.1);
      console.log('🔮 [VERS-WhisperLive] Enhanced spiritual context detected');
    }

    // Apply energetic context weighting
    if (this.spiritualContext.energeticContext === 'meditation') {
      // Lower confidence threshold for meditation (softer speaking)
      transcription.confidence = Math.max(0.5, transcription.confidence);
    }
  }

  // Stop transcription
  stopTranscription(): void {
    if (!this.isRecording) return;

    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder.stop();
    }

    if ((this as any).speechRecognition) {
      (this as any).speechRecognition.stop();
    }

    if (this.websocket?.readyState === WebSocket.OPEN) {
      this.websocket.close();
    }

    this.isRecording = false;
    console.log('🔮 [VERS-WhisperLive] Stopped transcription');
  }

  // Set transcription callback
  onTranscription(callback: (result: TranscriptionResult) => void): void {
    this.onTranscriptionCallback = callback;
  }

  // Update spiritual context
  updateSpiritualContext(context: Partial<SpiritualTranscriptionContext>): void {
    this.spiritualContext = { ...this.spiritualContext, ...context };
  }

  // Get current configuration
  getConfig(): WhisperLiveConfig {
    return { ...this.config };
  }

  // Update configuration
  updateConfig(newConfig: Partial<WhisperLiveConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Check if recording
  isActive(): boolean {
    return this.isRecording;
  }

  // Get connection status
  getConnectionStatus(): string {
    if (this.websocket?.readyState === WebSocket.OPEN) {
      return 'WhisperLiveKit Server';
    } else if ((this as any).speechRecognition) {
      return 'Web Speech API';
    } else {
      return 'Manual Processing';
    }
  }
}

// Spiritual-enhanced voice detection utilities
export class SpiritualVoiceDetection {
  static detectIntention(text: string): 'question' | 'guidance' | 'meditation' | 'protection' | 'general' {
    const questionWords = ['what', 'how', 'why', 'when', 'where', 'can', 'could', 'would', 'should'];
    const guidanceWords = ['help', 'guide', 'teach', 'show', 'explain', 'understand'];
    const meditationWords = ['meditate', 'breathe', 'center', 'ground', 'focus', 'peace'];
    const protectionWords = ['protect', 'shield', 'clear', 'remove', 'defend', 'safe'];

    const lowerText = text.toLowerCase();

    if (questionWords.some(word => lowerText.includes(word))) {
      return 'question';
    } else if (guidanceWords.some(word => lowerText.includes(word))) {
      return 'guidance';
    } else if (meditationWords.some(word => lowerText.includes(word))) {
      return 'meditation';
    } else if (protectionWords.some(word => lowerText.includes(word))) {
      return 'protection';
    }

    return 'general';
  }

  static detectEnergeticState(audioFeatures: { volume: number; pitch: number; tempo: number }): {
    clarity: number;
    calmness: number;
    intention: number;
  } {
    // Analyze energetic state from voice characteristics
    const { volume, pitch, tempo } = audioFeatures;

    // Higher clarity with moderate volume and stable pitch
    const clarity = Math.max(0, 1 - Math.abs(volume - 0.5) - Math.abs(pitch - 0.5) * 0.5);

    // Higher calmness with lower tempo and stable pitch
    const calmness = Math.max(0, 1 - tempo * 0.5 - Math.abs(pitch - 0.4) * 0.3);

    // Higher intention with consistent volume and focused tempo
    const intention = Math.max(0, 1 - Math.abs(volume - 0.6) * 0.5 - Math.abs(tempo - 0.5) * 0.3);

    return { clarity, calmness, intention };
  }
}

// Export default instance
export const whisperLiveVERS = new WhisperLiveVERS();