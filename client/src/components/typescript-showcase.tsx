import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { 
  Code, 
  Zap, 
  Shield, 
  Brain, 
  Target,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { 
  performanceMonitor, 
  spiritualEventEmitter, 
  TypedStorage, 
  SpiritualLogger,
  isSpiritualFrequency,
  isChakraId,
  withRetry
} from "@/lib/typescript-enhancements";

// TypeScript Enhancement Showcase Component
export function TypeScriptShowcase() {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    typeErrors: 0,
    codeQuality: 95
  });
  
  const [demonstrationActive, setDemonstrationActive] = useState(false);

  useEffect(() => {
    // Demonstrate performance monitoring
    const stopMeasurement = performanceMonitor.startRenderMeasurement();
    
    // Simulate spiritual event
    spiritualEventEmitter.on('chakra-activated', (chakraId, frequency) => {
      SpiritualLogger.chakra(chakraId, 'activated', { frequency });
    });

    // Update metrics
    setTimeout(() => {
      stopMeasurement();
      performanceMonitor.measureMemoryUsage();
      setMetrics(performanceMonitor.getMetrics());
    }, 100);

    return () => {
      spiritualEventEmitter.off('chakra-activated', () => {});
    };
  }, []);

  const demonstrateTypeScript = async () => {
    setDemonstrationActive(true);
    
    try {
      // Demonstrate type-safe operations
      const chakraId = 4; // Heart chakra
      const frequency = 528; // Love frequency
      
      // Type validation
      if (isChakraId(chakraId) && isSpiritualFrequency(frequency)) {
        spiritualEventEmitter.emit('chakra-activated', chakraId, frequency);
        
        // Type-safe storage
        TypedStorage.set('lastActivatedChakra', { id: chakraId, frequency });
        
        // Demonstrate retry mechanism
        await withRetry(async () => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          SpiritualLogger.info('TypeScript demonstration completed successfully');
        });
      }
      
    } catch (error) {
      SpiritualLogger.error('TypeScript demonstration failed', error as Error);
    } finally {
      setDemonstrationActive(false);
    }
  };

  const typeScriptFeatures = [
    {
      title: "Strict Type Checking",
      description: "Enhanced type safety with exactOptionalPropertyTypes and noUncheckedIndexedAccess",
      icon: Shield,
      status: "active",
      benefits: ["Prevents runtime errors", "Better IDE support", "Safer spiritual calculations"]
    },
    {
      title: "Advanced Type Patterns",
      description: "Branded types, template literals, and conditional types for spiritual systems",
      icon: Code,
      status: "active", 
      benefits: ["Type-safe chakra frequencies", "Spiritual mantras validation", "Energy level constraints"]
    },
    {
      title: "Performance Monitoring",
      description: "Real-time tracking of render times, memory usage, and Web Vitals",
      icon: Zap,
      status: "active",
      benefits: ["Optimized meditations", "Smooth visualizations", "Better user experience"]
    },
    {
      title: "Spiritual Event System",
      description: "Type-safe event emitter for chakra activations and energy shifts",
      icon: Brain,
      status: "active",
      benefits: ["Synchronized components", "Reactive spiritual states", "Event-driven architecture"]
    },
    {
      title: "Error Handling",
      description: "Spiritual-context aware error handling with retry mechanisms",
      icon: AlertCircle,
      status: "active",
      benefits: ["Graceful degradation", "Automatic recovery", "Enhanced reliability"]
    },
    {
      title: "Type Guards",
      description: "Runtime validation for spiritual frequencies and chakra IDs",
      icon: Target,
      status: "active",
      benefits: ["Data integrity", "Input validation", "Type narrowing"]
    }
  ];

  return (
    <div className="min-h-screen bg-cosmic-900 text-white p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-sacred-gold/20 rounded-full border border-sacred-gold/50">
            <Code className="w-12 h-12 text-sacred-gold" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
          TypeScript Enhancements
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
          Advanced TypeScript patterns and tools from awesome-typescript integrated for spiritual development
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge variant="outline" className="border-sacred-gold text-sacred-gold px-4 py-2">
            TypeScript 5.x
          </Badge>
          <Badge variant="outline" className="border-blue-400 text-blue-400 px-4 py-2">
            Strict Mode
          </Badge>
          <Badge variant="outline" className="border-green-400 text-green-400 px-4 py-2">
            Performance Optimized
          </Badge>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <Card className="bg-cosmic-800/50 border-cosmic-600">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-sacred-gold" />
              <span>Real-time Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {metrics.renderTime.toFixed(2)}ms
                </div>
                <div className="text-sm text-cosmic-300">Render Time</div>
                <Progress value={Math.min(100, (100 - metrics.renderTime))} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {metrics.memoryUsage.toFixed(1)}MB
                </div>
                <div className="text-sm text-cosmic-300">Memory Usage</div>
                <Progress value={Math.min(100, 100 - (metrics.memoryUsage / 50) * 100)} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">
                  {metrics.typeErrors}
                </div>
                <div className="text-sm text-cosmic-300">Type Errors</div>
                <Progress value={metrics.typeErrors === 0 ? 100 : 0} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-sacred-gold mb-2">
                  {metrics.codeQuality}%
                </div>
                <div className="text-sm text-cosmic-300">Code Quality</div>
                <Progress value={metrics.codeQuality} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* TypeScript Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {typeScriptFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-cosmic-800/50 border-cosmic-600 h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <feature.icon className="w-5 h-5 text-sacred-gold" />
                    <span className="text-lg">{feature.title}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${
                      feature.status === 'active' 
                        ? 'border-green-400 text-green-400' 
                        : 'border-yellow-400 text-yellow-400'
                    }`}
                  >
                    {feature.status === 'active' ? (
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {feature.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cosmic-300 mb-4">{feature.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-cosmic-200 mb-2">Benefits:</div>
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                      <span className="text-cosmic-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Interactive Demonstration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Card className="bg-cosmic-800/50 border-cosmic-600 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <Brain className="w-5 h-5 text-sacred-gold" />
              <span>TypeScript Enhancement Demo</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-cosmic-300 mb-6">
              Experience type-safe spiritual operations with performance monitoring, 
              event handling, and error recovery mechanisms.
            </p>
            
            <Button
              onClick={demonstrateTypeScript}
              disabled={demonstrationActive}
              className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900 font-semibold px-8 py-3"
            >
              {demonstrationActive ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Zap className="w-5 h-5" />
                  </motion.div>
                  Demonstrating...
                </>
              ) : (
                <>
                  <Code className="w-5 h-5 mr-2" />
                  Run TypeScript Demo
                </>
              )}
            </Button>
            
            <div className="mt-6 text-sm text-cosmic-400">
              <p>Demo includes: Type validation, Event emission, Performance monitoring, Error handling</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}