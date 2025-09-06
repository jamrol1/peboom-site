"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';
import CyberButton from './CyberButton';

const PUMPFUN_URL = process.env.NEXT_PUBLIC_PUMPFUN_URL || "https://pump.fun/coin/PEBOOM";

// PERUBAHAN 1: Definisikan Ikon SVG baru yang custom & andal
const WalletIcon = () => (
    <svg xmlns="http://www.w.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1-.9-2-2-2Z"/></svg>
);
const SolIcon = () => (
    <svg xmlns="http://www.w.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>
);
const PumpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 21.5-18 18l3.5-7 7-3.5L21.5 21.5Z"></path><path d="m3.5 3.5 2 2"></path><path d="m11.5 3.5 2 2"></path><path d="m3.5 11.5 2 2"></path><path d="m18.5 2.5 2.5 2.5"></path></svg>
);
const BuyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-8 4.5v9l8 4.5 8-4.5v-9L12 3z"></path><path d="m20.5 8.5-8 4.5-8-4.5"></path><path d="M12 22V13"></path><path d="m17 10-5 3-5-3"></path><path d="m7 10 5-3 5 3"></path></svg>
);


export default function HowToBuy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // PERUBAHAN 2: Ganti properti 'icon' menjadi komponen SVG
  const steps = [
    { icon: <WalletIcon />, title: "Get a Wallet", description: "Download Phantom or your wallet of choice from the app store for free." },
    { icon: <SolIcon />, title: "Get Some SOL", description: "Have SOL in your wallet to swap for $PEBOOM. If you don't have any, you can buy directly on Phantom." },
    { icon: <PumpIcon />, title: "Go to Pump.fun", description: "Go to pump.fun on your browser inside the Phantom app." },
    { icon: <BuyIcon />, title: "Buy $PEBOOM", description: "Swap your SOL for $PEBOOM. We are the cutest frog, you can't miss us!" },
  ];

  return (
    <section id="how-to-buy" ref={ref} className="py-24 px-4">
      <div className="container mx-auto">
        <SectionHeader>How to Buy</SectionHeader>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="p-8 bg-black/40 backdrop-blur-md border border-emerald-500/30 rounded-3xl shadow-lg text-center"
              initial={{ y: 100, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 + i * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center bg-emerald-900/50 text-emerald-400 mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-3">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="text-center mt-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <CyberButton onClick={() => window.open(PUMPFUN_URL, "_blank")} variant="primary">
            Get $PEBOOM Now!
          </CyberButton>
        </motion.div>
      </div>
    </section>
  );
}
