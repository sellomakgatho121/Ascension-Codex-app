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
    <div className="min-h-screen bg-anti-bg font-anti-mono text-anti-static overflow-hidden relative selection:bg-anti-acid/30">
        
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-anti-acid/[0.02] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-anti-neon/[0.02] blur-[120px]" />
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
                  className="inline-flex items-center justify-center px-4 py-2 border border-anti-acid/20 mb-4 bg-anti-void/60 backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4 text-anti-acid mr-2" />
                  <span className="text-[10px] text-anti-acid tracking-[0.3em] uppercase">INTERACTIVE.STUDIO</span>
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-anti-display tracking-[0.1em] text-anti-static uppercase mb-4 leading-tight">
                  DNA VISUALIZATION<br/>
                  <span className="text-anti-acid">STUDIO</span>
                </h1>
                
                <p className="text-xs text-anti-static/40 max-w-2xl mx-auto leading-relaxed tracking-wide">
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
                        className="h-full border border-anti-acid/10 bg-anti-void/60 hover:border-anti-acid/30 transition-all cursor-pointer backdrop-blur-md overflow-hidden group rounded-none"
                        onClick={() => handleSelectStrand(strand)}
                      >
                        <div className="p-6 relative">
                            {/* Background Gradient for Card */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-anti-acid/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 border border-anti-acid/20 bg-anti-void/40 flex items-center justify-center font-anti-display text-2xl text-anti-acid group-hover:border-anti-acid/50 transition-colors">
                                    {strand}
                                </div>
                                <div>
                                    <h3 className="text-sm font-anti-mono tracking-widest text-anti-static uppercase group-hover:text-anti-acid transition-colors">{data.name}</h3>
                                    <p className="text-[9px] text-anti-static/40 uppercase tracking-[0.3em] mt-1">{data.dimensions}</p>
                                </div>
                            </div>
                            
                            <p className="text-[11px] text-anti-static/30 line-clamp-2 leading-relaxed">
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
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-anti-acid/10">
                <Button 
                    variant="ghost" 
                    onClick={handleBack}
                    className="group hover:bg-anti-acid/5 text-anti-static/40 hover:text-anti-acid rounded-none border border-transparent hover:border-anti-acid/30 tracking-widest uppercase text-xs font-anti-mono"
                >
                    <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                    BACK_TO_STUDIO
                </Button>
                <div className="text-right">
                    <h2 className="text-2xl md:text-4xl font-anti-display tracking-[0.1em] text-anti-static uppercase">
                        {strandInfo?.name}
                    </h2>
                    <p className="text-[10px] text-anti-acid/60 tracking-[0.3em] uppercase mt-1">{strandInfo?.scientificType}</p>
                </div>
              </div>

              {/* Main Split View */}
              <div className="flex-1 grid lg:grid-cols-12 gap-6 min-h-0">
                
                {/* 3D Visualization Column */}
                <div className="lg:col-span-8 bg-anti-void/60 border border-anti-acid/10 overflow-hidden relative flex flex-col min-h-[400px]">
                    <div className="absolute top-4 left-4 z-10 bg-anti-void/80 border border-anti-acid/20 px-3 py-1 text-[9px] text-anti-acid/60 tracking-widest uppercase flex items-center gap-2">
                        <Activity className="w-3 h-3 text-anti-acid animate-pulse" />
                        INTERACTIVE_3D_VIEW
                    </div>
                    <div className="flex-1 w-full h-full">
                        <DnaVisualizationCanvas strandCount={selectedStrand} />
                    </div>
                </div>

                {/* Info Panel Column */}
                <div className="lg:col-span-4 space-y-4 overflow-y-auto pr-2 anti-scrollbar">
                    
                    {/* Key Stats Card */}
                    <Card className="bg-anti-void/60 border-anti-acid/10 rounded-none">
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[9px] text-anti-static/40 uppercase tracking-[0.3em] block mb-2 border-b border-anti-acid/10 pb-1">DIMENSION</label>
                                    <p className="text-xs font-anti-mono text-anti-cyan uppercase">{strandInfo?.dimensions}</p>
                                </div>
                                <div>
                                    <label className="text-[9px] text-anti-static/40 uppercase tracking-[0.3em] block mb-2 border-b border-anti-acid/10 pb-1">CHAKRAS</label>
                                    <p className="text-xs font-anti-mono text-anti-neon uppercase">{strandInfo?.chakras}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-anti-acid/10">
                                <label className="text-[9px] text-anti-static/40 uppercase tracking-[0.3em] block mb-2 border-b border-anti-acid/10 pb-1">CONSCIOUSNESS_LEVEL</label>
                                <p className="text-xs font-anti-mono text-anti-acid uppercase">{strandInfo?.consciousness}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Description */}
                    <Card className="bg-anti-void/60 border-anti-acid/10 rounded-none">
                        <div className="p-6">
                            <h3 className="flex items-center gap-3 text-anti-static font-anti-mono text-[10px] tracking-[0.3em] uppercase mb-4 border-b border-anti-acid/10 pb-2">
                                <Info className="w-3 h-3 text-anti-acid" />
                                DESCRIPTION
                            </h3>
                            <p className="text-anti-static/40 leading-relaxed text-[11px] font-anti-mono tracking-wide">
                                {strandInfo?.description}
                            </p>
                        </div>
                    </Card>

                    {/* Key Points */}
                    <Card className="bg-anti-void/60 border-anti-acid/10 rounded-none">
                        <div className="p-6">
                            <h3 className="flex items-center gap-3 text-anti-static font-anti-mono text-[10px] tracking-[0.3em] uppercase mb-4 border-b border-anti-acid/10 pb-2">
                                <Zap className="w-3 h-3 text-anti-neon" />
                                ACTIVATION_KEYS
                            </h3>
                            <ul className="space-y-3">
                                {strandInfo?.keyPoints.map((point, idx) => (
                                    <li key={idx} className="flex gap-3 text-[11px] text-anti-static/40 font-anti-mono leading-relaxed">
                                        <span className="text-anti-acid text-[8px] mt-0.5 opacity-60">[{idx + 1}]</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>

                    {/* Energetic Synthesis */}
                    <Card className="bg-anti-void/60 border-anti-acid/10 rounded-none">
                        <div className="p-6">
                            <h3 className="text-anti-static font-anti-mono text-[10px] tracking-[0.3em] uppercase mb-4 border-b border-anti-acid/10 pb-2 flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-anti-cyan animate-pulse"/>
                                ENERGETIC_SYNTHESIS
                            </h3>
                            <p className="text-[10px] text-anti-static/30 leading-relaxed font-anti-mono tracking-widest border-l-2 border-anti-acid/20 pl-4">
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
