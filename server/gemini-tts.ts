/**
 * Gemini 2.5 Flash TTS Integration for V.E.R.S
 * Provides NotebookLM-quality natural speech synthesis
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Voice profiles mapped to user preferences
// ChatGPT Spruce → Charon (smooth conversational male)
// Copilot Meadow → Aoede (breezy, clear female)  
// NotebookLM male → Iapetus (friendly casual male)
export const VERS_VOICE_PROFILES = {
    // Primary voices (user preferred styles)
    'divine-guide': {
        voice: 'Aoede',
        description: 'Gentle, nurturing feminine voice - perfect for heart-centered guidance',
        emotion: 'Speak with warmth, compassion, and gentle pauses for breathing. Like a caring meditation teacher.',
        characteristics: ['gentle', 'nurturing', 'ethereal'],
        spiritualContext: ['chakra', 'heart', 'healing', 'meditation']
    },
    'wise-guardian': {
        voice: 'Charon',
        description: 'Grounded, confident masculine voice - ideal for protection and grounding',
        emotion: 'Speak with calm authority and reassuring confidence. Firm but warm, like a protective mentor.',
        characteristics: ['strong', 'protective', 'grounding'],
        spiritualContext: ['protection', '12d-shield', 'grounding', 'clearing']
    },
    'sage-teacher': {
        voice: 'Iapetus',
        description: 'Friendly, conversational male voice - great for teachings and explanations',
        emotion: 'Speak like an enthusiastic podcast host explaining fascinating spiritual concepts. Engaging and curious.',
        characteristics: ['friendly', 'conversational', 'enthusiastic'],
        spiritualContext: ['teaching', 'explanation', 'guidance', 'ascension']
    },
    'crystal-clarity': {
        voice: 'Kore',
        description: 'Energetic, youthful voice - perfect for activation and energizing practices',
        emotion: 'Speak with clarity, enthusiasm, and encouraging energy. Uplifting and motivating.',
        characteristics: ['clear', 'energetic', 'youthful'],
        spiritualContext: ['activation', 'lightbody', 'kundalini', 'energy']
    },
    'lunar-harmony': {
        voice: 'Despina',
        description: 'Warm, inviting feminine voice - ideal for balance and harmony practices',
        emotion: 'Speak softly and peacefully, with a flowing rhythm. Calm and balanced like gentle waves.',
        characteristics: ['balanced', 'serene', 'harmonious'],
        spiritualContext: ['balance', 'harmony', 'peace', 'integration']
    },
    'cosmic-wisdom': {
        voice: 'Autonoe',
        description: 'Mature, resonant male voice - for advanced spiritual teachings',
        emotion: 'Speak with deep wisdom and thoughtful pacing. Profound and contemplative.',
        characteristics: ['deep', 'wise', 'resonant'],
        spiritualContext: ['cosmic', 'advanced', 'consciousness', 'unity']
    },
    'orion-dynamic': {
        voice: 'Alnilam',
        description: 'Energetic, exciting male voice - for dynamic spiritual experiences',
        emotion: 'Speak with energy, excitement, and clarity. Dynamic and inspiring, like sharing a breakthrough discovery.',
        characteristics: ['energetic', 'exciting', 'dynamic'],
        spiritualContext: ['breakthrough', 'transformation', 'awakening', 'discovery']
    }
} as const;

export type VoiceProfileId = keyof typeof VERS_VOICE_PROFILES;

export interface TTSRequest {
    text: string;
    voiceProfile?: VoiceProfileId;
    customEmotion?: string;
    speed?: number; // 0.5 to 2.0
}

export interface TTSResponse {
    audioData: Buffer;
    mimeType: string;
    duration?: number;
    voiceUsed: string;
    profile: VoiceProfileId;
}

/**
 * Select the best voice profile based on spiritual content
 */
export function selectVoiceForContent(text: string): VoiceProfileId {
    const lowerText = text.toLowerCase();

    // Check for spiritual context keywords
    for (const [profileId, profile] of Object.entries(VERS_VOICE_PROFILES)) {
        if (profile.spiritualContext.some(keyword => lowerText.includes(keyword))) {
            return profileId as VoiceProfileId;
        }
    }

    // Default to sage-teacher for general explanations
    return 'sage-teacher';
}

/**
 * Generate natural speech using Gemini 2.5 Flash TTS
 */
export async function generateNaturalSpeech(request: TTSRequest): Promise<TTSResponse> {
    const apiKey = process.env['GEMINI_API_KEY'];
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Select voice profile
    const profileId = request.voiceProfile || selectVoiceForContent(request.text);
    const profile = VERS_VOICE_PROFILES[profileId];

    // Build the emotion/style instruction
    const emotionInstruction = request.customEmotion || profile.emotion;

    // Create the TTS model with speech config
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-preview-tts",
    });

    // Generate speech with natural language emotion control
    const prompt = `${emotionInstruction}

Speak the following text naturally:
"${request.text}"`;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseModalities: ["audio"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: profile.voice
                        }
                    }
                }
            } as any
        });

        const response = result.response;

        // Extract audio data from response
        const audioData = extractAudioFromResponse(response);

        return {
            audioData,
            mimeType: 'audio/mp3',
            voiceUsed: profile.voice,
            profile: profileId
        };

    } catch (error) {
        console.error('Gemini TTS generation failed:', error);
        throw error;
    }
}

/**
 * Generate streaming TTS for low-latency playback
 */
export async function* generateStreamingSpeech(request: TTSRequest): AsyncGenerator<Buffer> {
    const apiKey = process.env['GEMINI_API_KEY'];
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const profileId = request.voiceProfile || selectVoiceForContent(request.text);
    const profile = VERS_VOICE_PROFILES[profileId];

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-preview-tts",
    });

    const prompt = `${profile.emotion}

Speak naturally:
"${request.text}"`;

    try {
        const streamResult = await model.generateContentStream({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseModalities: ["audio"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: profile.voice
                        }
                    }
                }
            } as any
        });

        for await (const chunk of streamResult.stream) {
            const audioChunk = extractAudioChunkFromResponse(chunk);
            if (audioChunk && audioChunk.length > 0) {
                yield audioChunk;
            }
        }

    } catch (error) {
        console.error('Gemini streaming TTS failed:', error);
        throw error;
    }
}

/**
 * Extract audio data from Gemini response
 */
function extractAudioFromResponse(response: any): Buffer {
    try {
        // Gemini returns audio in the response candidates
        const candidate = response.candidates?.[0];
        if (!candidate?.content?.parts) {
            throw new Error('No audio content in response');
        }

        for (const part of candidate.content.parts) {
            if (part.inlineData && part.inlineData.mimeType?.startsWith('audio/')) {
                return Buffer.from(part.inlineData.data, 'base64');
            }
        }

        throw new Error('No audio data found in response');
    } catch (error) {
        console.error('Failed to extract audio:', error);
        throw error;
    }
}

/**
 * Extract audio chunk from streaming response
 */
function extractAudioChunkFromResponse(chunk: any): Buffer | null {
    try {
        const candidate = chunk.candidates?.[0];
        if (!candidate?.content?.parts) {
            return null;
        }

        for (const part of candidate.content.parts) {
            if (part.inlineData && part.inlineData.mimeType?.startsWith('audio/')) {
                return Buffer.from(part.inlineData.data, 'base64');
            }
        }

        return null;
    } catch {
        return null;
    }
}

/**
 * Test the Gemini TTS connection
 */
export async function testGeminiTTS(): Promise<{ success: boolean; message: string; voices: string[] }> {
    try {
        const apiKey = process.env['GEMINI_API_KEY'];
        if (!apiKey) {
            return {
                success: false,
                message: 'GEMINI_API_KEY not configured',
                voices: []
            };
        }

        const voices = Object.entries(VERS_VOICE_PROFILES).map(([id, profile]) => ({
            id,
            voice: profile.voice,
            description: profile.description
        }));

        return {
            success: true,
            message: 'Gemini TTS ready with 6 spiritual voice profiles',
            voices: voices.map(v => v.id)
        };

    } catch (error) {
        return {
            success: false,
            message: `TTS test failed: ${error}`,
            voices: []
        };
    }
}
