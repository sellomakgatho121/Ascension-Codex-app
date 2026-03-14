import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { GlobalSearch } from "@/components/global-search";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileNavigation } from "./mobile-navigation";
import { antiSprings, antiGlitchFlash } from "@/lib/anti-animation-system";

export function Navigation() {
  const [location] = useLocation();
  const [glitchActive, setGlitchActive] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toISOString().slice(11, 19));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 5000 + Math.random() * 8000);
    return () => clearInterval(interval);
  }, []);

  const menuGroups = [
    {
      title: "SYS//CORE",
      coord: "[0x01]",
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
      title: "PRAXIS",
      coord: "[0x02]",
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
      title: "ARCHIVE",
      coord: "[0x03]",
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
      title: "NET//AI",
      coord: "[0x04]",
      items: [
        { href: "/community", title: "Community", description: "Connect with dedicated practitioners" },
        { href: "/vers", title: "VERS AI", description: "Virtual Entity Recognition System" },
        { href: "/vers-whisper-live", title: "WhisperLive", description: "Real-time voice transcription" },
        { href: "/soul-codex", title: "Soul Codex", description: "Personal spiritual registry" },
        { href: "/gsf", title: "GSF Foundation", description: "God-Sovereign-Free details" },
      ]
    }
  ];

  return (
    <header className="bg-anti-void/90 backdrop-blur-sm border-b border-anti-acid/20 sticky top-0 z-50 font-anti-mono">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={antiSprings.snap}
          >
            <Link href="/">
              <motion.a
                className="flex items-center space-x-3 group cursor-pointer min-w-0 magnetic-hover"
                whileHover="hover"
                variants={antiGlitchFlash}
                animate={glitchActive ? "glitch" : "idle"}
              >
                <div className="relative">
                  <div className="w-10 h-10 border border-anti-acid bg-anti-void flex items-center justify-center relative overflow-hidden">
                    <span className="text-anti-acid font-anti-display text-2xl leading-none tracking-tighter">AC</span>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-anti-acid animate-anti-marquee" />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <h1 className="text-lg font-anti-display tracking-[0.2em] text-anti-static uppercase leading-none">
                    <span className="hidden sm:inline">ASCENSION_CODEX</span>
                    <span className="sm:hidden">A_C</span>
                  </h1>
                  <span className="text-[9px] tracking-[0.4em] text-anti-acid/60 font-anti-mono hidden md:block uppercase">
                    {time} // ACTIVE
                  </span>
                </div>
              </motion.a>
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center flex-1 px-4">
            <NavigationMenu>
              <NavigationMenuList className="space-x-0">
                {menuGroups.map((group) => (
                  <NavigationMenuItem key={group.title}>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-anti-acid/5 text-anti-static/70 hover:text-anti-acid focus:bg-anti-acid/5 focus:text-anti-acid data-[state=open]:bg-anti-acid/10 data-[state=open]:text-anti-acid transition-all duration-150 font-anti-mono text-xs tracking-widest uppercase rounded-none border-b border-transparent hover:border-anti-acid/30 data-[state=open]:border-anti-acid/50 px-3 py-2 h-auto">
                      <span className="flex items-center gap-1.5">
                        <span className="text-anti-acid/40 text-[10px]">{group.coord}</span>
                        {group.title}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-0 p-0 md:w-[500px] md:grid-cols-2 lg:w-[650px] bg-anti-void/98 backdrop-blur-sm border border-anti-acid/20 shadow-[0_0_30px_rgba(57,255,20,0.05)] rounded-none overflow-hidden">
                        <div className="col-span-full px-4 py-2 border-b border-anti-acid/10 flex justify-between items-center">
                          <span className="text-[10px] text-anti-acid/50 font-anti-mono tracking-widest">{group.coord} {group.title}</span>
                          <span className="text-[10px] text-anti-acid/30 font-anti-mono">{group.items.length} ENTRIES</span>
                        </div>
                        <AnimatePresence>
                          {group.items.map((item, idx) => (
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                            >
                              <ListItem title={item.title} href={item.href} index={idx}>
                                {item.description}
                              </ListItem>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={antiSprings.snap}
              className="hidden xl:block w-56"
            >
              <GlobalSearch />
            </motion.div>

            <div className="hidden md:block xl:hidden">
              <Button variant="ghost" size="icon" className="text-anti-acid hover:text-anti-neon hover:bg-anti-acid/5 rounded-none border border-transparent hover:border-anti-acid/30 transition-all">
                <Search className="w-4 h-4" />
              </Button>
            </div>

            <div className="lg:hidden">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href?: string;
  index?: number;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, href, index = 0, ...props }, ref) => {
    const [location] = useLocation();
    const isActive = location === href;

    return (
      <li>
        <NavigationMenuLink asChild>
          <Link href={href!}>
            <a
              ref={ref}
              className={cn(
                "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-all duration-150 hover:bg-anti-acid/5 border-b border-anti-acid/5 last:border-b-0 group font-anti-mono",
                isActive ? "bg-anti-acid/10 border-l-2 border-l-anti-acid" : "border-l-2 border-l-transparent",
                className
              )}
              {...props}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-anti-acid/30 tabular-nums">{String(index).padStart(2, '0')}</span>
                <span className="text-xs font-medium leading-none text-anti-static/80 group-hover:text-anti-acid transition-colors tracking-wide uppercase">
                  {title}
                </span>
              </div>
              <p className="line-clamp-1 text-[11px] leading-snug text-anti-static/30 group-hover:text-anti-static/50 pl-5">
                {children}
              </p>
            </a>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
