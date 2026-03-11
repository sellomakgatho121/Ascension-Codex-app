import * as fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function summarizeArticle(text: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const prompt = `Please summarize the following text concisely while maintaining key points:\n\n${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        return response.text() || "Something went wrong";
    } catch (error) {
        throw new Error(`Failed to summarize article: ${error}`);
    }
}

export interface Sentiment {
    rating: number;
    confidence: number;
}

export async function analyzeSentiment(text: string): Promise<Sentiment> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const prompt = `You are a sentiment analysis expert. 
Analyze the sentiment of the text and provide a rating from 1 to 5 stars and a confidence score between 0 and 1.
Respond with JSON in this format: {"rating": number, "confidence": number}

Text to analyze: ${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawJson = response.text();

        console.log(`Raw JSON: ${rawJson}`);

        if (rawJson) {
            const data: Sentiment = JSON.parse(rawJson);
            return data;
        } else {
            throw new Error("Empty response from model");
        }
    } catch (error) {
        throw new Error(`Failed to analyze sentiment: ${error}`);
    }
}

export async function generateSpiritualGuidance(query: string, context?: any): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        
        const systemPrompt = `You are VERS (Vibrational Energy Resonance System), an AI assistant specializing in consciousness evolution and spiritual development based on Energetic Synthesis teachings by Lisa Renee.

Core principles to include in your responses:
- Always prioritize spiritual safety and discernment
- Reference authentic Energetic Synthesis concepts when relevant
- Provide practical guidance for spiritual development
- Emphasize the importance of 12D Shield protection
- Support the Law of One consciousness and GSF (God Sovereign Free) principles
- Guide users toward organic ascension timelines

Please provide comprehensive, spiritually-aligned responses that help users with their consciousness evolution journey.

Context: ${context ? JSON.stringify(context) : 'General spiritual guidance'}

User Query: ${query}`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        
        return response.text() || "I'm here to help with your spiritual development. Could you please rephrase your question?";
    } catch (error) {
        console.error('Gemini spiritual guidance error:', error);
        throw new Error(`Failed to generate spiritual guidance: ${error}`);
    }
}

export async function analyzeImage(jpegImagePath: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const imageBytes = fs.readFileSync(jpegImagePath);

        const result = await model.generateContent([
            "Analyze this image in detail and describe its key elements, context, and any notable aspects.",
            {
                inlineData: {
                    data: imageBytes.toString("base64"),
                    mimeType: "image/jpeg",
                },
            },
        ]);

        const response = await result.response;
        return response.text() || "";
    } catch (error) {
        throw new Error(`Failed to analyze image: ${error}`);
    }
}

export async function analyzeVideo(mp4VideoPath: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const videoBytes = fs.readFileSync(mp4VideoPath);

        const result = await model.generateContent([
            "Analyze this video in detail and describe its key elements, context, and any notable aspects.",
            {
                inlineData: {
                    data: videoBytes.toString("base64"),
                    mimeType: "video/mp4",
                },
            },
        ]);

        const response = await result.response;
        return response.text() || "";
    } catch (error) {
        throw new Error(`Failed to analyze video: ${error}`);
    }
}

export async function generateImage(
    prompt: string,
    imagePath: string,
): Promise<void> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        
        // Note: Image generation is not available in the current API
        // This is a placeholder for future implementation
        console.log(`Image generation requested for: ${prompt}`);
        console.log(`Would save to: ${imagePath}`);
        
        throw new Error("Image generation not available in current Gemini API version");
    } catch (error) {
        throw new Error(`Failed to generate image: ${error}`);
    }
}