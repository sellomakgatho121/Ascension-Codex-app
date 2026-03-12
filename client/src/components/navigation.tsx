import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Activity, BookOpen, Brain, Sparkles, Search } from "lucide-react";
import { GlobalSearch } from "@/components/global-search";
import { ThreeFoldFlameLogo } from "./three-fold-flame-logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileNavigation } from "./mobile-navigation";
import { springs, staggerContainer } from "@/lib/animation-system";

export function Navigation() {
  const [location] = useLocation();

  const menuGroups = [
    {
      title: "Core Systems",
      icon: <Activity className="w-4 h-4" />,
      items: [
        { href: "/chakras", title: "15-Chakra System", description: "Anatomy of the multidimensional soul" },
        { href: "/lightbody", title: "Lightbody Layers", description: "7 layers of the auric field" },
        { href: "/tree-grid", title: "12-Tree Grid", description: "Kathara Grid holographic template" },
        { href: "/hova-bodies", title: "Hova Bodies", description: "Station of identity encapsulation" },
        { href: "/universal-time-matrix", title: "Time Matrix", description: "15-dimensional reality structure" },
        { href: "/humanity-creation", title: "Creation Journey", description: "Origins of the human race" },
      ]
    },
    {
      title: "Practice",
      icon: <Sparkles className="w-4 h-4" />,
      items: [
        { href: "/meditation", title: "Meditation Library", description: "Guided techniques for clearing" },
        { href: "/enhanced-tools", title: "Spiritual Tools", description: "Shielding, clearing, and activation" },
        { href: "/psychic-self-defense", title: "Psychic Defense", description: "Protective protocols and clearing" },
        { href: "/visual-diagrams", title: "Visual Diagrams", description: "Interactive schema exploration" },
        { href: "/3d-visualizations", title: "3D Visualizations", description: "Immersive energy field systems" },
        { href: "/dna-visualization", title: "DNA Studio", description: "Interactive 12-strand DNA visualization" },
        { href: "/progress", title: "Ascension Path", description: "Track your personal evolution" },
      ]
    },
    {
      title: "Knowledge",
      icon: <BookOpen className="w-4 h-4" />,
      items: [
        { href: "/knowledge-base", title: "Knowledge Base", description: "Comprehensive spiritual library" },
        { href: "/glossary", title: "Glossary", description: "Ascension terminology defined" },
        { href: "/beings-entities", title: "Beings & Entities", description: "Catalog of interdimensional races" },
        { href: "/timeline-wars", title: "Timeline Wars", description: "History of galactic conflict" },
        { href: "/blog-timeline-shift", title: "Timeline Blog", description: "Updates on planetary shifting" },
        { href: "/naa-tools-weapons", title: "NAA Weapons", description: "Understanding control structures" },
      ]
    },
    {
      title: "Community & AI",
      icon: <Brain className="w-4 h-4" />,
      items: [
        { href: "/community", title: "Community", description: "Connect with dedicated practitioners" },
        { href: "/vers", title: "VERS AI", description: "Virtual Entity Recognition System" },
        { href: "/vers-whisper-live", title: "WhisperLive service", description: "Real-time voice transcription" },
        { href: "/soul-codex", title: "Soul Codex", description: "Personal spiritual registry" },
        { href: "/gsf", title: "GSF Foundation", description: "God-Sovereign-Free details" },
      ]
    }
  ];

  return (
    <header className="bg-cosmic-900/80 backdrop-blur-lg border-b border-sacred-gold/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={springs.elegant}
          >
            <Link href="/">
              <motion.a
                className="flex items-center space-x-3 group cursor-pointer min-w-0"
                whileHover="hover"
              >
                <div className="relative">
                  <ThreeFoldFlameLogo
                    size={40}
                    animated={true}
                    className="group-hover:scale-110 transition-transform duration-500 flex-shrink-0"
                  />
                  <motion.div
                    variants={{
                      hover: { scale: 1.2, opacity: 0.6, rotate: 180 }
                    }}
                    className="absolute inset-0 bg-sacred-gold/20 blur-xl rounded-full opacity-0"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <h1 className="text-2xl font-sacred font-bold text-transparent bg-clip-text bg-gradient-to-r from-sacred-gold via-white to-sacred-gold animate-shimmer truncate tracking-tight">
                    <span className="hidden sm:inline">Ascension Codex</span>
                    <span className="sm:hidden">AC</span>
                  </h1>
                  <span className="text-[10px] tracking-[0.3em] text-sacred-gold/60 font-bold hidden md:block uppercase truncate">
                    Divine Blueprint Activation
                  </span>
                </div>
              </motion.a>
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center flex-1 px-4">
            <NavigationMenu>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer(0.1)}
              >
                <NavigationMenuList className="space-x-1">
                  {menuGroups.map((group) => (
                    <NavigationMenuItem key={group.title}>
                      <motion.div
                        variants={{
                          hidden: { y: -10, opacity: 0 },
                          visible: { y: 0, opacity: 1 }
                        }}
                      >
                        <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 text-cosmic-100 hover:text-sacred-gold focus:bg-white/5 focus:text-sacred-gold data-[state=open]:bg-white/10 data-[state=open]:text-sacred-gold transition-all duration-300">
                          <span className="flex items-center gap-2 relative">
                            {group.title}
                            {/* Animated Underline for Active State could go here if grouped */}
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[700px] bg-cosmic-900/95 backdrop-blur-2xl border border-sacred-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden overscroll-contain">
                            <AnimatePresence>
                              {group.items.map((item, idx) => (
                                <motion.div
                                  key={item.title}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                >
                                  <ListItem title={item.title} href={item.href}>
                                    {item.description}
                                  </ListItem>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </ul>
                        </NavigationMenuContent>
                      </motion.div>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </motion.div>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springs.snappy}
              className="hidden xl:block w-64"
            >
              <GlobalSearch />
            </motion.div>

            <div className="hidden md:block xl:hidden">
              <Button variant="ghost" size="icon" className="text-sacred-gold hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={springs.bouncy}
              className="lg:hidden"
            >
              <MobileNavigation />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href!}>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-cosmic-800 hover:text-sacred-gold focus:bg-cosmic-800 focus:text-accent-foreground group",
              isActive ? "bg-cosmic-800/80 border-l-2 border-sacred-gold" : "",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none text-cosmic-100 group-hover:text-sacred-gold transition-colors">
              {title}
            </div>
            <p className="line-clamp-2 text-xs leading-snug text-cosmic-400 group-hover:text-cosmic-300">
              {children}
            </p>
          </a>
        </Link>
      </NavigationMenuLink>
    </li>
  );
})
ListItem.displayName = "ListItem";