// ElevenLabs TTS/STT integration with automatic browser fallback
// Uses server proxy endpoints (/api/elevenlabs/*) when ELEVENLABS_API_KEY is configured,
// otherwise falls back to browser Web Speech API and SpeechRecognition.

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category?: string;
  description?: string;
  labels?: Record<string, string>;
}

export class ElevenLabsClient {
  private cachedVoices: ElevenLabsVoice[] = [];
  private voicesLoaded = false;

  async isAvailable(): Promise<boolean> {
    try {
      const res = await fetch("/api/elevenlabs/voices");
      const data = await res.json();
      return data.provider === "elevenlabs";
    } catch {
      return false;
    }
  }

  async getVoices(): Promise<ElevenLabsVoice[]> {
    if (this.voicesLoaded) return this.cachedVoices;
    try {
      const res = await fetch("/api/elevenlabs/voices");
      const data = await res.json();
      this.cachedVoices = data.voices || [];
      this.voicesLoaded = true;
    } catch {
      this.cachedVoices = [];
    }
    return this.cachedVoices;
  }

  /**
   * Synthesize speech via ElevenLabs API proxy.
   * Returns HTMLAudioElement that can be controlled (play/pause/stop).
   * Falls back to Audio with the stream URL if successful.
   */
  async synthesize(
    text: string,
    voiceId?: string,
    options?: { stability?: number; similarityBoost?: number }
  ): Promise<HTMLAudioElement | null> {
    try {
      const res = await fetch("/api/elevenlabs/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voiceId: voiceId || "21m00Tcm4TlvDq8ikWAM", // Rachel
          ...options,
        }),
      });

      if (!res.ok) return null;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => URL.revokeObjectURL(url);
      return audio;
    } catch {
      return null;
    }
  }

  /**
   * Transcribe audio via ElevenLabs STT API proxy.
   * Sends audio blob and returns transcribed text.
   */
  async transcribe(audioBlob: Blob): Promise<string> {
    try {
      const res = await fetch("/api/elevenlabs/stt", {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: audioBlob,
      });

      if (!res.ok) return "";

      const data = await res.json();
      return data.text || "";
    } catch {
      return "";
    }
  }
}

export const elevenLabs = new ElevenLabsClient();
