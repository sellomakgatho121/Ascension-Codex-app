export interface ChakraData {
  id: number;
  name: string;
  location: string;
  color: string;
  dimension: string;
  function: string;
  description: string;
  ascensionPurpose: string;
  category: 'physical' | 'morphogenetic' | 'avatar';
  element?: string;
  connections: string[];
  practices: string[];
  position: {
    x: number;
    y: number;
  };
}

export const chakraData: ChakraData[] = [
  {
    id: 1,
    name: "Root Chakra",
    location: "Base of Spine",
    color: "#DC143C",
    dimension: "1D",
    function: "Survival & Grounding",
    description: "The survival/physical base. Holds the 1D subconscious 'hard drive' of trauma (Abuse, Shock, Devastation). Governs basic security, grounding, immunity. Its function is to anchor the soul in the body and Earth.",
    ascensionPurpose: "In ascension, the Root's purpose is to clear survival fear and false 'Father' (tyranny) programming. Healing it builds a stable Tree of Life foundation for higher embodiment.",
    category: "physical",
    connections: ["2nd Chakra", "Earth Star", "Doradic Shield"],
    practices: ["Root Grounding Meditation", "Earth Connection Visualization", "Survival Fear Clearing"],
    position: { x: 50, y: 56 }
  },
  {
    id: 2,
    name: "Sacral Chakra",
    location: "Lower Abdomen",
    color: "#FF8C00",
    dimension: "2D",
    function: "Emotion & Creativity",
    description: "The emotional/desire center. Rules abundance, sexuality, creative instincts and the 'Pain Body' of stored emotional trauma. Unresolved wounds here fuel addictions and power imbalances.",
    ascensionPurpose: "In ascension it must be cleansed of victim-patterns and false empowering, restoring healthy flow of joy and creativity.",
    category: "physical",
    connections: ["5th Chakra", "Instinctual Mind", "Pain Body"],
    practices: ["Emotional Clearing", "Creative Flow Meditation", "Victim Pattern Release"],
    position: { x: 50, y: 50 }
  },
  {
    id: 3,
    name: "Solar Plexus Chakra",
    location: "Upper Abdomen",
    color: "#FFD700",
    dimension: "3D",
    function: "Power & Identity",
    description: "The power/identity center. Governs will, ego, digestion and personal power. Serves as the 'conscious mind' of the ego (organizing the 1st‑3rd chakra layers).",
    ascensionPurpose: "In ascension the 3rd chakra's role is to catalyze the integration of ego with Soul: as the Triad of identity dissolves, it becomes the bridge for higher Soul impulses.",
    category: "physical",
    connections: ["Heart Chakra", "Mental Body", "Ego Structure"],
    practices: ["Personal Power Reclamation", "Ego-Soul Integration", "Will Alignment"],
    position: { x: 50, y: 44 }
  },
  {
    id: 4,
    name: "Heart Chakra",
    location: "Center Chest",
    color: "#32CD32",
    dimension: "4D",
    function: "Soul Union",
    description: "The soul union center. In Lisa's system, the 4th is often called the Astral Heart (4D) of unconditional love. It transmits the 4D green ray and is the seat of Soul-Spirit integration.",
    ascensionPurpose: "On the ascension path, the Heart chakra must expand into the 'Sacred Crystal Heart' – shifting from green to a deeper spiritual blue-green and finally turquoise/pink flame as Soul and Monad integrate.",
    category: "physical",
    connections: ["Solar Plexus", "Throat Chakra", "Higher Heart", "Soul Matrix"],
    practices: ["Heart Opening Meditation", "Compassion Cultivation", "Sacred Crystal Heart Activation"],
    position: { x: 50, y: 38 }
  },
  {
    id: 5,
    name: "Throat Chakra",
    location: "Throat",
    color: "#1E90FF",
    dimension: "5D",
    function: "Expression & Truth",
    description: "The expression/communication center. Governs speech, integrity, and manifestation. It is our 'voice' of truth and creative will. Connected to 2nd chakra (male/female polarity).",
    ascensionPurpose: "Ascension purpose: to speak one's truth aligned with soul will, dissolving lies, doubt, and false programming. Clear honest expression builds trust and invites higher guidance.",
    category: "physical",
    connections: ["2nd Chakra", "Third Eye", "Archetypal Mind", "Doradic Shield"],
    practices: ["Truth Speaking", "Sound Healing", "Integrity Alignment"],
    position: { x: 50, y: 30 }
  },
  {
    id: 6,
    name: "Third Eye Chakra",
    location: "Brow",
    color: "#6A0DAD",
    dimension: "6D",
    function: "Intuition & Vision",
    description: "The intuition/vision center. Governed by the 6D indigo ray (connecting pituitary to 6D Celestial mind). Functions: insight, psychic vision, spiritual perception.",
    ascensionPurpose: "Ascension role: to open to true clairvoyance by removing the 'pineal cage' implants and merging indigo/ultraviolet energies (the Hieros Gamos or inner union).",
    category: "physical",
    connections: ["Crown Chakra", "Celestial Body", "Mother Arc", "Telluric Shield"],
    practices: ["Third Eye Activation", "Pineal Decalcification", "Clairvoyance Development"],
    position: { x: 50, y: 24 }
  },
  {
    id: 7,
    name: "Crown Chakra",
    location: "Top of Head",
    color: "#9370DB",
    dimension: "7D",
    function: "Spiritual Connection",
    description: "The spiritual connection center (7D). Associated with the violet-ultraviolet ray, linking to higher mind and the Avatar (9D+). It interacts with the 6th to form the Crown matrix.",
    ascensionPurpose: "In ascension, opening the Crown chakra allows constant reception from higher self (Monad/Avatar) and release from 3D limitation.",
    category: "physical",
    connections: ["Third Eye", "Higher Heart", "Avatar", "Teuric Shield"],
    practices: ["Crown Activation", "Divine Connection", "Avatar Integration"],
    position: { x: 50, y: 20 }
  },
  {
    id: 8,
    name: "Higher Heart Chakra",
    location: "Thymus (Upper Chest)",
    color: "Gold",
    dimension: "8D",
    function: "Monad Gateway",
    description: "The higher heart/monad gateway. Located at the thymus (upper chest), it is often called the Soul Seal or Blue Heart. This 8D chakra is the seat of the Permanent Seed Atom and the Inner Holy Spirit (Amoraea) flame.",
    ascensionPurpose: "At ascension, the 8th activates the Permanent Seed Atom, which links the personal soul triangle (4D-6D) to the Oversoul/Monad via the 9th chakra orbit.",
    category: "morphogenetic",
    connections: ["Heart Chakra", "Atomic Doorway", "Permanent Seed Atom", "Teuric Shield"],
    practices: ["Higher Heart Activation", "Monadic Integration", "Holy Spirit Flame"],
    position: { x: 50, y: 34 }
  },
  {
    id: 9,
    name: "Atomic Doorway",
    location: "Back of Head (Medulla)",
    color: "Silver",
    dimension: "9D",
    function: "Oversoul Entry",
    description: "The oversoul entry point (9D). Called the Atomic Doorway, it is the ascending portal between Soul matrix (8th) and Monad (9D). It lies at the back of the skull (medulla area).",
    ascensionPurpose: "Ascension role: to open the 'horizontal' photon band that triggers the oversoul connection. Activation creates a micro-gyroscope with the 8th, aligning personal Kundalini with galactic Kundalini.",
    category: "morphogenetic",
    connections: ["Higher Heart", "Solar Star", "Oversoul", "Galactic Kundalini"],
    practices: ["Oversoul Integration", "Kundalini Activation", "Galactic Connection"],
    position: { x: 50, y: 27 }
  },
  {
    id: 10,
    name: "Solar Star Chakra",
    location: "6 inches above Head",
    color: "Blue-Black",
    dimension: "10D",
    function: "Avatar Connection",
    description: "The Avatar connection hub. This portal (10D) is above the head, linking to the Solar Star/Son. Functions as the primary communication node for the Avatar-Christ consciousness.",
    ascensionPurpose: "In ascension it activates direct cellular cognition: one can 'phone home' to the Avatar Christ (Krystal Star Self). It absorbs the 12D Ray via a triangle circuit with the 11th/12th chakras.",
    category: "avatar",
    connections: ["Atomic Doorway", "Galactic Chakra", "Earth Star", "Maharata Body"],
    practices: ["Avatar Integration", "Krystal Star Connection", "12D Ray Absorption"],
    position: { x: 50, y: 15 }
  },
  {
    id: 11,
    name: "Galactic Chakra",
    location: "18 inches above Head",
    color: "Silver-Black",
    dimension: "11D",
    function: "Buddhic Mind Shield",
    description: "The Buddhic mind shield (11D). Color: dark silver/black. It forms part of the Maharata horizontal triad (with 12th, 10th) holding the Galactic thrice-fold field.",
    ascensionPurpose: "At an advanced hierogamic stage, the 11th chakra descends into the body to replace the 5th chakra, merging with the 8th, and carrying the Emerald (Holy Father) and Aquamarine (Holy Mother) lines for final unity.",
    category: "avatar",
    connections: ["Solar Star", "Earth Star", "Maharata Shield", "Hieros Gamos"],
    practices: ["Buddhic Mind Integration", "Hieros Gamos", "Sacred Marriage"],
    position: { x: 50, y: 10 }
  },
  {
    id: 12,
    name: "Earth Star Chakra",
    location: "6 inches below Feet",
    color: "White",
    dimension: "12D",
    function: "Earth Connection",
    description: "The Earth connector (12D). Color: white. Located below the feet, it anchors the 12D Christ mind into the planet's crystalline core. It contains the Platinum Ray blueprint of the Avatar.",
    ascensionPurpose: "On ascension it connects the physical human to the Earth Logos and the 12D Ray, igniting the GSF Flame in the horizontal Maharata body. Activation of the 12D Shield begins the clearing of polarizing timelines.",
    category: "avatar",
    connections: ["Root Chakra", "Earth Core", "12D Shield", "Crystalline Core"],
    practices: ["12D Shield Activation", "Earth Logos Connection", "Timeline Clearing"],
    position: { x: 50, y: 93 }
  },
  {
    id: 13,
    name: "Earth Core Chakra",
    location: "12 inches below Feet",
    color: "Pale Turquoise",
    dimension: "13D",
    function: "Mother Arc Gateway",
    description: "The Mother Arc gateway (Earth Core Chakra). Color: pale turquoise. Lies deeper into the Earth's core, linking to Universal Mother/Gaia. It can only activate after the 12D Shield is in place.",
    ascensionPurpose: "In ascension, the 13th's role is to reunite the Cosmic Mother flame: ascension vision and guidance descend from the Mother Arc, enabling Holy Mother embodiment and the final Earth re-calibration.",
    category: "avatar",
    connections: ["Earth Star", "Universal Father", "Mother Arc", "Gaia"],
    practices: ["Mother Arc Activation", "Cosmic Mother Integration", "Earth Re-calibration"],
    position: { x: 50, y: 96 }
  },
  {
    id: 14,
    name: "Universal Sun Chakra",
    location: "3 feet above Head",
    color: "Pale Yellow",
    dimension: "14D",
    function: "Solar Logos",
    description: "The Sun-Father column top (founder's Gold Ray). Color: pale yellow. It forms the upper lid of the 12D Shield and connects to the Cosmic Sun/Founder Ray.",
    ascensionPurpose: "In ascension it unifies all higher chakra columns (8–15) into one golden column, uniting male/female rays, and completing the solar logos field within us.",
    category: "avatar",
    connections: ["Crown Chakra", "Universal Father", "Cosmic Sun", "Founder Ray"],
    practices: ["Solar Logos Integration", "Golden Column Activation", "Founder Ray Connection"],
    position: { x: 50, y: 5 }
  },
  {
    id: 15,
    name: "Universal Father Chakra",
    location: "Below Earth Plane",
    color: "Pale Magenta-Pink",
    dimension: "15D",
    function: "Core Father Pillar",
    description: "The Core Father pillar (15D). Color: pale magenta-pink. It exists below the feet/earth plane, linking to the Universal Father Ray. It forms the bottom of the cosmic column.",
    ascensionPurpose: "Its purpose is to elevate the individual out of the 1D–3D spectrum (protecting from lower densities) and to complete the Christos (Father) activation cycle.",
    category: "avatar",
    connections: ["Root Chakra", "Earth Core", "Universal Sun", "Father Ray"],
    practices: ["Father Ray Integration", "Christos Activation", "Dimensional Protection"],
    position: { x: 50, y: 99 }
  }
];

export const getChakrasByCategory = (category: ChakraData['category']) => {
  return chakraData.filter(chakra => chakra.category === category);
};

export const getChakraById = (id: number) => {
  return chakraData.find(chakra => chakra.id === id);
};

export const getChakraColors = () => {
  // Colors strictly based on the 15-Dimensional Time Matrix wave spectrum (Ascension Glossary / ES)
  return {
    1: "#DC143C",              // Root - Red (1D)
    2: "#FF8C00",              // Sacral - Orange (2D)
    3: "#FFD700",              // Solar Plexus - Yellow (3D)
    4: "#32CD32",              // Heart - Green (4D)
    5: "#1E90FF",              // Throat - Blue (5D)
    6: "#4B0082",              // Third Eye - Indigo (6D)
    7: "#9370DB",              // Crown - Violet (7D)
    8: "#FFD700",              // Higher Heart / Monad - Gold (8D)
    9: "#C0C0C0",              // Atomic Doorway - Silver (9D)
    10: "#00008B",             // Solar Star - Blue-Black (10D)
    11: "#2F4F4F",             // Galactic - Silver-Black (11D)
    12: "#FFFFFF",             // Earth Star - White (12D)
    13: "#AFEEEE",             // Earth Core - Pale Turquoise (13D)
    14: "#FFFACD",             // Universal Sun - Pale Yellow (14D)
    15: "#FF99CC"              // Universal Father - Pale Magenta-Pink (15D)
  };
};
