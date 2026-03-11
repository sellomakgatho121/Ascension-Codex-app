import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Search, BookOpen, Atom, Layers, TreePine, Shield, Zap, Eye, Star, Info } from "lucide-react";

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
  pronunciation?: string;
}

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const glossaryTerms: GlossaryTerm[] = [
    {
      id: "12d-shield",
      term: "12D Shield",
      definition: "A protective energy field that connects you to the 12th dimensional frequency. The 12D Shield is a practice of reclaiming one's sovereign energy by surrounding the body with a protective shield in the 12th dimensional frequency of the Christ Consciousness. It helps to deflect negative energies and psychic attacks.",
      category: "protection",
      relatedTerms: ["Christ Consciousness", "Sovereignty", "Psychic Protection"]
    },
    {
      id: "15-chakra-system",
      term: "15-Chakra System",
      definition: "An expanded chakra system that includes the traditional 7 physical chakras plus 8 morphogenetic chakras (8-15). This system is designed to support the ascension process and the integration of higher dimensional frequencies into the human energy field.",
      category: "chakras",
      relatedTerms: ["Physical Chakras", "Morphogenetic Chakras", "Ascension"]
    },
    {
      id: "alpha-omega",
      term: "Alpha-Omega",
      definition: "Represents the beginning and end, the first and last. In the context of ascension, refers to the complete cycle of consciousness evolution from the beginning point of individuated consciousness to the return to Source.",
      category: "consciousness",
      relatedTerms: ["Source", "Consciousness Evolution", "Unity Consciousness"]
    },
    {
      id: "avatar",
      term: "Avatar",
      definition: "The highest aspect of identity that is connected to the God Source. The Avatar identity is our direct connection to the eternal God-self and represents the completed spiritual being that has evolved beyond the necessity of reincarnation.",
      category: "consciousness",
      relatedTerms: ["God Source", "Monad", "Christos"]
    },
    {
      id: "christ-consciousness",
      term: "Christ Consciousness",
      definition: "The unified consciousness of the Cosmic Christ principle, representing unconditional love, compassion, and divine wisdom. It is the consciousness frequency of the Avatar identity and the path of spiritual sovereignty.",
      category: "consciousness",
      relatedTerms: ["Avatar", "Sovereignty", "Unity Consciousness"]
    },
    {
      id: "dimensional-lock-down",
      term: "Dimensional Lock Down",
      definition: "Artificial frequency barriers that prevent access to higher dimensional consciousness and spiritual abilities. These are implants and mind control systems designed to keep humanity in lower consciousness states.",
      category: "control-systems",
      relatedTerms: ["Mind Control", "Frequency Fence", "Implants"]
    },
    {
      id: "dna-activation",
      term: "DNA Activation",
      definition: "The process of activating dormant DNA strands that correspond to higher dimensional consciousness. Humans originally had 12 strands of DNA but have been operating on only 2 strands. DNA activation restores our multidimensional abilities.",
      category: "genetics",
      relatedTerms: ["12-Strand DNA", "Multidimensional", "Consciousness Expansion"]
    },
    {
      id: "energy-signature",
      term: "Energy Signature",
      definition: "The unique vibrational frequency pattern that identifies a being or entity. Every person, place, and thing has a unique energy signature that can be read and identified by those with developed spiritual perception.",
      category: "energy",
      relatedTerms: ["Vibration", "Frequency", "Spiritual Perception"]
    },
    {
      id: "false-ascension-matrix",
      term: "False Ascension Matrix",
      definition: "Artificial ascension programs designed to trap souls in recycled reincarnation loops rather than achieving true spiritual liberation. These programs mimic genuine spiritual advancement but lead to spiritual bondage.",
      category: "control-systems",
      relatedTerms: ["Soul Trap", "Reincarnation", "Spiritual Liberation"]
    },
    {
      id: "galactic-center",
      term: "Galactic Center",
      definition: "The central hub of our galaxy that transmits evolutionary frequencies to support consciousness expansion. The Galactic Center is currently transmitting Krystal frequencies to support planetary and human ascension.",
      category: "cosmic",
      relatedTerms: ["Krystal Frequencies", "Ascension", "Consciousness Expansion"]
    },
    {
      id: "guardian-forces",
      term: "Guardian Forces",
      definition: "Benevolent interdimensional beings dedicated to supporting humanity's spiritual evolution and protecting the natural ascension process. They work to restore the organic consciousness evolution path for humanity.",
      category: "beings",
      relatedTerms: ["Ascension", "Consciousness Evolution", "Protection"]
    },
    {
      id: "hova-bodies",
      term: "Hova Bodies",
      definition: "Five horizontal levels of identity that form the complete auric field structure. The Hova Bodies are: Doradic (dimensions 1-3), Monadic (4-6), Keriac (7-9), Rantic (10-12), and Rishic (13-15). They represent different levels of consciousness and identity.",
      category: "lightbody",
      relatedTerms: ["Auric Field", "Identity Levels", "Consciousness"]
    },
    {
      id: "kathara-grid",
      term: "Kathara Grid",
      definition: "Also known as the 12-Tree Grid, this is the primal structure upon which our universe is built. It is the blueprint for all manifestation and the template for the human lightbody. The Kathara Grid contains 12 spheres representing different dimensions and aspects of creation.",
      category: "sacred-geometry",
      relatedTerms: ["12-Tree Grid", "Lightbody", "Sacred Geometry", "Universal Template"]
    },
    {
      id: "krystal-frequencies",
      term: "Krystal Frequencies",
      definition: "Pure source frequencies that support organic consciousness evolution and DNA activation. These frequencies are transmitted from the Galactic Center and help restore the natural ascension process for humanity.",
      category: "frequency",
      relatedTerms: ["Source Frequencies", "DNA Activation", "Ascension"]
    },
    {
      id: "lightbody",
      term: "Lightbody",
      definition: "The electromagnetic energy field that surrounds and interpenetrates the physical body. The lightbody consists of multiple layers and serves as the vehicle for consciousness evolution and interdimensional travel.",
      category: "lightbody",
      relatedTerms: ["Electromagnetic Field", "Consciousness Evolution", "Multidimensional"]
    },
    {
      id: "morphogenetic-field",
      term: "Morphogenetic Field",
      definition: "The energy blueprint that determines the form and structure of all things. Morphogenetic fields contain the instructional code for how energy organizes into matter and consciousness patterns.",
      category: "energy",
      relatedTerms: ["Blueprint", "Energy Organization", "Consciousness Patterns"]
    },
    {
      id: "negative-alien-agenda",
      term: "Negative Alien Agenda (NAA)",
      definition: "The agenda of regressive extraterrestrial and interdimensional beings to control and harvest human consciousness. The NAA uses various control systems including mind control, frequency fences, and false spiritual teachings to maintain control over humanity.",
      category: "control-systems",
      relatedTerms: ["Mind Control", "Frequency Fence", "Consciousness Harvesting"]
    },
    {
      id: "organic-ascension",
      term: "Organic Ascension",
      definition: "The natural evolutionary process of consciousness expansion that leads to spiritual sovereignty and freedom from reincarnation cycles. Organic ascension follows natural universal laws and leads to genuine spiritual liberation.",
      category: "ascension",
      relatedTerms: ["Spiritual Sovereignty", "Consciousness Evolution", "Liberation"]
    },
    {
      id: "plasma-body",
      term: "Plasma Body",
      definition: "The highest frequency body in the human energy field system, associated with the 12th dimensional frequency. The plasma body is activated through spiritual development and connects us to our Avatar consciousness.",
      category: "lightbody",
      relatedTerms: ["Avatar Consciousness", "12th Dimension", "Lightbody"]
    },
    {
      id: "sovereignty",
      term: "Sovereignty",
      definition: "The state of spiritual self-governance and freedom from external control. Sovereignty involves reclaiming one's divine birthright and operating from one's own inner spiritual authority rather than external manipulation.",
      category: "consciousness",
      relatedTerms: ["Self-Governance", "Divine Birthright", "Inner Authority"]
    },
    {
      id: "stargate",
      term: "Stargate",
      definition: "Interdimensional portals that allow travel between different dimensions and locations in space-time. Stargates are part of the natural galactic network that supports consciousness evolution and interdimensional communication.",
      category: "cosmic",
      relatedTerms: ["Interdimensional", "Portal", "Galactic Network"]
    },
    {
      id: "timeline-wars",
      term: "Timeline Wars",
      definition: "Conflicts occurring across multiple timelines and dimensions for control over humanity's evolutionary path. The timeline wars involve battles between forces supporting organic ascension and those promoting artificial control systems.",
      category: "cosmic",
      relatedTerms: ["Multidimensional", "Organic Ascension", "Control Systems"]
    },
    {
      id: "unity-consciousness",
      term: "Unity Consciousness",
      definition: "The awareness of the interconnectedness of all life and the recognition that all existence is One. Unity consciousness transcends the illusion of separation and represents the goal of spiritual evolution.",
      category: "consciousness",
      relatedTerms: ["Oneness", "Interconnectedness", "Spiritual Evolution"]
    },
    {
      id: "zero-point-field",
      term: "Zero Point Field",
      definition: "The quantum field of infinite potential that underlies all existence. The Zero Point Field is the source of all creation and the field from which all consciousness and matter emerge.",
      category: "physics",
      relatedTerms: ["Quantum Field", "Infinite Potential", "Source Field"]
    }
  ];

  const categories = [
    { id: "all", label: "All Terms", icon: <BookOpen className="w-4 h-4" /> },
    { id: "chakras", label: "Chakras", icon: <Atom className="w-4 h-4" /> },
    { id: "lightbody", label: "Lightbody", icon: <Layers className="w-4 h-4" /> },
    { id: "sacred-geometry", label: "Sacred Geometry", icon: <TreePine className="w-4 h-4" /> },
    { id: "protection", label: "Protection", icon: <Shield className="w-4 h-4" /> },
    { id: "consciousness", label: "Consciousness", icon: <Zap className="w-4 h-4" /> },
    { id: "ascension", label: "Ascension", icon: <Zap className="w-4 h-4" /> },
    { id: "energy", label: "Energy", icon: <Zap className="w-4 h-4" /> },
    { id: "cosmic", label: "Cosmic", icon: <TreePine className="w-4 h-4" /> },
    { id: "control-systems", label: "Control Systems", icon: <Shield className="w-4 h-4" /> },
    { id: "beings", label: "Beings", icon: <Atom className="w-4 h-4" /> },
    { id: "frequency", label: "Frequency", icon: <Zap className="w-4 h-4" /> },
    { id: "genetics", label: "Genetics", icon: <Atom className="w-4 h-4" /> },
    { id: "physics", label: "Physics", icon: <TreePine className="w-4 h-4" /> }
  ];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData?.icon || <BookOpen className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "chakras": "border-red-400/50 text-red-400",
      "lightbody": "border-blue-400/50 text-blue-400",
      "sacred-geometry": "border-purple-400/50 text-purple-400",
      "protection": "border-green-400/50 text-green-400",
      "consciousness": "border-yellow-400/50 text-yellow-400",
      "ascension": "border-pink-400/50 text-pink-400",
      "energy": "border-cyan-400/50 text-cyan-400",
      "cosmic": "border-indigo-400/50 text-indigo-400",
      "control-systems": "border-orange-400/50 text-orange-400",
      "beings": "border-teal-400/50 text-teal-400",
      "frequency": "border-lime-400/50 text-lime-400",
      "genetics": "border-emerald-400/50 text-emerald-400",
      "physics": "border-violet-400/50 text-violet-400"
    };
    return colors[category] || "border-cosmic-400/50 text-cosmic-400";
  };

  const getTermDetails = (termId: string) => {
    switch (termId) {
      case '12d-shield':
        return (
          <div className="space-y-3">
            <p className="text-cosmic-300">
              The 12D Shield is practiced daily by ES students as the foundational protection technique. 
              It creates a stable energy field that allows for safe spiritual work and consciousness expansion.
            </p>
            <div className="border border-cosmic-600 rounded-lg p-3">
              <h5 className="font-semibold text-sacred-gold text-sm mb-2">How to Practice:</h5>
              <ul className="text-xs text-cosmic-300 space-y-1 ml-4">
                <li>• State: "I call upon the Guardian forces serving the One Eternal Light"</li>
                <li>• Visualize platinum light surrounding your body in all directions</li>
                <li>• Declare: "I build my 12D shield in the Christ vibration"</li>
                <li>• Maintain this field throughout spiritual practices</li>
              </ul>
            </div>
          </div>
        );
      case '15-chakra-system':
        return (
          <div className="space-y-3">
            <p className="text-cosmic-300">
              The 15-chakra system is essential for ascension as it includes the morphogenetic chakras 
              that connect us to higher dimensional consciousness and our multidimensional identity.
            </p>
            <div className="border border-cosmic-600 rounded-lg p-3">
              <h5 className="font-semibold text-sacred-gold text-sm mb-2">Chakra Breakdown:</h5>
              <ul className="text-xs text-cosmic-300 space-y-1 ml-4">
                <li>• Chakras 1-7: Physical chakras governing the physical body</li>
                <li>• Chakras 8-15: Morphogenetic chakras for multidimensional access</li>
                <li>• Each chakra corresponds to specific dimensional frequencies</li>
                <li>• All 15 must be cleared and activated for full ascension</li>
              </ul>
            </div>
          </div>
        );
      case 'christ-consciousness':
        return (
          <div className="space-y-3">
            <p className="text-cosmic-300">
              Christ Consciousness represents the unified field of unconditional love and divine wisdom. 
              It is not religious but rather the frequency of spiritual sovereignty and unity consciousness.
            </p>
            <div className="border border-cosmic-600 rounded-lg p-3">
              <h5 className="font-semibold text-sacred-gold text-sm mb-2">Key Characteristics:</h5>
              <ul className="text-xs text-cosmic-300 space-y-1 ml-4">
                <li>• Unconditional love and compassion for all life</li>
                <li>• Unity consciousness that sees all as connected</li>
                <li>• Spiritual sovereignty and self-determination</li>
                <li>• Service to the highest good of all</li>
              </ul>
            </div>
          </div>
        );
      case 'dna-activation':
        return (
          <div className="space-y-3">
            <p className="text-cosmic-300">
              DNA activation restores our original 12-strand template, enabling multidimensional abilities 
              and consciousness that were dormant. This process is central to human ascension.
            </p>
            <div className="border border-cosmic-600 rounded-lg p-3">
              <h5 className="font-semibold text-sacred-gold text-sm mb-2">Activation Process:</h5>
              <ul className="text-xs text-cosmic-300 space-y-1 ml-4">
                <li>• Work with the 12-Tree Grid to activate corresponding DNA strands</li>
                <li>• Clear genetic distortions and implants</li>
                <li>• Integrate higher dimensional frequencies into cellular structure</li>
                <li>• Restore natural spiritual abilities and intuition</li>
              </ul>
            </div>
          </div>
        );
      default:
        return (
          <p className="text-cosmic-300">
            This concept is fundamental to understanding consciousness evolution and spiritual development 
            within the Energetic Synthesis framework. It connects to the broader understanding of 
            multidimensional anatomy and ascension mechanics.
          </p>
        );
    }
  };

  const getRelatedTermDescription = (term: string) => {
    switch (term) {
      case 'Christ Consciousness': return 'The unified consciousness frequency of unconditional love and spiritual sovereignty.';
      case 'Sovereignty': return 'Self-determination and spiritual independence from external control systems.';
      case 'Psychic Protection': return 'Methods for shielding against negative energies and psychic attacks.';
      case 'Physical Chakras': return 'The traditional 7 chakras governing physical body functions and basic consciousness.';
      case 'Morphogenetic Chakras': return 'Chakras 8-15 that connect to higher dimensional consciousness and identity.';
      case 'Ascension': return 'The process of consciousness evolution and dimensional frequency expansion.';
      case 'Source': return 'The original divine creator consciousness from which all existence emanates.';
      case 'Consciousness Evolution': return 'The progressive expansion of awareness through dimensional experiences.';
      case 'Unity Consciousness': return 'Awareness of the interconnectedness and oneness of all existence.';
      case 'God Source': return 'The eternal divine consciousness that is the origin of all creation.';
      case 'Monad': return 'The soul-spirit matrix that holds our eternal divine identity.';
      case 'Christos': return 'The divine blueprint template for humanity\'s original spiritual design.';
      case 'Avatar': return 'The highest aspect of identity connected to the God Source.';
      case 'Mind Control': return 'Artificial systems designed to limit consciousness and spiritual development.';
      case 'Frequency Fence': return 'Energetic barriers that prevent access to higher dimensional awareness.';
      case 'Implants': return 'Artificial devices that interfere with natural spiritual functions.';
      case '12-Strand DNA': return 'The original human genetic template with multidimensional capabilities.';
      case 'Multidimensional': return 'Having access to multiple dimensions of consciousness simultaneously.';
      case 'Consciousness Expansion': return 'The process of increasing awareness and spiritual perception.';
      case 'Vibration': return 'The frequency at which energy oscillates, determining its quality and effects.';
      case 'Frequency': return 'The rate of energetic oscillation that determines dimensional access.';
      case 'Spiritual Perception': return 'The ability to sense and interpret subtle energies and dimensions.';
      case 'Soul Trap': return 'Artificial systems designed to prevent souls from achieving liberation.';
      case 'Reincarnation': return 'The cycle of death and rebirth that souls experience in physical reality.';
      case 'Spiritual Liberation': return 'Freedom from artificial control systems and consciousness limitations.';
      case 'Krystal Frequencies': return 'Organic consciousness frequencies that support natural spiritual evolution.';
      case 'Protection': return 'Methods and practices for maintaining energetic sovereignty and safety.';
      default: return 'An important concept within the Energetic Synthesis teachings and consciousness evolution.';
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full transform rotate-45 sacred-geometry-bg"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
            Spiritual Glossary
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Comprehensive definitions of terms from Lisa Renee's Energetic Synthesis teachings
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-cosmic-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-4 h-4" />
              <Input
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-cosmic-700 border-cosmic-600 text-white placeholder-cosmic-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-sacred-gold text-cosmic-900'
                      : 'bg-cosmic-700 text-cosmic-100 hover:bg-cosmic-600'
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Content */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="grid" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 bg-cosmic-700/50">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTerms.map((term) => (
                  <Card key={term.id} className="sacred-card h-full">
                    <CardHeader>
                      <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center justify-between">
                        <span>{term.term}</span>
                        {getCategoryIcon(term.category)}
                      </CardTitle>
                      <Badge variant="outline" className={getCategoryColor(term.category)}>
                        {term.category.replace('-', ' ')}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-cosmic-100 text-sm leading-relaxed line-clamp-3">
                        {term.definition}
                      </p>
                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div>
                          <p className="text-cosmic-300 text-xs font-semibold mb-2">Related Terms:</p>
                          <div className="flex flex-wrap gap-1">
                            {term.relatedTerms.slice(0, 3).map((relatedTerm, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-cosmic-500/30 text-cosmic-400"
                              >
                                {relatedTerm}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full border-sacred-gold text-sacred-gold hover:bg-sacred-gold hover:text-cosmic-900 mt-3">
                            <Eye className="w-4 h-4 mr-2" />
                            Learn More
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                              {getCategoryIcon(term.category)}
                              <span className="ml-3">{term.term}</span>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 text-cosmic-100">
                            <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                              <p className="text-sacred-gold font-semibold mb-2">{term.term} - Definition</p>
                              <p className="text-sm">{term.definition}</p>
                            </div>

                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Context & Application:</h4>
                              <div className="space-y-3 text-sm">
                                {getTermDetails(term.id)}
                              </div>
                            </div>

                            {term.relatedTerms && term.relatedTerms.length > 0 && (
                              <>
                                <Separator className="bg-cosmic-700" />
                                <div>
                                  <h4 className="text-lg font-sacred text-sacred-silver mb-3">Related Concepts:</h4>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    {term.relatedTerms.map((relatedTerm, index) => (
                                      <div key={index} className="border border-cosmic-600 rounded-lg p-3">
                                        <h5 className="font-semibold text-sacred-gold text-sm">{relatedTerm}</h5>
                                        <p className="text-xs text-cosmic-300 mt-1">
                                          {getRelatedTermDescription(relatedTerm)}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}

                            <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                              <p className="text-xs text-cosmic-300">
                                <strong>Source:</strong> This term is part of the Energetic Synthesis teachings 
                                developed by Lisa Renee. For complete understanding, study the full ES materials 
                                and consider how this concept integrates with your spiritual development journey.
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list">
              <div className="space-y-4">
                {filteredTerms.map((term) => (
                  <Card key={term.id} className="sacred-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getCategoryIcon(term.category)}
                          <h3 className="text-xl font-sacred text-sacred-gold">{term.term}</h3>
                        </div>
                        <Badge variant="outline" className={getCategoryColor(term.category)}>
                          {term.category.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-cosmic-100 leading-relaxed mb-4">
                        {term.definition}
                      </p>
                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div>
                          <p className="text-cosmic-300 text-sm font-semibold mb-2">Related Terms:</p>
                          <div className="flex flex-wrap gap-2">
                            {term.relatedTerms.map((relatedTerm, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-cosmic-500/30 text-cosmic-400"
                              >
                                {relatedTerm}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-cosmic-500 mx-auto mb-4" />
              <h3 className="text-xl font-sacred text-cosmic-300 mb-2">No Terms Found</h3>
              <p className="text-cosmic-100">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}