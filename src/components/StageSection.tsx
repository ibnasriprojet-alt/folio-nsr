import { motion } from 'framer-motion'
import { Briefcase, Calendar, CheckCircle2, FileText } from 'lucide-react'

import { Reveal, Stagger, staggerItem } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { stage } from '@/lib/data'

export function StageSection() {
  return (
    <section className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <Reveal>
        <p className="mb-2 font-mono text-sm text-accent">01b //</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Expérience de stage
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 rounded-xl border border-border bg-card p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{stage.title}</h3>
              <p className="mt-1 text-muted-foreground">{stage.company}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {stage.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase size={14} />
                {stage.year}
              </span>
            </div>
          </div>

          <Stagger className="space-y-4">
            {stage.missions.map((m) => (
              <motion.div
                key={m.title}
                variants={staggerItem}
                className="flex gap-4 rounded-lg border border-border bg-muted/50 p-4"
              >
                <CheckCircle2
                  size={20}
                  className="mt-0.5 flex-shrink-0 text-accent"
                />
                <div>
                  <h4 className="font-medium">{m.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </Stagger>

          <div className="mt-6 border-t border-border pt-6">
            <p className="mb-3 text-sm font-semibold">Compétences mobilisées</p>
            <div className="flex flex-wrap gap-2">
              {stage.skills.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Button asChild variant="outline">
              <a
                href="/Rapport de Stage def.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <FileText size={16} /> Voir le rapport de stage
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
