import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: React.ReactNode[]
  /** Vitesse d'auto-défilement en px/s (droite → gauche). 0 désactive. */
  speed?: number
  className?: string
}

export function Marquee({
  children,
  speed = 70,
  className,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const lastRef = useRef(performance.now())
  const pauseTimerRef = useRef(0)
  const draggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, left: 0 })
  const movedRef = useRef(0)
  const pausedRef = useRef(false)
  const [hovered, setHovered] = useState(false)

  const hold = useCallback(() => {
    pausedRef.current = true
    if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current)
  }, [])

  const releaseAfter = useCallback((ms: number) => {
    pausedRef.current = true
    if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false
    }, ms)
  }, [])

  // Boucle d'auto-défilement
  useEffect(() => {
    const el = trackRef.current
    if (!el || speed <= 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tick = (now: number) => {
      const dt = (now - lastRef.current) / 1000
      lastRef.current = now

      if (!pausedRef.current && !draggingRef.current) {
        el.scrollLeft += speed * dt
        // Boucle infinie : revenir au début quand on dépasse la moitié doublée
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [speed])

  // Scroll manuel par cartes
  const step = useCallback(() => {
    const el = trackRef.current
    const first = el?.firstElementChild as HTMLElement | null
    return first ? first.offsetWidth + 24 : 360
  }, [])

  const moveBy = useCallback(
    (dir: -1 | 1) => {
      const el = trackRef.current
      if (!el) return
      el.scrollBy({ left: dir * step(), behavior: 'smooth' })
      releaseAfter(2500)
    },
    [releaseAfter, step]
  )

  // Glisser au curseur ou au doigt
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      const el = trackRef.current
      if (!el) return
      draggingRef.current = true
      movedRef.current = 0
      dragStartRef.current = { x: e.clientX, left: el.scrollLeft }
      el.setPointerCapture(e.pointerId)
      hold()
    },
    [hold]
  )

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const el = trackRef.current
    if (!el) return
    const dx = e.clientX - dragStartRef.current.x
    movedRef.current = Math.max(movedRef.current, Math.abs(dx))
    el.scrollLeft = dragStartRef.current.left - dx
  }, [])

  const endDrag = useCallback(() => {
    if (!draggingRef.current) return
    draggingRef.current = false
    releaseAfter(1500)
  }, [releaseAfter])

  // Empêche le clic après un glissement
  const onClickCapture = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (movedRef.current > 8) {
      e.preventDefault()
      e.stopPropagation()
      movedRef.current = 0
    }
  }, [])

  return (
    <div className={cn('relative mt-12', className)}>
      <div
        ref={trackRef}
        className="marquee-scroll group cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current)
          pausedRef.current = false
        }}
      >
        <div
          className={cn(
            'marquee-scroll-track flex gap-6 py-2',
            hovered && 'marquee-paused'
          )}
        >
          {children}
        </div>
      </div>

      {/* Flèches manuelles — stop auto puis pause 2,5 s */}
      <div className="absolute -top-12 right-0 z-10 flex gap-2">
        <button
          type="button"
          onClick={() => moveBy(-1)}
          aria-label="Défiler vers la gauche"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => moveBy(1)}
          aria-label="Défiler vers la droite"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Masques de fondu sur les bords */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}