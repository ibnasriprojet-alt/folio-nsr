import { motion } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'

import { Reveal, Stagger, staggerItem } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { profile } from '@/lib/data'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'

const stats = [
  { n: 4, suffix: '+', label: 'Projets réalisés' },
  { n: 6, suffix: '', label: 'Domaines techniques' },
  { n: 2, suffix: '', label: 'Années de BTS' },
  { n: 100, suffix: '%', label: 'Motivation' },
]

function StatCard({ n, suffix, label }: { n: number; suffix: string; label: string }) {
  const { count, ref } = useAnimatedCounter(n)

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="rounded-xl border border-border bg-card p-6 text-center"
    >
      <p className="text-3xl font-bold text-accent">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  )
}

export function About() {
  return (
    <section className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <Reveal>
        <p className="mb-2 font-mono text-sm text-accent">01 //</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          À propos
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal delay={0.05}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-accent" />
              <span className="text-sm">Basé · {profile.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap size={18} className="text-accent" />
              <span className="text-sm">BTS SIO — SISR</span>
            </div>
            <div className="border-t border-border pt-4">
              <p className="mb-3 text-sm font-semibold">En recherche de</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Stage</Badge>
                <Badge variant="secondary">Alternance</Badge>
                <Badge variant="secondary">Infrastructure IT</Badge>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} n={s.n} suffix={s.suffix} label={s.label} />
        ))}
      </Stagger>
    </section>
  )
}
