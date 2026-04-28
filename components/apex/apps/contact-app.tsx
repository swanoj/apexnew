"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Check, Send, Mail, MapPin } from "lucide-react"
import { useMemo, useState } from "react"

const SLOTS = ["09:00", "10:30", "13:00", "15:30", "17:00"]

function nextDays(n: number) {
  const out: { d: Date; label: string; sub: string }[] = []
  const today = new Date()
  for (let i = 0; i < n; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    out.push({
      d,
      label: d.toLocaleDateString([], { weekday: "short" }).toUpperCase(),
      sub: String(d.getDate()).padStart(2, "0"),
    })
  }
  return out
}

export function ContactApp() {
  const days = useMemo(() => nextDays(7), [])
  const [day, setDay] = useState(0)
  const [slot, setSlot] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
      {/* Left — info + calendar */}
      <div className="border-b border-white/5 px-6 py-6 lg:border-b-0 lg:border-r">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--apex-orange)]">
          // contact · start a project
        </span>
        <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight">
          Brief us. We&apos;ll respond inside 12 hours.
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-white/60">
          Pick a slot for a strategy call, or send a brief — whichever moves
          faster for you.
        </p>

        <div className="mt-5 space-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-[color:var(--apex-cyan)]" aria-hidden />
            ops@apex.digital
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[color:var(--apex-cyan)]" aria-hidden />
            New York · London · remote-first
          </div>
        </div>

        {/* calendar */}
        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
              <Calendar className="h-3.5 w-3.5 text-[color:var(--apex-cyan)]" aria-hidden />
              book a strategy call
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              30 min · free
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {days.map((d, i) => {
              const active = i === day
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    setDay(i)
                    setSlot(null)
                  }}
                  className="rounded-lg border border-white/5 bg-black/30 p-2 text-center transition hover:border-white/20"
                  style={
                    active
                      ? {
                          borderColor: "rgba(0,240,255,0.5)",
                          background: "rgba(0,240,255,0.08)",
                          boxShadow: "0 0 18px -4px rgba(0,240,255,0.45)",
                        }
                      : undefined
                  }
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/50">
                    {d.label}
                  </div>
                  <div className="mt-0.5 font-mono text-sm font-semibold text-white">
                    {d.sub}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
            {SLOTS.map((s) => {
              const active = slot === s
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSlot(s)}
                  className="rounded-md border border-white/5 bg-black/30 px-2 py-1.5 font-mono text-[11px] tracking-widest text-white/70 transition hover:border-white/20 hover:text-white"
                  style={
                    active
                      ? {
                          borderColor: "rgba(255,107,0,0.5)",
                          background: "rgba(255,107,0,0.08)",
                          color: "#fff",
                          boxShadow: "0 0 18px -4px rgba(255,107,0,0.45)",
                        }
                      : undefined
                  }
                >
                  {s}
                </button>
              )
            })}
          </div>

          {slot && (
            <div className="mt-3 rounded-lg border border-[color:var(--apex-cyan)]/30 bg-[color:var(--apex-cyan)]/[0.06] p-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--apex-cyan)]">
              › slot held · {days[day].label} {days[day].sub} · {slot}
            </div>
          )}
        </div>
      </div>

      {/* Right — form */}
      <div className="relative px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField
            label="Operator name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            placeholder="Avery Ronan"
            required
          />
          <FormField
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            placeholder="avery@company.com"
            required
          />
          <FormField
            label="Company"
            value={form.company}
            onChange={(v) => setForm({ ...form, company: v })}
            placeholder="Atlas Athletics"
          />
          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
              Brief
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What are we attacking? Goals, timeline, current stack..."
              className="block w-full resize-none rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[color:var(--apex-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[color:var(--apex-cyan)]/40"
            />
          </div>

          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border border-[color:var(--apex-cyan)]/40 bg-[color:var(--apex-cyan)]/[0.08] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.32em] text-white transition hover:bg-[color:var(--apex-cyan)]/[0.16]"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(0,240,255,0.18), 0 0 24px -4px rgba(0,240,255,0.4)",
            }}
          >
            <Send className="h-3.5 w-3.5" aria-hidden />
            transmit brief
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/10 transition-all duration-700 group-hover:left-full"
            />
          </button>

          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
            response sla · &lt; 12h · monday → friday
          </p>
        </form>

        {/* success modal */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur"
              onClick={() => setSubmitted(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 4 }}
                onClick={(e) => e.stopPropagation()}
                className="apex-glass-strong w-[min(360px,90%)] rounded-xl p-6 text-center"
              >
                <div
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(0,240,255,0.12)",
                    boxShadow:
                      "0 0 0 1px rgba(0,240,255,0.4), 0 0 30px -4px rgba(0,240,255,0.6)",
                  }}
                >
                  <Check
                    className="h-5 w-5 text-[color:var(--apex-cyan)]"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Brief received.
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  An operator from APEX will respond within 12 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: "", email: "", company: "", message: "" })
                  }}
                  className="mt-5 w-full rounded-md border border-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.32em] text-white/80 transition hover:border-white/30 hover:text-white"
                >
                  acknowledge
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[color:var(--apex-cyan)]/50 focus:outline-none focus:ring-1 focus:ring-[color:var(--apex-cyan)]/40"
      />
    </div>
  )
}
