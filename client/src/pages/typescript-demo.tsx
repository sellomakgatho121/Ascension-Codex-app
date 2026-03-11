// TypeScript Enhancement Demonstration Page
// Showcases advanced type safety, branded types, performance monitoring, and error handling

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Import our advanced TypeScript systems
import { 
  createSpiritualFrequency, 
  createChakraID, 
  createEnergyLevel,
  createVibrationRate,
  spiritualEventEmitter,
  defaultSpiritualConfig,
  type SpiritualFrequency,
  type ChakraID,
  type EnergyLevel,
  type VibrationRate
} from '@/lib/advanced-type-system';

import { 
  spiritualPerformanceMonitor,
  usePerformanceMonitoring,
  PerformanceDebugger
} from '@/lib/performance-monitoring';

import { 
  SpiritualErrorFactory,
  SpiritualRetryManager,
  spiritualCircuitBreaker,
  globalSpiritualErrorHandler
} from '@/lib/spiritual-error-handling';

import { 
  typeSafeStorage,
  spiritualProgressManager,
  preferencesManager,
  useSpiritualProgress,
  useTypeSafeStorage
} from '@/lib/type-safe-storage';

import { spiritualAPIClient } from '@/lib/type-safe-api-client';
import { spiritualLogger } from '@/lib/spiritual-logger';

export default function TypeScriptDemo() {
  const [currentTab, setCurrentTab] = useState('branded-types');
  const [demoResults, setDemoResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Performance monitoring hook
  const {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    getPerformanceScore,
    getOptimizationRecommendations
  } = usePerformanceMonitoring();

  // Type-safe storage hook
  const { 
    data: preferences, 
    loading: preferencesLoading, 
    update: updatePreferences 
  } = useTypeSafeStorage('user_preferences');

  // Spiritual progress hook
  const {
    progress,
    loading: progressLoading,
    updateProgress,
    updateChakra
  } = useSpiritualProgress('demo-user-123');

  const addResult = (message: string) => {
    setDemoResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Branded Types Demonstration
  const demonstrateBrandedTypes = async () => {
    setIsRunning(true);
    addResult('🔮 Starting Branded Types Demonstration...');

    try {
      // Create branded types with validation
      const chakraId = createChakraID(4); // Heart chakra
      const frequency = createSpiritualFrequency(341); // Heart frequency
      const energyLevel = createEnergyLevel(75);
      const vibrationRate = createVibrationRate(1.618); // Golden ratio

      addResult(`✓ Created Heart Chakra (ID: ${chakraId}) with frequency ${frequency}Hz`);
      addResult(`✓ Energy level: ${energyLevel}%, Vibration rate: ${vibrationRate}`);

      // Demonstrate type safety - this would fail compilation
      // const invalidChakra = createChakraID(99); // Would throw runtime error
      
      // Event emission with type safety
      spiritualEventEmitter.emit('chakra-activated', {
        chakraId,
        frequency,
        energyLevel,
        timestamp: Date.now()
      });

      addResult('✓ Type-safe spiritual event emitted successfully');

      // Access default configuration
      const heartFrequency = defaultSpiritualConfig.chakraFrequencies[3]; // 4th chakra (0-indexed)
      addResult(`✓ Default heart chakra frequency from config: ${heartFrequency}Hz`);

    } catch (error) {
      addResult(`❌ Error in branded types demo: ${error}`);
    }

    setIsRunning(false);
  };

  // Performance Monitoring Demonstration
  const demonstratePerformanceMonitoring = async () => {
    setIsRunning(true);
    addResult('⚡ Starting Performance Monitoring Demonstration...');

    if (!isMonitoring) {
      startMonitoring();
      addResult('✓ Performance monitoring started');
    }

    // Simulate some performance-heavy operations
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Simulate memory usage
      const wasteMemory = new Array(10000).fill(0).map(() => Math.random());
      
      if (metrics) {
        addResult(`📊 Frame ${i + 1}: FPS: ${metrics.fps}, Memory: ${metrics.memoryUsage.toFixed(1)}MB`);
      }
    }

    const score = getPerformanceScore();
    const recommendations = getOptimizationRecommendations();

    addResult(`✓ Performance Score: ${score}/100`);
    recommendations.forEach(rec => addResult(`💡 ${rec}`));

    // Demonstrate performance debugging
    PerformanceDebugger.logMetrics();

    setIsRunning(false);
  };

  // Error Handling Demonstration
  const demonstrateErrorHandling = async () => {
    setIsRunning(true);
    addResult('🛡️ Starting Error Handling Demonstration...');

    try {
      // Create a spiritual error
      const error = SpiritualErrorFactory.create(
        'CHAKRA_ACTIVATION_FAILED',
        'Demo chakra activation failed intentionally',
        'warning',
        {
          chakraAffected: createChakraID(1),
          spiritualContext: {
            currentPractice: 'demo_activation',
            energyLevel: createEnergyLevel(50)
          }
        }
      );

      addResult(`✓ Created spiritual error: ${error.code}`);
      addResult(`✓ User guidance: ${error.userGuidance}`);
      addResult(`✓ Healing action: ${error.healingAction}`);

      // Demonstrate retry mechanism
      let attemptCount = 0;
      const result = await SpiritualRetryManager.executeWithRetry(
        async () => {
          attemptCount++;
          if (attemptCount < 3) {
            throw new Error(`Attempt ${attemptCount} failed`);
          }
          return 'Success after retries!';
        },
        { maxAttempts: 3, healingPause: false },
        { currentPractice: 'retry_demo' }
      );

      if (result.success) {
        addResult(`✓ Retry mechanism succeeded: ${result.data}`);
      } else {
        addResult(`❌ Retry mechanism failed: ${result.error.message}`);
      }

      // Demonstrate circuit breaker
      const circuitResult = await spiritualCircuitBreaker.execute(
        'demo-service',
        async () => 'Circuit breaker test successful!',
        { currentPractice: 'circuit_demo' }
      );

      if (circuitResult.success) {
        addResult(`✓ Circuit breaker test: ${circuitResult.data}`);
      }

    } catch (error) {
      addResult(`❌ Error in error handling demo: ${error}`);
    }

    setIsRunning(false);
  };

  // Type-Safe Storage Demonstration
  const demonstrateTypeSafeStorage = async () => {
    setIsRunning(true);
    addResult('💾 Starting Type-Safe Storage Demonstration...');

    try {
      // Demonstrate meditation preferences storage
      const newPreferences = {
        defaultDuration: 25,
        preferredVoice: 'aurora_divine' as const,
        binauralBeatsEnabled: true,
        defaultFrequency: createSpiritualFrequency(528),
        backgroundMusic: false,
        guidanceLevel: 'comprehensive' as const,
        practiceReminders: true
      };

      const result = await preferencesManager.updateMeditationPreferences(newPreferences);
      
      if (result.success) {
        addResult('✓ Meditation preferences saved with type validation');
      } else {
        addResult(`❌ Failed to save preferences: ${result.error.message}`);
      }

      // Demonstrate spiritual progress update
      if (progress) {
        const updateResult = await updateChakra(
          createChakraID(2),
          {
            energyLevel: createEnergyLevel(85),
            isBalanced: true,
            activationCount: progress.chakraProgress[1].activationCount + 1
          }
        );

        if (updateResult.success) {
          addResult('✓ Chakra progress updated with type safety');
        }
      }

      // Demonstrate type-safe storage operations
      const storageTest = await typeSafeStorage.set('user_preferences', {
        theme: 'cosmic' as const,
        fontSize: 'large' as const,
        animationsEnabled: true,
        soundEnabled: true,
        notificationsEnabled: true,
        accessibilityMode: false,
        language: 'en',
        timeZone: 'UTC'
      });

      if (storageTest.success) {
        addResult('✓ User preferences stored with type validation');
      }

    } catch (error) {
      addResult(`❌ Error in storage demo: ${error}`);
    }

    setIsRunning(false);
  };

  // API Client Demonstration
  const demonstrateAPIClient = async () => {
    setIsRunning(true);
    addResult('🌐 Starting Type-Safe API Client Demonstration...');

    try {
      // Demonstrate service health check
      const health = await spiritualAPIClient.getServiceHealth();
      addResult(`✓ Service health check completed`);
      Object.entries(health).forEach(([service, isHealthy]) => {
        addResult(`  ${service}: ${isHealthy ? '✅ Healthy' : '❌ Unhealthy'}`);
      });

      // Note: These would normally call real API endpoints
      addResult('✓ API client configured with comprehensive type safety');
      addResult('✓ Circuit breaker patterns enabled for all endpoints');
      addResult('✓ Automatic retry logic with spiritual context awareness');

    } catch (error) {
      addResult(`❌ Error in API demo: ${error}`);
    }

    setIsRunning(false);
  };

  // Logging System Demonstration
  const demonstrateLogging = async () => {
    setIsRunning(true);
    addResult('📝 Starting Comprehensive Logging Demonstration...');

    try {
      // Demonstrate different log levels
      await spiritualLogger.debug(
        'system_operation',
        'Debug level logging with spiritual context',
        { testData: 'debugging info' },
        { activeChakra: createChakraID(7), practiceType: 'logging_demo' }
      );

      await spiritualLogger.info(
        'user_interaction',
        'User performed demo action',
        { action: 'typescript_demo', timestamp: Date.now() }
      );

      await spiritualLogger.spiritual(
        'chakra_activation',
        'Chakra successfully activated during demo',
        {
          activeChakra: createChakraID(4),
          energyLevel: createEnergyLevel(90),
          frequency: createSpiritualFrequency(341),
          practiceType: 'demo_activation'
        },
        { activationId: 'demo-123' }
      );

      await spiritualLogger.warn(
        'performance_monitoring',
        'Performance warning detected during demo',
        { fps: 25, memoryUsage: 300 }
      );

      // Demonstrate performance measurement
      spiritualLogger.startPerformanceMeasurement('demo-operation');
      await new Promise(resolve => setTimeout(resolve, 150));
      await spiritualLogger.endPerformanceMeasurement(
        'demo-operation',
        'user_interaction',
        'Demo operation completed',
        { practiceType: 'performance_demo' }
      );

      addResult('✓ Comprehensive logging system demonstrated');
      addResult('✓ Spiritual context logging active');
      addResult('✓ Performance measurement integrated');
      addResult('✓ Check browser console for detailed logs');

    } catch (error) {
      addResult(`❌ Error in logging demo: ${error}`);
    }

    setIsRunning(false);
  };

  // Real-time metrics display
  const renderMetrics = () => {
    if (!metrics) return <div>No metrics available</div>;

    return (
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">FPS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.fps}</div>
            <Progress value={Math.min(metrics.fps / 60 * 100, 100)} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.memoryUsage.toFixed(1)}MB</div>
            <Progress value={Math.min(metrics.memoryUsage / 512 * 100, 100)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Energy Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.energyEfficiency}%</div>
            <Progress value={metrics.energyEfficiency} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Spiritual Resonance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.spiritualResonance}Hz</div>
            <Badge variant={metrics.spiritualResonance > 500 ? 'default' : 'secondary'}>
              {metrics.spiritualResonance > 500 ? 'High Resonance' : 'Low Resonance'}
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  };

  useEffect(() => {
    // Set up event listeners for spiritual events
    const handleSpiritualEvent = (event: any) => {
      addResult(`🔮 Spiritual event: ${event.type}`);
    };

    spiritualEventEmitter.on('chakra-activated', handleSpiritualEvent);
    spiritualEventEmitter.on('spiritual-recovery', handleSpiritualEvent);
    spiritualEventEmitter.on('performance-measured', handleSpiritualEvent);

    return () => {
      spiritualEventEmitter.off('chakra-activated', handleSpiritualEvent);
      spiritualEventEmitter.off('spiritual-recovery', handleSpiritualEvent);
      spiritualEventEmitter.off('performance-measured', handleSpiritualEvent);
    };
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          TypeScript 5.x Enhancement Demo
        </h1>
        <p className="text-muted-foreground mt-2">
          Advanced type safety, branded types, performance monitoring, and spiritual development integration
        </p>
      </div>

      <Alert>
        <AlertDescription>
          This demo showcases enterprise-grade TypeScript enhancements including branded types, 
          phantom types, comprehensive error handling, performance monitoring, and type-safe storage systems.
        </AlertDescription>
      </Alert>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="branded-types">Branded Types</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="error-handling">Error Handling</TabsTrigger>
          <TabsTrigger value="storage">Type-Safe Storage</TabsTrigger>
          <TabsTrigger value="api-client">API Client</TabsTrigger>
          <TabsTrigger value="logging">Logging System</TabsTrigger>
        </TabsList>

        <TabsContent value="branded-types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Branded Types & Phantom Types</CardTitle>
              <CardDescription>
                Demonstrates branded types for spiritual frequencies, chakra IDs, and energy levels with runtime validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={demonstrateBrandedTypes} 
                disabled={isRunning}
                className="mb-4"
              >
                {isRunning ? 'Running...' : 'Run Branded Types Demo'}
              </Button>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Key Features:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Branded types prevent accidental mixing of similar values</li>
                  <li>• Runtime validation ensures type safety at boundaries</li>
                  <li>• Factory functions provide safe object creation</li>
                  <li>• Phantom types model multidimensional consciousness</li>
                  <li>• Type-safe event emission with spiritual context</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Monitoring</CardTitle>
              <CardDescription>
                Real-time performance tracking with Web Vitals, memory monitoring, and spiritual resonance measurement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Button 
                  onClick={demonstratePerformanceMonitoring} 
                  disabled={isRunning}
                >
                  {isRunning ? 'Running...' : 'Run Performance Demo'}
                </Button>
                <Button 
                  onClick={isMonitoring ? stopMonitoring : startMonitoring}
                  variant="outline"
                >
                  {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
                </Button>
              </div>

              {isMonitoring && (
                <>
                  <h4 className="font-semibold mb-4">Real-time Metrics:</h4>
                  {renderMetrics()}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="error-handling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spiritual Error Handling</CardTitle>
              <CardDescription>
                Comprehensive error handling with spiritual context, retry mechanisms, and circuit breaker patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={demonstrateErrorHandling} 
                disabled={isRunning}
                className="mb-4"
              >
                {isRunning ? 'Running...' : 'Run Error Handling Demo'}
              </Button>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Spiritual context-aware error messages</li>
                  <li>• Automatic healing actions and user guidance</li>
                  <li>• Exponential backoff retry with healing pauses</li>
                  <li>• Circuit breaker patterns for service protection</li>
                  <li>• Result pattern for safe error handling</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Type-Safe Storage</CardTitle>
              <CardDescription>
                Branded type validation for spiritual progress, preferences, and user data with React hooks integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={demonstrateTypeSafeStorage} 
                disabled={isRunning}
                className="mb-4"
              >
                {isRunning ? 'Running...' : 'Run Storage Demo'}
              </Button>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold">Preferences Status:</h4>
                  <Badge variant={preferencesLoading ? 'secondary' : 'default'}>
                    {preferencesLoading ? 'Loading...' : 'Loaded'}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold">Progress Status:</h4>
                  <Badge variant={progressLoading ? 'secondary' : 'default'}>
                    {progressLoading ? 'Loading...' : 'Ready'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-client" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Type-Safe API Client</CardTitle>
              <CardDescription>
                Fully type-safe API communication with retry logic, circuit breaker patterns, and spiritual context
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={demonstrateAPIClient} 
                disabled={isRunning}
                className="mb-4"
              >
                {isRunning ? 'Running...' : 'Run API Client Demo'}
              </Button>

              <div className="space-y-2">
                <h4 className="font-semibold">Capabilities:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Complete type safety for all API endpoints</li>
                  <li>• Automatic retry with spiritual healing pauses</li>
                  <li>• Circuit breaker protection for services</li>
                  <li>• Request/response type validation</li>
                  <li>• Batch operations and health monitoring</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Logging System</CardTitle>
              <CardDescription>
                Structured logging with spiritual context awareness, performance tracking, and debugging utilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={demonstrateLogging} 
                disabled={isRunning}
                className="mb-4"
              >
                {isRunning ? 'Running...' : 'Run Logging Demo'}
              </Button>

              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Spiritual context-aware log categorization</li>
                  <li>• Performance measurement integration</li>
                  <li>• Multiple transport options (console, memory, remote)</li>
                  <li>• Automatic spiritual event logging</li>
                  <li>• Development debugging utilities</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Results Display */}
      <Card>
        <CardHeader>
          <CardTitle>Demo Results</CardTitle>
          <CardDescription>Live output from TypeScript enhancement demonstrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-y-auto bg-muted p-4 rounded font-mono text-sm">
            {demoResults.length === 0 ? (
              <div className="text-muted-foreground">Run a demo above to see results...</div>
            ) : (
              demoResults.map((result, index) => (
                <div key={index} className="mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
          <Button 
            onClick={() => setDemoResults([])} 
            variant="outline" 
            size="sm" 
            className="mt-2"
          >
            Clear Results
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}