// Simplified VERS Assistant with WhisperLive Integration
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  RadioIcon,
  Volume2,
  VolumeX
} from "lucide-react";
import { spiritualSpeech, SPIRITUAL_VOICES, type VoiceProfile } from "@/lib/speech-synthesis";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  method?: string;
}

interface VoiceSettings {
  enabled: boolean;
  language: string;
  autoSend: boolean;
  voiceProfile: string;
  voiceEnabled: boolean;
}

export function VERSWhisperSimple() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [realtimeText, setRealtimeText] = useState('');
  
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    language: 'en-US',
    autoSend: false,
    voiceProfile: 'aurora-divine',
    voiceEnabled: true
  });

  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize voice profiles
  useEffect(() => {
    setAvailableVoices(SPIRITUAL_VOICES);
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    // Clean up previous instance
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) { /* already stopped */ }
      recognitionRef.current = null;
    }

    if (!voiceSettings.enabled) return;
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = voiceSettings.language;

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setInputText(finalTranscript.trim());
        setRealtimeText('');

        if (voiceSettings.autoSend && finalTranscript.trim()) {
          handleSendMessage(finalTranscript.trim(), 'voice');
        }
      } else {
        setRealtimeText(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setRealtimeText('');
    };

    recognitionRef.current = recognition;

    return () => {
      try { recognition.stop(); } catch (_) { /* already stopped */ }
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
    };
  }, [voiceSettings.enabled, voiceSettings.language, voiceSettings.autoSend]);

  // Create a fresh recognition instance (handles terminal-state issue)
  const createRecognition = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return null;
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = voiceSettings.language;
    recognition.onresult = recognitionRef.current?.onresult || null;
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      setRealtimeText('');
    };
    return recognition;
  };

  // Toggle listening
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      // Create fresh instance to avoid terminal-state InvalidStateError
      const fresh = createRecognition();
      if (fresh) {
        recognitionRef.current = fresh;
        try {
          fresh.start();
          setIsListening(true);
        } catch (e) {
          console.warn('Speech recognition start failed:', e);
        }
      }
    }
  };

  // Play response with spiritual speech synthesis
  const playVoiceResponse = async (text: string) => {
    if (!voiceSettings.voiceEnabled || isPlayingVoice) return;

    setIsPlayingVoice(true);
    try {
      await spiritualSpeech.speakSpiritualGuidance(text, () => {}, () => setIsPlayingVoice(false));
    } catch (error) {
      console.error('Voice playback error:', error);
      setIsPlayingVoice(false);
    }
  };

  // Send message
  const handleSendMessage = async (text: string = inputText, method: string = 'typing') => {
    if (!text.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      method
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/vers-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: { method, timestamp: Date.now() }
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

        // Auto-play voice response if enabled
        if (voiceSettings.voiceEnabled) {
          setTimeout(() => {
            playVoiceResponse(data.response);
          }, 500); // Small delay for better UX
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Test voice function
  const testVoice = async () => {
    if (isPlayingVoice) return;

    try {
      await playVoiceResponse("Hello, I am VERS, your spiritual guide. How may I assist your consciousness evolution today?");
    } catch (error) {
      console.error('Voice test error:', error);
    }
  };

  // Scroll to bottom
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
            Advanced AI spiritual guidance with real-time speech recognition
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center justify-center space-x-4"
          >
            <Badge variant={voiceSettings.enabled ? 'default' : 'secondary'}>
              <RadioIcon className="w-3 h-3 mr-1" />
              Voice {voiceSettings.enabled ? 'Enabled' : 'Disabled'}
            </Badge>
            <Badge variant={isListening ? 'default' : 'outline'}>
              <Waves className="w-3 h-3 mr-1" />
              {isListening ? 'Listening...' : 'Ready'}
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
                  Voice Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-enabled" className="text-cosmic-100">
                    Enable Voice Input
                  </Label>
                  <Switch
                    id="voice-enabled"
                    checked={voiceSettings.enabled}
                    onCheckedChange={(enabled) => setVoiceSettings(prev => ({ ...prev, enabled }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-cosmic-100">Language</Label>
                  <select
                    value={voiceSettings.language}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full p-2 bg-cosmic-800 border border-cosmic-600 rounded text-cosmic-100"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="it-IT">Italian</option>
                    <option value="pt-BR">Portuguese</option>
                    <option value="zh-CN">Chinese</option>
                    <option value="ja-JP">Japanese</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-send" className="text-cosmic-100">
                    Auto-send Messages
                  </Label>
                  <Switch
                    id="auto-send"
                    checked={voiceSettings.autoSend}
                    onCheckedChange={(autoSend) => setVoiceSettings(prev => ({ ...prev, autoSend }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-output" className="text-cosmic-100">
                    Voice Output
                  </Label>
                  <Switch
                    id="voice-output"
                    checked={voiceSettings.voiceEnabled}
                    onCheckedChange={(voiceEnabled) => setVoiceSettings(prev => ({ ...prev, voiceEnabled }))}
                  />
                </div>

                {voiceSettings.voiceEnabled && (
                  <div className="space-y-2">
                    <Label className="text-cosmic-100">Spiritual Voice Profile</Label>
                    <select
                      value={voiceSettings.voiceProfile}
                      onChange={(e) => setVoiceSettings(prev => ({ ...prev, voiceProfile: e.target.value }))}
                      className="w-full p-2 bg-cosmic-800 border border-cosmic-600 rounded text-cosmic-100"
                    >
                      <option value="aurora-divine">Aurora Divine - Compassionate feminine</option>
                      <option value="orion-guardian">Orion Guardian - Protective masculine</option>
                      <option value="luna-harmony">Luna Harmony - Balanced wisdom</option>
                      <option value="ember-wisdom">Ember Wisdom - Supportive guidance</option>
                      <option value="sage-masculine">Sage Masculine - Ancient wisdom</option>
                      <option value="crystal-clarity">Crystal Clarity - Clear insights</option>
                    </select>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={testVoice}
                        disabled={isPlayingVoice}
                        className="flex-1"
                      >
                        {isPlayingVoice ? (
                          <>
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Playing...
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 mr-1" />
                            Test Voice
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="text-center">
                  <Button
                    variant={isListening ? "destructive" : "outline"}
                    onClick={toggleListening}
                    disabled={!voiceSettings.enabled}
                    className="w-full"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-4 h-4 mr-2" />
                        Stop Listening
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Start Listening
                      </>
                    )}
                  </Button>
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
                  {messages.map((message) => (
                    <div
                      key={message.id}
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
                          <div className="flex items-center space-x-1">
                            {message.method === 'voice' && (
                              <Badge variant="outline" className="text-xs">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Voice
                              </Badge>
                            )}
                            {message.role === 'assistant' && voiceSettings.voiceEnabled && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => playVoiceResponse(message.content)}
                                disabled={isPlayingVoice}
                                className="h-6 w-6 p-0 text-cosmic-400 hover:text-sacred-gold"
                              >
                                {isPlayingVoice ? (
                                  <VolumeX className="w-3 h-3" />
                                ) : (
                                  <Volume2 className="w-3 h-3" />
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isProcessing && (
                    <div className="text-center text-cosmic-400">
                      <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                      VERS is contemplating your message...
                    </div>
                  )}
                </ScrollArea>

                {/* Real-time transcription preview */}
                {realtimeText && (
                  <div className="mb-4 p-3 bg-sacred-gold/10 border border-sacred-gold/20 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Waves className="w-4 h-4 text-sacred-gold mr-2" />
                      <span className="text-xs text-sacred-gold">Listening...</span>
                    </div>
                    <div className="text-cosmic-100 italic">{realtimeText}</div>
                  </div>
                )}

                {/* Input Area */}
                <div className="flex items-center space-x-2">
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
                  
                  {voiceSettings.enabled && (
                    <Button
                      variant={isListening ? "destructive" : "outline"}
                      size="icon"
                      onClick={toggleListening}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VERSWhisperSimple;