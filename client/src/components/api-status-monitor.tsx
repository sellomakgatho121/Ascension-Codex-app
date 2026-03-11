import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw,
  Wifi,
  WifiOff,
  Globe
} from 'lucide-react';

interface APIStatus {
  name: string;
  url: string;
  status: 'online' | 'offline' | 'checking';
  lastChecked: Date;
  responseTime?: number;
}

export function APIStatusMonitor() {
  const [apiStatuses, setApiStatuses] = useState<APIStatus[]>([
    {
      name: 'Sunrise/Sunset API',
      url: 'https://api.sunrise-sunset.org',
      status: 'checking',
      lastChecked: new Date()
    },
    {
      name: 'Open-Meteo Weather',
      url: 'https://api.open-meteo.com',
      status: 'checking',
      lastChecked: new Date()
    },
    {
      name: 'wttr.in Weather',
      url: 'https://wttr.in',
      status: 'checking',
      lastChecked: new Date()
    },
    {
      name: 'OpenStreetMap Overpass',
      url: 'https://overpass-api.de',
      status: 'checking',
      lastChecked: new Date()
    }
  ]);

  const checkAPIStatus = async (api: APIStatus): Promise<APIStatus> => {
    const startTime = Date.now();
    
    try {
      let testUrl = '';
      
      switch (api.name) {
        case 'Sunrise/Sunset API':
          testUrl = 'https://api.sunrise-sunset.org/json?lat=37.7749&lng=-122.4194&formatted=0';
          break;
        case 'Open-Meteo Weather':
          testUrl = 'https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current_weather=true';
          break;
        case 'wttr.in Weather':
          testUrl = 'https://wttr.in/37.7749,-122.4194?format=j1';
          break;
        case 'OpenStreetMap Overpass':
          // Simple query to test connectivity
          testUrl = 'https://overpass-api.de/api/status';
          break;
        default:
          testUrl = api.url;
      }

      const response = await fetch(testUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });

      const responseTime = Date.now() - startTime;
      
      return {
        ...api,
        status: response.ok ? 'online' : 'offline',
        lastChecked: new Date(),
        responseTime: responseTime
      };
      
    } catch (error) {
      return {
        ...api,
        status: 'offline',
        lastChecked: new Date(),
        responseTime: undefined
      };
    }
  };

  const checkAllAPIs = async () => {
    setApiStatuses(prev => prev.map(api => ({ ...api, status: 'checking' })));
    
    const promises = apiStatuses.map(api => checkAPIStatus(api));
    const results = await Promise.all(promises);
    
    setApiStatuses(results);
  };

  useEffect(() => {
    checkAllAPIs();
    // Check every 5 minutes
    const interval = setInterval(checkAllAPIs, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: APIStatus['status']) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'checking':
        return <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />;
      default:
        return <Globe className="w-4 h-4 text-cosmic-400" />;
    }
  };

  const getStatusBadge = (status: APIStatus['status']) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-600/20 text-green-400 border-green-600/50">Online</Badge>;
      case 'offline':
        return <Badge className="bg-red-600/20 text-red-400 border-red-600/50">Offline</Badge>;
      case 'checking':
        return <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/50">Checking</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const overallStatus = apiStatuses.every(api => api.status === 'online') ? 'online' : 
                      apiStatuses.some(api => api.status === 'online') ? 'partial' : 'offline';

  return (
    <Card className="sacred-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
            {overallStatus === 'online' ? (
              <Wifi className="w-5 h-5 mr-2 text-green-400" />
            ) : (
              <WifiOff className="w-5 h-5 mr-2 text-red-400" />
            )}
            API Services Status
          </CardTitle>
          <Button
            onClick={checkAllAPIs}
            variant="outline"
            size="sm"
            className="border-cosmic-600 text-cosmic-300 hover:bg-cosmic-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {overallStatus === 'online' && (
            <Badge className="bg-green-600/20 text-green-400 border-green-600/50">
              All Systems Operational
            </Badge>
          )}
          {overallStatus === 'partial' && (
            <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/50">
              Partial Service
            </Badge>
          )}
          {overallStatus === 'offline' && (
            <Badge className="bg-red-600/20 text-red-400 border-red-600/50">
              Service Disruption
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiStatuses.map((api, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-cosmic-800/30 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(api.status)}
              <div>
                <p className="font-medium text-white">{api.name}</p>
                <p className="text-xs text-cosmic-400">
                  Last checked: {api.lastChecked.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              {getStatusBadge(api.status)}
              {api.responseTime && (
                <p className="text-xs text-cosmic-400 mt-1">
                  {api.responseTime}ms
                </p>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-cosmic-800/30 rounded-lg">
          <h4 className="font-medium text-sacred-gold mb-2">Service Information</h4>
          <div className="space-y-2 text-sm text-cosmic-300">
            <p>• <strong>Sunrise/Sunset API:</strong> Provides accurate solar timing data for meditation scheduling</p>
            <p>• <strong>Weather Services:</strong> Real-time atmospheric conditions for practice recommendations</p>
            <p>• <strong>OpenStreetMap:</strong> Locates nearby spiritual centers and sacred sites</p>
            <p>• All services use free tiers with no API keys required</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}