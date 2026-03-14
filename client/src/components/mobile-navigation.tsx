import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  ChevronDown,
  ChevronUp,
  Dna
} from "lucide-react";
import { useMobileOptimizations } from "@/hooks/use-mobile-optimizations";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  category: 'spiritual' | 'tools' | 'learning' | 'community';
}

const navigationItems: NavigationItem[] = [
  { href: "/", label: "HOME", icon: <Home className="w-4 h-4" />, category: 'spiritual' },
  { href: "/chakras", label: "15_CHAKRAS", icon: <Eye className="w-4 h-4" />, category: 'spiritual' },
  { href: "/lightbody", label: "LIGHTBODY", icon: <Zap className="w-4 h-4" />, category: 'spiritual' },
  { href: "/hova-bodies", label: "HOVA_BODIES", icon: <Shield className="w-4 h-4" />, category: 'spiritual' },
  { href: "/tree-grid", label: "12_TREE_GRID", icon: <TreePine className="w-4 h-4" />, category: 'spiritual' },
  { href: "/dna-visualization", label: "DNA_STUDIO", icon: <Dna className="w-4 h-4" />, badge: "NEW", category: 'tools' },
  { href: "/meditation", label: "MEDITATION", icon: <Heart className="w-4 h-4" />, category: 'tools' },
  { href: "/enhanced-tools", label: "TOOLS", icon: <Wrench className="w-4 h-4" />, badge: "ENH", category: 'tools' },
  { href: "/progress", label: "PROGRESS", icon: <TrendingUp className="w-4 h-4" />, category: 'tools' },
  { href: "/vers", label: "VERS_AI", icon: <Bot className="w-4 h-4" />, badge: "AI", category: 'tools' },
  { href: "/vers-whisper-live", label: "WHISPER", icon: <Wrench className="w-4 h-4" />, badge: "LIVE", category: 'tools' },
  { href: "/knowledge-base", label: "KNOWLEDGE", icon: <Book className="w-4 h-4" />, category: 'learning' },
  { href: "/gsf", label: "GSF", icon: <Sparkles className="w-4 h-4" />, category: 'learning' },
  { href: "/psychic-self-defense", label: "PSY_DEFENSE", icon: <Shield className="w-4 h-4" />, category: 'learning' },
  { href: "/beings-entities", label: "ENTITIES", icon: <Users className="w-4 h-4" />, category: 'learning' },
  { href: "/universal-time-matrix", label: "TIME_MATRIX", icon: <Globe className="w-4 h-4" />, category: 'learning' },
  { href: "/visual-diagrams", label: "DIAGRAMS", icon: <TreePine className="w-4 h-4" />, category: 'learning' },
  { href: "/community", label: "COMMUNITY", icon: <MessageSquare className="w-4 h-4" />, category: 'community' },
];

const categoryLabels: Record<string, string> = {
  spiritual: 'SYS//CORE',
  tools: 'PRAXIS',
  learning: 'ARCHIVE',
  community: 'NET//LINK'
};

const categoryCoords: Record<string, string> = {
  spiritual: '[0x01]',
  tools: '[0x02]',
  learning: '[0x03]',
  community: '[0x04]'
};

export function MobileNavigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['spiritual']));
  const { viewport } = useMobileOptimizations();

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
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

  const handleItemClick = () => setIsOpen(false);

  return (
    <>
      <header className="md:hidden bg-anti-void/95 backdrop-blur-sm border-b border-anti-acid/15 sticky top-0 z-50 font-anti-mono">
        <div className="flex items-center justify-between px-4 py-2">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <div className="flex items-center space-x-2 group">
              <div className="w-7 h-7 border border-anti-acid/60 bg-anti-void flex items-center justify-center">
                <span className="text-anti-acid font-anti-display text-lg leading-none">AC</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-anti-display tracking-[0.15em] text-anti-static uppercase leading-none">
                  ASCENSION_CODEX
                </h1>
                <span className="text-[8px] text-anti-acid/40 tracking-widest">
                  SYS.ACTIVE
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-anti-acid/70 hover:text-anti-acid rounded-none border border-transparent hover:border-anti-acid/20 h-8 w-8"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-anti-acid/70 hover:text-anti-acid rounded-none border border-transparent hover:border-anti-acid/20 h-8 w-8"
                  aria-label="Navigation menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-80 bg-anti-void border-anti-acid/15 p-0 font-anti-mono rounded-none"
              >
                <div className="p-3 border-b border-anti-acid/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-anti-acid rounded-full animate-pulse" />
                    <span className="text-xs text-anti-acid/70 tracking-widest uppercase">NAV//MENU</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-anti-static/40 hover:text-anti-acid rounded-none h-7 w-7"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-1 anti-scrollbar">
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category}>
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center justify-between p-2 hover:bg-anti-acid/5 transition-colors border-b border-anti-acid/5"
                        aria-expanded={expandedCategories.has(category)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-anti-acid/30">{categoryCoords[category]}</span>
                          <span className="text-xs font-medium text-anti-static/60 tracking-widest uppercase">
                            {categoryLabels[category]}
                          </span>
                        </div>
                        {expandedCategories.has(category) ?
                          <ChevronUp className="w-3 h-3 text-anti-acid/30" /> :
                          <ChevronDown className="w-3 h-3 text-anti-acid/30" />
                        }
                      </button>

                      <AnimatePresence>
                        {expandedCategories.has(category) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-0 pl-2 border-l border-anti-acid/10 ml-2">
                              {items.map((item, idx) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={handleItemClick}
                                >
                                  <div className={`
                                    flex items-center justify-between p-2 transition-all
                                    ${location === item.href
                                      ? 'bg-anti-acid/10 text-anti-acid border-l-2 border-l-anti-acid -ml-[1px]'
                                      : 'text-anti-static/40 hover:text-anti-acid hover:bg-anti-acid/5'
                                    }
                                  `}>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-[9px] text-anti-acid/20 tabular-nums w-4">{String(idx).padStart(2, '0')}</span>
                                      <span className="opacity-60">{item.icon}</span>
                                      <span className="text-[11px] tracking-wider">
                                        {item.label}
                                      </span>
                                    </div>
                                    {item.badge && (
                                      <span className="text-[8px] border border-anti-acid/20 text-anti-acid/50 px-1.5 py-0.5 tracking-widest">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-anti-acid/10">
                  <div className="text-center text-[9px] text-anti-acid/20 tracking-[0.3em] uppercase">
                    <p>DIVINE.BLUEPRINT</p>
                    <p className="mt-0.5">ENERGETIC.SYNTHESIS</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {viewport.isMobile && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-anti-void/95 backdrop-blur-sm border-t border-anti-acid/15 z-50 font-anti-mono">
          <div className="flex items-center justify-around py-1.5">
            {[
              { href: "/", icon: <Home className="w-4 h-4" />, label: "HOME" },
              { href: "/chakras", icon: <Eye className="w-4 h-4" />, label: "CHAKRA" },
              { href: "/enhanced-tools", icon: <Wrench className="w-4 h-4" />, label: "TOOLS" },
              { href: "/meditation", icon: <Heart className="w-4 h-4" />, label: "MEDITATE" },
              { href: "/vers", icon: <Bot className="w-4 h-4" />, label: "VERS" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`
                  flex flex-col items-center p-1.5 transition-all
                  ${location === item.href
                    ? 'text-anti-acid'
                    : 'text-anti-static/30 hover:text-anti-acid/60'
                  }
                `}>
                  {item.icon}
                  <span className="text-[8px] mt-0.5 tracking-widest">
                    {item.label}
                  </span>
                  {location === item.href && (
                    <div className="w-1 h-1 bg-anti-acid rounded-full mt-0.5 shadow-[0_0_4px_rgba(57,255,20,0.5)]" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
