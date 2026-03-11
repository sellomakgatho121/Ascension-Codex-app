import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Bell, 
  Users, 
  MapPin,
  Repeat,
  Star,
  Heart,
  Shield,
  Eye
} from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';

interface SpiritualEvent {
  id: string;
  title: string;
  type: 'meditation' | 'practice' | 'study' | 'group' | 'healing';
  date: Date;
  duration: number; // minutes
  description?: string;
  location?: string;
  participants?: string[];
  recurring?: 'daily' | 'weekly' | 'monthly';
  reminder?: number; // minutes before
}

interface CalendarIntegrationProps {
  className?: string;
}

export function CalendarIntegration({ className = "" }: CalendarIntegrationProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<SpiritualEvent[]>([
    {
      id: '1',
      title: 'Morning 12D Shield',
      type: 'practice',
      date: new Date(),
      duration: 15,
      description: 'Daily protection practice',
      recurring: 'daily'
    },
    {
      id: '2',
      title: 'Chakra Clearing Session',
      type: 'meditation',
      date: addDays(new Date(), 1),
      duration: 45,
      description: 'Deep chakra balancing and clearing'
    },
    {
      id: '3',
      title: 'ES Study Group',
      type: 'group',
      date: addDays(new Date(), 3),
      duration: 120,
      description: 'Weekly discussion of ES teachings',
      participants: ['Sarah', 'Mike', 'Lisa'],
      location: 'Community Center'
    }
  ]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<SpiritualEvent>>({
    date: selectedDate,
    duration: 30,
    type: 'meditation'
  });

  const getEventTypeIcon = (type: SpiritualEvent['type']) => {
    switch (type) {
      case 'meditation': return <Heart className="w-4 h-4" />;
      case 'practice': return <Shield className="w-4 h-4" />;
      case 'study': return <Eye className="w-4 h-4" />;
      case 'group': return <Users className="w-4 h-4" />;
      case 'healing': return <Star className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getEventTypeColor = (type: SpiritualEvent['type']) => {
    switch (type) {
      case 'meditation': return 'bg-green-500';
      case 'practice': return 'bg-blue-500';
      case 'study': return 'bg-purple-500';
      case 'group': return 'bg-amber-500';
      case 'healing': return 'bg-pink-500';
      default: return 'bg-cosmic-500';
    }
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getWeekEvents = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(selectedDate);
    return events.filter(event => 
      event.date >= weekStart && event.date <= weekEnd
    );
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event: SpiritualEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        type: newEvent.type || 'meditation',
        date: newEvent.date,
        duration: newEvent.duration || 30,
        description: newEvent.description,
        location: newEvent.location,
        recurring: newEvent.recurring,
        reminder: newEvent.reminder
      };
      setEvents(prev => [...prev, event]);
      setNewEvent({ date: selectedDate, duration: 30, type: 'meditation' });
      setIsAddingEvent(false);
    }
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center gap-2">
            <CalendarIcon className="w-6 h-6" />
            Spiritual Practice Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calendar View */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-cosmic-100">Calendar</h3>
                <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
                  <DialogTrigger asChild>
                    <Button className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add Spiritual Practice</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={newEvent.title || ''}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., Morning Meditation"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meditation">Meditation</SelectItem>
                            <SelectItem value="practice">Practice</SelectItem>
                            <SelectItem value="study">Study</SelectItem>
                            <SelectItem value="group">Group</SelectItem>
                            <SelectItem value="healing">Healing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="duration">Duration (min)</Label>
                          <Input
                            id="duration"
                            type="number"
                            value={newEvent.duration || 30}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="reminder">Reminder (min)</Label>
                          <Input
                            id="reminder"
                            type="number"
                            value={newEvent.reminder || ''}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, reminder: parseInt(e.target.value) }))}
                            placeholder="15"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newEvent.description || ''}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Optional description..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="recurring">Recurring</Label>
                        <Select value={newEvent.recurring || ''} onValueChange={(value: any) => setNewEvent(prev => ({ ...prev, recurring: value || undefined }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="No recurrence" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">No recurrence</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={addEvent} className="w-full bg-sacred-gold text-cosmic-900">
                        Add Event
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border border-cosmic-600 bg-cosmic-800"
              />
            </div>

            {/* Events List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cosmic-100">
                Events for {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              
              <div className="space-y-3">
                {getDayEvents(selectedDate).length === 0 ? (
                  <p className="text-cosmic-400 text-center py-8">No events scheduled for this day</p>
                ) : (
                  getDayEvents(selectedDate).map((event) => (
                    <Card key={event.id} className="cosmic-card">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${getEventTypeColor(event.type)}`}>
                            {getEventTypeIcon(event.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-cosmic-100">{event.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-cosmic-300 mb-2">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {event.duration} min
                              </div>
                              {event.recurring && (
                                <div className="flex items-center gap-1">
                                  <Repeat className="w-3 h-3" />
                                  {event.recurring}
                                </div>
                              )}
                              {event.reminder && (
                                <div className="flex items-center gap-1">
                                  <Bell className="w-3 h-3" />
                                  {event.reminder}m before
                                </div>
                              )}
                            </div>
                            {event.description && (
                              <p className="text-sm text-cosmic-400 mb-2">{event.description}</p>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-1 text-sm text-cosmic-400">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </div>
                            )}
                            {event.participants && (
                              <div className="flex items-center gap-1 text-sm text-cosmic-400 mt-1">
                                <Users className="w-3 h-3" />
                                {event.participants.join(', ')}
                              </div>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteEvent(event.id)}
                            className="text-red-400 border-red-400 hover:bg-red-400/10"
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Weekly Overview */}
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="text-lg text-cosmic-blue">This Week's Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, index) => {
                  const day = addDays(startOfWeek(selectedDate), index);
                  const dayEvents = getDayEvents(day);
                  return (
                    <div key={index} className="text-center p-2 rounded border border-cosmic-600">
                      <div className="text-xs text-cosmic-300 mb-1">
                        {format(day, 'EEE')}
                      </div>
                      <div className="text-sm font-semibold text-cosmic-100 mb-2">
                        {format(day, 'd')}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`w-full h-2 rounded ${getEventTypeColor(event.type)}`}
                            title={event.title}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-cosmic-400">+{dayEvents.length - 2}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}