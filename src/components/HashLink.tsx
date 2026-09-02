import { Link, useNavigate } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

export function HashLink({ to, ...props }: LinkProps) {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to.startsWith('/#')) {
      e.preventDefault()
      const hash = to.slice(1) // "#projets"
      navigate('/')
      // attendre que le DOM soit prêt puis scroller
      requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }

  return <Link to={to} onClick={handleClick} {...props} />
}
