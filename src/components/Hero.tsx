import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowDown, Github, Linkedin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { profile } from '@/lib/data'

const commands = [
  { prompt: '~$', text: 'whoami' },
  { prompt: '→', text: 'ibrahim-nasri · admin systèmes & réseaux' },
  { prompt: '~$', text: 'cat skills.txt' },
  { prompt: '→', text: 'debian cisco proxmox docker bash python' },
  { prompt: '~$', text: 'open --looking-for "stage / alternance"' },
  { prompt: '→', text: '✅ disponible' },
]

export function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  const bgY = useTransform(scrollY, [0, 600], [0, 150])
  const terminalY = useTransform(scrollY, [0, 600], [0, 60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background image flou */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/image-AD-serveur.jpeg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover blur-sm"
          style={{ opacity: 0.15 }}
        />
      </div>

      {/* Parallax background grid */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-grid"
      />

      {/* Floating orbs */}
      <motion.div
        animate={reduce ? {} : { y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl"
      />
      <motion.div
        animate={reduce ? {} : { y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-20 top-2/3 h-48 w-48 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div style={{ opacity }}>
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm text-accent"
          >
            BTS SIO · Spécialité SISR
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Ibrahim
            <br />
            <span className="text-muted-foreground">NASRI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 max-w-md text-lg text-muted-foreground"
          >
            {profile.headline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg">
              <a href="#projets">
                Voir mes projets <ArrowDown size={16} />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Me contacter</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {profile.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Terminal with parallax */}
        <motion.div
          style={{ y: terminalY }}
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl border border-border bg-card shadow-2xl"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              nasri@portfolio: ~
            </span>
          </div>
          <div className="space-y-2 p-5 font-mono text-sm">
            {commands.map((c, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.5 }}
                className="flex gap-2"
              >
                <span
                  className={
                    c.prompt === '→' ? 'text-accent' : 'text-muted-foreground'
                  }
                >
                  {c.prompt}
                </span>
                <span
                  className={
                    c.prompt === '→' ? 'text-muted-foreground' : 'text-foreground'
                  }
                >
                  {c.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
