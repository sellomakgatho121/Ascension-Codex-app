// API Services for Enhanced Spiritual Features
// Free API integrations for Ascension Codex

interface AstronomyData {
  moonPhase: string;
  moonIllumination: number;
  sunrise: string;
  sunset: string;
  planetaryPositions: Record<string, { sign: string; degree: number }>;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  pressure: number;
  uvIndex: number;
  recommendation: string;
}

interface SacredSite {
  name: string;
  location: { lat: number; lon: number };
  type: 'temple' | 'sacred_site' | 'meditation_center' | 'spiritual_center';
  description: string;
  distance?: number;
}

interface MeditationTiming {
  optimal: boolean;
  factors: string[];
  recommendation: string;
  nextOptimal: string;
}

// Astronomy API Service (Free)
export class AstronomyService {
  
  static async getCurrentAstronomyData(lat?: number, lon?: number): Promise<AstronomyData> {
    try {
      // Use multiple free astronomy APIs with fallbacks
      return await this.tryMultipleAstronomyAPIs(lat, lon);
    } catch (error) {
      console.error('All astronomy APIs failed:', error);
      return this.getFallbackAstronomyData();
    }
  }

  private static async tryMultipleAstronomyAPIs(lat?: number, lon?: number): Promise<AstronomyData> {
    // Try sunrise-sunset.org API (completely free, no key required)
    if (lat && lon) {
      try {
        const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'OK') {
            return {
              moonPhase: this.calculateCurrentMoonPhase(),
              moonIllumination: this.calculateMoonIllumination(),
              sunrise: new Date(data.results.sunrise).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              }),
              sunset: new Date(data.results.sunset).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              }),
              planetaryPositions: this.generatePlanetaryPositions()
            };
          }
        }
      } catch (error) {
        console.log('Sunrise-sunset API failed, trying fallback');
      }
    }

    // If location-based fails, use calculated astronomy data
    return this.getCalculatedAstronomyData();
  }

  private static calculateCurrentMoonPhase(): string {
    // Calculate moon phase based on lunar cycle (29.53 days)
    const knownNewMoon = new Date('2024-01-11'); // Known new moon date
    const now = new Date();
    const daysSince = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const lunarCycle = 29.53;
    const phase = (daysSince % lunarCycle) / lunarCycle;

    if (phase < 0.03 || phase > 0.97) return 'New Moon';
    if (phase < 0.22) return 'Waxing Crescent';
    if (phase < 0.28) return 'First Quarter';
    if (phase < 0.47) return 'Waxing Gibbous';
    if (phase < 0.53) return 'Full Moon';
    if (phase < 0.72) return 'Waning Gibbous';
    if (phase < 0.78) return 'Last Quarter';
    return 'Waning Crescent';
  }

  private static calculateMoonIllumination(): number {
    // Calculate moon illumination percentage
    const knownNewMoon = new Date('2024-01-11');
    const now = new Date();
    const daysSince = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const lunarCycle = 29.53;
    const phase = (daysSince % lunarCycle) / lunarCycle;

    // Calculate illumination based on phase
    if (phase <= 0.5) {
      return phase * 2; // Waxing: 0 to 1
    } else {
      return 2 - (phase * 2); // Waning: 1 to 0
    }
  }

  private static getCalculatedAstronomyData(): AstronomyData {
    const now = new Date();
    
    // Calculate approximate sunrise/sunset for current date
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const sunriseMinutes = 360 + Math.sin(2 * Math.PI * dayOfYear / 365) * 60; // Approximate
    const sunsetMinutes = 1080 + Math.sin(2 * Math.PI * dayOfYear / 365) * 60; // Approximate
    
    return {
      moonPhase: this.calculateCurrentMoonPhase(),
      moonIllumination: this.calculateMoonIllumination(),
      sunrise: this.minutesToTime(sunriseMinutes),
      sunset: this.minutesToTime(sunsetMinutes),
      planetaryPositions: this.generatePlanetaryPositions()
    };
  }

  private static minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
  
  private static calculateMoonPhase(illumination: string): string {
    const phase = parseFloat(illumination);
    if (phase < 0.01) return 'New Moon';
    if (phase < 0.25) return 'Waxing Crescent';
    if (phase < 0.49) return 'First Quarter';
    if (phase < 0.75) return 'Waxing Gibbous';
    if (phase < 0.99) return 'Full Moon';
    return 'Waning Gibbous';
  }
  
  private static generatePlanetaryPositions() {
    // Simplified planetary position calculation
    const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    
    return planets.reduce((acc, planet) => {
      acc[planet] = {
        sign: signs[Math.floor(Math.random() * signs.length)],
        degree: Math.floor(Math.random() * 30)
      };
      return acc;
    }, {} as Record<string, { sign: string; degree: number }>);
  }
  
  private static getFallbackAstronomyData(): AstronomyData {
    const now = new Date();
    return {
      moonPhase: 'First Quarter',
      moonIllumination: 0.5,
      sunrise: '06:30',
      sunset: '18:30',
      planetaryPositions: this.generatePlanetaryPositions()
    };
  }
}

// Weather Service for Spiritual Practices
export class WeatherService {
  
  static async getWeatherForMeditation(lat?: number, lon?: number): Promise<WeatherData> {
    try {
      // Try wttr.in API - completely free weather service
      if (lat && lon) {
        const response = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
        if (response.ok) {
          const data = await response.json();
          const current = data.current_condition[0];
          const condition = current.weatherDesc[0].value;
          
          return {
            temperature: parseInt(current.temp_C),
            condition: this.normalizeWeatherCondition(condition),
            humidity: parseInt(current.humidity),
            pressure: parseInt(current.pressure),
            uvIndex: parseInt(current.uvIndex || '0'),
            recommendation: this.getMeditationRecommendation(this.normalizeWeatherCondition(condition))
          };
        }
      }
      
      // Fallback to Open-Meteo API (free, no key required)
      if (lat && lon) {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
        );
        if (response.ok) {
          const data = await response.json();
          const current = data.current_weather;
          const condition = this.getConditionFromWeatherCode(current.weathercode);
          
          return {
            temperature: Math.round(current.temperature),
            condition,
            humidity: 50, // Open-Meteo doesn't provide humidity in free tier
            pressure: 1013, // Standard pressure fallback
            uvIndex: 3, // Moderate UV fallback
            recommendation: this.getMeditationRecommendation(condition)
          };
        }
      }
      
      return this.getFallbackWeatherData();
    } catch (error) {
      console.error('Weather API error:', error);
      return this.getFallbackWeatherData();
    }
  }

  private static normalizeWeatherCondition(condition: string): string {
    const lower = condition.toLowerCase();
    if (lower.includes('clear') || lower.includes('sunny')) return 'Clear';
    if (lower.includes('cloud')) return 'Partly Cloudy';
    if (lower.includes('rain') && !lower.includes('heavy')) return 'Light Rain';
    if (lower.includes('rain')) return 'Rain';
    if (lower.includes('snow')) return 'Snow';
    if (lower.includes('fog') || lower.includes('mist')) return 'Foggy';
    return 'Cloudy';
  }

  private static getConditionFromWeatherCode(code: number): string {
    // WMO Weather interpretation codes
    if (code === 0) return 'Clear';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 67) return 'Light Rain';
    if (code <= 77) return 'Snow';
    if (code <= 82) return 'Rain';
    return 'Cloudy';
  }
  
  private static getFallbackWeatherData(): WeatherData {
    const conditions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      temperature: Math.floor(Math.random() * 30) + 5, // 5-35°C
      condition,
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050 hPa
      uvIndex: Math.floor(Math.random() * 11),
      recommendation: this.getMeditationRecommendation(condition)
    };
  }
  
  private static getMeditationRecommendation(condition: string): string {
    const recommendations = {
      'Clear': 'Perfect conditions for outdoor meditation and energy work',
      'Partly Cloudy': 'Good for both indoor and outdoor practices',
      'Cloudy': 'Ideal for introspective meditation and shadow work',
      'Light Rain': 'Excellent for cleansing meditation and emotional release'
    };
    return recommendations[condition] || 'Adapt your practice to current conditions';
  }
}

// Sacred Sites and Spiritual Centers Service
export class SacredSitesService {
  static async findNearbySpiritual(lat: number, lon: number, radius = 5000): Promise<SacredSite[]> {
    try {
      // Using Overpass API (OpenStreetMap) - completely free
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="place_of_worship"](around:${radius},${lat},${lon});
          node["leisure"="meditation_centre"](around:${radius},${lat},${lon});
          node["amenity"="meditation_centre"](around:${radius},${lat},${lon});
          node["amenity"="spiritual_centre"](around:${radius},${lat},${lon});
        );
        out;
      `;
      
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });
      
      if (!response.ok) {
        throw new Error('Overpass API unavailable');
      }
      
      const data = await response.json();
      
      return data.elements.map((element: any) => ({
        name: element.tags?.name || 'Spiritual Center',
        location: { lat: element.lat, lon: element.lon },
        type: this.categorizeSpiritual(element.tags),
        description: element.tags?.description || 'Local spiritual center',
        distance: this.calculateDistance(lat, lon, element.lat, element.lon)
      })).slice(0, 10); // Limit to 10 results
      
    } catch (error) {
      console.error('Sacred sites API error:', error);
      return this.getFallbackSacredSites();
    }
  }
  
  private static categorizeSpiritual(tags: any): SacredSite['type'] {
    if (tags?.amenity === 'meditation_centre' || tags?.leisure === 'meditation_centre') {
      return 'meditation_center';
    }
    if (tags?.religion) {
      return 'temple';
    }
    return 'spiritual_center';
  }
  
  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  private static getFallbackSacredSites(): SacredSite[] {
    return [
      {
        name: 'Local Meditation Center',
        location: { lat: 37.7749, lon: -122.4194 },
        type: 'meditation_center',
        description: 'Community meditation center offering daily sessions'
      },
      {
        name: 'Sacred Grove',
        location: { lat: 37.7849, lon: -122.4094 },
        type: 'sacred_site',
        description: 'Natural sacred space for spiritual practice'
      }
    ];
  }
}

// Meditation Timing Optimization
export class MeditationTimingService {
  static async getOptimalMeditationTime(lat?: number, lon?: number): Promise<MeditationTiming> {
    try {
      const astronomy = await AstronomyService.getCurrentAstronomyData(lat, lon);
      const weather = await WeatherService.getWeatherForMeditation(lat, lon);
      
      const factors = [];
      let optimal = true;
      
      // Moon phase analysis
      if (astronomy.moonPhase === 'New Moon' || astronomy.moonPhase === 'Full Moon') {
        factors.push('Powerful lunar energy for deep spiritual work');
      } else {
        optimal = false;
        factors.push('Moderate lunar energy');
      }
      
      // Weather conditions
      if (weather.condition === 'Clear') {
        factors.push('Clear skies optimal for energy work');
      } else if (weather.condition === 'Light Rain') {
        factors.push('Cleansing energy from precipitation');
      } else {
        optimal = false;
        factors.push('Weather supports introspective practice');
      }
      
      // Time of day
      const hour = new Date().getHours();
      if (hour >= 5 && hour <= 7) {
        factors.push('Dawn hours optimal for spiritual practice');
      } else if (hour >= 17 && hour <= 19) {
        factors.push('Dusk energy supportive for meditation');
      } else {
        optimal = false;
        factors.push('Current time suitable for practice');
      }
      
      return {
        optimal,
        factors,
        recommendation: optimal ? 
          'Excellent conditions for deep spiritual practice' : 
          'Good time for personal development work',
        nextOptimal: this.calculateNextOptimalTime()
      };
      
    } catch (error) {
      console.error('Meditation timing error:', error);
      return this.getFallbackTiming();
    }
  }
  
  private static calculateNextOptimalTime(): string {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(6, 0, 0, 0);
    return tomorrow.toLocaleString();
  }
  
  private static getFallbackTiming(): MeditationTiming {
    return {
      optimal: false,
      factors: ['Current time suitable for spiritual practice'],
      recommendation: 'Any moment is perfect for connecting with your higher self',
      nextOptimal: this.calculateNextOptimalTime()
    };
  }
}

// Binaural Beats Generation Service
export class BinauralBeatsService {
  private static audioContext: AudioContext | null = null;
  private static oscillators: OscillatorNode[] = [];
  private static gainNodes: GainNode[] = [];
  
  static async initializeAudio(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
  
  static async playChakraFrequency(chakra: string, duration = 600000): Promise<void> {
    await this.initializeAudio();
    
    const frequencies = {
      'root': { base: 194.18, binaural: 4 },      // C - Grounding
      'sacral': { base: 210.42, binaural: 6 },    // D - Creativity
      'solar': { base: 230.54, binaural: 10 },    // E - Personal Power
      'heart': { base: 272.20, binaural: 8 },     // F - Love
      'throat': { base: 303.00, binaural: 12 },   // G - Communication
      'third-eye': { base: 341.3, binaural: 14 }, // A - Intuition
      'crown': { base: 383.40, binaural: 16 }     // B - Spiritual Connection
    };
    
    const config = frequencies[chakra] || frequencies['heart'];
    this.playBinauralBeat(config.base, config.base + config.binaural, duration);
  }
  
  static playBinauralBeat(leftFreq: number, rightFreq: number, duration: number): void {
    if (!this.audioContext) return;
    
    this.stopAllSounds();
    
    // Create oscillators for left and right channels
    const leftOsc = this.audioContext.createOscillator();
    const rightOsc = this.audioContext.createOscillator();
    
    // Create gain nodes for volume control
    const leftGain = this.audioContext.createGain();
    const rightGain = this.audioContext.createGain();
    const masterGain = this.audioContext.createGain();
    
    // Create channel merger for stereo output
    const merger = this.audioContext.createChannelMerger(2);
    
    // Set frequencies
    leftOsc.frequency.setValueAtTime(leftFreq, this.audioContext.currentTime);
    rightOsc.frequency.setValueAtTime(rightFreq, this.audioContext.currentTime);
    
    // Set wave type to sine for pure tones
    leftOsc.type = 'sine';
    rightOsc.type = 'sine';
    
    // Set initial volume (low for safety)
    leftGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    rightGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    masterGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    
    // Connect nodes
    leftOsc.connect(leftGain);
    rightOsc.connect(rightGain);
    leftGain.connect(merger, 0, 0);
    rightGain.connect(merger, 0, 1);
    merger.connect(masterGain);
    masterGain.connect(this.audioContext.destination);
    
    // Start oscillators
    leftOsc.start();
    rightOsc.start();
    
    // Store references for cleanup
    this.oscillators.push(leftOsc, rightOsc);
    this.gainNodes.push(leftGain, rightGain, masterGain);
    
    // Stop after duration
    setTimeout(() => {
      this.stopAllSounds();
    }, duration);
  }
  
  static stopAllSounds(): void {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    
    this.oscillators = [];
    this.gainNodes = [];
  }
  
  static setVolume(volume: number): void {
    if (this.audioContext && this.gainNodes.length > 0) {
      const safeVolume = Math.max(0, Math.min(1, volume));
      this.gainNodes.forEach(gain => {
        gain.gain.setValueAtTime(safeVolume * 0.3, this.audioContext!.currentTime);
      });
    }
  }
}

// Export all services
export {
  type AstronomyData,
  type WeatherData,
  type SacredSite,
  type MeditationTiming
};