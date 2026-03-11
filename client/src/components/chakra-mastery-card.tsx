import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Atom, Zap } from 'lucide-react';
import { useSpiritualProgress } from '@/lib/spiritual-progress-context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ChakraMasteryCard() {
    const {
        state,
        togglePhysicalChakra,
        toggleMorphogeneticChakra,
        getPhysicalChakrasActivated,
        getMorphogeneticChakrasActivated
    } = useSpiritualProgress();

    const physicalCount = getPhysicalChakrasActivated();
    const morphoCount = getMorphogeneticChakrasActivated();

    const physicalPercent = (physicalCount / 7) * 100;
    const morphoPercent = (morphoCount / 8) * 100;

    return (
        <Card className="sacred-card h-full">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl font-sacred text-sacred-gold">
                        Chakra Mastery
                    </CardTitle>
                    <Atom className="w-6 h-6 text-sacred-gold" />
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Physical Chakras Section */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-cosmic-100 font-medium">Physical Chakras (1-7)</span>
                        <span className="text-sacred-gold font-bold">{physicalCount}/7</span>
                    </div>
                    <Progress value={physicalPercent} className="h-2 mb-2" />

                    <div className="grid grid-cols-7 gap-1">
                        {state.chakraMastery.physicalChakras.map((activated, index) => (
                            <TooltipProvider key={`physical-${index}`}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => togglePhysicalChakra(index)}
                                            className={`h-8 rounded-sm transition-all duration-300 border ${activated
                                                    ? 'bg-sacred-gold border-sacred-gold shadow-[0_0_10px_rgba(255,215,0,0.5)]'
                                                    : 'bg-cosmic-800 border-cosmic-600 hover:border-sacred-gold/50'
                                                }`}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>C{index + 1}: {getChakraName(index + 1)}</p>
                                        <p className="text-xs text-cosmic-300">{activated ? 'Active' : 'Click to Activate'}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </div>

                {/* Morphogenetic Chakras Section */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-cosmic-100 font-medium">Morphogenetic Chakras (8-15)</span>
                        <span className="text-sacred-gold font-bold">{morphoCount}/8</span>
                    </div>
                    <Progress value={morphoPercent} className="h-2 mb-2" />

                    <div className="grid grid-cols-8 gap-1">
                        {state.chakraMastery.morphogeneticChakras.map((activated, index) => (
                            <TooltipProvider key={`morpho-${index}`}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => toggleMorphogeneticChakra(index)}
                                            className={`h-8 rounded-sm transition-all duration-300 border ${activated
                                                    ? 'bg-purple-500 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                                                    : 'bg-cosmic-800 border-cosmic-600 hover:border-purple-500/50'
                                                }`}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>C{index + 8}: {getChakraName(index + 8)}</p>
                                        <p className="text-xs text-cosmic-300">{activated ? 'Active' : 'Click to Activate'}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </div>

                <div className="pt-2">
                    <Badge variant="outline" className="border-sacred-gold text-sacred-gold px-3 py-1">
                        Level {state.chakraMastery.level}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}

function getChakraName(id: number): string {
    const names: Record<number, string> = {
        1: "Root / Muldahara",
        2: "Sacral / Svadhisthana",
        3: "Solar Plexus / Manipura",
        4: "Heart / Anahata",
        5: "Throat / Vishuddha",
        6: "Third Eye / Ajna",
        7: "Crown / Sahasrara",
        8: "Thymus / Higher Heart",
        9: "Atomic Doorway / Mouth of God",
        10: "Solar Star",
        11: "Galactic Chakra",
        12: "Earth Star",
        13: "Earth Core / Mother Arc",
        14: "Universal Sun / Gold Ray",
        15: "Cosmic Sun / Violet Ray"
    };
    return names[id] || `Chakra ${id}`;
}
