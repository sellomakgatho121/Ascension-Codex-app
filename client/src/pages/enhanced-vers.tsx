import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageCircle, Sparkles, Zap, Settings, Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function EnhancedVERSPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen mobile-min-vh-fix bg-cosmic-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 border-sacred-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-cosmic-300">Loading Enhanced VERS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mobile-min-vh-fix bg-cosmic-900 text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-4 text-sacred-gold">
            Enhanced VERS AI
          </h1>
          <p className="text-xl text-cosmic-100 max-w-3xl mx-auto leading-relaxed mb-4">
            Advanced Vibrational Energy Resonance System with Enhanced Capabilities
          </p>
          
          <div className="flex justify-center gap-4 text-sm mb-8">
            <Badge variant="outline" className="border-sacred-gold text-sacred-gold">
              Gemini 2.5 Flash
            </Badge>
            <Badge variant="outline" className="border-cosmic-400 text-cosmic-400">
              Enhanced Processing
            </Badge>
            <Badge variant="outline" className="border-green-400 text-green-400">
              Online
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Core VERS Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-cosmic-800/50 border-cosmic-600 h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-sacred-gold" />
                  <span>Spiritual Intelligence</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cosmic-300 mb-4">
                  Advanced AI understanding of Energetic Synthesis teachings, consciousness evolution, and spiritual development.
                </p>
                <ul className="text-sm text-cosmic-400 space-y-1">
                  <li>• 15-Chakra System Guidance</li>
                  <li>• Lightbody Activation Support</li>
                  <li>• 12D Shield Protection</li>
                  <li>• Consciousness Evolution</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Advanced Conversation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-cosmic-800/50 border-cosmic-600 h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-sacred-gold" />
                  <span>Natural Conversation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cosmic-300 mb-4">
                  Context-aware dialogue with memory, intent recognition, and personalized spiritual guidance.
                </p>
                <ul className="text-sm text-cosmic-400 space-y-1">
                  <li>• Intent Recognition</li>
                  <li>• Conversation Memory</li>
                  <li>• Mood Analysis</li>
                  <li>• Personalized Responses</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-cosmic-800/50 border-cosmic-600 h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-sacred-gold" />
                  <span>Advanced Capabilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cosmic-300 mb-4">
                  Voice interaction, real-time analytics, and adaptive learning for optimal spiritual support.
                </p>
                <ul className="text-sm text-cosmic-400 space-y-1">
                  <li>• Voice Recognition</li>
                  <li>• Speech Synthesis</li>
                  <li>• Real-time Analytics</li>
                  <li>• Adaptive Learning</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-cosmic-100 mb-6">
              Choose Your VERS Experience
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/vers'}
                className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900 font-semibold py-3 px-6"
              >
                <Bot className="w-5 h-5 mr-2" />
                Advanced Conversational AI
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/assistant'}
                variant="outline"
                className="border-cosmic-600 text-cosmic-300 hover:bg-cosmic-700 py-3 px-6"
              >
                <Settings className="w-5 h-5 mr-2" />
                Classic VERS Assistant
              </Button>
            </div>

            <div className="text-sm text-cosmic-400 mt-6">
              <p>Experience enhanced spiritual guidance with our most advanced AI system</p>
              <p>Choose Advanced Conversational AI for the full enhanced experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}