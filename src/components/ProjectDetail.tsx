import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, FileText, FolderGit2, Github, Linkedin } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { projects } from '@/lib/data'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-4 text-muted-foreground">Projet introuvable</p>
          <Button asChild className="mt-6">
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-24 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/#projets"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Retour aux projets
          </Link>

          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-accent">
              <FolderGit2 size={24} />
            </div>
            <div>
              <span className="font-mono text-xs text-muted-foreground">
                {project.category} · {project.year}
              </span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {project.title}
              </h1>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>

          {/* Image placeholder */}
          <div className="mb-8 overflow-hidden rounded-xl border border-border">
            <div className="flex h-64 items-center justify-center bg-muted">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = '<div class="flex h-64 items-center justify-center text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div>'
                  }
                }}
              />
            </div>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {project.longDescription}
            </p>
          </div>

          {project.missions && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Missions réalisées</h2>
              <ul className="space-y-3">
                {project.missions.map((m, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {m}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            {project.link && (
              <Button asChild size="lg">
                <a href={project.link} target="_blank" rel="noreferrer">
                  <FileText size={18} /> Voir le rapport
                </a>
              </Button>
            )}
            {project.pdf && !project.link && (
              <Button asChild size="lg">
                <a href={project.pdf} target="_blank" rel="noreferrer">
                  <FileText size={18} /> Voir le rapport
                </a>
              </Button>
            )}
            {project.download && (
              <Button asChild variant="outline" size="lg">
                <a href={project.download} download>
                  <ExternalLink size={18} /> Télécharger le fichier
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
