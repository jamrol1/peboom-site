import { NextResponse } from "next/server";

const QUERY = process.env.NEXT_PUBLIC_DEXSCREENER_QUERY || ""; // boleh pair atau mint

let lastGood = { marketCap: null, volume24h: null, priceUsd: null, pairUrl: null };

async function getDex() {
  if (!QUERY) return null;
  try {
    const r = await fetch(
    "https://dexscreener.com/solana/awfhvmtizbmbrp1whhj8iekwecyx7oqubguougfirzpa" + encodeURIComponent(QUERY),
      { cache: "no-store" }
    );
    if (!r.ok) return null;
    const j = await r.json();
    const pairs = Array.isArray(j?.pairs) ? j.pairs.filter(p => p.chainId === "solana") : [];
    if (!pairs.length) return null;
    const best = pairs.sort((a, b) => (b?.liquidity?.usd ?? 0) - (a?.liquidity?.usd ?? 0))[0];
    return {
      priceUsd: best?.priceUsd ? Number(best.priceUsd) : null,
      volume24h: best?.volume?.h24 ?? best?.volume24h ?? null,
      marketCap: best?.marketCap ?? best?.fdv ?? null,
      pairUrl: best?.url ?? null,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const dex = await getDex();

  const marketCap = dex?.marketCap ?? lastGood.marketCap;
  const volume24h = dex?.volume24h ?? lastGood.volume24h;
  const priceUsd  = dex?.priceUsd  ?? lastGood.priceUsd;
  const pairUrl   = dex?.pairUrl   ?? lastGood.pairUrl;

  lastGood = {
    marketCap: marketCap ?? lastGood.marketCap,
    volume24h: volume24h ?? lastGood.volume24h,
    priceUsd:  priceUsd  ?? lastGood.priceUsd,
    pairUrl:   pairUrl   ?? lastGood.pairUrl,
  };

  const res = NextResponse.json({
    marketCap: marketCap ?? null,
    volume24h: volume24h ?? null,
    priceUsd: priceUsd ?? null,
    pairUrl: pairUrl ?? null,
    updatedAt: Date.now(),
  });
  res.headers.set("Cache-Control", "s-maxage=1, stale-while-revalidate=2"); // cocok dgn refresh 1 detik
  return res;
}
