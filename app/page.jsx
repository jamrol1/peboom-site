"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Impor komponen seperti biasa
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import HowToBuy from "./components/HowToBuy";
import Tokenomics from "./components/Tokenomics";
import Roadmap from "./components/Roadmap";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import BackToTopButton from "./components/BackToTopButton";
import Stats from "./components/Stats";

// Impor komponen dinamis
const SwampBackground = dynamic(() => import("./components/SwampBackground"), { ssr: false });
const CyberpunkOpening = dynamic(() => import("./components/CyberpunkOpening"), { ssr: false });

export default function Page() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      <SwampBackground />

      {/* Tampilkan intro HANYA jika belum selesai */}
      <AnimatePresence>
        {!introFinished && (
          <CyberpunkOpening onFinished={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      {/* Tampilkan konten utama HANYA SETELAH intro selesai */}
      {introFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />

          <main>
            <section id="home"><Hero /></section>
            <section id="about"><About /></section>
            <section id="stats"><Stats /></section>
            <section id="tokenomics"><Tokenomics /></section>
            <section id="how-to-buy"><HowToBuy /></section>
            <section id="roadmap"><Roadmap /></section>
            <section id="gallery"><Gallery /></section>
          </main>

          <Footer />
          <BackToTopButton />
          <FloatingCTA />
        </motion.div>
      )}
    </>
  );
}

