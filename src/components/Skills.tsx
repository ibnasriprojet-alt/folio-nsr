import { motion } from 'framer-motion'
import { Activity, Box, Network, Server, Shield, Terminal } from 'lucide-react'

import { Reveal, Stagger, staggerItem } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { skills } from '@/lib/data'

const icons = {
  server: Server,
  network: Network,
  box: Box,
  terminal: Terminal,
  activity: Activity,
  shield: Shield,
}

export function Skills() {
  return (
    <section
      id="competences"
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24"
    >
      <Reveal>
        <p className="mb-2 font-mono text-sm text-accent">02 //</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Compétences
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Les domaines techniques que j’approfondis dans le cadre de mon BTS
          SIO, de mes projets et de mes stages.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => {
          const Icon = icons[skill.icon as keyof typeof icons]
          return (
            <motion.div
              key={skill.title}
              variants={staggerItem}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Icon size={22} />
              </div>
              <h3 className="mb-2 font-semibold">{skill.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )
        })}
      </Stagger>
    </section>
  )
}
