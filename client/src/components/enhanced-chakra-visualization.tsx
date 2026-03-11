import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { chakraData, type ChakraData } from "@/lib/chakra-data";
import { BookOpen, Zap, Heart, Eye, Lightbulb, Play, Pause, RotateCcw, Settings } from "lucide-react";

interface EnhancedChakraVisualizationProps {
  selectedChakra?: ChakraData | null;
  onChakraSelect: (chakra: ChakraData) => void;
  showAnimations?: boolean;
  showConnections?: boolean;
  autoRotate?: boolean;
}

export function EnhancedChakraVisualization({ 
  selectedChakra, 
  onChakraSelect, 
  showAnimations = true,
  showConnections = true,
  autoRotate = false 
}: EnhancedChakraVisualizationProps) {
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showEnergyFlow, setShowEnergyFlow] = useState(true);
  const [view3D, setView3D] = useState(false);



  const chakraColors = getChakraColors();

  const EnhancedChakraPoint = ({ chakra }: { chakra: ChakraData }) => {
    const isSelected = selectedChakra?.id === chakra.id;
    const color = chakraColors[chakra.id as keyof typeof chakraColors];
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div
        className="enhanced-chakra-container absolute"
        style={{
          left: `${chakra.position.x}%`,
          top: `${chakra.position.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: isSelected ? 100 : isHovered ? 50 : 30,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Multi-layer energy field */}
        {(isHovered || isSelected) && showEnergyFlow && (
          <>
            {/* Outer energy pulse */}
            <div
              className="absolute animate-ping"
              style={{
                width: '120px',
                height: '120px',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
                background: `radial-gradient(circle, transparent 60%, ${color}15 70%, transparent 100%)`,
                borderRadius: '50%',
                animationDuration: '3s'
              }}
            />
            
            {/* Middle energy ring */}
            <div
              className="absolute animate-pulse"
              style={{
                width: '80px',
                height: '80px',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
                background: `radial-gradient(circle, transparent 40%, ${color}25 60%, transparent 100%)`,
                borderRadius: '50%',
                animationDuration: '2s'
              }}
            />
          </>
        )}

        {/* Main enhanced chakra point */}
        <button
          className={`enhanced-chakra-point relative transition-all duration-700 focus:outline-none focus:ring-4 focus:ring-sacred-gold/50 ${
            isSelected ? 'selected' : ''
          } ${chakra.category === 'morphogenetic' ? 'morphogenetic-enhanced' : 'physical-enhanced'}`}
          style={{
            background: chakra.category === 'morphogenetic' 
              ? `conic-gradient(from ${isPlaying ? '0deg' : '45deg'}, ${color}, transparent, ${color}, transparent, ${color})` 
              : `radial-gradient(circle at 30% 30%, ${color} 0%, ${color}cc 40%, ${color}88 100%)`,
            width: chakra.category === 'morphogenetic' ? '45px' : '50px',
            height: chakra.category === 'morphogenetic' ? '45px' : '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: `3px solid ${isSelected ? '#FFD700' : isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'}`,
            boxShadow: `
              0 0 ${isSelected || isHovered ? '50px' : '25px'} ${color}${chakra.category === 'morphogenetic' ? '60' : '50'},
              inset 0 0 ${isSelected || isHovered ? '20px' : '10px'} ${color}15,
              0 0 ${isSelected || isHovered ? '80px' : '40px'} ${color}30,
              0 4px 20px rgba(0,0,0,0.3)
            `,
            transform: `
              scale(${isHovered ? 1.3 : isSelected ? 1.25 : 1}) 
              ${chakra.category === 'morphogenetic' && isPlaying ? `rotate(${Date.now() * 0.001 * 360 * animationSpeed}deg)` : ''}
              ${view3D ? 'rotateX(15deg) rotateY(15deg)' : ''}
            `,
            filter: `
              brightness(${isHovered || isSelected ? 1.3 : 1}) 
              saturate(${isHovered || isSelected ? 1.4 : 1.1})
              drop-shadow(0 0 ${isSelected || isHovered ? '20px' : '10px'} ${color}40)
            `,
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: showAnimations ? (
              chakra.category === 'morphogenetic' 
                ? `morphogeneticEnhanced ${4 / animationSpeed}s ease-in-out infinite`
                : `physicalEnhanced ${3 / animationSpeed}s ease-in-out infinite alternate`
            ) : 'none'
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChakraSelect(chakra);
          }}
          aria-label={`${chakra.name} - Chakra ${chakra.id}`}
          title={`${chakra.name} - ${chakra.function}`}
        >
          <div className="relative flex items-center justify-center">
            {/* Chakra number with enhanced styling */}
            <span 
              className="font-bold text-white drop-shadow-2xl z-20"
              style={{ 
                fontSize: chakra.category === 'morphogenetic' ? '14px' : '16px',
                textShadow: `0 0 10px ${color}, 0 0 20px ${color}50, 0 2px 4px rgba(0,0,0,0.5)`
              }}
            >
              {chakra.id}
            </span>
            
            {/* Inner rotating elements */}
            {chakra.category === 'morphogenetic' && showAnimations && (
              <>
                <div 
                  className="absolute inset-1 rounded-full border border-white/40 animate-spin"
                  style={{ 
                    animationDuration: `${6 / animationSpeed}s`,
                    animationDirection: 'normal'
                  }}
                />
                <div 
                  className="absolute inset-2 rounded-full border border-white/20 animate-spin"
                  style={{ 
                    animationDuration: `${8 / animationSpeed}s`,
                    animationDirection: 'reverse'
                  }}
                />
              </>
            )}
            
            {/* Physical chakra inner glow */}
            {chakra.category === 'physical' && (isHovered || isSelected) && (
              <div 
                className="absolute inset-1 rounded-full animate-pulse"
                style={{ 
                  background: `radial-gradient(circle, ${color}40, transparent)`,
                  animationDuration: '1.5s'
                }}
              />
            )}
          </div>
        </button>

        {/* Advanced floating energy particles with spiral motion */}
        {(isHovered || isSelected) && showEnergyFlow && (
          <>
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const radius = 30 + (i % 3) * 10;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    width: '4px',
                    height: '4px',
                    background: color,
                    borderRadius: '50%',
                    left: '50%',
                    top: '50%',
                    opacity: 0.8,
                    transform: `translate(-50%, -50%)`,
                    animation: `spiralParticle ${2 + (i % 3) * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                    filter: `drop-shadow(0 0 6px ${color})`,
                    '--angle': `${angle}rad`,
                    '--radius': `${radius}px`,
                  } as React.CSSProperties}
                />
              );
            })}
          </>
        )}

        {/* Chakra label on hover */}
        {isHovered && (
          <div 
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-cosmic-900/90 rounded text-xs text-white border border-cosmic-600 whitespace-nowrap z-50"
            style={{ minWidth: 'max-content' }}
          >
            {chakra.name}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="sacred-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center justify-between">
            Enhanced Chakra System
            <Badge variant="outline" className="border-sacred-gold/50 text-sacred-gold">
              All 15 Chakras
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant={isPlaying ? "default" : "outline"}
              size="sm"
              className="sacred-button-sm"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Animate'}
            </Button>
            
            <Button
              onClick={() => setShowEnergyFlow(!showEnergyFlow)}
              variant={showEnergyFlow ? "default" : "outline"}
              size="sm"
            >
              <Zap className="w-4 h-4 mr-2" />
              Energy Flow
            </Button>
            
            <Button
              onClick={() => setView3D(!view3D)}
              variant={view3D ? "default" : "outline"}
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              3D View
            </Button>
          </div>
          
          {isPlaying && (
            <div className="space-y-2">
              <label className="text-sm text-cosmic-300">Animation Speed</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-cosmic-400">{animationSpeed.toFixed(1)}x</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Visualization */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start lg:items-center">
        {/* Chakra Visualization */}
        <div className="relative">
          <div 
            className={`cosmic-gradient sacred-geometry rounded-3xl p-4 md:p-8 relative overflow-hidden min-h-[600px] md:min-h-[800px] transition-all duration-700 ${
              view3D ? 'transform-gpu perspective-1000' : ''
            }`}
            style={{
              background: view3D 
                ? 'linear-gradient(135deg, hsl(240, 20%, 8%) 0%, hsl(240, 15%, 12%) 50%, hsl(240, 20%, 8%) 100%)'
                : undefined
            }}
          >
            <div className="absolute inset-0 sacred-geometry-bg opacity-20"></div>
            
            {/* Stats display */}
            <div className="absolute top-4 right-4 z-40 text-xs text-white/60 space-y-1">
              <div>Total Chakras: {chakraData.length}</div>
              <div>Physical: {chakraData.filter(c => c.category === 'physical').length}</div>
              <div>Morphogenetic: {chakraData.filter(c => c.category === 'morphogenetic').length}</div>
              {selectedChakra && <div>Selected: {selectedChakra.name}</div>}
            </div>
            
            {/* Human figure and chakra system */}
            <div className={`relative z-10 w-full h-full flex items-center justify-center min-h-[600px] md:min-h-[800px] transition-transform duration-700 ${
              view3D ? 'transform-gpu rotateX(5deg) rotateY(5deg)' : ''
            }`}>
              {/* Enhanced human figure */}
              <svg 
                viewBox="0 0 200 100" 
                className="w-full max-w-xs md:max-w-md h-full opacity-30"
                style={{ position: 'absolute' }}
              >
                <defs>
                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 215, 0, 0.6)" />
                    <stop offset="50%" stopColor="rgba(255, 215, 0, 0.3)" />
                    <stop offset="100%" stopColor="rgba(255, 215, 0, 0.6)" />
                  </linearGradient>
                </defs>
                
                <g stroke="url(#bodyGradient)" strokeWidth="2" fill="none">
                  {/* Enhanced human figure */}
                  <circle cx="100" cy="20" r="8" />
                  <line x1="100" y1="28" x2="100" y2="32" />
                  <line x1="85" y1="35" x2="115" y2="35" />
                  <line x1="85" y1="35" x2="75" y2="55" />
                  <line x1="115" y1="35" x2="125" y2="55" />
                  <line x1="100" y1="32" x2="100" y2="75" />
                  <line x1="90" y1="65" x2="110" y2="65" />
                  <line x1="100" y1="75" x2="90" y2="95" />
                  <line x1="100" y1="75" x2="110" y2="95" />
                  {/* Central channel with enhanced glow */}
                  <line x1="100" y1="5" x2="100" y2="100" stroke="rgba(255, 215, 0, 0.8)" strokeWidth="3" className="animate-pulse" />
                </g>
              </svg>

              {/* All 15 Enhanced Chakra points */}
              {chakraData.map((chakra) => (
                <EnhancedChakraPoint key={chakra.id} chakra={chakra} />
              ))}
              
              {/* Energy connections */}
              {showConnections && (
                <svg 
                  viewBox="0 0 200 100" 
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 5 }}
                >
                  {/* Enhanced energy connections */}
                  {chakraData.filter(c => c.category === 'morphogenetic').map((chakra, index) => (
                    <g key={`connection-${chakra.id}`}>
                      <line 
                        x1="50%" y1="50%" 
                        x2={`${chakra.position.x}%`} y2={`${chakra.position.y}%`}
                        stroke={`url(#connectionGradient${chakra.id})`}
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                        style={{ animationDelay: `${index * 0.3}s`, animationDuration: '3s' }}
                      />
                    </g>
                  ))}
                  
                  {/* Gradient definitions for connections */}
                  <defs>
                    {chakraData.filter(c => c.category === 'morphogenetic').map((chakra) => (
                      <linearGradient key={`grad-${chakra.id}`} id={`connectionGradient${chakra.id}`}>
                        <stop offset="0%" stopColor="rgba(255, 215, 0, 0.8)" />
                        <stop offset="50%" stopColor={chakraColors[chakra.id as keyof typeof chakraColors] + '60'} />
                        <stop offset="100%" stopColor="rgba(255, 215, 0, 0.3)" />
                      </linearGradient>
                    ))}
                  </defs>
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Details Panel */}
        <Card className="sacred-card h-fit">
          <CardHeader>
            <CardTitle className="text-2xl font-sacred text-sacred-gold">
              {selectedChakra ? `${selectedChakra.name} (${selectedChakra.id})` : "Select a Chakra"}
            </CardTitle>
            {selectedChakra && (
              <Badge 
                variant="outline" 
                className={`w-fit ${selectedChakra.category === 'morphogenetic' ? 'border-purple-400/50 text-purple-400' : 'border-blue-400/50 text-blue-400'}`}
              >
                {selectedChakra.category === 'morphogenetic' ? 'Morphogenetic Field' : 'Physical Body'}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedChakra ? (
              <>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-cosmic-300">Location:</span>
                    <span className="block text-white font-medium">
                      {selectedChakra.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-cosmic-300">Color:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white/20 shadow-lg"
                        style={{ 
                          backgroundColor: chakraColors[selectedChakra.id as keyof typeof chakraColors],
                          boxShadow: `0 0 10px ${chakraColors[selectedChakra.id as keyof typeof chakraColors]}40`
                        }}
                      />
                      <span className="text-white font-medium">
                        {selectedChakra.color}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-cosmic-300">Dimension:</span>
                    <span className="block text-white font-medium">
                      {selectedChakra.dimension}
                    </span>
                  </div>
                  <div>
                    <span className="text-cosmic-300">Element:</span>
                    <span className="block text-white font-medium">
                      {selectedChakra.element || 'Light'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-sacred-gold mb-2 flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Primary Function
                  </h4>
                  <p className="text-cosmic-100 leading-relaxed text-sm">
                    {selectedChakra.function}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-sacred-gold mb-2 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Description
                  </h4>
                  <p className="text-cosmic-100 leading-relaxed text-sm">
                    {selectedChakra.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-sacred-gold mb-2 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Ascension Purpose
                  </h4>
                  <p className="text-cosmic-100 leading-relaxed text-sm">
                    {selectedChakra.ascensionPurpose}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="sacred-button" size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Complete Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="cosmic-gradient sacred-geometry max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-sacred text-sacred-gold">
                          {selectedChakra.name} - Enhanced Guide
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 text-cosmic-100">
                        <div className="text-center">
                          <div 
                            className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-white/20 shadow-2xl"
                            style={{ 
                              backgroundColor: chakraColors[selectedChakra.id as keyof typeof chakraColors],
                              boxShadow: `0 0 30px ${chakraColors[selectedChakra.id as keyof typeof chakraColors]}60`
                            }}
                          />
                          <h3 className="text-xl font-semibold text-sacred-gold mb-2">
                            Chakra {selectedChakra.id}: {selectedChakra.name}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={selectedChakra.category === 'morphogenetic' ? 'border-purple-400/50 text-purple-400' : 'border-blue-400/50 text-blue-400'}
                          >
                            {selectedChakra.category === 'morphogenetic' ? 'Morphogenetic Field' : 'Physical Body'}
                          </Badge>
                        </div>
                        
                        {/* Enhanced content sections would go here */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-cosmic-300">Location:</span>
                            <span className="block text-white font-medium">{selectedChakra.location}</span>
                          </div>
                          <div>
                            <span className="text-cosmic-300">Dimension:</span>
                            <span className="block text-white font-medium">{selectedChakra.dimension}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-sacred-gold mb-2">Complete Description</h4>
                          <p className="leading-relaxed">{selectedChakra.description}</p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-sacred-gold mb-2">Ascension Purpose</h4>
                          <p className="leading-relaxed">{selectedChakra.ascensionPurpose}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Eye className="w-16 h-16 mx-auto mb-4 text-cosmic-400" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Full 15-Chakra System
                </h3>
                <p className="text-cosmic-300 text-sm leading-relaxed">
                  Click on any chakra point to explore its function and spiritual significance. 
                  The system includes 7 physical chakras and 8 morphogenetic field chakras 
                  for complete consciousness development.
                </p>
                <div className="mt-4 text-xs text-cosmic-400">
                  <div>Physical Chakras: 1-7</div>
                  <div>Morphogenetic Chakras: 8-15</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}