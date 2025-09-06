"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStartupSound from '../hooks/useStartupSound';

// Komponen untuk teks dengan animasi kata per kata
const AnimatedText = ({ text }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 1.5 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      className="text-3xl md:text-5xl font-bold text-emerald-400 font-mono tracking-widest drop-shadow-[0_0_15px_#10b981] flex justify-center flex-wrap gap-x-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};


export default function LoadingScreen({ onFinished }) {
  const [isVisible, setIsVisible] = React.useState(true);
  const playSound = useStartupSound();

  React.useEffect(() => {
    playSound();
    const finishTimer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(finishTimer);
  }, [playSound]);

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
          exit={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0c1414] via-[#1a2a2a] to-[#2e4f4f] opacity-50" />
          
          <motion.img 
            src="/poto profil.png"
            alt="Peboom Loading"
            className="w-48 h-48 mb-8 drop-shadow-[0_0_25px_#00ff7f] relative z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.5 }}
          />
          
          <AnimatedText text="NO RISK NO FERRARI" />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
