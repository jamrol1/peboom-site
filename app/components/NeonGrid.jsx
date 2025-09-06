"use client";
import { motion } from "framer-motion";

export default function NeonGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden opacity-30">
      <div className="absolute inset-0 bg-grid-pattern" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
}
