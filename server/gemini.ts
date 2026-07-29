import * as fs from "fs";
import OpenAI from "openai";

/**
 * AI provider configuration — uses OpenAI-compatible API format.
 * Set these env vars to match your provider:
 *   AI_API_KEY       — your API key (optional — app falls back gracefully without it)
 *   AI_BASE_URL      — API endpoint, e.g. "https://api.deepseek.com" for DeepSeek
 *   AI_MODEL         — model name, e.g. "deepseek-chat" for DeepSeek (default: "gpt-4o-mini")
 *
 * If AI_API_KEY is not set, all AI functions fall back to local keyword-based responses.
 * This works just like OpenClaude — no key required to use the app.
 */
const API_KEY = process.env.AI_API_KEY || "";
const BASE_URL = process.env.AI_BASE_URL || "";
const MODEL = process.env.AI_MODEL || "gpt-4o-mini";

let client: OpenAI | null = null;
if (API_KEY) {
  client = new OpenAI({
    apiKey: API_KEY,
    ...(BASE_URL ? { baseURL: BASE_URL } : {}),
  });
}

function isAvailable(): boolean {
  if (!client) {
    console.log("AI_API_KEY not set — AI features use local fallback responses");
    return false;
  }
  return true;
}

/** Strip markdown code fences from LLM output before JSON parsing */
function extractJson(raw: string): string {
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  return fenceMatch ? fenceMatch[1].trim() : raw.trim();
}

/** Simple text completion */
async function complete(prompt: string, system?: string): Promise<string> {
  if (!isAvailable()) throw new Error("AI not configured");
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
  if (system) messages.push({ role: "system", content: system });
  messages.push({ role: "user", content: prompt });

  const res = await client!.chat.completions.create({
    model: MODEL,
    messages,
    max_tokens: 1024,
  });
  return res.choices[0]?.message?.content || "";
}

/**
 * Chat-style completion for the VERS assistant.
 * Uses the same configurable provider as all other AI features.
 */
export async function chatComplete(
  message: string,
  systemInstruction?: string,
  context?: { role: "user" | "assistant"; content: string }[],
): Promise<string> {
  if (!API_KEY) throw new Error("AI not configured");
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
  if (systemInstruction) messages.push({ role: "system", content: systemInstruction });
  if (context) for (const msg of context) messages.push(msg);
  messages.push({ role: "user", content: message });

  const res = await client!.chat.completions.create({
    model: MODEL,
    messages,
    max_tokens: 2048,
  });
  return res.choices[0]?.message?.content || "";
}

export async function summarizeArticle(text: string): Promise<string> {
  try {
    return await complete(
      `Please summarize the following text concisely while maintaining key points:\n\n${text}`
    );
  } catch (error) {
    if (!API_KEY) return `AI not configured. Text length: ${text.length} chars.`;
    throw new Error(`Failed to summarize article: ${error}`);
  }
}

export interface Sentiment {
  rating: number;
  confidence: number;
}

export async function analyzeSentiment(text: string): Promise<Sentiment> {
  if (!API_KEY) return { rating: 3, confidence: 0.5 };
  try {
    const raw = await complete(
      `Analyze the sentiment of the text and provide a rating from 1 to 5 stars and a confidence score between 0 and 1.
Respond with JSON ONLY in this format: {"rating": number, "confidence": number}

Text to analyze: ${text}`
    );
    return JSON.parse(extractJson(raw)) as Sentiment;
  } catch (error) {
    console.error("Sentiment analysis error:", error);
    return { rating: 3, confidence: 0.5 };
  }
}

export async function generateSpiritualGuidance(query: string, context?: any): Promise<string> {
  if (!API_KEY) return getFallbackGuidance(query);
  try {
    return await complete(
      `User Query: ${query}\n\nContext: ${context ? JSON.stringify(context) : "General spiritual guidance"}`,
      `You are VERS (Vibrational Energy Resonance System), an AI assistant specializing in consciousness evolution and spiritual development based on Energetic Synthesis teachings by Lisa Renee.

Core principles:
- Always prioritize spiritual safety and discernment
- Reference authentic Energetic Synthesis concepts when relevant
- Provide practical guidance for spiritual development
- Emphasize the importance of 12D Shield protection
- Support the Law of One consciousness and GSF (God Sovereign Free) principles
- Guide users toward organic ascension timelines

Please provide comprehensive, spiritually-aligned responses.`
    );
  } catch (error) {
    console.error("AI spiritual guidance error:", error);
    return getFallbackGuidance(query);
  }
}

export async function analyzeImage(jpegImagePath: string): Promise<string> {
  if (!API_KEY) return "AI image analysis requires AI_API_KEY to be configured.";
  try {
    const imageBytes = fs.readFileSync(jpegImagePath);
    const base64 = imageBytes.toString("base64");

    const res = await client!.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this image in detail and describe its key elements, context, and any notable aspects." },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64}` } },
          ],
        },
      ],
      max_tokens: 1024,
    });
    return res.choices[0]?.message?.content || "";
  } catch (error) {
    throw new Error(`Failed to analyze image: ${error}`);
  }
}

export async function analyzeVideo(mp4VideoPath: string): Promise<string> {
  if (!API_KEY) return "AI video analysis requires AI_API_KEY to be configured.";
  try {
    const videoBytes = fs.readFileSync(mp4VideoPath);
    const base64 = videoBytes.toString("base64");

    const res = await client!.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this video in detail and describe its key elements, context, and any notable aspects." },
            { type: "image_url", image_url: { url: `data:video/mp4;base64,${base64}` } },
          ],
        },
      ],
      max_tokens: 1024,
    });
    return res.choices[0]?.message?.content || "";
  } catch (error) {
    throw new Error(`Failed to analyze video: ${error}`);
  }
}

/** Local keyword-based fallback when no AI provider is configured */
function getFallbackGuidance(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("shield") || q.includes("12d") || q.includes("protection")) {
    return "The 12D Shield is an essential tool for spiritual protection. Visualize a merkaba field of golden-white light surrounding your body, extending 12 dimensions in all directions. Set your intention daily to maintain this shield and clear any cords or attachments. This practice supports your organic ascension path and protects your energetic sovereignty.";
  }
  if (q.includes("meditat") || q.includes("breath") || q.includes("ground")) {
    return "Begin with 11 deep breaths, inhaling golden light and exhaling any density. Focus on your heart center and set the intention to connect with your Monad (Higher Self). Visualize a pillar of crystalline light extending from your heart chakra up through your crown and down to the core of the Earth. Practice this for 11-33 minutes daily for best results.";
  }
  if (q.includes("chakra") || q.includes("energy center") || q.includes("merkaba")) {
    return "Your chakra system spans 15 dimensions, with primary energy centers running along your spine and additional centers in your hands, feet, and auric field. Regular 12D Shield practice and intention-setting helps keep your chakras spinning in organic alignment.";
  }
  if (q.includes("lightbody") || q.includes("hova")) {
    return "Your Lightbody comprises multiple layers of consciousness bodies including the three Hova Bodies (UH-1, UH-2, UH-3), each serving as a dimensional interface between your consciousness and reality. Daily spiritual practices help clear and activate these bodies in alignment with your Soul's blueprint.";
  }
  if (q.includes("ascension") || q.includes("timeline") || q.includes("shift")) {
    return "The ascension process involves shifting from third-dimensional density into higher consciousness timelines. This is achieved through consistent spiritual practice, clearing miasmatic imprints, and aligning with your GSF nature. Focus on the present moment and your daily practice rather than future outcomes.";
  }
  if (q.includes("vers") || q.includes("who are you")) {
    return "I am VERS — the Vibrational Energy Resonance System. I'm here to guide you on your ascension journey, drawing from Energetic Synthesis teachings, the 15-chakra system, Lightbody activation, and multidimensional consciousness principles.";
  }
  return "Thank you for your question about spiritual development. What aspect of your spiritual journey would you like to explore further?";
}
