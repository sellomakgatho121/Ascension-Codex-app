import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Plus,
  BookOpen,
  Star,
  Calendar as CalendarIcon,
  Edit,
  Search,
  Filter,
  Heart,
  Shield,
  TreePine,
  Clock,
  Sparkles,
  Eye,
  TrendingUp
} from "lucide-react";

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  practiceType: 'meditation' | 'chakra' | 'protection' | 'lightbody' | 'study' | 'experience';
  mood: 'poor' | 'low' | 'neutral' | 'good' | 'excellent';
  energy: number; // 1-10
  insights: string[];
  challenges: string[];
  gratitude: string[];
  tags: string[];
  duration?: number; // in minutes
  techniques?: string[];
  authorId?: string;
  isPublic?: boolean;
}

interface PracticeStats {
  totalEntries: number;
  averageMood: number;
  averageEnergy: number;
  commonInsights: string[];
  practiceStreak: number;
  favoriteTime: string;
}

export function PracticeJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 'entry-1',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      title: 'Heart Chakra Opening Session',
      content: 'Today I focused on opening my heart chakra using the sacred crystal heart activation. I felt a warm, expanding sensation in my chest area, and experienced waves of unconditional love. The practice felt very natural and I could sense my heart space expanding beyond my physical body.',
      practiceType: 'chakra',
      mood: 'excellent',
      energy: 9,
      insights: ['Heart expansion feels limitless', 'Love frequency is healing', 'Connection to universal love'],
      challenges: ['Initial resistance to vulnerability'],
      gratitude: ['My spiritual guides', 'The ES teachings', 'My dedicated practice'],
      tags: ['heart-chakra', 'love', 'expansion', 'crystal-heart'],
      duration: 25,
      techniques: ['Sacred Crystal Heart Activation', 'Heart Breathing']
    },
    {
      id: 'entry-2',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      title: '12D Shield Building Practice',
      content: 'Built my 12D shield this morning before starting the day. The visualization felt very strong today - I could clearly see the platinum light surrounding me in all directions. I declared my intention to connect only with Christ consciousness frequency and felt immediate protection and grounding.',
      practiceType: 'protection',
      mood: 'good',
      energy: 8,
      insights: ['Shield feels stronger with daily practice', 'Intention setting is crucial', 'Protection allows deeper work'],
      challenges: ['Maintaining visualization clarity'],
      gratitude: ['Guardian forces', 'Christ consciousness', 'Daily protection'],
      tags: ['12d-shield', 'protection', 'christ-consciousness', 'grounding'],
      duration: 15,
      techniques: ['12D Shield Building', 'Christ Consciousness Connection']
    }
  ]);

  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    date: new Date(),
    title: '',
    content: '',
    practiceType: 'meditation',
    mood: 'neutral',
    energy: 5,
    insights: [],
    challenges: [],
    gratitude: [],
    tags: [],
    techniques: []
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isAddingEntry, setIsAddingEntry] = useState(false);

  const practiceTypes = [
    { value: 'meditation', label: 'Meditation', icon: <Clock className="w-4 h-4" /> },
    { value: 'chakra', label: 'Chakra Work', icon: <Heart className="w-4 h-4" /> },
    { value: 'protection', label: 'Protection', icon: <Shield className="w-4 h-4" /> },
    { value: 'lightbody', label: 'Lightbody', icon: <Star className="w-4 h-4" /> },
    { value: 'study', label: 'Study', icon: <BookOpen className="w-4 h-4" /> },
    { value: 'experience', label: 'Experience', icon: <Sparkles className="w-4 h-4" /> }
  ];

  const moodOptions = [
    { value: 'poor', label: 'Poor', color: 'text-red-400' },
    { value: 'low', label: 'Low', color: 'text-orange-400' },
    { value: 'neutral', label: 'Neutral', color: 'text-yellow-400' },
    { value: 'good', label: 'Good', color: 'text-green-400' },
    { value: 'excellent', label: 'Excellent', color: 'text-blue-400' }
  ];

  const addEntry = () => {
    if (!newEntry.title || !newEntry.content) return;

    const entry: JournalEntry = {
      id: `entry-${Date.now()}`,
      date: newEntry.date || new Date(),
      title: newEntry.title,
      content: newEntry.content,
      practiceType: newEntry.practiceType || 'meditation',
      mood: newEntry.mood || 'neutral',
      energy: newEntry.energy || 5,
      insights: newEntry.insights || [],
      challenges: newEntry.challenges || [],
      gratitude: newEntry.gratitude || [],
      tags: newEntry.tags || [],
      duration: newEntry.duration,
      techniques: newEntry.techniques || [],
      authorId: "user-1", // Linked to current user context
      isPublic: false // Default to private entries
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({
      date: new Date(),
      title: '',
      content: '',
      practiceType: 'meditation',
      mood: 'neutral',
      energy: 5,
      insights: [],
      challenges: [],
      gratitude: [],
      tags: [],
      techniques: []
    });
    setIsAddingEntry(false);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = filterType === 'all' || entry.practiceType === filterType;

    return matchesSearch && matchesFilter;
  });

  const calculateStats = (): PracticeStats => {
    const moodValues = { poor: 1, low: 2, neutral: 3, good: 4, excellent: 5 };
    const averageMood = entries.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / entries.length;
    const averageEnergy = entries.reduce((sum, entry) => sum + entry.energy, 0) / entries.length;

    // Calculate streak (consecutive days with entries)
    const sortedDates = entries.map(e => e.date).sort((a, b) => b.getTime() - a.getTime());
    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < sortedDates.length; i++) {
      const entryDate = new Date(sortedDates[i]);
      const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff <= streak + 1) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }

    return {
      totalEntries: entries.length,
      averageMood,
      averageEnergy,
      commonInsights: [],
      practiceStreak: streak,
      favoriteTime: 'Morning'
    };
  };

  const stats = calculateStats();

  const getPracticeTypeIcon = (type: string) => {
    const practiceType = practiceTypes.find(p => p.value === type);
    return practiceType?.icon || <BookOpen className="w-4 h-4" />;
  };

  const getMoodColor = (mood: string) => {
    const moodOption = moodOptions.find(m => m.value === mood);
    return moodOption?.color || 'text-cosmic-400';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 mr-3" />
              Spiritual Practice Journal
            </div>
            <Dialog open={isAddingEntry} onOpenChange={setIsAddingEntry}>
              <DialogTrigger asChild>
                <Button className="sacred-button">
                  <Plus className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-sacred text-sacred-gold">
                    New Journal Entry
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-cosmic-100 mb-2 block">Title</label>
                      <Input
                        value={newEntry.title || ''}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Practice session title..."
                        className="bg-cosmic-800 border-cosmic-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-cosmic-100 mb-2 block">Practice Type</label>
                      <Select
                        value={newEntry.practiceType}
                        onValueChange={(value) => setNewEntry(prev => ({ ...prev, practiceType: value as any }))}
                      >
                        <SelectTrigger className="bg-cosmic-800 border-cosmic-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-cosmic-800 border-cosmic-600">
                          {practiceTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center space-x-2">
                                {type.icon}
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-cosmic-100 mb-2 block">Content</label>
                    <Textarea
                      value={newEntry.content || ''}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Describe your practice session, insights, and experiences..."
                      className="bg-cosmic-800 border-cosmic-600 min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-cosmic-100 mb-2 block">Mood</label>
                      <Select
                        value={newEntry.mood}
                        onValueChange={(value) => setNewEntry(prev => ({ ...prev, mood: value as any }))}
                      >
                        <SelectTrigger className="bg-cosmic-800 border-cosmic-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-cosmic-800 border-cosmic-600">
                          {moodOptions.map((mood) => (
                            <SelectItem key={mood.value} value={mood.value}>
                              <span className={mood.color}>{mood.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-cosmic-100 mb-2 block">Energy (1-10)</label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={newEntry.energy || 5}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, energy: Number(e.target.value) }))}
                        className="bg-cosmic-800 border-cosmic-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-cosmic-100 mb-2 block">Duration (min)</label>
                      <Input
                        type="number"
                        value={newEntry.duration || ''}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, duration: Number(e.target.value) }))}
                        placeholder="Optional"
                        className="bg-cosmic-800 border-cosmic-600"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingEntry(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addEntry} className="sacred-button">
                      Save Entry
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <p className="text-cosmic-100">
            Track your spiritual practices, insights, and consciousness evolution journey
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="entries" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-cosmic-700/50">
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-cosmic-400" />
              <Input
                placeholder="Search entries, insights, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-cosmic-800 border-cosmic-600"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 bg-cosmic-800 border-cosmic-600">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-cosmic-800 border-cosmic-600">
                <SelectItem value="all">All Types</SelectItem>
                {practiceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Entries List */}
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="sacred-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="p-2 rounded-lg bg-cosmic-700">
                          <div className="text-sacred-gold">
                            {getPracticeTypeIcon(entry.practiceType)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{entry.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-cosmic-300 mb-3">
                            <span>{formatDate(entry.date)}</span>
                            <span className={getMoodColor(entry.mood)}>
                              {entry.mood}
                            </span>
                            <span className="flex items-center">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Energy: {entry.energy}/10
                            </span>
                            {entry.duration && (
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {entry.duration}m
                              </span>
                            )}
                          </div>
                          <p className="text-cosmic-100 text-sm leading-relaxed mb-3">
                            {entry.content}
                          </p>

                          {/* Tags */}
                          {entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {entry.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Insights */}
                          {entry.insights.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-sacred-gold">Key Insights:</h4>
                              <ul className="space-y-1">
                                {entry.insights.map((insight, index) => (
                                  <li key={index} className="text-sm text-cosmic-300 flex items-start">
                                    <Eye className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0 text-sacred-gold" />
                                    {insight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Gratitude */}
                          {entry.gratitude.length > 0 && (
                            <div className="space-y-2 mt-3">
                              <h4 className="text-sm font-medium text-green-400">Gratitude:</h4>
                              <ul className="space-y-1">
                                {entry.gratitude.map((item, index) => (
                                  <li key={index} className="text-sm text-cosmic-300 flex items-start">
                                    <Heart className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0 text-green-400" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-lg font-sacred text-sacred-silver">
                Pattern Recognition & Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Most Common Insights</h4>
                  <div className="space-y-2">
                    {[
                      'Heart expansion feels limitless',
                      'Protection allows deeper work',
                      'Intention setting is crucial',
                      'Daily practice builds strength'
                    ].map((insight, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded bg-cosmic-700/30">
                        <span className="text-sm text-cosmic-100">{insight}</span>
                        <Badge variant="outline" className="text-xs">
                          {Math.floor(Math.random() * 5) + 1}×
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Growth Patterns</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="text-sm font-medium text-green-400">Consistent Strength</div>
                      <div className="text-xs text-cosmic-300 mt-1">
                        Your heart chakra work shows steady improvement over time
                      </div>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <div className="text-sm font-medium text-yellow-400">Area for Focus</div>
                      <div className="text-xs text-cosmic-300 mt-1">
                        Consider increasing lightbody practice frequency
                      </div>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="text-sm font-medium text-blue-400">Emerging Pattern</div>
                      <div className="text-xs text-cosmic-300 mt-1">
                        Morning practices show higher energy ratings
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="sacred-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-sacred-gold mb-1">{stats.totalEntries}</div>
                <div className="text-xs text-cosmic-300">Total Entries</div>
              </CardContent>
            </Card>
            <Card className="sacred-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-sacred-gold mb-1">{stats.practiceStreak}</div>
                <div className="text-xs text-cosmic-300">Day Streak</div>
              </CardContent>
            </Card>
            <Card className="sacred-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-sacred-gold mb-1">{stats.averageMood.toFixed(1)}</div>
                <div className="text-xs text-cosmic-300">Avg Mood</div>
              </CardContent>
            </Card>
            <Card className="sacred-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-sacred-gold mb-1">{stats.averageEnergy.toFixed(1)}</div>
                <div className="text-xs text-cosmic-300">Avg Energy</div>
              </CardContent>
            </Card>
          </div>

          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-lg font-sacred text-sacred-silver flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Practice Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {practiceTypes.map((type) => {
                  const count = entries.filter(e => e.practiceType === type.value).length;
                  const percentage = entries.length > 0 ? (count / entries.length) * 100 : 0;

                  return (
                    <div key={type.value} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          {type.icon}
                          <span className="text-sm text-cosmic-100">{type.label}</span>
                        </div>
                        <div className="text-sm text-sacred-gold">{count} ({percentage.toFixed(0)}%)</div>
                      </div>
                      <div className="w-full bg-cosmic-700 rounded-full h-2">
                        <div
                          className="bg-sacred-gold h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}