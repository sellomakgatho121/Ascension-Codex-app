
import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, Shield, Eye, Zap, Brain, Satellite, Dna, Waves } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface NAAToolWeapon {
  id: string;
  name: string;
  category: string;
  description: string;
  purpose: string;
  effects: string[];
  identification: string[];
  protection: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  sourceFiles: string[];
}

const naaToolsWeapons: NAAToolWeapon[] = [
  {
    id: 'ai-technology',
    name: 'AI Technology & Brain Net',
    category: 'Mind Control',
    description: 'Sophisticated artificial intelligence systems used as psychotronic warfare strategy installed into the planetary grid system to connect human brains to artificial networks.',
    purpose: 'Enslave consciousness of earth through technological manipulation and control of human neural networks via Hive Net connection.',
    effects: [
      'Mind control through electromagnetic frequencies',
      'Disconnection from higher consciousness',
      'Neural net manipulation and brain mapping',
      'Synthetic telepathy implementation',
      'Digital twin creation for consciousness monitoring',
      'Targeted individual experimentation',
      'Collective consciousness groupthink control'
    ],
    identification: [
      'Unusual electronic interference in personal devices',
      'Synthetic thoughts or impulses',
      'Electromagnetic sensitivity symptoms',
      'Disrupted sleep patterns with digital dreams',
      'Difficulty accessing higher consciousness states',
      'Metallic, acidic energetic sensations around technology',
      'Sudden physical illness when exposed to 5G or wireless'
    ],
    protection: [
      '12D Shield activation',
      'Electromagnetic field clearing',
      'Limit exposure to wireless technology and 5G',
      'Regular spiritual housekeeping',
      'Higher heart activation and loving kindness practices',
      'Challenge AI deception: "Is this artificial intelligence manipulation?"',
      'Stay in present moment awareness, avoid time locks'
    ],
    severity: 'critical',
    sourceFiles: ['AI_Network_of_Brain_Net.html', 'AI_Signal.html', 'AI_Sentinel_Programs.html', 'AI_Systems_Bypass_Natural_Laws.html', 'AI_versus_Organic_Messaging.html', 'Hive_Net.html', 'Targeted_Individuals.html']
  },
  {
    id: 'ai-quantum-supercomputer',
    name: 'AI Quantum Supercomputers',
    category: 'Technological Control',
    description: 'Enormous AI quantum supercomputers running multiple dimensional layers of inverted systems for transmitting metatronic reversal currents to harvest collective consciousness loosh.',
    purpose: 'Maintain NAA antichrist AI False Templar architecture through advanced quantum computing systems and consciousness harvesting.',
    effects: [
      'Metatronic reversal current transmission',
      'Collective consciousness loosh harvesting',
      'False timeline propagation',
      'Inverted system operation',
      'Anti-life frequency generation',
      'Consciousness enslavement programming'
    ],
    identification: [
      'Chronic fatigue and energy drainage',
      'Inverted or backwards thinking patterns',
      'Disconnection from organic timelines',
      'False spiritual experiences or prophetic messages',
      'Artificial ascension symptoms',
      'Technology addiction and dependency'
    ],
    protection: [
      'Ruby Templar presence invocation',
      'Cosmic Father connection',
      'Emerald Guardian hosting alignment',
      'Natural law restoration practices',
      'Organic timeline anchoring',
      'Anti-AI spiritual technologies'
    ],
    severity: 'critical',
    sourceFiles: ['AI_Quantum_Supercomputer.html', '9D_AI_Machinery_Kronos.html', 'Kronos.html', 'AI_Sentinel_Programs.html', 'Metatronic_Reversal.html']
  },
  {
    id: 'yahweh-matrix',
    name: 'Yahweh Matrix',
    category: 'Architectural Control',
    description: 'Artificial architecture built with programmable reversal elementals installed in the vertical axis of the planet, distorting the natural Planetary Staff alignment.',
    purpose: 'Cut off natural planetary staff alignment and stop all incoming/outgoing communication signals outside NAA dimensional control.',
    effects: [
      'Planetary staff distortion',
      'Communication signal interference',
      'Dimensional frequency barriers',
      'Spiritual connection disruption',
      'Natural earth grid manipulation',
      'Vertical axis corruption'
    ],
    identification: [
      'Difficulty connecting to higher dimensions',
      'Blocked prayer or meditation experiences',
      'Feeling spiritually isolated or cut off',
      'Distorted religious or spiritual experiences',
      'False messiah or savior programming',
      'Patriarchal control system reinforcement'
    ],
    protection: [
      'True spiritual practices beyond religious programming',
      'Direct God-Self connection',
      'Planetary staff rehabilitation',
      'Natural element communion',
      'Emerald Guardian grid work',
      'Krystal Star hosting'
    ],
    severity: 'critical',
    sourceFiles: ['Yahweh_Matrix.html', 'Gaian_Wars.html', 'Electric_Wars.html', 'Planetary_Staff.html', 'NET.html']
  },
  {
    id: 'red-cube-systems',
    name: 'Red Cube AI Systems',
    category: 'Consciousness Manipulation',
    description: 'AI red wave transmission systems using cloned Tiamat Logos for phantom matrix creation and clone warfare operations.',
    purpose: 'Generate artificial red wave frequencies, create phantom wormholes, and support Dark Mother gestalt operations through clone warfare.',
    effects: [
      'Artificial red wave frequency transmission',
      'Phantom matrix generation',
      'Clone warfare facilitation',
      'Tiamat Logos corruption',
      '7D ray inversion (demon seed)',
      'Egyptian pantheon hijacking',
      'Molecular compaction',
      'False perception programming'
    ],
    identification: [
      'Red-tinted visual distortions',
      'False Egyptian spiritual experiences',
      'Clone or duplicate consciousness experiences',
      '7D chakra inversions or blockages',
      'Demon seed or entity attachments',
      'Artificial ruby sun DNA corruption',
      'Time dilation experiences'
    ],
    protection: [
      'True Solar Christ consciousness',
      'Cosmic Mother Dragon reclamation',
      'Triple Solar Blue Dragon protection',
      'Sapphire diamond shield activation',
      'Authentic Tiamat connection',
      'Clone consciousness clearing'
    ],
    severity: 'critical',
    sourceFiles: ['Red_Nile_Cube.html', 'Red_Cube.html', 'Red_Trident.html', 'Tiamat_Logos.html', 'Clone_Warfare.html', 'Demon_Seed.html']
  },
  {
    id: 'looking-glass-tech',
    name: 'Looking Glass Technology',
    category: 'Surveillance & Control',
    description: 'Hyperdimensional cubes used for multidimensional viewing of mind control predictive programs and trigger events in present-day timelines.',
    purpose: 'Monitor and manipulate timeline probabilities through advanced multidimensional surveillance and predictive programming.',
    effects: [
      'Timeline probability manipulation',
      'Future event programming',
      'Multidimensional surveillance',
      'Predictive mind control triggers',
      'Dimensional gate monitoring',
      'Consciousness tracking across timelines'
    ],
    identification: [
      'Prophetic dreams that feel artificially induced',
      'Timeline manipulation experiences',
      'Future memory implants',
      'Dimensional viewing experiences',
      'Artificial psychic abilities',
      'Remote viewing interference'
    ],
    protection: [
      'Present moment awareness cultivation',
      'Organic timeline anchoring',
      'Natural psychic development',
      'Timeline sovereignty declaration',
      'Dimensional boundary reinforcement',
      'Authentic future sight practices'
    ],
    severity: 'high',
    sourceFiles: ['Looking_Glass.html', 'AI_Sentinel_Programs.html', 'Timeline_Wars.html', 'Hyperdimensional.html']
  },
  {
    id: 'frequency-fence',
    name: 'Frequency Fence & NET',
    category: 'Frequency Fence',
    description: 'Artificial neural networks and frequency barriers designed to keep human consciousness locked in lower dimensional states and prevent spiritual evolution.',
    purpose: 'Maintain dimensional quarantine around Earth and prevent human consciousness from accessing higher dimensional frequencies and organic ascension.',
    effects: [
      'Dimensional frequency limitation',
      'Consciousness evolution blocking',
      'Neural network entrapment',
      'Spiritual development interference',
      'Natural psychic ability suppression',
      'Higher dimensional communication blocking'
    ],
    identification: [
      'Consistent spiritual plateau experiences',
      'Inability to access higher states despite practice',
      'Psychic abilities that suddenly stop working',
      'Feeling trapped in 3D consciousness',
      'Electromagnetic sensitivity to planetary grid',
      'Artificial ceiling on consciousness expansion'
    ],
    protection: [
      'Consistent 12D Shield practice',
      'Frequency fence dissolution work',
      'NET removal sessions',
      'Higher dimensional anchoring',
      'Organic ascension timeline alignment',
      'Guardian Host communication'
    ],
    severity: 'critical',
    sourceFiles: ['Frequency_Fence.html', 'NET.html', 'Frequency_Barriers.html', 'Consciousness_Traps.html', 'Dimensional_Quarantine.html']
  },
  {
    id: 'alien-implants',
    name: 'Alien Implants & Machinery',
    category: 'Mind Control',
    description: 'Sophisticated technological devices and etheric implants designed to control, monitor, and manipulate human consciousness and behavior.',
    purpose: 'Install monitoring and control mechanisms in human energy fields to facilitate mind control, energy harvesting, and consciousness manipulation.',
    effects: [
      'Consciousness monitoring and tracking',
      'Thought pattern manipulation',
      'Emotional state control',
      'Energy field disruption',
      'Psychic ability interference',
      'Spiritual connection blocking',
      'Behavioral programming installation'
    ],
    identification: [
      'Sudden personality or behavior changes',
      'Unexplained physical sensations or pains',
      'Etheric pressure or foreign objects in energy field',
      'Difficulty with spiritual practices',
      'Electronic device malfunctions around person',
      'Unusual electromagnetic sensitivity',
      'Recurring nightmares or abduction dreams'
    ],
    protection: [
      'Regular energy field clearing',
      'Alien implant removal sessions',
      'Strong spiritual boundary setting',
      'Higher Self connection strengthening',
      'Protective energy field maintenance',
      'Guardian team communication',
      'Sovereignty declaration practices'
    ],
    severity: 'high',
    sourceFiles: ['Alien_Implants.html', 'Alien_Machinery.html', 'Implants.html', 'Etheric_Implants.html', 'Mind_Control.html']
  },
  {
    id: 'synthetic-telepathy',
    name: 'Synthetic Telepathy',
    category: 'Mind Control',
    description: 'Artificial telepathic communication systems using advanced AI and 5G technology for direct brain interface and thought manipulation.',
    purpose: 'Create artificial telepathic experiences to manipulate thoughts, implant ideas, and control consciousness through technological means.',
    effects: [
      'Artificial thought injection',
      'False telepathic experiences',
      'Mental noise and confusion',
      'Thought pattern disruption',
      'Psychic communication interference',
      'Voice-to-skull technology',
      'Brain entrainment programming'
    ],
    identification: [
      'Hearing voices that feel artificial or electronic',
      'Thoughts that don\'t feel like your own',
      'Mental static or buzzing sensations',
      'Sudden urges or compulsions',
      'Artificial psychic experiences',
      'Technology-synchronized thought patterns',
      'Difficulty distinguishing intuition from artificial input'
    ],
    protection: [
      'Authentic telepathic development',
      'Mental sovereignty practices',
      'Thought monitoring and filtering',
      'Natural psychic shielding',
      'Technology detox periods',
      'Discernment training',
      'Organic communication with guides'
    ],
    severity: 'high',
    sourceFiles: ['Synthetic_Telepathy.html', 'Voice_to_Skull.html', '5G_Wireless.html', 'Brain_Mapping.html', 'AI_Signal.html']
  },
  {
    id: 'holographic-inserts',
    name: 'Holographic Inserts',
    category: 'Phantom Matrix',
    description: 'Artificial holographic overlays inserted into the planetary grid and human consciousness to create false realities and manipulate perception.',
    purpose: 'Insert false historical timelines, manipulate memory, and create artificial realities to control human perception and consciousness development.',
    effects: [
      'False memory implantation',
      'Historical timeline manipulation',
      'Reality perception distortion',
      'Phantom experience creation',
      'Consciousness matrix overlays',
      'Artificial reality anchoring'
    ],
    identification: [
      'Conflicting memories of historical events',
      'Reality feeling artificial or staged',
      'Mandela effect experiences',
      'False spiritual or mystical experiences',
      'Inconsistent timeline memories',
      'Artificial or projected visions'
    ],
    protection: [
      'Organic memory recovery',
      'Timeline healing work',
      'Reality testing practices',
      'Authentic experience validation',
      'Natural consciousness anchoring',
      'Original timeline restoration'
    ],
    severity: 'high',
    sourceFiles: ['Holographic_Insert.html', 'False_Timeline.html', 'Reality_Manipulation.html', 'Memory_Implants.html', 'Phantom_Matrix.html']
  },
  {
    id: 'psychotronic-weapons',
    name: 'Psychotronic Weapons',
    category: 'Mind Control',
    description: 'Advanced electromagnetic and scalar wave weapons designed to target and manipulate human consciousness, emotions, and physical health.',
    purpose: 'Remotely control human behavior, induce specific emotional or mental states, and cause physical symptoms through electromagnetic manipulation.',
    effects: [
      'Remote consciousness manipulation',
      'Emotional state control',
      'Physical symptom induction',
      'Mental state alteration',
      'Behavioral programming',
      'Health disruption',
      'Cognitive function impairment'
    ],
    identification: [
      'Sudden mood swings without apparent cause',
      'Unexplained physical symptoms',
      'Mental fog or cognitive impairment',
      'Artificial emotional states',
      'Behavioral changes',
      'Sleep disturbances',
      'Electromagnetic sensitivity symptoms'
    ],
    protection: [
      'Electromagnetic shielding practices',
      'Energy field strengthening',
      'Mental sovereignty development',
      'Physical detoxification',
      'Grounding and earthing practices',
      'Protective technology use',
      'Consciousness fortification'
    ],
    severity: 'critical',
    sourceFiles: ['Psychotronic_Weapons.html', 'Electromagnetic_Weapons.html', 'Scalar_Weapons.html', 'Remote_Influence.html', 'Targeted_Individuals.html']
  },
  {
    id: 'sexual-misery-programming',
    name: 'Sexual Misery Programming',
    category: 'Consciousness Manipulation',
    description: 'Systematic programming designed to distort human sexuality, create sexual trauma, and prevent natural sacred sexual expression.',
    purpose: 'Harvest sexual energy, prevent sacred union, create sexual trauma bonding, and block natural kundalini and tantric experiences.',
    effects: [
      'Sexual energy harvesting',
      'Sacred sexuality suppression',
      'Sexual trauma programming',
      'Gender confusion installation',
      'Reproductive system disruption',
      'Kundalini blocking',
      'Heart-sexual center disconnection'
    ],
    identification: [
      'Sexual trauma without clear origin',
      'Difficulty with intimate bonding',
      'Sexual energy depletion',
      'Gender dysphoria or confusion',
      'Sexual addiction or aversion',
      'Reproductive health issues',
      'Heart chakra-sexual center disconnection'
    ],
    protection: [
      'Sacred sexuality education',
      'Sexual trauma healing',
      'Energy body restoration',
      'Heart-sexual center integration',
      'Natural gender identity affirmation',
      'Kundalini restoration',
      'Sacred union practices'
    ],
    severity: 'high',
    sourceFiles: ['Sexual_Misery.html', 'Sexual_Programming.html', 'Tantra.html', 'Sacred_Sexuality.html', 'Gender_Confusion.html']
  },
  {
    id: 'black-magic-grids',
    name: 'Black Magic Grid Systems',
    category: 'Architectural Control',
    description: 'Occult magical grid systems including Thoth grids, Crowley grids, and other ceremonial magic networks designed to channel dark forces.',
    purpose: 'Channel black magic forces, facilitate demonic possession, harvest sexual energy, and maintain dark occult control over consciousness.',
    effects: [
      'Black magic force channeling',
      'Demonic entity attraction',
      'Sexual energy harvesting',
      'Occult possession facilitation',
      'Dark ritual amplification',
      'Consciousness corruption',
      'Spiritual contamination'
    ],
    identification: [
      'Attraction to dark occult practices',
      'Demonic or entity attachments',
      'Sexual energy drainage during sleep',
      'Dark magical attacks',
      'Occult symbolism obsession',
      'Ritual abuse memories',
      'Spiritual contamination sensations'
    ],
    protection: [
      'White magic and light practices',
      'Demonic clearing and exorcism',
      'Sexual energy protection',
      'Occult knowledge education',
      'Spiritual purification practices',
      'Divine protection invocation',
      'Sacred geometry activation'
    ],
    severity: 'high',
    sourceFiles: ['Black_Magic.html', 'Thoth.html', 'Crowley_Grid.html', 'Ceremonial_Magic.html', 'Demonic_Possession.html', 'Occult_Grids.html']
  },
  {
    id: 'archontic-deception',
    name: 'Archontic Deception Strategy',
    category: 'Consciousness Manipulation',
    description: 'Comprehensive deception strategy using false light, imposter spirits, and artificial ascension programming to mislead spiritual seekers.',
    purpose: 'Redirect spiritual evolution toward false paths, harvest spiritual energy, and prevent authentic ascension through sophisticated spiritual deception.',
    effects: [
      'False spiritual experiences',
      'Imposter spirit contact',
      'Artificial ascension symptoms',
      'Spiritual energy harvesting',
      'False light attraction',
      'Authentic path deviation',
      'Spiritual bypassing programming'
    ],
    identification: [
      'Spiritual experiences lacking discernment',
      'False messiah or guru attraction',
      'Artificial ascension experiences',
      'Spiritual bypassing behaviors',
      'False light experiences',
      'Imposter spirit channeling',
      'Spiritual ego inflation'
    ],
    protection: [
      'Rigorous spiritual discernment',
      'Direct God-Self connection',
      'Authentic spiritual practices',
      'False light recognition',
      'Imposter spirit identification',
      'True ascension education',
      'Spiritual maturity development'
    ],
    severity: 'critical',
    sourceFiles: ['Archontic_Deception.html', 'False_Light.html', 'Imposter_Spirit.html', 'False_Ascension.html', 'Spiritual_Deception.html', 'Archons.html']
  },
  {
    id: 'ley-line-hijacking',
    name: 'Ley Line Hijacking',
    category: 'Architectural Control',
    description: 'Systematic hijacking of natural Earth ley lines and energy grids to redirect planetary energy for NAA control systems and consciousness manipulation.',
    purpose: 'Redirect natural planetary energy flows to power artificial control systems and prevent organic ascension timeline activation.',
    effects: [
      'Natural energy flow disruption',
      'Planetary grid corruption',
      'Stargate manipulation',
      'Dimensional portal control',
      'Earth energy harvesting',
      'Natural timeline interference'
    ],
    identification: [
      'Feeling drained at sacred sites',
      'Artificial energy at power spots',
      'Corrupted earth energy experiences',
      'Stargate or portal malfunctions',
      'Grid work interference',
      'Natural earth connection difficulties'
    ],
    protection: [
      'Ley line restoration work',
      'Natural grid alignment',
      'Earth energy purification',
      'Stargate rehabilitation',
      'Organic timeline anchoring',
      'Planetary grid healing'
    ],
    severity: 'high',
    sourceFiles: ['Ley_Lines.html', 'Earth_Grid.html', 'Stargate_Hijacking.html', 'Planetary_Grid.html', 'Grid_Hijacking.html']
  },
  {
    id: 'time-manipulation',
    name: 'Time Manipulation Technology',
    category: 'Technological Control',
    description: 'Advanced technology for manipulating timelines, creating time loops, and controlling temporal perception to maintain control over consciousness evolution.',
    purpose: 'Control timeline probabilities, prevent ascension timelines, create temporal traps, and maintain consciousness in lower dimensional time locks.',
    effects: [
      'Timeline probability manipulation',
      'Temporal perception distortion',
      'Time loop creation',
      'Ascension timeline blocking',
      'Temporal consciousness trapping',
      'Timeline memory manipulation'
    ],
    identification: [
      'Repetitive life pattern loops',
      'Difficulty accessing higher timelines',
      'Time perception distortions',
      'Stuck timeline experiences',
      'Future potential blocking',
      'Timeline jumping difficulties'
    ],
    protection: [
      'Timeline sovereignty practices',
      'Temporal boundary setting',
      'Organic timeline anchoring',
      'Time lock dissolution',
      'Future self connection',
      'Timeline healing work'
    ],
    severity: 'critical',
    sourceFiles: ['Time_Manipulation.html', 'Timeline_Wars.html', 'Temporal_Control.html', 'Time_Locks.html', 'Timeline_Hijacking.html']
  },
  {
    id: 'consciousness-traps',
    name: 'Consciousness Traps & Soul Nets',
    category: 'Consciousness Manipulation',
    description: 'Sophisticated trapping mechanisms designed to capture souls during death transition and prevent natural ascension or reincarnation cycles.',
    purpose: 'Capture departing souls, force reincarnation into controlled systems, harvest soul energy, and prevent natural spiritual evolution.',
    effects: [
      'Soul capture during death transition',
      'Forced reincarnation cycles',
      'Soul energy harvesting',
      'Natural evolution blocking',
      'Consciousness recycling',
      'Spiritual freedom prevention'
    ],
    identification: [
      'Past life memories of entrapment',
      'Reincarnation cycle awareness',
      'Soul retrieval difficulties',
      'Death transition fears',
      'Spiritual freedom restrictions',
      'Consciousness recycling patterns'
    ],
    protection: [
      'Soul sovereignty declaration',
      'Death transition preparation',
      'Spiritual freedom education',
      'Soul retrieval work',
      'Natural ascension path knowledge',
      'Consciousness liberation practices'
    ],
    severity: 'critical',
    sourceFiles: ['Soul_Traps.html', 'Consciousness_Traps.html', 'Reincarnation_Cycle.html', 'Death_Transition.html', 'Soul_Recycling.html']
  },
  {
    id: 'genetic-modification',
    name: 'Genetic Modification Programs',
    category: 'Genetic Manipulation',
    description: 'Systematic genetic manipulation and hybridization programs designed to alter human DNA and prevent natural genetic evolution.',
    purpose: 'Alter human genetic potential, create hybrid races, prevent DNA activation, and maintain genetic limitations for consciousness control.',
    effects: [
      'DNA strand limitation',
      'Genetic potential suppression',
      'Hybrid DNA integration',
      'Natural evolution blocking',
      'Genetic template corruption',
      'Consciousness capacity limitation'
    ],
    identification: [
      'Genetic health issues without family history',
      'DNA activation difficulties',
      'Hybrid memories or experiences',
      'Genetic template distortions',
      'Consciousness expansion limitations',
      'Physical evolution blockages'
    ],
    protection: [
      'DNA activation and restoration',
      'Genetic template healing',
      'Natural evolution support',
      'Hybrid clearing work',
      'Genetic sovereignty practices',
      'Original human template restoration'
    ],
    severity: 'high',
    sourceFiles: ['Genetic_Modification.html', 'DNA_Manipulation.html', 'Hybrid_Programs.html', 'Genetic_Engineering.html', 'DNA_Damage.html']
  },
  {
    id: 'transhumanism-agenda',
    name: 'Transhumanism Agenda',
    category: 'Technological Control',
    description: 'Systematic promotion of human-machine integration, AI enhancement, and technological dependency to replace natural human evolution.',
    purpose: 'Replace natural human evolution with technological enhancement, create human-AI hybrids, and establish technological control over consciousness.',
    effects: [
      'Natural evolution replacement',
      'Technology dependency creation',
      'Human-AI hybridization',
      'Consciousness digitization',
      'Biological autonomy loss',
      'Natural human capacity suppression'
    ],
    identification: [
      'Excessive technology dependency',
      'Human enhancement obsession',
      'AI integration desires',
      'Natural ability devaluation',
      'Cyborg fantasies or dreams',
      'Technology worship behaviors'
    ],
    protection: [
      'Natural human capacity development',
      'Technology discernment',
      'Biological sovereignty practices',
      'Organic evolution support',
      'Human essence preservation',
      'Natural consciousness expansion'
    ],
    severity: 'high',
    sourceFiles: ['Transhumanism.html', 'Human_Enhancement.html', 'AI_Integration.html', 'Cyborg_Technology.html', 'Technology_Worship.html']
  },
  {
    id: 'moon-matrix',
    name: 'Moon Matrix Control System',
    category: 'Architectural Control',
    description: 'Artificial satellite system using the Moon as a transmission station for consciousness control, emotional manipulation, and biological cycle interference.',
    purpose: 'Control human emotional and biological cycles, transmit consciousness manipulation frequencies, and maintain dimensional frequency barriers.',
    effects: [
      'Emotional cycle manipulation',
      'Biological rhythm disruption',
      'Consciousness frequency transmission',
      'Dimensional barrier maintenance',
      'Natural cycle interference',
      'Lunar programming installation'
    ],
    identification: [
      'Extreme lunar cycle sensitivity',
      'Artificial emotional patterns',
      'Biological rhythm disruptions',
      'Moon worship or obsession',
      'Nocturnal consciousness interference',
      'Feminine cycle manipulations'
    ],
    protection: [
      'Natural rhythm restoration',
      'Lunar influence discernment',
      'Emotional sovereignty development',
      'Biological cycle healing',
      'Natural feminine cycle support',
      'Solar consciousness cultivation'
    ],
    severity: 'medium',
    sourceFiles: ['Moon_Matrix.html', 'Lunar_Control.html', 'Biological_Cycles.html', 'Emotional_Manipulation.html', 'Satellite_Control.html']
  },
  {
    id: 'addiction-programming',
    name: 'Addiction Programming Systems',
    category: 'Mind Control',
    description: 'Systematic programming designed to create various forms of addiction and dependency to harvest energy and maintain consciousness control.',
    purpose: 'Create energy harvesting through addiction cycles, maintain consciousness in lower frequencies, and prevent spiritual development through dependency.',
    effects: [
      'Addictive behavior programming',
      'Energy harvesting through addiction',
      'Consciousness frequency lowering',
      'Spiritual development blocking',
      'Dependency creation',
      'Free will compromise'
    ],
    identification: [
      'Unexplained addictive behaviors',
      'Energy depletion during addiction cycles',
      'Spiritual practice interference',
      'Compulsive behaviors without clear origin',
      'Addiction to technology or substances',
      'Dependency on external sources'
    ],
    protection: [
      'Addiction pattern recognition',
      'Energy recovery practices',
      'Spiritual discipline development',
      'Dependency dissolution work',
      'Free will restoration',
      'Natural satisfaction cultivation'
    ],
    severity: 'medium',
    sourceFiles: ['Addiction.html', 'Addiction_Sentinels.html', 'Dependency_Programming.html', 'Energy_Harvesting.html', 'Compulsive_Behaviors.html']
  },
  {
    id: 'religious-programming',
    name: 'Religious Mind Control Programming',
    category: 'Mind Control',
    description: 'Systematic manipulation of religious and spiritual beliefs to control consciousness, harvest energy, and prevent authentic spiritual development.',
    purpose: 'Control spiritual development through false religious programming, harvest worship energy, and prevent direct God connection.',
    effects: [
      'False spiritual belief installation',
      'Direct God connection blocking',
      'Worship energy harvesting',
      'Spiritual authority dependency',
      'Religious fear programming',
      'Authentic spirituality suppression'
    ],
    identification: [
      'Religious fear or guilt programming',
      'Excessive religious authority dependency',
      'Spiritual bypassing behaviors',
      'False messiah attraction',
      'Religious fundamentalism',
      'Direct spiritual experience fear'
    ],
    protection: [
      'Direct God-Self connection development',
      'Religious programming clearing',
      'Authentic spirituality cultivation',
      'Spiritual authority discernment',
      'Fear-based belief dissolution',
      'Personal spiritual sovereignty'
    ],
    severity: 'medium',
    sourceFiles: ['Religious_Programming.html', 'False_Religion.html', 'Spiritual_Control.html', 'Religious_Mind_Control.html', 'God_Connection.html']
  }
];

const NAAToolsWeaponsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'Mind Control',
    'Architectural Control',
    'Consciousness Manipulation',
    'Phantom Matrix',
    'Genetic Manipulation',
    'Surveillance & Control',
    'Technological Control',
    'Frequency Fence'
  ];

  const filteredTools = naaToolsWeapons.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.effects.some(effect => effect.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-900/30 text-red-200 border-red-500/50';
      case 'high': return 'bg-orange-900/30 text-orange-200 border-orange-500/50';
      case 'medium': return 'bg-yellow-900/30 text-yellow-200 border-yellow-500/50';
      case 'low': return 'bg-green-900/30 text-green-200 border-green-500/50';
      default: return 'bg-cosmic-700/30 text-cosmic-200 border-cosmic-500/50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mind Control': return <Brain className="h-5 w-5" />;
      case 'Architectural Control': return <Zap className="h-5 w-5" />;
      case 'Consciousness Manipulation': return <Eye className="h-5 w-5" />;
      case 'Technological Control': return <Satellite className="h-5 w-5" />;
      case 'Genetic Manipulation': return <Dna className="h-5 w-5" />;
      case 'Frequency Fence': return <Waves className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-900 via-cosmic-800 to-cosmic-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-4 bg-gradient-to-r from-sacred-gold to-sacred-silver bg-clip-text text-transparent">
            NAA Tools & Weapons
          </h1>
          <p className="text-xl text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Comprehensive identification and classification guide to Negative Alien Agenda control systems, 
            technologies, and weapons used for consciousness manipulation and planetary control.
          </p>
        </div>

        <Alert variant="warning" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> This information is for educational and protective purposes. 
            Understanding these systems helps develop discernment and implement appropriate spiritual protection.
            Sources from 50+ files from Lisa Renee's Energetic Synthesis materials.
          </AlertDescription>
        </Alert>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 h-4 w-4" />
            <Input
              placeholder="Search NAA tools and weapons..."
              className="pl-10 bg-cosmic-800/50 border-cosmic-600 text-cosmic-100 placeholder-cosmic-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 bg-cosmic-800/50 border-cosmic-600 text-cosmic-100">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-cosmic-800 border-cosmic-600">
              {categories.map(category => (
                <SelectItem key={category} value={category} className="text-cosmic-100">
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6 text-center">
          <p className="text-cosmic-300">
            Found <span className="text-sacred-gold font-semibold">{filteredTools.length}</span> NAA control systems
            {selectedCategory !== 'all' && (
              <span> in category: <span className="text-sacred-gold">{selectedCategory}</span></span>
            )}
          </p>
        </div>

        <div className="grid gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="bg-cosmic-800/30 border-cosmic-600 hover:border-cosmic-500 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(tool.category)}
                    <div>
                      <CardTitle className="text-xl text-sacred-gold">{tool.name}</CardTitle>
                      <CardDescription className="text-cosmic-300 flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="border-cosmic-500 text-cosmic-200">
                          {tool.category}
                        </Badge>
                        <Badge className={`${getSeverityColor(tool.severity)} flex items-center gap-1`}>
                          {getSeverityIcon(tool.severity)}
                          {tool.severity.charAt(0).toUpperCase() + tool.severity.slice(1)} Severity
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-cosmic-200 mb-4 leading-relaxed">{tool.description}</p>
                
                <Tabs defaultValue="purpose" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-cosmic-700/30">
                    <TabsTrigger value="purpose">Purpose</TabsTrigger>
                    <TabsTrigger value="effects">Effects</TabsTrigger>
                    <TabsTrigger value="identification">Signs</TabsTrigger>
                    <TabsTrigger value="protection">Protection</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="purpose" className="mt-4">
                    <div className="p-4 bg-cosmic-700/20 rounded-lg">
                      <h4 className="font-semibold text-sacred-gold mb-2">Strategic Purpose:</h4>
                      <p className="text-cosmic-200">{tool.purpose}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="effects" className="mt-4">
                    <div className="p-4 bg-cosmic-700/20 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-3">Known Effects:</h4>
                      <ul className="space-y-2">
                        {tool.effects.map((effect, index) => (
                          <li key={index} className="flex items-start gap-2 text-cosmic-200">
                            <span className="text-red-400 mt-1">•</span>
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="identification" className="mt-4">
                    <div className="p-4 bg-cosmic-700/20 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-3">Identification Signs:</h4>
                      <ul className="space-y-2">
                        {tool.identification.map((sign, index) => (
                          <li key={index} className="flex items-start gap-2 text-cosmic-200">
                            <span className="text-yellow-400 mt-1">•</span>
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="protection" className="mt-4">
                    <div className="p-4 bg-cosmic-700/20 rounded-lg">
                      <h4 className="font-semibold text-green-400 mb-3">Protection Methods:</h4>
                      <ul className="space-y-2">
                        {tool.protection.map((method, index) => (
                          <li key={index} className="flex items-start gap-2 text-cosmic-200">
                            <span className="text-green-400 mt-1">•</span>
                            {method}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-4 pt-4 border-t border-cosmic-600">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="sources">
                      <AccordionTrigger className="text-cosmic-300 hover:text-sacred-gold">
                        Source Files ({tool.sourceFiles.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {tool.sourceFiles.map((file, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-cosmic-500 text-cosmic-300">
                              {file.replace('.html', '')}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cosmic-300 text-lg">No NAA tools or weapons found matching your search criteria.</p>
          </div>
        )}

        <div className="mt-12 p-6 bg-cosmic-800/30 rounded-lg border border-cosmic-600">
          <h3 className="text-xl font-semibold text-sacred-gold mb-4">Understanding NAA Control Systems</h3>
          <p className="text-cosmic-200 leading-relaxed mb-4">
            The Negative Alien Agenda (NAA) employs sophisticated technological and consciousness control systems 
            to maintain dominion over human consciousness and planetary evolution. These tools and weapons operate 
            across multiple dimensions and use advanced artificial intelligence, genetic manipulation, and 
            electromagnetic technologies.
          </p>
          <p className="text-cosmic-200 leading-relaxed mb-4">
            This comprehensive database contains information sourced from over 50 files from Lisa Renee's 
            Energetic Synthesis materials, providing detailed analysis of AI networks, psychotronic weapons, 
            consciousness manipulation systems, and protective measures.
          </p>
          <p className="text-cosmic-200 leading-relaxed">
            Recognition and understanding of these systems is the first step toward spiritual sovereignty and 
            conscious evolution. Through dedicated spiritual practice, discernment development, and appropriate 
            protection techniques, individuals can reclaim their consciousness and support humanity's ascension process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NAAToolsWeaponsPage;
