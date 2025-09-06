"use client";
import React from 'react';
import { motion } from 'framer-motion';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function CyberButton({ children, onClick, className = "", variant = "primary", ...props }) {
  const baseClasses = "px-8 py-4 font-bold text-xl rounded-full transition-all duration-300 transform shadow-lg flex items-center justify-center";
  
  const variants = {
    primary: "bg-emerald-500 text-black hover:bg-emerald-400 shadow-emerald-500/30",
    secondary: "bg-gray-700 text-white hover:bg-gray-600 shadow-gray-700/30",
    tiktok: "bg-black text-white hover:bg-gray-800 shadow-white/20", // <-- Varian baru untuk TikTok
    copy: "bg-gray-600 text-gray-200 hover:bg-gray-500 !shadow-none"
  };
  
  return (
    <motion.button
      className={cn(baseClasses, variants[variant], className)}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
