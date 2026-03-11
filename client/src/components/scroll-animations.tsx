import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { springs, easings } from "@/lib/animation-system";

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "scale" | "none";
    delay?: number;
    duration?: number;
    distance?: number;
    staggerChildren?: boolean;
}

/**
 * Premium Scroll Reveal Component
 * Uses Intersection Observer for high-performance reveals.
 */
export function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.8,
    distance = 50,
    staggerChildren = false,
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const getVariants = () => {
        const initialPos = {
            up: { y: distance, opacity: 0 },
            down: { y: -distance, opacity: 0 },
            left: { x: distance, opacity: 0 },
            right: { x: -distance, opacity: 0 },
            scale: { scale: 0.9, opacity: 0 },
            none: { opacity: 0 },
        };

        return {
            hidden: initialPos[direction],
            visible: {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                transition: {
                    duration,
                    delay,
                    ease: easings.sacred,
                    staggerChildren: staggerChildren ? 0.1 : 0,
                },
            },
        };
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={getVariants()}
        >
            {children}
        </motion.div>
    );
}

/**
 * Cinematic Text Reveal (Character by Character)
 */
export function TextReveal({ text, className = "" }: { text: string; className?: string }) {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className={`flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="mr-2 mb-1"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

/**
 * Parallax Scrolling Container
 */
export function ParallaxSection({ children, speed = 0.5 }: { children: ReactNode; speed?: number }) {
    return (
        <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: [0, -50 * speed] }}
            viewport={{ once: false }}
            transition={{ ease: "linear", duration: 1 }}
        >
            {children}
        </motion.div>
    );
}
