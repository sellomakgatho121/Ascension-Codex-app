export interface LightbodyLayer {
  id: string;
  name: string;
  description: string;
  function: string;
  ascensionPurpose: string;
  connections: string[];
  practices: string[];
  dimension: string;
  color: string;
  order: number;
}

export const lightbodyLayers: LightbodyLayer[] = [
  {
    id: "etheric",
    name: "Etheric Body",
    description: "The subtle energy matrix directly interwoven with the physical form. It functions as the blueprint for the Central Nervous System (CNS) and organs.",
    function: "Blueprint for physical form and dna. Conducts chi/prana through meridians, feeding life force into the body. The densest lightbody layer and begins the vertical Hara (Pranic Tube) connecting Earth and cosmos.",
    ascensionPurpose: "On ascension it becomes re-crystallized to support higher frequencies in the physical body.",
    connections: ["Physical Body", "Meridian System", "Hara Line", "Nadial Network"],
    practices: ["Etheric Cleansing", "Pranic Breathing", "Meridian Clearing", "Physical Grounding"],
    dimension: "1D-3D",
    color: "hsl(0, 84%, 55%)",
    order: 1
  },
  {
    id: "emotional",
    name: "Emotional (Astral) Body",
    description: "The next layer, associated with feelings, images and desires. This is the realm of dreams, memories and subconscious patterns.",
    function: "Carries emotional imprinting. It interpenetrates the etheric and mental bodies, connecting through the Heart Chakra (green). Overlaps the 4D astral plane and holds our emotional records.",
    ascensionPurpose: "For ascension, this layer must be cleared of trauma and fear; as negative charges are released, the emotional body becomes a vehicle for love and Light (heart-opening).",
    connections: ["Heart Chakra", "4D Astral Plane", "Pain Body", "Subconscious Mind"],
    practices: ["Emotional Clearing", "Heart Opening", "Dream Work", "Trauma Release"],
    dimension: "4D",
    color: "hsl(22, 89%, 52%)",
    order: 2
  },
  {
    id: "mental",
    name: "Mental Body",
    description: "The structure of thoughts and beliefs, woven with 5D–6D content. Functions as the conscious/intuitive mind (lower mental) and archetypal/celestial mind (higher layers).",
    function: "Contains our mental programs and is linked to the 3rd and 5th chakras and upward. Houses the conscious mind and belief systems.",
    ascensionPurpose: "Ascension harmonizes the mental body by uniting left/right brain, merging lower logic with higher insight, and by dissolving lower thought-forms through the Lightbody.",
    connections: ["Solar Plexus", "Throat Chakra", "Archetypal Mind", "Left/Right Brain"],
    practices: ["Mind Clearing", "Thought Transformation", "Brain Integration", "Belief System Clearing"],
    dimension: "5D",
    color: "hsl(48, 89%, 50%)",
    order: 3
  },
  {
    id: "astral",
    name: "Astral Body",
    description: "Sometimes used interchangeably with emotional body in Lisa's work, but one can regard the astral body as the first level of the soul body (Soul matrix).",
    function: "Carries the nascent Soul-Spirit identity (4D), influenced by the 4th chakra and aura. It is essentially the radiant emotional field of the soul.",
    ascensionPurpose: "Bridge between personality and soul consciousness. Must be purified to carry higher soul frequencies.",
    connections: ["Heart Chakra", "Soul Matrix", "4D Consciousness", "Astral Plane"],
    practices: ["Soul Integration", "Astral Clearing", "Soul Star Activation", "Higher Love Cultivation"],
    dimension: "4D",
    color: "hsl(156, 84%, 33%)",
    order: 4
  },
  {
    id: "etheric_template",
    name: "Etheric Template",
    description: "A high blueprint layer that imprints physical form and dna. It contains the silicate matrix codes for the 12-strand DNA.",
    function: "Governs how prana manifests in the body via the Nadial network. The etheric template is 'level 2' of the lightbody, controlling chakras from below the physical layer and linking to 7D (Ketheric) frequencies.",
    ascensionPurpose: "Ascension work includes recalibrating the etheric template with new codes (e.g. nutrient light vs. old physical sustenance).",
    connections: ["12-Strand DNA", "Nadial Network", "Ketheric Body", "Silicate Matrix"],
    practices: ["DNA Activation", "Template Recalibration", "Light Body Nutrition", "Frequency Upgrading"],
    dimension: "7D",
    color: "hsl(217, 91%, 60%)",
    order: 5
  },
  {
    id: "celestial",
    name: "Celestial Body",
    description: "The 6D level (Brow chakra) of consciousness, also called the Celestial Mind. It holds the mind of Spirit (6D) – our intuitive wisdom and archetypal consciousness.",
    function: "Links Heart (soul feeling) with Crown (Christ mind). It hosts the 'two minds' of the soul (astral + celestial merging). Contains archetypal patterns and divine wisdom.",
    ascensionPurpose: "In ascension, the Celestial Body is awakened as we build our wings (via 6th chakra), enabling cosmic imagination and soul unity.",
    connections: ["Third Eye", "Crown Chakra", "Archetypal Mind", "Divine Wisdom"],
    practices: ["Celestial Mind Activation", "Wing Building", "Archetypal Work", "Cosmic Imagination"],
    dimension: "6D",
    color: "hsl(248, 53%, 58%)",
    order: 6
  },
  {
    id: "ketheric",
    name: "Ketheric Body",
    description: "The 7D level (Crown chakra) of consciousness, the Ketheric Mind. It holds pure Divine thought patterns and connects to the Monad.",
    function: "Contains the highest ideas of our identity (oversoul templates) and the still-point beyond thought. Direct connection to monadic consciousness.",
    ascensionPurpose: "Ascension goal: to populate the Ketheric with our inner Christos logic – living in truth beyond time (Christic Mind in action).",
    connections: ["Crown Chakra", "Monad", "Oversoul Templates", "Divine Mind"],
    practices: ["Monadic Integration", "Divine Mind Activation", "Christic Logic", "Oversoul Connection"],
    dimension: "7D",
    color: "hsl(258, 90%, 66%)",
    order: 7
  }
];

export const getLightbodyLayerById = (id: string) => {
  return lightbodyLayers.find(layer => layer.id === id);
};

export const getLightbodyLayersByDimension = (dimension: string) => {
  return lightbodyLayers.filter(layer => layer.dimension.includes(dimension));
};

export const getLightbodyColors = () => {
  return lightbodyLayers.reduce((colors, layer) => {
    colors[layer.id] = layer.color;
    return colors;
  }, {} as Record<string, string>);
};
