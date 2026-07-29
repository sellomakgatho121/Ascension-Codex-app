import { Router, Request, Response } from "express";

const API_KEY = process.env.ELEVENLABS_API_KEY || "";
const BASE_URL = "https://api.elevenlabs.io/v1";

const router = Router();

function isAvailable(): boolean {
  if (!API_KEY) {
    console.log("ELEVENLABS_API_KEY not set — ElevenLabs features disabled, falling back to browser TTS/STT");
    return false;
  }
  return true;
}

// ─── List available voices ─────────────────────────────────────────────
router.get("/elevenlabs/voices", async (_req: Request, res: Response) => {
  if (!isAvailable()) return res.json({ voices: [], provider: "fallback" });
  try {
    const response = await fetch(`${BASE_URL}/voices`, {
      headers: { "xi-api-key": API_KEY },
    });
    const data = await response.json() as any;
    res.json({ voices: data.voices || [], provider: "elevenlabs" });
  } catch (error) {
    console.error("ElevenLabs voices error:", error);
    res.json({ voices: [], provider: "fallback" });
  }
});

// ─── Text-to-Speech ───────────────────────────────────────────────────
router.post("/elevenlabs/tts", async (req: Request, res: Response) => {
  if (!isAvailable()) {
    return res.status(503).json({ error: "ElevenLabs not configured", fallback: true });
  }
  try {
    const { text, voiceId, modelId, stability, similarityBoost } = req.body;
    const vid = voiceId || "21m00Tcm4TlvDq8ikWAM"; // Rachel (default)
    const response = await fetch(`${BASE_URL}/text-to-speech/${vid}/stream`, {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: modelId || "eleven_turbo_v2_5",
        voice_settings: {
          stability: stability ?? 0.5,
          similarity_boost: similarityBoost ?? 0.75,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("ElevenLabs TTS error:", response.status, err);
      return res.status(502).json({ error: "TTS failed", fallback: true });
    }

    res.setHeader("Content-Type", "audio/mpeg");
    response.body?.pipe(res);
  } catch (error) {
    console.error("ElevenLabs TTS error:", error);
    res.status(502).json({ error: "TTS failed", fallback: true });
  }
});

// ─── Speech-to-Text ───────────────────────────────────────────────────
router.post("/elevenlabs/stt", async (req: Request, res: Response) => {
  if (!isAvailable()) {
    return res.status(503).json({ error: "ElevenLabs not configured", fallback: true });
  }
  try {
    const audioBuffer = req.body; // raw audio
    // ElevenLabs STT expects multipart form
    const form = new FormData();
    const blob = new Blob([audioBuffer], { type: "audio/webm" });
    form.append("audio", blob, "audio.webm");
    form.append("model_id", "eleven_english_v2");

    const response = await fetch(`${BASE_URL}/speech-to-text`, {
      method: "POST",
      headers: { "xi-api-key": API_KEY },
      body: form,
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("ElevenLabs STT error:", response.status, err);
      return res.json({ text: "", error: "STT failed", fallback: true });
    }

    const data = await response.json() as any;
    res.json({ text: data.text || "", provider: "elevenlabs" });
  } catch (error) {
    console.error("ElevenLabs STT error:", error);
    res.status(502).json({ error: "STT failed", fallback: true });
  }
});

export default router;
