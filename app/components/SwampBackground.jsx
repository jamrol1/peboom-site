"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// Komponen Bintang Jatuh (Tetap sama)
const ShootingStar = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const showInterval = Math.random() * 15000 + 10000;
    const timer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 2000);
    }, showInterval);
    return () => clearTimeout(timer);
  }, [visible]);
  const startX = useMemo(() => Math.random() * 50 + 50, [visible]);
  const startY = useMemo(() => Math.random() * 40, [visible]);
  return (<AnimatePresence>{visible && (<motion.div className="absolute w-16 h-0.5 bg-gradient-to-r from-white to-transparent" style={{ top: `${startY}%`, left: `${startX}%`, transform: 'rotate(-45deg)', }} initial={{ x: 0, opacity: 0 }} animate={{ x: -400, opacity: [0, 1, 1, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}/>)}</AnimatePresence>);
};

// Komponen Bulan dengan parallax (Tetap sama)
const Moon = ({ mouseX, mouseY }) => {
  const moveX = useTransform(mouseX, [0, 1000], [-10, 10]);
  const moveY = useTransform(mouseY, [0, 600], [-5, 5]);
  return (<motion.div style={{ x: moveX, y: moveY }} className="absolute top-[10%] right-[15%]"><div className="w-20 h-20 rounded-full" style={{ backgroundColor: '#f0f8ff', boxShadow: '0 0 15px 5px #f0f8ff, 0 0 30px 15px rgba(240, 248, 255, 0.5)' }}/></motion.div>);
};

// Komponen Bintang (Tetap sama)
const Stars = () => {
  const stars = useMemo(() => Array.from({ length: 80 }, () => ({ x: Math.random() * 100, y: Math.random() * 60, size: Math.random() * 1.5 + 0.5, delay: Math.random() * 5, duration: Math.random() * 3 + 2, })), []);
  return <>{stars.map((star, i) => (<motion.circle key={i} cx={`${star.x}%`} cy={`${star.y}%`} r={star.size} fill="#f0f8ff" initial={{ opacity: 0 }} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, repeatType: 'mirror' }} />))}</>;
};

// BARU: Komponen Ombak Air yang Dinamis
const WaterWave = ({ mouseX, isBackWave = false }) => {
  const moveX = useTransform(mouseX, [0, 1000], isBackWave ? [-15, 15] : [-25, 25]);
  const wavePaths = isBackWave
    ? [ "M0,50 C250,20 400,80 720,50 C1040,20 1190,80 1440,50 L1440,100 L0,100 Z", "M0,50 C200,80 350,20 720,50 C1090,80 1240,20 1440,50 L1440,100 L0,100 Z", "M0,50 C250,20 400,80 720,50 C1040,20 1190,80 1440,50 L1440,100 L0,100 Z" ]
    : [ "M0,60 C200,90 350,30 720,60 C1090,90 1240,30 1440,60 L1440,100 L0,100 Z", "M0,60 C250,30 400,90 720,60 C1040,30 1190,90 1440,60 L1440,100 L0,100 Z", "M0,60 C200,90 350,30 720,60 C1090,90 1240,30 1440,60 L1440,100 L0,100 Z" ];
  
  return (
    <motion.svg className="absolute bottom-0 left-0 w-full h-40" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ x: moveX, zIndex: isBackWave ? 1 : 3 }}>
      <motion.path
        fill={`url(#waterGradient${isBackWave ? 'Back' : 'Front'})`}
        animate={{ d: wavePaths }}
        transition={{ duration: isBackWave ? 12 : 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id={`waterGradient${isBackWave ? 'Back' : 'Front'}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={isBackWave ? "rgba(20, 80, 100, 0.4)" : "rgba(30, 100, 120, 0.4)"} />
          <stop offset="100%" stopColor="#0b121c" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

// BARU: Komponen Katak Lucu yang Mengintip
const PeekingFrog = ({ mouseX }) => {
  const [isPeeking, setIsPeeking] = useState(false);
  const moveX = useTransform(mouseX, [0, 1000], [-10, 10]);

  useEffect(() => {
    const peekingLogic = () => {
      const isCurrentlyPeeking = Math.random() > 0.7; // 30% chance to peek
      setIsPeeking(isCurrentlyPeeking);
      const nextCheck = Math.random() * 8000 + 5000; // Cek lagi dalam 5-13 detik
      setTimeout(peekingLogic, nextCheck);
    };
    const initialTimeout = setTimeout(peekingLogic, 5000); // Mulai setelah 5 detik
    return () => clearTimeout(initialTimeout);
  }, []);

  const xPos = useMemo(() => Math.random() * 60 + 20, []);

  return (
    <motion.div className="absolute bottom-10" style={{ left: `${xPos}%`, zIndex: 2, x: moveX }}>
      <AnimatePresence>
        {isPeeking && (
          <motion.div
            initial={{ y: 40, rotate: 10 }}
            animate={{ y: [0, -5, 0], rotate: 0, transition: { duration: 1, ease: "easeInOut" } }}
            exit={{ y: 40, rotate: 10, transition: { duration: 0.5 } }}
          >
            <svg width="50" height="30" viewBox="0 0 50 30">
              <path d="M5,30 C0,15 50,15 45,30 Z" fill="#3a5f0b" />
              <circle cx="15" cy="12" r="8" fill="#3a5f0b" />
              <circle cx="35" cy="12" r="8" fill="#3a5f0b" />
              <circle cx="15" cy="12" r="5" fill="white" />
              <circle cx="35" cy="12" r="5" fill="white" />
              <circle cx="16" cy="13" r="2.5" fill="black" />
              <circle cx="36" cy="13" r="2.5" fill="black" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Komponen Flora dengan parallax
const SwampFlora = ({ mouseX }) => {
  const moveX = useTransform(mouseX, [0, 1000], [20, -20]);
  return ( <motion.div style={{ x: moveX, zIndex: 5 }} className="absolute inset-0"> <svg className="absolute bottom-0 left-0 w-48 h-48 text-black opacity-50" viewBox="0 0 200 200"> <path d="M 50 200 C 50 150, 60 120, 70 100 S 80 50, 85 0" fill="none" stroke="currentColor" strokeWidth="4" /> <path d="M 60 200 C 60 160, 70 130, 80 110 S 90 60, 95 20" fill="none" stroke="currentColor" strokeWidth="3" /> </svg> <svg className="absolute bottom-0 right-0 w-56 h-56 text-black opacity-50 -scale-x-100" viewBox="0 0 200 200"> <path d="M 50 200 C 50 150, 60 120, 70 100 S 80 50, 85 0" fill="none" stroke="currentColor" strokeWidth="5" /> <path d="M 60 200 C 60 160, 70 130, 80 110 S 90 60, 95 20" fill="none" stroke="currentColor" strokeWidth="2" /> </svg> </motion.div> );
};

// Komponen Kabut dengan parallax
const FogLayer = ({ speed, opacity, height, mouseX }) => {
  const moveX = useTransform(mouseX, [0, 1000], [-30, 30]);
  return (<motion.div className="absolute bottom-0 left-0 w-[200%]" style={{ height: height, backgroundImage: `linear-gradient(transparent, rgba(11, 18, 28, ${opacity}) 40%, #0b121c 100%)`, x: moveX, zIndex: 4 }} animate={{ x: [`${-50 + moveX.get()}%`, `${0 + moveX.get()}%`] }} transition={{ duration: speed, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}/>);
};

export default function SwampBackground() {
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(300);
  const handleMouseMove = (event) => { mouseX.set(event.clientX); mouseY.set(event.clientY); };
  const fireflies = useMemo(() => Array.from({ length: 50 }, () => ({ x: Math.random() * 100, y: Math.random() * 100, size: 1 + Math.random() * 2, delay: Math.random() * 8, duration: 4 + Math.random() * 6, })), []);

  return (
    <div className="swamp-bg" onMouseMove={handleMouseMove}>
      {/* Layer 1: Langit */}
      <svg className="absolute w-full h-full"><Stars /></svg>
      <ShootingStar />
      <Moon mouseX={mouseX} mouseY={mouseY} />
      
      {/* Layer 2: Air dan Isinya */}
      <WaterWave mouseX={mouseX} isBackWave={true} />
      <PeekingFrog mouseX={mouseX} />
      <WaterWave mouseX={mouseX} isBackWave={false} />
      
      {/* Layer 3: Kabut dan Tanaman */}
      <FogLayer speed={40} opacity={0.8} height="12rem" mouseX={mouseX} />
      <SwampFlora mouseX={mouseX} />

      {/* Layer 4: Partikel Udara (Kunang-kunang) */}
      {fireflies.map((f, i) => (<motion.div key={i} className="absolute rounded-full" style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.size, height: f.size, backgroundColor: '#f0e68c', boxShadow: '0 0 6px 2px #f0e68c, 0 0 10px 5px rgba(240, 230, 140, 0.5)', zIndex: 6 }} animate={{ x: [0, Math.random() * 40 - 20, 0], y: [0, Math.random() * 40 - 20, 0], opacity: [0, 1, 0.8, 1, 0], }} transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut", }}/>))}
    </div>
  );
}

