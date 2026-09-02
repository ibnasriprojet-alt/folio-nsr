import { motion } from 'framer-motion'
import { ExternalLink, FileText, FolderGit2 } from 'lucide-react'

import { Reveal, Stagger, staggerItem } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { projects } from '@/lib/data'

export function Projects() {
  return (
    <section id="projets" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <Reveal>
        <p className="mb-2 font-mono text-sm text-accent">03 //</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Projets
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Une sélection de travaux réalisés en cours, en projet tutoré et en
          stage.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <motion.div
            key={p.title}
            variants={staggerItem}
            className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-accent">
                <FolderGit2 size={22} />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {p.category} · {p.year}
              </span>
            </div>

            <h3 className="mb-2 font-semibold">{p.title}</h3>
            <p className="mb-5 flex-1 text-sm text-muted-foreground">
              {p.description}
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 border-t border-border pt-4">
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
                >
                  <FileText size={16} /> Rapport
                </a>
              )}
              {p.pdf && (
                <a
                  href={p.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
                >
                  <FileText size={16} /> Rapport
                </a>
              )}
              {p.download && (
                <a
                  href={p.download}
                  download
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                >
                  <ExternalLink size={16} /> Packet Tracer
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </Stagger>
    </section>
  )
}
