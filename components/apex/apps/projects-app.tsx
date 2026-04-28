"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, TrendingUp } from "lucide-react"
import { APEX_PROJECTS } from "@/lib/apex/data"

export function ProjectsApp() {
  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--apex-cyan)]">
            // projects · selected case studies
          </span>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight">
            Operators we&apos;ve compounded.
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          200+ delivered · 14× avg ROI
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {APEX_PROJECTS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.4 }}
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] transition hover:border-white/15"
          >
            {/* visual */}
            <div className="relative h-40 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${p.accent}33 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, ${p.accent}22, transparent 60%)`,
                }}
                aria-hidden
              />
              <div className="absolute inset-0 apex-grid-fine opacity-50" aria-hidden />

              {/* big metric */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="font-mono text-[9px] uppercase tracking-[0.32em]"
                    style={{ color: p.accent }}
                  >
                    {p.category}
                  </div>
                  <div
                    className="mt-1 font-mono text-2xl font-semibold tracking-tight"
                    style={{
                      color: "white",
                      textShadow: `0 0 18px ${p.accent}66`,
                    }}
                  >
                    {p.metric}
                  </div>
                </div>
              </div>

              {/* hover overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/0 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <p className="text-xs leading-relaxed text-white/80">
                  {p.summary}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
              <div>
                <div className="text-sm font-medium text-white">{p.client}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  case · 0{i + 1}
                </div>
              </div>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition group-hover:border-white/30"
                style={{ color: p.accent }}
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--apex-cyan)]/30 text-[color:var(--apex-cyan)]">
            <TrendingUp className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <div className="text-sm font-medium text-white">
              200+ launches · 14× avg client ROI · 98% retention
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              audited · last reviewed q1 2026
            </div>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          full deck · upon request
        </span>
      </div>
    </div>
  )
}
