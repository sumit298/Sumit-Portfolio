import { motion, useReducedMotion } from 'framer-motion'
import { EASE, DURATION, VIEWPORT } from '../../lib/motion'

/** Scroll-triggered fade + rise. Collapses to a plain fade when motion is reduced. */
export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const reduced = useReducedMotion()
  const Motion = motion[as] || motion.div

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.base, delay, ease: EASE }}
    >
      {children}
    </Motion>
  )
}
