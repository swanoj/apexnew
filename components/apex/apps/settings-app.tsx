"use client"

import { useState } from "react"
import { Cpu, Volume2, Sparkles, Zap, Wifi, ScanLine } from "lucide-react"

export function SettingsApp() {
  const [scan, setScan] = useState(true)
  const [glow, setGlow] = useState(true)
  const [reduce, setReduce] = useState(false)
  const [sound, setSound] = useState(false)

  return (
    <div className="px-6 py-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--apex-cyan)]">
        // settings · system preferences
      </span>
      <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight">
        APEX OS · v4.0
      </h2>
      <p className="mt-1.5 text-sm text-white/60">
        Tune the matrix. None of this changes the outcome — only the vibe.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        <Toggle
          icon={ScanLine}
          label="Scanlines"
          hint="Cinematic CRT overlay"
          on={scan}
          onChange={setScan}
        />
        <Toggle
          icon={Sparkles}
          label="Neon glow"
          hint="Cyan / blue / orange accents"
          on={glow}
          onChange={setGlow}
        />
        <Toggle
          icon={Zap}
          label="Reduce motion"
          hint="Gentler animations"
          on={reduce}
          onChange={setReduce}
        />
        <Toggle
          icon={Volume2}
          label="System sounds"
          hint="UI clicks & beeps"
          on={sound}
          onChange={setSound}
        />
      </div>

      <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
          // about this system
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 md:grid-cols-3">
          <Row k="OS" v="APEX 4.0" icon={Cpu} />
          <Row k="Build" v="2026.04.28" icon={Cpu} />
          <Row k="Network" v="online" icon={Wifi} />
          <Row k="Mode" v="cinema-dark" icon={Sparkles} />
          <Row k="Renderer" v="next 16 · turbopack" icon={Zap} />
          <Row k="Operator" v="anonymous" icon={Cpu} />
        </dl>
      </div>
    </div>
  )
}

function Row({
  k,
  v,
  icon: Icon,
}: {
  k: string
  v: string
  icon: React.ElementType
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-[color:var(--apex-cyan)]" aria-hidden />
      <span className="text-white/40">{k}</span>
      <span className="ml-auto text-white/80">{v}</span>
    </div>
  )
}

function Toggle({
  icon: Icon,
  label,
  hint,
  on,
  onChange,
}: {
  icon: React.ElementType
  label: string
  hint: string
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left transition hover:border-white/15 hover:bg-white/[0.04]"
      aria-pressed={on}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-[color:var(--apex-cyan)]">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium text-white">{label}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          {hint}
        </span>
      </span>
      <span
        className="relative h-5 w-9 rounded-full transition-colors"
        style={{
          background: on ? "rgba(0,240,255,0.5)" : "rgba(255,255,255,0.12)",
          boxShadow: on ? "0 0 14px rgba(0,240,255,0.5)" : "none",
        }}
      >
        <span
          className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all"
          style={{ left: on ? "calc(100% - 18px)" : "2px" }}
        />
      </span>
    </button>
  )
}
