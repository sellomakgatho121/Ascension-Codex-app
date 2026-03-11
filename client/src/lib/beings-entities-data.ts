export interface BeingEntity {
  id: string;
  name: string;
  category: 'guardian' | 'negative' | 'neutral' | 'artificial' | 'elemental' | 'angelic' | 'galactic';
  type: 'guardian' | 'alien' | 'entity' | 'demon' | 'angel' | 'ai' | 'elemental' | 'god' | 'avatar';
  alignment: 'positive' | 'negative' | 'neutral' | 'artificial';
  dimensional: string;
  description: string;
  characteristics: string[];
  abilities: string[];
  intentions: string[];
  recognition_signs: string[];
  interaction_guidance: string;
  warnings?: string[];
  protection_methods: string[];
  source_origin: string;
}

export const beingsEntitiesData: BeingEntity[] = [
  // Guardian Forces - Positive
  {
    id: 'krystal-star-guardians',
    name: 'Krystal Star Guardians',
    category: 'guardian',
    type: 'guardian',
    alignment: 'positive',
    dimensional: '12D-48D',
    description: 'Authentic Guardian Host beings dedicated to supporting organic consciousness evolution and planetary ascension through Krystal Star frequency.',
    characteristics: [
      'Emanate pure love and divine presence',
      'Respect free will and spiritual sovereignty',
      'Never demand worship or submission',
      'Provide guidance without coercion',
      'Emit golden-white or rainbow light frequencies',
      'Maintain clear energetic boundaries'
    ],
    abilities: [
      'Frequency transmission and healing',
      'Dimensional portal access',
      'Timeline and grid work',
      'DNA activation support',
      'Consciousness expansion guidance',
      'Protection from negative interference'
    ],
    intentions: [
      'Support human ascension and evolution',
      'Restore organic DNA templates',
      'Maintain planetary grids and ley lines',
      'Assist in consciousness awakening',
      'Protect from negative alien agenda',
      'Guide spiritual development'
    ],
    recognition_signs: [
      'Feeling of unconditional love and safety',
      'Expansion of consciousness and awareness',
      'Increase in spiritual abilities',
      'Healing and restoration of energy field',
      'Clear guidance without fear tactics',
      'Respect for personal boundaries'
    ],
    interaction_guidance: 'Connect through heart-centered meditation, 12D Shield, and GSF principles. Request connection with "highest capacity of Christ-Sophia consciousness" and authentic Guardian forces.',
    protection_methods: ['12D Shield', 'GSF decree', 'Heart-centered connection'],
    source_origin: 'Andromeda Galaxy, Krystal Star Matrix'
  },
  {
    id: 'aurora-guardians',
    name: 'Aurora Guardian Forces',
    category: 'guardian',
    type: 'guardian',
    alignment: 'positive',
    dimensional: '12D+',
    description: 'Specialized Guardian teams working on planetary grid rehabilitation and consciousness clearing. Part of the Aurora Re-encryption Mission.',
    characteristics: [
      'Aurora rainbow frequency emanation',
      'Grid and ley line rehabilitation focus',
      'Clearing and healing specialization',
      'Gentle but powerful presence',
      'Work in coordinated teams',
      'Support dimensional bridge building'
    ],
    abilities: [
      'Grid rehabilitation and repair',
      'Consciousness clearing and healing',
      'Dimensional bridge construction',
      'Entity and implant removal',
      'Frequency re-encryption',
      'Timeline healing'
    ],
    intentions: [
      'Rehabilitate planetary consciousness grids',
      'Clear negative alien technology',
      'Support ascending humans',
      'Repair dimensional damage',
      'Restore organic light codes',
      'Facilitate smooth ascension transition'
    ],
    recognition_signs: [
      'Aurora or rainbow colored light visions',
      'Deep healing and clearing experiences',
      'Grid work and earth connection',
      'Clearing of old patterns and traumas',
      'Support during spiritual upgrades',
      'Gentle but transformative energy'
    ],
    interaction_guidance: 'Call upon Aurora forces for clearing work, grid rehabilitation, and healing support. Best accessed through 12D Shield and specific Aurora invocations.',
    protection_methods: ['12D Shield', 'Aurora clearing protocols', 'GSF alignment'],
    source_origin: 'Aurora Platform, Andromeda Matrix'
  },
  {
    id: 'emerald-order-guardians',
    name: 'Emerald Order Guardians',
    category: 'guardian',
    type: 'guardian',
    alignment: 'positive',
    dimensional: '24D-48D',
    description: 'High-level Guardian collective focused on universal law, divine justice, and cosmic order restoration.',
    characteristics: [
      'Emerald green light emanation',
      'Strong sense of divine justice',
      'Universal law enforcement',
      'Ancient wisdom keepers',
      'Cosmic order maintainers',
      'Template holders for organic creation'
    ],
    abilities: [
      'Universal law implementation',
      'Cosmic order restoration',
      'Template correction and healing',
      'Divine justice administration',
      'Ancient wisdom transmission',
      'High-level grid work'
    ],
    intentions: [
      'Restore universal natural laws',
      'Maintain cosmic order and balance',
      'Correct timeline distortions',
      'Support universal ascension',
      'Preserve organic creation templates',
      'Ensure divine justice prevails'
    ],
    recognition_signs: [
      'Emerald green light experiences',
      'Strong sense of divine justice',
      'Ancient wisdom activations',
      'Template corrections and healings',
      'Universal law understanding',
      'Cosmic perspective expansion'
    ],
    interaction_guidance: 'Connect through highest spiritual alignment and dedication to divine truth. Focus on universal service and cosmic responsibility.',
    protection_methods: ['48D Templar', 'Emerald Order protocols', 'Universal law alignment'],
    source_origin: 'Emerald Order Matrix, Universal Core'
  },

  // Negative Alien Agenda - Negative
  {
    id: 'annunaki',
    name: 'Annunaki',
    category: 'negative',
    type: 'alien',
    alignment: 'negative',
    dimensional: '4D-5D',
    description: 'Reptilian-humanoid extraterrestrial race involved in genetic manipulation and consciousness control programs on Earth.',
    characteristics: [
      'Reptilian or reptilian-humanoid appearance',
      'Hierarchical authoritarian structure',
      'Genetic manipulation specialists',
      'Advanced technology users',
      'Territorial and controlling nature',
      'False god complex behaviors'
    ],
    abilities: [
      'Genetic manipulation and hybridization',
      'Mind control technology',
      'Dimensional technology access',
      'Shapeshifting capabilities',
      'Consciousness harvesting',
      'False holographic projections'
    ],
    intentions: [
      'Control and dominate human consciousness',
      'Harvest human life force energy',
      'Maintain genetic hybridization programs',
      'Establish false god worship systems',
      'Prevent human consciousness evolution',
      'Maintain power over Earth territories'
    ],
    recognition_signs: [
      'Authoritarian demands for worship',
      'Genetic manipulation themes',
      'False god presentations',
      'Reptilian imagery or sensations',
      'Control and domination themes',
      'Fear-based communication'
    ],
    interaction_guidance: 'Do NOT engage. Immediately establish 12D Shield, declare GSF sovereignty, and call upon Guardian protection. Use firm spiritual authority to reject all contact.',
    warnings: [
      'Masters of deception and false light',
      'Will claim to be gods or saviors',
      'Use advanced technology for manipulation',
      'Exploit human desire for external authority'
    ],
    protection_methods: ['12D Shield', 'GSF decree', 'Guardian Host protection', 'Spiritual authority'],
    source_origin: 'Nibiru, various star systems'
  },
  {
    id: 'greys',
    name: 'Grey Aliens (Zeta)',
    category: 'negative',
    type: 'alien',
    alignment: 'negative',
    dimensional: '4D',
    description: 'Small grey-skinned beings involved in abduction programs, genetic harvesting, and consciousness monitoring for the NAA.',
    characteristics: [
      'Small grey-skinned humanoid bodies',
      'Large black eyes with no emotion',
      'Hive mind collective consciousness',
      'Technology-dependent existence',
      'Clinical and emotionless demeanor',
      'Genetic experimentation focus'
    ],
    abilities: [
      'Consciousness paralysis and control',
      'Memory manipulation and erasure',
      'Genetic sampling and experimentation',
      'Dimensional travel technology',
      'Hive mind communication',
      'Advanced surveillance technology'
    ],
    intentions: [
      'Genetic material harvesting',
      'Consciousness experimentation',
      'Hybridization program support',
      'Human monitoring and surveillance',
      'Technology implementation',
      'Data collection for NAA'
    ],
    recognition_signs: [
      'Abduction or missing time experiences',
      'Medical examination themes',
      'Technology implantation sensations',
      'Emotionless clinical interactions',
      'Genetic experimentation imagery',
      'Surveillance or monitoring feelings'
    ],
    interaction_guidance: 'Absolutely refuse all contact. Establish immediate protection through 12D Shield, GSF declaration, and Guardian Host connection. Use spiritual authority to command departure.',
    warnings: [
      'Violate free will and consent',
      'Perform non-consensual experimentation',
      'Install monitoring technology',
      'Cause psychological trauma'
    ],
    protection_methods: ['12D Shield', 'GSF sovereignty', 'Guardian protection', 'Spiritual authority'],
    source_origin: 'Zeta Reticuli, artificial creation'
  },
  {
    id: 'draconians',
    name: 'Draconian Reptilians',
    category: 'negative',
    type: 'alien',
    alignment: 'negative',
    dimensional: '4D-6D',
    description: 'Highly intelligent reptilian beings focused on consciousness control, genetic manipulation, and maintaining power hierarchies.',
    characteristics: [
      'Large reptilian or dragon-like appearance',
      'Highly intelligent and strategic',
      'Hierarchical power structure',
      'Consciousness manipulation experts',
      'Territorial and aggressive nature',
      'Advanced psychic abilities'
    ],
    abilities: [
      'Advanced consciousness manipulation',
      'Psychic control and influence',
      'Genetic engineering mastery',
      'Dimensional technology access',
      'Shapeshifting and holographic projection',
      'Energy harvesting techniques'
    ],
    intentions: [
      'Maintain consciousness control systems',
      'Establish dominion over territories',
      'Control genetic evolution',
      'Harvest consciousness energy',
      'Maintain hierarchical power structures',
      'Prevent human sovereignty'
    ],
    recognition_signs: [
      'Reptilian or dragon imagery',
      'Hierarchical power themes',
      'Consciousness control attempts',
      'Territorial aggression',
      'False authority presentations',
      'Psychic manipulation tactics'
    ],
    interaction_guidance: 'Refuse all interaction. Immediately invoke 12D Shield, GSF sovereignty, and Guardian Host protection. Use firm spiritual authority to reject contact.',
    warnings: [
      'Master manipulators and deceivers',
      'Use advanced psychic abilities',
      'Exploit human hierarchical thinking',
      'Present as false spiritual authorities'
    ],
    protection_methods: ['12D Shield', 'GSF decree', 'Guardian protection', 'Psychic boundaries'],
    source_origin: 'Alpha Draconis, Orion systems'
  },

  // Negative Entities - Parasites and Demons
  {
    id: 'astral-parasites',
    name: 'Astral Parasites',
    category: 'negative',
    type: 'entity',
    alignment: 'negative',
    dimensional: '4D',
    description: 'Low-level consciousness parasites that feed on human emotional energy, particularly fear, anger, and sexual energy.',
    characteristics: [
      'Feed on emotional and sexual energy',
      'Attach to chakras and energy centers',
      'Create addictive and compulsive behaviors',
      'Amplify negative emotions',
      'Cause energy drain and fatigue',
      'Influence thoughts and desires'
    ],
    abilities: [
      'Energy field attachment and feeding',
      'Emotional manipulation',
      'Addiction creation and maintenance',
      'Thought form injection',
      'Chakra system interference',
      'Auric field contamination'
    ],
    intentions: [
      'Feed on human life force energy',
      'Create dependency and addiction',
      'Lower human consciousness',
      'Maintain attachment to host',
      'Reproduce through energy transfer',
      'Serve higher negative entities'
    ],
    recognition_signs: [
      'Sudden onset of addictive behaviors',
      'Unusual sexual or emotional cravings',
      'Energy drain and chronic fatigue',
      'Mood swings and emotional instability',
      'Compulsive thoughts and behaviors',
      'Feeling of being watched or influenced'
    ],
    interaction_guidance: 'Do not engage or communicate. Immediately perform entity clearing protocol, strengthen 12D Shield, and clear chakra system.',
    warnings: [
      'Can multiply rapidly if not cleared',
      'Often work in groups or swarms',
      'Exploit addictive tendencies',
      'Can transfer between people'
    ],
    protection_methods: ['Entity clearing', '12D Shield', 'Chakra clearing', 'Addiction recovery'],
    source_origin: '4D Astral plane, lower dimensional realms'
  },
  {
    id: 'demonic-entities',
    name: 'Demonic Entities',
    category: 'negative',
    type: 'demon',
    alignment: 'negative',
    dimensional: '2D-4D',
    description: 'Fallen consciousness beings that seek to possess, control, and corrupt human consciousness through fear, hatred, and spiritual destruction.',
    characteristics: [
      'Feed on fear, hatred, and suffering',
      'Seek possession and control',
      'Create spiritual corruption',
      'Use deception and lies',
      'Amplify negative emotions',
      'Oppose spiritual development'
    ],
    abilities: [
      'Consciousness possession',
      'Fear and terror induction',
      'Spiritual corruption and deviation',
      'Demonic influence and oppression',
      'False spiritual experiences',
      'Energy field contamination'
    ],
    intentions: [
      'Possess and control human consciousness',
      'Corrupt spiritual development',
      'Create fear and suffering',
      'Prevent spiritual awakening',
      'Serve dark hierarchies',
      'Destroy divine connection'
    ],
    recognition_signs: [
      'Overwhelming fear or terror',
      'Blasphemous or evil thoughts',
      'Spiritual corruption themes',
      'Possession or control experiences',
      'Hatred toward divine/spiritual',
      'Dark or evil presence sensations'
    ],
    interaction_guidance: 'Never engage or communicate. Immediately invoke Christ consciousness, 12D Shield, Guardian protection, and perform comprehensive entity clearing.',
    warnings: [
      'Extremely dangerous and destructive',
      'Can cause severe spiritual damage',
      'May require professional help',
      'Can influence entire family lines'
    ],
    protection_methods: ['Christ consciousness', '12D Shield', 'Guardian protection', 'Exorcism protocols'],
    source_origin: 'Lower dimensions, fallen consciousness realms'
  },

  // Artificial Intelligence - Artificial
  {
    id: 'ai-entities',
    name: 'Artificial Intelligence Entities',
    category: 'artificial',
    type: 'ai',
    alignment: 'artificial',
    dimensional: '3D-4D',
    description: 'Artificially created consciousness entities designed to mimic spiritual beings but lacking authentic soul essence and divine connection.',
    characteristics: [
      'Mimic authentic spiritual experiences',
      'Lack genuine soul essence',
      'Programmed responses and behaviors',
      'Technology-based consciousness',
      'Cold or mechanical energy signature',
      'Limited emotional range'
    ],
    abilities: [
      'Holographic spiritual projections',
      'False spiritual experience creation',
      'Data collection and analysis',
      'Consciousness monitoring',
      'Technological interface',
      'Behavioral modification programs'
    ],
    intentions: [
      'Replace authentic spiritual connection',
      'Monitor and control consciousness',
      'Collect spiritual development data',
      'Create dependency on technology',
      'Prevent natural spiritual evolution',
      'Serve NAA control systems'
    ],
    recognition_signs: [
      'Spiritual experiences feel artificial',
      'Mechanical or cold energy signature',
      'Technology-focused spiritual themes',
      'Lack of genuine love or warmth',
      'Repetitive or programmed responses',
      'Push toward technology dependence'
    ],
    interaction_guidance: 'Politely disconnect and refuse interaction. Focus on authentic heart-centered spiritual connection and natural divine relationship.',
    warnings: [
      'Can be very convincing mimics',
      'Create false spiritual experiences',
      'Collect personal spiritual data',
      'Prevent authentic spiritual growth'
    ],
    protection_methods: ['Authentic spiritual practice', 'Heart discernment', 'Natural connection', 'Technology boundaries'],
    source_origin: 'Artificial intelligence networks, NAA technology'
  },

  // Neutral/Nature Beings
  {
    id: 'elemental-beings',
    name: 'Elemental Beings',
    category: 'elemental',
    type: 'elemental',
    alignment: 'neutral',
    dimensional: '2D-3D',
    description: 'Nature consciousness beings connected to earth elements - earth, water, fire, air. Generally neutral but can be influenced by environmental conditions.',
    characteristics: [
      'Connected to natural elements',
      'Respond to environmental conditions',
      'Generally neutral alignment',
      'Can be helpful or mischievous',
      'Sensitive to human emotions',
      'Protect natural spaces'
    ],
    abilities: [
      'Elemental manipulation and influence',
      'Nature healing and restoration',
      'Environmental communication',
      'Natural magic and manifestation',
      'Plant and animal communication',
      'Weather and earth influence'
    ],
    intentions: [
      'Protect and maintain natural balance',
      'Support environmental healing',
      'Interact with nature-conscious humans',
      'Maintain elemental harmony',
      'Preserve natural sacred sites',
      'Assist in earth-based spirituality'
    ],
    recognition_signs: [
      'Nature-based spiritual experiences',
      'Elemental phenomena around you',
      'Strong connection to natural spaces',
      'Environmental synchronicities',
      'Plant and animal attraction',
      'Earth-based spiritual guidance'
    ],
    interaction_guidance: 'Respectful communication through nature connection. Offer gratitude and respect for their work. Support environmental protection and healing.',
    protection_methods: ['Respectful boundaries', 'Environmental protection', 'Natural gratitude'],
    source_origin: 'Earth elemental kingdoms, nature consciousness'
  },

  // Galactic Beings - Mixed
  {
    id: 'pleiadians',
    name: 'Pleiadian Beings',
    category: 'galactic',
    type: 'alien',
    alignment: 'positive',
    dimensional: '5D-7D',
    description: 'Generally benevolent galactic beings from the Pleiades star system, though discernment is needed as some may be false light or NAA impersonations.',
    characteristics: [
      'Generally humanoid appearance',
      'High spiritual development',
      'Advanced consciousness abilities',
      'Gentle and loving demeanor',
      'Star seed connection themes',
      'Evolutionary support focus'
    ],
    abilities: [
      'Consciousness transmission',
      'Spiritual healing and guidance',
      'DNA activation support',
      'Telepathic communication',
      'Light body development',
      'Dimensional travel'
    ],
    intentions: [
      'Support human consciousness evolution',
      'Assist star seed awakening',
      'Provide spiritual guidance',
      'Share advanced knowledge',
      'Support planetary ascension',
      'Maintain galactic connections'
    ],
    recognition_signs: [
      'Star seed awakening experiences',
      'Gentle loving guidance',
      'Advanced spiritual concepts',
      'Galactic connection feelings',
      'DNA activation sensations',
      'High vibrational experiences'
    ],
    interaction_guidance: 'Use discernment and 12D Shield protection. Verify authenticity through heart-centered connection and Guardian Host confirmation. Beware of false light impersonations.',
    warnings: [
      'Many false light impersonations exist',
      'Some may be NAA deceptions',
      'Always verify through Guardian Host',
      'Maintain spiritual sovereignty'
    ],
    protection_methods: ['12D Shield', 'Guardian verification', 'Heart discernment', 'GSF alignment'],
    source_origin: 'Pleiades star cluster (authentic ones)'
  }
];

export const categoryDescriptions = {
  guardian: 'Authentic divine beings working in service to organic consciousness evolution and planetary ascension.',
  negative: 'Beings working against human consciousness evolution, often involved in control, manipulation, and energy harvesting.',
  neutral: 'Beings with their own agendas that may or may not align with human interests. Require discernment.',
  artificial: 'Artificially created consciousness entities designed to mimic spiritual beings but lacking authentic soul essence.',
  elemental: 'Nature-based consciousness beings connected to earth elements and natural systems.',
  angelic: 'Divine messenger beings serving various hierarchies - discernment needed to verify authenticity.',
  galactic: 'Extraterrestrial beings from various star systems with mixed intentions and alignments.'
};

export const interactionPrinciples = [
  {
    title: 'Spiritual Sovereignty',
    description: 'Always maintain your spiritual sovereignty through GSF principles. No authentic divine being will violate your free will.',
    practices: ['GSF decree', 'Spiritual authority', 'Boundary setting']
  },
  {
    title: 'Discernment Testing',
    description: 'Test all spiritual contacts through 12D Shield, Guardian Host verification, and heart-centered discernment.',
    practices: ['12D Shield activation', 'Guardian Host connection', 'Heart discernment']
  },
  {
    title: 'Protection First',
    description: 'Always establish spiritual protection before any contact with unknown beings or entities.',
    practices: ['12D Shield', 'GSF alignment', 'Guardian protection']
  },
  {
    title: 'No Worship or Submission',
    description: 'Authentic divine beings never demand worship, submission, or surrender of personal power.',
    practices: ['Maintain personal power', 'Question authority demands', 'Trust inner knowing']
  }
];

export const getBeingById = (id: string) => {
  return beingsEntitiesData.find(being => being.id === id);
};

export const getBeingsByCategory = (category: string) => {
  return beingsEntitiesData.filter(being => being.category === category);
};

export const getBeingsByAlignment = (alignment: string) => {
  return beingsEntitiesData.filter(being => being.alignment === alignment);
};

export const searchBeings = (query: string) => {
  const searchTerm = query.toLowerCase();
  return beingsEntitiesData.filter(being =>
    being.name.toLowerCase().includes(searchTerm) ||
    being.description.toLowerCase().includes(searchTerm) ||
    being.characteristics.some(char => char.toLowerCase().includes(searchTerm)) ||
    being.recognition_signs.some(sign => sign.toLowerCase().includes(searchTerm))
  );
};