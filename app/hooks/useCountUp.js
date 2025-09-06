"use client";
import { useState, useEffect } from 'react';

// Hook ini berfungsi untuk membuat angka berjalan naik (count up) secara animasi.
// Berguna untuk menampilkan statistik seperti jumlah holder atau market cap.
export default function useCountUp(target = 0, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    // Jangan jalankan animasi jika targetnya 0
    if (target === 0) {
        setVal(0);
        return;
    }

    let start = 0;
    const t0 = performance.now();
    let raf; // requestAnimationFrame ID

    const step = (t) => {
      const progress = Math.min(1, (t - t0) / duration);
      const currentNum = Math.floor(start + (target - start) * progress);
      setVal(currentNum);
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);

    // Fungsi cleanup untuk membatalkan animasi jika komponen dilepas
    return () => cancelAnimationFrame(raf);
  }, [target, duration]); // Efek ini akan berjalan lagi jika target atau durasi berubah

  return val;
}
