import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, flat, stagger, VIEWPORT } from '../../lib/motion'

/**
 * Parent/child pair for lists that should arrive in sequence — tag rows, bullets,
 * stat blocks. The parent owns the timing so children stay declarative.
 */
export function Stagger({ children, step = 0.05, delay = 0, className = '', as = 'div' }) {
  const Motion = motion[as] || motion.div

  return (
    <Motion
      className={className}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Motion>
  )
}

export function StaggerItem({ children, y = 14, className = '', as = 'div' }) {
  const reduced = useReducedMotion()
  const Motion = motion[as] || motion.div

  return (
    <Motion className={className} variants={reduced ? flat : fadeUp(y)}>
      {children}
    </Motion>
  )
}
