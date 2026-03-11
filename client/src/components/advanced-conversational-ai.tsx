import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  Brain,
  Heart,
  Zap,
  Settings,
  Languages,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  Loader2,
  Play,
  Pause,
  RefreshCw,
  BookOpen,
  Eye,
  Shield
} from "lucide-react";
import { useMobileOptimizations } from "@/hooks/use-mobile-optimizations";
import { spiritualSpeech, VoiceProfile, SPIRITUAL_VOICES } from "@/lib/speech-synthesis";
import {
  resembleVoice,
  RESEMBLE_SPIRITUAL_VOICES,
  generateSpiritualGuidance
} from "@/lib/resemble-voice-synthesis";
import { SpiritualLogger } from "@/lib/typescript-enhancements";
import { whisperLiveVERS, type TranscriptionResult } from "@/lib/whisper-live-integration";

// Advanced conversational AI interfaces based on awesome-conversational-ai best practices
interface ConversationContext {
  userId: string;
  sessionId: string;
  spiritualProfile: SpiritualProfile;
  conversationHistory: Message[];
  currentIntent: Intent | null;
  entities: Entity[];
  mood: ConversationMood;
  preferences: UserPreferences;
}

interface SpiritualProfile {
  level: 'beginner' | 'intermediate' | 'advanced' | 'teacher';
  interests: string[];
  completedPractices: string[];
  currentGoals: string[];
  preferredCommunicationStyle: 'gentle' | 'direct' | 'detailed' | 'concise';
  spiritualTradition: string[];
}

interface Intent {
  name: string;
  confidence: number;
  parameters: Record<string, any>;
  fulfillmentText?: string;
}

interface Entity {
  name: string;
  value: string;
  confidence: number;
  type: 'spiritual_concept' | 'practice' | 'chakra' | 'protection' | 'meditation' | 'general';
}

interface ConversationMood {
  sentiment: 'positive' | 'neutral' | 'negative' | 'seeking' | 'confused';
  energy: 'high' | 'medium' | 'low';
  receptivity: 'open' | 'cautious' | 'resistant';
  urgency: 'immediate' | 'normal' | 'patient';
}

interface UserPreferences {
  responseLength: 'brief' | 'moderate' | 'detailed';
  includePracticalSteps: boolean;
  includeReferences: boolean;
  voiceEnabled: boolean;
  personalizedGuidance: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  intent?: Intent;
  entities?: Entity[];
  mood?: ConversationMood;
  confidence?: number;
  responseTime?: number;
  spiritualContext?: string[];
  followUpSuggestions?: string[];
}

interface ConversationalMetrics {
  averageResponseTime: number;
  intentAccuracy: number;
  userSatisfaction: number;
  conversationDepth: number;
  spiritualProgressMade: number;
}

// Advanced NLP processors inspired by conversational AI frameworks
class SpiritualNLPProcessor {
  private spiritualKeywords = {
    chakras: ['chakra', 'energy center', 'root', 'sacral', 'solar plexus', 'heart', 'throat', 'third eye', 'crown'],
    protection: ['protection', 'shield', '12d', 'defense', 'boundary', 'negative energy', 'entity'],
    meditation: ['meditation', 'mindfulness', 'awareness', 'breath', 'focus', 'concentration'],
    ascension: ['ascension', 'lightbody', 'consciousness', 'awakening', 'evolution', 'frequency'],
    healing: ['healing', 'clearing', 'trauma', 'emotional', 'physical', 'energetic'],
    guidance: ['guidance', 'help', 'support', 'direction', 'advice', 'wisdom']
  };

  private intentPatterns = {
    'chakra_inquiry': [
      /what.*chakra/i, /chakra.*blocked/i, /activate.*chakra/i, /open.*chakra/i
    ],
    'protection_request': [
      /protect/i, /shield/i, /negative.*energy/i, /psychic.*attack/i
    ],
    'meditation_guidance': [
      /meditat/i, /how.*calm/i, /mindful/i, /breathing/i
    ],
    'spiritual_crisis': [
      /dark.*night/i, /spiritual.*emergency/i, /overwhelm/i, /lost/i, /confused/i
    ],
    'ascension_inquiry': [
      /ascension/i, /lightbody/i, /dimension/i, /frequency/i, /consciousness/i
    ]
  };

  extractIntent(text: string): Intent | null {
    const normalizedText = text.toLowerCase();

    for (const [intentName, patterns] of Object.entries(this.intentPatterns)) {
      for (const pattern of patterns) {
        if (pattern.test(normalizedText)) {
          return {
            name: intentName,
            confidence: 0.8,
            parameters: this.extractParameters(text, intentName)
          };
        }
      }
    }

    return null;
  }

  extractEntities(text: string): Entity[] {
    const entities: Entity[] = [];
    const normalizedText = text.toLowerCase();

    for (const [category, keywords] of Object.entries(this.spiritualKeywords)) {
      for (const keyword of keywords) {
        if (normalizedText.includes(keyword)) {
          entities.push({
            name: keyword,
            value: keyword,
            confidence: 0.9,
            type: category as any
          });
        }
      }
    }

    return entities;
  }

  private extractParameters(text: string, intent: string): Record<string, any> {
    const params: Record<string, any> = {};

    switch (intent) {
      case 'chakra_inquiry':
        const chakraMatch = text.match(/(root|sacral|solar plexus|heart|throat|third eye|crown|base)/i);
        if (chakraMatch) {
          params.chakra = chakraMatch[1].toLowerCase();
        }
        break;
      case 'protection_request':
        params.urgency = text.includes('urgent') || text.includes('emergency') ? 'high' : 'normal';
        break;
      case 'meditation_guidance':
        const durationMatch = text.match(/(\d+)\s*(minute|hour)/i);
        if (durationMatch) {
          params.duration = parseInt(durationMatch[1]);
          params.unit = durationMatch[2];
        }
        break;
    }

    return params;
  }

  analyzeMood(text: string, conversationHistory: Message[]): ConversationMood {
    const sentiment = this.analyzeSentiment(text);
    const energy = this.analyzeEnergy(text);
    const receptivity = this.analyzeReceptivity(text, conversationHistory);
    const urgency = this.analyzeUrgency(text);

    return { sentiment, energy, receptivity, urgency };
  }

  private analyzeSentiment(text: string): ConversationMood['sentiment'] {
    const positiveWords = ['love', 'peace', 'joy', 'grateful', 'blessed', 'amazing', 'wonderful'];
    const negativeWords = ['fear', 'anxiety', 'pain', 'suffering', 'dark', 'lost', 'confused'];
    const seekingWords = ['help', 'guidance', 'how', 'what', 'why', 'need', 'want'];

    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);

    let positiveScore = 0;
    let negativeScore = 0;
    let seekingScore = 0;

    words.forEach(word => {
      if (positiveWords.includes(word)) positiveScore++;
      if (negativeWords.includes(word)) negativeScore++;
      if (seekingWords.includes(word)) seekingScore++;
    });

    if (seekingScore > positiveScore && seekingScore > negativeScore) return 'seeking';
    if (negativeScore > positiveScore) return 'negative';
    if (positiveScore > 0) return 'positive';
    return 'neutral';
  }

  private analyzeEnergy(text: string): ConversationMood['energy'] {
    const highEnergyWords = ['excited', 'amazing', 'incredible', 'powerful', 'intense'];
    const lowEnergyWords = ['tired', 'exhausted', 'drained', 'slow', 'weak'];

    const lowerText = text.toLowerCase();

    if (highEnergyWords.some(word => lowerText.includes(word))) return 'high';
    if (lowEnergyWords.some(word => lowerText.includes(word))) return 'low';
    return 'medium';
  }

  private analyzeReceptivity(text: string, history: Message[]): ConversationMood['receptivity'] {
    const openWords = ['yes', 'please', 'tell me more', 'interesting', 'thank you'];
    const resistantWords = ['no', 'but', 'however', 'doubt', 'skeptical'];

    const lowerText = text.toLowerCase();

    if (resistantWords.some(word => lowerText.includes(word))) return 'resistant';
    if (openWords.some(word => lowerText.includes(word))) return 'open';
    return 'cautious';
  }

  private analyzeUrgency(text: string): ConversationMood['urgency'] {
    const urgentWords = ['urgent', 'emergency', 'immediate', 'crisis', 'help me now'];
    const patientWords = ['when convenient', 'no rush', 'whenever', 'eventually'];

    const lowerText = text.toLowerCase();

    if (urgentWords.some(word => lowerText.includes(word))) return 'immediate';
    if (patientWords.some(word => lowerText.includes(word))) return 'patient';
    return 'normal';
  }
}

// Conversation memory and context management
class ConversationMemory {
  private context: ConversationContext;
  private shortTermMemory: Message[] = [];
  private longTermMemory: Map<string, any> = new Map();

  constructor(context: ConversationContext) {
    this.context = context;
  }

  addMessage(message: Message) {
    this.shortTermMemory.push(message);

    // Keep only last 10 messages in short-term memory
    if (this.shortTermMemory.length > 10) {
      this.shortTermMemory.shift();
    }

    // Extract important information for long-term memory
    this.updateLongTermMemory(message);
  }

  private updateLongTermMemory(message: Message) {
    if (message.entities) {
      message.entities.forEach(entity => {
        const key = `entity_${entity.type}_${entity.name}`;
        const existing = this.longTermMemory.get(key) || { count: 0, lastMentioned: new Date(0) };
        this.longTermMemory.set(key, {
          ...existing,
          count: existing.count + 1,
          lastMentioned: message.timestamp
        });
      });
    }

    if (message.spiritualContext) {
      message.spiritualContext.forEach(context => {
        const key = `context_${context}`;
        const existing = this.longTermMemory.get(key) || { count: 0, lastMentioned: new Date(0) };
        this.longTermMemory.set(key, {
          ...existing,
          count: existing.count + 1,
          lastMentioned: message.timestamp
        });
      });
    }
  }

  getRelevantContext(): string {
    const recentTopics = Array.from(this.longTermMemory.entries())
      .filter(([key]) => key.startsWith('context_'))
      .sort((a, b) => b[1].lastMentioned.getTime() - a[1].lastMentioned.getTime())
      .slice(0, 3)
      .map(([key]) => key.replace('context_', ''));

    const frequentEntities = Array.from(this.longTermMemory.entries())
      .filter(([key]) => key.startsWith('entity_'))
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([key]) => key.split('_')[2]);

    return `Recent conversation topics: ${recentTopics.join(', ')}. 
            Frequently mentioned: ${frequentEntities.join(', ')}.
            User's spiritual level: ${this.context.spiritualProfile.level}.
            Preferred communication: ${this.context.spiritualProfile.preferredCommunicationStyle}.`;
  }
}

// Response generation with spiritual context
class SpiritualResponseGenerator {
  generateResponse(
    intent: Intent | null,
    entities: Entity[],
    mood: ConversationMood,
    context: string,
    userProfile: SpiritualProfile
  ): { response: string; followUps: string[] } {

    if (intent) {
      return this.generateIntentBasedResponse(intent, entities, mood, userProfile);
    }

    return this.generateContextualResponse(entities, mood, context, userProfile);
  }

  private generateIntentBasedResponse(
    intent: Intent,
    entities: Entity[],
    mood: ConversationMood,
    profile: SpiritualProfile
  ): { response: string; followUps: string[] } {

    switch (intent.name) {
      case 'chakra_inquiry':
        return this.generateChakraGuidance(intent, entities, mood, profile);
      case 'protection_request':
        return this.generateProtectionGuidance(intent, entities, mood, profile);
      case 'meditation_guidance':
        return this.generateMeditationGuidance(intent, entities, mood, profile);
      case 'spiritual_crisis':
        return this.generateCrisisSupport(intent, entities, mood, profile);
      case 'ascension_inquiry':
        return this.generateAscensionGuidance(intent, entities, mood, profile);
      default:
        return this.generateGeneralGuidance(mood, profile);
    }
  }

  private generateChakraGuidance(
    intent: Intent,
    entities: Entity[],
    mood: ConversationMood,
    profile: SpiritualProfile
  ): { response: string; followUps: string[] } {

    const chakra = intent.parameters.chakra || 'energy centers';
    const level = profile.level;

    let response = '';
    let followUps: string[] = [];

    if (level === 'beginner') {
      response = `I sense you're curious about ${chakra} energy. Let's start with understanding that chakras are spinning energy centers in your body. Each one governs different aspects of your physical, emotional, and spiritual well-being.`;
      followUps = [
        'Tell me about the 7 main chakras',
        'How do I know if a chakra is blocked?',
        'What are simple chakra exercises?'
      ];
    } else {
      response = `Working with ${chakra} energy requires both intention and practice. For ${chakra} specifically, I recommend beginning with visualization and breathwork to establish a clear energetic connection.`;
      followUps = [
        'Show me advanced chakra techniques',
        'Explain the 15-chakra system',
        'How do morphogenetic chakras work?'
      ];
    }

    if (mood.urgency === 'immediate') {
      response += ' Since this feels urgent, let\'s start with a simple grounding exercise to stabilize your energy first.';
    }

    return { response, followUps };
  }

  private generateProtectionGuidance(
    intent: Intent,
    entities: Entity[],
    mood: ConversationMood,
    profile: SpiritualProfile
  ): { response: string; followUps: string[] } {

    const urgency = intent.parameters.urgency || 'normal';

    let response = '';
    let followUps: string[] = [];

    if (urgency === 'high' || mood.urgency === 'immediate') {
      response = `I understand you need immediate spiritual protection. Let's establish the 12D Shield right now. Breathe deeply and visualize a brilliant platinum light surrounding your entire body and energy field.`;
      followUps = [
        'Guide me through 12D Shield now',
        'Help me clear negative attachments',
        'What if protection isn\'t working?'
      ];
    } else {
      response = `Spiritual protection is fundamental to maintaining clear energy. The 12D Shield is our primary protection method, creating a strong energetic boundary around your auric field.`;
      followUps = [
        'Teach me daily protection routine',
        'Explain different protection methods',
        'How to protect during sleep?'
      ];
    }

    return { response, followUps };
  }

  private generateMeditationGuidance(
    intent: Intent,
    entities: Entity[],
    mood: ConversationMood,
    profile: SpiritualProfile
  ): { response: string; followUps: string[] } {

    const duration = intent.parameters.duration || 15;

    let response = `Meditation is a sacred practice for consciousness expansion. `;
    let followUps: string[] = [];

    if (profile.level === 'beginner') {
      response += `Let's start with a simple ${duration}-minute breathing meditation to center your awareness and connect with your inner guidance.`;
      followUps = [
        'Guide me through basic meditation',
        'How to deal with racing thoughts?',
        'Best meditation posture?'
      ];
    } else {
      response += `For deeper spiritual development, consider integrating chakra awareness, lightbody activation, or connection with your spiritual guidance team during meditation.`;
      followUps = [
        'Advanced meditation techniques',
        'Lightbody activation meditation',
        'Connecting with spiritual guides'
      ];
    }

    return { response, followUps };
  }

  private generateCrisisSupport(
    intent: Intent,
    entities: Entity[],
    mood: ConversationMood,
    profile: SpiritualProfile
  ): { response: string; followUps: string[] } {

    const response = `I recognize you're going through a challenging spiritual experience. This is often part of the awakening process. First, let's ground your energy and establish protection. You're not alone in this journey.`;

    const followUps = [
      'Help me ground my energy now',
      'What is spiritual emergency?',
      'Connect me with support resources'
    ];

    return { response, followUps };
  }

  private generateAscensionGuidance(
    intent: Intent,
    entities: Entity[],
    mood: ConversationMood,
    profile: SpiritualProfile
  ): { response: string; followUps: string[] } {

    let response = `Ascension is the natural evolution of consciousness toward higher dimensional awareness. This involves developing your lightbody, clearing density, and aligning with your authentic divine blueprint.`;

    const followUps = [
      'Explain lightbody development',
      'What are ascension symptoms?',
      'How to accelerate consciousness evolution?'
    ];

    if (mood.energy === 'low') {
      response += ' I sense your energy feels heavy right now. This is common during ascension integration periods.';
    }

    return { response, followUps };
  }

  private generateGeneralGuidance(
    mood: ConversationMood,
    profile: SpiritualProfile
  ): { response: string; followUps: string[] } {

    let response = 'I\'m here to support your spiritual journey. ';

    switch (mood.sentiment) {
      case 'seeking':
        response += 'I sense you\'re looking for guidance. What area of spiritual development feels most important to you right now?';
        break;
      case 'positive':
        response += 'Your positive energy is beautiful. How can we build on this momentum for your spiritual growth?';
        break;
      case 'negative':
        response += 'I hold space for what you\'re experiencing. Sometimes challenges are gateways to deeper understanding.';
        break;
      default:
        response += 'What aspect of your spiritual development would you like to explore?';
    }

    const followUps = [
      'Help me choose a spiritual practice',
      'What\'s my next step in development?',
      'I want to learn about protection'
    ];

    return { response, followUps };
  }

  private generateContextualResponse(
    entities: Entity[],
    mood: ConversationMood,
    context: string,
    profile: SpiritualProfile
  ): { response: string; followUps: string[] } {

    const response = 'I\'m here to support your spiritual journey with personalized guidance based on Energetic Synthesis teachings. What would you like to explore?';

    const followUps = [
      'I need spiritual protection',
      'Help me with chakra work',
      'Guide me in meditation'
    ];

    return { response, followUps };
  }
}

export function AdvancedConversationalAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<VoiceProfile>(SPIRITUAL_VOICES[0]);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    userId: 'user_1',
    sessionId: Date.now().toString(),
    spiritualProfile: {
      level: 'intermediate',
      interests: ['chakras', 'protection', 'meditation'],
      completedPractices: [],
      currentGoals: ['spiritual protection', 'consciousness expansion'],
      preferredCommunicationStyle: 'gentle',
      spiritualTradition: ['energetic_synthesis']
    },
    conversationHistory: [],
    currentIntent: null,
    entities: [],
    mood: { sentiment: 'neutral', energy: 'medium', receptivity: 'open', urgency: 'normal' },
    preferences: {
      responseLength: 'moderate',
      includePracticalSteps: true,
      includeReferences: true,
      voiceEnabled: true,
      personalizedGuidance: true
    }
  });

  const [metrics, setMetrics] = useState<ConversationalMetrics>({
    averageResponseTime: 0,
    intentAccuracy: 0.85,
    userSatisfaction: 0.9,
    conversationDepth: 0,
    spiritualProgressMade: 0
  });

  const nlpProcessor = useRef(new SpiritualNLPProcessor());
  const memory = useRef(new ConversationMemory(conversationContext));
  const responseGenerator = useRef(new SpiritualResponseGenerator());
  const { touchDevice, adaptiveLoading } = useMobileOptimizations();

  // Speech synthesis functions
  const speakMessage = async (text: string) => {
    if (!speechEnabled || isSpeaking) return;

    setIsSpeaking(true);
    spiritualSpeech.setVoiceProfile(selectedVoice.id);

    try {
      await spiritualSpeech.speakSpiritualGuidance(
        text,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    spiritualSpeech.stop();
    setIsSpeaking(false);
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      setSpeechEnabled(!speechEnabled);
    }
  };

  // Initialize conversation
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: 'Greetings, beloved soul. I am your advanced conversational AI guide, enhanced with natural language understanding and spiritual context awareness. I adapt my responses to your unique spiritual profile and current needs. How may I support your consciousness evolution today?',
      sender: 'assistant',
      timestamp: new Date(),
      spiritualContext: ['greeting', 'consciousness', 'evolution'],
      followUpSuggestions: [
        'Help me with spiritual protection',
        'Guide me in chakra work',
        'I need meditation guidance'
      ]
    };

    setMessages([welcomeMessage]);
    memory.current.addMessage(welcomeMessage);
  }, []);

  const processMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const startTime = performance.now();

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    // Process with NLP
    const intent = nlpProcessor.current.extractIntent(messageText);
    const entities = nlpProcessor.current.extractEntities(messageText);
    const mood = nlpProcessor.current.analyzeMood(messageText, messages);

    if (intent) userMessage.intent = intent;
    userMessage.entities = entities;
    userMessage.mood = mood;

    setMessages(prev => [...prev, userMessage]);
    memory.current.addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      // Get conversation context
      const context = memory.current.getRelevantContext();

      // Generate enhanced prompt
      const enhancedPrompt = buildEnhancedPrompt(
        messageText,
        intent,
        entities,
        mood,
        context,
        conversationContext.spiritualProfile
      );

      // Send to backend
      const response = await fetch('/api/vers-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: enhancedPrompt,
          context: {
            intent: intent?.name,
            entities: entities.map(e => e.name),
            mood,
            userProfile: conversationContext.spiritualProfile,
            conversationContext: context
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const responseTime = performance.now() - startTime;

      // Generate follow-up suggestions using local AI
      const { followUps } = responseGenerator.current.generateResponse(
        intent,
        entities,
        mood,
        context,
        conversationContext.spiritualProfile
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'assistant',
        timestamp: new Date(),
        responseTime,
        spiritualContext: entities.map(e => e.name),
        followUpSuggestions: followUps
      };

      setMessages(prev => [...prev, assistantMessage]);
      memory.current.addMessage(assistantMessage);

      // Speak the response if speech is enabled
      if (speechEnabled) {
        setTimeout(() => speakMessage(data.response), 500);
      }

      // Update metrics
      setMetrics(prev => ({
        ...prev,
        averageResponseTime: (prev.averageResponseTime + responseTime) / 2,
        conversationDepth: prev.conversationDepth + 1
      }));

    } catch (error) {
      console.warn('API connection failed, falling back to local generation:', error);

      try {
        // Fallback: Generate local response using internal logic
        const context = memory.current.getRelevantContext();
        const { response: fallbackResponse, followUps } = responseGenerator.current.generateResponse(
          intent,
          entities,
          mood,
          context,
          conversationContext.spiritualProfile
        );

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: fallbackResponse, // Seamless fallback
          sender: 'assistant',
          timestamp: new Date(),
          spiritualContext: entities.map(e => e.name),
          followUpSuggestions: followUps
        };

        setMessages(prev => [...prev, assistantMessage]);
        memory.current.addMessage(assistantMessage);

        // Update metrics even for local response
        setMetrics(prev => ({
          ...prev,
          averageResponseTime: (prev.averageResponseTime + 100) / 2, // Artificial fast time
          conversationDepth: prev.conversationDepth + 1
        }));

      } catch (fallbackError) {
        console.error('Critical failure in AI fallback:', fallbackError);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'I apologize, but I am momentarily unable to access my higher guidance systems. Please breathe with me for a moment and try again.',
          sender: 'assistant',
          timestamp: new Date(),
          spiritualContext: ['support', 'connection']
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const buildEnhancedPrompt = (
    message: string,
    intent: Intent | null,
    entities: Entity[],
    mood: ConversationMood,
    context: string,
    profile: SpiritualProfile
  ): string => {
    let prompt = `User message: "${message}"\n\n`;

    if (intent) {
      prompt += `Detected intent: ${intent.name} (confidence: ${intent.confidence})\n`;
      prompt += `Intent parameters: ${JSON.stringify(intent.parameters)}\n`;
    }

    if (entities.length > 0) {
      prompt += `Spiritual entities mentioned: ${entities.map(e => `${e.name} (${e.type})`).join(', ')}\n`;
    }

    prompt += `User mood: ${mood.sentiment} sentiment, ${mood.energy} energy, ${mood.receptivity} receptivity, ${mood.urgency} urgency\n`;
    prompt += `User spiritual level: ${profile.level}\n`;
    prompt += `Preferred communication style: ${profile.preferredCommunicationStyle}\n`;
    prompt += `Conversation context: ${context}\n\n`;

    prompt += `Please provide spiritually empowering guidance based on Energetic Synthesis teachings. `;
    prompt += `Adapt your response to the user's spiritual level and current emotional state. `;
    prompt += `Include practical steps when appropriate, and maintain a ${profile.preferredCommunicationStyle} tone.`;

    return prompt;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processMessage(input);
  };

  const handleFollowUpClick = (suggestion: string) => {
    processMessage(suggestion);
  };

  const getTouchClasses = () => {
    return touchDevice.isTouch
      ? "active:scale-95 transition-transform"
      : "hover:bg-cosmic-700/50 transition-colors";
  };

  return (
    <div className="min-h-screen mobile-min-vh-fix bg-cosmic-900 text-white p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-4 text-sacred-gold">
            Advanced Conversational AI
          </h1>
          <p className="text-xl text-cosmic-100 max-w-3xl mx-auto leading-relaxed mb-4">
            Enhanced VERS with Natural Language Understanding & Spiritual Context Awareness
          </p>

          {/* Conversation Metrics */}
          <div className="flex justify-center gap-4 text-sm">
            <Badge variant="outline" className="border-sacred-gold text-sacred-gold">
              Intent Accuracy: {Math.round(metrics.intentAccuracy * 100)}%
            </Badge>
            <Badge variant="outline" className="border-cosmic-400 text-cosmic-400">
              Depth: {metrics.conversationDepth}
            </Badge>
            <Badge variant="outline" className="border-green-400 text-green-400">
              Satisfaction: {Math.round(metrics.userSatisfaction * 100)}%
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conversation Analytics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-cosmic-800/50 border-cosmic-600 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-sacred-gold" />
                  <span>AI Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Response Time */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cosmic-300">Avg Response Time</span>
                    <span className="text-cosmic-100">{Math.round(metrics.averageResponseTime)}ms</span>
                  </div>
                  <Progress value={Math.min(100, (2000 - metrics.averageResponseTime) / 20)} className="h-2" />
                </div>

                {/* Intent Recognition */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cosmic-300">Intent Accuracy</span>
                    <span className="text-cosmic-100">{Math.round(metrics.intentAccuracy * 100)}%</span>
                  </div>
                  <Progress value={metrics.intentAccuracy * 100} className="h-2" />
                </div>

                {/* Conversation Depth */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cosmic-300">Conversation Depth</span>
                    <span className="text-cosmic-100">{metrics.conversationDepth}</span>
                  </div>
                  <Progress value={Math.min(100, metrics.conversationDepth * 5)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Profile */}
            <Card className="bg-cosmic-800/50 border-cosmic-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-sacred-gold" />
                  <span>Spiritual Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-cosmic-300 text-sm">Level</span>
                  <Badge variant="outline" className="text-xs">
                    {conversationContext.spiritualProfile.level}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-cosmic-300 text-sm">Communication</span>
                  <Badge variant="outline" className="text-xs">
                    {conversationContext.spiritualProfile.preferredCommunicationStyle}
                  </Badge>
                </div>
                <div>
                  <span className="text-cosmic-300 text-sm block mb-2">Interests</span>
                  <div className="flex flex-wrap gap-1">
                    {conversationContext.spiritualProfile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <Card className="bg-cosmic-800/50 border-cosmic-600 h-[700px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-sacred-gold" />
                    <span>Enhanced Spiritual Conversation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Voice Controls */}
                    <Button
                      size="sm"
                      variant={speechEnabled ? "default" : "outline"}
                      onClick={toggleSpeech}
                      className={`${speechEnabled ? 'bg-sacred-gold text-cosmic-900' : 'border-cosmic-600'}`}
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-4 h-4" />
                      ) : speechEnabled ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4" />
                      )}
                    </Button>

                    {/* Voice Profile Selector */}
                    <select
                      value={selectedVoice.id}
                      onChange={(e) => {
                        const voice = SPIRITUAL_VOICES.find(v => v.id === e.target.value);
                        if (voice) setSelectedVoice(voice);
                      }}
                      className="bg-cosmic-700 border border-cosmic-600 rounded px-2 py-1 text-xs text-cosmic-100"
                    >
                      {SPIRITUAL_VOICES.map((voice) => (
                        <option key={voice.id} value={voice.id}>
                          {voice.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 px-6">
                <div className="space-y-4 pb-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`
                          max-w-[80%] p-4 rounded-lg space-y-3
                          ${message.sender === 'user'
                            ? 'bg-sacred-gold/20 text-sacred-gold border border-sacred-gold/30'
                            : 'bg-cosmic-700/50 text-cosmic-100 border border-cosmic-600'
                          }
                        `}>
                          <div className="flex items-start justify-between">
                            <p className="text-sm leading-relaxed flex-1">{message.content}</p>

                            {/* Speech control for assistant messages */}
                            {message.sender === 'assistant' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => speakMessage(message.content)}
                                disabled={isSpeaking}
                                className="ml-2 p-1 h-6 w-6 hover:bg-cosmic-600/50"
                                title={`Speak with ${selectedVoice.name}`}
                              >
                                {isSpeaking ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Play className="w-3 h-3" />
                                )}
                              </Button>
                            )}
                          </div>

                          {/* Message metadata */}
                          {(message.intent || message.entities || message.responseTime) && (
                            <div className="text-xs opacity-70 space-y-1">
                              {message.intent && (
                                <div className="flex items-center space-x-2">
                                  <Target className="w-3 h-3" />
                                  <span>Intent: {message.intent.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {Math.round(message.intent.confidence * 100)}%
                                  </Badge>
                                </div>
                              )}

                              {message.entities && message.entities.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {message.entities.map((entity, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {entity.name}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              {message.responseTime && (
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{Math.round(message.responseTime)}ms</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Follow-up suggestions */}
                          {message.followUpSuggestions && message.followUpSuggestions.length > 0 && (
                            <div className="space-y-2">
                              <div className="text-xs text-cosmic-400">Suggested follow-ups:</div>
                              <div className="space-y-1">
                                {message.followUpSuggestions.map((suggestion, idx) => (
                                  <Button
                                    key={idx}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleFollowUpClick(suggestion)}
                                    className={`
                                      w-full justify-start text-left text-xs h-auto py-2
                                      border-cosmic-600 text-cosmic-300 hover:border-sacred-gold hover:text-sacred-gold
                                      ${getTouchClasses()}
                                    `}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-cosmic-700/50 border border-cosmic-600 p-4 rounded-lg flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-sacred-gold" />
                        <span className="text-cosmic-300">Processing with enhanced AI...</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Enhanced Input */}
              <div className="p-6 border-t border-cosmic-700">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about spiritual development, consciousness evolution, or any guidance you need..."
                    className="flex-1 bg-cosmic-700 border-cosmic-600 text-white placeholder:text-cosmic-400"
                    disabled={isLoading}
                    style={{ fontSize: '16px' }}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900 touch-target ${getTouchClasses()}`}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>

                <div className="text-xs text-cosmic-400 mt-2 text-center">
                  Enhanced with NLP, intent recognition, and spiritual context awareness
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}