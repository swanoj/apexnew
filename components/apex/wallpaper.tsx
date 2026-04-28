"use client"

export function Wallpaper() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden bg-[#070708]" aria-hidden>
      {/* base radial */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(0,240,255,0.12), transparent 60%), radial-gradient(ellipse 90% 70% at 85% 95%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,107,0,0.05), transparent 70%)",
        }}
      />
      {/* grid */}
      <div className="absolute inset-0 apex-grid-bg opacity-70" />

      {/* faint APEX wordmark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="select-none font-mono text-[18vw] font-black uppercase tracking-[0.06em] leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,240,255,0.07)",
            textShadow: "0 0 60px rgba(0,240,255,0.05)",
          }}
        >
          APEX
        </span>
      </div>

      {/* corner brackets */}
      <Bracket position="top-left" />
      <Bracket position="top-right" />
      <Bracket position="bottom-left" />
      <Bracket position="bottom-right" />

      {/* terminal-style coordinate strip */}
      <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/5 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/30 backdrop-blur md:flex">
        <span className="h-1 w-1 rounded-full bg-[#00F0FF]" />
        <span>node · apex-prime</span>
        <span className="h-3 w-px bg-white/10" />
        <span>uptime · ∞</span>
        <span className="h-3 w-px bg-white/10" />
        <span>signal · stable</span>
      </div>

      <div className="apex-noise absolute inset-0" />
    </div>
  )
}

function Bracket({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}) {
  const map: Record<typeof position, string> = {
    "top-left": "top-10 left-4 border-l border-t",
    "top-right": "top-10 right-4 border-r border-t",
    "bottom-left": "bottom-20 left-4 border-l border-b",
    "bottom-right": "bottom-20 right-4 border-r border-b",
  }
  return (
    <span
      className={`pointer-events-none absolute hidden h-8 w-8 border-[color:var(--apex-cyan)]/40 md:block ${map[position]}`}
      aria-hidden
    />
  )
}
