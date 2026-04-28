"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { APEX_BOOT_LINES } from "@/lib/apex/data"

type Props = {
  onDone: () => void
}

export function BootLoader({ onDone }: Props) {
  const [line, setLine] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let mounted = true
    const total = APEX_BOOT_LINES.length
    const interval = setInterval(() => {
      if (!mounted) return
      setLine((l) => {
        const next = Math.min(total, l + 1)
        setProgress(Math.round((next / total) * 100))
        return next
      })
    }, 280)
    const finish = setTimeout(() => {
      if (!mounted) return
      setDone(true)
      setTimeout(onDone, 550)
    }, 280 * total + 350)
    return () => {
      mounted = false
      clearInterval(interval)
      clearTimeout(finish)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#050505]"
        >
          {/* grid */}
          <div className="absolute inset-0 apex-grid-bg opacity-60" aria-hidden />
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,240,255,0.10), transparent 60%)",
            }}
          />
          <div className="apex-scanline-anim" aria-hidden />

          <div className="relative z-10 w-[min(640px,92vw)]">
            {/* logo */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #00F0FF 0%, #3B82F6 60%, #FF6B00 130%)",
                  boxShadow: "0 0 14px rgba(0,240,255,0.7)",
                }}
                aria-hidden
              />
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/80">
                APEX · DIGITAL
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mb-6 font-mono text-base uppercase tracking-[0.22em] text-[color:var(--apex-cyan)] apex-neon-cyan"
            >
              [ INITIALISING APEX MATRIX v4.0 ]
            </motion.h1>

            <ul className="mb-8 space-y-1.5 font-mono text-[12px] leading-relaxed text-white/70">
              {APEX_BOOT_LINES.slice(0, line).map((l, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  className={
                    i === APEX_BOOT_LINES.length - 1
                      ? "text-[color:var(--apex-cyan)]"
                      : ""
                  }
                >
                  <span className="text-white/30">›</span> {l}
                </motion.li>
              ))}
            </ul>

            {/* progress bar */}
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, #00F0FF 0%, #3B82F6 60%, #FF6B00 100%)",
                  boxShadow: "0 0 16px rgba(0,240,255,0.55)",
                }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              <span>integrity check · ok</span>
              <span>{progress.toString().padStart(3, "0")}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
