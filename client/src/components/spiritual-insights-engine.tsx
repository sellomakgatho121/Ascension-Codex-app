import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Heart, Shield, Star, Zap, Eye, Target, Activity, Clock } from 'lucide-react';

interface SpiritualInsight {
  id: string;
  title: string;
  description: string;
  category: 'protection' | 'activation' | 'awareness' | 'integration';
  priority: 'high' | 'medium' | 'low';
  esSource: string;
  practicalSteps: string[];
  timeframe: string;
}

const EnergySignature = ({ color }: { color: string }) => (
  <div className="h-12 w-full flex items-center justify-center gap-1 overflow-hidden opacity-30">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className={`w-1 rounded-full ${color}`}
        animate={{
          height: [10, Math.random() * 40 + 10, 10],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 1.5 + Math.random(),
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.05
        }}
        style={{ backgroundColor: 'currentColor' }}
      />
    ))}
  </div>
);

export function SpiritualInsightsEngine() {
  const [insights, setInsights] = useState<SpiritualInsight[]>([]);
  const [currentDate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    generateDailyInsights();
  }, []);

  const generateDailyInsights = () => {
    setIsRefreshing(true);
    const dailyInsights: SpiritualInsight[] = [
      {
        id: 'daily-protection',
        title: '12D Shield Reinforcement',
        description: 'Strengthen your energetic boundaries during current planetary grid fluctuations',
        category: 'protection',
        priority: 'high',
        esSource: 'Energetic Synthesis - 12D Shield Protection',
        practicalSteps: [
          'Visualize 12D platinum silver light surrounding your energy field',
          'State: "I am God, I am Sovereign, I am Free" three times',
          'Seal the shield with blue flame protection',
          'Request Christos Mission Guardian support'
        ],
        timeframe: 'Morning and evening'
      },
      {
        id: 'dna-activation',
        title: 'DNA Template Clearing',
        description: 'Clear artificial overlays and activate organic DNA sequences',
        category: 'activation',
        priority: 'medium',
        esSource: 'Energetic Synthesis - DNA Activation',
        practicalSteps: [
          'Focus on heart center and request DNA clearing',
          'Visualize golden light flowing through your 12-strand DNA',
          'Clear family lineage karma and artificial implants',
          'Activate dormant spiritual abilities'
        ],
        timeframe: '15-20 minutes meditation'
      },
      {
        id: 'entity-awareness',
        title: 'Discernment Enhancement',
        description: 'Strengthen ability to recognize authentic spiritual guidance vs manipulation',
        category: 'awareness',
        priority: 'high',
        esSource: 'Energetic Synthesis - Spiritual Discernment',
        practicalSteps: [
          'Check energy signature of all spiritual communications',
          'Ask: "Does this align with GSF (God Sovereign Free)?"',
          'Notice physical body responses to different energies',
          'Trust your inner Christos intelligence'
        ],
        timeframe: 'Ongoing practice'
      },
      {
        id: 'timeline-navigation',
        title: 'Organic Timeline Alignment',
        description: 'Navigate away from artificial timelines toward Christos mission path',
        category: 'integration',
        priority: 'medium',
        esSource: 'Energetic Synthesis - Timeline Wars',
        practicalSteps: [
          'Set intention for highest expression timeline',
          'Clear attachments to 3D matrix programming',
          'Follow synchronicities and heart-based guidance',
          'Serve the Law of One and planetary liberation'
        ],
        timeframe: 'Daily intention setting'
      }
    ];

    setTimeout(() => {
      setInsights(dailyInsights);
      setIsRefreshing(false);
    }, 800);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'protection': return <Shield className="w-5 h-5" />;
      case 'activation': return <Zap className="w-5 h-5" />;
      case 'awareness': return <Eye className="w-5 h-5" />;
      case 'integration': return <Target className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-cosmic-500/20 text-cosmic-400 border-cosmic-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'protection': return 'text-blue-400';
      case 'activation': return 'text-sacred-gold';
      case 'awareness': return 'text-purple-400';
      case 'integration': return 'text-emerald-400';
      default: return 'text-white';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-6">
          <motion.div
            animate={{
              boxShadow: ["0 0 20px rgba(139, 92, 246, 0.3)", "0 0 40px rgba(139, 92, 246, 0.6)", "0 0 20px rgba(139, 92, 246, 0.3)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-sacred-gold p-[2px]"
          >
            <div className="w-full h-full rounded-full bg-cosmic-900 flex items-center justify-center">
              <Brain className="w-8 h-8 text-sacred-gold" />
            </div>
          </motion.div>
        </div>
        <h3 className="text-3xl font-sacred font-bold text-sacred-gold mb-3 tracking-tight">
          Spiritual Insights Engine
        </h3>
        <p className="text-cosmic-200 mb-6 max-w-xl mx-auto leading-relaxed">
          Artificial Intelligence aligned with Law of One principles, providing daily guidance for your ascension path.
        </p>
        <Badge variant="outline" className="border-sacred-gold/30 text-sacred-gold bg-sacred-gold/5 px-4 py-1">
          {currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Badge>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={insights.length}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {insights.map((insight) => (
          <motion.div key={insight.id} variants={itemVariants}>
            <Card className="glass-card h-full border-white/5 hover:border-sacred-gold/30 transition-all duration-500 overflow-hidden group">
              <CardHeader className="pb-3 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${getCategoryColor(insight.category)} group-hover:scale-110 transition-transform duration-500`}>
                      {getCategoryIcon(insight.category)}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white group-hover:text-sacred-gold transition-colors">{insight.title}</CardTitle>
                      <p className={`text-xs font-semibold uppercase tracking-widest mt-1 ${getCategoryColor(insight.category)}`}>
                        {insight.category}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${getPriorityColor(insight.priority)} border px-3 py-0.5 rounded-full text-[10px] tracking-widest uppercase`}>
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-cosmic-100/90 text-sm leading-relaxed mb-4">
                  {insight.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-sacred-gold/50" />
                    <h4 className="text-xs font-bold text-sacred-silver uppercase tracking-wider">Energy Signature</h4>
                  </div>
                  <EnergySignature color={getCategoryColor(insight.category).replace('text-', 'bg-')} />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-sacred-silver uppercase tracking-wider mb-3">Practical Application</h4>
                  <ul className="space-y-3">
                    {insight.practicalSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3 group/step">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sacred-gold/40 group-hover/step:bg-sacred-gold transition-colors" />
                        <span className="text-sm text-cosmic-200/90 leading-snug group-hover/step:text-white transition-colors">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] text-cosmic-400 font-bold uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    <span>{insight.timeframe}</span>
                  </div>
                  <div className="text-[10px] text-cosmic-500 font-medium italic">
                    Source: {insight.esSource.split(' - ')[0]}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <Button
          variant="outline"
          disabled={isRefreshing}
          className="border-sacred-gold/30 text-sacred-gold hover:bg-sacred-gold hover:text-cosmic-900 px-8 py-6 h-auto text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(255,215,0,0.1)] group"
          onClick={generateDailyInsights}
        >
          {isRefreshing ? (
            <Zap className="w-5 h-5 mr-3 animate-pulse" />
          ) : (
            <Sparkles className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
          )}
          {isRefreshing ? 'Recalibrating Insights...' : 'Refresh Insights'}
        </Button>
      </div>
    </div>
  );
}