"use client";
import React from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionHeader({ children }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.h2 
      ref={ref}
      className="text-5xl md:text-7xl font-bold mb-12 text-center text-green-600 drop-shadow-md"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
    >
      {children}
    </motion.h2>
  );
}
