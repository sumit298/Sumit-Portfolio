import { motion, useReducedMotion } from 'framer-motion'
import MaskText from './MaskText'
import Reveal from './Reveal'
import { DURATION, EASE, VIEWPORT } from '../../lib/motion'

/** Three-column masthead: `// label` · giant display word · caption. */
export default function SectionHead({ label, title, caption }) {
  const reduced = useReducedMotion()

  return (
    <>
      <div className="grid items-end gap-4 pb-6 lg:grid-cols-[minmax(7rem,1fr)_auto_minmax(7rem,1fr)]">
        <Reveal>
          <span className="kicker">{label}</span>
        </Reveal>

        <MaskText lines={[title]} className="display display-lg lg:text-center" delay={0.05} />

        <Reveal delay={0.12}>
          <span className="meta block lg:text-right">{caption}</span>
        </Reveal>
      </div>

      <motion.div
        className="hair origin-left"
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: DURATION.slow, ease: EASE, delay: 0.1 }}
      />
    </>
  )
}
