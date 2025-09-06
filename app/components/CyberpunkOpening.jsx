"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStartupSound from "../hooks/useStartupSound";

// Komponen Bulan dengan kilauan
const Moon = () => (
    <motion.div 
        className="absolute top-[10%] right-[10%] w-32 h-32"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
    >
        <div className="w-full h-full rounded-full bg-gray-200 shadow-[0_0_50px_10px_rgba(255,255,255,0.3)]">
            <div className="absolute top-[20%] left-[20%] w-6 h-6 rounded-full bg-gray-400/50" />
            <div className="absolute top-[50%] right-[30%] w-4 h-4 rounded-full bg-gray-400/50" />
        </div>
        <motion.div 
          className="absolute -top-4 -left-4 w-48 h-48 bg-white/30 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
    </motion.div>
);

// Komponen Candlestick tanpa "tiang" (wick)
const RealisticCandlestickChart = () => {
    const candles = [
        { x: 5, y: 95, h: 5 }, { x: 15, y: 90, h: 7 }, { x: 25, y: 83, h: 10 },
        { x: 35, y: 73, h: 15 }, { x: 45, y: 58, h: 20 }, { x: 55, y: 38, h: 25 },
        { x: 65, y: 13, h: 30 }, { x: 75, y: -12, h: 35 }
    ];
    const logoPath = "M 5 95 C 20 90, 40 40, 80 10";

    return (
        <motion.div className="absolute w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.svg viewBox="0 0 100 100" className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none">
                <AnimatePresence>
                    {candles.map((candle, i) => (
                        <motion.rect
                            key={i}
                            x={candle.x}
                            initial={{ y: 100, height: 0 }}
                            animate={{ y: candle.y, height: candle.h }}
                            transition={{ duration: 0.4, delay: i * 0.2, ease: "easeOut" }}
                            width="8" rx="1" fill="url(#candle-gradient)"
                        />
                    ))}
                </AnimatePresence>
                 <defs>
                    <linearGradient id="candle-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>
            </motion.svg>
            <motion.img
                initial={{ opacity: 0, offsetDistance: "0%" }}
                animate={{ opacity: 1, offsetDistance: "100%" }}
                transition={{ duration: 3.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ offsetPath: `path("${logoPath}")` }}
            />
        </motion.div>
    )
}

// Animasi utama
export default function CyberpunkOpening({ onFinished }) {
  const [showFinal, setShowFinal] = useState(false);
  const playSound = useStartupSound();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    playSound();
    const s1 = setTimeout(() => setShowFinal(true), 4500);
    const end = setTimeout(() => setIsVisible(false), 6500);

    return () => { clearTimeout(s1); clearTimeout(end); };
  }, [playSound]);
  
  return (
    <AnimatePresence onExitComplete={onFinished}>
      {isVisible && (
        <motion.div
          key="direct-launch-opening"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <Moon />
          
          <AnimatePresence>
            {!showFinal && <RealisticCandlestickChart />}
          </AnimatePresence>
            
          <AnimatePresence>
            {showFinal && (
               <motion.div
                className="absolute flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.img 
                    src="poto profil.png/" alt="PEBOOM Logo"
                    className="w-24 h-24 drop-shadow-[0_0_20px_#34d399]"
                    initial={{scale: 2}}
                    animate={{scale: 1}}
                    transition={{duration: 0.5}}
                />
                <motion.h2
                  className="mt-6 font-mono text-2xl md:text-3xl text-white tracking-widest"
                  style={{ textShadow: "0 0 10px white, 0 0 20px #34d399" }}
                >
                  NO RISK NO FERRARI
                </motion.h2>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

