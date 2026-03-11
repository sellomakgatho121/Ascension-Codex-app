import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Target,
  Star,
  Award,
  Users,
  Clock
} from 'lucide-react';

interface PersonalizedDashboardProps {
  className?: string;
}

export function PersonalizedDashboard({ className = "" }: PersonalizedDashboardProps) {
  const [activeGoal, setActiveGoal] = useState('chakra-mastery');

  const spiritualGoals = [
    {
      id: 'chakra-mastery',
      title: 'Chakra System Mastery',
      progress: 65,
      timeRemaining: '2 weeks',
      nextMilestone: 'Complete Heart Chakra Integration',
      description: 'Master all 15 chakras with practical application'
    },
    {
      id: 'dna-activation',
      title: '12-Strand DNA Activation',
      progress: 30,
      timeRemaining: '6 weeks',
      nextMilestone: 'Begin Strand 4 Activation',
      description: 'Activate dormant DNA strands for expanded consciousness'
    },
    {
      id: 'lightbody-development',
      title: 'Lightbody Development',
      progress: 45,
      timeRemaining: '8 weeks',
      nextMilestone: 'Level 5 Integration',
      description: 'Build and integrate lightbody frequency layers'
    }
  ];

  const practiceStreak = 28;
  const weeklyGoal = 5;
  const completedSessions = 4;

  const upcomingMilestones = [
    {
      title: 'Complete 30-Day Meditation Streak',
      daysLeft: 2,
      progress: 93,
      timeEstimate: '2 days'
    },
    {
      title: 'Master 12D Shield Protection',
      daysLeft: 5,
      progress: 80,
      timeEstimate: '1 week'
    },
    {
      title: 'Finish Timeline Healing Course',
      daysLeft: 14,
      progress: 60,
      timeEstimate: '2 weeks'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-sacred text-sacred-gold">Your Spiritual Journey</h2>
        <Badge className="bg-sacred-gold/20 text-sacred-gold border-sacred-gold/30">
          Day {practiceStreak} Streak
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-cosmic-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="sacred-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cosmic-300">Practice Streak</CardTitle>
                <TrendingUp className="h-4 w-4 text-sacred-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sacred-gold">{practiceStreak} days</div>
                <p className="text-xs text-cosmic-400">
                  Keep going! You're building strong spiritual momentum.
                </p>
              </CardContent>
            </Card>

            <Card className="sacred-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cosmic-300">Weekly Goal</CardTitle>
                <Target className="h-4 w-4 text-cosmic-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cosmic-blue">{completedSessions}/{weeklyGoal}</div>
                <Progress value={(completedSessions / weeklyGoal) * 100} className="h-2 mt-2" />
                <p className="text-xs text-cosmic-400 mt-1">
                  {weeklyGoal - completedSessions} sessions remaining this week
                </p>
              </CardContent>
            </Card>

            <Card className="sacred-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cosmic-300">Active Goals</CardTitle>
                <Star className="h-4 w-4 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-400">{spiritualGoals.length}</div>
                <p className="text-xs text-cosmic-400">
                  {spiritualGoals.filter(g => g.progress > 50).length} goals over 50% complete
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-sacred-gold">Recommended Practice Today</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-cosmic-800 rounded-lg border border-sacred-gold/20">
                <h4 className="font-semibold text-cosmic-blue mb-2">Heart Chakra Clearing Session</h4>
                <p className="text-sm text-cosmic-300 mb-3">
                  Based on your current goals, this 20-minute guided session will help you progress 
                  toward your chakra mastery milestone.
                </p>
                <div className="flex items-center gap-4">
                  <Button className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80">
                    Start Session
                  </Button>
                  <div className="flex items-center gap-2 text-xs text-cosmic-400">
                    <Clock className="w-3 h-3" />
                    20 minutes
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="space-y-4">
            {spiritualGoals.map((goal) => (
              <Card 
                key={goal.id} 
                className={`sacred-card cursor-pointer transition-all ${
                  activeGoal === goal.id ? 'border-sacred-gold/50' : ''
                }`}
                onClick={() => setActiveGoal(goal.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-sacred-gold">{goal.title}</CardTitle>
                    <Badge variant="outline" className="border-cosmic-blue text-cosmic-blue">
                      {goal.timeRemaining}
                    </Badge>
                  </div>
                  <p className="text-sm text-cosmic-300">{goal.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-cosmic-300">Progress</span>
                      <span className="text-cosmic-100">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="p-3 bg-cosmic-800 rounded">
                    <div className="text-xs text-cosmic-400 mb-1">Next Milestone</div>
                    <div className="text-sm text-cosmic-100">{goal.nextMilestone}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-sacred-gold flex items-center gap-2">
                <Target className="w-5 h-5" />
                Set New Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-cosmic-600 text-cosmic-300 hover:bg-cosmic-800">
                Create Custom Spiritual Goal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-sacred-gold">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: '15-Day Meditation Streak', date: '2 days ago', points: 150 },
                  { title: 'Completed Root Chakra Mastery', date: '1 week ago', points: 200 },
                  { title: 'First Successful 12D Shield', date: '2 weeks ago', points: 100 },
                  { title: 'Finished ES Foundations Course', date: '3 weeks ago', points: 300 }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-cosmic-800 rounded">
                    <Award className="w-6 h-6 text-sacred-gold flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-cosmic-100">{achievement.title}</div>
                      <div className="text-xs text-cosmic-400">{achievement.date}</div>
                    </div>
                    <div className="text-xs text-sacred-gold">+{achievement.points}pts</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-sacred-gold">Practice Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-cosmic-800 rounded">
                    <div className="text-2xl font-bold text-cosmic-blue">156</div>
                    <div className="text-xs text-cosmic-400">Total Sessions</div>
                  </div>
                  <div className="text-center p-3 bg-cosmic-800 rounded">
                    <div className="text-2xl font-bold text-emerald-400">47h</div>
                    <div className="text-xs text-cosmic-400">Total Time</div>
                  </div>
                  <div className="text-center p-3 bg-cosmic-800 rounded">
                    <div className="text-2xl font-bold text-purple-400">12</div>
                    <div className="text-xs text-cosmic-400">Concepts Mastered</div>
                  </div>
                  <div className="text-center p-3 bg-cosmic-800 rounded">
                    <div className="text-2xl font-bold text-amber-400">85%</div>
                    <div className="text-xs text-cosmic-400">Completion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="space-y-4">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-sacred-gold flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMilestones.map((milestone, index) => (
                  <div key={index} className="p-4 bg-cosmic-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{milestone.title}</span>
                      <span className="text-xs text-cosmic-400">{milestone.timeEstimate}</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}