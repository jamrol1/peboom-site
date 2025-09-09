"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CyberButton from './CyberButton';
import useSoundEffect from '../hooks/useSoundEffect';

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT || "";
const PUMPFUN_URL = process.env.NEXT_PUBLIC_PUMPFUN_URL || "https://pump.fun/coin/PEBOOM";
const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/PEBOOM";
const TWITTER_URL = process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/thepondboom";

/** Ikon X (Twitter) */
const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

/** Ikon Telegram BARU */
const TelegramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.13-1.04 1.4-1.74.88l-4.92-3.6-2.38 2.31c-.26.26-.6.39-.91.32z" />
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

          {/* PERUBAHAN: Menggunakan Ikon Telegram yang benar */}
          <CyberButton onClick={() => window.open(TELEGRAM_URL, "_blank")} variant="secondary">
            <TelegramIcon className="w-5 h-5 mr-2" />
            Join Telegram
          </CyberButton>
          
          <CyberButton onClick={() => window.open(TWITTER_URL, "_blank")} variant="secondary">
            <XIcon className="w-5 h-5 mr-2" />
            Join X
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

