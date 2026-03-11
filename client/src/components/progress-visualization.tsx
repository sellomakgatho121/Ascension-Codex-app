import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Award, 
  Target, 
  BarChart3, 
  Calendar,
  Activity,
  Zap,
  Star,
  Crown,
  Heart,
  Shield,
  TreePine,
  Sparkles
} from "lucide-react";

interface ProgressData {
  category: string;
  current: number;
  total: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  recentChange: number;
  color: string;
  icon: React.ReactNode;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  achieved: boolean;
  achievedDate?: Date;
  category: string;
  points: number;
}

interface WeeklyProgress {
  week: string;
  meditation: number;
  chakraWork: number;
  protection: number;
  study: number;
}

export function ProgressVisualization() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const progressData: ProgressData[] = [
    {
      category: 'Chakra System',
      current: 12,
      total: 15,
      percentage: 80,
      trend: 'up',
      recentChange: 2,
      color: '#ef4444',
      icon: <Heart className="w-5 h-5" />
    },
    {
      category: 'Lightbody Development',
      current: 5,
      total: 7,
      percentage: 71,
      trend: 'up',
      recentChange: 1,
      color: '#3b82f6',
      icon: <Star className="w-5 h-5" />
    },
    {
      category: 'Protection Skills',
      current: 85,
      total: 100,
      percentage: 85,
      trend: 'stable',
      recentChange: 0,
      color: '#10b981',
      icon: <Shield className="w-5 h-5" />
    },
    {
      category: 'Grid Work',
      current: 8,
      total: 12,
      percentage: 67,
      trend: 'up',
      recentChange: 3,
      color: '#8b5cf6',
      icon: <TreePine className="w-5 h-5" />
    },
    {
      category: 'Consciousness Expansion',
      current: 7,
      total: 10,
      percentage: 70,
      trend: 'up',
      recentChange: 1,
      color: '#f59e0b',
      icon: <Crown className="w-5 h-5" />
    }
  ];

  const weeklyData: WeeklyProgress[] = [
    { week: 'Week 1', meditation: 5, chakraWork: 3, protection: 4, study: 2 },
    { week: 'Week 2', meditation: 6, chakraWork: 4, protection: 5, study: 3 },
    { week: 'Week 3', meditation: 4, chakraWork: 5, protection: 4, study: 4 },
    { week: 'Week 4', meditation: 7, chakraWork: 6, protection: 6, study: 5 }
  ];

  const milestones: Milestone[] = [
    {
      id: 'first-7-chakras',
      title: 'Physical Chakra Mastery',
      description: 'Activated all 7 physical chakras',
      achieved: true,
      achievedDate: new Date('2024-01-15'),
      category: 'chakra',
      points: 100
    },
    {
      id: 'first-shield',
      title: 'First 12D Shield',
      description: 'Successfully built first 12D protection shield',
      achieved: true,
      achievedDate: new Date('2024-01-10'),
      category: 'protection',
      points: 50
    },
    {
      id: 'lightbody-activation',
      title: 'Lightbody Activation',
      description: 'Activated first 3 lightbody layers',
      achieved: true,
      achievedDate: new Date('2024-02-01'),
      category: 'lightbody',
      points: 150
    },
    {
      id: 'grid-initiate',
      title: 'Grid Worker Initiate',
      description: 'Connected to 5 Tree Grid spheres',
      achieved: false,
      category: 'grid',
      points: 200
    },
    {
      id: 'consciousness-pioneer',
      title: 'Consciousness Pioneer',
      description: 'Achieved advanced multidimensional awareness',
      achieved: false,
      category: 'consciousness',
      points: 300
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default: return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  const getMilestoneIcon = (category: string) => {
    switch (category) {
      case 'chakra': return <Heart className="w-5 h-5" />;
      case 'lightbody': return <Star className="w-5 h-5" />;
      case 'protection': return <Shield className="w-5 h-5" />;
      case 'grid': return <TreePine className="w-5 h-5" />;
      case 'consciousness': return <Crown className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-cosmic-700/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Progress Summary Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressData.map((item) => (
              <Card key={item.category} className="sacred-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div style={{ color: item.color }}>
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-white text-sm">
                        {item.category}
                      </h3>
                    </div>
                    {getTrendIcon(item.trend)}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-sacred-gold">
                        {item.percentage}%
                      </span>
                      <span className="text-sm text-cosmic-300">
                        {item.current}/{item.total}
                      </span>
                    </div>
                    
                    <Progress 
                      value={item.percentage} 
                      className="h-2"
                      style={{ 
                        background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}80 100%)`
                      }}
                    />
                    
                    {item.recentChange !== 0 && (
                      <div className="flex items-center text-xs">
                        <span className={`text-${item.trend === 'up' ? 'green' : 'red'}-400`}>
                          {item.trend === 'up' ? '+' : ''}{item.recentChange} this {timeRange}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="sacred-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-sacred-gold mb-1">127</div>
                <div className="text-xs text-cosmic-300">Total Sessions</div>
              </CardContent>
            </Card>
            <Card className="sacred-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-sacred-gold mb-1">23</div>
                <div className="text-xs text-cosmic-300">Day Streak</div>
              </CardContent>
            </Card>
            <Card className="sacred-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-sacred-gold mb-1">850</div>
                <div className="text-xs text-cosmic-300">Points Earned</div>
              </CardContent>
            </Card>
            <Card className="sacred-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-sacred-gold mb-1">7</div>
                <div className="text-xs text-cosmic-300">Achievements</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center justify-between">
                <span>Weekly Practice Trends</span>
                <div className="flex gap-2">
                  {['week', 'month', 'year'].map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange(range as any)}
                      className="text-xs"
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </Button>
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((week, index) => (
                  <div key={week.week} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-cosmic-100">{week.week}</span>
                      <span className="text-xs text-cosmic-300">
                        Total: {week.meditation + week.chakraWork + week.protection + week.study}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="space-y-1">
                        <div className="h-2 bg-blue-500 rounded" style={{ width: `${(week.meditation / 7) * 100}%` }}></div>
                        <div className="text-xs text-cosmic-400">Meditation</div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-red-500 rounded" style={{ width: `${(week.chakraWork / 7) * 100}%` }}></div>
                        <div className="text-xs text-cosmic-400">Chakras</div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-green-500 rounded" style={{ width: `${(week.protection / 7) * 100}%` }}></div>
                        <div className="text-xs text-cosmic-400">Protection</div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-purple-500 rounded" style={{ width: `${(week.study / 7) * 100}%` }}></div>
                        <div className="text-xs text-cosmic-400">Study</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="grid gap-4">
            {milestones.map((milestone) => (
              <Card key={milestone.id} className={`sacred-card ${milestone.achieved ? 'border-sacred-gold/40' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${milestone.achieved ? 'bg-sacred-gold/20' : 'bg-cosmic-700'}`}>
                        <div className={milestone.achieved ? 'text-sacred-gold' : 'text-cosmic-400'}>
                          {getMilestoneIcon(milestone.category)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${milestone.achieved ? 'text-sacred-gold' : 'text-white'}`}>
                          {milestone.title}
                        </h3>
                        <p className="text-cosmic-300 text-sm mt-1">
                          {milestone.description}
                        </p>
                        {milestone.achieved && milestone.achievedDate && (
                          <div className="flex items-center mt-2 text-xs text-cosmic-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            Achieved {milestone.achievedDate.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={milestone.achieved ? "default" : "outline"}
                        className={milestone.achieved ? 'bg-sacred-gold text-cosmic-900' : ''}
                      >
                        {milestone.points} pts
                      </Badge>
                      {milestone.achieved && (
                        <div className="mt-2">
                          <Sparkles className="w-4 h-4 text-sacred-gold" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-lg font-sacred text-sacred-silver">
                  Practice Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Meditation', value: 35, color: 'bg-blue-500' },
                    { name: 'Chakra Work', value: 25, color: 'bg-red-500' },
                    { name: 'Protection', value: 20, color: 'bg-green-500' },
                    { name: 'Study', value: 15, color: 'bg-purple-500' },
                    { name: 'Grid Work', value: 5, color: 'bg-yellow-500' }
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded ${item.color}`}></div>
                        <span className="text-sm text-cosmic-100">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-sacred-gold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-lg font-sacred text-sacred-silver">
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="text-sm font-medium text-green-400">Strong Areas</div>
                    <div className="text-xs text-cosmic-300 mt-1">
                      Consistent meditation practice and protection skills
                    </div>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <div className="text-sm font-medium text-yellow-400">Growth Areas</div>
                    <div className="text-xs text-cosmic-300 mt-1">
                      Focus on morphogenetic chakra development
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="text-sm font-medium text-blue-400">Recommendations</div>
                    <div className="text-xs text-cosmic-300 mt-1">
                      Increase Tree Grid sphere exploration and lightbody work
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}