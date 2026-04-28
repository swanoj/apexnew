"use client"

import { motion } from "framer-motion"
import { APEX_PROCESS } from "@/lib/apex/data"

export function ProcessApp() {
  return (
    <div className="px-6 py-7">
      <div className="mb-7">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--apex-cyan)]">
          // process · 4 phases
        </span>
        <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight">
          A cinematic operating system for results.
        </h2>
        <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-white/60">
          Four phases, one squad. Every step engineered around the metric that
          moves the business.
        </p>
      </div>

      <ol className="relative space-y-4 pl-8">
        {/* timeline rail */}
        <span
          aria-hidden
          className="absolute left-3 top-2 bottom-2 w-px"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,240,255,0.6), rgba(59,130,246,0.5), rgba(255,107,0,0.5))",
            boxShadow: "0 0 8px rgba(0,240,255,0.3)",
          }}
        />

        {APEX_PROCESS.map((p, i) => (
          <motion.li
            key={p.step}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            className="relative"
          >
            {/* node */}
            <span
              aria-hidden
              className="absolute -left-[22px] top-2 flex h-4 w-4 items-center justify-center"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background:
                    i === 0
                      ? "#00F0FF"
                      : i === 1
                      ? "#3B82F6"
                      : i === 2
                      ? "#3B82F6"
                      : "#FF6B00",
                  boxShadow: `0 0 12px ${
                    i === 0
                      ? "#00F0FF"
                      : i === 1
                      ? "#3B82F6"
                      : i === 2
                      ? "#3B82F6"
                      : "#FF6B00"
                  }`,
                }}
              />
            </span>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 transition hover:border-[color:var(--apex-cyan)]/30 hover:bg-white/[0.04]">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
                    phase {p.step}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--apex-cyan)]">
                  {p.summary}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
                {p.detail}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl border border-[color:var(--apex-orange)]/30 bg-[color:var(--apex-orange)]/[0.04] p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--apex-orange)]">
              // outcome guarantee
            </div>
            <p className="mt-1.5 text-sm text-white/80">
              If the model doesn&apos;t move within 90 days, we keep working
              until it does. No retainer roulette.
            </p>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 md:inline">
            sla · sealed
          </span>
        </div>
      </div>
    </div>
  )
}
