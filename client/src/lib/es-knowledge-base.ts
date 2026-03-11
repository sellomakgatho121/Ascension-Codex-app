// Authentic Energetic Synthesis Knowledge Base
// Source: energeticsynthesis.com and Lisa Renee's teachings

export interface ESConcept {
  id: string;
  term: string;
  category: 'ascension' | 'consciousness' | 'anatomy' | 'protection' | 'timeline' | 'planetary' | 'galactic';
  definition: string;
  relatedTerms: string[];
  applications: string[];
  source: string;
}

export const energeticSynthesisKnowledgeBase: ESConcept[] = [
  // Ascension Mechanics
  {
    id: 'ascension-stages',
    term: 'Ascension Stages',
    category: 'ascension',
    definition: 'The evolutionary process of consciousness expansion through dimensional frequency upgrades. Humans are moving from 3D mental body orientation to 4D astral integration to 5D heart-based consciousness and beyond.',
    relatedTerms: ['Dimensional Frequency', 'Consciousness Evolution', 'DNA Activation'],
    applications: ['Personal spiritual development', 'Understanding consciousness shifts', 'Navigating timeline changes'],
    source: 'Energetic Synthesis - Ascension Glossary'
  },
  {
    id: 'bio-spiritual-harvesting',
    term: 'Bio-Spiritual Harvesting',
    category: 'consciousness',
    definition: 'The systematic extraction of life force energy, consciousness, and spiritual essence from beings through various technological, psychic, and consciousness manipulation methods by negative alien agenda forces.',
    relatedTerms: ['Life Force Harvesting', 'Consciousness Traps', 'Negative Alien Agenda', 'Loosh'],
    applications: ['Understanding energy dynamics', 'Spiritual protection practices', 'Discernment development'],
    source: 'Energetic Synthesis - Bio-Spiritual Harvesting'
  },
  {
    id: 'christos-blueprint',
    term: 'Christos Blueprint',
    category: 'anatomy',
    definition: 'The original divine human design template containing the complete 12-strand DNA pattern and full consciousness potential. This blueprint represents the organic ascension path for humanity.',
    relatedTerms: ['DNA Activation', 'Original Human Design', 'Silicate Matrix', 'Krystal Star'],
    applications: ['DNA healing work', 'Ascension acceleration', 'Spiritual template restoration'],
    source: 'Energetic Synthesis - Christos Blueprint'
  },
  {
    id: 'negative-alien-agenda',
    term: 'Negative Alien Agenda (NAA)',
    category: 'planetary',
    definition: 'The coordinated effort by regressive alien races to control Earth and humanity through consciousness suppression, genetic manipulation, and frequency fence technologies.',
    relatedTerms: ['Archontic Deception Strategy', 'Mind Control', 'Frequency Fence', 'Orion Group'],
    applications: ['Understanding global control systems', 'Developing spiritual discernment', 'Protection practices'],
    source: 'Energetic Synthesis - NAA Overview'
  },
  {
    id: 'plasma-light-body',
    term: 'Plasma Light Body',
    category: 'anatomy',
    definition: 'The next stage of lightbody evolution beyond the traditional electromagnetic lightbody. Plasma bodies are connected to the liquid plasma fields and represent higher dimensional consciousness embodiment.',
    relatedTerms: ['Lightbody Evolution', 'Plasma Fields', 'Solar Body', 'Diamond Sun Body'],
    applications: ['Advanced lightbody work', 'Plasma activation practices', 'Higher dimensional embodiment'],
    source: 'Energetic Synthesis - Plasma Light Body'
  },

  // Timeline and Dimensional Mechanics
  {
    id: 'timeline-wars',
    term: 'Timeline Wars',
    category: 'timeline',
    definition: 'The conflict over control of planetary timelines and dimensional access points. Various groups attempt to insert artificial timelines or control organic ascension timelines.',
    relatedTerms: ['Artificial Timeline', 'Organic Timeline', 'Timeline Jumping', 'Bifurcation'],
    applications: ['Timeline navigation', 'Reality shifting awareness', 'Personal timeline healing'],
    source: 'Energetic Synthesis - Timeline Wars'
  },
  {
    id: 'bifurcation',
    term: 'Bifurcation',
    category: 'timeline',
    definition: 'The splitting of reality into ascending and descending timeline spirals. Those aligned with natural laws and higher consciousness move toward ascension timelines.',
    relatedTerms: ['Timeline Split', 'Consciousness Choice', 'Frequency Alignment', 'Natural Laws'],
    applications: ['Timeline navigation', 'Consciousness development', 'Reality creation'],
    source: 'Energetic Synthesis - Bifurcation'
  },

  // Consciousness Technology
  {
    id: 'holographic-inserts',
    term: 'Holographic Inserts',
    category: 'consciousness',
    definition: 'Artificial reality overlays inserted into human consciousness to distort perception, create false memories, and manipulate behavior patterns.',
    relatedTerms: ['Reality Distortion', 'False Memory', 'Mind Control', 'Artificial Intelligence'],
    applications: ['Consciousness clearing', 'Reality discernment', 'Mental sovereignty'],
    source: 'Energetic Synthesis - Holographic Inserts'
  },
  {
    id: 'frequency-fence',
    term: 'Frequency Fence',
    category: 'planetary',
    definition: 'Artificial electromagnetic barriers placed around Earth to limit human consciousness expansion and prevent natural ascension frequency access.',
    relatedTerms: ['NET (Nibiru Electrostatic Transduction)', 'Consciousness Suppression', 'Dimensional Barriers'],
    applications: ['Understanding consciousness limitations', 'Frequency work', 'Ascension preparation'],
    source: 'Energetic Synthesis - Frequency Fence'
  },

  // Galactic History
  {
    id: 'orion-wars',
    term: 'Orion Wars',
    category: 'galactic',
    definition: 'Ancient galactic conflicts that originated in the Orion constellation, representing the battle between Service to Self and Service to Others consciousness orientations.',
    relatedTerms: ['Galactic Wars', 'Service to Self', 'Service to Others', 'Orion Group'],
    applications: ['Understanding galactic dynamics', 'Consciousness orientation choice', 'Historical context'],
    source: 'Energetic Synthesis - Orion Wars'
  },
  {
    id: 'atlantian-cataclysm',
    term: 'Atlantian Cataclysm',
    category: 'galactic',
    definition: 'The destruction of advanced human civilization approximately 12,000 years ago through misuse of crystal technology and invasion by negative alien forces.',
    relatedTerms: ['Atlantis', 'Crystal Technology', 'Planetary Invasion', 'Consciousness Fall'],
    applications: ['Historical understanding', 'Trauma clearing', 'Technology discernment'],
    source: 'Energetic Synthesis - Atlantian Cataclysm'
  },

  // Protection and Healing
  {
    id: 'entity-clearing',
    term: 'Entity Clearing',
    category: 'protection',
    definition: 'The process of removing unwanted consciousness attachments, implants, and parasitic entities from the human energy field and consciousness.',
    relatedTerms: ['Entity Attachment', 'Parasite Clearing', 'Implant Removal', 'Auric Clearing'],
    applications: ['Energy healing', 'Consciousness clearing', 'Spiritual hygiene'],
    source: 'Energetic Synthesis - Entity Clearing'
  },
  {
    id: 'alien-implants',
    term: 'Alien Implants',
    category: 'protection',
    definition: 'Etheric or energetic devices inserted into human energy fields to monitor, control, or harvest consciousness and life force energy.',
    relatedTerms: ['Etheric Implants', 'Mind Control Devices', 'Surveillance Technology'],
    applications: ['Implant removal', 'Energy protection', 'Consciousness sovereignty'],
    source: 'Energetic Synthesis - Alien Implants'
  },

  // Advanced Spiritual Anatomy
  {
    id: 'permanent-seed-atom',
    term: 'Permanent Seed Atom',
    category: 'anatomy',
    definition: 'The eternal aspect of consciousness that carries the complete divine blueprint and maintains continuity across incarnations and dimensional levels.',
    relatedTerms: ['Seed Crystal', 'Consciousness Continuity', 'Divine Blueprint', 'Eternal Identity'],
    applications: ['Soul retrieval', 'Identity restoration', 'Consciousness integration'],
    source: 'Energetic Synthesis - Permanent Seed Atom'
  },
  {
    id: 'kundalini-activation',
    term: 'Kundalini Activation',
    category: 'anatomy',
    definition: 'The awakening of dormant spiritual energy stored at the base of the spine, facilitating consciousness expansion and spiritual transformation through the chakra system.',
    relatedTerms: ['Spiritual Energy', 'Chakra Activation', 'Consciousness Awakening', 'Energy Rising'],
    applications: ['Spiritual awakening', 'Energy healing', 'Consciousness expansion', 'Chakra balancing'],
    source: 'Energetic Synthesis - Kundalini Systems'
  },
  {
    id: 'merkaba-field',
    term: 'Merkaba Field',
    category: 'anatomy',
    definition: 'The counter-rotating fields of light that surround the human body, creating a vehicle for consciousness travel and dimensional access.',
    relatedTerms: ['Light Body Vehicle', 'Dimensional Travel', 'Counter-Rotating Fields', 'Consciousness Vehicle'],
    applications: ['Astral projection', 'Dimensional travel', 'Lightbody activation', 'Consciousness expansion'],
    source: 'Energetic Synthesis - Merkaba Mechanics'
  },
  {
    id: 'monad-activation',
    term: 'Monad Activation',
    category: 'anatomy',
    definition: 'The integration of the 7th, 8th, and 9th dimensional aspects of self, representing the highest individuated consciousness level before cosmic consciousness.',
    relatedTerms: ['Higher Self Integration', 'Dimensional Integration', 'Avatar Consciousness'],
    applications: ['Advanced spiritual development', 'Higher self connection', 'Cosmic consciousness preparation'],
    source: 'Energetic Synthesis - Monad Activation'
  },

  // Planetary Ascension
  {
    id: 'planetary-staff',
    term: 'Planetary Staff',
    category: 'planetary',
    definition: 'The vertical energy column running through Earth\'s core that connects to galactic and universal energy grids, essential for planetary consciousness evolution.',
    relatedTerms: ['Planetary Grid', 'Vertical Energy', 'Core Resonance', 'Galactic Connection'],
    applications: ['Planetary healing work', 'Grid work', 'Earth connection practices'],
    source: 'Energetic Synthesis - Planetary Staff'
  },
  {
    id: 'morphogenetic-field',
    term: 'Morphogenetic Field',
    category: 'consciousness',
    definition: 'The energy blueprint that shapes and directs the form and consciousness of all living beings. These fields store evolutionary information and can be modified.',
    relatedTerms: ['Consciousness Blueprint', 'Evolutionary Template', 'Field Modification'],
    applications: ['Consciousness evolution', 'Form healing', 'Evolutionary acceleration'],
    source: 'Energetic Synthesis - Morphogenetic Fields'
  },

  // Timeline Healing
  {
    id: 'soul-retrieval',
    term: 'Soul Retrieval',
    category: 'timeline',
    definition: 'The process of reclaiming soul fragments that have been lost, stolen, or trapped in various timelines, dimensions, or consciousness traps.',
    relatedTerms: ['Soul Fragmentation', 'Timeline Healing', 'Consciousness Integration'],
    applications: ['Trauma healing', 'Personal power restoration', 'Consciousness wholeness'],
    source: 'Energetic Synthesis - Soul Retrieval'
  },
  {
    id: 'false-timeline-matrix',
    term: 'False Timeline Matrix',
    category: 'timeline',
    definition: 'Artificially inserted reality constructs designed to trap consciousness in repeating loops and prevent access to organic ascension timelines.',
    relatedTerms: ['Artificial Reality', 'Timeline Loops', 'Consciousness Traps', 'Matrix Programming'],
    applications: ['Timeline discernment', 'Reality navigation', 'Consciousness liberation'],
    source: 'Energetic Synthesis - False Timeline Matrix'
  },

  // Higher Dimensional Anatomy
  {
    id: 'krystal-star-matrix',
    term: 'Krystal Star Matrix',
    category: 'galactic',
    definition: 'The organic creation matrix based on divine mathematical principles that supports natural spiritual evolution and consciousness expansion.',
    relatedTerms: ['Organic Matrix', 'Divine Mathematics', 'Natural Creation', 'Krystal Spiral'],
    applications: ['Spiritual alignment', 'Organic ascension', 'Divine connection'],
    source: 'Energetic Synthesis - Krystal Star'
  },
  {
    id: 'rainbow-rounds',
    term: 'Rainbow Rounds',
    category: 'anatomy',
    definition: 'The 15-dimensional spectrum of consciousness embodiment, representing the complete journey from base matter to cosmic consciousness.',
    relatedTerms: ['Dimensional Spectrum', 'Consciousness Levels', '15D Spectrum', 'Cosmic Consciousness'],
    applications: ['Consciousness mapping', 'Dimensional integration', 'Evolutionary planning'],
    source: 'Energetic Synthesis - Rainbow Rounds'
  },

  // Additional Protection Concepts
  {
    id: 'psychic-vampirism',
    term: 'Psychic Vampirism',
    category: 'protection',
    definition: 'The unconscious or conscious feeding on another person\'s life force energy, often through emotional manipulation, drama, or energy cord attachments.',
    relatedTerms: ['Energy Vampires', 'Life Force Drain', 'Energy Cords', 'Parasitic Behavior'],
    applications: ['Energy protection', 'Boundary setting', 'Cord cutting', 'Psychic hygiene'],
    source: 'Energetic Synthesis - Psychic Vampirism'
  },
  
  // Advanced Consciousness Concepts
  {
    id: 'consciousness-corridors',
    term: 'Consciousness Corridors',
    category: 'consciousness',
    definition: 'Energetic pathways that connect different dimensional levels of consciousness, allowing for travel and communication between various states of being.',
    relatedTerms: ['Dimensional Travel', 'Astral Corridors', 'Consciousness Bridges', 'Interdimensional Access'],
    applications: ['Advanced meditation', 'Astral projection', 'Dimensional healing', 'Spiritual communication'],
    source: 'Energetic Synthesis - Consciousness Mechanics'
  },
  {
    id: 'zero-point-field',
    term: 'Zero Point Field',
    category: 'consciousness',
    definition: 'The quantum field of infinite potential that exists in the space between thoughts, emotions, and physical manifestation. The source field of all creation.',
    relatedTerms: ['Quantum Field', 'Source Field', 'Unified Field', 'Akashic Records'],
    applications: ['Manifestation work', 'Healing practices', 'Consciousness expansion', 'Reality creation'],
    source: 'Energetic Synthesis - Zero Point Mechanics'
  },
  {
    id: 'energetic-architecture',
    term: 'Energetic Architecture',
    category: 'anatomy',
    definition: 'The structured blueprint of energy systems that form the foundation of consciousness embodiment in various dimensional planes.',
    relatedTerms: ['Energy Blueprint', 'Consciousness Structure', 'Dimensional Architecture', 'Lightbody Framework'],
    applications: ['Lightbody construction', 'Dimensional anchoring', 'Energy healing', 'Consciousness stabilization'],
    source: 'Energetic Synthesis - Energetic Architecture'
  },
  
  // Sacred Geometry and Mathematical Principles
  {
    id: 'sacred-geometry-principles',
    term: 'Sacred Geometry Principles',
    category: 'consciousness',
    definition: 'Mathematical and geometric patterns that underlie all creation, serving as the blueprint for conscious evolution and dimensional construction.',
    relatedTerms: ['Flower of Life', 'Merkaba', 'Platonic Solids', 'Golden Ratio', 'Fibonacci Sequence'],
    applications: ['Meditation focus', 'Energy harmonization', 'Healing layouts', 'Consciousness activation'],
    source: 'Energetic Synthesis - Sacred Geometry'
  },
  {
    id: 'krystal-spiral',
    term: 'Krystal Spiral',
    category: 'galactic',
    definition: 'The organic mathematical pattern of consciousness evolution based on the Krystal Star frequency, supporting natural spiritual development.',
    relatedTerms: ['Fibonacci Spiral', 'Golden Ratio', 'Natural Mathematics', 'Organic Evolution'],
    applications: ['Spiritual alignment', 'Natural law understanding', 'Consciousness evolution', 'Energy work'],
    source: 'Energetic Synthesis - Krystal Mathematics'
  },
  
  // Advanced Planetary Mechanics
  {
    id: 'ley-lines',
    term: 'Ley Lines',
    category: 'planetary',
    definition: 'Energetic grid lines that crisscross the Earth, carrying life force energy and connecting sacred sites and power spots around the planet.',
    relatedTerms: ['Earth Grid', 'Dragon Lines', 'Song Lines', 'Planetary Grid Network'],
    applications: ['Earth healing', 'Grid work', 'Sacred site activation', 'Planetary consciousness work'],
    source: 'Energetic Synthesis - Planetary Grid Systems'
  },
  {
    id: 'stargate-portals',
    term: 'Stargate Portals',
    category: 'planetary',
    definition: 'Natural and artificial dimensional doorways that allow consciousness and energy to travel between different planetary systems and dimensions.',
    relatedTerms: ['Dimensional Portals', 'Wormholes', 'Interdimensional Gates', 'Consciousness Bridges'],
    applications: ['Galactic communication', 'Dimensional travel', 'Portal activation', 'Cosmic consciousness'],
    source: 'Energetic Synthesis - Stargate Mechanics'
  },
  
  // Time and Timeline Mechanics
  {
    id: 'time-vector-mechanics',
    term: 'Time Vector Mechanics',
    category: 'timeline',
    definition: 'The understanding of how consciousness can navigate and influence different timeline vectors and probability fields.',
    relatedTerms: ['Timeline Navigation', 'Probability Fields', 'Quantum Jumping', 'Reality Shifting'],
    applications: ['Timeline healing', 'Reality navigation', 'Quantum manifestation', 'Probability shifting'],
    source: 'Energetic Synthesis - Time Mechanics'
  },
  {
    id: 'organic-timeline-restoration',
    term: 'Organic Timeline Restoration',
    category: 'timeline',
    definition: 'The process of healing and restoring natural timeline flow that has been disrupted by artificial timeline insertions or consciousness manipulation.',
    relatedTerms: ['Timeline Healing', 'Natural Law Restoration', 'Consciousness Liberation', 'Organic Flow'],
    applications: ['Personal healing', 'Ancestral clearing', 'Timeline repair', 'Consciousness restoration'],
    source: 'Energetic Synthesis - Timeline Restoration'
  },
  
  // Advanced Spiritual Anatomy
  {
    id: 'crystal-core',
    term: 'Crystal Core',
    category: 'anatomy',
    definition: 'The crystalline structure at the center of the lightbody that stores consciousness programs and connects to the universal crystal network.',
    relatedTerms: ['Crystalline Matrix', 'Core Crystal', 'Consciousness Storage', 'Universal Network'],
    applications: ['Consciousness programming', 'Lightbody activation', 'Universal connection', 'Frequency tuning'],
    source: 'Energetic Synthesis - Crystal Body'
  },
  {
    id: 'diamond-sun-body',
    term: 'Diamond Sun Body',
    category: 'anatomy',
    definition: 'The ultimate evolutionary template for human consciousness, representing the fully activated 12-strand DNA and complete lightbody integration.',
    relatedTerms: ['Christ Consciousness', 'Avatar Body', 'Crystalline Body', '12D Avatar'],
    applications: ['Ultimate ascension goal', 'Consciousness mastery', 'Service to others', 'Cosmic consciousness'],
    source: 'Energetic Synthesis - Diamond Sun Template'
  },
  {
    id: 'spiritual-bypassing',
    term: 'Spiritual Bypassing',
    category: 'consciousness',
    definition: 'The tendency to use spiritual practices and beliefs to avoid dealing with painful feelings, unresolved wounds, and developmental needs.',
    relatedTerms: ['Emotional Avoidance', 'Psychological Defense', 'Spiritual Materialism', 'Shadow Work'],
    applications: ['Self-awareness', 'Emotional healing', 'Authentic development', 'Shadow integration'],
    source: 'Energetic Synthesis - Spiritual Bypassing'
  },
  {
    id: 'mind-slides',
    term: 'Mind Slides',
    category: 'consciousness',
    definition: 'Artificial neural patterns inserted into human consciousness to prevent retention of important spiritual information or memories.',
    relatedTerms: ['Memory Suppression', 'Information Blocking', 'Neural Interference', 'Consciousness Manipulation'],
    applications: ['Memory recovery', 'Consciousness clearing', 'Information retention', 'Mental sovereignty'],
    source: 'Energetic Synthesis - Mind Slides'
  },

  // Timeline and Dimensional Expansion
  {
    id: 'phantom-matrix',
    term: 'Phantom Matrix',
    category: 'timeline',
    definition: 'An artificial reality system created from reversed life force currents that traps consciousness in descending spiral energy patterns.',
    relatedTerms: ['Artificial Matrix', 'Reversed Currents', 'Descending Spiral', 'Consciousness Trap'],
    applications: ['Matrix discernment', 'Energy reversal healing', 'Consciousness liberation', 'Timeline clearing'],
    source: 'Energetic Synthesis - Phantom Matrix'
  },
  {
    id: 'golden-eagle-grid',
    term: 'Golden Eagle Grid',
    category: 'planetary',
    definition: 'The 9th dimensional grid network that connects to the solar logos and facilitates planetary consciousness evolution through Christ consciousness.',
    relatedTerms: ['9D Grid', 'Solar Logos', 'Christ Consciousness', 'Planetary Grids'],
    applications: ['Grid work', 'Planetary healing', 'Christ consciousness embodiment', 'Solar activation'],
    source: 'Energetic Synthesis - Golden Eagle Grid'
  },
  {
    id: 'violet-flame',
    term: 'Violet Flame',
    category: 'protection',
    definition: 'A high-frequency spiritual energy that transmutes negative karma, clears psychic debris, and facilitates spiritual purification and healing.',
    relatedTerms: ['Transmutation', 'Spiritual Purification', 'Karma Clearing', 'High Frequency Energy'],
    applications: ['Energy clearing', 'Karma transmutation', 'Spiritual purification', 'Healing work'],
    source: 'Energetic Synthesis - Violet Flame'
  }
];

// Search functionality for the knowledge base
export function searchESKnowledge(query: string, category?: string): ESConcept[] {
  const searchTerm = query.toLowerCase();
  
  return energeticSynthesisKnowledgeBase.filter(concept => {
    const matchesCategory = !category || concept.category === category;
    const matchesSearch = 
      concept.term.toLowerCase().includes(searchTerm) ||
      concept.definition.toLowerCase().includes(searchTerm) ||
      concept.relatedTerms.some(term => term.toLowerCase().includes(searchTerm)) ||
      concept.applications.some(app => app.toLowerCase().includes(searchTerm));
    
    return matchesCategory && matchesSearch;
  });
}

// Get concepts by category
export function getESConceptsByCategory(category: string): ESConcept[] {
  return energeticSynthesisKnowledgeBase.filter(concept => concept.category === category);
}

// Get related concepts
export function getRelatedESConcepts(conceptId: string): ESConcept[] {
  const concept = energeticSynthesisKnowledgeBase.find(c => c.id === conceptId);
  if (!concept) return [];
  
  return energeticSynthesisKnowledgeBase.filter(c => 
    c.id !== conceptId && 
    (c.relatedTerms.some(term => concept.relatedTerms.includes(term)) ||
     concept.relatedTerms.includes(c.term))
  );
}

// Categories for filtering
export const esCategories = [
  { id: 'ascension', label: 'Ascension Mechanics', description: 'Core ascension processes and stages' },
  { id: 'consciousness', label: 'Consciousness Technology', description: 'Consciousness manipulation and healing' },
  { id: 'anatomy', label: 'Spiritual Anatomy', description: 'Advanced spiritual body components' },
  { id: 'protection', label: 'Spiritual Protection', description: 'Protection and clearing practices' },
  { id: 'timeline', label: 'Timeline Mechanics', description: 'Timeline healing and navigation' },
  { id: 'planetary', label: 'Planetary Dynamics', description: 'Earth ascension and planetary grid work' },
  { id: 'galactic', label: 'Galactic History', description: 'Galactic wars and cosmic evolution' }
];