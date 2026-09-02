import { profile } from '@/lib/data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} {profile.name} — Tous droits réservés.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Construit avec React · Tailwind · Framer Motion
        </p>
      </div>
    </footer>
  )
}
