"use client";

export default function ParticleBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-30 select-none">
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <radialGradient id="g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(16,185,129,.25)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0)" />
            </radialGradient>
          </defs>
          {[...Array(18)].map((_, i) => (
            <circle key={i}
              cx={`${Math.random()*100}%`}
              cy={`${Math.random()*100}%`}
              r={Math.random()*120+40}
              fill="url(#g)"/>
          ))}
        </svg>
      </div>
    </div>
  );
}
