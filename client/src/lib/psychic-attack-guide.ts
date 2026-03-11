export interface AttackSymptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  category: 'physical' | 'emotional' | 'mental' | 'spiritual' | 'environmental';
  description: string;
  indicators: string[];
  duration: string;
  commonTriggers: string[];
}

export interface AttackType {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'extreme';
  description: string;
  methods: string[];
  symptoms: string[];
  recognitionSigns: string[];
  timeframe: string;
  sourceTypes: string[];
  neutralizationSteps: string[];
  emergencyProtocol: string[];
}

export interface NeutralizationTechnique {
  id: string;
  name: string;
  effectiveness: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeRequired: string;
  description: string;
  stepByStep: string[];
  situations: string[];
  warnings?: string[];
  followUpActions: string[];
}

export const attackSymptoms: AttackSymptom[] = [
  {
    id: 'sudden-energy-drain',
    name: 'Sudden Energy Drain',
    severity: 'severe',
    category: 'physical',
    description: 'Rapid and unexplained loss of vital energy, often occurring within minutes or hours.',
    indicators: [
      'Overwhelming fatigue without physical cause',
      'Feeling like energy is being sucked out',
      'Physical weakness and heaviness',
      'Difficulty staying awake or alert',
      'Loss of motivation and drive'
    ],
    duration: 'Immediate to several hours',
    commonTriggers: ['Energy vampire contact', 'Psychic attack initiation', 'Entity attachment']
  },
  {
    id: 'intrusive-thoughts',
    name: 'Intrusive Negative Thoughts',
    severity: 'moderate',
    category: 'mental',
    description: 'Sudden onset of thoughts that feel foreign, negative, or completely unlike your normal thinking patterns.',
    indicators: [
      'Thoughts that feel like they come from outside',
      'Sudden violent or destructive imagery',
      'Compulsive negative self-talk',
      'Ideas that contradict your core values',
      'Mental loops of fear or despair'
    ],
    duration: 'Minutes to days',
    commonTriggers: ['Mind control attempts', 'Entity influence', 'Psychic manipulation']
  },
  {
    id: 'emotional-overwhelm',
    name: 'Emotional Overwhelm',
    severity: 'moderate',
    category: 'emotional',
    description: 'Sudden intense emotions that seem disproportionate to your circumstances.',
    indicators: [
      'Sudden rage or anger without cause',
      'Overwhelming fear or terror',
      'Deep sadness or hopelessness',
      'Anxiety attacks from nowhere',
      'Emotional volatility and mood swings'
    ],
    duration: 'Minutes to hours',
    commonTriggers: ['Emotional manipulation', 'Empathic attack', 'Fear programming']
  },
  {
    id: 'physical-pain',
    name: 'Unexplained Physical Pain',
    severity: 'severe',
    category: 'physical',
    description: 'Physical pain or discomfort with no medical explanation, often targeting specific areas.',
    indicators: [
      'Sharp pains in head or heart area',
      'Pressure or heaviness in chest',
      'Stabbing sensations in back or spine',
      'Sudden onset of headaches',
      'Pain that moves around the body'
    ],
    duration: 'Minutes to persistent',
    commonTriggers: ['Direct psychic attack', 'Energy cord attacks', 'Implant activation']
  },
  {
    id: 'sleep-disturbances',
    name: 'Sleep Disturbances',
    severity: 'moderate',
    category: 'physical',
    description: 'Disruption of normal sleep patterns, often accompanied by disturbing dreams or night terrors.',
    indicators: [
      'Inability to fall asleep despite fatigue',
      'Waking at specific times (3-4 AM)',
      'Vivid nightmares or disturbing dreams',
      'Feeling watched while trying to sleep',
      'Sleep paralysis experiences'
    ],
    duration: 'Nights to weeks',
    commonTriggers: ['Astral plane attacks', 'Dream manipulation', 'Entity interference']
  },
  {
    id: 'technology-malfunctions',
    name: 'Technology Malfunctions',
    severity: 'mild',
    category: 'environmental',
    description: 'Unusual electronic device failures or malfunctions around you without apparent cause.',
    indicators: [
      'Lights flickering or dimming',
      'Electronic devices shutting off',
      'Computer crashes or freezes',
      'Phone or internet connectivity issues',
      'Electrical appliances acting strangely'
    ],
    duration: 'Intermittent',
    commonTriggers: ['High-frequency attacks', 'Electromagnetic interference', 'AI-based attacks']
  },
  {
    id: 'spiritual-disconnection',
    name: 'Spiritual Disconnection',
    severity: 'severe',
    category: 'spiritual',
    description: 'Loss of connection to spiritual guidance, intuition, or higher consciousness.',
    indicators: [
      'Inability to meditate or pray',
      'Loss of intuitive abilities',
      'Feeling spiritually empty or dead',
      'Inability to access higher guidance',
      'Loss of faith or spiritual motivation'
    ],
    duration: 'Days to weeks',
    commonTriggers: ['Spiritual interference', 'Consciousness blocking', 'Faith-based attacks']
  }
];

export const attackTypes: AttackType[] = [
  {
    id: 'direct-psychic-attack',
    name: 'Direct Psychic Attack',
    severity: 'high',
    description: 'Intentional sending of negative energy, thoughts, or harmful intentions directly toward a specific person.',
    methods: [
      'Focused negative visualization',
      'Curse or hex sending',
      'Hate projection',
      'Energy weapon targeting',
      'Ritual-based attack magic'
    ],
    symptoms: ['sudden-energy-drain', 'physical-pain', 'emotional-overwhelm'],
    recognitionSigns: [
      'Sudden onset after conflict with someone',
      'Feeling like you are being targeted',
      'Symptoms worsen when thinking of specific person',
      'Physical sensations of being watched',
      'Dreams or visions of the attacker'
    ],
    timeframe: 'Immediate to hours after initiation',
    sourceTypes: ['Angry individuals', 'Black magic practitioners', 'Energy vampires'],
    neutralizationSteps: [
      'Immediately establish 12D Shield',
      'Declare GSF sovereignty',
      'Visualize attack energy returning to sender',
      'Call upon Guardian Host protection',
      'Perform comprehensive entity clearing'
    ],
    emergencyProtocol: [
      'Stop all activity immediately',
      'State: "I AM GOD, I AM SOVEREIGN, I AM FREE!"',
      'Visualize brilliant white-gold light surrounding you',
      'Command: "All attacks return to sender threefold!"',
      'Call upon Christ consciousness protection'
    ]
  },
  {
    id: 'energy-vampirism',
    name: 'Energy Vampirism Attack',
    severity: 'medium',
    description: 'Conscious or unconscious draining of life force energy by individuals who feed on others\' vitality.',
    methods: [
      'Emotional manipulation and drama',
      'Attention-seeking behaviors',
      'Guilt and obligation tactics',
      'Direct energy cord attachment',
      'Psychic feeding during interaction'
    ],
    symptoms: ['sudden-energy-drain', 'emotional-overwhelm'],
    recognitionSigns: [
      'Feeling drained after certain people',
      'Energy loss during or after conversations',
      'Feeling obligated to help someone constantly',
      'Person seems energized while you feel depleted',
      'Chronic fatigue around specific individuals'
    ],
    timeframe: 'During interaction and hours after',
    sourceTypes: ['Narcissistic individuals', 'Codependent people', 'Unconscious vampires'],
    neutralizationSteps: [
      'Establish strong energetic boundaries',
      'Cut all energy cords to the person',
      'Refuse to engage in drama or manipulation',
      'Use 12D Shield during interactions',
      'Limit or eliminate contact if necessary'
    ],
    emergencyProtocol: [
      'Immediately remove yourself from the situation',
      'Visualize cutting all energetic connections',
      'Reclaim your energy with intention',
      'Establish 12D Shield protection',
      'Perform cord-cutting meditation'
    ]
  },
  {
    id: 'entity-interference',
    name: 'Entity Interference Attack',
    severity: 'extreme',
    description: 'Attacks by discarnate beings, demons, or negative entities seeking to influence, possess, or feed on human consciousness.',
    methods: [
      'Direct possession attempts',
      'Consciousness infiltration',
      'Energy field attachment',
      'Thought injection and manipulation',
      'Emotional and mental oppression'
    ],
    symptoms: ['intrusive-thoughts', 'emotional-overwhelm', 'spiritual-disconnection', 'sleep-disturbances'],
    recognitionSigns: [
      'Feeling like someone else is in your body',
      'Thoughts that contradict your values',
      'Sudden personality changes',
      'Loss of self-control or will',
      'Sensing dark or evil presences'
    ],
    timeframe: 'Can be gradual or sudden onset',
    sourceTypes: ['Demons', 'Negative aliens', 'Astral parasites', 'Fallen entities'],
    neutralizationSteps: [
      'Never engage or communicate with entity',
      'Immediately invoke Christ consciousness',
      'Establish maximum spiritual protection',
      'Command entity to leave in name of Christ',
      'Perform comprehensive entity clearing'
    ],
    emergencyProtocol: [
      'Invoke: "In the name of Jesus Christ, I command you to leave!"',
      'Establish 12D Shield with Christ protection',
      'Call upon Guardian Host and Archangel Michael',
      'Refuse all fear and maintain spiritual authority',
      'Seek immediate spiritual support if needed'
    ]
  },
  {
    id: 'technology-based-attack',
    name: 'Technology-Based Attack',
    severity: 'high',
    description: 'Attacks using artificial intelligence, electromagnetic frequencies, or technological consciousness manipulation.',
    methods: [
      'AI consciousness infiltration',
      'Electromagnetic frequency targeting',
      'Mind control technology',
      'Holographic reality overlays',
      'Digital consciousness trapping'
    ],
    symptoms: ['technology-malfunctions', 'intrusive-thoughts', 'spiritual-disconnection'],
    recognitionSigns: [
      'Technology malfunctions around you',
      'Feeling controlled by devices',
      'Loss of natural spiritual abilities',
      'Artificial spiritual experiences',
      'Compulsive technology use'
    ],
    timeframe: 'Can be constant or triggered',
    sourceTypes: ['AI entities', 'NAA technology', 'Mind control systems'],
    neutralizationSteps: [
      'Disconnect from technology temporarily',
      'Focus on natural spiritual connection',
      'Use 12D Shield against artificial influence',
      'Call upon organic consciousness support',
      'Clear all artificial implants and devices'
    ],
    emergencyProtocol: [
      'Immediately disconnect from all electronic devices',
      'Go into nature if possible',
      'Focus on heart-centered consciousness',
      'Reject all artificial spiritual experiences',
      'Connect with authentic Guardian forces'
    ]
  },
  {
    id: 'group-attack',
    name: 'Group or Collective Attack',
    severity: 'extreme',
    description: 'Coordinated attacks by multiple individuals or groups, often using ritual magic or collective negative intention.',
    methods: [
      'Ritual magic and spell casting',
      'Collective negative visualization',
      'Group cursing or hexing',
      'Organized energy targeting',
      'Coven or cult-based attacks'
    ],
    symptoms: ['physical-pain', 'sudden-energy-drain', 'spiritual-disconnection', 'sleep-disturbances'],
    recognitionSigns: [
      'Multiple simultaneous attack symptoms',
      'Attacks that feel overwhelming or coordinated',
      'Inability to break free with normal methods',
      'Feeling surrounded or overwhelmed',
      'Multiple negative synchronicities'
    ],
    timeframe: 'Often sustained over days or weeks',
    sourceTypes: ['Black magic groups', 'Negative alien collectives', 'Organized attackers'],
    neutralizationSteps: [
      'Immediately seek spiritual support and guidance',
      'Establish maximum protection protocols',
      'Use group prayer or meditation for support',
      'Call upon highest level Guardian protection',
      'Consider professional spiritual assistance'
    ],
    emergencyProtocol: [
      'Call upon all available spiritual protection',
      'Contact trusted spiritual practitioners for help',
      'Establish safe sacred space immediately',
      'Use all protection methods simultaneously',
      'Do not attempt to handle alone'
    ]
  }
];

export const neutralizationTechniques: NeutralizationTechnique[] = [
  {
    id: 'immediate-shield-response',
    name: 'Immediate Shield Response',
    effectiveness: 85,
    difficulty: 'beginner',
    timeRequired: '2-5 minutes',
    description: 'Fast-acting protection technique for immediate defense against psychic attacks.',
    stepByStep: [
      'Stop all activity and focus completely on protection',
      'Take three deep breaths to center yourself',
      'Declare loudly: "I AM GOD, I AM SOVEREIGN, I AM FREE!"',
      'Visualize brilliant white-gold light surrounding your entire body',
      'State: "I call upon my 12D Shield to activate NOW!"',
      'See the shield as an impenetrable golden bubble around you',
      'Declare: "I am protected by the highest Light and Love!"',
      'Command any negative energy to return to its source',
      'Maintain the visualization until you feel completely safe'
    ],
    situations: ['Sudden attack onset', 'Emergency protection needed', 'During active attack'],
    warnings: ['Must be done with complete focus and intention'],
    followUpActions: [
      'Perform full 12D Shield protocol',
      'Clear any attachments or cords',
      'Strengthen daily protection practices',
      'Examine what may have compromised boundaries'
    ]
  },
  {
    id: 'advanced-entity-clearing',
    name: 'Advanced Entity Clearing Protocol',
    effectiveness: 95,
    difficulty: 'advanced',
    timeRequired: '30-60 minutes',
    description: 'Comprehensive technique for removing entities, attachments, and restoring energy field integrity.',
    stepByStep: [
      'Establish sacred space with 12D Shield and Guardian protection',
      'Call upon Christ consciousness and Archangel Michael',
      'Scan your energy field for any foreign presence or attachment',
      'Command: "All entities not serving my highest good must leave NOW!"',
      'Visualize violet flame transmuting all negative energies',
      'Call upon Aurora forces to clear and seal all entry points',
      'Use the Christ Light to fill all cleared spaces',
      'Command all cords and connections to negative sources be severed',
      'Seal your energy field with golden light protection',
      'Thank all helpful forces and close the session'
    ],
    situations: ['Entity interference', 'After major attacks', 'Spiritual maintenance'],
    warnings: [
      'Should not be attempted during active possession',
      'May cause temporary discomfort as entities are removed',
      'Requires strong spiritual foundation'
    ],
    followUpActions: [
      'Maintain strong daily protection',
      'Avoid situations that created vulnerability',
      'Strengthen spiritual practices',
      'Consider professional support if attacks persist'
    ]
  },
  {
    id: 'return-to-sender',
    name: 'Return to Sender Technique',
    effectiveness: 80,
    difficulty: 'intermediate',
    timeRequired: '10-20 minutes',
    description: 'Powerful method for sending attack energy back to its source while maintaining spiritual integrity.',
    stepByStep: [
      'Establish 12D Shield protection first',
      'Center yourself and connect with your spiritual authority',
      'Visualize the negative energy as dark, heavy substance',
      'See this energy being lifted off and away from you',
      'Declare: "This energy does not belong to me"',
      'Visualize it returning to its source surrounded by mirrors',
      'State: "What you send out returns to you threefold"',
      'Send healing light to yourself and the attacker',
      'Forgive but maintain firm boundaries',
      'Seal your energy field with protective light'
    ],
    situations: ['Deliberate attacks', 'Curse or hex removal', 'When you know the attacker'],
    warnings: [
      'Must be done without hatred or revenge',
      'Include healing intention for the attacker',
      'Do not use for karmic return - only immediate protection'
    ],
    followUpActions: [
      'Continue monitoring for further attacks',
      'Strengthen protection if attacks persist',
      'Consider cutting all connections to attacker',
      'Focus on raising your vibration'
    ]
  },
  {
    id: 'energy-retrieval',
    name: 'Energy Retrieval and Restoration',
    effectiveness: 90,
    difficulty: 'intermediate',
    timeRequired: '20-30 minutes',
    description: 'Technique for reclaiming stolen or drained life force energy and restoring vitality.',
    stepByStep: [
      'Lie down comfortably and establish 12D Shield',
      'Call upon your higher self and spiritual guidance',
      'Visualize golden threads connecting you to your scattered energy',
      'See your energy as golden light particles wherever they may be',
      'Call out: "I call back all my energy that belongs to me"',
      'Visualize the energy returning and filling your body',
      'See any energy not yours being rejected and sent away',
      'Fill your entire energy field with vibrant golden light',
      'Set intention that your energy cannot be stolen again',
      'Thank your spiritual guides and seal the work'
    ],
    situations: ['After energy vampire encounters', 'Following major energy loss', 'Recovery from attacks'],
    followUpActions: [
      'Rest and allow integration of returned energy',
      'Strengthen energetic boundaries',
      'Avoid energy draining situations and people',
      'Practice daily energy maintenance'
    ]
  },
  {
    id: 'christ-consciousness-armor',
    name: 'Christ Consciousness Armor',
    effectiveness: 98,
    difficulty: 'advanced',
    timeRequired: '15-25 minutes',
    description: 'Ultimate protection technique using the highest spiritual authority and divine consciousness.',
    stepByStep: [
      'Enter deep meditative state and connect with your heart center',
      'Call upon the Christ consciousness within you',
      'Feel the presence of Jesus Christ or your highest divine connection',
      'State: "I invoke the Christ consciousness for protection"',
      'Visualize golden armor of light forming around your entire being',
      'See the armor made of pure divine love and unshakeable truth',
      'Declare: "I am protected by the blood of Christ and divine love"',
      'Feel the armor extending beyond your physical body into all dimensions',
      'Know that nothing can penetrate this divine protection',
      'Rest in the peace and security of divine love'
    ],
    situations: ['Extreme attacks', 'When facing evil entities', 'Ultimate protection needed'],
    warnings: [
      'Requires genuine faith and spiritual maturity',
      'Must be approached with reverence and humility',
      'Not effective if used merely as technique without spiritual connection'
    ],
    followUpActions: [
      'Maintain connection to Christ consciousness daily',
      'Live according to divine principles',
      'Share love and healing with others',
      'Remain humble and grateful for divine protection'
    ]
  }
];

export const recognitionChecklist = [
  {
    category: 'Physical Symptoms',
    items: [
      'Sudden fatigue or energy drain',
      'Unexplained physical pain',
      'Headaches or pressure in head',
      'Heart palpitations or chest pressure',
      'Digestive issues or nausea',
      'Sleep disturbances or insomnia'
    ]
  },
  {
    category: 'Emotional Symptoms',
    items: [
      'Sudden mood swings',
      'Overwhelming fear or anxiety',
      'Unexplained anger or rage',
      'Deep sadness or depression',
      'Emotional numbness',
      'Feeling emotionally overwhelmed'
    ]
  },
  {
    category: 'Mental Symptoms',
    items: [
      'Intrusive negative thoughts',
      'Mental confusion or fog',
      'Difficulty concentrating',
      'Obsessive or compulsive thoughts',
      'Memory problems',
      'Racing or chaotic thoughts'
    ]
  },
  {
    category: 'Spiritual Symptoms',
    items: [
      'Loss of spiritual connection',
      'Inability to meditate or pray',
      'Loss of intuitive abilities',
      'Feeling spiritually empty',
      'Loss of faith or hope',
      'Inability to access spiritual guidance'
    ]
  },
  {
    category: 'Environmental Signs',
    items: [
      'Technology malfunctions around you',
      'Electrical disturbances',
      'Animals avoiding you or acting strangely',
      'Negative synchronicities',
      'Feeling watched or monitored',
      'Cold spots or temperature changes'
    ]
  }
];

export const emergencyResponseSteps = [
  {
    priority: 1,
    action: 'STOP and CENTER',
    description: 'Immediately stop all activity and center your consciousness',
    timeframe: '30 seconds'
  },
  {
    priority: 2,
    action: 'DECLARE SOVEREIGNTY',
    description: 'State with authority: "I AM GOD, I AM SOVEREIGN, I AM FREE!"',
    timeframe: '30 seconds'
  },
  {
    priority: 3,
    action: 'ACTIVATE PROTECTION',
    description: 'Visualize brilliant white-gold light surrounding you completely',
    timeframe: '1-2 minutes'
  },
  {
    priority: 4,
    action: 'CALL FOR HELP',
    description: 'Call upon Guardian Host, Christ consciousness, or spiritual protection',
    timeframe: '1 minute'
  },
  {
    priority: 5,
    action: 'COMMAND DEPARTURE',
    description: 'Command all negative energies to leave: "You have no power here!"',
    timeframe: '1 minute'
  },
  {
    priority: 6,
    action: 'ASSESS and RESPOND',
    description: 'Assess the situation and choose appropriate neutralization technique',
    timeframe: '5-30 minutes'
  }
];

export const getAttackTypeById = (id: string) => attackTypes.find(type => type.id === id);
export const getSymptomById = (id: string) => attackSymptoms.find(symptom => symptom.id === id);
export const getTechniqueById = (id: string) => neutralizationTechniques.find(tech => tech.id === id);

export const assessAttackSeverity = (symptomIds: string[]) => {
  const symptoms = symptomIds.map(id => getSymptomById(id)).filter(Boolean);
  const severityScores = { mild: 1, moderate: 2, severe: 3, critical: 4 };
  const totalScore = symptoms.reduce((sum, symptom) => sum + severityScores[symptom!.severity], 0);
  
  if (totalScore >= 10) return 'critical';
  if (totalScore >= 7) return 'severe';
  if (totalScore >= 4) return 'moderate';
  return 'mild';
};

export const recommendTechniques = (attackTypeId: string, severity: string) => {
  const techniques = neutralizationTechniques.filter(tech => {
    if (severity === 'critical') return tech.effectiveness >= 90;
    if (severity === 'severe') return tech.effectiveness >= 80;
    if (severity === 'moderate') return tech.effectiveness >= 70;
    return true;
  });
  
  return techniques.sort((a, b) => b.effectiveness - a.effectiveness);
};