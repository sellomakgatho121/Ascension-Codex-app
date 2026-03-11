export interface HovaShield {
  id: string;
  name: string;
  dimensions: string;
  description: string;
  function: string;
  chakras: number[];
  color: string;
  ascensionPurpose: string;
}

export const hovaShields: HovaShield[] = [
  {
    id: "doradic",
    name: "Doradic Shield (Nada Hova Body)",
    dimensions: "1D-2D-3D",
    description: "The HU-1 harmonic body governing the gross physical matter and personal identity.",
    function: "Anchors the 1D-2D-3D chakras into the physical body and stabilizes the base survival instincts.",
    chakras: [1, 2, 3],
    color: "#FFD700", // Yellowish/Gold for the shield pulse
    ascensionPurpose: "Clearing survival fears and ego-based trauma to allow soul integration."
  },
  {
    id: "telluric",
    name: "Telluric Shield (Alphi Hova Body)",
    dimensions: "4D-5D-6D",
    description: "The HU-2 harmonic body governing the soul matrix and astral identity.",
    function: "Bridges the heart, throat, and third eye centers into the soul-spirit unity.",
    chakras: [4, 5, 6],
    color: "#32CD32", // Green/Lime
    ascensionPurpose: "Developing unconditional love and celestial communication through soul integration."
  },
  {
    id: "teuric",
    name: "Teuric Shield (Betcha Hova Body)",
    dimensions: "7D-8D-9D",
    description: "The HU-3 harmonic body governing the oversoul matrix and monadic identity.",
    function: "Connects the monad seed atom to the oversoul consciousness across 7D-9D.",
    chakras: [7, 8, 9],
    color: "#9370DB", // Violet
    ascensionPurpose: "Achieving monadic embodiment and oversoul connection."
  },
  {
    id: "maharic",
    name: "Maharic Shield (Mahara Hova Body)",
    dimensions: "10D-11D-12D",
    description: "The HU-4 harmonic body governing the avatar matrix and Christos identity.",
    function: "Holds the original liquid light blueprint and Krystal Star connection.",
    chakras: [10, 11, 12],
    color: "#00008B", // Blue-Black
    ascensionPurpose: "Full embodiment of the Avatar Self and restoration of the original divine blueprint."
  },
  {
    id: "rishic",
    name: "Rishic Shield (Raja Hova Body)",
    dimensions: "13D-14D-15D",
    description: "The HU-5 harmonic body governing the rishi matrix and solar prophet identity.",
    function: "Connects to the cosmic trinity of Mother-Father-Son Founder Rays.",
    chakras: [13, 14, 15],
    color: "#FF99CC", // Pale Magenta
    ascensionPurpose: "Return to Source and universal consciousness unity."
  }
];

export interface TreeGridSphere {
  id: number;
  name: string;
  dimension: string;
  color: string;
  function: string;
  position: { x: number; y: number };
  connections: number[];
}

export const treeGridSpheres: TreeGridSphere[] = [
  // Sphere 12 - Kee-Ra-ShA (Avatar)
  {
    id: 12,
    name: "Kee-Ra-ShA",
    dimension: "12D",
    color: "#FFFFFF",
    function: "Avatar Matrix - Unity Consciousness. The central sun of the internal 12-Tree Grid.",
    position: { x: 50, y: 7 },
    connections: [11, 10, 9]
  },
  // Sphere 11 - Khem (Avatar) - Left
  {
    id: 11,
    name: "Khem",
    dimension: "11D",
    color: "#2F4F4F", // Silver-Black
    function: "Monad Matrix - Divine Wisdom. Dark Silver/Violet doorway to the Avatar level.",
    position: { x: 25, y: 19 },
    connections: [12, 10, 9, 8]
  },
  // Sphere 10 - Khen (Avatar) - Right
  {
    id: 10,
    name: "Khen",
    dimension: "10D",
    color: "#00008B", // Blue-Black
    function: "Avatar Matrix - Understanding. Blue/Black sapphire gateway.",
    position: { x: 75, y: 19 },
    connections: [12, 11, 9, 7]
  },
  // Sphere 9 - Khundaray (Soul) - Center
  {
    id: 9,
    name: "Khundaray",
    dimension: "9D",
    color: "#C0C0C0", // Silver
    function: "Soul Matrix - Magnetic Force. Silver center of the Soul Triad.",
    position: { x: 50, y: 31 },
    connections: [11, 10, 8, 7, 6]
  },
  // Sphere 8 - Khundra (Soul) - Left
  {
    id: 8,
    name: "Khundra",
    dimension: "8D",
    color: "#FFD700", // Gold
    function: "Soul Matrix - Electrical Force. Gold center of the Monadic integration.",
    position: { x: 25, y: 43 },
    connections: [11, 9, 7, 6, 5]
  },
  // Sphere 7 - Ka-Le-Ah (Mental) - Right
  {
    id: 7,
    name: "Ka-Le-Ah",
    dimension: "7D",
    color: "#9370DB", // Violet
    function: "Mental Matrix - Christ Consciousness. The central core that bridges Avatar and Lower bodies.",
    position: { x: 75, y: 43 },
    connections: [10, 9, 8, 6, 4]
  },
  // Sphere 6 - Shara (Emotional) - Center
  {
    id: 6,
    name: "Shara",
    dimension: "6D",
    color: "#4B0082", // Indigo
    function: "Emotional Matrix - Celestial Mind. Indigo gateway.",
    position: { x: 50, y: 55 },
    connections: [9, 8, 7, 5, 4, 3]
  },
  // Sphere 5 - Shala (Emotional) - Left
  {
    id: 5,
    name: "Shala",
    dimension: "5D",
    color: "#1E90FF", // Blue
    function: "Emotional Matrix - Archetypal Mind. Blue throat center.",
    position: { x: 25, y: 67 },
    connections: [8, 6, 4, 3, 2]
  },
  // Sphere 4 - Rasha (Astral) - Right
  {
    id: 4,
    name: "Rasha",
    dimension: "4D",
    color: "#32CD32", // Green
    function: "Astral Matrix - Doradic Shield. Green heart center.",
    position: { x: 75, y: 67 },
    connections: [7, 6, 5, 3, 1]
  },
  // Sphere 3 - Jha-FA (Physical) - Center
  {
    id: 3,
    name: "Jha-FA",
    dimension: "3D",
    color: "#FFD700", // Yellow
    function: "Physical Matrix - Telluric Shield. Yellow solar plexus foundation.",
    position: { x: 50, y: 79 },
    connections: [6, 5, 4, 2, 1]
  },
  // Sphere 2 - Jha-Da (Etheric) - Left
  {
    id: 2,
    name: "Jha-Da",
    dimension: "2D",
    color: "#FF8C00", // Orange
    function: "Etheric Matrix - Instinctual Mind. Orange sacral center.",
    position: { x: 25, y: 91 },
    connections: [5, 3, 1]
  },
  // Sphere 1 - Jha (Physical) - Right
  {
    id: 1,
    name: "Jha",
    dimension: "1D",
    color: "#DC143C", // Red
    function: "Physical Matrix - Base Consciousness. Red root center.",
    position: { x: 75, y: 91 },
    connections: [4, 3, 2]
  }
];

export const treeGridPaths = [
  // Vertical Pillars
  { from: 11, to: 8, name: 'Left Pillar (Mercy)' },
  { from: 8, to: 5, name: 'Left Pillar (Mercy)' },
  { from: 5, to: 2, name: 'Left Pillar (Mercy)' },

  { from: 10, to: 7, name: 'Right Pillar (Severity)' },
  { from: 7, to: 4, name: 'Right Pillar (Severity)' },
  { from: 4, to: 1, name: 'Right Pillar (Severity)' },

  { from: 12, to: 9, name: 'Central Pillar (Equilibrium)' },
  { from: 9, to: 6, name: 'Central Pillar (Equilibrium)' },
  { from: 6, to: 3, name: 'Central Pillar (Equilibrium)' },

  // Horizontal Connections
  { from: 11, to: 10, name: 'Horizontal 11-10' },
  { from: 8, to: 7, name: 'Horizontal 8-7' },
  { from: 5, to: 4, name: 'Horizontal 5-4' },
  { from: 2, to: 1, name: 'Horizontal 2-1' },

  // Cross Connections (Zig-Zags)
  { from: 12, to: 11, name: 'Path 12-11' },
  { from: 12, to: 10, name: 'Path 12-10' },
  { from: 11, to: 9, name: 'Path 11-9' },
  { from: 10, to: 9, name: 'Path 10-9' },
  { from: 9, to: 8, name: 'Path 9-8' },
  { from: 9, to: 7, name: 'Path 9-7' },
  { from: 8, to: 6, name: 'Path 8-6' },
  { from: 7, to: 6, name: 'Path 7-6' },
  { from: 6, to: 5, name: 'Path 6-5' },
  { from: 6, to: 4, name: 'Path 6-4' },
  { from: 5, to: 3, name: 'Path 5-3' },
  { from: 4, to: 3, name: 'Path 4-3' },
  { from: 3, to: 2, name: 'Path 3-2' },
  { from: 3, to: 1, name: 'Path 3-1' }
];

export const getHovaShieldById = (id: string) => {
  return hovaShields.find(shield => shield.id === id);
};

export const getTreeGridSphereById = (id: number) => {
  return treeGridSpheres.find(sphere => sphere.id === id);
};

export const getShieldByChakras = (chakraIds: number[]) => {
  return hovaShields.find(shield =>
    shield.chakras.every(id => chakraIds.includes(id))
  );
};
