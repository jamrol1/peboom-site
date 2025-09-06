"use client";
import React from 'react';
import { motion } from 'framer-motion';

const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/PEBOOM";
const TWITTER_URL = process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/thepondboom";
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@peboom";

export default function Footer() {
  return (
    <footer className="py-16 px-4 bg-black/80 text-white overflow-hidden">
      <div className="container mx-auto">
        {/* Mengubah layout grid untuk jarak yang lebih baik */}
        <motion.div 
          className="grid md:grid-cols-[max-content,max-content] gap-16 items-center justify-center"
          initial={{ y: 50, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Kolom Kiri: Konten Teks dan Sosial Media */}
          <div className="text-center md:text-left">
            <img src="/poto profil.png" alt="PEBOOM Logo" className="h-20 w-20 mx-auto md:mx-0 mb-4" />
            <h3 className="text-4xl font-bold text-emerald-400 mb-4">Join The Pond!</h3>
            <p className="max-w-md mx-auto md:mx-0 mb-8 text-lg text-gray-300">Follow our socials and be part of the most explosive frog community out there!</p>
            <div className="flex justify-center md:justify-start gap-6 mb-8">
              <motion.a href={TIKTOK_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.15, rotate: 5 }}>
                <svg className="w-10 h-10 text-emerald-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.31-4.56-1.9-7.03.39-2.4 1.97-4.47 3.97-5.77.92-.6 1.97-1 3.01-1.13.01-2.89-.01-5.78.01-8.66Z"/></svg>
              </motion.a>
              <motion.a href={TWITTER_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.15, rotate: -5 }}><svg className="w-10 h-10 text-emerald-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></motion.a>
              <motion.a href={TELEGRAM_URL} target="_blank" rel="noreferrer" whileHover={{ scale: 1.15, rotate: 5 }}><svg className="w-10 h-10 text-emerald-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.13-1.04 1.4-1.74.88l-4.92-3.6-2.38 2.31c-.26.26-.6.39-.91.32z"></path></svg></motion.a>
            </div>
            <p className="text-gray-400">© {new Date().getFullYear()} PEBOOM. All Rights Reserved.</p>
          </div>

          {/* Kolom Kanan: Gambar Baru */}
          <motion.div 
            className="flex justify-center items-center"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <img 
              src="/akhir.png" 
              alt="Peboom Frog" 
              className="w-full max-w-sm" 
            />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
