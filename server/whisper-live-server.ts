// WhisperLiveKit Server Integration for VERS Assistant
// Real-time speech-to-text with spiritual context enhancement

import express, { type Request, type Response } from 'express';
import multer from 'multer';
import WebSocket from 'ws';
import { Server } from 'http';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'] ?? ''
});

// Multer configuration for audio uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB limit for audio files
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['audio/wav', 'audio/mpeg', 'audio/mp4', 'audio/webm', 'audio/ogg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid audio format'));
    }
  }
});

export interface WhisperLiveOptions {
  model: string;
  language: string;
  enableVAD: boolean;
  enableDiarization: boolean;
  spiritualEnhancement: boolean;
}

export class SpiritualWhisperEnhancer {
  private spiritualTerms = [
    'chakra', 'chakras', 'lightbody', 'merkaba', 'ascension', 'consciousness',
    'frequency', 'frequencies', 'vibration', 'vibrational', 'energy', 'energetic',
    'dimensional', 'dimensions', 'stargate', 'stargates', 'guardian', 'guardians',
    'protection', 'shield', 'shielding', 'sacred', 'divine', 'spiritual',
    'meditation', 'meditate', 'grounding', 'centering', 'breath', 'breathing',
    'kundalini', 'prana', 'chi', 'qi', 'aura', 'etheric', 'astral',
    'crystalline', 'crystal', 'crystals', 'healing', 'activation', 'upgrade',
    'dna', 'template', 'blueprint', 'matrix', 'grid', 'ley lines',
    'angelic', 'angels', 'archangel', 'galactic', 'cosmic', 'universal',
    'timeline', 'timelines', 'density', 'densities', 'dimension', 'portal'
  ];

  private energeticStates = {
    meditation: ['calm', 'peaceful', 'centered', 'grounded', 'present'],
    protection: ['strong', 'shielded', 'protected', 'safe', 'clear'],
    activation: ['activated', 'awakened', 'aligned', 'opened', 'expanded'],
    healing: ['healing', 'restored', 'balanced', 'harmonized', 'integrated']
  };

  enhanceTranscription(text: string, confidence: number): {
    enhancedText: string;
    spiritualScore: number;
    energeticState: string;
    adjustedConfidence: number;
  } {
    let enhancedText = text;
    let spiritualScore = 0;
    let energeticState = 'neutral';
    let adjustedConfidence = confidence;

    // Convert common mispronunciations of spiritual terms
    const corrections = {
      'chakra': ['chackra', 'shakra', 'shockra'],
      'merkaba': ['merkabah', 'merkahba', 'merkava'],
      'kundalini': ['kundalinie', 'kundaliny', 'kundaleeny'],
      'ethereal': ['etherial', 'atheral'],
      'ascension': ['asension', 'acension'],
      'crystalline': ['crystaline', 'cristalline'],
      'galactic': ['galatic', 'galactik'],
      'frequency': ['frequence', 'frequencie'],
      'dimensional': ['dimentional', 'dimansional']
    };

    // Apply corrections
    for (const [correct, variations] of Object.entries(corrections)) {
      for (const variation of variations) {
        const regex = new RegExp(`\\b${variation}\\b`, 'gi');
        if (regex.test(enhancedText)) {
          enhancedText = enhancedText.replace(regex, correct);
          spiritualScore += 0.1;
        }
      }
    }

    // Calculate spiritual term frequency
    const words = enhancedText.toLowerCase().split(/\s+/);
    const spiritualTermCount = words.filter(word => 
      this.spiritualTerms.some(term => word.includes(term))
    ).length;
    
    spiritualScore += spiritualTermCount / words.length;

    // Detect energetic state
    for (const [state, keywords] of Object.entries(this.energeticStates)) {
      if (keywords.some(keyword => enhancedText.toLowerCase().includes(keyword))) {
        energeticState = state;
        break;
      }
    }

    // Adjust confidence based on spiritual content
    if (spiritualScore > 0.2) {
      adjustedConfidence = Math.min(1.0, confidence * 1.15); // Boost confidence for spiritual content
    }

    return {
      enhancedText,
      spiritualScore: Math.min(1.0, spiritualScore),
      energeticState,
      adjustedConfidence
    };
  }
}

export function setupWhisperLiveRoutes(app: express.Application, server: Server) {
  const spiritualEnhancer = new SpiritualWhisperEnhancer();

  // Audio transcription endpoint
  app.post('/api/transcribe-audio', upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!process.env['OPENAI_API_KEY']) {
        return res.status(503).json({ error: 'OpenAI API key not configured' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No audio file provided' });
      }

      console.log('🔮 [WhisperLive] Processing audio transcription');

      // Create temporary file for OpenAI Whisper
      const tempPath = path.join('/tmp', `audio_${Date.now()}.wav`);
      fs.writeFileSync(tempPath, req.file.buffer);

      try {
        // Transcribe with OpenAI Whisper
        const transcription = await openai.audio.transcriptions.create({
          file: fs.createReadStream(tempPath),
          model: 'whisper-1',
          language: req.body.language === 'auto' ? undefined : req.body.language,
          response_format: 'verbose_json',
          timestamp_granularities: ['word']
        });

        // Enhance with spiritual context
        const enhancement = spiritualEnhancer.enhanceTranscription(
          transcription.text,
          1.0 // OpenAI doesn't provide confidence scores
        );

        // Clean up temp file
        fs.unlinkSync(tempPath);

        const response = {
          text: enhancement.enhancedText,
          originalText: transcription.text,
          language: transcription.language,
          confidence: enhancement.adjustedConfidence,
          spiritualScore: enhancement.spiritualScore,
          energeticState: enhancement.energeticState,
          duration: transcription.duration,
          words: transcription.words,
          enhanced: true
        };

        console.log('✨ [WhisperLive] Transcription enhanced:', {
          spiritualScore: enhancement.spiritualScore,
          energeticState: enhancement.energeticState
        });

        return res.json(response);
      } catch (error) {
        // Clean up temp file on error
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
        throw error;
      }
    } catch (error) {
      console.error('Error in audio transcription:', error);
      return res.status(500).json({ error: 'Transcription failed' });
    }
  });

  // WebSocket server for real-time transcription
  const wss = new WebSocket.Server({ 
    server: server, 
    path: '/api/whisper-live-ws'
  });

  console.log('🔮 [WhisperLive] WebSocket server initialized on /api/whisper-live-ws');

  wss.on('connection', (ws: WebSocket) => {
    console.log('🔮 [WhisperLive] Client connected to real-time transcription');
    
    let audioBuffer: Buffer[] = [];
    let lastProcessTime = Date.now();
    const processInterval = 2000; // Process every 2 seconds

    ws.on('message', async (data: Buffer) => {
      try {
        // Accumulate audio data
        audioBuffer.push(data);

        // Process accumulated audio at intervals
        if (Date.now() - lastProcessTime >= processInterval && audioBuffer.length > 0) {
          await processAudioBuffer();
        }
      } catch (error) {
        console.error('Error processing WebSocket audio:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Audio processing failed'
        }));
      }
    });

    const processAudioBuffer = async () => {
      if (audioBuffer.length === 0) return;

      try {
        // Combine audio buffers
        const combinedBuffer = Buffer.concat(audioBuffer);
        audioBuffer = []; // Clear buffer
        lastProcessTime = Date.now();

        // Create temporary file
        const tempPath = path.join('/tmp', `realtime_${Date.now()}.webm`);
        fs.writeFileSync(tempPath, combinedBuffer);

        try {
          // Transcribe with OpenAI Whisper
          const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(tempPath),
            model: 'whisper-1',
            response_format: 'json'
          });

          if (transcription.text.trim()) {
            // Enhance with spiritual context
            const enhancement = spiritualEnhancer.enhanceTranscription(
              transcription.text,
              0.8 // Lower confidence for real-time chunks
            );

            // Send enhanced result
            ws.send(JSON.stringify({
              type: 'transcription',
              text: enhancement.enhancedText,
              originalText: transcription.text,
              confidence: enhancement.adjustedConfidence,
              spiritualScore: enhancement.spiritualScore,
              energeticState: enhancement.energeticState,
              timestamp: Date.now(),
              isFinal: true,
              enhanced: true
            }));

            console.log('🔮 [WhisperLive] Real-time transcription:', enhancement.enhancedText);
          }

          // Clean up temp file
          fs.unlinkSync(tempPath);
        } catch (error) {
          if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
          }
          throw error;
        }
      } catch (error) {
        console.error('Error in real-time transcription:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Real-time transcription failed'
        }));
      }
    };

    ws.on('close', () => {
      console.log('🔮 [WhisperLive] Client disconnected from real-time transcription');
    });

    ws.on('error', (error) => {
      console.error('🔮 [WhisperLive] WebSocket error:', error);
    });

    // Send connection confirmation
    ws.send(JSON.stringify({
      type: 'connected',
      message: 'WhisperLive real-time transcription ready',
      features: {
        spiritualEnhancement: true,
        energeticStateDetection: true,
        termCorrection: true
      }
    }));
  });

  // Health check endpoint
  app.get('/api/whisper-live/health', (_req, res) => {
    return res.json({
      status: 'operational',
      features: {
        audioTranscription: true,
        realTimeWebSocket: true,
        spiritualEnhancement: true,
        energeticStateDetection: true
      },
      connections: wss.clients.size
    });
  });

  // Configuration endpoint
  app.get('/api/whisper-live/config', (_req, res) => {
    return res.json({
      supportedFormats: ['audio/wav', 'audio/mpeg', 'audio/mp4', 'audio/webm', 'audio/ogg'],
      maxFileSize: '25MB',
      realTimeInterval: '2000ms',
      spiritualTerms: 50, // Number of recognized spiritual terms
      energeticStates: ['meditation', 'protection', 'activation', 'healing', 'neutral']
    });
  });
}

export default { setupWhisperLiveRoutes, SpiritualWhisperEnhancer };
