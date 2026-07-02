// Advanced TypeScript types for spiritual development systems

// Branded types for type safety in spiritual calculations
export type ChakraFrequency = number & { readonly __brand: 'ChakraFrequency' };
export type LightbodyLayer = number & { readonly __brand: 'LightbodyLayer' };
export type SacredGeometry = string & { readonly __brand: 'SacredGeometry' };
export type EnergyLevel = number & { readonly __brand: 'EnergyLevel' };
export type ProtectionStrength = number & { readonly __brand: 'ProtectionStrength' };

// Template literal types for sacred mantras and decrees
export type GSFDecree = `GSF_${string}`;
export type ShieldMantra = `12D_Shield_${string}`;
export type UnityDeclaration = `Unity_${string}`;
export type SacredMantra = GSFDecree | ShieldMantra | UnityDeclaration;

// Spiritual development levels with progressive typing
export type SpiritualLevel = 'beginner' | 'intermediate' | 'advanced' | 'master' | 'guardian';

// Conditional types for spiritual states
export type SpiritualState<T extends SpiritualLevel> = 
  T extends 'beginner' ? BasicConsciousness :
  T extends 'intermediate' ? ExpandedConsciousness :
  T extends 'advanced' ? HigherConsciousness :
  T extends 'master' ? ChristConsciousness :
  T extends 'guardian' ? GuardianConsciousness :
  never;

// Chakra system typing
export type PhysicalChakra = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type MorphogeneticChakra = 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export type ChakraID = PhysicalChakra | MorphogeneticChakra;

export interface ChakraState<T extends ChakraID = ChakraID> {
  id: T;
  frequency: ChakraFrequency;
  activationLevel: EnergyLevel;
  color: string;
  name: string;
  isPhysical: T extends PhysicalChakra ? true : false;
  isMorphogenetic: T extends MorphogeneticChakra ? true : false;
}

// Lightbody layers with dimensional mapping
export type LightbodyDimension = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface LightbodyLayerState {
  dimension: LightbodyDimension;
  layer: LightbodyLayer;
  frequency: ChakraFrequency;
  activationStatus: 'dormant' | 'activating' | 'active' | 'integrated';
  energyFlow: EnergyLevel;
}

// 12-Tree Grid sphere typing
export type TreeGridSphere = 
  | 'Keter' | 'Chokmah' | 'Binah' | 'Chesed' | 'Geburah' | 'Tiphareth'
  | 'Netzach' | 'Hod' | 'Yesod' | 'Malkuth' | 'DaAth' | 'EinSoph';

export interface TreeGridState {
  sphere: TreeGridSphere;
  dimension: number;
  frequency: ChakraFrequency;
  connection: TreeGridSphere[];
  activationLevel: EnergyLevel;
}

// VERS AI spiritual response typing
export interface VERSSpiritualContext {
  userLevel: SpiritualLevel;
  activeChakras: ChakraID[];
  protectionLevel: ProtectionStrength;
  currentPractice?: string;
  energeticState: 'balanced' | 'clearing' | 'activating' | 'integrating';
}

export interface VERSSpiritualResponse<T extends SpiritualLevel = SpiritualLevel> {
  guidance: string;
  voiceProfile: SpiritualVoiceProfile;
  energeticResonance: ChakraFrequency[];
  recommendedPractices: SpiritualPractice<T>[];
  protectionGuidance: ProtectionProtocol;
  followUpQuestions: string[];
  spiritualContext: VERSSpiritualContext;
}

// Voice profile typing for VERS
export interface SpiritualVoiceProfile {
  id: 'sophia' | 'michael' | 'krystal' | 'thoth';
  name: string;
  archetype: 'divine_feminine' | 'protective_masculine' | 'balanced_unity' | 'ancient_wisdom';
  frequency: ChakraFrequency;
  energySignature: SacredGeometry;
}

// Spiritual practices with level-specific recommendations
export interface SpiritualPractice<T extends SpiritualLevel = SpiritualLevel> {
  name: string;
  level: T;
  duration: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'as_needed';
  energyRequirement: EnergyLevel;
  chakrasInvolved: ChakraID[];
  protectionRequired: boolean;
  mantra?: SacredMantra;
  instructions: T extends 'beginner' ? string[] : 
                T extends 'intermediate' ? string[] :
                T extends 'advanced' ? string[] :
                string[];
}

// Protection protocols
export interface ProtectionProtocol {
  name: string;
  strength: ProtectionStrength;
  mantras: SacredMantra[];
  visualization: string;
  duration: number;
  emergencyResponse?: boolean;
}

// Consciousness level definitions
export interface BasicConsciousness {
  awareness: 'physical' | 'emotional';
  capabilities: ['grounding', 'basic_meditation'];
  maxChakras: PhysicalChakra;
}

export interface ExpandedConsciousness {
  awareness: 'mental' | 'astral';
  capabilities: ['chakra_work', 'energy_healing', 'basic_protection'];
  maxChakras: 10;
}

export interface HigherConsciousness {
  awareness: 'causal' | 'buddhic';
  capabilities: ['lightbody_activation', 'advanced_protection', 'service_work'];
  maxChakras: 12;
}

export interface ChristConsciousness {
  awareness: 'logoic' | 'monadic';
  capabilities: ['grid_work', 'planetary_healing', 'guardian_protocols'];
  maxChakras: 15;
}

export interface GuardianConsciousness {
  awareness: 'cosmic' | 'galactic';
  capabilities: ['timeline_healing', 'universal_service', 'creation_codes'];
  maxChakras: 15;
  specialAbilities: ['timeline_travel', 'matrix_restoration'];
}

// Utility types for spiritual progress
export type SpiritualProgress<T extends SpiritualLevel> = {
  currentLevel: T;
  nextLevel: T extends 'beginner' ? 'intermediate' :
              T extends 'intermediate' ? 'advanced' :
              T extends 'advanced' ? 'master' :
              T extends 'master' ? 'guardian' :
              'guardian';
  requirements: SpiritualPractice<T>[];
  completedPractices: string[];
  chakraActivations: Partial<Record<ChakraID, boolean>>;
  lightbodyIntegration: Partial<Record<LightbodyDimension, boolean>>;
};

// Sacred geometry patterns
export interface SacredGeometryPattern {
  name: SacredGeometry;
  sides: number;
  frequency: ChakraFrequency;
  dimension: number;
  purpose: 'protection' | 'activation' | 'healing' | 'manifestation';
  visualizationInstructions: string;
}

// Energy field scanning results
export interface EnergyFieldScan {
  timestamp: Date;
  overallHealth: EnergyLevel;
  chakraStates: Record<ChakraID, ChakraState>;
  lightbodyLayers: LightbodyLayerState[];
  auricField: {
    color: string;
    density: EnergyLevel;
    integrity: number;
  };
  attachments: {
    detected: boolean;
    type?: 'entity' | 'cord' | 'implant';
    location?: ChakraID;
    severity?: 'low' | 'medium' | 'high';
  }[];
  recommendations: SpiritualPractice[];
}

// Type guards for runtime validation
export function isChakraFrequency(value: number): value is ChakraFrequency {
  return value >= 0 && value <= 1000;
}

export function isPhysicalChakra(id: ChakraID): id is PhysicalChakra {
  return id >= 1 && id <= 7;
}

export function isMorphogeneticChakra(id: ChakraID): id is MorphogeneticChakra {
  return id >= 8 && id <= 15;
}

export function createChakraFrequency(hz: number): ChakraFrequency {
  if (!isChakraFrequency(hz)) {
    throw new Error(`Invalid chakra frequency: ${hz}. Must be between 0-1000 Hz.`);
  }
  return hz as ChakraFrequency;
}

// Factory functions for type-safe creation
export function createSpiritualPractice<T extends SpiritualLevel>(
  practice: Omit<SpiritualPractice<T>, 'energyRequirement'>,
  energyLevel: number
): SpiritualPractice<T> {
  return {
    ...practice,
    energyRequirement: energyLevel as EnergyLevel
  };
}

export function createVERSResponse<T extends SpiritualLevel>(
  guidance: string,
  context: VERSSpiritualContext,
  _level: T
): VERSSpiritualResponse<T> {
  return {
    guidance,
    voiceProfile: {
      id: 'sophia',
      name: 'Sophia Divine',
      archetype: 'divine_feminine',
      frequency: createChakraFrequency(528),
      energySignature: 'sacred_feminine' as SacredGeometry
    },
    energeticResonance: [createChakraFrequency(528)],
    recommendedPractices: [],
    protectionGuidance: {
      name: '12D Shield',
      strength: 95 as ProtectionStrength,
      mantras: ['12D_Shield_Activation' as ShieldMantra],
      visualization: 'Golden pillar of light surrounding your energy field',
      duration: 300
    },
    followUpQuestions: [],
    spiritualContext: context
  };
}
