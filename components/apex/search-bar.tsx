"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Search, ArrowRight, Command } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { APPS, type AppId } from "@/lib/apex/apps"

type Suggestion = {
  id: AppId
  label: string
  hint: string
  action: "open" | "focus"
}

type Props = {
  open: boolean
  onClose: () => void
  onCommand: (id: AppId) => void
}

const FAQ: { q: string; answer: string; route?: AppId }[] = [
  {
    q: "what is your roi",
    answer:
      "Average client ROI is 14× across 200+ projects with 98% retention.",
    route: "about",
  },
  {
    q: "how do you work",
    answer: "Discover → Design → Build → Dominate. Open Process for the full system.",
    route: "process",
  },
  {
    q: "book a call",
    answer: "Opening Contact — pick a slot or drop a brief.",
    route: "contact",
  },
  {
    q: "show me work",
    answer: "Opening selected projects.",
    route: "projects",
  },
]

function fuzzyScore(query: string, target: string): number {
  if (!query) return 0
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  if (t === q) return 100
  if (t.startsWith(q)) return 80
  if (t.includes(q)) return 60
  // letter-by-letter
  let qi = 0
  let score = 0
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) {
      score += 2
      qi++
    }
  }
  return qi === q.length ? score : 0
}

export function SearchBar({ open, onClose, onCommand }: Props) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (open) {
      setQuery("")
      // delay focus until after motion paints
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const suggestions = useMemo<Suggestion[]>(() => {
    const q = query.trim().toLowerCase()
    const apps = Object.values(APPS).filter((a) => a.id !== "search")

    const candidates = apps.flatMap((a) => {
      const targets = [a.name, ...a.aliases]
      const best = Math.max(...targets.map((t) => fuzzyScore(q, t)))
      return [
        {
          id: a.id,
          label: q ? `Open ${a.name}` : a.name,
          hint: a.subtitle,
          action: "open" as const,
          score: best,
        },
      ]
    })

    if (!q) {
      return candidates
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(({ score: _s, ...rest }) => rest)
    }

    // command shortcuts: "open xxx", "launch xxx", "show xxx"
    const cmdMatch = q.match(/^(?:open|launch|show|go to|goto|focus)\s+(.+)$/)
    const target = cmdMatch ? cmdMatch[1] : q

    candidates.forEach((c) => {
      const app = APPS[c.id]
      const targets = [app.name, ...app.aliases]
      c.score = Math.max(...targets.map((t) => fuzzyScore(target, t)))
      if (cmdMatch) c.score += 10
    })

    // FAQ overlay (highest priority on natural language matches)
    const faq = FAQ.find((f) => target.includes(f.q.split(" ")[0]) && fuzzyScore(target, f.q) > 30)
    const ranked = candidates
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ score: _s, ...rest }) => rest)

    if (faq && faq.route && !ranked.find((r) => r.id === faq.route)) {
      ranked.unshift({
        id: faq.route,
        label: faq.answer,
        hint: "answer · enter to open",
        action: "open",
      })
    }
    return ranked
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
      if (e.key === "Enter") {
        const first = suggestions[0]
        if (first) {
          e.preventDefault()
          onCommand(first.id)
          onClose()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose, onCommand, suggestions])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-[300] bg-black/55 backdrop-blur-[2px]"
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-20 z-[310] w-[min(620px,92vw)] -translate-x-1/2"
          >
            <div className="apex-glass-strong overflow-hidden rounded-2xl">
              <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
                <Search className="h-4 w-4 text-[color:var(--apex-cyan)]" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Try: "open services", "show projects", "book a call"...'
                  className="flex-1 bg-transparent font-sans text-sm text-white placeholder:text-white/40 focus:outline-none"
                  aria-label="Global search"
                />
                <kbd className="hidden items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/50 md:flex">
                  <Command className="h-3 w-3" aria-hidden />K
                </kbd>
              </div>

              <ul className="max-h-[320px] overflow-y-auto apex-scroll p-1">
                {suggestions.length === 0 && (
                  <li className="px-4 py-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                    No matches — try "services", "projects" or "terminal"
                  </li>
                )}
                {suggestions.map((s, i) => {
                  const app = APPS[s.id]
                  const Icon = app.icon
                  return (
                    <li key={`${s.id}-${i}`}>
                      <button
                        type="button"
                        onClick={() => {
                          onCommand(s.id)
                          onClose()
                        }}
                        className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/[0.06]"
                      >
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]"
                          style={{
                            boxShadow: `inset 0 0 0 1px ${app.tint}22`,
                          }}
                        >
                          <Icon className="h-4 w-4" style={{ color: app.tint }} aria-hidden />
                        </span>
                        <span className="flex flex-1 flex-col">
                          <span className="text-[13px] text-white">{s.label}</span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                            {s.hint}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white" aria-hidden />
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="flex items-center justify-between border-t border-white/5 bg-black/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                <span>Enter to open · Esc to close</span>
                <span className="text-[color:var(--apex-cyan)]">APEX OS · v4.0</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
