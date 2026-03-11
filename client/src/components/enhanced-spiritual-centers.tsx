import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Heart,
  Users,
  Calendar,
  Clock,
  Star,
  Loader2
} from 'lucide-react';
import { SacredSitesService } from '@/lib/api-services';
import type { SacredSite } from '@/lib/api-services';

export function EnhancedSpiritualCenters() {
  const [sites, setSites] = useState<SacredSite[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchRadius, setSearchRadius] = useState(5000);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          setLocation(coords);
          findNearbySites(coords);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to default location (San Francisco)
          const defaultCoords = { lat: 37.7749, lon: -122.4194 };
          setLocation(defaultCoords);
          findNearbySites(defaultCoords);
        }
      );
    }
  };

  const findNearbySites = async (coords: { lat: number; lon: number }) => {
    setLoading(true);
    try {
      const nearbySites = await SacredSitesService.findNearbySpiritual(
        coords.lat, 
        coords.lon, 
        searchRadius
      );
      setSites(nearbySites);
    } catch (error) {
      console.error('Error finding spiritual centers:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchByLocation = async () => {
    if (!locationName.trim()) return;
    
    setLoading(true);
    try {
      // Simple geocoding using a free service (in production, use proper geocoding API)
      // For demo, we'll use a mock search
      const mockLocations = {
        'san francisco': { lat: 37.7749, lon: -122.4194 },
        'new york': { lat: 40.7128, lon: -74.0060 },
        'los angeles': { lat: 34.0522, lon: -118.2437 },
        'seattle': { lat: 47.6062, lon: -122.3321 },
        'portland': { lat: 45.5152, lon: -122.6784 }
      };
      
      const searchKey = locationName.toLowerCase();
      const coords = mockLocations[searchKey] || mockLocations['san francisco'];
      
      setLocation(coords);
      await findNearbySites(coords);
    } catch (error) {
      console.error('Location search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: SacredSite['type']) => {
    switch (type) {
      case 'meditation_center':
        return '🧘';
      case 'temple':
        return '🏛️';
      case 'sacred_site':
        return '🌟';
      case 'spiritual_center':
        return '✨';
      default:
        return '📍';
    }
  };

  const getTypeColor = (type: SacredSite['type']) => {
    switch (type) {
      case 'meditation_center':
        return 'bg-blue-600/20 text-blue-400 border-blue-600/50';
      case 'temple':
        return 'bg-purple-600/20 text-purple-400 border-purple-600/50';
      case 'sacred_site':
        return 'bg-green-600/20 text-green-400 border-green-600/50';
      case 'spiritual_center':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50';
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600/50';
    }
  };

  const openInMaps = (site: SacredSite) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${site.location.lat},${site.location.lon}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
            <MapPin className="w-6 h-6 mr-2" />
            Spiritual Centers & Sacred Sites
          </CardTitle>
          <p className="text-cosmic-400">
            Discover meditation centers, temples, and sacred spaces near you
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 bg-cosmic-800 border-cosmic-600 text-white"
              onKeyPress={(e) => e.key === 'Enter' && searchByLocation()}
            />
            <Button
              onClick={searchByLocation}
              disabled={loading}
              className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              onClick={getCurrentLocation}
              variant="outline"
              disabled={loading}
              className="border-cosmic-600 text-cosmic-300 hover:bg-cosmic-700"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Current Location
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-cosmic-400">
            <span>Search radius:</span>
            <select 
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              className="bg-cosmic-800 border border-cosmic-600 rounded px-2 py-1 text-white"
            >
              <option value={1000}>1 km</option>
              <option value={5000}>5 km</option>
              <option value={10000}>10 km</option>
              <option value={25000}>25 km</option>
            </select>
            {location && (
              <span>
                Current: {location.lat.toFixed(3)}, {location.lon.toFixed(3)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {loading ? (
        <Card className="sacred-card">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-sacred-gold mx-auto mb-4" />
              <p className="text-cosmic-300">Finding spiritual centers...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sites.length === 0 ? (
            <Card className="sacred-card">
              <CardContent className="text-center p-8">
                <MapPin className="w-12 h-12 text-cosmic-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-cosmic-300 mb-2">
                  No spiritual centers found
                </h3>
                <p className="text-cosmic-400">
                  Try expanding your search radius or searching a different location.
                </p>
              </CardContent>
            </Card>
          ) : (
            sites.map((site, index) => (
              <Card key={index} className="sacred-card hover:border-sacred-gold/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{getTypeIcon(site.type)}</span>
                        <div>
                          <h3 className="text-lg font-medium text-white">{site.name}</h3>
                          <Badge className={`text-xs ${getTypeColor(site.type)}`}>
                            {site.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-cosmic-300 mb-4 leading-relaxed">
                        {site.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-cosmic-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{site.location.lat.toFixed(3)}, {site.location.lon.toFixed(3)}</span>
                        </div>
                        {site.distance && (
                          <div className="flex items-center gap-1">
                            <Navigation className="w-3 h-3" />
                            <span>{site.distance.toFixed(1)} km away</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        onClick={() => openInMaps(site)}
                        variant="outline"
                        size="sm"
                        className="border-cosmic-600 text-cosmic-300 hover:bg-cosmic-700"
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        Directions
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cosmic-600 text-cosmic-300 hover:bg-cosmic-700"
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Community Features */}
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Community Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="bg-cosmic-800/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">Weekly Group Meditation</h4>
                <Badge className="bg-green-600/20 text-green-400 border-green-600/50">
                  <Calendar className="w-3 h-3 mr-1" />
                  Tonight
                </Badge>
              </div>
              <p className="text-sm text-cosmic-300 mb-3">
                Join our weekly group meditation focusing on planetary healing and collective consciousness.
              </p>
              <div className="flex items-center gap-4 text-xs text-cosmic-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>7:00 PM - 8:30 PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>Unity Center Downtown</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>12 attending</span>
                </div>
              </div>
            </div>

            <div className="bg-cosmic-800/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">Full Moon Ceremony</h4>
                <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/50">
                  <Star className="w-3 h-3 mr-1" />
                  This Weekend
                </Badge>
              </div>
              <p className="text-sm text-cosmic-300 mb-3">
                Sacred ceremony honoring the Full Moon energy with sound healing and manifestation work.
              </p>
              <div className="flex items-center gap-4 text-xs text-cosmic-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Saturday 8:00 PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>Sacred Grove Retreat</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>28 attending</span>
                </div>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900"
          >
            <Calendar className="w-4 h-4 mr-2" />
            View All Events
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}