"use client";
import React from 'react';
import { motion } from 'framer-motion';

const PUMPFUN_URL = process.env.NEXT_PUBLIC_PUMPFUN_URL || "6PJ2PCgUKwCBe38yG5PEZF45Jn9mFGivyi6wMytspump";

export default function FloatingCTA() {
    return (
        <motion.a
            href={PUMPFUN_URL}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-40 rounded-full bg-emerald-500 px-6 py-4 font-bold text-black text-xl shadow-lg shadow-emerald-500/40"
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 150, delay: 1 }}
        >
            <span role="img" aria-label="rocket" className="mr-2">🚀</span>
            Trade Now!
        </motion.a>
    );
}
