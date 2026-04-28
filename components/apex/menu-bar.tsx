"use client"

import { useEffect, useState } from "react"
import { Wifi, Battery, Bluetooth, Search } from "lucide-react"

const MENU_ITEMS = ["File", "Edit", "View", "Go", "Window", "Help"]

type Props = {
  focusedTitle: string
  onOpenSearch: () => void
}

export function MenuBar({ focusedTitle, onOpenSearch }: Props) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(id)
  }, [])

  const time = now
    ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--"
  const date = now
    ? now.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : ""

  return (
    <div
      className="absolute inset-x-0 top-0 z-[200] flex h-8 items-center gap-4 border-b border-white/[0.04] bg-black/40 px-3 text-[12px] text-white/85 backdrop-blur-xl"
      style={{
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Left — logo + menu */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{
              background:
                "linear-gradient(135deg, #00F0FF 0%, #3B82F6 60%, #FF6B00 130%)",
              boxShadow: "0 0 10px rgba(0,240,255,0.6)",
            }}
            aria-hidden
          />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
            APEX
          </span>
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className="rounded px-2 py-0.5 text-white/70 transition hover:bg-white/[0.06] hover:text-white"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Center — focused window title */}
      <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/80">
          {focusedTitle}
        </span>
      </div>

      {/* Right — system tray */}
      <div className="ml-auto flex items-center gap-3 text-white/70">
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Open global search"
          className="hidden items-center gap-1.5 rounded px-2 py-0.5 transition hover:bg-white/[0.06] hover:text-white md:flex"
        >
          <Search className="h-3.5 w-3.5" />
          <kbd className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            ⌘K
          </kbd>
        </button>
        <Bluetooth className="hidden h-3.5 w-3.5 md:block" aria-hidden />
        <Wifi className="h-3.5 w-3.5" aria-hidden />
        <Battery className="hidden h-4 w-4 md:block" aria-hidden />
        <span className="hidden font-mono text-[11px] tracking-widest text-white/60 md:inline">
          {date}
        </span>
        <span className="font-mono text-[11px] tracking-widest text-white">
          {time}
        </span>
        <div
          className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold"
          style={{
            background:
              "linear-gradient(135deg, #00F0FF 0%, #3B82F6 60%, #FF6B00 130%)",
            color: "#0a0a0a",
          }}
          aria-label="User"
        >
          A
        </div>
      </div>
    </div>
  )
}
