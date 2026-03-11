import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Sparkles, Activity, Shield, Zap } from "lucide-react";

export interface SystemItem {
    id: string | number;
    title: string;
    subtitle?: string;
    color: string;
    description: string;
    details: {
        label: string;
        value: string;
        icon?: React.ElementType;
    }[];
    practices?: string[];
    category?: string;
}

interface AdvancedSystemGuideProps {
    title: string;
    description?: string;
    items: SystemItem[];
    type: 'chakra' | 'lightbody' | 'generic';
}

export function AdvancedSystemGuide({ title, description, items, type }: AdvancedSystemGuideProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedItem = items[selectedIndex];

    return (
        <div className="flex flex-col h-[70vh] bg-cosmic-900/50 rounded-xl overflow-hidden border border-white/10 text-white">
            {/* Header Area */}
            <div className="p-6 border-b border-white/10 bg-black/20">
                <h2 className="text-2xl font-sacred font-bold text-sacred-gold flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {title}
                </h2>
                {description && (
                    <p className="text-cosmic-300 text-sm mt-1 max-w-2xl">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Navigation */}
                <div className="w-1/3 md:w-1/4 border-r border-white/10 bg-black/10 flex flex-col">
                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-1">
                            {items.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedIndex(index)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group ${index === selectedIndex
                                            ? "bg-white/10 text-white border-l-2 border-sacred-gold shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                            : "text-cosmic-400 hover:bg-white/5 hover:text-cosmic-100"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div
                                            className={`w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_currentColor]`}
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <div className="truncate">
                                            <span className="block font-medium text-sm truncate">{item.title}</span>
                                            {item.category && (
                                                <span className="block text-[10px] uppercase tracking-wider opacity-60">
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {index === selectedIndex && (
                                        <motion.div layoutId="active-indicator">
                                            <ChevronRight className="w-4 h-4 text-sacred-gold" />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-gradient-to-br from-cosmic-900 via-cosmic-800 to-black relative overflow-hidden">
                    {/* Background Ambient Glow */}
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={selectedItem.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
                            style={{ backgroundColor: selectedItem.color }}
                        />
                    </AnimatePresence>

                    <ScrollArea className="h-full">
                        <div className="p-8 relative z-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedItem.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    {/* Hero Header for Item */}
                                    <div className="flex items-start gap-6">
                                        <div
                                            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 shrink-0 backdrop-blur-md bg-white/5"
                                            style={{
                                                boxShadow: `0 0 30px ${selectedItem.color}40`,
                                                borderColor: `${selectedItem.color}40`
                                            }}
                                        >
                                            <div
                                                className="w-12 h-12 rounded-full"
                                                style={{ backgroundColor: selectedItem.color }}
                                            >
                                                <div className="w-full h-full animate-pulse-slow bg-white/20 rounded-full" />
                                            </div>
                                        </div>

                                        <div>
                                            <Badge
                                                variant="outline"
                                                className="mb-2 border-white/20"
                                                style={{ color: selectedItem.color, backgroundColor: `${selectedItem.color}10` }}
                                            >
                                                {selectedItem.subtitle || type.toUpperCase()}
                                            </Badge>
                                            <h3 className="text-3xl font-sacred font-bold text-white mb-2">
                                                {selectedItem.title}
                                            </h3>
                                            <p className="text-cosmic-100 leading-relaxed text-lg">
                                                {selectedItem.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedItem.details.map((detail, idx) => (
                                            <Card key={idx} className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                                                <CardContent className="p-4 flex items-start gap-4">
                                                    <div className="p-2 rounded-lg bg-white/5 shrink-0">
                                                        {detail.icon ? (
                                                            <detail.icon className="w-5 h-5 text-sacred-gold" />
                                                        ) : (
                                                            <Activity className="w-5 h-5 text-sacred-gold" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-semibold text-cosmic-400 uppercase tracking-wider block mb-1">
                                                            {detail.label}
                                                        </span>
                                                        <span className="text-white font-medium">
                                                            {detail.value}
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    {/* Practices List */}
                                    {/* Safely check for practices array existence */}
                                    {selectedItem.practices && selectedItem.practices.length > 0 && (
                                        <div className="bg-gradient-to-r from-sacred-gold/10 to-transparent p-6 rounded-xl border border-sacred-gold/20">
                                            <h4 className="text-sacred-gold font-bold mb-4 flex items-center gap-2">
                                                <Shield className="w-5 h-5" />
                                                Activation & Clearing Practices
                                            </h4>
                                            <ul className="space-y-3">
                                                {selectedItem.practices.map((practice, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-cosmic-100">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-sacred-gold mt-2 shrink-0" />
                                                        <span>{practice}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
