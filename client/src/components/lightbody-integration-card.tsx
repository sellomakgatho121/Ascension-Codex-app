import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Layers, Circle, CheckCircle2 } from 'lucide-react';
import { useSpiritualProgress } from '@/lib/spiritual-progress-context';

export function LightbodyIntegrationCard() {
    const { state, toggleLightbodyBody } = useSpiritualProgress();

    return (
        <Card className="sacred-card h-full">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl font-sacred text-white">
                        Lightbody Integration
                    </CardTitle>
                    <Layers className="w-6 h-6 text-cosmic-300" />
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {state.lightbodyIntegration.bodies.map((body) => (
                        <div
                            key={body.id}
                            className="flex items-center justify-between group cursor-pointer"
                            onClick={() => toggleLightbodyBody(body.id)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`transition-colors duration-300 ${body.activated ? 'text-sacred-gold' : 'text-cosmic-500 group-hover:text-cosmic-300'
                                    }`}>
                                    {body.activated ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        <Circle className="w-5 h-5" />
                                    )}
                                </div>
                                <span className={`text-sm font-medium transition-colors ${body.activated ? 'text-white' : 'text-cosmic-300'
                                    }`}>
                                    {body.name}
                                </span>
                            </div>
                            <div className={`w-2 h-2 rounded-full transition-all ${body.activated
                                    ? 'bg-sacred-gold shadow-[0_0_8px_rgba(255,215,0,0.6)]'
                                    : 'bg-cosmic-800 border border-cosmic-600'
                                }`} />
                        </div>
                    ))}
                </div>

                <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-cosmic-100">Integration Level</span>
                        <span className="text-sacred-gold font-bold">{state.lightbodyIntegration.integrationLevel}%</span>
                    </div>
                    <Progress value={state.lightbodyIntegration.integrationLevel} className="h-2" />
                </div>
            </CardContent>
        </Card>
    );
}
