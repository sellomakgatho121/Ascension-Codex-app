import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { OnboardingTour } from "@/components/onboarding-tour";
import { SpiritualInsightsEngine } from "@/components/spiritual-insights-engine";
import { PlanetaryGridMonitor } from "@/components/planetary-grid-monitor";
import {
  BookOpen,
  Play,
  Atom,
  Layers,
  Shield,
  TreePine
} from "lucide-react";
import { antiStagger, antiStaggerChild, antiHoverCard, antiDistortionOnScroll, antiGlitchFlash } from "@/lib/anti-animation-system";

function AntiTextReveal({ text, className = "" }: { text: string; className?: string }) {
  const chars = text.split("");
  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              opacity: 0,
              y: 30 + Math.random() * 20,
              rotate: (Math.random() - 0.5) * 8,
              scale: 0.8,
            },
            visible: {
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1,
              transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className={char === " " ? "mr-[0.3em]" : ""}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

function GlitchBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000 + Math.random() * 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative ${className}`}
      animate={glitch ? "glitch" : "idle"}
      variants={antiGlitchFlash}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [showTour, setShowTour] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll();
  const heroSkewX = useTransform(scrollYProgress, [0, 0.15], [0, -2]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.97]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.6]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('es-tour-completed');
    if (!hasSeenTour) setShowTour(true);
  }, []);

  const completeTour = () => {
    localStorage.setItem('es-tour-completed', 'true');
    setShowTour(false);
  };

  const systemCards = [
    {
      to: "/chakras",
      icon: Atom,
      color: "anti-acid",
      title: "15-CHAKRA SYSTEM",
      desc: "Spinning energy vortices including 7 physical and 8 morphogenetic centers.",
      tags: ["PHYSICAL 1-7", "AVATAR 8-15"],
      coord: "0x01",
    },
    {
      to: "/lightbody",
      icon: Layers,
      color: "anti-neon",
      title: "LIGHTBODY LAYERS",
      desc: "Seven nested electromagnetic frequency layers carrying consciousness.",
      tags: ["ETHERIC", "MENTAL", "AVATAR"],
      coord: "0x02",
    },
    {
      to: "/hova-bodies",
      icon: Shield,
      color: "anti-cyan",
      title: "HOVA BODIES",
      desc: "Station of identity encapsulation shields forming the auric structure.",
      tags: ["MAHARATA", "TELLURIC", "DORADIC"],
      coord: "0x03",
    },
    {
      to: "/tree-grid",
      icon: TreePine,
      color: "anti-acid",
      title: "12-TREE GRID",
      desc: "Primary holographic template of multidimensional consciousness.",
      tags: ["KATHARA", "12 SPHERES"],
      coord: "0x04",
    },
  ];

  const colorMap: Record<string, string> = {
    "anti-acid": "#39ff14",
    "anti-neon": "#ff006e",
    "anti-cyan": "#00f0ff",
  };

  return (
    <div className="min-h-screen bg-anti-bg text-anti-static overflow-x-hidden font-anti-mono">
      <OnboardingTour
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        onComplete={completeTour}
      />

      <motion.section
        ref={heroRef}
        style={{ skewX: heroSkewX, scale: heroScale, opacity: heroOpacity }}
        className="relative py-24 md:py-36 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          animate={{
            background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(57, 255, 20, 0.04), transparent 80%)`
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />

        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            animate={{
              x: (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.03,
              y: (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.03,
            }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-anti-acid/[0.03] blur-[120px]"
          />
          <motion.div
            animate={{
              x: (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * -0.04,
              y: (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * -0.04,
            }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-anti-neon/[0.02] blur-[150px]"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={antiStagger}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={antiStaggerChild} className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 bg-anti-acid rounded-full animate-pulse shadow-[0_0_6px_rgba(57,255,20,0.5)]" />
              <span className="text-[10px] text-anti-acid/40 tracking-[0.5em] uppercase">SYS.INIT // CODEX.ACTIVE</span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-anti-acid/10 to-transparent" />
            </motion.div>

            <motion.div variants={antiStaggerChild} className="mb-6">
              <GlitchBlock>
                <AntiTextReveal
                  text="ASCENSION"
                  className="text-7xl md:text-[10rem] font-anti-display leading-[0.85] tracking-[-0.02em] text-anti-static"
                />
              </GlitchBlock>
            </motion.div>

            <motion.div variants={antiStaggerChild} className="mb-10 flex items-end gap-4">
              <AntiTextReveal
                text="CODEX"
                className="text-6xl md:text-[8rem] font-anti-display leading-[0.85] tracking-[-0.02em] text-anti-acid"
              />
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[10px] text-anti-acid/30 tracking-[0.4em] uppercase mb-4 hidden md:block"
              >
                v3.14.159 // DIVINE_BLUEPRINT
              </motion.div>
            </motion.div>

            <motion.div variants={antiStaggerChild} className="mb-6">
              <p className="text-anti-acid/40 text-sm md:text-base tracking-[0.3em] uppercase font-anti-mono">
                UNLOCK YOUR DIVINE BLUEPRINT
              </p>
            </motion.div>

            <motion.div variants={antiStaggerChild} className="max-w-3xl mb-12">
              <p className="text-base md:text-lg text-anti-static/40 leading-relaxed border-l-2 border-anti-acid/20 pl-4">
                Explore the intricate, multi-layered architecture of consciousness through comprehensive Energetic Synthesis teachings.
              </p>
            </motion.div>

            <motion.div
              variants={antiStaggerChild}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link href="/knowledge-base">
                <Button className="bg-anti-acid text-anti-void hover:bg-anti-acid/80 transition-all text-sm px-8 py-6 h-auto font-anti-mono tracking-widest uppercase rounded-none border-0 shadow-[0_0_20px_rgba(57,255,20,0.2)] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] group">
                  <BookOpen className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  EXPLORE.KNOWLEDGE
                </Button>
              </Link>
              <Link href="/chakras">
                <Button variant="outline" className="border-anti-acid/30 text-anti-acid hover:bg-anti-acid/5 transition-all text-sm px-8 py-6 h-auto font-anti-mono tracking-widest uppercase rounded-none hover:border-anti-acid/60">
                  <Play className="mr-2 h-4 w-4" />
                  START.JOURNEY
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-anti-acid/20 to-transparent" />
      </motion.section>

      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, margin: "-100px" }}
            variants={antiDistortionOnScroll}
          >
            <div className="mb-16 flex items-end justify-between border-b border-anti-acid/10 pb-4">
              <div>
                <span className="text-[10px] text-anti-acid/30 tracking-[0.5em] uppercase block mb-2">MODULE.INDEX</span>
                <h2 className="text-3xl md:text-5xl font-anti-display tracking-[0.1em] text-anti-static uppercase">
                  ENERGETIC SYSTEM<br />
                  <span className="text-anti-acid">COMPONENTS</span>
                </h2>
              </div>
              <span className="text-[10px] text-anti-acid/20 tracking-widest hidden md:block">[{systemCards.length}] MODULES LOADED</span>
            </div>
          </motion.div>

          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemCards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotate: (Math.random() - 0.5) * 3 }}
                animate={isCardsInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link href={item.to}>
                  <motion.div
                    className="h-full cursor-pointer border border-anti-acid/10 bg-anti-void/60 backdrop-blur-sm hover:border-anti-acid/30 transition-all duration-300 group relative overflow-hidden"
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    variants={antiHoverCard}
                    style={{ perspective: 800 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-anti-acid/0 group-hover:via-anti-acid/40 to-transparent transition-all duration-500" />

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[9px] text-anti-acid/25 tracking-widest">[{item.coord}]</span>
                        <div
                          className="p-2 border border-anti-acid/10 group-hover:border-anti-acid/30 transition-colors"
                          style={{
                            boxShadow: `0 0 0 rgba(${item.color === 'anti-acid' ? '57,255,20' : item.color === 'anti-neon' ? '255,0,110' : '0,240,255'}, 0)`,
                          }}
                        >
                          <item.icon
                            className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                            style={{ color: colorMap[item.color] || '#39ff14' }}
                          />
                        </div>
                      </div>

                      <h3
                        className="text-sm font-anti-display tracking-[0.15em] mb-3 uppercase transition-colors duration-300"
                        style={{ color: colorMap[item.color] || '#39ff14' }}
                      >
                        {item.title}
                      </h3>

                      <p className="text-anti-static/25 text-[11px] leading-relaxed mb-5 tracking-wide">
                        {item.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[8px] border border-anti-acid/10 text-anti-acid/30 px-2 py-0.5 tracking-[0.2em] uppercase hover:border-anti-acid/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="h-[1px] bg-gradient-to-r from-anti-acid/0 via-anti-acid/5 to-anti-acid/0 group-hover:via-anti-acid/20 transition-all duration-500" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-anti-void/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={antiDistortionOnScroll}
            className="border border-anti-acid/10 p-6 md:p-10"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-anti-acid/10 pb-4">
              <div className="w-1.5 h-1.5 bg-anti-neon rounded-full animate-pulse" />
              <span className="text-[10px] text-anti-acid/30 tracking-[0.4em] uppercase">ADVANCED.INTELLIGENCE</span>
              <div className="flex-1 h-[1px] bg-anti-acid/5" />
              <span className="text-[10px] text-anti-acid/20 tracking-widest">REAL-TIME</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <SpiritualInsightsEngine />
              <PlanetaryGridMonitor />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-anti-bg to-transparent z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, skewY: 1 }}
            whileInView={{ opacity: 1, skewY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto border border-anti-acid/10 p-10 md:p-14 text-center relative"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-anti-acid/20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-anti-acid/20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-anti-acid/20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-anti-acid/20" />

            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="w-2 h-2 bg-anti-cyan shadow-[0_0_8px_rgba(0,240,255,0.4)] animate-pulse" />
              <div className="w-2 h-2 bg-anti-acid shadow-[0_0_8px_rgba(57,255,20,0.4)] animate-pulse [animation-delay:200ms]" />
              <div className="w-2 h-2 bg-anti-neon shadow-[0_0_8px_rgba(255,0,110,0.4)] animate-pulse [animation-delay:400ms]" />
            </div>

            <blockquote className="text-lg md:text-2xl font-anti-display text-anti-static/50 mb-8 leading-relaxed tracking-[0.08em] uppercase">
              "The human lightbody is a holographic energy matrix that encodes our blueprint and Divine Connection.
              It projects our consciousness through a holographic template that generates physical reality."
            </blockquote>
            <cite className="text-xs text-anti-acid/30 tracking-[0.3em] uppercase block">
              — Lisa Renee // Energetic Synthesis
            </cite>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
