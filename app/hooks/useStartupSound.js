// app/hooks/useStartupSound.js
"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Hook untuk memutar suara pembuka sekali.
 * Return: function play() yang aman dipanggil dari client.
 * - Tidak error kalau file audio tidak ada / autoplay ditolak
 * - Hanya memutar sekali per page load
 */
export default function useStartupSound() {
  const audioRef = useRef(null);
  const playedRef = useRef(false);

  // Inisialisasi elemen audio
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ganti path ini ke file audio kamu di /public/ kalau ada
    const src = "/assets/startup.mp3";
    try {
      const el = new Audio(src);
      el.preload = "auto";
      el.volume = 0.6;
      audioRef.current = el;
    } catch {
      audioRef.current = null;
    }
  }, []);

  // Fungsi play yang aman
  const play = useCallback(() => {
    if (playedRef.current) return;            // hanya sekali
    playedRef.current = true;

    const el = audioRef.current;
    if (!el) return;

    const p = el.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // autoplay ditolak? biarkan saja, jangan crash
      });
    }
  }, []);

  return play;
}
