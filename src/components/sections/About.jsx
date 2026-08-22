import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import MaskText from '../ui/MaskText'
import { Stagger, StaggerItem } from '../ui/Stagger'
import { DURATION, EASE, VIEWPORT } from '../../lib/motion'

export default function About({ profile }) {
  const reduced = useReducedMotion()

  // "Half systems engineer. Half product brain." → one masked line per sentence,
  // with the second line carrying the accent.
  const headingLines = profile.aboutHeading
    .split('.')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part, i) => (
      <span key={i} className={i % 2 === 1 ? 'text-[var(--accent)]' : undefined}>
        {part}.
      </span>
    ))

  return (
    <section id="about" className="band section">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Reveal>
            <span className="kicker">About</span>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="meta">{profile.journey}</span>
          </Reveal>
        </div>

        <MaskText lines={headingLines} className="display display-lg mt-10 max-w-4xl" delay={0.08} />

        <motion.div
          className="hair mt-14 origin-left"
          initial={{ scaleX: reduced ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: DURATION.slow, ease: EASE }}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <Reveal delay={0.06}>
            <p className="meta">{profile.aboutSub}</p>
          </Reveal>

          <Stagger className="space-y-6" step={0.08}>
            {profile.about.map((paragraph, i) => (
              <StaggerItem key={i}>
                <p className="max-w-2xl text-[0.92rem] leading-[1.95] text-[var(--fg-muted)]">{paragraph}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Stagger
          className="mt-16 grid grid-cols-2 gap-8 border-t border-[var(--hair)] pt-10 lg:grid-cols-4"
          step={0.09}
        >
          {profile.highlights.map((item) => (
            <StaggerItem key={item.label}>
              <p className="display display-md">{item.value}</p>
              <p className="meta mt-2">{item.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
