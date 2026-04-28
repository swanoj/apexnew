"use client"

import { motion } from "framer-motion"
import { APPS, DESKTOP_APP_ORDER, type AppId } from "@/lib/apex/apps"

type Props = {
  onOpen: (id: AppId) => void
}

export function DesktopIcons({ onOpen }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 px-6 pt-12 md:px-10 md:pt-14">
      <div
        className="pointer-events-auto grid w-fit gap-x-2 gap-y-4"
        style={{
          gridTemplateColumns: "repeat(2, minmax(96px, 1fr))",
        }}
      >
        {DESKTOP_APP_ORDER.map((id, i) => {
          const app = APPS[id]
          const Icon = app.icon
          return (
            <motion.button
              key={id}
              type="button"
              onDoubleClick={() => onOpen(id)}
              onClick={(e) => {
                if (e.detail === 2) return
                // also support single click for touch-friendliness
                if (e.detail === 1) {
                  // do nothing on single click — selection only (visual)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onOpen(id)
                }
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4, ease: "easeOut" }}
              className="group flex w-24 flex-col items-center gap-1.5 rounded-lg p-2 text-center outline-none transition focus-visible:bg-white/[0.05] focus-visible:ring-1 focus-visible:ring-[color:var(--apex-cyan)]"
              aria-label={`Open ${app.name}`}
            >
              <span
                className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition group-hover:border-white/20 group-hover:bg-white/[0.07]"
                style={{
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}
              >
                <Icon
                  className="h-5 w-5 transition group-hover:scale-110"
                  style={{ color: app.tint }}
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 0 1px ${app.tint}55, 0 0 24px -4px ${app.tint}77`,
                  }}
                />
              </span>
              <span className="line-clamp-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/75 group-hover:text-white">
                {app.name}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
