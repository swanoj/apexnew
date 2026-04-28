"use client"

import { motion } from "framer-motion"
import { APEX_STATS } from "@/lib/apex/data"
import { Zap, Target, Cpu, Shield } from "lucide-react"

const PRINCIPLES = [
  { icon: Zap, title: "Speed", body: "Concept to live in weeks, not quarters." },
  { icon: Target, title: "Precision", body: "Every artifact tied to a measurable outcome." },
  { icon: Cpu, title: "AI-native", body: "Embedded intelligence in every workflow." },
  { icon: Shield, title: "Retention", body: "98% of clients still ship with us." },
]

export function AboutApp() {
  return (
    <div className="relative h-full">
      {/* hero */}
      <div className="relative overflow-hidden border-b border-white/5 px-8 pb-10 pt-10">
        <div className="absolute inset-0 apex-grid-fine opacity-40" aria-hidden />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 0% 0%, rgba(0,240,255,0.18), transparent 60%), radial-gradient(ellipse 60% 100% at 100% 100%, rgba(255,107,0,0.10), transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--apex-cyan)]">
            // about · apex digital
          </span>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-4xl">
            We Build. We Launch.{" "}
            <span className="apex-text-gradient">We Dominate.</span>
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/70">
            APEX Digital is a full-spectrum digital consulting partner for
            ambitious operators. One squad covering strategy, brand, video,
            engineering, media and AI — engineered around a single output:
            measurable dominance.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
            {[
              "One partner",
              "Every capability",
              "Zero compromise",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 border-b border-white/5 md:grid-cols-4">
        {APEX_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
            className="border-r border-white/5 px-6 py-6 last:border-r-0"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              {s.label}
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {s.value}
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              {s.hint}
            </div>
          </motion.div>
        ))}
      </div>

      {/* principles */}
      <div className="px-8 py-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
          // operating principles
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-[color:var(--apex-cyan)]/30 hover:bg-white/[0.04]"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[color:var(--apex-cyan)]/30 text-[color:var(--apex-cyan)]"
                style={{ boxShadow: "0 0 16px -4px rgba(0,240,255,0.5)" }}
              >
                <p.icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <div className="text-sm font-medium text-white">{p.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-white/60">
                  {p.body}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="apex-divider mt-8" />

        <p className="mt-6 font-mono text-[11px] leading-relaxed text-white/50">
          {"> "}team · 28 operators · strategy + creative + engineering + media{" "}
          <span className="apex-cursor-blink text-[color:var(--apex-cyan)]">
            ▍
          </span>
        </p>
      </div>
    </div>
  )
}
