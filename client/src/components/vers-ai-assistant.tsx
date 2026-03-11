import { useState, useRef, useEffect } from "react";
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
  Loader2
} from "lucide-react";

// Speech Recognition types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
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

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export function VERSAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Greetings, beloved soul. I am VERS, your Vibrational Energy Resonance System guide. I am here to assist you with Energetic Synthesis teachings, lightbody activation, consciousness evolution, and spiritual protection. How may I support your journey today?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognitionClass();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Auto-send the transcribed message
        setTimeout(() => sendMessage(transcript), 100);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending VERS message:', messageText);
      
      const response = await fetch('/api/vers-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageText
        }),
      });

      console.log('VERS response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('VERS API error:', errorData);
        throw new Error(errorData.error || `VERS API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('VERS response provider:', data.provider);

      if (!data.response) {
        throw new Error('Invalid response format from VERS API');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Auto-speak the response if voice is enabled
      if (voiceEnabled && data.response) {
        speakText(data.response);
      }

    } catch (error) {
      console.error('VERS chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `VERS connection error: ${error.message}. The system is using Gemini AI.`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Speech recognition error:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      // Try to use a more suitable voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Alex') ||
        voice.lang.startsWith('en')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking) {
      stopSpeaking();
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-white p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-4 text-sacred-gold">
            VERS AI Assistant
          </h1>
          <p className="text-xl text-cosmic-100 max-w-3xl mx-auto leading-relaxed">
            Vibrational Energy Resonance System - Powered by Gemini AI
          </p>
          <div className="flex justify-center gap-4 mt-4 text-sm text-cosmic-300">
            {isListening && (
              <span className="flex items-center gap-2 text-red-400">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                Listening...
              </span>
            )}
            {isSpeaking && (
              <span className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Speaking...
              </span>
            )}
            {voiceEnabled && !isListening && !isSpeaking && (
              <span className="text-blue-400">Voice mode enabled</span>
            )}
          </div>
        </div>

        <Card className="sacred-card max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                <Brain className="w-6 h-6 mr-2" />
                VERS Assistant
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-sacred-gold/50 text-sacred-gold">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Online
                </Badge>
                <Button
                  variant={voiceEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={toggleVoice}
                  className="border-cosmic-600 text-cosmic-300 hover:bg-cosmic-700"
                  title={voiceEnabled ? "Voice responses enabled" : "Voice responses disabled"}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                {isSpeaking && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={stopSpeaking}
                    className="border-orange-600 text-orange-400 hover:bg-orange-700"
                    title="Stop speaking"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <ScrollArea className="h-96 p-4 border border-cosmic-600 rounded-lg bg-cosmic-800/30" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-sacred-gold/20 text-white border border-sacred-gold/50'
                          : 'bg-cosmic-700/50 text-cosmic-100 border border-cosmic-600'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs text-cosmic-400 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-cosmic-700/50 p-3 rounded-lg border border-cosmic-600">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-sacred-gold" />
                        <span className="text-sm text-cosmic-100">VERS is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <Separator className="bg-cosmic-600" />

            {/* Spiritual Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-cosmic-800/30 rounded-lg border border-cosmic-600">
                <Shield className="w-6 h-6 mx-auto mb-2 text-sacred-gold" />
                <p className="text-xs text-cosmic-300">12D Shield</p>
              </div>
              <div className="text-center p-3 bg-cosmic-800/30 rounded-lg border border-cosmic-600">
                <Zap className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <p className="text-xs text-cosmic-300">Lightbody</p>
              </div>
              <div className="text-center p-3 bg-cosmic-800/30 rounded-lg border border-cosmic-600">
                <Heart className="w-6 h-6 mx-auto mb-2 text-pink-400" />
                <p className="text-xs text-cosmic-300">Chakras</p>
              </div>
              <div className="text-center p-3 bg-cosmic-800/30 rounded-lg border border-cosmic-600">
                <Brain className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <p className="text-xs text-cosmic-300">Guidance</p>
              </div>
            </div>

            <Separator className="bg-cosmic-600" />

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask VERS about spiritual development, chakras, lightbody activation..."
                className="flex-1 bg-cosmic-800 border-cosmic-600 text-white placeholder:text-cosmic-400"
                disabled={isLoading || isListening}
              />
              <Button
                type="button"
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}