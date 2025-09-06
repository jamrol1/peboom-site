/* PEBOOM landing (JSX) minimal) */
import { useState } from "react";
import { motion } from "framer-motion";

export default function Page(){
  const [copied, setCopied] = useState(false);
  const CONTRACT_ADDRESS = "TBA";
  const PUMPFUN_URL = "https://pump.fun/token/TBA";
  const TWITTER_URL = "https://x.com/thepondboom";
  const TELEGRAM_URL = "https://t.me/peboom";

  const copy = async () => {
    try{
      if (window.isSecureContext && navigator?.clipboard?.writeText){
        await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      } else {
        const ta = document.createElement("textarea");
        ta.value = CONTRACT_ADDRESS; ta.style.position="fixed"; ta.style.opacity="0";
        document.body.appendChild(ta); ta.focus(); ta.select(); document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true); setTimeout(()=>setCopied(false), 1500);
    }catch(e){ console.error(e); }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section id="top" className="relative overflow-hidden p-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-black leading-tight">
            <span className="block text-white/80">The frog that</span>
            <span className="text-cyan-300"> JUMPS &amp; GOES BOOM</span>
          </h1>
          <p className="mt-4 text-white/70">
            $PBOOM exists for one thing: <span className="text-white">max FOMO</span>.
            No presale. No team tokens. <span className="text-white">100% community</span>.
            When this frog jumps… the market <span className="text-white">BOOMS!</span>
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#buy" className="px-5 py-3 rounded-xl bg-cyan-300 text-black font-bold">Buy on Pump.fun</a>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer noopener"
               className="px-5 py-3 rounded-xl bg-white/10">Join Telegram</a>
          </div>

          <div className="mt-6 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-2">
            <span className="text-xs uppercase bg-emerald-500/20 text-emerald-200 px-2 py-1 rounded">Contract</span>
            <code className="truncate">{CONTRACT_ADDRESS}</code>
            <button onClick={copy} className="ml-auto px-3 py-1 rounded bg-white/10 hover:bg-white/20">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <div className="relative">
          <img src="/assets/mascot/peboom-frog-hero-v1.png" alt="$PBOOM Frog" className="relative z-10 max-w-md mx-auto" />
          <motion.img
            src="/assets/parallax/peboom-particles-overlay.png"
            alt="particles" className="absolute inset-0 w-full h-full object-contain opacity-70"
            initial={{ y: -10 }} animate={{ y: [-10, 6, -10] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      <section className="snap-y snap-mandatory h-[240vh] overflow-auto">
        {[\
          {img:'/assets/story/peboom_character_1.png', title:'Born to BOOM', body:'No presale. No team. 100% community.'},\
          {img:'/assets/story/peboom_character_2.png', title:'Cute face. Explosive chart.', body:'0/0 tax. Seamless buy & sell.'},\
          {img:'/assets/story/peboom_character_3.png', title:'Light the fuse.', body:'When this frog jumps… it BOOMs.'},\
        ].map((s,i)=>(\
          <div key={i} className="min-h-screen snap-start grid md:grid-cols-2 items-center max-w-7xl mx-auto px-8 gap-8">\
            <img src={s.img} className="max-w-lg mx-auto" alt="scene" />\
            <div>\
              <h3 className="text-4xl font-extrabold">{s.title}</h3>\
              <p className="text-white/70 mt-2">{s.body}</p>\
              <div className="mt-4 flex gap-3">\
                <a href={PUMPFUN_URL} target="_blank" rel="noreferrer noopener" className="px-5 py-3 rounded-xl bg-cyan-300 text-black font-bold">Buy</a>\
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer noopener" className="px-5 py-3 rounded-xl bg-white/10">Join Telegram</a>\
              </div>\
            </div>\
          </div>\
        ))}\
      </section>
    </div>
  );
}
