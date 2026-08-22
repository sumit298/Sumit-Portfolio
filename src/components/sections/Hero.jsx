import { Suspense, lazy } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Icon from '../ui/Icon'
import Magnetic from '../ui/Magnetic'

const HeroField = lazy(() => import('../three/HeroField'))

function Word({ text, delay = 0 }) {
  const reduced = useReducedMotion()
  if (reduced) return <span className="block">{text}</span>

  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  )
}

export default function Hero({ profile, social, currentRole }) {
  return (
    <section id="top" className="band relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-14">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <HeroField />
        </Suspense>
      </motion.div>

      <div className="wrap relative z-10 flex flex-1 flex-col justify-center py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <span className="meta">{profile.kicker}</span>
          <span className="meta flex items-center gap-2.5">
            {profile.available ? <span className="dot-live" /> : null}
            {profile.status} · {profile.location}
          </span>
        </motion.div>

        <h1 className="display display-xl mt-7">
          <Word text={profile.firstName} delay={0.25} />
          <span className="block">
            <Word text={profile.lastName} delay={0.35} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_1fr]"
        >
          <div>
            <p className="max-w-lg text-[0.95rem] leading-[1.85] text-[var(--fg-muted)]">{profile.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a className="btn btn-accent group" href={`mailto:${profile.email}`}>
                  Email me
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </Magnetic>
              {profile.resumeUrl ? (
                <Magnetic>
                  <a className="btn" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                    Résumé
                  </a>
                </Magnetic>
              ) : null}
              <div className="flex gap-2">
                {social.map((item) => (
                  <Magnetic key={item.id}>
                    <a
                      className="icon-btn"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                    >
                      <Icon name={item.icon} size={14} />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>

          {currentRole ? (
            <div className="border-t border-[var(--hair)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <span className="kicker">Currently</span>
              <p className="display display-md mt-3">{currentRole.role}</p>
              <p className="mt-3 text-[0.8rem] tracking-[0.14em] uppercase text-[var(--accent-2)]">
                {currentRole.company} · {currentRole.location}
              </p>
              <p className="meta mt-2">
                {currentRole.start} — {currentRole.end}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {currentRole.stack.slice(0, 5).map((tech) => (
                  <span key={tech} className="tagbox">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>

      <div className="wrap relative z-10 pb-8">
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="meta inline-flex w-fit items-center gap-2 hover:text-[var(--accent)]"
        >
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ArrowDown size={12} />
          </motion.span>
          Scroll
        </motion.a>
      </div>
    </section>
  )
}
