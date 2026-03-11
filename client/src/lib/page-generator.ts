// Dynamic Page Generator for ES Concepts
// Creates comprehensive interactive pages for each knowledge base concept

import { energeticSynthesisKnowledgeBase, type ESConcept } from './es-knowledge-base';

export interface ConceptPageData {
  concept: ESConcept;
  relatedConcepts: ESConcept[];
  practicalExercises: Exercise[];
  studyPlan: StudyPhase[];
  interactiveElements: InteractiveElement[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: string[];
}

export interface StudyPhase {
  phase: number;
  title: string;
  duration: string;
  objectives: string[];
  activities: string[];
}

export interface InteractiveElement {
  type: 'visualization' | 'meditation' | 'quiz' | 'tracker' | 'journal';
  title: string;
  description: string;
  component: string;
}

// Generate comprehensive page data for any concept
export function generateConceptPageData(conceptId: string): ConceptPageData | null {
  const concept = energeticSynthesisKnowledgeBase.find(c => c.id === conceptId);
  if (!concept) return null;

  const relatedConcepts = energeticSynthesisKnowledgeBase
    .filter(c => c.id !== conceptId && (
      c.category === concept.category ||
      c.relatedTerms.some(term => concept.relatedTerms.includes(term)) ||
      concept.relatedTerms.some(term => c.relatedTerms.includes(term))
    ))
    .slice(0, 6);

  const practicalExercises = generateExercisesForConcept(concept);
  const studyPlan = generateStudyPlan(concept);
  const interactiveElements = generateInteractiveElements(concept);

  return {
    concept,
    relatedConcepts,
    practicalExercises,
    studyPlan,
    interactiveElements
  };
}

// Generate practical exercises based on concept
function generateExercisesForConcept(concept: ESConcept): Exercise[] {
  const baseExercises: Exercise[] = [];

  // Protection category exercises
  if (concept.category === 'protection') {
    baseExercises.push({
      id: `${concept.id}-protection-basic`,
      title: 'Basic Protection Practice',
      description: `Foundational protection technique using ${concept.term} principles`,
      duration: '10-15 minutes',
      difficulty: 'beginner',
      steps: [
        'Find a quiet, comfortable space',
        'Center yourself with deep breathing',
        'Invoke your connection to Source/God consciousness',
        `Visualize ${concept.term} energy surrounding you`,
        'Set protective intentions',
        'Seal the energy field',
        'Express gratitude'
      ]
    });

    baseExercises.push({
      id: `${concept.id}-protection-advanced`,
      title: 'Advanced Energy Clearing',
      description: `Deep clearing work incorporating ${concept.term} techniques`,
      duration: '20-30 minutes',
      difficulty: 'advanced',
      steps: [
        'Prepare sacred space',
        'Invoke Guardian forces',
        'Scan energy field for distortions',
        `Apply ${concept.term} clearing methods`,
        'Clear each chakra systematically',
        'Strengthen protective boundaries',
        'Ground and integrate'
      ]
    });
  }

  // Consciousness category exercises
  if (concept.category === 'consciousness') {
    baseExercises.push({
      id: `${concept.id}-consciousness-meditation`,
      title: 'Consciousness Expansion Meditation',
      description: `Meditative practice to embody ${concept.term} consciousness`,
      duration: '15-25 minutes',
      difficulty: 'intermediate',
      steps: [
        'Sit in meditation posture',
        'Establish rhythmic breathing',
        'Connect with heart center',
        `Contemplate the nature of ${concept.term}`,
        'Allow insights to arise naturally',
        'Integrate understanding into being',
        'Return awareness to physical form'
      ]
    });

    baseExercises.push({
      id: `${concept.id}-consciousness-integration`,
      title: 'Daily Life Integration',
      description: `Practical application of ${concept.term} in daily activities`,
      duration: 'Throughout day',
      difficulty: 'beginner',
      steps: [
        'Set morning intention',
        'Practice mindful awareness',
        `Apply ${concept.term} principles in interactions`,
        'Observe thoughts and reactions',
        'Make conscious choices',
        'Reflect on experiences',
        'Journal insights'
      ]
    });
  }

  // Anatomy category exercises
  if (concept.category === 'anatomy') {
    baseExercises.push({
      id: `${concept.id}-anatomy-activation`,
      title: 'Energy Anatomy Activation',
      description: `Activating and strengthening ${concept.term} within your energy system`,
      duration: '20-30 minutes',
      difficulty: 'intermediate',
      steps: [
        'Lie down comfortably',
        'Relax entire body',
        'Focus on breath and heartbeat',
        `Locate ${concept.term} in your energy field`,
        'Send loving attention to this area',
        'Visualize light activating the system',
        'Feel the energy integration'
      ]
    });
  }

  // Add universal exercises for all concepts
  baseExercises.push({
    id: `${concept.id}-study-session`,
    title: 'Deep Study Session',
    description: `Comprehensive study and contemplation of ${concept.term}`,
    duration: '30-45 minutes',
    difficulty: 'beginner',
    steps: [
      'Read concept definition carefully',
      'Study related terms and connections',
      'Contemplate practical applications',
      'Consider personal relevance',
      'Take notes on insights',
      'Plan integration practices',
      'Set follow-up study intentions'
    ]
  });

  return baseExercises;
}

// Generate study plan for concept
function generateStudyPlan(concept: ESConcept): StudyPhase[] {
  return [
    {
      phase: 1,
      title: 'Foundation Understanding',
      duration: '1-2 weeks',
      objectives: [
        `Understand core definition of ${concept.term}`,
        'Identify key related concepts',
        'Recognize practical applications'
      ],
      activities: [
        'Read primary source materials',
        'Study related concepts',
        'Begin basic practices',
        'Keep learning journal'
      ]
    },
    {
      phase: 2,
      title: 'Practical Application',
      duration: '2-3 weeks',
      objectives: [
        'Integrate concept into daily life',
        'Develop personal practices',
        'Experience direct application'
      ],
      activities: [
        'Daily practice sessions',
        'Apply in real situations',
        'Track progress and insights',
        'Share with study group'
      ]
    },
    {
      phase: 3,
      title: 'Deep Integration',
      duration: '3-4 weeks',
      objectives: [
        'Embody the concept naturally',
        'Teach or share with others',
        'Develop advanced understanding'
      ],
      activities: [
        'Advanced practices',
        'Mentor others',
        'Research deeper aspects',
        'Develop personal variations'
      ]
    },
    {
      phase: 4,
      title: 'Mastery & Service',
      duration: 'Ongoing',
      objectives: [
        'Master the concept application',
        'Serve others through knowledge',
        'Continue expanding understanding'
      ],
      activities: [
        'Teach and guide others',
        'Develop new practices',
        'Research and study',
        'Contribute to community'
      ]
    }
  ];
}

// Generate interactive elements for concept
function generateInteractiveElements(concept: ESConcept): InteractiveElement[] {
  const elements: InteractiveElement[] = [];

  // Add visualization tool
  elements.push({
    type: 'visualization',
    title: `${concept.term} Visualization Tool`,
    description: `Interactive visualization to help understand and work with ${concept.term}`,
    component: 'ConceptVisualization'
  });

  // Add meditation guide
  elements.push({
    type: 'meditation',
    title: `Guided ${concept.term} Meditation`,
    description: `Step-by-step meditation practice incorporating ${concept.term}`,
    component: 'GuidedMeditation'
  });

  // Add progress tracker
  elements.push({
    type: 'tracker',
    title: 'Practice Progress Tracker',
    description: `Track your progress and growth with ${concept.term} practices`,
    component: 'ProgressTracker'
  });

  // Add knowledge quiz
  elements.push({
    type: 'quiz',
    title: `${concept.term} Knowledge Check`,
    description: `Test your understanding of ${concept.term} concepts and applications`,
    component: 'ConceptQuiz'
  });

  // Add personal journal
  elements.push({
    type: 'journal',
    title: 'Personal Insights Journal',
    description: `Record your experiences and insights with ${concept.term}`,
    component: 'InsightJournal'
  });

  return elements;
}

// Get all concept IDs for page generation
export function getAllConceptIds(): string[] {
  return energeticSynthesisKnowledgeBase.map(concept => concept.id);
}

// Get concept by ID
export function getConceptById(id: string): ESConcept | undefined {
  return energeticSynthesisKnowledgeBase.find(concept => concept.id === id);
}