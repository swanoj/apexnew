"use client"

import { motion, useDragControls } from "framer-motion"
import { useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { AppId } from "@/lib/apex/apps"

export type WindowState = {
  id: AppId
  title: string
  subtitle?: string
  position: { x: number; y: number }
  size: { w: number; h: number }
  zIndex: number
  minimized: boolean
  maximized: boolean
}

type Props = {
  state: WindowState
  isFocused: boolean
  containerSize: { w: number; h: number }
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  onMove: (pos: { x: number; y: number }) => void
  onResize: (size: { w: number; h: number }) => void
  children: ReactNode
  /** Optional accent color for window glow */
  accent?: string
}

export function Window({
  state,
  isFocused,
  containerSize,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onResize,
  children,
  accent = "#00F0FF",
}: Props) {
  const dragControls = useDragControls()
  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const [resizing, setResizing] = useState(false)
  const startRef = useRef<{
    x: number
    y: number
    w: number
    h: number
  } | null>(null)

  const isMax = state.maximized
  const w = isMax ? containerSize.w - 16 : state.size.w
  const h = isMax ? containerSize.h - 96 : state.size.h
  const x = isMax ? 8 : state.position.x
  const y = isMax ? 40 : state.position.y

  const startResize = (e: React.PointerEvent) => {
    if (isMax) return
    e.stopPropagation()
    e.preventDefault()
    setResizing(true)
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: state.size.w,
      h: state.size.h,
    }
    const onMoveEv = (ev: PointerEvent) => {
      if (!startRef.current) return
      const dx = ev.clientX - startRef.current.x
      const dy = ev.clientY - startRef.current.y
      onResize({
        w: Math.max(420, Math.min(containerSize.w - 16, startRef.current.w + dx)),
        h: Math.max(320, Math.min(containerSize.h - 96, startRef.current.h + dy)),
      })
    }
    const onUp = () => {
      setResizing(false)
      startRef.current = null
      window.removeEventListener("pointermove", onMoveEv)
      window.removeEventListener("pointerup", onUp)
    }
    window.addEventListener("pointermove", onMoveEv)
    window.addEventListener("pointerup", onUp)
  }

  if (state.minimized) return null

  return (
    <div
      ref={constraintsRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden={false}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x,
          width: w,
          height: h,
          top: y,
          left: 0,
        }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.7 }}
        drag={!isMax && !resizing}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          top: 32,
          left: 0,
          right: containerSize.w - w,
          bottom: containerSize.h - 96,
        }}
        onDragEnd={(_, info) => {
          onMove({
            x: Math.max(0, Math.min(containerSize.w - w, x + info.offset.x)),
            y: Math.max(32, Math.min(containerSize.h - 96, y + info.offset.y)),
          })
        }}
        onPointerDown={onFocus}
        style={{
          zIndex: state.zIndex,
          boxShadow: isFocused
            ? `0 30px 100px -20px rgba(0,0,0,0.85), 0 0 0 1px ${accent}33, 0 0 60px -10px ${accent}55`
            : "0 20px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        className={cn(
          "pointer-events-auto absolute apex-glass overflow-hidden rounded-xl",
          "flex flex-col",
        )}
      >
        {/* Title bar */}
        <div
          onPointerDown={(e) => {
            onFocus()
            if (!isMax) dragControls.start(e)
          }}
          onDoubleClick={onToggleMaximize}
          className={cn(
            "relative flex h-10 shrink-0 items-center gap-3 border-b border-white/5 px-3 select-none",
            isMax ? "cursor-default" : "cursor-grab active:cursor-grabbing",
          )}
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onClose}
              aria-label="Close window"
              className="group h-3 w-3 rounded-full bg-[#ff5f57] outline-none ring-0 transition hover:bg-[#ff3b30]"
            >
              <span className="block h-full w-full rounded-full opacity-0 transition group-hover:opacity-100" />
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onMinimize}
              aria-label="Minimize window"
              className="h-3 w-3 rounded-full bg-[#febc2e] transition hover:bg-[#f4a700]"
            />
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onToggleMaximize}
              aria-label="Maximize window"
              className="h-3 w-3 rounded-full bg-[#28c840] transition hover:bg-[#00b631]"
            />
          </div>

          {/* Title */}
          <div className="pointer-events-none flex flex-1 items-center justify-center gap-2 text-xs">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: accent,
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
            <span className="font-mono uppercase tracking-[0.18em] text-white/70">
              {state.title}
            </span>
            {state.subtitle && (
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 md:inline">
                · {state.subtitle}
              </span>
            )}
          </div>

          {/* Right meta */}
          <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 md:flex">
            <span
              className={cn(
                "inline-flex h-1.5 w-1.5 rounded-full",
                isFocused ? "apex-pulse" : "",
              )}
              style={{
                background: isFocused ? accent : "rgba(255,255,255,0.25)",
              }}
            />
            <span>{isFocused ? "active" : "idle"}</span>
          </div>
        </div>

        {/* Body */}
        <div className="apex-scroll relative flex-1 overflow-auto">
          {children}
          {/* Subtle scanlines overlay */}
          <div className="apex-scanlines pointer-events-none absolute inset-0 opacity-[0.35]" />
        </div>

        {/* Resize handle */}
        {!isMax && (
          <button
            type="button"
            aria-label="Resize window"
            onPointerDown={startResize}
            className="absolute bottom-0 right-0 z-10 h-4 w-4 cursor-nwse-resize"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 text-white/30 hover:text-white/70 transition"
              aria-hidden
            >
              <path
                d="M2 14 L14 2 M6 14 L14 6 M10 14 L14 10"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          </button>
        )}
      </motion.div>
    </div>
  )
}
