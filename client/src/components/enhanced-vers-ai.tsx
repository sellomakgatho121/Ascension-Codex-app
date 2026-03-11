import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Square,
  Sparkles,
  Brain,
  Shield,
  Zap,
  Heart,
  Loader2,
  Settings,
  Languages,
  BarChart3,
  Play,
  Pause
} from "lucide-react";
import { SacredGeometryBackground, SpiritualParticleSystem } from "@/components/advanced-animations";
import { useMobileOptimizations } from "@/hooks/use-mobile-optimizations";
import { useGeminiTTS } from "@/lib/use-gemini-tts";

// Enhanced speech recognition with advanced language processing
interface SpeechConfig {
  language: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  noiseReduction: boolean;
  echoCancellation: boolean;
  confidence: number;
}

// Speech Recognition types for TypeScript
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface VoiceProfile {
  name: string;
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
  spiritualTone: 'gentle' | 'wise' | 'energetic' | 'calming';
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  confidence?: number;
  audioUrl?: string;
  visualAnalysis?: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
  spiritualContext?: string[];
}

interface SpeechVisualization {
  isListening: boolean;
  isSpeaking: boolean;
  audioLevel: number;
  frequency: number[];
  waveform: number[];
}

const defaultSpeechConfig: SpeechConfig = {
  language: 'en-US',
  continuous: false,
  interimResults: true,
  maxAlternatives: 3,
  noiseReduction: true,
  echoCancellation: true,
  confidence: 0.7,
};

const spiritualVoiceProfiles: VoiceProfile[] = [
  {
    name: 'Gentle Guide',
    voice: null,
    rate: 0.8,
    pitch: 1.1,
    volume: 0.9,
    spiritualTone: 'gentle',
  },
  {
    name: 'Wise Teacher',
    voice: null,
    rate: 0.9,
    pitch: 0.9,
    volume: 1.0,
    spiritualTone: 'wise',
  },
  {
    name: 'Energetic Catalyst',
    voice: null,
    rate: 1.1,
    pitch: 1.2,
    volume: 1.0,
    spiritualTone: 'energetic',
  },
  {
    name: 'Calming Presence',
    voice: null,
    rate: 0.7,
    pitch: 0.8,
    volume: 0.8,
    spiritualTone: 'calming',
  },
];

export function EnhancedVERSAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Greetings, beloved soul. I am VERS, your enhanced Vibrational Energy Resonance System guide. I now feature advanced speech processing, natural language understanding, and real-time spiritual guidance. How may I assist your consciousness evolution today?',
      sender: 'assistant',
      timestamp: new Date(),
      spiritualContext: ['greeting', 'consciousness', 'evolution']
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speechConfig, setSpeechConfig] = useState<SpeechConfig>(defaultSpeechConfig);
  const [selectedVoiceProfile, setSelectedVoiceProfile] = useState<VoiceProfile>(spiritualVoiceProfiles[0]);
  const [visualization, setVisualization] = useState<SpeechVisualization>({
    isListening: false,
    isSpeaking: false,
    audioLevel: 0,
    frequency: new Array(32).fill(0),
    waveform: new Array(128).fill(0),
  });

  const [showSettings, setShowSettings] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();

  const { touchDevice, adaptiveLoading, networkStatus } = useMobileOptimizations();

  // --- GEMINI TTS (NotebookLM-quality natural speech) ---
  const {
    speak: speakGemini,
    speakWithChat,
    stop: stopGeminiSpeech,
    isSpeaking: geminiIsSpeaking,
    isLoading: ttsLoading,
    voiceProfiles: geminiVoiceProfiles,
    selectedVoice: selectedGeminiVoice,
    setSelectedVoice: setSelectedGeminiVoice
  } = useGeminiTTS({
    defaultVoice: 'sage-teacher',
    onSpeakStart: () => setVisualization(prev => ({ ...prev, isSpeaking: true })),
    onSpeakEnd: () => setVisualization(prev => ({ ...prev, isSpeaking: false })),
    useBrowserFallback: true
  });

  // Sync Gemini speaking state with visualization
  useEffect(() => {
    setVisualization(prev => ({ ...prev, isSpeaking: geminiIsSpeaking }));
  }, [geminiIsSpeaking]);

  // Initialize advanced speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognitionClass();

      // Apply advanced configuration
      recognition.continuous = speechConfig.continuous;
      recognition.interimResults = speechConfig.interimResults;
      recognition.lang = speechConfig.language;
      if ('maxAlternatives' in recognition) {
        (recognition as any).maxAlternatives = speechConfig.maxAlternatives;
      }

      recognition.onstart = () => {
        setVisualization(prev => ({ ...prev, isListening: true }));
        console.log('VERS: Enhanced speech recognition started');
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = '';
        let confidence = 0;

        // Process multiple alternatives for better accuracy
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            const alternative = result[0];
            transcript += alternative.transcript;
            confidence = alternative.confidence;

            // Apply confidence threshold
            if (confidence >= speechConfig.confidence) {
              setInput(transcript);
              setTimeout(() => sendEnhancedMessage(transcript, confidence), 100);
            } else {
              console.log('VERS: Low confidence speech, requesting repeat');
              speakText("I didn't catch that clearly. Could you please repeat?", 'gentle');
            }
          } else if (speechConfig.interimResults) {
            setInput(result[0].transcript);
          }
        }

        setVisualization(prev => ({ ...prev, isListening: false }));
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('VERS: Speech recognition error:', event.error);
        setVisualization(prev => ({ ...prev, isListening: false }));

        // Provide contextual error feedback
        const errorMessages = {
          'network': 'Network connection required for speech recognition.',
          'not-allowed': 'Microphone permission needed for voice interaction.',
          'no-speech': 'No speech detected. Please try speaking again.',
          'audio-capture': 'Microphone not available. Please check your audio settings.',
        };

        const errorMessage = errorMessages[event.error as keyof typeof errorMessages] ||
          'Speech recognition encountered an issue. Please try again.';

        addSystemMessage(errorMessage);
      };

      recognition.onend = () => {
        setVisualization(prev => ({ ...prev, isListening: false }));
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [speechConfig]);

  // Initialize audio visualization
  useEffect(() => {
    if (visualization.isListening && !audioContext) {
      navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: speechConfig.echoCancellation,
          noiseSuppression: speechConfig.noiseReduction,
          autoGainControl: true,
          sampleRate: 44100
        }
      })
        .then(stream => {
          const context = new AudioContext();
          const analyserNode = context.createAnalyser();
          const source = context.createMediaStreamSource(stream);

          analyserNode.fftSize = 256;
          source.connect(analyserNode);

          setAudioContext(context);
          setAnalyser(analyserNode);
          mediaStreamRef.current = stream;

          updateVisualization(analyserNode);
        })
        .catch(error => {
          console.error('VERS: Audio access error:', error);
        });
    }

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContext) {
        audioContext.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [visualization.isListening]);

  const updateVisualization = (analyserNode: AnalyserNode) => {
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const animate = () => {
      analyserNode.getByteFrequencyData(dataArray);

      const frequency = Array.from(dataArray.slice(0, 32));
      const waveform = Array.from(dataArray.slice(0, 128));
      const audioLevel = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length / 255;

      setVisualization(prev => ({
        ...prev,
        frequency,
        waveform,
        audioLevel,
      }));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  // Enhanced message sending with NLP analysis
  const sendEnhancedMessage = async (messageText: string, confidence: number = 1.0) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date(),
      confidence,
      sentiment: analyzeSentiment(messageText),
      spiritualContext: extractSpiritualContext(messageText),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('VERS: Sending enhanced message with context analysis');

      // Enhance the message with context for better AI responses
      const enhancedPrompt = buildEnhancedPrompt(messageText, userMessage.spiritualContext || []);

      const response = await fetch('/api/vers-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: enhancedPrompt,
          context: {
            sentiment: userMessage.sentiment,
            spiritualContext: userMessage.spiritualContext,
            confidence: confidence,
            previousMessages: messages.slice(-3) // Include last 3 messages for context
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`VERS API error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'assistant',
        timestamp: new Date(),
        spiritualContext: extractSpiritualContext(data.response),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Enhanced text-to-speech with Gemini TTS (NotebookLM quality)
      if (voiceEnabled && data.response) {
        speakGemini(data.response, selectedGeminiVoice).catch(console.error);
      }

    } catch (error) {
      console.error('VERS enhanced chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Connection temporarily disrupted. I remain here to support your spiritual journey. Please try again when ready.`,
        sender: 'assistant',
        timestamp: new Date(),
        spiritualContext: ['support', 'connection'],
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Advanced sentiment analysis
  const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'negative' => {
    const positiveWords = ['love', 'peace', 'joy', 'grateful', 'blessed', 'harmony', 'light', 'healing', 'beautiful', 'amazing'];
    const negativeWords = ['fear', 'anger', 'sad', 'pain', 'dark', 'lost', 'confused', 'worried', 'struggle', 'difficult'];

    const words = text.toLowerCase().split(/\s+/);
    let score = 0;

    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1;
      if (negativeWords.includes(word)) score -= 1;
    });

    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
  };

  // Extract spiritual context from text
  const extractSpiritualContext = (text: string): string[] => {
    const spiritualKeywords = {
      'chakra': ['chakra', 'energy center', 'kundalini'],
      'protection': ['shield', 'protection', 'defense', '12d'],
      'lightbody': ['lightbody', 'merkaba', 'ascension'],
      'meditation': ['meditation', 'mindfulness', 'awareness'],
      'consciousness': ['consciousness', 'awareness', 'expansion'],
      'healing': ['healing', 'therapy', 'recovery'],
      'guidance': ['guidance', 'direction', 'path'],
      'energy': ['energy', 'vibration', 'frequency'],
    };

    const context: string[] = [];
    const lowerText = text.toLowerCase();

    Object.entries(spiritualKeywords).forEach(([category, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        context.push(category);
      }
    });

    return context;
  };

  // Build enhanced prompt with context
  const buildEnhancedPrompt = (message: string, context: string[]): string => {
    let enhancedPrompt = message;

    if (context.length > 0) {
      enhancedPrompt += `\n\n[Spiritual Context: ${context.join(', ')}]`;
    }

    enhancedPrompt += '\n\nPlease provide guidance that is practical, spiritually empowering, and aligned with Energetic Synthesis teachings.';

    return enhancedPrompt;
  };

  // Enhanced text-to-speech with voice profiles
  const speakTextWithProfile = (text: string, profile: VoiceProfile) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Apply voice profile settings
    utterance.rate = profile.rate;
    utterance.pitch = profile.pitch;
    utterance.volume = profile.volume;

    // Find best matching voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice =>
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('natural')
    ) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setVisualization(prev => ({ ...prev, isSpeaking: true }));
    };

    utterance.onend = () => {
      setVisualization(prev => ({ ...prev, isSpeaking: false }));
    };

    utterance.onerror = () => {
      setVisualization(prev => ({ ...prev, isSpeaking: false }));
    };

    synthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const speakText = (text: string, tone: 'gentle' | 'wise' | 'energetic' | 'calming' = 'gentle') => {
    const profile = spiritualVoiceProfiles.find(p => p.spiritualTone === tone) || spiritualVoiceProfiles[0];
    speakTextWithProfile(text, profile);
  };

  const addSystemMessage = (content: string) => {
    const systemMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'assistant',
      timestamp: new Date(),
      spiritualContext: ['system'],
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const startListening = () => {
    if (recognitionRef.current && !visualization.isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && visualization.isListening) {
      recognitionRef.current.stop();
    }
  };

  const stopSpeaking = () => {
    // Stop Gemini TTS
    stopGeminiSpeech();
    // Also stop browser fallback if active
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setVisualization(prev => ({ ...prev, isSpeaking: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendEnhancedMessage(input);
    }
  };

  const getTouchClasses = () => {
    return touchDevice.isTouch
      ? "active:scale-95 transition-transform"
      : "hover:bg-cosmic-700/50 transition-colors";
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen mobile-min-vh-fix bg-cosmic-900 text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      {!adaptiveLoading.shouldReduceQuality && (
        <>
          <SacredGeometryBackground />
          <SpiritualParticleSystem active={visualization.isSpeaking || visualization.isListening} />
        </>
      )}

      <div className="container mx-auto max-w-6xl p-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-4 text-sacred-gold">
            Enhanced VERS AI
          </h1>
          <p className="text-xl text-cosmic-100 max-w-3xl mx-auto leading-relaxed mb-4">
            Advanced Vibrational Energy Resonance System with Natural Language Processing
          </p>

          {/* Status Indicators */}
          <div className="flex justify-center gap-4 text-sm">
            <Badge variant="outline" className="border-sacred-gold text-sacred-gold">
              {networkStatus.isOnline ? 'Online' : 'Offline'}
            </Badge>
            <Badge variant="outline" className="border-cosmic-400 text-cosmic-400">
              Gemini 2.5 Flash
            </Badge>
            {visualization.isListening && (
              <Badge className="bg-red-600 text-white animate-pulse">
                Listening
              </Badge>
            )}
            {visualization.isSpeaking && (
              <Badge className="bg-green-600 text-white animate-pulse">
                Speaking
              </Badge>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-cosmic-800/50 border-cosmic-600">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-sacred-gold" />
                  <span>Voice Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Voice Profile Selection */}
                <div>
                  <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                    Voice Profile
                  </label>
                  <div className="space-y-2">
                    {spiritualVoiceProfiles.map((profile) => (
                      <Button
                        key={profile.name}
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedVoiceProfile(profile)}
                        className={`
                          w-full justify-start text-left
                          ${selectedVoiceProfile.name === profile.name
                            ? 'bg-sacred-gold/20 border-sacred-gold text-sacred-gold'
                            : 'border-cosmic-600 text-cosmic-300'
                          }
                          ${getTouchClasses()}
                        `}
                      >
                        <span className="text-xs">
                          {profile.name}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                    Language
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full justify-start border-cosmic-600 text-cosmic-300 ${getTouchClasses()}`}
                  >
                    <Languages className="w-4 h-4 mr-2" />
                    English (US)
                  </Button>
                </div>

                {/* Audio Visualization */}
                <div>
                  <label className="text-sm font-medium text-cosmic-200 mb-2 block">
                    Audio Levels
                  </label>
                  <div className="h-16 bg-cosmic-700/30 rounded-lg p-2 flex items-end justify-center space-x-1">
                    {visualization.frequency.slice(0, 16).map((value, index) => (
                      <motion.div
                        key={index}
                        className="bg-sacred-gold rounded-sm"
                        style={{
                          width: '6px',
                          height: `${Math.max(2, (value / 255) * 48)}px`,
                        }}
                        animate={{
                          height: `${Math.max(2, (value / 255) * 48)}px`,
                        }}
                        transition={{ duration: 0.1 }}
                      />
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
            <Card className="bg-cosmic-800/50 border-cosmic-600 h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-sacred-gold" />
                    <span>Enhanced Spiritual Guidance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                      className={`${voiceEnabled ? 'text-sacred-gold' : 'text-cosmic-400'} ${getTouchClasses()}`}
                    >
                      {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
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
                          max-w-[80%] p-4 rounded-lg
                          ${message.sender === 'user'
                            ? 'bg-sacred-gold/20 text-sacred-gold border border-sacred-gold/30'
                            : 'bg-cosmic-700/50 text-cosmic-100 border border-cosmic-600'
                          }
                        `}>
                          <p className="text-sm leading-relaxed">{message.content}</p>

                          {/* Message metadata */}
                          <div className="mt-2 flex items-center justify-between text-xs opacity-70">
                            <span>
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            <div className="flex items-center space-x-2">
                              {message.confidence && (
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(message.confidence * 100)}%
                                </Badge>
                              )}
                              {message.sentiment && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${message.sentiment === 'positive' ? 'border-green-400 text-green-400' :
                                      message.sentiment === 'negative' ? 'border-red-400 text-red-400' :
                                        'border-cosmic-400 text-cosmic-400'
                                    }`}
                                >
                                  {message.sentiment}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Spiritual context tags */}
                          {message.spiritualContext && message.spiritualContext.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {message.spiritualContext.map((context) => (
                                <Badge
                                  key={context}
                                  variant="secondary"
                                  className="text-xs bg-cosmic-600/50 text-cosmic-300"
                                >
                                  {context}
                                </Badge>
                              ))}
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
                        <span className="text-cosmic-300">Channeling spiritual guidance...</span>
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
                    placeholder="Ask about spiritual development, chakras, lightbody activation, or consciousness evolution..."
                    className="flex-1 bg-cosmic-700 border-cosmic-600 text-white placeholder:text-cosmic-400"
                    disabled={isLoading || visualization.isListening}
                    style={{ fontSize: '16px' }}
                  />

                  <Button
                    type="button"
                    onClick={visualization.isListening ? stopListening : startListening}
                    disabled={isLoading}
                    className={`
                      ${visualization.isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'} 
                      text-white touch-target ${getTouchClasses()}
                    `}
                    title={visualization.isListening ? "Stop listening" : "Start voice input"}
                  >
                    {visualization.isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>

                  {visualization.isSpeaking && (
                    <Button
                      type="button"
                      onClick={stopSpeaking}
                      className={`bg-orange-600 hover:bg-orange-700 text-white touch-target ${getTouchClasses()}`}
                      title="Stop speaking"
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900 touch-target ${getTouchClasses()}`}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}