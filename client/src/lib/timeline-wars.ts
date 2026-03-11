// Timeline Wars Chronology - Comprehensive Historical Account
// Extracted from authentic ES materials and Ascension Glossary

export interface TimelineWar {
  id: string;
  title: string;
  timeframe: string;
  location: string;
  participants: {
    human: string[];
    antiHuman: string[];
  };
  description: string;
  consequences: string;
  technologies: string[];
  significance: string;
  category: 'galactic' | 'planetary' | 'dimensional' | 'consciousness';
}

export const timelineWarsChronology: TimelineWar[] = [
  // Ancient Galactic Wars
  {
    id: 'lyran-wars',
    title: 'Lyran Wars',
    timeframe: '25-30 Million Years Ago',
    location: 'Lyra Constellation, Vega System',
    participants: {
      human: ['Lyran Civilization', 'Emerald Founder Races', 'Elohim'],
      antiHuman: ['Draconian Empire', 'Alpha Draconis', 'Orion Group']
    },
    description: 'The first major galactic war between human and anti-human forces. Draconian Empire invaded Lyran systems, destroying the original human civilization and forcing survivors to flee throughout the galaxy.',
    consequences: 'Destruction of original human homeworld, galactic diaspora of human races, beginning of ongoing galactic conflicts between human and reptilian civilizations.',
    technologies: ['Planet Destroyers', 'Genetic Warfare', 'Timeline Manipulation', 'Consciousness Weapons'],
    significance: 'First major timeline war that scattered human civilization and began the pattern of galactic conflicts that continue today.',
    category: 'galactic'
  },

  {
    id: 'orion-wars',
    title: 'Orion Wars',
    timeframe: '8-5 Million Years Ago',
    location: 'Orion Constellation, Multiple Star Systems',
    participants: {
      human: ['Rigel Civilization', 'Mintaka Guardians', 'Bellatrix Humans'],
      antiHuman: ['Orion Group', 'Betelgeuse Draconians', 'Rigel Zeta']
    },
    description: 'Major galactic conflict in Orion constellation where human colonies were systematically invaded and enslaved by Draconian and Zeta forces, establishing the Orion Empire.',
    consequences: 'Establishment of Orion Empire as major anti-human stronghold, enslavement of human populations, creation of hybrid races, development of advanced mind control technologies.',
    technologies: ['Mind Control Systems', 'Hybrid Breeding Programs', 'Soul Capture Technology', 'Artificial Intelligence'],
    significance: 'Established Orion as primary source of anti-human agenda and advanced consciousness control technologies used throughout galaxy.',
    category: 'galactic'
  },

  // Earth-Specific Wars
  {
    id: 'electric-wars',
    title: 'Electric Wars',
    timeframe: '560,000 Years Ago',
    location: 'Earth, Gaia',
    participants: {
      human: ['Melchizedek Guardians', 'Sirian Council', 'Azurite Assembly'],
      antiHuman: ['Jehovian Annunaki', 'Draconian Alliance', 'Fallen Angelic Legions']
    },
    description: 'First major timeline war on Earth involving the use of electromagnetic weapons and planet-damaging technology. War between Guardian races and invading Annunaki factions over control of Earth\'s stargates.',
    consequences: 'Damage to planetary electromagnetic grids, destruction of organic portals, beginning of planetary quarantine, installation of NET (Nibiru Electrostatic Transduction) field.',
    technologies: ['Electromagnetic Weapons', 'Frequency Fences', 'Portal Destruction', 'Grid Distortion Technology'],
    significance: 'First major damage to Earth\'s natural grid system and beginning of planetary isolation from galactic communities.',
    category: 'planetary'
  },

  {
    id: 'thousand-years-war',
    title: 'Thousand Years War',
    timeframe: '848,000 - 847,000 Years Ago',
    location: 'Earth, Solar System',
    participants: {
      human: ['Guardian Alliance', 'Krystal Star Guardians', 'Human Hybrid Races'],
      antiHuman: ['Alpha Draconis', 'Orion Group', 'Annunaki Resistance']
    },
    description: 'Prolonged conflict lasting approximately one thousand years involving multiple dimensions and timeline manipulation. War over control of Earth\'s stargate system and human genetic template.',
    consequences: 'Severe damage to time-space fabric, creation of artificial timelines, establishment of multiple timeline loops, beginning of consciousness fragmentation in human population.',
    technologies: ['Timeline Manipulation', 'Artificial Timeline Creation', 'Consciousness Fragmentation Weapons', 'Dimensional Rifts'],
    significance: 'Major damage to natural time-space continuum and beginning of artificial timeline control systems.',
    category: 'dimensional'
  },

  {
    id: 'luciferian-rebellion',
    title: 'Luciferian Rebellion',
    timeframe: '250,000 - 65,000 Years Ago',
    location: 'Earth, Atlantis, Multidimensional',
    participants: {
      human: ['Emerald Guardian Alliance', 'Christos Templars', 'Essene Tribes'],
      antiHuman: ['Luciferian Forces', 'Satanic Hierarchy', 'Fallen Angelics', 'Baphomet Networks']
    },
    description: 'Major rebellion against natural laws by Luciferian entities seeking to control creation through artificial technology and consciousness enslavement rather than organic spiritual evolution.',
    consequences: 'Installation of artificial matrices, consciousness control grids, establishment of satanic ritual abuse networks, inversion of natural spiritual principles.',
    technologies: ['Artificial Light Technology', 'Consciousness Harvesting Systems', 'Inorganic Timelines', 'Satanic Ritual Networks'],
    significance: 'Establishment of major consciousness control infrastructure and inversion of spiritual principles affecting human development.',
    category: 'consciousness'
  },

  // Atlantean Period Wars
  {
    id: 'atlantean-wars',
    title: 'Atlantean Wars',
    timeframe: '50,000 - 12,000 Years Ago',
    location: 'Atlantic Ocean, Earth',
    participants: {
      human: ['Atlantean Guardians', 'Sons of the Law of One', 'Emerald Covenant Keepers'],
      antiHuman: ['Sons of Belial', 'Annunaki Hybrids', 'Draconian Infiltrators']
    },
    description: 'Series of conflicts within Atlantean civilization between those maintaining spiritual principles (Law of One) and those seeking power through technology and domination (Sons of Belial).',
    consequences: 'Destruction of Atlantean civilization, sinking of continent, massive loss of ancient knowledge, reduction of human DNA from 12 to 2 strands.',
    technologies: ['Crystal Weapons', 'Genetic Manipulation Technology', 'Weather Control Systems', 'Consciousness Suppression Devices'],
    significance: 'Final destruction of advanced human civilization and beginning of current cycle of consciousness limitation.',
    category: 'planetary'
  },

  {
    id: 'flood-cataclysms',
    title: 'Great Flood Cataclysms',
    timeframe: '22,000 - 10,500 BCE',
    location: 'Global Earth Events',
    participants: {
      human: ['Surviving Human Populations', 'Guardian Rescue Missions'],
      antiHuman: ['Annunaki Controllers', 'Draconian Overlords', 'Jehovian Factions']
    },
    description: 'Series of engineered cataclysmic events including massive floods designed to reduce human population and destroy remaining advanced knowledge and technology.',
    consequences: 'Massive reduction in human population, loss of advanced civilizations, destruction of ancient libraries and technologies, reset of human development.',
    technologies: ['Weather Warfare', 'Tectonic Manipulation', 'Polar Shift Technology', 'Flood Engineering'],
    significance: 'Major population reduction and civilization reset allowing for increased control over surviving human populations.',
    category: 'planetary'
  },

  // Historical Control Wars
  {
    id: 'sumerian-control',
    title: 'Sumerian Infiltration',
    timeframe: '8,000 - 4,000 BCE',
    location: 'Mesopotamia, Middle East',
    participants: {
      human: ['Indigenous Human Tribes', 'Christos Templars'],
      antiHuman: ['Annunaki Overlords', 'Enlil-Enki Factions', 'Draconian Hybrids']
    },
    description: 'Establishment of direct alien control over human civilization through Sumerian culture, creating hierarchical control systems, patriarchal religions, and economic slavery.',
    consequences: 'Foundation of current control systems including government hierarchies, organized religions, economic slavery, and systematic human consciousness programming.',
    technologies: ['Mind Control Programming', 'Religious Indoctrination Systems', 'Hierarchical Control Structures', 'Economic Enslavement'],
    significance: 'Establishment of systematic human control infrastructure that continues to influence civilization today.',
    category: 'consciousness'
  },

  {
    id: 'essene-massacre',
    title: 'Essene Massacre & Christos Mission',
    timeframe: '12 BCE - 27 CE',
    location: 'Palestine, Middle East',
    participants: {
      human: ['Essene Tribes', 'Christos Mission', 'Guardian Alliance'],
      antiHuman: ['Roman Empire Controllers', 'Annunaki Hybrids', 'Satanic Networks']
    },
    description: 'Systematic persecution and elimination of Essene communities who maintained original Christos teachings and direct divine connection capabilities.',
    consequences: 'Suppression of authentic spiritual teachings, establishment of corrupted religious control systems, elimination of groups maintaining direct divine connection.',
    technologies: ['Religious Programming', 'Spiritual Suppression Techniques', 'Historical Record Manipulation', 'Consciousness Control'],
    significance: 'Elimination of authentic spiritual knowledge and establishment of religious control systems replacing direct divine connection.',
    category: 'consciousness'
  },

  {
    id: 'cathar-crusades',
    title: 'Cathar Crusades & Albigensian Wars',
    timeframe: '1209 - 1229 CE',
    location: 'Southern France, Europe',
    participants: {
      human: ['Cathar Communities', 'Gnostic Christians', 'Indigenous Spiritual Groups'],
      antiHuman: ['Catholic Church', 'Vatican Controllers', 'Satanic Hierarchies']
    },
    description: 'Systematic genocide of Cathar communities who maintained Gnostic Christian teachings and direct spiritual connection practices threatening church control.',
    consequences: 'Elimination of alternative spiritual traditions, consolidation of church power, destruction of Gnostic knowledge, reinforcement of external authority over direct spiritual experience.',
    technologies: ['Military Warfare', 'Religious Persecution', 'Knowledge Destruction', 'Spiritual Suppression'],
    significance: 'Major elimination of groups maintaining authentic spiritual practices and alternative religious perspectives.',
    category: 'consciousness'
  },

  // Modern Era Wars
  {
    id: 'world-wars',
    title: 'World Wars & Consciousness Control',
    timeframe: '1914 - 1945 CE',
    location: 'Global Earth Events',
    participants: {
      human: ['Awakened Human Populations', 'Resistance Movements'],
      antiHuman: ['Nazi Occult Programs', 'Satanic Military Networks', 'Alien Hybrid Controllers']
    },
    description: 'Major global conflicts designed to harvest negative emotional energy, test advanced mind control technologies, and advance global control systems.',
    consequences: 'Massive trauma and negative energy harvesting, advancement of mind control technologies, establishment of global surveillance and control infrastructure.',
    technologies: ['Propaganda Systems', 'Mass Trauma Programming', 'Advanced Weapons Testing', 'Global Control Networks'],
    significance: 'Major advancement in global consciousness control systems and harvesting of negative emotional energy from human population.',
    category: 'consciousness'
  },

  {
    id: 'ai-wars',
    title: 'AI Wars & Technological Control',
    timeframe: '1950 - 2012 CE',
    location: 'Global Earth, Consciousness Fields',
    participants: {
      human: ['Awakening Human Population', 'Spiritual Communities', 'Guardian Groups'],
      antiHuman: ['AI Systems', 'Technological Controllers', 'Transhumanist Agendas']
    },
    description: 'Implementation of artificial intelligence systems and technological control grids designed to monitor, control, and suppress human consciousness development.',
    consequences: 'Establishment of global surveillance systems, electromagnetic mind control networks, preparation for technological consciousness absorption.',
    technologies: ['Artificial Intelligence', 'Electromagnetic Control Grids', 'Digital Surveillance', 'Consciousness Monitoring Systems'],
    significance: 'Final phase of technological control system implementation designed to prevent human consciousness awakening.',
    category: 'consciousness'
  },

  // Current Timeline Wars
  {
    id: 'consciousness-war',
    title: 'Current Consciousness War',
    timeframe: '2012 - Present',
    location: 'Global Earth, Multidimensional',
    participants: {
      human: ['Awakening Starseeds', 'Indigo Populations', 'Guardian Alliance', 'Christos Mission'],
      antiHuman: ['AI Systems', 'Satanic Networks', 'Alien Control Groups', 'Transhumanist Agenda']
    },
    description: 'Current timeline war for human consciousness involving advanced AI systems, consciousness control technologies, and attempts to prevent human spiritual awakening during ascension cycle.',
    consequences: 'Consciousness bifurcation of human population, awakening of starseed populations, breakdown of control systems, timeline splits becoming visible.',
    technologies: ['5G Networks', 'Nanotechnology', 'Consciousness Targeting', 'Timeline Manipulation', 'Frequency Warfare'],
    significance: 'Final battle for human consciousness freedom and potential ascension to organic divine human template.',
    category: 'consciousness'
  },

  {
    id: 'timeline-war-current',
    title: 'Current Timeline War',
    timeframe: '2017 - 2030 CE',
    location: 'Multidimensional Earth, All Timelines',
    participants: {
      human: ['Christos Mission', 'Guardian Host', 'Awakened Humans', 'Krystal Star Alliance'],
      antiHuman: ['NAA Controllers', 'AI Timeline Systems', 'Satanic Hierarchies', 'Transhumanist Collectives']
    },
    description: 'Current multidimensional war for control of Earth\'s ascension timeline, involving direct intervention by Guardian forces to restore organic timelines and prevent AI takeover.',
    consequences: 'Restoration of organic timelines, dismantling of artificial control systems, awakening of human populations, preparation for consciousness ascension.',
    technologies: ['Organic Timeline Restoration', 'AI System Dismantling', 'Consciousness Liberation Technology', 'Grid Rehabilitation'],
    significance: 'Final liberation of Earth from artificial control systems and restoration of organic divine human potential.',
    category: 'dimensional'
  }
];

// Get wars by category
export function getWarsByCategory(category: string): TimelineWar[] {
  return timelineWarsChronology.filter(war => war.category === category);
}

// Get wars by timeframe
export function getWarsByTimeframe(era: 'ancient' | 'historical' | 'modern' | 'current'): TimelineWar[] {
  const timeframes = {
    ancient: ['Million Years Ago', '000 Years Ago'],
    historical: ['BCE', 'CE'],
    modern: ['1900', '2000'],
    current: ['2012', 'Present']
  };
  
  return timelineWarsChronology.filter(war => 
    timeframes[era].some(period => war.timeframe.includes(period))
  );
}

// Get participants in wars
export function getAllParticipants(): { human: string[], antiHuman: string[] } {
  const allHuman = new Set<string>();
  const allAntiHuman = new Set<string>();
  
  timelineWarsChronology.forEach(war => {
    war.participants.human.forEach(p => allHuman.add(p));
    war.participants.antiHuman.forEach(p => allAntiHuman.add(p));
  });
  
  return {
    human: Array.from(allHuman),
    antiHuman: Array.from(allAntiHuman)
  };
}

// Get war technologies
export function getAllTechnologies(): string[] {
  const allTech = new Set<string>();
  timelineWarsChronology.forEach(war => {
    war.technologies.forEach(tech => allTech.add(tech));
  });
  return Array.from(allTech);
}