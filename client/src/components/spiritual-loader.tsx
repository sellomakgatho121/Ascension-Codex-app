import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { springs } from '@/lib/animation-system';

interface SpiritualLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'chakra' | 'flame' | 'merkaba' | 'flower';
  className?: string;
  message?: string;
}

export function SpiritualLoader({
  size = 'md',
  variant = 'chakra',
  className = '',
  message
}: SpiritualLoaderProps) {

  const sizeMap = {
    sm: 32,
    md: 64,
    lg: 96
  };

  const currentSize = sizeMap[size];

  const ChakraLoader = () => (
    <div className="relative" style={{ width: currentSize, height: currentSize }}>
      {[...Array(7)].map((_, i) => {
        const colors = [
          '#FF0000', '#FF7F00', '#FFFF00', '#00FF00',
          '#0000FF', '#4B0082', '#9400D3'
        ];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full border-2"
            style={{
              borderColor: colors[i],
              boxShadow: `0 0 10px ${colors[i]}`
            }}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: currentSize,
              height: currentSize,
              opacity: [0, 1, 0],
              scale: [0.2, 1, 1.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "circOut"
            }}
          />
        );
      })}
    </div>
  );

  const FlameLoader = () => (
    <div className="flex gap-2 items-end h-24">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-4 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200"
          animate={{
            height: [40, 80, 40],
            opacity: [0.6, 1, 0.6],
            filter: ["blur(2px)", "blur(0px)", "blur(2px)"]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  const MerkabaLoader = () => (
    <div className="relative" style={{ width: currentSize, height: currentSize }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-4 border-sacred-gold rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 border-2 border-indigo-500/50 rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-4 h-4 bg-sacred-gold rounded-full shadow-[0_0_20px_#D4AF37]" />
      </motion.div>
    </div>
  );

  return (
    <div className={cn("flex flex-col items-center justify-center gap-6", className)}>
      <div className="relative">
        <AnimatePresence mode="wait">
          {variant === 'chakra' && <ChakraLoader key="chakra" />}
          {variant === 'flame' && <FlameLoader key="flame" />}
          {variant === 'merkaba' && <MerkabaLoader key="merkaba" />}
        </AnimatePresence>
      </div>
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sacred-gold font-sacred text-lg tracking-widest uppercase animate-pulse"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

export function SpiritualLoadingOverlay({
  message = "Loading consciousness...",
  variant = 'chakra'
}: {
  message?: string;
  variant?: 'chakra' | 'flame' | 'merkaba' | 'flower';
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-cosmic-950/95 backdrop-blur-2xl flex items-center justify-center z-[100]"
    >
      <SpiritualLoader variant={variant as any} size="lg" message={message} />
    </motion.div>
  );
}

