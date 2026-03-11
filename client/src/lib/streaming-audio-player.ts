/**
 * Streaming Audio Player for Real-Time TTS Playback
 * Enables low-latency audio streaming from Gemini 2.5 Flash TTS
 */

export interface StreamingAudioConfig {
    onChunkReceived?: (chunkIndex: number) => void;
    onPlaybackStart?: () => void;
    onPlaybackEnd?: () => void;
    onError?: (error: Error) => void;
    fadeInDuration?: number;
    fadeOutDuration?: number;
}

export class StreamingAudioPlayer {
    private audioContext: AudioContext | null = null;
    private audioQueue: AudioBuffer[] = [];
    private isPlaying = false;
    private currentSource: AudioBufferSourceNode | null = null;
    private gainNode: GainNode | null = null;
    private config: StreamingAudioConfig;

    constructor(config: StreamingAudioConfig = {}) {
        this.config = {
            fadeInDuration: 200,
            fadeOutDuration: 150,
            ...config
        };
    }

    /**
     * Initialize audio context (must be called after user interaction)
     */
    async initialize(): Promise<void> {
        if (this.audioContext) return;

        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.value = 0; // Start silent for fade-in
    }

    /**
     * Play audio from a base64 encoded string
     */
    async playBase64Audio(base64Data: string, mimeType: string = 'audio/mp3'): Promise<void> {
        await this.initialize();

        if (!this.audioContext || !this.gainNode) {
            throw new Error('Audio context not initialized');
        }

        try {
            // Decode base64 to ArrayBuffer
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Decode audio data
            const audioBuffer = await this.audioContext.decodeAudioData(bytes.buffer);

            // Play the audio
            await this.playBuffer(audioBuffer);

        } catch (error) {
            console.error('[StreamingAudioPlayer] Playback error:', error);
            this.config.onError?.(error instanceof Error ? error : new Error(String(error)));
            throw error;
        }
    }

    /**
     * Play an AudioBuffer with fade-in/fade-out
     */
    private async playBuffer(buffer: AudioBuffer): Promise<void> {
        if (!this.audioContext || !this.gainNode) return;

        // Stop any currently playing audio
        this.stop();

        this.isPlaying = true;
        this.config.onPlaybackStart?.();

        // Create source node
        this.currentSource = this.audioContext.createBufferSource();
        this.currentSource.buffer = buffer;
        this.currentSource.connect(this.gainNode);

        // Fade in
        const now = this.audioContext.currentTime;
        this.gainNode.gain.setValueAtTime(0, now);
        this.gainNode.gain.linearRampToValueAtTime(1, now + (this.config.fadeInDuration! / 1000));

        // Schedule fade out before end
        const fadeOutStart = now + buffer.duration - (this.config.fadeOutDuration! / 1000);
        if (fadeOutStart > now) {
            this.gainNode.gain.setValueAtTime(1, fadeOutStart);
            this.gainNode.gain.linearRampToValueAtTime(0, now + buffer.duration);
        }

        // Handle playback end
        this.currentSource.onended = () => {
            this.isPlaying = false;
            this.config.onPlaybackEnd?.();
        };

        // Start playback
        this.currentSource.start();
    }

    /**
     * Stream audio from Server-Sent Events endpoint
     */
    async streamFromSSE(url: string, body: object): Promise<void> {
        await this.initialize();

        if (!this.audioContext) {
            throw new Error('Audio context not initialized');
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`SSE request failed: ${response.status}`);
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('No response body');
            }

            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));

                            if (data.type === 'audio' && data.data) {
                                this.config.onChunkReceived?.(data.chunk);
                                await this.playBase64Audio(data.data);
                            } else if (data.type === 'done') {
                                console.log(`[StreamingAudioPlayer] Stream complete: ${data.totalChunks} chunks`);
                            } else if (data.type === 'error') {
                                throw new Error(data.message);
                            }
                        } catch {
                            // Skip invalid JSON lines
                        }
                    }
                }
            }

        } catch (error) {
            console.error('[StreamingAudioPlayer] SSE error:', error);
            this.config.onError?.(error instanceof Error ? error : new Error(String(error)));
            throw error;
        }
    }

    /**
     * Stop current playback
     */
    stop(): void {
        if (this.currentSource) {
            try {
                this.currentSource.stop();
            } catch {
                // Already stopped
            }
            this.currentSource = null;
        }
        this.isPlaying = false;
    }

    /**
     * Check if audio is currently playing
     */
    getIsPlaying(): boolean {
        return this.isPlaying;
    }

    /**
     * Set playback volume (0-1)
     */
    setVolume(volume: number): void {
        if (this.gainNode && this.audioContext) {
            const clampedVolume = Math.max(0, Math.min(1, volume));
            this.gainNode.gain.setValueAtTime(clampedVolume, this.audioContext.currentTime);
        }
    }

    /**
     * Clean up resources
     */
    dispose(): void {
        this.stop();
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
        }
        this.audioContext = null;
        this.gainNode = null;
    }
}

// Singleton instance for global use
let globalPlayer: StreamingAudioPlayer | null = null;

export function getGlobalAudioPlayer(): StreamingAudioPlayer {
    if (!globalPlayer) {
        globalPlayer = new StreamingAudioPlayer({
            onPlaybackStart: () => console.log('[VERS Audio] Playback started'),
            onPlaybackEnd: () => console.log('[VERS Audio] Playback ended'),
            onError: (error) => console.error('[VERS Audio] Error:', error)
        });
    }
    return globalPlayer;
}
