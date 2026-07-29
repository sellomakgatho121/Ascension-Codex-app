/**
 * DIRECTION CONTRACT – home page
 *
 * THESIS: The home page bridges two visual worlds — the confrontational
 * anti-design cyberpunk of the hero and the contemplative cosmic
 * glassmorphism of the practice zone — to tell one story: wake up, then work.
 * It refuses the single-aesthetic landing page default. The scroll journey
 * is a visual metaphor for spiritual progression.
 *
 * OWN-WORLD: Void-black graduates into deep indigo-violet via a scroll-driven
 * background gradient. Anti palette (acid green #39ff14, neon pink #ff006e,
 * electric cyan #00f0ff) occupies the hero; cosmic palette (violet, royal
 * purple, sacred gold, crystal) takes over below. Typography shifts from
 * Bebas Neue (hero headlines) -> Cinzel (cosmic sections) -> Open Sans (body)
 * with Space Mono tracking throughout. Glass cards with backdrop-blur in
 * cosmic sections; hard dark cards with colored borders in anti sections.
 *
 * STORY: The visitor arrives into a glitchy neon-lit cyberpunk temple — this
 * is unfamiliar, this matters. Scrolling past the hero, acid green dissolves
 * into violet ambient orbs. The modules grid introduces the system. Cosmic
 * sections unfold: progress dashboard, VERS dock, community pulse, meditation
 * quick-start. They understand: this is an environment for active practice.
 *
 * FIRST VIEWPORT: Full-screen anti-design. "ASCENSION CODEX" in Bebas Neue
 * at 12vw, acid green glitch. Two CTAs (EXPLORE.KNOWLEDGE, START.JOURNEY).
 * Mouse-follow radial gradient + parallax acid/pink blobs. Scan-line overlay.
 *
 * FORM: Extended existing surface with bridge transition, expanded 10-card
 * module grid, and 4 new content sections (progress, VERS, community, meditation).
 * CSS-only animations — no framer-motion dependencies.
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useSpiritualProgress } from "@/lib/spiritual-progress-context";
import { useVERS } from "@/lib/vers-context";
import {
  BookOpen, Play, Atom, Layers, Shield, TreePine,
  Bot, Globe, BarChart3, Users, Sparkles,
  ChevronDown, MessageCircle, Heart, TrendingUp,
} from "lucide-react";

// ─── Inline animation styles ───────────────────────────────────────

const ANIMATION_STYLE = (
  <style>{`
    /* Scroll-reveal system */
    .sr { opacity: 0; transform: translateY(30px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
    .sr.in { opacity: 1; transform: translateY(0); }
    .sr-1 { transition-delay: 0.1s; } .sr-2 { transition-delay: 0.2s; } .sr-3 { transition-delay: 0.3s; }
    .sr-4 { transition-delay: 0.4s; } .sr-5 { transition-delay: 0.5s; } .sr-6 { transition-delay: 0.6s; }
    .sr-7 { transition-delay: 0.7s; } .sr-8 { transition-delay: 0.8s; } .sr-9 { transition-delay: 0.9s; }

    /* Anti module card */
    .card-anti {
      background: #0d0d0d; border: 1px solid rgba(255,255,255,0.06);
      padding: 1.5rem; cursor: pointer;
      transition: all 0.2s cubic-bezier(0.22,1,0.36,1);
    }
    .card-anti:hover { border-color: var(--acid-green); box-shadow: var(--neon-glow-green); }

    /* Bridge card (transition zone) */
    .card-bridge {
      background: #0d0d0d; border: 1px solid rgba(57,255,20,0.15);
      border-radius: 0.75rem; padding: 1.5rem; cursor: pointer;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .card-bridge:hover { border-color: var(--acid-green); box-shadow: 0 0 30px rgba(57,255,20,0.1); transform: translateY(-3px); }

    /* Glass cosmic card */
    .card-glass {
      background: hsla(0,0%,100%,0.05); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border: 1px solid hsla(255,255%,255%,0.1); border-radius: 1rem; padding: 1.5rem; cursor: pointer;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .card-glass:hover { background: hsla(0,0%,100%,0.1); transform: translateY(-4px); box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37); }

    /* Blob animations */
    @keyframes blob-1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-25px,25px) scale(0.92)} }
    @keyframes blob-2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-35px,-20px) scale(1.05)} 66%{transform:translate(30px,20px) scale(0.95)} }
    .blob-a { animation: blob-1 24s ease-in-out infinite; }
    .blob-b { animation: blob-2 28s ease-in-out infinite reverse; }
  `}</style>
);

// ─── Hooks ────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { setVis(true); o.unobserve(el); } }, { threshold });
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, vis] as const;
}

// ─── Data ─────────────────────────────────────────────────────────

interface ModuleInfo { title: string; description: string; href: string; Icon: React.ElementType; zone: 'anti' | 'bridge' | 'glass'; accent: string }

const MODULES: ModuleInfo[] = [
  { title: "15-Chakra System",   description: "Explore the complete 15-chakra system — physical roots (1–7) to morphogenetic centers (8–15)", href: "/chakras",    Icon: Atom,       zone: 'anti',   accent: 'var(--acid-green)' },
  { title: "Lightbody Activation", description: "Track your Lightbody layers — etheric through ketheric — across 7 dimensions",            href: "/lightbody", Icon: Layers,     zone: 'anti',   accent: 'var(--neon-pink)' },
  { title: "12 Hova Bodies",     description: "Your soul matrix — avatar, soul, monadic, and higher dimensional bodies",                  href: "/hova-bodies", Icon: Globe,      zone: 'bridge', accent: 'var(--electric-cyan)' },
  { title: "12-Tree Grid",       description: "Tree of Life spheres and shield integration across the cosmic geometry",                   href: "/tree-grid",  Icon: TreePine,   zone: 'bridge', accent: 'var(--glitch-yellow)' },
  { title: "VERS AI Companion",  description: "Your Vibrational Energy Resonance System — voice and text AI grounded in ES teachings",    href: "/vers",       Icon: Bot,        zone: 'bridge', accent: 'var(--sacred-violet)' },
  { title: "Meditation",         description: "Guided sessions for chakra clearing, 12D Shield, and lightbody attunement",                href: "/meditation", Icon: Play,       zone: 'glass',  accent: 'var(--sacred-gold)' },
  { title: "Community",          description: "Fellow practitioners, group sessions, and shared ascension journey",                      href: "/community",  Icon: Users,      zone: 'glass',  accent: 'var(--sacred-emerald)' },
  { title: "Knowledge Base",     description: "Sacred geometry, DNA activation, timeline mechanics, and deeper ES reference",            href: "/knowledge-base", Icon: BookOpen, zone: 'glass', accent: 'var(--sacred-crystal)' },
  { title: "Sacred Tools",       description: "Protection protocols, GSF decrees, NAA tools, and psychic self-defense",                  href: "/tools",      Icon: Shield,     zone: 'glass',  accent: 'var(--flame-gold)' },
  { title: "Progress & Growth",  description: "Track your spiritual development across all dimensions with detailed metrics",           href: "/progress",   Icon: BarChart3,  zone: 'glass',  accent: 'var(--flame-blue)' },
];

const COMMUNITY_ITEMS = [
  { user: "SovereignLight", action: "started a discussion",  topic: "12D Shield clearing frequencies",        time: "2h ago", likes: 12 },
  { user: "Starseed_7",     action: "shared a practice",     topic: "Morning chakra alignment routine",      time: "5h ago", likes: 8  },
  { user: "MonadicBeing",   action: "posted in",             topic: "Hova Bodies integration questions",     time: "1d ago", likes: 24 },
  { user: "AuricField",     action: "created a group session", topic: "Full moon Lightbody activation",     time: "2d ago", likes: 16 },
];

// ─── Sub-components ───────────────────────────────────────────────

function AntiTextReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`animate-text-reveal ${className}`}>
      {text.split("").map((c) => (c === " " ? "\u00A0" : c)).join("")}
    </div>
  );
}

function GlitchBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative animate-glitch-block ${className}`}>{children}</div>;
}

function ModuleCard({ m, i, visible }: { m: ModuleInfo; i: number; visible: boolean }) {
  const cardClass = m.zone === "anti" ? "card-anti" : m.zone === "bridge" ? "card-bridge" : "card-glass";
  return (
    <Link href={m.href}>
      <div
        className={`${cardClass} h-full`}
        style={{
          transitionDelay: `${i * 80}ms`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <div className="flex items-start gap-3 mb-2.5">
          <m.Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: m.accent }} />
          <h3
            className="text-sm font-semibold"
            style={{ fontFamily: m.zone === "glass" ? "'Cinzel', serif" : "'Space Mono', monospace", color: "var(--static-white)" }}
          >
            {m.title}
          </h3>
        </div>
        <p
          className="text-xs leading-relaxed"
          style={{ fontFamily: "'Open Sans', sans-serif", color: m.zone === "glass" ? "var(--cosmic-300)" : "rgba(232,232,232,0.6)" }}
        >
          {m.description}
        </p>
      </div>
    </Link>
  );
}

// ─── Sections ─────────────────────────────────────────────────────

function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { openChat, setPageContext } = useVERS();

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const el = bgRef.current;
      if (!el) return;
      const x = (e.clientX / window.innerWidth) * 30;
      const y = (e.clientY / window.innerHeight) * 30;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("mousemove", onMouse); window.removeEventListener("scroll", onScroll); };
  }, []);

  const o = scrollY * 0.15;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "var(--anti-bg)" }}>
      {/* Ambient blobs */}
      <div className="absolute w-[40vw] h-[40vw] rounded-full opacity-20 pointer-events-none blob-a" style={{ background: "radial-gradient(circle, var(--acid-green) 0%, transparent 70%)", top: "20%", left: "5%", transform: `translate(${o * 0.5}px,${o * 0.3}px)` }} />
      <div className="absolute w-[30vw] h-[30vw] rounded-full opacity-15 pointer-events-none blob-b" style={{ background: "radial-gradient(circle, var(--neon-pink) 0%, transparent 70%)", bottom: "10%", right: "5%", transform: `translate(${-o * 0.3}px,${-o * 0.5}px)` }} />
      {/* Mouse-follow gradient */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(600px at calc(50% + var(--mx,0px)) calc(50% + var(--my,0px)), rgba(57,255,20,0.08) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 pointer-events-none anti-scan-line" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl">
        <div className="mb-6 animate-text-reveal" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.25em", color: "var(--electric-cyan)" }}>
          &gt; ENERGETIC SYNTHESIS SYSTEM v2.0
        </div>
        <GlitchBlock className="mb-6">
          <h1 className="uppercase leading-none tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem,12vw,12rem)", color: "var(--static-white)", textShadow: "0 0 40px rgba(57,255,20,0.3)" }}>
            Ascension<br />Codex
          </h1>
        </GlitchBlock>
        <AntiTextReveal text="UNLOCK YOUR DIVINE BLUEPRINT" className="mb-8" />
        <p className="max-w-2xl mb-10 text-sm md:text-base animate-text-reveal" style={{ fontFamily: "'Space Mono', monospace", color: "var(--static-white)", opacity: 0.7, lineHeight: 1.8 }}>
          A complete spiritual development platform — learn, practice, connect, and grow
          through the full spectrum of Energetic Synthesis teachings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-text-reveal">
          <Link href="/chakras">
            <Button className="text-base px-8 py-6 h-auto" style={{ background: "var(--acid-green)", color: "var(--anti-bg)", border: "2px solid var(--acid-green)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.2em", borderRadius: 0 }}>
              <BookOpen className="w-5 h-5 mr-2" />EXPLORE.KNOWLEDGE
            </Button>
          </Link>
          <Button className="text-base px-8 py-6 h-auto" onClick={() => { setPageContext("New visitor on home page — guide them through the platform"); openChat(); }}
            style={{ border: "2px solid var(--static-white)", color: "var(--static-white)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.2em", borderRadius: 0, background: "transparent" }}>
            <MessageCircle className="w-5 h-5 mr-2" />START.JOURNEY
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"><ChevronDown className="w-6 h-6" style={{ color: "var(--acid-green)" }} /></div>
    </section>
  );
}

function ModuleGridSection() {
  const [ref, vis] = useReveal(0.05);
  return (
    <section ref={ref} className="relative py-20 md:py-28 px-4" style={{ background: "var(--cosmic-900)" }}>
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--anti-bg), transparent)" }} />
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block mb-3" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--sacred-violet)" }}>/ SYSTEM.MODULES</span>
          <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Cinzel', serif", color: "var(--static-white)" }}>Explore the Codex</h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ fontFamily: "'Open Sans', sans-serif", color: "var(--cosmic-300)", fontSize: "1rem" }}>
            Each module is a gateway into a dimension of your spiritual technology
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MODULES.map((m, i) => <ModuleCard key={m.href} m={m} i={i} visible={vis} />)}
        </div>
      </div>
    </section>
  );
}

function ProgressSection() {
  const [ref, vis] = useReveal(0.15);
  let prog: any = null;
  try { prog = useSpiritualProgress(); } catch { /* provider may not be mounted */ }
  const has = prog && prog.overallLevel !== undefined;
  const level = has ? prog.overallLevel : 0;
  const chakra = has ? Math.round(((prog.chakraMastery.physicalChakras.filter(Boolean).length + prog.chakraMastery.morphogeneticChakras.filter(Boolean).length) / 15) * 100) : 0;
  const light = has ? Math.round(prog.lightbodyIntegration.integrationLevel) : 0;
  const grid  = has ? Math.round(((prog.gridActivation.treeSpheres.filter(Boolean).length + prog.gridActivation.shieldIntegration.filter(Boolean).length) / 17) * 100) : 0;

  return (
    <section ref={ref} className="py-20 md:py-28 px-4" style={{ background: "var(--cosmic-800)" }}>
      <div className="max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-12">
            <span className="inline-block mb-3" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--sacred-gold)" }}>/ PERSONAL.PROGRESS</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Cinzel', serif", color: "var(--static-white)" }}>Your Ascension Timeline</h2>
          </div>
          <div className="flex justify-center mb-12">
            <div className="card-glass text-center px-8 py-6 inline-flex flex-col items-center" style={{ minWidth: 200 }}>
              <span className="text-4xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: "var(--sacred-gold)" }}>{has ? `Lv.${level}` : "—"}</span>
              <span className="text-xs mt-1" style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em", color: "var(--cosmic-300)" }}>DEVELOPMENT.LEVEL</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "CHAKRA.MASTERY", val: chakra, color: "var(--sacred-violet)" },
              { label: "LIGHTBODY.INTEGRATION", val: light, color: "var(--sacred-gold)" },
              { label: "GRID.ACTIVATION", val: grid, color: "var(--sacred-crystal)" },
            ].map((item) => (
              <div key={item.label} className="card-glass">
                <div className="flex justify-between items-center mb-3">
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--cosmic-300)" }}>{item.label}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", color: item.color }}>{item.val}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--cosmic-700)" }}>
                  <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${vis ? item.val : 0}%`, background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/progress">
              <Button className="py-5 px-8 h-auto" style={{ background: "var(--sacred-violet)", color: "white", borderRadius: "0.75rem", fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.15em" }}>
                <TrendingUp className="w-4 h-4 mr-2" />VIEW.FULL.DASHBOARD
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function VERSDockSection() {
  const [ref, vis] = useReveal(0.15);
  const { openChat, setPageContext } = useVERS();
  const prompts = ["What are the 15 chakras and their functions?", "How do I activate my 12D Shield?", "Guide me through a Lightbody meditation", "What is the GSF principle?"];
  return (
    <section ref={ref} className="relative py-20 md:py-28 px-4 overflow-hidden" style={{ background: "var(--cosmic-900)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
      <div className={`relative max-w-4xl mx-auto text-center transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <span className="inline-block mb-3" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--sacred-violet)" }}>/ AI.GUIDANCE</span>
        <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Cinzel', serif", color: "var(--static-white)" }}>Speak with V.E.R.S.</h2>
        <p className="mb-10 max-w-xl mx-auto" style={{ fontFamily: "'Open Sans', sans-serif", color: "var(--cosmic-300)", fontSize: "0.95rem" }}>
          Your Vibrational Energy Resonance System — grounded in Energetic Synthesis teachings, available through voice or text
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-2xl mx-auto">
          {prompts.map((p) => (
            <button key={p} onClick={() => { setPageContext(`Home VERS prompt: ${p}`); openChat(); }}
              className="card-glass text-left text-sm cursor-pointer" style={{ fontFamily: "'Open Sans', sans-serif", color: "var(--cosmic-200)" }}>
              <Sparkles className="w-3.5 h-3.5 inline mr-2 mb-0.5" style={{ color: "var(--sacred-violet)" }} />{p}
            </button>
          ))}
        </div>
        <Button onClick={() => { setPageContext("Home page — user opened VERS from dock"); openChat(); }}
          className="py-5 px-8 h-auto" style={{ background: "linear-gradient(135deg, var(--sacred-violet), var(--bruise-purple))", color: "white", borderRadius: "0.75rem", fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.15em", boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}>
          <Bot className="w-4 h-4 mr-2" />OPEN.VERS.CHAT
        </Button>
      </div>
    </section>
  );
}

function CommunitySection() {
  const [ref, vis] = useReveal(0.1);
  return (
    <section ref={ref} className="py-20 md:py-28 px-4" style={{ background: "var(--cosmic-800)" }}>
      <div className={`max-w-4xl mx-auto transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="block mb-2" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--sacred-emerald)" }}>/ COMMUNITY.PULSE</span>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "'Cinzel', serif", color: "var(--static-white)" }}>Recent Activity</h2>
          </div>
          <Link href="/community">
            <Button className="h-auto py-2 px-4 text-xs" style={{ background: "transparent", border: "1px solid var(--sacred-emerald)", color: "var(--sacred-emerald)", borderRadius: "0.5rem", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>VIEW.ALL</Button>
          </Link>
        </div>
        <div className="space-y-3">
          {COMMUNITY_ITEMS.map((item) => (
            <div key={`${item.user}-${item.time}`} className="card-glass flex items-start gap-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: "var(--cosmic-700)", color: "var(--sacred-emerald)", fontFamily: "'Space Mono', monospace" }}>{item.user.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "0.9rem", color: "var(--static-white)" }}>
                  <span className="font-semibold">{item.user}</span> {item.action} <span className="italic" style={{ color: "var(--sacred-crystal)" }}>{item.topic}</span>
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "var(--cosmic-400)" }}>{item.time}</span>
                  <span className="flex items-center gap-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "var(--cosmic-400)" }}>
                    <Heart className="w-3 h-3" style={{ color: "var(--neon-pink)" }} />{item.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MeditationSection() {
  const [ref, vis] = useReveal(0.15);
  const presets = [
    { dur: 5,  label: "5 min",  type: "quick" },
    { dur: 15, label: "15 min", type: "standard" },
    { dur: 30, label: "30 min", type: "deep" },
    { dur: 60, label: "60 min", type: "extended" },
  ];
  const types = ["Chakra Clearing", "12D Shield", "Lightbody Activation", "Free Flow"];
  return (
    <section ref={ref} className="relative py-20 md:py-28 px-4" style={{ background: "var(--cosmic-900)" }}>
      <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <span className="inline-block mb-3" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--flame-gold)" }}>/ PRACTICE.QUICKSTART</span>
        <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Cinzel', serif", color: "var(--static-white)" }}>Begin Your Practice</h2>
        <p className="mb-10 max-w-xl mx-auto" style={{ fontFamily: "'Open Sans', sans-serif", color: "var(--cosmic-300)", fontSize: "0.95rem" }}>
          Choose a session length and let the guidance take you inward
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {presets.map((p) => (
            <Link key={p.dur} href="/meditation">
              <div className="card-glass text-center min-w-[130px]">
                <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Cinzel', serif", color: "var(--flame-gold)" }}>{p.dur}</div>
                <div className="text-xs" style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em", color: "var(--cosmic-300)" }}>{p.label.toUpperCase()}</div>
                <div className="text-[0.6rem] mt-1" style={{ fontFamily: "'Space Mono', monospace", color: "var(--cosmic-400)" }}>{p.type}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {types.map((t) => (
            <Link key={t} href={`/meditation?type=${t.toLowerCase().replace(/\s+/g, "-")}`}>
              <Button className="h-auto py-2.5 px-5 text-xs" style={{ background: "transparent", border: "1px solid var(--cosmic-400)", color: "var(--cosmic-200)", borderRadius: "9999px", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>{t}</Button>
            </Link>
          ))}
        </div>
        <Link href="/meditation">
          <Button className="py-6 px-10 h-auto text-base" style={{ background: "linear-gradient(135deg, var(--flame-gold), #d49520)", color: "var(--anti-bg)", borderRadius: "0.75rem", fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em", boxShadow: "0 0 30px rgba(240,192,64,0.3)" }}>
            <Play className="w-5 h-5 mr-2" />START.MEDITATION
          </Button>
        </Link>
      </div>
    </section>
  );
}

function CTAQuoteSection() {
  const [ref, vis] = useReveal(0.15);
  return (
    <section ref={ref} className="relative py-24 md:py-32 px-4 overflow-hidden" style={{ background: "var(--anti-bg)" }}>
      <div className="absolute inset-0 pointer-events-none anti-noise-overlay opacity-30" />
      <div className={`relative max-w-3xl mx-auto text-center transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <span className="inline-block mb-6" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--static-white)", opacity: 0.4 }}>/ FROM.THECODEX</span>
        <blockquote className="mb-8">
          <p className="text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 300, fontStyle: "italic", color: "var(--static-white)" }}>
            "The organic spiritual ascension journey is a process of returning to the remembrance of who you are as a sovereign multidimensional being."
          </p>
        </blockquote>
        <cite className="block mb-10 not-italic" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--acid-green)" }}>
          — ENERGETIC SYNTHESIS TEACHINGS
        </cite>
        <Link href="/knowledge-base">
          <Button className="text-sm px-8 py-4 h-auto" style={{ background: "transparent", border: "2px solid var(--acid-green)", color: "var(--acid-green)", fontFamily: "'Space Mono', monospace", letterSpacing: "0.2em", borderRadius: 0 }}>
            <BookOpen className="w-4 h-4 mr-2" />DEEPER.KNOWLEDGE
          </Button>
        </Link>
      </div>
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      {ANIMATION_STYLE}
      <HeroSection />
      <ModuleGridSection />
      <ProgressSection />
      <VERSDockSection />
      <CommunitySection />
      <MeditationSection />
      <CTAQuoteSection />
    </main>
  );
}
