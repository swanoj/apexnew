"use client"

import { motion } from "framer-motion"
import { Play, Film, Camera, Scissors, Music2 } from "lucide-react"
import { useState } from "react"

const REELS = [
  { id: "brand", label: "Brand Film", duration: "01:42", accent: "#00F0FF" },
  { id: "dtc", label: "DTC Performance", duration: "00:18", accent: "#3B82F6" },
  { id: "product", label: "Product Cinema", duration: "00:45", accent: "#FF6B00" },
  { id: "studio", label: "Studio Reel", duration: "02:03", accent: "#00F0FF" },
]

export function VideoApp() {
  const [active, setActive] = useState(REELS[0])

  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--apex-orange)]">
            // video lab · cinematic production
          </span>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight">
            Story, system and signal — all on one set.
          </h2>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/60">
            Our in-house studio shoots brand films, performance creative and
            product cinema in a single block — then our editing engine turns it
            into hundreds of platform-native, on-brand assets.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Player */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0.6, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-black"
          style={{
            aspectRatio: "16 / 9",
            boxShadow: `0 0 0 1px ${active.accent}33, 0 0 60px -20px ${active.accent}66`,
          }}
        >
          {/* mock film background */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 30%, ${active.accent}33, transparent 60%), radial-gradient(ellipse at 70% 80%, ${active.accent}22, transparent 60%), linear-gradient(180deg, #050505, #111)`,
            }}
            aria-hidden
          />
          <div className="absolute inset-0 apex-grid-fine opacity-30" aria-hidden />
          <div className="apex-scanline-anim opacity-50" aria-hidden />

          {/* center play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur transition hover:scale-110"
              style={{
                boxShadow: `0 0 0 1px ${active.accent}55, 0 0 40px -4px ${active.accent}88`,
              }}
              aria-label={`Play ${active.label}`}
            >
              <Play
                className="h-6 w-6 translate-x-0.5 fill-white text-white"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 0 6px ${active.accent}22`,
                }}
              />
            </button>
          </div>

          {/* HUD overlay */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full apex-pulse"
                style={{ background: active.accent }}
              />
              REC · {active.label}
            </span>
            <span>tc · 00:00:{active.duration}</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
            <span>apex · studio prime</span>
            <span style={{ color: active.accent }}>4k · 60fps · log-c</span>
          </div>
        </motion.div>

        {/* Reels list */}
        <div className="space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
            // selected reels
          </div>
          {REELS.map((r) => {
            const isActive = active.id === r.id
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActive(r)}
                className="group flex w-full items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-left transition hover:border-white/15 hover:bg-white/[0.04]"
                style={
                  isActive
                    ? {
                        borderColor: `${r.accent}55`,
                        background: `${r.accent}10`,
                      }
                    : undefined
                }
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-black/40"
                  style={{ color: r.accent }}
                >
                  <Film className="h-4 w-4" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-white">
                    {r.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    duration · {r.duration}
                  </span>
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: isActive ? r.accent : "rgba(255,255,255,0.4)" }}
                >
                  {isActive ? "now playing" : "play"}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* capability strip */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { icon: Camera, label: "Direction" },
          { icon: Film, label: "Cinematography" },
          { icon: Scissors, label: "Editing" },
          { icon: Music2, label: "Sound Design" },
        ].map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[color:var(--apex-orange)]/30 text-[color:var(--apex-orange)]">
              <c.icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="text-xs font-medium text-white">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
