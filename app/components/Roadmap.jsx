"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';

export default function Roadmap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const phases = [
    { 
      emoji: "�", 
      title: "Phase 1: Liftoff!", 
      items: ["Token Launch", "Community Kickstart", "1,000 Holders Party"], 
      color: "border-emerald-500" 
    },
    { 
      emoji: "🌟", 
      title: "Phase 2: To the Stars!", 
      items: ["Meme Contests", "Influencer Collabs", "First CEX Listing"], 
      color: "border-yellow-400" 
    },
    { 
      emoji: "🪐", 
      title: "Phase 3: New Galaxy!", 
      items: ["Peboom Merch", "NFT Collection", "Secret Utility Reveal"], 
      color: "border-pink-400" 
    }
  ];
  
  return (
    <section id="roadmap" ref={ref} className="py-24 px-4">
      <div className="container mx-auto">
        <SectionHeader>Our Fun Journey</SectionHeader>
        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, i) => (
            <motion.div 
              key={phase.title}
              className={`p-8 rounded-3xl shadow-xl bg-black/40 backdrop-blur-md border ${phase.color}`}
              initial={{ y: 100, opacity: 0, rotate: -5 }}
              animate={inView ? { y: 0, opacity: 1, rotate: 0 } : {}}
              transition={{ type: "spring", stiffness: 80, delay: 0.3 + i * 0.2 }}
              whileHover={{ y: -15, scale: 1.05 }}
            >
              <div className="text-5xl mb-4">{phase.emoji}</div>
              <h3 className="text-3xl font-bold mb-4 text-white">{phase.title}</h3>
              <ul className="space-y-2 text-lg text-gray-300">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="mr-2 mt-1 text-emerald-400">🐸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
