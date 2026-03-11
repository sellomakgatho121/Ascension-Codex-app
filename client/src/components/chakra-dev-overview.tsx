import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { useSpiritualProgress } from '@/lib/spiritual-progress-context';
import { useLocation } from 'wouter';

export function ChakraDevOverview() {
    const {
        state,
        startAssessment,
        getChakrasMastered,
        getLayersIntegrated
    } = useSpiritualProgress();

    const [, setLocation] = useLocation();

    const handleAssessmentClick = () => {
        startAssessment();
        setLocation('/chakra-development#assessment');
    };

    return (
        <Card className="sacred-card border-sacred-gold/30 bg-cosmic-900/80 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-sacred-gold" />
                    <CardTitle className="text-2xl font-sacred text-sacred-gold">
                        Spiritual Development Overview
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                    <div className="grid grid-cols-3 w-full md:w-auto gap-8 md:gap-16 text-center">
                        <div className="space-y-1">
                            <div className="text-4xl font-bold text-sacred-gold">
                                {state.overallLevel}
                            </div>
                            <p className="text-sm text-cosmic-200">Overall Level</p>
                        </div>

                        <div className="space-y-1">
                            <div className="text-4xl font-bold text-white">
                                {getChakrasMastered()}
                            </div>
                            <p className="text-sm text-cosmic-200">Chakras Mastered</p>
                        </div>

                        <div className="space-y-1">
                            <div className="text-4xl font-bold text-sacred-gold">
                                {getLayersIntegrated()}
                            </div>
                            <p className="text-sm text-cosmic-200">Layers Integrated</p>
                        </div>
                    </div>

                    <Button
                        onClick={handleAssessmentClick}
                        className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-6 px-8 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-all hover:scale-105"
                    >
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Complete Spiritual Assessment
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
