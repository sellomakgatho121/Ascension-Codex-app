import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Target, 
  Calendar, 
  Flame, 
  Star, 
  TrendingUp,
  Heart,
  Zap,
  Crown,
  Shield,
  BookOpen,
  Clock
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface ProgressData {
  chakraProgress: number;
  lightbodyProgress: number;
  gsfProgress: number;
  meditationStreak: number;
  totalSessions: number;
  lastActivity: string;
  achievements: string[];
  currentGoals: string[];
}

export function ProgressDashboard() {
  const [progressData, setProgressData] = useLocalStorage<ProgressData>('spiritual-progress', {
    chakraProgress: 45,
    lightbodyProgress: 32,
    gsfProgress: 67,
    meditationStreak: 7,
    totalSessions: 23,
    lastActivity: new Date().toISOString(),
    achievements: ['First Meditation', 'Chakra Explorer', 'GSF Initiate'],
    currentGoals: ['Complete 7-day meditation streak', 'Study all chakras', 'Master 12D Shield']
  });

  const [dailyGoal, setDailyGoal] = useState(20); // minutes
  const [todayProgress, setTodayProgress] = useState(12);

  const achievements = [
    { id: 'first-meditation', name: 'First Steps', icon: Heart, description: 'Completed first meditation session' },
    { id: 'chakra-explorer', name: 'Energy Center Explorer', icon: Zap, description: 'Explored all 7 main chakras' },
    { id: 'gsf-initiate', name: 'GSF Initiate', icon: Shield, description: 'Started GSF spiritual practice' },
    { id: 'streak-7', name: 'Week Warrior', icon: Flame, description: '7-day meditation streak' },
    { id: 'lightbody-student', name: 'Lightbody Student', icon: Star, description: 'Studied all lightbody layers' },
    { id: 'knowledge-seeker', name: 'Knowledge Seeker', icon: BookOpen, description: 'Read 50+ spiritual concepts' }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'text-green-400 border-green-400/40 bg-green-400/10';
    if (progress >= 50) return 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10';
    if (progress >= 25) return 'text-orange-400 border-orange-400/40 bg-orange-400/10';
    return 'text-red-400 border-red-400/40 bg-red-400/10';
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 14) return '🔥🔥';
    if (streak >= 7) return '🔥';
    return '✨';
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="sacred-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cosmic-300 text-sm">Meditation Streak</p>
                <p className="text-2xl font-bold text-sacred-gold">{progressData.meditationStreak}</p>
                <p className="text-cosmic-400 text-xs">days {getStreakEmoji(progressData.meditationStreak)}</p>
              </div>
              <Flame className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="sacred-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cosmic-300 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold text-sacred-gold">{progressData.totalSessions}</p>
                <p className="text-cosmic-400 text-xs">meditation sessions</p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="sacred-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cosmic-300 text-sm">Achievements</p>
                <p className="text-2xl font-bold text-sacred-gold">{progressData.achievements.length}</p>
                <p className="text-cosmic-400 text-xs">unlocked</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="sacred-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cosmic-300 text-sm">Today's Goal</p>
                <p className="text-2xl font-bold text-sacred-gold">{Math.round((todayProgress/dailyGoal)*100)}%</p>
                <p className="text-cosmic-400 text-xs">{todayProgress}/{dailyGoal} min</p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracking */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Spiritual Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-red-400 mr-2" />
                  <span className="text-cosmic-200">Chakra System</span>
                </div>
                <span className="text-sacred-gold font-medium">{progressData.chakraProgress}%</span>
              </div>
              <Progress value={progressData.chakraProgress} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-cosmic-200">Lightbody Layers</span>
                </div>
                <span className="text-sacred-gold font-medium">{progressData.lightbodyProgress}%</span>
              </div>
              <Progress value={progressData.lightbodyProgress} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-cosmic-200">GSF Principles</span>
                </div>
                <span className="text-sacred-gold font-medium">{progressData.gsfProgress}%</span>
              </div>
              <Progress value={progressData.gsfProgress} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-purple-400 mr-2" />
                  <span className="text-cosmic-200">Today's Practice</span>
                </div>
                <span className="text-sacred-gold font-medium">{Math.round((todayProgress/dailyGoal)*100)}%</span>
              </div>
              <Progress value={(todayProgress/dailyGoal)*100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.filter(a => progressData.achievements.includes(a.id)).map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.id} className="flex items-center p-3 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
                    <div className="p-2 rounded-full bg-sacred-gold/20 mr-3">
                      <Icon className="w-4 h-4 text-sacred-gold" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{achievement.name}</h4>
                      <p className="text-sm text-cosmic-300">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Goals */}
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Current Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {progressData.currentGoals.map((goal, index) => (
              <div key={index} className="p-4 rounded-lg border border-cosmic-700 hover:border-sacred-gold/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <Badge variant="outline" className="text-xs border-cosmic-600 text-cosmic-400">
                    Active
                  </Badge>
                </div>
                <p className="text-cosmic-100 text-sm">{goal}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}