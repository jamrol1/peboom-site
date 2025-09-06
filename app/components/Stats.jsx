"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";
import SectionHeader from "./SectionHeader";
import useCountUp from "../hooks/useCountUp";
import useLiveStats from "../hooks/useLiveStats";

const DEX_PAIR = process.env.NEXT_PUBLIC_DEX_PAIR || "";

/** Format angka compact; jika null -> "—" */
function fmt(n, { money = false } = {}) {
  if (n == null || Number.isNaN(n)) return "—";
  const s = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Number(n));
  return money ? `$${s}` : s;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { data, isLoading } = useLiveStats();

  // Data target dari API
  const mcTarget  = data?.marketCap;
  const volTarget = data?.volume24h;

  // Nilai yang dianimasikan dengan count-up
  const mc  = useCountUp(inView && mcTarget  != null ? mcTarget  : 0, 500);
  const vol = useCountUp(inView && volTarget != null ? volTarget : 0, 500);

  // --- PERUBAHAN UTAMA DIMULAI DI SINI ---
  const prevMcRef = useRef();
  const prevVolRef = useRef();
  const mcControls = useAnimationControls();
  const volControls = useAnimationControls();

  // Efek untuk memicu animasi saat Market Cap berubah
  useEffect(() => {
    if (mcTarget == null) return;
    const prevMc = prevMcRef.current;
    if (typeof prevMc === 'number' && prevMc !== mcTarget) {
      if (mcTarget > prevMc) {
        // Flash hijau untuk kenaikan
        mcControls.start({ 
          backgroundColor: ["rgba(16, 185, 129, 0.5)", "rgba(0, 0, 0, 0.4)"],
          transition: { duration: 1.5, ease: "easeOut" }
        });
      } else {
        // Flash merah untuk penurunan
        mcControls.start({ 
          backgroundColor: ["rgba(239, 68, 68, 0.5)", "rgba(0, 0, 0, 0.4)"],
          transition: { duration: 1.5, ease: "easeOut" }
        });
      }
    }
    prevMcRef.current = mcTarget;
  }, [mcTarget, mcControls]);
  
  // Efek untuk memicu animasi saat Volume berubah
  useEffect(() => {
    if (volTarget == null) return;
    const prevVol = prevVolRef.current;
    if (typeof prevVol === 'number' && prevVol !== volTarget) {
      if (volTarget > prevVol) {
        // Flash hijau
        volControls.start({ 
          backgroundColor: ["rgba(16, 185, 129, 0.5)", "rgba(0, 0, 0, 0.4)"],
          transition: { duration: 1.5, ease: "easeOut" }
        });
      } else {
        // Flash merah
        volControls.start({ 
          backgroundColor: ["rgba(239, 68, 68, 0.5)", "rgba(0, 0, 0, 0.4)"],
          transition: { duration: 1.5, ease: "easeOut" }
        });
      }
    }
    prevVolRef.current = volTarget;
  }, [volTarget, volControls]);
  // --- PERUBAHAN UTAMA SELESAI ---

  const statsItems = [
    { value: mc,  label: "Market Cap",  color: "text-yellow-400", controls: mcControls },
    { value: vol, label: "24h Volume",  color: "text-pink-400",   controls: volControls },
  ];

  return (
    <section id="stats" ref={ref} className="py-24 px-4">
      <div className="container mx-auto">
        <SectionHeader>Live Stats</SectionHeader>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Gambar kiri (tidak ada perubahan) */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <img src="/frog-stats-trader.png" alt="Stats Trader Frog" className="w-full max-w-md" />
          </motion.div>

          {/* Kartu angka kanan */}
          <div className="space-y-6">
            {statsItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="bg-black/40 backdrop-blur-md border border-emerald-500/30 rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, x: 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 + i * 0.2 }}
              >
                {/* Div ini khusus untuk animasi background flash */}
                <motion.div 
                    className="p-6"
                    animate={item.controls}
                >
                    <p className={`text-5xl font-bold ${item.color}`}>
                      {isLoading && data?.marketCap == null ? "…" : fmt(item.value, { money: true })}
                    </p>
                    <p className="text-xl text-gray-400 mt-1">{item.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chart Dexscreener (tidak ada perubahan) */}
        {DEX_PAIR ? (
          <motion.div
            className="overflow-hidden rounded-2xl shadow-xl border-2 border-emerald-500/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <iframe
              src={`https://dexscreener.com/solana/${DEX_PAIR}?embed=1&theme=dark&info=false`}
              title="Dexscreener"
              className="h-[500px] w-full"
            />
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-emerald-500/30 p-6 text-gray-400">
            Chart akan muncul otomatis setelah liquidity pool (pair) live.
          </div>
        )}
      </div>
    </section>
  );
}
