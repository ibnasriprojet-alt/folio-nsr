import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, ExternalLink, Tag } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import { HashLink } from '@/components/HashLink'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { blogPosts } from '@/lib/data'
import { Badge } from '@/components/ui/badge'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-4 text-muted-foreground">Article introuvable</p>
          <Link to="/" className="mt-6 inline-block text-accent hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pt-24 pb-24">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HashLink
            to="/#blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Retour au blog
          </HashLink>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant="outline">{post.category}</Badge>
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="space-y-4">
            {post.content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className="leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {post.source && (
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <p className="mb-2 text-sm font-semibold">Article original</p>
              <a
                href={post.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                <ExternalLink size={14} />
                {post.sourceName} — Lire l'article complet
              </a>
            </div>
          )}

          <div className="mt-12 border-t border-border pt-8">
            <HashLink
              to="/#blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Retour au blog
            </HashLink>
          </div>
        </motion.article>
      </main>
      <Footer />
    </div>
  )
}
