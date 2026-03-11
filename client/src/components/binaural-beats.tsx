import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Waves, 
  Brain,
  Heart,
  Settings,
  RotateCcw
} from "lucide-react";

interface BinauralFrequency {
  id: string;
  name: string;
  baseFreq: number;
  beatFreq: number;
  description: string;
  benefits: string[];
  chakra?: number;
  category: 'relaxation' | 'focus' | 'healing' | 'chakra' | 'meditation';
  color: string;
}

interface AudioState {
  isPlaying: boolean;
  volume: number;
  selectedFrequency: string;
  duration: number;
  timeElapsed: number;
}

export function BinauralBeats() {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    volume: 50,
    selectedFrequency: 'alpha-waves',
    duration: 0,
    timeElapsed: 0
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const frequencies: BinauralFrequency[] = [
    {
      id: 'delta-waves',
      name: 'Delta Waves (Deep Sleep)',
      baseFreq: 140,
      beatFreq: 2,
      description: 'Deep sleep and regeneration frequency',
      benefits: ['Deep sleep', 'Physical healing', 'Regeneration'],
      category: 'relaxation',
      color: '#4C1D95'
    },
    {
      id: 'theta-waves',
      name: 'Theta Waves (Deep Meditation)',
      baseFreq: 150,
      beatFreq: 6,
      description: 'Deep meditation and spiritual connection',
      benefits: ['Deep meditation', 'Spiritual insights', 'Memory enhancement'],
      category: 'meditation',
      color: '#7C3AED'
    },
    {
      id: 'alpha-waves',
      name: 'Alpha Waves (Relaxation)',
      baseFreq: 200,
      beatFreq: 10,
      description: 'Relaxed awareness and light meditation',
      benefits: ['Relaxation', 'Stress relief', 'Light meditation'],
      category: 'relaxation',
      color: '#2563EB'
    },
    {
      id: 'beta-waves',
      name: 'Beta Waves (Focus)',
      baseFreq: 250,
      beatFreq: 20,
      description: 'Enhanced focus and concentration',
      benefits: ['Mental focus', 'Concentration', 'Problem solving'],
      category: 'focus',
      color: '#059669'
    },
    {
      id: 'gamma-waves',
      name: 'Gamma Waves (Higher Consciousness)',
      baseFreq: 300,
      beatFreq: 40,
      description: 'Higher consciousness and spiritual awareness',
      benefits: ['Higher consciousness', 'Spiritual awareness', 'Enhanced perception'],
      category: 'meditation',
      color: '#DC2626'
    },
    {
      id: 'root-chakra',
      name: 'Root Chakra (194.18 Hz)',
      baseFreq: 194.18,
      beatFreq: 4,
      description: 'Root chakra balancing frequency',
      benefits: ['Grounding', 'Security', 'Stability'],
      chakra: 1,
      category: 'chakra',
      color: '#DC2626'
    },
    {
      id: 'sacral-chakra',
      name: 'Sacral Chakra (210.42 Hz)',
      baseFreq: 210.42,
      beatFreq: 6,
      description: 'Sacral chakra healing frequency',
      benefits: ['Creativity', 'Emotional balance', 'Sexuality'],
      chakra: 2,
      category: 'chakra',
      color: '#EA580C'
    },
    {
      id: 'solar-chakra',
      name: 'Solar Plexus (126.22 Hz)',
      baseFreq: 126.22,
      beatFreq: 8,
      description: 'Solar plexus chakra empowerment',
      benefits: ['Personal power', 'Confidence', 'Willpower'],
      chakra: 3,
      category: 'chakra',
      color: '#FCD34D'
    },
    {
      id: 'heart-chakra',
      name: 'Heart Chakra (341.3 Hz)',
      baseFreq: 341.3,
      beatFreq: 10,
      description: 'Heart chakra opening frequency',
      benefits: ['Unconditional love', 'Compassion', 'Emotional healing'],
      chakra: 4,
      category: 'chakra',
      color: '#10B981'
    },
    {
      id: 'throat-chakra',
      name: 'Throat Chakra (141.27 Hz)',
      baseFreq: 141.27,
      beatFreq: 12,
      description: 'Throat chakra expression frequency',
      benefits: ['Communication', 'Truth', 'Self-expression'],
      chakra: 5,
      category: 'chakra',
      color: '#3B82F6'
    },
    {
      id: 'third-eye',
      name: 'Third Eye (221.23 Hz)',
      baseFreq: 221.23,
      beatFreq: 14,
      description: 'Third eye chakra activation',
      benefits: ['Intuition', 'Psychic abilities', 'Inner wisdom'],
      chakra: 6,
      category: 'chakra',
      color: '#8B5CF6'
    },
    {
      id: 'crown-chakra',
      name: 'Crown Chakra (172.06 Hz)',
      baseFreq: 172.06,
      beatFreq: 16,
      description: 'Crown chakra spiritual connection',
      benefits: ['Spiritual connection', 'Divine consciousness', 'Enlightenment'],
      chakra: 7,
      category: 'chakra',
      color: '#A855F7'
    }
  ];

  const selectedFreq = frequencies.find(f => f.id === audioState.selectedFrequency);

  useEffect(() => {
    // Initialize Web Audio API
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (audioState.isPlaying) {
      startBinauralBeats();
      startTimer();
    } else {
      stopBinauralBeats();
      stopTimer();
    }

    return () => {
      stopBinauralBeats();
      stopTimer();
    };
  }, [audioState.isPlaying, audioState.selectedFrequency]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(audioState.volume / 100, audioContextRef.current!.currentTime);
    }
  }, [audioState.volume]);

  const startBinauralBeats = async () => {
    if (!audioContextRef.current || !selectedFreq) return;

    const ctx = audioContextRef.current;
    
    // Resume context if suspended
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    // Create oscillators
    leftOscillatorRef.current = ctx.createOscillator();
    rightOscillatorRef.current = ctx.createOscillator();
    gainNodeRef.current = ctx.createGain();

    // Create stereo panner for left and right channels
    const leftPanner = ctx.createStereoPanner();
    const rightPanner = ctx.createStereoPanner();
    
    leftPanner.pan.value = -1; // Full left
    rightPanner.pan.value = 1;  // Full right

    // Set frequencies
    leftOscillatorRef.current.frequency.setValueAtTime(selectedFreq.baseFreq, ctx.currentTime);
    rightOscillatorRef.current.frequency.setValueAtTime(selectedFreq.baseFreq + selectedFreq.beatFreq, ctx.currentTime);

    // Set waveform (sine wave for pure tones)
    leftOscillatorRef.current.type = 'sine';
    rightOscillatorRef.current.type = 'sine';

    // Connect audio graph
    leftOscillatorRef.current.connect(leftPanner);
    rightOscillatorRef.current.connect(rightPanner);
    
    leftPanner.connect(gainNodeRef.current);
    rightPanner.connect(gainNodeRef.current);
    
    gainNodeRef.current.connect(ctx.destination);

    // Set initial volume
    gainNodeRef.current.gain.setValueAtTime(audioState.volume / 100, ctx.currentTime);

    // Start oscillators
    leftOscillatorRef.current.start();
    rightOscillatorRef.current.start();
  };

  const stopBinauralBeats = () => {
    if (leftOscillatorRef.current) {
      leftOscillatorRef.current.stop();
      leftOscillatorRef.current = null;
    }
    
    if (rightOscillatorRef.current) {
      rightOscillatorRef.current.stop();
      rightOscillatorRef.current = null;
    }
    
    gainNodeRef.current = null;
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setAudioState(prev => ({
        ...prev,
        timeElapsed: prev.timeElapsed + 1
      }));
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlayback = async () => {
    if (!audioState.isPlaying) {
      // Request user interaction to enable audio
      try {
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }
      } catch (error) {
        console.error('Failed to start audio context:', error);
        return;
      }
    }
    
    setAudioState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  const resetTimer = () => {
    setAudioState(prev => ({
      ...prev,
      timeElapsed: 0,
      isPlaying: false
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'relaxation': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'focus': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'healing': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'chakra': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'meditation': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-cosmic-500/20 text-cosmic-400 border-cosmic-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
            <Waves className="w-6 h-6 mr-3" />
            Binaural Beats & Sound Healing
          </CardTitle>
          <p className="text-cosmic-100">
            Use specific frequencies to enhance meditation, chakra work, and consciousness states
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Frequency Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-cosmic-100 mb-2 block">
                Select Frequency
              </label>
              <Select
                value={audioState.selectedFrequency}
                onValueChange={(value) => setAudioState(prev => ({ ...prev, selectedFrequency: value }))}
              >
                <SelectTrigger className="bg-cosmic-800 border-cosmic-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-cosmic-800 border-cosmic-600">
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.id} value={freq.id}>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: freq.color }}
                        />
                        <span>{freq.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedFreq && (
              <Card className="bg-cosmic-800/50 border-cosmic-600">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white">{selectedFreq.name}</h4>
                      <Badge variant="outline" className={getCategoryColor(selectedFreq.category)}>
                        {selectedFreq.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-cosmic-300">{selectedFreq.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-cosmic-400">Base Frequency:</span>
                        <span className="text-sacred-gold ml-2">{selectedFreq.baseFreq.toFixed(2)} Hz</span>
                      </div>
                      <div>
                        <span className="text-cosmic-400">Beat Frequency:</span>
                        <span className="text-sacred-gold ml-2">{selectedFreq.beatFreq} Hz</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-cosmic-400 text-sm">Benefits:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedFreq.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Player Controls */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-sacred-gold mb-2">
                {formatTime(audioState.timeElapsed)}
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={togglePlayback}
                  className="w-16 h-16 rounded-full sacred-button"
                  size="lg"
                >
                  {audioState.isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>
                
                <Button
                  onClick={resetTimer}
                  variant="outline"
                  size="lg"
                  className="w-16 h-16 rounded-full border-cosmic-500 text-cosmic-500 hover:bg-cosmic-500 hover:text-white"
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-cosmic-100 flex items-center">
                  {audioState.volume === 0 ? (
                    <VolumeX className="w-4 h-4 mr-2" />
                  ) : (
                    <Volume2 className="w-4 h-4 mr-2" />
                  )}
                  Volume
                </label>
                <span className="text-sm text-sacred-gold">{audioState.volume}%</span>
              </div>
              <Slider
                value={[audioState.volume]}
                onValueChange={(value) => setAudioState(prev => ({ ...prev, volume: value[0] }))}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          {/* Visual Feedback */}
          {audioState.isPlaying && (
            <div className="text-center space-y-2">
              <div className="flex justify-center items-center space-x-2">
                <Brain className="w-5 h-5 text-sacred-gold animate-pulse" />
                <span className="text-sm text-cosmic-100">Binaural beats active</span>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-sacred-gold rounded-full animate-ping"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-cosmic-400">
                Use stereo headphones for optimal binaural effect
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Access Frequencies */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {frequencies.filter(f => ['alpha-waves', 'theta-waves', 'heart-chakra', 'gamma-waves'].includes(f.id)).map((freq) => (
          <Card 
            key={freq.id}
            className={`sacred-card cursor-pointer transition-all duration-300 ${
              audioState.selectedFrequency === freq.id ? 'border-sacred-gold/60' : 'hover:border-sacred-gold/30'
            }`}
            onClick={() => setAudioState(prev => ({ ...prev, selectedFrequency: freq.id }))}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: freq.color }}
                  />
                  <h4 className="font-semibold text-white text-sm">{freq.name}</h4>
                </div>
                <p className="text-xs text-cosmic-300">{freq.description}</p>
                <div className="text-xs text-cosmic-400">
                  {freq.baseFreq.toFixed(0)} Hz • {freq.beatFreq} Hz beat
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}