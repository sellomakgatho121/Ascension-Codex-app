import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Moon,
  Sun,
  Globe,
  Clock,
  Zap,
  Sparkles,
  Calendar,
  MapPin,
  Loader2,
  Activity,
  Wind,
  Thermometer
} from 'lucide-react';
import { AstronomyService, WeatherService, MeditationTimingService } from '@/lib/api-services';
import type { AstronomyData, WeatherData, MeditationTiming } from '@/lib/api-services';

const GridEnergyVisualizer = ({ level }: { level: number }) => {
  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Hexagonal Grid Base */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid Lines */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.line
            key={i}
            x1="100" y1="100"
            x2={100 + 80 * Math.cos(angle * Math.PI / 180)}
            y2={100 + 80 * Math.sin(angle * Math.PI / 180)}
            stroke="rgba(255, 215, 0, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Pulsing Concentric Circles */}
        {[0.4, 0.7, 1].map((r, i) => (
          <motion.circle
            key={i}
            cx="100" cy="100"
            r={80 * r}
            fill="none"
            stroke="rgba(255, 215, 0, 0.2)"
            strokeWidth="0.5"
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Energy Nodes */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const r = 70;
          const x = 100 + r * Math.cos(angle);
          const y = 100 + r * Math.sin(angle);
          return (
            <motion.circle
              key={i}
              cx={x} cy={y} r="2"
              fill={level > 70 ? "#4ade80" : "#fbbf24"}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
                filter: ["none", "url(#glow)", "none"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          );
        })}

        {/* Central Core */}
        <motion.circle
          cx="100" cy="100" r="15"
          fill="url(#coreGradient)"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <defs>
          <radialGradient id="coreGradient">
            <stop offset="0%" stopColor="#ffb600" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </radialGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
        <span className="text-3xl font-sacred font-bold text-white mb-1">{level}%</span>
        <span className="text-[10px] uppercase font-bold text-sacred-gold tracking-widest">Grid Stability</span>
      </div>
    </div>
  );
};

export function PlanetaryGridMonitor() {
  const [astronomyData, setAstronomyData] = useState<AstronomyData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [meditationTiming, setMeditationTiming] = useState<MeditationTiming | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [gridLevel, setGridLevel] = useState(88);

  useEffect(() => {
    loadPlanetaryData();
    const interval = setInterval(loadPlanetaryData, 300000); // Update every 5 minutes

    // Simulate slight grid fluctuations
    const gridInterval = setInterval(() => {
      setGridLevel(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.min(100, Math.max(70, prev + delta));
      });
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(gridInterval);
    };
  }, []);

  const loadPlanetaryData = async () => {
    setLoading(true);
    try {
      const coords = await getUserLocation();
      setLocation(coords);

      const [astronomy, weather, timing] = await Promise.all([
        AstronomyService.getCurrentAstronomyData(coords?.lat, coords?.lon),
        WeatherService.getWeatherForMeditation(coords?.lat, coords?.lon),
        MeditationTimingService.getOptimalMeditationTime(coords?.lat, coords?.lon)
      ]);

      setAstronomyData(astronomy);
      setWeatherData(weather);
      setMeditationTiming(timing);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error loading planetary data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = (): Promise<{ lat: number; lon: number } | null> => {
    return new Promise((resolve) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          () => resolve(null),
          { timeout: 5000 }
        );
      } else {
        resolve(null);
      }
    });
  };

  const getMoonPhaseIcon = (phase: string) => {
    const phases = {
      'New Moon': '🌑', 'Waxing Crescent': '🌒', 'First Quarter': '🌓', 'Waxing Gibbous': '🌔',
      'Full Moon': '🌕', 'Waning Gibbous': '🌖', 'Last Quarter': '🌗', 'Waning Crescent': '🌘'
    };
    return phases[phase] || '🌙';
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-12 glass-card rounded-2xl">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-sacred-gold mx-auto mb-6" />
          <p className="text-cosmic-200 font-sacred text-xl">Synchronizing with Planetary Grid...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Dashboard Top Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Grid Stability Monitor */}
        <Card className="glass-card border-sacred-gold/10 lg:col-span-2 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-sacred text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-sacred-gold" />
                Global Planetary Grid
              </CardTitle>
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-500/5">
                ACTIVE
              </Badge>
            </div>
            <p className="text-xs text-cosmic-300">Live monitoring of planetary energy templates</p>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-8 py-6">
            <div className="w-full md:w-1/2">
              <GridEnergyVisualizer level={gridLevel} />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] text-cosmic-400 font-bold uppercase mb-1">Resonance</p>
                  <p className="text-lg font-bold text-sacred-gold">7.83 Hz</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] text-cosmic-400 font-bold uppercase mb-1">Activity</p>
                  <p className="text-lg font-bold text-blue-400">Moderate</p>
                </div>
              </div>
              <div className="p-4 bg-sacred-gold/5 rounded-xl border border-sacred-gold/10">
                <p className="text-xs text-sacred-gold font-bold mb-2 uppercase tracking-wider">Current Update:</p>
                <p className="text-sm text-cosmic-100 leading-relaxed italic">
                  "Organic grid structures showing increased stability in southern hemisphere sectors. Christos alignment optimal."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card className="glass-card border-white/5 flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Optimal Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-sacred-gold" />
                  <span className="text-sm font-medium">12D Shielding</span>
                </div>
                <span className="text-xs text-emerald-400">Optimal</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium">DNA Activation</span>
                </div>
                <span className="text-xs text-amber-400">Favorable</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium">Grid Work</span>
                </div>
                <span className="text-xs text-emerald-400">Highly Optimal</span>
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-sacred-gold text-cosmic-900 font-bold hover:scale-[1.02] transition-all"
              onClick={loadPlanetaryData}
            >
              <Zap className="w-4 h-4 mr-2" />
              Sync Grid
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Planetary Details Row */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lunar */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-white/5 h-full group hover:bg-white/5 transition-all">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-cosmic-300 flex items-center gap-2">
                <Moon className="w-4 h-4 text-blue-300" />
                Lunar Cycle
              </CardTitle>
              <span className="text-2xl">{astronomyData && getMoonPhaseIcon(astronomyData.moonPhase)}</span>
            </CardHeader>
            <CardContent>
              {astronomyData && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xl font-sacred font-bold text-white mb-1">{astronomyData.moonPhase}</p>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${astronomyData.moonIllumination * 100}%` }}
                        className="h-full bg-blue-400"
                      />
                    </div>
                    <p className="text-[10px] text-cosmic-400 font-bold mt-1">ILLUMINATION: {Math.round(astronomyData.moonIllumination * 100)}%</p>
                  </div>
                  <p className="text-sm text-cosmic-200 border-l-2 border-blue-400/30 pl-3 py-1 italic">
                    {astronomyData.moonPhase.includes('Full') ? 'Peak manifestation energy available.' : 'Internal alignment recommended.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Solar/Atmospheric */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-white/5 h-full group hover:bg-white/5 transition-all">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-cosmic-300 flex items-center gap-2">
                <Sun className="w-4 h-4 text-sacred-gold" />
                Solar Influence
              </CardTitle>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
              </div>
            </CardHeader>
            <CardContent>
              {astronomyData && weatherData && (
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-cosmic-400 font-bold uppercase">Temperature</p>
                      <p className="text-2xl font-sacred font-bold text-white">{weatherData.temperature}°C</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-cosmic-400 font-bold uppercase">Condition</p>
                      <p className="text-sm font-bold text-sacred-gold capitalize">{weatherData.condition}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-[10px] border-white/5">SUNRISE {astronomyData.sunrise}</Badge>
                    <Badge variant="outline" className="text-[10px] border-white/5">SUNSET {astronomyData.sunset}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Global Position */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-white/5 h-full group hover:bg-white/5 transition-all">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-cosmic-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Station Identity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                  <p className="text-[10px] text-emerald-400 font-bold uppercase mb-1">Local Coordinates</p>
                  <p className="text-lg font-mono text-white">
                    {location ? `${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}` : 'UNKNOWN'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-cosmic-500 uppercase tracking-widest">
                  <Activity className="w-3 h-3" />
                  LAST SYNC: {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}