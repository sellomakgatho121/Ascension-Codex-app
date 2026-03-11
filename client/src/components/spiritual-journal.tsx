import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Heart, 
  Zap, 
  Shield,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  Save
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  energy: number;
  practices: string[];
  insights: string[];
  challenges: string[];
  gratitude: string[];
  tags: string[];
  type: 'meditation' | 'vision' | 'insight' | 'practice' | 'dream' | 'general';
}

interface Mood {
  id: string;
  name: string;
  color: string;
  icon: React.ElementType;
}

export function SpiritualJournal() {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('spiritual-journal', []);
  const [isCreating, setIsCreating] = useState(false);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterType, setFilterType] = useState<string>('all');

  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    title: '',
    content: '',
    mood: 'peaceful',
    energy: 50,
    practices: [],
    insights: [],
    challenges: [],
    gratitude: [],
    tags: [],
    type: 'general'
  });

  const moods: Mood[] = [
    { id: 'peaceful', name: 'Peaceful', color: 'text-blue-400', icon: Heart },
    { id: 'energized', name: 'Energized', color: 'text-yellow-400', icon: Zap },
    { id: 'grounded', name: 'Grounded', color: 'text-green-400', icon: Shield },
    { id: 'enlightened', name: 'Enlightened', color: 'text-purple-400', icon: Star },
    { id: 'contemplative', name: 'Contemplative', color: 'text-indigo-400', icon: BookOpen }
  ];

  const entryTypes = [
    { value: 'meditation', label: 'Meditation', color: 'bg-blue-500/20 text-blue-400' },
    { value: 'vision', label: 'Vision', color: 'bg-purple-500/20 text-purple-400' },
    { value: 'insight', label: 'Insight', color: 'bg-yellow-500/20 text-yellow-400' },
    { value: 'practice', label: 'Practice', color: 'bg-green-500/20 text-green-400' },
    { value: 'dream', label: 'Dream', color: 'bg-indigo-500/20 text-indigo-400' },
    { value: 'general', label: 'General', color: 'bg-cosmic-500/20 text-cosmic-400' }
  ];

  const saveEntry = () => {
    if (!newEntry.title || !newEntry.content) return;

    const entry: JournalEntry = {
      id: editingEntry || Date.now().toString(),
      date: selectedDate?.toISOString() || new Date().toISOString(),
      title: newEntry.title || '',
      content: newEntry.content || '',
      mood: newEntry.mood || 'peaceful',
      energy: newEntry.energy || 50,
      practices: newEntry.practices || [],
      insights: newEntry.insights || [],
      challenges: newEntry.challenges || [],
      gratitude: newEntry.gratitude || [],
      tags: newEntry.tags || [],
      type: newEntry.type || 'general'
    };

    if (editingEntry) {
      setEntries(prev => prev.map(e => e.id === editingEntry ? entry : e));
      setEditingEntry(null);
    } else {
      setEntries(prev => [entry, ...prev]);
    }

    resetForm();
  };

  const resetForm = () => {
    setNewEntry({
      title: '',
      content: '',
      mood: 'peaceful',
      energy: 50,
      practices: [],
      insights: [],
      challenges: [],
      gratitude: [],
      tags: [],
      type: 'general'
    });
    setIsCreating(false);
    setEditingEntry(null);
  };

  const editEntry = (entry: JournalEntry) => {
    setNewEntry(entry);
    setEditingEntry(entry.id);
    setIsCreating(true);
    setSelectedDate(new Date(entry.date));
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const addArrayItem = (field: keyof Pick<JournalEntry, 'practices' | 'insights' | 'challenges' | 'gratitude' | 'tags'>, value: string) => {
    if (!value.trim()) return;
    setNewEntry(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()]
    }));
  };

  const removeArrayItem = (field: keyof Pick<JournalEntry, 'practices' | 'insights' | 'challenges' | 'gratitude' | 'tags'>, index: number) => {
    setNewEntry(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || entry.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const getMoodIcon = (moodId: string) => {
    const mood = moods.find(m => m.id === moodId);
    const Icon = mood?.icon || Heart;
    return <Icon className={`w-4 h-4 ${mood?.color || 'text-cosmic-400'}`} />;
  };

  const getTypeStyle = (type: string) => {
    const typeObj = entryTypes.find(t => t.value === type);
    return typeObj?.color || 'bg-cosmic-500/20 text-cosmic-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-sacred text-sacred-gold">Spiritual Journal</h2>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cosmic-400" />
          <Input
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-cosmic-800/50 border-cosmic-600"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 bg-cosmic-800/50 border border-cosmic-600 rounded-md text-white"
        >
          <option value="all">All Types</option>
          {entryTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* Create/Edit Entry */}
      {isCreating && (
        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="text-lg font-sacred text-sacred-gold">
              {editingEntry ? 'Edit Entry' : 'New Journal Entry'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cosmic-100 mb-2">Title</label>
                  <Input
                    value={newEntry.title || ''}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a title for your entry..."
                    className="bg-cosmic-800/50 border-cosmic-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cosmic-100 mb-2">Type</label>
                  <select
                    value={newEntry.type || 'general'}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-cosmic-800/50 border border-cosmic-600 rounded-md text-white"
                  >
                    {entryTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cosmic-100 mb-2">Mood</label>
                  <div className="grid grid-cols-3 gap-2">
                    {moods.map(mood => (
                      <button
                        key={mood.id}
                        onClick={() => setNewEntry(prev => ({ ...prev, mood: mood.id }))}
                        className={`p-2 rounded-lg border transition-colors ${
                          newEntry.mood === mood.id 
                            ? 'border-sacred-gold bg-sacred-gold/20' 
                            : 'border-cosmic-600 hover:border-cosmic-500'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1">
                          {getMoodIcon(mood.id)}
                        </div>
                        <span className="text-xs text-cosmic-300">{mood.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cosmic-100 mb-2">
                    Energy Level: {newEntry.energy || 50}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newEntry.energy || 50}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, energy: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cosmic-100 mb-2">Date</label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-cosmic-600 bg-cosmic-800/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cosmic-100 mb-2">Content</label>
              <Textarea
                value={newEntry.content || ''}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write about your spiritual experiences, insights, and reflections..."
                rows={6}
                className="bg-cosmic-800/50 border-cosmic-600"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cosmic-100 mb-2">Insights</label>
                <div className="space-y-2">
                  <Input
                    placeholder="Add an insight..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addArrayItem('insights', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="bg-cosmic-800/50 border-cosmic-600"
                  />
                  <div className="flex flex-wrap gap-1">
                    {(newEntry.insights || []).map((insight, index) => (
                      <Badge key={index} variant="outline" className="border-cosmic-600">
                        {insight}
                        <button
                          onClick={() => removeArrayItem('insights', index)}
                          className="ml-2 text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cosmic-100 mb-2">Gratitude</label>
                <div className="space-y-2">
                  <Input
                    placeholder="Add something you're grateful for..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addArrayItem('gratitude', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="bg-cosmic-800/50 border-cosmic-600"
                  />
                  <div className="flex flex-wrap gap-1">
                    {(newEntry.gratitude || []).map((item, index) => (
                      <Badge key={index} variant="outline" className="border-cosmic-600">
                        {item}
                        <button
                          onClick={() => removeArrayItem('gratitude', index)}
                          className="ml-2 text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={resetForm} className="border-cosmic-600">
                Cancel
              </Button>
              <Button onClick={saveEntry} className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80">
                <Save className="w-4 h-4 mr-2" />
                {editingEntry ? 'Update' : 'Save'} Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="sacred-card">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-cosmic-400 opacity-50" />
              <h3 className="text-lg font-medium text-cosmic-100 mb-2">No entries found</h3>
              <p className="text-cosmic-300">Start your spiritual journey by creating your first journal entry.</p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="sacred-card hover:border-sacred-gold/40 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-white">{entry.title}</h3>
                      <Badge className={getTypeStyle(entry.type)}>
                        {entryTypes.find(t => t.value === entry.type)?.label}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-cosmic-300 gap-4">
                      <span className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        {getMoodIcon(entry.mood)}
                        <span className="ml-1">{moods.find(m => m.id === entry.mood)?.name}</span>
                      </span>
                      <span>Energy: {entry.energy}%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editEntry(entry)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-cosmic-100 mb-4 leading-relaxed">{entry.content}</p>

                {(entry.insights.length > 0 || entry.gratitude.length > 0) && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {entry.insights.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-cosmic-200 mb-2">Insights:</h4>
                        <div className="flex flex-wrap gap-1">
                          {entry.insights.map((insight, index) => (
                            <Badge key={index} variant="outline" className="border-yellow-400/40 text-yellow-400">
                              {insight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.gratitude.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-cosmic-200 mb-2">Gratitude:</h4>
                        <div className="flex flex-wrap gap-1">
                          {entry.gratitude.map((item, index) => (
                            <Badge key={index} variant="outline" className="border-green-400/40 text-green-400">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}