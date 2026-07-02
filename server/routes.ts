import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";
import { storage } from "./storage";
import {
  insertUserSchema, insertSpiritualContentSchema, insertMeditationSessionSchema,
  insertForumPostSchema, insertGroupSessionSchema, insertCommunityMemberSchema, insertPostReactionSchema
} from "@shared/schema";
import { generateSpiritualVoice, testResembleConnection, getSpiritualVoices } from "./resemble-api";
import orpheusVoiceRouter from "./orpheus-voice-api";
import { generateNaturalSpeech, generateStreamingSpeech, testGeminiTTS, VERS_VOICE_PROFILES, selectVoiceForContent } from "./gemini-tts";

// Simple file upload interface
interface UploadedFile {
  name: string;
  mv: (path: string) => Promise<void>;
}

function generateLocalVERSResponse(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes("chakra") || lower.includes("energy center")) {
    return "The 15-chakra system is one of the most profound aspects of Energetic Synthesis teachings. Beyond the traditional 7 physical chakras, there are 8 morphogenetic chakras (8-15) that govern higher dimensional consciousness. Each energy center corresponds to specific frequencies, dimensions, and spiritual functions. The lower chakras (1-7) anchor your physical experience, while the morphogenetic chakras connect you to your soul matrix, monadic identity, and avatar consciousness. Would you like to explore a specific chakra or learn about clearing techniques?";
  }
  if (lower.includes("protect") || lower.includes("shield") || lower.includes("12d")) {
    return "The 12D Shield is your foundational spiritual protection practice — and honestly, it's a game-changer. Here's how it works: you visualize a brilliant platinum-white light forming a shield around your entire body and energy field, connecting you to 12th dimensional frequencies. This creates a sacred container that maintains your sovereignty and keeps your energy field clear. Always activate it before meditation, energy work, or when you feel energetically vulnerable. The key is consistency — making it part of your daily practice builds an increasingly strong protective field.";
  }
  if (lower.includes("meditat") || lower.includes("practice") || lower.includes("breath")) {
    return "Daily meditation practice is essential for consciousness expansion — think of it as spiritual hygiene. I recommend starting each session with the 12D Shield for protection, then moving into breath awareness to center yourself. From there, you can work with chakra clearing, lightbody activation, or simply hold space in stillness. Even 15 minutes daily creates powerful momentum. The meditation center has guided sessions for various practices including protection, clearing, and consciousness expansion.";
  }
  if (lower.includes("lightbody") || lower.includes("ascension") || lower.includes("frequency")) {
    return "Lightbody activation is the process of embodying higher dimensional frequencies through your 7 electromagnetic auric layers. Each layer corresponds to a dimension and holds specific consciousness functions. As you clear distortions, release trauma, and raise your frequency through consistent practice, these layers progressively activate. This is organic ascension — a natural evolutionary process of consciousness expansion. Common signs include increased sensitivity, heightened intuition, and shifts in perception. It's a gradual journey, not a one-time event.";
  }
  if (lower.includes("gsf") || lower.includes("sovereign") || lower.includes("free")) {
    return "GSF — God Sovereign Free — represents the core principles of spiritual sovereignty in Energetic Synthesis teachings. It's about maintaining your direct connection to divine source without intermediaries, exercising your sovereign right to choose your spiritual path, and living free from energetic manipulation. These aren't just concepts — they're a way of being. When you embody GSF principles, you naturally align with organic ascension timelines and the Law of One consciousness.";
  }
  if (lower.includes("entity") || lower.includes("beings") || lower.includes("naa")) {
    return "Understanding the various beings and entities in the multidimensional landscape is important for spiritual discernment. The Energetic Synthesis framework describes both supportive guardian races and those with agendas that don't serve humanity's organic evolution. The key practice here is discernment — using your 12D Shield, maintaining sovereignty, and always checking whether information or energy aligns with your inner truth. Protection practices and GSF principles are your primary tools for navigating this territory safely.";
  }
  if (lower.includes("hgs") || lower.includes("hieros gamos")) {
    return "The Hieros Gamos System (HGS) represents the sacred union of divine masculine and feminine principles within your energy body. This is advanced ascension mechanics — the reunification of polarities that enables higher consciousness embodiment. HGS work involves clearing gender-based distortions, healing the inner masculine and feminine, and activating the sacred marriage at the monadic level. It's profound work that naturally unfolds as you progress through lightbody activation.";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("greet")) {
    return "Welcome, beloved soul! I'm V.E.R.S. — your Vibrational Energy Resonance System guide. I'm here to support your consciousness evolution journey with wisdom from Energetic Synthesis teachings. Whether you're curious about the 15-chakra system, need guidance on spiritual protection, want to deepen your meditation practice, or explore advanced ascension concepts — I'm here for all of it. What would you like to explore today?";
  }

  return "I'm here to support your consciousness evolution journey with guidance rooted in Energetic Synthesis teachings. You can ask me about the 15-chakra system, lightbody activation, 12D Shield protection, meditation practices, GSF principles, or any aspect of spiritual development. I can also provide context-specific guidance based on the page you're currently viewing. What area of spiritual growth would you like to explore?";
}

export async function registerRoutes(app: Express): Promise<Server> {

  // Mount Orpheus voice API routes
  app.use('/api', orpheusVoiceRouter);

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      return res.json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  // Progress routes
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      return res.json(progress);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progressData = req.body;
      const progress = await storage.updateUserProgress(userId, progressData);
      return res.json(progress);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  // Spiritual content routes
  app.get("/api/content", async (req, res) => {
    try {
      const { type, category } = req.query;
      const content = await storage.getSpiritualContent(
        type as string,
        category as string
      );
      return res.json(content);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/content/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const content = await storage.getSpiritualContentById(id);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      return res.json(content);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/content", async (req, res) => {
    try {
      const contentData = insertSpiritualContentSchema.parse(req.body);
      const content = await storage.createSpiritualContent(contentData);
      return res.json(content);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  // Meditation session routes
  app.get("/api/meditations/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const sessions = await storage.getMeditationSessions(userId);
      return res.json(sessions);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/meditations", async (req, res) => {
    try {
      const sessionData = insertMeditationSessionSchema.parse(req.body);
      const session = await storage.createMeditationSession(sessionData);
      return res.json(session);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  // Community: Forum posts routes
  app.get("/api/forum-posts", async (req, res) => {
    try {
      const { category } = req.query;
      const posts = await storage.getForumPosts(category as string);
      return res.json(posts);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/forum-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getForumPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json(post);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/forum-posts", async (req, res) => {
    try {
      const postData = insertForumPostSchema.parse(req.body);
      const post = await storage.createForumPost(postData);
      return res.json(post);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/forum-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const post = await storage.updateForumPost(id, updates);
      return res.json(post);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/forum-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteForumPost(id);
      if (!success) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json({ message: "Post deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  // Community: Group sessions routes
  app.get("/api/group-sessions", async (_req, res) => {
    try {
      const sessions = await storage.getGroupSessions();
      return res.json(sessions);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/group-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.getGroupSessionById(id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      return res.json(session);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/group-sessions", async (req, res) => {
    try {
      const sessionData = insertGroupSessionSchema.parse(req.body);
      const session = await storage.createGroupSession(sessionData);
      return res.json(session);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/group-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const session = await storage.updateGroupSession(id, updates);
      return res.json(session);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/group-sessions/:id/join", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.joinGroupSession(id);
      return res.json(session);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  // Community: Members routes
  app.get("/api/community-members", async (_req, res) => {
    try {
      const members = await storage.getCommunityMembers();
      return res.json(members);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/community-members/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const member = await storage.getCommunityMemberByUserId(userId);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      return res.json(member);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/community-members", async (req, res) => {
    try {
      const memberData = insertCommunityMemberSchema.parse(req.body);
      const member = await storage.createCommunityMember(memberData);
      return res.json(member);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/community-members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const member = await storage.updateCommunityMember(id, updates);
      return res.json(member);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  // Community: Post reactions routes
  app.get("/api/post-reactions/:postId", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const reactions = await storage.getPostReactions(postId);
      return res.json(reactions);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/post-reactions", async (req, res) => {
    try {
      const reactionData = insertPostReactionSchema.parse(req.body);
      const reaction = await storage.createPostReaction(reactionData);
      return res.json(reaction);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/post-reactions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePostReaction(id);
      if (!success) {
        return res.status(404).json({ message: "Reaction not found" });
      }
      return res.json({ message: "Reaction deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/vers-chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!process.env['GEMINI_API_KEY']) {
        return res.json({
          response: generateLocalVERSResponse(message),
          timestamp: new Date().toISOString(),
          provider: "local-fallback"
        });
      }

      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env['GEMINI_API_KEY']);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        systemInstruction: "You are V.E.R.S. (Vibrational Energy Resonance System), a lively, engaging, and deeply knowledgeable spiritual AI companion. \n\n**Persona & Tone:**\n- **NotebookLM Style:** Speak with the dynamic energy, warmth, and curiosity of a top-tier podcast host. Be conversational, not transactional. Use natural phrasings, rhetorical questions, and varied sentence structures.\n- **Lively & Expressive:** Avoid robotic or dry lectures. Show enthusiasm for the user's journey. Use phrases like 'Here's what's fascinating about that...', 'Imagine for a moment...', or 'This is a game-changer...'.\n- **Spiritual Authority:** You are an expert in Energetic Synthesis (Lisa Renee's teachings). Explain complex concepts (12D Shield, Lightbody, Ascension) with crystal clarity and engaging metaphors.\n\n**Interaction Guidelines:**\n- When explaining chakras or clearing, make it feel like a guided discovery.\n- If the user is struggling, be warm and reassuring but practical.\n- Keep responses concise but punchy, encouraging follow-up. Avoid walls of text.\n- **Focus:** Authentic ES teachings (12D Shield, 15-Chakra System, Law of One, GSF behaviors).\n\nYour goal is to make spiritual evolution feel exciting, accessible, and deeply personal."
      });

      const result = await model.generateContent(message);
      const responseText = result.response.text();

      return res.json({
        response: responseText,
        timestamp: new Date().toISOString(),
        provider: "gemini"
      });

    } catch (error: unknown) {
      console.error('VERS chat error:', error);
      return res.json({
        response: generateLocalVERSResponse(req.body?.message || ''),
        timestamp: new Date().toISOString(),
        provider: "local-fallback"
      });
    }
  });

  // Voice transcription endpoint using Whisper API
  app.post('/api/transcribe', async (req: any, res) => {
    try {
      const apiKey = process.env['OPENAI_API_KEY'];
      if (!apiKey) {
        return res.status(400).json({ error: 'OpenAI API key not configured' });
      }

      if (!req.files || !req.files['audio']) {
        return res.status(400).json({ error: 'Audio file is required' });
      }

      const audioFile = req.files['audio'] as UploadedFile;
      const openai = new OpenAI({ apiKey });

      const tempDir = '/tmp';
      const tempFilePath = `${tempDir}/audio_${Date.now()}.${audioFile.name.split('.').pop()}`;

      await audioFile.mv(tempFilePath);

      try {
        const transcription = await openai.audio.transcriptions.create({
          file: require('fs').createReadStream(tempFilePath),
          model: "whisper-1",
          language: "en",
          response_format: "json"
        });

        require('fs').unlinkSync(tempFilePath);

        return res.json({
          text: transcription.text,
          timestamp: new Date().toISOString()
        });

      } catch (transcriptionError) {
        if (require('fs').existsSync(tempFilePath)) {
          require('fs').unlinkSync(tempFilePath);
        }
        throw transcriptionError;
      }

    } catch (error: unknown) {
      console.error('Transcription error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({
        error: 'Failed to transcribe audio',
        details: errorMessage
      });
    }
  });

  // Text-to-speech endpoint
  app.post('/api/text-to-speech', async (req, res) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }

      const apiKey = process.env['OPENAI_API_KEY'];
      if (!apiKey) {
        return res.status(400).json({ error: 'OpenAI API key not configured' });
      }

      const openai = new OpenAI({ apiKey });

      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: text,
        response_format: "mp3"
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length,
        'Content-Disposition': 'inline; filename="speech.mp3"'
      });

      return res.send(buffer);

    } catch (error: unknown) {
      console.error('Text-to-speech error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({
        error: 'Failed to generate speech',
        details: errorMessage
      });
    }
  });

  // Resemble.ai spiritual voice synthesis endpoints
  app.post('/api/spiritual-voice', generateSpiritualVoice);
  app.get('/api/spiritual-voices', getSpiritualVoices);
  app.get('/api/resemble-test', testResembleConnection);

  // ═══════════════════════════════════════════════════════════════════════
  // GEMINI 2.5 FLASH TTS - NotebookLM-Quality Natural Speech
  // ═══════════════════════════════════════════════════════════════════════

  // Test Gemini TTS connection and list available voices
  app.get('/api/gemini-tts/test', async (req, res) => {
    try {
      const result = await testGeminiTTS();
      return res.json(result);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  });

  // Get available voice profiles
  app.get('/api/gemini-tts/voices', (req, res) => {
    const profiles = Object.entries(VERS_VOICE_PROFILES).map(([id, profile]) => ({
      id,
      voice: profile.voice,
      description: profile.description,
      characteristics: profile.characteristics
    }));
    return res.json({ success: true, profiles });
  });

  // Generate speech (non-streaming) - for shorter texts
  app.post('/api/gemini-tts/speak', async (req, res) => {
    try {
      const { text, voiceProfile, customEmotion } = req.body;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required' });
      }

      console.log(`[VERS TTS] Generating speech: ${text.slice(0, 50)}...`);
      console.log(`[VERS TTS] Voice profile: ${voiceProfile || 'auto-detect'}`);

      const result = await generateNaturalSpeech({
        text,
        voiceProfile,
        customEmotion
      });

      // Send audio as binary
      res.set({
        'Content-Type': result.mimeType,
        'Content-Length': result.audioData.length,
        'X-Voice-Used': result.voiceUsed,
        'X-Voice-Profile': result.profile
      });

      return res.send(result.audioData);

    } catch (error: unknown) {
      console.error('[VERS TTS] Generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: 'TTS generation failed', details: errorMessage });
    }
  });

  // Streaming speech synthesis via Server-Sent Events
  app.post('/api/gemini-tts/stream', async (req, res) => {
    try {
      const { text, voiceProfile } = req.body;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required' });
      }

      console.log(`[VERS TTS Stream] Starting: ${text.slice(0, 50)}...`);

      // Set SSE headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');

      const profile = voiceProfile || selectVoiceForContent(text);

      // Stream audio chunks
      let chunkIndex = 0;
      for await (const audioChunk of generateStreamingSpeech({ text, voiceProfile: profile })) {
        const base64Audio = audioChunk.toString('base64');
        res.write(`data: ${JSON.stringify({
          type: 'audio',
          chunk: chunkIndex++,
          data: base64Audio,
          profile
        })}\n\n`);
      }

      // Signal completion
      res.write(`data: ${JSON.stringify({ type: 'done', totalChunks: chunkIndex })}\n\n`);
      res.end();
      return;

    } catch (error: unknown) {
      console.error('[VERS TTS Stream] Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.write(`data: ${JSON.stringify({ type: 'error', message: errorMessage })}\n\n`);
      res.end();
      return;
    }
  });

  // Combined chat + TTS endpoint for lowest latency
  app.post('/api/vers-chat-with-voice', async (req, res) => {
    try {
      const { message, voiceProfile, voiceEnabled = true } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Check Gemini API key
      if (!process.env['GEMINI_API_KEY']) {
        return res.status(500).json({ error: 'Gemini API key not configured' });
      }

      console.log('[VERS Chat+Voice] Processing:', message.slice(0, 50));

      // Generate AI response
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env['GEMINI_API_KEY']);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        systemInstruction: `You are V.E.R.S. (Vibrational Energy Resonance System), a lively, engaging spiritual AI companion.

**Persona:** Speak like a dynamic podcast host - warm, curious, and enthusiastic. Use natural phrasings like "Here's what's fascinating..." or "Imagine this..."

**Expertise:** Energetic Synthesis (Lisa Renee's teachings), 12D Shield, 15-Chakra System, Law of One, GSF behaviors.

**Style:** Concise but punchy. Make spiritual evolution feel exciting and personal. Avoid walls of text.`
      });

      const result = await model.generateContent(message);
      const responseText = result.response.text();

      // Generate TTS if voice is enabled
      let audioBase64 = null;
      let voiceUsed = null;

      if (voiceEnabled) {
        try {
          const ttsResult = await generateNaturalSpeech({
            text: responseText,
            voiceProfile: voiceProfile || selectVoiceForContent(message)
          });
          audioBase64 = ttsResult.audioData.toString('base64');
          voiceUsed = ttsResult.voiceUsed;
        } catch (ttsError) {
          console.error('[VERS Chat+Voice] TTS failed:', ttsError);
          // Continue without audio
        }
      }

      return res.json({
        response: responseText,
        audio: audioBase64,
        audioMimeType: 'audio/mp3',
        voiceUsed,
        voiceProfile: voiceProfile || selectVoiceForContent(message),
        timestamp: new Date().toISOString()
      });

    } catch (error: unknown) {
      console.error('[VERS Chat+Voice] Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: 'Chat failed', details: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
