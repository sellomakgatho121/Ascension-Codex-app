import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVERS } from "@/lib/vers-context";
import { useLocation } from "wouter";
import {
  Send,
  X,
  Minimize2,
  Trash2,
  Loader2,
  MessageSquare,
} from "lucide-react";

const PAGE_CONTEXT_MAP: Record<string, string> = {
  "/": "Home page",
  "/chakras": "15-Chakra System",
  "/chakra-development": "Chakra Development",
  "/lightbody": "Lightbody Layers",
  "/hova-bodies": "Hova Bodies & Protection",
  "/tree-grid": "12-Tree Grid",
  "/meditation": "Meditation & Practices",
  "/progress": "Spiritual Progress Tracking",
  "/glossary": "Spiritual Glossary",
  "/soul-codex": "Soul Codex - Advanced Teachings",
  "/community": "Community",
  "/tools": "Spiritual Tools",
  "/enhanced-tools": "Enhanced Spiritual Tools",
  "/knowledge-base": "Knowledge Base",
  "/gsf": "GSF - God Sovereign Free",
  "/hgs": "HGS - Hieros Gamos System",
  "/humanity-creation": "Humanity Creation Story",
  "/timeline-wars": "Timeline Wars",
  "/universal-time-matrix": "Universal Time Matrix",
  "/3d-visualizations": "3D Visualizations",
  "/psychic-self-defense": "Psychic Self-Defense",
  "/beings-entities": "Beings & Entities",
  "/higher-self-evolution": "Higher Self Evolution",
  "/visual-diagrams": "Visual Diagrams",
  "/sacred-geometry": "Sacred Geometry",
  "/dna-activation": "DNA Activation",
  "/dna-visualization": "DNA Visualization",
  "/dimensional-access": "Dimensional Access",
  "/ascension-mechanics": "Ascension Mechanics",
};

export function VERSFloatingWidget() {
  const {
    messages,
    isOpen,
    isLoading,
    toggleChat,
    closeChat,
    sendMessage,
    setPageContext,
    clearMessages,
  } = useVERS();

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    const ctx = PAGE_CONTEXT_MAP[location] || "";
    setPageContext(ctx);
  }, [location, setPageContext]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const currentPageLabel = PAGE_CONTEXT_MAP[location];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 md:bottom-20 right-4 md:right-6 z-[60] w-[calc(100vw-2rem)] max-w-[420px]"
          >
            <div className="bg-[#0a0a0a] border border-neutral-800 flex flex-col h-[500px] md:h-[550px] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39ff14]/50 to-transparent" />

              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse" />
                  <span className="font-anti-mono text-[#39ff14] text-sm font-bold uppercase tracking-wider">
                    V.E.R.S.
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={clearMessages}
                    className="p-1.5 text-neutral-600 hover:text-[#ff006e] transition-colors"
                    title="Clear chat"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={closeChat}
                    className="p-1.5 text-neutral-600 hover:text-[#39ff14] transition-colors"
                    title="Minimize"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={closeChat}
                    className="p-1.5 text-neutral-600 hover:text-[#ff0033] transition-colors"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {currentPageLabel && (
                <div className="px-4 py-1.5 border-b border-neutral-800/50 bg-[#39ff14]/5">
                  <span className="font-anti-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                    Context:{" "}
                    <span className="text-[#39ff14]/70">{currentPageLabel}</span>
                  </span>
                </div>
              )}

              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 anti-scrollbar">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 text-sm font-anti-mono leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#39ff14]/10 border border-[#39ff14]/20 text-[#e8e8e8]"
                          : "bg-neutral-900 border border-neutral-800 text-neutral-300"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-neutral-900 border border-neutral-800 px-3 py-2 flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 text-[#39ff14] animate-spin" />
                      <span className="font-anti-mono text-xs text-neutral-500">
                        Processing...
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="px-3 py-3 border-t border-neutral-800 flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask V.E.R.S. anything..."
                  disabled={isLoading}
                  className="flex-1 bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-[#e8e8e8] font-anti-mono placeholder:text-neutral-600 focus:outline-none focus:border-[#39ff14]/50 disabled:opacity-50"
                  style={{ fontSize: "16px" }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-[#39ff14] text-black p-2 hover:bg-[#39ff14]/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleChat}
        className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60] w-14 h-14 flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-[#ff0033] hover:bg-[#ff0033]/80 rotate-0"
            : "bg-[#39ff14] hover:bg-[#39ff14]/80 hover:scale-110"
        }`}
        aria-label={isOpen ? "Close V.E.R.S." : "Open V.E.R.S."}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <MessageSquare className="w-6 h-6 text-black" />
        )}
      </button>
    </>
  );
}
