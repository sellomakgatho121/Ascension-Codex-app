/**
 * React Hook for Gemini 2.5 Flash TTS Integration
 * Provides easy-to-use TTS functionality with voice selection
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { StreamingAudioPlayer, getGlobalAudioPlayer } from './streaming-audio-player';

export interface VoiceProfile {
    id: string;
    voice: string;
    description: string;
    characteristics: string[];
}

export interface UseGeminiTTSOptions {
    defaultVoice?: string;
    onSpeakStart?: () => void;
    onSpeakEnd?: () => void;
    onError?: (error: Error) => void;
    useBrowserFallback?: boolean;
}

export interface UseGeminiTTSReturn {
    speak: (text: string, voiceProfile?: string) => Promise<void>;
    speakWithChat: (message: string, voiceProfile?: string) => Promise<{ response: string; audio: boolean }>;
    stop: () => void;
    isSpeaking: boolean;
    isLoading: boolean;
    error: Error | null;
    voiceProfiles: VoiceProfile[];
    selectedVoice: string;
    setSelectedVoice: (voice: string) => void;
    testVoice: (voiceId: string) => Promise<void>;
}

/**
 * Hook for using Gemini TTS with automatic fallback to browser speech
 */
export function useGeminiTTS(options: UseGeminiTTSOptions = {}): UseGeminiTTSReturn {
    const {
        defaultVoice = 'sage-teacher',
        onSpeakStart,
        onSpeakEnd,
        onError,
        useBrowserFallback = true
    } = options;

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>([]);
    const [selectedVoice, setSelectedVoice] = useState(defaultVoice);

    const playerRef = useRef<StreamingAudioPlayer | null>(null);

    // Initialize player and fetch voice profiles
    useEffect(() => {
        playerRef.current = getGlobalAudioPlayer();

        // Fetch available voices
        fetch('/api/gemini-tts/voices')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.profiles) {
                    setVoiceProfiles(data.profiles);
                }
            })
            .catch(console.error);

        return () => {
            playerRef.current?.stop();
        };
    }, []);

    /**
     * Browser TTS fallback
     */
    const speakWithBrowser = useCallback((text: string) => {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
            setIsSpeaking(true);
            onSpeakStart?.();
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            onSpeakEnd?.();
        };

        window.speechSynthesis.speak(utterance);
    }, [onSpeakStart, onSpeakEnd]);

    /**
     * Speak text using Gemini TTS
     */
    const speak = useCallback(async (text: string, voiceProfile?: string) => {
        if (!text.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/gemini-tts/speak', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    voiceProfile: voiceProfile || selectedVoice
                })
            });

            if (!response.ok) {
                throw new Error(`TTS request failed: ${response.status}`);
            }

            // Get audio as blob and convert to base64
            const audioBlob = await response.blob();
            const reader = new FileReader();

            await new Promise<void>((resolve, reject) => {
                reader.onload = async () => {
                    try {
                        const base64 = (reader.result as string).split(',')[1];

                        setIsSpeaking(true);
                        onSpeakStart?.();

                        // Configure player callbacks for this playback
                        const player = playerRef.current || getGlobalAudioPlayer();

                        await player.playBase64Audio(base64, 'audio/mp3');

                        setIsSpeaking(false);
                        onSpeakEnd?.();
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(audioBlob);
            });

        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            console.error('[useGeminiTTS] Error:', error);
            setError(error);
            onError?.(error);

            // Fallback to browser TTS
            if (useBrowserFallback) {
                console.log('[useGeminiTTS] Falling back to browser TTS');
                speakWithBrowser(text);
            }
        } finally {
            setIsLoading(false);
        }
    }, [selectedVoice, onSpeakStart, onSpeakEnd, onError, useBrowserFallback, speakWithBrowser]);

    /**
     * Combined chat + TTS for lowest latency
     */
    const speakWithChat = useCallback(async (
        message: string,
        voiceProfile?: string
    ): Promise<{ response: string; audio: boolean }> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/vers-chat-with-voice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    voiceProfile: voiceProfile || selectedVoice,
                    voiceEnabled: true
                })
            });

            if (!response.ok) {
                throw new Error(`Chat request failed: ${response.status}`);
            }

            const data = await response.json();

            // Play audio if available
            if (data.audio) {
                setIsSpeaking(true);
                onSpeakStart?.();

                const player = playerRef.current || getGlobalAudioPlayer();
                await player.playBase64Audio(data.audio, data.audioMimeType || 'audio/mp3');

                setIsSpeaking(false);
                onSpeakEnd?.();
            }

            return { response: data.response, audio: !!data.audio };

        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            console.error('[useGeminiTTS] Chat error:', error);
            setError(error);
            onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [selectedVoice, onSpeakStart, onSpeakEnd, onError]);

    /**
     * Stop current playback
     */
    const stop = useCallback(() => {
        playerRef.current?.stop();
        window.speechSynthesis?.cancel();
        setIsSpeaking(false);
    }, []);

    /**
     * Test a specific voice profile
     */
    const testVoice = useCallback(async (voiceId: string) => {
        const profile = voiceProfiles.find(p => p.id === voiceId);
        const testPhrase = profile?.description || 'This is a test of the spiritual voice synthesis.';
        await speak(testPhrase, voiceId);
    }, [voiceProfiles, speak]);

    return {
        speak,
        speakWithChat,
        stop,
        isSpeaking,
        isLoading,
        error,
        voiceProfiles,
        selectedVoice,
        setSelectedVoice,
        testVoice
    };
}

export default useGeminiTTS;
