import { Link } from 'wouter';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { antiStagger, antiStaggerChild } from '@/lib/anti-animation-system';

export function AscensionFooter() {
  return (
    <footer className="bg-anti-void border-t border-anti-acid/10 mt-20 font-anti-mono">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={antiStagger}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <motion.div variants={antiStaggerChild} className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 border border-anti-acid/40 bg-anti-void flex items-center justify-center">
                <span className="text-anti-acid font-anti-display text-xl leading-none">AC</span>
              </div>
              <h3 className="text-lg font-anti-display tracking-[0.2em] text-anti-static uppercase">
                ASCENSION_CODEX
              </h3>
            </div>
            <p className="text-anti-static/30 mb-4 max-w-md text-xs leading-relaxed tracking-wide">
              Your comprehensive guide to consciousness evolution through the sacred teachings
              of Energetic Synthesis. Activate your divine blueprint and walk the path of ascension.
            </p>
            <div className="flex items-center space-x-2 text-[10px] text-anti-acid/30 tracking-widest">
              <div className="w-1.5 h-1.5 bg-anti-acid/40 rounded-full animate-pulse" />
              <span>BUILT BY SEEKERS // STATUS: ACTIVE</span>
            </div>
          </motion.div>

          <motion.div variants={antiStaggerChild}>
            <h4 className="text-xs font-anti-mono tracking-[0.3em] text-anti-acid/50 mb-4 uppercase border-b border-anti-acid/10 pb-2">
              [0x01] KNOWLEDGE
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/chakras", label: "15-Chakra System" },
                { href: "/lightbody", label: "Lightbody Layers" },
                { href: "/tree-grid", label: "12-Tree Grid" },
                { href: "/gsf", label: "GSF Principles" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-anti-static/25 hover:text-anti-acid transition-colors text-[11px] tracking-wider uppercase flex items-center gap-1.5 group">
                    <span className="w-1 h-[1px] bg-anti-acid/20 group-hover:w-3 group-hover:bg-anti-acid transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={antiStaggerChild}>
            <h4 className="text-xs font-anti-mono tracking-[0.3em] text-anti-acid/50 mb-4 uppercase border-b border-anti-acid/10 pb-2">
              [0x02] TOOLS
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/tools", label: "Codex Tools" },
                { href: "/meditation", label: "Meditations" },
                { href: "/progress", label: "Ascension Path" },
                { href: "/psychic-self-defense", label: "Psychic Defense" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-anti-static/25 hover:text-anti-acid transition-colors text-[11px] tracking-wider uppercase flex items-center gap-1.5 group">
                    <span className="w-1 h-[1px] bg-anti-acid/20 group-hover:w-3 group-hover:bg-anti-acid transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <div className="border-t border-anti-acid/5 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-anti-static/15 text-[10px] tracking-widest">
            &copy; 2024 ASCENSION_CODEX // ALL KNOWLEDGE SHARED IN SERVICE TO CONSCIOUSNESS EVOLUTION
          </div>
          <div className="flex items-center space-x-4 text-[10px]">
            <a
              href="https://energeticsynthesis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anti-static/20 hover:text-anti-acid transition-colors flex items-center space-x-1 tracking-widest uppercase"
            >
              <span>ENERGETIC_SYNTHESIS</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-anti-acid/10">|</span>
            <Link href="/glossary" className="text-anti-static/20 hover:text-anti-acid transition-colors tracking-widest uppercase">
              GLOSSARY
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mt-12 p-8 border border-anti-acid/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-anti-acid/[0.02] to-transparent" />
          <div className="flex items-center justify-center space-x-6 mb-6 relative z-10">
            <div className="w-2 h-2 bg-anti-cyan shadow-[0_0_8px_rgba(0,240,255,0.4)] animate-pulse" />
            <div className="w-2 h-2 bg-anti-acid shadow-[0_0_8px_rgba(57,255,20,0.4)] animate-pulse [animation-delay:200ms]" />
            <div className="w-2 h-2 bg-anti-neon shadow-[0_0_8px_rgba(255,0,110,0.4)] animate-pulse [animation-delay:400ms]" />
          </div>
          <p className="text-anti-static/30 font-anti-display text-2xl tracking-[0.15em] relative z-10 max-w-2xl mx-auto leading-relaxed uppercase">
            "May the Three-Fold Flame of Power, Wisdom, and Love illuminate your path to divine remembrance."
          </p>
          <div className="mt-4 text-[9px] text-anti-acid/15 tracking-[0.5em] uppercase relative z-10">
            TRANSMISSION.END
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
