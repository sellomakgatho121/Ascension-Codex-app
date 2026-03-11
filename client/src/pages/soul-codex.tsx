import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Zap, 
  Star, 
  Eye, 
  Crown, 
  Heart, 
  Flame,
  Diamond,
  Sun,
  Moon,
  Sparkles,
  CircleDot,
  Triangle,
  Hexagon
} from "lucide-react";

interface CodexSection {
  id: string;
  title: string;
  description: string;
  category: 'foundation' | 'anatomy' | 'stages' | 'tools' | 'advanced';
  icon: React.ReactNode;
  content: {
    overview: string;
    keyPoints: string[];
    practices: string[];
    symptoms?: string[];
    prompts?: string[];
  };
}

export default function SoulCodexPage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const codexSections: CodexSection[] = [
    {
      id: "walking-stargate",
      title: "Walking Stargate Mastery",
      description: "Advanced understanding of becoming a living portal to anchor Source light and transmute planetary grids",
      category: "foundation",
      icon: <Star className="w-5 h-5" />,
      content: {
        overview: "The ultimate purpose of ascension is to become a 'walking stargate' - a living portal that can anchor Source light directly into the planetary grids for healing and transformation. This goes beyond personal evolution to planetary service.",
        keyPoints: [
          "Body becomes a living stargate portal",
          "Direct Source light anchoring capability", 
          "Planetary grid transmission and healing",
          "Conscious reality creation through embodied frequency",
          "Timeline splitting awareness and navigation"
        ],
        practices: [
          "Stargate activation meditation",
          "Planetary grid connection visualization",
          "Source light anchoring breathwork",
          "Timeline consciousness expansion exercises"
        ],
        prompts: [
          "How do you sense your connection to planetary grids?",
          "What happens when you consciously anchor light?",
          "Which timelines feel most aligned with your soul purpose?"
        ]
      }
    },
    {
      id: "ra-center",
      title: "RA Center Solar Hub",
      description: "The solar hub of your soul's alignment with cosmic timelines - advanced RA Center activation techniques",
      category: "anatomy", 
      icon: <Sun className="w-5 h-5" />,
      content: {
        overview: "The RA Center is the solar hub located at the navel/solar plexus that serves as your soul's alignment point with cosmic timelines. This is distinct from the traditional solar plexus chakra and functions as a plasma light generator.",
        keyPoints: [
          "Located at navel - distinct from solar plexus chakra",
          "Soul's alignment point with cosmic timelines", 
          "Plasma light generation center",
          "Counterclockwise spinning activates plasma rivers",
          "Golden sphere visualization for ignition"
        ],
        practices: [
          "Golden Sphere RA Ignition protocol",
          "Plasma river activation meditation",
          "Solar timeline alignment practices",
          "RA Center chanting (3 times 'RA')"
        ],
        symptoms: [
          "Solar warmth and pulsing at navel",
          "Golden light sensations in abdomen",
          "Timeline shift awareness",
          "Increased solar sensitivity"
        ],
        prompts: [
          "What emotions arise during RA Center activation?",
          "How do you experience plasma rivers in your body?",
          "What timeline shifts do you notice?"
        ]
      }
    },
    {
      id: "timeline-mastery",
      title: "Timeline Collapse & Navigation",
      description: "Advanced consciousness techniques for timeline splitting awareness and reality navigation",
      category: "stages",
      icon: <Triangle className="w-5 h-5" />,
      content: {
        overview: "Timeline consciousness involves the ability to perceive and navigate multiple probability timelines. This includes timeline collapse, void passage, and conscious reality selection through frequency alignment.",
        keyPoints: [
          "Timeline Collapse → Void Passage → Gold Net Retrieval",
          "Conscious reality navigation through frequency",
          "Probability timeline perception and selection",
          "Cellular memory rewrite during timeline shifts",
          "Dark Night of the Soul as timeline bifurcation"
        ],
        practices: [
          "Timeline meditation and observation",
          "Void passage breathing techniques", 
          "Gold Net retrieval visualization",
          "Reality anchor point establishment"
        ],
        symptoms: [
          "Time distortion experiences",
          "Déjà vu and timeline bleed-through",
          "Reality shift sensations",
          "Sudden life direction changes"
        ],
        prompts: [
          "What part of your past feels like a shadow to release?",
          "Which timeline feels most aligned with your highest purpose?",
          "How do you experience time differently during meditation?"
        ]
      }
    },
    {
      id: "plasma-recoding",
      title: "Plasma Light Recoding",
      description: "The fifth element dancing between your cells - advanced plasma consciousness integration",
      category: "advanced",
      icon: <Zap className="w-5 h-5" />,
      content: {
        overview: "Plasma light is the fifth element that exists between your cells, carrying consciousness codes for DNA activation and cellular upgrade. It represents the bridge between matter and consciousness.",
        keyPoints: [
          "Fifth element existing between cellular structure",
          "Consciousness codes carried in plasma frequencies",
          "DNA strand activation through plasma integration",
          "Cellular bioluminescence as plasma embodiment",
          "Bridge between matter and pure consciousness"
        ],
        practices: [
          "Plasma breathing and circulation",
          "Cellular light activation meditation",
          "Fifth element integration work",
          "Bioluminescence visualization"
        ],
        symptoms: [
          "Cellular tingling and vibration",
          "Light sensations within body",
          "Enhanced energy sensitivity",
          "Spontaneous healing experiences"
        ],
        prompts: [
          "How do you experience light within your cells?",
          "What changes when you work with plasma consciousness?",
          "Where do you feel the fifth element most strongly?"
        ]
      }
    },
    {
      id: "sovereign-will",
      title: "Sovereign Will Mastery",
      description: "Self-determination and spiritual independence from external control systems through conscious choice",
      category: "foundation",
      icon: <Crown className="w-5 h-5" />,
      content: {
        overview: "Sovereign Will represents your divine right to self-determination and spiritual independence. It's the conscious choice to align with your highest self rather than external control systems or programming.",
        keyPoints: [
          "Divine right to self-determination",
          "Spiritual independence from control systems",
          "Conscious choice alignment with highest self",
          "Freedom from external manipulation",
          "Authority over your own consciousness"
        ],
        practices: [
          "Daily sovereignty declarations",
          "Boundary setting meditations",
          "Free will affirmations",
          "Personal authority activations"
        ],
        prompts: [
          "Where do you give your power away?",
          "How do you maintain spiritual independence?",
          "What would change if you fully owned your sovereignty?"
        ]
      }
    },
    {
      id: "bio-neurological",
      title: "Bio-Neurological Expansion",
      description: "Pineal Arc antenna for Sirius B frequencies and photoconductive neural upgrades",
      category: "advanced",
      icon: <Eye className="w-5 h-5" />,
      content: {
        overview: "Advanced neurological upgrades include pineal gland enhancement for receiving Sirius B frequencies and myelin sheath becoming photoconductive for enhanced consciousness transmission.",
        keyPoints: [
          "Pineal Arc as Sirius B photonic wave antenna",
          "Myelin sheath photoconductive upgrade",
          "Neural pathway consciousness enhancement",
          "Quantum tunneling organ activation"
        ],
        practices: [
          "30-minute darkness meditation for pineal activation",
          "Sirius B frequency attunement",
          "Neural pathway light visualization",
          "Quantum consciousness expansion work"
        ],
        symptoms: [
          "Visions during darkness meditation",
          "Sudden clarity and downloads",
          "Enhanced multidimensional perception",
          "Specific body regions feeling energetically alive"
        ],
        prompts: [
          "What visions arise in complete darkness?",
          "Which parts of your body feel most energetically active?",
          "How has your perception of reality shifted?"
        ]
      }
    },
    {
      id: "golden-sphere-protocol",
      title: "Golden Sphere RA Ignition Protocol",
      description: "Precise meditation technique for plasma river activation and Sophia's violet flame sealing",
      category: "tools",
      icon: <Sun className="w-5 h-5" />,
      content: {
        overview: "This specific meditation protocol activates the RA Center to ignite plasma rivers throughout your energy system, creating a complete circuit sealed with Sophia's violet flame from the heart center.",
        keyPoints: [
          "3-breath golden light navel visualization",
          "Counterclockwise sphere spinning activation",
          "Plasma river circulation throughout body",
          "Violet flame sealing from heart chakra",
          "Complete energy circuit establishment"
        ],
        practices: [
          "Step 1: 3 breaths of golden light at navel center",
          "Step 2: Visualize spinning sphere counterclockwise",
          "Step 3: Feel plasma rivers flowing through body",
          "Step 4: Seal entire system with violet flame from heart"
        ],
        symptoms: [
          "Solar warmth spreading from navel",
          "Energy circulation sensations",
          "Heart expansion with violet light",
          "Complete body energy integration"
        ],
        prompts: [
          "What emotions arise during the RA activation?",
          "How do you experience the plasma river flow?",
          "What shifts when you seal with violet flame?"
        ]
      }
    },
    {
      id: "shadow-alchemy",
      title: "Shadow Work Alchemy",
      description: "Advanced techniques for transmuting fear and anger through RA Center solar fire",
      category: "tools",
      icon: <Flame className="w-5 h-5" />,
      content: {
        overview: "Shadow work alchemy uses specific techniques to transmute lower vibrational emotions like fear and anger through conscious integration and RA Center solar fire activation.",
        keyPoints: [
          "Fear traced to past-life fragments using gold net",
          "Anger transmuted through RA Center solar fire",
          "Written release through fire ceremony",
          "Solar chanting for emotional clearing",
          "Conscious shadow integration rather than suppression"
        ],
        practices: [
          "Gold Net past-life fragment retrieval for fears",
          "RA Center solar fire activation for anger",
          "Write fears/anger on paper and burn in candle flame",
          "Place hands on RA Center and chant 'RA' three times",
          "Conscious integration and acceptance work"
        ],
        symptoms: [
          "Emotional releases during practices",
          "Solar warmth during anger clearing",
          "Past-life memory surfacing",
          "Increased emotional equilibrium"
        ],
        prompts: [
          "What fears trace back to past experiences?",
          "How does anger transform when you use solar fire?",
          "What shadows are ready for loving integration?"
        ]
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Sections', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'foundation', label: 'Foundation', icon: <Star className="w-4 h-4" /> },
    { id: 'anatomy', label: 'Energy Anatomy', icon: <CircleDot className="w-4 h-4" /> },
    { id: 'stages', label: 'Ascension Stages', icon: <Triangle className="w-4 h-4" /> },
    { id: 'tools', label: 'Practical Tools', icon: <Sun className="w-4 h-4" /> },
    { id: 'advanced', label: 'Advanced', icon: <Diamond className="w-4 h-4" /> }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSections = selectedCategory === 'all' 
    ? codexSections 
    : codexSections.filter(section => section.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      foundation: 'border-sacred-gold/50 text-sacred-gold',
      anatomy: 'border-purple-400/50 text-purple-400',
      stages: 'border-blue-400/50 text-blue-400',
      tools: 'border-orange-400/50 text-orange-400',
      advanced: 'border-red-400/50 text-red-400'
    };
    return colors[category as keyof typeof colors] || 'border-cosmic-400/50 text-cosmic-400';
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full transform rotate-45 sacred-geometry-bg"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
          <div className="absolute top-1/2 left-3/4 w-16 h-16 border-2 border-sacred-gold transform rotate-12"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
            The Soul Codex
          </h1>
          <h2 className="text-2xl md:text-3xl mb-4 text-sacred-silver">
            Ascension Mastery Guide
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Advanced teachings for multidimensional consciousness evolution and Lightbody activation
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Badge className="bg-sacred-gold/20 text-sacred-gold border-sacred-gold/30">
              Mystic Indigo (Cosmic Truth)
            </Badge>
            <Badge className="bg-sacred-gold/20 text-sacred-gold border-sacred-gold/30">
              Gold (Christos Light)
            </Badge>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-cosmic-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
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
      </section>

      {/* Core Insight */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Card className="sacred-card max-w-4xl mx-auto mb-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-sacred text-sacred-gold mb-4">Core Insight</h3>
              <blockquote className="text-xl text-cosmic-100 italic leading-relaxed">
                "Ascension is the art of becoming a <strong className="text-sacred-gold">walking stargate</strong>—where your body anchors Source light to transmute planetary grids."
              </blockquote>
              <p className="text-sm text-cosmic-300 mt-4">
                "You are the alchemist, the blueprint, and the ascension flame."
              </p>
            </CardContent>
          </Card>

          {/* Codex Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSections.map((section) => (
              <Card key={section.id} className="sacred-card h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center justify-between">
                    <div className="flex items-center">
                      {section.icon}
                      <span className="ml-2">{section.title}</span>
                    </div>
                  </CardTitle>
                  <Badge variant="outline" className={getCategoryColor(section.category)}>
                    {section.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-cosmic-100 text-sm leading-relaxed line-clamp-3">
                    {section.description}
                  </p>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-sacred-gold text-sacred-gold hover:bg-sacred-gold hover:text-cosmic-900"
                        onClick={() => setSelectedSection(section.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Explore Section
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" aria-describedby="soul-codex-description">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                          {section.icon}
                          <span className="ml-3">{section.title}</span>
                        </DialogTitle>
                        <div className="sr-only">
                          <p id="soul-codex-description">Advanced spiritual teachings and practices for consciousness evolution</p>
                        </div>
                      </DialogHeader>
                      <div className="space-y-6 text-cosmic-100">
                        <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                          <p className="text-sacred-gold font-semibold mb-2">Overview</p>
                          <p className="text-sm">{section.content.overview}</p>
                        </div>

                        <div>
                          <h4 className="text-lg font-sacred text-sacred-silver mb-3">Key Points:</h4>
                          <ul className="space-y-2 text-sm">
                            {section.content.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start">
                                <Sparkles className="w-4 h-4 text-sacred-gold mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-cosmic-300">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Separator className="bg-cosmic-700" />

                        <div>
                          <h4 className="text-lg font-sacred text-sacred-silver mb-3">Practices:</h4>
                          <div className="space-y-3">
                            {section.content.practices.map((practice, index) => (
                              <div key={index} className="border border-cosmic-600 rounded-lg p-3">
                                <p className="text-sm text-cosmic-300">{practice}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {section.content.symptoms && (
                          <>
                            <Separator className="bg-cosmic-700" />
                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Activation Symptoms:</h4>
                              <ul className="space-y-2 text-sm">
                                {section.content.symptoms.map((symptom, index) => (
                                  <li key={index} className="flex items-start">
                                    <Zap className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-cosmic-300">{symptom}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}

                        {section.content.prompts && (
                          <>
                            <Separator className="bg-cosmic-700" />
                            <div>
                              <h4 className="text-lg font-sacred text-sacred-silver mb-3">Self-Discovery Prompts:</h4>
                              <div className="space-y-3">
                                {section.content.prompts.map((prompt, index) => (
                                  <div key={index} className="bg-cosmic-800/30 rounded-lg p-3 border-l-4 border-sacred-gold">
                                    <p className="text-sm text-cosmic-300 italic">{prompt}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                          <p className="text-xs text-cosmic-300">
                            <strong>Note:</strong> This content is part of the Soul Codex: Ascension Mastery Guide. 
                            Use as an interactive grimoire - annotate with gold ink as your journey unfolds. 
                            Each teaching builds upon previous understanding and practical application.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Grimoire Section */}
      <section className="py-16 bg-cosmic-800">
        <div className="container mx-auto px-4">
          <Card className="sacred-card max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-sacred text-sacred-gold text-center">
                Interactive Grimoire Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-cosmic-100 mb-4">
                  This Codex is designed as an <strong className="text-sacred-gold">interactive grimoire</strong>. 
                  Track your spiritual progress and insights as you apply these teachings.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-sacred text-sacred-silver">Annotation Guidelines:</h4>
                  <ul className="space-y-2 text-sm text-cosmic-300">
                    <li>• Use gold ink to track progress and insights</li>
                    <li>• Add personal reflections with sticky notes</li>
                    <li>• Document activation symptoms and experiences</li>
                    <li>• Record meditation visions and downloads</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-sacred text-sacred-silver">Key Reflection Questions:</h4>
                  <ul className="space-y-2 text-sm text-cosmic-300">
                    <li>• What part of you resists change?</li>
                    <li>• When do you feel most "whole"?</li>
                    <li>• What symbols recur in your dreams?</li>
                    <li>• How has your perception of time shifted?</li>
                  </ul>
                </div>
              </div>

              <Separator className="bg-cosmic-700" />

              <div className="text-center">
                <h4 className="text-lg font-sacred text-sacred-silver mb-4">Cosmic Alignment Dates</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-cosmic-700/30 rounded-lg p-4">
                    <h5 className="font-semibold text-sacred-gold">2024 Alignments</h5>
                    <p className="text-sm text-cosmic-300">Full Moon April 8 - Alignment with Lyra</p>
                  </div>
                  <div className="bg-cosmic-700/30 rounded-lg p-4">
                    <h5 className="font-semibold text-sacred-gold">2025 Alignments</h5>
                    <p className="text-sm text-cosmic-300">Solar Eclipse March 14 - Karmic Clearing</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}