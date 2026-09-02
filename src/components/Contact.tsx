import { useState } from 'react'
import { CheckCircle2, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { profile } from '@/lib/data'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mjybnyza', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <Reveal>
        <p className="mb-2 font-mono text-sm text-accent">04 //</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Contact
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Une opportunité de stage, d’alternance ou simplement une question ?
          Écrivez-moi, je réponds rapidement.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal delay={0.05}>
          <div className="space-y-6">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-accent">
                <Mail size={20} />
              </span>
              <span className="text-sm break-all">{profile.email}</span>
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-accent">
                <Phone size={20} />
              </span>
              <span className="text-sm">{profile.phone}</span>
            </a>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-accent">
                <MapPin size={20} />
              </span>
              <span className="text-sm">{profile.location}</span>
            </div>
            <div className="flex gap-3 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <Github size={20} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="rounded-xl border border-border bg-card p-6"
          >
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <CheckCircle2 size={40} className="text-accent" />
                <p className="font-semibold">Message envoyé !</p>
                <p className="text-sm text-muted-foreground">
                  Merci de m’avoir contacté, je reviens vers vous rapidement.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setStatus('idle')}
                >
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom
                    </label>
                    <Input id="name" name="name" required placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="vous@exemple.fr"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Votre message..."
                    className="min-h-32"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-destructive">
                    Une erreur est survenue. Réessayez ou écrivez-moi
                    directement par email.
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Envoi...' : 'Envoyer le message'}
                </Button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
