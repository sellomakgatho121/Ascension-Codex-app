import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Ambient Cosmic Background
 * A high-end background with flowingaurora, floating particles, and mouse reactivity.
 * Replaces the static gradient with a "living" environment.
 */
export function AmbientBackground() {
    const { scrollYProgress } = useScroll();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    // Transform background based on scroll
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const rotateSymmetry = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-cosmic-900">
            {/* Dynamic Aurora / Fog */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] opacity-30"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.2) 0%, transparent 70%)",
                    filter: "blur(80px)",
                    y: backgroundY,
                }}
            />

            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] opacity-20"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(0, 191, 255, 0.15) 0%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Mouse Follow Glow */}
            <motion.div
                animate={{
                    x: mousePos.x - 400,
                    y: mousePos.y - 400,
                }}
                transition={{ type: "spring", damping: 50, stiffness: 200, mass: 2 }}
                className="absolute w-[800px] h-[800px] rounded-full pointer-events-none blur-[100px] opacity-10"
                style={{
                    background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
                }}
            />

            {/* Floating Sacred Geometry Grid (Subtle) */}
            <motion.div
                style={{ rotate: rotateSymmetry }}
                className="absolute inset-0 opacity-[0.03]"
            >
                <div className="w-full h-full bg-[url('/grid.svg')] bg-[length:100px_100px]" />
            </motion.div>

            {/* Particle Accumulation Points */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-sacred-gold/20"
                        style={{
                            width: Math.random() * 4 + 1 + "px",
                            height: Math.random() * 4 + 1 + "px",
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.5, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: 5 + i * 2,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
