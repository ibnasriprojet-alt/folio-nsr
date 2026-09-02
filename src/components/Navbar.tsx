import { motion, useReducedMotion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { navLinks } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/ThemeProvider'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#accueil')
  const reduce = useReducedMotion()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#accueil"
          className="font-mono text-sm font-semibold tracking-tight"
        >
          <span className="text-muted-foreground">&lt;</span>nasri
          <span className="text-accent">/</span>
          <span className="text-muted-foreground">&gt;</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground',
                active === link.href
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggle}
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Changer de thème"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md md:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-5xl flex-col px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggle}
              className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Changer de thème"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </motion.div>
      )}
    </header>
  )
}
