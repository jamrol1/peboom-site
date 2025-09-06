"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Tippy from '@tippyjs/react';

import SectionHeader from './SectionHeader';
import CyberButton from './CyberButton';

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT || "7vMKNCKAkzQ6K4qYwyWACtC3JUNJigWU4qjJv3fJtRfJ";

// Komponen Ikon Info (tetap sama)
const InfoIcon = () => (
  <svg className="w-4 h-4 inline-block ml-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// PERUBAHAN 1: Definisikan ikon SVG yang andal
const SupplyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
);
const LiquidityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
);
const TaxesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
);
const ContractIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const SolscanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);


export default function Tokenomics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // PERUBAHAN 2: Ganti properti 'icon' dari teks menjadi komponen SVG
  const tokenomicsItems = [
    { icon: <SupplyIcon />, label: "Total Supply", value: "1,000,000,000" },
    { 
      icon: <LiquidityIcon />, 
      label: "Liquidity", 
      value: "Burned", 
      tooltip: "The liquidity pool has been sent to a dead address, making it permanently locked and preventing a 'rug pull'." 
    },
    { icon: <TaxesIcon />, label: "Taxes", value: "0%" },
    { 
      icon: <ContractIcon />, 
      label: "Contract", 
      value: "Renounced",
      tooltip: "Contract ownership has been renounced, meaning it cannot be changed or manipulated by the developers."
    },
  ];

  return (
    <section id="tokenomics" ref={ref} className="py-24 px-4">
      <div className="container mx-auto">
        <SectionHeader>Tokenomics</SectionHeader>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-6">
            {tokenomicsItems.map((item, i) => (
              <motion.div 
                key={item.label}
                className="p-6 rounded-2xl shadow-lg text-center bg-black/40 backdrop-blur-md border border-emerald-500/30"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 120, delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -10, rotate: 2 }}
              >
                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-emerald-400 mb-4 bg-emerald-900/50">
                  {item.icon}
                </div>
                <p className="text-lg text-gray-400">{item.label}</p>
                <div className="flex items-center justify-center">
                    <p className="text-2xl font-bold text-emerald-400">{item.value}</p>
                    {item.tooltip && (
                        <Tippy content={item.tooltip} theme="swamp" placement="top">
                            <span>
                                <InfoIcon />
                            </span>
                        </Tippy>
                    )}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="flex flex-col items-center"
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <img 
              src="/frog-tokenomics-business.png" 
              alt="Tokenomics Frog" 
              className="w-full max-w-sm mb-6"
            />
            {/* PERUBAHAN 3: Ganti ikon teks di tombol dengan SVG */}
            <CyberButton 
              onClick={() => window.open(`https://solscan.io/token/${CONTRACT}`, "_blank")} 
              variant="primary"
              className="gap-2"
            >
              <SolscanIcon />
              View Contract
            </CyberButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

