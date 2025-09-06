"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CyberButton from './CyberButton';
import useSoundEffect from '../hooks/useSoundEffect';

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT || "";
const PUMPFUN_URL = process.env.NEXT_PUBLIC_PUMPFUN_URL || "https://pump.fun/coin/PEBOOM";
const TELEGRAM_URL = process.env.NEXT_PUBLIC_X_URL || "https://x.com/thepondboom";
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@peboom";

/** Ikon X (Twitter) */
const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.245 3H21l-7.29 8.38L22 21h-4.755l-6.02-6.98L5.755 21H3l7.54-8.66L2 3h4.755l5.573 6.47L18.245 3z"/>
  </svg>
);

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const playSound = useSoundEffect();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT);
      setCopied(true);
      playSound('success');
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { console.error(e); }
  };

  return (
    <section id="home" className="relative pt-20 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-20">
        <motion.img
          src="/frog-hero-king.png"
          alt="Peboom Frog King"
          className="w-56 h-56 mx-auto mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        />
        <motion.h1
          className="text-7xl md:text-9xl font-bold text-emerald-400 drop-shadow-[0_0_10px_#10b981]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
        >
          PEBOOM
        </motion.h1>
        <motion.p
          className="text-2xl md:text-3xl text-gray-300 mt-2"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
        >
          The Meme Frog That Goes BOOM!
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <CyberButton onClick={() => window.open(PUMPFUN_URL, "_blank")} variant="primary">
            <span role="img" aria-label="rocket" className="mr-2">🚀</span>
            Buy $PEBOOM
          </CyberButton>

          {/* Ganti ikon Telegram -> X (Twitter). Teks & URL tetap. */}
          <CyberButton onClick={() => window.open(TELEGRAM_URL, "_blank")} variant="secondary">
            <XIcon className="w-5 h-5 mr-2" />
            Join Telegram
          </CyberButton>

          <CyberButton onClick={() => window.open(TIKTOK_URL, "_blank")} variant="tiktok">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.31-4.56-1.9-7.03.39-2.4 1.97-4.47 3.97-5.77.92-.6 1.97-1 3.01-1.13.01-2.89-.01-5.78.01-8.66Z"/>
            </svg>
            Follow TikTok
          </CyberButton>
        </motion.div>

        <motion.div
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-black/40 p-2 text-gray-300 backdrop-blur-sm shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <code className="text-sm font-mono break-all px-4 py-2 bg-gray-900/50 rounded-full">{CONTRACT}</code>
          <CyberButton onClick={handleCopy} className="text-sm !py-2 !px-4" variant="copy">
            {copied ? "Copied!" : "Copy"}
          </CyberButton>
        </motion.div>
      </div>
    </section>
  );
}
