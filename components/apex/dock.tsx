"use client"

import { motion } from "framer-motion"
import { APPS, DOCK_APP_ORDER, type AppId } from "@/lib/apex/apps"
import { useState } from "react"

type Props = {
  openApps: Set<AppId>
  focusedApp: AppId | null
  onOpen: (id: AppId) => void
  onOpenSearch: () => void
}

export function Dock({ openApps, focusedApp, onOpen, onOpenSearch }: Props) {
  const [hovered, setHovered] = useState<AppId | null>(null)

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-[150] flex justify-center px-3">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 24 }}
        className="apex-glass-strong pointer-events-auto flex items-end gap-1 rounded-2xl px-2.5 py-2"
      >
        {DOCK_APP_ORDER.map((id) => {
          const app = APPS[id]
          const Icon = app.icon
          const isOpen = openApps.has(id)
          const isFocused = focusedApp === id
          const isHovered = hovered === id

          return (
            <div
              key={id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered((h) => (h === id ? null : h))}
            >
              {/* Tooltip */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 6,
                }}
                transition={{ duration: 0.18 }}
                className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/10 bg-black/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/90 backdrop-blur"
                style={{
                  boxShadow: `0 0 24px -4px ${app.tint}55`,
                }}
              >
                {app.name}
              </motion.div>

              <motion.button
                type="button"
                onClick={() => {
                  if (id === "search") onOpenSearch()
                  else onOpen(id)
                }}
                animate={{
                  y: isHovered ? -8 : 0,
                  scale: isHovered ? 1.12 : 1,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
                aria-label={`Open ${app.name}`}
                className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] outline-none transition focus-visible:ring-1 focus-visible:ring-[color:var(--apex-cyan)]"
                style={{
                  boxShadow: isHovered
                    ? `0 0 0 1px ${app.tint}77, 0 0 28px -4px ${app.tint}aa, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : `inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: app.tint }}
                  aria-hidden
                />
                {/* Reflection */}
                <span
                  className="pointer-events-none absolute inset-x-2 top-0 h-1/2 rounded-t-xl opacity-50"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%)",
                  }}
                />
              </motion.button>

              {/* Active dot */}
              <span
                aria-hidden
                className="mt-1 h-1 w-1 rounded-full transition-all"
                style={{
                  background: isOpen
                    ? isFocused
                      ? app.tint
                      : "rgba(255,255,255,0.55)"
                    : "transparent",
                  boxShadow: isOpen ? `0 0 6px ${app.tint}` : "none",
                }}
              />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
