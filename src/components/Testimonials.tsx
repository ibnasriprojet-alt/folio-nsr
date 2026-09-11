import { GraduationCap, Quote } from 'lucide-react'

import { Reveal } from '@/components/Reveal'

const testimonials = [
  {
    author: 'M. MZE E.',
    role: 'Professeur — Réseaux',
    quote:
      'Élève sérieux et impliqué, Ibrahim a fait preuve d’une grande autonomie dans la mise en place de la simulation Cisco multi-sites.',
  },
  {
    author: 'M. ISSOUFI F.',
    role: 'Professeur — Systèmes & Services',
    quote:
      'Rigueur et méthode caractérisent son travail. Il a su mener son projet Proxmox jusqu’au bout, avec des comptes rendus bien construits.',
  },
  {
    author: 'M. PIERRES E.',
    role: 'Professeur — Développement',
    quote:
      'Un élève curieux qui ne se contente pas de ce qu’on lui demande. Il va chercher plus loin et documente soigneusement ses essais.',
  },
  {
    author: 'M. KSORI K.',
    role: 'Professeur Principal',
    quote:
      'Comportement exemplaire tout au long de l’année. Ponctuel, impliqué et toujours prêt à aider ses camarades en travaux pratiques.',
  },
  {
    author: 'Mme NDOUKOU-NDOUKOU U.',
    role: 'Professeure — Gestion & Communication',
    quote:
      'Ibrahim communique avec aisance et présente des résultats clairs. Un réel investissement dans la vie du groupe et du lycée.',
  },
]

export function Testimonials() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="mx-auto max-w-5xl px-6 pt-20">
      <Reveal>
        <p className="mb-2 font-mono text-sm text-accent">04 · 1 //</p>
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ils parlent de moi
        </h3>
        <p className="mt-3 text-muted-foreground">
          Quelques retours de mes professeurs au Lycée Younoussa Bamana.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mt-10">
          <div className="marquee-scroll overflow-hidden">
            <div className="marquee-scroll-track flex gap-6 py-2">
              {doubled.map((t, i) => (
                <figure
                  key={`${t.author}-${i}`}
                  className="flex w-[340px] flex-shrink-0 flex-col justify-between rounded-xl border border-border bg-card p-6 sm:w-[380px]"
                >
                  <div>
                    <Quote size={20} className="mb-3 text-accent" />
                    <blockquote className="text-sm leading-relaxed text-foreground">
                      « {t.quote} »
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-accent">
                      <GraduationCap size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
        </div>
      </Reveal>
    </section>
  )
}