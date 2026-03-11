import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ThreeFoldFlameLogo } from "@/components/three-fold-flame-logo";
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
import { ParticleSystem } from "@/components/particle-system";
import { ScrollReveal, TextReveal } from "@/components/scroll-animations";
import { staggerContainer, fadeUp } from "@/lib/animation-system";

export default function HomePage() {
  const [showTour, setShowTour] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('es-tour-completed');
    if (!hasSeenTour) {
      setShowTour(true);
    }
  }, []);

  const completeTour = () => {
    localStorage.setItem('es-tour-completed', 'true');
    setShowTour(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] // Custom ease for a premium feel
      }
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-900 text-white ascension-codex-pattern overflow-x-hidden">
      <OnboardingTour
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        onComplete={completeTour}
      />

      {/* Hero Section */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <ParticleSystem />
        {/* Cursor spotlight effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          animate={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(138, 43, 226, 0.15), transparent 80%)`
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            animate={{
              x: (mousePosition.x - window.innerWidth / 2) * 0.05,
              y: (mousePosition.y - window.innerHeight / 2) * 0.05,
            }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: (mousePosition.x - window.innerWidth / 2) * -0.07,
              y: (mousePosition.y - window.innerHeight / 2) * -0.07,
            }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="flex justify-center mb-10">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 border-2 border-dashed border-sacred-gold/40 rounded-full"
                  style={{ margin: '-30px' }}
                />
                <ThreeFoldFlameLogo size={160} animated={true} className="drop-shadow-[0_0_60px_rgba(255,215,0,0.6)]" />
              </div>
            </motion.div>

            <TextReveal
              text="Ascension Codex"
              className="text-7xl md:text-9xl font-sacred font-bold mb-8 text-gradient-gold justify-center tracking-tighter"
            />

            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-4xl font-light text-sacred-gold/70 italic mb-12 tracking-[0.3em] uppercase"
            >
              Unlock Your Divine Blueprint
            </motion.p>

            <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-16">
              <p className="text-xl md:text-2xl text-cosmic-100/90 leading-relaxed font-light backdrop-blur-sm bg-black/5 p-6 rounded-2xl">
                Explore the intricate, multi-layered architecture of consciousness through comprehensive Energetic Synthesis teachings.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8"
            >
              <Link href="/knowledge-base">
                <Button className="w-full sm:w-auto bg-sacred-gold text-cosmic-900 hover:bg-white hover:scale-105 transition-all text-xl px-10 py-8 h-auto font-bold shadow-[0_0_30px_rgba(255,215,0,0.3)] rounded-2xl group">
                  <BookOpen className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                  Explore Knowledge
                </Button>
              </Link>
              <Link href="/chakras">
                <Button variant="outline" className="w-full sm:w-auto border-sacred-gold/40 text-sacred-gold hover:bg-sacred-gold/10 hover:scale-105 transition-all text-xl px-10 py-8 h-auto backdrop-blur-md rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <Play className="mr-3 h-6 w-6" />
                  Start Journey
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" distance={100}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-sacred font-bold text-sacred-gold mb-6">
                Energetic System Components
              </h2>
              <div className="w-24 h-1 bg-sacred-gold/40 mx-auto rounded-full mb-8" />
              <p className="text-xl text-cosmic-200 max-w-2xl mx-auto leading-relaxed">
                Discover the interconnected layers that form your divine anatomy
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer(0.2)}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                to: "/chakras",
                icon: Atom,
                color: "text-sacred-gold",
                title: "15-Chakra System",
                desc: "Spinning energy vortices including 7 physical and 8 morphogenetic centers.",
                tags: ["Physical 1-7", "Avatar 8-15"]
              },
              {
                to: "/lightbody",
                icon: Layers,
                color: "text-sacred-display",
                title: "Lightbody Layers",
                desc: "Seven nested electromagnetic frequency layers carrying consciousness.",
                tags: ["Etheric", "Mental", "Avatar"]
              },
              {
                to: "/hova-bodies",
                icon: Shield,
                color: "text-cosmic-400",
                title: "Hova Bodies",
                desc: "Station of identity encapsulation shields forming the auric structure.",
                tags: ["Maharata", "Telluric", "Doradic"]
              },
              {
                to: "/tree-grid",
                icon: TreePine,
                color: "text-emerald-400",
                title: "12-Tree Grid",
                desc: "Primary holographic template of multidimensional consciousness.",
                tags: ["Kathara", "12 Spheres"]
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link href={item.to}>
                  <Card
                    variant="elevated"
                    className="h-full group cursor-pointer border-sacred-gold/5 bg-cosmic-900/40 backdrop-blur-xl"
                  >
                    <CardContent className="p-8">
                      <div className="mb-8 flex justify-center">
                        <motion.div
                          whileHover={{ rotate: 180, scale: 1.1 }}
                          className="p-6 rounded-2xl bg-sacred-gold/5 group-hover:bg-sacred-gold/10 transition-colors shadow-2xl border border-sacred-gold/10"
                        >
                          <item.icon className={`w-10 h-10 ${item.color} filter drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]`} />
                        </motion.div>
                      </div>
                      <h3 className={`text-2xl font-sacred font-bold text-center mb-4 ${item.color}`}>
                        {item.title}
                      </h3>
                      <p className="text-cosmic-200 text-base text-center leading-relaxed mb-6">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="border-sacred-gold/20 text-cosmic-300 text-[10px] uppercase tracking-widest px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advanced Features - Glass Panel */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="glass-panel rounded-2xl p-8 md:p-12 border border-sacred-gold/20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-sacred font-bold text-white mb-4">Advanced Intelligence</h2>
              <p className="text-cosmic-200">Real-time planetary monitoring and spiritual insights</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <SpiritualInsightsEngine />
              <PlanetaryGridMonitor />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900 to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card max-w-4xl mx-auto rounded-2xl p-12 text-center border-sacred-gold/30 shadow-[0_0_50px_rgba(255,215,0,0.1)]"
          >
            <ThreeFoldFlameLogo size={48} className="mx-auto mb-8 opacity-80" />
            <blockquote className="text-2xl md:text-3xl font-sacred text-sacred-gold/90 mb-8 leading-relaxed">
              "The human lightbody is a holographic energy matrix that encodes our blueprint and Divine Connection.
              It projects our consciousness through a holographic template that generates physical reality."
            </blockquote>
            <cite className="text-lg text-cosmic-300 font-medium tracking-wide block">
              — Lisa Renee, Energetic Synthesis
            </cite>
          </motion.div>
        </div>
      </section>
    </div>
  );
}