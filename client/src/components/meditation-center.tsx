import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX,
  Settings,
  Timer,
  Heart,
  Waves,
  Mountain,
  Sparkles
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MeditationSession {
  id: string;
  name: string;
  duration: number;
  type: 'guided' | 'silent' | 'binaural';
  description: string;
  frequency?: string;
}

export function MeditationCenter() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [volume, setVolume] = useState([50]);
  const [customDuration, setCustomDuration] = useState([10]);
  const [breathPattern, setBreathPattern] = useState('4-7-8');
  const intervalRef = useRef<NodeJS.Timeout>();

  const sessions: MeditationSession[] = [
    {
      id: 'protection-shield',
      name: '12D Shield Protection',
      duration: 900, // 15 minutes
      type: 'guided',
      description: 'Guided meditation for building your 12-dimensional protection shield',
    },
    {
      id: 'chakra-clearing',
      name: 'Chakra Clearing',
      duration: 1200, // 20 minutes
      type: 'guided',
      description: 'Clear and balance all 15 chakras with guided visualization',
    },
    {
      id: 'gsf-activation',
      name: 'GSF Activation',
      duration: 600, // 10 minutes
      type: 'guided',
      description: 'Activate God Sovereign Free consciousness principles',
    },
    {
      id: 'silent-meditation',
      name: 'Silent Meditation',
      duration: customDuration[0] * 60,
      type: 'silent',
      description: 'Pure silence for deep inner connection',
    },
    {
      id: 'theta-waves',
      name: 'Theta Wave Meditation',
      duration: 1800, // 30 minutes
      type: 'binaural',
      frequency: '6Hz',
      description: 'Deep meditative state with theta frequency binaural beats',
    }
  ];

  const breathingPatterns = [
    { id: '4-7-8', name: '4-7-8 Breathing', inhale: 4, hold: 7, exhale: 8 },
    { id: '4-4-4', name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4 },
    { id: '6-2-6', name: 'Calm Breathing', inhale: 6, hold: 2, exhale: 6 }
  ];

  useEffect(() => {
    if (isPlaying && selectedSession) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= selectedSession.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, selectedSession]);

  const startSession = (session: MeditationSession) => {
    setSelectedSession(session);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const stopSession = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setSelectedSession(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'guided': return <Heart className="w-4 h-4" />;
      case 'binaural': return <Waves className="w-4 h-4" />;
      case 'silent': return <Mountain className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Session Player */}
      {selectedSession && (
        <Card className="sacred-card border-sacred-gold/40">
          <CardHeader>
            <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
              {getSessionIcon(selectedSession.type)}
              <span className="ml-2">{selectedSession.name}</span>
              <Badge variant="outline" className="ml-auto border-sacred-gold/40 text-sacred-gold">
                {selectedSession.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-cosmic-300 text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(selectedSession.duration)}</span>
              </div>
              <Progress 
                value={(currentTime / selectedSession.duration) * 100} 
                className="h-2"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={togglePlayPause}
                className="w-16 h-16 rounded-full border-sacred-gold/40 hover:bg-sacred-gold/10"
              >
                {isPlaying ? 
                  <Pause className="w-6 h-6 text-sacred-gold" /> : 
                  <Play className="w-6 h-6 text-sacred-gold" />
                }
              </Button>
              <Button
                variant="outline"
                onClick={stopSession}
                className="border-cosmic-600 hover:border-red-400/50"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-4">
              <VolumeX className="w-4 h-4 text-cosmic-400" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
              <Volume2 className="w-4 h-4 text-cosmic-400" />
              <span className="text-cosmic-300 text-sm w-8">{volume[0]}%</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session Selection */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="text-lg font-sacred text-sacred-gold">
              Guided Meditations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.filter(s => s.type === 'guided').map((session) => (
              <div
                key={session.id}
                className="p-3 rounded-lg border border-cosmic-700 hover:border-sacred-gold/40 transition-colors cursor-pointer"
                onClick={() => startSession(session)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{session.name}</h4>
                  <span className="text-cosmic-400 text-sm">{formatTime(session.duration)}</span>
                </div>
                <p className="text-cosmic-300 text-sm">{session.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="text-lg font-sacred text-sacred-gold">
              Practice Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Custom Silent Meditation */}
            <div className="p-3 rounded-lg border border-cosmic-700">
              <h4 className="font-medium text-white mb-2">Silent Meditation</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-cosmic-300 text-sm">Duration</span>
                  <span className="text-sacred-gold text-sm">{customDuration[0]} min</span>
                </div>
                <Slider
                  value={customDuration}
                  onValueChange={setCustomDuration}
                  max={60}
                  min={5}
                  step={5}
                />
                <Button 
                  size="sm" 
                  onClick={() => startSession({...sessions.find(s => s.id === 'silent-meditation')!, duration: customDuration[0] * 60})}
                  className="w-full"
                >
                  Start Silent Session
                </Button>
              </div>
            </div>

            {/* Binaural Beats */}
            <div className="p-3 rounded-lg border border-cosmic-700">
              <h4 className="font-medium text-white mb-2">Binaural Beats</h4>
              <div className="space-y-2">
                {sessions.filter(s => s.type === 'binaural').map((session) => (
                  <Button
                    key={session.id}
                    variant="outline"
                    size="sm"
                    onClick={() => startSession(session)}
                    className="w-full justify-between border-cosmic-600"
                  >
                    <span>{session.frequency} - {session.name}</span>
                    <Waves className="w-3 h-3" />
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Breathing Exercise */}
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Breathing Exercises
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {breathingPatterns.map((pattern) => (
              <Button
                key={pattern.id}
                variant="outline"
                className="h-auto p-4 flex-col border-cosmic-600 hover:border-sacred-gold/40"
              >
                <h4 className="font-medium text-white mb-1">{pattern.name}</h4>
                <p className="text-cosmic-300 text-xs">
                  In: {pattern.inhale}s • Hold: {pattern.hold}s • Out: {pattern.exhale}s
                </p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}