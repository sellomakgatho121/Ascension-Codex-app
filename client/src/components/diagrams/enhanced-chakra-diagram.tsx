import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { chakraData, getChakraColors } from "@/lib/chakra-data";
import { Info, X, Zap } from "lucide-react";

interface ChakraDiagramProps {
    selectedChakra?: string | null;
    onChakraSelect?: (chakraId: string | null) => void;
    showLabels?: boolean;
    interactive?: boolean;
}

export function EnhancedChakraDiagram({
    selectedChakra,
    onChakraSelect,
    showLabels = true,
    interactive = true
}: ChakraDiagramProps) {
    const [hoveredChakra, setHoveredChakra] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const chakraColors = getChakraColors();

    // Calculate geometric positions based on Sacred Geometry (Vesica Piscis / Tree of Life)
    const getGeometricPosition = (chakraId: number) => {
        // Center line x=50
        const x = 50;

        // Physical Chakras (1-7) - evenly spaced in body
        if (chakraId <= 7) {
            return { x, y: 90 - ((chakraId - 1) * 10) }; // 90, 80, 70... 30
        }

        // Morphogenetic Chakras (8-15) - expansion above and below
        switch (chakraId) {
            case 8: return { x, y: 20 }; // Soul Star (above head)
            case 9: return { x, y: 98 }; // Earth Star (below feet)
            case 10: return { x, y: 12 }; // Solar
            case 11: return { x, y: 6 };  // Galactic
            case 12: return { x, y: 2 };  // Universal
            case 13: return { x: 30, y: 95 }; // Mother Arc (Base Left) - Stylized
            case 14: return { x: 70, y: 95 }; // Father Arc (Base Right) - Stylized
            case 15: return { x, y: -5 }; // Cosmic Christos (Top)
            default: return { x, y: 50 };
        }
    };

    const getChakraColor = (chakraId: number) => {
        return chakraColors[chakraId as keyof typeof chakraColors] || "hsl(0, 0%, 50%)";
    };

    const isActive = (chakraId: number) => {
        return selectedChakra === String(chakraId) || hoveredChakra === chakraId;
    };

    const handleSelect = (id: string) => {
        if (!interactive) return;
        // Toggle if clicking the same one
        if (selectedChakra === id) {
            onChakraSelect?.(null);
        } else {
            onChakraSelect?.(id);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start w-full max-w-6xl mx-auto" ref={containerRef}>
            {/* Geometric Sacred Diagram */}
            <div className="relative w-full md:w-1/2 aspect-[1/1.6] max-w-md mx-auto">
                <div className="absolute inset-0 bg-cosmic-950/50 rounded-full blur-3xl -z-10" />

                <svg
                    viewBox="0 0 100 120"
                    className="w-full h-full drop-shadow-2xl"
                    style={{ overflow: 'visible' }}
                >
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <linearGradient id="centralColumn" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(255,215,0,0)" />
                            <stop offset="20%" stopColor="rgba(255,215,0,0.2)" />
                            <stop offset="50%" stopColor="rgba(255,215,0,0.5)" />
                            <stop offset="80%" stopColor="rgba(255,215,0,0.2)" />
                            <stop offset="100%" stopColor="rgba(255,215,0,0)" />
                        </linearGradient>
                    </defs>

                    {/* Sacred Geometry Background - Flower of Life Patterns */}
                    <g className="opacity-10 text-sacred-gold">
                        {/* Center Axis */}
                        <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.2" />

                        {/* Vesica Piscis shapes overlapping */}
                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.1" />
                        <circle cx="50" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.1" />
                        <circle cx="50" cy="70" r="20" fill="none" stroke="currentColor" strokeWidth="0.1" />
                    </g>

                    {/* Central Energy Channel */}
                    <path
                        d="M 50,-5 L 50,105"
                        stroke="url(#centralColumn)"
                        strokeWidth="6"
                        className="blur-sm animate-pulse"
                        style={{ animationDuration: '4s' }}
                    />
                    <line
                        x1="50" y1="-5" x2="50" y2="105"
                        stroke="white"
                        strokeWidth="0.5"
                        strokeDasharray="1 2"
                        opacity="0.5"
                    />

                    {/* Connecting Curves (Nadi) */}
                    <path
                        d="M 50,90 C 20,70 20,50 50,30 C 80,50 80,70 50,90"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.5"
                        className="animate-pulse"
                        style={{ animationDuration: '6s' }}
                    />
                    <path
                        d="M 50,90 C 80,70 80,50 50,30 C 20,50 20,70 50,90"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.5"
                        className="animate-pulse"
                        style={{ animationDuration: '6s', animationDelay: '3s' }}
                    />

                    {/* Chakra Points */}
                    {chakraData.map((chakra) => {
                        const pos = getGeometricPosition(chakra.id);
                        const active = isActive(chakra.id);
                        const color = getChakraColor(chakra.id);
                        const isPhysical = chakra.category === 'physical';
                        const size = isPhysical ? 4 : 3;

                        return (
                            <g
                                key={chakra.id}
                                onClick={() => handleSelect(String(chakra.id))}
                                onMouseEnter={() => interactive && setHoveredChakra(chakra.id)}
                                onMouseLeave={() => interactive && setHoveredChakra(null)}
                                className={`transition-all duration-300 ${interactive ? 'cursor-pointer' : ''}`}
                                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                            >
                                {/* Glow Ring */}
                                {active && (
                                    <circle
                                        cx={pos.x} cy={pos.y} r={size * 2.5}
                                        fill={color}
                                        opacity="0.2"
                                        filter="url(#glow)"
                                        className="animate-pulse"
                                    />
                                )}

                                {/* Outer Ring */}
                                <circle
                                    cx={pos.x} cy={pos.y} r={size * 1.2}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="0.3"
                                    opacity={active ? 1 : 0.5}
                                    className={active ? "animate-spin-slow" : ""}
                                    style={{ transformOrigin: "center" }}
                                />

                                {/* Main Chakra Body */}
                                <circle
                                    cx={pos.x} cy={pos.y} r={size}
                                    fill={`url(#grad-${chakra.id})`}
                                    stroke="white"
                                    strokeWidth={active ? 0.5 : 0}
                                    className="transition-all duration-300"
                                />

                                {/* Gradient Def */}
                                <defs>
                                    <radialGradient id={`grad-${chakra.id}`}>
                                        <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                                        <stop offset="50%" stopColor={color} stopOpacity="0.9" />
                                        <stop offset="100%" stopColor={color} stopOpacity="0.4" />
                                    </radialGradient>
                                </defs>

                                {/* Number/Symbol */}
                                <text
                                    x={pos.x} y={pos.y}
                                    dy="0.3em"
                                    textAnchor="middle"
                                    fontSize={size}
                                    fill="white"
                                    fontWeight="bold"
                                    className="pointer-events-none drop-shadow-md"
                                    opacity={active ? 1 : 0.7}
                                >
                                    {chakra.id}
                                </text>

                                {/* Label (if active) */}
                                {showLabels && active && (
                                    <g transform={`translate(${pos.x > 50 ? -30 : 10}, 0)`}>
                                        <line
                                            x1={pos.x > 50 ? pos.x : pos.x}
                                            y1={pos.y}
                                            x2={pos.x > 50 ? pos.x - 10 : pos.x + 10}
                                            y2={pos.y}
                                            stroke="white"
                                            strokeWidth="0.2"
                                        />
                                    </g>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Info Panel - Interactive Side Display */}
            <AnimatePresence mode="wait">
                {selectedChakra ? (
                    <motion.div
                        key="info"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full md:w-1/2"
                    >
                        {(() => {
                            const chakra = chakraData.find(c => String(c.id) === selectedChakra);
                            if (!chakra) return null;
                            const color = getChakraColor(chakra.id);

                            return (
                                <Card className="sacred-card border-l-4 overflow-hidden relative" style={{ borderLeftColor: color }}>
                                    <div
                                        className="absolute top-0 right-0 p-32 opacity-10 rounded-full blur-3xl pointer-events-none"
                                        style={{ backgroundColor: color }}
                                    />

                                    <CardContent className="p-6 relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20"
                                                    style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}66` }}
                                                >
                                                    <span className="text-xl font-bold text-white">{chakra.id}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-sacred font-bold text-white leading-none">
                                                        {chakra.name}
                                                    </h3>
                                                    <span className="text-sacred-gold text-sm font-medium uppercase tracking-wider">
                                                        {chakra.category} System
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => onChakraSelect?.(null)}
                                                className="text-cosmic-400 hover:text-white transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="outline" className="border-white/20 text-white bg-white/5">
                                                    {chakra.dimension}
                                                </Badge>
                                                <Badge variant="outline" className="border-white/20 text-white bg-white/5">
                                                    {chakra.element || "Ether"}
                                                </Badge>
                                            </div>

                                            <p className="text-lg text-cosmic-100 leading-relaxed">
                                                {chakra.description}
                                            </p>

                                            <div className="bg-cosmic-900/50 rounded-lg p-4 border border-white/10 mt-4">
                                                <h4 className="flex items-center text-sacred-gold font-semibold mb-2">
                                                    <Zap className="w-4 h-4 mr-2" />
                                                    Key Function
                                                </h4>
                                                <p className="text-sm text-cosmic-200">
                                                    {chakra.function}
                                                </p>
                                            </div>

                                            <div className="bg-cosmic-900/50 rounded-lg p-4 border border-white/10">
                                                <h4 className="flex items-center text-sacred-gold font-semibold mb-2">
                                                    <Info className="w-4 h-4 mr-2" />
                                                    Ascension Purpose
                                                </h4>
                                                <p className="text-sm text-cosmic-200">
                                                    Primary gateway for integrating {chakra.dimension} frequencies and activation of the {chakra.id}-Strand DNA template.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })()}
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 h-[500px] text-center p-8 opacity-50"
                    >
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-cosmic-500 mb-4 animate-spin-slow" />
                        <h3 className="text-xl font-sacred text-cosmic-300 mb-2">Select a Chakra</h3>
                        <p className="text-cosmic-400 max-w-xs">
                            Interact with the geometric system on the left to explore the energetic anatomy of the Diamond Sun Body.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
