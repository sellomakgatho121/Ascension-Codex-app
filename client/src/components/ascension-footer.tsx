
import React from 'react';
import { Link } from 'wouter';
import { ThreeFoldFlameLogo } from './three-fold-flame-logo';
import { Heart, ExternalLink } from 'lucide-react';

export function AscensionFooter() {
  return (
    <footer className="bg-cosmic-800/50 backdrop-blur-sm border-t border-sacred-gold/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <ThreeFoldFlameLogo size={32} animated={true} />
              <h3 className="text-xl font-sacred font-bold text-sacred-gold">
                Ascension Codex
              </h3>
            </div>
            <p className="text-cosmic-300 mb-4 max-w-md">
              Your comprehensive guide to consciousness evolution through the sacred teachings
              of Energetic Synthesis. Activate your divine blueprint and walk the path of ascension.
            </p>
            <div className="flex items-center space-x-2 text-sm text-cosmic-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-flame-rose animate-pulse" />
              <span>by spiritual seekers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-sacred font-semibold text-sacred-silver mb-4">
              Sacred Knowledge
            </h4>
            <ul className="space-y-2">
              <li><Link href="/chakras" className="text-cosmic-300 hover:text-flame-gold transition-colors">15-Chakra System</Link></li>
              <li><Link href="/lightbody" className="text-cosmic-300 hover:text-flame-gold transition-colors">Lightbody Layers</Link></li>
              <li><Link href="/tree-grid" className="text-cosmic-300 hover:text-flame-gold transition-colors">12-Tree Grid</Link></li>
              <li><Link href="/gsf" className="text-cosmic-300 hover:text-flame-gold transition-colors">GSF Principles</Link></li>
            </ul>
          </div>

          {/* Tools & Practice */}
          <div>
            <h4 className="text-lg font-sacred font-semibold text-sacred-silver mb-4">
              Spiritual Tools
            </h4>
            <ul className="space-y-2">
              <li><Link href="/tools" className="text-cosmic-300 hover:text-flame-gold transition-colors">Codex Tools</Link></li>
              <li><Link href="/meditation" className="text-cosmic-300 hover:text-flame-gold transition-colors">Meditations</Link></li>
              <li><Link href="/progress" className="text-cosmic-300 hover:text-flame-gold transition-colors">Ascension Path</Link></li>
              <li><Link href="/psychic-self-defense" className="text-cosmic-300 hover:text-flame-gold transition-colors">Psychic Defense</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cosmic-600/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-cosmic-400 text-sm mb-4 md:mb-0">
            © 2024 Ascension Codex. All knowledge shared in service to consciousness evolution.
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <a
              href="https://energeticsynthesis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cosmic-300 hover:text-flame-gold transition-colors flex items-center space-x-1"
            >
              <span>Energetic Synthesis</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-cosmic-600">•</span>
            <Link href="/glossary" className="text-cosmic-300 hover:text-flame-gold transition-colors">
              Sacred Glossary
            </Link>
          </div>
        </div>

        {/* Three-Fold Flame Blessing */}
        <div className="text-center mt-12 p-10 bg-gradient-to-b from-cosmic-800/40 to-cosmic-900/60 rounded-3xl border border-sacred-gold/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05),transparent_70%)]" />
          <div className="flex items-center justify-center space-x-4 mb-6 relative z-10">
            <div className="w-4 h-4 bg-flame-blue rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse"></div>
            <div className="w-4 h-4 bg-flame-gold rounded-full shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-pulse [animation-delay:200ms]"></div>
            <div className="w-4 h-4 bg-flame-rose rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse [animation-delay:400ms]"></div>
          </div>
          <p className="text-cosmic-200 font-sacred text-xl italic relative z-10 max-w-2xl mx-auto leading-relaxed">
            "May the Three-Fold Flame of Power, Wisdom, and Love illuminate your path to divine remembrance."
          </p>
        </div>
      </div>
    </footer>
  );
}
