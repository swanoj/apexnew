"use client"

import { motion } from "framer-motion"
import {
  Target,
  Code2,
  ShoppingBag,
  LineChart,
  Film,
  Scissors,
  Boxes,
  Sparkles,
  ArrowUpRight,
} from "lucide-react"
import { APEX_SERVICES } from "@/lib/apex/data"

const ICONS = {
  target: Target,
  code: Code2,
  "shopping-bag": ShoppingBag,
  "line-chart": LineChart,
  film: Film,
  scissors: Scissors,
  boxes: Boxes,
  sparkles: Sparkles,
} as const

export function ServicesApp() {
  return (
    <div className="px-6 py-6">
      {/* header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--apex-cyan)]">
            // services · 8 capabilities
          </span>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight">
            Full-spectrum, under one roof.
          </h2>
          <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-white/60">
            One partner, every capability, zero compromise. Each lane is staffed
            by senior operators and backed by APEX&apos;s own playbooks.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--apex-cyan)] apex-pulse" />
          all systems online
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {APEX_SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Sparkles
          return (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.35 }}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-5 transition hover:border-[color:var(--apex-cyan)]/30 hover:bg-white/[0.04]"
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 transition group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,240,255,0.18), transparent 70%)",
                }}
                aria-hidden
              />

              <div className="flex items-start justify-between">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-[color:var(--apex-cyan)]"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(0,240,255,0.15)" }}
                >
                  <Icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {s.tag}
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold text-white">
                {s.name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                {s.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.capabilities.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60"
                  >
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                <span>0{i + 1} / 08</span>
                <span className="flex items-center gap-1 text-white/60 transition group-hover:text-[color:var(--apex-cyan)]">
                  brief us <ArrowUpRight className="h-3 w-3" aria-hidden />
                </span>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}
