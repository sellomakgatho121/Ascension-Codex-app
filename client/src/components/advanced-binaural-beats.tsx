import { useState, useRef, useEffect, useCallback } from 'react';
import { BinauralBeatsService } from '@/lib/api-services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Settings,
  Waves,
  Brain,
  Clock,
  Zap,
  Heart,
  Eye,
  Moon,
  Sun,
  Activity
} from 'lucide-react';

interface BinauralBeatPreset {
  id: string;
  name: string;
  description: string;
  baseFreq: number;
  beatFreq: number;
  category: 'meditation' | 'focus' | 'sleep' | 'healing' | 'chakra';
  icon: typeof Brain;
  color: string;
  duration?: number; // in minutes
}

interface AudioSettings {
  volume: number;
  leftBalance: number;
  rightBalance: number;
  fadeInDuration: number;
  fadeOutDuration: number;
  enableReverb: boolean;
  reverbLevel: number;
  enableLowPass: boolean;
  lowPassFreq: number;
}

const binauralPresets: BinauralBeatPreset[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // BRAINWAVE STATES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'delta-deep-sleep',
    name: 'Delta Deep Sleep',
    description: 'Promotes deep restorative sleep and cellular healing (0.5-4 Hz)',
    baseFreq: 200,
    beatFreq: 2,
    category: 'sleep',
    icon: Moon,
    color: 'hsl(240, 60%, 50%)',
    duration: 60
  },
  {
    id: 'delta-healing',
    name: 'Delta Regeneration',
    description: 'Deep physical and energetic body repair',
    baseFreq: 180,
    beatFreq: 1.5,
    category: 'healing',
    icon: Heart,
    color: 'hsl(240, 70%, 45%)',
    duration: 45
  },
  {
    id: 'theta-meditation',
    name: 'Theta Deep Meditation',
    description: 'Deep meditative states and spiritual connection (4-8 Hz)',
    baseFreq: 150,
    beatFreq: 6,
    category: 'meditation',
    icon: Brain,
    color: 'hsl(280, 60%, 55%)',
    duration: 30
  },
  {
    id: 'theta-astral',
    name: 'Theta Astral Gateway',
    description: 'Facilitates astral projection and out-of-body experiences',
    baseFreq: 140,
    beatFreq: 4.5,
    category: 'meditation',
    icon: Eye,
    color: 'hsl(270, 70%, 60%)',
    duration: 40
  },
  {
    id: 'alpha-relaxation',
    name: 'Alpha Relaxation',
    description: 'Calm alertness and creative flow (8-12 Hz)',
    baseFreq: 180,
    beatFreq: 10,
    category: 'meditation',
    icon: Waves,
    color: 'hsl(200, 60%, 50%)',
    duration: 20
  },
  {
    id: 'alpha-visualization',
    name: 'Alpha Visualization',
    description: 'Enhanced mental imagery for manifestation work',
    baseFreq: 190,
    beatFreq: 8.5,
    category: 'meditation',
    icon: Eye,
    color: 'hsl(195, 65%, 55%)',
    duration: 25
  },
  {
    id: 'beta-focus',
    name: 'Beta Focus',
    description: 'Enhanced concentration and mental clarity (12-30 Hz)',
    baseFreq: 220,
    beatFreq: 15,
    category: 'focus',
    icon: Zap,
    color: 'hsl(45, 80%, 55%)',
    duration: 45
  },
  {
    id: 'beta-learning',
    name: 'Beta Learning State',
    description: 'Optimal frequency for studying ES teachings',
    baseFreq: 210,
    beatFreq: 18,
    category: 'focus',
    icon: Brain,
    color: 'hsl(50, 75%, 50%)',
    duration: 60
  },
  {
    id: 'gamma-awareness',
    name: 'Gamma Peak Awareness',
    description: 'Peak cognitive performance and unity consciousness (30-100 Hz)',
    baseFreq: 250,
    beatFreq: 40,
    category: 'focus',
    icon: Activity,
    color: 'hsl(0, 70%, 55%)',
    duration: 15
  },
  {
    id: 'gamma-insight',
    name: 'Gamma Spiritual Insight',
    description: 'Higher consciousness access and sudden realizations',
    baseFreq: 280,
    beatFreq: 50,
    category: 'focus',
    icon: Sun,
    color: 'hsl(35, 85%, 55%)',
    duration: 10
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SOLFEGGIO FREQUENCIES - Ancient Healing Tones
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'solfeggio-174',
    name: '174 Hz Pain Release',
    description: 'Foundation frequency for physical healing and safety',
    baseFreq: 174,
    beatFreq: 4,
    category: 'healing',
    icon: Heart,
    color: 'hsl(0, 60%, 40%)',
    duration: 20
  },
  {
    id: 'solfeggio-285',
    name: '285 Hz Tissue Healing',
    description: 'Cellular regeneration and energy field repair',
    baseFreq: 285,
    beatFreq: 4,
    category: 'healing',
    icon: Heart,
    color: 'hsl(15, 65%, 45%)',
    duration: 20
  },
  {
    id: 'solfeggio-396',
    name: '396 Hz Liberation',
    description: 'Release guilt, fear, and negative programming',
    baseFreq: 396,
    beatFreq: 6,
    category: 'healing',
    icon: Heart,
    color: 'hsl(0, 70%, 50%)',
    duration: 25
  },
  {
    id: 'solfeggio-417',
    name: '417 Hz Transmutation',
    description: 'Facilitate positive change and clear negative energy',
    baseFreq: 417,
    beatFreq: 6,
    category: 'healing',
    icon: Waves,
    color: 'hsl(25, 75%, 50%)',
    duration: 25
  },
  {
    id: 'solfeggio-528',
    name: '528 Hz DNA Repair',
    description: 'Miracle tone for transformation and DNA activation',
    baseFreq: 528,
    beatFreq: 8,
    category: 'healing',
    icon: Heart,
    color: 'hsl(120, 70%, 45%)',
    duration: 30
  },
  {
    id: 'solfeggio-639',
    name: '639 Hz Relationships',
    description: 'Harmonize connections and communication',
    baseFreq: 639,
    beatFreq: 8,
    category: 'healing',
    icon: Heart,
    color: 'hsl(200, 65%, 50%)',
    duration: 25
  },
  {
    id: 'solfeggio-741',
    name: '741 Hz Awakening',
    description: 'Spiritual awakening and intuition activation',
    baseFreq: 741,
    beatFreq: 10,
    category: 'healing',
    icon: Eye,
    color: 'hsl(260, 65%, 55%)',
    duration: 25
  },
  {
    id: 'solfeggio-852',
    name: '852 Hz Spiritual Order',
    description: 'Return to spiritual balance and third eye activation',
    baseFreq: 852,
    beatFreq: 10,
    category: 'healing',
    icon: Eye,
    color: 'hsl(280, 70%, 55%)',
    duration: 25
  },
  {
    id: 'solfeggio-963',
    name: '963 Hz Divine Connection',
    description: 'Activate pineal gland and connect to Source',
    baseFreq: 963,
    beatFreq: 6,
    category: 'healing',
    icon: Sun,
    color: 'hsl(45, 90%, 60%)',
    duration: 30
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 15-CHAKRA SYSTEM (Energetic Synthesis)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'chakra-1-root',
    name: 'Chakra 1: Root (Red)',
    description: 'Grounding, survival, connection to Earth',
    baseFreq: 194.18,
    beatFreq: 4,
    category: 'chakra',
    icon: Heart,
    color: 'hsl(0, 80%, 50%)',
    duration: 15
  },
  {
    id: 'chakra-2-sacral',
    name: 'Chakra 2: Sacral (Orange)',
    description: 'Creativity, sexuality, emotional flow',
    baseFreq: 210.42,
    beatFreq: 5,
    category: 'chakra',
    icon: Heart,
    color: 'hsl(25, 85%, 55%)',
    duration: 15
  },
  {
    id: 'chakra-3-solar',
    name: 'Chakra 3: Solar Plexus (Yellow)',
    description: 'Personal power, willpower, manifestation',
    baseFreq: 126.22,
    beatFreq: 6,
    category: 'chakra',
    icon: Sun,
    color: 'hsl(45, 90%, 55%)',
    duration: 15
  },
  {
    id: 'chakra-4-heart',
    name: 'Chakra 4: Heart (Green)',
    description: 'Unconditional love, compassion, healing',
    baseFreq: 341.3,
    beatFreq: 8,
    category: 'chakra',
    icon: Heart,
    color: 'hsl(120, 70%, 45%)',
    duration: 15
  },
  {
    id: 'chakra-5-throat',
    name: 'Chakra 5: Throat (Blue)',
    description: 'Communication, truth, authentic expression',
    baseFreq: 384,
    beatFreq: 10,
    category: 'chakra',
    icon: Waves,
    color: 'hsl(200, 75%, 50%)',
    duration: 15
  },
  {
    id: 'chakra-6-third-eye',
    name: 'Chakra 6: Third Eye (Indigo)',
    description: 'Intuition, inner vision, psychic abilities',
    baseFreq: 426.7,
    beatFreq: 10,
    category: 'chakra',
    icon: Eye,
    color: 'hsl(240, 70%, 50%)',
    duration: 15
  },
  {
    id: 'chakra-7-crown',
    name: 'Chakra 7: Crown (Violet)',
    description: 'Divine connection, spiritual wisdom, enlightenment',
    baseFreq: 480,
    beatFreq: 6,
    category: 'chakra',
    icon: Sun,
    color: 'hsl(280, 75%, 60%)',
    duration: 15
  },
  {
    id: 'chakra-8-thymus',
    name: 'Chakra 8: Higher Heart (Aqua)',
    description: 'Permanent seed atom, higher self connection',
    baseFreq: 512,
    beatFreq: 7.83,
    category: 'chakra',
    icon: Heart,
    color: 'hsl(175, 70%, 55%)',
    duration: 20
  },
  {
    id: 'chakra-9-thalamus',
    name: 'Chakra 9: Atomic Doorway (Silver)',
    description: 'Thalamus activation, interdimensional access',
    baseFreq: 544,
    beatFreq: 8,
    category: 'chakra',
    icon: Eye,
    color: 'hsl(0, 0%, 75%)',
    duration: 20
  },
  {
    id: 'chakra-10-galactic',
    name: 'Chakra 10: Solar Star (Gold)',
    description: 'Galactic consciousness, solar logos connection',
    baseFreq: 576,
    beatFreq: 10,
    category: 'chakra',
    icon: Sun,
    color: 'hsl(40, 90%, 55%)',
    duration: 20
  },
  {
    id: 'chakra-11-galactic-center',
    name: 'Chakra 11: Galactic Center (Silver-Gold)',
    description: 'Connection to galactic core consciousness',
    baseFreq: 640,
    beatFreq: 12,
    category: 'chakra',
    icon: Activity,
    color: 'hsl(45, 50%, 70%)',
    duration: 20
  },
  {
    id: 'chakra-12-universal',
    name: 'Chakra 12: Universal (Platinum)',
    description: 'Universal consciousness, Avatar identity',
    baseFreq: 720,
    beatFreq: 12,
    category: 'chakra',
    icon: Sun,
    color: 'hsl(200, 20%, 85%)',
    duration: 25
  },
  {
    id: 'chakra-13-earth-core',
    name: 'Chakra 13: Earth Star (Pale Turquoise)',
    description: 'Deep Earth connection, crystalline core',
    baseFreq: 160,
    beatFreq: 3,
    category: 'chakra',
    icon: Heart,
    color: 'hsl(175, 50%, 65%)',
    duration: 20
  },
  {
    id: 'chakra-14-founder',
    name: 'Chakra 14: Founder Ray (Pale Gold)',
    description: 'Founder consciousness, original template',
    baseFreq: 800,
    beatFreq: 14,
    category: 'chakra',
    icon: Sun,
    color: 'hsl(45, 80%, 75%)',
    duration: 25
  },
  {
    id: 'chakra-15-cosmic',
    name: 'Chakra 15: Cosmic (Crystalline)',
    description: 'Cosmic Christ consciousness, God-Source',
    baseFreq: 888,
    beatFreq: 15,
    category: 'chakra',
    icon: Sun,
    color: 'hsl(300, 30%, 90%)',
    duration: 30
  },

  // ══════════════════════════════════════════════════════════════════════════
  // EARTH RESONANCES & SPIRITUAL PRACTICES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'schumann-earth',
    name: 'Schumann Resonance 7.83 Hz',
    description: "Earth's heartbeat frequency for grounding",
    baseFreq: 150,
    beatFreq: 7.83,
    category: 'healing',
    icon: Heart,
    color: 'hsl(120, 60%, 50%)',
    duration: 30
  },
  {
    id: 'schumann-enhanced',
    name: 'Schumann 14.3 Hz (2nd Harmonic)',
    description: "Enhanced Earth connection, second harmonic",
    baseFreq: 180,
    beatFreq: 14.3,
    category: 'healing',
    icon: Heart,
    color: 'hsl(130, 55%, 45%)',
    duration: 25
  },
  {
    id: '12d-shield',
    name: '12D Shield Activation',
    description: 'Frequency for 12D Diamond Shield protection',
    baseFreq: 432,
    beatFreq: 12,
    category: 'meditation',
    icon: Activity,
    color: 'hsl(55, 85%, 60%)',
    duration: 20
  },
  {
    id: 'merkaba-activation',
    name: 'Merkaba Activation',
    description: 'Lightbody vehicle activation frequencies',
    baseFreq: 288,
    beatFreq: 8,
    category: 'meditation',
    icon: Activity,
    color: 'hsl(280, 80%, 65%)',
    duration: 30
  },
  {
    id: 'kundalini-awakening',
    name: 'Kundalini Activation',
    description: 'Gentle kundalini energy awakening',
    baseFreq: 136.1,
    beatFreq: 7.83,
    category: 'meditation',
    icon: Activity,
    color: 'hsl(350, 80%, 55%)',
    duration: 35
  },
  {
    id: 'entity-clearing',
    name: 'Entity Clearing',
    description: 'Frequency support for energetic clearing work',
    baseFreq: 999,
    beatFreq: 40,
    category: 'healing',
    icon: Zap,
    color: 'hsl(0, 0%, 100%)',
    duration: 15
  },
  {
    id: 'dna-activation',
    name: 'DNA Strand Activation',
    description: 'Support 12-strand DNA template activation',
    baseFreq: 528,
    beatFreq: 12,
    category: 'healing',
    icon: Activity,
    color: 'hsl(270, 75%, 60%)',
    duration: 30
  },
  {
    id: 'gsf-alignment',
    name: 'GSF Alignment',
    description: 'God-Sovereign-Free behavioral alignment',
    baseFreq: 432,
    beatFreq: 7.83,
    category: 'meditation',
    icon: Sun,
    color: 'hsl(45, 95%, 65%)',
    duration: 25
  }
];

export function AdvancedBinauralBeats() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreset, setCurrentPreset] = useState<BinauralBeatPreset>(binauralPresets[0]);
  const [customFreqs, setCustomFreqs] = useState({ base: 200, beat: 10 });
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [sessionDuration, setSessionDuration] = useState(30); // minutes
  const [useCustom, setUseCustom] = useState(false);

  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    volume: 50,
    leftBalance: 50,
    rightBalance: 50,
    fadeInDuration: 5,
    fadeOutDuration: 5,
    enableReverb: false,
    reverbLevel: 30,
    enableLowPass: false,
    lowPassFreq: 1000
  });

  // Audio context refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const leftGainRef = useRef<GainNode | null>(null);
  const rightGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const reverbRef = useRef<ConvolverNode | null>(null);
  const lowPassRef = useRef<BiquadFilterNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Create reverb impulse response
  const createReverbImpulse = useCallback((duration: number, decay: number) => {
    if (!audioContextRef.current) return null;

    const sampleRate = audioContextRef.current.sampleRate;
    const length = sampleRate * duration;
    const impulse = audioContextRef.current.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const n = length - i;
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(n / length, decay);
      }
    }

    return impulse;
  }, []);

  // Start binaural beats with advanced audio processing
  const startBinauralBeats = useCallback(async () => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    // Stop any existing audio
    stopBinauralBeats();

    const baseFreq = useCustom ? customFreqs.base : currentPreset.baseFreq;
    const beatFreq = useCustom ? customFreqs.beat : currentPreset.beatFreq;

    // Create oscillators
    leftOscillatorRef.current = ctx.createOscillator();
    rightOscillatorRef.current = ctx.createOscillator();

    // Create gain nodes
    leftGainRef.current = ctx.createGain();
    rightGainRef.current = ctx.createGain();
    masterGainRef.current = ctx.createGain();

    // Create effects
    if (audioSettings.enableLowPass) {
      lowPassRef.current = ctx.createBiquadFilter();
      lowPassRef.current.type = 'lowpass';
      lowPassRef.current.frequency.setValueAtTime(audioSettings.lowPassFreq, ctx.currentTime);
    }

    if (audioSettings.enableReverb) {
      reverbRef.current = ctx.createConvolver();
      const impulse = createReverbImpulse(2, 2);
      if (impulse) {
        reverbRef.current.buffer = impulse;
      }
    }

    // Set frequencies (binaural beat = difference between left and right)
    leftOscillatorRef.current.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    rightOscillatorRef.current.frequency.setValueAtTime(baseFreq + beatFreq, ctx.currentTime);

    // Set waveform (sine wave for pure tones)
    leftOscillatorRef.current.type = 'sine';
    rightOscillatorRef.current.type = 'sine';

    // Set initial volume to 0 for fade-in
    leftGainRef.current.gain.setValueAtTime(0, ctx.currentTime);
    rightGainRef.current.gain.setValueAtTime(0, ctx.currentTime);
    masterGainRef.current.gain.setValueAtTime(audioSettings.volume / 100, ctx.currentTime);

    // Create audio routing with stereo separation
    const merger = ctx.createChannelMerger(2);
    const splitter = ctx.createChannelSplitter(2);

    // Connect left channel
    leftOscillatorRef.current.connect(leftGainRef.current);
    leftGainRef.current.connect(merger, 0, 0);

    // Connect right channel  
    rightOscillatorRef.current.connect(rightGainRef.current);
    rightGainRef.current.connect(merger, 0, 1);

    // Apply effects chain
    let currentNode: AudioNode = merger;

    if (audioSettings.enableLowPass && lowPassRef.current) {
      currentNode.connect(lowPassRef.current);
      currentNode = lowPassRef.current;
    }

    if (audioSettings.enableReverb && reverbRef.current) {
      const reverbGain = ctx.createGain();
      reverbGain.gain.setValueAtTime(audioSettings.reverbLevel / 100, ctx.currentTime);

      const dryGain = ctx.createGain();
      dryGain.gain.setValueAtTime(1 - (audioSettings.reverbLevel / 100), ctx.currentTime);

      currentNode.connect(reverbRef.current);
      reverbRef.current.connect(reverbGain);

      currentNode.connect(dryGain);

      const reverbMerger = ctx.createChannelMerger(2);
      reverbGain.connect(reverbMerger);
      dryGain.connect(reverbMerger);

      currentNode = reverbMerger;
    }

    currentNode.connect(masterGainRef.current);
    masterGainRef.current.connect(ctx.destination);

    // Start oscillators
    leftOscillatorRef.current.start();
    rightOscillatorRef.current.start();

    // Fade in
    const fadeInTime = audioSettings.fadeInDuration;
    const targetLeftVolume = (audioSettings.leftBalance / 100) * 0.5;
    const targetRightVolume = (audioSettings.rightBalance / 100) * 0.5;

    leftGainRef.current.gain.linearRampToValueAtTime(targetLeftVolume, ctx.currentTime + fadeInTime);
    rightGainRef.current.gain.linearRampToValueAtTime(targetRightVolume, ctx.currentTime + fadeInTime);

    // Set up timer for session
    const duration = (useCustom ? sessionDuration : currentPreset.duration || sessionDuration) * 60 * 1000;
    setTimeRemaining(duration / 1000);

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          stopBinauralBeats();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

  }, [audioSettings, currentPreset, customFreqs, useCustom, sessionDuration, createReverbImpulse]);

  const stopBinauralBeats = useCallback(() => {
    if (audioContextRef.current && leftOscillatorRef.current && rightOscillatorRef.current) {
      const ctx = audioContextRef.current;
      const fadeOutTime = audioSettings.fadeOutDuration;

      // Fade out
      if (leftGainRef.current && rightGainRef.current) {
        leftGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeOutTime);
        rightGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeOutTime);
      }

      // Stop oscillators after fade out
      setTimeout(() => {
        if (leftOscillatorRef.current) {
          leftOscillatorRef.current.stop();
          leftOscillatorRef.current = null;
        }
        if (rightOscillatorRef.current) {
          rightOscillatorRef.current.stop();
          rightOscillatorRef.current = null;
        }
      }, fadeOutTime * 1000);
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setTimeRemaining(null);
    setIsPlaying(false);
  }, [audioSettings.fadeOutDuration]);

  const togglePlayback = async () => {
    if (isPlaying) {
      stopBinauralBeats();
    } else {
      setIsPlaying(true);
      await startBinauralBeats();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meditation': return Brain;
      case 'focus': return Zap;
      case 'sleep': return Moon;
      case 'healing': return Heart;
      case 'chakra': return Eye;
      default: return Waves;
    }
  };

  const getProgressPercentage = () => {
    if (!timeRemaining) return 0;
    const totalDuration = (useCustom ? sessionDuration : currentPreset.duration || sessionDuration) * 60;
    return ((totalDuration - timeRemaining) / totalDuration) * 100;
  };

  return (
    <div className="space-y-6">
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center justify-between">
            <div className="flex items-center">
              <Waves className="w-6 h-6 mr-3" />
              Advanced Binaural Beats
            </div>
            <Badge variant="outline" className="border-sacred-gold/50 text-sacred-gold">
              Precision Audio
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="presets" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="presets">Presets</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Presets Tab */}
            <TabsContent value="presets" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {binauralPresets.map((preset) => {
                  const Icon = preset.icon;
                  return (
                    <Card
                      key={preset.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${currentPreset.id === preset.id && !useCustom
                          ? 'ring-2 ring-sacred-gold bg-cosmic-800'
                          : 'hover:bg-cosmic-800'
                        }`}
                      onClick={() => {
                        setCurrentPreset(preset);
                        setUseCustom(false);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <Icon
                            className="w-5 h-5 mr-2"
                            style={{ color: preset.color }}
                          />
                          <h3 className="font-semibold text-white">{preset.name}</h3>
                        </div>
                        <p className="text-cosmic-300 text-sm mb-3">{preset.description}</p>
                        <div className="flex justify-between text-xs text-cosmic-400">
                          <span>{preset.baseFreq} Hz</span>
                          <span>{preset.beatFreq} Hz beat</span>
                          <span>{preset.duration}m</span>
                        </div>
                        <Badge
                          variant="outline"
                          className="mt-2 text-xs"
                          style={{ borderColor: preset.color, color: preset.color }}
                        >
                          {preset.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Custom Tab */}
            <TabsContent value="custom" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-cosmic-300 mb-2 block">
                    Base Frequency: {customFreqs.base} Hz
                  </label>
                  <Slider
                    value={[customFreqs.base]}
                    onValueChange={([value]) => setCustomFreqs(prev => ({ ...prev, base: value }))}
                    min={80}
                    max={1000}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-cosmic-300 mb-2 block">
                    Beat Frequency: {customFreqs.beat} Hz
                  </label>
                  <Slider
                    value={[customFreqs.beat]}
                    onValueChange={([value]) => setCustomFreqs(prev => ({ ...prev, beat: value }))}
                    min={0.5}
                    max={100}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-cosmic-300 mb-2 block">
                    Session Duration: {sessionDuration} minutes
                  </label>
                  <Slider
                    value={[sessionDuration]}
                    onValueChange={([value]) => setSessionDuration(value)}
                    min={5}
                    max={120}
                    step={5}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={() => setUseCustom(true)}
                  variant={useCustom ? "default" : "outline"}
                  className="w-full sacred-button"
                >
                  Use Custom Settings
                </Button>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-sacred-gold">Volume & Balance</h3>

                  <div>
                    <label className="text-sm font-medium text-cosmic-300 mb-2 block">
                      Master Volume: {audioSettings.volume}%
                    </label>
                    <Slider
                      value={[audioSettings.volume]}
                      onValueChange={([value]) => setAudioSettings(prev => ({ ...prev, volume: value }))}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-cosmic-300 mb-2 block">
                      Left Balance: {audioSettings.leftBalance}%
                    </label>
                    <Slider
                      value={[audioSettings.leftBalance]}
                      onValueChange={([value]) => setAudioSettings(prev => ({ ...prev, leftBalance: value }))}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-cosmic-300 mb-2 block">
                      Right Balance: {audioSettings.rightBalance}%
                    </label>
                    <Slider
                      value={[audioSettings.rightBalance]}
                      onValueChange={([value]) => setAudioSettings(prev => ({ ...prev, rightBalance: value }))}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-sacred-gold">Effects & Timing</h3>

                  <div>
                    <label className="text-sm font-medium text-cosmic-300 mb-2 block">
                      Fade In: {audioSettings.fadeInDuration}s
                    </label>
                    <Slider
                      value={[audioSettings.fadeInDuration]}
                      onValueChange={([value]) => setAudioSettings(prev => ({ ...prev, fadeInDuration: value }))}
                      min={0}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-cosmic-300 mb-2 block">
                      Fade Out: {audioSettings.fadeOutDuration}s
                    </label>
                    <Slider
                      value={[audioSettings.fadeOutDuration]}
                      onValueChange={([value]) => setAudioSettings(prev => ({ ...prev, fadeOutDuration: value }))}
                      min={0}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-cosmic-300">Enable Reverb</span>
                    <Button
                      variant={audioSettings.enableReverb ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAudioSettings(prev => ({ ...prev, enableReverb: !prev.enableReverb }))}
                    >
                      {audioSettings.enableReverb ? 'On' : 'Off'}
                    </Button>
                  </div>

                  {audioSettings.enableReverb && (
                    <div>
                      <label className="text-sm font-medium text-cosmic-300 mb-2 block">
                        Reverb Level: {audioSettings.reverbLevel}%
                      </label>
                      <Slider
                        value={[audioSettings.reverbLevel]}
                        onValueChange={([value]) => setAudioSettings(prev => ({ ...prev, reverbLevel: value }))}
                        min={0}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-cosmic-300">Low Pass Filter</span>
                    <Button
                      variant={audioSettings.enableLowPass ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAudioSettings(prev => ({ ...prev, enableLowPass: !prev.enableLowPass }))}
                    >
                      {audioSettings.enableLowPass ? 'On' : 'Off'}
                    </Button>
                  </div>

                  {audioSettings.enableLowPass && (
                    <div>
                      <label className="text-sm font-medium text-cosmic-300 mb-2 block">
                        Cutoff Frequency: {audioSettings.lowPassFreq} Hz
                      </label>
                      <Slider
                        value={[audioSettings.lowPassFreq]}
                        onValueChange={([value]) => setAudioSettings(prev => ({ ...prev, lowPassFreq: value }))}
                        min={200}
                        max={8000}
                        step={100}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Playback Controls */}
      <Card className="sacred-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">
                {useCustom ? 'Custom Session' : currentPreset.name}
              </h3>
              <p className="text-cosmic-300 text-sm">
                {useCustom
                  ? `${customFreqs.base} Hz base, ${customFreqs.beat} Hz beat`
                  : `${currentPreset.baseFreq} Hz base, ${currentPreset.beatFreq} Hz beat`
                }
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={togglePlayback}
                size="lg"
                className="sacred-button"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              {isPlaying && (
                <Button
                  onClick={stopBinauralBeats}
                  variant="outline"
                  size="lg"
                >
                  <Square className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Progress and Time Display */}
          {timeRemaining !== null && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-cosmic-300">
                <span>Session Progress</span>
                <span>{formatTime(timeRemaining)} remaining</span>
              </div>
              <Progress value={getProgressPercentage()} className="w-full" />
            </div>
          )}

          {/* Quick Volume Control */}
          <div className="flex items-center space-x-4 mt-4">
            <Volume2 className="w-4 h-4 text-cosmic-300" />
            <Slider
              value={[audioSettings.volume]}
              onValueChange={([value]) => setAudioSettings(prev => ({ ...prev, volume: value }))}
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-cosmic-300 w-12">{audioSettings.volume}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}