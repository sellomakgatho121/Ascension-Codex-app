import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Target, 
  Calendar, 
  Clock, 
  Star,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Shield,
  Heart,
  Eye,
  Zap
} from 'lucide-react';

interface PersonalizedLearningPathProps {
  userLevel?: 'beginner' | 'developing' | 'intermediate' | 'advanced' | 'master';
  interests?: string[];
  timeAvailable?: number; // minutes per day
  className?: string;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: number; // in days
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  icon: React.ComponentType<any>;
  prerequisites?: string[];
  outcomes: string[];
  practices: string[];
}

const learningModules: LearningModule[] = [
  {
    id: 'es-foundations',
    title: 'ES Foundations',
    description: 'Core concepts of Energetic Synthesis teachings and spiritual framework',
    duration: 14,
    difficulty: 'beginner',
    category: 'Foundation',
    icon: BookOpen,
    outcomes: ['Understand ES terminology', 'Know basic spiritual protection', 'Recognize negative interference'],
    practices: ['Daily reading', 'Basic 12D Shield', 'Journaling insights']
  },
  {
    id: 'psychic-protection',
    title: 'Psychic Protection Mastery',
    description: 'Advanced techniques for spiritual warfare and entity clearing',
    duration: 21,
    difficulty: 'intermediate',
    category: 'Protection',
    icon: Shield,
    prerequisites: ['es-foundations'],
    outcomes: ['Master 12D Shield variations', 'Clear entity attachments', 'Protect others'],
    practices: ['Daily protection rituals', 'Entity scanning', 'Group protection work']
  },
  {
    id: 'chakra-mastery',
    title: '15-Chakra System Mastery',
    description: 'Complete understanding and activation of all 15 chakras',
    duration: 28,
    difficulty: 'intermediate',
    category: 'Energy Work',
    icon: Heart,
    prerequisites: ['es-foundations'],
    outcomes: ['Activate all 15 chakras', 'Balance energy centers', 'Teach chakra work'],
    practices: ['Daily chakra meditation', 'Color therapy', 'Sound healing']
  },
  {
    id: 'lightbody-activation',
    title: 'Lightbody Activation',
    description: 'DNA activation and lightbody development through 7 layers',
    duration: 35,
    difficulty: 'advanced',
    category: 'Evolution',
    icon: Star,
    prerequisites: ['chakra-mastery', 'psychic-protection'],
    outcomes: ['Activate dormant DNA', 'Build lightbody layers', 'Increase frequency'],
    practices: ['Frequency work', 'DNA activation codes', 'Light meditation']
  },
  {
    id: 'discernment-mastery',
    title: 'Spiritual Discernment',
    description: 'Advanced discernment techniques for spiritual deception',
    duration: 18,
    difficulty: 'intermediate',
    category: 'Wisdom',
    icon: Eye,
    prerequisites: ['es-foundations'],
    outcomes: ['Identify false light', 'Test spiritual information', 'Guide others in discernment'],
    practices: ['Information testing', 'Source verification', 'Discernment exercises']
  },
  {
    id: 'service-activation',
    title: 'Spiritual Service',
    description: 'Preparing for and engaging in spiritual service to others',
    duration: 42,
    difficulty: 'advanced',
    category: 'Service',
    icon: Target,
    prerequisites: ['lightbody-activation', 'discernment-mastery'],
    outcomes: ['Identify service mission', 'Develop healing abilities', 'Lead spiritual groups'],
    practices: ['Service meditation', 'Healing practice', 'Group leadership']
  }
];

export function PersonalizedLearningPath({ 
  userLevel = 'beginner', 
  interests = [], 
  timeAvailable = 30,
  className = "" 
}: PersonalizedLearningPathProps) {
  const [selectedPath, setSelectedPath] = useState<'structured' | 'flexible' | 'intensive'>('structured');
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  // Filter modules based on user level and completed prerequisites
  const getAvailableModules = () => {
    return learningModules.filter(module => {
      // Check difficulty level
      const difficultyOrder = ['beginner', 'intermediate', 'advanced'];
      const userLevelIndex = difficultyOrder.indexOf(userLevel);
      const moduleLevelIndex = difficultyOrder.indexOf(module.difficulty);
      
      if (moduleLevelIndex > userLevelIndex + 1) return false;
      
      // Check prerequisites
      if (module.prerequisites) {
        return module.prerequisites.every(prereq => completedModules.includes(prereq));
      }
      
      return true;
    });
  };

  const createLearningPath = () => {
    const availableModules = getAvailableModules();
    const path = [];
    
    // Always start with foundations if not completed
    if (!completedModules.includes('es-foundations')) {
      path.push(learningModules.find(m => m.id === 'es-foundations')!);
    }
    
    // Add modules based on interests and level
    const remainingModules = availableModules.filter(m => 
      !path.includes(m) && !completedModules.includes(m.id)
    );
    
    // Sort by user preferences
    remainingModules.sort((a, b) => {
      const aInterest = interests.includes(a.category.toLowerCase()) ? 1 : 0;
      const bInterest = interests.includes(b.category.toLowerCase()) ? 1 : 0;
      return bInterest - aInterest;
    });
    
    path.push(...remainingModules.slice(0, 4));
    return path;
  };

  const learningPath = createLearningPath();
  const totalDuration = learningPath.reduce((sum, module) => sum + module.duration, 0);
  const dailyTimeNeeded = Math.ceil(totalDuration * 20 / timeAvailable); // 20 min average per day per module

  const toggleModuleCompletion = (moduleId: string) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-sacred-gold">
            Your Personalized Learning Path
          </CardTitle>
          <p className="text-cosmic-300">
            Customized for {userLevel} level • {timeAvailable} minutes daily available
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-cosmic-800 rounded">
              <div className="text-2xl font-bold text-sacred-gold">{learningPath.length}</div>
              <div className="text-sm text-cosmic-300">Modules</div>
            </div>
            <div className="text-center p-4 bg-cosmic-800 rounded">
              <div className="text-2xl font-bold text-cosmic-blue">{totalDuration}</div>
              <div className="text-sm text-cosmic-300">Days Total</div>
            </div>
            <div className="text-center p-4 bg-cosmic-800 rounded">
              <div className="text-2xl font-bold text-emerald-400">{dailyTimeNeeded}</div>
              <div className="text-sm text-cosmic-300">Daily Minutes</div>
            </div>
          </div>

          <Tabs value={selectedPath} onValueChange={(value: any) => setSelectedPath(value)}>
            <TabsList className="grid w-full grid-cols-3 bg-cosmic-700">
              <TabsTrigger value="structured">Structured Path</TabsTrigger>
              <TabsTrigger value="flexible">Flexible Path</TabsTrigger>
              <TabsTrigger value="intensive">Intensive Path</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedPath} className="space-y-4 mt-6">
              <div className="space-y-4">
                {learningPath.map((module, index) => {
                  const isCompleted = completedModules.includes(module.id);
                  const isAvailable = !module.prerequisites || 
                    module.prerequisites.every(prereq => completedModules.includes(prereq));
                  const Icon = module.icon;

                  return (
                    <Card key={module.id} className={`transition-all ${
                      isCompleted ? 'bg-green-900/20 border-green-400/30' : 
                      isAvailable ? 'cosmic-card hover:border-sacred-gold/30' : 
                      'cosmic-card opacity-50'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-full ${
                            isCompleted ? 'bg-green-400' : 
                            isAvailable ? 'bg-sacred-gold' : 'bg-cosmic-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <Icon className="w-6 h-6 text-cosmic-900" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold text-cosmic-100">
                                {index + 1}. {module.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="border-cosmic-400 text-cosmic-300">
                                  {module.difficulty}
                                </Badge>
                                <Badge variant="outline" className="border-cosmic-400 text-cosmic-300">
                                  {module.duration} days
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-cosmic-300 mb-4">{module.description}</p>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h4 className="text-sm font-semibold text-cosmic-blue mb-2">Learning Outcomes</h4>
                                <ul className="text-sm text-cosmic-300 space-y-1">
                                  {module.outcomes.map((outcome, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <div className="w-1 h-1 bg-cosmic-blue rounded-full" />
                                      {outcome}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold text-emerald-400 mb-2">Daily Practices</h4>
                                <ul className="text-sm text-cosmic-300 space-y-1">
                                  {module.practices.map((practice, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                                      {practice}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            {module.prerequisites && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-amber-400 mb-2">Prerequisites</h4>
                                <div className="flex gap-2">
                                  {module.prerequisites.map(prereq => (
                                    <Badge key={prereq} variant="outline" className="border-amber-400 text-amber-400">
                                      {learningModules.find(m => m.id === prereq)?.title}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-cosmic-400">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {Math.ceil(module.duration * 20 / timeAvailable)} min/day
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {module.duration} days
                                </div>
                              </div>
                              
                              <Button
                                onClick={() => toggleModuleCompletion(module.id)}
                                disabled={!isAvailable}
                                variant={isCompleted ? "outline" : "default"}
                                size="sm"
                                className={isCompleted ? "border-green-400 text-green-400" : "bg-sacred-gold text-cosmic-900"}
                              >
                                {isCompleted ? 'Completed' : 'Start Module'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}