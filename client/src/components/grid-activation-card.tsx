import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TreePine, Shield } from 'lucide-react';
import { useSpiritualProgress } from '@/lib/spiritual-progress-context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function GridActivationCard() {
    const {
        state,
        toggleTreeSphere,
        toggleShield,
        getTreeSpheresActivated,
        getShieldsActivated
    } = useSpiritualProgress();

    const spheresActivated = getTreeSpheresActivated();
    const shieldsActivated = getShieldsActivated();



    return (
        <Card className="sacred-card h-full">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl font-sacred text-sacred-gold">
                        Grid Activation
                    </CardTitle>
                    <TreePine className="w-6 h-6 text-sacred-gold" />
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Tree Spheres Section */}
                <div className="text-center">
                    <div className="text-4xl font-bold text-sacred-gold mb-2">
                        {spheresActivated}/12
                    </div>
                    <p className="text-cosmic-300 text-sm mb-6">Tree Spheres Active</p>

                    <Progress value={(spheresActivated / 12) * 100} className="h-2 mb-6" />

                    {/* Interactive Grid visualization */}
                    <div className="grid grid-cols-4 gap-3">
                        {state.gridActivation.treeSpheres.map((activated, index) => (
                            <TooltipProvider key={`sphere-${index}`}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => toggleTreeSphere(index)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 border ${activated
                                                ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                                                : 'bg-cosmic-800 border-cosmic-600 text-cosmic-400 hover:border-emerald-500/50 hover:text-emerald-500'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Sphere {index + 1}: {getSphereName(index + 1)}</p>
                                        <p className="text-xs text-cosmic-300">{activated ? 'Active' : 'Click to Activate'}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </div>

                <div className="border-t border-cosmic-700/50 pt-6"></div>

                {/* Shield Integration Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-cosmic-100">Shield Integration</span>
                        <span className="text-sacred-gold font-bold">{shieldsActivated}/5</span>
                    </div>

                    <div className="flex justify-between gap-1">
                        {state.gridActivation.shieldIntegration.map((activated, index) => (
                            <TooltipProvider key={`shield-${index}`}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => toggleShield(index)}
                                            className={`h-12 flex-1 rounded-sm flex items-center justify-center transition-all duration-300 border ${activated
                                                ? 'bg-blue-600/30 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                                                : 'bg-cosmic-800 border-cosmic-600 hover:border-blue-400/50'
                                                }`}
                                        >
                                            <Shield className={`w-4 h-4 ${activated ? 'text-blue-300' : 'text-cosmic-500'}`} />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{getShieldName(index + 1)}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function getSphereName(id: number): string {
    const names: Record<number, string> = {
        1: "Core Manifestation",
        2: "Genetic Template",
        3: "Mental Blueprint",
        4: "Emotional Body",
        5: "Physical Matrix",
        6: "Heart Center",
        7: "Merkabic Field",
        8: "Monadic Access",
        9: "Keriatric Mind",
        10: "Christos Field",
        11: "Buddhic Mind",
        12: "Nirvanic Mind"
    };
    return names[id] || `Sphere ${id}`;
}

function getShieldName(id: number): string {
    const names: Record<number, string> = {
        1: "12D Shield",
        2: "Maharic Shield",
        3: "Teura Shield",
        4: "Kee-Ra-ShA",
        5: "Khundaray"
    };
    return names[id] || `Shield ${id}`;
}
