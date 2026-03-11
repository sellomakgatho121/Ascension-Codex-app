import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Bell, 
  Volume2, 
  VolumeX,
  Timer,
  Circle,
  Settings,
  Save
} from "lucide-react";

interface TimerPreset {
  id: string;
  name: string;
  duration: number; // in minutes
  intervals?: number[]; // bell intervals in minutes
  type: 'simple' | 'interval' | 'guided';
  description: string;
}

interface TimerState {
  totalTime: number; // in seconds
  remainingTime: number;
  isRunning: boolean;
  isPaused: boolean;
  currentPhase: string;
}

export function MeditationTimer() {
  const [timerState, setTimerState] = useState<TimerState>({
    totalTime: 1200, // 20 minutes default
    remainingTime: 1200,
    isRunning: false,
    isPaused: false,
    currentPhase: 'preparation'
  });

  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [customDuration, setCustomDuration] = useState(20);
  const [bellVolume, setBellVolume] = useState([50]);
  const [bellEnabled, setBellEnabled] = useState(true);
  const [intervalBells, setIntervalBells] = useState<number[]>([5, 10, 15]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const presets: TimerPreset[] = [
    {
      id: 'basic-meditation',
      name: 'Basic Meditation',
      duration: 20,
      type: 'simple',
      description: 'Simple 20-minute meditation session'
    },
    {
      id: '12d-shield',
      name: '12D Shield Building',
      duration: 15,
      intervals: [5, 10],
      type: 'guided',
      description: 'Guided 12D protection shield construction'
    },
    {
      id: 'chakra-clearing',
      name: 'Chakra Clearing',
      duration: 30,
      intervals: [5, 10, 15, 20, 25],
      type: 'interval',
      description: '30-minute chakra system clearing with interval bells'
    },
    {
      id: 'lightbody-activation',
      name: 'Lightbody Activation',
      duration: 25,
      intervals: [7, 14, 21],
      type: 'guided',
      description: 'Lightbody layer activation practice'
    },
    {
      id: 'ra-center',
      name: 'RA Center Ignition',
      duration: 12,
      intervals: [4, 8],
      type: 'guided',
      description: 'RA Center solar hub activation protocol'
    }
  ];

  // Create bell sound using Web Audio API
  const playBell = () => {
    if (!bellEnabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Create bell-like tone
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.5);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(bellVolume[0] / 100, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.5);
  };

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          const newRemainingTime = prev.remainingTime - 1;
          
          // Check for bell intervals
          const elapsedTime = prev.totalTime - newRemainingTime;
          const elapsedMinutes = Math.floor(elapsedTime / 60);
          const prevElapsedMinutes = Math.floor((prev.totalTime - prev.remainingTime) / 60);
          
          if (elapsedMinutes > prevElapsedMinutes && intervalBells.includes(elapsedMinutes)) {
            playBell();
          }
          
          // Timer finished
          if (newRemainingTime <= 0) {
            playBell();
            setTimeout(() => playBell(), 500); // Double bell for completion
            return {
              ...prev,
              remainingTime: 0,
              isRunning: false,
              currentPhase: 'complete'
            };
          }
          
          return {
            ...prev,
            remainingTime: newRemainingTime
          };
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
  }, [timerState.isRunning, timerState.isPaused, intervalBells, bellEnabled, bellVolume]);

  const startTimer = () => {
    if (timerState.isPaused) {
      setTimerState(prev => ({ ...prev, isRunning: true, isPaused: false }));
    } else {
      setTimerState(prev => ({ 
        ...prev, 
        isRunning: true, 
        currentPhase: 'meditation',
        remainingTime: prev.totalTime
      }));
    }
  };

  const pauseTimer = () => {
    setTimerState(prev => ({ ...prev, isRunning: false, isPaused: true }));
  };

  const resetTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      remainingTime: prev.totalTime,
      currentPhase: 'preparation'
    }));
  };

  const selectPreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      const totalSeconds = preset.duration * 60;
      setTimerState(prev => ({
        ...prev,
        totalTime: totalSeconds,
        remainingTime: totalSeconds,
        isRunning: false,
        isPaused: false,
        currentPhase: 'preparation'
      }));
      setSelectedPreset(presetId);
      setCustomDuration(preset.duration);
      if (preset.intervals) {
        setIntervalBells(preset.intervals);
      }
    }
  };

  const setCustomTime = () => {
    const totalSeconds = customDuration * 60;
    setTimerState(prev => ({
      ...prev,
      totalTime: totalSeconds,
      remainingTime: totalSeconds,
      isRunning: false,
      isPaused: false,
      currentPhase: 'preparation'
    }));
    setSelectedPreset('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((timerState.totalTime - timerState.remainingTime) / timerState.totalTime) * 100;
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'preparation': return 'text-blue-400';
      case 'meditation': return 'text-sacred-gold';
      case 'complete': return 'text-green-400';
      default: return 'text-cosmic-300';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-sacred-gold text-center flex items-center justify-center">
            <Timer className="w-6 h-6 mr-2" />
            Meditation Timer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center space-y-4">
            <div className="relative w-48 h-48 mx-auto">
              {/* Progress Circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-cosmic-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray={`${getProgressPercentage() * 2.827} 282.7`}
                  className="text-sacred-gold transition-all duration-1000"
                />
              </svg>
              
              {/* Timer Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-mono font-bold text-sacred-gold">
                  {formatTime(timerState.remainingTime)}
                </div>
                <div className={`text-sm font-medium ${getPhaseColor(timerState.currentPhase)}`}>
                  {timerState.currentPhase.charAt(0).toUpperCase() + timerState.currentPhase.slice(1)}
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center space-x-4">
              {!timerState.isRunning ? (
                <Button
                  onClick={startTimer}
                  className="w-16 h-16 rounded-full sacred-button"
                  size="lg"
                >
                  <Play className="w-6 h-6" />
                </Button>
              ) : (
                <Button
                  onClick={pauseTimer}
                  className="w-16 h-16 rounded-full sacred-button"
                  size="lg"
                >
                  <Pause className="w-6 h-6" />
                </Button>
              )}
              
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
        </CardContent>
      </Card>

      <Tabs defaultValue="presets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-cosmic-700/50">
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="presets" className="space-y-4">
          <div className="grid gap-3">
            {presets.map((preset) => (
              <Card
                key={preset.id}
                className={`sacred-card cursor-pointer transition-all duration-300 ${
                  selectedPreset === preset.id ? 'border-sacred-gold/60 bg-cosmic-700/50' : 'hover:border-sacred-gold/30'
                }`}
                onClick={() => selectPreset(preset.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{preset.name}</h3>
                      <p className="text-sm text-cosmic-300">{preset.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-sacred-gold border-sacred-gold/50">
                        {preset.duration}m
                      </Badge>
                      {preset.intervals && (
                        <div className="text-xs text-cosmic-400 mt-1">
                          Bells: {preset.intervals.join(', ')}m
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card className="sacred-card">
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="duration" className="text-cosmic-100">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(Number(e.target.value))}
                  min="1"
                  max="120"
                  className="mt-1 bg-cosmic-800 border-cosmic-600"
                />
              </div>
              
              <div>
                <Label className="text-cosmic-100">Interval Bells (minutes)</Label>
                <div className="flex gap-2 mt-2">
                  {[5, 10, 15, 20, 25, 30].map((interval) => (
                    <Button
                      key={interval}
                      variant={intervalBells.includes(interval) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (intervalBells.includes(interval)) {
                          setIntervalBells(prev => prev.filter(i => i !== interval));
                        } else {
                          setIntervalBells(prev => [...prev, interval].sort((a, b) => a - b));
                        }
                      }}
                      className="text-xs"
                    >
                      {interval}m
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button onClick={setCustomTime} className="w-full sacred-button">
                <Save className="w-4 h-4 mr-2" />
                Set Custom Timer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="sacred-card">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-cosmic-100 flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Bell Notifications
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBellEnabled(!bellEnabled)}
                  className={bellEnabled ? 'text-sacred-gold border-sacred-gold' : ''}
                >
                  {bellEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>
              
              {bellEnabled && (
                <div>
                  <Label className="text-cosmic-100">Bell Volume</Label>
                  <Slider
                    value={bellVolume}
                    onValueChange={setBellVolume}
                    max={100}
                    step={10}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-cosmic-400 mt-1">
                    <span>Quiet</span>
                    <span>Loud</span>
                  </div>
                </div>
              )}
              
              <Button
                onClick={playBell}
                variant="outline"
                className="w-full border-cosmic-500 text-cosmic-500 hover:bg-cosmic-500 hover:text-white"
              >
                Test Bell Sound
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}