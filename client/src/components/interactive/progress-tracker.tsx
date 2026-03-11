import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Target, Clock, CheckCircle, Plus } from "lucide-react";

interface ProgressData {
  understanding: number;
  practice: number;
  integration: number;
  mastery: number;
  sessions: number;
  streak: number;
  lastSession: string;
  milestones: string[];
}

interface ProgressTrackerProps {
  conceptId: string;
  conceptTerm: string;
}

export function ProgressTracker({ conceptId, conceptTerm }: ProgressTrackerProps) {
  const [progress, setProgress] = useState<ProgressData>({
    understanding: 0,
    practice: 0,
    integration: 0,
    mastery: 0,
    sessions: 0,
    streak: 0,
    lastSession: '',
    milestones: []
  });

  useEffect(() => {
    // Load saved progress
    const saved = localStorage.getItem(`progress-${conceptId}`);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, [conceptId]);

  const saveProgress = (newProgress: ProgressData) => {
    setProgress(newProgress);
    localStorage.setItem(`progress-${conceptId}`, JSON.stringify(newProgress));
  };

  const updateProgress = (area: keyof ProgressData, increment: number) => {
    const newProgress = { ...progress };
    if (typeof newProgress[area] === 'number') {
      newProgress[area] = Math.min(100, (newProgress[area] as number) + increment);
    }
    
    // Update sessions and streak
    newProgress.sessions += 1;
    newProgress.lastSession = new Date().toLocaleDateString();
    
    // Check if it's consecutive day for streak
    const today = new Date().toDateString();
    const lastSessionDate = new Date(progress.lastSession).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (lastSessionDate === yesterday || progress.sessions === 1) {
      newProgress.streak += 1;
    } else if (lastSessionDate !== today) {
      newProgress.streak = 1;
    }

    // Check for milestones
    checkMilestones(newProgress);
    
    saveProgress(newProgress);
  };

  const checkMilestones = (newProgress: ProgressData) => {
    const milestones = [...newProgress.milestones];
    
    if (newProgress.understanding >= 25 && !milestones.includes('First Understanding')) {
      milestones.push('First Understanding');
    }
    if (newProgress.practice >= 50 && !milestones.includes('Consistent Practice')) {
      milestones.push('Consistent Practice');
    }
    if (newProgress.integration >= 75 && !milestones.includes('Deep Integration')) {
      milestones.push('Deep Integration');
    }
    if (newProgress.mastery >= 90 && !milestones.includes('Mastery Achieved')) {
      milestones.push('Mastery Achieved');
    }
    if (newProgress.streak >= 7 && !milestones.includes('Week Streak')) {
      milestones.push('Week Streak');
    }
    if (newProgress.streak >= 30 && !milestones.includes('Month Streak')) {
      milestones.push('Month Streak');
    }
    
    newProgress.milestones = milestones;
  };

  const overallProgress = Math.round(
    (progress.understanding + progress.practice + progress.integration + progress.mastery) / 4
  );

  const progressAreas = [
    { key: 'understanding', label: 'Understanding', color: 'text-blue-400', description: 'Conceptual comprehension' },
    { key: 'practice', label: 'Practice', color: 'text-green-400', description: 'Regular application' },
    { key: 'integration', label: 'Integration', color: 'text-purple-400', description: 'Daily life embodiment' },
    { key: 'mastery', label: 'Mastery', color: 'text-yellow-400', description: 'Teaching and sharing' }
  ];

  return (
    <Card className="sacred-card">
      <CardHeader>
        <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center justify-between">
          <div className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            {conceptTerm} Progress
          </div>
          <Badge variant="outline" className="text-sacred-gold border-sacred-gold/40">
            {overallProgress}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-white">Overall Progress</h4>
            <span className="text-sacred-gold font-bold">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Progress Areas */}
        <div className="space-y-4">
          <h4 className="font-medium text-white">Development Areas</h4>
          {progressAreas.map((area) => (
            <div key={area.key} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className={`font-medium ${area.color}`}>{area.label}</span>
                  <p className="text-xs text-cosmic-400">{area.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-white">{progress[area.key as keyof ProgressData]}%</span>
                  <Button
                    size="sm"
                    onClick={() => updateProgress(area.key as keyof ProgressData, 10)}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Progress 
                value={progress[area.key as keyof ProgressData] as number} 
                className="h-2" 
              />
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-cosmic-700/30">
            <Calendar className="w-5 h-5 mx-auto mb-1 text-blue-400" />
            <div className="text-lg font-bold text-white">{progress.sessions}</div>
            <div className="text-xs text-cosmic-400">Sessions</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-cosmic-700/30">
            <Trophy className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
            <div className="text-lg font-bold text-white">{progress.streak}</div>
            <div className="text-xs text-cosmic-400">Day Streak</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-cosmic-700/30">
            <CheckCircle className="w-5 h-5 mx-auto mb-1 text-green-400" />
            <div className="text-lg font-bold text-white">{progress.milestones.length}</div>
            <div className="text-xs text-cosmic-400">Milestones</div>
          </div>
        </div>

        {/* Milestones */}
        {progress.milestones.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-white">Achievements</h4>
            <div className="flex flex-wrap gap-2">
              {progress.milestones.map((milestone, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-yellow-400 border-yellow-400/40"
                >
                  <Trophy className="w-3 h-3 mr-1" />
                  {milestone}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Last Session */}
        {progress.lastSession && (
          <div className="text-center text-sm text-cosmic-400">
            <Clock className="w-4 h-4 inline mr-1" />
            Last session: {progress.lastSession}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button 
            onClick={() => updateProgress('understanding', 5)}
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            Study Session
          </Button>
          <Button 
            onClick={() => updateProgress('practice', 5)}
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            Practice Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}