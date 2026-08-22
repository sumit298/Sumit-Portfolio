import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'xp', label: 'XP' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ name }) {
  const [active, setActive] = useState('about')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[var(--color-paper)] text-[#100f18]">
      <nav className="wrap flex h-14 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 text-[0.74rem] font-bold tracking-[0.2em]">
          {initials}
          <span className="text-[#85829a]">—</span>
          <span className="text-[#85829a]">PORTFOLIO</span>
          <span className="text-[var(--accent)]">✦</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative block py-1 text-[0.7rem] tracking-[0.2em] uppercase transition-colors ${
                  active === link.id ? 'text-[var(--accent)]' : 'text-[#4f4d61] hover:text-[var(--accent-2)]'
                }`}
              >
                {link.label}
                {active === link.id ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-[var(--accent)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="icon-btn !h-8 !w-8 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={15} /> : <Menu size={15} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
            className="overflow-hidden border-t border-[rgba(16,15,24,0.12)] bg-[var(--color-paper)] md:hidden"
          >
            <ul className="wrap flex flex-col py-3">
              {LINKS.map((link, i) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 py-3 text-[0.78rem] tracking-[0.16em] uppercase text-[#4f4d61]"
                  >
                    <span className="text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
