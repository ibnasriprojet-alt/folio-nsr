import { motion } from 'framer-motion'
import { ExternalLink, FileText, FolderGit2 } from 'lucide-react'
import { Link } from 'react-router-dom'

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
            {/* Thumbnail */}
            <div className="mb-4 overflow-hidden rounded-lg border border-border bg-muted">
              <div className="flex h-40 items-center justify-center">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = '<div class="flex h-40 items-center justify-center text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div>'
                    }
                  }}
                />
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
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
              <Link
                to={`/projet/${p.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Voir le détail →
              </Link>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                >
                  <FileText size={14} /> Rapport
                </a>
              )}
              {p.pdf && (
                <a
                  href={p.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                >
                  <FileText size={14} /> Rapport
                </a>
              )}
              {p.download && (
                <a
                  href={p.download}
                  download
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                >
                  <ExternalLink size={14} /> Packet Tracer
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </Stagger>
    </section>
  )
}
