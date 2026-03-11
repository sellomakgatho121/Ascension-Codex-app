import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Wifi, 
  WifiOff, 
  Download, 
  Upload, 
  CheckCircle,
  Clock,
  RefreshCw,
  Cloud,
  HardDrive
} from "lucide-react";

interface OfflineData {
  meditations: any[];
  chakraData: any[];
  progressData: any[];
  journalEntries: any[];
  lastSync: Date | null;
}

interface SyncStatus {
  isOnline: boolean;
  isPending: boolean;
  pendingChanges: number;
  lastSync: Date | null;
}

export function OfflineSupport() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    isPending: false,
    pendingChanges: 0,
    lastSync: null
  });

  const [offlineData, setOfflineData] = useState<OfflineData>({
    meditations: [],
    chakraData: [],
    progressData: [],
    journalEntries: [],
    lastSync: null
  });

  const [storageUsage, setStorageUsage] = useState({
    used: 0,
    available: 0,
    percentage: 0
  });

  useEffect(() => {
    // Listen for online/offline events
    const handleOnline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: true }));
      syncData();
    };

    const handleOffline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check storage usage
    checkStorageUsage();

    // Load offline data
    loadOfflineData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkStorageUsage = async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        const used = estimate.usage || 0;
        const available = estimate.quota || 0;
        const percentage = available > 0 ? (used / available) * 100 : 0;

        setStorageUsage({
          used: Math.round(used / (1024 * 1024)), // Convert to MB
          available: Math.round(available / (1024 * 1024)),
          percentage: Math.round(percentage)
        });
      } catch (error) {
        console.error('Storage estimation failed:', error);
      }
    }
  };

  const loadOfflineData = () => {
    try {
      const stored = localStorage.getItem('es-offline-data');
      if (stored) {
        const data = JSON.parse(stored);
        setOfflineData({
          ...data,
          lastSync: data.lastSync ? new Date(data.lastSync) : null
        });
      }
    } catch (error) {
      console.error('Failed to load offline data:', error);
    }
  };

  const saveOfflineData = (data: Partial<OfflineData>) => {
    try {
      const updated = { ...offlineData, ...data, lastSync: new Date() };
      localStorage.setItem('es-offline-data', JSON.stringify(updated));
      setOfflineData(updated);
    } catch (error) {
      console.error('Failed to save offline data:', error);
    }
  };

  const syncData = async () => {
    if (!syncStatus.isOnline) return;

    setSyncStatus(prev => ({ ...prev, isPending: true }));

    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In real implementation, this would sync with server
      setSyncStatus(prev => ({
        ...prev,
        isPending: false,
        pendingChanges: 0,
        lastSync: new Date()
      }));

      saveOfflineData({ lastSync: new Date() });
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus(prev => ({ ...prev, isPending: false }));
    }
  };

  const downloadContent = async (type: string) => {
    setSyncStatus(prev => ({ ...prev, isPending: true }));

    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockData = {
        meditations: [
          { id: '1', title: '12D Shield Building', duration: 15, offline: true },
          { id: '2', title: 'Heart Chakra Opening', duration: 20, offline: true },
          { id: '3', title: 'Lightbody Activation', duration: 25, offline: true }
        ]
      };

      saveOfflineData(mockData);
      setSyncStatus(prev => ({ ...prev, isPending: false }));
    } catch (error) {
      console.error('Download failed:', error);
      setSyncStatus(prev => ({ ...prev, isPending: false }));
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 MB';
    const mb = bytes;
    return `${mb} MB`;
  };

  const formatLastSync = (date: Date | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} days ago`;
    if (diffHours > 0) return `${diffHours} hours ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6">
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center justify-between">
            <div className="flex items-center">
              {syncStatus.isOnline ? (
                <Wifi className="w-5 h-5 mr-2 text-green-400" />
              ) : (
                <WifiOff className="w-5 h-5 mr-2 text-red-400" />
              )}
              Offline Support
            </div>
            <Badge 
              variant="outline" 
              className={syncStatus.isOnline ? 'text-green-400 border-green-500/30' : 'text-red-400 border-red-500/30'}
            >
              {syncStatus.isOnline ? 'Online' : 'Offline'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!syncStatus.isOnline && (
            <Alert className="border-yellow-500/30 bg-yellow-500/10">
              <WifiOff className="h-4 w-4" />
              <AlertDescription className="text-yellow-400">
                You're currently offline. Some features may be limited, but you can still access downloaded content and practice offline.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Sync Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cosmic-300">Connection:</span>
                  <span className={syncStatus.isOnline ? 'text-green-400' : 'text-red-400'}>
                    {syncStatus.isOnline ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cosmic-300">Last Sync:</span>
                  <span className="text-cosmic-100">{formatLastSync(syncStatus.lastSync)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cosmic-300">Pending Changes:</span>
                  <span className="text-cosmic-100">{syncStatus.pendingChanges}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">Storage Usage</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-cosmic-300">Used:</span>
                  <span className="text-cosmic-100">
                    {formatBytes(storageUsage.used)} / {formatBytes(storageUsage.available)}
                  </span>
                </div>
                <div className="w-full bg-cosmic-700 rounded-full h-2">
                  <div 
                    className="bg-sacred-gold h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(storageUsage.percentage, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-cosmic-400">
                  {storageUsage.percentage}% used
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={syncData}
              disabled={!syncStatus.isOnline || syncStatus.isPending}
              className="flex-1"
              variant="outline"
            >
              {syncStatus.isPending ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              {syncStatus.isPending ? 'Syncing...' : 'Sync Now'}
            </Button>
            
            <Button
              onClick={() => downloadContent('essential')}
              disabled={!syncStatus.isOnline || syncStatus.isPending}
              className="flex-1 border-sacred-gold text-sacred-gold hover:bg-sacred-gold hover:text-cosmic-900"
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Download for Offline
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Offline Content */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="text-lg font-sacred text-sacred-silver flex items-center">
              <HardDrive className="w-5 h-5 mr-2" />
              Downloaded Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-cosmic-100">Meditations</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-cosmic-400">{offlineData.meditations.length}</span>
                  {offlineData.meditations.length > 0 && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-cosmic-100">Chakra Data</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-cosmic-400">{offlineData.chakraData.length}</span>
                  {offlineData.chakraData.length > 0 && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-cosmic-100">Progress Data</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-cosmic-400">{offlineData.progressData.length}</span>
                  {offlineData.progressData.length > 0 && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>
            </div>

            {offlineData.lastSync && (
              <div className="text-xs text-cosmic-400 pt-2 border-t border-cosmic-700">
                Last downloaded: {formatLastSync(offlineData.lastSync)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="text-lg font-sacred text-sacred-silver flex items-center">
              <Cloud className="w-5 h-5 mr-2" />
              Offline Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-cosmic-100">Meditation timer and guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-cosmic-100">Chakra and lightbody information</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-cosmic-100">Practice journal (local storage)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-cosmic-100">Energy field scanner</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-cosmic-300">Progress sync (when online)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}