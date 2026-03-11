import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressDashboard } from "@/components/progress-dashboard";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { AdvancedProgressTracker } from "@/components/advanced-progress-tracker";
import { ProgressVisualization } from "@/components/progress-visualization";
import { PersonalizedDashboard } from "@/components/personalized-dashboard";
import { 
  TrendingUp, 
  Calendar, 
  Award, 
  Target, 
  Atom, 
  Layers, 
  TreePine, 
  Shield,
  Clock,
  CheckCircle,
  Star,
  Zap
} from "lucide-react";
import type { UserProgress, MeditationSession } from "@shared/schema";

export default function ProgressPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  // Fetch user progress for demo user (ID: 1)
  const { data: progress } = useQuery<UserProgress>({
    queryKey: ["/api/progress", 1],
  });

  const { data: sessions } = useQuery<MeditationSession[]>({
    queryKey: ["/api/sessions", 1],
  });

  const achievements = [
    {
      id: "first_chakra",
      title: "First Chakra Activation",
      description: "Successfully activated your first chakra",
      icon: <Atom className="w-6 h-6" />,
      completed: progress?.chakraProgress?.physicalChakras.length > 0,
      category: "chakra"
    },
    {
      id: "chakra_master",
      title: "Chakra Master",
      description: "Activated all 7 physical chakras",
      icon: <Star className="w-6 h-6" />,
      completed: progress?.chakraProgress?.physicalChakras.length >= 7,
      category: "chakra"
    },
    {
      id: "lightbody_initiate",
      title: "Lightbody Initiate",
      description: "Began lightbody integration process",
      icon: <Layers className="w-6 h-6" />,
      completed: progress?.lightbodyProgress?.integrationLevel > 10,
      category: "lightbody"
    },
    {
      id: "shield_guardian",
      title: "Shield Guardian",
      description: "Mastered 12D shield activation",
      icon: <Shield className="w-6 h-6" />,
      completed: sessions?.some(s => s.type === "protection"),
      category: "protection"
    },
    {
      id: "tree_grid_explorer",
      title: "Tree Grid Explorer",
      description: "Explored the 12-Tree Grid system",
      icon: <TreePine className="w-6 h-6" />,
      completed: progress?.gridProgress?.activatedSpheres.length > 0,
      category: "grid"
    },
    {
      id: "meditation_practitioner",
      title: "Meditation Practitioner",
      description: "Completed 10 meditation sessions",
      icon: <Clock className="w-6 h-6" />,
      completed: sessions?.length >= 10,
      category: "meditation"
    }
  ];

  const weeklyGoals = [
    {
      id: "daily_meditation",
      title: "Daily Meditation Practice",
      description: "Complete at least one meditation session daily",
      target: 7,
      current: sessions?.filter(s => {
        const sessionDate = new Date(s.completedAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return sessionDate >= weekAgo;
      }).length || 0,
      category: "meditation"
    },
    {
      id: "chakra_work",
      title: "Chakra Integration",
      description: "Work with 3 new chakras this week",
      target: 3,
      current: Math.min(progress?.chakraProgress?.completedChakras.length || 0, 3),
      category: "chakra"
    },
    {
      id: "shield_practice",
      title: "Protection Practice",
      description: "Practice 12D shield activation 5 times",
      target: 5,
      current: sessions?.filter(s => s.type === "protection").length || 0,
      category: "protection"
    }
  ];

  const getCompletionPercentage = () => {
    const totalElements = 15 + 7 + 12 + 5; // chakras + lightbody + grid + shields
    const completed = (progress?.chakraProgress?.completedChakras.length || 0) +
                     (progress?.lightbodyProgress?.activatedLayers.length || 0) +
                     (progress?.gridProgress?.activatedSpheres.length || 0) +
                     (progress?.gridProgress?.shieldIntegration.length || 0);
    return Math.round((completed / totalElements) * 100);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "chakra": return <Atom className="w-4 h-4" />;
      case "lightbody": return <Layers className="w-4 h-4" />;
      case "grid": return <TreePine className="w-4 h-4" />;
      case "protection": return <Shield className="w-4 h-4" />;
      case "meditation": return <Clock className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full transform rotate-45 sacred-geometry-bg"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
            Spiritual Progress
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Track your ascension journey and spiritual development across all energy systems
          </p>
          <div className="flex items-center justify-center space-x-8 text-cosmic-100">
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-sacred-gold" />
              <span>Development Tracking</span>
            </div>
            <div className="flex items-center">
              <Award className="w-6 h-6 mr-2 text-sacred-gold" />
              <span>Achievements</span>
            </div>
            <div className="flex items-center">
              <Target className="w-6 h-6 mr-2 text-sacred-gold" />
              <span>Goals & Milestones</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Progress */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Card className="sacred-card mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                <TrendingUp className="w-8 h-8 mr-3" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-sacred-gold mb-2">
                      {getCompletionPercentage()}%
                    </div>
                    <p className="text-cosmic-100">Spiritual Development Complete</p>
                  </div>
                  <Progress value={getCompletionPercentage()} className="h-3" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-cosmic-100">Chakras:</span>
                      <span className="text-sacred-gold font-bold">
                        {progress?.chakraProgress?.completedChakras.length || 0}/15
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cosmic-100">Lightbody:</span>
                      <span className="text-sacred-gold font-bold">
                        {progress?.lightbodyProgress?.activatedLayers.length || 0}/7
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-cosmic-100">Tree Grid:</span>
                      <span className="text-sacred-gold font-bold">
                        {progress?.gridProgress?.activatedSpheres.length || 0}/12
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cosmic-100">Sessions:</span>
                      <span className="text-sacred-gold font-bold">
                        {sessions?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detailed Progress */}
      <section className="py-12 bg-gradient-to-b from-cosmic-900 to-cosmic-700">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="systems" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-cosmic-700/50">
              <TabsTrigger value="systems">Energy Systems</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="systems" className="space-y-8">
              <ProgressTracker userId={1} />
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <h2 className="text-2xl font-sacred text-sacred-gold mb-6">Achievements</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`sacred-card ${achievement.completed ? 'border-sacred-gold/60' : 'border-cosmic-700/50'}`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        achievement.completed 
                          ? 'bg-sacred-gold/20 text-sacred-gold' 
                          : 'bg-cosmic-700/50 text-cosmic-500'
                      }`}>
                        {achievement.completed ? 
                          <CheckCircle className="w-8 h-8" /> : 
                          achievement.icon
                        }
                      </div>
                      <h3 className={`font-sacred font-bold mb-2 ${
                        achievement.completed ? 'text-sacred-gold' : 'text-cosmic-300'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-cosmic-100 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                      <div className="mt-4">
                        <Badge 
                          variant="outline" 
                          className={`${
                            achievement.completed 
                              ? 'border-sacred-gold/50 text-sacred-gold' 
                              : 'border-cosmic-500/50 text-cosmic-500'
                          }`}
                        >
                          {getCategoryIcon(achievement.category)}
                          <span className="ml-1">
                            {achievement.completed ? 'Completed' : 'Locked'}
                          </span>
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <h2 className="text-2xl font-sacred text-sacred-gold mb-6">Weekly Goals</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weeklyGoals.map((goal) => (
                  <Card key={goal.id} className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-sacred-silver flex items-center">
                        {getCategoryIcon(goal.category)}
                        <span className="ml-2">{goal.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-cosmic-100 text-sm leading-relaxed">
                        {goal.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cosmic-300">Progress</span>
                          <span className="text-sacred-gold font-bold">
                            {goal.current}/{goal.target}
                          </span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${
                          goal.current >= goal.target 
                            ? 'border-green-400/50 text-green-400' 
                            : 'border-yellow-400/50 text-yellow-400'
                        }`}
                      >
                        {goal.current >= goal.target ? 'Complete' : 'In Progress'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <h2 className="text-2xl font-sacred text-sacred-gold mb-6">Recent Activity</h2>
              <Card className="sacred-card">
                <CardContent className="p-6">
                  {sessions && sessions.length > 0 ? (
                    <div className="space-y-4">
                      {sessions.slice(0, 10).map((session) => (
                        <div key={session.id} className="flex items-center justify-between py-3 border-b border-cosmic-700/30 last:border-b-0">
                          <div className="flex items-center space-x-3">
                            {getCategoryIcon(session.type)}
                            <div>
                              <div className="text-white font-medium">{session.type}</div>
                              <div className="text-cosmic-300 text-sm">
                                {session.focusArea} • {session.duration} minutes
                              </div>
                            </div>
                          </div>
                          <div className="text-cosmic-300 text-sm">
                            {session.completedAt ? new Date(session.completedAt).toLocaleDateString() : 'Today'}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 text-cosmic-500 mx-auto mb-4" />
                      <h3 className="text-lg font-sacred text-cosmic-300 mb-2">No Activity Yet</h3>
                      <p className="text-cosmic-100">Start your spiritual practice to see your progress history</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}