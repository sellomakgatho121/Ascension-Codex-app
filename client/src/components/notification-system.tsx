import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  X, 
  Check, 
  Star, 
  Clock, 
  Zap, 
  Heart, 
  Shield,
  Trophy,
  Calendar,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'progress' | 'spiritual' | 'system';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionLabel?: string;
  actionUrl?: string;
}

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  achievements: boolean;
  reminders: boolean;
  progress: boolean;
  spiritual: boolean;
  system: boolean;
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('notifications', []);
  const [settings, setSettings] = useLocalStorage<NotificationSettings>('notification-settings', {
    enabled: true,
    sound: true,
    achievements: true,
    reminders: true,
    progress: true,
    spiritual: true,
    system: true
  });
  const [isOpen, setIsOpen] = useState(false);

  // Add sample notifications on first load
  useEffect(() => {
    if (notifications.length === 0) {
      const sampleNotifications: Notification[] = [
        {
          id: '1',
          type: 'achievement',
          title: 'New Achievement!',
          message: 'You completed your first meditation session. Well done on beginning your spiritual journey!',
          timestamp: Date.now() - 300000, // 5 minutes ago
          read: false,
          priority: 'medium',
          actionLabel: 'View Progress',
          actionUrl: '/progress'
        },
        {
          id: '2',
          type: 'reminder',
          title: 'Daily Practice Reminder',
          message: 'Time for your daily chakra clearing meditation. Take 15 minutes to center yourself.',
          timestamp: Date.now() - 600000, // 10 minutes ago
          read: false,
          priority: 'high',
          actionLabel: 'Start Meditation',
          actionUrl: '/meditation'
        },
        {
          id: '3',
          type: 'spiritual',
          title: 'Energy Update',
          message: 'Strong cosmic energies detected today. Perfect time for lightbody activation work.',
          timestamp: Date.now() - 3600000, // 1 hour ago
          read: true,
          priority: 'medium',
          actionLabel: 'Explore Lightbody',
          actionUrl: '/lightbody'
        }
      ];
      setNotifications(sampleNotifications);
    }
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Keep max 50 notifications

    // Play sound if enabled
    if (settings.sound && settings.enabled) {
      playNotificationSound();
    }

    // Show browser notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const playNotificationSound = () => {
    // Create a simple notification sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="w-4 h-4 text-yellow-400" />;
      case 'reminder': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'progress': return <Star className="w-4 h-4 text-green-400" />;
      case 'spiritual': return <Zap className="w-4 h-4 text-purple-400" />;
      case 'system': return <Settings className="w-4 h-4 text-cosmic-400" />;
      default: return <Bell className="w-4 h-4 text-cosmic-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400/40 bg-red-400/10';
      case 'medium': return 'border-yellow-400/40 bg-yellow-400/10';
      case 'low': return 'border-cosmic-600 bg-cosmic-800/30';
      default: return 'border-cosmic-600 bg-cosmic-800/30';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = notifications.filter(n => {
    if (!settings.enabled) return false;
    return settings[n.type as keyof NotificationSettings];
  });

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>

        {/* Notification Panel */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 z-50">
            <Card className="sacred-card border-cosmic-600 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center justify-between">
                  <span className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSettings(prev => ({ ...prev, sound: !prev.sound }))}
                      className="p-1"
                    >
                      {settings.sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="p-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {/* Actions */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="text-xs"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark All Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    disabled={notifications.length === 0}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-8 text-cosmic-400">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-3 rounded-lg border transition-all duration-200",
                          getPriorityColor(notification.priority),
                          !notification.read && "border-sacred-gold/40"
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getNotificationIcon(notification.type)}
                            <h4 className={cn(
                              "font-medium text-sm",
                              notification.read ? "text-cosmic-300" : "text-white"
                            )}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-sacred-gold rounded-full" />
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 h-6 w-6"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>

                        <p className="text-xs text-cosmic-300 mb-2 leading-relaxed">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-cosmic-400">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                          <div className="flex items-center space-x-2">
                            {notification.actionLabel && notification.actionUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  window.location.href = notification.actionUrl!;
                                  markAsRead(notification.id);
                                }}
                                className="text-xs h-6 px-2"
                              >
                                {notification.actionLabel}
                              </Button>
                            )}
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs h-6 px-2"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Browser Notification Permission */}
                {'Notification' in window && Notification.permission === 'default' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={requestNotificationPermission}
                    className="w-full text-xs"
                  >
                    Enable Browser Notifications
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}