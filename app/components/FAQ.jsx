"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

// Komponen baru untuk setiap item FAQ
const FaqItem = ({ faq, i }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="bg-black/40 backdrop-blur-md border border-emerald-500/30 rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.15 }}
    >
      <motion.button
        className="w-full p-6 text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
      >
        <h3 className="text-2xl font-bold text-emerald-400">{faq.q}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-6"
          >
            <p className="text-lg text-gray-300 pb-6">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const faqs = [
    { q: "Is it safe?", a: "Absolutely! LP is burned and the contract is renounced. We're in for the long, fun haul!" },
    { q: "Why PEBOOM?", a: "Because we're the cutest frog community on the blockchain! Who doesn't love a cute frog?" },
    { q: "How to buy?", a: "It's easy! Just connect your wallet on Pump.fun or Raydium and swap your SOL for $PEBOOM." },
  ];
  
  return (
    <section id="faq" ref={ref} className="py-24 px-4">
      <div className="container mx-auto">
        <SectionHeader>Got Questions?</SectionHeader>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <motion.img 
              src="/frog-faq-thinker.png" 
              alt="FAQ Frog" 
              className="w-full max-w-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
