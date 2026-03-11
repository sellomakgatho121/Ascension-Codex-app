import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Home,
  Eye,
  Zap,
  Shield,
  TreePine,
  Heart,
  TrendingUp,
  Search,
  Bot,
  Wrench,
  Book,
  MessageSquare,
  Sparkles,
  Users,
  Globe,
  Navigation as NavigationIcon,
  ChevronDown,
  ChevronUp,
  Dna
} from "lucide-react";
import { ThreeFoldFlameLogo } from "@/components/three-fold-flame-logo";
import { useMobileOptimizations } from "@/hooks/use-mobile-optimizations";

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  category: 'spiritual' | 'tools' | 'learning' | 'community';
}

const navigationItems: NavigationItem[] = [
  { href: "/", label: "Home", icon: <Home className="w-5 h-5" />, category: 'spiritual' },
  { href: "/chakras", label: "15 Chakras", icon: <Eye className="w-5 h-5" />, category: 'spiritual' },
  { href: "/lightbody", label: "Lightbody", icon: <Zap className="w-5 h-5" />, category: 'spiritual' },
  { href: "/hova-bodies", label: "Hova Bodies", icon: <Shield className="w-5 h-5" />, category: 'spiritual' },
  { href: "/tree-grid", label: "12-Tree Grid", icon: <TreePine className="w-5 h-5" />, category: 'spiritual' },
  { href: "/dna-visualization", label: "DNA Studio", icon: <Dna className="w-5 h-5" />, badge: "New", category: 'tools' },
  { href: "/meditation", label: "Meditation", icon: <Heart className="w-5 h-5" />, category: 'tools' },
  { href: "/enhanced-tools", label: "Spiritual Tools", icon: <Wrench className="w-5 h-5" />, badge: "Enhanced", category: 'tools' },
  { href: "/progress", label: "Progress", icon: <TrendingUp className="w-5 h-5" />, category: 'tools' },
  { href: "/vers", label: "VERS AI", icon: <Bot className="w-5 h-5" />, badge: "AI", category: 'tools' },
  { href: "/vers-whisper-live", label: "VERS WhisperLive", icon: <Wrench className="w-5 h-5" />, badge: "Live", category: 'tools' },
  { href: "/knowledge-base", label: "Knowledge", icon: <Book className="w-5 h-5" />, category: 'learning' },
  { href: "/gsf", label: "GSF Foundation", icon: <Sparkles className="w-5 h-5" />, category: 'learning' },
  { href: "/psychic-self-defense", label: "Psychic Defense", icon: <Shield className="w-5 h-5" />, category: 'learning' },
  { href: "/beings-entities", label: "Beings & Entities", icon: <Users className="w-5 h-5" />, category: 'learning' },
  { href: "/universal-time-matrix", label: "Time Matrix", icon: <Globe className="w-5 h-5" />, category: 'learning' },
  { href: "/visual-diagrams", label: "Visual Diagrams", icon: <TreePine className="w-5 h-5" />, category: 'learning' },

  { href: "/community", label: "Community", icon: <MessageSquare className="w-5 h-5" />, category: 'community' },
];

const categoryLabels = {
  spiritual: 'Spiritual Systems',
  tools: 'Practice Tools',
  learning: 'Knowledge Base',
  community: 'Community'
};

const categoryIcons = {
  spiritual: <Sparkles className="w-4 h-4" />,
  tools: <Wrench className="w-4 h-4" />,
  learning: <Book className="w-4 h-4" />,
  community: <Users className="w-4 h-4" />
};

export function MobileNavigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['spiritual']));
  const { viewport, touchDevice, adaptiveLoading } = useMobileOptimizations();

  // Group navigation items by category
  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  // Enhanced touch feedback for mobile
  const getTouchClasses = () => {
    if (touchDevice.isTouch) {
      return "touch-feedback active:scale-95 transition-transform";
    }
    return "hover:bg-cosmic-700/50 transition-colors";
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-cosmic-800/95 backdrop-blur-md border-b border-sacred-gold/20 sticky top-0 z-50 safe-area-padding">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <div className="flex items-center space-x-2 group">
              <ThreeFoldFlameLogo
                size={28}
                animated={!adaptiveLoading.shouldReduceQuality}
                className="group-active:scale-110 transition-transform"
              />
              <div className="flex flex-col">
                <h1 className="text-lg font-sacred font-bold text-sacred-gold">
                  Ascension Codex
                </h1>
                <span className="text-xs text-cosmic-300 font-light">
                  Divine Blueprint
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            {/* Quick Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`text-sacred-gold touch-target ${getTouchClasses()}`}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Menu Toggle */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-sacred-gold touch-target ${getTouchClasses()}`}
                  aria-label="Navigation menu"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-80 bg-cosmic-900 border-sacred-gold/20 p-0 mobile-modal-content"
              >
                {/* Header */}
                <div className="p-4 border-b border-cosmic-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-sacred text-sacred-gold">
                      Navigation
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-cosmic-300 hover:text-sacred-gold"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Navigation Content */}
                <div className="flex-1 overflow-y-auto smooth-scroll p-4 space-y-2">
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="space-y-1">
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(category)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg bg-cosmic-800/50 hover:bg-cosmic-700/50 transition-colors ${getTouchClasses()}`}
                        aria-expanded={expandedCategories.has(category)}
                      >
                        <div className="flex items-center space-x-2">
                          {categoryIcons[category as keyof typeof categoryIcons]}
                          <span className="font-medium text-cosmic-200">
                            {categoryLabels[category as keyof typeof categoryLabels]}
                          </span>
                        </div>
                        {expandedCategories.has(category) ?
                          <ChevronUp className="w-4 h-4 text-cosmic-400" /> :
                          <ChevronDown className="w-4 h-4 text-cosmic-400" />
                        }
                      </button>

                      {/* Category Items */}
                      {expandedCategories.has(category) && (
                        <div className="space-y-1 pl-4">
                          {items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={handleItemClick}
                            >
                              <div className={`
                                flex items-center justify-between p-3 rounded-lg transition-all
                                ${location === item.href
                                  ? 'bg-sacred-gold/20 text-sacred-gold border-l-2 border-sacred-gold'
                                  : 'text-cosmic-300 hover:text-sacred-gold hover:bg-cosmic-700/30'
                                }
                                ${getTouchClasses()}
                                touch-target
                              `}>
                                <div className="flex items-center space-x-3">
                                  {item.icon}
                                  <span className="font-medium">
                                    {item.label}
                                  </span>
                                </div>
                                {item.badge && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs border-sacred-gold/50 text-sacred-gold"
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-cosmic-700">
                  <div className="text-center text-xs text-cosmic-400">
                    <p>Divine Blueprint Activation</p>
                    <p className="mt-1">Energetic Synthesis Teachings</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      {viewport.isMobile && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-cosmic-800/95 backdrop-blur-md border-t border-sacred-gold/20 z-50 safe-area-padding">
          <div className="flex items-center justify-around py-2">
            {[
              { href: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
              { href: "/chakras", icon: <Eye className="w-5 h-5" />, label: "Chakras" },
              { href: "/enhanced-tools", icon: <Wrench className="w-5 h-5" />, label: "Tools" },
              { href: "/meditation", icon: <Heart className="w-5 h-5" />, label: "Meditate" },
              { href: "/vers", icon: <Bot className="w-5 h-5" />, label: "VERS" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`
                  flex flex-col items-center p-2 rounded-lg transition-all
                  ${location === item.href
                    ? 'text-sacred-gold'
                    : 'text-cosmic-400 hover:text-sacred-gold'
                  }
                  ${getTouchClasses()}
                  touch-target-comfortable
                `}>
                  {item.icon}
                  <span className="text-xs mt-1 font-medium">
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}