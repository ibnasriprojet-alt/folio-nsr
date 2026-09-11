import {
  BookOpen,
  Calendar,
  ChevronRight,
  ExternalLink,
  ArrowLeftRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Reveal } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { blogPosts } from '@/lib/data'

function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <article className="group flex w-[320px] flex-shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/40 sm:w-[360px]">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="outline" className="bg-background/80 backdrop-blur">
            {post.category}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar size={12} />
          {new Date(post.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>

        <h3 className="mb-2 font-semibold leading-snug">{post.title}</h3>
        <p className="mb-3 flex-1 text-sm text-muted-foreground">
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

        <div className="flex flex-wrap gap-3 border-t border-border pt-3">
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
        </div>
      </div>
    </article>
  )
}

export function Blog() {
  const doubled = [...blogPosts, ...blogPosts]

  return (
    <section id="blog" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <Reveal>
        <p className="mb-2 font-mono text-sm text-accent">05 //</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Blog & Lectures
        </h2>
        <p className="mt-4 flex items-center gap-2 text-muted-foreground">
          Retours d'expérience et articles techniques qui m'inspirent.
          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
            <ArrowLeftRight size={12} /> Défilement automatique
          </span>
        </p>
      </Reveal>

      {/* Carrousel défilant droite → gauche */}
      <div className="relative mt-12">
        <div className="blog-marquee overflow-hidden">
          <div className="blog-marquee-track flex gap-6 px-6 py-2">
            {doubled.map((post, i) => (
              <BlogCard key={`${post.slug}-${i}`} post={post} />
            ))}
          </div>
        </div>

        {/* Masques de fondu sur les bords */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      </div>

      <Reveal delay={0.1} className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          {blogPosts.length} articles — survolez pour mettre en pause
        </p>
      </Reveal>
    </section>
  )
}