import { motion, useReducedMotion } from 'framer-motion'
import { flat, maskUp, stagger, VIEWPORT } from '../../lib/motion'

/**
 * Display type that slides up from behind its own overflow box, one line per
 * child. Splitting on spaces would break long headings mid-phrase, so callers
 * pass the lines they want.
 */
export default function MaskText({ lines, className = '', step = 0.08, delay = 0, as = 'h2' }) {
  const reduced = useReducedMotion()
  const Motion = motion[as] || motion.h2
  const rows = Array.isArray(lines) ? lines : [lines]

  return (
    <Motion
      className={className}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {rows.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span className="block" variants={reduced ? flat : maskUp}>
            {line}
          </motion.span>
        </span>
      ))}
    </Motion>
  )
}
