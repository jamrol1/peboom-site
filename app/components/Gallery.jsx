"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import SectionHeader from './SectionHeader';

// Ikon untuk tombol Share
const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

// Komponen untuk setiap item di galeri
const GalleryItem = ({ src, i, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl shadow-lg bg-black/40 border border-emerald-500/30 cursor-pointer group"
      style={{ perspective: 400 }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.img
        src={src}
        alt={`PEBOOM Meme ${i + 1}`}
        className="w-full h-full object-cover aspect-square"
        style={{ rotateX, rotateY, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <p className="text-white font-bold text-xl">View</p>
      </div>
    </motion.div>
  );
};

// Komponen utama Galeri
export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const ref = useRef(null);
  
  const images = [
    "/frog-extra-rich.png", 
    "/frog-extra-gamer.png", 
    "/frog-extra-dance.png", 
    "/frog-extra-samurai.png", 
    "/frog-gallery-selfie.png",
    "/mohonkiri.png",
    "/tidur.png",
    "/lambo.png"
  ];

  // Fungsi untuk membuat tombol Share di dalam Lightbox
  const renderShareButton = () => {
    if (index < 0) return null;
    
    // Siapkan teks dan URL untuk dibagikan
    const text = encodeURIComponent("Check out this awesome meme from the $PEBOOM community! 🐸💥 #PEBOOM #Solana #MemeCoin");
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`;
    
    return (
        <button
            type="button"
            className="yarl__button"
            style={{ right: "60px", top: "0" }}
            onClick={() => window.open(shareUrl, "_blank")}
            title="Share on X"
        >
            <ShareIcon />
        </button>
    );
  };
  
  return (
    // ID section sudah diubah menjadi "memes"
    <section id="memes" ref={ref} className="py-24 px-4">
      <div className="container mx-auto">
        {/* Judul section sudah diubah menjadi "Memes" */}
        <SectionHeader>Memes</SectionHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <GalleryItem key={i} src={src} i={i} onClick={() => setIndex(i)} />
          ))}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map(src => ({ src }))}
        render={{
            // Sembunyikan tombol navigasi bawaan
            buttonPrev: () => null,
            buttonNext: () => null,
            // Buat tombol Close custom
            buttonClose: () => (
                <button type="button" className="yarl__button" onClick={() => setIndex(-1)} title="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            ),
            // Tambahkan tombol Share ke toolbar
            toolbar: () => renderShareButton()
        }}
        styles={{
            // Sesuaikan warna background lightbox
            container: { backgroundColor: "rgba(11, 18, 28, 0.9)" },
        }}
      />
    </section>
  );
}

