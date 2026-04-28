"use client"

import { useEffect, useRef, useState } from "react"
import type { AppId } from "@/lib/apex/apps"
import { APPS } from "@/lib/apex/apps"
import { APEX_STATS } from "@/lib/apex/data"

type Line =
  | { kind: "out"; text: string; tone?: "default" | "cyan" | "orange" | "muted" | "ok" | "err" }
  | { kind: "in"; text: string }
  | { kind: "block"; node: React.ReactNode }

type Props = {
  onCommand: (id: AppId) => void
  openWindowsTitles: () => string[]
}

const HELP: { cmd: string; desc: string }[] = [
  { cmd: "help, man", desc: "list available commands" },
  { cmd: "open <app>", desc: "open about|services|process|projects|video|terminal|contact|settings" },
  { cmd: "stats", desc: "show key APEX metrics" },
  { cmd: "launch campaign", desc: "ignite a new campaign sequence" },
  { cmd: "windows", desc: "list currently open windows" },
  { cmd: "clear", desc: "clear the terminal buffer" },
  { cmd: "whoami", desc: "identify the operator" },
  { cmd: "exit", desc: "close the terminal" },
]

const APP_KEYS: Record<string, AppId> = {
  about: "about",
  services: "services",
  process: "process",
  projects: "projects",
  video: "video",
  "video lab": "video",
  terminal: "terminal",
  contact: "contact",
  settings: "settings",
}

export function TerminalApp({ onCommand, openWindowsTitles }: Props) {
  const [lines, setLines] = useState<Line[]>(() => banner())
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const push = (line: Line | Line[]) => {
    setLines((cur) => cur.concat(line))
  }

  const exec = async (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    push({ kind: "in", text: cmd })

    const lower = cmd.toLowerCase()

    if (lower === "help" || lower === "man") {
      push({
        kind: "block",
        node: (
          <div className="my-1 space-y-0.5">
            <div className="text-[color:var(--apex-cyan)]">› apex commands</div>
            {HELP.map((h) => (
              <div key={h.cmd} className="grid grid-cols-[200px_1fr] gap-2">
                <span className="text-white">{h.cmd}</span>
                <span className="text-white/50">{h.desc}</span>
              </div>
            ))}
          </div>
        ),
      })
      return
    }

    if (lower === "clear") {
      setLines([])
      return
    }

    if (lower === "whoami") {
      push({ kind: "out", text: "operator · anonymous · clearance: tier-1", tone: "cyan" })
      return
    }

    if (lower === "exit") {
      onCommand("terminal") // toggle - parent handles close on second open? we'll just print.
      push({ kind: "out", text: "session closed. (press the red dot to fully exit)", tone: "muted" })
      return
    }

    if (lower === "windows") {
      const titles = openWindowsTitles()
      if (titles.length === 0) {
        push({ kind: "out", text: "no windows currently open.", tone: "muted" })
      } else {
        push({
          kind: "block",
          node: (
            <div>
              <div className="text-[color:var(--apex-cyan)]">› open windows ({titles.length})</div>
              {titles.map((t, i) => (
                <div key={i} className="text-white/70">
                  - {t}
                </div>
              ))}
            </div>
          ),
        })
      }
      return
    }

    if (lower === "stats") {
      push({
        kind: "block",
        node: (
          <div className="my-1">
            <div className="text-[color:var(--apex-cyan)]">› apex performance signals</div>
            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-4">
              {APEX_STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-white/40 text-[10px] uppercase tracking-[0.18em]">
                    {s.label}
                  </div>
                  <div className="text-white text-lg">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      })
      return
    }

    if (lower === "launch campaign" || lower === "launch") {
      setBusy(true)
      const seq = [
        "› priming creative engine ........... ok",
        "› aligning bid signals ........... ok",
        "› deploying to meta + google ........... ok",
        "› compounding ........... 🔥",
        "[ CAMPAIGN LIVE — DOMINATING ]",
      ]
      for (const s of seq) {
        await sleep(380)
        push({
          kind: "out",
          text: s,
          tone: s.startsWith("[") ? "orange" : "default",
        })
      }
      setBusy(false)
      return
    }

    // open <app>
    const openMatch = lower.match(/^(?:open|launch|show|go to|goto|focus)\s+(.+)$/)
    if (openMatch) {
      const target = openMatch[1].trim()
      const id = APP_KEYS[target]
      if (id) {
        push({ kind: "out", text: `› opening ${APPS[id].name} ...`, tone: "cyan" })
        onCommand(id)
        return
      }
      push({
        kind: "out",
        text: `unknown target "${target}". try: about, services, process, projects, video, terminal, contact, settings.`,
        tone: "err",
      })
      return
    }

    // direct app name shortcuts
    if (APP_KEYS[lower]) {
      const id = APP_KEYS[lower]
      push({ kind: "out", text: `› opening ${APPS[id].name} ...`, tone: "cyan" })
      onCommand(id)
      return
    }

    push({
      kind: "out",
      text: `command not found: ${cmd}. type "help" for the list.`,
      tone: "err",
    })
  }

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !busy) {
      e.preventDefault()
      const cmd = input
      setInput("")
      if (cmd.trim()) {
        setHistory((h) => [...h, cmd])
        setHIdx(null)
      }
      await exec(cmd)
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length === 0) return
      const next =
        hIdx === null ? history.length - 1 : Math.max(0, hIdx - 1)
      setHIdx(next)
      setInput(history[next])
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (hIdx === null) return
      const next = hIdx + 1
      if (next >= history.length) {
        setHIdx(null)
        setInput("")
      } else {
        setHIdx(next)
        setInput(history[next])
      }
    }
  }

  return (
    <div
      className="relative h-full bg-[#040608] font-mono text-[12px] leading-relaxed text-[#aef9ff]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="apex-scanline-anim opacity-50" aria-hidden />
      <div
        className="apex-scroll relative h-full overflow-y-auto px-4 py-3"
        ref={scrollRef}
      >
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {l.kind === "in" ? (
              <div>
                <span className="text-[color:var(--apex-cyan)]">apex@matrix</span>
                <span className="text-white/40">:~$ </span>
                <span className="text-white">{l.text}</span>
              </div>
            ) : l.kind === "out" ? (
              <div className={toneClass(l.tone)}>{l.text}</div>
            ) : (
              <div>{l.node}</div>
            )}
          </div>
        ))}

        {/* prompt */}
        <div className="flex items-center">
          <span className="text-[color:var(--apex-cyan)]">apex@matrix</span>
          <span className="text-white/40">:~$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            disabled={busy}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Terminal input"
            className="flex-1 border-0 bg-transparent p-0 font-mono text-[12px] text-white outline-none placeholder:text-white/20"
            placeholder={busy ? "…" : 'type "help"'}
          />
          <span className="apex-cursor-blink ml-0.5 inline-block h-3 w-1.5 bg-[color:var(--apex-cyan)]" />
        </div>
      </div>
    </div>
  )
}

function toneClass(tone?: "default" | "cyan" | "orange" | "muted" | "ok" | "err") {
  switch (tone) {
    case "cyan":
      return "text-[color:var(--apex-cyan)]"
    case "orange":
      return "text-[color:var(--apex-orange)]"
    case "muted":
      return "text-white/40"
    case "ok":
      return "text-emerald-400"
    case "err":
      return "text-rose-400"
    default:
      return "text-white/80"
  }
}

function banner(): Line[] {
  return [
    { kind: "out", text: "APEX MATRIX v4.0 — secure terminal", tone: "cyan" },
    { kind: "out", text: "© 2026 APEX Digital · all rights reserved.", tone: "muted" },
    { kind: "out", text: "" },
    {
      kind: "out",
      text: 'type "help" for commands. try: open services, stats, launch campaign.',
      tone: "muted",
    },
    { kind: "out", text: "" },
  ]
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}
