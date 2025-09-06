"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/peboomportal";
const TWITTER_URL  = process.env.NEXT_PUBLIC_TWITTER_URL  || "https://twitter.com/peboomcoin";
const TIKTOK_URL   = process.env.NEXT_PUBLIC_TIKTOK_URL   || "https://www.tiktok.com/@peboom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // --- PERUBAHAN DI SINI ---
  const navItems = ['About', 'How to Buy', 'Tokenomics', 'Roadmap', 'Meme'];

  return (
    <motion.div 
      className="sticky top-4 z-50"
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "backOut" }}
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between rounded-full bg-black/40 border-2 border-emerald-500/50 px-4 py-3 backdrop-blur-lg shadow-lg shadow-emerald-500/20">
          <motion.a href="#home" className="flex items-center gap-3 group" whileHover={{ scale: 1.05 }}>
            <motion.img src="/poto profil.png" alt="PEBOOM" className="h-12 w-12" />
            <span className="font-bold text-2xl text-emerald-400 group-hover:text-white transition-colors">PEBOOM</span>
          </motion.a>
          
          <nav className="hidden gap-6 text-lg md:flex">
            {navItems.map((item) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-gray-300 hover:text-emerald-400 transition-colors" 
                whileHover={{ y: -3 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <motion.a
                href={TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <svg className="w-6 h-6 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.31-4.56-1.9-7.03.39-2.4 1.97-4.47 3.97-5.77.92-.6 1.97-1 3.01-1.13.01-2.89-.01-5.78.01-8.66Z"/>
                </svg>
              </motion.a>

              <motion.a
                href={TWITTER_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <svg className="w-7 h-7 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </motion.a>

              <motion.a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <svg className="w-7 h-7 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.13-1.04 1.4-1.74.88l-4.92-3.6-2.38 2.31c-.26.26-.6.39-.91.32z"></path>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-2 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-emerald-500/30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <nav className="flex flex-col items-center gap-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-300 hover:text-emerald-400 transition-colors text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
