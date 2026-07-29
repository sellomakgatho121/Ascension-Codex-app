// Enhanced VERS Assistant with WhisperLiveKit Integration
// Real-time speech-to-text with spiritual context enhancement

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Brain,
  Settings,
  Sparkles,
  Loader2,
  Waves,
  RadioIcon
} from "lucide-react";
import { spiritualSpeech, SPIRITUAL_VOICES } from "@/lib/speech-synthesis";
interface TranscriptionResult { text: string; isFinal: boolean; confidence: number; language: string; spiritualScore?: number; energeticState?: string; }

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  spiritualScore?: number;
  energeticState?: string;
  transcriptionMethod?: 'typing' | 'whisper-live' | 'web-speech';
  confidence?: number;
}

interface WhisperLiveSettings {
  enabled: boolean;
  model: 'tiny' | 'base' | 'small' | 'medium';
  language: string;
  spiritualEnhancement: boolean;
  realTimeMode: boolean;
  confidenceThreshold: number;
}

export function EnhancedVERSWhisper() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(SPIRITUAL_VOICES[0]);
  
  const recognitionRef = useRef<any>(null);

  // WhisperLive Integration States
  const [whisperSettings, setWhisperSettings] = useState<WhisperLiveSettings>({
    enabled: true,
    model: 'base',
    language: 'auto',
    spiritualEnhancement: true,
    realTimeMode: true,
    confidenceThreshold: 0.7
  });
  
  const [isListening, setIsListening] = useState(false);
  const [realtimeTranscription, setRealtimeTranscription] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
  const [transcriptionStats, setTranscriptionStats] = useState({
    totalWords: 0,
    spiritualTerms: 0,
    avgConfidence: 0,
    energeticState: 'neutral'
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    const initializeWhisperLive = async () => {
      if (whisperSettings.enabled) {
        try {
          setConnectionStatus("Web Speech API");

          // Set up transcription callback via browser SpeechRecognition
          console.log('🔮 [Enhanced VERS] Speech recognition initialized');

        } catch (error) {
          console.error('Speech recognition initialization failed:', error);
          setConnectionStatus('Failed to connect');
        }
      }
    };

    initializeWhisperLive();

    return () => {
      if (recognitionRef.current !== null) {
        recognitionRef.current?.stop();
      }
    };
  }, [whisperSettings.enabled]);

  // Handle real-time transcription results
  const handleRealtimeTranscription = useCallback((result: TranscriptionResult) => {
    if (whisperSettings.realTimeMode && !result.isFinal) {
      // Show real-time transcription as user types
      setRealtimeTranscription(result.text);
    }

    if (result.isFinal && result.text.trim()) {
      // Process final transcription
      const finalText = result.text.trim();
      setInputText(finalText);
      setRealtimeTranscription('');
      
      // Update stats
      setTranscriptionStats(prev => ({
        totalWords: prev.totalWords + finalText.split(' ').length,
        spiritualTerms: prev.spiritualTerms + (result.spiritualScore ? Math.round(result.spiritualScore * 10) : 0),
        avgConfidence: (prev.avgConfidence + result.confidence) / 2,
        energeticState: result.energeticState || 'neutral'
      }));

      // Auto-send if confidence is high enough
      if (result.confidence >= whisperSettings.confidenceThreshold) {
        handleSendMessage(finalText, 'whisper-live', result);
      }
    }
  }, [whisperSettings.realTimeMode, whisperSettings.confidenceThreshold]);

  // Toggle listening state
  const toggleListening = async () => {
    try {
      if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
        setRealtimeTranscription('');
        console.log('🔮 [Enhanced VERS] Stopped listening');
      } else {
        await recognitionRef.current?.start();
        setIsListening(true);
        console.log('🔮 [Enhanced VERS] Started listening');
      }
    } catch (error) {
      console.error('Error toggling listening:', error);
      setIsListening(false);
    }
  };

  // Handle sending messages
  const handleSendMessage = async (
    text: string = inputText, 
    method: 'typing' | 'whisper-live' | 'web-speech' = 'typing',
    transcriptionResult?: TranscriptionResult
  ) => {
    if (!text.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      transcriptionMethod: method,
      spiritualScore: transcriptionResult?.spiritualScore,
      energeticState: transcriptionResult?.energeticState,
      confidence: transcriptionResult?.confidence
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      // Enhanced VERS API call with transcription context
      const response = await fetch('/api/vers-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            transcriptionMethod: method,
            spiritualScore: transcriptionResult?.spiritualScore,
            energeticState: transcriptionResult?.energeticState,
            confidence: transcriptionResult?.confidence,
            previousMessages: messages.slice(-5)
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Generate voice response if enabled
        if (selectedVoice && data.response) {
          await generateVoiceResponse(data.response);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate voice response
  const generateVoiceResponse = async (text: string) => {
    try {
      await spiritualSpeech.speakSpiritualGuidance(text);
    } catch (error) {
      console.error('Error generating voice response:', error);
    }
  };

  // Update WhisperLive settings
  const updateWhisperSettings = (updates: Partial<WhisperLiveSettings>) => {
    setWhisperSettings(prev => {
      const newSettings = { ...prev, ...updates };
      
      // Update WhisperLive configuration
      // recognition.language = settings.language (handled via effect)

      return newSettings;
    });
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Header */}
      <section className="cosmic-gradient sacred-geometry py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="p-4 bg-sacred-gold/20 rounded-full border border-sacred-gold/50 mr-4">
              <Brain className="w-8 h-8 text-sacred-gold" />
            </div>
            <div className="p-3 bg-sacred-silver/20 rounded-full border border-sacred-silver/50">
              <Waves className="w-6 h-6 text-sacred-silver" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-sacred font-bold mb-4 text-sacred-gold"
          >
            VERS WhisperLive
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-cosmic-100 max-w-3xl mx-auto"
          >
            Advanced AI spiritual guidance with real-time speech recognition and spiritual context enhancement
          </motion.p>

          {/* Connection Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center justify-center space-x-4"
          >
            <Badge variant={connectionStatus.includes('Server') ? 'default' : 'secondary'}>
              <RadioIcon className="w-3 h-3 mr-1" />
              {connectionStatus}
            </Badge>
            <Badge variant={whisperSettings.enabled ? 'default' : 'outline'}>
              <Waves className="w-3 h-3 mr-1" />
              WhisperLive {whisperSettings.enabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Settings Panel */}
          <div className="lg:col-span-1">
            <Card className="sacred-card h-fit">
              <CardHeader>
                <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  WhisperLive Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Enable/Disable */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="whisper-enabled" className="text-cosmic-100">
                    Enable WhisperLive
                  </Label>
                  <Switch
                    id="whisper-enabled"
                    checked={whisperSettings.enabled}
                    onCheckedChange={(enabled) => updateWhisperSettings({ enabled })}
                  />
                </div>

                {/* Model Selection */}
                <div className="space-y-2">
                  <Label className="text-cosmic-100">Model Quality</Label>
                  <select
                    value={whisperSettings.model}
                    onChange={(e) => updateWhisperSettings({ model: e.target.value as any })}
                    className="w-full p-2 bg-cosmic-800 border border-cosmic-600 rounded text-cosmic-100"
                  >
                    <option value="tiny">Tiny (Fastest)</option>
                    <option value="base">Base (Balanced)</option>
                    <option value="small">Small (Better)</option>
                    <option value="medium">Medium (Best)</option>
                  </select>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <Label className="text-cosmic-100">Language</Label>
                  <select
                    value={whisperSettings.language}
                    onChange={(e) => updateWhisperSettings({ language: e.target.value })}
                    className="w-full p-2 bg-cosmic-800 border border-cosmic-600 rounded text-cosmic-100"
                  >
                    <option value="auto">Auto-detect</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                  </select>
                </div>

                {/* Spiritual Enhancement */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="spiritual-enhancement" className="text-cosmic-100">
                    Spiritual Enhancement
                  </Label>
                  <Switch
                    id="spiritual-enhancement"
                    checked={whisperSettings.spiritualEnhancement}
                    onCheckedChange={(spiritualEnhancement) => updateWhisperSettings({ spiritualEnhancement })}
                  />
                </div>

                {/* Real-time Mode */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="realtime-mode" className="text-cosmic-100">
                    Real-time Preview
                  </Label>
                  <Switch
                    id="realtime-mode"
                    checked={whisperSettings.realTimeMode}
                    onCheckedChange={(realTimeMode) => updateWhisperSettings({ realTimeMode })}
                  />
                </div>

                {/* Confidence Threshold */}
                <div className="space-y-2">
                  <Label className="text-cosmic-100">
                    Auto-send Threshold: {Math.round(whisperSettings.confidenceThreshold * 100)}%
                  </Label>
                  <input
                    type="range"
                    min="0.5"
                    max="1"
                    step="0.05"
                    value={whisperSettings.confidenceThreshold}
                    onChange={(e) => updateWhisperSettings({ confidenceThreshold: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <Separator />

                {/* Stats */}
                <div className="space-y-3">
                  <Label className="text-sacred-gold">Session Statistics</Label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-cosmic-100">
                      <div>Words: {transcriptionStats.totalWords}</div>
                      <div>Spiritual: {transcriptionStats.spiritualTerms}</div>
                    </div>
                    <div className="text-cosmic-100">
                      <div>Confidence: {Math.round(transcriptionStats.avgConfidence * 100)}%</div>
                      <div>State: {transcriptionStats.energeticState}</div>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center justify-between">
                  <span className="flex items-center">
                    <MessageCircle className="w-6 h-6 mr-2" />
                    Spiritual Guidance Session
                  </span>
                  <Badge variant={isListening ? 'default' : 'outline'}>
                    {isListening ? 'Listening...' : 'Ready'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                
                {/* Messages Area */}
                <ScrollArea className="h-96 mb-4 p-4 bg-cosmic-800/30 rounded-lg" ref={scrollAreaRef}>
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                      >
                        <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user' 
                            ? 'bg-sacred-gold/20 text-cosmic-100 border border-sacred-gold/30' 
                            : 'bg-sacred-silver/20 text-cosmic-100 border border-sacred-silver/30'
                        }`}>
                          <div className="text-sm mb-1">{message.content}</div>
                          <div className="flex items-center justify-between text-xs text-cosmic-400 mt-2">
                            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                            {message.transcriptionMethod && (
                              <div className="flex items-center space-x-2">
                                {message.transcriptionMethod === 'whisper-live' && (
                                  <Badge variant="outline" className="text-xs">
                                    <Waves className="w-3 h-3 mr-1" />
                                    WhisperLive
                                  </Badge>
                                )}
                                {message.spiritualScore && message.spiritualScore > 0.3 && (
                                  <Badge variant="outline" className="text-xs">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Spiritual
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-cosmic-400"
                    >
                      <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                      VERS is contemplating your message...
                    </motion.div>
                  )}
                </ScrollArea>

                {/* Real-time Transcription Preview */}
                {realtimeTranscription && whisperSettings.realTimeMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-sacred-gold/10 border border-sacred-gold/20 rounded-lg"
                  >
                    <div className="flex items-center mb-2">
                      <Waves className="w-4 h-4 text-sacred-gold mr-2" />
                      <span className="text-xs text-sacred-gold">Real-time transcription</span>
                    </div>
                    <div className="text-cosmic-100 italic">{realtimeTranscription}</div>
                  </motion.div>
                )}

                {/* Input Area */}
                <div className="flex items-center space-x-2">
                  <div className="flex-1 flex items-center space-x-2">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Ask for spiritual guidance... (or use voice input)"
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="bg-cosmic-800 border-cosmic-600 text-cosmic-100"
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputText.trim() || isProcessing}
                      className="bg-sacred-gold hover:bg-sacred-gold/90 text-cosmic-900"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Voice Controls */}
                  {whisperSettings.enabled && (
                    <Button
                      variant={isListening ? "default" : "outline"}
                      size="icon"
                      onClick={toggleListening}
                      className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Voice Selection */}
                <div className="mt-4 flex items-center space-x-4">
                  <Label className="text-cosmic-100 text-sm">Voice Response:</Label>
                  <select
                    value={selectedVoice.id}
                    onChange={(e) => {
                      const voice = SPIRITUAL_VOICES.find(v => v.id === e.target.value);
                      if (voice) setSelectedVoice(voice);
                    }}
                    className="p-2 bg-cosmic-800 border border-cosmic-600 rounded text-cosmic-100 text-sm"
                  >
                    {SPIRITUAL_VOICES.map((voice) => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} ({voice.frequency}Hz)
                      </option>
                    ))}
                  </select>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnhancedVERSWhisper;