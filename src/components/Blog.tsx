import { motion } from 'framer-motion'
import { BookOpen, Calendar, ChevronRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Reveal, Stagger, staggerItem } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { blogPosts } from '@/lib/data'

export function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <Reveal>
        <p className="mb-2 font-mono text-sm text-accent">05 //</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Blog & Lectures
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Retours d'expérience et articles techniques qui m'inspirent, liés à
          mes projets BTS SIO SISR.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <motion.article
            key={post.slug}
            variants={staggerItem}
            className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <Badge variant="outline">{post.category}</Badge>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            <h3 className="mb-2 font-semibold leading-snug">{post.title}</h3>
            <p className="mb-2 flex-1 text-sm text-muted-foreground">
              {post.excerpt}
            </p>

            {post.source && (
              <p className="mb-4 text-xs text-muted-foreground">
                Source:{' '}
                <a
                  href={post.source}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:underline"
                >
                  {post.sourceName} <ExternalLink size={10} />
                </a>
              </p>
            )}

            <div className="flex flex-wrap gap-3 border-t border-border pt-4">
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                <BookOpen size={14} />
                Mon analyse
                <ChevronRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              {post.source && (
                <a
                  href={post.source}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  <ExternalLink size={14} />
                  Article original
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </Stagger>
    </section>
  )
}
