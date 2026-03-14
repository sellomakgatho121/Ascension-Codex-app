import { useEffect } from "react";
import { useVERS } from "@/lib/vers-context";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function EnhancedVERSPage() {
  const { openChat } = useVERS();

  useEffect(() => {
    const timer = setTimeout(() => openChat(), 800);
    return () => clearTimeout(timer);
  }, [openChat]);

  return (
    <div className="min-h-screen mobile-min-vh-fix bg-[#050505] text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-5xl md:text-7xl font-anti-display text-[#39ff14] uppercase tracking-wider mb-4">
            V.E.R.S.
          </h1>
          <p className="text-lg text-neutral-400 font-anti-mono max-w-3xl mx-auto leading-relaxed mb-6">
            Vibrational Energy Resonance System — Your AI-powered spiritual guide for consciousness evolution
          </p>

          <div className="flex justify-center gap-3 text-sm mb-8">
            <Badge variant="outline" className="border-[#39ff14]/30 text-[#39ff14] font-anti-mono text-xs uppercase tracking-widest bg-[#39ff14]/5">
              Gemini Powered
            </Badge>
            <Badge variant="outline" className="border-neutral-700 text-neutral-400 font-anti-mono text-xs uppercase tracking-widest">
              Context-Aware
            </Badge>
            <Badge variant="outline" className="border-[#39ff14]/30 text-[#39ff14] font-anti-mono text-xs uppercase tracking-widest bg-[#39ff14]/5">
              Online
            </Badge>
          </div>

          <p className="text-neutral-600 font-anti-mono text-sm">
            V.E.R.S. is now available site-wide via the floating chat widget in the bottom-right corner.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "Spiritual Intelligence", color: "#39ff14", items: ["15-Chakra System Guidance", "Lightbody Activation Support", "12D Shield Protection", "Consciousness Evolution"] },
            { icon: MessageCircle, title: "Context-Aware Chat", color: "#00f0ff", items: ["Page-Aware Responses", "Conversation Memory", "Intent Recognition", "Personalized Guidance"] },
            { icon: Sparkles, title: "Always Available", color: "#7b2dff", items: ["Floating Widget on Every Page", "Persistent Across Navigation", "Instant Access Anywhere", "Minimizable Interface"] },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (i + 1) }}
              className="bg-[#0a0a0a] border border-neutral-800 p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39ff14]/30 to-transparent" />
              <feature.icon className="w-6 h-6 mb-4" style={{ color: feature.color }} />
              <h3 className="font-anti-mono font-bold text-[#e8e8e8] uppercase tracking-wide text-sm mb-3">{feature.title}</h3>
              <ul className="space-y-1.5">
                {feature.items.map((item) => (
                  <li key={item} className="text-xs text-neutral-500 font-anti-mono">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}