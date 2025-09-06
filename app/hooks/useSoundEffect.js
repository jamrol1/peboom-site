"use client";
import { useCallback } from 'react';

// Hook ini berfungsi untuk memainkan efek suara sederhana menggunakan Web Audio API.
// Digunakan saat menyalin alamat kontrak.
export default function useSoundEffect() {
  const play = useCallback((type) => {
    // Pastikan kode ini hanya berjalan di sisi browser (bukan server)
    if (typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext)) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Atur jenis suara berdasarkan tipe yang diminta
        switch(type) {
          case 'success':
            oscillator.type = 'sine'; // Gelombang suara halus
            oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            break;
          default: // Suara default jika tipe tidak dikenali
            oscillator.type = 'square'; // Gelombang suara seperti game retro
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        }
        
        // Mainkan dan hentikan suara dengan halus
        oscillator.start(audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.2);
        oscillator.stop(audioContext.currentTime + 0.2);
      } catch (e) {
        // Jangan tampilkan error jika browser tidak mendukung
        // console.log("Audio context not supported:", e);
      }
    }
  }, []); // useCallback dengan array kosong agar fungsi tidak dibuat ulang setiap render
  
  return play;
}
