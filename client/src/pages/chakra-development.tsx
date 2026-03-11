import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { ChakraDevOverview } from '@/components/chakra-dev-overview';
import { ChakraMasteryCard } from '@/components/chakra-mastery-card';
import { LightbodyIntegrationCard } from '@/components/lightbody-integration-card';
import { GridActivationCard } from '@/components/grid-activation-card';
import { SpiritualAssessment } from '@/components/spiritual-assessment';
import { useSpiritualProgress } from '@/lib/spiritual-progress-context';
import { motion } from 'framer-motion';

export default function ChakraDevelopmentPage() {
    const { state } = useSpiritualProgress();
    const [location] = useLocation();

    // Scroll to assessment if hash is present
    useEffect(() => {
        if (location.includes('#assessment')) {
            const element = document.getElementById('assessment-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-cosmic-900 pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-sacred text-transparent bg-clip-text bg-gradient-to-r from-sacred-gold to-amber-300 mb-4">
                        Your Chakra Development
                    </h1>
                    <p className="text-xl text-cosmic-200 max-w-3xl">
                        Track your progress through the 15-dimensional energetic anatomy. Activations are saved automatically and persist across your sessions.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <ChakraDevOverview />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <ChakraMasteryCard />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <LightbodyIntegrationCard />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <GridActivationCard />
                    </motion.div>
                </div>

                <motion.div
                    id="assessment-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className={`transition-all duration-500 overflow-hidden ${state.assessmentInProgress || state.assessmentCompleted
                            ? 'max-h-[1200px] opacity-100'
                            : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="pt-8 border-t border-cosmic-700/50">
                        <SpiritualAssessment />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
