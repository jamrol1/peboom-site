"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  
  return (
    <section id="about" ref={ref} className="py-24 px-4">
      <div className="container mx-auto">
        <SectionHeader>What is Peboom?</SectionHeader>
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center bg-black/40 backdrop-blur-md border border-emerald-500/30 p-10 rounded-3xl shadow-xl"
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="flex justify-center"
            whileHover={{ scale: 1.05, rotate: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/frog-about-story.png"
              alt="About Frog"
              className="w-full max-w-md rounded-2xl shadow-lg"
            />
          </motion.div>
          <div className="text-center md:text-left">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Born from a wild frog experiment, Peboom is here to make a splash! 🐸✨
              <br/><br/>
              We're a community that loves fun, fresh memes, and exploring the exciting world of crypto together. Hop in and let's leap to the moon!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
