import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Type definitions
export interface AssessmentResults {
    level: 'beginner' | 'developing' | 'intermediate' | 'advanced' | 'master';
    strengths: string[];
    areas_for_growth: string[];
    recommended_practices: string[];
    spiritual_age: number;
    dominant_abilities: string[];
    completedAt: string;
}

export interface LightbodyBody {
    id: string;
    name: string;
    activated: boolean;
}

export interface SpiritualProgressState {
    // Chakra System Mastery
    chakraMastery: {
        physicalChakras: boolean[];  // 7 chakras (1-7)
        morphogeneticChakras: boolean[]; // 8 chakras (8-15)
        level: number;
    };

    // Lightbody Integration
    lightbodyIntegration: {
        bodies: LightbodyBody[];
        integrationLevel: number; // 0-100%
    };

    // Grid Activation
    gridActivation: {
        treeSpheres: boolean[]; // 12 spheres
        shieldIntegration: boolean[]; // 5 shields
    };

    // Overall Development
    overallLevel: number;

    // Assessment State
    assessmentCompleted: boolean;
    assessmentResults: AssessmentResults | null;
    assessmentInProgress: boolean;
    currentQuestionIndex: number;
    assessmentAnswers: Record<number, number>;
}

// Initial state
const initialLightbodyBodies: LightbodyBody[] = [
    { id: 'etheric', name: 'Etheric Body', activated: false },
    { id: 'emotional', name: 'Emotional Body', activated: false },
    { id: 'mental', name: 'Mental Body', activated: false },
    { id: 'astral', name: 'Astral Body', activated: false },
    { id: 'ethericTemplate', name: 'Etheric Template', activated: false },
    { id: 'celestial', name: 'Celestial Body', activated: false },
    { id: 'ketheric', name: 'Ketheric Body', activated: false },
];

const initialState: SpiritualProgressState = {
    chakraMastery: {
        physicalChakras: Array(7).fill(false),
        morphogeneticChakras: Array(8).fill(false),
        level: 0,
    },
    lightbodyIntegration: {
        bodies: initialLightbodyBodies,
        integrationLevel: 0,
    },
    gridActivation: {
        treeSpheres: Array(12).fill(false),
        shieldIntegration: Array(5).fill(false),
    },
    overallLevel: 0,
    assessmentCompleted: false,
    assessmentResults: null,
    assessmentInProgress: false,
    currentQuestionIndex: 0,
    assessmentAnswers: {},
};

// Context type
interface SpiritualProgressContextType {
    state: SpiritualProgressState;

    // Chakra actions
    togglePhysicalChakra: (index: number) => void;
    toggleMorphogeneticChakra: (index: number) => void;

    // Lightbody actions
    toggleLightbodyBody: (id: string) => void;

    // Grid actions
    toggleTreeSphere: (index: number) => void;
    toggleShield: (index: number) => void;

    // Assessment actions
    startAssessment: () => void;
    saveAssessmentAnswer: (questionId: number, answer: number) => void;
    setCurrentQuestionIndex: (index: number) => void;
    completeAssessment: (results: AssessmentResults) => void;
    resetAssessment: () => void;

    // General actions
    resetProgress: () => void;

    // Computed values
    getPhysicalChakrasActivated: () => number;
    getMorphogeneticChakrasActivated: () => number;
    getLightbodyBodiesActivated: () => number;
    getTreeSpheresActivated: () => number;
    getShieldsActivated: () => number;
    getChakrasMastered: () => number;
    getLayersIntegrated: () => number;
}

const STORAGE_KEY = 'ascension-codex-spiritual-progress';

// Create context
const SpiritualProgressContext = createContext<SpiritualProgressContextType | undefined>(undefined);

// Provider component
export function SpiritualProgressProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<SpiritualProgressState>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Merge with initial state to ensure all fields exist
                return {
                    ...initialState,
                    ...parsed,
                    chakraMastery: { ...initialState.chakraMastery, ...parsed.chakraMastery },
                    lightbodyIntegration: {
                        ...initialState.lightbodyIntegration,
                        ...parsed.lightbodyIntegration,
                        bodies: parsed.lightbodyIntegration?.bodies || initialLightbodyBodies,
                    },
                    gridActivation: { ...initialState.gridActivation, ...parsed.gridActivation },
                };
            }
        } catch (error) {
            console.warn('Error loading spiritual progress from localStorage:', error);
        }
        return initialState;
    });

    // Persist to localStorage on state change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.warn('Error saving spiritual progress to localStorage:', error);
        }
    }, [state]);

    // Calculate overall level and integration percentages
    const updateDerivedValues = useCallback((newState: SpiritualProgressState): SpiritualProgressState => {
        const physicalActivated = newState.chakraMastery.physicalChakras.filter(Boolean).length;
        const morphoActivated = newState.chakraMastery.morphogeneticChakras.filter(Boolean).length;
        const bodiesActivated = newState.lightbodyIntegration.bodies.filter(b => b.activated).length;
        const spheresActivated = newState.gridActivation.treeSpheres.filter(Boolean).length;
        const shieldsActivated = newState.gridActivation.shieldIntegration.filter(Boolean).length;

        // Calculate chakra mastery level (0-10 based on total chakras)
        const totalChakras = physicalActivated + morphoActivated;
        const chakraLevel = Math.floor((totalChakras / 15) * 10);

        // Calculate lightbody integration percentage
        const integrationLevel = Math.round((bodiesActivated / 7) * 100);

        // Calculate overall level
        const totalElements = 15 + 7 + 12 + 5; // chakras + lightbody + grid + shields
        const completedElements = totalChakras + bodiesActivated + spheresActivated + shieldsActivated;
        const overallLevel = Math.floor((completedElements / totalElements) * 10);

        return {
            ...newState,
            chakraMastery: {
                ...newState.chakraMastery,
                level: chakraLevel,
            },
            lightbodyIntegration: {
                ...newState.lightbodyIntegration,
                integrationLevel,
            },
            overallLevel,
        };
    }, []);

    // Chakra actions
    const togglePhysicalChakra = useCallback((index: number) => {
        setState(prev => {
            const newPhysical = [...prev.chakraMastery.physicalChakras];
            newPhysical[index] = !newPhysical[index];
            return updateDerivedValues({
                ...prev,
                chakraMastery: {
                    ...prev.chakraMastery,
                    physicalChakras: newPhysical,
                },
            });
        });
    }, [updateDerivedValues]);

    const toggleMorphogeneticChakra = useCallback((index: number) => {
        setState(prev => {
            const newMorpho = [...prev.chakraMastery.morphogeneticChakras];
            newMorpho[index] = !newMorpho[index];
            return updateDerivedValues({
                ...prev,
                chakraMastery: {
                    ...prev.chakraMastery,
                    morphogeneticChakras: newMorpho,
                },
            });
        });
    }, [updateDerivedValues]);

    // Lightbody actions
    const toggleLightbodyBody = useCallback((id: string) => {
        setState(prev => {
            const newBodies = prev.lightbodyIntegration.bodies.map(body =>
                body.id === id ? { ...body, activated: !body.activated } : body
            );
            return updateDerivedValues({
                ...prev,
                lightbodyIntegration: {
                    ...prev.lightbodyIntegration,
                    bodies: newBodies,
                },
            });
        });
    }, [updateDerivedValues]);

    // Grid actions
    const toggleTreeSphere = useCallback((index: number) => {
        setState(prev => {
            const newSpheres = [...prev.gridActivation.treeSpheres];
            newSpheres[index] = !newSpheres[index];
            return updateDerivedValues({
                ...prev,
                gridActivation: {
                    ...prev.gridActivation,
                    treeSpheres: newSpheres,
                },
            });
        });
    }, [updateDerivedValues]);

    const toggleShield = useCallback((index: number) => {
        setState(prev => {
            const newShields = [...prev.gridActivation.shieldIntegration];
            newShields[index] = !newShields[index];
            return updateDerivedValues({
                ...prev,
                gridActivation: {
                    ...prev.gridActivation,
                    shieldIntegration: newShields,
                },
            });
        });
    }, [updateDerivedValues]);

    // Assessment actions
    const startAssessment = useCallback(() => {
        setState(prev => ({
            ...prev,
            assessmentInProgress: true,
        }));
    }, []);

    const saveAssessmentAnswer = useCallback((questionId: number, answer: number) => {
        setState(prev => ({
            ...prev,
            assessmentAnswers: {
                ...prev.assessmentAnswers,
                [questionId]: answer,
            },
        }));
    }, []);

    const setCurrentQuestionIndex = useCallback((index: number) => {
        setState(prev => ({
            ...prev,
            currentQuestionIndex: index,
        }));
    }, []);

    const completeAssessment = useCallback((results: AssessmentResults) => {
        setState(prev => {
            // Apply assessment results to progress
            let newState = { ...prev };

            // Based on assessment level, auto-activate some progress
            const levelMultipliers: Record<string, number> = {
                'beginner': 0.1,
                'developing': 0.25,
                'intermediate': 0.4,
                'advanced': 0.6,
                'master': 0.8,
            };

            const multiplier = levelMultipliers[results.level] || 0.1;

            // Activate physical chakras based on level
            const physicalToActivate = Math.ceil(7 * multiplier);
            const newPhysical = prev.chakraMastery.physicalChakras.map((v, i) =>
                i < physicalToActivate ? true : v
            );

            // Activate morphogenetic chakras based on level
            const morphoToActivate = Math.ceil(8 * multiplier * 0.5); // Less morphogenetic
            const newMorpho = prev.chakraMastery.morphogeneticChakras.map((v, i) =>
                i < morphoToActivate ? true : v
            );

            // Activate lightbody bodies based on level
            const bodiesToActivate = Math.ceil(7 * multiplier);
            const newBodies = prev.lightbodyIntegration.bodies.map((body, i) => ({
                ...body,
                activated: i < bodiesToActivate ? true : body.activated,
            }));

            // Activate tree spheres based on level
            const spheresToActivate = Math.ceil(12 * multiplier * 0.4);
            const newSpheres = prev.gridActivation.treeSpheres.map((v, i) =>
                i < spheresToActivate ? true : v
            );

            newState = {
                ...newState,
                chakraMastery: {
                    ...newState.chakraMastery,
                    physicalChakras: newPhysical,
                    morphogeneticChakras: newMorpho,
                },
                lightbodyIntegration: {
                    ...newState.lightbodyIntegration,
                    bodies: newBodies,
                },
                gridActivation: {
                    ...newState.gridActivation,
                    treeSpheres: newSpheres,
                },
                assessmentCompleted: true,
                assessmentResults: results,
                assessmentInProgress: false,
                currentQuestionIndex: 0,
                assessmentAnswers: {},
            };

            return updateDerivedValues(newState);
        });
    }, [updateDerivedValues]);

    const resetAssessment = useCallback(() => {
        setState(prev => ({
            ...prev,
            assessmentInProgress: false,
            currentQuestionIndex: 0,
            assessmentAnswers: {},
        }));
    }, []);

    const resetProgress = useCallback(() => {
        setState(initialState);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    // Computed values
    const getPhysicalChakrasActivated = useCallback(() => {
        return state.chakraMastery.physicalChakras.filter(Boolean).length;
    }, [state.chakraMastery.physicalChakras]);

    const getMorphogeneticChakrasActivated = useCallback(() => {
        return state.chakraMastery.morphogeneticChakras.filter(Boolean).length;
    }, [state.chakraMastery.morphogeneticChakras]);

    const getLightbodyBodiesActivated = useCallback(() => {
        return state.lightbodyIntegration.bodies.filter(b => b.activated).length;
    }, [state.lightbodyIntegration.bodies]);

    const getTreeSpheresActivated = useCallback(() => {
        return state.gridActivation.treeSpheres.filter(Boolean).length;
    }, [state.gridActivation.treeSpheres]);

    const getShieldsActivated = useCallback(() => {
        return state.gridActivation.shieldIntegration.filter(Boolean).length;
    }, [state.gridActivation.shieldIntegration]);

    const getChakrasMastered = useCallback(() => {
        return getPhysicalChakrasActivated() + getMorphogeneticChakrasActivated();
    }, [getPhysicalChakrasActivated, getMorphogeneticChakrasActivated]);

    const getLayersIntegrated = useCallback(() => {
        return getLightbodyBodiesActivated();
    }, [getLightbodyBodiesActivated]);

    const value: SpiritualProgressContextType = {
        state,
        togglePhysicalChakra,
        toggleMorphogeneticChakra,
        toggleLightbodyBody,
        toggleTreeSphere,
        toggleShield,
        startAssessment,
        saveAssessmentAnswer,
        setCurrentQuestionIndex,
        completeAssessment,
        resetAssessment,
        resetProgress,
        getPhysicalChakrasActivated,
        getMorphogeneticChakrasActivated,
        getLightbodyBodiesActivated,
        getTreeSpheresActivated,
        getShieldsActivated,
        getChakrasMastered,
        getLayersIntegrated,
    };

    return (
        <SpiritualProgressContext.Provider value={value}>
            {children}
        </SpiritualProgressContext.Provider>
    );
}

// Hook for using the context
export function useSpiritualProgress() {
    const context = useContext(SpiritualProgressContext);
    if (context === undefined) {
        throw new Error('useSpiritualProgress must be used within a SpiritualProgressProvider');
    }
    return context;
}
