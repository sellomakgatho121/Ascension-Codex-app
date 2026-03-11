export interface ProgressMetrics {
  // Chakra System Progress
  chakraActivation: {
    physicalChakras: number[];        // IDs 1-7
    morphogeneticChakras: number[];   // IDs 8-15
    integrationLevel: number;         // 0-100%
    lastActivation: Date | null;
  };
  
  // Lightbody Development
  lightbodyDevelopment: {
    layersActivated: string[];        // Layer IDs
    integrationStage: number;         // 1-7 stages
    frequencyLevel: number;           // Current frequency holding capacity
    stabilityRating: number;          // How stable the activations are (1-10)
  };
  
  // 12D Shield Mastery
  protectionSkills: {
    shieldActivations: number;        // Total times practiced
    shieldDuration: number;           // Average minutes can maintain
    shieldStrength: number;           // Subjective strength rating (1-10)
    consistentPractice: boolean;      // Daily practice for 7+ days
  };
  
  // Tree Grid/Kathara Grid Work
  gridWork: {
    spheresExplored: number[];        // Sphere IDs 1-12
    pathworkCompleted: string[];      // Specific pathways between spheres
    dimensionalAccess: number[];      // Which dimensions can access (1-12)
    gridStability: number;            // How well grid is anchored (1-10)
  };
  
  // Meditation Practice
  meditationPractice: {
    totalSessions: number;
    averageSessionLength: number;     // In minutes
    consecutiveDays: number;          // Current streak
    longestStreak: number;            // Best streak achieved
    focusQuality: number;             // Self-rated focus (1-10)
    techniques: string[];             // Meditation types practiced
  };
  
  // Consciousness Expansion Indicators
  consciousnessExpansion: {
    perceptualShifts: string[];       // Documented experiences
    intuitionLevel: number;           // Self-rated intuitive development (1-10)
    energyAwareness: number;          // Ability to sense energy (1-10)
    multidimensionalAwareness: number; // Access to higher dimensions (1-10)
    sovereigntyLevel: number;         // Spiritual independence (1-10)
  };
  
  // Service and Integration
  serviceIntegration: {
    selfHealing: number;              // Personal healing work (1-10)
    serviceToOthers: number;          // Helping others' awakening (1-10)
    earthService: number;             // Contributing to planetary healing (1-10)
    knowledgeSharing: number;         // Teaching/sharing ES concepts (1-10)
  };
}

export interface ProgressStage {
  id: string;
  name: string;
  description: string;
  requirements: ProgressRequirement[];
  benefits: string[];
  nextStages: string[];
}

export interface ProgressRequirement {
  type: 'chakra' | 'lightbody' | 'protection' | 'grid' | 'meditation' | 'consciousness' | 'service';
  criteria: string;
  threshold: number;
  description: string;
}

export const progressStages: ProgressStage[] = [
  {
    id: "spiritual-awakening",
    name: "Spiritual Awakening",
    description: "Initial recognition of spiritual reality beyond the physical. Beginning to question conventional reality and seeking higher truth.",
    requirements: [
      {
        type: 'meditation',
        criteria: 'totalSessions',
        threshold: 5,
        description: 'Complete at least 5 meditation sessions'
      },
      {
        type: 'chakra',
        criteria: 'physicalChakras',
        threshold: 2,
        description: 'Activate at least 2 physical chakras'
      }
    ],
    benefits: [
      "Increased awareness of energy",
      "Beginning of spiritual discernment",
      "Initial connection to higher guidance"
    ],
    nextStages: ["energetic-awareness"]
  },
  {
    id: "energetic-awareness",
    name: "Energetic Awareness",
    description: "Development of energy sensitivity and basic protection skills. Understanding the importance of spiritual protection and energy hygiene.",
    requirements: [
      {
        type: 'protection',
        criteria: 'shieldActivations',
        threshold: 10,
        description: 'Practice 12D shield activation 10 times'
      },
      {
        type: 'chakra',
        criteria: 'physicalChakras',
        threshold: 5,
        description: 'Activate 5 of the 7 physical chakras'
      },
      {
        type: 'consciousness',
        criteria: 'energyAwareness',
        threshold: 5,
        description: 'Develop energy awareness to level 5'
      }
    ],
    benefits: [
      "Ability to sense and work with energy",
      "Basic psychic protection skills",
      "Increased sensitivity to environments and people"
    ],
    nextStages: ["chakra-mastery", "protection-specialist"]
  },
  {
    id: "chakra-mastery",
    name: "Chakra System Mastery",
    description: "Complete activation and integration of all 15 chakras. Mastery of both physical and morphogenetic energy centers.",
    requirements: [
      {
        type: 'chakra',
        criteria: 'physicalChakras',
        threshold: 7,
        description: 'Activate all 7 physical chakras'
      },
      {
        type: 'chakra',
        criteria: 'morphogeneticChakras',
        threshold: 4,
        description: 'Activate at least 4 morphogenetic chakras'
      },
      {
        type: 'chakra',
        criteria: 'integrationLevel',
        threshold: 70,
        description: 'Achieve 70% chakra integration'
      }
    ],
    benefits: [
      "Balanced energy flow through all centers",
      "Access to higher dimensional frequencies",
      "Enhanced spiritual abilities and perception"
    ],
    nextStages: ["lightbody-activation"]
  },
  {
    id: "protection-specialist",
    name: "Protection Specialist",
    description: "Advanced mastery of spiritual protection techniques. Ability to maintain strong energetic boundaries and help others with protection.",
    requirements: [
      {
        type: 'protection',
        criteria: 'shieldActivations',
        threshold: 50,
        description: 'Practice shield activation 50+ times'
      },
      {
        type: 'protection',
        criteria: 'shieldDuration',
        threshold: 30,
        description: 'Maintain shield for 30+ minutes'
      },
      {
        type: 'protection',
        criteria: 'consistentPractice',
        threshold: 1,
        description: 'Maintain daily practice'
      }
    ],
    benefits: [
      "Strong psychic protection abilities",
      "Ability to clear negative energies",
      "Can assist others with protection"
    ],
    nextStages: ["lightbody-activation", "grid-worker"]
  },
  {
    id: "lightbody-activation",
    name: "Lightbody Activation",
    description: "Activation and integration of the lightbody layers. Beginning of true multidimensional consciousness development.",
    requirements: [
      {
        type: 'lightbody',
        criteria: 'layersActivated',
        threshold: 4,
        description: 'Activate at least 4 lightbody layers'
      },
      {
        type: 'lightbody',
        criteria: 'integrationStage',
        threshold: 3,
        description: 'Reach integration stage 3'
      },
      {
        type: 'meditation',
        criteria: 'longestStreak',
        threshold: 21,
        description: 'Maintain 21-day meditation streak'
      }
    ],
    benefits: [
      "Multidimensional consciousness access",
      "Enhanced spiritual perception",
      "Ability to work with higher frequencies"
    ],
    nextStages: ["grid-worker", "consciousness-pioneer"]
  },
  {
    id: "grid-worker",
    name: "Grid Worker",
    description: "Advanced understanding and work with the Kathara Grid. Ability to work with planetary and galactic grid systems.",
    requirements: [
      {
        type: 'grid',
        criteria: 'spheresExplored',
        threshold: 8,
        description: 'Explore at least 8 grid spheres'
      },
      {
        type: 'grid',
        criteria: 'dimensionalAccess',
        threshold: 6,
        description: 'Access 6+ dimensional levels'
      },
      {
        type: 'consciousness',
        criteria: 'multidimensionalAwareness',
        threshold: 7,
        description: 'Develop multidimensional awareness to level 7'
      }
    ],
    benefits: [
      "Understanding of universal structure",
      "Ability to work with planetary grids",
      "Advanced multidimensional navigation"
    ],
    nextStages: ["consciousness-pioneer", "service-initiate"]
  },
  {
    id: "consciousness-pioneer",
    name: "Consciousness Pioneer",
    description: "Advanced spiritual development with high levels of consciousness expansion and multidimensional awareness.",
    requirements: [
      {
        type: 'consciousness',
        criteria: 'intuitionLevel',
        threshold: 8,
        description: 'Develop intuition to level 8'
      },
      {
        type: 'consciousness',
        criteria: 'sovereigntyLevel',
        threshold: 8,
        description: 'Achieve spiritual sovereignty level 8'
      },
      {
        type: 'lightbody',
        criteria: 'frequencyLevel',
        threshold: 8,
        description: 'Hold frequency level 8+'
      }
    ],
    benefits: [
      "High levels of spiritual discernment",
      "Strong connection to higher guidance",
      "Ability to navigate complex spiritual territories"
    ],
    nextStages: ["service-initiate", "guardian-ally"]
  },
  {
    id: "service-initiate",
    name: "Service Initiate",
    description: "Dedicated to service and helping others in their spiritual development. Balancing personal growth with service to humanity.",
    requirements: [
      {
        type: 'service',
        criteria: 'serviceToOthers',
        threshold: 7,
        description: 'Achieve service to others level 7'
      },
      {
        type: 'service',
        criteria: 'knowledgeSharing',
        threshold: 6,
        description: 'Share ES knowledge at level 6'
      },
      {
        type: 'consciousness',
        criteria: 'sovereigntyLevel',
        threshold: 7,
        description: 'Maintain sovereignty level 7+'
      }
    ],
    benefits: [
      "Ability to guide others spiritually",
      "Strong healing and teaching abilities",
      "Contribution to collective awakening"
    ],
    nextStages: ["guardian-ally"]
  },
  {
    id: "guardian-ally",
    name: "Guardian Ally",
    description: "Advanced practitioner working closely with Guardian forces. Dedicated to supporting organic ascension and planetary liberation.",
    requirements: [
      {
        type: 'service',
        criteria: 'earthService',
        threshold: 8,
        description: 'Achieve earth service level 8'
      },
      {
        type: 'consciousness',
        criteria: 'sovereigntyLevel',
        threshold: 9,
        description: 'Achieve spiritual sovereignty level 9'
      },
      {
        type: 'lightbody',
        criteria: 'stabilityRating',
        threshold: 8,
        description: 'Maintain lightbody stability level 8+'
      }
    ],
    benefits: [
      "Direct collaboration with Guardian forces",
      "Advanced planetary service abilities",
      "High level of spiritual mastery and stability"
    ],
    nextStages: []
  }
];

export function calculateCurrentStage(metrics: ProgressMetrics): string {
  for (const stage of progressStages) {
    const meetsRequirements = stage.requirements.every(req => {
      switch (req.type) {
        case 'chakra':
          if (req.criteria === 'physicalChakras') {
            return metrics.chakraActivation.physicalChakras.length >= req.threshold;
          }
          if (req.criteria === 'morphogeneticChakras') {
            return metrics.chakraActivation.morphogeneticChakras.length >= req.threshold;
          }
          if (req.criteria === 'integrationLevel') {
            return metrics.chakraActivation.integrationLevel >= req.threshold;
          }
          break;
        case 'lightbody':
          if (req.criteria === 'layersActivated') {
            return metrics.lightbodyDevelopment.layersActivated.length >= req.threshold;
          }
          if (req.criteria === 'integrationStage') {
            return metrics.lightbodyDevelopment.integrationStage >= req.threshold;
          }
          if (req.criteria === 'frequencyLevel') {
            return metrics.lightbodyDevelopment.frequencyLevel >= req.threshold;
          }
          if (req.criteria === 'stabilityRating') {
            return metrics.lightbodyDevelopment.stabilityRating >= req.threshold;
          }
          break;
        case 'protection':
          if (req.criteria === 'shieldActivations') {
            return metrics.protectionSkills.shieldActivations >= req.threshold;
          }
          if (req.criteria === 'shieldDuration') {
            return metrics.protectionSkills.shieldDuration >= req.threshold;
          }
          if (req.criteria === 'consistentPractice') {
            return metrics.protectionSkills.consistentPractice;
          }
          break;
        case 'grid':
          if (req.criteria === 'spheresExplored') {
            return metrics.gridWork.spheresExplored.length >= req.threshold;
          }
          if (req.criteria === 'dimensionalAccess') {
            return metrics.gridWork.dimensionalAccess.length >= req.threshold;
          }
          break;
        case 'meditation':
          if (req.criteria === 'totalSessions') {
            return metrics.meditationPractice.totalSessions >= req.threshold;
          }
          if (req.criteria === 'longestStreak') {
            return metrics.meditationPractice.longestStreak >= req.threshold;
          }
          break;
        case 'consciousness':
          if (req.criteria === 'energyAwareness') {
            return metrics.consciousnessExpansion.energyAwareness >= req.threshold;
          }
          if (req.criteria === 'intuitionLevel') {
            return metrics.consciousnessExpansion.intuitionLevel >= req.threshold;
          }
          if (req.criteria === 'multidimensionalAwareness') {
            return metrics.consciousnessExpansion.multidimensionalAwareness >= req.threshold;
          }
          if (req.criteria === 'sovereigntyLevel') {
            return metrics.consciousnessExpansion.sovereigntyLevel >= req.threshold;
          }
          break;
        case 'service':
          if (req.criteria === 'serviceToOthers') {
            return metrics.serviceIntegration.serviceToOthers >= req.threshold;
          }
          if (req.criteria === 'knowledgeSharing') {
            return metrics.serviceIntegration.knowledgeSharing >= req.threshold;
          }
          if (req.criteria === 'earthService') {
            return metrics.serviceIntegration.earthService >= req.threshold;
          }
          break;
      }
      return false;
    });
    
    if (!meetsRequirements) {
      return stage.id;
    }
  }
  
  return "guardian-ally"; // Highest stage
}

export function getProgressRecommendations(metrics: ProgressMetrics): string[] {
  const recommendations: string[] = [];
  const currentStage = calculateCurrentStage(metrics);
  const stage = progressStages.find(s => s.id === currentStage);
  
  if (!stage) return recommendations;
  
  // Check which requirements are not yet met
  stage.requirements.forEach(req => {
    let currentValue = 0;
    let label = "";
    
    switch (req.type) {
      case 'chakra':
        if (req.criteria === 'physicalChakras') {
          currentValue = metrics.chakraActivation.physicalChakras.length;
          label = "physical chakras";
        } else if (req.criteria === 'morphogeneticChakras') {
          currentValue = metrics.chakraActivation.morphogeneticChakras.length;
          label = "morphogenetic chakras";
        } else if (req.criteria === 'integrationLevel') {
          currentValue = metrics.chakraActivation.integrationLevel;
          label = "chakra integration";
        }
        break;
      case 'meditation':
        if (req.criteria === 'totalSessions') {
          currentValue = metrics.meditationPractice.totalSessions;
          label = "meditation sessions";
        } else if (req.criteria === 'longestStreak') {
          currentValue = metrics.meditationPractice.longestStreak;
          label = "day meditation streak";
        }
        break;
      case 'protection':
        if (req.criteria === 'shieldActivations') {
          currentValue = metrics.protectionSkills.shieldActivations;
          label = "shield activations";
        }
        break;
    }
    
    if (currentValue < req.threshold) {
      const remaining = req.threshold - currentValue;
      recommendations.push(`Practice ${remaining} more ${label} to advance to next stage`);
    }
  });
  
  return recommendations;
}