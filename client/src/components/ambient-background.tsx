import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

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

  const scanOffset = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const noiseRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const glitchLines = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      top: `${Math.random() * 100}%`,
      width: `${30 + Math.random() * 70}%`,
      left: `${Math.random() * 30}%`,
      delay: i * 0.7 + Math.random() * 2,
      duration: 3 + Math.random() * 4,
    })), []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-anti-bg">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(57, 255, 20, 0.03) 2px,
            rgba(57, 255, 20, 0.03) 4px
          )`,
        }}
      />

      <motion.div
        style={{ top: scanOffset }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-anti-acid/10 to-transparent"
      />

      {glitchLines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px]"
          style={{
            top: line.top,
            left: line.left,
            width: line.width,
            background: i % 3 === 0
              ? 'rgba(255, 0, 110, 0.04)'
              : i % 3 === 1
                ? 'rgba(57, 255, 20, 0.03)'
                : 'rgba(0, 240, 255, 0.03)',
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleX: [0.3, 1, 0.5],
            x: ['-10%', '5%', '-5%'],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: line.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        animate={{
          x: mousePos.x - 300,
          y: mousePos.y - 300,
        }}
        transition={{ type: "spring", damping: 60, stiffness: 120, mass: 3 }}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(57, 255, 20, 0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-[40%] h-[40%]"
        style={{
          background: "radial-gradient(ellipse, rgba(255, 0, 110, 0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.015, 0.03, 0.015],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[50%] h-[30%]"
        style={{
          background: "radial-gradient(ellipse, rgba(0, 240, 255, 0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        style={{ rotate: noiseRotate }}
        className="absolute inset-0 opacity-[0.015]"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 49px,
              rgba(57, 255, 20, 0.1) 49px,
              rgba(57, 255, 20, 0.1) 50px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 49px,
              rgba(57, 255, 20, 0.1) 49px,
              rgba(57, 255, 20, 0.1) 50px
            )`,
          }}
        />
      </motion.div>

      <div className="absolute bottom-4 right-4 font-anti-mono text-[9px] text-anti-acid/10 tracking-widest select-none">
        SYS.VOID.ACTIVE
      </div>
    </div>
  );
}
