import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DNA_STRAND_DATA } from "@/lib/dna-data";
import DnaVisualizationCanvas from "@/components/dna-visualization-canvas";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Activity, Sparkles, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function DnaVisualizationPage() {
  const [selectedStrand, setSelectedStrand] = useState<number | null>(null);
  const [location, setLocation] = useLocation();

  // Handle URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const strandParam = params.get('strand');
    if (strandParam) {
      const strand = parseInt(strandParam, 10);
      if (DNA_STRAND_DATA[strand]) {
        setSelectedStrand(strand);
      }
    } else {
        setSelectedStrand(null);
    }
  }, [location]);

  const handleSelectStrand = (strand: number) => {
    setLocation(`/dna-visualization?strand=${strand}`);
  };

  const handleBack = () => {
    setLocation('/dna-visualization');
  };

  const strandInfo = selectedStrand ? DNA_STRAND_DATA[selectedStrand] : null;

  return (
    <div className="min-h-screen bg-cosmic-950 text-white overflow-hidden relative selection:bg-sacred-gold/30">
        
      {/* Background Ambience (similar to source app but using existing app patterns) */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(0,0,0,1)_100%)]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {!selectedStrand ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <header className="text-center space-y-6">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm mb-4"
                >
                  <Sparkles className="w-6 h-6 text-sacred-gold mr-2" />
                  <span className="text-sacred-gold font-medium tracking-wider">INTERACTIVE STUDIO</span>
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 font-sacred">
                  DNA Visualization Studio
                </h1>
                
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Explore the multidimensional architecture of consciousness from the biological double helix to the 12-strand Diamond Sun template.
                </p>
              </header>

              {/* Grid Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(DNA_STRAND_DATA).map((key) => {
                  const strand = parseInt(key, 10);
                  const data = DNA_STRAND_DATA[strand];
                  return (
                    <motion.div
                      key={strand}
                      whileHover={{ scale: 1.02, translateY: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className="h-full bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md overflow-hidden group"
                        onClick={() => handleSelectStrand(strand)}
                      >
                        <div className="p-6 relative">
                            {/* Background Gradient for Card */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center font-bold text-xl text-white shadow-lg group-hover:shadow-sacred-gold/20 transition-shadow">
                                    {strand}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-sacred-gold transition-colors">{data.name}</h3>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest">{data.dimensions}</p>
                                </div>
                            </div>
                            
                            <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
                                {data.description}
                            </p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-[calc(100vh-100px)] flex flex-col"
            >
              {/* Detail Header */}
              <div className="flex items-center justify-between mb-6">
                <Button 
                    variant="ghost" 
                    onClick={handleBack}
                    className="group hover:bg-white/10 text-gray-300 hover:text-white"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Studio
                </Button>
                <div className="text-right">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sacred-gold to-white">
                        {strandInfo?.name}
                    </h2>
                    <p className="text-sm text-gray-400">{strandInfo?.scientificType}</p>
                </div>
              </div>

              {/* Main Split View */}
              <div className="flex-1 grid lg:grid-cols-12 gap-6 min-h-0">
                
                {/* 3D Visualization Column */}
                <div className="lg:col-span-8 bg-black/20 rounded-3xl border border-white/10 overflow-hidden relative backdrop-blur-sm flex flex-col">
                    <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 text-xs text-gray-300 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-400" />
                        Interactive 3D View
                    </div>
                    <div className="flex-1 w-full h-full min-h-[400px]">
                        <DnaVisualizationCanvas strandCount={selectedStrand} />
                    </div>
                </div>

                {/* Info Panel Column */}
                <div className="lg:col-span-4 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    
                    {/* Key Stats Card */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-wider">Dimension</label>
                                    <p className="text-sm font-medium text-blue-300">{strandInfo?.dimensions}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-wider">Chakras</label>
                                    <p className="text-sm font-medium text-purple-300">{strandInfo?.chakras}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <label className="text-xs text-gray-500 uppercase tracking-wider">Consciousness Level</label>
                                <p className="text-base text-white">{strandInfo?.consciousness}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Description */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                        <div className="p-5">
                            <h3 className="flex items-center gap-2 text-sacred-gold font-medium mb-3">
                                <Info className="w-4 h-4" />
                                Description
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                {strandInfo?.description}
                            </p>
                        </div>
                    </Card>

                    {/* Key Points */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                        <div className="p-5">
                            <h3 className="flex items-center gap-2 text-green-400 font-medium mb-3">
                                <Zap className="w-4 h-4" />
                                Activation Keys
                            </h3>
                            <ul className="space-y-2">
                                {strandInfo?.keyPoints.map((point, idx) => (
                                    <li key={idx} className="flex gap-3 text-sm text-gray-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>

                    {/* Energetic Synthesis */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                        <div className="p-5">
                            <h3 className="text-purple-400 font-medium mb-2 text-sm uppercase tracking-wide">Energetic Synthesis</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                {strandInfo?.energeticSynthesis}
                            </p>
                        </div>
                    </Card>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
