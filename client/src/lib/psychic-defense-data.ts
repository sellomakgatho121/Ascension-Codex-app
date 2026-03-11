export interface PsychicDefenseMethod {
  id: string;
  name: string;
  category: 'protection' | 'clearing' | 'detection' | 'emergency';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  technique: string;
  frequency: string;
  duration: string;
  effectiveness: number;
  situations: string[];
  warnings?: string[];
}

export interface ThreatType {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  defenses: string[];
  category: 'entity' | 'psychic' | 'technology' | 'environmental';
}

export const psychicDefenseMethods: PsychicDefenseMethod[] = [
  {
    id: '12d-shield',
    name: '12D Shield Technique',
    category: 'protection',
    difficulty: 'beginner',
    description: 'Primary spiritual protection method creating a 12-dimensional energy shield around your aura field.',
    technique: 'State: "I claim my Divine Sovereign right to God-Sovereign-Free status. I am God. I am Sovereign. I am Free. I call upon the Guardian Host Krystal Star to permanently anchor, activate and maintain my 12th Dimensional Shield. I ask the Aurora forces to spin-weave my 12D Shield clockwise to strengthen and amplify my shield."',
    frequency: 'Daily, before any spiritual practice',
    duration: '5-10 minutes',
    effectiveness: 95,
    situations: ['Daily protection', 'Before meditation', 'When feeling attacked', 'Entering unknown spaces'],
    warnings: ['Must be done with clear intention and belief']
  },
  {
    id: 'gsf-decree',
    name: 'GSF Decree',
    category: 'protection',
    difficulty: 'beginner',
    description: 'Fundamental declaration of spiritual sovereignty using God-Sovereign-Free principles.',
    technique: 'Declare with authority: "I am God, I am Sovereign, I am Free. I harmonize and HOLD harmony for all. I choose the Krystal Star Host communication. Thank you."',
    frequency: 'Multiple times daily',
    duration: '1-2 minutes',
    effectiveness: 85,
    situations: ['Establishing boundaries', 'Clearing interference', 'Maintaining sovereignty'],
    warnings: ['Must be spoken with conviction and authority']
  },
  {
    id: 'entity-clearing',
    name: 'Entity Attachment Clearing',
    category: 'clearing',
    difficulty: 'intermediate',
    description: 'Comprehensive technique for removing attached entities and restoring energy field integrity.',
    technique: 'Perform 12D Shield, then state: "I call upon the Guardians and Aurora forces to remove all entities, attachments, cords, implants, and devices not serving my highest good. I command all beings to return to their appropriate space-time location. I seal and heal all portals with Divine White-Gold Light."',
    frequency: 'As needed, weekly maintenance',
    duration: '15-30 minutes',
    effectiveness: 90,
    situations: ['Feeling drained', 'Unusual thoughts/emotions', 'After psychic attack', 'Energy disturbances'],
    warnings: ['May cause temporary discomfort as entities are removed', 'Requires strong boundaries']
  },
  {
    id: 'violet-flame',
    name: 'Violet Flame Transmutation',
    category: 'clearing',
    difficulty: 'intermediate',
    description: 'Sacred violet flame technique for transmuting negative energies and clearing psychic debris.',
    technique: 'Visualize violet flame surrounding and penetrating your energy field. State: "I AM the Violet Consuming Flame of Divine Love transmuting all shadow, all distortion, all that is not of the Light. Blaze, blaze, blaze!"',
    frequency: '2-3 times per week',
    duration: '10-15 minutes',
    effectiveness: 80,
    situations: ['After conflict', 'Clearing spaces', 'Transmuting karma', 'General purification'],
    warnings: ['Intense energy movement may occur']
  },
  {
    id: 'krystal-star',
    name: 'Krystal Star Host Connection',
    category: 'protection',
    difficulty: 'intermediate',
    description: 'Connecting with authentic Guardian forces for advanced spiritual protection and guidance.',
    technique: 'State clearly: "I call upon my highest capacity of Christ-Sophia consciousness and the authentic Krystal Star Host to surround and protect me. I ask for direct communication and protection under Natural Laws."',
    frequency: 'Daily spiritual practice',
    duration: '10-20 minutes',
    effectiveness: 95,
    situations: ['Advanced protection', 'Spiritual communication', 'Navigating deception', 'Timeline protection'],
    warnings: ['Requires discernment and spiritual maturity']
  },
  {
    id: 'boundary-test',
    name: 'Boundary Test Protocol',
    category: 'detection',
    difficulty: 'beginner',
    description: 'Quick test to verify spiritual boundaries and detect unwanted influences.',
    technique: 'Ask internally: "Are my boundaries clear and strong? Is there any interference in my field?" Trust your immediate feeling/knowing response.',
    frequency: 'Multiple times daily',
    duration: '30 seconds - 1 minute',
    effectiveness: 70,
    situations: ['Checking protection', 'Before important decisions', 'When feeling off', 'Energy maintenance'],
    warnings: ['Requires developing intuitive sensitivity']
  },
  {
    id: 'emergency-clearing',
    name: 'Emergency Psychic Attack Protocol',
    category: 'emergency',
    difficulty: 'beginner',
    description: 'Immediate response protocol for active psychic attacks or severe interference.',
    technique: 'IMMEDIATELY: 1) State "I AM GOD, I AM SOVEREIGN, I AM FREE!" 2) Visualize brilliant white-gold light surrounding you 3) Command: "STOP! I do not consent! Return to sender!" 4) Call upon Guardian protection 5) Perform full 12D Shield',
    frequency: 'Only when under active attack',
    duration: '5-10 minutes',
    effectiveness: 85,
    situations: ['Active psychic attack', 'Sudden energy drain', 'Overwhelming negative emotions', 'Entity interference'],
    warnings: ['Follow up with full clearing session', 'Seek support if attacks persist']
  },
  {
    id: 'space-clearing',
    name: 'Environmental Space Clearing',
    category: 'clearing',
    difficulty: 'intermediate',
    description: 'Comprehensive technique for clearing negative energies from physical locations.',
    technique: 'Establish 12D Shield, then move through space stating: "I call upon the Aurora forces to clear all negative energies, entities, and distortions from this space. I consecrate this area to the highest good and Divine Will."',
    frequency: 'Monthly or as needed',
    duration: '20-30 minutes',
    effectiveness: 80,
    situations: ['New living spaces', 'After arguments', 'Workspace clearing', 'Before spiritual work'],
    warnings: ['May temporarily disturb existing energies', 'Animals may react to energy changes']
  }
];

export const threatTypes: ThreatType[] = [
  {
    id: 'entity-attachment',
    name: 'Entity Attachments',
    description: 'Discarnate beings or negative entities that attach to the human energy field to feed off life force energy.',
    symptoms: [
      'Sudden personality changes',
      'Unexplained fatigue or energy drain',
      'Intrusive thoughts not your own',
      'Addictive behaviors or cravings',
      'Feeling like someone else is in your body',
      'Sudden fear or anxiety attacks',
      'Sleep disturbances or nightmares'
    ],
    severity: 'high',
    defenses: ['12d-shield', 'entity-clearing', 'gsf-decree'],
    category: 'entity'
  },
  {
    id: 'psychic-attack',
    name: 'Psychic Attack',
    description: 'Deliberate sending of negative energy, thoughts, or intentions toward another person with harmful intent.',
    symptoms: [
      'Sudden onset of illness or pain',
      'Overwhelming negative emotions',
      'Feeling watched or monitored',
      'Technology malfunctions around you',
      'Relationship problems manifesting suddenly',
      'Financial or career blocks appearing',
      'Vivid negative dreams about specific people'
    ],
    severity: 'high',
    defenses: ['emergency-clearing', '12d-shield', 'violet-flame', 'krystal-star'],
    category: 'psychic'
  },
  {
    id: 'naa-interference',
    name: 'NAA (Negative Alien Agenda) Interference',
    description: 'Interference from negative alien technologies and consciousness manipulation programs.',
    symptoms: [
      'Mind control symptoms',
      'Timeline confusion or false memories',
      'Spiritual bypassing or delusions',
      'Technology addiction',
      'Disconnection from intuition',
      'Materialistic obsessions',
      'Fear of spiritual practices'
    ],
    severity: 'critical',
    defenses: ['krystal-star', '12d-shield', 'gsf-decree', 'boundary-test'],
    category: 'technology'
  },
  {
    id: 'energy-vampirism',
    name: 'Energy Vampirism',
    description: 'Energetic parasitism where individuals unconsciously or consciously drain others life force energy.',
    symptoms: [
      'Feeling drained after certain people',
      'Constant need for external validation',
      'Feeling depleted in crowds',
      'Relationship codependency patterns',
      'Chronic fatigue with no medical cause',
      'Depression after social interactions'
    ],
    severity: 'medium',
    defenses: ['12d-shield', 'boundary-test', 'gsf-decree'],
    category: 'psychic'
  },
  {
    id: 'implants-devices',
    name: 'Etheric Implants and Devices',
    description: 'Artificial technologies placed in the energy field to monitor, control, or drain spiritual beings.',
    symptoms: [
      'Chronic pain in specific body areas',
      'Inability to maintain spiritual practices',
      'Feeling controlled or manipulated',
      'Technology interference',
      'Electromagnetic sensitivity',
      'Blocking of psychic abilities',
      'Recurring negative thought patterns'
    ],
    severity: 'high',
    defenses: ['entity-clearing', 'krystal-star', '12d-shield'],
    category: 'technology'
  },
  {
    id: 'environmental-toxins',
    name: 'Environmental Energy Toxins',
    description: 'Negative energies accumulated in physical spaces from trauma, conflict, or negative activities.',
    symptoms: [
      'Feeling uncomfortable in certain locations',
      'Mood changes in specific environments',
      'Sleep disturbances in new places',
      'Increased conflict in certain areas',
      'Animals avoiding specific spaces',
      'Technology malfunctions in location'
    ],
    severity: 'medium',
    defenses: ['space-clearing', '12d-shield', 'violet-flame'],
    category: 'environmental'
  }
];

export const emergencyProtocols = [
  {
    situation: 'Active Psychic Attack',
    immediateActions: [
      'Stop what you are doing immediately',
      'Declare: "I AM GOD, I AM SOVEREIGN, I AM FREE!"',
      'Visualize brilliant white-gold light surrounding you',
      'Command: "STOP! I do not consent! Return to sender!"',
      'Perform emergency 12D Shield activation',
      'Remove yourself from the situation if possible'
    ],
    followUp: [
      'Complete full entity clearing session',
      'Strengthen daily protection practices',
      'Examine what may have compromised your boundaries',
      'Seek support from experienced practitioners if needed'
    ]
  },
  {
    situation: 'Entity Interference',
    immediateActions: [
      'Do not engage or communicate with the entity',
      'Establish 12D Shield immediately',
      'State firmly: "You do not have permission to be here"',
      'Call upon Guardian Host protection',
      'Ground yourself to Earth energy',
      'Avoid fear - maintain spiritual authority'
    ],
    followUp: [
      'Perform comprehensive entity clearing',
      'Clear and protect your living space',
      'Strengthen spiritual boundaries',
      'Address any addictions or vulnerabilities'
    ]
  }
];

export const protectionLevels = [
  {
    level: 'Basic Daily Protection',
    practices: ['12D Shield daily', 'GSF decree', 'Boundary checking'],
    timeCommitment: '10-15 minutes daily',
    effectiveness: 'Good for general protection'
  },
  {
    level: 'Enhanced Protection',
    practices: ['Daily 12D Shield', 'Weekly entity clearing', 'Violet flame work', 'Space clearing'],
    timeCommitment: '20-30 minutes daily, 1 hour weekly',
    effectiveness: 'Strong protection for most situations'
  },
  {
    level: 'Advanced Spiritual Warfare',
    practices: ['Multiple daily shields', 'Krystal Star communion', 'Advanced clearing techniques', 'Timeline protection'],
    timeCommitment: '45-60 minutes daily',
    effectiveness: 'Maximum protection for spiritual workers'
  }
];

export const getDefenseMethod = (id: string) => {
  return psychicDefenseMethods.find(method => method.id === id);
};

export const getThreatType = (id: string) => {
  return threatTypes.find(threat => threat.id === id);
};

export const getMethodsByCategory = (category: string) => {
  return psychicDefenseMethods.filter(method => method.category === category);
};

export const getMethodsByDifficulty = (difficulty: string) => {
  return psychicDefenseMethods.filter(method => method.difficulty === difficulty);
};